/* eslint-disable */
const { describe, beforeEach, afterEach, it } = require("mocha");
const chrome = require("sinon-chrome");
const jsdom = require("jsdom");

const babel = require("@babel/core");
const codePath = "src/translators/baidu.js";
const code = babel.transformFileSync(codePath).code;

describe("Baidu.js", function() {
    var dom;
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
        done();
    });
    it("translate", function(done) {
        // setTimeout(() => {
        //     done();
        // }, 1000);
        let global = dom.window.TRANSLATOR;
        global.getTokenGtk().then(translator => {
            translator
                .translate("hello", "en", "zh")
                .then(result => {
                    console.log(result);
                    done();
                })
                .catch(error => {
                    console.log(error);
                    done();
                });
        });
        // expect(add(1, 1)).to.be.equal(2);
    });

    afterEach(function() {
        dom.window.close();
        chrome.reset();
    });
});
