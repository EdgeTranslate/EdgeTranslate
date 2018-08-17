const assert = require('sinon').assert;
const chrome = require("sinon-chrome");
const fs = require("fs");
const jsdom = require("jsdom");

const background_js = fs.readFileSync("build/chrome/background.js", "utf-8");

describe("background.js", function () {
    var dom;
    beforeEach(function (done) {
        // 创建dom
        dom = new jsdom.JSDOM(
            "<html></html>", 
            {
                runScripts: "dangerously",
                beforeParse(window) {
                    window.chrome = chrome;
                    window.console = console;
                }
            }
        );
        // 注入待测试的js文件
        let script = dom.window.document.createElement("script");
        script.textContent = background_js;
        dom.window.document.documentElement.appendChild(script);
        done();
    });

    afterEach(function () {
        dom.window.close();
        chrome.reset();
    });

    it("Should add listeners on startup.", function () {
        assert.calledOnce(chrome.runtime.onMessage.addListener);
        assert.calledOnce(chrome.runtime.onInstalled.addListener);
        assert.calledOnce(chrome.contextMenus.onClicked.addListener);
        assert.calledOnce(chrome.runtime.onStartup.addListener);
    });

    it("Set default settings on installed.", function () {
        chrome.storage.sync.get("languageSetting", function (result) {
            assert.equals(result.languageSetting, undefined);
        });

        chrome.runtime.onInstalled.trigger();

        chrome.storage.sync.get("languageSetting", function (result) {
            assert.equals(result.languageSetting, { "sl": "auto", "tl": "zh-CN" });
        });
    });
});