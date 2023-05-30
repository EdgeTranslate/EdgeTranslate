import Browser from "webextension-polyfill";
import { Blacklist, SyncData, SyncDataKey } from "~/types";
import { log } from "~/utils";
import { getDomain } from "~/utils/get_domain";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "~/utils/settings";

const DISABLED_MARK = "X";

/**
 * Add the url of the current page to the blacklist.
 */
export async function addUrlBlacklist() {
    await addBlacklist("urls");
    await disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_domain_blacklist"]);

    await enableItems(["remove_url_blacklist"]);

    // change the badge text when add url to blacklist
    await Browser.browserAction.setBadgeText({ text: DISABLED_MARK });
}

/**
 * Move the url of the current page out of the blacklist.
 */
export async function removeUrlBlacklist() {
    await removeBlacklist("urls");
    await disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

    await enableItems(["add_url_blacklist", "add_domain_blacklist"]);

    // clear the badge text when remove url from blacklist
    await Browser.browserAction.setBadgeText({ text: "" });
}

/**
 * Add the domain name of the current page to the blacklist.
 */
export async function addDomainBlacklist() {
    await addBlacklist("domains");

    await disableItems(["add_url_blacklist", "add_domain_blacklist", "remove_url_blacklist"]);

    await enableItems(["remove_domain_blacklist"]);

    // change the badge text when add domain to blacklist
    await Browser.browserAction.setBadgeText({ text: DISABLED_MARK });
}

/**
 * Move the domain name of the current page out of the blacklist.
 */
export async function removeDomainBlacklist() {
    const result = await removeBlacklist("domains");
    if (!result) return;
    const { blacklist, url } = result;
    // If the url is still in the url blacklist
    if (blacklist.urls[url]) {
        await disableItems([
            "add_url_blacklist",
            "add_domain_blacklist",
            "remove_domain_blacklist",
        ]);

        await enableItems(["remove_url_blacklist"]);
    } else {
        await disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

        await enableItems(["add_url_blacklist", "add_domain_blacklist"]);

        // clear the badge text when remove domain from blacklist
        await Browser.browserAction.setBadgeText({ text: "" });
    }
}

/**
 * Perform operations related to adding a blacklist.
 *
 * @param field decide whether to black out the url or the domain name
 */
async function addBlacklist(field: keyof Blacklist) {
    const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs[0]) return null;

    const result = await getOrSetDefaultSettings(SyncDataKey.blacklist, DEFAULT_SETTINGS);
    let blacklist = result.blacklist;
    let value = (field === "urls" ? tabs[0].url : getDomain(tabs[0].url || "")) || "";
    blacklist[field][value] = true;
    await Browser.storage.sync.set({ blacklist });
    return {
        blacklist,
        url: tabs[0].url || "",
    };
}

/**
 * Perform blacklisting-related operations.
 *
 * @param field decide whether to move from the domain blacklist or from the url blacklist
 */
async function removeBlacklist(field: keyof Blacklist) {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tabs || !tabs[0]) return null;
    const result = (await getOrSetDefaultSettings(
        SyncDataKey.blacklist,
        DEFAULT_SETTINGS
    )) as SyncData;
    let blacklist = result.blacklist;
    let value = (field === "urls" ? tabs[0].url : getDomain(tabs[0].url || "")) || "";
    if (blacklist[field][value]) {
        delete blacklist[field][value];
    }
    await Browser.storage.sync.set({ blacklist });
    return {
        blacklist,
        url: tabs[0].url || "",
    };
}

/**
 * When the user switches to a page, different context menu items are displayed depending on whether the page is already in the blacklist.
 *
 * @param url the url of the page you are switching to
 */
export async function updateBLackListMenu(url: string) {
    const result = await getOrSetDefaultSettings(SyncDataKey.blacklist, DEFAULT_SETTINGS);
    if (result.blacklist.domains[getDomain(url)]) {
        await disableItems(["add_url_blacklist", "remove_url_blacklist", "add_domain_blacklist"]);

        await enableItems(["remove_domain_blacklist"]);

        // the domain is in the blacklist and update the badge text
        await Browser.browserAction.setBadgeText({ text: DISABLED_MARK });
    } else if (result.blacklist.urls[url]) {
        await disableItems([
            "add_url_blacklist",
            "add_domain_blacklist",
            "remove_domain_blacklist",
        ]);

        await enableItems(["remove_url_blacklist"]);

        // the url is in the blacklist and update the badge text
        await Browser.browserAction.setBadgeText({ text: DISABLED_MARK });
    } else {
        await disableItems(["remove_url_blacklist", "remove_domain_blacklist"]);

        await enableItems(["add_url_blacklist", "add_domain_blacklist"]);

        // the url and domain is not in the blacklist and clear the badge text
        await Browser.browserAction.setBadgeText({ text: "" });
    }
}

/**
 * Enable the specified context menu item.
 */
async function enableItems(items: string[]) {
    await Promise.all(
        items.map((item) =>
            Browser.contextMenus
                .update(item, {
                    enabled: true,
                    visible: true,
                })
                .catch(log)
        )
    );
}

/**
 * Disable the specified context menu item.
 */
async function disableItems(items: string[]) {
    await Promise.all(
        items.map((item) =>
            Browser.contextMenus
                .update(item, {
                    enabled: false,
                    visible: false,
                })
                .catch(log)
        )
    );
}
