import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "./src/assets/ts/main.ts",
        style: "./src/assets/css/main.css",
      },
    },
  },
});
