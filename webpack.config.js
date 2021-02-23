const { resolve } = require("path");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/index.js",
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  mode: "development",
  context: __dirname,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, "./client"),
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
