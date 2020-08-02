/**
 * HTML parser
 */
const PARSER = new DOMParser();

/**
 * URLs
 */
const HOST = "https://cn.bing.com/";
const HOME_PAGE = "https://cn.bing.com/translator";

/**
 * Request headers
 */
const HEADERS = {
    accept: "*/*",
    "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded"
};

/**
 * Request parameters.
 */
var IG = "";
var IID = "";

/**
 * Get IG and IID for urls.
 *
 * @param {Function} callback Callback
 */
function getIGIID(callback) {
    let request = new XMLHttpRequest();
    request.open("GET", HOME_PAGE, true);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status == 200) {
                IG = request.responseText.match(/IG:"([a-zA-Z0-9]+)"/)[1];

                let html = PARSER.parseFromString(request.responseText, "text/html");
                IID = html.getElementById("rich_tta").getAttribute("data-iid");

                callback();
            }
        }
    };
}

/**
 * Parse the translate result.
 *
 * @param {Object} result translate result
 */
function parseResult(result) {
    let parsed = new Object();
    parsed.originalText = result[0].displaySource;

    let translations = result[0].translations;
    parsed.mainMeaning = translations[0].displayTarget;

    let detailedMeanings = [];
    for (i in translations) {
        let synonyms = [];
        for (j in translations[i].backTranslations) {
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
 * Translate given text.
 *
 * @param {String} text text to translate
 * @param {String} from source language
 * @param {String} to target language
 * @param {Function} callback callback
 */
function translate(text, from, to, callback) {
    var innerFunc = () => {
        let request = new XMLHttpRequest();
        let path = "tlookupv3?isVertical=1&IG=" + IG + "&IID=" + IID;

        request.open("POST", HOST + path);
        for (key in HEADERS) {
            request.setRequestHeader(key, HEADERS[key]);
        }
        request.send("&from=" + from + "&to=" + to + "&text=" + text);

        request.onreadystatechange = () => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    callback(parseResult(JSON.parse(request.response)));
                }
            }
        };
    };

    if (IG && IG.length > 0 && IID && IID.length > 0) {
        innerFunc();
    } else {
        getIGIID(innerFunc);
    }
}
