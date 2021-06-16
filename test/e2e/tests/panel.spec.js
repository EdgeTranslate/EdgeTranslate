import path from "path";
import { By } from "selenium-webdriver";

const SelectionButtonId = "edge-translate-button";
const WaitTranslationResultTime = 200; // Delayed time for waiting the response of translation result.
const WaitButtonTime = 350; // Delayed time for waiting the animation of button to finish.
const PageName = "main.html";

describe("panel functions", () => {
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
});
