import ts from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: "./src/index.ts",
      name: "ReactPdfHighlighter",
      fileName: (format) => `react-pdf-highlighter.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      input: {
        main: "./src/index.ts",
        style: "./src/style/index.css",
      },
      external: ["react", "react-dom"],
      output: {
        inlineDynamicImports: false,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [ts()],
    },
  },
});
