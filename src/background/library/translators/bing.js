import axios from "../axios.js";

/**
 * Supported languages.
 */
const LANGUAGES = [
    ["auto", "auto-detect"],
    ["ar", "ar"],
    ["ga", "ga"],
    ["et", "et"],
    ["or", "or"],
    ["bg", "bg"],
    ["is", "is"],
    ["pl", "pl"],
    ["bs", "bs-Latn"],
    ["fa", "fa"],
    ["prs", "prs"],
    ["da", "da"],
    ["de", "de"],
    ["ru", "ru"],
    ["fr", "fr"],
    ["zh-TW", "zh-Hant"],
    ["fil", "fil"],
    ["fj", "fj"],
    ["fi", "fi"],
    ["gu", "gu"],
    ["kk", "kk"],
    ["ht", "ht"],
    ["ko", "ko"],
    ["nl", "nl"],
    ["ca", "ca"],
    ["zh-CN", "zh-Hans"],
    ["cs", "cs"],
    ["kn", "kn"],
    ["otq", "otq"],
    ["tlh", "tlh"],
    ["hr", "hr"],
    ["lv", "lv"],
    ["lt", "lt"],
    ["ro", "ro"],
    ["mg", "mg"],
    ["mt", "mt"],
    ["mr", "mr"],
    ["ml", "ml"],
    ["ms", "ms"],
    ["mi", "mi"],
    ["bn", "bn-BD"],
    ["hmn", "mww"],
    ["af", "af"],
    ["pa", "pa"],
    ["pt", "pt"],
    ["ps", "ps"],
    ["ja", "ja"],
    ["sv", "sv"],
    ["sm", "sm"],
    ["sr-Latn", "sr-Latn"],
    ["sr-Cyrl", "sr-Cyrl"],
    ["no", "nb"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["sw", "sw"],
    ["ty", "ty"],
    ["te", "te"],
    ["ta", "ta"],
    ["th", "th"],
    ["to", "to"],
    ["tr", "tr"],
    ["cy", "cy"],
    ["ur", "ur"],
    ["uk", "uk"],
    ["es", "es"],
    ["he", "iw"],
    ["el", "el"],
    ["hu", "hu"],
    ["it", "it"],
    ["hi", "hi"],
    ["id", "id"],
    ["en", "en"],
    ["yua", "yua"],
    ["yue", "yua"],
    ["vi", "vi"],
    ["ku", "ku"],
    ["kmr", "kmr"]
];

/**
 * Text readers.
 */
const READERS = {
    ar: ["ar-SA", "Male", "ar-SA-Naayf"],
    bg: ["bg-BG", "Male", "bg-BG-Ivan"],
    ca: ["ca-ES", "Female", "ca-ES-HerenaRUS"],
    cs: ["cs-CZ", "Male", "cs-CZ-Jakub"],
    da: ["da-DK", "Female", "da-DK-HelleRUS"],
    de: ["de-DE", "Female", "de-DE-Hedda"],
    el: ["el-GR", "Male", "el-GR-Stefanos"],
    en: ["en-US", "Female", "en-US-JessaRUS"],
    es: ["es-ES", "Female", "es-ES-Laura-Apollo"],
    fi: ["fi-FI", "Female", "fi-FI-HeidiRUS"],
    fr: ["fr-FR", "Female", "fr-FR-Julie-Apollo"],
    he: ["he-IL", "Male", "he-IL-Asaf"],
    hi: ["hi-IN", "Female", "hi-IN-Kalpana-Apollo"],
    hr: ["hr-HR", "Male", "hr-HR-Matej"],
    hu: ["hu-HU", "Male", "hu-HU-Szabolcs"],
    id: ["id-ID", "Male", "id-ID-Andika"],
    it: ["it-IT", "Male", "it-IT-Cosimo-Apollo"],
    ja: ["ja-JP", "Female", "ja-JP-Ayumi-Apollo"],
    ko: ["ko-KR", "Female", "ko-KR-HeamiRUS"],
    ms: ["ms-MY", "Male", "ms-MY-Rizwan"],
    nl: ["nl-NL", "Female", "nl-NL-HannaRUS"],
    nb: ["nb-NO", "Female", "nb-NO-HuldaRUS"],
    no: ["nb-NO", "Female", "nb-NO-HuldaRUS"],
    pl: ["pl-PL", "Female", "pl-PL-PaulinaRUS"],
    pt: ["pt-PT", "Female", "pt-PT-HeliaRUS"],
    ro: ["ro-RO", "Male", "ro-RO-Andrei"],
    ru: ["ru-RU", "Female", "ru-RU-Irina-Apollo"],
    sk: ["sk-SK", "Male", "sk-SK-Filip"],
    sl: ["sl-SL", "Male", "sl-SI-Lado"],
    sv: ["sv-SE", "Female", "sv-SE-HedvigRUS"],
    ta: ["ta-IN", "Female", "ta-IN-Valluvar"],
    te: ["te-IN", "Male", "te-IN-Chitra"],
    th: ["th-TH", "Male", "th-TH-Pattara"],
    tr: ["tr-TR", "Female", "tr-TR-SedaRUS"],
    vi: ["vi-VN", "Male", "vi-VN-An"],
    "zh-Hans": ["zh-CN", "Female", "zh-CN-HuihuiRUS"],
    "zh-Hant": ["zh-CN", "Female", "zh-CN-HuihuiRUS"],
    yue: ["zh-HK", "Female", "zh-HK-TracyRUS"]
};

/**
 * TTS language code.
 */
const TTS_LAN_CODE = {
    ar: "ar-EG",
    ca: "ca-ES",
    da: "da-DK",
    de: "de-DE",
    en: "en-US",
    es: "es-ES",
    fi: "fi-FI",
    fr: "fr-FR",
    hi: "hi-IN",
    it: "it-IT",
    ja: "ja-JP",
    ko: "ko-KR",
    nb: "nb-NO",
    nl: "nl-NL",
    pl: "pl-PL",
    pt: "pt-PT",
    ru: "ru-RU",
    sv: "sv-SE",
    th: "th-TH",
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-HK",
    yue: "zh-HK",
    gu: "gu-IN",
    mr: "mr-IN",
    ta: "ta-IN",
    te: "te-IN",
    tr: "tr-TR"
};

/**
 * Bing translator interface.
 */
class BingTranslator {
    constructor() {
        /**
         * Basic request parameters.
         */
        this.IG = "";
        this.IID = "";

        /**
         * TTS auth info.
         */
        this.TTS_AUTH = { region: "", token: "" };

        /**
         * Request count.
         */
        this.count = 0;

        this.HTMLParser = new DOMParser();

        /**
         * Max retry times.
         */
        this.MAX_RETRY = 1;

        /**
         * Translate API host.
         */
        this.HOST = "https://cn.bing.com/";

        /**
         * Translate API home page.
         */
        this.HOME_PAGE = "https://cn.bing.com/translator";

        /**
         * Request headers.
         */
        this.HEADERS = {
            accept: "*/*",
            "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7",
            "content-type": "application/x-www-form-urlencoded"
        };

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

    /**
     * Get IG and IID for urls.
     *
     * @returns {Promise<void>} IG and IID Promise
     */
    async updateIGIID() {
        const response = await axios.get(this.HOME_PAGE);

        this.IG = response.data.match(/IG:"([a-zA-Z0-9]+)"/)[1];

        let html = this.HTMLParser.parseFromString(response.data, "text/html");
        this.IID = html.getElementById("rich_tta").getAttribute("data-iid");

        // Reset request count.
        this.count = 0;
    }

    /**
     * Parse translate interface result.
     *
     * @param {Object} result translate result
     *
     * @returns {Object} Parsed result
     */
    parseTranslateResult(result, extras) {
        let parsed = extras || new Object();

        try {
            let translations = result[0].translations;
            parsed.mainMeaning = translations[0].text;
            parsed.tPronunciation = translations[0].transliteration.text;
            // eslint-disable-next-line no-empty
        } catch (error) {}

        return parsed;
    }

    /**
     * Parse the lookup interface result.
     *
     * @param {Object} result lookup result
     *
     * @returns {Object} Parsed result
     */
    parseLookupResult(result, extras) {
        let parsed = extras || new Object();

        try {
            parsed.originalText = result[0].displaySource;

            let translations = result[0].translations;
            parsed.mainMeaning = translations[0].displayTarget;
            parsed.tPronunciation = translations[0].transliteration;

            let detailedMeanings = [];
            for (let i in translations) {
                let synonyms = [];
                for (let j in translations[i].backTranslations) {
                    synonyms.push(translations[i].backTranslations[j].displayText);
                }

                detailedMeanings.push({
                    pos: translations[i].posTag,
                    meaning: translations[i].displayTarget,
                    synonyms: synonyms
                });
            }

            parsed.detailedMeanings = detailedMeanings;
            // eslint-disable-next-line no-empty
        } catch (error) {}

        return parsed;
    }

    /**
     * Get TTS auth token.
     *
     * @returns {Promise<void>} request finished Promise
     */
    async updateTTSAuth() {
        let constructParams = () => {
            return {
                method: "POST",
                baseURL: this.HOST,
                url:
                    "tfetspktok?isVertical=1&&IG=" +
                    this.IG +
                    "&IID=" +
                    this.IID +
                    "." +
                    this.count.toString(),
                headers: this.HEADERS,
                data: ""
            };
        };

        const response = await this.request(constructParams, []);
        this.TTS_AUTH.region = response.region;
        this.TTS_AUTH.token = response.token;
    }

    /**
     * Generate TTS request data.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed pronouncing speed, "fast" or "slow"
     *
     * @returns {String} TTS request data
     */
    generateTTSData(text, language, speed) {
        let lanCode = this.LAN_TO_CODE.get(language);
        let reader = READERS[lanCode];
        let ttsLanCode = TTS_LAN_CODE[lanCode];
        let speedValue = speed === "fast" ? "-10.00%" : "-30.00%";
        return (
            "<speak version='1.0' xml:lang='" +
            ttsLanCode +
            "'><voice xml:lang='" +
            ttsLanCode +
            "' xml:gender='" +
            reader[1] +
            "' name='" +
            reader[2] +
            "'><prosody rate='" +
            speedValue +
            "'>" +
            text +
            "</prosody></voice></speak>"
        );
    }

    /**
     * Transform binary data into Base64 encoding.
     *
     * @param {ArrayBuffer} buffer array buffer with audio data
     *
     * @returns {String} Base64 form of binary data in buffer
     */
    arrayBufferToBase64(buffer) {
        let str = "",
            array = new Uint8Array(buffer);

        for (let i = 0; i < array.byteLength; i++) {
            str += String.fromCharCode(array[i]);
        }

        return btoa(str);
    }

    /**
     * Construct detect request parameters dynamically.
     *
     * @param {String} text text to detect
     *
     * @returns {Object} constructed parameters
     */
    constructDetectParams(text) {
        let url =
                "ttranslatev3?isVertical=1&IG=" +
                this.IG +
                "&IID=" +
                this.IID +
                "." +
                this.count.toString(),
            data = "&fromLang=auto-detect&to=zh-Hans&text=" + encodeURIComponent(text);

        return {
            method: "POST",
            baseURL: this.HOST,
            url: url,
            headers: this.HEADERS,
            data: data
        };
    }

    /**
     * Construct translate request parameters dynamically.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Object} constructed parameters
     */
    constructTranslateParams(text, from, to) {
        /**
         * Request the translate api to detect the language of the text and get a basic translation.
         */
        let translateURL = `ttranslatev3?isVertical=1&IG=${this.IG}&IID=${
                this.IID
            }.${this.count.toString()}`,
            translateData = `&fromLang=${this.LAN_TO_CODE.get(from)}&to=${this.LAN_TO_CODE.get(
                to
            )}&text=${encodeURIComponent(text)}`;

        return {
            method: "POST",
            baseURL: this.HOST,
            url: translateURL,
            headers: this.HEADERS,
            data: translateData
        };
    }

    /**
     * Construct lookup request parameters dynamically.
     *
     * @param {String} text text to lookup
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Object} constructed parameters
     */
    constructLookupParams(text, from, to) {
        /**
         * Attempt to request the lookup api to get detailed translation.
         */
        let lookupURL = `tlookupv3?isVertical=1&IG=${this.IG}&IID=${
                this.IID
            }.${this.count.toString()}`,
            lookupData = `&from=${
                // Use detected language.
                from
            }&to=${this.LAN_TO_CODE.get(to)}&text=${encodeURIComponent(text)}`;

        return {
            method: "POST",
            baseURL: this.HOST,
            url: lookupURL,
            headers: this.HEADERS,
            data: lookupData
        };
    }

    /**
     * Construct TTS request parameters dynamically.
     *
     * @param {String} text text to pronounce
     * @param {String} lang language of text
     * @param {String} speed pronounce speed
     *
     * @returns {Object} constructed parameters
     */
    constructTTSParams(text, lang, speed) {
        let url =
            "https://" + this.TTS_AUTH.region + ".tts.speech.microsoft.com/cognitiveservices/v1?";

        let headers = {
            "Content-Type": "application/ssml+xml",
            Authorization: "Bearer " + this.TTS_AUTH.token,
            "X-MICROSOFT-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
            "cache-control": "no-cache"
        };

        return {
            method: "POST",
            baseURL: url,
            headers: headers,
            data: this.generateTTSData(text, lang, speed),
            responseType: "arraybuffer"
        };
    }

    /**
     * Request APIs.
     *
     * This is a wrapper of axios with retrying and error handling supported.
     *
     * @param {Function} constructParams request parameters constructor
     * @param {Array} constructParamsArgs request parameters constructor arguments
     * @param {Boolean} retry whether retry is needed
     *
     * @returns {Promise<Object>} Promise of response data
     */
    async request(constructParams, constructParamsArgs, retry = true) {
        let retryCount = 0;
        let requestOnce = async () => {
            this.count++;
            const response = await axios(constructParams.call(this, ...constructParamsArgs));

            // response.data.statusCode will indicate the info of error when error encountered
            if (!response.data.statusCode || response.data.statusCode < 300) {
                // Parse the actually requested url to get the requested host.
                let responseHost = /(https:\/\/.*\.bing\.com\/).*/g.exec(
                    response.request.responseURL
                );

                /**
                 * Bing redirects user requests based on user region. For example, if you are in China and request
                 * www.bing.com, you will be redirected to cn.bing.com. This causes translating error because IG and IID
                 * for one region are not usable for another. Therefore, we need to update HOST, HOME_PAGE, IG and IID
                 * whenever a redirection happened.
                 *
                 * If the requested host is different from the original host, which means there was a redirection,
                 * update HOST and HOME_PAGE with the redirecting host.
                 */
                if (responseHost && responseHost[1] !== this.HOST) {
                    this.HOST = responseHost[1];
                    this.HOME_PAGE = this.HOST + "translator";
                } else {
                    return response.data;
                }
            }

            // Retry after failure
            if (retry && retryCount < this.MAX_RETRY) {
                retryCount++;
                return await this.updateIGIID().then(requestOnce);
            }

            // Throw error.
            throw {
                errorType: "API_ERR",
                errorCode: response.data.statusCode,
                errorMsg: "Request failed."
            };
        };

        if (!(this.IG.length > 0 && this.IID.length > 0)) {
            await this.updateIGIID();
        }

        return requestOnce();
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
     * Detect language of given text.
     *
     * @param {String} text text to detect
     *
     * @returns {Promise<String>} detected language Promise
     */
    async detect(text) {
        try {
            const response = await this.request(this.constructDetectParams, [text]);
            let result = response[0].detectedLanguage.language;
            return this.CODE_TO_LAN.get(result);
        } catch (error) {
            error.errorMsg = error.errorMsg || error.message;
            error.errorAct = {
                api: "bing",
                action: "detect",
                text: text,
                from: null,
                to: null
            };
            throw error;
        }
    }

    /**
     * Translate given text.
     *
     * This method will request the translate API firstly with 2 purposes:
     *     1. detect the language of the translating text
     *     2. get a basic translation of the text incase lookup is not available
     *
     * After that, it will attempt to request the lookup API to get detailed translation.
     * If that failed, the method will use the translation from the translate API instead.
     *
     * @param {String} text text to translate
     * @param {String} from source language
     * @param {String} to target language
     *
     * @returns {Promise<Object>} translation Promise
     */
    async translate(text, from, to) {
        try {
            /*
             * Use var to prevent putting all of the code that referenced transResponse
             * into this try-catch scope.
             */
            var transResponse = await this.request(this.constructTranslateParams, [text, from, to]);
        } catch (error) {
            error.errorAct = {
                api: "bing",
                action: "translate",
                text: text,
                from: from,
                to: to
            };
            throw error;
        }

        // Set up originalText in case that lookup failed.
        let transResult = this.parseTranslateResult(transResponse, {
            originalText: text
        });

        try {
            const lookupResponse = await this.request(
                this.constructLookupParams,
                [text, transResponse[0].detectedLanguage.language, to],
                false
            );
            return this.parseLookupResult(lookupResponse, transResult);
        } catch (e) {
            return transResult;
        }
    }

    /**
     * Pronounce given text.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed "fast" or "slow"
     *
     * @returns {Promise<void>} pronounce finished
     */
    async pronounce(text, language, speed) {
        // Pause audio in case that it's playing.
        this.stopPronounce();

        let retryCount = 0;
        let pronounceOnce = async () => {
            try {
                const TTSResponse = await this.request(
                    this.constructTTSParams,
                    [text, language, speed],
                    false
                );
                this.AUDIO.src = "data:audio/mp3;base64," + this.arrayBufferToBase64(TTSResponse);
                await this.AUDIO.play();
            } catch (error) {
                if (retryCount < this.MAX_RETRY) {
                    retryCount++;
                    return this.updateTTSAuth().then(pronounceOnce);
                } else {
                    let errorAct = {
                        api: "bing",
                        action: "pronounce",
                        text: text,
                        from: language,
                        to: null
                    };

                    if (error.errorType) {
                        error.errorAct = errorAct;
                        throw error;
                    }

                    throw {
                        errorType: "NET_ERR",
                        errorCode: 0,
                        errorMsg: error.message,
                        errorAct: errorAct
                    };
                }
            }
        };

        if (!(this.TTS_AUTH.region.length > 0 && this.TTS_AUTH.token.length > 0)) {
            await this.updateTTSAuth();
        }

        return pronounceOnce();
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        if (!this.AUDIO.paused) {
            this.AUDIO.pause();
        }
    }
}

/**
 * Create and export default translator object.
 */
const TRANSLATOR = new BingTranslator();
export default TRANSLATOR;
