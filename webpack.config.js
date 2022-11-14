const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  entry: {
    index: "./src/index.js",
    signin: "./src/signin.js",
    signup: "./src/signup.js",
    dashboard: "./src/dashboard.js",
    projects: "./src/projects.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  watch: true,
};
