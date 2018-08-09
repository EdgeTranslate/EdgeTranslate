import { translate, showTranslate } from './translate.js';
/**
 * 默认的源语言和目标语言。
 */
const DEFAULT_LANGUAGE_SETTING = { "sl": "auto", "tl": "zh-CN" };

/**
 * 默认的翻译参数。
 */
const DEFAULT_DT_SETTING = ["t", "at", "bd", "ex", "md", "rw", "ss"];

const DEFAULT_OTHER_SETTINGS = { "SelectTranslate": true };

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        "id": "translate",
        "title": chrome.i18n.getMessage("Translate") + " '%s'",
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
    chrome.storage.sync.get("OtherSettings", function (result) {
        if (!result.OtherSettings) {
            chrome.storage.sync.set({ "OtherSettings": DEFAULT_OTHER_SETTINGS });
        }
    });
    chrome.tabs.create({ // 为管理页面创建一个新的标签
        url: 'https://github.com/nickyc975/EdgeTranslate/wiki',
    });
});

/**
 * 根据用户的语言设定国际化右键菜单中的 “翻译 'xxx'” 选项
 */
chrome.runtime.onStartup.addListener(function () {
    // 不知为何找不到 translate 这个 menu item，导致 update 不能用。
    // chrome.contextMenus.update("translate", {"title": chrome.i18n.getMessage("Translate") + " '%s'"});

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        "id": "translate",
        "title": chrome.i18n.getMessage("Translate") + " '%s'",
        "contexts": ["selection"]
    });
});

/**
 * 添加点击菜单后的处理事件
 */
chrome.contextMenus.onClicked.addListener(function (info, tabs) {
    var text = info.selectionText;
    translate(text, function (result) {
        showTranslate(result);
    }); // 此api位于 translate.js中
});
