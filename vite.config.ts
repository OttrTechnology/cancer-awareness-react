import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteEjsPlugin } from "vite-plugin-ejs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    ViteEjsPlugin((viteConfig) => ({ env: viteConfig.env })),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["./src/styles"],
      },
    },
  },
});
