import axios from "axios";
import TRANSLATOR from "../../src/translators/bing.js";

describe("bing translator api", () => {
    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to get IG and IID", done => {
        TRANSLATOR.getIGIID()
            .then(() => {
                expect(typeof TRANSLATOR.IG).toEqual("string");
                expect(TRANSLATOR.IG.length).toBeGreaterThan(0);
                done();
            })
            .catch(error => {
                done(error);
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
                expect(result).toEqual("zh-Hans");
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
