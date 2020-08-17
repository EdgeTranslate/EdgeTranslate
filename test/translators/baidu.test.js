import axios from "axios";
import fs from "fs";
import TRANSLATOR from "../../src/translators/baidu.js";

describe("baidu translator api", () => {
    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to detect language type", done => {
        // detect an English word
        TRANSLATOR.detect("hello").then(result => {
            let resultObject = result.data;
            expect(resultObject.error).toEqual(0);
            expect(resultObject.msg).toEqual("success");
            expect(resultObject.lan).toEqual("en");
        });
        // detect a Chinese word
        TRANSLATOR.detect("你好").then(result => {
            let resultObject = result.data;
            expect(resultObject.error).toEqual(0);
            expect(resultObject.msg).toEqual("success");
            expect(resultObject.lan).toEqual("zh");
            done();
        });
    });

    it("to get token and gtk", done => {
        TRANSLATOR.getTokenGtk().then(translator => {
            expect(translator).toBeUndefined();
            expect(TRANSLATOR.token).not.toEqual("");
            expect(TRANSLATOR.gtk).not.toEqual("");
            done();
        });
    });

    it("to translate a word", done => {
        TRANSLATOR.translate("hello", "en", "zh")
            .then(result => {
                let resultObject = result.data;
                expect(resultObject).toContain("trans_result");
                expect(resultObject.trans_result.data[0].dst).toEqual("你好");
                expect(resultObject).toContain("liju_result");
                expect(resultObject.dict_result).toContain("collins");
                expect(resultObject.dict_result).toContain("edict");
                expect(resultObject.dict_result).toContain("oxford");
                done();
            })
            .catch(error => {
                expect(error).toBeFalsy();
                done();
            });
    });

    it("to parse translation result", done => {
        let result = fs.readFileSync("test/translators/baiduTransResult.json", "utf-8");
        result = JSON.parse(result);
        TRANSLATOR.parseResult(result);
        done();
    });
});
