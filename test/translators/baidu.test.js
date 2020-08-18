import axios from "axios";
import fs from "fs";
import mockAdapter from "axios-mock-adapter";
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
        TRANSLATOR.getTokenGtk()
            .then(() => {
                // translation request using axios' http adapter always return errors
                // I have to mock requests of axios to avoid crossing origin and the errors
                let mock = new mockAdapter(axios);
                let query = "hello",
                    from = "en",
                    to = "zh",
                    url = "/v2transapi?" + "from=" + from + "&to=" + to;
                mock.onPost(url).reply(config => {
                    // to check post data
                    let data = new URLSearchParams(config.data);
                    expect(data.get("from")).toEqual(from);
                    expect(data.get("to")).toEqual(to);
                    expect(data.get("query")).toEqual(query);
                    expect(data.get("sign")).not.toEqual("");
                    expect(data.get("token")).not.toEqual("");

                    // to return translation result stored at $localResultPath
                    let localResultPath = "test/translators/baiduTransResult.json";
                    let result = fs.readFileSync(localResultPath, "utf-8").toString();
                    return [200, result];
                });
                return TRANSLATOR.translate(query, from, to);
            })
            .then(result => {
                let resultObject = result.data;
                expect(resultObject.trans_result).toBeDefined();
                expect(resultObject.trans_result.data[0].dst).toEqual("你好");
                expect(resultObject.liju_result).toBeDefined();
                expect(resultObject.dict_result.collins).toBeDefined();
                expect(resultObject.dict_result.edict).toBeDefined();
                expect(resultObject.dict_result.oxford).toBeDefined();
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
