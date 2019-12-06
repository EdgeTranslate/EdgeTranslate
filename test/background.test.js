const assert = require("sinon").assert;
const chrome = require("sinon-chrome");
const fs = require("fs");
const jsdom = require("jsdom");

const background = fs.readFileSync("build/chrome/background.js", "utf-8");

describe("background.js", function() {
    var dom;
    beforeEach(function(done) {
        // 创建dom
        dom = new jsdom.JSDOM("<html></html>", {
            runScripts: "dangerously",
            beforeParse(window) {
                window.chrome = chrome;
                window.console = console;
            }
        });
        // 注入待测试的js文件
        let script = dom.window.document.createElement("script");
        script.textContent = background.toString();
        dom.window.document.documentElement.appendChild(script);
        done();
    });

    afterEach(function() {
        dom.window.close();
        chrome.reset();
    });
});
