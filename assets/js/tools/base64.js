(function () {
  var BASE64_ALGORITHM = "validohub.base64";
  var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=_-";

var Base64Plugin = (function (framework) {
  var util = framework.utilities;

  function bytesToBase64(bytes) {
    var binary = "";
    var chunkSize = 0x8000;
    for (var i = 0; i < bytes.length; i += chunkSize) {
      var chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk);
    }
    return window.btoa(binary);
  }

  function encodeBytes(bytes, options) {
    var result = bytesToBase64(bytes);
    if (options.urlSafe) {
      result = result.replace(/\+/g, "-").replace(/\//g, "_");
    }
    if (!options.padding) {
      result = result.replace(/=+$/g, "");
    }
    return result;
  }

  function normalizeBase64(value) {
    var compact = value.replace(/\s+/g, "");
    var normalized = compact.replace(/-/g, "+").replace(/_/g, "/");
    var remainder = normalized.length % 4;
    if (remainder === 1) {
      throw new Error("Invalid length. Base64 length cannot leave a remainder of 1.");
    }
    if (remainder > 0) {
      normalized += "=".repeat(4 - remainder);
    }
    return {
      compact: compact,
      normalized: normalized
    };
  }

  function base64ToBytes(value) {
    var normalized = normalizeBase64(value);
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized.normalized) || /=[^=]/.test(normalized.normalized)) {
      throw new Error("Unexpected padding or invalid Base64 alphabet.");
    }
    var binary = window.atob(normalized.normalized);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return {
      bytes: bytes,
      compact: normalized.compact,
      normalized: normalized.normalized
    };
  }

  function analyzeBase64(value) {
    var raw = value || "";
    var compact = raw.replace(/\s+/g, "");
    var details = [];
    var warnings = [];
    var diagnostics = [];
    var ignoredWhitespace = raw.length - compact.length;

    if (!compact) {
      return invalid("Enter Base64 text.", details, diagnostics, warnings);
    }

    var invalidCharacter = firstInvalidCharacter(raw);
    if (invalidCharacter) {
      diagnostics.push("Invalid character '" + invalidCharacter.character + "' at position " + invalidCharacter.position + ".");
      return invalid("Invalid character at position " + invalidCharacter.position + ".", details, diagnostics, warnings);
    }

    var hasUrlSafe = /[-_]/.test(compact);
    var hasStandardSpecials = /[+/]/.test(compact);
    if (hasUrlSafe && hasStandardSpecials) {
      warnings.push("Mixed alphabet warning: standard and URL-safe characters are both present.");
    }
    if (ignoredWhitespace > 0) {
      warnings.push("Whitespace note: " + ignoredWhitespace + " whitespace characters were ignored.");
    }

    var paddingIndex = compact.indexOf("=");
    var paddingCount = (compact.match(/=/g) || []).length;
    if (paddingIndex !== -1 && !/^=+$/.test(compact.slice(paddingIndex))) {
      diagnostics.push("Unexpected padding at position " + (paddingIndex + 1) + ".");
      return invalid("Unexpected padding. Padding must appear only at the end.", details, diagnostics, warnings);
    }
    if (paddingCount > 2) {
      diagnostics.push("Unexpected padding. Base64 can use at most two = characters.");
      return invalid("Unexpected padding. Too many padding characters.", details, diagnostics, warnings);
    }
    if (paddingCount > 0 && compact.length % 4 !== 0) {
      diagnostics.push("Invalid length. Padded Base64 length must be a multiple of 4.");
      return invalid("Invalid length for padded Base64.", details, diagnostics, warnings);
    }
    if (compact.length % 4 === 1) {
      diagnostics.push("Invalid length. Unpadded Base64 cannot have length modulo 4 equal to 1.");
      return invalid("Invalid length for Base64.", details, diagnostics, warnings);
    }

    var decoded;
    try {
      decoded = base64ToBytes(compact);
    } catch (error) {
      diagnostics.push(error.message);
      return invalid(error.message, details, diagnostics, warnings);
    }

    var text = "";
    var textStatus = "Binary or non-UTF-8";
    try {
      text = util.utf8Text(decoded.bytes);
      textStatus = "UTF-8 text";
    } catch (error) {
      warnings.push("Decoded bytes are valid Base64 but are not valid UTF-8 text.");
    }

    var canonical = bytesToBase64(decoded.bytes);
    var canonicalUrl = canonical.replace(/\+/g, "-").replace(/\//g, "_");
    var isCanonical = compact === canonical
        || compact === canonical.replace(/=+$/g, "")
        || compact === canonicalUrl
        || compact === canonicalUrl.replace(/=+$/g, "");
    var variant = hasUrlSafe ? "Base64URL" : "Standard Base64";
    var padding = paddingState(compact, decoded.bytes.length, true);

    details.push(["Input characters", String(Array.from(raw).length)]);
    details.push(["Input UTF-8 bytes", util.formatBytes(util.utf8Bytes(raw).length)]);
    details.push(["Output characters", textStatus === "UTF-8 text" ? String(Array.from(text).length) : "Binary output"]);
    details.push(["Decoded byte size", util.formatBytes(decoded.bytes.length)]);
    details.push(["Estimated decoded size", util.formatBytes(estimatedDecodedSize(compact))]);
    details.push(["Variant", variant]);
    details.push(["Padding", padding]);
    details.push(["Contains whitespace", ignoredWhitespace > 0 ? "Yes" : "No"]);
    details.push(["Canonical", isCanonical ? "Yes" : "No"]);
    details.push(["Decoded type", textStatus]);

    if (!isCanonical) {
      warnings.push("Input is valid but not canonical for its detected alphabet and padding style.");
    }

    return {
      valid: true,
      bytes: decoded.bytes,
      text: text,
      textStatus: textStatus,
      canonical: canonical,
      canonicalUrl: canonicalUrl,
      variant: variant,
      padding: padding,
      canonicalInput: isCanonical,
      hasWhitespace: ignoredWhitespace > 0,
      message: "Valid " + variant + ". Decoded size: " + util.formatBytes(decoded.bytes.length) + ".",
      details: details,
      diagnostics: diagnostics,
      warnings: warnings
    };
  }

  function invalid(message, details, diagnostics, warnings) {
    return {
      valid: false,
      message: message,
      details: details || [],
      diagnostics: diagnostics || [],
      warnings: warnings || []
    };
  }

  function firstInvalidCharacter(value) {
    for (var index = 0; index < value.length; index++) {
      var character = value.charAt(index);
      if (/\s/.test(character)) {
        continue;
      }
      if (BASE64_CHARS.indexOf(character) === -1) {
        return {
          character: character,
          position: index + 1
        };
      }
    }
    return null;
  }

  function paddingState(compact, decodedLength, valid) {
    if (!valid) {
      return "Invalid";
    }
    if (/=+$/.test(compact)) {
      return "Included";
    }
    if (decodedLength % 3 === 0) {
      return "Not required";
    }
    return "Omitted";
  }

  function estimatedDecodedSize(compact) {
    if (!compact) {
      return 0;
    }
    var padding = (compact.match(/=/g) || []).length;
    var normalizedLength = compact.length + ((4 - compact.length % 4) % 4);
    return Math.max(0, Math.floor(normalizedLength * 3 / 4) - padding);
  }

  function detectInputMode(value) {
    var compact = (value || "").replace(/\s+/g, "");
    if (!compact) {
      return { label: "Waiting for input", state: "" };
    }
    var invalidCharacter = firstInvalidCharacter(value);
    var hasBase64Signal = /[=+/_-]/.test(compact) || compact.length >= 8 || compact.length % 4 === 0;
    if (invalidCharacter) {
      return hasBase64Signal
          ? { label: "Invalid Base64", state: "invalid" }
          : { label: "Looks like text", state: "text" };
    }
    var analysis = analyzeBase64(value);
    if (!analysis.valid) {
      return hasBase64Signal
          ? { label: "Invalid Base64", state: "invalid" }
          : { label: "Looks like text", state: "text" };
    }
    if (/[-_]/.test(compact)) {
      return { label: "Looks like Base64URL", state: "base64url" };
    }
    if (hasBase64Signal) {
      return { label: "Looks like Base64", state: "base64" };
    }
    return { label: "Looks like text", state: "text" };
  }

  function run(workbench, action, options) {
    var values = workbench.values();
    var quiet = options && options.quiet;

    if (workbench.form.dataset.capability === "encode" && action === "encode") {
      if (workbench.file) {
        encodeFile(workbench, workbench.file, values);
        return;
      }
      if (!values.input || !values.input.trim()) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(quiet ? "" : "Enter text to encode.", quiet ? "" : "error");
        return;
      }
      var inputBytes = util.utf8Bytes(values.input);
      var output = encodeBytes(inputBytes, {
        urlSafe: Boolean(values.urlSafe),
        padding: values.padding !== false
      });
      workbench.setOutput(output);
      workbench.setMessage("Encoded live.", "success");
      workbench.setStats(encodeDetails(values.input, inputBytes, output, values), [], "success");
      workbench.setPreview("", "");
      workbench.setAdvanced(util.hexSection(inputBytes, "Input byte preview"));
      workbench.lastResult = {
        type: "encodedText",
        text: output,
        extension: "txt",
        mime: "text/plain;charset=utf-8"
      };
      return;
    }

    if (workbench.form.dataset.capability === "encode" && action === "decode") {
      decodeIntoWorkbench(workbench, values.input, quiet);
      return;
    }

    if (workbench.form.dataset.capability === "validate" && action === "validate") {
      validateIntoWorkbench(workbench, values.input, quiet);
    }
  }

  function handleFile(workbench, file) {
    var values = workbench.values();
    encodeFile(workbench, file, values);
  }

  function encodeFile(workbench, file, values) {
    var output = encodeBytes(file.bytes, {
      urlSafe: Boolean(values.urlSafe),
      padding: values.padding !== false
    });
    var details = [
      ["File name", file.name],
      ["File size", util.formatBytes(file.bytes.length)],
      ["MIME type", file.type || "Unknown"],
      ["Output characters", output.length + " characters"],
      ["Variant", values.urlSafe ? "Base64URL" : "Standard Base64"],
      ["Padding", values.padding !== false ? "Included" : "Omitted"],
      ["Expansion ratio", util.formatRatio(file.bytes.length, output.length)]
    ];
    workbench.setOutput(output);
    workbench.setMessage("Encoded file locally.", "success");
    workbench.setStats(details, ["File bytes were read locally in this browser only."], "success");
    workbench.setPreview("", "");
    workbench.setAdvanced(util.hexSection(file.bytes, "File byte preview"));
    workbench.lastResult = {
      type: "encodedFile",
      text: output,
      extension: "txt",
      mime: "text/plain;charset=utf-8",
      sourceName: file.name
    };
  }

  function encodeDetails(input, inputBytes, output, values) {
    return [
      ["Input characters", String(Array.from(input).length)],
      ["Input UTF-8 bytes", util.formatBytes(inputBytes.length)],
      ["Output characters", output.length + " characters"],
      ["Decoded byte size", util.formatBytes(inputBytes.length)],
      ["Estimated decoded size", util.formatBytes(inputBytes.length)],
      ["Variant", values.urlSafe ? "Base64URL" : "Standard Base64"],
      ["Padding", values.padding !== false ? "Included" : paddingState(output, inputBytes.length, true)],
      ["Expansion ratio", util.formatRatio(inputBytes.length, output.length)],
      ["Contains whitespace", /\s/.test(input) ? "Yes" : "No"],
      ["Canonical", "Yes"]
    ];
  }

  function decodeIntoWorkbench(workbench, input, quiet) {
    if (!input || !input.trim()) {
      workbench.setOutput("");
      workbench.clearPanels();
      workbench.setMessage(quiet ? "" : "Enter Base64 text to decode.", quiet ? "" : "error");
      return;
    }
    var decoded = analyzeBase64(input);
    if (!decoded.valid) {
      workbench.setOutput("");
      workbench.setMessage(decoded.message, "error");
      workbench.setStats(decoded.details, decoded.diagnostics.concat(decoded.warnings), "error");
      workbench.setPreview("", "");
      workbench.setAdvanced("");
      return;
    }
    var preview = previewForBytes(decoded.bytes, decoded.text, decoded.textStatus);
    if (decoded.textStatus === "UTF-8 text") {
      workbench.setOutput(preview.outputText);
    } else {
      workbench.setOutput("Decoded binary data. Use Download result to save " + util.formatBytes(decoded.bytes.length) + ".");
    }
    workbench.setMessage("Decoded live.", decoded.warnings.length > 0 ? "warning" : "success");
    workbench.setStats(decoded.details, decoded.warnings, decoded.warnings.length > 0 ? "warning" : "success");
    workbench.setPreview(preview.title, preview.html);
    workbench.setAdvanced(util.hexSection(decoded.bytes, "Decoded byte preview"));
    workbench.lastResult = {
      type: preview.kind === "text" || preview.kind === "json" || preview.kind === "svg" ? "decodedText" : "decodedBinary",
      text: preview.outputText,
      bytes: decoded.bytes,
      extension: preview.extension,
      mime: preview.mime
    };
  }

  function validateIntoWorkbench(workbench, input, quiet) {
    if (!input || !input.trim()) {
      workbench.setOutput("");
      workbench.clearPanels();
      workbench.setMessage(quiet ? "" : "Enter Base64 text to validate.", quiet ? "" : "error");
      return;
    }
    var validation = analyzeBase64(input);
    if (!validation.valid) {
      var invalidNotes = validation.diagnostics.concat(validation.warnings);
      workbench.setOutput("Invalid Base64\n" + validation.message + (invalidNotes.length ? "\n" + invalidNotes.join("\n") : ""));
      workbench.setMessage("Invalid Base64 input.", "error");
      workbench.setStats(validation.details, invalidNotes, "error");
      workbench.setPreview("", "");
      workbench.setAdvanced("");
      workbench.lastResult = {
        type: "validation",
        text: workbench.outputValue(),
        extension: "txt",
        mime: "text/plain;charset=utf-8"
      };
      return;
    }
    var report = validationReport(validation);
    workbench.setOutput(report);
    workbench.setMessage(validation.message, validation.warnings.length > 0 ? "warning" : "success");
    workbench.setStats(validation.details, validation.warnings, validation.warnings.length > 0 ? "warning" : "success");
    workbench.setPreview("", "");
    workbench.setAdvanced(util.hexSection(validation.bytes, "Decoded byte preview"));
    workbench.lastResult = {
      type: "validation",
      text: report,
      extension: "txt",
      mime: "text/plain;charset=utf-8"
    };
  }

  function validationReport(validation) {
    var lines = ["Valid Base64"];
    validation.details.forEach(function (detail) {
      lines.push(detail[0] + ": " + detail[1]);
    });
    if (validation.warnings.length > 0) {
      lines.push("");
      lines.push("Notes:");
      validation.warnings.forEach(function (warning) {
        lines.push("- " + warning);
      });
    }
    return lines.join("\n");
  }

  function previewForBytes(bytes, text, textStatus) {
    var media = detectMedia(bytes, text, textStatus);
    if (media.kind === "image") {
      return {
        kind: "image",
        title: media.label,
        html: "<img class=\"preview-image\" alt=\"" + util.escapeHtml(media.label) + "\" src=\"data:" + media.mime + ";base64," + bytesToBase64(bytes) + "\">",
        outputText: media.label + " detected. Use Download result to save " + util.formatBytes(bytes.length) + ".",
        extension: media.extension,
        mime: media.mime
      };
    }
    if (media.kind === "pdf") {
      return {
        kind: "pdf",
        title: "PDF document detected",
        html: "<p>PDF document detected. Size: " + util.escapeHtml(util.formatBytes(bytes.length)) + ".</p>",
        outputText: "PDF document detected. Use Download result to save " + util.formatBytes(bytes.length) + ".",
        extension: "pdf",
        mime: "application/pdf"
      };
    }
    if (media.kind === "json") {
      return {
        kind: "json",
        title: "Formatted JSON preview",
        html: "<pre><code>" + util.escapeHtml(media.formatted) + "</code></pre>",
        outputText: media.formatted,
        extension: "json",
        mime: "application/json;charset=utf-8"
      };
    }
    if (media.kind === "svg") {
      return {
        kind: "svg",
        title: "SVG image preview",
        html: "<img class=\"preview-image\" alt=\"SVG preview\" src=\"data:image/svg+xml;base64," + bytesToBase64(bytes) + "\">",
        outputText: text,
        extension: "svg",
        mime: "image/svg+xml;charset=utf-8"
      };
    }
    if (textStatus === "UTF-8 text") {
      return {
        kind: "text",
        title: "Text preview",
        html: "<pre><code>" + util.escapeHtml(text.slice(0, 4000)) + "</code></pre>",
        outputText: text,
        extension: "txt",
        mime: "text/plain;charset=utf-8"
      };
    }
    return {
      kind: "binary",
      title: "Binary preview",
      html: "<pre class=\"hex-preview\">" + util.escapeHtml(util.hexPreview(bytes)) + "</pre>",
      outputText: "Decoded binary data. Use Download result to save " + util.formatBytes(bytes.length) + ".",
      extension: media.extension || "bin",
      mime: media.mime || "application/octet-stream"
    };
  }

  function detectMedia(bytes, text, textStatus) {
    if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47])) {
      return { kind: "image", label: "PNG image preview", extension: "png", mime: "image/png" };
    }
    if (startsWith(bytes, [0xff, 0xd8, 0xff])) {
      return { kind: "image", label: "JPEG image preview", extension: "jpg", mime: "image/jpeg" };
    }
    if (startsWithAscii(bytes, "GIF87a") || startsWithAscii(bytes, "GIF89a")) {
      return { kind: "image", label: "GIF image preview", extension: "gif", mime: "image/gif" };
    }
    if (startsWithAscii(bytes, "RIFF") && asciiAt(bytes, 8, 4) === "WEBP") {
      return { kind: "image", label: "WebP image preview", extension: "webp", mime: "image/webp" };
    }
    if (startsWithAscii(bytes, "%PDF")) {
      return { kind: "pdf", extension: "pdf", mime: "application/pdf" };
    }
    if (textStatus === "UTF-8 text") {
      var trimmed = text.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          return { kind: "json", formatted: JSON.stringify(JSON.parse(trimmed), null, 2), extension: "json", mime: "application/json;charset=utf-8" };
        } catch (error) {
          // Keep falling through to text preview.
        }
      }
      if (/^(<\?xml[\s\S]*?)?<svg[\s>]/i.test(trimmed)) {
        return { kind: "svg", extension: "svg", mime: "image/svg+xml;charset=utf-8" };
      }
    }
    return { kind: "binary", extension: "bin", mime: "application/octet-stream" };
  }

  function startsWith(bytes, prefix) {
    if (bytes.length < prefix.length) {
      return false;
    }
    return prefix.every(function (value, index) {
      return bytes[index] === value;
    });
  }

  function startsWithAscii(bytes, value) {
    return asciiAt(bytes, 0, value.length) === value;
  }

  function asciiAt(bytes, start, length) {
    var result = "";
    for (var index = 0; index < length && start + index < bytes.length; index++) {
      result += String.fromCharCode(bytes[start + index]);
    }
    return result;
  }

  function applySample(workbench, sampleId) {
    var input = workbench.primaryInput();
    if (!input) {
      return;
    }
    workbench.file = null;
    workbench.updateFileStatus(null);
    if (sampleId === "encode-hello") {
      input.value = "Hello, world!";
      workbench.markActiveAction("encode");
      workbench.run("encode");
      return;
    }
    if (sampleId === "encode-unicode") {
      input.value = "Hello, こんにちは, 👋";
      workbench.markActiveAction("encode");
      workbench.run("encode");
      return;
    }
    if (sampleId === "decode") {
      input.value = "SGVsbG8sIHdvcmxkIQ==";
      workbench.markActiveAction("decode");
      workbench.run("decode");
      return;
    }
    if (sampleId === "validate") {
      var validateForm = document.querySelector(".tool-workbench[data-algorithm-id=\"validohub.base64\"][data-capability=\"validate\"]");
      if (validateForm && validateForm._workbench) {
        var validateInput = validateForm._workbench.primaryInput();
        if (validateInput) {
          validateInput.value = "eyJzdGF0dXMiOiJvayIsImNvdW50IjoyfQ==";
          validateForm._workbench.markActiveAction("validate");
          validateForm._workbench.updateBadge();
          validateForm._workbench.run("validate");
          if (validateForm.scrollIntoView) {
            validateForm.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    }
  }

  function onMount(workbench) {
    workbench.form._workbench = workbench;
    if (workbench.form.dataset.capability === "encode") {
      insertSamples(workbench);
      insertFileDropzone(workbench);
    }
  }

  function insertSamples(workbench) {
    if (workbench.form.querySelector("[data-sample]")) {
      return;
    }
    var row = document.createElement("div");
    row.className = "sample-row";
    row.setAttribute("aria-label", "Examples");
    [
      ["encode-hello", "Encode Hello"],
      ["encode-unicode", "Encode Unicode"],
      ["decode", "Decode sample"],
      ["validate", "Validate sample"]
    ].forEach(function (sample) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "sample-chip";
      button.dataset.sample = sample[0];
      button.textContent = sample[1];
      row.appendChild(button);
    });
    insertBeforeFields(workbench.form, row);
  }

  function insertFileDropzone(workbench) {
    if (workbench.form.querySelector("[data-file-dropzone]")) {
      return;
    }
    var zone = document.createElement("div");
    zone.className = "file-dropzone";
    zone.dataset.fileDropzone = "";
    zone.innerHTML = "<input type=\"file\" data-file-input aria-label=\"Choose file to encode\"><div><strong>Drop a file to encode</strong><span data-file-status>No upload. File bytes stay in this browser.</span></div>";
    insertBeforeFields(workbench.form, zone);
  }

  function insertBeforeFields(form, element) {
    var fieldGrid = form.querySelector(".field-grid");
    if (fieldGrid && fieldGrid.parentNode) {
      fieldGrid.parentNode.insertBefore(element, fieldGrid);
    }
  }

  return {
    filePrefix: "validohub-base64",
    onMount: onMount,
    run: run,
    handleFile: handleFile,
    applySample: applySample,
    detectInputMode: detectInputMode
  };
})(window.ValidoWorkbench);


  window.ValidoWorkbench.registerPlugin(BASE64_ALGORITHM, Base64Plugin);
})();
