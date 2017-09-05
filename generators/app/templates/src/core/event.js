exports.on = function(element, type, handler, useCapture) {
  var cap = false
  if (useCapture && useCapture.toString() == 'true') {
    cap = true;
  }
  if (element.addEventListener) {
    //事件类型、需要执行的函数、是否捕捉
    element.addEventListener(type, handler, cap);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, function() {
      handler.call(element);
    });
  } else {
    element['on' + type] = handler;
  }
}
