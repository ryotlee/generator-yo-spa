var Ajax = require('./ajax.js')
var Util = require('./util.js')
var Q = require('./selector.js')
var Event = require('./event.js')
var DOM = require('./dom.js')

var _$ = {
  getJSON: Ajax.getJSON,
  ajax: Ajax.ajax,
  getQueryStringS: Util.getQueryParams,
  getUrlParams: Util.getUrlParams,
  $: Q.q, // 实现jquery选择器
  append: DOM.append,
  remove: DOM.remove,
  show: function(el) { // 显示
    DOM.changeElementDisplay(el, '')
  },
  hide: function(el) { // 隐藏
    DOM.changeElementDisplay(el, 'none')
  },
  on: function(el, type, handler, useCapture) {
    var dl = this.$(el);
    if (dl && dl.length && dl.length > 0) {
      for (var i = 0; i < dl.length; i++) {
        var element = dl[i]
        Event.on(element, type, handler, useCapture)
      }
    } else {
      Event.on(dl, type, handler, useCapture)
    }
  },
  addClass: DOM.addClass,
  hasClass: DOM.hasClass,
  removeClass: DOM.removeClass,
  parseHTML: Util.parseHTML,
  parseJSON: Util.parseJSON,
  makeUrlParams: Util.makeUrlParams,
  trim: Util.trim,
  cookie: function(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURIComponent(arr[2]);
    else
      return "";
  },
  isWeiXin: function() { // 是否是微信
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger'
  },
  isZmApp: function() { // 是否是掌门app
    return (navigator.userAgent.toLowerCase().indexOf("zhangmen") > -1);
  },
  isArray: Util.isArray,
  loadJs: Util.loadJs,
  getLen: Util.getLen
}

module.exports = _$;
