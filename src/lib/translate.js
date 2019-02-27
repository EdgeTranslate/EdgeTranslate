export { translate, showTranslate, sendMessageToCurrentTab, pronounce };
/**
 * 翻译接口。
 */
const BASE_URL = "https://translate.google.cn/translate_a/single?ie=UTF-8&client=gtx";

const BASE_TTS_URL = "https://translate.google.cn/translate_tts?ie=UTF-8&client=gtx";

// 生成tk需要的密钥
var TKK = eval('((function(){var a\x3d3034572292;var b\x3d-192068061;return 426169+\x27.\x27+(a+b)})())');

/**
 * 生成google translate api 参数tk的值
 * 
 * @param {*} text 翻译的内容
 * @param {*} TKK 生成tk需要的密钥
 */
function generateTK(text, TKK) {
    function compute(a, b) {
        for (var d = 0; d < b.length - 2; d += 3) {
            var c = b.charAt(d + 2),
                c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
                c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
            a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
        }
        return a
    }
    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < text.length; f++) {
        var c = text.charCodeAt(f);
        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < text.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
    }
    text = h;
    for (d = 0; d < g.length; d++)text += g[d], text = compute(text, "+-a^+6");
    text = compute(text, "+-3^+b+-f");
    text ^= Number(e[1]) || 0;
    0 > text && (text = (text & 2147483647) + 2147483648);
    text %= 1E6;
    return text.toString() + "." + (text ^ h)
}

/**
 * Send a message to current tab if accessible.
 * 
 * @param {Object} message message to send.
 */
function sendMessageToCurrentTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
        } else if (!tabs[0] || tabs[0].id < 0) {
            console.log("No tabs or tabs not accessible.");
        } else {
            chrome.tabs.sendMessage(tabs[0].id, message, function () {
                if (chrome.runtime.lastError) {
                    console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
                }
            });
        }
    });
}

/**
 * 
 * 此函数负责将传入的文本翻译，并在当前页面的侧边栏中展示
 * 
 * @param {String} text 需要翻译的文本字符串
 * @param {Function} callback 完成翻译后用以获取翻译结果
 */
function translate(text, callback) {

    // 获取翻译语言设定。
    chrome.storage.sync.get("languageSetting", function (result) {
        var languageSetting = result.languageSetting;
        var postData = "sl=" + languageSetting.sl + "&tl=" + languageSetting.tl;

        // 获取翻译参数设定。
        chrome.storage.sync.get("DTSetting", function (result) {
            var DTSetting = result.DTSetting;
            var request = new XMLHttpRequest();

            DTSetting.forEach(element => {
                postData = postData + "&dt=" + element;
            });

            postData += "&tk=" + generateTK(text, TKK);
            postData += "&q=" + text;

            sendMessageToCurrentTab({
                "type": "info",
                "info": "start_translating"
            });

            request.open("POST", BASE_URL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(postData);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    // HTTPS request sucessfully
                    if (request.status === 200) {
                        callback(parseTranslate(
                            JSON.parse(request.response),
                            {
                                "targetLanguage": languageSetting.tl
                            }
                        ));
                    }
                    // HTTPS request fail
                    else {
                        sendMessageToCurrentTab({
                            "type": "info",
                            "info": "network_error",
                            "detail": request.status
                        });
                    }
                }
            }
        });
    });
};

