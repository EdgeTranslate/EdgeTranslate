const JSDomEnvironment = require("jest-environment-jsdom");
import { buildWebDriver } from "../webdriver";

class CustomEnvironment extends JSDomEnvironment {
    constructor(config, context) {
        super(config, context);
        this.testPath = context.testPath;
    }

    async setup() {
        await super.setup();
        this.global.WebDriver = (await buildWebDriver()).driver;
        this.global.driver = this.global.WebDriver.driver;
    }

    async teardown() {
        await this.global.WebDriver.delay(5_000);
        await this.global.WebDriver?.quit();
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}
module.exports = CustomEnvironment;
