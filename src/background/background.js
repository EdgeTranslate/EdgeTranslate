import {
    TRANSLATOR_MANAGER,
    translatePage,
    youdaoPageTranslate,
    executeYouDaoScript,
    executeGoogleScript,
} from "./library/translate.js";
import {
    addUrlBlacklist,
    addDomainBlacklist,
    removeUrlBlacklist,
    removeDomainBlacklist,
    updateBLackListMenu,
} from "./library/blacklist.js";
import { sendHitRequest } from "./library/analytics.js";
import { sendMessageToCurrentTab } from "./library/common.js";
import Messager from "common/scripts/messager.js";
import { getDomain, log } from "common/scripts/common.js";
// map language abbreviation from browser languages to translation languages
import { BROWSER_LANGUAGES_MAP } from "common/scripts/languages.js";

/**
 * 选中文本TTS语速
 */
let selectedTTSSpeed = "fast";

/**
 * default settings for this extension
 */
const DEFAULT_SETTINGS = {
    blacklist: {
        urls: {},
        domains: { "chrome.google.com": true, extensions: true },
    },
    // PopupPosition: determine the location of translation block
    // Resize: determine whether the web page will resize when showing translation result
    // RTL: determine whether the text in translation block should display from right to left
    LayoutSettings: {
        Resize: false,
        RTL: false,
    },
    // Default settings of source language and target language
    languageSetting: { sl: "auto", tl: BROWSER_LANGUAGES_MAP[chrome.i18n.getUILanguage()] },
    OtherSettings: {
        MutualTranslate: false,
        SelectTranslate: true,
        TranslateAfterDblClick: false,
        TranslateAfterSelect: false,
        CancelTextSelection: false,
        UseGoogleAnalytics: true,
        UsePDFjs: true,
    },
    DefaultTranslator: "GoogleTranslate",
    DefaultPageTranslator: "YouDaoPageTranslate",
    HybridTranslatorConfig: {
        // The translators used in current hybrid translate.
        translators: ["BaiduTranslate", "BingTranslate", "GoogleTranslate"],

        // The translators for each item.
        selections: {
            originalText: "GoogleTranslate",
            mainMeaning: "BingTranslate",
            tPronunciation: "BingTranslate",
            sPronunciation: "BaiduTranslate",
            detailedMeanings: "BingTranslate",
            definitions: "GoogleTranslate",
            examples: "BaiduTranslate",
        },
    },
};

/**
 * BEGIN SETTING UP CONTEXT MENUS
 */
chrome.contextMenus.create({
    id: "translate",
    title: `${chrome.i18n.getMessage("Translate")} '%s'`,
    contexts: ["selection"],
});

chrome.contextMenus.create({
    id: "shortcut",
    title: chrome.i18n.getMessage("ShortcutSetting"),
    contexts: ["browser_action"],
});

chrome.contextMenus.create({
    id: "translate_page",
    title: chrome.i18n.getMessage("TranslatePage"),
    contexts: ["page"],
});

chrome.contextMenus.create({
    id: "translate_page_youdao",
    title: chrome.i18n.getMessage("TranslatePageYouDao"),
    contexts: ["browser_action"],
});

chrome.contextMenus.create({
    id: "translate_page_google",
    title: chrome.i18n.getMessage("TranslatePageGoogle"),
    contexts: ["browser_action"],
});

