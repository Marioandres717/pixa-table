import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import svgr from "vite-plugin-svgr";

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
      fileName: "pixa-table",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
}));
