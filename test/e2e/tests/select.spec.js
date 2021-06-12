import path from "path";

const SelectionButtonId = "edge-translate-button";
describe("selection translation functions", () => {
    test("selection", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        await driver.selectElement(`#${text}`);
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.delay(500);
        const selectionButton = await driver.findElement(`#${SelectionButtonId}`);
        expect(await selectionButton.takeScreenshot(true)).toMatchImageSnapshot();

        await selectionButton.click();
        await driver.delay(5_000);
        expect(await (await driver.getPanel()).takeScreenshot(true)).toMatchImageSnapshot();
    });
});
