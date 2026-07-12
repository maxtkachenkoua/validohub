(function () {
  const URL_ENCODER_ALGORITHM = "validohub.url-encoder";
  const URL_DECODER_ALGORITHM = "validohub.url-decoder";

  const UrlPlugin = (function (framework) {
    const util = framework.utilities;
    const RESERVED = ":/?#[]@!$&'()*+,;=";
    const UNRESERVED = /^[A-Za-z0-9._~-]$/;

    const copyToClipboard = function (text, workbench, message) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => workbench.setMessage(message, 'success'))
          .catch(() => workbench.setMessage('Copy failed.', 'error'));
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        workbench.setMessage(message, 'success');
      }
    };

    function applySample(workbench, sampleId) {
      const input = workbench.primaryInput();
      if (!input) return;

      if (sampleId === "url-hello") {
        input.value = "Hello World!";
      } else if (sampleId === "url-unicode") {
        input.value = "Café こんにちは 👋";
      } else if (sampleId === "url-encoded") {
        input.value = "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%2520world";
      } else if (sampleId === "url-malformed") {
        input.value = "hello%2 world%ZZ";
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function validatePercentEncoding(input) {
      const diagnostics = [];
      const invalidSequences = collectInvalidSequences(input);
      invalidSequences.forEach(item => {
        diagnostics.push(`Invalid percent sequence '${item.sequence}' at position ${item.position}.`);
      });
      return {
        valid: diagnostics.length === 0,
        diagnostics: diagnostics,
        invalidSequences: invalidSequences
      };
    }

    function collectInvalidSequences(input) {
      const invalid = [];
      for (let index = 0; index < input.length; index++) {
        if (input.charAt(index) !== "%") {
          continue;
        }
        const sequence = invalidPercentSequence(input, index);
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
      const first = input.charAt(index + 1);
      const second = input.charAt(index + 2);
      if (/^[0-9A-Fa-f]$/.test(first) && !/^[0-9A-Fa-f]$/.test(second)) {
        return input.slice(index, index + 2);
      }
      return input.slice(index, index + 3);
    }

    function analyzeUrlEncoding(input, output, mode) {
      const encodedSide = mode === "encode" ? output : input;
      const decodedSide = mode === "encode" ? input : output;
      const details = baseDetails(input, output, mode);
      let warnings = [];
      const validation = validatePercentEncoding(input);
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
      details.push(["Encoded length", `${encodedSide.length} characters`]);
      details.push(["Decoded length", decodedSide ? `${Array.from(decodedSide).length} characters` : "n/a"]);
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
      return Array.from(value || "").filter(character => {
        return RESERVED.indexOf(character) !== -1;
      }).length;
    }

    function countUnsafe(value) {
      return Array.from(value || "").filter(character => {
        return !UNRESERVED.test(character);
      }).length;
    }

    function highlightInvalidSequences(input, invalidSequences) {
      if (invalidSequences.length === 0) {
        return `<pre><code>${util.escapeHtml(input)}</code></pre>`;
      }
      const invalidByPosition = {};
      invalidSequences.forEach(item => {
        invalidByPosition[item.position - 1] = item.sequence.length;
      });
      let html = "";
      for (let index = 0; index < input.length;) {
        if (invalidByPosition[index]) {
          const sequence = input.slice(index, index + invalidByPosition[index]);
          html += `<mark class="invalid-sequence" style="background:#fecaca; color:#dc2626; padding:2px 4px; border-radius:3px;">${util.escapeHtml(sequence)}</mark>`;
          index += invalidByPosition[index];
        } else {
          html += util.escapeHtml(input.charAt(index));
          index++;
        }
      }
      return `<pre><code>${html}</code></pre>`;
    }

    function getPercentEscapesExplanationHtml(inputStr, mode) {
      let encoded = "";
      if (mode === "encode") {
        encoded = encodeURIComponent(inputStr);
      } else {
        encoded = inputStr;
      }
      const matches = encoded.match(/%[0-9A-Fa-f]{2}/g) || [];
      if (matches.length === 0) return "";

      // Deduplicate matches
      const uniqueMatches = Array.from(new Set(matches)).slice(0, 8);

      let html = `
        <div class="pesel-section-title">
          <span>📖</span> URL Percent Mappings Explorer
        </div>
        <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">URL percent encoding maps non-ASCII/reserved bytes to hex representations.</p>
        <div class="pesel-debugger-table-container">
          <table class="pesel-dev-table" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th>Hex Code</th>
                <th>Character</th>
                <th>Unicode Code</th>
                <th>RFC 3986 Type</th>
              </tr>
            </thead>
            <tbody>
      `;

      uniqueMatches.forEach(hex => {
        try {
          const decodedChar = decodeURIComponent(hex);
          const code = decodedChar.charCodeAt(0);
          const isReserved = RESERVED.indexOf(decodedChar) !== -1;
          const typeStr = isReserved ? '<span style="color:#2f80ed; font-weight:700;">Reserved</span>' : '<span style="color:#8b5cf6; font-weight:700;">Unsafe / Data</span>';
          html += `
            <tr>
              <td style="font-family:monospace; font-weight:700; color:#10b981;">${hex}</td>
              <td style="font-weight:700; font-size:1rem; color:var(--text);">${decodedChar}</td>
              <td><code>U+${code.toString(16).toUpperCase().padStart(4, '0')}</code></td>
              <td>${typeStr}</td>
            </tr>
          `;
        } catch (e) {
          html += `
            <tr>
              <td style="font-family:monospace; font-weight:700; color:#dc2626;">${hex}</td>
              <td>n/a</td>
              <td>n/a</td>
              <td><span style="color:#dc2626;">Malformed Byte</span></td>
            </tr>
          `;
        }
      });

      html += `
            </tbody>
          </table>
        </div>
      `;
      return html;
    }

    function onMount(workbench) {
      workbench.form._workbench = workbench;

      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = "URL Encoder & Decoder";
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = "Percent-encode, decode, and validate URL parameters and paths locally inside your secure browser sandbox.";
        }

        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Shield</span>
            <span class="pesel-pill">📅 Standard RFC 3986</span>
            <span class="pesel-pill">⚡ Auto Encode & Decode</span>
          `;
          pageIntro.appendChild(badgeRow);
        }
      }

      // Hide defaults
      const headingText = workbench.form.querySelector('.workbench-heading');
      if (headingText) headingText.style.display = 'none';
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const copyBtn = workbench.form.querySelector('[data-tool-copy]');
      if (copyBtn) copyBtn.style.display = 'none';
      const downloadBtn = workbench.form.querySelector('[data-tool-download]');
      if (downloadBtn) downloadBtn.style.display = 'none';

      // Setup Presets and History
      const fieldGrid = workbench.form.querySelector('.field-grid');
      const inputField = workbench.primaryInput();
      if (fieldGrid && !workbench.form.querySelector('#pesel-presets')) {
        const mainField = fieldGrid.querySelector('label.field');
        if (mainField) {
          mainField.style.gridColumn = '1 / -1';
        }

        const presetsField = document.createElement('div');
        presetsField.className = 'field';
        presetsField.innerHTML = `
          <div style="height: 18px; display: flex; align-items: center;">
            <span style="font-size: 0.92rem; font-weight: 720; color: var(--text);">Presets</span>
          </div>
          <select class="pesel-select" id="pesel-presets" style="width: 100%; height: 42px; padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;">
            <option value="">-- Select Preset --</option>
            <option value="url-hello">Plain Text</option>
            <option value="url-unicode">Unicode String</option>
            <option value="url-encoded">Encoded URL Query</option>
            <option value="url-malformed">Malformed percent escapes</option>
          </select>
        `;

        const historyField = document.createElement('div');
        historyField.className = 'field';
        historyField.innerHTML = `
          <div style="height: 18px; display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span style="font-size: 0.92rem; font-weight: 720; color: var(--text);">History</span>
            <button type="button" class="button button-ghost compact" id="pesel-clear-history-btn" style="font-size: 0.72rem; padding: 0; border: none; background: none; margin: 0; cursor: pointer; height: auto; line-height: 1; color: var(--muted); font-weight: 600;">Clear</button>
          </div>
          <select class="pesel-select" id="pesel-history" style="width: 100%; height: 42px; padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;">
            <option value="">-- Recent URLs --</option>
          </select>
        `;

        fieldGrid.insertBefore(historyField, fieldGrid.firstChild);
        fieldGrid.insertBefore(presetsField, fieldGrid.firstChild);

        fieldGrid.querySelector('#pesel-presets').addEventListener('change', (e) => {
          const val = e.target.value;
          if (val) {
            applySample(workbench, val);
          }
        });

        fieldGrid.querySelector('#pesel-history').addEventListener('change', (e) => {
          const val = e.target.value;
          if (val) {
            if (inputField) {
              inputField.value = val;
              inputField.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        });

        fieldGrid.querySelector('#pesel-clear-history-btn').addEventListener('click', () => {
          localStorage.removeItem('validohub.url.history');
          const select = fieldGrid.querySelector('#pesel-history');
          select.innerHTML = '<option value="">-- Recent URLs --</option>';
          workbench.setMessage('Validation history cleared.', 'success');
        });
      }

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.url.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent URLs --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            const shortened = it.value.length > 20 ? it.value.substring(0, 18) + '...' : it.value;
            opt.textContent = `${shortened} (${it.mode} - ${it.date})`;
            historySelect.appendChild(opt);
          });
        }
      };
      refreshHistorySelect();

      // Add expand/collapse all triggers above documentation accordions
      const docHeader = document.querySelector('.content-card .section-heading');
      if (docHeader && !docHeader.parentNode.querySelector('.doc-controls-bar')) {
        const controlsBar = document.createElement('div');
        controlsBar.className = 'doc-controls-bar';
        controlsBar.style.display = 'flex';
        controlsBar.style.gap = '8px';
        controlsBar.style.marginBottom = '12px';
        controlsBar.innerHTML = `
          <button type="button" class="button button-secondary compact" id="pesel-expand-docs-btn" style="font-size: 0.75rem; padding: 4px 8px;">Expand All</button>
          <button type="button" class="button button-secondary compact" id="pesel-collapse-docs-btn" style="font-size: 0.75rem; padding: 4px 8px;">Collapse All</button>
        `;
        docHeader.after(controlsBar);

        controlsBar.querySelector('#pesel-expand-docs-btn').addEventListener('click', () => {
          document.querySelectorAll('.doc-accordion').forEach(acc => acc.open = true);
        });
        controlsBar.querySelector('#pesel-collapse-docs-btn').addEventListener('click', () => {
          document.querySelectorAll('.doc-accordion').forEach(acc => acc.open = false);
        });
      }

      // Setup unified premium panels list
      if (!workbench.form.querySelector('.pesel-premium-panel')) {
        const premiumPanel = document.createElement('div');
        premiumPanel.className = 'pesel-premium-panel';
        premiumPanel.innerHTML = `
          <div class="pesel-empty-state" id="pesel-empty-state-card">
            <span style="font-size: 2rem;">🛡️</span>
            <div class="pesel-empty-title">URL Encoding Sandbox</div>
            <div class="pesel-empty-desc">Enter raw string parameters or percent-encoded inputs above. Operations execute locally inside your secure browser sandbox.</div>
            <div class="pesel-trust-row">
              <span class="pesel-trust-badge">🔒 Local Execution</span>
              <span class="pesel-trust-badge">⚡ Zero Latency</span>
              <span class="pesel-trust-badge">✓ Privacy Shield</span>
            </div>
          </div>

          <div class="pesel-timeline-tracker" style="display: none;">
            <div class="pesel-timeline-line"></div>
            <div class="pesel-timeline-progress" id="pesel-progress-bar"></div>
            <div class="pesel-timeline-node" data-node="input">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Input</span>
            </div>
            <div class="pesel-timeline-node" data-node="percent">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Percent Code</span>
            </div>
            <div class="pesel-timeline-node" data-node="utf8">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">UTF-8</span>
            </div>
            <div class="pesel-timeline-node" data-node="complete">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Complete</span>
            </div>
          </div>

          <div class="pesel-results-container" style="display: none;"></div>
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>
          <div class="pesel-breakdown" id="url-escape-mappings" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      // Live-mode debounced validation logic trigger
      let debounceTimeout = null;
      if (inputField) {
        inputField.addEventListener('input', () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            const activeAction = workbench.form.dataset.activeAction || (workbench.form.dataset.capability === "url-decoder" ? "decode" : "encode");
            workbench.run(activeAction, { quiet: true });
          }, 250);
        });
      }

      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== inputField) {
          e.preventDefault();
          if (inputField) inputField.focus();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
          e.preventDefault();
          workbench.clear();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && workbench.lastResult) {
          e.preventDefault();
          copyToClipboard(workbench.outputValue(), workbench, 'Copied output value.');
        }
      });
    }

    const apiSnippets = {
      curl: `curl -X POST https://api.validohub.com/v1/url/encode \\\n  -H "Content-Type: application/json" \\\n  -d '{"input": "$INPUT$"}'`,
      javascript: `fetch("https://api.validohub.com/v1/url/encode", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ input: "$INPUT$" })\n})\n.then(res => res.json())\n.then(data => console.log(data));`,
      python: `import requests\n\nres = requests.post(\n    "https://api.validohub.com/v1/url/encode",\n    json={"input": "$INPUT$"}\n)\nprint(res.json())`,
      java: `import java.net.http.*;\nimport java.net.URI;\n\nvar client = HttpClient.newHttpClient();\nvar request = HttpRequest.newBuilder()\n    .uri(URI.create("https://api.validohub.com/v1/url/encode"))\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString("{\\"input\\": \\"$INPUT$\\"}"))\n    .build();\nvar response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());`,
      csharp: `using System.Net.Http;\nusing System.Text.Json;\n\nvar client = new HttpClient();\nvar content = new StringContent("{\\"input\\":\\"$INPUT$\\"}", System.Text.Encoding.UTF8, "application/json");\nvar response = await client.PostAsync("https://api.validohub.com/v1/url/encode", content);\nvar result = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(result);`,
      go: `package main\n\nimport (\n\t"bytes"\n\t"io/ioutil"\n\t"net/http"\n\t"fmt"\n)\n\nfunc main() {\n\tpayload := []byte(\`{"input": "$INPUT$"}\`)\n\tres, _ := http.Post("https://api.validohub.com/v1/url/encode", "application/json", bytes.NewBuffer(payload))\n\tdefer res.Body.Close()\n\tbody, _ := ioutil.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}`
    };

    function detectInputMode(value) {
      if (!value || !value.trim()) {
        return { label: "Waiting for input", state: "" };
      }
      const validation = validatePercentEncoding(value);
      if (!validation.valid) {
        return { label: "Malformed URL encoding", state: "invalid" };
      }
      if (/%[0-9A-Fa-f]{2}/.test(value)) {
        return { label: "Already encoded", state: "base64" };
      }
      return { label: "Plain text", state: "text" };
    }

    function run(workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.input || '';
      const inputVal = rawInput;

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const urlEscapeMappings = workbench.form.querySelector('#url-escape-mappings');
      const timelineTracker = workbench.form.querySelector('.pesel-timeline-tracker');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');
      const isDecodeMode = workbench.form.dataset.capability === "url-decoder" || action === "decode" || action === "validate";

      const startTime = performance.now();

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.url.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent URLs --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            const shortened = it.value.length > 20 ? it.value.substring(0, 18) + '...' : it.value;
            opt.textContent = `${shortened} (${it.mode} - ${it.date})`;
            historySelect.appendChild(opt);
          });
        }
      };

      const setTimelineStatus = (node, status) => {
        if (!timelineTracker) return;
        const el = timelineTracker.querySelector(`[data-node="${node}"]`);
        if (el) {
          el.className = `pesel-timeline-node ${status}`;
        }
      };

      if (!inputVal.trim()) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(options.quiet ? "" : "Please enter a URL parameter string.", options.quiet ? "" : "error");
        if (emptyStateCard) emptyStateCard.style.display = 'flex';
        if (timelineTracker) timelineTracker.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (urlEscapeMappings) urlEscapeMappings.style.display = 'none';
        return;
      }

      if (emptyStateCard) emptyStateCard.style.display = 'none';
      if (timelineTracker) timelineTracker.style.display = 'flex';

      setTimelineStatus('input', 'active');
      setTimelineStatus('percent', 'active');
      setTimelineStatus('utf8', 'active');
      setTimelineStatus('complete', 'active');

      const progressBar = timelineTracker.querySelector('#pesel-progress-bar');
      if (progressBar) progressBar.style.width = '100%';

      // Handle operations
      if (isDecodeMode) {
        // Decode / Validate
        const validation = validatePercentEncoding(inputVal);
        const elapsed = (performance.now() - startTime).toFixed(2);

        if (!validation.valid) {
          setTimelineStatus('percent', 'error');
          setTimelineStatus('complete', 'error');

          workbench.setOutput(`Invalid URL encoding:\n` + validation.diagnostics.join("\n"));
          workbench.setMessage("Invalid URL percent encoding.", "error");
          workbench.setStats([["URL State", "Invalid"], ["Invalid Sequences Count", String(validation.invalidSequences.length)]], validation.diagnostics, "error");
          workbench.setBadge({ label: "Error", state: "error" });

          if (resultsContainer) {
            resultsContainer.innerHTML = `
              <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
                <span>✗ Validation Failed: Malformed Percent Escapes</span>
                <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
              </div>
              <div class="pesel-results-grid reveal-element reveal-delay-1">
                <div class="pesel-result-row" style="grid-column:1 / -1;">
                  <span class="row-label">Invalid Highlighted Sequence</span>
                  <span class="row-value">${highlightInvalidSequences(inputVal, validation.invalidSequences)}</span>
                </div>
              </div>
            `;
            resultsContainer.style.display = 'flex';
          }

          if (customActions) customActions.style.display = 'none';
          if (urlEscapeMappings) urlEscapeMappings.style.display = 'none';
          return;
        }

        let decodedOutput = "";
        const warnings = [];
        try {
          decodedOutput = decodeURIComponent(inputVal);
        } catch (error) {
          warnings.push("Percent escapes are shaped correctly, but decoded bytes are not valid UTF-8.");
          decodedOutput = inputVal;
        }

        const historyItems = JSON.parse(localStorage.getItem('validohub.url.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, mode: 'decode', date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.url.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const analysis = analyzeUrlEncoding(inputVal, decodedOutput, "decode");
        workbench.setOutput(decodedOutput);
        workbench.setMessage("Decoded successfully.", warnings.concat(analysis.warnings).length > 0 ? "warning" : "success");
        workbench.setStats(analysis.details, warnings.concat(analysis.warnings), warnings.concat(analysis.warnings).length > 0 ? "warning" : "success");
        workbench.setBadge({ label: "Valid", state: "success" });

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
              <span>✓ Decoded URL Encoding</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Decoding time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Decoded Value</span>
                <span class="row-value" style="word-break:break-all; font-family:monospace;">${decodedOutput}</span>
                <button type="button" class="pesel-row-copy-btn" data-copy-val="${decodedOutput}">Copy</button>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Escape Sequence Count</span>
                <span class="row-value">${percentByteCount(inputVal)} escaped bytes</span>
              </div>
            </div>
          `;
          resultsContainer.querySelectorAll('[data-copy-val]').forEach(btn => {
            btn.addEventListener('click', () => {
              copyToClipboard(btn.dataset.copyVal, workbench, 'Copied value.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          });
          resultsContainer.style.display = 'flex';
        }

        if (customActions) {
          customActions.innerHTML = `
            <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy Result</button>
          `;
          customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
            copyToClipboard(decodedOutput, workbench, 'Copied decoded value.');
          });
          customActions.style.display = 'flex';
        }

        // Render visual mappings explorer
        if (urlEscapeMappings) {
          const mappingHtml = getPercentEscapesExplanationHtml(inputVal, "decode");
          if (mappingHtml) {
            urlEscapeMappings.innerHTML = mappingHtml;
            urlEscapeMappings.style.display = 'block';
          } else {
            urlEscapeMappings.style.display = 'none';
          }
        }

        // Setup API Developer Snippets Panel
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-api-card">
              <div class="pesel-section-title">
                <span>🔌</span> Developer API Preview
              </div>
              <div class="pesel-api-tabs">
                <button type="button" class="pesel-api-tab active" data-lang="curl">cURL</button>
                <button type="button" class="pesel-api-tab" data-lang="javascript">JavaScript</button>
                <button type="button" class="pesel-api-tab" data-lang="python">Python</button>
                <button type="button" class="pesel-api-tab" data-lang="java">Java</button>
                <button type="button" class="pesel-api-tab" data-lang="csharp">C#</button>
                <button type="button" class="pesel-api-tab" data-lang="go">Go</button>
              </div>
              <div class="pesel-dev-accordion-content" style="background: var(--code-bg); padding: 12px; border-radius: 6px;">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre id="pesel-api-code-block" style="margin: 0; font-family: monospace; font-size: 0.8rem; line-height: 1.4; color: var(--code-text);">${apiSnippets.curl.replace('$INPUT$', inputVal)}</pre>
              </div>
            </div>
          </div>
        `);

        const devSection = workbench.form.querySelector('.pesel-dev-section');
        if (devSection) {
          const apiBlock = devSection.querySelector('#pesel-api-code-block');
          const tabs = devSection.querySelectorAll('.pesel-api-tab');
          tabs.forEach(t => {
            t.addEventListener('click', () => {
              tabs.forEach(btn => btn.classList.remove('active'));
              t.classList.add('active');
              const lang = t.dataset.lang;
              if (apiBlock && apiSnippets[lang]) {
                apiBlock.textContent = apiSnippets[lang].replace('$INPUT$', inputVal);
              }
            });
          });
        }

        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.trim(), workbench, 'Copied snippet.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });

      } else {
        // Encode Mode
        const encodedOutput = encodeURIComponent(inputVal);
        const elapsed = (performance.now() - startTime).toFixed(2);

        const historyItems = JSON.parse(localStorage.getItem('validohub.url.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, mode: 'encode', date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.url.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const analysis = analyzeUrlEncoding(inputVal, encodedOutput, "encode");
        workbench.setOutput(encodedOutput);
        workbench.setMessage("Encoded successfully.", analysis.warnings.length > 0 ? "warning" : "success");
        workbench.setStats(analysis.details, analysis.warnings, analysis.warnings.length > 0 ? "warning" : "success");
        workbench.setBadge({ label: "Encoded", state: "success" });

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
              <span>✓ Encoded URL Parameters</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Encoding time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Percent-Encoded Value</span>
                <span class="row-value" style="word-break:break-all; font-family:monospace;">${encodedOutput}</span>
                <button type="button" class="pesel-row-copy-btn" data-copy-val="${encodedOutput}">Copy</button>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Space Count Encoded</span>
                <span class="row-value">${(inputVal.match(/\s/g) || []).length} spaces</span>
              </div>
            </div>
          `;
          resultsContainer.querySelectorAll('[data-copy-val]').forEach(btn => {
            btn.addEventListener('click', () => {
              copyToClipboard(btn.dataset.copyVal, workbench, 'Copied encoded value.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          });
          resultsContainer.style.display = 'flex';
        }

        if (customActions) {
          customActions.innerHTML = `
            <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy Encoded</button>
          `;
          customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
            copyToClipboard(encodedOutput, workbench, 'Copied encoded output.');
          });
          customActions.style.display = 'flex';
        }

        // Render visual mappings explorer
        if (urlEscapeMappings) {
          const mappingHtml = getPercentEscapesExplanationHtml(inputVal, "encode");
          if (mappingHtml) {
            urlEscapeMappings.innerHTML = mappingHtml;
            urlEscapeMappings.style.display = 'block';
          } else {
            urlEscapeMappings.style.display = 'none';
          }
        }

        // Setup API Developer Snippets Panel
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <div class="pesel-api-card">
              <div class="pesel-section-title">
                <span>🔌</span> Developer API Preview
              </div>
              <div class="pesel-api-tabs">
                <button type="button" class="pesel-api-tab active" data-lang="curl">cURL</button>
                <button type="button" class="pesel-api-tab" data-lang="javascript">JavaScript</button>
                <button type="button" class="pesel-api-tab" data-lang="python">Python</button>
                <button type="button" class="pesel-api-tab" data-lang="java">Java</button>
                <button type="button" class="pesel-api-tab" data-lang="csharp">C#</button>
                <button type="button" class="pesel-api-tab" data-lang="go">Go</button>
              </div>
              <div class="pesel-dev-accordion-content" style="background: var(--code-bg); padding: 12px; border-radius: 6px;">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre id="pesel-api-code-block" style="margin: 0; font-family: monospace; font-size: 0.8rem; line-height: 1.4; color: var(--code-text);">${apiSnippets.curl.replace('$INPUT$', inputVal)}</pre>
              </div>
            </div>
          </div>
        `);

        const devSection = workbench.form.querySelector('.pesel-dev-section');
        if (devSection) {
          const apiBlock = devSection.querySelector('#pesel-api-code-block');
          const tabs = devSection.querySelectorAll('.pesel-api-tab');
          tabs.forEach(t => {
            t.addEventListener('click', () => {
              tabs.forEach(btn => btn.classList.remove('active'));
              t.classList.add('active');
              const lang = t.dataset.lang;
              if (apiBlock && apiSnippets[lang]) {
                apiBlock.textContent = apiSnippets[lang].replace('$INPUT$', inputVal);
              }
            });
          });
        }

        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.trim(), workbench, 'Copied snippet.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });
      }
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
