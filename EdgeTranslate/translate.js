/**
 * 翻译接口。
 */
const BASE_URL = "https://translate.google.cn/translate_a/single?client=gtx";

/**
 * 菜单点击事件监听器。
 * 
 * @param {*} info 事件信息
 * @param {*} tabs 
 */
function onClickHandler(info, tabs) {
    var text = info.selectionText;

    // 获取翻译语言设定。
    chrome.storage.sync.get("languageSetting", function (result) {
        var languageSetting = result.languageSetting;
        var tmpUrl = BASE_URL + "&sl=" + languageSetting.sl + "&tl=" + languageSetting.tl;

        // 获取翻译参数设定。
        chrome.storage.sync.get("DTSetting", function (result) {
            var url = tmpUrl;
            var DTSetting = result.DTSetting;
            var request = new XMLHttpRequest();

            DTSetting.forEach(element => {
                url = url + "&dt=" + element;
            });

            request.open("GET", url + "&q=" + text, true);
            request.send();
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    parseTranslate(JSON.parse(request.response));
                }
            }
        });
    });
};

/**
 * 解析谷歌翻译返回的结果。
 * 
 * @param {Object} response 谷歌翻译返回的结果。
 */
function parseTranslate(response) {
    var meanings = response[5][0][2];
    var meaning = "";
    for (var i = 0; i < meanings.length; i++) {
        meaning += meanings[i][0] + ", ";
    }
    showTranslate(meaning);
}

/**
 * 展示翻译结果。
 * 
 * @param {Object} content 翻译结果。
 */
var showTranslate = function (content) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            alert(content);
        }
        else {
            chrome.tabs.executeScript(tabs[0].id, {
                file: './display/display.js'
            }, function (tab) {
                if (chrome.runtime.lastError) {
                    alert(content);
                } else {
                    chrome.tabs.sendMessage(tabs[0].id, content);
                }
            })
        }
    })
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
