import axios from "axios";
import TRANSLATOR from "./translators/proxy.js";
import { sendMessageToCurrentTab } from "./common.js";
import { log } from "../../common/scripts/common.js";
import Messager from "../../common/scripts/messager.js";

export {
    detect,
    translate,
    pronounce,
    stopPronounce,
    onLanguageSettingUpdated,
    getAvailableTranslators,
    updateTranslator,
    showTranslate,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript
};

/**
 *
 * 检测给定文本的语言。
 *
 * @param {string} text 需要检测的文本
 *
 * @returns {Promise<String>} detected language Promise
 */
function detect(text) {
    return TRANSLATOR.detect(text).catch(error => {
        sendMessageToCurrentTab("info", {
            info: "network_error",
            error: error
        }).catch(e => log(e));
    });
}

/**
 *
 * This is a translation client function
 * 1. get language settings
 * 2. if source language is "auto", use normal translation mode
 * 3. else use mutual translation mode(auto translate from both sides)
 * 4. send request, get result
 *
 * @param {String} text original text to be translated
 *
 * @returns {Promise<Object>} translate result Promise
 */
function translate(text) {
    // get language settings from chrome storage
    return new Promise(resolve => {
        chrome.storage.sync.get(["languageSetting", "OtherSettings"], async result => {
            let OtherSettings = result.OtherSettings;
            let languageSetting = result.languageSetting;
            let sl = languageSetting.sl,
                tl = languageSetting.tl;

            if (sl !== "auto" && OtherSettings.MutualTranslate) {
                // mutual translate mode, detect language first.
                try {
                    sl = await detect(text);
                    switch (sl) {
                        case languageSetting.sl:
                            tl = languageSetting.tl;
                            break;
                        case languageSetting.tl:
                            tl = languageSetting.sl;
                            break;
                        default:
                            sl = "auto";
                            tl = languageSetting.tl;
                    }
                } catch (error) {
                    sendMessageToCurrentTab("info", {
                        info: "network_error",
                        error: error
                    }).catch(e => log(e));
                    return error;
                }
            }

            // Do translate.
            try {
                let result = await TRANSLATOR.translate(text, sl, tl);

                result.sourceLanguage = sl;
                result.targetLanguage = tl;
                resolve(result);
            } catch (error) {
                sendMessageToCurrentTab("info", {
                    info: "network_error",
                    error: error
                }).catch(e => log(e));
                return error;
            }
        });
    });
}

/**
 * Text to speech proxy.
 *
 * @param {String} text The text.
 * @param {String} language The language of the text.
 * @param {String} speed The speed of the speech.
 *
 * @returns {Promise<void>} pronounce finished Promise
 */
async function pronounce(text, language, speed) {
    let lang = language;
    try {
        if (language == "auto") {
            lang = await TRANSLATOR.detect(text);
        }
    } catch (error) {
        sendMessageToCurrentTab("info", {
            info: "network_error",
            error: error
        });
    }

    return TRANSLATOR.pronounce(text, lang, speed).catch(error => {
        sendMessageToCurrentTab("info", {
            info: "network_error",
            error: error
        });
    });
}

/**
 * Stop pronounce proxy.
 */
function stopPronounce() {
    TRANSLATOR.stopPronounce();
}

/**
 * Language setting update event listener.
 *
 * @param {Object} detail updated language setting, detail.from is source language, detail.to is target language
 *
 * @returns {Promise<void>} finished Promise
 */
function onLanguageSettingUpdated(detail) {
    return TRANSLATOR.updateConfigFor(detail).then(newConfig => {
        // Send message to options page to update options.
        Messager.send("options", "update_translator_config_options", {
            config: newConfig,
            availableTranslators: TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
        }).catch(() => {});

        // Send message to result frame to update options.
        sendMessageToCurrentTab("update_translator_config_options", {
            config: newConfig,
            availableTranslators: TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
        }).catch(() => {});
    });
}

/**
 * Get translators that support given source language and target language.
 *
 * @param {Object} detail current language setting, detail.from is source language, detail.to is target language
 *
 * @returns {Promise<Array<String>>} available translators Promise.
 */
function getAvailableTranslators(detail) {
    return TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to);
}

