export { getDomain, isPDF, sendMessageToCurrentTab };

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
