module.exports = async function () {
    await global.driver?.quit();
    await global.server.stop();
};
