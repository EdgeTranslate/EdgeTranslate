/**
 * 默认的源语言和目标语言。
 */
const DEFAULT_LANGUAGE_SETTING = { "sl": "auto", "tl": "zh-CN" };

/**
 * 默认的翻译参数。
 */
const DEFAULT_DT_SETTING = ["t", "at", "bd", "ex", "md", "rw", "ss"];

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "translate",
        "title": "翻译 '%s'",
        "contexts": ["selection"]
    });

    chrome.storage.sync.get("languageSetting", function (result) {
        if (!result.languageSetting) {
            chrome.storage.sync.set({ "languageSetting": DEFAULT_LANGUAGE_SETTING });
        }
    });

    chrome.storage.sync.get("DTSetting", function (result) {
        if (!result.DTSetting) {
            chrome.storage.sync.set({ "DTSetting": DEFAULT_DT_SETTING });
        }
    });
});

// 添加点击菜单后的处理事件
chrome.contextMenus.onClicked.addListener(onClickHandler);

/**
 * 
 * 对菜单点击事件监听的处理函数
 * 
 * @param {*} info 事件信息
 * @param {*} tabs 菜单栏点击位置的具体信息，是一个tab对象 
 */
function onClickHandler(info, tabs) {
    var text = info.selectionText;
    translate(text); // 此api位于 translate.js中
}