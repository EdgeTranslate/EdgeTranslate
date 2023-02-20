import { PronunciationSpeed, TranslationResult } from "../types";
import axios from "../axios";
/**
 * Supported languages.
 */
const LANGUAGES: [string, string][] = [
    ["auto", "auto"],
    ["bg", "bg"],
    ["et", "et"],
    ["pl", "pl"],
    ["da", "da"],
    ["de", "de"],
    ["ru", "ru"],
    ["fr", "fr"],
    ["fi", "fi"],
    ["nl", "nl"],
    ["zh-CN", "zh"],
    ["cs", "cs"],
    ["lv", "lv"],
    ["lt", "lt"],
    ["ro", "ro"],
    ["pt", "pt"],
    ["ja", "ja"],
    ["sv", "sv"],
    ["sk", "sk"],
    ["sl", "sl"],
    ["es", "es"],
    ["el", "el"],
    ["hu", "hu"],
    ["it", "it"],
    ["en", "en"],
];

/**
 * ChatGPT translator interface.
 */
class ChatGPTTranslator {

    API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    API_KEY = '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';
    /**
     * Language to translator language code.
     */
    LAN_TO_CODE = new Map(LANGUAGES);

    /**
     * Translator language code to language.
     */
    CODE_TO_LAN = new Map(LANGUAGES.map(([lan, code]) => [code, lan]));
    langDetector: any;
    TTSEngine: any;


    constructor(langDetector: any, TTSEngine: any) {
        /**
         * ChatGPT needs help from other translators.
         */
        this.langDetector = langDetector;
        this.TTSEngine = TTSEngine;

    }


    /**
     * Get supported languages of this API.
     *
     * @returns supported languages
     */
    supportedLanguages() {
        return new Set(this.LAN_TO_CODE.keys());
    }

    /**
     * Detect language of given text.
     *
     * @param text text to detect
     *
     * @returns detected language Promise
     */
    async detect(text: string) {
        return await this.langDetector.detect(text);
    }

    /**
     * Translate given text.
     *
     * @param text text to translate
     * @param from source language
     * @param to target language
     *
     * @returns translation Promise
     */
    async translate(text: string, from: string, to: string) {

        const response = await axios.post(this.API_URL, {
            prompt: `Translate "${text}" from ${from} to ${to}:`,
            max_tokens: 1024,
            temperature: 0.7,
            n: 1,
            stop: '\n',
            frequency_penalty: 0,
            presence_penalty: 0,
            model: 'text-davinci-003',
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.API_KEY}`,
            },
        });
        const translation = (response.data as any).choices[0].text.trim();
        return { mainMeaning: translation, originalText: text } as TranslationResult;
    }

    /**
     * Pronounce given text.
     *
     * @param text text to pronounce
     * @param language language of text
     * @param speed "fast" or "slow"
     *
     * @returns pronounce finished
     */
    async pronounce(text: string, language: string, speed: PronunciationSpeed) {
        return await this.TTSEngine.pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    stopPronounce() {
        this.TTSEngine.stopPronounce();
    }
}

export default ChatGPTTranslator;
