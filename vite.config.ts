import path from "path";

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/react-pdf-highlighter/index.ts"),
      name: "react-pdf-highlighter",
      fileName: (format) => `react-pdf-highlighter.${format}.js`,
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
});
