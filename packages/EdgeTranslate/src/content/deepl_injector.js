/**
 * Update the href of the frame to get the translate result and send it back to translator.
 *
 * @returns {void} nothing
 */
(() => {
    /**
     * Do not inject in normal page.
     */
    if (window === window.parent) return;

    window.addEventListener("message", (msg) => {
        if (!msg.data.type || msg.data.type !== "edge_translate_deepl_request") return;

        /**
         * Count the time that we have waited for.
         */
        let checkCnt = 0;

        /**
         * Update the href of the frame to get the translate result.
         */
        window.location.href = msg.data.url;

        /**
         * Periodically check whether the translating has been finished.
         */
        const intervalId = setInterval(() => {
            /**
             * "lmt__target_textarea" is the element which holds the translate result.
             */
            const targetTextAreas = document.getElementsByClassName("lmt__target_textarea");
            const result =
                targetTextAreas && targetTextAreas.length > 0 && targetTextAreas[0].innerText
                    ? targetTextAreas[0].innerText.trim()
                    : "";

            if (result.length > 0) {
                /**
                 * Got the translating result, send it back.
                 */
                window.parent.postMessage(
                    { type: "edge_translate_deepl_response", status: 200, result },
                    chrome.runtime.getURL("")
                );
                clearInterval(intervalId);
            } else if (++checkCnt > 10) {
                /**
                 * Waited for too long, stop waiting and signal translator.
                 */
                window.parent.postMessage(
                    {
                        type: "edge_translate_deepl_response",
                        status: 504,
                        errorMsg: "Wait result timeout!",
                    },
                    chrome.runtime.getURL("")
                );
                clearInterval(intervalId);
            }
        }, 500);
    });
})();
