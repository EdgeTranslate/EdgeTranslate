const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

module.exports = merge(baseWebpackConfig, {
    mode: "production",
});
