/**
 * Extract domain from given url.
 */
export function getDomain(url: string) {
    if (url) {
        let URL_PATTERN = /.+:\/+([\w.-]+).*/;
        let groups = url.match(URL_PATTERN);
        if (groups) {
            return groups[1];
        }
    }
    return "";
}
