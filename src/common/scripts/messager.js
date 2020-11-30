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
            let message = JSON.stringify({ to: receivers, title: title, detail: detail });
            chrome.runtime.sendMessage(message, result => {
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

        let message = JSON.stringify({ to: receivers, title: title, detail: detail });
        if (BROWSER_ENV === "chrome") {
            // Chrome is using callback.
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, message, result => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(result);
                    }
                });
            });
        } else {
            // Firefox is using Promise.
            return browser.tabs.sendMessage(tabId, message);
        }
    }

    /**
     * Start to receive messages.
     *
     * @param {String} receiver message receiver
     * @param {Function} messageHandler message handler
     * @param {Boolean} onceOnly if this handler should be executed for only once
     *
     * @returns {void} nothing
     */
    static receive(receiver, messageHandler, onceOnly = false) {
        /**
         * The message handler wrapper.
         *
         * @param {String} message message
         * @param {chrome.tabs.Tab} sender sender tab
         * @param {Function?} callback callback
         *
         * @returns {Boolean} true
         */
        let handlerWrapper = (message, sender, callback) => {
            let parsed = JSON.parse(message);
            if (parsed.to && parsed.to[receiver]) {
                messageHandler(parsed, sender).then(result => {
                    if (callback) callback(result);

                    // If the handler should be executed for only once, remove it after executing.
                    if (onceOnly) chrome.runtime.onMessage.removeListener(handlerWrapper);
                });
            }

            return true;
        };

        // Add listener.
        chrome.runtime.onMessage.addListener(handlerWrapper);
    }
}

export default Messager;
