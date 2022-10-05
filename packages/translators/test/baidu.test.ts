import path from "path";
import axios from "axios";
import fs from "fs";
import BaiduTranslator from "../src/translators/baidu";

describe("baidu translator api", () => {
    const TRANSLATOR = new BaiduTranslator();

    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
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

    it("to parse translation result", () => {
        let result = fs.readFileSync(
            path.resolve(__dirname, "./fixtures/baiduTransResult.json"),
            "utf-8"
        );
        result = JSON.parse(result);
        const parseResult = TRANSLATOR.parseResult(result);
        expect(parseResult.originalText).toEqual("hello");
        expect(parseResult.mainMeaning).toEqual("你好");
        expect(parseResult.tPronunciation).toEqual("nǐ hǎo");
        expect(parseResult.sPronunciation).toEqual("həˈləʊ");
        expect(parseResult.detailedMeanings![0].pos).toBeDefined();
        expect(parseResult.definitions![0].pos).toBeDefined();
        expect(parseResult.examples!.length).toBeGreaterThan(0);
    });
});
