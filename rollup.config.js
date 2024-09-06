import typescript from "@rollup/plugin-typescript";
import atImport from "postcss-import";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/style/index.css",
  output: {
    file: "dist/index.css",
    format: "es",
  },
  plugins: [
    typescript(),
    postcss({
      plugins: [atImport()],
      extract: true,
      minimize: true,
      sourceMap: false,
    }),
  ],
};
