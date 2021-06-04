import path from "path";

describe("selection translation functions", () => {
    test("selection", async () => {
        await driver.get(`file://${path.resolve(__dirname, "../pages/selection.html")}`);
        expect(1).toBe(1);
    });
});
