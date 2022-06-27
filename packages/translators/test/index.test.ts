import { LANGUAGES, HybridTranslator } from "../src/index";

const HYBRID_TRANSLATOR = new HybridTranslator(
    {
        translators: ["BingTranslate", "GoogleTranslate"],
        selections: {
            originalText: "BingTranslate",
            mainMeaning: "BingTranslate",
            tPronunciation: "BingTranslate",
            sPronunciation: "GoogleTranslate",
            detailedMeanings: "GoogleTranslate",
            definitions: "GoogleTranslate",
            examples: "GoogleTranslate",
        },
    },
    {}
);

const TRANSLATORS = {
    hybrid: HYBRID_TRANSLATOR,
    ...HYBRID_TRANSLATOR.REAL_TRANSLATORS,
};

describe("Make sure that all of the supported languages in translators can be found in languages.js", () => {
    it("to test supported languages in google.ts", () => {
        let languages = TRANSLATORS.GoogleTranslate.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan as keyof typeof LANGUAGES]).toBeDefined();
            }
        }
    });

    it("to test supported languages in bing.ts", () => {
        let languages = TRANSLATORS.BingTranslate.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan as keyof typeof LANGUAGES]).toBeDefined();
            }
        }
    });

    it("to test supported languages in baidu.ts", () => {
        let languages = TRANSLATORS.BaiduTranslate.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan as keyof typeof LANGUAGES]).toBeDefined();
            }
        }
    });

    it("to test supported languages in tencent.ts", () => {
        let languages = TRANSLATORS.TencentTranslate.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan as keyof typeof LANGUAGES]).toBeDefined();
            }
        }
    });

    it("to test supported languages in deepl.ts", () => {
        let languages = TRANSLATORS.DeepLTranslate.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan as keyof typeof LANGUAGES]).toBeDefined();
            }
        }
    });
});
