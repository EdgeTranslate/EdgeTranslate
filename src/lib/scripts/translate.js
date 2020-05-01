import { sendMessageToCurrentTab, escapeHTML } from "./common.js";

export {
    translate,
    detect,
    showTranslate,
    pronounce,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript
};

// Audio 单例对象.
const AUDIO = new Audio();

// 出现429之后的重试次数。
var RETRY = 0;
const MAX_RETRY = 3;

/**
 * 翻译接口。
 */
const HOST = "https://translate.google.cn/";

const BASE_URL = HOST + "translate_a/single?ie=UTF-8&client=webapp&otf=1&ssel=0&tsel=0&kc=5";

const BASE_TTS_URL = HOST + "translate_tts?ie=UTF-8&client=webapp";

// tk需要的密钥
var TKK = ["434217", "1534559001"];

/* eslint-disable */
function generateTK(a, b, c) {
    b = Number(b) || 0;
    let e = [];
    let f = 0;
    let g = 0;
    for (; g < a.length; g++) {
        let l = a.charCodeAt(g);
        128 > l
            ? (e[f++] = l)
            : (2048 > l
                  ? (e[f++] = (l >> 6) | 192)
                  : (55296 == (l & 64512) &&
                    g + 1 < a.length &&
                    56320 == (a.charCodeAt(g + 1) & 64512)
                        ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                          (e[f++] = (l >> 18) | 240),
                          (e[f++] = ((l >> 12) & 63) | 128))
                        : (e[f++] = (l >> 12) | 224),
                    (e[f++] = ((l >> 6) & 63) | 128)),
              (e[f++] = (l & 63) | 128));
    }
    a = b;
    for (f = 0; f < e.length; f++) {
        (a += e[f]), (a = _magic(a, "+-a^+6"));
    }
    a = _magic(a, "+-3^+b+-f");
    a ^= Number(c) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1e6;
    return a.toString() + "." + (a ^ b);
}

function _magic(a, b) {
    for (var c = 0; c < b.length - 2; c += 3) {
        var d = b.charAt(c + 2),
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
        a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
    }
    return a;
}
/* eslint-enable */

/**
 * 更新TKK
 */
function updateTKK() {
    let request = new XMLHttpRequest();
    request.open("GET", HOST, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                let body = request.responseText;
                let tkk = (body.match(/TKK=(.*?)\(\)\)'\);/i) || [""])[0]
                    .replace(/\\x([0-9A-Fa-f]{2})/g, "") // remove hex chars
                    .match(/[+-]?\d+/g);
                if (tkk) {
                    TKK[0] = Number(tkk[2]);
                    TKK[1] = Number(tkk[0]) + Number(tkk[1]);
                } else {
                    tkk = body.match(/TKK[=:]['"](\d+?)\.(\d+?)['"]/i);
                    if (tkk) {
                        TKK[0] = Number(tkk[1]);
                        TKK[1] = Number(tkk[2]);
                    }
                }
            }
        }
    };
}

/**
 *
 * This is a translation client function
 * 1. get language settings
 * 2. if source language is "auto", use normal translation mode
 * 3. else use mutual translation mode(auto translate from both sides)
 * 4. send request, get result and execute callback(result)
 *
 * @param {String} text original text to be translated
 * @param {Function(Object)} callback Used to get translation results after translation
 */
function translate(text, callback) {
    // Start showing loading animation.
    sendMessageToCurrentTab({
        type: "info",
        info: "start_translating"
    });

    // get language settings from chrome storage
    chrome.storage.sync.get(["languageSetting", "OtherSettings"], result => {
        var OtherSettings = result.OtherSettings;
        var languageSetting = result.languageSetting;
        if (languageSetting.sl === "auto" || !OtherSettings.MutualTranslate) {
            // normal translation mode
            textTranslate(languageSetting.sl, languageSetting.tl, text, callback);
        } else {
            // Mutual translation mode
            detect(text, result => {
                let sl = result.toLowerCase(),
                    tl;
                switch (sl) {
                    case languageSetting.sl:
                        tl = languageSetting.tl;
                        break;
                    case languageSetting.tl:
                        tl = languageSetting.sl;
                        break;
                    default:
                        sl = "auto";
                        tl = languageSetting.tl;
                }
                textTranslate(sl, tl, text, callback);
            });
        }
    });
}

/**
 *
 * 此函数负责根据传入的源目标语言设定,将传入的文本翻译，并在当前页面的侧边栏中展示
 *
 * @param {String} text 需要翻译的文本字符串
 * @param {Function} callback 完成翻译后用以获取翻译结果
 */
function textTranslate(sourceLanguage, targetLanguage, text, callback) {
    var query = "sl=" + sourceLanguage + "&tl=" + targetLanguage;

    // 获取翻译参数设定。
    chrome.storage.sync.get("DTSetting", function(result) {
        let DTSetting = result.DTSetting;

        DTSetting.forEach(element => {
            query = query + "&dt=" + element;
        });

        query += "&tk=" + generateTK(text, TKK[0], TKK[1]);
        query += "&q=" + encodeURIComponent(text);

        let request = new XMLHttpRequest();
        request.open("GET", BASE_URL + "&" + query, true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                // HTTPS request successfully
                if (request.status === 200) {
                    callback(
                        parseTranslate(JSON.parse(request.response), {
                            targetLanguage: targetLanguage
                        })
                    );
                    return;
                }

                // 429错误，需要更新TKK。
                if (request.status === 429) {
                    updateTKK();
                    if (RETRY < MAX_RETRY) {
                        RETRY++;
                        textTranslate(sourceLanguage, targetLanguage, text, callback);
                        return;
                    } else {
                        RETRY = 0;
                    }
                }

                // HTTPS request fail
                sendMessageToCurrentTab({
                    type: "info",
                    info: "network_error",
                    detail: request.status
                });
            }
        };
    });
}

