import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";
import uglify from "rollup-plugin-uglify";

export default {
  input: "src/index.js",
  output: {
    file: "lib/bundle.min.js",
    format: "umd",
    name: "Boilerplate",
  },
  plugins: [
    eslint({
      include: "src/**",
    }),
    babel(),
    uglify(),
  ],
};
