import axios from "axios";
import TRANSLATOR from "../../src/translators/hybrid.js";

describe("hybrid translator api", () => {
    beforeAll(() => {
        // Set http module of nodejs as axios' request method.
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);

        // Set user-agent to prevent 429 error.
        TRANSLATOR.TRANSLATORS.BingTranslate.HEADERS["user-agent"] =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36";

        // Set up config.
        // sinon-chrome keeps causing timeout error, so I have to build my own chrome.storage.sync.get().
        global.window.chrome = {
            storage: {
                sync: {
                    get: (name, callback) => {
                        if (name === "HybridTranslateConfig") {
                            callback({
                                HybridTranslateConfig: {
                                    translators: ["BingTranslate", "GoogleTranslate"],
                                    selections: {
                                        originalText: "GoogleTranslate",
                                        mainMeaning: "GoogleTranslate",
                                        tPronunciation: "BingTranslate",
                                        sPronunciation: "BingTranslate",
                                        detailedMeanings: "BingTranslate",
                                        definitions: "GoogleTranslate",
                                        examples: "GoogleTranslate"
                                    }
                                }
                            });
                        }
                    }
                }
            }
        };
    });

    it("to get config", done => {
        chrome.storage.sync.get("HybridTranslateConfig", res => {
            let config = res.HybridTranslateConfig;
            expect(config.translators[0]).toEqual("BingTranslate");
            expect(config.translators[1]).toEqual("GoogleTranslate");
            done();
        });
    });

    it("to detect language of English text", done => {
        TRANSLATOR.detect("hello")
            .then(result => {
                expect(result).toEqual("en");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to detect language of Chinese text", done => {
        TRANSLATOR.detect("你好")
            .then(result => {
                expect(result).toEqual("zh-CN");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to translate a piece of English text", done => {
        TRANSLATOR.translate("hello", "en", "zh-CN")
            .then(result => {
                expect(result.mainMeaning).toEqual("你好");
                expect(result.originalText).toEqual("hello");
                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("to translate a piece of Chinese text", done => {
        TRANSLATOR.translate("你好", "zh-CN", "en")
            .then(result => {
                expect(result.mainMeaning).toEqual("Hello there");
                expect(result.originalText).toEqual("你好");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
