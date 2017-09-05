var Q = require('./selector.js')
var Util = require('./util.js')

/**
 ** 执行处理
 ** @parameter el 当前选择对象(string|Object|HTMLList)
 **/
function exec(el, args, cb, context) {
  var c = context || null;
  var arr = []
  if ('string' === typeof el) {
    var dl = Q.q(el);
    var i, j;
    if (dl && dl.length && dl.length > 0) {
      for (var i = 0; i < dl.length; i++) {
        arr = [dl[i]].concat(args)
        cb.apply(c, arr)
      }
    } else {
      arr = [dl].concat(args)
      cb.apply(c, arr)
    }
  } else {
    if (el && el.length && el.length > 0) {
      for (var j = 0; j < el.length; j++) {
        arr = [el[j]].concat(args)
        cb.apply(c, arr)
      }
    } else {
      arr = [el].concat(args)
      cb.apply(c, arr)
    }
  }
}



exports.changeElementDisplay = function(el, displayName) {
  function changeVisible(e, n) {
    if (e && e.style) {
      e.style.display = n
    }
  }
  exec(el, [displayName], changeVisible)
}

exports.append = function(el, htmlString) {
  function appendElement(t, c) {
    if (!t) return;
    var e = document.createElement('div');
    e.innerHTML = c;
    while (e.firstChild) {
      t.appendChild(e.firstChild);
    }
  }
  exec(el, [htmlString], appendElement)
}

/**
 ** 删除元素
 **/
exports.remove = function(el) {
  function rmNode(t) {
    if (!t) {
      return
    }
    try {
      t.parentNode.removeChild(t)
    } catch (e) {
      console.error("删除节点错误------");
      console.error(e);
      console.error("删除节点错误---end-");
    } finally {

    }
  }
  exec(el, [], rmNode)
}

exports.hasClass = function(selector, name) {
  function isHas(el, n) {
    if (el.classList)
      return el.classList.contains(n);
    else
      return new RegExp('(^| )' + n + '( |$)', 'gi').test(el.className);
  }
  return exec(selector, [name], isHas);
}

/**
 ** 删除样式
 **/
exports.removeClass = function(selector, name) {
  function rm(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
  exec(selector, [name], rm)
}

exports.addClass = function(selector, name) {
  function addCls(e, name) {
    if (e && undefined != e.className && null != e.className) {
      var clsName = Util.trim(e.className)
      if (e.classList) {
        e.classList.add(name)
      } else {
        if ('' == clsName || clsName.length == 0) { // 如果没有任何名称
          e.className = name;
        } else {
          e.className += ' ' + name
        }
      }
    }
  }
  exec(selector, [name], addCls)
}
