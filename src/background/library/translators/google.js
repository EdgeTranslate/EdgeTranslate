import axios from "../axios.js";
import { log } from "../../../common/scripts/common.js";

/**
 * Language maps.
 */
const LANGUAGES = [
    ["auto", "auto"],
    ["zh-CN", "zh-CN"],
    ["zh-TW", "zh-TW"],
    ["en", "en"],
    ["af", "af"],
    ["am", "am"],
    ["ar", "ar"],
    ["az", "az"],
    ["be", "be"],
    ["bg", "bg"],
    ["bn", "bn"],
    ["bs", "bs"],
    ["ca", "ca"],
    ["ceb", "ceb"],
    ["co", "co"],
    ["cs", "cs"],
    ["cy", "cy"],
    ["da", "da"],
    ["de", "de"],
    ["el", "el"],
    ["eo", "eo"],
    ["es", "es"],
    ["et", "et"],
    ["eu", "eu"],
    ["fa", "fa"],
    ["fi", "fi"],
    ["fr", "fr"],
    ["fy", "fy"],
    ["ga", "ga"],
    ["gd", "gd"],
    ["gl", "gl"],
    ["gu", "gu"],
    ["ha", "ha"],
    ["haw", "haw"],
    ["he", "he"],
    ["hi", "hi"],
    ["hmn", "hmn"],
    ["hr", "hr"],
    ["ht", "ht"],
    ["hu", "hu"],
    ["hy", "hy"],
    ["id", "id"],
    ["ig", "ig"],
    ["is", "is"],
    ["it", "it"],
    ["ja", "ja"],
    ["jw", "jw"],
    ["ka", "ka"],
    ["kk", "kk"],
    ["km", "km"],
    ["kn", "kn"],
    ["ko", "ko"],
    ["ku", "ku"],
    ["ky", "ky"],
    ["la", "la"],
    ["lb", "lb"],
    ["lo", "lo"],
    ["lt", "lt"],
    ["lv", "lv"],
    ["mg", "mg"],
    ["mi", "mi"],
    ["mk", "mk"],
    ["ml", "ml"],
    ["mn", "mn"],
    ["mr", "mr"],
    ["ms", "ms"],
    ["mt", "mt"],
    ["my", "my"],
    ["ne", "ne"],
    ["nl", "nl"],
    ["no", "no"],
    ["ny", "ny"],
    ["pl", "pl"],
    ["ps", "ps"],
    ["pt", "pt"],
    ["ro", "ro"],
    ["ru", "ru"],
    ["sd", "sd"],
    ["si", "si"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["sm", "sm"],
    ["sn", "sn"],
    ["so", "so"],
    ["sq", "sq"],
    ["sr", "sr"],
    ["st", "st"],
    ["su", "su"],
    ["sv", "sv"],
    ["sw", "sw"],
    ["ta", "ta"],
    ["te", "te"],
    ["tg", "tg"],
    ["th", "th"],
    ["fil", "tl"],
    ["tr", "tr"],
    ["ug", "ug"],
    ["uk", "uk"],
    ["ur", "ur"],
    ["uz", "uz"],
    ["vi", "vi"],
    ["xh", "xh"],
    ["yi", "yi"],
    ["yo", "yo"],
    ["zu", "zu"]
];

/**
 * Google translate interface.
 */
class GoogleTranslator {
    constructor() {
        /**
         * Max retry times.
         */
        this.MAX_RETRY = 3;

        // tk需要的密钥
        this.TKK = [434217, 1534559001];

        /**
         * Translate API.
         */
        this.HOST = "https://translate.google.cn/";
        this.TRANSLATE_URL =
            this.HOST +
            "translate_a/single?ie=UTF-8&client=webapp&otf=1&ssel=0&tsel=0&kc=5&dt=t&dt=at&dt=bd&dt=ex&dt=md&dt=rw&dt=ss&dt=rm";
        this.TTS_URL = this.HOST + "translate_tts?ie=UTF-8&client=webapp";

        /**
         * Language to translator language code.
         */
        this.LAN_TO_CODE = new Map(LANGUAGES);

        /**
         * Translator language code to language.
         */
        this.CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));

        /**
         * Audio instance.
         */
        this.AUDIO = new Audio();
    }

    /* eslint-disable */
    /**
     * Generate TK.
     *
     * @param {String} a parameter
     * @param {String} b parameter
     * @param {String} c parameter
     *
     * @returns {String} request TK
     */
    generateTK(a, b, c) {
        b = Number(b) || 0;
        let e = [];
        let f = 0;
        let g = 0;
        for (; g < a.length; g++) {
            let l = a.charCodeAt(g);
            128 > l
                ? (e[f++] = l)
                : (2048 > l
                      ? (e[f++] = (l >> 6) | 192)
                      : (55296 == (l & 64512) &&
                        g + 1 < a.length &&
                        56320 == (a.charCodeAt(g + 1) & 64512)
                            ? ((l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023)),
                              (e[f++] = (l >> 18) | 240),
                              (e[f++] = ((l >> 12) & 63) | 128))
                            : (e[f++] = (l >> 12) | 224),
                        (e[f++] = ((l >> 6) & 63) | 128)),
                  (e[f++] = (l & 63) | 128));
        }
        a = b;
        for (f = 0; f < e.length; f++) {
            (a += e[f]), (a = this._magic(a, "+-a^+6"));
        }
        a = this._magic(a, "+-3^+b+-f");
        a ^= Number(c) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1e6;
        return a.toString() + "." + (a ^ b);
    }

    /**
     * Generate magic number.
     *
     * @param {String} a parameter
     * @param {String} b parameter
     *
     * @returns {String} magic number
     */
    _magic(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2),
                d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d),
                d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? (a + d) & 4294967295 : a ^ d;
        }
        return a;
    }
    /* eslint-enable */

    /**
     * Update TKK from Google translate page.
     *
     * @returns {Promise<void>} promise
     */
    async updateTKK() {
        const response = await axios.get(this.HOST);

        let body = response.data;
        let tkk = (body.match(/TKK=(.*?)\(\)\)'\);/i) || [""])[0]
            .replace(/\\x([0-9A-Fa-f]{2})/g, "") // remove hex chars
            .match(/[+-]?\d+/g);
        if (tkk) {
            this.TKK[0] = Number(tkk[2]);
            this.TKK[1] = Number(tkk[0]) + Number(tkk[1]);
        } else {
            tkk = body.match(/TKK[=:]['"](\d+?)\.(\d+?)['"]/i);
            if (tkk) {
                this.TKK[0] = Number(tkk[1]);
                this.TKK[1] = Number(tkk[2]);
            }
        }
    }

    /**
     * Parse Google translate result.
     *
     * @param {Object} response Google translate response
     *
     * @returns {Object} parsed result
     */
    parseResult(response) {
        let result = new Object();
        for (let i = 0; i < response.length; i++) {
            if (response[i]) {
                let items = response[i];
                switch (i) {
                    // 单词的基本意思和音标
                    case 0: {
                        let mainMeanings = [];
                        let originalTexts = [];
                        let lastIndex = items.length - 1;

                        for (let j = 0; j <= lastIndex; j++) {
                            mainMeanings.push(items[j][0]);
                            originalTexts.push(items[j][1]);
                        }
                        // 根据源文本将翻译结果格式化
                        result.mainMeaning = mainMeanings.join("").replace(/\n|\r/g, "<br/>");
                        result.originalText = originalTexts.join("");
                        try {
                            if (lastIndex > 0) {
                                if (items[lastIndex][2] && items[lastIndex][2].length > 0) {
                                    result.tPronunciation = items[lastIndex][2];
                                }

                                if (items[lastIndex][3] && items[lastIndex][3].length > 0) {
                                    result.sPronunciation = items[lastIndex][3];
                                }
                            }
                        } catch (error) {
                            log(error);
                        }
                        // log("text: " + result.originalText + "\nmeaning: " + result.mainMeaning);
                        break;
                    }
                    // 单词的所有词性及对应的意思
                    case 1:
                        result.detailedMeanings = new Array();
                        items.forEach(item =>
                            result.detailedMeanings.push({
                                pos: item[0],
                                meaning: item[1].join(", ")
                            })
                        );
                        // log("detailedMeanings: " + JSON.stringify(result.detailedMeanings));
                        break;
                    case 2:
                        result.from = items;
                        // log(result.from);
                        break;
                    // 单词的定义及对应例子
                    case 12:
                        result.definitions = new Array();
                        items.forEach(item => {
                            item[1].forEach(element => {
                                result.definitions.push({
                                    pos: item[0],
                                    meaning: element[0],
                                    example: element[2]
                                });
                            });
                        });
                        // log("definitions: " + JSON.stringify(result.definitions));
                        break;
                    // 单词的例句
                    case 13:
                        result.examples = new Array();
                        items.forEach(item =>
                            item.forEach(element =>
                                result.examples.push({ source: null, target: element[0] })
                            )
                        );
                        // log("examples: " + JSON.stringify(result.examples));
                        break;
                    default:
                        break;
                }
            }
        }
        return result;
    }

    /**
     * Get supported languages of this API.
     *
     * @returns {Set<String>} supported languages
     */
    supportedLanguages() {
        return new Set(this.LAN_TO_CODE.keys());
    }

    /**
     * Detect the language of given text.
     *
     * @param {String} text text to detect
     *
     * @returns {Promise<String>} detected language Promise
     */
    detect(text) {
        let retryCount = 0;
        let detectOnce = async () => {
            let query = "&sl=auto&tl=zh-cn";
            query +=
                "&tk=" +
                this.generateTK(text, this.TKK[0], this.TKK[1]) +
                "&q=" +
                encodeURIComponent(text);

            /**
             * Google uses 4xx errors to indicate request parameters invalid, so axios should
             * not throw error when status code is less than 500.
             */
            const response = await axios.get(this.TRANSLATE_URL + query, {
                validateStatus: status => status < 500
            });

            if (response.status === 200) {
                return this.CODE_TO_LAN.get(response.data[2]);
            }

            /**
             * 429 means token outdated, update token and retry.
             */
            if (response.status === 429 && retryCount < this.MAX_RETRY) {
                retryCount++;
                return await this.updateTKK().then(detectOnce);
            }

            throw {
                errorType: "API_ERR",
                errorCode: response.status,
                errorMsg: "Detect failed.",
                errorAct: {
                    api: "google",
                    action: "detect",
                    text: text,
                    from: null,
                    to: null
                }
            };
        };

        return detectOnce();
    }

    /**
     * Translate given text.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} translation Promise
     */
    translate(text, from, to) {
        let retryCount = 0;
        let translateOnce = async () => {
            let query = "&sl=" + this.LAN_TO_CODE.get(from) + "&tl=" + this.LAN_TO_CODE.get(to);
            query +=
                "&tk=" +
                this.generateTK(text, this.TKK[0], this.TKK[1]) +
                "&q=" +
                encodeURIComponent(text);

            /**
             * Google uses 4xx errors to indicate request parameters invalid, so axios should
             * not throw error when status code is less than 500.
             */
            const response = await axios.get(this.TRANSLATE_URL + query, {
                validateStatus: status => status < 500
            });

            if (response.status === 200) {
                let result = this.parseResult(response.data);
                return result;
            }

            /**
             * 429 means token outdated, update token and retry.
             */
            if (response.status === 429 && retryCount < this.MAX_RETRY) {
                retryCount++;
                return await this.updateTKK().then(translateOnce);
            }

            throw {
                errorType: "API_ERR",
                errorCode: response.status,
                errorMsg: "Translate failed.",
                errorAct: {
                    api: "google",
                    action: "translate",
                    text: text,
                    from: from,
                    to: to
                }
            };
        };

        return translateOnce();
    }

    /**
     * Pronounce text.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed pronounce speed, "fast" or "slow"
     *
     * @returns {Promise<void>} Promise of playing
     */
    async pronounce(text, language, speed) {
        this.stopPronounce();
        let speedValue = speed === "fast" ? "0.2" : "0.8";
        this.AUDIO.src =
            this.TTS_URL +
            "&q=" +
            encodeURIComponent(text) +
            "&tl=" +
            this.LAN_TO_CODE.get(language) +
            "&ttsspeed=" +
            speedValue +
            "&tk=" +
            this.generateTK(text, this.TKK[0], this.TKK[1]);
        try {
            await this.AUDIO.play();
        } catch (error) {
            // TODO: handle API_ERR and NET_ERR differently.
            throw {
                errorType: "NET_ERR",
                errorCode: 0,
                errorMsg: error.message,
                errorAct: {
                    api: "google",
                    action: "pronounce",
                    text: text,
                    from: language,
                    to: null
                }
            };
        }
    }

    /**
     * Stop pronouncing.
     */
    stopPronounce() {
        if (!this.AUDIO.paused) {
            this.AUDIO.pause();
        }
    }
}

/**
 * Create the default Translator object.
 */
const TRANSLATOR = new GoogleTranslator();
export default TRANSLATOR;
