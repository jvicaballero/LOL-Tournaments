import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/

/**
 * Different ports = different origins = browser blocks it.

The proxy makes it so the request never leaves port 5173 from the browser's perspective, so no cross-origin violation.
no need to import cors because of lines 25-27
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      picocss: path.resolve(__dirname, "../node_modules/@picocss/pico/css"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
