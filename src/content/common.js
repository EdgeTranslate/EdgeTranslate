export { isPDF, isChromePDFViewer, isPDFjsPDFViewer };

/**
 * judge if this page is a pdf file
 */
function isPDF() {
    return isChromePDFViewer() || isPDFjsPDFViewer();
}

/**
 * Check if current page is Chrome PDF Viewer.
 */
function isChromePDFViewer() {
    return (
        document.body &&
        document.body.children[0] &&
        document.body.children[0].type === "application/pdf"
    );
}

/**
 * Check if current page is PDF.js viewer.
 */
function isPDFjsPDFViewer() {
    return (
        window.location.origin + window.location.pathname ===
        chrome.runtime.getURL("pdf/viewer.html")
    );
}

/**
 * detect users select action and take action after the detection
 * This function need to be called in the mouse down listener
 * @param {Node} targetElement target element to be detected
 * @param {Function} actionAfterSelect take this action after the select action detected
 * @param {Function} actionAfterNotSelect take this action if it's not select action
 */
export function detectSelect(targetElement, actionAfterSelect, actionAfterNotSelect) {
    // Remember whether mouse moved.
    let moved = false;

    // inner listener for detecting mousemove and mouseup.
    const detectMouseMove = () => {
        moved = true;
    };

    const detectMouseUp = (event) => {
        // select action detected
        if (moved) {
            if (typeof actionAfterSelect === "function") actionAfterSelect(event);
        } else if (typeof actionAfterNotSelect === "function") {
            // select action isn't detected
            actionAfterNotSelect(event);
        }
        // remove inner event listeners.
        targetElement.removeEventListener("mousemove", detectMouseMove);
        targetElement.removeEventListener("mouseup", detectMouseUp);
    };

    // add inner event listeners
    targetElement.addEventListener("mousemove", detectMouseMove);
    targetElement.addEventListener("mouseup", detectMouseUp);
}
