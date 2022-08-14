const path = require("path");

module.exports = {
  entry: "./src/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    publicPath: "/", // instead of publicPath: '/build/'
    filename: "bundle.js",
    path: path.resolve(__dirname, "/dist")
  }
};
