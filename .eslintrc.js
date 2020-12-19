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
    extends: ["plugin:prettier/recommended", "eslint:recommended", "preact"],
    globals: {
        document: false,
        window: false,
        chrome: false,
        browser: false,
        BROWSER_ENV: false,
    },
    plugins: ["html", "prettier"],
    // add your custom rules here
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["error", "double"],
        "no-multiple-empty-lines": [0, { max: 100 }],
    },
};
