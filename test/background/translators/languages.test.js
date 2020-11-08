import fs from "fs";
import { LANGUAGES, BROWSER_LANGUAGES_MAP } from "common/scripts/languages.js";
import googleTranslator from "background/library/translators/google.js";
import bingTranslator from "background/library/translators/bing.js";
import baiduTranslator from "background/library/translators/baidu.js";
import tencentTranslator from "background/library/translators/tencent.js";

describe("these tests are used to make sure all of the supported languages in translators/**.js can be found in languages.js", () => {
    it("to test supported languages in google.js", done => {
        let languages = googleTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in bing.js", done => {
        let languages = bingTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in baidu.js", done => {
        let languages = baiduTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in tencent.js", done => {
        let languages = tencentTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(LANGUAGES[lan]).toBeDefined();
            }
        }
        done();
    });
});

describe("These test are used to make sure all languages supported by Google web page translate is in BROWSER_LANGUAGES_MAP.", () => {
    it("check languages for Google page translate", done => {
        let langs = new Set();
        for (let langName in BROWSER_LANGUAGES_MAP) {
            langs.add(BROWSER_LANGUAGES_MAP[langName]);
        }

        let langInLans = fs
            .readdirSync("static/google/lans/")
            .map(file => file.split("_")[1].split(".")[0]);
        langInLans.forEach(lang => {
            try {
                expect(langs.has(lang)).toBe(true);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(`${lang} not found!`);
                throw error;
            }
        });

        let langInMain = fs
            .readdirSync("static/google/main/")
            .map(file => file.split("_")[1].split(".")[0]);
        langInMain.forEach(lang => {
            try {
                expect(langs.has(lang)).toBe(true);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(`${lang} not found!`);
                throw error;
            }
        });

        done();
    });
});

describe("These test are used to make sure that all languages in BROWSER_LANGUAGES_MAP in is LANGUAGES.", () => {
    it("check languages in BROWSER_LANGUAGES_MAP", done => {
        for (let langName in BROWSER_LANGUAGES_MAP) {
            try {
                expect(LANGUAGES[BROWSER_LANGUAGES_MAP[langName]]).toBeDefined();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(`${langName} not found!`);
                throw error;
            }
        }

        done();
    });
});
