export { getDomain, log };

/**
 * 提取给定的url的域名
 *
 * @param {String} url
 */
function getDomain(url) {
    if (url) {
        let URL_PATTERN = /.+:\/+([\w.-]+).*/;
        let groups = url.match(URL_PATTERN);
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

/**
 * set the content text of HTML tags, which have "i18n" class name, with i18n value
 */
export function i18nHTML() {
    let i18nElements = document.getElementsByClassName("i18n");
    for (let i = 0; i < i18nElements.length; i++) {
        // Default "beforeEnd".
        let pos = "beforeEnd";
        if (i18nElements[i].hasAttribute("data-insert-pos")) {
            pos = i18nElements[i].getAttribute("data-insert-pos");
        }

        // 跟随浏览器的语言设置显示内容
        i18nElements[i].insertAdjacentText(
            pos,
            chrome.i18n.getMessage(i18nElements[i].getAttribute("data-i18n-name"))
        );
    }
}
