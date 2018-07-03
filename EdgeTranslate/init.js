/**
 * 默认的源语言和目标语言。
 */
const DEFAULT_LANGUAGE_SETTING = { "sl": "en", "tl": "zh-CN" };

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
});