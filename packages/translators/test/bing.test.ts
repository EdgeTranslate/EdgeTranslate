import axios from "axios";
import BingTranslator from "../src/translators/bing";

describe("bing translator api", () => {
    const TRANSLATOR = new BingTranslator();

    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to update IG and IID", async () => {
        await TRANSLATOR.updateTokens().then(() => {
            expect(typeof TRANSLATOR.IG).toEqual("string");
            expect(TRANSLATOR.IG.length).toBeGreaterThan(0);

            expect(typeof TRANSLATOR.IID).toEqual("string");
            expect(TRANSLATOR.IID!.length).toBeGreaterThan(0);
        });
    });
});
