import Messager from "common/scripts/messager.js";
import { promiseTabs } from "common/scripts/promise.js";

export { sendMessageToCurrentTab };

/**
 * Send a message to current tab if accessible.
 *
 * @param {String} title message title
 * @param {Object} detail message detail
 * @param {chrome.tabs.Tab} tab optional tab
 *
 * @returns {Promise<Object>} if failed, Object will contains error message and optional tab info.
 */
function sendMessageToCurrentTab(title, detail, tab = null) {
    if (tab && tab.id && tab.id >= 0) {
        return Messager.sendToTab(tab.id, "content", title, detail).catch((error) =>
            Promise.reject({ error, tab })
        );
    }

    return promiseTabs
        .query({ active: true, currentWindow: true })
        .then((tabs) => {
            return Messager.sendToTab(tabs[0].id, "content", title, detail).catch((error) =>
                Promise.reject({ error, tab: tabs[0] })
            );
        })
        .catch(() => {
            return Promise.reject("No tabs available to send message to.");
        });
}
