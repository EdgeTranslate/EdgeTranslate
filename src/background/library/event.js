class EventManager {
    constructor() {
        // Supported events.
        this.EVENTS = {
            TRANSLATE_START: "translate_start",
            TRANSLATE_FINISH: "translate_finish",
            TRANSLATE_ERROR: "translate_error",
            TRANSLATOR_CONFIG_CHANGED: "translator_config_changed",
            LANGUAGE_SETTING_CHANGED: "language_setting_changed"
        };

        /**
         * Event listeners.
         *
         * @type {Map<String, Set<Function>>} map event to listeners.
         */
        this.eventListeners = new Map();
    }

    /**
     * Add an event listener.
     *
     * @param {String} event event
     * @param {Function} listener event listener
     *
     * @returns {void} nothing
     */
    addEventListener(event, listener) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }

        this.eventListeners.get(event).add(listener);
    }

    /**
     * Remove an event listener.
     *
     * @param {String} event event
     * @param {Function} listener event listener
     *
     * @returns {void} nothing
     */
    removeEventListener(event, listener) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).delete(listener);
        }
    }

    /**
     * Check existence of a given listener.
     *
     * @param {String} event event
     * @param {Function} listener event listener
     *
     * @returns {Boolean} existence of given listener
     */
    hasEventListener(event, listener) {
        return this.eventListeners.has(event) && this.eventListeners.get(event).has(listener);
    }

    /**
     * Trigger an event with detail.
     *
     * @param {String} event event name
     * @param {Object} detail event detail
     *
     * @returns {void} nothing
     */
    triggerEvent(event, detail) {
        if (!this.eventListeners.has(event)) {
            return;
        }

        // Prevent modification of detail.
        Object.freeze(detail);

        for (let listener of this.eventListeners.get(event)) {
            try {
                listener(detail);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
    }
}

/**
 * Create and export the default event manager.
 */
const EVENT_MANAGER = new EventManager();
export default EVENT_MANAGER;
