import fs from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts(),
    {
      name: "copy-css-to-dist",
      closeBundle() {
        // Combine all CSS files from src/style directory
        const cssDir = resolve("src/style");
        const outputFile = resolve("dist/style.css");

        // Get all CSS files from style directory
        const cssFiles = fs
          .readdirSync(cssDir)
          .filter((file) => file.endsWith(".css"))
          .map((file) => resolve(cssDir, file));

        // Combine all CSS content
        let combinedCss = "";
        for (const file of cssFiles) {
          combinedCss += `${fs.readFileSync(file, "utf8")}\n`;
        }

        // Create dist directory if it doesn't exist
        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }

        // Write the combined CSS to dist/style.css
        fs.writeFileSync(outputFile, combinedCss);

        console.log("CSS files combined and copied to dist/style.css");
      },
    },
  ],
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      },
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "react-dom/client",
        "react-rnd",
        "pdfjs-dist",
        "pdfjs-dist/web",
        "debounce",
      ],
    },
  },
});
