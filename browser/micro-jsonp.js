(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.microJsonp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});