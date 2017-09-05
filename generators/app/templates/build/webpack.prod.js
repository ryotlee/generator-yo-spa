var baseConfig = require('./webpack.base')
var merge = require('webpack-merge')
var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: './src/scripts/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new UglifyJSPlugin({
      output: {
        comments: false,
        beautify: false
      },
      compress: true
    }),
    new CleanWebpackPlugin(
      [
        'dist/'
      ], 　 //匹配删除的文件
      {
        root: path.resolve(__dirname, '../'),
        　　　　　　　　　　 //根目录
        verbose: true,
        　　　　　　　　　　 //开启在控制台输出信息
        dry: false　　　　　　　　　　 //启用删除文件
      }
    )
  ]
});
