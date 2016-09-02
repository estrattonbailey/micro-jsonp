'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var count = 0;

/**
 * Options:
 *  - param {String} query parameter + callback name
 *  - timeout {Number} how long to wait for a response 
 *
 * @param {String} url
 * @param {Object} options
 */

exports.default = function (url) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var cb = '__c' + count++;
  var param = opts.param || 'callback';
  var query = param + '=' + cb;
  var timeout = opts.timeout || 60000;
  var response = opts.response ? opts.response : function (err, data) {
    return console.log(err, data);
  };
  var script = document.createElement('script');

  var cancel = function cancel() {
    return window[cb] ? cleanup() : null;
  };

  var timer = timeout ? setTimeout(function () {
    cleanup();
    response(new Error('Timeout'));
  }, timeout) : null;

  var cleanup = function cleanup() {
    document.head.removeChild(script);
    window[cb] = function () {};
    if (timer) clearTimeout(timer);
  };

  window[cb] = function (data) {
    response(null, data);
    cleanup();
  };

  script.src = url + '&' + query;
  document.head.appendChild(script);

  return cancel;
};