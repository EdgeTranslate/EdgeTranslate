import type { HybridSupportedTranslators } from "@edge_translate/translators";
import { SupportedLanguage } from "./utils/languages";

/**
 * Browser.sync.storage type definitions.
 */
export enum SyncDataKey {
    blacklist = "blacklist",
    LayoutSettings = "LayoutSettings",
    LanguageSetting = "languageSetting",
    OtherSettings = "OtherSettings",
    DefaultTranslator = "DefaultTranslator",
    DefaultPageTranslator = "DefaultPageTranslator",
    HybridTranslatorConfig = "HybridTranslatorConfig",
    TranslateResultFilter = "TranslateResultFilter",
    ContentDisplayOrder = "ContentDisplayOrder",
    HidePageTranslatorBanner = "HidePageTranslatorBanner",
}

export type SyncData = {
    [SyncDataKey.blacklist]: Blacklist;
    [SyncDataKey.LayoutSettings]: LayoutSettings;
    [SyncDataKey.LanguageSetting]: LanguageSetting;
    [SyncDataKey.OtherSettings]: OtherSettings;
    [SyncDataKey.DefaultTranslator]: HybridSupportedTranslators;
    [SyncDataKey.DefaultPageTranslator]: string;
    [SyncDataKey.HybridTranslatorConfig]: HybridTranslatorConfig;
    [SyncDataKey.TranslateResultFilter]: TranslateResultFilter;
    [SyncDataKey.ContentDisplayOrder]: string[];
    [SyncDataKey.HidePageTranslatorBanner]: boolean;
};

export type Blacklist = {
    urls: Record<string, boolean>;
    domains: Record<string, boolean>;
};

export type LayoutSettings = {
    // Determine whether the web page will resize when showing translation result
    Resize: boolean;
    // Determine whether the text in translation block should display from right to left
    RTL: boolean;
    // Determine whether to fold long translation content
    FoldLongContent: boolean;
    // The position of select translate button.
    SelectTranslatePosition: "TopRight" | "BottomRight" | "TopLeft" | "BottomLeft";
};

export type LanguageSetting = {
    sl: SupportedLanguage | "auto";
    tl: SupportedLanguage;
};

export type OtherSettings = {
    MutualTranslate: boolean;
    SelectTranslate: boolean;
    TranslateAfterDblClick: boolean;
    TranslateAfterSelect: boolean;
    CancelTextSelection: boolean;
    UseGoogleAnalytics: boolean;
    UsePDFjs: boolean;
};

export type HybridTranslatorConfig = {
    // The translators used in current hybrid translate.
    translators: HybridSupportedTranslators[];

    // The translators for each item.
    selections: {
        originalText: HybridSupportedTranslators;
        mainMeaning: HybridSupportedTranslators;
        tPronunciation: HybridSupportedTranslators;
        sPronunciation: HybridSupportedTranslators;
        detailedMeanings: HybridSupportedTranslators;
        definitions: HybridSupportedTranslators;
        examples: HybridSupportedTranslators;
    };
};

export type TranslateResultFilter = {
    mainMeaning: boolean;
    originalText: boolean;
    tPronunciation: boolean;
    sPronunciation: boolean;
    tPronunciationIcon: boolean;
    sPronunciationIcon: boolean;
    detailedMeanings: boolean;
    definitions: boolean;
    examples: boolean;
};

/**
 * Browser.local.storage type definitions.
 */
export enum LocalDataKey {}

export type LocalData = {};
