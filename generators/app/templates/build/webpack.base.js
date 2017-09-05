var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    filename: 'static/assets/js/[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', 'css']
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              url: false,
              root: '../'
            }
          }
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader",
              options: {
                url: false,
                root: '../'
              }
            },
            {
              loader: "sass-loader",
              options: {
                url: false,
                root: '../'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "SPA Document",
      template: 'index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'static/assets/css/[name].css',
      publicPath: './',
      allChunks: true
    })
  ]
}
