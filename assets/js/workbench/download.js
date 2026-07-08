(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  helpers.downloadResult = function (baseName, result, fallbackText) {
    var extension = result && result.extension ? result.extension : "txt";
    var mime = result && result.mime ? result.mime : "text/plain;charset=utf-8";
    var content = result && result.bytes && result.type === "decodedBinary" ? result.bytes : (result && result.text ? result.text : fallbackText);
    var blob = new Blob([content], { type: mime });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = baseName + "." + extension;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  };
})();
