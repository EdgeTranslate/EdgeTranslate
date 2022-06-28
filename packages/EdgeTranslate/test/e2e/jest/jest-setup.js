const { configureToMatchImageSnapshot } = require("jest-image-snapshot");
const path = require("path");
import { BROWSER_LANGUAGES_MAP } from "../../../src/common/scripts/languages";

Promise.all([
    driver.driver.manage().window().getRect(),
    driver.executeScript("return window.navigator.language"),
]).then((results) => {
    const screenSize = results[0];
    const language = results[1];
    const toMatchImageSnapshot = configureToMatchImageSnapshot({
        customSnapshotsDir: path.resolve(
            __dirname,
            "../image_snapshots",
            process.env.SELENIUM_BROWSER,
            process.platform,
            BROWSER_LANGUAGES_MAP[language],
            `${screenSize.width}x${screenSize.height}`
        ),
        comparisonMethod: "ssim",
        failureThreshold: 0.01,
        failureThresholdType: "percent",
    });
    expect.extend({ toMatchImageSnapshot });
});