/**
 *
 * 检测给定文本的语言。
 *
 * @param {string} text 需要检测的文本
 * @param {function} callback 回调函数，参数为检测结果
 */
function detect(text, callback) {
    // 使用不带dt参数的翻译接口进行语言检测
    let query = "sl=auto&tl=zh-cn";
    query += "&tk=" + generateTK(text, TKK[0], TKK[1]);
    query += "&q=" + encodeURIComponent(text);

    let request = new XMLHttpRequest();
    request.open("GET", BASE_URL + "&" + query, true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            // HTTPS request 成功
            if (request.status === 200) {
                callback(JSON.parse(request.response)[2]);
                return;
            }

            // 429错误，需要更新TKK。
            if (request.status === 429) {
                updateTKK();
                if (RETRY < MAX_RETRY) {
                    RETRY++;
                    detect(text, callback);
                    return;
                } else {
                    RETRY = 0;
                }
            }

            // HTTPS request 失败
            sendMessageToCurrentTab({
                type: "info",
                info: "network_error",
                detail: request.status
            });
        }
    };
}

/**
 * <p>解析谷歌翻译返回的结果。解析结果结构如下：</p>
 *
 * <pre>
 *     result = {
 *         "mainMeaning": <字符串，单词的主要意思，句子的最可能的意思>,
 *         "TPhoneticSymbol": <字符串，翻译结果的音标>
 *         "SPhoneticSymbol": <字符串，原文的音标>,
 *         "originalText": <字符串，被翻译的单词或句子>,
 *         "sourceLanguage": <字符串，被翻译词句的源语言>,
 *         "detailedMeanings": [
 *             {
 *                 "type": <字符串，单词的词性>,
 *                 "meaning": <字符串，单词在该词性下的所有意思>
 *             }
 *         ],
 *         "commonMeanings": <字符串，单词的常见意思，句子的所有可能意思>,
 *         "synonyms": [
 *             {
 *                 "type": <字符串，单词的词性>,
 *                 "words": [
 *                     <字符串，单词在该词性下的近义词，根据意思分组>
 *                 ]
 *             }
 *         ],
 *         "definitions": [
 *             {
 *                 "type": <字符串，单词的词性>,
 *                 "meanings": [
 *                     {
 *                         "meaning": <字符串，单词的意思（英文解释）>,
 *                         "example": <字符串，例句>
 *                     }
 *                 ]
 *             }
 *         ],
 *         "examples": [
 *             <字符串，单词的例句>
 *         ],
 *         "phrases": [
 *             <字符串，单词构成的短语>
 *         ]
 *     }
 * </pre>
 *
 * @param {Object} response 谷歌翻译返回的结果。
 * @param {Object} extras 需要一同发送给content scripts的附加信息。
 * @returns {Object} 按照spec中的数据结构存储的结果
 */
