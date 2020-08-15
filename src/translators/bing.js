export default TRANSLATOR;

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
    "accept": "*/*",
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
     * @param {Function} callback Callback
     */
    getIGIID(callback) {
        let request = new XMLHttpRequest();
        request.open("GET", HOME_PAGE, true);
        request.send();
        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    this.IG = request.responseText.match(/IG:"([a-zA-Z0-9]+)"/)[1];

                    let html = this.HTMLParser.parseFromString(request.responseText, "text/html");
                    this.IID = html.getElementById("rich_tta").getAttribute("data-iid");

                    callback();
                }
            }
        };
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
     * Detect language of given te4xt.
     *
     * @param {String} text text to detect
     * @param {Function} callback callback
     */
    detect(text, callback) {
        let retryCount = 0;
        let innerFunc = () => {
            let request = new XMLHttpRequest();
            let path = "ttranslatev3?isVertical=1&IG=" + this.IG + "&IID=" + this.IID;

            request.open("POST", HOST + path);
            for (let key in HEADERS) {
                request.setRequestHeader(key, HEADERS[key]);
            }
            request.send("&fromLang=auto-detect&to=zh-Hans&text=" + text);

            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        try {
                            let result = JSON.parse(request.response)[0].detectedLanguage.language;
                            callback(result);
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < MAX_RETRY) {
                                this.getIGIID(innerFunc);
                                retryCount++;
                            }
                        }
                    }
                }
            };
        };

        if (IG && IG.length > 0 && IID && IID.length > 0) {
            innerFunc();
        } else {
            this.getIGIID(innerFunc);
        }
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     * @param {Function} callback callback
     */
    translate(text, from, to, callback) {
        let retryCount = 0;
        let innerFunc = () => {
            let request = new XMLHttpRequest();
            let path = "tlookupv3?isVertical=1&IG=" + this.IG + "&IID=" + this.IID;

            request.open("POST", HOST + path);
            for (let key in HEADERS) {
                request.setRequestHeader(key, HEADERS[key]);
            }
            request.send("&from=" + from + "&to=" + to + "&text=" + text);

            request.onreadystatechange = () => {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        try {
                            let result = this.parseResult(JSON.parse(request.response));
                            callback(result);
                        } catch (error) {
                            // Retry after failure
                            if (retryCount < MAX_RETRY) {
                                this.getIGIID(innerFunc);
                                retryCount++;
                            }
                        }
                    }
                }
            };
        };

        if (this.IG && this.IG.length > 0 && this.IID && this.IID.length > 0) {
            innerFunc();
        } else {
            this.getIGIID(innerFunc);
        }
    }
}


/**
 * Create default translator object.
 */
const TRANSLATOR = new BingTranslator();
