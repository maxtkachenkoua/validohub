(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  helpers.hexPreview = function (bytes) {
    var limit = Math.min(bytes.length, 64);
    var lines = [];
    for (var offset = 0; offset < limit; offset += 16) {
      var slice = bytes.subarray(offset, Math.min(offset + 16, limit));
      var hex = Array.from(slice).map(function (byte) {
        return byte.toString(16).padStart(2, "0");
      }).join(" ");
      var ascii = Array.from(slice).map(function (byte) {
        return byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : ".";
      }).join("");
      lines.push(offset.toString(16).padStart(4, "0") + "  " + hex.padEnd(47, " ") + "  " + ascii);
    }
    if (bytes.length > limit) {
      lines.push("... " + helpers.formatBytes(bytes.length - limit) + " more");
    }
    return lines.join("\n");
  };

  helpers.hexSection = function (bytes, title) {
    return "<div class=\"preview-title\">" + helpers.escapeHtml(title) + "</div><pre class=\"hex-preview\">" + helpers.escapeHtml(helpers.hexPreview(bytes)) + "</pre>";
  };
})();
