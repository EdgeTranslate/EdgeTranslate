import {
    Definition,
    DetailedMeaning,
    Example,
    PronunciationSpeed,
    TranslationResult,
} from "../types.js";
import BaiduTranslator from "./baidu.js";
import BingTranslator from "./bing.js";
import DeepLTranslator from "./deepl.js";
import GoogleTranslator from "./google.js";
import TencentTranslator from "./tencent.js";

export type HybridSupportedTranslators =
    | "BaiduTranslate"
    | "BingTranslate"
    | "DeepLTranslate"
    | "GoogleTranslate"
    | "TencentTranslate";

export type HybridConfig = {
    selections: Selections;
    translators: HybridSupportedTranslators[];
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

    constructor(channel: any) {
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
            this.REAL_TRANSLATORS.GoogleTranslate,
            this.REAL_TRANSLATORS.GoogleTranslate
        );

        /**
         * Update config cache on config changed.
         */
        chrome.storage.onChanged.addListener(
            ((changes: any, area: string) => {
                if (area === "sync" && changes["HybridTranslatorConfig"]) {
                    this.CONFIG = changes["HybridTranslatorConfig"].newValue;
                    this.MAIN_TRANSLATOR = this.CONFIG.selections.mainMeaning;
                }
            }).bind(this)
        );
    }

    /**
     * Load hybrid translator config if it is not loaded.
     *
     * @returns loading Promise.
     */
    loadConfigIfNotLoaded() {
        return new Promise<void>((resolve, reject) => {
            if (this.CONFIG.translators && this.CONFIG.selections) {
                resolve();
                return;
            }

            chrome.storage.sync.get("HybridTranslatorConfig", (res) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                    return;
                }

                this.CONFIG = res.HybridTranslatorConfig;
                this.MAIN_TRANSLATOR = this.CONFIG.selections.mainMeaning;
                resolve();
            });
        });
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
     * @returns new config Promise
     */
    async updateConfigFor(from: string, to: string) {
        // Load config if not loaded.
        await this.loadConfigIfNotLoaded();

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

        // Update config.
        chrome.storage.sync.set({ HybridTranslatorConfig: newConfig });

        // Provide new config.
        return Promise.resolve(newConfig);
    }

    /**
     * Detect language of given text.
     *
     * @param text text
     *
     * @returns Promise of language of given text
     */
    async detect(text: string) {
        /**
         * Check config firstly.
         */
        await this.loadConfigIfNotLoaded();

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
        // Check config firstly.
        await this.loadConfigIfNotLoaded();

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
        /**
         * Check config firstly.
         */
        await this.loadConfigIfNotLoaded();

        return this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].pronounce(text, language, speed);
    }

    /**
     * Pause pronounce.
     */
    async stopPronounce() {
        /**
         * Check config firstly.
         */
        await this.loadConfigIfNotLoaded();

        this.REAL_TRANSLATORS[this.MAIN_TRANSLATOR].stopPronounce();
    }
}

export default HybridTranslator;
