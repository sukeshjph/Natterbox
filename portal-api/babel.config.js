module.exports = {
  plugins: ["source-map-support", "@babel/plugin-proposal-class-properties"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "8.10",
        },
      },
      "@babel/preset-typescript",
    ],
  ],
}
