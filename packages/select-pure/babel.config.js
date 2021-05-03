module.exports = {
  "presets": [
    [
      "@babel/preset-env",
    ],
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "decoratorsBeforeExport": true,
      },
    ],
    "@babel/proposal-class-properties",
    "@babel/plugin-transform-runtime",
  ],
};

