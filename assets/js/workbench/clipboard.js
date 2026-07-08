(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  helpers.copyText = function (value, fallback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value).catch(function () {
        fallback();
      });
    }
    fallback();
    return Promise.resolve();
  };
})();
