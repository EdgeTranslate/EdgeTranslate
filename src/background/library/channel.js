import EventManager from "../../common/scripts/event.js";

/**
 * Communication channel for background communicating with popup, options and content scripts.
 */
class Channel {
    constructor() {
        /**
         * @type {EventManager} Event manager.
         */
        this._eventManager = new EventManager();

        /**
         * @type {Map<String, Function>} service handlers
         */
        this._serviceHandlers = new Map();

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
                        this._eventManager.handleEvent(parsed.event, parsed.detail, sender);
                        callback && callback();
                        break;
                    case "service": {
                        const result = this._handleService(parsed.service, parsed.params, sender);
                        callback && callback(result);
                        break;
                    }
                    default:
                        console.error(`Bad message: ${message}`);
                        break;
                }
            }).bind(this)
        );
    }

    /**
     * Provide a service to popup, options or content scripts.
     *
     * @param {String} service service
     * @param {Function} handler service handler
     */
    provide(service, handler) {
        this._serviceHandlers.set(service, handler);
    }

    /**
     * Dispatch an event to popup and options.
     *
     * @param {String} event event
     * @param {Any} detail event detail
     */
    dispatch(event, detail) {
        let message = JSON.stringify({ type: "event", event, detail });
        chrome.runtime.sendMessage(message, () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
        });
    }

    /**
     * Dispatch an event to content scripts.
     *
     * @param {Number | Array<Number>} tabIds tabs that will receive the event
     * @param {String} event event
     * @param {Any} detail event detail
     */
    dispatchToTabs(tabIds, event, detail) {
        let message = JSON.stringify({ type: "event", event, detail });

        if (typeof tabIds === "number") {
            tabIds = [tabIds];
        }

        for (let tabId of tabIds) {
            chrome.tabs.sendMessage(tabId, message, () => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
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
        return this._eventManager.addHandler(event, handler);
    }

    /**
     * Handle a service request.
     *
     * @param {String} service service
     * @param {Any} params service parameters
     * @param {chrome.runtime.MessageSender} client client that requested the service
     * @returns {Any} handle result
     */
    _handleService(service, params, client) {
        const handler = this._serviceHandlers.get(service);
        return handler ? handler(params, client) : Promise.resolve();
    }
}

export default Channel;
