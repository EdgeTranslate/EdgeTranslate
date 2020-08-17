import axios from "axios";
import TRANSLATOR from "../../src/translators/bing.js";

describe("bing translator api", () => {
    beforeEach(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);
    });

    it("to detect language type", done => {
        TRANSLATOR.detect("hello").then(result => {
            console.log(result);
            done();
        });
    });
});