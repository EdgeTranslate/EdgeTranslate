export { sendMessageToCurrentTab, escapeHTML };

/**
 * Send a message to current tab if accessible.
 *
 * @param {Object} message message to send.
 */
function sendMessageToCurrentTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (chrome.runtime.lastError) {
            // eslint-disable-next-line no-console
            console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
        } else if (!tabs[0] || tabs[0].id < 0) {
            // eslint-disable-next-line no-console
            console.log("No tabs or tabs not accessible.");
        } else {
            chrome.tabs.sendMessage(tabs[0].id, message, function() {
                if (chrome.runtime.lastError) {
                    // eslint-disable-next-line no-console
                    console.log("Chrome runtime error: " + chrome.runtime.lastError.message);
                }
            });
        }
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
