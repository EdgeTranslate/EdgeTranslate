import axios from "../axios.js";
import Messager from "common/scripts/messager.js";

/**
 * Supported languages.
 */
const LANGUAGES = [
    ["auto", "auto"],
    ["zh-CN", "zh"],
    ["en", "en"],
    ["ja", "jp"],
    ["ko", "kr"],
    ["fr", "fr"],
    ["es", "es"],
    ["it", "it"],
    ["de", "de"],
    ["tr", "tr"],
    ["ru", "ru"],
    ["pt", "pt"],
    ["vi", "vi"],
    ["id", "id"],
    ["th", "th"],
    ["ms", "ms"],
    ["ar", "ar"],
    ["hi", "hi"]
];

/**
 * Message receiver.
 */
const RECEIVER = "tencent";

/**
 * Title of the message.
 */
const TENCENT_TOKEN_UPDATED = "tencent_token_updated";

/**
 * This piece of code is used to watch tencent translating home page loading.
 *
 * Content scripts run in isolated worlds so they can not access window globals
 * set by the original page. Therefore we create a script element in the DOM to
 * out break the isolated world and access those globals.
 *
 * In the script element, we periodically check if qtk and qtv had been set by
 * Tencent scripts. Once they were set, we post a message to tell content script
 * about it, The content script then close the tab and ask TencentTranslator
 * to go on translating.
 */
const HOME_PAGE_LOADING_WATCHER = `
    let watcher = document.createElement("script");
    watcher.textContent = \`let intervalId = setInterval(() => {
        if (window.qtk && window.qtv && window.qtk.length > 0 && window.qtv.length > 0) {
            window.postMessage("et_tencent_token_updated", "*");
            clearInterval(intervalId);
        }
    }, 50);\`;
    document.body.appendChild(watcher);

    window.addEventListener("message", event => {
        if (event.data === "et_tencent_token_updated") {
            chrome.runtime.sendMessage(JSON.stringify({
                to: { ${RECEIVER}: true },
                title: "${TENCENT_TOKEN_UPDATED}"
            }));
            window.close();
        }
    });
`;

/**
 * Tencent translator.
 */
class TencentTranslator {
    constructor() {
        /**
         * Max retry times.
         */
        this.MAX_RETRY = 1;

        /**
         * Request tokens
         */
        this.qtk = "";
        this.qtv = "";

        /**
         * Base url.
         */
        this.BASE_URL = "https://fanyi.qq.com";

        /**
         * Request headers.
         */
        this.HEADERS = {
            // Origin: this.BASE_URL
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
         * TTS audio instance.
         */
        this.AUDIO = new Audio();
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
     * Request Tencent translate home page in a new tab to update cookies.
     *
     * @returns {Promise<void>} request finished
     */
    async requestHomePage() {
        /**
         * Create a tab to start requesting https://fanyi.qq.com
         */
        let tabId = await new Promise((resolve, reject) =>
            chrome.tabs.create({ url: this.BASE_URL, active: false }, tab => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError.message);
                    return;
                }

                resolve(tab.id);
            })
        );

        /**
         * After token updated by Tencent home page, a message will be sent to background page
         * so that TencentTranslator will know that it can go on translating.
         */
        chrome.tabs.executeScript(tabId, {
            code: HOME_PAGE_LOADING_WATCHER,
            runAt: "document_end"
        });

