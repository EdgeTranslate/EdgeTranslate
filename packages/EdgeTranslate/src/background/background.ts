import Browser from "webextension-polyfill";
// @ts-ignore
import { TranslatorManager, translatePage, executeGoogleScript } from "./library/translate";
import {
    addUrlBlacklist,
    addDomainBlacklist,
    removeUrlBlacklist,
    removeDomainBlacklist,
    updateBLackListMenu,
} from "./library/blacklist.js";
// import { sendHitRequest } from "./library/analytics.js";
import Channel from "~/utils/channel";
// map language abbreviation from browser languages to translation languages
import { BROWSER_LANGUAGES_MAP } from "~/utils/languages";
import { DEFAULT_SETTINGS, setDefaultSettings } from "~/utils/settings";
import { SyncData } from "~/types";

/**
 * BEGIN SETTING UP CONTEXT MENUS
 */
Browser.contextMenus.create({
    id: "translate",
    title: `${Browser.i18n.getMessage("Translate")} '%s'`,
    contexts: ["selection"],
});

// Add an entry to options page for Firefox as it doesn't have one.
// TODO
// if (BROWSER_ENV === "firefox") {
//     chrome.contextMenus.create({
//         id: "settings",
//         title: chrome.i18n.getMessage("Settings"),
//         contexts: ["browser_action"],
//     });
// }

Browser.contextMenus.create({
    id: "shortcut",
    title: Browser.i18n.getMessage("ShortcutSetting"),
    contexts: ["browser_action"],
});

Browser.contextMenus.create({
    id: "translate_page",
    title: Browser.i18n.getMessage("TranslatePage"),
    contexts: ["page"],
});

Browser.contextMenus.create({
    id: "translate_page_google",
    title: Browser.i18n.getMessage("TranslatePageGoogle"),
    contexts: ["browser_action"],
});

