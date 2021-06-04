import axios from "axios";
import TRANSLATOR from "background/library/translators/google.js";

describe("google translator api", () => {
    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to update TKK", () => {
        return TRANSLATOR.updateTKK().then(() => {
            expect(typeof TRANSLATOR.TKK[0]).toEqual("number");
            expect(typeof TRANSLATOR.TKK[1]).toEqual("number");
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

    it("to translate a piece of English text", () => {
        return TRANSLATOR.translate("hello", "en", "zh-CN").then((result) => {
            expect(result.mainMeaning).toEqual("你好");
            expect(result.originalText).toEqual("hello");
        });
    });

    it("to translate a piece of Chinese text", () => {
        return TRANSLATOR.translate("你好", "zh-CN", "en").then((result) => {
            expect(result.mainMeaning).toEqual("Hello there");
            expect(result.originalText).toEqual("你好");
        });
    });
});
