const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require("webpack-node-externals");
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require("serverless-webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: slsw.lib.entries,
  target: "node",
  devtool: "source-map",
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: "ts-loader",
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
  plugins: [
    new CopyWebpackPlugin({ patterns: ["./prisma/schema.prisma"] }),
  ].filter((a) => a),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@domains": path.resolve(__dirname, "src/domains"),
    },
    extensions: [".ts", ".js"],
  },
};
