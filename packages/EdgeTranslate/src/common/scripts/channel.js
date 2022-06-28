import EventManager from "./event.js";

/**
 * Channel for inter-context communication.
 *
 * A chrome extension typically contains 4 types of context: background, popup,
 * options and content scripts. Communication between these contexts relies on
 * chrome.runtime.sendMessage and chrome.tabs.sendMessage.
 *
 * This module provides two communication model:
 *   * request/response
 *   * event trigger/listen
 *
 * based on chrome.runtime.sendMessage and chrome.tabs.sendMessage.
 */
class Channel {
    constructor() {
        /**
         * @type {Map<String, Function>} services
         */
        this._services = new Map();

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

                if (!parsed || !parsed.type) {
                    console.error(`Bad message: ${message}`);
                    return;
                }

                switch (parsed.type) {
                    case "event":
                        this._eventManager.emit(parsed.event, parsed.detail, sender);
                        callback && callback();
                        break;
                    case "service": {
                        const server = this._services.get(parsed.service);
                        if (!server) break;

                        // We can call the callback only when we really provide the requested service.
                        server(parsed.params, sender).then(
                            (result) => callback && callback(result)
                        );
                        return true;
                    }
                    default:
                        console.error(`Unknown message type: ${message.type}`);
                        break;
                }
                return;
            }).bind(this)
        );
    }

    /**
     * Provide a service.
     *
     * @param {String} service service
     * @param {Function} server server, server function must return a Promise of the response
     */
    provide(service, server) {
        this._services.set(service, server);
    }

    /**
     * Send a request and get a response.
     *
     * @param {String} service service name
     * @param {Any} params service parameters
     * @returns {Promise<Any>} promise of the response
     */
    request(service, params) {
        const message = JSON.stringify({ type: "service", service, params });

        return new Promise((resolve, reject) => {
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
     * Send a request to the specified tab and get a response.
     *
     * @param {Number} tabId tab id
     * @param {String} service service
     * @param {Any} params service parameters
     * @returns {Promise<Any>} promise of the response
     */
    requestToTab(tabId, service, params) {
        const send = this._getTabMessageSender();
        if (!send) {
            return Promise.reject("Can not send message to tabs in current context!");
        }

        const message = JSON.stringify({ type: "service", service, params });
        return send(tabId, message);
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

    /**
     * Emit an event.
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
     * Emit an event to specified tabs.
     *
     * @param {Number | Array<Number>} tabIds tab ids
     * @param {String} event event
     * @param {Any} detail event detail
     */
    emitToTabs(tabIds, event, detail) {
        const send = this._getTabMessageSender();
        if (!send) {
            console.error("Can not send message to tabs in current context!");
            return;
        }

        // If tabIds is a number, wrap it up with an array.
        if (typeof tabIds === "number") {
            tabIds = [tabIds];
        }

        const message = JSON.stringify({ type: "event", event, detail });
        for (let tabId of tabIds) {
            send(tabId, message).catch((error) => console.error(error));
        }
    }

    /**
     * Internal method
     *
     * Get the message sending function for sending message to tabs.
     *
     * @returns {Function | null} message sender
     */
    _getTabMessageSender() {
        if (BROWSER_ENV === "firefox") {
            if (!browser.tabs || !browser.tabs.sendMessage) {
                return null;
            }

            // Firefox uses Promise, return directly.
            return browser.tabs.sendMessage;
        }

        if (!chrome.tabs || !chrome.tabs.sendMessage) {
            return null;
        }

        // Chrome uses callback, wrap it up.
        return (tabId, message) => {
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tabId, message, (result) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(result);
                    }
                });
            });
        };
    }
}

export default Channel;
