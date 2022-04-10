const path = require("path");

module.exports = {
    entry: {
        "/background/background": "./src/background/background.js",
        "/content/pdf": "./src/content/pdf.js",
        "/content/banner_controller": "./src/content/banner_controller.js",
        "/content/select/select": "./src/content/select/select.js",
        "/content/display/display": "./src/content/display/index.js",
        "/content/notice/notice": "./src/content/notice/notice.js",
        "/popup/popup": "./src/popup/popup.js",
        "/options/options": "./src/options/options.js",
        "/content/deepl_injector": "./src/content/deepl_injector.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "../build"),
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: [/\.css$/],
                use: "raw-loader",
            },
            {
                test: [/\.svg$/],
                loader: "@svgr/webpack",
                options: {
                    titleProp: true,
                },
            },
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "../src"),
            common: path.resolve(__dirname, "../src/common"),
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
        },
        fallback: {
            path: false,
            fs: false,
            stream: false,
        },
    },
    performance: {
        hints: false,
    },
};
