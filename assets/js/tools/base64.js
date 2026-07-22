(function () {
  const BASE64_ALGORITHM = "validohub.base64";
  const BASE64_DECODER_ALGORITHM = "validohub.base64-decoder";
  const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=_-";

  const Base64Plugin = (function (framework) {
    const util = framework.utilities;

    function bytesToBase64(bytes) {
      let binary = "";
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        binary += String.fromCharCode.apply(null, chunk);
      }
      return window.btoa(binary);
    }

    function encodeBytes(bytes, options) {
      let result = bytesToBase64(bytes);
      if (options.urlSafe) {
        result = result.replace(/\+/g, "-").replace(/\//g, "_");
      }
      if (!options.padding) {
        result = result.replace(/=+$/g, "");
      }
      return result;
    }

    function normalizeBase64(value) {
      const compact = value.replace(/\s+/g, "");
      let normalized = compact.replace(/-/g, "+").replace(/_/g, "/");
      const remainder = normalized.length % 4;
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
      const normalized = normalizeBase64(value);
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized.normalized) || /=[^=]/.test(normalized.normalized)) {
        throw new Error("Unexpected padding or invalid Base64 alphabet.");
      }
      const binary = window.atob(normalized.normalized);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return {
        bytes: bytes,
        compact: compactValue(value),
        normalized: normalized.normalized
      };
    }

    function compactValue(v) {
      return v.replace(/\s+/g, "");
    }

    function analyzeBase64(value) {
      const raw = value || "";
      const compact = compactValue(raw);
      const details = [];
      const warnings = [];
      const diagnostics = [];
      const ignoredWhitespace = raw.length - compact.length;

      if (!compact) {
        return invalid("Enter Base64 text.", details, diagnostics, warnings);
      }

      const invalidCharacter = firstInvalidCharacter(raw);
      if (invalidCharacter) {
        diagnostics.push(`Invalid character '${invalidCharacter.character}' at position ${invalidCharacter.position}.`);
        return invalid(`Invalid character at position ${invalidCharacter.position}.`, details, diagnostics, warnings);
      }

      const hasUrlSafe = /[-_]/.test(compact);
      const hasStandardSpecials = /[+/]/.test(compact);
      if (hasUrlSafe && hasStandardSpecials) {
        warnings.push("Mixed alphabet warning: standard and URL-safe characters are both present.");
      }
      if (ignoredWhitespace > 0) {
        warnings.push(`Whitespace note: ${ignoredWhitespace} whitespace characters were ignored.`);
      }

      const paddingIndex = compact.indexOf("=");
      const paddingCount = (compact.match(/=/g) || []).length;
      if (paddingIndex !== -1 && !/^=+$/.test(compact.slice(paddingIndex))) {
        diagnostics.push(`Unexpected padding at position ${paddingIndex + 1}.`);
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

      let decoded;
      try {
        decoded = base64ToBytes(compact);
      } catch (error) {
        diagnostics.push(error.message);
        return invalid(error.message, details, diagnostics, warnings);
      }

      let text = "";
      let textStatus = "Binary or non-UTF-8";
      try {
        text = util.utf8Text(decoded.bytes);
        textStatus = "UTF-8 text";
      } catch (error) {
        warnings.push("Decoded bytes are valid Base64 but are not valid UTF-8 text.");
      }

      const canonical = bytesToBase64(decoded.bytes);
      const canonicalUrl = canonical.replace(/\+/g, "-").replace(/\//g, "_");
      const isCanonical = compact === canonical
          || compact === canonical.replace(/=+$/g, "")
          || compact === canonicalUrl
          || compact === canonicalUrl.replace(/=+$/g, "");
      const variant = hasUrlSafe ? "Base64URL" : "Standard Base64";
      const padding = paddingState(compact, decoded.bytes.length, true);

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
        message: `Valid ${variant}. Decoded size: ${util.formatBytes(decoded.bytes.length)}.`,
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
      for (let index = 0; index < value.length; index++) {
        const character = value.charAt(index);
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
      return "Missing";
    }

    function estimatedDecodedSize(compact) {
      const length = compact.replace(/=+$/g, "").length;
      return Math.floor(length * 3 / 4);
    }

    function detectDataUri(value) {
      const match = String(value || "").trim().match(/^data:([^;,]+)?((?:;[a-z0-9=.-]+)*);base64,(.*)$/i);
      if (!match) return null;
      return {
        mime: match[1] || "text/plain",
        parameters: match[2] || "",
        payload: match[3] || ""
      };
    }

    function sniffBytes(bytes) {
      const sig = Array.from(bytes.slice(0, 12)).map(b => b.toString(16).padStart(2, "0")).join(" ");
      let type = "unknown";
      if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) type = "PNG image";
      else if (bytes[0] === 0xff && bytes[1] === 0xd8) type = "JPEG image";
      else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) type = "GIF image";
      else if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) type = "PDF document";
      else if (bytes[0] === 0x50 && bytes[1] === 0x4b) type = "ZIP/Office archive";
      else if (bytes[0] === 0x7b || bytes[0] === 0x5b) type = "JSON-like text";
      return { type: type, signature: sig || "empty" };
    }

    function byteHistogram(bytes) {
      const buckets = { control: 0, printable: 0, extended: 0, zero: 0 };
      bytes.forEach(byte => {
        if (byte === 0) buckets.zero++;
        else if (byte < 32 || byte === 127) buckets.control++;
        else if (byte >= 32 && byte <= 126) buckets.printable++;
        else buckets.extended++;
      });
      return buckets;
    }

    function tableHtml(headers, rows) {
      return '<div class="generic-table-shell"><table class="pesel-dev-table"><thead><tr>'
        + headers.map(h => '<th>' + util.escapeHtml(h) + '</th>').join('')
        + '</tr></thead><tbody>'
        + rows.map(row => '<tr>' + row.map(cell => '<td>' + util.escapeHtml(String(cell)) + '</td>').join('') + '</tr>').join('')
        + '</tbody></table></div>';
    }

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

    const getBase64ExplanationHtml = function (inputStr, mode) {
      let text = "";
      if (mode === "decode" || mode === "validate") {
        try {
          const decodedBytes = base64ToBytes(inputStr).bytes;
          text = util.utf8Text(decodedBytes);
        } catch (e) {
          return "";
        }
      } else {
        text = inputStr;
      }

      if (!text) return "";

      const rawBytes = Array.from(util.utf8Bytes(text)).slice(0, 3);
      if (rawBytes.length === 0) return "";

      let html = `
        <div class="pesel-section-title">
          <span>📖</span> Base64 Chunk Encoding Mechanics
        </div>
        <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">Base64 maps 3 bytes (24 bits) into 4 characters (6 bits each).</p>
        <div class="pesel-debugger-table-container">
          <table class="pesel-dev-table" style="font-size:0.75rem;">
            <thead>
              <tr>
                <th>Byte Offset</th>
                <th>Char Code</th>
                <th>Binary (8-bit)</th>
              </tr>
            </thead>
            <tbody>
      `;

      const binaryPieces = [];
      rawBytes.forEach((b, idx) => {
        const bin = b.toString(2).padStart(8, '0');
        binaryPieces.push(bin);
        html += `
          <tr>
            <td style="font-weight: 700; color: var(--text);">Byte ${idx + 1}</td>
            <td><code>${b}</code></td>
            <td style="font-family: monospace; font-weight:700;">${bin}</td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;

      const combinedBits = binaryPieces.join('');
      const chunks = [];
      for (let i = 0; i < 24; i += 6) {
        if (i < combinedBits.length) {
          chunks.push(combinedBits.substring(i, i + 6));
        }
      }

      if (chunks.length > 0) {
        html += `
          <div class="pesel-formula-summary" style="margin-top:16px;">
            <div class="pesel-formula-step">
              <span>Combined 24-bit Stream</span>
              <span style="font-family:monospace; font-weight:700; color:var(--text);">${combinedBits}</span>
            </div>
            <div class="pesel-formula-step" style="flex-direction:column; align-items:flex-start; gap:6px;">
              <span style="margin-bottom:4px; font-weight:600;">Split into 6-bit chunks:</span>
              <div style="display:flex; gap:10px; width:100%; justify-content:space-between; flex-wrap:wrap;">
        `;

        chunks.forEach((chunk, index) => {
          const paddedChunk = chunk.padEnd(6, '0');
          const val = parseInt(paddedChunk, 2);
          const base64Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          const char = base64Alphabet[val] || '=';
          html += `
            <div style="background:var(--surface-soft); border:1px solid var(--line); border-radius:4px; padding:6px 10px; text-align:center; flex:1; min-width:60px;">
              <div style="font-size:0.65rem; color:var(--muted); text-transform:uppercase; margin-bottom:4px;">Chunk ${index+1}</div>
              <div style="font-family:monospace; font-weight:700; font-size:0.8rem; color:#2f80ed; margin-bottom:2px;">${chunk}</div>
              <div style="font-size:0.7rem; color:var(--text); margin-bottom:4px;">Val: ${val}</div>
              <div style="font-size:1.1rem; font-weight:700; color:#10b981;">${char}</div>
            </div>
          `;
        });

        html += `
              </div>
            </div>
          </div>
        `;
      }

      return html;
    };

    function apiSnippetsFor(operation) {
      const endpoint = `https://api.validohub.com/v1/encoding/base64/${operation}`;
      return {
        curl: `curl -X POST ${endpoint} \\\n  -H "Content-Type: application/json" \\\n  -d '{"input": "$INPUT$"}'`,
        javascript: `fetch("${endpoint}", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ input: "$INPUT$" })\n})\n.then(res => res.json())\n.then(data => console.log(data));`,
        python: `import requests\n\nres = requests.post(\n    "${endpoint}",\n    json={"input": "$INPUT$"}\n)\nprint(res.json())`,
        java: `import java.net.http.*;\nimport java.net.URI;\n\nvar client = HttpClient.newHttpClient();\nvar request = HttpRequest.newBuilder()\n    .uri(URI.create("${endpoint}"))\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString("{\\"input\\": \\"$INPUT$\\"}"))\n    .build();\nvar response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());`,
        csharp: `using System.Net.Http;\nusing System.Text.Json;\n\nvar client = new HttpClient();\nvar content = new StringContent("{\\"input\\":\\"$INPUT$\\"}", System.Text.Encoding.UTF8, "application/json");\nvar response = await client.PostAsync("${endpoint}", content);\nvar result = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(result);`,
        go: `package main\n\nimport (\n\t"bytes"\n\t"io/ioutil"\n\t"net/http"\n\t"fmt"\n)\n\nfunc main() {\n\tpayload := []byte(\`{"input": "$INPUT$"}\`)\n\tres, _ := http.Post("${endpoint}", "application/json", bytes.NewBuffer(payload))\n\tdefer res.Body.Close()\n\tbody, _ := ioutil.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}`
      };
    }

    function applySample(workbench, sampleId) {
      const input = workbench.primaryInput();
      if (!input) {
        return;
      }
      workbench.file = null;
      workbench.updateFileStatus(null);
      if (sampleId === "encode-hello") {
        input.value = "Hello, world!";
      } else if (sampleId === "encode-unicode") {
        input.value = "Hello, こんにちは, 👋";
      } else if (sampleId === "decode") {
        input.value = "SGVsbG8sIHdvcmxkIQ==";
      } else if (sampleId === "validate") {
        input.value = "eyJzdGF0dXMiOiJvayIsImNvdW50IjoyfQ==";
      } else if (sampleId === "data-uri") {
        input.value = "data:application/json;base64,eyJ0b29sIjoiVmFsaWRvSHViIiwiZmVhdHVyZSI6ImRhdGEtdXJpIGRlY29kZSJ9";
      } else if (sampleId === "invalid-base64") {
        input.value = "SGVsbG8===%%%";
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function onMount(workbench) {
      workbench.form._workbench = workbench;
      const capability = workbench.form.dataset.capability || "encode";
      const isDecodeWorkbench = capability === "decode" || capability === "validate";
      const historyPlaceholder = isDecodeWorkbench ? "-- Recent Decodes --" : "-- Recent Encodes --";

      // Refine header description to Stripe quality
      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = isDecodeWorkbench ? "Base64 Decoder & Inspector" : "Base64 Encoder & Explainer";
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = isDecodeWorkbench
            ? "Decode, validate, and inspect Base64 and Base64URL strings locally inside your secure browser sandbox."
            : "Encode, validate, and inspect Base64 and Base64URL string encodings locally inside your secure browser sandbox.";
        }

        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Shield</span>
            <span class="pesel-pill">📅 Standard & URL-Safe</span>
            <span class="pesel-pill">⚡ Real-time Parser</span>
          `;
          pageIntro.appendChild(badgeRow);
        }
      }

      // Hide default titles, output textareas, and default copy buttons
      const headingText = workbench.form.querySelector('.workbench-heading');
      if (headingText) headingText.style.display = 'none';
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) outputField.style.display = 'none';
      const copyBtn = workbench.form.querySelector('[data-tool-copy]');
      if (copyBtn) copyBtn.style.display = 'none';
      const downloadBtn = workbench.form.querySelector('[data-tool-download]');
      if (downloadBtn) downloadBtn.style.display = 'none';

      // Setup Presets and History dropdowns prepended inside .field-grid
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
            ${isDecodeWorkbench
              ? `<option value="">-- Select Preset --</option>
                 <option value="decode">Decode Hello</option>
                 <option value="data-uri">Decode data URI</option>
                 <option value="validate">Decode JSON payload</option>
                 <option value="invalid-base64">Invalid Base64</option>`
              : `<option value="">-- Select Preset --</option>
                 <option value="encode-hello">Encode Hello</option>
                 <option value="encode-unicode">Encode Unicode</option>
                 <option value="validate">Encode JSON payload</option>`}
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
            <option value="">${historyPlaceholder}</option>
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
          localStorage.removeItem('validohub.base64.history');
          const select = fieldGrid.querySelector('#pesel-history');
          select.innerHTML = `<option value="">${historyPlaceholder}</option>`;
          workbench.setMessage('History cleared.', 'success');
        });
      }

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.base64.history') || '[]');
          historySelect.innerHTML = `<option value="">${historyPlaceholder}</option>`;
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

      // Insert Dropzone and Playground below presets, styled cleanly
      if (workbench.form.dataset.capability === "encode" && !workbench.form.querySelector('.pesel-generator-row')) {
        const genRow = document.createElement('div');
        genRow.className = 'pesel-generator-row';
        genRow.style.margin = '16px 0';
        genRow.style.borderTop = '1px solid var(--line)';
        genRow.style.paddingTop = '12px';
        genRow.innerHTML = `
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: space-between;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--muted); letter-spacing: 0.05em;">Generator Presets:</span>
              <button type="button" class="pesel-playground-btn" id="btn-gen-hello" style="padding: 4px 8px; font-size: 0.72rem;">Hello World</button>
              <button type="button" class="pesel-playground-btn" id="btn-gen-json" style="padding: 4px 8px; font-size: 0.72rem;">JSON Config</button>
            </div>
            <label style="font-size:0.75rem; color:var(--muted); cursor:pointer; display:flex; align-items:center; gap:6px;">
              📁 <input type="file" id="pesel-file-loader" style="display:none;">
              <span style="text-decoration:underline;">Upload local file to encode</span>
            </label>
          </div>
        `;
        workbench.form.insertBefore(genRow, workbench.form.querySelector('.button-row'));

        genRow.querySelector('#btn-gen-hello').addEventListener('click', () => {
          applySample(workbench, 'encode-hello');
        });
        genRow.querySelector('#btn-gen-json').addEventListener('click', () => {
          if (inputField) {
            inputField.value = `{\n  "status": "ok",\n  "count": 2,\n  "sandbox": true\n}`;
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        genRow.querySelector('#pesel-file-loader').addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            workbench.readFile(e.target.files[0]);
          }
        });
      }

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
            <div class="pesel-empty-title">Base64 Encoding Sandbox</div>
            <div class="pesel-empty-desc">Enter raw string bytes or encoded character values. Calculation logic executes purely inside your local browser tab.</div>
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
            <div class="pesel-timeline-node" data-node="alphabet">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Alphabet</span>
            </div>
            <div class="pesel-timeline-node" data-node="padding">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Padding</span>
            </div>
            <div class="pesel-timeline-node" data-node="complete">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Complete</span>
            </div>
          </div>

          <div class="pesel-results-container" style="display: none;"></div>
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>
          <div class="pesel-breakdown" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      // Live-mode debounced validation logic trigger
      let debounceTimeout = null;
      if (inputField) {
        inputField.addEventListener('input', () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            const activeAction = workbench.form.dataset.activeAction || (workbench.form.dataset.capability === "validate" ? "validate" : "encode");
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

    function run(workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.input || '';
      const inputVal = rawInput;

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const breakdownPanel = workbench.form.querySelector('.pesel-breakdown');
      const timelineTracker = workbench.form.querySelector('.pesel-timeline-tracker');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');
      const isValidateMode = workbench.form.dataset.capability === "validate" || action === "decode";
      const historyPlaceholder = isValidateMode ? "-- Recent Decodes --" : "-- Recent Encodes --";

      const startTime = performance.now();

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.base64.history') || '[]');
          historySelect.innerHTML = `<option value="">${historyPlaceholder}</option>`;
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
        workbench.setMessage(options.quiet ? "" : "Please enter an input value.", options.quiet ? "" : "error");
        if (emptyStateCard) emptyStateCard.style.display = 'flex';
        if (timelineTracker) timelineTracker.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        return;
      }

      if (emptyStateCard) emptyStateCard.style.display = 'none';
      if (timelineTracker) timelineTracker.style.display = 'flex';

      setTimelineStatus('input', 'active');
      setTimelineStatus('alphabet', 'active');
      setTimelineStatus('padding', 'active');
      setTimelineStatus('complete', 'active');

      const progressBar = timelineTracker.querySelector('#pesel-progress-bar');
      if (progressBar) progressBar.style.width = '100%';

      // Handle operations
      if (isValidateMode) {
        // Validation / Decoding
        const dataUri = detectDataUri(inputVal);
        const analysis = analyzeBase64(dataUri ? dataUri.payload : inputVal);
        const elapsed = (performance.now() - startTime).toFixed(2);

        if (!analysis.valid) {
          setTimelineStatus('alphabet', 'error');
          setTimelineStatus('complete', 'error');

          workbench.setOutput(`Invalid Base64: ${analysis.message}`);
          workbench.setMessage("Invalid Base64 input.", "error");
          workbench.setStats(analysis.details, analysis.diagnostics.concat(analysis.warnings), "error");
          workbench.setBadge({ label: "Error", state: "error" });

          if (resultsContainer) {
            resultsContainer.innerHTML = `
              <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
                <span>✗ Validation Failed: Invalid Base64 Structure</span>
                <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
              </div>
              <div class="pesel-results-grid reveal-element reveal-delay-1">
                <div class="pesel-result-row">
                  <span class="row-label">Error Details</span>
                  <span class="row-value">${analysis.message}</span>
                </div>
                ${analysis.diagnostics.map(diag => `
                  <div class="pesel-result-row">
                    <span class="row-label">Diagnostic</span>
                    <span class="row-value">${diag}</span>
                  </div>
                `).join('')}
              </div>
            `;
            resultsContainer.style.display = 'flex';
          }

          if (customActions) customActions.style.display = 'none';
          if (breakdownPanel) breakdownPanel.style.display = 'none';
          return;
        }

        // Add validation to history
        const historyItems = JSON.parse(localStorage.getItem('validohub.base64.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, mode: 'decode', date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.base64.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const decodedOutput = analysis.textStatus === "UTF-8 text" ? analysis.text : `[Binary stream, ${util.formatBytes(analysis.bytes.length)}]`;
        const sniff = sniffBytes(analysis.bytes);
        const histogram = byteHistogram(analysis.bytes);
        workbench.setOutput(decodedOutput);
        workbench.setMessage(analysis.message, analysis.warnings.length > 0 ? "warning" : "success");
        workbench.setStats(analysis.details, analysis.warnings, analysis.warnings.length > 0 ? "warning" : "success");
        workbench.setBadge({ label: analysis.variant, state: "success" });

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
              <span>✓ Decoded Successfully</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Decoding time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Detected Variant</span>
                <span class="row-value">${analysis.variant}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Padding Mode</span>
                <span class="row-value">${analysis.padding}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Decoded Byte Size</span>
                <span class="row-value">${util.formatBytes(analysis.bytes.length)}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Content Encoding</span>
                <span class="row-value">${analysis.textStatus}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) {
          customActions.innerHTML = `
            <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy Result</button>
            <button type="button" class="button button-secondary compact" id="custom-download-result">Download Result</button>
          `;
          customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
            copyToClipboard(decodedOutput, workbench, 'Copied decoded output.');
          });
          customActions.querySelector('#custom-download-result').addEventListener('click', () => {
            const blob = new Blob([analysis.bytes], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `decoded-${inputVal.substring(0, 8)}.bin`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          });
          customActions.style.display = 'flex';
        }

        // Render visual base64 bytes explanation
        if (breakdownPanel) {
          const explanationHtml = getBase64ExplanationHtml(inputVal, "decode");
          if (explanationHtml) {
            breakdownPanel.innerHTML = explanationHtml;
            breakdownPanel.style.display = 'block';
          } else {
            breakdownPanel.style.display = 'none';
          }
        }

        // Setup Advanced Code Snippets Panel
        const apiSnippets = apiSnippetsFor("decode");
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <section class="generic-analysis-section">
              <h4>Base64 byte and payload intelligence</h4>
              <div class="generic-quality-grid">
                <article class="generic-quality-card"><strong>Detected container</strong><p>${dataUri ? `Data URI (${dataUri.mime})` : 'Raw Base64/Base64URL string'}.</p></article>
                <article class="generic-quality-card"><strong>Byte signature</strong><p>${sniff.type}; first bytes: ${sniff.signature}.</p></article>
                <article class="generic-quality-card"><strong>Canonical forms</strong><p>Standard and URL-safe canonical strings are available for copy-safe fixture normalization.</p></article>
                <article class="generic-quality-card"><strong>Decode boundary</strong><p>Base64 validity proves transport encoding only, not file trust, malware safety, or semantic correctness.</p></article>
              </div>
              ${tableHtml(['Bucket', 'Bytes'], Object.keys(histogram).map(key => [key, histogram[key]]))}
            </section>
            <details class="pesel-dev-accordion" open>
              <summary>Decoded Hex Dump</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>${util.hexSection(analysis.bytes, "Hex View")}</pre>
              </div>
            </details>

            <div class="pesel-api-card" style="margin-top: 16px;">
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

        // Tab switches
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

        // Bind advanced copies
        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.trim(), workbench, 'Copied dump.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });

      } else {
        // Encoding
        const bytes = util.utf8Bytes(inputVal);
        const encoded = encodeBytes(bytes, { urlSafe: values.urlSafe, padding: values.padding !== false });
        const sniff = sniffBytes(bytes);
        const histogram = byteHistogram(bytes);
        const elapsed = (performance.now() - startTime).toFixed(2);

        // Add to history
        const historyItems = JSON.parse(localStorage.getItem('validohub.base64.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, mode: 'encode', date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.base64.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        workbench.setOutput(encoded);
        workbench.setMessage("Encoded live.", "success");
        workbench.setBadge({ label: values.urlSafe ? "Base64URL" : "Base64", state: "success" });

        const detailRows = [
          ["Input Size", `${inputVal.length} characters`],
          ["Byte Size", util.formatBytes(bytes.length)],
          ["Encoded size", `${encoded.length} characters`],
          ["URL Safe", values.urlSafe ? "Yes" : "No"],
          ["Padding", values.padding !== false ? "Included" : "Excluded"]
        ];

        workbench.setStats(detailRows, [], "success");

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
              <span>✓ Encoded Successfully</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Encoding time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Base64 Output</span>
                <span class="row-value" style="word-break:break-all; font-family:monospace;">${encoded}</span>
                <button type="button" class="pesel-row-copy-btn" data-copy-val="${encoded}">Copy</button>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Byte Length</span>
                <span class="row-value">${util.formatBytes(bytes.length)}</span>
              </div>
            </div>
          `;
          resultsContainer.querySelectorAll('[data-copy-val]').forEach(btn => {
            btn.addEventListener('click', () => {
              copyToClipboard(btn.dataset.copyVal, workbench, 'Copied encoded string.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          });
          resultsContainer.style.display = 'flex';
        }

        if (customActions) {
          customActions.innerHTML = `
            <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy String</button>
          `;
          customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
            copyToClipboard(encoded, workbench, 'Copied encoded output.');
          });
          customActions.style.display = 'flex';
        }

        // Render explanation
        if (breakdownPanel) {
          const explanationHtml = getBase64ExplanationHtml(inputVal, "encode");
          if (explanationHtml) {
            breakdownPanel.innerHTML = explanationHtml;
            breakdownPanel.style.display = 'block';
          } else {
            breakdownPanel.style.display = 'none';
          }
        }

        // Setup API Preview Tabs
        const apiSnippets = apiSnippetsFor("encode");
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <section class="generic-analysis-section">
              <h4>Base64 encoding intelligence</h4>
              <div class="generic-quality-grid">
                <article class="generic-quality-card"><strong>Input profile</strong><p>${sniff.type}; ${util.formatBytes(bytes.length)} before Base64 expansion.</p></article>
                <article class="generic-quality-card"><strong>Expansion</strong><p>Encoded output is ${encoded.length} characters; Base64 normally expands bytes by roughly 33%.</p></article>
                <article class="generic-quality-card"><strong>Variant</strong><p>${values.urlSafe ? 'Base64URL selected for URLs/JWT-like transport.' : 'Standard Base64 selected for MIME and common text transport.'}</p></article>
                <article class="generic-quality-card"><strong>Padding</strong><p>${values.padding !== false ? 'Padding included for canonical compatibility.' : 'Padding omitted for URL-safe compact fixtures.'}</p></article>
              </div>
              ${tableHtml(['Bucket', 'Bytes'], Object.keys(histogram).map(key => [key, histogram[key]]))}
            </section>
            <details class="pesel-dev-accordion" open>
              <summary>Input UTF-8 Byte Preview</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>${util.hexSection(bytes, "Hex View")}</pre>
              </div>
            </details>

            <div class="pesel-api-card" style="margin-top: 16px;">
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
              copyToClipboard(pre.textContent.trim(), workbench, 'Copied byte preview.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });
      }
    }

    function handleFile(workbench, file) {
      if (!file) return;
      const options = {
        urlSafe: workbench.form.querySelector('[name="urlSafe"]').checked,
        padding: workbench.form.querySelector('[name="padding"]').checked !== false
      };
      const output = encodeBytes(file.bytes, options);
      workbench.setOutput(output);
      workbench.setMessage("Encoded file locally.", "success");
      workbench.setBadge({ label: options.urlSafe ? "Base64URL" : "Base64", state: "success" });

      const detailRows = [
        ["File name", file.name],
        ["File size", util.formatBytes(file.size)],
        ["MIME type", file.type || "unknown"]
      ];
      workbench.setStats(detailRows, ["File bytes were read locally in this browser only."], "success");

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');

      if (emptyStateCard) emptyStateCard.style.display = 'none';

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
            <span>✓ Encoded File Locally</span>
          </div>
          <div class="pesel-results-grid reveal-element reveal-delay-1">
            <div class="pesel-result-row">
              <span class="row-label">Base64 Output</span>
              <span class="row-value" style="word-break:break-all; font-family:monospace; max-height:120px; overflow-y:auto;">${output}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">File Type</span>
              <span class="row-value">${file.type || "unknown"}</span>
            </div>
          </div>
        `;
        resultsContainer.style.display = 'flex';
      }

      if (customActions) {
        customActions.innerHTML = `
          <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy Base64</button>
        `;
        customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
          copyToClipboard(output, workbench, 'Copied encoded file string.');
        });
        customActions.style.display = 'flex';
      }

      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <details class="pesel-dev-accordion" open>
            <summary>File Byte Dump Preview</summary>
            <div class="pesel-dev-accordion-content">
              <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
              <pre>${util.hexSection(file.bytes, "Hex View")}</pre>
            </div>
          </details>
        </div>
      `);
    }

    return {
      filePrefix: "validohub-base64",
      onMount: onMount,
      run: run,
      handleFile: handleFile,
      applySample: applySample
    };
  })(window.ValidoWorkbench);

  window.ValidoWorkbench.registerPlugin(BASE64_ALGORITHM, Base64Plugin);
  window.ValidoWorkbench.registerPlugin(BASE64_DECODER_ALGORITHM, Base64Plugin);
})();
