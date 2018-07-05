/**
 * 默认的源语言和目标语言。
 */
const DEFAULT_LANGUAGE_SETTING = { "sl": "auto", "tl": "zh-CN" };

/**
 * 默认的翻译参数。
 */
const DEFAULT_DT_SETTING = ["t", "at", "bd", "ex", "md"];

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