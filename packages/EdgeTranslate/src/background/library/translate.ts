import Browser from "webextension-polyfill";
import {
    BaiduTranslator,
    BingTranslator,
    DeeplTranslator,
    GoogleTranslator,
    HybridSupportedTranslators,
    HybridTranslator,
    PronunciationSpeed,
    TencentTranslator,
    TranslationResult,
} from "@edge_translate/translators";
import { DEFAULT_SETTINGS, getOrSetDefaultSettings } from "~/utils/settings";
import Channel from "~/utils/channel";
import { LanguageSetting, SyncDataKey } from "~/types";
import LocalTTS from "./local_tts";
import { SupportedLanguage } from "~/utils/languages";
import { getOrCreateTab } from "~/utils/createTab";

export class TranslatorManager {
    private channel: Channel;
    private config_loader: Promise<void>;
    private IN_MUTUAL_MODE: boolean = false;

    private TTS_SPEED: PronunciationSpeed;
    private localTTS: LocalTTS;

    private TRANSLATORS: {
        [key: string]:
            | HybridTranslator
            | BaiduTranslator
            | BingTranslator
            | GoogleTranslator
            | TencentTranslator
            | DeeplTranslator;
    } = {};
    private HYBRID_TRANSLATOR!: HybridTranslator;
    private LANGUAGE_SETTING!: LanguageSetting;
    private DEFAULT_TRANSLATOR: HybridSupportedTranslators = "GoogleTranslate";
    /**
     * Communication channel.
     */
    constructor(channel: Channel) {
        /**
         * Communication channel.
         */
        this.channel = channel;

        /**
         * @type {Promise<Void>} Initialize configurations.
         */
        this.config_loader = getOrSetDefaultSettings(
            [
                SyncDataKey.HybridTranslatorConfig,
                SyncDataKey.DefaultTranslator,
                SyncDataKey.LanguageSetting,
                SyncDataKey.OtherSettings,
            ],
            DEFAULT_SETTINGS
        ).then((configs) => {
            // Init hybrid translator.
            this.HYBRID_TRANSLATOR = new HybridTranslator(configs.HybridTranslatorConfig, channel);

            // Supported translators.
            this.TRANSLATORS = {
                HybridTranslate: this.HYBRID_TRANSLATOR,
                ...this.HYBRID_TRANSLATOR.REAL_TRANSLATORS,
            };

            // Mutual translating mode flag.
            this.IN_MUTUAL_MODE = configs.OtherSettings.MutualTranslate || false;

            // Translation language settings.
            this.LANGUAGE_SETTING = configs.languageSetting;

            // The default translator to use.
            this.DEFAULT_TRANSLATOR = configs.DefaultTranslator;
        });

        /**
         * Default TTS speed.
         */
        this.TTS_SPEED = "fast";

        /**
         * Local TTS service.
         */
        this.localTTS = new LocalTTS();

        /**
         * Start to provide services and listen to event.
         */
        this.provideServices();
        this.listenToEvents();
    }

    /**
     * Register service providers.
     *
     * This should be called for only once!
     */
    provideServices() {
        // Translate service.
        this.channel.provide("translate", (_params) => {
            const params = _params as { text: string; position: number[] };
            return this.translate(params.text, params.position);
        });

        // Pronounce service.
        this.channel.provide("pronounce", (_params) => {
            const params = _params as {
                pronouncing: string;
                text: string;
                language: string;
                speed: PronunciationSpeed;
            };
            let speed = params.speed;
            if (!speed) {
                speed = this.TTS_SPEED;
                this.TTS_SPEED = speed === "fast" ? "slow" : "fast";
            }

            return this.pronounce(params.pronouncing, params.text, params.language, speed);
        });

        // Get available translators service.
        this.channel.provide("get_available_translators", (params) =>
            Promise.resolve(
                this.getAvailableTranslators(
                    params as { from: SupportedLanguage; to: SupportedLanguage }
                )
            )
        );

        // Update default translator service.
        this.channel.provide("update_default_translator", (detail) =>
            this.updateDefaultTranslator(
                (
                    detail as {
                        translator: HybridSupportedTranslators;
                    }
                ).translator
            )
        );
    }

