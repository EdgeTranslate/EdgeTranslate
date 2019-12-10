export { getDomain, isPDF };

/**
 * 提取给定的url的域名
 *
 * @param {String} url
 */
function getDomain(url) {
    if (url) {
        var URL_PATTERN = /.+:\/+([\w.-]+).*/;
        var groups = url.match(URL_PATTERN);
        if (groups) {
            return groups[1];
        }
    }
    return "";
}

/**
 * judge if this page is a pdf file
 */
function isPDF() {
    return (
        document.body &&
        document.body.children[0] &&
        document.body.children[0].type === "application/pdf"
    );
}
