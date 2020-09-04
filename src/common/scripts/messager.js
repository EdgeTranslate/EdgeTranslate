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
                if (message.to && message.to === this.owner) {
                    this.messageHandler(message, sender, callback);
                }

                return true;
            }).bind(this)
        );
    }

    /**
     * Send message to "to" module.
     *
     * @param {String} to module name
     * @param {String} title message title
     * @param {Object} detail message detail
     *
     * @returns {Promise<Object>} receiver reply Promise
     */
    send(to, title, detail) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ to: to, title: title, detail: detail }, result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Send message to "to" module.
     *
     * @param {Number} tabId id of tab to send to
     * @param {String} to module name
     * @param {String} title message title
     * @param {Object} detail message detail
     *
     * @returns {Promise<Object>} receiver reply Promise
     */
    sendToTab(tabId, to, title, detail) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, { to: to, title: title, detail: detail }, result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

export default Messager;
