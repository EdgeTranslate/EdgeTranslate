import path from "path";

const SelectionButtonId = "edge-translate-button";
const WaitTranslationResultTime = 200; // Delayed time for waiting the response of translation result.
const WaitButtonTime = 350; // Delayed time for waiting the animation of button to finish.

const SL = "en",
    TL = "zh-CN",
    WordsList = ["edge"];
describe("selection translation functions", () => {
    beforeAll(async () => {
        // Mock the translation requests for the words.
        WordsList.reduce(
            (server, word) =>
                server
                    .withQuery({
                        sl: SL,
                        tl: TL,
                        q: word,
                    })
                    .thenFromFile(
                        200,
                        path.resolve(__dirname, `../fixtures/words/${word}/google/${SL}-${TL}.json`)
                    ),
            server.anyRequest().forHost("translate.google.cn")
        );

        await changeLanguageSetting({
            source: SL,
            target: TL,
            mutual: false,
        });
    });

    test("Selection button shows once a text is selected.", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

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

        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

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

        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

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
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

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

        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

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

/**
 * Set source or target language types.
 * @param {
 *   source?: string;
 *   target?: string;
 *   mutual?: boolean; // Wether to open mutual translation mode.
 * } languageSetting
 */
async function changeLanguageSetting(languageSetting) {
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
