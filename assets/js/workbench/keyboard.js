(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  helpers.debounce = function (callback, delay) {
    var timer = 0;
    return function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(callback, delay);
    };
  };
})();
