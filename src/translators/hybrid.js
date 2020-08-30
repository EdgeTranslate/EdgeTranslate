import BAIDU from "./baidu.js";
import BING from "./bing.js";
import GOOGLE from "./google.js";

class HybridTranslator {
    constructor() {
        /**
         * Supported translators.
         */
        this.TRANSLATORS = {
            BaiduTranslate: BAIDU,
            BingTranslate: BING,
            GoogleTranslate: GOOGLE
        };

        /**
         * Translate config.
         */
        this.CONFIG = {};
        this.MAIN_TRANSLATOR = "GoogleTranslate";
        chrome.storage.onChanged.addListener(
            ((changes, area) => {
                if (area === "sync" && changes["HybridTranslateConfig"]) {
                    this.CONFIG = changes["HybridTranslateConfig"].newValue;
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
                chrome.storage.sync.get("HybridTranslateConfig", res => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                        return;
                    }

                    this.CONFIG = res.HybridTranslateConfig;
                    this.MAIN_TRANSLATOR = this.CONFIG.selections.mainMeaning;
                    resolve();
                });
            } else resolve();
        });
    }

    /**
     * Get supported languages.
     *
     * @returns {Set<String>} supported languages
     */
    supportedLanguages() {
        return this.TRANSLATORS[this.MAIN_TRANSLATOR].supportedLanguages();
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text
     *
     * @returns {Promise<String>} Promise of language of given text
     */
    detect(text) {
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
                            // eslint-disable-next-line no-console
                            console.log(item + " " + config.selections[item]);
                            // eslint-disable-next-line no-console
                            console.log(error);
                        }
                    }
                    resolve(translation);
                }
            };

            // Initiate translation requests.
            try {
                config.translators.forEach(translator => {
                    this.TRANSLATORS[translator]
                        .translate(text, from, to)
                        .then(result => receive(translator, result));
                });
            } catch (error) {
                reject(error);
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
        return this.TRANSLATORS[this.MAIN_TRANSLATOR].pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        this.TRANSLATORS[this.MAIN_TRANSLATOR].stopPronounce();
    }
}

/**
 * Create and export default translator instance.
 */
const TRANSLATOR = new HybridTranslator();
export default TRANSLATOR;
