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
