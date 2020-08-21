import axios from "axios";

const LANGUAGES = [
    ["auto", "auto-detect"],
    ["ar", "ar"],
    ["ga", "ga"],
    ["et", "et"],
    ["or", "or"],
    ["bg", "bg"],
    ["is", "is"],
    ["pl", "pl"],
    ["bs", "bs-Latn"],
    ["fa", "fa"],
    ["prs", "prs"],
    ["da", "da"],
    ["de", "de"],
    ["ru", "ru"],
    ["fr", "fr"],
    ["zh-TW", "zh-Hant"],
    ["fil", "fil"],
    ["fj", "fj"],
    ["fi", "fi"],
    ["gu", "gu"],
    ["kk", "kk"],
    ["ht", "ht"],
    ["ko", "ko"],
    ["nl", "nl"],
    ["ca", "ca"],
    ["zh-CN", "zh-Hans"],
    ["cs", "cs"],
    ["kn", "kn"],
    ["otq", "otq"],
    ["tlh", "tlh"],
    ["hr", "hr"],
    ["lv", "lv"],
    ["lt", "lt"],
    ["ro", "ro"],
    ["mg", "mg"],
    ["mt", "mt"],
    ["mr", "mr"],
    ["ml", "ml"],
    ["ms", "ms"],
    ["mi", "mi"],
    ["bn", "bn-BD"],
    ["hmn", "mww"],
    ["af", "af"],
    ["ma", "pa"],
    ["pt", "pt"],
    ["pt-pt", "pt-pt"],
    ["ps", "ps"],
    ["ja", "ja"],
    ["sv", "sv"],
    ["sm", "sm"],
    ["sr-Latn", "sr-Latn"],
    ["sr-Cyrl", "sr-Cyrl"],
    ["no", "nb"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["sw", "sw"],
    ["ty", "ty"],
    ["te", "te"],
    ["ta", "ta"],
    ["th", "th"],
    ["to", "to"],
    ["tr", "tr"],
    ["cy", "cy"],
    ["ur", "ur"],
    ["uk", "uk"],
    ["es", "es"],
    ["he", "iw"],
    ["el", "el"],
    ["hu", "hu"],
    ["it", "it"],
    ["hi", "hi"],
    ["id", "id"],
    ["en", "en"],
    ["yua", "yua"],
    ["yue", "yua"],
    ["vi", "vi"],
    ["ku", "ku"],
    ["kmr", "kmr"]
];

/**
 * Bing translator interface.
 */
class BingTranslator {
    constructor() {
        this.IG = "";
        this.IID = "";
        this.count = 0;
        this.languages = {};
        this.HTMLParser = new DOMParser();

        /**
         * Max retry times.
         */
        this.MAX_RETRY = 1;

        /**
         * Translate API host.
         */
        this.HOST = "https://cn.bing.com/";

        /**
         * Translate API home page.
         */
        this.HOME_PAGE = "https://cn.bing.com/translator";

        /**
         * Request headers.
         */
        this.HEADERS = {
            accept: "*/*",
            "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded"
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
     * Get IG and IID for urls.
     *
     * @returns {Promise} IG and IID Promise
     */
    getIGIID() {
        return new Promise((resolve, reject) => {
            axios
                .get(this.HOME_PAGE)
                .then(response => {
                    this.IG = response.data.match(/IG:"([a-zA-Z0-9]+)"/)[1];

                    let html = this.HTMLParser.parseFromString(response.data, "text/html");
                    this.IID = html.getElementById("rich_tta").getAttribute("data-iid");

                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * Parse the translate result.
     *
     * @param {Object} result translate result
     * @returns {Object} Parsed result
     */
    parseResult(result) {
        let parsed = new Object();
        parsed.originalText = result[0].displaySource;

        let translations = result[0].translations;
        parsed.mainMeaning = translations[0].displayTarget;

        let detailedMeanings = [];
        for (let i in translations) {
            let synonyms = [];
            for (let j in translations[i].backTranslations) {
                synonyms.push(translations[i].backTranslations[j].displayText);
            }

            detailedMeanings.push({
                pos: translations[i].posTag,
                meaning: translations[i].displayTarget,
                synonyms: synonyms
            });
        }

        parsed.detailedMeanings = detailedMeanings;
        return parsed;
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
     * @returns {Promise} detected language Promise
     */
    detect(text) {
        let retryCount = 0;
        let detectOnce = () => {
            return new Promise((resolve, reject) => {
                this.count++;
                axios({
                    url:
                        "ttranslatev3?isVertical=1&IG=" +
                        this.IG +
                        "&IID=" +
                        this.IID +
                        "." +
                        this.count.toString(),
                    method: "POST",
                    baseURL: this.HOST,
                    headers: this.HEADERS,
                    data: "&fromLang=auto-detect&to=zh-Hans&text=" + encodeURIComponent(text)
                })
                    .then(response => {
                        try {
                            let result = response.data[0].detectedLanguage.language;
                            resolve(this.CODE_TO_LAN.get(result));
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < this.MAX_RETRY) {
                                retryCount++;
                                resolve(this.getIGIID().then(detectOnce));
                            } else reject(error);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        if (this.IG && this.IG.length > 0 && this.IID && this.IID.length > 0) {
            return detectOnce();
        } else {
            return this.getIGIID().then(detectOnce);
        }
    }

    /**
     * Translate given text using given language settings.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @returns {Promise} translate result Promise
     */
    translateImmediately(text, from, to) {
        let retryCount = 0;
        let translateOnce = () => {
            return new Promise((resolve, reject) => {
                this.count++;
                axios({
                    url:
                        "tlookupv3?isVertical=1&IG=" +
                        this.IG +
                        "&IID=" +
                        this.IID +
                        "." +
                        this.count.toString(),
                    method: "post",
                    baseURL: this.HOST,
                    headers: this.HEADERS,
                    data:
                        "&from=" +
                        this.LAN_TO_CODE.get(from) +
                        "&to=" +
                        this.LAN_TO_CODE.get(to) +
                        "&text=" +
                        encodeURIComponent(text)
                })
                    .then(response => {
                        try {
                            let result = this.parseResult(response.data);
                            resolve(result);
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < this.MAX_RETRY) {
                                retryCount++;
                                resolve(this.getIGIID().then(translateOnce));
                            } else reject(error);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        if (this.IG && this.IG.length > 0 && this.IID && this.IID.length > 0) {
            return translateOnce();
        } else {
            return this.getIGIID().then(translateOnce);
        }
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @returns {Promise} translate result Promise
     */
    translate(text, from, to) {
        if (from !== "auto") {
            return this.translateImmediately(text, from, to);
        }

        return this.detect(text).then(result => this.translateImmediately(text, result, to));
    }
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new BingTranslator();
export default TRANSLATOR;
