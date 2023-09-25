/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_AES: string;
  readonly VITE_ILLUSTRATIONS_BASE_URL: string;
  readonly VITE_ENABLE_GOOGLE_ANALYTICS: "true" | "false";
  readonly VITE_SENTRY_DSN?: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
