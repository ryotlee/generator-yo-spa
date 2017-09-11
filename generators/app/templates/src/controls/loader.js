require('../css/_loaders.css')
var _$ = require('gy-zmquery')

var loaderID = 'zm_mask_loader'
var loaderView;

exports.show = function() {
  loaderView = document.getElementById(loaderID)
  if (loaderView) {
    _$.show(loaderView)
  } else {
    var htmlString = `<div id="${loaderID}" class="loader-wrapper">
                        <div class="loader">
                            <div class="loader-inner ball-pulse">
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                        </div>
                      </div>`;

    _$.append(document.body, htmlString)
  }
}

exports.hide = function() {
  loaderView = document.getElementById(loaderID)
  if (loaderView) {
    loaderView.style.display = 'none';
  }
}
