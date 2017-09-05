/**
 ** 生成请求字符串
 **/
exports.makeUrlParams = function(data) {
  var result = ''
  for (var key in data) {
    result += key + '=' + encodeURI(data[key]) + '&'
  }
  result = result.substring(0, result.length - 1)
  return result;
}
// 字符串转化为html
exports.parseHTML = function(str) {
  var el = document.createElement('div');
  el.innerHTML = str;
  return el.children;
}

// 转化为json
exports.parseJSON = function(str) {
  return JSON.parse(str)
}

// 获取url上的参数
exports.getQueryParams = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null && r != 'null')
    return decodeURI(r[2]);
  return "";
}

exports.trim = function(string) {
  return string.replace(/^\s+|\s+$/g, '');
}

exports.isArray = function(obj) {
  if ('function' === typeof Array.isArray) {
    return Array.isArray(obj)
  } else {
    return Object.prototype.toString.call(o) == '[object Array]'
  }
}

/**
 ** 获取url上参数，转化为对象
 **/
exports.getUrlParams = function(url) {
  var vars = {};
  url.replace(/[?&]+([^=&]+)={0,1}([^&]*)/gi,
    function(m, key, value) {
      if (typeof value == 'string') { // 如果是字符串
        if (value.toString() == 'null') {
          value = null
        }
      } else if (typeof value == 'undefined') {
        value = null
      }
      vars[key] = decodeURI(value);
    });
  return vars;
}

/**
 ** 是否在微信中
 **/
exports.isWeiXin = function() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

/**
 ** 是否在掌门app中
 **/
exports.isZmApp = function() {
  var ua = navigator.userAgent.toLowerCase();
  if (window.m_app_is_mobile) {
    return window.m_app_is_mobile()
  } else {
    return ua.indexOf('zhangmen') > -1
  }
}

/**
 ** 加载js文件
 ** @param scriptId js文件的id
 ** @param url js文件路径
 ** @param cb 回掉函数
 **/
exports.loadJs = function(scriptId, url, cb) {
  var nodeHead = document.getElementsByTagName('head')[0];
  var nodeScript = null;
  if (document.getElementById(scriptId) == null) {
    nodeScript = document.createElement('script');
    nodeScript.setAttribute('type', 'text/javascript');
    nodeScript.setAttribute('src', url);
    nodeScript.setAttribute('id', scriptId);
    if (cb != null) {
      nodeScript.onload = nodeScript.onreadystatechange = function() {
        if (nodeScript.ready) {
          return false;
        }
        if (!nodeScript.readyState || nodeScript.readyState == "loaded" || nodeScript.readyState == 'complete') {
          nodeScript.ready = true;
          cb();
        }
      };
    }
    nodeHead.appendChild(nodeScript);
  } else {
    if (cb != null) {
      cb();
    }
  }
}

/**
 ** 获取字符串的长度(中文占两个字符长度)
 ** @param str
 **/
exports.getLen = function(str) {
  return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
}
