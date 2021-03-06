module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
        jest: true,
    },
    extends: ["eslint:recommended", "preact", "prettier", "plugin:prettier/recommended"],
    globals: {
        document: false,
        window: false,
        chrome: false,
        browser: false,
        BROWSER_ENV: false,
    },
    plugins: ["html", "prettier"],
    rules: {
        quotes: ["error", "double"],
        "no-multiple-empty-lines": [0, { max: 100 }],
    },
};
