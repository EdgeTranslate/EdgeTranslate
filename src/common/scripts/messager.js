/**
 * Messager.
 */
class Messager {
    /**
     * Construct Messager instance.
     *
     * @param {String} owner owner of this messager
     * @param {Function} messageHandler message handler
     */
    constructor(owner, messageHandler) {
        /**
         * @type {String} Messager owner
         */
        this.owner = owner;

        /**
         * @type {Function} Message handler
         */
        this.messageHandler = messageHandler;

        /**
         * Add the default listener.
         */
        chrome.runtime.onMessage.addListener(
            ((message, sender, callback) => {
                if (!message.to || message.to !== this.owner) {
                    return;
                }

                this.messageHandler(message, sender, callback);
            }).bind(this)
        );
    }

    /**
     * Send message to "to" module.
     *
     * @param {String} to module name
     * @param {String} title message title
     * @param {Object} detail message detail, if to === "content", detail.tab_id should be the id of the tab to send to.
     *
     * @returns {Promise<Object>} receiver reply Promise
     */
    send(to, title, detail) {
        return new Promise((resolve, reject) => {
            if (to === "content") {
                chrome.tabs.sendMessage(
                    detail.tab_id,
                    { to: to, title: title, detail: detail },
                    result => {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            resolve(result);
                        }
                    }
                );
            } else {
                chrome.runtime.sendMessage({ to: to, title: title, detail: detail }, result => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    }
}

export default Messager;