/**
 * <p>解析谷歌翻译返回的结果。解析结果结构如下：</p>
 * 
 * <pre>
 *     result = {
 *         "mainMeaning": <字符串，单词的主要意思，句子的最可能的意思>,
 *         "phoneticSymbol": <字符串，单词的音标>,
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
 * @param {Object} extras 需要一同发送给content scipts的附加信息。
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

                    result.mainMeaning = mainMeanings.join('');
                    result.originalText = originalTexts.join('');
                    try {
                        if (lastIndex > 0 && items[lastIndex].length > 3 && items[lastIndex][3].length > 0) {
                            result.phoneticSymbol = items[lastIndex][3];
                            // console.log("phonetic symbol: " + result.phoneticSymbol);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    // console.log("text: " + result.originalText + "\nmeaning: " + result.mainMeaning);
                    break;
                // 单词的所有词性及对应的意思
                case 1:
                    result.detailedMeanings = new Array();
                    items.forEach(item =>
                        result.detailedMeanings.push({ "type": item[0], "meaning": item[1].join(", ") })
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
                        items[0][2].forEach(item =>
                            meaningArray.push(item[0])
                        );
                        result.commonMeanings = meaningArray.join(", ");
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
                            definition.meanings.push({ "meaning": element[0], "example": element[2] })
                        );
                        result.definitions.push(definition);
                    });
                    // console.log("definitions: " + JSON.stringify(result.definitions));
                    break;
                // 单词的例句
                case 13:
                    result.examples = new Array();
                    items.forEach(item =>
                        item.forEach(element =>
                            result.examples.push(element[0])
                        )
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
            console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
            alert(content.mainMeaning);
            return;
        }
        getCurrentTabId(tab, function (tab_id) {
            if (tab_id < 0) {
                alert(content.mainMeaning);
                return;
            }

            if (isChrome()) { // 判断浏览器的类型 chrome的情况
                chrome.tabs.sendMessage(tab_id, { "type": "translateResult", "translateResult": content }, function () {
                    if (chrome.runtime.lastError) { // the url is extension:// page, can't send message or using the popup page to translate
                        chrome.extension.isAllowedFileSchemeAccess(function (isAllowedAccess) {
                            if (isAllowedAccess) { // 查询当前的tab，在该tab上展示结果。
                                // maybe the user have just set the permission but don't refresh the page
                                alert(content.mainMeaning);
                            } else { // 打开管理页面，由用户开启权限
                                if (confirm(chrome.i18n.getMessage("PermissionRemind"))) { // 为管理页面创建一个新的标签
                                    chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
                                } else { // 用户拒绝开启，则直接展示翻译结果
                                    console.log("Permission denied.");
                                    alert(content.mainMeaning);
                                    callback();
                                }
                            }
                        });
                    }
                });
                // 当翻译结果展示完后，执行此回调函数
                if (callback) {
                    callback();
                }
            } else { // 是firefox的情况
                // resultPromise是返回的一个promise对象
                var resultPromise = browser.tabs.sendMessage(tab_id, { "type": "translateResult", "translateResult": content });
                resultPromise.then(function (response) { // 成功接收信息
                    // 当翻译结果展示完后，执行此回调函数
                    if (callback) {
                        callback();
                    }
                }).catch(function (error) { // 出现错误的回调
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
    return navigator.userAgent.indexOf('Chrome') >= 0;
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
    } else if (tab) { // 检查是否拥有访问文件链接的权限。
        chrome.extension.isAllowedFileSchemeAccess(function (isAllowedAccess) {
            if (isAllowedAccess) { // 查询当前的tab，在该tab上展示结果。
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (chrome.runtime.lastError) {
                        console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
                        callback(chrome.tabs.TAB_ID_NONE);
                    } else {
                        callback(tabs[0] && tabs[0].id >= 0 ? tabs[0].id : chrome.tabs.TAB_ID_NONE);
                    }
                });
            } else { // 打开管理页面，由用户开启权限
                if (confirm(chrome.i18n.getMessage("PermissionRemind"))) { // 为管理页面创建一个新的标签
                    chrome.tabs.create({ url: 'chrome://extensions/?id=' + chrome.runtime.id });
                } else { // 用户拒绝开启，则直接展示翻译结果
                    console.log("Permission denied.");
                    callback(chrome.tabs.TAB_ID_NONE);
                }
            }
        });
    } else { // 没有tab，说明该页面无法访问
        console.log("Unsupported page.");
        callback(chrome.tabs.TAB_ID_NONE);
    }
}

/**
 * Text to speech.
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

    var url = BASE_TTS_URL + "&q=" + text + "&tl=" + language + "&ttsspeed=" + speedValue + "&tk=" + generateTK(text, TKK);
    var audio = new Audio(url);
    audio.play();

    if (callback) {
        callback();
    }
}