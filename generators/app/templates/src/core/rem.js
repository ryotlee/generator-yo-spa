exports.rem = function() {
  var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      //750是设计图的宽度,100是一个基准宽度(html的font-size值)
    };
  if (document.addEventListener) {
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
  } else if (document.attachEvent) { // 兼容ie6-8
    window.attachEvent(resizeEvt, recalc, false);
    document.attachEvent('DOMContentLoaded', recalc, false);
  }
}
