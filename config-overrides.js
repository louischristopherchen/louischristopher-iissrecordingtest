const webpack = require("webpack");

module.exports = function override(config, env) {
  // Extend the config to work with videojs-record without ejecting create react app.
  // Reference: https://collab-project.github.io/videojs-record/#/react
  const videojsPlugin = new webpack.ProvidePlugin({
    videojs: "video.js/dist/video.cjs.js",
    RecordRTC: "recordrtc"
  });
  const videojsAlias = {
    videojs: "video.js",
    WaveSurfer: "wavesurfer.js",
    RecordRTC: "recordrtc"
  };
  console.log(config)
  config.resolve.alias = { ...config.resolve.alias, ...videojsAlias };
  config.plugins.push(videojsPlugin);
  config.output.publicPath='./'
  return config;
};