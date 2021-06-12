const { configureToMatchImageSnapshot } = require("jest-image-snapshot");
const path = require("path");

driver.driver
    .manage()
    .window()
    .getRect()
    .then((screenSize) => {
        const toMatchImageSnapshot = configureToMatchImageSnapshot({
            customSnapshotsDir: path.resolve(
                __dirname,
                "../image_snapshots",
                process.env.SELENIUM_BROWSER,
                process.platform,
                `${screenSize.width}x${screenSize.height}`
            ),
            comparisonMethod: "ssim",
            failureThreshold: 0.1,
            failureThresholdType: "percent",
        });
        expect.extend({ toMatchImageSnapshot });
    });
