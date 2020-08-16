/* eslint-disable no-inner-declarations */
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
        global.getTokenGtk(() => {
            global.getTokenGtk(() => {
                global.translate("hello", "en", "zh", result => {
                    console.log(result);
                    done();
                });
            });
        });
        // expect(add(1, 1)).to.be.equal(2);
    });

    afterEach(function() {
        dom.window.close();
        chrome.reset();
    });
});
