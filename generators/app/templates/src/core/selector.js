// 实现jquery的选择器
exports.q = function(selector) {
  if ('string' == typeof selector) {
    var selectorType = 'querySelectorAll';
    if (selector.indexOf('#') === 0) {
      selectorType = 'getElementById';
      selector = selector.substr(1, selector.length);
    }
    return document[selectorType](selector);
  } else {
    return selector
  }
}
