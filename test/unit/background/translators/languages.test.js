import fs from "fs";
import { LANGUAGES, BROWSER_LANGUAGES_MAP } from "common/scripts/languages.js";
import googleTranslator from "background/library/translators/google.js";
import bingTranslator from "background/library/translators/bing.js";
import baiduTranslator from "background/library/translators/baidu.js";
import tencentTranslator from "background/library/translators/tencent.js";

describe("These tests are used to make sure all of the supported languages in translators/**.js can be found in languages.js", () => {
    // Build language set.
    let langSet = new Set();
    for (let lang in LANGUAGES) {
        langSet.add(lang);
    }

    it("to test supported languages in google.js", () => {
        let languages = googleTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(langSet).toContain(lan);
            }
        }
    });

    it("to test supported languages in bing.js", () => {
        let languages = bingTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(langSet).toContain(lan);
            }
        }
    });

    it("to test supported languages in baidu.js", () => {
        let languages = baiduTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(langSet).toContain(lan);
            }
        }
    });

    it("to test supported languages in tencent.js", () => {
        let languages = tencentTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(langSet).toContain(lan);
            }
        }
    });
});

describe("These tests are used to make sure all languages supported by Google web page translate are in BROWSER_LANGUAGES_MAP.", () => {
    it("check languages for Google page translate", () => {
        let langSet = new Set();
        for (let langName in BROWSER_LANGUAGES_MAP) {
            langSet.add(BROWSER_LANGUAGES_MAP[langName]);
        }

        let langInLans = fs
            .readdirSync("static/google/lans/")
            .map((file) => file.split("_")[1].split(".")[0]);
        langInLans.forEach((lang) => {
            expect(langSet).toContain(lang);
        });

        let langInMain = fs
            .readdirSync("static/google/main/")
            .map((file) => file.split("_")[1].split(".")[0]);
        langInMain.forEach((lang) => {
            expect(langSet).toContain(lang);
        });
    });
});

describe("These tests are used to make sure that all languages in BROWSER_LANGUAGES_MAP are in LANGUAGES.", () => {
    // Build language set.
    let langSet = new Set();
    for (let lang in LANGUAGES) {
        langSet.add(lang);
    }

    it("check languages in BROWSER_LANGUAGES_MAP", () => {
        for (let langName in BROWSER_LANGUAGES_MAP) {
            let lang = BROWSER_LANGUAGES_MAP[langName];
            expect(langSet).toContain(lang);
        }
    });
});
