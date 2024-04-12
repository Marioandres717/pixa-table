import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "MyLib",
      fileName: "my-lib",
    },
    rollupOptions: {
      external: ["react", "@tanstack/react-table"],
      output: {
        globals: {
          react: "React",
          "@tanstack/react-table": "ReactTable",
        },
      },
    },
  },
  plugins: [react()],
});
