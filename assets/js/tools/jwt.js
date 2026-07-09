(function () {
  var JWT_ALGORITHM = "validohub.jwt-decoder";
  var KNOWN_ALGORITHMS = [
    "HS256", "HS384", "HS512",
    "RS256", "RS384", "RS512",
    "ES256", "ES384", "ES512",
    "PS256", "PS384", "PS512",
    "EdDSA", "none"
  ];

  var JwtPlugin = (function (framework) {
    var util = framework.utilities;

    function onMount(workbench) {
      workbench.form._workbench = workbench;
      workbench.form.classList.add("jwt-workbench");
      ensureActionButtons(workbench);
      insertSamples(workbench);
      bindJwtInteractions(workbench);
      workbench.markActiveAction("decode");
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
        ["decode", "Decode"],
        ["validate", "Validate"],
        ["inspect", "Inspect"],
        ["analyze", "Analyze"]
      ].forEach(function (action) {
        var button = existing[action[0]];
        if (!button) {
          if (action[0] === "inspect" && existing.parse) {
            button = existing.parse;
            button.dataset.action = "inspect";
          } else if (action[0] === "analyze" && existing.explain) {
            button = existing.explain;
            button.dataset.action = "analyze";
          }
        }
        if (!button) {
          button = document.createElement("button");
          button.type = "button";
          button.dataset.action = action[0];
          row.insertBefore(button, row.querySelector("[data-tool-copy]"));
        }
        button.className = action[0] === "decode" ? "button button-primary" : "button button-secondary";
        button.textContent = action[1];
      });
    }

    function insertSamples(workbench) {
      if (workbench.form.querySelector("[data-sample]")) {
        return;
      }
      var row = document.createElement("div");
      row.className = "sample-row";
      row.setAttribute("aria-label", "JWT examples");
      [
        ["jwt-valid", "Valid sample"],
        ["jwt-expired", "Expired"],
        ["jwt-unsigned", "Unsigned"],
        ["jwt-malformed", "Malformed"]
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

    function bindJwtInteractions(workbench) {
      if (workbench.form.dataset.jwtInteractionsBound === "true") {
        return;
      }
      workbench.form.dataset.jwtInteractionsBound = "true";
      var debouncedSearch = util.debounce(function () {
        runPayloadSearch(workbench, "first");
      }, 120);
      workbench.form.addEventListener("click", function (event) {
        var copy = event.target.closest("[data-jwt-copy]");
        if (copy) {
          copyJwtSection(workbench, copy.dataset.jwtCopy);
          return;
        }
        var download = event.target.closest("[data-jwt-download]");
        if (download) {
          downloadJwtSection(workbench, download.dataset.jwtDownload);
          return;
        }
        var action = event.target.closest("[data-jwt-tree-action]");
        if (action) {
          handlePayloadTreeAction(workbench, action.dataset.jwtTreeAction);
          return;
        }
        var node = event.target.closest("[data-jwt-node]");
        if (node) {
          selectPayloadNode(workbench, node.dataset.jwtPointer);
        }
      });
      workbench.form.addEventListener("input", function (event) {
        if (event.target.matches("[data-jwt-search]")) {
          debouncedSearch();
        }
      });
      workbench.form.addEventListener("keydown", function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
          var search = workbench.form.querySelector("[data-jwt-search]");
          if (search) {
            event.preventDefault();
            search.focus();
            search.select();
          }
        }
        if (event.target.matches("[data-jwt-search]") && event.key === "Enter") {
          event.preventDefault();
          runPayloadSearch(workbench, event.shiftKey ? "previous" : "next");
        }
      });
    }

    function run(workbench, action, options) {
      var token = tokenInput(workbench);
      var quiet = options && options.quiet;
      if (!token.trim()) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(quiet ? "" : "Paste a JWT to decode.", quiet ? "" : "error");
        workbench.lastResult = null;
        workbench._jwt = null;
        return;
      }
      var parsed = parseJwt(token);
      if (!parsed.valid) {
        showInvalid(workbench, token, parsed);
        return;
      }
      if (action === "validate") {
        showValidation(workbench, parsed);
        return;
      }
      if (action === "inspect" || action === "parse") {
        showInspect(workbench, parsed);
        return;
      }
      if (action === "analyze" || action === "explain") {
        showAnalysis(workbench, parsed);
        return;
      }
      showDecoded(workbench, parsed);
    }

    function showDecoded(workbench, parsed) {
      var decoded = decodedJson(parsed);
      workbench._jwt = parsed;
      workbench.setOutput(JSON.stringify(decoded, null, 2));
      workbench.setMessage("Decoded JWT locally in your browser.", parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats(parsed), parsed.health.messages, parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setPreview("JWT workbench", jwtPreview(parsed));
      workbench.setAdvanced(analysisPanel(parsed));
      workbench.lastResult = textResult(JSON.stringify(decoded, null, 2), "jwt-decoded", "json");
      schedulePayloadInit(workbench);
    }

    function showValidation(workbench, parsed) {
      var lines = ["JWT validation", ""].concat(parsed.health.messages.map(function (message) {
        return "- " + message;
      }));
      workbench._jwt = parsed;
      workbench.setOutput(lines.join("\n"));
      workbench.setMessage(parsed.health.errors.length > 0 ? "JWT has structural errors." : "JWT structure is readable.", parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats(parsed), parsed.health.messages, parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setPreview("JWT workbench", jwtPreview(parsed));
      workbench.setAdvanced(analysisPanel(parsed));
      workbench.lastResult = textResult(lines.join("\n"), "jwt-validation", "txt");
      schedulePayloadInit(workbench);
    }

    function showInspect(workbench, parsed) {
      var report = [
        "JWT inspection",
        "Algorithm: " + display(parsed.header.alg),
        "Type: " + display(parsed.header.typ),
        "Header keys: " + Object.keys(parsed.header).join(", "),
        "Payload claims: " + Object.keys(parsed.payload).join(", "),
        "Signature: " + (parsed.signature ? parsed.signature.length + " characters" : "missing")
      ].join("\n");
      workbench._jwt = parsed;
      workbench.setOutput(report);
      workbench.setMessage("Inspected JWT sections.", parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats(parsed), parsed.health.messages, parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setPreview("JWT workbench", jwtPreview(parsed));
      workbench.setAdvanced(analysisPanel(parsed));
      workbench.lastResult = textResult(report, "jwt-inspection", "txt");
      schedulePayloadInit(workbench);
    }

    function showAnalysis(workbench, parsed) {
      var lines = ["JWT analysis"];
      analysisRows(parsed).forEach(function (row) {
        lines.push(row[0] + ": " + row[1]);
      });
      lines.push("");
      lines.push("Health:");
      parsed.health.messages.forEach(function (message) {
        lines.push("- " + message);
      });
      workbench._jwt = parsed;
      workbench.setOutput(lines.join("\n"));
      workbench.setMessage("Analyzed JWT claims and health.", parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats(parsed), parsed.health.messages, parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setPreview("JWT workbench", jwtPreview(parsed));
      workbench.setAdvanced(analysisPanel(parsed));
      workbench.lastResult = textResult(lines.join("\n"), "jwt-analysis", "txt");
      schedulePayloadInit(workbench);
    }

    function showInvalid(workbench, token, parsed) {
      workbench._jwt = null;
      workbench.setOutput("Invalid JWT\n" + parsed.errors.join("\n"));
      workbench.setMessage("Invalid JWT: " + parsed.errors[0], "error");
      workbench.setStats([
        ["Token sections", String(token.split(".").length)],
        ["Input characters", String(token.length)],
        ["Malformed section", parsed.section || "token"]
      ], parsed.repairs, "error");
      workbench.setPreview("Malformed token", invalidPreview(token, parsed));
      workbench.setAdvanced("<div class=\"preview-title\">Repair suggestions</div><ul class=\"feedback-notes\">" + parsed.repairs.map(function (repair) {
        return "<li>" + util.escapeHtml(repair) + "</li>";
      }).join("") + "</ul>");
      workbench.lastResult = textResult(workbench.outputValue(), "jwt-error", "txt");
    }

    function parseJwt(token) {
      var compact = token.trim();
      var parts = compact.split(".");
      if (parts.length !== 3) {
        return invalidJwt("token", ["JWT compact tokens must contain exactly three dot-separated sections."], ["Use header.payload.signature format.", "Unsigned JWTs still include the trailing dot for an empty signature."]);
      }
      if (!parts[0]) {
        return invalidJwt("header", ["Header section is empty."], ["Provide a Base64URL-encoded JSON header."]);
      }
      if (!parts[1]) {
        return invalidJwt("payload", ["Payload section is empty."], ["Provide a Base64URL-encoded JSON payload."]);
      }
      var header = decodeJsonSection(parts[0], "header");
      if (!header.valid) {
        return header;
      }
      var payload = decodeJsonSection(parts[1], "payload");
      if (!payload.valid) {
        return payload;
      }
      var parsed = {
        valid: true,
        token: compact,
        parts: parts,
        header: header.value,
        payload: payload.value,
        signature: parts[2],
        headerJson: JSON.stringify(header.value, null, 2),
        payloadJson: JSON.stringify(payload.value, null, 2)
      };
      parsed.health = health(parsed);
      return parsed;
    }

    function decodeJsonSection(section, name) {
      var decoded = decodeBase64Url(section, name);
      if (!decoded.valid) {
        return decoded;
      }
      try {
        return { valid: true, value: JSON.parse(decoded.text) };
      } catch (error) {
        return invalidJwt(name, [title(name) + " decoded, but is not valid JSON: " + error.message], ["Check that the " + name + " section is JSON before Base64URL encoding.", "Use double quotes around JSON object keys and string values."]);
      }
    }

    function decodeBase64Url(section, name) {
      if (!/^[A-Za-z0-9_-]*$/.test(section)) {
        return invalidJwt(name, [title(name) + " contains characters outside the Base64URL alphabet."], ["Use only A-Z, a-z, 0-9, hyphen, and underscore in JWT sections.", "Do not use standard Base64 plus or slash characters in JWT compact serialization."]);
      }
      if (section.length % 4 === 1) {
        return invalidJwt(name, [title(name) + " has an invalid Base64URL length."], ["Check for missing or extra characters in the " + name + " section."]);
      }
      try {
        var normalized = section.replace(/-/g, "+").replace(/_/g, "/");
        normalized += "=".repeat((4 - normalized.length % 4) % 4);
        var binary = window.atob(normalized);
        var bytes = new Uint8Array(binary.length);
        for (var index = 0; index < binary.length; index++) {
          bytes[index] = binary.charCodeAt(index);
        }
        return { valid: true, text: util.utf8Text(bytes) };
      } catch (error) {
        return invalidJwt(name, [title(name) + " could not be decoded as UTF-8 Base64URL."], ["Check that the " + name + " section was encoded with Base64URL.", "JWT header and payload sections must decode to UTF-8 JSON."]);
      }
    }

    function invalidJwt(section, errors, repairs) {
      return {
        valid: false,
        section: section,
        errors: errors,
        repairs: repairs
      };
    }

    function health(parsed) {
      var now = Math.floor(Date.now() / 1000);
      var alg = parsed.header.alg;
      var messages = ["Valid structure: header and payload decoded as JSON."];
      var warnings = [];
      var errors = [];
      var badges = [{ label: "Valid structure", state: "success" }];
      if (!parsed.signature) {
        warnings.push("Missing signature.");
        messages.push("Missing signature: the signature section is empty.");
        badges.push({ label: "Missing signature", state: "warning" });
      }
      if (!alg || alg === "none") {
        warnings.push("Weak algorithm.");
        messages.push("Weak algorithm: " + (alg || "missing") + ".");
        badges.push({ label: "Weak algorithm", state: "warning" });
      }
      if (alg && KNOWN_ALGORITHMS.indexOf(alg) === -1) {
        warnings.push("Unknown algorithm.");
        messages.push("Unknown algorithm: " + alg + ".");
        badges.push({ label: "Unknown algorithm", state: "warning" });
      }
      if (typeof parsed.payload.exp === "number") {
        if (parsed.payload.exp <= now) {
          warnings.push("Expired.");
          messages.push("Expired: " + relativeTime(parsed.payload.exp, now) + ".");
          badges.push({ label: "Expired", state: "error" });
        } else {
          messages.push("Expiration: " + relativeTime(parsed.payload.exp, now) + ".");
        }
      }
      if (typeof parsed.payload.nbf === "number" && parsed.payload.nbf > now) {
        warnings.push("Not yet valid.");
        messages.push("Not yet valid: " + relativeTime(parsed.payload.nbf, now) + ".");
        badges.push({ label: "Not yet valid", state: "warning" });
      }
      if (warnings.length === 0) {
        messages.push("No structural health warnings detected. Signature trust is not verified in Version 1.");
      } else {
        messages.push("Signature trust is not verified in Version 1.");
      }
      return {
        messages: messages,
        warnings: warnings,
        errors: errors,
        badges: badges
      };
    }

    function stats(parsed) {
      return [
        ["Algorithm", display(parsed.header.alg)],
        ["Issuer", display(parsed.payload.iss)],
        ["Audience", displayAudience(parsed.payload.aud)],
        ["Subject", display(parsed.payload.sub)],
        ["JWT ID", display(parsed.payload.jti)],
        ["Issued At", timeClaim(parsed.payload.iat)],
        ["Not Before", timeClaim(parsed.payload.nbf)],
        ["Expiration", timeClaim(parsed.payload.exp)],
        ["Signature", parsed.signature ? parsed.signature.length + " characters" : "Missing"]
      ];
    }

    function analysisRows(parsed) {
      return stats(parsed).concat([
        ["Header size", parsed.parts[0].length + " characters"],
        ["Payload size", parsed.parts[1].length + " characters"],
        ["Token size", parsed.token.length + " characters"],
        ["Claims", String(Object.keys(parsed.payload).length)]
      ]);
    }

    function jwtPreview(parsed) {
      return "<div class=\"jwt-workspace\">"
          + healthBadges(parsed)
          + "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Raw token</span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"token\">Copy</button></div><pre class=\"jwt-raw\"><code>" + tokenMarkup(parsed) + "</code></pre></section>"
          + sectionCard("Header", "header", parsed.headerJson, "header")
          + payloadCard(parsed)
          + signatureCard(parsed)
          + decodedCard(parsed)
          + "</div>";
    }

    function healthBadges(parsed) {
      return "<div class=\"jwt-badges\">" + parsed.health.badges.map(function (badge) {
        return "<span class=\"jwt-badge\" data-state=\"" + badge.state + "\">" + util.escapeHtml(badge.label) + "</span>";
      }).join("") + "</div>";
    }

    function sectionCard(titleText, key, json, copyKey) {
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>" + titleText + "</span><span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"" + copyKey + "\">Copy</button><button type=\"button\" class=\"json-tool-button\" data-jwt-download=\"" + copyKey + "\">Download</button></span></div><pre class=\"json-code\"><code>" + highlightJson(json) + "</code></pre></section>";
    }

    function payloadCard(parsed) {
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Payload</span><span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"payload\">Copy</button><button type=\"button\" class=\"json-tool-button\" data-jwt-download=\"payload\">Download</button></span></div>"
          + "<pre class=\"json-code\"><code>" + highlightJson(parsed.payloadJson) + "</code></pre>"
          + payloadExplorer(parsed.payload)
          + "</section>";
    }

    function signatureCard(parsed) {
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Signature</span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"signature\">Copy</button></div><pre class=\"jwt-signature\"><code>" + util.escapeHtml(parsed.signature || "Missing signature") + "</code></pre></section>";
    }

    function decodedCard(parsed) {
      var decoded = JSON.stringify(decodedJson(parsed), null, 2);
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Decoded JSON</span><span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"decoded\">Copy</button><button type=\"button\" class=\"json-tool-button\" data-jwt-download=\"decoded\">Download</button></span></div><pre class=\"json-code\"><code>" + highlightJson(decoded) + "</code></pre></section>";
    }

    function analysisPanel(parsed) {
      return "<div class=\"json-analysis-grid\"><section><div class=\"preview-title\">Token analysis</div><dl class=\"feedback-grid\">"
          + analysisRows(parsed).map(function (row) {
            return "<div><dt>" + util.escapeHtml(row[0]) + "</dt><dd>" + util.escapeHtml(row[1]) + "</dd></div>";
          }).join("")
          + "</dl></section><section><div class=\"preview-title\">Token health</div><ul class=\"feedback-notes\">"
          + parsed.health.messages.map(function (message) {
            return "<li>" + util.escapeHtml(message) + "</li>";
          }).join("")
          + "</ul></section></div>";
    }

    function payloadExplorer(payload) {
      var state = { rendered: 0, limit: 900, capped: false };
      var tree = treeNode(payload, "payload", "", "$", 0, state);
      return "<div class=\"jwt-payload-explorer\" data-jwt-payload-explorer>"
          + "<div class=\"json-explorer-toolbar\"><button type=\"button\" class=\"json-tool-button\" data-jwt-tree-action=\"expand-all\">Expand all</button><button type=\"button\" class=\"json-tool-button\" data-jwt-tree-action=\"collapse-all\">Collapse all</button><button type=\"button\" class=\"json-tool-button\" data-jwt-tree-action=\"clear-search\">Clear search</button><label class=\"json-search-label\"><span>Search</span><input type=\"search\" data-jwt-search placeholder=\"Claims or values\" autocomplete=\"off\"></label><button type=\"button\" class=\"json-tool-button\" data-jwt-tree-action=\"previous-match\">Previous</button><button type=\"button\" class=\"json-tool-button\" data-jwt-tree-action=\"next-match\">Next</button></div>"
          + "<div class=\"json-tree-meta\"><span data-jwt-search-count>No search</span><span>" + countNodes(payload) + " payload nodes</span></div>"
          + "<div class=\"json-tree-shell\"><div class=\"json-tree\" data-jwt-tree>" + tree + (state.capped ? "<div class=\"json-tree-more\">Payload tree capped for responsiveness.</div>" : "") + "</div></div>"
          + "<div class=\"json-node-inspector\" data-jwt-node-details><strong>Select a payload node</strong><span>Click a row to inspect its JSONPath.</span></div>"
          + "</div>";
    }

    function treeNode(value, label, pointer, jsonPath, depth, state) {
      if (state.rendered >= state.limit) {
        state.capped = true;
        return "";
      }
      state.rendered++;
      var type = rootType(value);
      var container = type === "array" || type === "object";
      var icon = type === "object" ? "{}" : type === "array" ? "[]" : "v";
      var row = "<button type=\"button\" class=\"json-node-row\" data-jwt-node data-jwt-pointer=\"" + attr(pointer) + "\" data-jwt-path=\"" + attr(jsonPath) + "\" style=\"--json-depth:" + depth + "\"><span class=\"json-node-icon\">" + icon + "</span><span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span><span class=\"json-tree-type\">" + typeLabel(value) + "</span>" + (!container ? "<code class=\"json-node-value\">" + util.escapeHtml(shortValue(value)) + "</code>" : "") + "<span class=\"json-node-path\">" + util.escapeHtml(jsonPath) + "</span></button>";
      if (!container) {
        return "<div class=\"json-tree-leaf\">" + row + "</div>";
      }
      var keys = Array.isArray(value) ? value.map(function (_, index) { return String(index); }) : Object.keys(value);
      var children = keys.slice(0, 120).map(function (key) {
        var child = Array.isArray(value) ? value[Number(key)] : value[key];
        return treeNode(child, key, pointer + "/" + escapePointer(key), Array.isArray(value) ? jsonPath + "[" + key + "]" : jsonPath + pathSegment(key), depth + 1, state);
      }).join("");
      return "<details class=\"json-tree-branch\" open data-jwt-branch><summary>" + row + "<span class=\"json-child-count\">" + keys.length + "</span></summary>" + children + (keys.length > 120 ? "<div class=\"json-tree-more\">More children hidden for responsiveness.</div>" : "") + "</details>";
    }

    function schedulePayloadInit(workbench) {
      window.setTimeout(function () {
        selectPayloadNode(workbench, "");
      }, 0);
    }

    function handlePayloadTreeAction(workbench, action) {
      var explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer) {
        return;
      }
      if (action === "expand-all" || action === "collapse-all") {
        explorer.querySelectorAll("details[data-jwt-branch]").forEach(function (details) {
          details.open = action === "expand-all";
        });
        return;
      }
      if (action === "clear-search") {
        var field = explorer.querySelector("[data-jwt-search]");
        if (field) {
          field.value = "";
        }
        clearPayloadSearch(explorer);
        setSearchCount(explorer, "No search");
        return;
      }
      runPayloadSearch(workbench, action === "previous-match" ? "previous" : "next");
    }

    function runPayloadSearch(workbench, direction) {
      var explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer) {
        return;
      }
      var field = explorer.querySelector("[data-jwt-search]");
      var query = field ? field.value.trim().toLowerCase() : "";
      clearPayloadSearch(explorer);
      if (!query) {
        setSearchCount(explorer, "No search");
        return;
      }
      var matches = Array.from(explorer.querySelectorAll("[data-jwt-node]")).filter(function (node) {
        return (node.textContent || "").toLowerCase().indexOf(query) !== -1;
      });
      matches.forEach(function (node) {
        node.classList.add("is-match");
        openParents(node);
      });
      if (matches.length === 0) {
        setSearchCount(explorer, "0 matches");
        return;
      }
      var index = Number(explorer.dataset.matchIndex || "-1");
      index = direction === "previous" ? (index <= 0 ? matches.length - 1 : index - 1) : (index >= matches.length - 1 ? 0 : index + 1);
      if (direction === "first") {
        index = 0;
      }
      explorer.dataset.matchIndex = String(index);
      matches[index].classList.add("is-current-match");
      matches[index].scrollIntoView({ block: "nearest" });
      selectPayloadNode(workbench, matches[index].dataset.jwtPointer);
      setSearchCount(explorer, (index + 1) + " of " + matches.length + " matches");
    }

    function clearPayloadSearch(explorer) {
      explorer.querySelectorAll(".is-match, .is-current-match").forEach(function (node) {
        node.classList.remove("is-match", "is-current-match");
      });
      explorer.dataset.matchIndex = "-1";
    }

    function setSearchCount(explorer, text) {
      var target = explorer.querySelector("[data-jwt-search-count]");
      if (target) {
        target.textContent = text;
      }
    }

    function selectPayloadNode(workbench, pointer) {
      if (!workbench._jwt) {
        return;
      }
      var explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer) {
        return;
      }
      explorer.querySelectorAll("[data-jwt-node].is-selected").forEach(function (node) {
        node.classList.remove("is-selected");
      });
      var node = explorer.querySelector("[data-jwt-node][data-jwt-pointer=\"" + cssEscape(pointer) + "\"]");
      if (node) {
        node.classList.add("is-selected");
        openParents(node);
      }
      var value = resolvePointer(workbench._jwt.payload, pointer);
      var details = explorer.querySelector("[data-jwt-node-details]");
      if (details) {
        details.innerHTML = "<div><strong>" + util.escapeHtml(pointer ? unescapePointer(pointer.split('/').pop()) : "payload") + "</strong><code>" + util.escapeHtml(jsonPathFromPointer(pointer)) + "</code></div><dl class=\"json-node-stats\"><div><dt>Type</dt><dd>" + util.escapeHtml(title(rootType(value))) + "</dd></div><div><dt>Children</dt><dd>" + childCount(value) + "</dd></div><div><dt>Subtree size</dt><dd>" + countNodes(value) + "</dd></div></dl>";
      }
    }

    function copyJwtSection(workbench, key) {
      if (!workbench._jwt) {
        workbench.setMessage("Decode a JWT before copying sections.", "error");
        return;
      }
      var text = sectionText(workbench._jwt, key);
      copyText(text).then(function () {
        workbench.setMessage("Copied " + key + ".", "success");
      }).catch(function () {
        workbench.setMessage("Could not copy " + key + ".", "error");
      });
    }

    function downloadJwtSection(workbench, key) {
      if (!workbench._jwt) {
        workbench.setMessage("Decode a JWT before downloading sections.", "error");
        return;
      }
      downloadText("validohub-jwt-" + key + ".json", sectionText(workbench._jwt, key), "application/json;charset=utf-8");
      workbench.setMessage("Downloaded " + key + ".", "success");
    }

    function sectionText(parsed, key) {
      if (key === "header") {
        return parsed.headerJson;
      }
      if (key === "payload" || key === "claims") {
        return parsed.payloadJson;
      }
      if (key === "signature") {
        return parsed.signature || "";
      }
      if (key === "token") {
        return parsed.token;
      }
      return JSON.stringify(decodedJson(parsed), null, 2);
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

    function downloadText(filename, text, mime) {
      var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }

    function applySample(workbench, sampleId) {
      var input = workbench.primaryInput();
      if (!input) {
        return;
      }
      input.value = samples()[sampleId] || samples()["jwt-valid"];
      workbench.markActiveAction(sampleId === "jwt-malformed" ? "validate" : "decode");
      workbench.run(workbench.form.dataset.activeAction);
    }

    function samples() {
      return {
        "jwt-valid": makeToken({ alg: "HS256", typ: "JWT" }, { iss: "https://auth.validohub.com", sub: "user_123", aud: ["validohub", "api"], exp: 4102444800, nbf: 1700000000, iat: 1700000000, jti: "jwt_demo_001", roles: ["admin", "editor"] }, "demo-signature"),
        "jwt-expired": makeToken({ alg: "RS256", typ: "JWT" }, { iss: "https://auth.example.com", sub: "user_456", aud: "example-api", exp: 1600000000, iat: 1599996400, jti: "expired_demo" }, "expired-signature"),
        "jwt-unsigned": makeToken({ alg: "none", typ: "JWT" }, { iss: "local-demo", sub: "anonymous", exp: 4102444800, iat: 1700000000 }, ""),
        "jwt-malformed": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.not-valid-json.signature"
      };
    }

    function makeToken(header, payload, signature) {
      return encodeJson(header) + "." + encodeJson(payload) + "." + base64Url(signature);
    }

    function encodeJson(value) {
      return base64Url(JSON.stringify(value));
    }

    function base64Url(value) {
      var bytes = util.utf8Bytes(value);
      var binary = "";
      bytes.forEach(function (byte) {
        binary += String.fromCharCode(byte);
      });
      return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
    }

    function detectInputMode(value) {
      var token = (value || "").trim();
      if (!token) {
        return { label: "Waiting for input", state: "" };
      }
      var parts = token.split(".");
      if (parts.length !== 3) {
        return { label: "Invalid JWT", state: "invalid" };
      }
      if (!parts[2]) {
        return { label: "Unsigned JWT", state: "warning" };
      }
      return { label: "Looks like JWT", state: "json" };
    }

    function tokenInput(workbench) {
      var values = workbench.values();
      return values.token || values.input || "";
    }

    function decodedJson(parsed) {
      return {
        header: parsed.header,
        payload: parsed.payload,
        signature: parsed.signature
      };
    }

    function invalidPreview(token, parsed) {
      var parts = token.split(".");
      var labels = ["header", "payload", "signature"];
      return "<div class=\"jwt-token-parts\">" + parts.map(function (part, index) {
        var name = labels[index] || "extra";
        var bad = parsed.section === name || parsed.section === "token";
        return "<div class=\"jwt-token-part" + (bad ? " is-invalid" : "") + "\"><strong>" + util.escapeHtml(name) + "</strong><code>" + util.escapeHtml(part || "(empty)") + "</code></div>";
      }).join("") + "</div>";
    }

    function tokenMarkup(parsed) {
      return "<span class=\"jwt-token-header\">" + util.escapeHtml(parsed.parts[0]) + "</span>.<span class=\"jwt-token-payload\">" + util.escapeHtml(parsed.parts[1]) + "</span>.<span class=\"jwt-token-signature\">" + util.escapeHtml(parsed.parts[2] || "") + "</span>";
    }

    function highlightJson(json) {
      return json.replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|[{}\[\]:,]/g, function (match, string, colon, literal) {
        if (string) {
          if (colon) {
            return "<span class=\"json-key\">" + util.escapeHtml(string) + "</span>" + util.escapeHtml(colon.slice(0, -1)) + "<span class=\"json-punctuation\">:</span>";
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

    function timeClaim(value) {
      if (typeof value !== "number") {
        return display(value);
      }
      var date = new Date(value * 1000);
      return date.toISOString() + " (" + relativeTime(value, Math.floor(Date.now() / 1000)) + ")";
    }

    function relativeTime(timestamp, now) {
      var diff = timestamp - now;
      var abs = Math.abs(diff);
      var unit = "second";
      var count = abs;
      if (abs >= 86400) {
        unit = "day";
        count = Math.round(abs / 86400);
      } else if (abs >= 3600) {
        unit = "hour";
        count = Math.round(abs / 3600);
      } else if (abs >= 60) {
        unit = "minute";
        count = Math.round(abs / 60);
      }
      var text = count + " " + unit + (count === 1 ? "" : "s");
      return diff >= 0 ? "in " + text : text + " ago";
    }

    function display(value) {
      if (value == null || value === "") {
        return "Not present";
      }
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      return String(value);
    }

    function displayAudience(value) {
      return Array.isArray(value) ? value.join(", ") : display(value);
    }

    function title(value) {
      return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

    function titleType(value) {
      return title(rootType(value));
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

    function typeLabel(value) {
      if (Array.isArray(value)) {
        return "Array[" + value.length + "]";
      }
      if (value && typeof value === "object") {
        return "Object{" + Object.keys(value).length + "}";
      }
      return titleType(value);
    }

    function shortValue(value) {
      if (typeof value === "string") {
        return JSON.stringify(value.length > 64 ? value.slice(0, 64) + "..." : value);
      }
      return JSON.stringify(value);
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

    function countNodes(value) {
      var count = 1;
      if (Array.isArray(value)) {
        value.forEach(function (item) {
          count += countNodes(item);
        });
      } else if (value && typeof value === "object") {
        Object.keys(value).forEach(function (key) {
          count += countNodes(value[key]);
        });
      }
      return count;
    }

    function resolvePointer(value, pointer) {
      if (!pointer) {
        return value;
      }
      return pointer.split("/").slice(1).reduce(function (current, segment) {
        return current == null ? undefined : current[unescapePointer(segment)];
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
      return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
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

    function openParents(node) {
      var parent = node.parentElement;
      while (parent) {
        if (parent.matches && parent.matches("details")) {
          parent.open = true;
        }
        parent = parent.parentElement;
      }
    }

    function textResult(value, baseName, extension) {
      return {
        type: "text",
        text: value,
        extension: extension || "txt",
        mime: extension === "json" ? "application/json;charset=utf-8" : "text/plain;charset=utf-8",
        sourceName: baseName
      };
    }

    return {
      filePrefix: "validohub-jwt",
      onMount: onMount,
      run: run,
      applySample: applySample,
      detectInputMode: detectInputMode
    };
  })(window.ValidoWorkbench);

  window.ValidoWorkbench.registerPlugin(JWT_ALGORITHM, JwtPlugin);
})();
