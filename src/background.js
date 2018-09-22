import { translate, showTranslate, pronounce } from "./translate.js"

/**
 * 默认的源语言和目标语言。
 */
const DEFAULT_LANGUAGE_SETTING = { "sl": "auto", "tl": "zh-CN" };

/**
 * 默认的翻译参数。
 */
const DEFAULT_DT_SETTING = ["t", "at", "bd", "ex", "md", "rw", "ss", "rm"];

const DEFAULT_LAYOUT_SETTINGS = { "PopupPosition": "right" };

const DEFAULT_OTHER_SETTINGS = { "SelectTranslate": true, "UsePDFjs": true, "TranslateAfterSelect": false, "TranslateAfterDblClick": false };

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener(function (details) {
    chrome.contextMenus.create({
        "id": "translate",
        "title": chrome.i18n.getMessage("Translate") + " '%s'",
        "contexts": ["selection"]
    });

    chrome.contextMenus.create({
        "id": "shortcut",
        "title": chrome.i18n.getMessage("ShortcutSetting"),
        "contexts": ["browser_action"]
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

    chrome.storage.sync.get("LayoutSettings", function (result) {
        if (!result.LayoutSettings) {
            chrome.storage.sync.set({"LayoutSettings": DEFAULT_LAYOUT_SETTINGS});
        }
    });

    chrome.storage.sync.get("OtherSettings", function (result) {
        if (!result.OtherSettings) {
            chrome.storage.sync.set({ "OtherSettings": DEFAULT_OTHER_SETTINGS });
        }
    });
    // 只有在生产环境下，才会展示说明页面
    if (process.env.NODE_ENV === "production") {
        // 首次安装，展示wiki页面
        if (details.reason === "install") {
            chrome.tabs.create({ // 为wiki页面创建一个新的标签
                url: 'https://github.com/nickyc975/EdgeTranslate/wiki',
            });
            // 从旧版本更新，展示更新日志
        } else if (details.reason === "update") {
            chrome.tabs.create({ // 为releases页面创建一个新的标签
                url: 'https://github.com/nickyc975/EdgeTranslate/releases',
            });
        }
    }
});

/**
 * 根据用户的语言设定国际化右键菜单中的 “翻译 'xxx'” 选项
 */
chrome.runtime.onStartup.addListener(function () {
    // 不知为何找不到这些menu item，导致 update 不能用。
    // chrome.contextMenus.update("translate", {"title": chrome.i18n.getMessage("Translate") + " '%s'"});
    // chrome.contextMenus.update("shortcut", {"title": chrome.i18n.getMessage("ShortcutSetting")});

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        "id": "translate",
        "title": chrome.i18n.getMessage("Translate") + " '%s'",
        "contexts": ["selection"]
    });
    
    chrome.contextMenus.create({
        "id": "shortcut",
        "title": chrome.i18n.getMessage("ShortcutSetting"),
        "contexts": ["browser_action"]
    });
});

/**
 * 添加点击菜单后的处理事件
 */
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    switch (info.menuItemId) {
        case "translate":
            var text = info.selectionText;
            translate(text, function (result) {
                showTranslate(result, tab);
            }); // 此api位于 translate.js中
            break;
        case "shortcut":
            chrome.tabs.create({
                url: 'chrome://extensions/shortcuts',
            });
            break;
        default:
            break;
    }
});

/*
 * 处理content scripts发送的消息。
 */
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    if (message.type && sender.tab) {
        switch (message.type) {
            case "redirect":
                chrome.tabs.update(sender.tab.id, { url: message.url })
                if (callback) {
                    callback();
                }
                break;
            case "translate":
                translate(message.text, function (result) {
                    showTranslate(result, sender.tab, callback);
                });
                break;
            case "pronounce":
                pronounce(message.text, message.language, message.speed, callback);
                break;
            default:
                console.log("Unknown message type: " + message.type);
                if (callback) {
                    callback();
                }
        }
        return true;
    }
});
