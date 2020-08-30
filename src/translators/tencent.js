import axios from "axios";

/**
 * Supported languages.
 */
const LANGUAGES = [
    ["auto", "auto"],
    ["zh-CN", "zh"],
    ["zh-TW", "zh"],
    ["en", "en"],
    ["jp", "jp"],
    ["ko", "kr"],
    ["fr", "fr"],
    ["es", "es"],
    ["it", "it"],
    ["de", "de"],
    ["tr", "tr"],
    ["ru", "ru"],
    ["pt", "pt"],
    ["vi", "vi"],
    ["id", "id"],
    ["th", "th"],
    ["ms", "ms"],
    ["ar", "ar"],
    ["hi", "hi"]
];

class TencentTranslator {
    constructor() {
        /**
         * Max retry times.
         */
        this.MAX_RETRY = 1;

        /**
         * Request tokens
         */
        this.qtk = "";
        this.qtv = "";

        /**
         * Base url.
         */
        this.BASE_URL = "https://fanyi.qq.com";

        /**
         * Request headers.
         */
        this.HEADERS = {
            // Origin: "chrome-extension://kkmljocnkcefhhmocbomoccadpalmhho"
            Origin: this.BASE_URL
        };

        /**
         * Language to translator language code.
         */
        this.LAN_TO_CODE = new Map(LANGUAGES);

        /**
         * Translator language code to language.
         */
        this.CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));
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
     * Update request tokens.
     *
     * @returns {Promise<void>} request Promise.
     */
    async updateTokens() {
        if (this.qtk === "" || this.qtv === "") {
            const response = await axios({
                method: "GET",
                baseURL: this.BASE_URL,
                headers: this.HEADERS
            });

            this.qtv = response.data.match(/qtv\s*=\s*"([a-zA-Z0-9]+)";/)[1];
            this.qtk = response.data.match(/qtk\s*=\s*"([^\s]+)";/)[1];
        } else {
            const response = await axios({
                method: "POST",
                baseURL: this.BASE_URL,
                url: "/api/reAuth",
                headers: this.HEADERS,
                data: new URLSearchParams({
                    qtv: this.qtv,
                    qtk: this.qtk
                })
            });

            this.qtv = response.data.qtv;
            this.qtk = response.data.qtk;
        }
    }

    /**
     * Parse Google translate result.
     *
     * @param {Object} response Google translate response
     *
     * @returns {Object} parsed result
     */
    parseResult(response) {
        return response;
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
    translate(text, from, to) {
        let retryCount = 0;
        let translateOnce = () => {
            return new Promise((resolve, reject) => {
                axios({
                    method: "POST",
                    baseURL: this.BASE_URL,
                    url: "/api/translate",
                    headers: this.HEADERS,
                    data: new URLSearchParams({
                        source: this.LAN_TO_CODE.get(from),
                        target: this.LAN_TO_CODE.get(to),
                        sourceText: text,
                        qtv: this.qtv,
                        qtk: this.qtk,
                        sessionUuid: "translate_uuid" + new Date().getTime()
                    })
                })
                    .then(response => {
                        if (response.status === 200 && response.data.dict) {
                            let result = this.parseResult(response.data);
                            resolve(result);
                        } else if (retryCount < this.MAX_RETRY) {
                            retryCount++;
                            resolve(this.updateTokens().then(translateOnce));
                        } else reject(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        return translateOnce();
    }
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new TencentTranslator();
export default TRANSLATOR;
