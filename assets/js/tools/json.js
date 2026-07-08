(function () {
  var JSON_FORMATTER_ALGORITHM = "validohub.json-formatter";
  var JSON_VALIDATOR_ALGORITHM = "validohub.json-validator";
  var LARGE_JSON_BYTES = 250000;
  var LARGE_JSON_NODES = 5000;
  var TREE_NODE_RENDER_LIMIT = 1800;
  var TREE_CHILD_RENDER_LIMIT = 160;

  var JsonPlugin = (function (framework) {
    var util = framework.utilities;

    function onMount(workbench) {
      workbench.form._workbench = workbench;
      workbench.form.classList.add("json-workbench");
      ensureActionButtons(workbench);
      insertSamples(workbench);
      insertFileDropzone(workbench);
      bindJsonInteractions(workbench);
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
        ["sort", "Sort keys"],
        ["clean", "Remove empty"],
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

    function bindJsonInteractions(workbench) {
      if (workbench.form.dataset.jsonInteractionsBound === "true") {
        return;
      }
      workbench.form.dataset.jsonInteractionsBound = "true";
      var debouncedSearch = util.debounce(function () {
        runTreeSearch(workbench, "first");
      }, 120);

      workbench.form.addEventListener("click", function (event) {
        var treeAction = event.target.closest("[data-json-tree-action]");
        if (treeAction) {
          handleTreeAction(workbench, treeAction.dataset.jsonTreeAction);
          return;
        }
        var node = event.target.closest("[data-json-node]");
        if (node) {
          selectTreeNode(workbench, node.dataset.jsonPointer);
          return;
        }
        var copy = event.target.closest("[data-json-copy]");
        if (copy) {
          copySelectedNode(workbench, copy.dataset.jsonCopy);
        }
      });

      workbench.form.addEventListener("input", function (event) {
        if (event.target.matches("[data-json-search]")) {
          debouncedSearch();
        }
      });

      workbench.form.addEventListener("keydown", function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
          var search = workbench.form.querySelector("[data-json-search]");
          if (search) {
            event.preventDefault();
            search.focus();
            search.select();
          }
        }
        if (event.target.matches("[data-json-search]") && event.key === "Enter") {
          event.preventDefault();
          runTreeSearch(workbench, event.shiftKey ? "previous" : "next");
        }
      });
    }

    function run(workbench, action, options) {
      var input = jsonInput(workbench);
      var quiet = options && options.quiet;
      if (!input.trim()) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(quiet ? "" : "Paste JSON or drop a .json file.", quiet ? "" : "error");
        workbench.lastResult = null;
        workbench._jsonExplorer = null;
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
      if (action === "sort") {
        sortObjectKeys(workbench, input);
        return;
      }
      if (action === "clean") {
        removeEmptyValues(workbench, input);
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

    function sortObjectKeys(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var sorted = sortKeysDeep(parsed.value);
      var output = JSON.stringify(sorted, null, 2);
      showSuccess(workbench, input, output, { valid: true, value: sorted, warnings: parsed.warnings }, "Sorted object keys alphabetically.", "sort");
      updateInput(workbench, output);
    }

    function removeEmptyValues(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var cleaned = cleanEmptyDeep(parsed.value);
      var value = cleaned.empty ? null : cleaned.value;
      var output = JSON.stringify(value, null, 2);
      showSuccess(workbench, input, output, { valid: true, value: value, warnings: parsed.warnings }, "Removed " + cleaned.removed + " empty value" + (cleaned.removed === 1 ? "." : "s."), "clean");
      updateInput(workbench, output);
    }

    function validate(workbench, input) {
      var parsed = parseJson(input);
      if (!parsed.valid) {
        showInvalid(workbench, input, parsed);
        return;
      }
      var pretty = JSON.stringify(parsed.value, null, 2);
      var stats = analyzeJson(input, pretty, parsed.value);
      var report = validationReport(stats, parsed.warnings);
      workbench.setOutput(report);
      workbench.setMessage(parsed.warnings.length > 0 ? "Valid JSON with warnings." : "Valid JSON.", parsed.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats.details, validationNotes(stats).concat(parsed.warnings.map(function (warning) {
        return warning.message;
      })), parsed.warnings.length > 0 ? "warning" : "success");
      setJsonExplorer(workbench, parsed.value, stats);
      workbench.setAdvanced(advancedReport(stats, input, parsed.value, pretty));
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
      var explanation = explanationReport(stats, parsed.value, parsed.warnings);
      workbench.setOutput(explanation);
      workbench.setMessage("Explained JSON structure.", parsed.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats.details, validationNotes(stats).concat(parsed.warnings.map(function (warning) {
        return warning.message;
      })), parsed.warnings.length > 0 ? "warning" : "success");
      setJsonExplorer(workbench, parsed.value, stats);
      workbench.setAdvanced(advancedReport(stats, input, parsed.value, pretty));
      workbench.lastResult = textResult(explanation, "json-explanation", "txt");
    }

    function showSuccess(workbench, input, output, parsed, message, action) {
      var stats = analyzeJson(input, output, parsed.value);
      var warnings = parsed.warnings || [];
      workbench.setOutput(output);
      workbench.setMessage(message, warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats.details, validationNotes(stats).concat(warnings.map(function (warning) {
        return warning.message;
      })), warnings.length > 0 ? "warning" : "success");
      setJsonExplorer(workbench, parsed.value, stats);
      workbench.setAdvanced(advancedReport(stats, input, parsed.value, output));
      workbench.lastResult = textResult(output, action === "minify" ? "json-minified" : "json-" + action, "json");
    }

    function showInvalid(workbench, input, parsed) {
      var error = parsed.error;
      var notes = [
        error.message,
        "Line " + error.line + ", column " + error.column + ".",
        error.cause,
        error.hint
      ].filter(Boolean);
      workbench.setOutput("Invalid JSON\n" + notes.join("\n"));
      workbench.setMessage("Invalid JSON at line " + error.line + ", column " + error.column + ".", "error");
      workbench.setStats(errorDetails(input, error), notes, "error");
      workbench.setPreview("Error location", errorPreview(input, error));
      workbench.setAdvanced(errorRepairPanel(error));
      workbench.lastResult = textResult(workbench.outputValue(), "json-error", "txt");
      workbench._jsonExplorer = null;
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
        input.value = '{"status":"ok","requestId":"req_123","data":{"users":[{"id":1,"name":"Ada","roles":["admin","editor"],"profile":{"country":"PL","active":true}},{"id":2,"name":"Lin","roles":["viewer"],"profile":{"country":"BR","active":false}}],"meta":{"page":1,"hasMore":false}}}';
        workbench.markActiveAction("format");
        workbench.run("format");
        return;
      }
      if (sampleId === "json-config") {
        input.value = '{\n  "app": "validohub",\n  "features": {\n    "liveMode": true,\n    "offline": true,\n    "treeExplorer": true\n  },\n  "limits": {\n    "maxUploadMb": 5,\n    "indent": 2\n  }\n}';
        workbench.markActiveAction("validate");
        workbench.run("validate");
        return;
      }
      if (sampleId === "json-array") {
        input.value = '[{"event":"created","at":"2026-07-09T10:00:00Z","payload":{"id":1}},{"event":"published","at":"2026-07-09T10:04:00Z","payload":{"id":1,"channels":["web","api"]}}]';
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

    function updateInput(workbench, value) {
      var input = workbench.primaryInput();
      if (input) {
        input.value = value;
      }
    }

    function parseJson(input) {
      try {
        var value = JSON.parse(input);
        return { valid: true, value: value, warnings: duplicatePropertyWarnings(input) };
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
      var bounds = tokenBounds(input, position);
      var bracketMatch = matchingBracketPosition(input, position);
      var diagnosis = diagnoseError(error.message, input, position);
      return {
        message: normalizeErrorMessage(error.message),
        position: position,
        tokenStart: bounds.start,
        tokenEnd: bounds.end,
        bracketMatch: bracketMatch,
        line: location.line,
        column: location.column,
        cause: diagnosis.cause,
        hint: diagnosis.hint,
        suggestions: diagnosis.suggestions
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
          } else if (ch === "\\") {
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

    function diagnoseError(message, input, position) {
      var before = input.slice(Math.max(0, position - 6), position + 6);
      var char = input.charAt(position);
      if (/trailing|unexpected token\s*]/i.test(message) || /,\s*[}\]]/.test(before)) {
        return {
          cause: "Likely trailing comma.",
          hint: "JSON does not allow a comma before a closing brace or bracket.",
          suggestions: ["Remove the comma before the closing token.", "If another value is missing, add it after the comma."]
        };
      }
      if (/Unexpected end/i.test(message)) {
        return {
          cause: "Unexpected end of input.",
          hint: "The document ends before an object, array, or string was closed.",
          suggestions: ["Close the last open object or array.", "Check for an unterminated string near the end of the document."]
        };
      }
      if (/unterminated|string/i.test(message) || /[\n\r]/.test(char)) {
        return {
          cause: "Unclosed string.",
          hint: "A string appears to be missing a closing double quote or contains an unescaped line break.",
          suggestions: ["Add the closing double quote.", "Escape line breaks inside strings as \\n."]
        };
      }
      if (/property|double-quoted|Unexpected token [A-Za-z_]/i.test(message)) {
        return {
          cause: "Invalid object key or unexpected bare word.",
          hint: "JSON object keys and string values must use double quotes.",
          suggestions: ["Wrap object keys in double quotes.", "Use true, false, or null only for JSON literals."]
        };
      }
      if (char === ":" || /:\s*[,}\]]/.test(before)) {
        return {
          cause: "Missing value after colon.",
          hint: "A property name must be followed by a JSON value.",
          suggestions: ["Add a string, number, object, array, boolean, or null after the colon."]
        };
      }
      if (/[{\[]/.test(char)) {
        return {
          cause: "Unexpected opening bracket.",
          hint: "A comma may be missing before this nested value.",
          suggestions: ["Add a comma between adjacent values.", "Check the parent object or array around the highlighted token."]
        };
      }
      if (/[}\]]/.test(char)) {
        return {
          cause: "Unexpected closing bracket.",
          hint: "A matching opening bracket may be missing or the previous value may be incomplete.",
          suggestions: ["Check bracket pairing.", "Remove an extra closing token or complete the previous value."]
        };
      }
      return {
        cause: "Unexpected token.",
        hint: "Inspect the highlighted token and the token immediately before it.",
        suggestions: ["Check for a missing comma.", "Check quotes around strings and keys.", "Check bracket pairing."]
      };
    }

    function tokenBounds(input, position) {
      var start = Math.max(0, position);
      var end = Math.min(input.length, position + 1);
      if (/[\s]/.test(input.charAt(start))) {
        return { start: start, end: end };
      }
      if (/[\{\}\[\]:,]/.test(input.charAt(start))) {
        return { start: start, end: end };
      }
      while (start > 0 && !/[\s\{\}\[\]:,]/.test(input.charAt(start - 1))) {
        start--;
      }
      while (end < input.length && !/[\s\{\}\[\]:,]/.test(input.charAt(end))) {
        end++;
      }
      return { start: start, end: Math.max(end, start + 1) };
    }

    function matchingBracketPosition(input, position) {
      var ch = input.charAt(position);
      var pairs = { "{": "}", "[": "]", "}": "{", "]": "[" };
      if (!pairs[ch]) {
        return null;
      }
      var direction = ch === "{" || ch === "[" ? 1 : -1;
      var expected = pairs[ch];
      var depth = 0;
      var inString = false;
      var escaped = false;
      for (var index = position; index >= 0 && index < input.length; index += direction) {
        var current = input.charAt(index);
        if (index !== position) {
          if (inString) {
            if (escaped) {
              escaped = false;
            } else if (current === "\\") {
              escaped = true;
            } else if (current === "\"") {
              inString = false;
            }
            continue;
          }
          if (current === "\"") {
            inString = true;
            continue;
          }
        }
        if (current === ch) {
          depth++;
        } else if (current === expected) {
          depth--;
          if (depth === 0) {
            return index;
          }
        }
      }
      return null;
    }

    function duplicatePropertyWarnings(input) {
      var warnings = [];
      var stack = [];
      var inString = false;
      var escaped = false;
      var stringStart = 0;
      var buffer = "";
      for (var index = 0; index < input.length; index++) {
        var ch = input.charAt(index);
        if (inString) {
          if (escaped) {
            buffer += ch;
            escaped = false;
          } else if (ch === "\\") {
            buffer += ch;
            escaped = true;
          } else if (ch === "\"") {
            inString = false;
            var top = stack[stack.length - 1];
            var next = nextNonWhitespace(input, index + 1);
            if (top && top.type === "object" && top.expectKey && input.charAt(next) === ":") {
              var key = safeStringValue(input.slice(stringStart, index + 1));
              if (Object.prototype.hasOwnProperty.call(top.keys, key)) {
                var location = lineColumn(input, stringStart);
                warnings.push({
                  message: "Duplicate property \"" + key + "\" at line " + location.line + ", column " + location.column + ". Later values overwrite earlier ones in JavaScript.",
                  key: key,
                  line: location.line,
                  column: location.column
                });
              }
              top.keys[key] = true;
              top.expectKey = false;
            }
          } else {
            buffer += ch;
          }
          continue;
        }
        if (ch === "\"") {
          inString = true;
          escaped = false;
          stringStart = index;
          buffer = "";
        } else if (ch === "{") {
          stack.push({ type: "object", keys: {}, expectKey: true });
        } else if (ch === "[") {
          stack.push({ type: "array" });
        } else if (ch === "}" || ch === "]") {
          stack.pop();
        } else if (ch === ",") {
          var current = stack[stack.length - 1];
          if (current && current.type === "object") {
            current.expectKey = true;
          }
        }
      }
      return warnings;
    }

    function nextNonWhitespace(input, start) {
      for (var index = start; index < input.length; index++) {
        if (!/\s/.test(input.charAt(index))) {
          return index;
        }
      }
      return input.length;
    }

    function safeStringValue(value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value.slice(1, -1);
      }
    }

    function analyzeJson(input, output, value) {
      var counts = {
        nodes: 0,
        objects: 0,
        arrays: 0,
        properties: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0,
        maxDepth: 0,
        largestArray: 0,
        largestObject: 0
      };
      visit(value, 0, counts);
      var inputBytes = util.utf8Bytes(input).length;
      var details = [
        ["Characters", String(Array.from(input).length)],
        ["UTF-8 bytes", util.formatBytes(inputBytes)],
        ["Output characters", String(Array.from(output).length)],
        ["Nodes", String(counts.nodes)],
        ["Objects", String(counts.objects)],
        ["Arrays", String(counts.arrays)],
        ["Properties", String(counts.properties)],
        ["Strings", String(counts.strings)],
        ["Numbers", String(counts.numbers)],
        ["Booleans", String(counts.booleans)],
        ["Null values", String(counts.nulls)],
        ["Maximum depth", String(counts.maxDepth)],
        ["Largest array", String(counts.largestArray)],
        ["Largest object", String(counts.largestObject)],
        ["Root type", rootType(value)]
      ];
      return {
        details: details,
        counts: counts,
        inputBytes: inputBytes,
        outputBytes: util.utf8Bytes(output).length,
        rootType: rootType(value),
        largeMode: inputBytes > LARGE_JSON_BYTES || counts.nodes > LARGE_JSON_NODES
      };
    }

    function visit(value, depth, counts) {
      counts.nodes++;
      counts.maxDepth = Math.max(counts.maxDepth, depth);
      if (Array.isArray(value)) {
        counts.arrays++;
        counts.largestArray = Math.max(counts.largestArray, value.length);
        value.forEach(function (item) {
          visit(item, depth + 1, counts);
        });
        return;
      }
      if (value && typeof value === "object") {
        var keys = Object.keys(value);
        counts.objects++;
        counts.properties += keys.length;
        counts.largestObject = Math.max(counts.largestObject, keys.length);
        keys.forEach(function (key) {
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
      if (stats.largeMode) {
        notes.push("Large JSON mode enabled. Tree rendering is capped to keep the browser responsive.");
      }
      if (stats.counts.maxDepth >= 8) {
        notes.push("Deep nesting detected. Consider whether consumers can handle this structure comfortably.");
      }
      return notes;
    }

    function validationReport(stats, warnings) {
      var lines = ["Valid JSON"].concat(stats.details.map(function (row) {
        return row[0] + ": " + row[1];
      }));
      if (warnings && warnings.length > 0) {
        lines.push("");
        lines.push("Warnings:");
        warnings.forEach(function (warning) {
          lines.push("- " + warning.message);
        });
      }
      return lines.join("\n");
    }

    function explanationReport(stats, value, warnings) {
      var lines = [
        "JSON structure",
        "Root type: " + rootType(value),
        "Nodes: " + stats.counts.nodes,
        "Objects: " + stats.counts.objects,
        "Arrays: " + stats.counts.arrays,
        "Properties: " + stats.counts.properties,
        "Maximum depth: " + stats.counts.maxDepth,
        "Largest array size: " + stats.counts.largestArray,
        "Largest object size: " + stats.counts.largestObject,
        "",
        "Value types:",
        "- Strings: " + stats.counts.strings,
        "- Numbers: " + stats.counts.numbers,
        "- Booleans: " + stats.counts.booleans,
        "- Null values: " + stats.counts.nulls
      ];
      if (warnings && warnings.length > 0) {
        lines.push("");
        lines.push("Warnings:");
        warnings.forEach(function (warning) {
          lines.push("- " + warning.message);
        });
      }
      return lines.join("\n");
    }

    function errorDetails(input, error) {
      return [
        ["Characters", String(Array.from(input).length)],
        ["UTF-8 bytes", util.formatBytes(util.utf8Bytes(input).length)],
        ["Error line", String(error.line)],
        ["Error column", String(error.column)],
        ["Error position", String(error.position + 1)],
        ["Likely cause", error.cause || "Unexpected token"]
      ];
    }

    function advancedReport(stats, input, value, jsonOutput) {
      return "<div class=\"json-analysis-grid\">"
          + "<section><div class=\"preview-title\">Structure</div><dl class=\"feedback-grid\">"
          + stats.details.map(function (row) {
            return "<div><dt>" + util.escapeHtml(row[0]) + "</dt><dd>" + util.escapeHtml(row[1]) + "</dd></div>";
          }).join("")
          + "</dl></section>"
          + "<section><div class=\"preview-title\">Type distribution</div><dl class=\"feedback-grid\">"
          + [["Strings", stats.counts.strings], ["Numbers", stats.counts.numbers], ["Booleans", stats.counts.booleans], ["Null values", stats.counts.nulls]].map(function (row) {
            return "<div><dt>" + row[0] + "</dt><dd>" + row[1] + "</dd></div>";
          }).join("")
          + "</dl></section>"
          + "<section><div class=\"preview-title\">JSON Pointer quick paths</div>" + pointerList(value) + "</section>"
          + "<section><div class=\"preview-title\">Syntax highlighted JSON</div>" + syntaxPreview(jsonOutput).replace("<pre", "<pre data-json-syntax") + "</section>"
          + "</div>";
    }

    function setJsonExplorer(workbench, value, stats) {
      workbench._jsonExplorer = {
        value: value,
        selectedPointer: "",
        matches: [],
        matchIndex: -1,
        stats: stats
      };
      workbench.setPreview("JSON explorer", treePreview(value, stats));
      window.setTimeout(function () {
        initializeExplorer(workbench);
      }, 0);
    }

    function initializeExplorer(workbench) {
      var explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer) {
        return;
      }
      selectTreeNode(workbench, "");
      var search = explorer.querySelector("[data-json-search]");
      if (search && search.value) {
        runTreeSearch(workbench, "first");
      }
    }

    function syntaxPreview(json) {
      return "<pre class=\"json-code\"><code>" + highlightJson(json) + "</code></pre>";
    }

    function highlightJson(json) {
      return json.replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|[{}\[\]:,]/g, function (match, string, colon, literal) {
        if (string) {
          if (colon) {
            return "<span class=\"json-key\">" + util.escapeHtml(string) + "</span>"
                + util.escapeHtml(colon.slice(0, -1))
                + "<span class=\"json-punctuation\">:</span>";
          }
          return "<span class=\"json-string\">" + util.escapeHtml(string) + "</span>";
        }
        if (/^-?\d/.test(match)) {
          return "<span class=\"json-number\">" + util.escapeHtml(match) + "</span>";
        }
        if (literal || /^(true|false|null)$/.test(match)) {
          return "<span class=\"json-literal\">" + util.escapeHtml(literal || match) + "</span>";
        }
        return "<span class=\"json-punctuation\">" + util.escapeHtml(match) + "</span>";
      });
    }

    function treePreview(value, stats) {
      var state = { rendered: 0, capped: false, largeMode: stats.largeMode };
      var html = "<div class=\"json-explorer\" data-json-explorer>"
          + "<div class=\"json-explorer-toolbar\">"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"expand-all\">Expand all</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"collapse-all\">Collapse all</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"focus-search\">Focus search</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"clear-search\">Clear search</button>"
          + "<label class=\"json-search-label\"><span>Search</span><input type=\"search\" data-json-search placeholder=\"Keys or values\" autocomplete=\"off\"></label>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"previous-match\">Previous</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-tree-action=\"next-match\">Next</button>"
          + "</div>"
          + "<div class=\"json-tree-meta\"><span>" + stats.counts.nodes + " nodes</span><span data-json-search-count>No search</span>"
          + (stats.largeMode ? "<span class=\"json-large-mode\">Large JSON mode enabled</span>" : "")
          + "</div>"
          + "<div class=\"json-tree-shell\"><div class=\"json-tree\" data-json-tree>"
          + treeNode(value, "root", "", "$", 0, state)
          + (state.capped ? "<div class=\"json-tree-more\">Tree preview capped after " + TREE_NODE_RENDER_LIMIT + " rendered nodes. Use search and formatting output for the full document.</div>" : "")
          + "</div></div>"
          + "<div class=\"json-node-inspector\" data-json-node-details><strong>Select a node</strong><span>Click any tree row to inspect type, path, children, depth, and subtree size.</span></div>"
          + "<div class=\"json-copy-row\" aria-label=\"Copy selected node\">"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-copy=\"value\">Copy value</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-copy=\"key\">Copy key</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-copy=\"path\">Copy JSONPath</button>"
          + "<button type=\"button\" class=\"json-tool-button\" data-json-copy=\"subtree\">Copy subtree JSON</button>"
          + "</div>"
          + "</div>";
      return html;
    }

    function treeNode(value, label, pointer, jsonPath, depth, state) {
      if (state.rendered >= TREE_NODE_RENDER_LIMIT) {
        state.capped = true;
        return "";
      }
      state.rendered++;
      var type = rootType(value);
      var container = type === "array" || type === "object";
      var children = childCount(value);
      var icon = type === "object" ? "{}" : type === "array" ? "[]" : "v";
      var row = "<button type=\"button\" class=\"json-node-row\" data-json-node data-json-pointer=\"" + attr(pointer) + "\" data-json-path=\"" + attr(jsonPath) + "\" style=\"--json-depth:" + depth + "\">"
          + "<span class=\"json-node-icon\" aria-hidden=\"true\">" + icon + "</span>"
          + "<span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span>"
          + "<span class=\"json-tree-type\">" + typeLabel(value) + "</span>"
          + (!container ? "<code class=\"json-node-value\">" + util.escapeHtml(shortValue(value)) + "</code>" : "")
          + "<span class=\"json-node-path\">" + util.escapeHtml(jsonPath) + "</span>"
          + "</button>";
      if (!container) {
        return "<div class=\"json-tree-leaf\">" + row + "</div>";
      }
      var open = depth < (state.largeMode ? 1 : 3) ? " open" : "";
      var keys = Array.isArray(value) ? value.map(function (_, index) { return String(index); }) : Object.keys(value);
      var limit = state.largeMode ? Math.min(TREE_CHILD_RENDER_LIMIT, 60) : TREE_CHILD_RENDER_LIMIT;
      var childrenHtml = keys.slice(0, limit).map(function (key) {
        var childValue = Array.isArray(value) ? value[Number(key)] : value[key];
        var childPointer = pointer + "/" + escapePointer(key);
        var childPath = Array.isArray(value) ? jsonPath + "[" + key + "]" : jsonPath + pathSegment(key);
        return treeNode(childValue, key, childPointer, childPath, depth + 1, state);
      }).join("");
      if (keys.length > limit) {
        childrenHtml += "<div class=\"json-tree-more\" style=\"--json-depth:" + (depth + 1) + "\">" + (keys.length - limit) + " more children hidden for responsiveness.</div>";
      }
      return "<details class=\"json-tree-branch\"" + open + " data-json-branch data-json-pointer=\"" + attr(pointer) + "\"><summary>" + row + "<span class=\"json-child-count\">" + children + "</span></summary>" + childrenHtml + "</details>";
    }

    function handleTreeAction(workbench, action) {
      var explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer) {
        return;
      }
      if (action === "expand-all" || action === "collapse-all") {
        explorer.querySelectorAll("details[data-json-branch]").forEach(function (details) {
          details.open = action === "expand-all";
        });
        return;
      }
      if (action === "focus-search") {
        var search = explorer.querySelector("[data-json-search]");
        if (search) {
          search.focus();
          search.select();
        }
        return;
      }
      if (action === "clear-search") {
        var field = explorer.querySelector("[data-json-search]");
        if (field) {
          field.value = "";
        }
        clearTreeSearch(explorer);
        return;
      }
      if (action === "next-match" || action === "previous-match") {
        runTreeSearch(workbench, action === "next-match" ? "next" : "previous");
      }
    }

    function runTreeSearch(workbench, direction) {
      var explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer) {
        return;
      }
      var field = explorer.querySelector("[data-json-search]");
      var query = field ? field.value.trim().toLowerCase() : "";
      clearTreeSearch(explorer);
      if (!query) {
        setSearchCount(explorer, "No search");
        if (workbench._jsonExplorer) {
          workbench._jsonExplorer.matches = [];
          workbench._jsonExplorer.matchIndex = -1;
        }
        return;
      }
      var matches = Array.from(explorer.querySelectorAll("[data-json-node]")).filter(function (node) {
        var haystack = (node.textContent || "").toLowerCase();
        return haystack.indexOf(query) !== -1;
      });
      matches.forEach(function (node) {
        node.classList.add("is-match");
        openParents(node);
      });
      if (!workbench._jsonExplorer) {
        workbench._jsonExplorer = {};
      }
      workbench._jsonExplorer.matches = matches.map(function (node) {
        return node.dataset.jsonPointer;
      });
      if (matches.length === 0) {
        workbench._jsonExplorer.matchIndex = -1;
        setSearchCount(explorer, "0 matches");
        return;
      }
      var current = workbench._jsonExplorer.matchIndex;
      if (direction === "previous") {
        current = current <= 0 ? matches.length - 1 : current - 1;
      } else if (direction === "next") {
        current = current >= matches.length - 1 ? 0 : current + 1;
      } else {
        current = 0;
      }
      workbench._jsonExplorer.matchIndex = current;
      matches[current].classList.add("is-current-match");
      matches[current].scrollIntoView({ block: "nearest" });
      selectTreeNode(workbench, matches[current].dataset.jsonPointer);
      setSearchCount(explorer, (current + 1) + " of " + matches.length + " matches");
    }

    function clearTreeSearch(explorer) {
      explorer.querySelectorAll(".is-match, .is-current-match").forEach(function (node) {
        node.classList.remove("is-match", "is-current-match");
      });
    }

    function setSearchCount(explorer, text) {
      var target = explorer.querySelector("[data-json-search-count]");
      if (target) {
        target.textContent = text;
      }
    }

    function selectTreeNode(workbench, pointer) {
      var explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer || !workbench._jsonExplorer) {
        return;
      }
      explorer.querySelectorAll("[data-json-node].is-selected").forEach(function (node) {
        node.classList.remove("is-selected");
      });
      var selector = "[data-json-node][data-json-pointer=\"" + cssEscape(pointer) + "\"]";
      var node = explorer.querySelector(selector);
      if (node) {
        node.classList.add("is-selected");
        openParents(node);
      }
      workbench._jsonExplorer.selectedPointer = pointer;
      var value = resolvePointer(workbench._jsonExplorer.value, pointer);
      var key = pointer ? unescapePointer(pointer.split("/").pop()) : "root";
      var details = explorer.querySelector("[data-json-node-details]");
      if (details) {
        var stats = subtreeStats(value);
        details.innerHTML = "<div><strong>" + util.escapeHtml(key) + "</strong><code>" + util.escapeHtml(jsonPathFromPointer(pointer)) + "</code></div>"
            + "<dl class=\"json-node-stats\">"
            + "<div><dt>Type</dt><dd>" + util.escapeHtml(titleType(value)) + "</dd></div>"
            + "<div><dt>Children</dt><dd>" + childCount(value) + "</dd></div>"
            + "<div><dt>Subtree size</dt><dd>" + stats.nodes + "</dd></div>"
            + "<div><dt>Nesting depth</dt><dd>" + stats.maxDepth + "</dd></div>"
            + "</dl>";
      }
    }

    function copySelectedNode(workbench, kind) {
      if (!workbench._jsonExplorer) {
        workbench.setMessage("Select a JSON node first.", "error");
        return;
      }
      var pointer = workbench._jsonExplorer.selectedPointer || "";
      var value = resolvePointer(workbench._jsonExplorer.value, pointer);
      var key = pointer ? unescapePointer(pointer.split("/").pop()) : "root";
      var text = "";
      if (kind === "value") {
        text = primitiveCopyValue(value);
      } else if (kind === "key") {
        text = key;
      } else if (kind === "path") {
        text = jsonPathFromPointer(pointer);
      } else if (kind === "subtree") {
        text = JSON.stringify(value, null, 2);
      }
      copyText(text).then(function () {
        workbench.setMessage("Copied " + kind + ".", "success");
      }).catch(function () {
        workbench.setMessage("Could not copy " + kind + ".", "error");
      });
    }

    function copyText(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return new Promise(function (resolve, reject) {
        try {
          var textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

    function openParents(node) {
      var parent = node.parentElement;
      while (parent) {
        if (parent.matches && parent.matches("details")) {
          parent.open = true;
        }
        parent = parent.parentElement;
      }
    }

    function sortKeysDeep(value) {
      if (Array.isArray(value)) {
        return value.map(sortKeysDeep);
      }
      if (value && typeof value === "object") {
        return Object.keys(value).sort(function (a, b) {
          return a.localeCompare(b);
        }).reduce(function (result, key) {
          result[key] = sortKeysDeep(value[key]);
          return result;
        }, {});
      }
      return value;
    }

    function cleanEmptyDeep(value) {
      if (Array.isArray(value)) {
        var removed = 0;
        var array = [];
        value.forEach(function (item) {
          var cleaned = cleanEmptyDeep(item);
          removed += cleaned.removed;
          if (cleaned.empty) {
            removed++;
          } else {
            array.push(cleaned.value);
          }
        });
        return { value: array, removed: removed, empty: array.length === 0 };
      }
      if (value && typeof value === "object") {
        var object = {};
        var totalRemoved = 0;
        Object.keys(value).forEach(function (key) {
          var cleaned = cleanEmptyDeep(value[key]);
          totalRemoved += cleaned.removed;
          if (cleaned.empty) {
            totalRemoved++;
          } else {
            object[key] = cleaned.value;
          }
        });
        return { value: object, removed: totalRemoved, empty: Object.keys(object).length === 0 };
      }
      var empty = value === null || value === "";
      return { value: value, removed: 0, empty: empty };
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
        html += "<span class=\"" + (isError ? "json-error-line" : "") + "\"><span class=\"json-line-number\">" + lineNumber + "</span> " + highlightedErrorLine(lines[index] || "", input, error, lineNumber) + "</span>\n";
        if (isError) {
          html += "<span class=\"json-error-caret\"><span class=\"json-line-number\"></span> " + " ".repeat(Math.max(0, error.column - 1)) + "^ " + util.escapeHtml(error.cause || error.message) + "</span>\n";
        }
      }
      return html + "</code></pre>";
    }

    function highlightedErrorLine(line, input, error, lineNumber) {
      var locationStart = absoluteLineStart(input, lineNumber);
      var localStart = Math.max(0, error.tokenStart - locationStart);
      var localEnd = Math.max(localStart + 1, error.tokenEnd - locationStart);
      var html = util.escapeHtml(line.slice(0, localStart))
          + "<span class=\"json-error-token\">" + util.escapeHtml(line.slice(localStart, localEnd) || " ") + "</span>"
          + util.escapeHtml(line.slice(localEnd));
      if (error.bracketMatch != null) {
        var matchLocation = lineColumn(input, error.bracketMatch);
        if (matchLocation.line === lineNumber) {
          var matchColumn = matchLocation.column - 1;
          html = util.escapeHtml(line.slice(0, matchColumn))
              + "<span class=\"json-bracket-match\">" + util.escapeHtml(line.charAt(matchColumn)) + "</span>"
              + util.escapeHtml(line.slice(matchColumn + 1));
        }
      }
      return html;
    }

    function absoluteLineStart(input, lineNumber) {
      var line = 1;
      for (var index = 0; index < input.length; index++) {
        if (line === lineNumber) {
          return index;
        }
        if (input.charAt(index) === "\n") {
          line++;
        }
      }
      return input.length;
    }

    function errorRepairPanel(error) {
      return "<div class=\"preview-title\">Repair suggestions</div>"
          + "<p class=\"json-error-summary\">" + util.escapeHtml(error.cause || "Unexpected token") + "</p>"
          + "<ul class=\"feedback-notes\">"
          + error.suggestions.map(function (suggestion) {
            return "<li>" + util.escapeHtml(suggestion) + "</li>";
          }).join("")
          + "</ul>";
    }

    function pointerList(value) {
      var pointers = [];
      collectPointers(value, "", pointers);
      if (pointers.length === 0) {
        return "<p>No nested paths.</p>";
      }
      return "<ul class=\"json-pointer-list\">" + pointers.slice(0, 14).map(function (pointer) {
        return "<li><code>" + util.escapeHtml(jsonPathFromPointer(pointer.path)) + "</code><span>" + util.escapeHtml(pointer.type) + "</span></li>";
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

    function subtreeStats(value) {
      var counts = {
        nodes: 0,
        objects: 0,
        arrays: 0,
        properties: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0,
        maxDepth: 0,
        largestArray: 0,
        largestObject: 0
      };
      visit(value, 0, counts);
      return counts;
    }

    function childCount(value) {
      if (Array.isArray(value)) {
        return value.length;
      }
      if (value && typeof value === "object") {
        return Object.keys(value).length;
      }
      return 0;
    }

    function typeLabel(value) {
      if (Array.isArray(value)) {
        return "Array[" + value.length + "]";
      }
      if (value && typeof value === "object") {
        return "Object{" + Object.keys(value).length + "}";
      }
      return titleType(value);
    }

    function titleType(value) {
      var type = rootType(value);
      return type.charAt(0).toUpperCase() + type.slice(1);
    }

    function shortValue(value) {
      if (typeof value === "string") {
        return JSON.stringify(value.length > 72 ? value.slice(0, 72) + "..." : value);
      }
      return JSON.stringify(value);
    }

    function primitiveCopyValue(value) {
      if (value && typeof value === "object") {
        return JSON.stringify(value, null, 2);
      }
      if (typeof value === "string") {
        return value;
      }
      return JSON.stringify(value);
    }

    function resolvePointer(value, pointer) {
      if (!pointer) {
        return value;
      }
      return pointer.split("/").slice(1).reduce(function (current, segment) {
        if (current == null) {
          return undefined;
        }
        return current[unescapePointer(segment)];
      }, value);
    }

    function jsonPathFromPointer(pointer) {
      if (!pointer) {
        return "$";
      }
      return pointer.split("/").slice(1).reduce(function (path, segment) {
        var key = unescapePointer(segment);
        return /^\d+$/.test(key) ? path + "[" + key + "]" : path + pathSegment(key);
      }, "$");
    }

    function pathSegment(key) {
      return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)
          ? "." + key
          : "[" + JSON.stringify(key) + "]";
    }

    function escapePointer(value) {
      return String(value).replace(/~/g, "~0").replace(/\//g, "~1");
    }

    function unescapePointer(value) {
      return String(value).replace(/~1/g, "/").replace(/~0/g, "~");
    }

    function attr(value) {
      return util.escapeHtml(String(value)).replace(/"/g, "&quot;");
    }

    function cssEscape(value) {
      if (window.CSS && window.CSS.escape) {
        return window.CSS.escape(value);
      }
      return String(value).replace(/["\\]/g, "\\$&");
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
