import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import { redwood } from "rwsdk/vite";

export default defineConfig({
  plugins: [
    redwood(),
  ],
  resolve: {
    alias: {
      "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
    },
  },
});
