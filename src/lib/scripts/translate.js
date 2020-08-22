import BAIDU from "../../translators/baidu.js";
import BING from "../../translators/bing.js";
import GOOGLE from "../../translators/google.js";
import { sendMessageToCurrentTab } from "./common.js";

export {
    translate,
    detect,
    showTranslate,
    pronounce,
    stopPronounce,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript
};

/**
 * Translators.
 */
const TRANSLATORS = {
    BaiduTranslate: BAIDU,
    BingTranslate: BING,
    GoogleTranslate: GOOGLE
};

/**
 *
 * 检测给定文本的语言。
 *
 * @param {string} text 需要检测的文本
 * @param {function} callback 回调函数，参数为检测结果
 */
function detect(text, callback) {
    chrome.storage.sync.get("DefaultTranslator", result => {
        TRANSLATORS[result.DefaultTranslator].detect(text).then(result => callback(result));
    });
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
    chrome.storage.sync.get(["languageSetting", "OtherSettings", "DefaultTranslator"], result => {
        var OtherSettings = result.OtherSettings;
        var languageSetting = result.languageSetting;
        let DefaultTranslator = result.DefaultTranslator;

        if (languageSetting.sl === "auto" || !OtherSettings.MutualTranslate) {
            // normal translation mode
            TRANSLATORS[DefaultTranslator].translate(
                text,
                languageSetting.sl,
                languageSetting.tl
            ).then(result => {
                result.sourceLanguage = languageSetting.sl;
                result.targetLanguage = languageSetting.tl;
                callback(result);
            });
        } else {
            // Mutual translation mode
            detect(text, result => {
                let sl = result,
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
                TRANSLATORS[DefaultTranslator].translate(text, sl, tl).then(result => {
                    result.sourceLanguage = sl;
                    result.targetLanguage = tl;
                    callback(result);
                });
            });
        }
    });
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
    chrome.storage.sync.get("DefaultTranslator", result => {
        let translator = TRANSLATORS[result.DefaultTranslator];
        if (language == "auto") {
            translator.detect(text).then(lan => {
                translator.pronounce(text, lan, speed).then(callback);
            });
        } else {
            translator.pronounce(text, language, speed).then(callback);
        }
    });
}

/**
 * Stop pronounce proxy.
 */
function stopPronounce() {
    chrome.storage.sync.get("DefaultTranslator", result => {
        TRANSLATORS[result.DefaultTranslator].stopPronounce();
    });
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
