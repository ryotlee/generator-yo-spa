var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware')
var webpack = require('webpack')
var webpackHotMiddleware = require('webpack-hot-middleware')
var devConfig = require('../build/webpack.dev.js')
var webpackMiddleware = require("webpack-dev-middleware")
///
var compiler = webpack(devConfig);

var app = express()
// 设置静态资源访问目录
app.use(express.static('./dist'));
// 设置代理
var app = express()
app.use('/api', proxy({
  target: 'http://localhost:8088',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  }
}));

app.use(webpackMiddleware(compiler))
app.use(webpackHotMiddleware(compiler, {
  log: console.log
}))

var port = 5001;
app.listen(port, function() {
  console.log("Listening on port : http://localhost:" + port)
})
