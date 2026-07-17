(function () {
  var helpers = window.ValidoWorkbenchHelpers = window.ValidoWorkbenchHelpers || {};

  var ValidoWorkbench = (function () {
    var plugins = {};

    function registerPlugin(algorithmId, plugin) {
      plugins[algorithmId] = plugin;
      scheduleMount();
    }

    function mountAll() {
      document.querySelectorAll(".tool-workbench").forEach(function (form) {
        var plugin = plugins[form.dataset.algorithmId];
        if (plugin && form.dataset.workbenchMounted !== "true") {
          form.dataset.workbenchMounted = "true";
          new Workbench(form, plugin).mount();
        }
      });
    }

    function Workbench(form, plugin) {
      this.form = form;
      this.plugin = plugin;
      this.file = null;
      this.lastResult = null;
    }

    Workbench.prototype.mount = function () {
      var workbench = this;
      var actionButtons = Array.from(this.form.querySelectorAll("[data-action]"));
      var initialAction = actionButtons.length > 0 ? actionButtons[0].dataset.action : this.form.dataset.capability;
      this.form.classList.add("browser-workbench");
      this.markActiveAction(initialAction);
      this.updateBadge();
      actionButtons.forEach(function (button) {
        button.setAttribute("aria-keyshortcuts", "Control+Enter Meta+Enter");
      });
      var clearButton = this.form.querySelector("[data-tool-clear]");
      if (clearButton) {
        clearButton.setAttribute("aria-keyshortcuts", "Escape");
      }
      if (this.plugin.onMount) {
        this.plugin.onMount(this);
      }
      this.bindLiveMode(initialAction);
      this.bindFileInput();
      this.form.addEventListener("click", function (event) {
        var actionButton = event.target.closest("[data-action]");
        if (actionButton) {
          workbench.markActiveAction(actionButton.dataset.action);
          workbench.run(actionButton.dataset.action);
          return;
        }
        var sampleButton = event.target.closest("[data-sample]");
        if (sampleButton) {
          workbench.plugin.applySample(workbench, sampleButton.dataset.sample);
          workbench.updateBadge();
          return;
        }
        if (event.target.closest("[data-tool-copy]")) {
          workbench.copy();
          return;
        }
        if (event.target.closest("[data-tool-download]")) {
          workbench.download();
          return;
        }
        if (event.target.closest("[data-tool-clear]")) {
          workbench.clear();
        }
      });
    };

    Workbench.prototype.bindLiveMode = function (initialAction) {
      var workbench = this;
      var liveRun = debounce(function () {
        workbench.updateBadge();
        workbench.run(workbench.form.dataset.activeAction || initialAction, { quiet: true });
      }, 180);
      this.form.querySelectorAll("textarea[name], input[name], select[name]").forEach(function (field) {
        if (field.type === "file") {
          return;
        }
        field.addEventListener("input", function () {
          if (field.tagName === "TEXTAREA") {
            workbench.file = null;
            workbench.updateFileStatus(null);
          }
          liveRun();
        });
        field.addEventListener("change", liveRun);
        field.addEventListener("keydown", function (event) {
          if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
            event.preventDefault();
            workbench.run(workbench.form.dataset.activeAction || initialAction);
          }
          if (event.key === "Escape") {
            event.preventDefault();
            workbench.clear();
          }
        });
      });
    };

    Workbench.prototype.bindFileInput = function () {
      var workbench = this;
      var dropzone = this.form.querySelector("[data-file-dropzone]");
      var input = this.form.querySelector("[data-file-input]");
      if (!dropzone || !input || !window.FileReader || !this.plugin.handleFile) {
        return;
      }
      input.addEventListener("change", function () {
        if (input.files && input.files[0]) {
          workbench.readFile(input.files[0]);
        }
      });
      ["dragenter", "dragover"].forEach(function (name) {
        dropzone.addEventListener(name, function (event) {
          event.preventDefault();
          dropzone.classList.add("is-dragging");
        });
      });
      ["dragleave", "drop"].forEach(function (name) {
        dropzone.addEventListener(name, function (event) {
          event.preventDefault();
          dropzone.classList.remove("is-dragging");
        });
      });
      dropzone.addEventListener("drop", function (event) {
        var file = event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0];
        if (file) {
          workbench.readFile(file);
        }
      });
    };

    Workbench.prototype.readFile = function (file) {
      var workbench = this;
      var reader = new FileReader();
      reader.onload = function () {
        workbench.file = {
          name: file.name || "unnamed-file",
          size: file.size || reader.result.byteLength,
          type: file.type || "",
          bytes: new Uint8Array(reader.result)
        };
        var input = workbench.primaryInput();
        if (input) {
          input.value = "";
        }
        workbench.markActiveAction("encode");
        workbench.updateFileStatus(workbench.file);
        workbench.setBadge({ label: "File bytes ready", state: "base64" });
        workbench.plugin.handleFile(workbench, workbench.file);
      };
      reader.onerror = function () {
        workbench.setMessage("Could not read file.", "error");
      };
      reader.readAsArrayBuffer(file);
    };

    Workbench.prototype.run = function (action, options) {
      this.plugin.run(this, action, options || {});
    };

    Workbench.prototype.values = function () {
      var values = {};
      this.form.querySelectorAll("textarea[name], input[name], select[name]").forEach(function (field) {
        if (field.type === "checkbox") {
          values[field.name] = field.checked;
        } else {
          values[field.name] = field.value;
        }
      });
      return values;
    };

    Workbench.prototype.primaryInput = function () {
      return this.form.querySelector("textarea[name=\"input\"]")
          || this.form.querySelector("textarea[name]")
          || this.form.querySelector("input[name]:not([type=\"file\"]):not([type=\"checkbox\"]):not([type=\"hidden\"])");
    };

    Workbench.prototype.setMessage = function (text, state) {
      var message = this.form.querySelector("[data-tool-message]");
      if (!message) {
        return;
      }
      message.textContent = text || "";
      message.dataset.state = state || "";
    };

    Workbench.prototype.setOutput = function (value) {
      var output = this.form.querySelector("[data-tool-output]");
      if (output) {
        output.value = value || "";
      }
    };

    Workbench.prototype.outputValue = function () {
      var output = this.form.querySelector("[data-tool-output]");
      return output ? output.value : "";
    };

    Workbench.prototype.setBadge = function (mode) {
      var badge = this.form.querySelector("[data-input-mode-badge]");
      if (!badge) {
        return;
      }
      badge.textContent = mode.label;
      badge.dataset.state = mode.state || "";
    };

    Workbench.prototype.updateBadge = function () {
      var input = this.primaryInput();
      this.setBadge(this.plugin.detectInputMode ? this.plugin.detectInputMode(input ? input.value : "") : { label: "Waiting for input", state: "" });
    };

    Workbench.prototype.setStats = function (details, notes, state) {
      var feedback = this.form.querySelector("[data-tool-feedback]");
      if (!feedback) {
        return;
      }
      var rows = details || [];
      var messages = notes || [];
      if (rows.length === 0 && messages.length === 0) {
        feedback.innerHTML = "";
        feedback.dataset.state = "";
        return;
      }
      var html = "";
      if (rows.length > 0) {
        html += "<dl class=\"feedback-grid\">";
        rows.forEach(function (row) {
          var value = row[1] == null ? "" : String(row[1]);
          var itemClass = value.length > 28 ? " class=\"is-long\"" : "";
          html += "<div" + itemClass + "><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(value) + "</dd></div>";
        });
        html += "</dl>";
      }
      if (messages.length > 0) {
        html += "<ul class=\"feedback-notes\">";
        messages.forEach(function (note) {
          html += "<li>" + escapeHtml(note) + "</li>";
        });
        html += "</ul>";
      }
      feedback.innerHTML = html;
      feedback.dataset.state = state || "";
    };

    Workbench.prototype.setPreview = function (title, bodyHtml) {
      var preview = this.form.querySelector("[data-tool-preview]");
      if (!preview) {
        return;
      }
      preview.innerHTML = title ? "<div class=\"preview-title\">" + escapeHtml(title) + "</div><div class=\"preview-body\">" + bodyHtml + "</div>" : "";
    };

    Workbench.prototype.setAdvanced = function (html) {
      var advanced = this.form.querySelector("[data-advanced-panel]");
      var target = this.form.querySelector("[data-tool-advanced]");
      if (!advanced || !target) {
        return;
      }
      var hasContent = Boolean(html);
      target.innerHTML = html || "";
      advanced.classList.toggle("has-content", hasContent);
      if (hasContent) {
        advanced.open = true;
        advanced.setAttribute("open", "");
      } else {
        advanced.open = false;
        advanced.removeAttribute("open");
      }
    };

    Workbench.prototype.clearPanels = function () {
      this.setStats([], [], "");
      this.setPreview("", "");
      this.setAdvanced("");
    };

    Workbench.prototype.markActiveAction = function (action) {
      this.form.dataset.activeAction = action;
      this.form.querySelectorAll("[data-action]").forEach(function (button) {
        var active = button.dataset.action === action;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    };

    Workbench.prototype.copy = function () {
      var output = this.form.querySelector("[data-tool-output]");
      var workbench = this;
      if (!output || !output.value) {
        this.setMessage("There is no output to copy yet.", "error");
        return;
      }
      copyText(output.value, function () {
        output.select();
        document.execCommand("copy");
      }).then(function () {
        workbench.setMessage("Copied result.", "success");
      });
    };

    Workbench.prototype.download = function () {
      var result = this.lastResult;
      var output = this.form.querySelector("[data-tool-output]");
      if (!result && (!output || !output.value)) {
        this.setMessage("There is no output to download yet.", "error");
        return;
      }
      var action = this.form.dataset.activeAction || this.form.dataset.capability || "result";
      downloadResult((this.plugin.filePrefix || "validohub-tool") + "-" + action, result, output ? output.value : "");
      this.setMessage("Downloaded result.", "success");
    };

    Workbench.prototype.clear = function () {
      this.file = null;
      this.lastResult = null;
      this.form.querySelectorAll("textarea[name], input[name]").forEach(function (field) {
        if (field.type === "checkbox") {
          field.checked = field.defaultChecked;
        } else if (field.type !== "file") {
          field.value = "";
        }
      });
      this.form.querySelectorAll("input[type=\"file\"]").forEach(function (field) {
        field.value = "";
      });
      this.form.querySelectorAll("select[name]").forEach(function (field) {
        field.selectedIndex = 0;
      });
      this.setOutput("");
      this.clearPanels();
      this.setMessage("", "");
      this.updateFileStatus(null);
      this.updateBadge();
    };

    Workbench.prototype.updateFileStatus = function (file) {
      var status = this.form.querySelector("[data-file-status]");
      if (!status) {
        return;
      }
      status.textContent = file
          ? file.name + " - " + formatBytes(file.bytes.length) + (file.type ? " - " + file.type : "")
          : "No upload. File bytes stay in this browser.";
    };

    function helper(name) {
      if (!helpers[name]) {
        throw new Error("Missing ValidoHub workbench helper: " + name);
      }
      return helpers[name];
    }

    function copyText(value, fallback) {
      return helper("copyText")(value, fallback);
    }

    function downloadResult(baseName, result, fallbackText) {
      return helper("downloadResult")(baseName, result, fallbackText);
    }

    function utf8Bytes(value) {
      return helper("utf8Bytes")(value);
    }

    function utf8Text(bytes) {
      return helper("utf8Text")(bytes);
    }

    function formatBytes(count) {
      return helper("formatBytes")(count);
    }

    function formatRatio(inputBytes, outputChars) {
      return helper("formatRatio")(inputBytes, outputChars);
    }

    function hexPreview(bytes) {
      return helper("hexPreview")(bytes);
    }

    function hexSection(bytes, title) {
      return helper("hexSection")(bytes, title);
    }

    function escapeHtml(value) {
      return helper("escapeHtml")(value);
    }

    function debounce(callback, delay) {
      return helper("debounce")(callback, delay);
    }

    var mountScheduled = false;

    function scheduleMount() {
      if (mountScheduled) {
        return;
      }
      mountScheduled = true;
      window.setTimeout(function () {
        mountScheduled = false;
        mountAll();
      }, 0);
    }

    return {
      registerPlugin: registerPlugin,
      mountAll: mountAll,
      plugins: plugins,
      utilities: {
        debounce: debounce,
        escapeHtml: escapeHtml,
        formatBytes: formatBytes,
        formatRatio: formatRatio,
        hexPreview: hexPreview,
        hexSection: hexSection,
        utf8Bytes: utf8Bytes,
        utf8Text: utf8Text
      }
    };
  })();

  window.ValidoWorkbench = ValidoWorkbench;
})();
