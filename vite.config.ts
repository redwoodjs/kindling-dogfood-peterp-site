import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import { redwood } from "rwsdk/vite";

export default defineConfig({
  plugins: [
    redwood(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
