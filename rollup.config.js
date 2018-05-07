import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.min.js",
      format: "iife",
      name: "SelectPure",
    },
  ],
  plugins: [
    eslint({
      include: "src/**",
    }),
    babel(),
    uglify(),
  ],
};
