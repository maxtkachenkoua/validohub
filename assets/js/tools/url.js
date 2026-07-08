(function () {
  var URL_ENCODER_ALGORITHM = "validohub.url-encoder";
  var URL_DECODER_ALGORITHM = "validohub.url-decoder";

var UrlPlugin = (function (framework) {
  var util = framework.utilities;
  var RESERVED = ":/?#[]@!$&'()*+,;=";
  var UNRESERVED = /^[A-Za-z0-9._~-]$/;

  function run(workbench, action, options) {
    var values = workbench.values();
    var input = values.input || "";
    var quiet = options && options.quiet;
    if (!input.trim()) {
      workbench.setOutput("");
      workbench.clearPanels();
      workbench.setMessage(quiet ? "" : "Enter text or URL-encoded input.", quiet ? "" : "error");
      return;
    }
    if (action === "encode") {
      encode(workbench, input);
      return;
    }
    if (action === "decode") {
      decode(workbench, input);
      return;
    }
    if (action === "validate") {
      validate(workbench, input);
    }
  }

  function encode(workbench, input) {
    var output = encodeURIComponent(input);
    var analysis = analyzeUrlEncoding(input, output, "encode");
    workbench.setOutput(output);
    workbench.setMessage("Encoded live.", analysis.warnings.length > 0 ? "warning" : "success");
    workbench.setStats(analysis.details, analysis.warnings, analysis.warnings.length > 0 ? "warning" : "success");
    workbench.setPreview("Space handling", spacePreview(input, output));
    workbench.setAdvanced(advancedReport(analysis));
    workbench.lastResult = textResult(output);
  }

  function decode(workbench, input) {
    var validation = validatePercentEncoding(input);
    if (!validation.valid) {
      showInvalid(workbench, input, validation);
      return;
    }
    try {
      var output = decodeURIComponent(input);
      var analysis = analyzeUrlEncoding(input, output, "decode");
      workbench.setOutput(output);
      workbench.setMessage("Decoded live.", analysis.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(analysis.details, analysis.warnings, analysis.warnings.length > 0 ? "warning" : "success");
      workbench.setPreview("Decoded preview", "<pre><code>" + util.escapeHtml(output.slice(0, 4000)) + "</code></pre>");
      workbench.setAdvanced(advancedReport(analysis));
      workbench.lastResult = textResult(output);
    } catch (error) {
      showInvalid(workbench, input, {
        valid: false,
        diagnostics: ["Malformed UTF-8 percent-encoded byte sequence."],
        invalidSequences: collectInvalidSequences(input)
      });
    }
  }

  function validate(workbench, input) {
    var validation = validatePercentEncoding(input);
    if (!validation.valid) {
      showInvalid(workbench, input, validation);
      workbench.lastResult = textResult(workbench.outputValue());
      return;
    }
    var decoded = "";
    var warnings = [];
    try {
      decoded = decodeURIComponent(input);
    } catch (error) {
      warnings.push("Percent escapes are shaped correctly, but decoded bytes are not valid UTF-8.");
    }
    var analysis = analyzeUrlEncoding(input, decoded || input, "validate");
    var notes = analysis.warnings.concat(warnings);
    var report = validationReport(analysis, notes);
    workbench.setOutput(report);
    workbench.setMessage("Valid URL encoding.", notes.length > 0 ? "warning" : "success");
    workbench.setStats(analysis.details, notes, notes.length > 0 ? "warning" : "success");
    workbench.setPreview("", "");
    workbench.setAdvanced(advancedReport(analysis));
    workbench.lastResult = textResult(report);
  }

  function showInvalid(workbench, input, validation) {
    var details = baseDetails(input, "", "validate");
    var diagnostics = validation.diagnostics || ["Malformed URL encoding."];
    workbench.setOutput("Invalid URL encoding\n" + diagnostics.join("\n"));
    workbench.setMessage("Invalid URL encoding.", "error");
    workbench.setStats(details, diagnostics, "error");
    workbench.setPreview("Invalid sequence highlight", highlightInvalidSequences(input, validation.invalidSequences || []));
    workbench.setAdvanced("<div class=\"preview-title\">Diagnostics</div><ul class=\"feedback-notes\">" + diagnostics.map(function (diagnostic) {
      return "<li>" + util.escapeHtml(diagnostic) + "</li>";
    }).join("") + "</ul>");
    workbench.lastResult = textResult(workbench.outputValue());
  }

  function validatePercentEncoding(input) {
    var diagnostics = [];
    var invalidSequences = collectInvalidSequences(input);
    invalidSequences.forEach(function (item) {
      diagnostics.push("Invalid percent sequence '" + item.sequence + "' at position " + item.position + ".");
    });
    return {
      valid: diagnostics.length === 0,
      diagnostics: diagnostics,
      invalidSequences: invalidSequences
    };
  }

  function collectInvalidSequences(input) {
    var invalid = [];
    for (var index = 0; index < input.length; index++) {
      if (input.charAt(index) !== "%") {
        continue;
      }
      var sequence = invalidPercentSequence(input, index);
      if (index + 2 >= input.length || !/^[0-9A-Fa-f]{2}$/.test(input.slice(index + 1, index + 3))) {
        invalid.push({
          position: index + 1,
          sequence: sequence
        });
      }
    }
    return invalid;
  }

  function invalidPercentSequence(input, index) {
    if (index + 2 >= input.length) {
      return input.slice(index);
    }
    var first = input.charAt(index + 1);
    var second = input.charAt(index + 2);
    if (/^[0-9A-Fa-f]$/.test(first) && !/^[0-9A-Fa-f]$/.test(second)) {
      return input.slice(index, index + 2);
    }
    return input.slice(index, index + 3);
  }

  function analyzeUrlEncoding(input, output, mode) {
    var encodedSide = mode === "encode" ? output : input;
    var decodedSide = mode === "encode" ? input : output;
    var details = baseDetails(input, output, mode);
    var warnings = [];
    var validation = validatePercentEncoding(input);
    if (!validation.valid) {
      warnings = warnings.concat(validation.diagnostics);
    }
    if (/%[0-9A-Fa-f]{2}/.test(input) && mode === "encode") {
      warnings.push("Input already contains percent-encoded sequences. Encoding again will escape the percent signs.");
    }
    if (/\+/.test(input) && mode !== "encode") {
      warnings.push("Plus signs are preserved. This decoder does not treat + as a space.");
    }
    if (/\s/.test(decodedSide)) {
      warnings.push("Space handling: spaces are encoded as %20.");
    }
    details.push(["Character count", String(Array.from(input).length)]);
    details.push(["Encoded length", encodedSide.length + " characters"]);
    details.push(["Decoded length", decodedSide ? Array.from(decodedSide).length + " characters" : "n/a"]);
    details.push(["Percent-encoded byte count", String(percentByteCount(encodedSide))]);
    details.push(["Reserved character count", String(countReserved(decodedSide || input))]);
    details.push(["Unsafe character count", String(countUnsafe(decodedSide || input))]);
    details.push(["Contains spaces", /\s/.test(decodedSide || input) ? "Yes" : "No"]);
    details.push(["Already encoded", /%[0-9A-Fa-f]{2}/.test(input) ? "Yes" : "No"]);
    return {
      details: details,
      warnings: warnings,
      encodedSide: encodedSide,
      decodedSide: decodedSide
    };
  }

  function baseDetails(input, output, mode) {
    return [
      ["Mode", mode],
      ["Input UTF-8 bytes", util.formatBytes(util.utf8Bytes(input).length)],
      ["Output UTF-8 bytes", output ? util.formatBytes(util.utf8Bytes(output).length) : "n/a"]
    ];
  }

  function percentByteCount(value) {
    return (value.match(/%[0-9A-Fa-f]{2}/g) || []).length;
  }

  function countReserved(value) {
    return Array.from(value || "").filter(function (character) {
      return RESERVED.indexOf(character) !== -1;
    }).length;
  }

  function countUnsafe(value) {
    return Array.from(value || "").filter(function (character) {
      return !UNRESERVED.test(character);
    }).length;
  }

  function spacePreview(input, output) {
    var count = (input.match(/\s/g) || []).length;
    if (count === 0) {
      return "<p>No spaces detected. Existing characters were percent-encoded where needed.</p>";
    }
    return "<p>" + count + " space character" + (count === 1 ? "" : "s") + " encoded as <code>%20</code>.</p>"
        + "<pre><code>" + util.escapeHtml(output) + "</code></pre>";
  }

  function highlightInvalidSequences(input, invalidSequences) {
    if (invalidSequences.length === 0) {
      return "<pre><code>" + util.escapeHtml(input) + "</code></pre>";
    }
    var invalidByPosition = {};
    invalidSequences.forEach(function (item) {
      invalidByPosition[item.position - 1] = item.sequence.length;
    });
    var html = "";
    for (var index = 0; index < input.length;) {
      if (invalidByPosition[index]) {
        var sequence = input.slice(index, index + invalidByPosition[index]);
        html += "<mark class=\"invalid-sequence\">" + util.escapeHtml(sequence) + "</mark>";
        index += invalidByPosition[index];
      } else {
        html += util.escapeHtml(input.charAt(index));
        index++;
      }
    }
    return "<pre><code>" + html + "</code></pre>";
  }

  function advancedReport(analysis) {
    return "<div class=\"preview-title\">URL encoding analysis</div><dl class=\"feedback-grid\">"
        + analysis.details.map(function (row) {
          return "<div><dt>" + util.escapeHtml(row[0]) + "</dt><dd>" + util.escapeHtml(row[1]) + "</dd></div>";
        }).join("")
        + "</dl>";
  }

  function validationReport(analysis, notes) {
    var lines = ["Valid URL encoding"];
    analysis.details.forEach(function (detail) {
      lines.push(detail[0] + ": " + detail[1]);
    });
    if (notes.length > 0) {
      lines.push("");
      lines.push("Notes:");
      notes.forEach(function (note) {
        lines.push("- " + note);
      });
    }
    return lines.join("\n");
  }

  function detectInputMode(value) {
    if (!value || !value.trim()) {
      return { label: "Waiting for input", state: "" };
    }
    var validation = validatePercentEncoding(value);
    if (!validation.valid) {
      return { label: "Malformed URL encoding", state: "invalid" };
    }
    if (/%[0-9A-Fa-f]{2}/.test(value)) {
      return { label: "Already encoded", state: "base64" };
    }
    return { label: "Plain text", state: "text" };
  }

  function applySample(workbench, sampleId) {
    var input = workbench.primaryInput();
    if (!input) {
      return;
    }
    if (sampleId === "url-hello") {
      input.value = "Hello World!";
      workbench.markActiveAction("encode");
      workbench.run("encode");
      return;
    }
    if (sampleId === "url-unicode") {
      input.value = "Café こんにちは 👋";
      workbench.markActiveAction("encode");
      workbench.run("encode");
      return;
    }
    if (sampleId === "url-encoded") {
      input.value = "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%2520world";
      workbench.markActiveAction("decode");
      workbench.run("decode");
      return;
    }
    if (sampleId === "url-malformed") {
      input.value = "hello%2 world%ZZ";
      workbench.markActiveAction("validate");
      workbench.run("validate");
    }
  }

  function onMount(workbench) {
    workbench.form._workbench = workbench;
    insertSamples(workbench);
  }

  function insertSamples(workbench) {
    if (workbench.form.querySelector("[data-sample]")) {
      return;
    }
    var row = document.createElement("div");
    row.className = "sample-row";
    row.setAttribute("aria-label", "Examples");
    [
      ["url-hello", "Hello World"],
      ["url-unicode", "Unicode"],
      ["url-encoded", "Already encoded URL"],
      ["url-malformed", "Malformed URL encoding"]
    ].forEach(function (sample) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "sample-chip";
      button.dataset.sample = sample[0];
      button.textContent = sample[1];
      row.appendChild(button);
    });
    var fieldGrid = workbench.form.querySelector(".field-grid");
    if (fieldGrid && fieldGrid.parentNode) {
      fieldGrid.parentNode.insertBefore(row, fieldGrid);
    }
  }

  function textResult(value) {
    return {
      type: "text",
      text: value,
      extension: "txt",
      mime: "text/plain;charset=utf-8"
    };
  }

  return {
    filePrefix: "validohub-url",
    onMount: onMount,
    run: run,
    applySample: applySample,
    detectInputMode: detectInputMode
  };
})(window.ValidoWorkbench);


  window.ValidoWorkbench.registerPlugin(URL_ENCODER_ALGORITHM, UrlPlugin);
  window.ValidoWorkbench.registerPlugin(URL_DECODER_ALGORITHM, UrlPlugin);
})();
