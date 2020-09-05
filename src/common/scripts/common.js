export { getDomain, log };

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
 * console.log wrapper.
 *
 * @param {Any} message message to log.
 */
function log(message) {
    // eslint-disable-next-line no-console
    console.log(message);
}