function parseTranslate(response, extras) {
    var result = extras ? extras : new Object();
    for (var i = 0; i < response.length; i++) {
        if (response[i]) {
            var items = response[i];
            switch (i) {
                // 单词的基本意思和音标
                case 0:
                    var mainMeanings = [];
                    var originalTexts = [];
                    var lastIndex = items.length - 1;

                    for (let j = 0; j <= lastIndex; j++) {
                        mainMeanings.push(items[j][0]);
                        originalTexts.push(items[j][1]);
                    }

                    result.mainMeaning = escapeHTML(mainMeanings.join(""));
                    result.originalText = escapeHTML(originalTexts.join(""));
                    try {
                        if (lastIndex > 0) {
                            if (items[lastIndex][2] && items[lastIndex][2].length > 0) {
                                result.TPhoneticSymbol = escapeHTML(items[lastIndex][2]);
                            }

                            if (items[lastIndex][3] && items[lastIndex][3].length > 0) {
                                result.SPhoneticSymbol = escapeHTML(items[lastIndex][3]);
                            }
                        }
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    }
                    // console.log("text: " + result.originalText + "\nmeaning: " + result.mainMeaning);
                    break;
                // 单词的所有词性及对应的意思
                case 1:
                    result.detailedMeanings = new Array();
                    items.forEach(item =>
                        result.detailedMeanings.push({ type: item[0], meaning: item[1].join(", ") })
                    );
                    // console.log("detailedMeanings: " + JSON.stringify(result.detailedMeanings));
                    break;
                case 2:
                    result.sourceLanguage = items;
                    // console.log(result.sourceLanguage);
                    break;
                // 单词或句子的常见意思（单词的常见意思，句子的所有可能意思）
                case 5:
                    if (items.length <= 1) {
                        let meaningArray = new Array();
                        items[0][2].forEach(item => meaningArray.push(item[0]));
                        result.commonMeanings = escapeHTML(meaningArray.join(", "));
                        // console.log("commonMeanings: " + result.commonMeanings);
                    }
                    break;
                // 单词的同义词，根据词性分组
                case 11:
                    result.synonyms = new Array();
                    items.forEach(item => {
                        let element = new Object();
                        element.type = item[0];
                        element.words = new Array();
                        item[1].forEach(words => element.words.push(words[0].join(", ")));
                        element.proto = item[2];
                        result.synonyms.push(element);
                    });
                    // console.log("synonyms: " + JSON.stringify(result.synonyms));
                    break;
                // 单词的定义及对应例子
                case 12:
                    result.definitions = new Array();
                    items.forEach(item => {
                        let definition = new Object();
                        definition.type = item[0];
                        definition.meanings = new Array();
                        item[1].forEach(element =>
                            definition.meanings.push({ meaning: element[0], example: element[2] })
                        );
                        result.definitions.push(definition);
                    });
                    // console.log("definitions: " + JSON.stringify(result.definitions));
                    break;
                // 单词的例句
                case 13:
                    result.examples = new Array();
                    items.forEach(item =>
                        item.forEach(element => result.examples.push(element[0]))
                    );
                    // console.log("examples: " + JSON.stringify(result.examples));
                    break;
                // 单词构成的常见短语
                case 14:
                    result.phrases = items[0];
                    // console.log("phrases: " + JSON.stringify(result.phrases));
                    break;
                default:
                    break;
            }
        }
    }
    return result;
}

/**
 * 展示翻译结果。
 *
 * @param {Object} content 翻译结果。
 * @param {Function} callback 展示完页面后执行的回调函数
 */
function showTranslate(content, tab, callback) {
    if (content) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
            alert(content.mainMeaning);
            return;
        }
        getCurrentTabId(tab, function(tab_id) {
            if (tab_id < 0) {
                alert(content.mainMeaning);
                return;
            }

            if (isChrome()) {
                // 判断浏览器的类型 chrome的情况
                chrome.tabs.sendMessage(
                    tab_id,
                    { type: "translateResult", translateResult: content },
                    function() {
                        if (chrome.runtime.lastError) {
                            // the url is extension:// page, can't send message or using the popup page to translate
                            chrome.extension.isAllowedFileSchemeAccess(function(isAllowedAccess) {
                                if (isAllowedAccess) {
                                    // 查询当前的tab，在该tab上展示结果。
                                    // maybe the user have just set the permission but don't refresh the page
                                    alert(content.mainMeaning);
                                } else {
                                    // 打开管理页面，由用户开启权限
                                    if (confirm(chrome.i18n.getMessage("PermissionRemind"))) {
                                        // 为管理页面创建一个新的标签
                                        chrome.tabs.create({
                                            url: "chrome://extensions/?id=" + chrome.runtime.id
                                        });
                                    } else {
                                        // 用户拒绝开启，则直接展示翻译结果
                                        // eslint-disable-next-line no-console
                                        console.log("Permission denied.");
                                        alert(content.mainMeaning);
                                        callback();
                                    }
                                }
                            });
                        }
                    }
                );
                // 当翻译结果展示完后，执行此回调函数
                if (callback) {
                    callback();
                }
            } else {
                // 是firefox的情况
                // resultPromise是返回的一个promise对象
                var resultPromise = browser.tabs.sendMessage(tab_id, {
                    type: "translateResult",
                    translateResult: content
                });
                resultPromise
                    .then(function() {
                        // 成功接收信息
                        // 当翻译结果展示完后，执行此回调函数
                        if (callback) {
                            callback();
                        }
                    })
                    .catch(function(error) {
                        // 出现错误的回调
                        // eslint-disable-next-line no-console
                        console.log(error);
                        alert(content.mainMeaning);
                    });
            }
        });
    }
}

