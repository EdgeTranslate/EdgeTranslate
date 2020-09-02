import axios from "axios";

/**
 * Supported languages.
 */
const LANGUAGES = [
    ["auto", "auto"],
    ["zh-CN", "zh"],
    ["en", "en"],
    ["ja", "jp"],
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
            // Origin: this.BASE_URL
        };

        /**
         * Language to translator language code.
         */
        this.LAN_TO_CODE = new Map(LANGUAGES);

        /**
         * Translator language code to language.
         */
        this.CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));

        /**
         * TTS audio instance.
         */
        this.AUDIO = new Audio();
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
        let result = {};
        result.originalText = response.translate.records[0].sourceText;
        result.mainMeaning = response.translate.records[0].targetText.split(/\s*\/\s*/g)[0];

        if (response.suggest && response.suggest.data && response.suggest.data.length > 0) {
            if (response.suggest.data[0].prx_ph_AmE) {
                result.sPronunciation = response.suggest.data[0].prx_ph_AmE;
            }

            if (response.suggest.data[0].examples_json) {
                result.examples = JSON.parse(response.suggest.data[0].examples_json).basic.map(
                    item => {
                        return { source: item.sourceText, target: item.targetText };
                    }
                );
            }
        }

        if (response.dict && response.dict.abstract && response.dict.abstract.length > 0) {
            result.detailedMeanings = response.dict.abstract.map(item => {
                return { pos: item.ps, meaning: item.explanation.join(", ") };
            });
        }

        return result;
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text to detect
     *
     * @returns {Promise<String>} detected language Promise
     */
    detect(text) {
        return new Promise((resolve, reject) => {
            axios({
                method: "POST",
                baseURL: this.BASE_URL,
                url: "/api/translate",
                headers: this.HEADERS,
                data: new URLSearchParams({
                    source: this.LAN_TO_CODE.get("auto"),
                    target: this.LAN_TO_CODE.get("zh-CN"),
                    sourceText: text
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        let result = response.data.translate.source;
                        resolve(this.CODE_TO_LAN.get(result));
                    } else reject(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
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
                        if (
                            response.status === 200 &&
                            (response.data.dict ||
                                (response.data.translate && retryCount >= this.MAX_RETRY))
                        ) {
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

    /**
     * Pronounce given text.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed "fast" or "slow"
     *
     * @returns {Promise<void>} pronounce finished
     */
    // eslint-disable-next-line no-unused-vars
    pronounce(text, language, speed) {
        // Pause audio in case that it's playing.
        this.stopPronounce();

        this.AUDIO.src =
            this.BASE_URL +
            "/api/tts?platform=PC_Website&lang=" +
            this.LAN_TO_CODE.get(language) +
            "&text=" +
            encodeURIComponent(text);

        return this.AUDIO.play();
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        if (!this.AUDIO.paused) {
            this.AUDIO.pause();
        }
    }
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new TencentTranslator();
export default TRANSLATOR;
