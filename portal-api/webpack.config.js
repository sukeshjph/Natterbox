const path = require("path")
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require("webpack-node-externals")
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require("serverless-webpack")

module.exports = {
  mode: process.env.NODE_ENV,
  entry: slsw.lib.entries,
  target: "node",
  devtool: "source-map",
  externals: [nodeExternals()],
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  module: {
    rules: [
      {
        test:  /\.(js|ts)$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@domains": path.resolve(__dirname, "src/domains"),
      "@plugins": path.resolve(__dirname, "src/plugins"),
      "@dataSources": path.resolve(__dirname, "src/dataSources"),
    },
    extensions: [".ts", ".js"],
  },
}
