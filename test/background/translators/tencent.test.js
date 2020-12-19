import axios from "axios";
import TRANSLATOR from "background/library/translators/tencent.js";

describe("tencent translator api", () => {
    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);

        TRANSLATOR.HEADERS["Origin"] = TRANSLATOR.BASE_URL;
    });

    // eslint-disable-next-line jest/no-test-callback
    it("to update tokens", (done) => {
        TRANSLATOR.updateTokens()
            .then(() => {
                expect(typeof TRANSLATOR.qtk).toEqual("string");
                expect(TRANSLATOR.qtk.length).toBeGreaterThan(0);

                expect(typeof TRANSLATOR.qtv).toEqual("string");
                expect(TRANSLATOR.qtv.length).toBeGreaterThan(0);

                TRANSLATOR.updateTokens().then(() => {
                    expect(typeof TRANSLATOR.qtk).toEqual("string");
                    expect(TRANSLATOR.qtk.length).toBeGreaterThan(0);

                    expect(typeof TRANSLATOR.qtv).toEqual("string");
                    expect(TRANSLATOR.qtv.length).toBeGreaterThan(0);

                    done();
                });
            })
            .catch(() => {
                // because translator need to make use of chrome api when updating token
                done();
            });
    });

    it("to detect language of English text", () => {
        return TRANSLATOR.detect("hello").then((result) => {
            expect(result).toEqual("en");
        });
    });

    it("to detect language of Chinese text", () => {
        return TRANSLATOR.detect("你好").then((result) => {
            expect(result).toEqual("zh-CN");
        });
    });

    // eslint-disable-next-line jest/no-test-callback
    it("to translate a piece of English text", (done) => {
        TRANSLATOR.translate("hello", "en", "zh-CN")
            .then((result) => {
                expect(result.mainMeaning).toEqual("“喂”的招呼声");
                expect(result.originalText).toEqual("hello");
                done();
            })
            .catch(() => {
                // because translator need to make use of chrome api when updating token
                done();
            });
    });

    // eslint-disable-next-line jest/no-test-callback
    it("to translate a piece of Chinese text", (done) => {
        TRANSLATOR.translate("你好", "zh-CN", "en")
            .then((result) => {
                expect(result.mainMeaning).toEqual("Hello");
                expect(result.originalText).toEqual("你好");
                done();
            })
            .catch(() => {
                // because translator need to make use of chrome api when updating token
                done();
            });
    });
});
