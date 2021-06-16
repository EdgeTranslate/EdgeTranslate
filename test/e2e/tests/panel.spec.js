import path from "path";
import { By } from "selenium-webdriver";

const SelectionButtonId = "edge-translate-button";
const WaitTranslationResultTime = 200; // Delayed time for waiting the response of translation result.
const WaitButtonTime = 350; // Delayed time for waiting the animation of button to finish.

describe("panel functions", () => {
    test("Click icon to pin panel.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/main.html")}`);

        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);

        let panel = await driver.getPanel();
        expect(panel).not.toBeUndefined();
        const PinIcon = await panel.findElement(By.css(`*[data-testid="${"PinIcon"}"]`));
        expect(await PinIcon.takeScreenshot(true)).toMatchImageSnapshot();

        /* Fix the panel. */
        await PinIcon.click();
        await driver.delay(400);
        expect(await PinIcon.takeScreenshot(true)).toMatchImageSnapshot();
        // Click a place out of the panel.
        await driver.clickElement(`#${text}`);
        panel = await driver.getPanel();
        expect(panel).not.toBeUndefined();

        /* Unfix the panel. */
        await PinIcon.click();
        await driver.delay(400);
        expect(await PinIcon.takeScreenshot(true)).toMatchImageSnapshot();
        // Click a place out of the panel.
        await driver.clickElement(`#${text}`);
        panel = await driver.getPanel();
        expect(panel).toBeUndefined();
    });
});
