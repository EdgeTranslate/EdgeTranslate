import Browser from "webextension-polyfill";
import { BROWSER_LANGUAGES_MAP } from "./languages";
import { SyncData, SyncDataKey } from "~/types";

/**
 * default settings for this extension
 */
export const DEFAULT_SETTINGS: SyncData = {
    blacklist: {
        urls: {},
        domains: { "chrome.google.com": true, extensions: true },
    },
    // Resize: determine whether the web page will resize when showing translation result
    // RTL: determine whether the text in translation block should display from right to left
    // FoldLongContent: determine whether to fold long translation content
    // SelectTranslatePosition: the position of select translate button.
    LayoutSettings: {
        Resize: false,
        RTL: false,
        FoldLongContent: true,
        SelectTranslatePosition: "TopRight",
    },
    // Default settings of source language and target language
    languageSetting: {
        sl: "auto",
        tl: BROWSER_LANGUAGES_MAP[
            Browser.i18n.getUILanguage() as keyof typeof BROWSER_LANGUAGES_MAP
        ],
    },
    OtherSettings: {
        MutualTranslate: false,
        SelectTranslate: true,
        TranslateAfterDblClick: false,
        TranslateAfterSelect: false,
        CancelTextSelection: false,
        UseGoogleAnalytics: true,
        UsePDFjs: true,
    },
    DefaultTranslator: "GoogleTranslate",
    DefaultPageTranslator: "GooglePageTranslate",
    HybridTranslatorConfig: {
        // The translators used in current hybrid translate.
        translators: ["BaiduTranslate", "BingTranslate", "GoogleTranslate"],

        // The translators for each item.
        selections: {
            // ATTENTION: The following four items MUST HAVE THE SAME TRANSLATOR!
            originalText: "BaiduTranslate",
            mainMeaning: "BaiduTranslate",
            tPronunciation: "BaiduTranslate",
            sPronunciation: "BaiduTranslate",

            // For the following three items, any translator combination is OK.
            detailedMeanings: "BingTranslate",
            definitions: "GoogleTranslate",
            examples: "BaiduTranslate",
        },
    },
    // Defines which contents in the translating result should be displayed.
    TranslateResultFilter: {
        mainMeaning: true,
        originalText: true,
        tPronunciation: true,
        sPronunciation: true,
        tPronunciationIcon: true,
        sPronunciationIcon: true,
        detailedMeanings: true,
        definitions: true,
        examples: true,
    },
    // Defines the order of displaying contents.
    ContentDisplayOrder: [
        "mainMeaning",
        "originalText",
        "detailedMeanings",
        "definitions",
        "examples",
    ],
    HidePageTranslatorBanner: false,
};

/**
 * assign default value to settings which are undefined in recursive way
 * @param result setting result stored in Browser.storage
 * @param settings default settings
 */
export function setDefaultSettings(
    result: Record<string, unknown>,
    settings: Record<string, unknown>
) {
    for (let i in settings) {
        // settings[i] contains key-value settings
        if (
            typeof settings[i] === "object" &&
            !(settings[i] instanceof Array) &&
            Object.keys(settings[i] as {}).length > 0
        ) {
            if (result[i]) {
                setDefaultSettings(
                    result[i] as Record<string, unknown>,
                    settings[i] as Record<string, unknown>
                );
            } else {
                // settings[i] contains several setting items but these have not been set before
                result[i] = settings[i];
            }
        } else if (result[i] === undefined) {
            // settings[i] is a single setting item and it has not been set before
            result[i] = settings[i];
        }
    }
}

/**
 * Get settings from storage. If some of the settings have not been initialized,
 * initialize them with the given default values.
 *
 * @param settings setting name to get
 * @param defaults default values or function to generate default values
 * @returns settings
 */
export async function getOrSetDefaultSettings(
    settings: SyncDataKey | SyncDataKey[],
    defaults: SyncData | ((arg: typeof settings) => SyncData)
) {
    // If there is only one setting to get, warp it up.
    if (typeof settings === "string") {
        settings = [settings];
    } else if (settings === undefined) {
        // If settings is undefined, collect all setting keys in defaults.
        settings = [];
        for (let key in defaults) {
            settings.push(key as SyncDataKey);
        }
    }
    const result = (await Browser.storage.sync.get(settings)) as SyncData;
    let updated = false;

    for (let setting of settings) {
        if (!result[setting]) {
            if (typeof defaults === "function") {
                defaults = defaults(settings);
            }
            result[setting] = defaults[setting] as never;
            updated = true;
        }
    }

    if (updated) await Browser.storage.sync.set(result);
    return result;
}
