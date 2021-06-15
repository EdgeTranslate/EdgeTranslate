import { buildWebDriver } from "../webdriver";
const mockttp = require("mockttp");

const ProxyPort = 8080;

module.exports = async () => {
    // Create a proxy server with a self-signed HTTPS CA certificate.
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });
    await server.start(ProxyPort);
    global.server = server;
    process.server = server;

    global.driver = (
        await buildWebDriver({
            proxyUrl: `localhost:${ProxyPort}`,
        })
    ).driver;
    await global.driver.driver.manage().window().maximize();
    process.driver = global.driver;
};
