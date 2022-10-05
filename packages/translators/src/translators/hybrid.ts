import {
    Definition,
    DetailedMeaning,
    Example,
    PronunciationSpeed,
    TranslationResult,
} from "../types";
import BaiduTranslator from "./baidu";
import BingTranslator from "./bing";
import DeepLTranslator from "./deepl";
import GoogleTranslator from "./google";
import TencentTranslator from "./tencent";

export type HybridSupportedTranslators =
    | "BaiduTranslate"
    | "BingTranslate"
    | "DeepLTranslate"
    | "GoogleTranslate"
    | "TencentTranslate";

export type HybridConfig = {
    selections: Selections;
    translators: HybridSupportedTranslators[]; // a collection of used translators which is generated based on selections. The generating process is in options.js.
};
export type Selections = Record<keyof TranslationResult, HybridSupportedTranslators>;

class HybridTranslator {
    channel: any; // communication channel.
    /**
     * Hybrid translator config.
     */
    CONFIG: HybridConfig = {
        selections: {} as Selections,
        translators: [],
    };
    REAL_TRANSLATORS: {
        BaiduTranslate: BaiduTranslator;
        BingTranslate: BingTranslator;
        GoogleTranslate: GoogleTranslator;
        TencentTranslate: TencentTranslator;
        DeepLTranslate: DeepLTranslator;
    };
    MAIN_TRANSLATOR: HybridSupportedTranslators = "GoogleTranslate";

    constructor(config: HybridConfig, channel: any) {
        this.channel = channel;

        /**
         * Real supported translators.
         */
        this.REAL_TRANSLATORS = {
            BaiduTranslate: new BaiduTranslator(),
            BingTranslate: new BingTranslator(),
            GoogleTranslate: new GoogleTranslator(),
            TencentTranslate: new TencentTranslator(channel),
            DeepLTranslate: null as unknown as DeepLTranslator,
        };

        /**
         * DeepL translator needs help from other translators and we choose Google for now.
         */
        this.REAL_TRANSLATORS.DeepLTranslate = new DeepLTranslator(
            this.REAL_TRANSLATORS.BingTranslate,
            this.REAL_TRANSLATORS.BingTranslate
        );

        this.useConfig(config);
    }

    /**
     * Update config.
     *
     * @param {Object} config to use.
     */
    useConfig(config: HybridConfig) {
        /**
         * Validate config.
         */
        if (!config || !config.translators || !config.selections) {
            console.error("Invalid config for HybridTranslator!");
            return;
        }

        this.CONFIG = config;
        this.MAIN_TRANSLATOR = config.selections.mainMeaning;
    }

    /**
     * Get translators that support given source language and target language.
     *
     * @param from source language
     * @param to target language
     *
     * @returns available translators
     */
    getAvailableTranslatorsFor(from: string, to: string) {
        const translators: HybridSupportedTranslators[] = [];
        let translator: HybridSupportedTranslators;
        for (translator in this.REAL_TRANSLATORS) {
            const languages = this.REAL_TRANSLATORS[translator].supportedLanguages();
            if (languages.has(from) && languages.has(to)) {
                translators.push(translator);
            }
        }
        return translators.sort();
    }

    /**
     * Update hybrid translator config when language setting changed.
     *
     * @param from source language
     * @param to target language
     *
     * @returns new config
     */
    updateConfigFor(from: string, to: string) {
        const newConfig: HybridConfig = { translators: [], selections: {} as Selections };
        const translatorsSet = new Set<HybridSupportedTranslators>();

        // Get translators that support new language setting.
        const availableTranslators = this.getAvailableTranslatorsFor(from, to);

        // Replace translators that don't support new language setting with a default translator.
        const defaultTranslator = availableTranslators[0];

        // Use this set to check if a translator in the old config should be replaced.
        const availableTranslatorSet = new Set(availableTranslators);

        let item: keyof Selections;
        for (item in this.CONFIG.selections) {
            let newTranslator,
                oldTranslator = this.CONFIG.selections[item];

            if (availableTranslatorSet.has(oldTranslator)) {
                newConfig.selections[item] = oldTranslator;
                newTranslator = oldTranslator;
            } else {
                newConfig.selections[item] = defaultTranslator;
                newTranslator = defaultTranslator;
            }

            translatorsSet.add(newTranslator);
        }

        // Update used translator set.
        newConfig.translators = Array.from(translatorsSet);

        // Provide new config.
        return newConfig;
    }

    /**
     * Detect language of given text.
     *
     * @param text text
     *
     * @returns Promise of language of given text
     */
    async detect(text: string) {
        return this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].detect(text);
    }

    /**
     * Hybrid translate.
     *
     * @param text text to translate
     * @param from source language
     * @param to target language
     *
     * @returns result Promise
     */
    async translate(text: string, from: string, to: string) {
        // Initiate translation requests.
        let requests = [];
        for (let translator of this.CONFIG.translators) {
            // Translate with a translator.
            requests.push(
                this.REAL_TRANSLATORS[translator]
                    .translate(text, from, to)
                    .then((result) => [translator, result])
            );
        }

        // Combine all results.
        const translation: TranslationResult = {
            originalText: "",
            mainMeaning: "",
        };
        const results = new Map(
            (await Promise.all(requests)) as [HybridSupportedTranslators, TranslationResult][]
        );
        let item: keyof Selections;
        for (item in this.CONFIG.selections) {
            try {
                const selectedTranslator = this.CONFIG.selections[item];
                translation[item] = results.get(selectedTranslator)![item] as string &
                    DetailedMeaning[] &
                    Definition[] &
                    Example[];
            } catch (error) {
                console.log(`${item} ${this.CONFIG.selections[item]}`);
                console.log(error);
            }
        }
        return translation;
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
        return this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    async stopPronounce() {
        this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].stopPronounce();
    }
}

export default HybridTranslator;