        /**
         * Wait until token updated.
         */
        await new Promise(resolve => {
            Messager.receive(RECEIVER, message => {
                if (message.title === TENCENT_TOKEN_UPDATED) resolve();
                return Promise.resolve();
            });
        });
    }

    /**
     * Update request tokens.
     *
     * @returns {Promise<void>} request Promise.
     */
    async updateTokens() {
        // Update cookies first.
        await this.requestHomePage();

        // Get qtk and qrv from cookies.
        return new Promise(resolve => {
            chrome.cookies.getAll({ url: this.BASE_URL }, cookies => {
                for (let cookie of cookies) {
                    if (cookie.name === "qtv") {
                        this.qtv = cookie.value;
                    } else if (cookie.name === "qtk") {
                        this.qtk = cookie.value;
                    }
                }
                resolve();
            });
        });
    }

    /**
     * Parse Google translate result.
     *
     * @param {Object} response Google translate response
     * @param {String} originalText original text
     *
     * @returns {Object} parsed result
     */
    parseResult(response, originalText) {
        // Parse original text and main meaning.
        let result = { originalText: "", mainMeaning: "" };
        for (let record of response.translate.records) {
            result.originalText += record.sourceText;
            result.mainMeaning += record.targetText.split(/\s*\/\s*/g)[0];
        }

        // Unescape html characters.
        let parser = new DOMParser();
        result.originalText = parser.parseFromString(
            result.originalText,
            "text/html"
        ).documentElement.textContent;
        result.mainMeaning = parser.parseFromString(
            result.mainMeaning,
            "text/html"
        ).documentElement.textContent;

        // In case the original text is not returned by the API.
        if (!result.originalText || result.originalText.length <= 0) {
            result.originalText = originalText;
        }

        if (response.suggest && response.suggest.data && response.suggest.data.length > 0) {
            if (response.suggest.data[0].prx_ph_AmE) {
                result.sPronunciation = response.suggest.data[0].prx_ph_AmE;
            }

            if (response.suggest.data[0].examples_json) {
                result.examples = JSON.parse(response.suggest.data[0].examples_json).basic.map(
                    item => {
                        return { source: item.sourceText, target: item.targetText };
                    }
                );
            }
        }

        if (response.dict && response.dict.abstract && response.dict.abstract.length > 0) {
            result.detailedMeanings = response.dict.abstract.map(item => {
                return { pos: item.ps, meaning: item.explanation.join(", ") };
            });
        }

        return result;
    }

    /**
     * Detect language of given text.
     *
     * @param {String} text text to detect
     *
     * @returns {Promise<String>} detected language Promise
     */
    async detect(text) {
        const response = await axios({
            method: "POST",
            baseURL: this.BASE_URL,
            url: "/api/translate",
            headers: this.HEADERS,
            data: new URLSearchParams({
                source: this.LAN_TO_CODE.get("auto"),
                target: this.LAN_TO_CODE.get("zh-CN"),
                sourceText: text
            })
        });

        let result = response.data.translate.source;
        if (!result || result.length <= 0) {
            throw {
                errorType: "API_ERR",
                errorCode: response.status,
                errorMsg: "Detect failed.",
                errorAct: {
                    api: "tencent",
                    action: "detect",
                    text: text,
                    from: null,
                    to: null
                }
            };
        }
        return this.CODE_TO_LAN.get(result);
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
            const response = await axios({
                method: "POST",
                baseURL: this.BASE_URL,
                url: "/api/translate",
                headers: this.HEADERS,
                data: new URLSearchParams({
                    source: this.LAN_TO_CODE.get(from),
                    target: this.LAN_TO_CODE.get(to),
                    sourceText: text,
                    qtv: this.qtv,
                    qtk: this.qtk,
                    sessionUuid: "translate_uuid" + new Date().getTime()
                })
            });

            // Succeed flag.
            let succeeded = false;

            if (response.data.dict) {
                // Translated text is a word with detailed meanings.
                succeeded = true;
            } else if (
                response.data.translate &&
                response.data.translate.records[0].targetText.length > 0 &&
                (text.trim().indexOf(" ") > -1 || retryCount >= this.MAX_RETRY)
            ) {
                // Translated text is either a word without detailed meanings or a sentence.
                succeeded = true;
            }

            // Translate succeeded.
            if (succeeded) {
                let result = this.parseResult(response.data, text);
                return result;
            }

            // Retry.
            if (retryCount < this.MAX_RETRY) {
                retryCount++;
                return this.updateTokens().then(translateOnce);
            }

            throw {
                errorType: "API_ERR",
                errorCode: response.status,
                errorMsg: "Translate failed.",
                errorAct: {
                    api: "tencent",
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
     * Pronounce given text.
     *
     * @param {String} text text to pronounce
     * @param {String} language language of text
     * @param {String} speed "fast" or "slow"
     *
     * @returns {Promise<void>} pronounce finished
     */
    // eslint-disable-next-line no-unused-vars
    pronounce(text, language, speed) {
        // Pause audio in case that it's playing.
        this.stopPronounce();

        let retryCount = 0;
        let pronounceOnce = async () => {
            try {
                // Get Tencent guid.
                let guid = await new Promise((resolve, reject) => {
                    chrome.cookies.get({ url: this.BASE_URL, name: "fy_guid" }, cookie => {
                        if (!cookie || !cookie.value) {
                            reject("Tencent guid not found!");
                            return;
                        }
                        resolve(cookie.value);
                    });
                });

                // Construct src url.
                this.AUDIO.src = `${
                    this.BASE_URL
                }/api/tts?platform=PC_Website&lang=${this.LAN_TO_CODE.get(
                    language
                )}&text=${encodeURIComponent(text)}&guid=${guid}`;

                await this.AUDIO.play();
            } catch (error) {
                // Update cookies on failure.
                if (retryCount < this.MAX_RETRY) {
                    retryCount++;
                    return this.requestHomePage().then(pronounceOnce);
                }

                // TODO: handle NET_ERR and API_ERR differently.
                throw {
                    errorType: "NET_ERR",
                    errorCode: 0,
                    errorMsg: error.message,
                    errorAct: {
                        api: "tencent",
                        action: "pronounce",
                        text: text,
                        from: language,
                        to: null
                    }
                };
            }
        };
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
const TRANSLATOR = new TencentTranslator();
export default TRANSLATOR;
