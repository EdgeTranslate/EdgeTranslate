const fs = require("fs");
const axios = require("axios").default;
const socks = require("socks-proxy-agent").SocksProxyAgent;

const ELEMENT_JS_DIR = "static/google/elms";
const LANGUAGE_NAMES_DIR = "static/google/lans";

const LANGUAGES = [
    "af",
    "am",
    "ar",
    "az",
    "be",
    "bg",
    "bn",
    "bs",
    "ca",
    "ceb",
    "co",
    "cs",
    "cy",
    "da",
    "de",
    "el",
    "en",
    "eo",
    "es",
    "et",
    "eu",
    "fa",
    "fi",
    "fil",
    "fr",
    "fy",
    "ga",
    "gd",
    "gl",
    "gu",
    "ha",
    "haw",
    "he",
    "hi",
    "hmn",
    "hr",
    "ht",
    "hu",
    "hy",
    "id",
    "ig",
    "is",
    "it",
    "ja",
    "jw",
    "ka",
    "kk",
    "km",
    "kn",
    "ko",
    "ku",
    "ky",
    "la",
    "lb",
    "lo",
    "lt",
    "lv",
    "mg",
    "mi",
    "mk",
    "ml",
    "mn",
    "mr",
    "ms",
    "mt",
    "my",
    "ne",
    "nl",
    "no",
    "ny",
    "pl",
    "ps",
    "pt",
    "ro",
    "ru",
    "sd",
    "si",
    "sk",
    "sl",
    "sm",
    "sn",
    "so",
    "sq",
    "sr",
    "st",
    "su",
    "sv",
    "sw",
    "ta",
    "te",
    "tg",
    "th",
    "tr",
    "uk",
    "ur",
    "uz",
    "vi",
    "xh",
    "yi",
    "yo",
    "zh-CN",
    "zh-TW",
    "zu",
];

const TECB = "TECB_1E07F158C6FA4460B352973E9693B329";
const API_KEY = "AIzaSyBWDj0QJvVIx8XOhRegXX5_SrRWxhT5Hs4";

async function get_element_js(language, httpsAgent) {
    let config = httpsAgent !== null ? { httpsAgent } : {};
    const response = await axios.get(
        `https://translate.google.com/translate_a/element.js?cb=${TECB}&client=tee&hl=${language}&nsc=1`,
        config
    );

    if (response.status !== 200) {
        console.log(`Failed to get elm_${language}.js, status code: ${response.status}`);
        return;
    }

    let content = response.data;

    content = content.replace(
        /c\._ps\s*=\s*['"][^'";]+['"]\s*;/g,
        "c._ps = this.EDGE_TRANSLATE_URL + 'google/element_main.css';"
    );

    content = content.replace(
        /c\._plla\s*=\s*\w+\s*\+\s*['"][^'";]+['"]\s*;/g,
        `c._plla = this.EDGE_TRANSLATE_URL + 'google/lans/lan_${language}.js';`
    );

    content = content.replace(
        /_loadCss\(c\._ps\);[\s\n\r\t]*_loadJs\(['"][^'";]+['"]\);/g,
        "_loadCss(c._ps); _loadJs(this.EDGE_TRANSLATE_URL + 'google/element_main.js');"
    );

    fs.writeFileSync(`${ELEMENT_JS_DIR}/elm_${language}.js`, content);
}

async function get_language_names(language, httpsAgent) {
    let config = httpsAgent !== null ? { httpsAgent } : {};
    const response = await axios.get(
        `https://translate-pa.googleapis.com/v1/supportedLanguages?client=tee&display_language=${language}&key=${API_KEY}&callback=callback`,
        config
    );

    if (response.status !== 200) {
        console.log(`Failed to get lan_${language}.js, status code: ${response.status}`);
        return;
    }

    fs.writeFileSync(`${LANGUAGE_NAMES_DIR}/lan_${language}.js`, response.data);
}

fs.mkdirSync(ELEMENT_JS_DIR, { recursive: true });
fs.mkdirSync(LANGUAGE_NAMES_DIR, { recursive: true });

/**
 * Enable proxy if the ALL_PROXY env is set.
 */
let httpsAgent = null;
if (process.env["ALL_PROXY"]) {
    httpsAgent = new socks(process.env["ALL_PROXY"]);
}

for (let language of LANGUAGES) {
    get_element_js(language, httpsAgent).catch((error) => console.log(error));
    get_language_names(language, httpsAgent).catch((error) => console.log(error));
}
