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

        this._createIframe();
    }

    /**
     * Create the iframe.
     */
    _createIframe() {
        this.deepLIframe = document.createElement("iframe");
        document.body.appendChild(this.deepLIframe);
        this.deepLIframe.src = this.HOME_PAGE;
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
        try {
            const result = await new Promise((resolve, reject) => {
                /**
                 * Prevent infinitely waiting for the result.
                 */
                const timeoutId = setTimeout(() => {
                    reject({ status: 408, errorMsg: "Request timeout!" });
                }, 10000);

                /**
                 * Wait for the iframe to send back translate result.
                 *
                 * @param {MessageEvent} msg message
                 */
                const listener = (msg) => {
                    if (!msg.data.type || msg.data.type !== "edge_translate_deepl_response") return;

                    window.removeEventListener("message", listener);
                    clearTimeout(timeoutId);

                    if (msg.data.status === 200) resolve(msg.data.result);
                    else reject(msg.data);
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
                        )}/${this.LAN_TO_CODE.get(to)}/${encodeURIComponent(
                            text.replaceAll("/", "\\/") // Escape '/', or the text will be truncated at the first '/'.
                        )}`,
                    },
                    this.HOME_PAGE
                );
            });

            return { mainMeaning: result, originalText: text };
        } catch (error) {
            /**
             * Status 408 means we can not communicate with the iframe. Thus we have to recreate it.
             */
            if (error.status === 408) {
                document.body.removeChild(this.deepLIframe);
                this.deepLIframe = null;
                this._createIframe();
            }

            error.errorCode = error.status || 0;
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
