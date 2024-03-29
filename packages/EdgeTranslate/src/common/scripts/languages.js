/**
 * a map from abbreviation of languages that supported by browsers to abbreviation of those supported by Edge Translate
 */
const BROWSER_LANGUAGES_MAP = {
    ach: "ach",
    ady: "en",
    af: "af",
    "af-NA": "af",
    "af-ZA": "af",
    ak: "aka",
    am: "am",
    ar: "ar",
    "ar-AR": "ar",
    "ar-MA": "ar",
    "ar-SA": "ar",
    "ay-BO": "aym",
    az: "az",
    "az-AZ": "az",
    "be-BY": "be",
    bg: "bg",
    "bg-BG": "bg",
    bn: "bn",
    "bn-IN": "bn",
    "bn-BD": "bn",
    "bs-BA": "bs",
    ca: "ca",
    "ca-ES": "ca",
    cak: "en",
    ceb: "ceb",
    "ck-US": "chr",
    co: "co",
    cs: "cs",
    "cs-CZ": "cs",
    cy: "cy",
    "cy-GB": "cy",
    da: "da",
    "da-DK": "da",
    de: "de",
    "de-AT": "de",
    "de-DE": "de",
    "de-CH": "de",
    dsb: "en",
    el: "el",
    "el-GR": "el",
    en: "en",
    "en-GB": "en",
    "en-AU": "en",
    "en-CA": "en",
    "en-IE": "en",
    "en-IN": "en",
    "en-PI": "en",
    "en-UD": "en",
    "en-US": "en",
    "en-ZA": "en",
    "en@pirate": "en",
    eo: "eo",
    "eo-EO": "eo",
    es: "es",
    "es-AR": "es",
    "es-419": "es",
    "es-CL": "es",
    "es-CO": "es",
    "es-EC": "es",
    "es-ES": "es",
    "es-LA": "es",
    "es-NI": "es",
    "es-MX": "es",
    "es-US": "es",
    "es-VE": "es",
    et: "et",
    "et-EE": "et",
    eu: "eu",
    "eu-ES": "eu",
    fa: "fa",
    "fa-IR": "fa",
    "fb-LT": "en",
    ff: "en",
    fi: "fi",
    "fi-FI": "fi",
    "fo-FO": "fao",
    fr: "fr",
    "fr-CA": "fr",
    "fr-FR": "fr",
    "fr-BE": "fr",
    "fr-CH": "fr",
    "fy-NL": "fy",
    ga: "ga",
    "ga-IE": "ga",
    gd: "gd",
    gl: "gl",
    "gl-ES": "gl",
    "gn-PY": "grn",
    "gu-IN": "gu",
    "gx-GR": "el",
    ha: "ha",
    haw: "haw",
    he: "he",
    "he-IL": "he",
    hi: "hi",
    "hi-IN": "hi",
    hmn: "hmn",
    hr: "hr",
    "hr-HR": "hr",
    hsb: "en",
    ht: "ht",
    hu: "hu",
    "hu-HU": "hu",
    "hy-AM": "hy",
    id: "id",
    "id-ID": "id",
    ig: "ig",
    is: "is",
    "is-IS": "is",
    it: "it",
    "it-IT": "it",
    iw: "he",
    ja: "ja",
    "ja-JP": "ja",
    "jv-ID": "jw",
    "ka-GE": "ka",
    "kk-KZ": "kk",
    km: "km",
    "km-KH": "km",
    kab: "kab",
    kn: "kn",
    "kn-IN": "kn",
    ko: "ko",
    "ko-KR": "ko",
    "ku-TR": "ku",
    ky: "ky",
    la: "la",
    "la-VA": "la",
    lb: "lb",
    "li-NL": "lim",
    lo: "lo",
    lt: "lt",
    "lt-LT": "lt",
    lv: "lv",
    "lv-LV": "lv",
    mai: "mai",
    "mg-MG": "mg",
    mi: "mi",
    mk: "mk",
    "mk-MK": "mk",
    ml: "ml",
    "ml-IN": "ml",
    "mn-MN": "mn",
    mr: "mr",
    "mr-IN": "mr",
    ms: "ms",
    "ms-MY": "ms",
    mt: "mt",
    "mt-MT": "mt",
    my: "my",
    no: "no",
    nb: "no",
    "nb-NO": "no",
    ne: "ne",
    "ne-NP": "ne",
    nl: "nl",
    "nl-BE": "nl",
    "nl-NL": "nl",
    "nn-NO": "no",
    ny: "ny",
    oc: "oci",
    "or-IN": "or",
    pa: "pa",
    "pa-IN": "pa",
    pl: "pl",
    "pl-PL": "pl",
    "ps-AF": "ps",
    pt: "pt",
    "pt-BR": "pt",
    "pt-PT": "pt",
    "qu-PE": "que",
    "rm-CH": "roh",
    ro: "ro",
    "ro-RO": "ro",
    ru: "ru",
    "ru-RU": "ru",
    "sa-IN": "san",
    sd: "sd",
    "se-NO": "sme",
    "si-LK": "si",
    sk: "sk",
    "sk-SK": "sk",
    sl: "sl",
    "sl-SI": "sl",
    sm: "sm",
    sn: "sn",
    "so-SO": "so",
    sq: "sq",
    "sq-AL": "sq",
    sr: "sr",
    "sr-RS": "sr",
    st: "st",
    su: "su",
    sv: "sv",
    "sv-SE": "sv",
    sw: "sw",
    "sw-KE": "sw",
    ta: "ta",
    "ta-IN": "ta",
    te: "te",
    "te-IN": "te",
    tg: "tg",
    "tg-TJ": "tg",
    th: "th",
    "th-TH": "th",
    tl: "fil",
    "tl-PH": "fil",
    tlh: "tlh",
    tr: "tr",
    "tr-TR": "tr",
    "tt-RU": "tat",
    uk: "uk",
    "uk-UA": "uk",
    ur: "ur",
    "ur-PK": "ur",
    uz: "uz",
    "uz-UZ": "uz",
    vi: "vi",
    "vi-VN": "vi",
    "xh-ZA": "xh",
    yi: "yi",
    "yi-DE": "yi",
    yo: "yo",
    zh: "zh-CN",
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
    "zh-CN": "zh-CN",
    "zh-HK": "zh-TW",
    "zh-SG": "zh-CN",
    "zh-TW": "zh-TW",
    "zu-ZA": "zu",
};

/**
 * Export languages and browser languages map.
 */
export { BROWSER_LANGUAGES_MAP };
