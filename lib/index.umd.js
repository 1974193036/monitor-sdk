function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.monitorSDK = factory());
})(this, function () {
  'use strict';

  var config = {
    // 项目名称
    appId: 'monitor-sdk-demo',
    userId: 'tony',
    // 上报地址
    reportUrl: 'http://localhost:3001/report/actions2',
    // 是否全埋点
    trackerAll: false,
    vue: {
      Vue: null,
      router: null
    },
    ua: navigator.userAgent
  };
  function setConfig(options) {
    for (var key in config) {
      if (options[key]) {
        config[key] = options[key];
      }
    }
  }
  function getConfig() {
    return config;
  }
  function error() {
    var _config$vue;
    var config = getConfig();

    // 资源错误没有冒泡，所以只能在捕获阶段采集获取错误
    window.addEventListener('error', function (event) {
      // console.log('error', event)
      var target = event.target;
      // 要判断是资源错误，还是js错误，很简单，直接判断事件对象有没有src或者href属性就可以了
      if (target && (target.src || target.href)) {
        console.log('资源错误');
        // 上报资源错误 todo...
      } else {
        console.log('js错误');
        // 上报js错误 todo...
      }
    }, true);

    // promise错误
    window.addEventListener('unhandledrejection', function (event) {
      console.log('promise错误');
      console.log(event);
      // 上报promise错误 todo...
    });

    // vue错误
    if ((_config$vue = config.vue) !== null && _config$vue !== void 0 && _config$vue.Vue) {
      var Vue = config.vue.Vue;
      Vue.config.errorHandler = function (err, vm, info) {
        console.log('vue错误', err, vm, info);
        // 上报vue错误 todo...
      };
    }
  }
  var monitor = {
    init: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      console.log('init', options);
      setConfig(options);
      error();
    }
  };
  return monitor;
});
