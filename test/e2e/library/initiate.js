/**
 * Set source or target language types.
 * @param {
 *   source?: string;
 *   target?: string;
 *   mutual?: boolean; // Wether to open mutual translation mode.
 * } languageSetting
 */
export async function changeLanguageSetting(languageSetting) {
    await driver.navigate(driver.PAGES.POPUP);
    await driver.clickElement("#setting-switch");
    if (languageSetting.source) {
        await driver.selectOption(await driver.findElement("#sl"), languageSetting.source);
    }
    if (languageSetting.target) {
        await driver.selectOption(await driver.findElement("#tl"), languageSetting.target);
    }
    if (languageSetting.mutual !== undefined) {
        const mutualTranslatorSwitch = await driver.findElement("#mutual-translate");
        if ((await mutualTranslatorSwitch.isEnabled()) === languageSetting.mutual) {
            await mutualTranslatorSwitch.click();
        }
    }
}
