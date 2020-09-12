import BAIDU from "./baidu.js";
import BING from "./bing.js";
import GOOGLE from "./google.js";
import TENCENT from "./tencent.js";
import { log } from "../../../common/scripts/common.js";

class TranslatorProxy {
    constructor() {
        /**
         * Supported translators.
         */
        this.TRANSLATORS = {
            BaiduTranslate: BAIDU,
            BingTranslate: BING,
            GoogleTranslate: GOOGLE,
            TencentTranslate: TENCENT
        };

        /**
         * Translate config.
         */
        this.CONFIG = {};
        this.SINGLE = "HybridTranslate";
        this.MAIN_TRANSLATOR = "GoogleTranslate";

        /**
         * Update config cache on config changed.
         */
        chrome.storage.onChanged.addListener(
            ((changes, area) => {
                if (area === "sync" && changes["TranslatorConfig"]) {
                    this.CONFIG = changes["TranslatorConfig"].newValue;
                    this.SINGLE = this.CONFIG.single;
                    this.MAIN_TRANSLATOR = this.CONFIG.selections.mainMeaning;
                }
            }).bind(this)
        );
    }

    /**
     * Load hybrid translate config if it is not loaded.
     *
     * @returns {Promise<void>} loading Promise.
     */
    loadConfigIfNotLoaded() {
        return new Promise((resolve, reject) => {
            if (!(this.CONFIG.translators && this.CONFIG.selections)) {
                chrome.storage.sync.get("TranslatorConfig", res => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                        return;
                    }

                    this.CONFIG = res.TranslatorConfig;
                    this.MAIN_TRANSLATOR = this.CONFIG.selections.mainMeaning;
                    resolve();
                });
            } else resolve();
        });
    }

    /**
     * Get translators that support given source language and target language.
     *
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Array<String>} available translators
     */
    getAvailableTranslatorsFor(from, to) {
        let translators = [];
        for (let translator in this.TRANSLATORS) {
            let languages = this.TRANSLATORS[translator].supportedLanguages();
            if (languages.has(from) && languages.has(to)) {
                translators.push(translator);
            }
        }
        return translators.sort();
    }

    /**
     * Update translator config when language setting changed.
     *
     * @param {Object} detail language setting detail, detail.from is the new source language and detail.to is the new target language.
     *
     * @returns {Promise<Object>} new config Promise
     */
    async updateConfigFor(detail) {
        // Load config if not loaded.
        await this.loadConfigIfNotLoaded();

        let newConfig = { single: this.CONFIG.single, translators: new Set(), selections: {} };

        // Get translators that support new language setting.
        let availableTranslators = this.getAvailableTranslatorsFor(detail.from, detail.to);

        // Replace translators that don't support new language setting with a default translator.
        let defaultTranslator = availableTranslators[0];

        // Use this set to check if a translator in the old config should be replaced.
        let availableTranslatorSet = new Set(availableTranslators);

        // Update config.single.
        if (!availableTranslatorSet.has(newConfig.single)) {
            newConfig.single = defaultTranslator;
        }

        for (let item in this.CONFIG.selections) {
            let newTranslator,
                oldTranslator = this.CONFIG.selections[item];

            if (availableTranslatorSet.has(oldTranslator)) {
                newConfig.selections[item] = oldTranslator;
                newTranslator = oldTranslator;
            } else {
                newConfig.selections[item] = defaultTranslator;
                newTranslator = defaultTranslator;
            }

            newConfig.translators.add(newTranslator);
        }

        // Update used translator set.
        newConfig.translators = Array.from(newConfig.translators);

        // Update config.
        chrome.storage.sync.set({ TranslatorConfig: newConfig });

        // Provide new config.
        return Promise.resolve(newConfig);
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text
     *
     * @returns {Promise<String>} Promise of language of given text
     */
    detect(text) {
        if (this.SINGLE !== "HybridTranslate") {
            return this.TRANSLATORS[this.SINGLE].detect(text);
        }

        return this.TRANSLATORS[this.MAIN_TRANSLATOR].detect(text);
    }

    /**
     * Hybrid translator.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} result Promise
     */
    async translate(text, from, to) {
        if (this.SINGLE !== "HybridTranslate") {
            return this.TRANSLATORS[this.SINGLE].translate(text, from, to);
        }

        /**
         * Check config firstly.
         */
        await this.loadConfigIfNotLoaded();

        return new Promise((resolve, reject) => {
            let count = 0;
            let results = {};
            let config = this.CONFIG;
            /**
             * Receive results from different translators.
             *
             * This function will be called for several times to collect all results from
             * selected translators.
             *
             * @param {String} translator translator used
             * @param {Object} result result from the translator
             *
             * @returns {void} nothing
             */
            let receive = (translator, result) => {
                count++;
                results[translator] = result;

                // Check if all results have been collected.
                if (count >= config.translators.length) {
                    let translation = {};
                    for (let item in config.selections) {
                        try {
                            let selectedTranslator = config.selections[item];
                            translation[item] = results[selectedTranslator][item];
                        } catch (error) {
                            log(item + " " + config.selections[item]);
                            log(error);
                        }
                    }
                    resolve(translation);
                }
            };

            // Initiate translation requests.
            let errorEncountered = false;
            for (let translator of config.translators) {
                // Break if error encountered.
                if (errorEncountered) break;

                // Translate with a translator.
                this.TRANSLATORS[translator]
                    .translate(text, from, to)
                    .then(result => receive(translator, result))
                    .catch(error => {
                        errorEncountered = true;
                        reject(error);
                    });
            }
        });
    }

    /**
     * Pronounce given text.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed "fast" or "slow"
     *
     * @returns {Promise<void>} pronounce finished
     */
    pronounce(text, language, speed) {
        if (this.SINGLE !== "HybridTranslate") {
            return this.TRANSLATORS[this.SINGLE].pronounce(text, language, speed);
        }

        return this.TRANSLATORS[this.MAIN_TRANSLATOR].pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        if (this.SINGLE !== "HybridTranslate") {
            return this.TRANSLATORS[this.SINGLE].stopPronounce();
        }

        this.TRANSLATORS[this.MAIN_TRANSLATOR].stopPronounce();
    }
}

/**
 * Create and export default translator instance.
 */
const TRANSLATOR = new TranslatorProxy();
export default TRANSLATOR;
