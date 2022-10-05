const path = require("path");
const mockttp = require("mockttp");

import { buildWebDriver } from "../webdriver";
import { changeLanguageSetting } from "../library/initiate.js";

const ProxyPort = 8080;

module.exports = async () => {
    // Create a proxy server with a self-signed HTTPS CA certificate.
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });
    await server.start(ProxyPort);
    global.server = server;
    process.server = server;

    const driver = (
        await buildWebDriver({
            proxyUrl: `localhost:${ProxyPort}`,
        })
    ).driver;
    global.driver = driver;
    process.driver = driver;
    await driver.driver.manage().window().maximize();

    const SL = "en",
        TL = "zh-CN",
        WordsList = ["edge"];
    // Mock the translation requests for the words.
    WordsList.reduce(
        (server, word) =>
            server
                .withQuery({
                    sl: SL,
                    tl: TL,
                    q: word,
                })
                .thenFromFile(
                    200,
                    path.resolve(__dirname, `../fixtures/words/${word}/google/${SL}-${TL}.json`)
                ),
        server.anyRequest().forHost("translate.googleapis.com")
    );

    await changeLanguageSetting({
        source: SL,
        target: TL,
        mutual: false,
    });
};
