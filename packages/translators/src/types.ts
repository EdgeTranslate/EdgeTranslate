export type TranslationResult = {
    originalText: string;
    mainMeaning: string;
    sPronunciation?: string;
    tPronunciation?: string;
    detailedMeanings?: DetailedMeaning[];
    definitions?: Definition[];
    examples?: Example[];
};
export type DetailedMeaning = {
    pos?: string;
    meaning?: string;
    synonyms?: string[];
};
export type Definition = {
    pos?: string;
    meaning?: string;
    synonyms?: string[];
    example?: string;
};
export type Example = {
    source: string | null;
    target: string | null;
};
export type TranslationError = {
    errorType: string;
    errorCode: string;
    errorMsg: string;
    errorAct: {
        api: string;
        action: string;
        text: string;
        from: string | null;
        to: string | null;
    };
};
export type PronunciationSpeed = "fast" | "slow";
