module.exports = {
  devServer: {
    host: "localhost",
  },
  configureWebpack: (config) => {
    if (process.env === "production" || process.env === "staging") {
      config.output.filename = "js/[name].[contenthash:8].min.js";
      config.output.chunkFilename = "js/[name].[contenthash:8].min.js";
    }
  },
};
