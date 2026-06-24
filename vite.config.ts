import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babelPlugin from "@rolldown/plugin-babel";

const SERVER_HOST = "127.0.0.1";
const SERVER_PORT = 3000;

const config = defineConfig({
    server: { host: SERVER_HOST, port: SERVER_PORT },
    resolve: {
        tsconfigPaths: true,
        // Explicit so vitest's bundled vite (which lacks `tsconfigPaths`)
        // resolves `@/` the same way the app build does.
        alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    plugins: [
        devtools(),
        tailwindcss(),
        tanstackRouter({ target: "react", autoCodeSplitting: true }),
        viteReact(),
        babelPlugin({ presets: [reactCompilerPreset()] }),
    ],
});

export default config;
