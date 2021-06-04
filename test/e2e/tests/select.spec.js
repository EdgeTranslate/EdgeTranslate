import path from "path";

describe("selection translation functions", () => {
    test("selection", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);

        const text = "edge";
        const textEl = await driver.findElement(`#${text}`);
        expect(await textEl.getText()).toBe(text);

        await driver.selectElement(`#${text}`);
        expect(await driver.executeScript("return window.getSelection().toString();")).toBe(text);

        await driver.clickElement("#edge-translate-button");
    });
});
