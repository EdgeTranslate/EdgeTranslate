import path from "path";
import { By } from "selenium-webdriver";

const SelectionButtonId = "edge-translate-button";
const WaitTranslationResultTime = 250; // Delayed time for waiting the response of translation result.
const WaitButtonTime = 350; // Delayed time for waiting the animation of button to finish.
const PageName = "main.html";

describe("panel functions", () => {
    test("Resize page after panel showing.", async () => {
        /* Open the setting for resizing page. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#Resize");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);
        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);

        // const transitionDuration = 500; in "src/content/display/Panel.jsx";
        await driver.delay(500);

        expect(await driver.takeScreenshot()).toMatchImageSnapshot();

        /* Close the switch for resizing page. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#Resize");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);
        expect(await driver.takeScreenshot()).toMatchImageSnapshot();
    });

    test("Click icon to pin panel.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);

        let panel = await driver.getPanel();
        expect(panel).not.toBeUndefined();
        const pinIcon = await panel.findElement(By.css(`*[data-testid="${"PinIcon"}"]`));
        expect(await pinIcon.takeScreenshot(true)).toMatchImageSnapshot();

        /* Fix the panel. */
        await pinIcon.click();
        await driver.delay(400);
        expect(await pinIcon.takeScreenshot(true)).toMatchImageSnapshot();
        // Click a place out of the panel.
        await driver.clickElement(`#${text}`);
        panel = await driver.getPanel();
        expect(panel).not.toBeUndefined();

        /* Unfix the panel. */
        await pinIcon.click();
        await driver.delay(400);
        expect(await pinIcon.takeScreenshot(true)).toMatchImageSnapshot();
        // Click a place out of the panel.
        await driver.clickElement(`#${text}`);
        panel = await driver.getPanel();
        expect(panel).toBeUndefined();
    });

    test("Click icon to open settings.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);

        const mainPageHandle = await driver.getWindowHandle();
        expect(typeof mainPageHandle).toBe("string");
        expect((await driver.getAllWindowHandles()).length).toEqual(1);

        let panel = await driver.getPanel();
        expect(panel).not.toBeUndefined();
        const settingIcon = await panel.findElement(By.css(`*[data-testid="${"SettingIcon"}"]`));
        expect(settingIcon).not.toBeUndefined();
        await settingIcon.click();
        await driver.delay(100);
        expect((await driver.getAllWindowHandles()).length).toEqual(2);
        // Click the icon again to see whether a third tab is created or not.
        await driver.switchToWindow(mainPageHandle);
        await settingIcon.click();
        await driver.delay(100);
        expect((await driver.getAllWindowHandles()).length).toEqual(2);
        await driver.switchToWindow(-1);
        await driver.close();
        await driver.switchToWindow(mainPageHandle);
        expect((await driver.getAllWindowHandles()).length).toEqual(1);
        expect(await driver.getTitle()).toEqual(PageName);
    });

    test("Display content from right to left.", async () => {
        /* Open the setting for showing content from right to left. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#RTL");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);
        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);
        expect(await driver.takeScreenshot(await driver.getPanel())).toMatchImageSnapshot();

        /* Restore the setting. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#RTL");
    });
});
