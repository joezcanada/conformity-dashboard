/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly DEV: boolean;
    readonly VITE_APP_NAME: string;
    readonly VITE_APP_VERSION: string;
    readonly VITE_METRIC_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}