    /**
     * Register event listeners.
     *
     * This should be called for only once!
     */
    listenToEvents() {
        // Google page translate button clicked event.
        this.channel.on("translate_page_google", () => {
            executeGoogleScript(this.channel);
        });

        // Language setting updated event.
        this.channel.on(
            "language_setting_update",
            this.onLanguageSettingUpdated.bind(this) as (detail: unknown) => unknown
        );

        // Result frame closed event.
        this.channel.on("frame_closed", this.stopPronounce.bind(this));

        /**
         * Update config cache on config changed.
         */
        Browser.storage.onChanged.addListener(
            (async (changes: Record<string, Browser.Storage.StorageChange>, area: string) => {
                if (area === "sync") {
                    // Ensure that configurations have been initialized.
                    await this.config_loader;

                    if (changes["HybridTranslatorConfig"]) {
                        this.HYBRID_TRANSLATOR?.useConfig(
                            changes["HybridTranslatorConfig"].newValue
                        );
                    }

                    if (changes["OtherSettings"]) {
                        this.IN_MUTUAL_MODE = changes["OtherSettings"].newValue.MutualTranslate;
                    }

                    if (changes["languageSetting"]) {
                        this.LANGUAGE_SETTING = changes["languageSetting"].newValue;
                    }

                    if (changes["DefaultTranslator"]) {
                        this.DEFAULT_TRANSLATOR = changes["DefaultTranslator"].newValue;
                    }
                }
            }).bind(this)
        );
    }

    /**
     * get the id of the current tab
     * if the current tab can't display the result panel
     * open a notice page to display the result and explain why the page shows
     * @returns the tab id. If tabId===-1, the user is setting the file URLs access permission and nothing should be done.
     */
    async getCurrentTabId() {
        let tabId = -1;
        const tabs = await Browser.tabs.query({ active: true, currentWindow: true });
        tabId = tabs[0].id || -1;

        // to test whether the current tab can receive message(display results)
        await this.channel.requestToTab(tabId, "check_availability", {}).catch(async () => {
            // The page is a local file page
            if (/^file:\/\.*/.test(tabs[0].url || "")) {
                const allowed = await Browser.extension.isAllowedFileSchemeAccess();
                if (!allowed && confirm(Browser.i18n.getMessage("PermissionRemind"))) {
                    await Browser.tabs.create({
                        url: `chrome://extensions/?id=${chrome.runtime.id}`,
                    });
                    tabId = -1;
                    return;
                }
            }
            /**
             * the current tab can't display the result panel
             * so we open a notice page to display the result and explain why this page shows
             */
            const noticePageUrl = Browser.runtime.getURL("content/notice/notice.html");
            // get the tab id of an existing notice page
            const tab = await getOrCreateTab(noticePageUrl);
            await Browser.tabs.highlight({
                tabs: tab.index,
            });
        });
        return tabId;
    }

    /**
     *
     * Detects the language of the given text.
     *
     * @param {string} text Text to be tested
     *
     * @returns {Promise<String>} detected language Promise
     */
    async detect(text: string) {
        // Ensure that configurations have been initialized.
        await this.config_loader;

        return this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
    }

