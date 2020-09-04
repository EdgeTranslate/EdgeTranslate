import {
    translate,
    pronounce,
    stopPronounce,
    onLanguageSettingUpdated,
    getAvailableTranslators,
    showTranslate,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript
} from "./library/translate.js";
import {
    addUrlBlacklist,
    addDomainBlacklist,
    removeUrlBlacklist,
    removeDomainBlacklist,
    updateBLackListMenu
} from "./library/blacklist.js";
import { sendHitRequest } from "./library/analytics.js";
import { sendMessageToCurrentTab } from "./library/common.js";
import Messager from "../common/scripts/messager.js";
import { getDomain } from "../common/scripts/common.js";

/**
 * 选中文本TTS语速
 */
var selectedTTSSpeed = "fast";

/**
 * default settings for this extension
 */
const DEFAULT_SETTINGS = {
    blacklist: {
        urls: {},
        domains: { "chrome.google.com": true, extensions: true }
    },
    // PopupPosition: determine the location of translation block
    // Resize: determine whether the web page will resize when showing translation result
    // RTL: determine whether the text in translation block should display from right to left
    LayoutSettings: {
        PopupPosition: "right",
        Resize: false,
        RTL: false
    },
    // Default settings of source language and target language
    languageSetting: { sl: "auto", tl: navigator.language },
    OtherSettings: {
        MutualTranslate: false,
        SelectTranslate: true,
        TranslateAfterDblClick: false,
        TranslateAfterSelect: false,
        CancelTextSelection: false,
        UseGoogleAnalytics: true,
        UsePDFjs: true
    },
    DefaultPageTranslator: "YouDaoPageTranslate",
    TranslatorConfig: {
        translators: ["BaiduTranslate", "BingTranslate", "GoogleTranslate"],
        selections: {
            originalText: "GoogleTranslate",
            mainMeaning: "BingTranslate",
            tPronunciation: "BingTranslate",
            sPronunciation: "BaiduTranslate",
            detailedMeanings: "BingTranslate",
            definitions: "GoogleTranslate",
            examples: "BaiduTranslate"
        }
    }
};

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.contextMenus.create({
        id: "translate",
        title: chrome.i18n.getMessage("Translate") + " '%s'",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "shortcut",
        title: chrome.i18n.getMessage("ShortcutSetting"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "translate_page",
        title: chrome.i18n.getMessage("TranslatePage"),
        contexts: ["page"]
    });

    chrome.contextMenus.create({
        id: "translate_page_youdao",
        title: chrome.i18n.getMessage("TranslatePageYouDao"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "translate_page_google",
        title: chrome.i18n.getMessage("TranslatePageGoogle"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "add_url_blacklist",
        title: chrome.i18n.getMessage("AddUrlBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "add_domain_blacklist",
        title: chrome.i18n.getMessage("AddDomainBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "remove_url_blacklist",
        title: chrome.i18n.getMessage("RemoveUrlBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "remove_domain_blacklist",
        title: chrome.i18n.getMessage("RemoveDomainBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    // assign default value to settings of this extension
    chrome.storage.sync.get(function(result) {
        var buffer = result; // use var buffer as a pointer
        setDefaultSettings(buffer, DEFAULT_SETTINGS); // assign default value to buffer
        chrome.storage.sync.set(buffer);
    });

    // 只有在生产环境下，才会展示说明页面
    if (process.env.NODE_ENV === "production") {
        if (details.reason === "install") {
            // 首次安装，引导用户查看wiki
            chrome.tabs.create({
                // 为wiki页面创建一个新的标签页
                url: chrome.i18n.getMessage("WikiLink")
            });

            // 告知用户数据收集相关信息
            chrome.notifications.create("data_collection_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: chrome.i18n.getMessage("AppName"),
                message: chrome.i18n.getMessage("DataCollectionNotice")
            });

            // 尝试发送安装事件
            setTimeout(() => {
                sendHitRequest("background", "event", {
                    ec: "installation", // event category
                    ea: "installation" // event label
                });
            }, 10 * 60 * 1000); // 10 min
        } else if (details.reason === "update") {
            // 从旧版本更新，引导用户查看更新日志
            chrome.notifications.create("update_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: chrome.i18n.getMessage("AppName"),
                message: chrome.i18n.getMessage("ExtensionUpdated")
            });
        }

        // 卸载原因调查
        chrome.runtime.setUninstallURL("https://wj.qq.com/s2/3265930/8f07/");
    }
});

/**
 * 监听用户点击通知事件
 */
chrome.notifications.onClicked.addListener(function(notificationId) {
    switch (notificationId) {
        case "update_notification":
            chrome.tabs.create({
                // 为releases页面创建一个新的标签页
                url: "https://github.com/EdgeTranslate/EdgeTranslate/releases"
            });
            break;
        case "data_collection_notification":
            chrome.tabs.create({
                // 为设置页面单独创建一个标签页
                url: chrome.runtime.getURL("options/options.html#google-analytics")
            });
            break;
        default:
            break;
    }
});

/**
 * 根据用户的语言设定国际化右键菜单中的 “翻译 'xxx'” 选项
 */
chrome.runtime.onStartup.addListener(function() {
    // 不知为何找不到这些menu item，导致 update 不能用。
    // chrome.contextMenus.update("translate", {"title": chrome.i18n.getMessage("Translate") + " '%s'"});
    // chrome.contextMenus.update("shortcut", {"title": chrome.i18n.getMessage("ShortcutSetting")});

    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        id: "translate",
        title: chrome.i18n.getMessage("Translate") + " '%s'",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "shortcut",
        title: chrome.i18n.getMessage("ShortcutSetting"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "translate_page",
        title: chrome.i18n.getMessage("TranslatePage"),
        contexts: ["page"]
    });

    chrome.contextMenus.create({
        id: "translate_page_youdao",
        title: chrome.i18n.getMessage("TranslatePageYouDao"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "translate_page_google",
        title: chrome.i18n.getMessage("TranslatePageGoogle"),
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        id: "add_url_blacklist",
        title: chrome.i18n.getMessage("AddUrlBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "add_domain_blacklist",
        title: chrome.i18n.getMessage("AddDomainBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "remove_url_blacklist",
        title: chrome.i18n.getMessage("RemoveUrlBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });

    chrome.contextMenus.create({
        id: "remove_domain_blacklist",
        title: chrome.i18n.getMessage("RemoveDomainBlacklist"),
        contexts: ["browser_action"],
        enabled: false,
        visible: false
    });
});

/**
 * 添加点击菜单后的处理事件
 */
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    switch (info.menuItemId) {
        case "translate":
            var text = info.selectionText;
            translate(text).then(result => showTranslate(result, tab));
            break;
        case "pronounce":
            pronounce(info.selectionText, "auto", selectedTTSSpeed);
            if (selectedTTSSpeed === "fast") {
                selectedTTSSpeed = "slow";
            } else {
                selectedTTSSpeed = "fast";
            }
            break;
        case "translate_page":
            translatePage();
            break;
        case "translate_page_youdao":
            executeYouDaoScript();
            break;
        case "translate_page_google":
            executeGoogleScript();
            break;
        case "shortcut":
            chrome.tabs.create({
                url: "chrome://extensions/shortcuts"
            });
            break;
        case "add_url_blacklist":
            addUrlBlacklist();
            break;
        case "remove_url_blacklist":
            removeUrlBlacklist();
            break;
        case "add_domain_blacklist":
            addDomainBlacklist();
            break;
        case "remove_domain_blacklist":
            removeDomainBlacklist();
            break;
        default:
            break;
    }
});

/**
 * 添加tab切换事件监听，用于更新黑名单信息
 */
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (tab.url && tab.url.length > 0) {
            updateBLackListMenu(tab.url);
        }
    });
});

/**
 * 添加tab刷新事件监听，用于更新黑名单信息
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.active && tab.url && tab.url.length > 0) {
        updateBLackListMenu(tab.url);
    }
});

/**
 * Background message handler.
 *
 * @param {Object} message message
 * @param {object} sender sender
 *
 * @returns {Promise} handle Promise
 */
async function messageHandler(message, sender) {
    switch (message.title) {
        case "redirect":
            chrome.tabs.update(sender.tab.id, { url: message.url });
            return Promise.resolve();
        case "translate": {
            let result = await translate(message.detail.text);
            return await showTranslate(result, sender.tab);
        }
        case "pronounce": {
            let speed = message.detail.speed;
            if (!speed) {
                speed = selectedTTSSpeed;
                if (selectedTTSSpeed === "fast") {
                    selectedTTSSpeed = "slow";
                } else {
                    selectedTTSSpeed = "fast";
                }
            }

            let result = await pronounce(message.detail.text, message.detail.language, speed);
            return result;
        }
        case "youdao_page_translate":
            return youdaoPageTranslate(message.detail.request);
        case "translate_page_youdao":
            executeYouDaoScript();
            return Promise.resolve();
        case "translate_page_google":
            executeGoogleScript();
            return Promise.resolve();
        case "get_lang":
            return Promise.resolve({ lang: chrome.i18n.getUILanguage() });
        case "frame_closed":
            stopPronounce();
            return Promise.resolve();
        case "language_setting_update":
            return onLanguageSettingUpdated(message.detail);
        case "get_available_translators":
            return getAvailableTranslators(message.detail);
        default:
            // eslint-disable-next-line no-console
            console.log("Unknown message title: " + message.title);
            return Promise.reject();
    }
}

/**
 * Start to receive messages.
 */
Messager.receive("background", messageHandler);

/**
 *  将快捷键消息转发给content_scripts
 */
chrome.commands.onCommand.addListener(function(command) {
    switch (command) {
        case "translate_page":
            translatePage();
            break;
        default:
            sendMessageToCurrentTab("command", {
                command: command
            });
            break;
    }
});

/**
 * Modify the origin header of translate requests.
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
    details => {
        let modified = false;
        let origin = "https://" + getDomain(details.url);

        // console.log("requesting " + details.url);
        for (let header of details.requestHeaders) {
            // console.log(header);
            if (header.name.toLowerCase() === "origin") {
                // console.log("changed origin: " + header.value);
                header.value = origin;
                modified = true;
                break;
            }
        }

        // Origin header has not been set.
        if (!modified) {
            details.requestHeaders.push({ name: "Origin", value: origin });
        }

        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["*://fanyi.qq.com/*"] },
    // Browser compatibility.
    BROWSER_ENV === "chrome"
        ? ["blocking", "requestHeaders", "extraHeaders"]
        : ["blocking", "requestHeaders"]
);

// send basic hit data to google analytics
setTimeout(() => {
    sendHitRequest("background", "pageview", null);
}, 1000);

/**
 * assign default value to settings which are undefined in recursive way
 * @param {*} result setting result stored in chrome.storage
 * @param {*} settings default settings
 */
function setDefaultSettings(result, settings) {
    for (var i in settings) {
        // settings[i] contains key-value settings
        if (
            typeof settings[i] === "object" &&
            !(settings[i] instanceof Array) &&
            Object.keys(settings[i]).length > 0
        ) {
            if (result[i]) {
                setDefaultSettings(result[i], settings[i]);
            } else {
                // settings[i] contains several setting items but these have not been set before
                result[i] = settings[i];
            }
        } else if (result[i] === undefined) {
            // settings[i] is a single setting item and it has not been set before
            result[i] = settings[i];
        }
    }
}
