import { defineConfig } from "vite";
import zip from "vite-plugin-zip-pack";
import path from "path";
import preact from "@preact/preset-vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
    const manifest = readJsonFile("src/manifest.json");
    const pkg = readJsonFile("package.json");
    return {
        version: pkg.version,
        ...manifest,
    };
}

const targetBrowser = process.env.VITE_TARGET_BROWSER || "chrome";

export default defineConfig({
    root: "src",
    build: {
        outDir: path.resolve(__dirname, "dist", targetBrowser),
    },
    plugins: [
        preact(),
        webExtension({
            manifest: generateManifest,
            browser: targetBrowser,
            watchFilePaths: ["package.json", "manifest.json"],
        }),
        process.env.ZIP === "true" &&
            zip({
                inDir: `dist/${targetBrowser}`,
                outDir: "dist",
                outFileName: `${targetBrowser}.zip`,
            }),
    ],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
        },
    },
});