/**
 * 判断浏览器是否为Chrome。
 */
function isChrome() {
    return navigator.userAgent.indexOf("Chrome") >= 0;
}

/**
 * 找出应该用于展示翻译结果的tab。
 *
 * @param {chrome.tabs.Tab} tab 传入给showTranslate的tab
 * @param {Function} callback 用于展示翻译结果的函数。
 */
function getCurrentTabId(tab, callback) {
    if (tab && tab.id >= 0) {
        callback(tab.id);
    } else if (tab) {
        // 检查是否拥有访问文件链接的权限。
        chrome.extension.isAllowedFileSchemeAccess(function(isAllowedAccess) {
            if (isAllowedAccess) {
                // 查询当前的tab，在该tab上展示结果。
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (chrome.runtime.lastError) {
                        // eslint-disable-next-line no-console
                        console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
                        callback(chrome.tabs.TAB_ID_NONE);
                    } else {
                        callback(tabs[0] && tabs[0].id >= 0 ? tabs[0].id : chrome.tabs.TAB_ID_NONE);
                    }
                });
            } else {
                // 打开管理页面，由用户开启权限
                if (confirm(chrome.i18n.getMessage("PermissionRemind"))) {
                    // 为管理页面创建一个新的标签
                    chrome.tabs.create({ url: "chrome://extensions/?id=" + chrome.runtime.id });
                } else {
                    // 用户拒绝开启，则直接展示翻译结果
                    // eslint-disable-next-line no-console
                    console.log("Permission denied.");
                    callback(chrome.tabs.TAB_ID_NONE);
                }
            }
        });
    } else {
        // 没有tab，说明该页面无法访问
        // eslint-disable-next-line no-console
        console.log("Unsupported page.");
        callback(chrome.tabs.TAB_ID_NONE);
    }
}

/**
 * Actual TTS function.
 *
 * @param {*} text text to pronounce
 * @param {*} language language of text
 * @param {*} speed TTS speed
 * @param {*} callback callback
 */
function doPronounce(text, language, speed, callback) {
    AUDIO.pause();
    AUDIO.src =
        BASE_TTS_URL +
        "&q=" +
        text +
        "&tl=" +
        language +
        "&ttsspeed=" +
        speed +
        "&tk=" +
        generateTK(text, TKK[0], TKK[1]);
    AUDIO.play();

    if (callback) {
        callback();
    }
}

/**
 * Text to speech proxy.
 *
 * @param {String} text The text.
 * @param {String} language The language of the text.
 * @param {String} speed The speed of the speech.
 * @param {Function} callback The callback function.
 */
function pronounce(text, language, speed, callback) {
    var speedValue;
    switch (speed) {
        case "fast":
            speedValue = "0.8";
            break;
        case "slow":
            speedValue = "0.2";
            break;
        default:
            speedValue = "0.5";
            break;
    }

    if (language == "auto") {
        detect(text, lan => doPronounce(text, lan, speedValue, callback));
    } else {
        doPronounce(text, language, speedValue, callback);
    }
}

/**
 * 使用用户选定的网页翻译引擎翻译当前网页。
 */
function translatePage() {
    chrome.storage.sync.get(["DefaultPageTranslator"], result => {
        let translator = result.DefaultPageTranslator;
        switch (translator) {
            case "YouDaoPageTranslate":
                executeYouDaoScript();
                break;
            case "GooglePageTranslate":
                executeGoogleScript();
                break;
            default:
                executeYouDaoScript();
                break;
        }
    });
}

/**
 * 有道翻译接口
 * @param {Any} request request
 * @param {Any} callback callback
 */
function youdaoPageTranslate(request, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            const data = xhr.status === 200 ? xhr.responseText : null;
            callback({
                response: data,
                index: request.index
            });
        }
    };
    xhr.open(request.type, request.url, true);

    if (request.type === "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(request.data);
    } else {
        xhr.send(null);
    }
}

/**
 * 执行有道网页翻译相关脚本
 */
function executeYouDaoScript() {
    chrome.tabs.executeScript({ file: "/youdao/main.js" }, function(result) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
            // eslint-disable-next-line no-console
            console.log("Detail: " + result);
        }
    });
}

/**
 * 执行谷歌网页翻译相关脚本。
 */
function executeGoogleScript() {
    chrome.tabs.executeScript({ file: "/google/injection.js" }, function(result) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError);
            // eslint-disable-next-line no-console
            console.log("Detail: " + result);
        }
    });
}
