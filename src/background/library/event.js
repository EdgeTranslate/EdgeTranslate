/**
 * Background event manager.
 */
class EventManager {
    constructor() {
        /**
         * Events.
         */
        this.EVENTS = Object.freeze({
            TRANSLATE_START: 0,
            TRANSLATE_FINISHED: 1,
            TRANSLATE_ERROR: 2,
            PRONOUNCE_START: 3,
            PRONOUNCE_FINISHED: 4,
            PRONOUNCE_ERROR: 5,
        });

        /**
         * Event listeners.
         *
         * @type {Map<Number, Set<Function>>}
         */
        this.EVENT_LISTENERS = new Map();
    }

    /**
     * Add an event listener.
     *
     * @param {Number} event event
     * @param {Function} listener listener, with one argument providing the detail of the event.
     */
    addEventListener(event, listener) {
        if (!this.EVENT_LISTENERS.has(event)) {
            this.EVENT_LISTENERS.set(event, new Set());
        }

        this.EVENT_LISTENERS.get(event).add(listener);
    }

    /**
     * Remove an event listener.
     *
     * @param {Number} event event
     * @param {Function} listener listener, with one argument providing the detail of the event
     */
    removeEventListener(event, listener) {
        if (!this.EVENT_LISTENERS.has(event)) {
            return;
        }

        this.EVENT_LISTENERS.get(event).delete(listener);
    }

    /**
     * Trigger an event.
     *
     * @param {Number} event event to trigger
     * @param {Object} detail event detail
     */
    triggerEvent(event, detail) {
        if (!this.EVENT_LISTENERS.has(event)) {
            return;
        }

        // Prevent modification on detail.
        Object.freeze(detail);

        let listeners = this.EVENT_LISTENERS.get(event);
        for (let listener of listeners) {
            listener(detail);
        }
    }
}

/**
 * Create and export default event manager object.
 */
const EVENT_MANAGER = new EventManager();
export default EVENT_MANAGER;
