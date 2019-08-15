/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const config = {
  entry: "./build/<%= component_name %>.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "<%= component_name %>.js"
  }
};

module.exports = config;