Browser.contextMenus.create({
    id: "add_url_blacklist",
    title: Browser.i18n.getMessage("AddUrlBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

Browser.contextMenus.create({
    id: "add_domain_blacklist",
    title: Browser.i18n.getMessage("AddDomainBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

Browser.contextMenus.create({
    id: "remove_url_blacklist",
    title: Browser.i18n.getMessage("RemoveUrlBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});

Browser.contextMenus.create({
    id: "remove_domain_blacklist",
    title: Browser.i18n.getMessage("RemoveDomainBlacklist"),
    contexts: ["browser_action"],
    enabled: false,
    visible: false,
});
/**
 * END SETTING UP CONTEXT MENUS
 */

/**
 * Initialize the plugin configuration.
 */
Browser.runtime.onInstalled.addListener(async (details) => {
    // Only in a production environment will the description page be displayed.
    // TODO
    if (process.env.NODE_ENV === "production") {
        if (details.reason === "install") {
            // First installation, guide the user to view the wiki
            await Browser.tabs.create({
                // Create a new tab for the wiki page.
                url: Browser.i18n.getMessage("WikiLink"),
            });

            // Informing users about data collection.
            await Browser.notifications.create("data_collection_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: Browser.i18n.getMessage("AppName"),
                message: Browser.i18n.getMessage("DataCollectionNotice"),
            });
        } else if (details.reason === "update") {
            const results = (await Browser.storage.sync.get()) as SyncData;
            setDefaultSettings(results, DEFAULT_SETTINGS); // assign default value to buffer
            Browser.storage.sync.set(results);
            await Browser.storage.sync.set(results);

            const languageSetting = results.languageSetting;

            // Fix language setting compatibility between Edge Translate 2.x and 1.x.x.
            if (languageSetting) {
                if (languageSetting.sl === ("zh-cn" as unknown)) languageSetting.sl = "zh-CN";
                else if (languageSetting.sl === ("zh-tw" as unknown)) languageSetting.sl = "zh-TW";

                if (languageSetting.tl === ("zh-cn" as unknown)) languageSetting.tl = "zh-CN";
                else if (languageSetting.tl === ("zh-tw" as unknown)) languageSetting.tl = "zh-TW";
                await Browser.storage.sync.set(results);
            }

            // Update from older versions, guide users to the changelog
            Browser.notifications.create("update_notification", {
                type: "basic",
                iconUrl: "./icon/icon128.png",
                title: Browser.i18n.getMessage("AppName"),
                message: Browser.i18n.getMessage("ExtensionUpdated"),
            });
        }

        // Uninstallation reason investigation
        Browser.runtime.setUninstallURL("https://wj.qq.com/s2/3265930/8f07/");
    }
});

// TODO check if service worker can last long enough
/**
 * Create communication channel.
 */
const channel = new Channel();

/**
 * Create translator manager and register event listeners and service providers.
 */
const TRANSLATOR_MANAGER = new TranslatorManager(channel);

/**
 * Listen to user click notification events.
 */
Browser.notifications.onClicked.addListener((notificationId) => {
    switch (notificationId) {
        case "update_notification":
            Browser.tabs.create({
                // Create a new tab for the releases page
                url: "https://github.com/EdgeTranslate/EdgeTranslate/releases",
            });
            break;
        case "data_collection_notification":
            Browser.tabs.create({
                // Create a separate tab for the settings page
                url: Browser.runtime.getURL("options/options.html#google-analytics"),
            });
            break;
        default:
            break;
    }
});

/**
 * Add a handler event after clicking the menu.
 */
Browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "translate":
            channel
                .requestToTab(tab?.id, "get_selection", {})
                .then(({ text, position }) => {
                    if (text) {
                        return TRANSLATOR_MANAGER.translate(text, position);
                    }
                    return Promise.reject();
                })
                .catch((error) => {
                    // If content scripts can not access the tab the selection, use info.selectionText instead.
                    if (info.selectionText?.trim()) {
                        return TRANSLATOR_MANAGER.translate(info.selectionText, null);
                    }
                    return Promise.resolve(error);
                });
            break;
        case "translate_page":
            translatePage(channel);
            break;
        case "translate_page_google":
            executeGoogleScript(channel);
            break;
        case "settings":
            Browser.runtime.openOptionsPage();
            break;
        case "shortcut":
            Browser.tabs.create({
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
 * Add tab switch event listener for updating blacklist information.
 */
Browser.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await Browser.tabs.get(activeInfo.tabId);
    if (tab.url && tab.url.length > 0) {
        updateBLackListMenu(tab.url);
    }
});

/**
 * Add tab refresh event listener for updating blacklist information.
 */
Browser.tabs.onUpdated.addListener((_, _changeInfo, tab) => {
    if (tab.active && tab.url && tab.url.length > 0) {
        updateBLackListMenu(tab.url);
    }
});

/**
 * Redirect tab when redirect event happens.
 */
channel.on("redirect", (detail, sender) =>
    Browser.tabs.update(sender.tab?.id, { url: (detail as { url: string }).url })
);

/**
 * Open options page when open_options_page button clicked.
 */
channel.on("open_options_page", () => Browser.runtime.openOptionsPage());

/**
 * Forward page translate event back to pages.
 */
channel.on("page_translate_event", (detail, sender) => {
    channel.emitToTabs(sender.tab?.id, "page_translate_event", detail);
});

/**
 * Provide UI language detecting service.
 */
channel.provide("get_lang", () => {
    return Promise.resolve({
        lang: BROWSER_LANGUAGES_MAP[
            Browser.i18n.getUILanguage() as keyof typeof BROWSER_LANGUAGES_MAP
        ],
    });
});

/**
 *  Forwarding shortcut messages to content_scripts
 */
Browser.commands.onCommand.addListener((command) => {
    switch (command) {
        case "translate_page":
            translatePage(channel);
            break;
        default:
            Browser.tabs
                .query({ active: true, currentWindow: true })
                .then((tabs) => channel.emitToTabs(tabs[0].id, "command", { command }))
                .catch(() => {});
            break;
    }
});

/**
 * Modify the CSP header of translate requests.
 */
// TODO
// Browser.webRequest.onHeadersReceived.addListener(
//     (details) => ({
//         responseHeaders: details.responseHeaders.map((header) =>
//             /^content-security-policy$/i.test(header.name)
//                 ? {
//                       name: header.name,
//                       value: header.value
//                           .replaceAll(
//                               // Remove 'none' and "none".
//                               /((^|;)\s*(default-src|script-src|img-src|connect-src))\s+['"]none['"]/g,
//                               "$1 "
//                           )
//                           .replaceAll(
//                               // Add Google Page Translate related domains.
//                               // The last "\s" is added to prevent matching script-src-attr, script-src-elem, etc..
//                               /((^|;)\s*(default-src|script-src|img-src|connect-src))\s/g,
//                               // eslint-disable-next-line prefer-template
//                               "$1 translate.googleapis.com translate.google.com www.google.com www.gstatic.com " +
//                                   chrome.runtime.getURL(" ")
//                           ),
//                   }
//                 : header
//         ),
//     }),
//     { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] },
//     ["blocking", "responseHeaders"]
// );

/**
 * Modify the CSP header of DeepL home page.
 */
// chrome.webRequest.onHeadersReceived.addListener(
//     (details) => ({
//         responseHeaders: details.responseHeaders.map((header) =>
//             /^content-security-policy$/i.test(header.name)
//                 ? {
//                       name: header.name,
//                       value: header.value.replaceAll(/frame-ancestors [^;]*;?/g, ""),
//                   }
//                 : header
//         ),
//     }),
//     { urls: ["*://*.deepl.com/*"], types: ["main_frame", "sub_frame"] },
//     ["blocking", "responseHeaders"]
// );

// /**
//  * Modify the cross-origin-resource-policy header of Google TTS response.
//  */
// Browser.webRequest.onHeadersReceived.addListener(
//     (details) => {
//         for (let header of details.responseHeaders) {
//             if (header.name.toLowerCase() === "cross-origin-resource-policy") {
//                 // console.log(JSON.stringify(header));
//                 header.value = "cross-origin";
//                 break;
//             }
//         }

//         return { responseHeaders: details.responseHeaders };
//     },
//     { urls: ["*://translate.google.cn/*"] },
//     // Browser compatibility.
//     BROWSER_ENV === "chrome"
//         ? ["blocking", "responseHeaders", "extraHeaders"]
//         : ["blocking", "responseHeaders"]
// );

/**
 * Modify the origin header of translate requests.
 */
// chrome.webRequest.onBeforeSendHeaders.addListener(
//     (details) => {
//         let modified = false;
//         let origin = `https://${getDomain(details.url)}`;

//         // log("requesting " + details.url);
//         for (let header of details.requestHeaders) {
//             // log(header);
//             if (header.name.toLowerCase() === "origin") {
//                 // log("changed origin: " + header.value);
//                 header.value = origin;
//                 modified = true;
//                 break;
//             }
//         }

//         // Origin header has not been set.
//         if (!modified) {
//             details.requestHeaders.push({ name: "Origin", value: origin });
//         }

//         return { requestHeaders: details.requestHeaders };
//     },
//     { urls: ["*://fanyi.qq.com/*"] },
//     // Browser compatibility.
//     BROWSER_ENV === "chrome"
//         ? ["blocking", "requestHeaders", "extraHeaders"]
//         : ["blocking", "requestHeaders"]
// );