/**
 * Update translator.
 *
 * @param {Object} detail message detail, detail.translator is the translator to set.
 *
 * @returns {Promise} set finished promise.
 */
function updateTranslator(detail) {
    return TRANSLATOR.loadConfigIfNotLoaded().then(() => {
        TRANSLATOR.CONFIG.single = detail.translator;
        return new Promise(resolve => {
            chrome.storage.sync.set({ TranslatorConfig: TRANSLATOR.CONFIG }, () => {
                resolve(TRANSLATOR.CONFIG);
            });
        }).then(newConfig => {
            // Send message to options page to update options.
            Messager.send("options", "update_translator_config_options", {
                config: newConfig,
                availableTranslators: TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
            }).catch(() => {});

            // Send message to result frame to update options.
            sendMessageToCurrentTab("update_translator_config_options", {
                config: newConfig,
                availableTranslators: TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
            }).catch(() => {});
        });
    });
}

/**
 * 展示翻译结果。
 *
 * @param {Object} content 翻译结果
 * @param {Object} tab 展示翻译结果的页面
 *
 * @returns {Promise<Object>} show translate result Promise
 */
async function showTranslate(content, tab) {
    if (!content) {
        return Promise.resolve();
    }

    try {
        return await sendMessageToCurrentTab(
            "translateResult",
            {
                translateResult: content
            },
            tab
        );
    } catch (error) {
        // Filter out tabs that are not file://.
        if (!(error && error.tab && error.tab.url && error.tab.url.startsWith("file://"))) {
            alert(content.mainMeaning);
            log(error.error);
            return Promise.resolve();
        }

        return checkAndRequestFileAccess()
            .then(allowed => {
                if (allowed) {
                    // file:// access allowed but still can not access the tab.
                    alert(content.mainMeaning);
                }
            })
            .catch(() => {
                alert(content.mainMeaning);
                log("Permission denied.");
            });
    }
}

/**
 * Check if the extension is allowed to access file://. If not allowed, try to request the permission.
 *
 * @returns {Promise<boolean>} allowed Promise
 */
function checkAndRequestFileAccess() {
    return new Promise((resolve, reject) => {
        chrome.extension.isAllowedFileSchemeAccess(allowed => {
            if (allowed) {
                resolve(allowed);
            } else if (confirm(chrome.i18n.getMessage("PermissionRemind"))) {
                chrome.tabs.create({
                    url: "chrome://extensions/?id=" + chrome.runtime.id
                });
                resolve(allowed);
            } else {
                reject(allowed);
            }
        });
    });
}

/**
 * 使用用户选定的网页翻译引擎翻译当前网页。
 */
function translatePage() {
    chrome.storage.sync.get(["DefaultPageTranslator"], result => {
        let translator = result.DefaultPageTranslator;
        switch (translator) {
            case "YouDaoPageTranslate":
                executeYouDaoScript();
                break;
            case "GooglePageTranslate":
                executeGoogleScript();
                break;
            default:
                executeYouDaoScript();
                break;
        }
    });
}

/**
 * 有道翻译接口
 * @param {Object} request request
 *
 * @returns {Promise<Object>} response Promise
 */
async function youdaoPageTranslate(request) {
    let isPost = request.type === "POST";
    let response = await axios({
        method: request.type,
        baseURL: request.url,
        headers: isPost ? { "Content-Type": "application/x-www-form-urlencoded" } : {},
        data: isPost ? request.data : null
    });

    return {
        response: response.status === 200 ? JSON.stringify(response.data) : null,
        index: request.index
    };
}

/**
 * 执行有道网页翻译相关脚本
 */
function executeYouDaoScript() {
    chrome.tabs.executeScript({ file: "/youdao/main.js" }, function(result) {
        if (chrome.runtime.lastError) {
            log("Chrome runtime error: " + chrome.runtime.lastError);
            log("Detail: " + result);
        }
    });
}

/**
 * 执行谷歌网页翻译相关脚本。
 */
function executeGoogleScript() {
    chrome.tabs.executeScript({ file: "/google/injection.js" }, function(result) {
        if (chrome.runtime.lastError) {
            log("Chrome runtime error: " + chrome.runtime.lastError);
            log("Detail: " + result);
        }
    });
}
