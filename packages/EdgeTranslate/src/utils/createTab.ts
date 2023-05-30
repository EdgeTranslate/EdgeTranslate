import Browser from "webextension-polyfill";

/**
 * Get a tab with the given URL, or create a new one if it doesn't exist and wait it till loaded.
 * @param targetURL The URL of the tab to get or create.
 * @param timeout The timeout in milliseconds to wait for the tab to load.
 */
export async function getOrCreateTab(targetURL: string, timeout: number = 2 * 1000) {
    const tabs = await Browser.tabs.query({ url: targetURL });
    let targetTab: Browser.Tabs.Tab;
    if (tabs.length > 0) targetTab = tabs[0];
    // If the tab doesn't exist, create a new one
    else targetTab = await Browser.tabs.create({ url: targetURL });
    if (targetTab.status !== "complete")
        // If the tab is not loaded, wait for it to load
        await new Promise<void>((resolve, reject) => {
            const onUpdated = (tabId: number, changeInfo: Browser.Tabs.OnUpdatedChangeInfoType) => {
                if (tabId === targetTab.id && changeInfo.status === "complete") {
                    Browser.tabs.onUpdated.removeListener(onUpdated);
                    resolve();
                }
            };
            Browser.tabs.onUpdated.addListener(onUpdated);
            setTimeout(() => {
                reject(`Waiting for the tab with ${targetURL} to load timed out.`);
            }, timeout);
        });
    return targetTab;
}
