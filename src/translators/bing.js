import axios from "axios";

/**
 * Supported languages.
 */
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
     * Parse translate interface result.
     *
     * @param {Object} result translate result
     *
     * @returns {Object} Parsed result
     */
    parseTranslateResult(result, extras) {
        let parsed = extras || new Object();

        try {
            let translations = result[0].translations;
            parsed.mainMeaning = translations[0].text;
            parsed.tPronunciation = translations[0].transliteration.text;
            // eslint-disable-next-line no-empty
        } catch (error) {}

        return parsed;
    }

    /**
     * Parse the lookup interface result.
     *
     * @param {Object} result lookup result
     *
     * @returns {Object} Parsed result
     */
    parseLookupResult(result, extras) {
        let parsed = extras || new Object();

        try {
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
            // eslint-disable-next-line no-empty
        } catch (error) {}

        return parsed;
    }

    /**
     * Request APIs.
     *
     * @param {String} method method to use
     * @param {String} url url to request
     * @param {String} data data to send
     * @param {Boolean} retry whether retry is needed
     *
     * @returns {Promise<Object>} Promise of response data
     */
    async request(method, url, data, retry = true) {
        let retryCount = 0;
        let requestOnce = () => {
            return new Promise((resolve, reject) => {
                this.count++;
                axios({
                    url: url,
                    method: method,
                    baseURL: this.HOST,
                    headers: this.HEADERS,
                    data: data
                })
                    .then(response => {
                        // response.data.statusCode will indicate the info of error when error encountered
                        if (response.data.statusCode) {
                            // Retry after failure
                            if (retry && retryCount < this.MAX_RETRY) {
                                retryCount++;
                                resolve(this.getIGIID().then(requestOnce));
                            } else {
                                reject({ response: response });
                            }
                        } else {
                            resolve(response.data);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        };

        if (!(this.IG && this.IG.length > 0 && this.IID && this.IID.length > 0)) {
            await this.getIGIID();
        }

        return requestOnce();
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
    detect(text) {
        let url =
                "ttranslatev3?isVertical=1&IG=" +
                this.IG +
                "&IID=" +
                this.IID +
                "." +
                this.count.toString(),
            data = "&fromLang=auto-detect&to=zh-Hans&text=" + encodeURIComponent(text);

        return (
            this.request("POST", url, data)
                .then(response => {
                    let result = response[0].detectedLanguage.language;
                    return this.CODE_TO_LAN.get(result);
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error))
        );
    }

    /**
     * Translate given text.
     *
     * This method will request the translate API firstly with 2 purposes:
     *     1. detect the language of the translating text
     *     2. get a basic translation of the text incase lookup is not available
     *
     * After that, it will attempt to request the lookup API to get detailed translation.
     * If that failed, the method will use the translation from the translate API instead.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} translation Promise
     */
    translate(text, from, to) {
        let translateURL =
                "ttranslatev3?isVertical=1&IG=" +
                this.IG +
                "&IID=" +
                this.IID +
                "." +
                this.count.toString(),
            translateData =
                "&fromLang=" +
                this.LAN_TO_CODE.get(from) +
                "&to=" +
                this.LAN_TO_CODE.get(to) +
                "&text=" +
                encodeURIComponent(text);

        return (
            // Request the translate API firstly.
            this.request("POST", translateURL, translateData)
                .then(async transResponse => {
                    let lookupURL =
                            "tlookupv3?isVertical=1&IG=" +
                            this.IG +
                            "&IID=" +
                            this.IID +
                            "." +
                            this.count.toString(),
                        lookupData =
                            "&from=" +
                            // Use detected language.
                            transResponse[0].detectedLanguage.language +
                            "&to=" +
                            this.LAN_TO_CODE.get(to) +
                            "&text=" +
                            encodeURIComponent(text);

                    let transResult = this.parseTranslateResult(transResponse, {
                        originalText: text
                    });

                    try {
                        // Attempt to request the lookup API for detailed translation.
                        const lookupResponse = await this.request(
                            "POST",
                            lookupURL,
                            lookupData,
                            false
                        );
                        return this.parseLookupResult(lookupResponse, transResult);
                    } catch (e) {
                        return transResult;
                    }
                })
                // eslint-disable-next-line no-console
                .catch(error => console.log(error))
        );
    }
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new BingTranslator();
export default TRANSLATOR;
