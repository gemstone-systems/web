/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Base URL of the geode shard to talk to (history + live socket). */
    readonly VITE_GEODE_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
