import {
    TranslatorManager,
    // translatePage,
    // executeYouDaoScript,
    // executeGoogleScript,
} from "./library/translate.js";
import {
    addUrlBlacklist,
    addDomainBlacklist,
    removeUrlBlacklist,
    removeDomainBlacklist,
    updateBLackListMenu,
} from "./library/blacklist.js";
// import { sendHitRequest } from "./library/analytics.js";
import { promiseTabs } from "../common/scripts/promise.js";
import Channel from "../common/scripts/channel.js";
import { getDomain } from "../common/scripts/common.js";
// map language abbreviation from browser languages to translation languages
import { BROWSER_LANGUAGES_MAP } from "../common/scripts/languages.js";

/**
 * default settings for this extension
 */
const DEFAULT_SETTINGS = {
    blacklist: {
        urls: {},
        domains: { "chrome.google.com": true, extensions: true },
    },
    // Resize: determine whether the web page will resize when showing translation result
    // RTL: determine whether the text in translation block should display from right to left
    // FoldLongContent: determine whether to fold long translation content
    LayoutSettings: {
        Resize: false,
        RTL: false,
        FoldLongContent: true,
    },
    // Default settings of source language and target language
    languageSetting: { sl: "auto", tl: BROWSER_LANGUAGES_MAP[chrome.i18n.getUILanguage()] },
    OtherSettings: {
        MutualTranslate: false,
        SelectTranslate: true,
        TranslateAfterDblClick: false,
        TranslateAfterSelect: false,
        CancelTextSelection: false,
        // UseGoogleAnalytics: true
        // UsePDFjs: true
    },
    DefaultTranslator: "GoogleTranslate",
    // DefaultPageTranslator: "YouDaoPageTranslate",
    HybridTranslatorConfig: {
        // The translators used in current hybrid translate.
        translators: ["BaiduTranslate", "BingTranslate", "GoogleTranslate"],

        // The translators for each item.
        selections: {
            // ATTENTION: The following four items MUST HAVE THE SAME TRANSLATOR!
            originalText: "BaiduTranslate",
            mainMeaning: "BaiduTranslate",
            tPronunciation: "BaiduTranslate",
            sPronunciation: "BaiduTranslate",

            // For the following three items, any translator combination is OK.
            detailedMeanings: "BingTranslate",
            definitions: "GoogleTranslate",
            examples: "BaiduTranslate",
        },
    },
    // Defines which contents in the translating result should be displayed.
    TranslateResultFilter: {
        mainMeaning: true,
        originalText: true,
        tPronunciation: true,
        sPronunciation: true,
        tPronunciationIcon: true,
        sPronunciationIcon: true,
        detailedMeanings: true,
        definitions: true,
        examples: true,
    },
    // Defines the order of displaying contents.
    ContentDisplayOrder: [
        "mainMeaning",
        "originalText",
        "detailedMeanings",
        "definitions",
        "examples",
    ],
};

/**
 * BEGIN SETTING UP CONTEXT MENUS
 */
chrome.contextMenus.create({
    id: "translate",
    title: `${chrome.i18n.getMessage("Translate")} '%s'`,
    contexts: ["selection"],
});

// Add an entry to options page for Firefox as it doesn't have one.
if (BROWSER_ENV === "firefox") {
    chrome.contextMenus.create({
        id: "settings",
        title: chrome.i18n.getMessage("Settings"),
        contexts: ["browser_action"],
    });
}

chrome.contextMenus.create({
    id: "shortcut",
    title: chrome.i18n.getMessage("ShortcutSetting"),
    contexts: ["browser_action"],
});

// chrome.contextMenus.create({
//     id: "translate_page",
//     title: chrome.i18n.getMessage("TranslatePage"),
//     contexts: ["page"]
// });

// chrome.contextMenus.create({
//     id: "translate_page_youdao",
//     title: chrome.i18n.getMessage("TranslatePageYouDao"),
//     contexts: ["browser_action"]
// });

