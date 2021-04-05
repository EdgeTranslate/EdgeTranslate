import EventManager from "./event.js";

/**
 * Communication channel for popup, options and content scripts communicating with background.
 */
class Channel {
    constructor() {
        /**
         * @type {EventManager} Event manager.
         */
        this._eventManager = new EventManager();

        /**
         * Register massage listener.
         */
        chrome.runtime.onMessage.addListener(
            ((message, sender, callback) => {
                let parsed = JSON.parse(message);
                if (parsed.type && parsed.type === "event") {
                    this._eventManager.emit(parsed.event, parsed.detail, sender);
                    callback && callback();
                }
            }).bind(this)
        );
    }

    /**
     * Send a request to background and get a promise of the response.
     *
     * @param {String} service requested service
     * @param {Any} params service parameters
     * @returns {Promise<Any>} promise of the response
     */
    request(service, params) {
        return new Promise((resolve, reject) => {
            let message = JSON.stringify({ type: "service", service, params });
            chrome.runtime.sendMessage(message, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    /**
     * Emit an event to background.
     *
     * @param {String} event event
     * @param {Any} detail event detail
     */
    emit(event, detail) {
        let message = JSON.stringify({ type: "event", event, detail });
        chrome.runtime.sendMessage(message, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
        });
    }

    /**
     * Add an event handler.
     *
     * @param {String} event event to handle
     * @param {Function} handler event handler, accepts two arguments:
     *                           detail: event detail
     *                           source: source of the event, chrome.runtime.MessageSender object
     * @returns {Function} a canceler that will remove the handler when called
     */
    on(event, handler) {
        return this._eventManager.on(event, handler);
    }
}

export default Channel;