chrome.contextMenus.create({
    id: "add_url_blacklist",
    title: chrome.i18n.getMessage("AddUrlBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

chrome.contextMenus.create({
    id: "add_domain_blacklist",
    title: chrome.i18n.getMessage("AddDomainBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

chrome.contextMenus.create({
    id: "remove_url_blacklist",
    title: chrome.i18n.getMessage("RemoveUrlBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

chrome.contextMenus.create({
    id: "remove_domain_blacklist",
    title: chrome.i18n.getMessage("RemoveDomainBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});
/**
 * END SETTING UP CONTEXT MENUS
 */

/**
 * 初始化插件配置。
 */
chrome.runtime.onInstalled.addListener((details) => {
    // assign default value to settings of this extension
    chrome.storage.sync.get((result) => {
        let buffer = result; // use var buffer as a pointer
        setDefaultSettings(buffer, DEFAULT_SETTINGS); // assign default value to buffer
        chrome.storage.sync.set(buffer);
    });

    // 只有在生产环境下，才会展示说明页面
    if (process.env.NODE_ENV === "production") {
        if (details.reason === "install") {
            // 首次安装，引导用户查看wiki
            chrome.tabs.create({
                // 为wiki页面创建一个新的标签页
                url: chrome.i18n.getMessage("WikiLink"),
            });

            // 告知用户数据收集相关信息
            chrome.notifications.create("data_collection_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: chrome.i18n.getMessage("AppName"),
                message: chrome.i18n.getMessage("DataCollectionNotice"),
            });

            // 尝试发送安装事件
            setTimeout(() => {
                sendHitRequest("background", "event", {
                    ec: "installation", // event category
                    ea: "installation", // event label
                });
            }, 10 * 60 * 1000); // 10 min
        } else if (details.reason === "update") {
            // Fix language setting compatibility between Edge Translate 2.x and 1.x.x.
            chrome.storage.sync.get("languageSetting", (result) => {
                if (result.languageSetting.sl === "zh-cn") {
                    result.languageSetting.sl = "zh-CN";
                } else if (result.languageSetting.sl === "zh-tw") {
                    result.languageSetting.sl = "zh-TW";
                }

                if (result.languageSetting.tl === "zh-cn") {
                    result.languageSetting.tl = "zh-CN";
                } else if (result.languageSetting.tl === "zh-tw") {
                    result.languageSetting.tl = "zh-TW";
                }
                chrome.storage.sync.set(result);
            });

            // 从旧版本更新，引导用户查看更新日志
            chrome.notifications.create("update_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: chrome.i18n.getMessage("AppName"),
                message: chrome.i18n.getMessage("ExtensionUpdated"),
            });
        }

        // 卸载原因调查
        chrome.runtime.setUninstallURL("https://wj.qq.com/s2/3265930/8f07/");
    }
});

/**
 * 监听用户点击通知事件
 */
chrome.notifications.onClicked.addListener((notificationId) => {
    switch (notificationId) {
        case "update_notification":
            chrome.tabs.create({
                // 为releases页面创建一个新的标签页
                url: "https://github.com/EdgeTranslate/EdgeTranslate/releases",
            });
            break;
        case "data_collection_notification":
            chrome.tabs.create({
                // 为设置页面单独创建一个标签页
                url: chrome.runtime.getURL("options/options.html#google-analytics"),
            });
            break;
        default:
            break;
    }
});

/**
 * 添加点击菜单后的处理事件
 */
chrome.contextMenus.onClicked.addListener((info) => {
    switch (info.menuItemId) {
        case "translate":
            sendMessageToCurrentTab("get_selection", {})
                .then(({ selectedText, position }) => {
                    if (selectedText) {
                        return TRANSLATOR_MANAGER.translate(selectedText, position);
                    }
                    return Promise.reject();
                })
                .catch((error) => {
                    // If content scripts can not access the tab the selection, use info.selectionText instead.
                    if (info.selectionText.trim()) {
                        return TRANSLATOR_MANAGER.translate(info.selectionText, null);
                    }
                    return Promise.resolve(error);
                });
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
                url: "chrome://extensions/shortcuts",
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
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url && tab.url.length > 0) {
            updateBLackListMenu(tab.url);
        }
    });
});

/**
 * 添加tab刷新事件监听，用于更新黑名单信息
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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
            chrome.tabs.update(sender.tab.id, { url: message.detail.url });
            return Promise.resolve();
        case "translate":
            return TRANSLATOR_MANAGER.translate(message.detail.text, message.detail.position);
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

            let result = await TRANSLATOR_MANAGER.pronounce(
                message.detail.pronouncing,
                message.detail.text,
                message.detail.language,
                speed
            );
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
            return Promise.resolve({ lang: BROWSER_LANGUAGES_MAP[chrome.i18n.getUILanguage()] });
        case "frame_closed":
            TRANSLATOR_MANAGER.stopPronounce();
            return Promise.resolve();
        case "language_setting_update":
            return TRANSLATOR_MANAGER.onLanguageSettingUpdated(message.detail);
        case "get_available_translators":
            return TRANSLATOR_MANAGER.getAvailableTranslators(message.detail);
        case "update_default_translator":
            return TRANSLATOR_MANAGER.updateDefaultTranslator(message.detail.translator);
        case "open_options_page":
            chrome.runtime.openOptionsPage();
            return Promise.resolve();
        default:
            log(`Unknown message title: ${message.title}`);
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
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case "translate_page":
            translatePage();
            break;
        default:
            sendMessageToCurrentTab("command", {
                command,
            }).catch((error) => log(error));
            break;
    }
});

/**
 * Modify the CSP header of translate requests.
 */
chrome.webRequest.onHeadersReceived.addListener(
    (details) => ({
        responseHeaders: details.responseHeaders.map((header) =>
            header.name.match(/^content-security-policy$/i)
                ? {
                      name: header.name,
                      value: header.value.replaceAll(
                          /((^|;)\s*(default-src|script-src|img-src|connect-src))/g,
                          "$1 translate.googleapis.com translate.google.com www.google.com www.gstatic.com 'unsafe-inline'"
                      ),
                  }
                : header
        ),
    }),
    { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] },
    ["blocking", "responseHeaders"]
);

/**
 * Modify the origin header of translate requests.
 */
chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
        let modified = false;
        let origin = `https://${getDomain(details.url)}`;

        // log("requesting " + details.url);
        for (let header of details.requestHeaders) {
            // log(header);
            if (header.name.toLowerCase() === "origin") {
                // log("changed origin: " + header.value);
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
    for (let i in settings) {
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