    /**
     *
     * This is a translation client function
     * 1. get language settings
     * 2. if source language is "auto", use normal translation mode
     * 3. else use mutual translation mode(auto translate from both sides)
     * 4. send request, get result
     *
     * @param text original text to be translated
     * @param position position of the text
     */
    async translate(text: string, position: number[]) {
        // Ensure that configurations have been initialized.
        await this.config_loader;

        // get current tab id
        const currentTabId = await this.getCurrentTabId();
        if (currentTabId === -1) return;

        /**
         * Get current time as timestamp.
         *
         * Timestamp is used for preventing disordered translating message to disturb user.
         *
         * Every translating request has a unique timestamp and every message from that translating
         * request will be assigned with the timestamp. About usage of the timestamp, please refer
         * to display.js.
         */
        let timestamp = new Date().getTime();

        // Inform current tab translating started.
        this.channel.emitToTabs(currentTabId, "start_translating", {
            text,
            position,
            timestamp,
        });

        let sl = this.LANGUAGE_SETTING.sl,
            tl = this.LANGUAGE_SETTING.tl;

        try {
            if (sl !== "auto" && this.IN_MUTUAL_MODE) {
                // mutual translate mode, detect language first.
                sl = await this.detect(text);
                switch (sl) {
                    case this.LANGUAGE_SETTING.sl:
                        tl = this.LANGUAGE_SETTING.tl;
                        break;
                    case this.LANGUAGE_SETTING.tl:
                        tl = this.LANGUAGE_SETTING.sl as SupportedLanguage;
                        break;
                    default:
                        sl = "auto";
                        tl = this.LANGUAGE_SETTING.tl;
                }
            }

            // Do translate.
            let result: TranslationResult & {
                sourceLanguage?: SupportedLanguage | "auto";
                targetLanguage?: SupportedLanguage;
            } = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].translate(text, sl, tl);
            result.sourceLanguage = sl;
            result.targetLanguage = tl;

            // Send translating result to current tab.
            this.channel.emitToTabs(currentTabId, "translating_finished", {
                timestamp,
                ...result,
            });
        } catch (error) {
            // Inform current tab translating failed.
            this.channel.emitToTabs(currentTabId, "translating_error", {
                error,
                timestamp,
            });
        }
    }

    /**
     * Text to speech proxy.
     *
     * @param pronouncing which text are we pronouncing? enum{source, target}
     * @param text The text.
     * @param language The language of the text.
     * @param speed The speed of the speech.
     */
    async pronounce(
        pronouncing: string,
        text: string,
        language: string,
        speed: PronunciationSpeed
    ) {
        // Ensure that configurations have been initialized.
        await this.config_loader;

        // get current tab id
        const currentTabId = await this.getCurrentTabId();
        if (currentTabId === -1) return;

        let lang = language;
        let timestamp = new Date().getTime();

        // Inform current tab pronouncing started.
        this.channel.emitToTabs(currentTabId, "start_pronouncing", {
            pronouncing,
            text,
            language,
            timestamp,
        });

        try {
            if (language === "auto") {
                lang = await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].detect(text);
            }

            await this.TRANSLATORS[this.DEFAULT_TRANSLATOR].pronounce(text, lang, speed).catch(
                ((error: any) => {
                    // API pronouncing failed, try local TTS service.
                    if (!this.localTTS.speak(text, lang, speed)) {
                        throw error;
                    }
                }).bind(this)
            );

            // Inform current tab pronouncing finished.
            this.channel.emitToTabs(currentTabId, "pronouncing_finished", {
                pronouncing,
                text,
                language,
                timestamp,
            });
        } catch (error) {
            // Inform current tab pronouncing failed.
            this.channel.emitToTabs(currentTabId, "pronouncing_error", {
                pronouncing,
                error,
                timestamp,
            });
        }
    }

    /**
     * Stop pronounce proxy.
     */
    async stopPronounce() {
        // Ensure that configurations have been initialized.
        await this.config_loader;

        this.TRANSLATORS[this.DEFAULT_TRANSLATOR].stopPronounce();
        this.localTTS.pause();
    }

    /**
     * Get translators that support given source language and target language.
     *
     * @param detail current language setting, detail.from is source language, detail.to is target language
     *
     * @returns available translators Promise.
     */
    getAvailableTranslators(detail: { from: SupportedLanguage; to: SupportedLanguage }) {
        return ["HybridTranslate"].concat(
            this.HYBRID_TRANSLATOR.getAvailableTranslatorsFor(detail.from, detail.to)
        ) as (HybridSupportedTranslators | "HybridTranslate")[];
    }

    /**
     * Language setting update event listener.
     *
     * @param detail updated language setting, detail.from is source language, detail.to is target language
     */
    async onLanguageSettingUpdated(detail: { from: SupportedLanguage; to: SupportedLanguage }) {
        let selectedTranslator = this.DEFAULT_TRANSLATOR;

        // Get translators supporting new language setting.
        let availableTranslators = this.getAvailableTranslators(detail);

        // Update hybrid translator config.
        const newConfig = this.HYBRID_TRANSLATOR.updateConfigFor(detail.from, detail.to);
        // Update config.
        await Browser.storage.sync.set({ HybridTranslatorConfig: newConfig });

        // If current default translator does not support new language setting, update it.
        if (!new Set(availableTranslators).has(selectedTranslator)) {
            selectedTranslator = availableTranslators[1] as HybridSupportedTranslators;
            await Browser.storage.sync.set({ DefaultTranslator: selectedTranslator });
        }

        // Inform options page to update options.
        this.channel.emit("hybrid_translator_config_updated", {
            config: newConfig,
            availableTranslators: availableTranslators.slice(1),
        });

        // Inform result frame to update options.
        await Browser.tabs.query({ active: true, currentWindow: true }).then((tabs) =>
            this.channel.emitToTabs(tabs[0].id, "update_translator_options", {
                selectedTranslator,
                availableTranslators,
            })
        );
    }

    /**
     * Update translator.
     *
     * @param translator the new translator to use.
     */
    updateDefaultTranslator(translator: HybridSupportedTranslators) {
        return Browser.storage.sync.set({ DefaultTranslator: translator });
    }
}

/**
 * Translate the current web page using the user-selected web translation engine.
 *
 * @param channel Communication channel.
 */
export function translatePage(channel: Channel) {
    getOrSetDefaultSettings([SyncDataKey.DefaultPageTranslator], DEFAULT_SETTINGS).then(
        (result) => {
            let translator = result.DefaultPageTranslator;
            switch (translator) {
                case "GooglePageTranslate":
                    executeGoogleScript(channel);
                    break;
                default:
                    executeGoogleScript(channel);
                    break;
            }
        }
    );
}

/**
 * Execute Google web translation related scripts.
 *
 * @param channel Communication channel.
 */
export async function executeGoogleScript(channel: Channel) {
    await Browser.tabs.executeScript({ file: "/google/init.js" });
    await Browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        channel.emitToTabs(tabs[0].id, "start_page_translate", { translator: "google" });
    });
}
