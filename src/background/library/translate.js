import axios from "./axios.js";
import HybridTranslator from "./translators/hybrid.js";
import { log } from "../../common/scripts/common.js";
import { promiseTabs, delayPromise } from "../../common/scripts/promise.js";

// Imported for auto code completion.
// eslint-disable-next-line no-unused-vars
import Channel from "../../common/scripts/channel.js";

class TranslatorManager {
    constructor(channel) {
        /**
         * @type {Channel} Communication channel.
         */
        this.channel = channel;

        /**
         * Hybrid translator.
         */
        this.HYBRID_TRANSLATOR = new HybridTranslator(channel);

        /**
         * Supported translators.
         */
        this.TRANSLATORS = {
            HybridTranslate: this.HYBRID_TRANSLATOR,
            ...this.HYBRID_TRANSLATOR.REAL_TRANSLATORS,
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
         * Default TTS speed.
         */
        this.TTS_SPEED = "fast";

        /**
         * Start to provide services and listen to event.
         */
        this.provideServices();
        this.listenToEvents();
    }

    /**
     * Register service providers.
     *
     * This should be called for only once!
     */
    provideServices() {
        // Translate service.
        this.channel.provide("translate", (params) => this.translate(params.text, params.position));

        // Pronounce service.
        this.channel.provide("pronounce", (params) => {
            let speed = params.speed;
            if (!speed) {
                speed = this.TTS_SPEED;
                this.TTS_SPEED = speed === "fast" ? "slow" : "fast";
            }

            return this.pronounce(params.pronouncing, params.text, params.language, speed);
        });

        // Youdao page translate data loading service.
        this.channel.provide("youdao_page_translate", youdaoPageTranslate);

        // Get available translators service.
        this.channel.provide("get_available_translators", this.getAvailableTranslators.bind(this));

        // Update default translator service.
        this.channel.provide("update_default_translator", this.updateDefaultTranslator.bind(this));
    }

    /**
     * Register event listeners.
     *
     * This should be called for only once!
     */
    listenToEvents() {
        // Youdao page translate button clicked event.
        this.channel.on("translate_page_youdao", executeYouDaoScript);

        // Google page translate button clicked event.
        this.channel.on("translate_page_google", executeGoogleScript);

        // Language setting updated event.
        this.channel.on("language_setting_update", this.onLanguageSettingUpdated.bind(this));

        // Result frame closed event.
        this.on("frame_closed", this.stopPronounce.bind(this));

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
        await this.channel.requestToTab(tabId, "check_availability").catch(async () => {
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

        // Inform current tab translating started.
        this.channel.emitToTabs(currentTabId, "start_translating", {
            text,
            position,
            timestamp,
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

            // Send translating result to current tab.
            this.channel.emitToTabs(currentTabId, "translating_finished", {
                timestamp,
                ...result,
            });
        } catch (error) {
            // Inform current tab translating failed.
            this.channel.emitToTabs(currentTabId, "translating_error", {
                error,
                timestamp,
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

        // Inform current tab pronouncing started.
        this.channel.emitToTabs(currentTabId, "start_pronouncing", {
            pronouncing,
            text,
            language,
            timestamp,
        });

        try {
            if (language == "auto") {
                lang = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
            }

            await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].pronounce(text, lang, speed);

            // Inform current tab pronouncing finished.
            this.channel.emitToTabs(currentTabId, "pronouncing_finished", {
                pronouncing,
                text,
                language,
                timestamp,
            });
        } catch (error) {
            // Inform current tab pronouncing failed.
            this.channel.emitToTabs(currentTabId, "pronouncing_error", {
                pronouncing,
                error,
                timestamp,
            });
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
            this.HYBRID_TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
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
        let newConfig = await this.HYBRID_TRANSLATOR.updateConfigFor(detail.from, detail.to);

        // If current default translator does not support new language setting, update it.
        if (!new Set(availableTranslators).has(selectedTranslator)) {
            selectedTranslator = availableTranslators[1];
            chrome.storage.sync.set({ DefaultTranslator: selectedTranslator });
        }

        // Inform options page to update options.
        this.channel.emit("hybrid_translator_config_updated", {
            config: newConfig,
            availableTranslators: availableTranslators.slice(1),
        });

        // Inform result frame to update options.
        promiseTabs.query({ active: true, currentWindow: true }).then((tabs) =>
            this.channel.emitToTabs(tabs[0].id, "update_translator_options", {
                selectedTranslator,
                availableTranslators,
            })
        );
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

/**
 * 使用用户选定的网页翻译引擎翻译当前网页。
 */
function translatePage() {
    chrome.storage.sync.get(["DefaultPageTranslator"], (result) => {
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
        data: isPost ? request.data : null,
    });

    return {
        response: response.status === 200 ? JSON.stringify(response.data) : null,
        index: request.index,
    };
}

/**
 * 执行有道网页翻译相关脚本
 */
function executeYouDaoScript() {
    chrome.tabs.executeScript({ file: "/youdao/main.js" }, (result) => {
        if (chrome.runtime.lastError) {
            log(`Chrome runtime error: ${chrome.runtime.lastError}`);
            log(`Detail: ${result}`);
        }
    });
}

/**
 * 执行谷歌网页翻译相关脚本。
 */
function executeGoogleScript() {
    chrome.tabs.executeScript({ file: "/google/init.js" }, (result) => {
        if (chrome.runtime.lastError) {
            log(`Chrome runtime error: ${chrome.runtime.lastError}`);
            log(`Detail: ${result}`);
        }
    });
}

export {
    TranslatorManager,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript,
};
