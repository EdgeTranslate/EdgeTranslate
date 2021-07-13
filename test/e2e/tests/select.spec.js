import path from "path";

const SelectionButtonId = "edge-translate-button";
const WaitTranslationResultTime = 200; // Delayed time for waiting the response of translation result.
const WaitButtonTime = 350; // Delayed time for waiting the animation of button to finish.
const PageName = "main.html";

describe("selection translation functions", () => {
    test("Selection button shows once a text is selected.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        await driver.selectElement(`#${text}`);
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.delay(WaitButtonTime);
        const selectionButton = await driver.findElement(`#${SelectionButtonId}`);
        expect(await selectionButton.takeScreenshot(true)).toMatchImageSnapshot();
    });

    test("Start to translate once a text is selected.", async () => {
        await driver.navigate(driver.PAGES.OPTIONS);
        /* Open translating after select mode. */
        await driver.clickElement("#translate-after-select");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        await driver.selectElement(`#${text}`);
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.delay(WaitTranslationResultTime);
        expect(await (await driver.getPanel()).takeScreenshot(true)).toMatchImageSnapshot();
        // The selected text shouldn't be canceled.
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        /* Close translating after select mode. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#translate-after-select");
    });

    test("Cancel text selection after translation.", async () => {
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#cancel-text-selection");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        await driver.selectElement(`#${text}`);
        await driver.delay(WaitButtonTime);
        await driver.clickElement(`#${SelectionButtonId}`);
        await driver.delay(WaitTranslationResultTime);
        // The selected text should be canceled.
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe("");

        /* Restore settings. */
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#cancel-text-selection");
    });

    test("Double click text to show translation button.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        const actions = driver.actions({ async: true });
        // Perform double-click action on the text.
        await actions.doubleClick(textEl).perform();
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.delay(WaitButtonTime);
        const selectionButton = await driver.findElement(`#${SelectionButtonId}`);
        expect(await selectionButton.takeScreenshot(true)).toMatchImageSnapshot();
    });

    test("Double click text to translate directly.", async () => {
        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#translate-after-dbl-click");

        await driver.get(`file://${path.resolve(__dirname, "../pages", PageName)}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        const actions = driver.actions({ async: true });
        // Perform double-click action on the text.
        await actions.doubleClick(textEl).perform();
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.delay(WaitTranslationResultTime);
        expect(await (await driver.getPanel()).takeScreenshot(true)).toMatchImageSnapshot();
        // The selected text shouldn't be canceled.
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.navigate(driver.PAGES.OPTIONS);
        await driver.clickElement("#translate-after-dbl-click");
    });
});
