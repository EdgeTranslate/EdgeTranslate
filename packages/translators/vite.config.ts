import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    esbuild: {
        minify: true,
    },
    build: {
        target: "esnext",
        minify: "terser",
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "translators",
            formats: ["es", "umd", "iife"],
        },
    },
});
