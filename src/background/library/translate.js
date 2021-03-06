// import axios from "./axios.js";
import HYBRID_TRANSLATOR from "./translators/hybrid.js";
import { sendMessageToCurrentTab } from "./common.js";
import { log } from "common/scripts/common.js";
import Messager from "common/scripts/messager.js";
import { promiseTabs, delayPromise } from "common/scripts/promise.js";
import EVENT_MANAGER from "./event.js";

class TranslatorManager {
    constructor() {
        /**
         * Supported translators.
         */
        this.TRANSLATORS = {
            HybridTranslate: HYBRID_TRANSLATOR,
            ...HYBRID_TRANSLATOR.REAL_TRANSLATORS,
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
            if (this.CONFIG_LOADED) {
                resolve();
                return;
            }

            chrome.storage.sync.get(
                ["DefaultTranslator", "languageSetting", "OtherSettings"],
                (res) => {
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
        });
    }

    /**
     * get the id of the current tab
     * if the current tab can't display the result panel
     * open a notice page to display the result and explain why the page shows
     * @returns the tab id
     */
    async getCurrentTabId() {
        let tabId = -1;
        const tabs = await promiseTabs.query({ active: true, currentWindow: true });
        tabId = tabs[0].id;

        // to test whether the current tab can receive message(display results)
        await Messager.sendToTab(tabId, "content", "before_translating", {}).catch(async () => {
            /**
             * the current tab can't display the result panel
             * so we open a notice page to display the result and explain why this page shows
             */
            const noticePageUrl = chrome.runtime.getURL("content/notice/notice.html");
            // get the tab id of an existing notice page
            try {
                const tab = (await promiseTabs.query({ url: noticePageUrl }))[0];
                // jump to the existed page
                chrome.tabs.highlight({
                    tabs: tab.index,
                });
                tabId = tab.id;
            } catch (error) {
                // create a new notice page
                const tab = await promiseTabs.create({
                    url: noticePageUrl,
                    active: true,
                });
                // wait for browser to open a new page
                await delayPromise(200);
                tabId = tab.id;
            }
        });
        return tabId;
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

        return this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
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
     * @returns {Promise<void>} translate finished Promise
     */
    async translate(text, position) {
        // Check config.
        await this.loadConfigIfNotLoaded();

        // get current tab id
        const currentTabId = await this.getCurrentTabId();

        /**
         * Get current time as timestamp.
         *
         * Timestamp is used for preventing disordered translating message to disturb user.
         *
         * Every translating request has a unique timestamp and every message from that translating
         * request will be assigned with the timestamp. About usage of the timestamp, please refer
         * to display.js.
         */
        let timestamp = new Date().getTime();

        // Trigger translating start event.
        EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.TRANSLATE_START, {
            text,
            position,
            timestamp,
            tabId: currentTabId,
        });

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

            // Trigger translating finished event.
            EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.TRANSLATE_FINISHED, {
                content: result,
                tabId: currentTabId,
                timestamp,
            });
        } catch (error) {
            // Trigger translating error event.
            EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.TRANSLATE_ERROR, {
                error,
                timestamp,
                tabId: currentTabId,
            });
        }
    }

    /**
     * Text to speech proxy.
     *
     * @param {String} pronouncing which text are we pronouncing? enum{source, target}
     * @param {String} text The text.
     * @param {String} language The language of the text.
     * @param {String} speed The speed of the speech.
     *
     * @returns {Promise<void>} pronounce finished Promise
     */
    async pronounce(pronouncing, text, language, speed) {
        // Check config.
        await this.loadConfigIfNotLoaded();

        // get current tab id
        const currentTabId = await this.getCurrentTabId();

        let lang = language;
        let timestamp = new Date().getTime();

        // Trigger pronouncing start event.
        EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.PRONOUNCE_START, {
            pronouncing,
            text,
            language,
            timestamp,
            tabId: currentTabId,
        });

        try {
            if (language == "auto") {
                lang = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
            }

            await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].pronounce(text, lang, speed);

            // Trigger pronouncing finished event.
            EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.PRONOUNCE_FINISHED, {
                pronouncing,
                text,
                language: lang,
                timestamp,
                tabId: currentTabId,
            });
        } catch (error) {
            // Trigger pronouncing error event.
            EVENT_MANAGER.triggerEvent(EVENT_MANAGER.EVENTS.PRONOUNCE_ERROR, {
                pronouncing,
                error,
                timestamp,
                tabId: currentTabId,
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
            availableTranslators: availableTranslators.slice(1),
        }).catch(() => {});

        // Send message to result frame to update options.
        sendMessageToCurrentTab("update_translator_options", {
            selectedTranslator,
            availableTranslators,
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
        return new Promise((resolve) => {
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
 * 使用用户选定的网页翻译引擎翻译当前网页。
 */
// function translatePage() {
//     chrome.storage.sync.get(["DefaultPageTranslator"], result => {
//         let translator = result.DefaultPageTranslator;
//         switch (translator) {
//             case "YouDaoPageTranslate":
//                 executeYouDaoScript();
//                 break;
//             case "GooglePageTranslate":
//                 executeGoogleScript();
//                 break;
//             default:
//                 executeYouDaoScript();
//                 break;
//         }
//     });
// }

// /**
//  * 有道翻译接口
//  * @param {Object} request request
//  *
//  * @returns {Promise<Object>} response Promise
//  */
// async function youdaoPageTranslate(request) {
//     let isPost = request.type === "POST";
//     let response = await axios({
//         method: request.type,
//         baseURL: request.url,
//         headers: isPost ? { "Content-Type": "application/x-www-form-urlencoded" } : {},
//         data: isPost ? request.data : null
//     });

//     return {
//         response: response.status === 200 ? JSON.stringify(response.data) : null,
//         index: request.index
//     };
// }

// /**
//  * 执行有道网页翻译相关脚本
//  */
// function executeYouDaoScript() {
//     chrome.tabs.executeScript({ file: "/youdao/main.js" }, function(result) {
//         if (chrome.runtime.lastError) {
//             log("Chrome runtime error: " + chrome.runtime.lastError);
//             log("Detail: " + result);
//         }
//     });
// }

// /**
//  * 执行谷歌网页翻译相关脚本。
//  */
// function executeGoogleScript() {
//     chrome.tabs.executeScript({ file: "/google/injection.js" }, function(result) {
//         if (chrome.runtime.lastError) {
//             log("Chrome runtime error: " + chrome.runtime.lastError);
//             log("Detail: " + result);
//         }
//     });
// }

/* EXPORTED OBJECTS AND FUNCTIONS END */

/**
 * Tell display that translating started.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.TRANSLATE_START, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "start_translating", detail).catch((error) =>
        log(error)
    );
});

/**
 * Send translating result to display.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.TRANSLATE_FINISHED, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "translating_finished", {
        timestamp: detail.timestamp,
        ...detail.content,
    }).catch((error) => log(error));
});

/**
 * Tell display translating error.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.TRANSLATE_ERROR, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "translating_error", detail).catch((error) =>
        log(error)
    );
});

/**
 * Tell display pronouncing start.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.PRONOUNCE_START, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "start_pronouncing", detail).catch((error) =>
        log(error)
    );
});

/**
 * Tell display pronouncing finished.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.PRONOUNCE_FINISHED, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "pronouncing_finished", detail).catch((error) =>
        log(error)
    );
});

/**
 * Tell display pronouncing error.
 */
EVENT_MANAGER.addEventListener(EVENT_MANAGER.EVENTS.PRONOUNCE_ERROR, (detail) => {
    Messager.sendToTab(detail.tabId, "content", "pronouncing_error", detail).catch((error) =>
        log(error)
    );
});

export {
    TRANSLATOR_MANAGER,
    // translatePage,
    // youdaoPageTranslate,
    // executeYouDaoScript,
    // executeGoogleScript
};
