import path from "path";

describe("selection translation functions", () => {
    test("selection", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

        const text = "edge";
        const textEl = await WebDriver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        await WebDriver.selectElement(`#${text}`);
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await WebDriver.clickElement("#edge-translate-button");
    });
});
