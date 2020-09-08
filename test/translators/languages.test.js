import allLanguages from "../../src/background/library/translators/languages.js";
import googleTranslator from "../../src/background/library/translators/google.js";
import bingTranslator from "../../src/background/library/translators/bing.js";
import baiduTranslator from "../../src/background/library/translators/baidu.js";
import tencentTranslator from "../../src/background/library/translators/tencent.js";

describe("these tests are used to make sure all of the supported languages in translators/**.js can be found in languages.js", () => {
    it("to test supported languages in google.js", done => {
        let languages = googleTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(allLanguages[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in bing.js", done => {
        let languages = bingTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(allLanguages[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in baidu.js", done => {
        let languages = baiduTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(allLanguages[lan]).toBeDefined();
            }
        }
        done();
    });

    it("to test supported languages in tencent.js", done => {
        let languages = tencentTranslator.supportedLanguages();
        for (let lan of languages) {
            if (lan !== "auto") {
                expect(allLanguages[lan]).toBeDefined();
            }
        }
        done();
    });
});
