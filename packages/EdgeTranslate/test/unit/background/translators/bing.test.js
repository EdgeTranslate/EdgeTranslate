import axios from "axios";
import TRANSLATOR from "background/library/translators/bing.js";

describe("bing translator api", () => {
    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);

        // Set user-agent to prevent 429 error.
        TRANSLATOR.HEADERS["user-agent"] =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36";
    });

    it("to update IG and IID", () => {
        return TRANSLATOR.updateIGIID().then(() => {
            expect(typeof TRANSLATOR.IG).toEqual("string");
            expect(TRANSLATOR.IG.length).toBeGreaterThan(0);

            expect(typeof TRANSLATOR.IID).toEqual("string");
            expect(TRANSLATOR.IID.length).toBeGreaterThan(0);
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
            expect(result.originalText).toEqual("Hello");
        });
    });

    it("to translate a piece of Chinese text", () => {
        return TRANSLATOR.translate("你好", "zh-CN", "en").then((result) => {
            expect(result.mainMeaning).toEqual("Hello");
            expect(result.originalText).toEqual("你好");
        });
    });
});
