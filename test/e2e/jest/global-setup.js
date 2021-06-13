import { buildWebDriver } from "../webdriver";

module.exports = async () => {
    global.driver = (await buildWebDriver()).driver;
    await global.driver.driver.manage().window().maximize();
    process.driver = global.driver;
};
