const JSDomEnvironment = require("jest-environment-jsdom");

class CustomEnvironment extends JSDomEnvironment {
    constructor(config, context) {
        super(config, context);
        this.testPath = context.testPath;
    }

    async setup() {
        await super.setup();
        this.global.server = process.server;
        this.global.driver = process.driver;
    }

    async teardown() {
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}
module.exports = CustomEnvironment;
