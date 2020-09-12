/**
 * Messager.
 */
class Messager {
    /**
     * Send message to "to" module(s).
     *
     * @param {String | Array} to module name(s)
     * @param {String} title message title
     * @param {Object} detail message detail
     *
     * @returns {Promise<Object>} receiver reply Promise
     */
    static send(to, title, detail) {
        // if "to" is string, convert it into array.
        if (typeof to === "string") {
            to = [to];
        }

        // Set object is not serializable, so construct an object to quickly check existence of receivers.
        let receivers = {};
        for (let receiver of to) {
            receivers[receiver] = true;
        }

        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ to: receivers, title: title, detail: detail }, result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Send message to "to" module(s).
     *
     * @param {Number} tabId id of tab to send to
     * @param {String | Array} to module name(s)
     * @param {String} title message title
     * @param {Object} detail message detail
     *
     * @returns {Promise<Object>} receiver reply Promise
     */
    static sendToTab(tabId, to, title, detail) {
        // if "to" is string, convert it into array.
        if (typeof to === "string") {
            to = [to];
        }

        // Set object is not serializable, so construct an object to quickly check existence of receivers.
        let receivers = {};
        for (let receiver of to) {
            receivers[receiver] = true;
        }

        if (BROWSER_ENV === "chrome") {
            // Chrome is using callback.
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(
                    tabId,
                    { to: receivers, title: title, detail: detail },
                    result => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(result);
                        }
                    }
                );
            });
        } else {
            // Firefox is using Promise.
            return browser.tabs.sendMessage(tabId, { to: receivers, title: title, detail: detail });
        }
    }

    /**
     * Start to receive messages.
     *
     * @param {String} receiver message receiver
     * @param {Function} messageHandler message handler
     *
     * @returns {void} nothing
     */
    static receive(receiver, messageHandler) {
        chrome.runtime.onMessage.addListener((message, sender, callback) => {
            if (message.to && message.to[receiver]) {
                messageHandler(message, sender).then(result => {
                    if (callback) callback(result);
                });
            }

            return true;
        });
    }
}

export default Messager;
