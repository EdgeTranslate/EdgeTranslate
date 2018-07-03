/**
 * 默认的源语言和目标语言。
 */
const default_language_setting = { "sl": "en", "tl": "zh-CN" };

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "translate",
        "title": "翻译 '%s'",
        "contexts": ["selection"]
    });

    chrome.storage.sync.get("language_setting", function (result) {
        if (!result.language_setting) {
            chrome.storage.sync.set({ "language_setting": default_language_setting });
        }
    });
});