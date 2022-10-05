import { getDomain, log } from "common/scripts/common.js";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "common/scripts/settings.js";

export {
    addUrlBlacklist,
    addDomainBlacklist,
    removeUrlBlacklist,
    removeDomainBlacklist,
    updateBLackListMenu,
};

const DISABLED_MARK = "X";

/**
 * 将当前页面的url添加到黑名单
 */
function addUrlBlacklist() {
    addBlacklist("urls", () => {
        disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_domain_blacklist"]);

        enableItems(["remove_url_blacklist"]);
    });

    // change the badge text when add url to blacklist
    chrome.browserAction.setBadgeText({ text: DISABLED_MARK });
}

/**
 * 将当前页面的url移出黑名单
 */
function removeUrlBlacklist() {
    removeBlacklist("urls", () => {
        disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

        enableItems(["add_url_blacklist", "add_domain_blacklist"]);
    });

    // clear the badge text when remove url from blacklist
    chrome.browserAction.setBadgeText({ text: "" });
}

/**
 * 将当前页面的域名添加到黑名单
 */
function addDomainBlacklist() {
    addBlacklist("domains", () => {
        disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_url_blacklist"]);

        enableItems(["remove_domain_blacklist"]);
    });

    // change the badge text when add domain to blacklist
    chrome.browserAction.setBadgeText({ text: DISABLED_MARK });
}

/**
 * 将当前页面的域名移出黑名单
 */
function removeDomainBlacklist() {
    removeBlacklist("domains", (blacklist, url) => {
        // 如果该url还在url黑名单中
        if (blacklist.urls[url]) {
            disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_domain_blacklist"]);

            enableItems(["remove_url_blacklist"]);
        } else {
            disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

            enableItems(["add_url_blacklist", "add_domain_blacklist"]);

            // clear the badge text when remove domain from blacklist
            chrome.browserAction.setBadgeText({ text: "" });
        }
    });
}

/**
 * 执行添加黑名单的相关操作
 *
 * @param {String} field 决定将url拉黑还是将域名拉黑
 * @param {Function} callback 回调
 */
function addBlacklist(field, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]) {
            getOrSetDefaultSettings("blacklist", DEFAULT_SETTINGS).then((result) => {
                let blacklist = result.blacklist;
                let value = field === "urls" ? tabs[0].url : getDomain(tabs[0].url);
                blacklist[field][value] = true;
                chrome.storage.sync.set({ blacklist }, () => {
                    callback(blacklist, tabs[0].url);
                });
            });
        }
    });
}

/**
 * 执行移出黑名单相关操作
 *
 * @param {String} field 决定从域名黑名单中移出还是从url黑名单中移出
 * @param {Function} callback 回调
 */
function removeBlacklist(field, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]) {
            getOrSetDefaultSettings("blacklist", DEFAULT_SETTINGS).then((result) => {
                let blacklist = result.blacklist;
                let value = field === "urls" ? tabs[0].url : getDomain(tabs[0].url);
                if (blacklist[field][value]) {
                    delete blacklist[field][value];
                }
                chrome.storage.sync.set({ blacklist }, () => {
                    callback(blacklist, tabs[0].url);
                });
            });
        }
    });
}

/**
 * 当用户切换到一个页面时，根据该页面是否已经在黑名单中展示不同的context menu项
 *
 * @param {String} url 切换到的页面的url
 */
function updateBLackListMenu(url) {
    getOrSetDefaultSettings("blacklist", DEFAULT_SETTINGS).then((result) => {
        if (result.blacklist.domains[getDomain(url)]) {
            disableItems(["add_url_blacklist", "remove_url_blacklist", "add_domain_blacklist"]);

            enableItems(["remove_domain_blacklist"]);

            // the domain is in the blacklist and update the badge text
            chrome.browserAction.setBadgeText({ text: DISABLED_MARK });
        } else if (result.blacklist.urls[url]) {
            disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_domain_blacklist"]);

            enableItems(["remove_url_blacklist"]);

            // the url is in the blacklist and update the badge text
            chrome.browserAction.setBadgeText({ text: DISABLED_MARK });
        } else {
            disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

            enableItems(["add_url_blacklist", "add_domain_blacklist"]);

            // the url and domain is not in the blacklist and clear the badge text
            chrome.browserAction.setBadgeText({ text: "" });
        }
    });
}

/**
 * 启用指定的context menu项
 *
 * @param {String} items
 */
function enableItems(items) {
    items.forEach((item) => {
        chrome.contextMenus.update(
            item,
            {
                enabled: true,
                visible: true,
            },
            () => {
                if (chrome.runtime.lastError) {
                    log(`Chrome runtime error: ${chrome.runtime.lastError}`);
                }
            }
        );
    });
}

/**
 * 禁用指定的context menu项
 *
 * @param {String} items
 */
function disableItems(items) {
    items.forEach((item) => {
        chrome.contextMenus.update(
            item,
            {
                enabled: false,
                visible: false,
            },
            () => {
                if (chrome.runtime.lastError) {
                    log(`Chrome runtime error: ${chrome.runtime.lastError}`);
                }
            }
        );
    });
}
