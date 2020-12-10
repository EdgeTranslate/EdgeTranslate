export default format;

/**
 * This function does two operations:
 *
 * 1. Escape HTML tag to avoid XSS security problems.
 * 2. Replace line breakers with <br/> tag so that line break can be displayed.
 *
 * @param {String} text text to format
 *
 * @returns {String} formatted text
 */
function format(text) {
    const HTML_CHAR_REGEX = /"|&|'|<|>/g;
    const LINE_BREAKERS_REGEX = /\r|\n/g;

    if (typeof text !== "string") return text;
    return text
        .replace(HTML_CHAR_REGEX, expression => {
            let char = expression.charCodeAt(0);
            char = char == 0x20 ? 0xa0 : char;
            return `&#${char};`;
        })
        .replace(LINE_BREAKERS_REGEX, "<br/>");
}
