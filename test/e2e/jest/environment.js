const JSDomEnvironment = require("jest-environment-jsdom");
import { buildWebDriver } from "../webdriver";

class CustomEnvironment extends JSDomEnvironment {
    constructor(config, context) {
        super(config, context);
        this.testPath = context.testPath;
    }

    async setup() {
        await super.setup();
        this.global.driver = (await buildWebDriver()).driver;
        await this.global.driver.driver.manage().window().maximize();
    }

    async teardown() {
        await this.global.driver?.quit();
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}
module.exports = CustomEnvironment;
