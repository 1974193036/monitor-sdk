var monitor = function () {
  'use strict';

  function fn() {
    console.log('fn');
    return [1, 2, 3, 4].map(function (item) {
      return item * 1;
    });
  }
  fn();
  var monitor = {
    init: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      console.log('init', options);
    }
  };
  return monitor;
}();
