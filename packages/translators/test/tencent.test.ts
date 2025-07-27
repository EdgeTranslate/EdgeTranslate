import axios from "axios";
import TRANSLATOR from "../src/translators/tencent";

describe("tencent translator api", () => {
    const translator = new TRANSLATOR({});
    beforeAll(() => {
        // set http module of nodejs as axios' request method
        let path = require("path");
        let lib = path.join(path.dirname(require.resolve("axios")), "lib/adapters/http");
        axios.defaults.adapter = require(lib);

        (translator.HEADERS as { Origin: string })["Origin"] = translator.BASE_URL;
    });

    it("to detect language of English text", () => {
        return translator.detect("hello").then((result) => {
            expect(result).toEqual("en");
        });
    });

    it("to detect language of Chinese text", () => {
        return translator.detect("你好").then((result) => {
            expect(result).toEqual("zh-CN");
        });
    });

    it("to handle network error when pronouncing", async () => {
        const t = new TRANSLATOR({});
        t.AUDIO = {
            paused: true,
            play: jest.fn(() => Promise.reject(new Error("fail"))),
            pause: jest.fn(),
            error: { code: 2 },
        } as any;

        // mock cookie
        chrome.cookies.get = jest
            .fn()
            .mockImplementation((_opts, callback) => callback({ value: "x" }));

        await expect(t.pronounce("hello", "en", "fast")).rejects.toMatchObject({
            errorType: "NET_ERR",
        });
    });

    it("to handle api error when pronouncing", async () => {
        const t = new TRANSLATOR({});
        t.AUDIO = {
            paused: true,
            play: jest.fn(() => Promise.reject(new Error("fail"))),
            pause: jest.fn(),
            error: { code: 4 },
        } as any;

        chrome.cookies.get = jest
            .fn()
            .mockImplementation((_opts, callback) => callback({ value: "x" }));

        await expect(t.pronounce("hello", "en", "fast")).rejects.toMatchObject({
            errorType: "API_ERR",
            errorCode: 4,
        });
    });
});
