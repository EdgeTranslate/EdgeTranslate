const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
let proxy = require("selenium-webdriver/proxy");

/**
 * A wrapper around a {@code WebDriver} instance exposing Chrome-specific functionality
 */
class ChromeDriver {
    static async build({ responsive, port, headless, language, proxyUrl }) {
        const args = ["load-extension=build/chrome"];
        if (responsive) args.push("--auto-open-devtools-for-tabs");
        if (headless) args.push("--headless");
        if (language) args.push(`--lang=${language}`);
        if (proxyUrl) args.push("ignore-certificate-errors");

        const options = new chrome.Options().addArguments(args);
        if (proxyUrl) {
            options.setProxy(proxy.manual({ http: proxyUrl, https: proxyUrl }));
        }
        const builder = new Builder().forBrowser("chrome").setChromeOptions(options);
        if (port) {
            const service = new chrome.ServiceBuilder().setPort(port);
            builder.setChromeService(service);
        }
        const driver = builder.build();
        const chromeDriver = new ChromeDriver(driver);
        const extensionId = await chromeDriver.getExtensionIdByName("Edge Translate");

        return {
            driver,
            extensionId,
            extensionUrl: `chrome-extension://${extensionId}`,
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
     * Returns the extension ID for the given extension name
     * @param {string} extensionName - the extension name
     * @returns {Promise<string|undefined>} the extension ID
     */
    async getExtensionIdByName(extensionName) {
        await this._driver.get("chrome://extensions");
        // Wait for the extension to load.
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await this._driver.executeScript(`
      const extensions = document.querySelector("extensions-manager").shadowRoot
        .querySelector("extensions-item-list").shadowRoot
        .querySelectorAll("extensions-item")
      for (let i = 0; i < extensions.length; i++) {
        const extension = extensions[i].shadowRoot
        const name = extension.querySelector('#name').textContent
        if (name === "${extensionName}") {
          return extensions[i].getAttribute("id")
        }
      }
      return undefined
    `);
    }
}

module.exports = ChromeDriver;
