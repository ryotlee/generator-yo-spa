require('../scss/_alert.scss')
var _$ = require('../core/core.js')

function show(message, title) {
  var t = title || '温馨提示'
  var alertHtmlString = `<div class="alert">
                           <div class="alert-container">
                             <div class="alert-content">
                                <p class="alert-title">${t}</p>
                                <p class="alert-message">${message}</p>
                              </div>
                              <div class="alert-footer">
                                <button class="alert-btn alert-btn-ok">我知道了</button>
                              </div>
                          </div>
                        </div>`
  _$.append(document.body, alertHtmlString)
  _$.on('.alert-btn', 'click', function(event) {
    _$.remove('.alert')
  })
}

module.exports = {
  show: show
}
