export { getDomain, isPDF, sendMessageToCurrentTab, escapeHTML };

/**
 * 提取给定的url的域名
 *
 * @param {String} url
 */
function getDomain(url) {
    if (url) {
        var URL_PATTERN = /.+:\/+([\w.-]+).*/;
        var groups = url.match(URL_PATTERN);
        if (groups) {
            return groups[1];
        }
    }
    return "";
}

/**
 * judge if this page is a pdf file
 */
function isPDF() {
    return (
        document.body &&
        document.body.children[0] &&
        document.body.children[0].type === "application/pdf"
    );
}

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
