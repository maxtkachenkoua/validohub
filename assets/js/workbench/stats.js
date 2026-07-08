(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  helpers.formatBytes = function (count) {
    if (count === 1) {
      return "1 byte";
    }
    return count + " bytes";
  };

  helpers.formatRatio = function (inputBytes, outputChars) {
    if (!inputBytes) {
      return "n/a";
    }
    return (outputChars / inputBytes).toFixed(2) + "x";
  };
})();
