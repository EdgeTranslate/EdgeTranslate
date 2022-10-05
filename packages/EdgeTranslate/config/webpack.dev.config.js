const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config.js");

module.exports = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "inline-source-map",
    watch: true,
});
