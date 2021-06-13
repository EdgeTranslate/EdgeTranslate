// teardown.js
module.exports = async function () {
    await global.driver?.quit();
};
