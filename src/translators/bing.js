import axios from "axios";

/**
 * Max retry times after failure.
 */
const MAX_RETRY = 3;

/**
 * URLs
 */
const HOST = "https://cn.bing.com/";
const HOME_PAGE = "https://cn.bing.com/translator";

/**
 * Request headers
 */
const HEADERS = {
    // eslint-disable-next-line
    accept: "*/*",
    "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded"
};

/**
 * Bing translator interface.
 */
class BingTranslator {
    constructor() {
        this.IG = "";
        this.IID = "";
        this.languages = {};
        this.HTMLParser = new DOMParser();
    }

    /**
     * Get IG and IID for urls.
     *
     * @returns {Promise} IG and IID Promise
     */
    getIGIID() {
        return new Promise((resolve, reject) => {
            axios
                .get(HOME_PAGE)
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
     * Detect language of given text.
     *
     * @param {String} text text to detect
     * @returns {Promise} detected language Promise
     */
    detect(text) {
        let retryCount = 0;
        let detectOnce = () => {
            return new Promise((resolve, reject) => {
                axios({
                    url: "ttranslatev3?isVertical=1&IG=" + this.IG + "&IID=" + this.IID,
                    method: "POST",
                    baseURL: HOST,
                    headers: HEADERS,
                    data: "&fromLang=auto-detect&to=zh-Hans&text=" + text,
                    timeout: 5000
                })
                    .then(response => {
                        try {
                            // let result = response.data[0].detectedLanguage.language;
                            resolve(response);
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < MAX_RETRY) {
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
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @returns {Promise} translate result Promise
     */
    translate(text, from, to) {
        let retryCount = 0;
        let translateOnce = () => {
            return new Promise((resolve, reject) => {
                axios({
                    url: "tlookupv3?isVertical=1&IG=" + this.IG + "&IID=" + this.IID,
                    method: "post",
                    baseURL: HOST,
                    headers: HEADERS,
                    data: "&from=" + from + "&to=" + to + "&text=" + text,
                    timeout: 5000
                })
                    .then(response => {
                        try {
                            let result = this.parseResult(response.data);
                            resolve(result);
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < MAX_RETRY) {
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
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new BingTranslator();
export default TRANSLATOR;
