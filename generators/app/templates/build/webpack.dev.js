var baseConfig = require('./webpack.base')
var merge = require('webpack-merge')
var webpack = require('webpack')

module.exports = merge(baseConfig, {
  devtool: "source-map", // enum
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    './src/scripts/index.js',
  ],
  devServer: {
    historyApiFallBack: true,
    compress: true, // enable gzip compression
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
