/**
 * Update the href of the frame to get the translate result and send it back to translator.
 *
 * @returns {void} nothing
 */
window.onload = () => {
    /**
     * Do not inject in normal page.
     */
    if (window === window.parent) return;

    window.addEventListener("message", (msg) => {
        if (!msg.data.type || msg.data.type !== "edge_translate_deepl_request") return;

        /**
         * Update the href of the frame to get the translate result.
         */
        window.location.href = msg.data.url;

        /**
         * Periodically check whether the translating has been finished.
         *
         * "target-dummydiv" is the element which holds the translate result.
         */
        const intervalId = setInterval(() => {
            const targetDummyDIV = document.getElementById("target-dummydiv");
            const result = targetDummyDIV.textContent.trim();
            if (result.length > 0) {
                window.parent.postMessage(
                    { type: "edge_translate_deepl_result", result },
                    chrome.runtime.getURL("")
                );
                clearInterval(intervalId);
            }
        }, 500);
    });
};
