module.exports = {
  testEnvironment: "jest-environment-jsdom-sixteen",
  "transform": {
    "^.+\\.ts?$": "ts-jest",
    "node_modules/lit/.+\\.(j|t)s?$": "babel-jest",
    "node_modules/lit-html/.+\\.(j|t)s?$": "babel-jest",
    "node_modules/@lit/.+\\.(j|t)s?$": "babel-jest",
    "node_modules/lit-element/.+\\.(j|t)s?$": "babel-jest",
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(lit|lit-html|@lit|lit-element)/)",
  ],
};
