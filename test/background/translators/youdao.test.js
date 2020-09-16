import axios from "axios";
import TRANSLATOR from "background/library/translators/youdao.js";

describe("youdao translator api", () => {
    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    // it("to detect language of English text", () => {
    //     return TRANSLATOR.detect("hello").then(result => {
    //         expect(result).toEqual("en");
    //     });
    // });

    // it("to detect language of Chinese text", () => {
    //     return TRANSLATOR.detect("你好").then(result => {
    //         expect(result).toEqual("zh-CN");
    //     });
    // });

    // it("to get token and gtk", () => {
    //     return TRANSLATOR.getTokenGtk().then(translator => {
    //         expect(translator).toBeUndefined();
    //         expect(TRANSLATOR.token).not.toEqual("");
    //         expect(TRANSLATOR.gtk).not.toEqual("");
    //     });
    // });

    // it("to parse translation result", done => {
    //     let result = fs.readFileSync("test/translators/youdaoTransResult.json", "utf-8");
    //     result = JSON.parse(result);
    //     let parseResult = TRANSLATOR.parseResult(result);
    //     expect(parseResult.originalText).toEqual("hello");
    //     expect(parseResult.mainMeaning).toEqual("你好");
    //     expect(parseResult.tPronunciation).toEqual("nǐ hǎo");
    //     expect(parseResult.sPronunciation).toEqual("həˈləʊ");
    //     expect(parseResult.detailedMeanings[0].pos).toBeDefined();
    //     expect(parseResult.definitions[0].pos).toBeDefined();
    //     expect(parseResult.examples.length).toBeGreaterThan(0);
    //     done();
    // });

    it("to auto detect & translate a piece of English text", done => {
        TRANSLATOR.translate("hello")
            .then(result => {
                expect(result.mainMeaning).toEqual("你好");
                expect(result.originalText).toEqual("hello");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
    it("to auto detect & translate a piece of Chinese text", done => {
        TRANSLATOR.translate("你好")
            .then(result => {
                expect(result.mainMeaning).toEqual("hello");
                expect(result.originalText).toEqual("你好");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
    it("to auto detect & translate a piece of Japanese text", done => {
        TRANSLATOR.translate("おはよう")
            .then(result => {
                expect(result.mainMeaning).toEqual("早上好");
                expect(result.originalText).toEqual("おはよう");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
