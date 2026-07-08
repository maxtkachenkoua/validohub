(function () {
  var JSON_FORMATTER_ALGORITHM = "validohub.json-formatter";
  var JSON_VALIDATOR_ALGORITHM = "validohub.json-validator";

  var JsonPlugin = (function (framework) {
    var util = framework.utilities;

    function onMount(workbench) {
      workbench.form._workbench = workbench;
      workbench.form.classList.add("json-workbench");
      ensureActionButtons(workbench);
      insertSamples(workbench);
      insertFileDropzone(workbench);
      workbench.markActiveAction(workbench.form.dataset.capability === "validate" ? "validate" : "format");
    }

    function ensureActionButtons(workbench) {
      var row = workbench.form.querySelector(".button-row");
      if (!row) {
        return;
      }
      var existing = {};
      row.querySelectorAll("[data-action]").forEach(function (button) {
        existing[button.dataset.action] = button;
        button.classList.remove("button-primary");
        button.classList.add("button-secondary");
      });
      [
        ["format", "Pretty print"],
        ["minify", "Minify"],
        ["validate", "Validate"],
        ["explain", "Explain"]
      ].forEach(function (action) {
        if (!existing[action[0]]) {
          var button = document.createElement("button");
          button.type = "button";
          button.className = action[0] === "format" ? "button button-primary" : "button button-secondary";
          button.dataset.action = action[0];
          button.textContent = action[1];
          row.insertBefore(button, row.querySelector("[data-tool-copy]"));
        } else if (action[0] === "format") {
          existing[action[0]].textContent = "Pretty print";
        }
      });
    }

    function insertSamples(workbench) {
      if (workbench.form.querySelector("[data-sample]")) {
        return;
      }
      var row = document.createElement("div");
      row.className = "sample-row";
      row.setAttribute("aria-label", "Examples");
      [
        ["json-api", "API response"],
        ["json-config", "Config"],
        ["json-array", "Array"],
        ["json-invalid", "Invalid JSON"]
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
      zone.innerHTML = "<input type=\"file\" accept=\".json,application/json,text/json,text/plain\" data-file-input aria-label=\"Choose JSON file\"><div><strong>Drop a JSON file</strong><span data-file-status>Files stay in this browser.</span></div>";
      insertBeforeFields(workbench.form, zone);
    }

    function insertBeforeFields(form, element) {
      var fieldGrid = form.querySelector(".field-grid");
      if (fieldGrid && fieldGrid.parentNode) {
        fieldGrid.parentNode.insertBefore(element, fieldGrid);
      }
    }

    function run(workbench, action, options) {
      var input = jsonInput(workbench);
      var quiet = options && options.quiet;
      if (!input.trim()) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(quiet ? "" : "Paste JSON or drop a .json file.", quiet ? "" : "error");
        workbench.lastResult = null;
        return;
      }
      if (action === "format") {
        prettyPrint(workbench, input);
        return;
      }
      if (action === "minify") {
        minify(workbench, input);
        return;
      }
      if (action === "validate") {
        validate(workbench, input);
        return;
      }
      if (action === "explain") {
        explain(workbench, input);
      }
    }

    function prettyPrint(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var output = JSON.stringify(parsed.value, null, 2);
      showSuccess(workbench, input, output, parsed, "Pretty printed JSON.", "format");
    }

    function minify(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var output = JSON.stringify(parsed.value);
      showSuccess(workbench, input, output, parsed, "Minified JSON.", "minify");
    }

    function validate(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var stats = analyzeJson(input, JSON.stringify(parsed.value, null, 2), parsed.value);
      var report = validationReport(stats);
      workbench.setOutput(report);
      workbench.setMessage("Valid JSON.", "success");
      workbench.setStats(stats.details, validationNotes(stats), "success");
      workbench.setPreview("Tree view", treePreview(parsed.value));
      workbench.setAdvanced(advancedReport(stats, input, parsed.value));
      workbench.lastResult = textResult(report, "json-validation", "txt");
    }

    function explain(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var pretty = JSON.stringify(parsed.value, null, 2);
      var stats = analyzeJson(input, pretty, parsed.value);
      var explanation = explanationReport(stats, parsed.value);
      workbench.setOutput(explanation);
      workbench.setMessage("Explained JSON structure.", "success");
      workbench.setStats(stats.details, validationNotes(stats), "success");
      workbench.setPreview("Tree view", treePreview(parsed.value));
      workbench.setAdvanced(advancedReport(stats, input, parsed.value));
      workbench.lastResult = textResult(explanation, "json-explanation", "txt");
    }

    function showSuccess(workbench, input, output, parsed, message, action) {
      var stats = analyzeJson(input, output, parsed.value);
      workbench.setOutput(output);
      workbench.setMessage(message, "success");
      workbench.setStats(stats.details, validationNotes(stats), "success");
      workbench.setPreview("Syntax highlighted preview", syntaxPreview(output));
      workbench.setAdvanced(advancedReport(stats, input, parsed.value));
      workbench.lastResult = textResult(output, action === "minify" ? "json-minified" : "json-formatted", "json");
    }

    function showInvalid(workbench, input, parsed) {
      var error = parsed.error;
      var notes = [
        error.message,
        "Line " + error.line + ", column " + error.column + ".",
        error.hint
      ].filter(Boolean);
      workbench.setOutput("Invalid JSON\n" + notes.join("\n"));
      workbench.setMessage("Invalid JSON at line " + error.line + ", column " + error.column + ".", "error");
      workbench.setStats(errorDetails(input, error), notes, "error");
      workbench.setPreview("Error location", errorPreview(input, error));
      workbench.setAdvanced("<div class=\"preview-title\">Repair checklist</div><ul class=\"feedback-notes\"><li>Check commas between object properties or array values.</li><li>Use double quotes around object keys and string values.</li><li>Remove trailing commas before closing braces or brackets.</li><li>Escape control characters inside strings.</li></ul>");
      workbench.lastResult = textResult(workbench.outputValue(), "json-error", "txt");
    }

    function handleFile(workbench, file) {
      try {
        var text = util.utf8Text(file.bytes);
        var input = workbench.primaryInput();
        if (input) {
          input.value = text;
        }
        workbench.file = null;
        workbench.updateFileStatus({
          name: file.name,
          bytes: file.bytes,
          type: file.type || "application/json"
        });
        workbench.markActiveAction(workbench.form.dataset.capability === "validate" ? "validate" : "format");
        workbench.updateBadge();
        workbench.run(workbench.form.dataset.activeAction);
      } catch (error) {
        workbench.setMessage("Could not read this file as UTF-8 JSON text.", "error");
      }
    }

    function applySample(workbench, sampleId) {
      var input = workbench.primaryInput();
      if (!input) {
        return;
      }
      if (sampleId === "json-api") {
        input.value = '{"status":"ok","requestId":"req_123","data":{"users":[{"id":1,"name":"Ada","roles":["admin","editor"]},{"id":2,"name":"Lin","roles":["viewer"]}],"meta":{"page":1,"hasMore":false}}}';
        workbench.markActiveAction("format");
        workbench.run("format");
        return;
      }
      if (sampleId === "json-config") {
        input.value = '{\n  "app": "validohub",\n  "features": {\n    "liveMode": true,\n    "offline": true\n  },\n  "limits": {\n    "maxUploadMb": 5,\n    "indent": 2\n  }\n}';
        workbench.markActiveAction("validate");
        workbench.run("validate");
        return;
      }
      if (sampleId === "json-array") {
        input.value = '[{"event":"created","at":"2026-07-09T10:00:00Z"},{"event":"published","at":"2026-07-09T10:04:00Z"}]';
        workbench.markActiveAction("minify");
        workbench.run("minify");
        return;
      }
      if (sampleId === "json-invalid") {
        input.value = '{\n  "name": "ValidoHub",\n  "tools": ["json", "base64",]\n}';
        workbench.markActiveAction("validate");
        workbench.run("validate");
      }
    }

    function detectInputMode(value) {
      if (!value || !value.trim()) {
        return { label: "Waiting for input", state: "" };
      }
      var trimmed = value.trim();
      if (!/^[{[]/.test(trimmed)) {
        return { label: "Looks like text", state: "text" };
      }
      var parsed = parseJson(value);
      if (parsed.valid) {
        return { label: rootLabel(parsed.value), state: "json" };
      }
      return { label: "Invalid JSON", state: "invalid" };
    }

    function jsonInput(workbench) {
      var values = workbench.values();
      return values.json || values.input || "";
    }

    function parseJson(input) {
      try {
        return { valid: true, value: JSON.parse(input) };
      } catch (error) {
        return { valid: false, error: parseError(input, error) };
      }
    }

    function parseError(input, error) {
      var position = positionFromMessage(error.message);
      if (position == null) {
        position = estimateErrorPosition(input);
      }
      position = Math.max(0, Math.min(position, input.length));
      var location = lineColumn(input, position);
      return {
        message: normalizeErrorMessage(error.message),
        position: position,
        line: location.line,
        column: location.column,
        hint: hintForError(error.message, input, position)
      };
    }

    function positionFromMessage(message) {
      var match = String(message).match(/position (\d+)/i);
      return match ? Number(match[1]) : null;
    }

    function estimateErrorPosition(input) {
      var stack = [];
      var inString = false;
      var escaped = false;
      for (var index = 0; index < input.length; index++) {
        var ch = input.charAt(index);
        if (inString) {
          if (escaped) {
            escaped = false;
          } else if (ch === "\\\\") {
            escaped = true;
          } else if (ch === "\"") {
            inString = false;
          } else if (/[\n\r]/.test(ch)) {
            return index;
          }
          continue;
        }
        if (ch === "\"") {
          inString = true;
        } else if (ch === "{" || ch === "[") {
          stack.push(ch);
        } else if (ch === "}" || ch === "]") {
          var expected = ch === "}" ? "{" : "[";
          if (stack.pop() !== expected) {
            return index;
          }
        }
      }
      return input.length;
    }

    function lineColumn(input, position) {
      var line = 1;
      var column = 1;
      for (var index = 0; index < position; index++) {
        if (input.charAt(index) === "\n") {
          line++;
          column = 1;
        } else {
          column++;
        }
      }
      return { line: line, column: column };
    }

    function normalizeErrorMessage(message) {
      return String(message).replace(/^JSON\.parse:\s*/i, "JSON parse error: ");
    }

    function hintForError(message, input, position) {
      var before = input.slice(Math.max(0, position - 3), position + 3);
      if (/trailing|unexpected token\s*]/i.test(message) || /,\s*[}\]]/.test(before)) {
        return "Likely trailing comma or missing value before a closing bracket.";
      }
      if (/unterminated|string/i.test(message)) {
        return "A string appears to be missing a closing double quote or contains an unescaped line break.";
      }
      if (/property|double-quoted|Unexpected token [A-Za-z_]/i.test(message)) {
        return "Object keys and string values must use double quotes in JSON.";
      }
      if (/Unexpected end/i.test(message)) {
        return "The document ends before an object, array, or string was closed.";
      }
      return "Inspect the highlighted line and the token immediately before it.";
    }

    function analyzeJson(input, output, value) {
      var counts = {
        objects: 0,
        arrays: 0,
        properties: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0,
        maxDepth: 0
      };
      visit(value, 0, counts);
      var details = [
        ["Characters", String(Array.from(input).length)],
        ["UTF-8 bytes", util.formatBytes(util.utf8Bytes(input).length)],
        ["Output characters", String(Array.from(output).length)],
        ["Objects", String(counts.objects)],
        ["Arrays", String(counts.arrays)],
        ["Properties", String(counts.properties)],
        ["Nesting depth", String(counts.maxDepth)],
        ["Root type", rootType(value)]
      ];
      return {
        details: details,
        counts: counts,
        inputBytes: util.utf8Bytes(input).length,
        outputBytes: util.utf8Bytes(output).length,
        rootType: rootType(value)
      };
    }

    function visit(value, depth, counts) {
      counts.maxDepth = Math.max(counts.maxDepth, depth);
      if (Array.isArray(value)) {
        counts.arrays++;
        value.forEach(function (item) {
          visit(item, depth + 1, counts);
        });
        return;
      }
      if (value && typeof value === "object") {
        counts.objects++;
        Object.keys(value).forEach(function (key) {
          counts.properties++;
          visit(value[key], depth + 1, counts);
        });
        return;
      }
      if (typeof value === "string") {
        counts.strings++;
      } else if (typeof value === "number") {
        counts.numbers++;
      } else if (typeof value === "boolean") {
        counts.booleans++;
      } else if (value === null) {
        counts.nulls++;
      }
    }

    function validationNotes(stats) {
      var notes = [];
      if (stats.counts.maxDepth >= 8) {
        notes.push("Deep nesting detected. Consider whether consumers can handle this structure comfortably.");
      }
      if (stats.inputBytes > 250000) {
        notes.push("Large JSON input. Formatting remains local in your browser.");
      }
      return notes;
    }

    function validationReport(stats) {
      return ["Valid JSON"].concat(stats.details.map(function (row) {
        return row[0] + ": " + row[1];
      })).join("\n");
    }

    function explanationReport(stats, value) {
      var lines = [
        "JSON structure",
        "Root type: " + rootType(value),
        "Objects: " + stats.counts.objects,
        "Arrays: " + stats.counts.arrays,
        "Properties: " + stats.counts.properties,
        "Nesting depth: " + stats.counts.maxDepth,
        "",
        "Value types:",
        "- Strings: " + stats.counts.strings,
        "- Numbers: " + stats.counts.numbers,
        "- Booleans: " + stats.counts.booleans,
        "- Nulls: " + stats.counts.nulls
      ];
      return lines.join("\n");
    }

    function errorDetails(input, error) {
      return [
        ["Characters", String(Array.from(input).length)],
        ["UTF-8 bytes", util.formatBytes(util.utf8Bytes(input).length)],
        ["Error line", String(error.line)],
        ["Error column", String(error.column)],
        ["Error position", String(error.position + 1)]
      ];
    }

    function advancedReport(stats, input, value) {
      return "<div class=\"json-analysis-grid\">"
          + "<section><div class=\"preview-title\">Structure</div><dl class=\"feedback-grid\">"
          + stats.details.map(function (row) {
            return "<div><dt>" + util.escapeHtml(row[0]) + "</dt><dd>" + util.escapeHtml(row[1]) + "</dd></div>";
          }).join("")
          + "</dl></section>"
          + "<section><div class=\"preview-title\">Type distribution</div><dl class=\"feedback-grid\">"
          + [["Strings", stats.counts.strings], ["Numbers", stats.counts.numbers], ["Booleans", stats.counts.booleans], ["Nulls", stats.counts.nulls]].map(function (row) {
            return "<div><dt>" + row[0] + "</dt><dd>" + row[1] + "</dd></div>";
          }).join("")
          + "</dl></section>"
          + "<section><div class=\"preview-title\">JSON Pointer quick paths</div>" + pointerList(value) + "</section>"
          + "</div>";
    }

    function syntaxPreview(json) {
      return "<pre class=\"json-code\"><code>" + highlightJson(json) + "</code></pre>";
    }

    function highlightJson(json) {
      return json.replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, function (match, string, colon, literal) {
        if (string) {
          return colon
              ? "<span class=\"json-key\">" + util.escapeHtml(string) + "</span>" + util.escapeHtml(colon)
              : "<span class=\"json-string\">" + util.escapeHtml(string) + "</span>";
        }
        if (/^-?\d/.test(match)) {
          return "<span class=\"json-number\">" + util.escapeHtml(match) + "</span>";
        }
        return "<span class=\"json-literal\">" + util.escapeHtml(literal || match) + "</span>";
      });
    }

    function treePreview(value) {
      return "<div class=\"json-tree\">" + treeNode(value, "root", "") + "</div>";
    }

    function treeNode(value, label, path) {
      if (Array.isArray(value)) {
        return "<details open><summary><span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span> <span class=\"json-tree-type\">array[" + value.length + "]</span></summary>"
            + value.slice(0, 80).map(function (item, index) {
              return treeNode(item, String(index), path + "/" + index);
            }).join("")
            + (value.length > 80 ? "<div class=\"json-tree-more\">... " + (value.length - 80) + " more items</div>" : "")
            + "</details>";
      }
      if (value && typeof value === "object") {
        var keys = Object.keys(value);
        return "<details open><summary><span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span> <span class=\"json-tree-type\">object{" + keys.length + "}</span></summary>"
            + keys.slice(0, 80).map(function (key) {
              return treeNode(value[key], key, path + "/" + escapePointer(key));
            }).join("")
            + (keys.length > 80 ? "<div class=\"json-tree-more\">... " + (keys.length - 80) + " more properties</div>" : "")
            + "</details>";
      }
      return "<div class=\"json-tree-leaf\"><span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span>: <code>" + util.escapeHtml(JSON.stringify(value)) + "</code></div>";
    }

    function pointerList(value) {
      var pointers = [];
      collectPointers(value, "", pointers);
      if (pointers.length === 0) {
        return "<p>No nested paths.</p>";
      }
      return "<ul class=\"json-pointer-list\">" + pointers.slice(0, 14).map(function (pointer) {
        return "<li><code>" + util.escapeHtml(pointer.path || "/") + "</code><span>" + util.escapeHtml(pointer.type) + "</span></li>";
      }).join("") + "</ul>";
    }

    function collectPointers(value, path, pointers) {
      if (pointers.length >= 40) {
        return;
      }
      if (Array.isArray(value)) {
        pointers.push({ path: path, type: "array[" + value.length + "]" });
        value.slice(0, 6).forEach(function (item, index) {
          collectPointers(item, path + "/" + index, pointers);
        });
      } else if (value && typeof value === "object") {
        var keys = Object.keys(value);
        pointers.push({ path: path, type: "object{" + keys.length + "}" });
        keys.slice(0, 8).forEach(function (key) {
          collectPointers(value[key], path + "/" + escapePointer(key), pointers);
        });
      }
    }

    function errorPreview(input, error) {
      var lines = input.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
      var lineIndex = Math.max(0, error.line - 1);
      var start = Math.max(0, lineIndex - 2);
      var end = Math.min(lines.length, lineIndex + 3);
      var html = "<pre class=\"json-error-code\"><code>";
      for (var index = start; index < end; index++) {
        var lineNumber = index + 1;
        var isError = lineNumber === error.line;
        html += "<span class=\"" + (isError ? "json-error-line" : "") + "\"><span class=\"json-line-number\">" + lineNumber + "</span> " + util.escapeHtml(lines[index] || "") + "</span>\n";
        if (isError) {
          html += "<span class=\"json-error-caret\"><span class=\"json-line-number\"></span> " + " ".repeat(Math.max(0, error.column - 1)) + "^ " + util.escapeHtml(error.message) + "</span>\n";
        }
      }
      return html + "</code></pre>";
    }

    function escapePointer(value) {
      return String(value).replace(/~/g, "~0").replace(/\//g, "~1");
    }

    function rootType(value) {
      if (Array.isArray(value)) {
        return "array";
      }
      if (value === null) {
        return "null";
      }
      return typeof value;
    }

    function rootLabel(value) {
      var type = rootType(value);
      if (type === "array") {
        return "Valid JSON array";
      }
      if (type === "object") {
        return "Valid JSON object";
      }
      return "Valid JSON " + type;
    }

    function textResult(value, baseName, extension) {
      return {
        type: "text",
        text: value,
        extension: extension || "json",
        mime: extension === "txt" ? "text/plain;charset=utf-8" : "application/json;charset=utf-8",
        sourceName: baseName
      };
    }

    return {
      filePrefix: "validohub-json",
      onMount: onMount,
      run: run,
      handleFile: handleFile,
      applySample: applySample,
      detectInputMode: detectInputMode
    };
  })(window.ValidoWorkbench);

  window.ValidoWorkbench.registerPlugin(JSON_FORMATTER_ALGORITHM, JsonPlugin);
  window.ValidoWorkbench.registerPlugin(JSON_VALIDATOR_ALGORITHM, JsonPlugin);
})();
