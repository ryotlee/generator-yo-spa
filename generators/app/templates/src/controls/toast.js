require('../scss/_toast.scss')

var _$ = require('gy-zmquery')
var toastView;
var timeOutId = -1;
var DEFAULT_DURATION = 2300 // 默认3000毫秒

exports.toast = function(options) {
  var opts = {};
  if (options == null || options == undefined || options == '') {
    opts = {
      message: '提示',
      duration: DEFAULT_DURATION
    }
  }
  if ('string' == typeof options) {
    opts.message = options;
    opts.duration = DEFAULT_DURATION;
  } else {
    opts.message = options.message || '提示',
      opts.duration = isNaN(Number(options.duration)) ? DEFAULT_DURATION : Number(options.duration)
  }
  toastView = document.getElementById('toastView')
  if (!toastView) {
    var htmlString = `<div id="toastView" class="toast">
                        <section  class="toast-content" >
                          <h2 class="title warning">${opts.message}</h2>
                        </section>
                      </div>`;
    _$.append(document.body, htmlString)
  }
  // 先清除一下
  clearTimeout(timeOutId)
  timeOutId = setTimeout(function() {
    _$.remove('#toastView')
  }, opts.duration)
}
