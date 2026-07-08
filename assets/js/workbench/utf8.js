(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};
  var textEncoder = new TextEncoder();
  var textDecoder = new TextDecoder("utf-8", { fatal: true });

  helpers.utf8Bytes = function (value) {
    return textEncoder.encode(value);
  };

  helpers.utf8Text = function (bytes) {
    return textDecoder.decode(bytes);
  };
})();
