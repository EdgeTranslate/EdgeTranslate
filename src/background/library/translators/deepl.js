/**
 * Supported languages.
 */
const LANGUAGES = [
    ["auto", "auto"],
    ["bg", "bg"],
    ["et", "et"],
    ["pl", "pl"],
    ["da", "da"],
    ["de", "de"],
    ["ru", "ru"],
    ["fr", "fr"],
    ["fi", "fi"],
    ["nl", "nl"],
    ["zh-CN", "zh"],
    ["cs", "cs"],
    ["lv", "lv"],
    ["lt", "lt"],
    ["ro", "ro"],
    ["pt", "pt"],
    ["ja", "ja"],
    ["sv", "sv"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["es", "es"],
    ["el", "el"],
    ["hu", "hu"],
    ["it", "it"],
    ["en", "en"],
];

/**
 * DeepL translator interface.
 */
class DeepLTranslator {
    constructor(langDetector, TTSEngine) {
        /**
         * DeepL translate home page.
         */
        this.HOME_PAGE = "https://www.deepl.com/translator";

        /**
         * Language to translator language code.
         */
        this.LAN_TO_CODE = new Map(LANGUAGES);

        /**
         * Translator language code to language.
         */
        this.CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));

        /**
         * DeepL needs help from other translators.
         */
        this.langDetector = langDetector;
        this.TTSEngine = TTSEngine;
    }

    /**
     * Get supported languages of this API.
     *
     * @returns {Set<String>} supported languages
     */
    supportedLanguages() {
        return new Set(this.LAN_TO_CODE.keys());
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text to detect
     *
     * @returns {Promise<String>} detected language Promise
     */
    async detect(text) {
        return await this.langDetector.detect(text);
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} translation Promise
     */
    async translate(text, from, to) {
        /**
         * Create the iframe if it has not been created.
         */
        if (!this.deepLIframe) {
            this.deepLIframe = document.createElement("iframe");
            document.body.appendChild(this.deepLIframe);
            this.deepLIframe.src = this.HOME_PAGE;

            /**
             * Wait for the iframe to finish loading.
             */
            await new Promise((resolve) => {
                this.deepLIframe.onload = resolve;
            });
        }

        try {
            const result = await new Promise((resolve) => {
                /**
                 * Wait for the iframe to send back translate result.
                 *
                 * @param {MessageEvent} msg message
                 */
                const listener = (msg) => {
                    if (!msg.data.type || msg.data.type !== "edge_translate_deepl_result") return;

                    window.removeEventListener("message", listener);
                    resolve(msg.data.result);
                };
                window.addEventListener("message", listener);

                /**
                 * Request the iframe to start translating.
                 */
                this.deepLIframe.contentWindow.postMessage(
                    {
                        type: "edge_translate_deepl_request",
                        url: `${this.HOME_PAGE}#${this.LAN_TO_CODE.get(
                            from
                        )}/${this.LAN_TO_CODE.get(to)}/${encodeURIComponent(text)}`,
                    },
                    this.HOME_PAGE
                );
            });

            return { mainMeaning: result, originalText: text };
        } catch (error) {
            error.errorMsg = error.errorMsg || error.message;
            error.errorAct = {
                api: "deepl",
                action: "translate",
                text,
                from,
                to,
            };
            throw error;
        }
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
    async pronounce(text, language, speed) {
        return await this.TTSEngine.pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        this.TTSEngine.stopPronounce();
    }
}

export default DeepLTranslator;
