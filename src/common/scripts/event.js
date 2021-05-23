/**
 * Event manager.
 */
class EventManager {
    constructor() {
        /**
         * @type {Number} next handler ID.
         */
        this._handlerID = 1;

        /**
         * @type {Map<String, Set<Number>>} event to handler IDs map
         */
        this._eventToHandlerIDs = new Map();

        /**
         * @type {Map<Number, Function>} handler ID to handler map
         */
        this._handlerIDToHandler = new Map();
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
        const handlerID = this._allocHandlerID();
        this._handlerIDToHandler.set(handlerID, handler);

        if (this._eventToHandlerIDs.has(event)) {
            this._eventToHandlerIDs.get(event).add(handlerID);
        } else {
            this._eventToHandlerIDs.set(event, new Set([handlerID]));
        }

        // Each canceler should be called only once.
        let canceled = false;
        return (() => {
            if (!canceled) {
                canceled = true;
                this._off(event, handlerID);
            } else {
                console.warn("You shouldn't call the canceler more than once!");
            }
        }).bind(this);
    }

    /**
     * Handle an event.
     *
     * @param {String} event event
     * @param {Any} detail event detail
     * @param {Any} source event source
     */
    emit(event, detail, source) {
        const handlerIDs = this._eventToHandlerIDs.get(event);

        if (!handlerIDs) return;

        for (const handlerID of handlerIDs) {
            const handler = this._handlerIDToHandler.get(handlerID);
            handler && handler(detail, source);
        }
    }

    /**
     * Internal method
     *
     * Alloc a handler ID.
     *
     * @returns {Number} an unused handler ID
     */
    _allocHandlerID() {
        while (this._handlerIDToHandler.has(this._handlerID)) {
            this._handlerID = (this._handlerID + 1) % Number.MAX_SAFE_INTEGER;
        }
        return this._handlerID;
    }

    /**
     * Internal method
     *
     * Remove an event handler.
     *
     * @param {String} event event
     * @param {Number} handlerID handler ID
     */
    _off(event, handlerID) {
        const handlerIDs = this._eventToHandlerIDs.get(event);
        handlerIDs && handlerIDs.delete(handlerID);
        this._handlerIDToHandler.delete(handlerID);
    }
}

export default EventManager;
