const fs = require("fs");
const os = require("os");
const path = require("path");
const AdmZip = require("adm-zip");
const { Builder, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

/**
 * The prefix for temporary Firefox profiles. All Firefox profiles used for e2e tests
 * will be created as random directories inside this.
 * @type {string}
 */
const TEMP_PROFILE_PATH_PREFIX = path.join(os.tmpdir(), "EdgeTranslate-Fx-Profile");

/**
 * A wrapper around a {@code WebDriver} instance exposing Firefox-specific functionality
 */
class FirefoxDriver {
    /**
     * Builds a {@link FirefoxDriver} instance
     * @param {Object} options - the options for the build
     * @returns {Promise<{driver: !ThenableWebDriver, extensionUrl: string, extensionId: string}>}
     */
    static async build({ responsive, port, headless, language, proxyUrl }) {
        /**
         * Pack the directory of firefox to a .zip file.
         */
        const targetZipPath = "build/edge_translate_firefox.zip";
        const zip = new AdmZip();
        zip.addLocalFolder("build/firefox");
        zip.writeZip(targetZipPath);

        const templateProfile = fs.mkdtempSync(TEMP_PROFILE_PATH_PREFIX);
        let options = new firefox.Options().setProfile(templateProfile);
        if (headless) options = options.headless();
        if (language) options = options.setPreference("intl.accept_languages", language);
        if (proxyUrl)
            options = options
                .setProxy({
                    proxyType: "manual",
                    httpProxy: proxyUrl,
                    sslProxy: proxyUrl,
                })
                .setAcceptInsecureCerts(true);
        const builder = new Builder().forBrowser("firefox").setFirefoxOptions(options);
        if (port) {
            const service = new firefox.ServiceBuilder().setPort(port);
            builder.setFirefoxService(service);
        }
        const driver = builder.build();
        const fxDriver = new FirefoxDriver(driver);

        const extensionId = await fxDriver.installExtension(targetZipPath, true);
        const internalExtensionId = await fxDriver.getInternalId();

        if (responsive) {
            await driver.manage().window().setRect({ width: 320, height: 600 });
        }

        return {
            driver,
            extensionId,
            extensionUrl: `moz-extension://${internalExtensionId}`,
        };
    }

    /**
     * @constructor
     * @param {!ThenableWebDriver} driver - a {@code WebDriver} instance
     */
    constructor(driver) {
        this._driver = driver;
    }

    /**
     * Installs the extension at the given path
     * @param {string} addonPath - the path to the unpacked extension or XPI
     * @returns {Promise<string>} the extension ID
     */
    async installExtension(addonPath) {
        return await this._driver.installAddon(addonPath, true);
    }

    /**
     * Returns the Internal UUID for the given extension
     * @returns {Promise<string>} the Internal UUID for the given extension
     */
    async getInternalId() {
        await this._driver.get("about:debugging#addons");
        return await this._driver
            .wait(until.elementLocated(By.xpath("//dl/div[contains(., 'Internal UUID')]/dd")), 1000)
            .getText();
    }
}

module.exports = FirefoxDriver;
