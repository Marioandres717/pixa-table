import { rimraf } from "rimraf";
import { resolve, join } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const removeMSW = () => ({
  name: "remove-msw",
  closeBundle: async () => {
    await rimraf(join(__dirname, "dist", "mockServiceWorker.js"));
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "pixaTable",
      fileName: "pixa-table",
    },
    rollupOptions: {
      external: ["react", "react-dom", "tanstack/react-table"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "tanstack/react-table": "ReactTable",
        },
      },
    },
  },
  plugins: [react(), removeMSW()],
});