// chrome.contextMenus.create({
//     id: "translate_page_google",
//     title: chrome.i18n.getMessage("TranslatePageGoogle"),
//     contexts: ["browser_action"]
// });

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
            // chrome.notifications.create("data_collection_notification", {
            //     type: "basic",
            //     iconUrl: "./icon/icon128.png",
            //     title: chrome.i18n.getMessage("AppName"),
            //     message: chrome.i18n.getMessage("DataCollectionNotice")
            // });

            // 尝试发送安装事件
            // setTimeout(() => {
            //     sendHitRequest("background", "event", {
            //         ec: "installation", // event category
            //         ea: "installation" // event label
            //     });
            // }, 10 * 60 * 1000); // 10 min
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
 * Create communication channel.
 */
const channel = new Channel();

/**
 * Create translator manager and register event listeners and service providers.
 */
const TRANSLATOR_MANAGER = new TranslatorManager(channel);

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
        // case "data_collection_notification":
        //     chrome.tabs.create({
        //         // 为设置页面单独创建一个标签页
        //         url: chrome.runtime.getURL("options/options.html#google-analytics")
        //     });
        //     break;
        default:
            break;
    }
});

/**
 * 添加点击菜单后的处理事件
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "translate":
            channel
                .requestToTab(tab.id, "get_selection")
                .then(({ text, position }) => {
                    if (text) {
                        return TRANSLATOR_MANAGER.translate(text, position);
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
        // case "translate_page":
        //     translatePage();
        //     break;
        // case "translate_page_youdao":
        //     executeYouDaoScript();
        //     break;
        // case "translate_page_google":
        //     executeGoogleScript();
        //     break;
        case "settings":
            chrome.runtime.openOptionsPage();
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
 * Redirect tab when redirect event happens.
 */
channel.on("redirect", (detail, sender) => chrome.tabs.update(sender.tab.id, { url: detail.url }));

/**
 * Open options page when open_options_page button clicked.
 */
channel.on("open_options_page", () => chrome.runtime.openOptionsPage());

/**
 * Provide UI language detecting service.
 */
channel.provide("get_lang", () => {
    return Promise.resolve({
        lang: BROWSER_LANGUAGES_MAP[chrome.i18n.getUILanguage()],
    });
});

/**
 *  将快捷键消息转发给content_scripts
 */
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        // case "translate_page":
        //     translatePage();
        //     break;
        default:
            promiseTabs
                .query({ active: true, currentWindow: true })
                .then((tabs) => channel.emitToTabs(tabs[0].id, "command", { command }))
                .catch(() => {});
            break;
    }
});

/**
 * Modify the CSP header of translate requests.
 */
// chrome.webRequest.onHeadersReceived.addListener(
//     (details) => ({
//         responseHeaders: details.responseHeaders.map((header) =>
//             /^content-security-policy$/i.test(header.name)
//                 ? {
//                       name: header.name,
//                       value: header.value
//                           .replaceAll(
//                               // Remove 'none' and "none".
//                               /((^|;)\s*(default-src|script-src|img-src|connect-src))\s+['"]none['"]/g,
//                               "$1"
//                           )
//                           .replaceAll(
//                               // Add Google Page Translate related domains.
//                               /((^|;)\s*(default-src|script-src|img-src|connect-src))/g,
//                               // eslint-disable-next-line prefer-template
//                               "$1 translate.googleapis.com translate.google.com www.google.com www.gstatic.com " +
//                                   chrome.runtime.getURL("")
//                           ),
//                   }
//                 : header
//         ),
//     }),
//     { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] },
//     ["blocking", "responseHeaders"]
// );

/**
 * Modify the cross-origin-resource-policy header of Google TTS response.
 */
chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        for (let header of details.responseHeaders) {
            if (header.name.toLowerCase() === "cross-origin-resource-policy") {
                // console.log(JSON.stringify(header));
                header.value = "cross-origin";
                break;
            }
        }

        return { responseHeaders: details.responseHeaders };
    },
    { urls: ["*://translate.google.cn/*"] },
    // Browser compatibility.
    BROWSER_ENV === "chrome"
        ? ["blocking", "responseHeaders", "extraHeaders"]
        : ["blocking", "responseHeaders"]
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
// setTimeout(() => {
//     sendHitRequest("background", "pageview", null);
// }, 1000);

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

/**
 * dynamic importing hot reload function only in development env
 */
if (BUILD_ENV === "development" && BROWSER_ENV === "chrome") {
    import("./library/hot_reload.js").then((module) => {
        module.hotReload();
    });
}
