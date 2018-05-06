import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: [
    {
      file: "es/select-pure.min.js",
      format: "es",
      name: "SelectPure",
    },
    {
      file: "lib/bundle.min.js",
      format: "umd",
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
