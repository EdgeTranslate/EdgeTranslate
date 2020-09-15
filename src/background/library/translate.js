import axios from "axios";
import HYBRID_TRANSLATOR from "./translators/hybrid.js";
import { sendMessageToCurrentTab } from "./common.js";
import { log } from "../../common/scripts/common.js";
import Messager from "../../common/scripts/messager.js";

class TranslatorManager {
    constructor() {
        /**
         * Supported translators.
         */
        this.TRANSLATORS = {
            HybridTranslate: HYBRID_TRANSLATOR,
            ...HYBRID_TRANSLATOR.REAL_TRANSLATORS
        };

        /**
         * Mutual translating mode flag.
         */
        this.IN_MUTUAL_MODE = null;

        /**
         * Language setting.
         */
        this.LANGUAGE_SETTING = {};

        /**
         * Default translator.
         */
        this.DEFAULT_TRANSLATOR = "";

        /**
         * Config loaded flag.
         */
        this.CONFIG_LOADED = false;

        /**
         * Update config cache on config changed.
         */
        chrome.storage.onChanged.addListener(
            ((changes, area) => {
                if (area === "sync") {
                    if (changes["OtherSettings"]) {
                        this.IN_MUTUAL_MODE = changes["OtherSettings"].newValue.MutualTranslate;
                    }

                    if (changes["languageSetting"]) {
                        this.LANGUAGE_SETTING = changes["languageSetting"].newValue;
                    }

                    if (changes["DefaultTranslator"]) {
                        this.DEFAULT_TRANSLATOR = changes["DefaultTranslator"].newValue;
                    }
                }
            }).bind(this)
        );
    }

    /**
     * Load default translator if it is not loaded.
     *
     * @returns {Promise<void>} loading Promise.
     */
    loadConfigIfNotLoaded() {
        return new Promise((resolve, reject) => {
            if (!this.CONFIG_LOADED) {
                chrome.storage.sync.get(
                    ["DefaultTranslator", "languageSetting", "OtherSettings"],
                    res => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                            return;
                        }

                        this.IN_MUTUAL_MODE = res.OtherSettings.MutualTranslate;
                        this.LANGUAGE_SETTING = res.languageSetting;
                        this.DEFAULT_TRANSLATOR = res.DefaultTranslator;
                        this.CONFIG_LOADED = true;
                        resolve();
                    }
                );
            } else resolve();
        });
    }

    /**
     *
     * 检测给定文本的语言。
     *
     * @param {string} text 需要检测的文本
     *
     * @returns {Promise<String>} detected language Promise
     */
    async detect(text) {
        // Check config.
        await this.loadConfigIfNotLoaded();

        return this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text).catch(error => {
            sendMessageToCurrentTab("info", {
                info: "network_error",
                error: error,
                timestamp: new Date().getTime()
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
     * @param {Array<Number>} position position of the text
     *
     * @returns {Promise<Object>} translate result Promise
     */
    async translate(text, position) {
        // Check config.
        await this.loadConfigIfNotLoaded();

        // Get time stamp for this translating.
        let timestamp = new Date().getTime();

        // Tell display part translating start.
        sendMessageToCurrentTab("info", {
            info: "start_translating",
            // Send translating text back to content scripts.
            text: text,
            position: position,
            timestamp: timestamp
        }).catch(error => log(error));

        let sl = this.LANGUAGE_SETTING.sl,
            tl = this.LANGUAGE_SETTING.tl;

        try {
            if (sl !== "auto" && this.IN_MUTUAL_MODE) {
                // mutual translate mode, detect language first.
                sl = await this.detect(text);
                switch (sl) {
                    case this.LANGUAGE_SETTING.sl:
                        tl = this.LANGUAGE_SETTING.tl;
                        break;
                    case this.LANGUAGE_SETTING.tl:
                        tl = this.LANGUAGE_SETTING.sl;
                        break;
                    default:
                        sl = "auto";
                        tl = this.LANGUAGE_SETTING.tl;
                }
            }

            // Do translate.
            let result = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].translate(text, sl, tl);
            result.sourceLanguage = sl;
            result.targetLanguage = tl;
            result.timestamp = timestamp;
            return result;
        } catch (error) {
            sendMessageToCurrentTab("info", {
                info: "network_error",
                error: error,
                timestamp: timestamp
            }).catch(e => log(e));
            return error;
        }
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
    async pronounce(text, language, speed) {
        // Check config.
        await this.loadConfigIfNotLoaded();

        let lang = language;
        let timestamp = new Date().getTime();

        try {
            if (language == "auto") {
                lang = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
            }

            return await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].pronounce(text, lang, speed);
        } catch (error) {
            sendMessageToCurrentTab("info", {
                info: "network_error",
                error: error,
                timestamp: timestamp
            });
            return Promise.resolve();
        }
    }

    /**
     * Stop pronounce proxy.
     */
    async stopPronounce() {
        // Check config.
        await this.loadConfigIfNotLoaded();

        this.TRANSLATORS[this.DEFAULT_TRANSLATOR].stopPronounce();
    }

    /**
     * Get translators that support given source language and target language.
     *
     * @param {Object} detail current language setting, detail.from is source language, detail.to is target language
     *
     * @returns {Array<String>} available translators Promise.
     */
    getAvailableTranslators(detail) {
        return ["HybridTranslate"].concat(
            HYBRID_TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
        );
    }

    /**
     * Language setting update event listener.
     *
     * @param {Object} detail updated language setting, detail.from is source language, detail.to is target language
     *
     * @returns {Promise<void>} finished Promise
     */
    async onLanguageSettingUpdated(detail) {
        let selectedTranslator = this.DEFAULT_TRANSLATOR;

        // Get translators supporting new language setting.
        let availableTranslators = this.getAvailableTranslators(detail);

        // Update hybrid translator config.
        let newConfig = await HYBRID_TRANSLATOR.updateConfigFor(detail.from, detail.to);

        // If current default translator does not support new language setting, update it.
        if (!new Set(availableTranslators).has(selectedTranslator)) {
            selectedTranslator = availableTranslators[1];
            chrome.storage.sync.set({ DefaultTranslator: selectedTranslator });
        }

        // Send message to options page to update options.
        Messager.send("options", "hybrid_translator_config_updated", {
            config: newConfig,
            availableTranslators: availableTranslators.slice(1)
        }).catch(() => {});

        // Send message to result frame to update options.
        sendMessageToCurrentTab("update_translator_options", {
            selectedTranslator: selectedTranslator,
            availableTranslators: availableTranslators
        }).catch(() => {});
    }

    /**
     * Update translator.
     *
     * @param {string} translator the new translator to use.
     *
     * @returns {Promise<void>} update finished promise.
     */
    updateDefaultTranslator(translator) {
        return new Promise(resolve => {
            chrome.storage.sync.set({ DefaultTranslator: translator }, () => {
                resolve();
            });
        });
    }
}

/* EXPORTED OBJECTS AND FUNCTIONS START */

/**
 * Create default translator manager object.
 */
const TRANSLATOR_MANAGER = new TranslatorManager();

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
        return await sendMessageToCurrentTab("translateResult", content, tab);
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

/* EXPORTED OBJECTS AND FUNCTIONS END */

/* INNER OBJECTS AND FUNCTIONS START */

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

/* INNER OBJECTS AND FUNCTIONS END */

export {
    TRANSLATOR_MANAGER,
    showTranslate,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript
};
