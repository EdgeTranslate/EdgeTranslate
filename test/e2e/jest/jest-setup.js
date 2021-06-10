const { configureToMatchImageSnapshot } = require("jest-image-snapshot");
const path = require("path");

const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customSnapshotsDir: path.resolve(__dirname, "../image_snapshots"),
    comparisonMethod: "ssim",
    failureThreshold: 0.1,
    failureThresholdType: "percent",
});
expect.extend({ toMatchImageSnapshot });
