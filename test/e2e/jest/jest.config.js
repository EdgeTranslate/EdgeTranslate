module.exports = {
    rootDir: "../",
    verbose: true,
    testEnvironment: "<rootDir>/jest/environment.js",
    setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.js"],
    testRegex: "(/test/e2e/.*\\.(test|spec))\\.(ts|tsx|js)$",
    testTimeout: 100_000,
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "\\.(css|less)$": "jest-raw-loader",
    },
};
