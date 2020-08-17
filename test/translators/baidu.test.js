const { describe, beforeEach, afterEach, it } = require("mocha");
const { expect } = require("chai");
const chrome = require("sinon-chrome");
const jsdom = require("jsdom");
const fs = require("fs");

const babel = require("babel-core");
const codePath = "src/translators/baidu.js";
const code = babel.transformFileSync(codePath).code;

describe("Baidu.js", function() {
    var dom;
    var global;
    beforeEach(function(done) {
        // 创建dom
        dom = new jsdom.JSDOM("<html></html>", {
            runScripts: "dangerously",
            url: "https://fanyi.baidu.com/", // to avoid cross origin error
            beforeParse(window) {
                window.chrome = chrome;
                window.console = console;
            }
        });
        // 注入待测试的js文件
        let script = dom.window.document.createElement("script");
        script.textContent = code;
        dom.window.document.documentElement.appendChild(script);
        global = dom.window;
        done();
    });

    it("detect language", function(done) {
        global.TRANSLATOR.detect("hello")
            .then(result => {
                let resultObject = JSON.parse(result);
                expect(resultObject.error).to.be.equal(0);
                expect(resultObject.msg).to.be.equal("success");
                expect(resultObject.lan).to.be.equal("en");
            })
            .catch(error => {
                expect(error).to.be.equal("error");
            });
        global.TRANSLATOR.detect("你好")
            .then(result => {
                let resultObject = JSON.parse(result);
                expect(resultObject.error).to.be.equal(0);
                expect(resultObject.msg).to.be.equal("success");
                expect(resultObject.lan).to.be.equal("zh");
                done();
            })
            .catch(error => {
                expect(error).to.be.equal("error");
                done();
            });
    });

    it("translate", function(done) {
        global.TRANSLATOR.translate("hello", "en", "zh")
            .then(result => {
                let resultObject = JSON.parse(result);
                expect(resultObject).to.include.keys("trans_result");
                expect(resultObject.trans_result.data[0].dst).to.be.equal("你好");
                expect(resultObject).to.include.keys("liju_result");
                expect(resultObject.dict_result).to.include.keys("collins");
                expect(resultObject.dict_result).to.include.keys("edict");
                expect(resultObject.dict_result).to.include.keys("oxford");
                done();
            })
            .catch(error => {
                expect(error).to.equal("error");
                done();
            });
    });

    it("parse translation result", function(done) {
        let result = fs.readFileSync("test/translators/baiduTransResult.json", "utf-8");
        result = JSON.parse(result);
        global.TRANSLATOR.parseResult(result);
        done();
    });

    afterEach(function() {
        dom.window.close();
        chrome.reset();
    });
});
