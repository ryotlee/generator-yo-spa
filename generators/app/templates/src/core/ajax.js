var Util = require('./util.js')

function exec(type, url, cb, err, data) {
  var responseData = {}
  var request = new XMLHttpRequest();
  request.open(type, url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var formatData;
      try {
        formatData = JSON.parse(request.responseText)
        responseData = {
          code: request.status,
          message: "request success",
          data: formatData,
          raw: request.responseText
        }
      } catch (e) {
        console.error(e);
        if (err) {
          err()
        }
      }
      if (cb && typeof cb === 'function') {
        cb(responseData)
      }
    } else {
      if (err && typeof err === 'function') {
        err()
      }
    }
  };
  request.onerror = function() {
    if (err && typeof err === 'function') {
      err()
    }
  }
  request.send(data);
}

exports.ajax = function(options) {
  var url = typeof options === 'string' ?
    options :
    options.url
  var type = options.type || 'GET'
  type = type.toUpperCase()
  var cb = options.success || function(data) {
    console.log('success :' + data)
  }
  var err = options.error || function() {
    console.log("call url error :" + url)
  }
  // url 参数
  var urlParams = ''
  if (options.params) {
    if (typeof options.params == 'string') { // 如果是字符串(a=1&b=2&c=m2)
      urlParams = options.params.indexOf('?') == '0' ? options.params : ('?' + options.params)
    } else {
      urlParams = '?' + Util.makeUrlParams(options.params)
    }
    if (urlParams && urlParams.length > 0 && '' !== urlParams) {
      url = url + urlParams
    }
  }
  var dataType = options.dataType || ''
  var data = 'undefined' == typeof options.data ? null : options.data
  dataType = dataType.toLowerCase()
  if ('json' === dataType) { // 如果是json类型
    data = JSON.stringify(data)
  } else {
    data = Util.makeUrlParams(data)
  }
  data = decodeURIComponent(data)
  var opts = {
    type: type,
    url: url,
    success: cb,
    error: err
  }
  exec(opts.type, opts.url, opts.success, opts.error, data)
}

exports.exec = exec
exports.getJSON = function(url, cb, err) {
  exec('GET', url, cb, err)
}
