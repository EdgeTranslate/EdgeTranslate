const fs = require("fs");
import { LANGUAGES } from "@edge_translate/translators";
import { BROWSER_LANGUAGES_MAP } from "common/scripts/languages.js";

describe("All languages supported by Google web page translate should be in BROWSER_LANGUAGES_MAP.", () => {
    it("check languages for Google page translate", () => {
        const langSet = new Set();
        for (let langName in BROWSER_LANGUAGES_MAP) {
            langSet.add(BROWSER_LANGUAGES_MAP[langName]);
        }

        const langInLans = fs
            .readdirSync("static/google/lans/")
            .map((file) => file.split("_")[1].split(".")[0]);
        langInLans.forEach((lang) => {
            expect(langSet).toContain(lang);
        });

        const langInMain = fs
            .readdirSync("static/google/elms/")
            .map((file) => file.split("_")[1].split(".")[0]);
        langInMain.forEach((lang) => {
            expect(langSet).toContain(lang);
        });
    });
});

describe("All languages in BROWSER_LANGUAGES_MAP should be in LANGUAGES.", () => {
    // Build language set.
    const langSet = new Set();
    for (let lang in LANGUAGES) {
        langSet.add(lang);
    }

    it("check languages in BROWSER_LANGUAGES_MAP", () => {
        for (let langName in BROWSER_LANGUAGES_MAP) {
            let lang = BROWSER_LANGUAGES_MAP[langName];
            expect(langSet).toContain(lang);
        }
    });
});
