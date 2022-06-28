import axios from "axios";
import GoogleTranslator from "../src/translators/google";

describe("google translator api", () => {
    const TRANSLATOR = new GoogleTranslator();

    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to update TKK", (done) => {
        TRANSLATOR.updateTKK()
            .then(() => {
                expect(typeof TRANSLATOR.TKK[0]).toEqual("number");
                expect(typeof TRANSLATOR.TKK[1]).toEqual("number");
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("to detect language of English text", (done) => {
        TRANSLATOR.detect("hello")
            .then((result) => {
                expect(result).toEqual("en");
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("to detect language of Chinese text", (done) => {
        TRANSLATOR.detect("你好")
            .then((result) => {
                expect(result).toEqual("zh-CN");
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("to translate a piece of English text", (done) => {
        TRANSLATOR.translate("hello", "en", "zh-CN")
            .then((result) => {
                expect(result.mainMeaning).toEqual("你好");
                expect(result.originalText).toEqual("hello");
                done();
            })
            .catch((error) => {
                done(error);
            });
    });

    it("to translate a piece of Chinese text", (done) => {
        TRANSLATOR.translate("你好", "zh-CN", "en")
            .then((result) => {
                expect(result.mainMeaning).toEqual("Hello");
                expect(result.originalText).toEqual("你好");
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
});
