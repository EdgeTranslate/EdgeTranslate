import Messager from "../../common/scripts/messager.js";

export { sendMessageToCurrentTab, escapeHTML };

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
        return Messager.sendToTab(tab.id, "content", title, detail).catch(error =>
            Promise.reject({ error: error, tab: tab })
        );
    }

    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (chrome.runtime.lastError || !tabs[0] || tabs[0].id < 0) {
                reject({
                    error: chrome.runtime.lastError || "No tabs available to send message to."
                });
                return;
            }
            resolve(
                Messager.sendToTab(tabs[0].id, "content", title, detail).catch(error =>
                    Promise.reject({ error: error, tab: tabs[0] })
                )
            );
            return;
        });
    });
}

/**
 * escape HTML tag to avoid XSS security problems
 * @param {string} str string text to be escaped
 */
function escapeHTML(str) {
    const REGEX_HTML_ESCAPE = /"|&|'|<|>/g;

    if (typeof str !== "string") return str;
    return str.replace(REGEX_HTML_ESCAPE, expression => {
        var char = expression.charCodeAt(0);
        var result = ["&#"];
        char = char == 0x20 ? 0xa0 : char;
        result.push(char);
        result.push(";");
        return result.join("");
    });
}
