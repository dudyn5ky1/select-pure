import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import { uglify } from "rollup-plugin-uglify";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

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
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      plugins: [
      	"@babel/plugin-proposal-object-rest-spread",
      ],
      presets: [
	"@babel/env"
      ],
      babelrc: false,
    }),
    uglify(),
  ],
};
