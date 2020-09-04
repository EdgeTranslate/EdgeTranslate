class Messager {
    /**
     * Construct Messager instance.
     *
     * @param {String} owner owner of this messager
     * @param {Object} messageHandlers message handlers
     */
    constructor(owner, messageHandlers) {
        /**
         * Event listeners.
         */
        this.owner = owner;
        this.messageHandlers = messageHandlers;
    }

    send(to, message) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ to: to, message: message }, result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    }

    receive(message) {
        if (!message.to || message.to !== this.owner) {
            return;
        }
    }
}
