import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      env.command === "build" ? "production" : "development",
    ),
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({
      rollupTypes: true,
      exclude: ["src/App.tsx", "src/main.tsx", "src/stories/**/*"],
      include: [
        "src/assets",
        "src/components",
        "src/features",
        "src/hooks",
        "src/utils",
        "src/main.ts",
        "src/typeDefs.ts",
        "src/theme.ts",
      ],
    }),
    svgr({
      include: ["**/*.svg"],
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      name: "pixaTable",
      fileName: "main",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["/setupTest.ts", "@testing-library/jest-dom/vitest"],
  },
}));
