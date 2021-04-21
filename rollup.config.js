import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";

// The main JavaScript bundle for modern browsers that support
// JavaScript modules and other ES2015+ features.
const config = {
  input: "src/index.js",
  output: {
    dir: "dist",
    format: "es",
  },
  plugins: [
    minifyHTML(),
    resolve(),
  ],
  preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== "development") {
  config.plugins.push(terser());
}

export default config;

