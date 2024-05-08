import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  define: {
    "process.env": {
      NODE_ENV:
        env.command === "build"
          ? { "process.env.NODE_ENV": "'production'" }
          : { "process.env.NODE_ENV": "'development'" },
    },
  },
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
        "src/typeDefs",
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
      external: ["react", "react-dom", "@tanstack/react-table"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tanstack/react-table": "ReactTable",
        },
      },
    },
  },
}));
