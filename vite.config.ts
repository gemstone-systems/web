import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babelPlugin from '@rolldown/plugin-babel'

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 3000

const config = defineConfig({
    server: { host: SERVER_HOST, port: SERVER_PORT },
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        tailwindcss(),
        tanstackRouter({ target: 'react', autoCodeSplitting: true }),
        viteReact(),
        babelPlugin({ presets: [reactCompilerPreset()] }),
    ],
})

export default config
