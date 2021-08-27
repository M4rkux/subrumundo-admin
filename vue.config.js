module.exports = {
  devServer: {
    host: "localhost",
  },
  configureWebpack: (config) => {
    config.output.filename = "js/[name].[contenthash:8].min.js";
    config.output.chunkFilename = "js/[name].[contenthash:8].min.js";
  },
};
