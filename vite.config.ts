import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      rollupTypes: true,
      exclude: ["src/App.tsx", "src/main.tsx"],
      include: [
        "src/components",
        "src/configs",
        "src/templates",
        "src/utils",
        "src/main.ts",
        "src/assets",
        "src/hooks",
      ],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      name: "pixaTable",
      fileName: "pixa-table",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@tanstack/react-table",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tanstack/react-table": "ReactTable",
          "react/jsx-runtime": "jsx",
          "react/jsx-dev-runtime": "jsx",
        },
      },
    },
  },
});
