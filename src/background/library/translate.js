import TRANSLATOR from "./translators/proxy.js";
import { sendMessageToCurrentTab } from "./common.js";
import Messager from "../../common/scripts/messager.js";

export {
    translate,
    detect,
    showTranslate,
    pronounce,
    stopPronounce,
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
    return TRANSLATOR.detect(text);
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
    // Start showing loading animation.
    sendMessageToCurrentTab("info", {
        info: "start_translating"
    });

    // get language settings from chrome storage
    return new Promise((resolve, reject) => {
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
                    sendMessageToCurrentTab("error", {
                        error: error
                    });
                    reject(error);
                    return;
                }
            }

            // Do translate.
            try {
                let result = await TRANSLATOR.translate(text, sl, tl);

                result.sourceLanguage = sl;
                result.targetLanguage = tl;
                resolve(result);
            } catch (error) {
                sendMessageToCurrentTab("error", {
                    error: error
                });
                reject(error);
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
    if (language == "auto") {
        lang = await TRANSLATOR.detect(text);
    }
    return TRANSLATOR.pronounce(text, lang, speed);
}

/**
 * Stop pronounce proxy.
 */
function stopPronounce() {
    TRANSLATOR.stopPronounce();
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

    if (chrome.runtime.lastError) {
        // eslint-disable-next-line no-console
        console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
        alert(content.mainMeaning);
        return Promise.resolve();
    }

    try {
        let tab_id = await getCurrentTabId(tab);
        return await Messager.sendToTab(tab_id, "content", "translateResult", {
            translateResult: content
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Chrome runtime error: " + e);
        alert(content.mainMeaning);
        return Promise.resolve();
    }
}

/**
 * 找出应该用于展示翻译结果的tab。
 *
 * @param {chrome.tabs.Tab} tab 传入给showTranslate的tab
 *
 * @returns {Promise<Number>} tab id Promise
 */
function getCurrentTabId(tab) {
    if (tab && tab.id >= 0) {
        return Promise.resolve(tab.id);
    } else if (!tab) {
        // 没有tab，说明该页面无法访问
        // eslint-disable-next-line no-console
        console.log("Unsupported page.");
        return Promise.reject(chrome.tabs.TAB_ID_NONE);
    }

    // 检查是否拥有访问文件链接的权限。
    return new Promise((resolve, reject) => {
        chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {
            if (!isAllowedAccess) {
                // 打开管理页面，由用户开启权限
                if (confirm(chrome.i18n.getMessage("PermissionRemind"))) {
                    // 为管理页面创建一个新的标签
                    chrome.tabs.create({ url: "chrome://extensions/?id=" + chrome.runtime.id });
                } else {
                    // 用户拒绝开启，则直接展示翻译结果
                    // eslint-disable-next-line no-console
                    console.log("Permission denied.");
                }
                reject(chrome.tabs.TAB_ID_NONE);
                return;
            }

            // 查询当前的tab，在该tab上展示结果。
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                if (chrome.runtime.lastError || !tabs[0] || tabs[0].id < 0) {
                    // eslint-disable-next-line no-console
                    console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
                    reject(chrome.tabs.TAB_ID_NONE);
                    return;
                }

                resolve(tabs[0].id);
            });
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
function youdaoPageTranslate(request) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const data = xhr.status === 200 ? xhr.responseText : null;
                resolve({
                    response: data,
                    index: request.index
                });
            }
        };
        xhr.open(request.type, request.url, true);

        if (request.type === "POST") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(request.data);
        } else {
            xhr.send(null);
        }
    });
}

/**
 * 执行有道网页翻译相关脚本
 */
function executeYouDaoScript() {
    chrome.tabs.executeScript({ file: "/youdao/main.js" }, function(result) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
            // eslint-disable-next-line no-console
            console.log("Detail: " + result);
        }
    });
}

/**
 * 执行谷歌网页翻译相关脚本。
 */
function executeGoogleScript() {
    chrome.tabs.executeScript({ file: "/google/injection.js" }, function(result) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
            // eslint-disable-next-line no-console
            console.log("Detail: " + result);
        }
    });
}
