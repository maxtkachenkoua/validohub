(function () {
  const JSON_FORMATTER_ALGORITHM = "validohub.json-formatter";
  const JSON_VALIDATOR_ALGORITHM = "validohub.json-validator";
  const LARGE_JSON_BYTES = 250000;
  const LARGE_JSON_NODES = 5000;
  const TREE_NODE_RENDER_LIMIT = 1800;
  const TREE_CHILD_RENDER_LIMIT = 160;

  const JsonPlugin = (function (framework) {
    const util = framework.utilities;

    function inputField(workbench) {
      return workbench.primaryInput()
        || workbench.form.querySelector('textarea[name="json"], input[name="json"], textarea[name="input"], input[name="input"]');
    }

    function parseJson(input) {
      try {
        const value = JSON.parse(input);
        const stats = subtreeStats(value);
        return {
          valid: true,
          value: value,
          counts: stats
        };
      } catch (error) {
        return {
          valid: false,
          message: error.message
        };
      }
    }

    function subtreeStats(value) {
      let nodes = 0;
      let depth = 0;
      let elements = 0;
      let objects = 0;
      let arrays = 0;
      let scalars = 0;
      let largeMode = false;

      function traverse(val, currentDepth) {
        nodes++;
        if (currentDepth > depth) {
          depth = currentDepth;
        }
        if (nodes > LARGE_JSON_NODES) {
          largeMode = true;
        }
        if (val && typeof val === "object") {
          if (Array.isArray(val)) {
            arrays++;
          } else {
            objects++;
          }
          const keys = Object.keys(val);
          elements += keys.length;
          keys.forEach(k => {
            traverse(val[k], currentDepth + 1);
          });
        } else {
          scalars++;
        }
      }

      traverse(value, 1);
      return {
        nodes: nodes,
        depth: depth,
        elements: elements,
        objects: objects,
        arrays: arrays,
        scalars: scalars,
        largeMode: largeMode
      };
    }

    function repairJsonCandidate(input) {
      let repaired = input
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/,\s*([}\]])/g, "$1");
      repaired = repaired.replace(/([{,]\s*)([A-Za-z_$][\w$-]*)(\s*:)/g, '$1"$2"$3');
      repaired = repaired.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, function (_m, body) {
        return '"' + body.replace(/"/g, '\\"') + '"';
      });
      const parsed = parseJson(repaired);
      return parsed.valid ? { ok: true, value: repaired, parsed: parsed } : { ok: false, value: repaired, error: parsed.message };
    }

    function collectJsonPaths(value) {
      const rows = [];
      function walk(node, path, pointer, depth) {
        if (rows.length >= 14) return;
        const type = typeLabel(node);
        rows.push({ path: path, pointer: pointer || "/", type: type, preview: previewValue(node) });
        if (node && typeof node === "object" && depth < 4) {
          const keys = Object.keys(node).slice(0, 8);
          keys.forEach(key => {
            const nextPath = Array.isArray(node) ? `${path}[${key}]` : path + jsonPathSegment(key);
            walk(node[key], nextPath, pointer + "/" + key.replace(/~/g, "~0").replace(/\//g, "~1"), depth + 1);
          });
        }
      }
      walk(value, "$", "", 0);
      return rows;
    }

    function jsonPathSegment(key) {
      return /^[A-Za-z_$][\w$]*$/.test(key) ? "." + key : "['" + String(key).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "']";
    }

    function previewValue(value) {
      if (value && typeof value === "object") {
        return Array.isArray(value) ? `${value.length} items` : `${Object.keys(value).length} keys`;
      }
      const raw = value === null ? "null" : String(value);
      return raw.length > 42 ? raw.slice(0, 39) + "..." : raw;
    }

    function inferSchema(value) {
      if (Array.isArray(value)) {
        return {
          type: "array",
          minItems: value.length,
          items: value.length ? inferSchema(value[0]) : {}
        };
      }
      if (value && typeof value === "object") {
        const properties = {};
        Object.keys(value).slice(0, 24).forEach(key => {
          properties[key] = inferSchema(value[key]);
        });
        return { type: "object", required: Object.keys(value), properties: properties };
      }
      if (value === null) return { type: "null" };
      if (Number.isInteger(value)) return { type: "integer" };
      return { type: typeof value };
    }

    function flattenedPreview(value) {
      const rows = [];
      function walk(node, path) {
        if (rows.length >= 18) return;
        if (node && typeof node === "object") {
          const keys = Object.keys(node);
          if (!keys.length) {
            rows.push([path, Array.isArray(node) ? "[]" : "{}"]);
          }
          keys.forEach(key => walk(node[key], Array.isArray(node) ? `${path}[${key}]` : `${path}.${key}`));
        } else {
          rows.push([path, previewValue(node)]);
        }
      }
      walk(value, "$");
      return rows;
    }

    function secretFindings(value) {
      const hits = [];
      const secretKeyPattern = /(secret|token|password|passwd|api[_-]?key|private[_-]?key|authorization|credential)/i;
      function walk(node, path) {
        if (hits.length >= 10) return;
        if (node && typeof node === "object") {
          Object.keys(node).forEach(key => {
            const nextPath = Array.isArray(node) ? `${path}[${key}]` : `${path}.${key}`;
            if (secretKeyPattern.test(key)) {
              hits.push(nextPath);
            }
            walk(node[key], nextPath);
          });
        }
      }
      walk(value, "$");
      return hits;
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

    function applySample(workbench, sampleId) {
      const input = inputField(workbench);
      if (!input) return;

      if (sampleId === "json-api") {
        input.value = '{\n  "status": "ok",\n  "count": 2,\n  "data": [\n    { "id": 1, "name": "Alpha" },\n    { "id": 2, "name": "Beta" }\n  ]\n}';
      } else if (sampleId === "json-config") {
        input.value = '{\n  "app": "validohub",\n  "features": {\n    "liveMode": true,\n    "offline": true,\n    "treeExplorer": true\n  },\n  "limits": {\n    "maxUploadMb": 5,\n    "indent": 2\n  }\n}';
      } else if (sampleId === "json-array") {
        input.value = '[\n  "Standard Base64",\n  "Base64URL",\n  "RFC 4648"\n]';
      } else if (sampleId === "json-security") {
        input.value = '{\n  "user": {\n    "id": "usr_123",\n    "email": "developer@example.test"\n  },\n  "apiKey": "test_sk_redacted",\n  "features": ["audit", "local-only"],\n  "expiresAt": "2026-12-31T23:59:59Z"\n}';
      } else if (sampleId === "json-repair") {
        input.value = "{\n  name: 'validohub',\n  mode: 'repair-lab',\n  enabled: true,\n}";
      } else if (sampleId === "json-invalid") {
        input.value = '{\n  "name": "validohub"\n  "incomplete": true\n}';
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function onMount(workbench) {
      workbench.form._workbench = workbench;

      // Refine header titles to Stripe quality
      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = "JSON Formatter & Validator";
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = "Validate, format, minify, sort, and inspect JSON structures locally in your secure browser sandbox.";
        }

        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Shield</span>
            <span class="pesel-pill">⚡ Auto Format & Minify</span>
            <span class="pesel-pill">📅 JSON RFC 8259</span>
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
      const mainInput = inputField(workbench);
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
            <option value="json-api">API Response</option>
            <option value="json-config">Config Object</option>
            <option value="json-array">Array Data</option>
            <option value="json-security">Secret scan payload</option>
            <option value="json-repair">Repairable malformed JSON</option>
            <option value="json-invalid">Invalid JSON</option>
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
            <option value="">-- Recent JSON --</option>
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
          localStorage.removeItem('validohub.json.history');
          const select = fieldGrid.querySelector('#pesel-history');
          select.innerHTML = '<option value="">-- Recent JSON --</option>';
          workbench.setMessage('Validation history cleared.', 'success');
        });
      }

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.json.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent JSON --</option>';
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
            <div class="pesel-empty-title">JSON Processing Sandbox</div>
            <div class="pesel-empty-desc">Enter or paste a JSON config/response above. Formatting and validation routines execute entirely inside your local browser sandbox.</div>
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
            <div class="pesel-timeline-node" data-node="tokenize">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Tokenizer</span>
            </div>
            <div class="pesel-timeline-node" data-node="syntax">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Syntax</span>
            </div>
            <div class="pesel-timeline-node" data-node="complete">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Complete</span>
            </div>
          </div>

          <div class="pesel-results-container" style="display: none;"></div>
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>
          <div class="pesel-breakdown" id="json-tree-explorer-container" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      bindJsonInteractions(workbench);

      // Live-mode debounced validation logic trigger
      let debounceTimeout = null;
        if (mainInput) {
          mainInput.addEventListener('input', () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            const activeAction = workbench.form.dataset.activeAction || (workbench.form.dataset.capability === "validate" ? "validate" : "format");
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

    function bindJsonInteractions(workbench) {
      if (workbench.form.dataset.jsonInteractionsBound === "true") {
        return;
      }
      workbench.form.dataset.jsonInteractionsBound = "true";
      const debouncedSearch = util.debounce(() => {
        runTreeSearch(workbench, "first");
      }, 120);

      workbench.form.addEventListener("click", (event) => {
        const treeAction = event.target.closest("[data-json-tree-action]");
        if (treeAction) {
          handleTreeAction(workbench, treeAction.dataset.jsonTreeAction);
          return;
        }
        const node = event.target.closest("[data-json-node]");
        if (node) {
          selectTreeNode(workbench, node.dataset.jsonPointer);
          return;
        }
        const copy = event.target.closest("[data-json-copy]");
        if (copy) {
          copySelectedNode(workbench, copy.dataset.jsonCopy);
        }
      });

      workbench.form.addEventListener("input", (event) => {
        if (event.target.matches("[data-json-search]")) {
          debouncedSearch();
        }
      });

      workbench.form.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
          const search = workbench.form.querySelector("[data-json-search]");
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
      const values = workbench.values();
      const rawInput = values.input || values.json || '';
      const inputVal = rawInput;

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const treeExplorerContainer = workbench.form.querySelector('#json-tree-explorer-container');
      const timelineTracker = workbench.form.querySelector('.pesel-timeline-tracker');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');

      const startTime = performance.now();

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.json.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent JSON --</option>';
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
        workbench.setMessage(options.quiet ? "" : "Please enter a JSON string.", options.quiet ? "" : "error");
        if (emptyStateCard) emptyStateCard.style.display = 'flex';
        if (timelineTracker) timelineTracker.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (treeExplorerContainer) treeExplorerContainer.style.display = 'none';
        return;
      }

      if (emptyStateCard) emptyStateCard.style.display = 'none';
      if (timelineTracker) timelineTracker.style.display = 'flex';

      setTimelineStatus('input', 'active');
      setTimelineStatus('tokenize', 'active');
      setTimelineStatus('syntax', 'active');
      setTimelineStatus('complete', 'active');

      const progressBar = timelineTracker.querySelector('#pesel-progress-bar');
      if (progressBar) progressBar.style.width = '100%';

      const parsed = parseJson(inputVal);
      const elapsed = (performance.now() - startTime).toFixed(2);

      if (!parsed.valid) {
        setTimelineStatus('syntax', 'error');
        setTimelineStatus('complete', 'error');
        const repair = repairJsonCandidate(inputVal);

        workbench.setOutput(`Invalid JSON: ${parsed.message}`);
        workbench.setMessage("Invalid JSON structure.", "error");
        workbench.setBadge({ label: "Error", state: "error" });
        workbench.setStats([["JSON state", "Invalid"], ["Error Message", parsed.message]], [], "error");

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Syntax Error</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Syntax Error Detail</span>
                <span class="row-value">${parsed.message}</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (treeExplorerContainer) treeExplorerContainer.style.display = 'none';
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <section class="generic-analysis-section">
              <h4>JSON repair lab</h4>
              <div class="generic-quality-grid">
                <article class="generic-quality-card"><strong>Syntax failure</strong><p>${util.escapeHtml(parsed.message)}</p></article>
                <article class="generic-quality-card"><strong>Repair status</strong><p>${repair.ok ? 'A browser-local repair candidate parses successfully.' : 'The automatic repair pass still needs manual review.'}</p></article>
                <article class="generic-quality-card"><strong>Common fixes</strong><p>Trailing commas, smart quotes, single-quoted strings, and unquoted object keys are tested locally.</p></article>
                <article class="generic-quality-card"><strong>Safety boundary</strong><p>Repair suggestions are fixtures; review meaning before using them in production payloads.</p></article>
              </div>
              <div class="pesel-dev-accordion-content" style="background: var(--code-bg); padding: 12px; border-radius: 6px; margin-top: 14px;">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre style="margin:0; color: var(--code-text);">${util.escapeHtml(repair.ok ? JSON.stringify(repair.parsed.value, null, 2) : (repair.value || inputVal))}</pre>
              </div>
            </section>
          </div>
        `);
        const repairCopy = workbench.form.querySelector('.pesel-dev-accordion-copy-btn');
        const repairPre = workbench.form.querySelector('.pesel-dev-accordion-content pre');
        if (repairCopy && repairPre) {
          repairCopy.addEventListener('click', () => copyToClipboard(repairPre.textContent, workbench, 'Copied repair candidate.'));
        }
        return;
      }

      // Add to history
      const historyItems = JSON.parse(localStorage.getItem('validohub.json.history') || '[]');
      if (!historyItems.some(it => it.value === inputVal)) {
        historyItems.unshift({ value: inputVal, mode: action || 'format', date: new Date().toISOString().split('T')[0] });
        localStorage.setItem('validohub.json.history', JSON.stringify(historyItems.slice(0, 20)));
        refreshHistorySelect();
      }

      // Perform formatting/minifying
      let outputText = "";
      if (action === "minify") {
        outputText = JSON.stringify(parsed.value);
      } else if (action === "sort") {
        function sortObj(obj) {
          if (obj && typeof obj === "object") {
            if (Array.isArray(obj)) return obj.map(sortObj);
            const sorted = {};
            Object.keys(obj).sort().forEach(k => {
              sorted[k] = sortObj(obj[k]);
            });
            return sorted;
          }
          return obj;
        }
        outputText = JSON.stringify(sortObj(parsed.value), null, 2);
      } else if (action === "clean") {
        function cleanObj(obj) {
          if (obj && typeof obj === "object") {
            if (Array.isArray(obj)) return obj.map(cleanObj).filter(v => v !== null && v !== undefined && v !== "");
            const cleaned = {};
            Object.keys(obj).forEach(k => {
              const val = cleanObj(obj[k]);
              if (val !== null && val !== undefined && val !== "") {
                cleaned[k] = val;
              }
            });
            return cleaned;
          }
          return obj;
        }
        outputText = JSON.stringify(cleanObj(parsed.value), null, 2);
      } else {
        // Pretty print / default
        outputText = JSON.stringify(parsed.value, null, 2);
      }

      workbench.setOutput(outputText);
      workbench.setMessage("Processed JSON locally.", "success");
      workbench.setBadge({ label: `${parsed.counts.nodes} nodes`, state: "success" });

      const stats = subtreeStats(parsed.value);
      const paths = collectJsonPaths(parsed.value);
      const flat = flattenedPreview(parsed.value);
      const schema = inferSchema(parsed.value);
      const secrets = secretFindings(parsed.value);
      const detailRows = [
        ["JSON state", "Valid"],
        ["Byte size", util.formatBytes(util.utf8Bytes(outputText).length)],
        ["Subtree size", `${stats.nodes} nodes`],
        ["Depth", String(stats.depth)],
        ["Objects / arrays", `${stats.objects} / ${stats.arrays}`],
        ["Subtree elements", String(stats.elements)]
      ];
      workbench.setStats(detailRows, [], "success");

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
            <span>✓ Valid JSON Structure</span>
            <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Parsing time: ${elapsed} ms</span>
          </div>
          <div class="pesel-results-grid reveal-element reveal-delay-1">
            <div class="pesel-result-row">
              <span class="row-label">Processed JSON Result</span>
              <span class="row-value" style="word-break:break-all; font-family:monospace; max-height:160px; overflow-y:auto;">${outputText.substring(0, 1000)}${outputText.length > 1000 ? '\n... (truncated view)' : ''}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${outputText}">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Node Count</span>
              <span class="row-value">${stats.nodes} nodes</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Tree Max Depth</span>
              <span class="row-value">${stats.depth} levels</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Key/Value Elements</span>
              <span class="row-value">${stats.elements} items</span>
            </div>
          </div>
        `;

        resultsContainer.querySelector('[data-copy-val]').addEventListener('click', (e) => {
          copyToClipboard(e.target.dataset.copyVal, workbench, 'Copied JSON output.');
          e.target.textContent = 'Copied!';
          setTimeout(() => { e.target.textContent = 'Copy'; }, 1500);
        });

        resultsContainer.style.display = 'flex';
      }

      if (customActions) {
        customActions.innerHTML = `
          <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy JSON</button>
          <button type="button" class="button button-secondary compact" id="custom-download-result">Download JSON</button>
        `;
        customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
          copyToClipboard(outputText, workbench, 'Copied processed JSON.');
        });
        customActions.querySelector('#custom-download-result').addEventListener('click', () => {
          const blob = new Blob([outputText], { type: 'application/json;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `formatted-json-${Date.now()}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
        customActions.style.display = 'flex';
      }

      // Render Visual Tree Explorer
      if (treeExplorerContainer) {
        workbench._jsonExplorer = {
          value: parsed.value,
          selectedPointer: "",
          matches: [],
          matchIndex: -1,
          stats: stats
        };
        treeExplorerContainer.innerHTML = treePreview(parsed.value, stats);
        treeExplorerContainer.style.display = 'block';

        window.setTimeout(() => {
          initializeExplorer(workbench);
        }, 0);
      }

      // Setup API Developer Snippets Panel
      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <section class="generic-analysis-section">
            <h4>JSON quality notes</h4>
            <div class="generic-quality-grid">
              <article class="generic-quality-card"><strong>Privacy boundary</strong><p>JSON is parsed, formatted, searched, and explored locally in this browser.</p></article>
              <article class="generic-quality-card"><strong>Correctness boundary</strong><p>Valid JSON syntax does not prove schema compatibility, business rules, or API acceptance.</p></article>
              <article class="generic-quality-card"><strong>Developer handling</strong><p>Copy normalized output for fixtures, but avoid pasting secrets or production tokens into shared logs.</p></article>
              <article class="generic-quality-card"><strong>Fixture safety</strong><p>Samples are safe developer fixtures; live payloads should still be reviewed for private data.</p></article>
            </div>
          </section>
          <section class="generic-analysis-section">
            <h4>Path, schema, and fixture intelligence</h4>
            <div class="generic-quality-grid">
              <article class="generic-quality-card"><strong>Root type</strong><p>${typeLabel(parsed.value)} with ${stats.nodes} nodes and ${stats.depth} levels.</p></article>
              <article class="generic-quality-card"><strong>Secret scan</strong><p>${secrets.length ? `${secrets.length} suspicious key path(s): ${secrets.slice(0, 3).join(', ')}` : 'No obvious secret-like key names detected.'}</p></article>
              <article class="generic-quality-card"><strong>Schema inference</strong><p>Generated a JSON Schema-style draft from the current payload for test fixture handoff.</p></article>
              <article class="generic-quality-card"><strong>Flatten map</strong><p>Produced copyable JSONPath/value rows for debugging API contracts.</p></article>
            </div>
            <h5 style="margin:18px 0 8px;">Top JSONPath / pointer rows</h5>
            ${tableHtml(['JSONPath', 'Pointer', 'Type', 'Preview'], paths.map(row => [row.path, row.pointer, row.type, row.preview]))}
            <h5 style="margin:18px 0 8px;">Flattened fixture preview</h5>
            ${tableHtml(['Path', 'Value'], flat)}
            <details class="pesel-dev-accordion" open style="margin-top: 16px;">
              <summary>Inferred schema preview</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>${util.escapeHtml(JSON.stringify(schema, null, 2))}</pre>
              </div>
            </details>
          </section>
        </div>
      `);

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

    function initializeExplorer(workbench) {
      const explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer) return;
      selectTreeNode(workbench, "");
      const search = explorer.querySelector("[data-json-search]");
      if (search && search.value) {
        runTreeSearch(workbench, "first");
      }
    }

    function treePreview(value, stats) {
      const state = { rendered: 0, capped: false, largeMode: stats.largeMode };
      let html = `<div class="json-explorer" data-json-explorer>`
          + `<div class="json-explorer-toolbar">`
          + `<button type="button" class="json-tool-button" data-json-tree-action="expand-all">Expand all</button>`
          + `<button type="button" class="json-tool-button" data-json-tree-action="collapse-all">Collapse all</button>`
          + `<button type="button" class="json-tool-button" data-json-tree-action="focus-search">Focus search</button>`
          + `<button type="button" class="json-tool-button" data-json-tree-action="clear-search">Clear search</button>`
          + `<label class="json-search-label"><span>Search</span><input type="search" data-json-search placeholder="Keys or values..." autocomplete="off"></label>`
          + `<button type="button" class="json-tool-button" data-json-tree-action="previous-match">Previous</button>`
          + `<button type="button" class="json-tool-button" data-json-tree-action="next-match">Next</button>`
          + `<div class="json-tree-meta"><span>${stats.nodes} nodes</span><span data-json-search-count>No search</span></div>`
          + `</div>`
          + `<div class="json-tree-shell"><div class="json-tree" data-json-tree>`
          + treeNode(value, "root", "", "$", 0, state)
          + (state.capped ? `<div class="json-tree-more">Tree preview capped after ${TREE_NODE_RENDER_LIMIT} rendered nodes. Use search and formatting output for the full document.</div>` : "")
          + `</div></div>`
          + `<div class="json-node-inspector" data-json-node-details><strong>Select a node</strong><span>Click any tree row to inspect type, path, children, depth, and subtree size.</span></div>`
          + `<div class="json-copy-row">`
          + `<button type="button" class="json-tool-button" data-json-copy="subtree">Copy subtree JSON</button>`
          + `<button type="button" class="json-tool-button" data-json-copy="pointer">Copy JSON pointer</button>`
          + `<button type="button" class="json-tool-button" data-json-copy="path">Copy JSONPath</button>`
          + `</div>`
          + `</div>`;
      return html;
    }

    function treeNode(value, label, pointer, jsonPath, depth, state) {
      if (state.rendered > TREE_NODE_RENDER_LIMIT) {
        state.capped = true;
        return "";
      }
      state.rendered++;
      const leaf = value === null || typeof value !== "object";
      let children = "";
      let open = "";
      if (!leaf) {
        const len = Array.isArray(value) ? value.length : Object.keys(value).length;
        children = Array.isArray(value) ? `[${len}]` : `{${len}}`;
        open = depth < 2 ? " open" : "";
      }
      const valStr = leaf ? String(value) : "";
      const row = `<div class="json-tree-row" data-json-node data-json-pointer="${attr(pointer)}" data-json-path="${attr(jsonPath)}" style="--json-depth:${depth}">`
          + `<span class="json-tree-toggle"></span>`
          + `<span class="json-tree-label">${util.escapeHtml(label)}</span>`
          + `<span class="json-tree-type">${typeLabel(value)}</span>`
          + (leaf ? `<span class="json-tree-value" data-json-value-text>${util.escapeHtml(valStr)}</span>` : "")
          + `</div>`;
      if (leaf) {
        return `<div class="json-tree-leaf">${row}</div>`;
      }
      let childrenHtml = "";
      const keys = Object.keys(value);
      const limit = state.largeMode ? TREE_CHILD_RENDER_LIMIT : keys.length;
      for (let i = 0; i < limit; i++) {
        const key = keys[i];
        const childValue = value[key];
        const childPointer = pointer + "/" + key.replace(/~/g, "~0").replace(/\//g, "~1");
        const childPath = Array.isArray(value) ? `${jsonPath}[${key}]` : `${jsonPath}.${key}`;
        childrenHtml += treeNode(childValue, key, childPointer, childPath, depth + 1, state);
      }
      if (keys.length > limit) {
        childrenHtml += `<div class="json-tree-more" style="--json-depth:${depth + 1}">${keys.length - limit} more children hidden for responsiveness.</div>`;
      }
      return `<details class="json-tree-branch"${open} data-json-branch data-json-pointer="${attr(pointer)}"><summary>${row}<span class="json-child-count">${children}</span></summary>${childrenHtml}</details>`;
    }

    function attr(v) {
      return v.replace(/"/g, "&quot;");
    }

    function typeLabel(v) {
      if (v === null) return "null";
      if (Array.isArray(v)) return "array";
      if (typeof v === "object") return "object";
      return typeof v;
    }

    function selectTreeNode(workbench, pointer) {
      const explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer || !workbench._jsonExplorer) return;
      explorer.querySelectorAll("[data-json-node]").forEach(node => {
        node.classList.toggle("is-selected", node.dataset.jsonPointer === pointer);
      });
      workbench._jsonExplorer.selectedPointer = pointer;
      updateInspectorDetails(workbench, pointer);
    }

    function updateInspectorDetails(workbench, pointer) {
      const explorer = workbench.form.querySelector("[data-json-explorer]");
      const target = explorer ? explorer.querySelector("[data-json-node-details]") : null;
      if (!target || !workbench._jsonExplorer) return;
      const value = resolvePointer(workbench._jsonExplorer.value, pointer);
      const path = pointerToPath(pointer);
      let html = "";
      if (pointer === "") {
        const stats = subtreeStats(workbench._jsonExplorer.value);
        html = `<strong>Root Document</strong>`
            + `<div class="inspector-details-grid">`
            + `<div><dt>Type</dt><dd>${typeLabel(workbench._jsonExplorer.value)}</dd></div>`
            + `<div><dt>Subtree size</dt><dd>${stats.nodes}</dd></div>`
            + `<div><dt>Max depth</dt><dd>${stats.depth}</dd></div>`
            + `<div><dt>Elements</dt><dd>${stats.elements}</dd></div>`
            + `</div>`;
      } else {
        const stats = subtreeStats(value);
        const parentKey = pointer.substring(pointer.lastIndexOf("/") + 1).replace(/~1/g, "/").replace(/~0/g, "~");
        html = `<strong>Key: ${util.escapeHtml(parentKey)}</strong>`
            + `<div class="inspector-details-grid">`
            + `<div><dt>Type</dt><dd>${typeLabel(value)}</dd></div>`
            + `<div><dt>Subtree size</dt><dd>${stats.nodes}</dd></div>`
            + `<div><dt>JSON path</dt><dd><code>${util.escapeHtml(path)}</code></dd></div>`
            + `</div>`;
      }
      target.innerHTML = html;
    }

    function pointerToPath(pointer) {
      const parts = pointer.split("/").slice(1);
      let path = "$";
      parts.forEach(p => {
        const dec = p.replace(/~1/g, "/").replace(/~0/g, "~");
        if (/^\d+$/.test(dec)) {
          path += `[${dec}]`;
        } else {
          path += `.${dec}`;
        }
      });
      return path;
    }

    function resolvePointer(obj, pointer) {
      if (pointer === "") return obj;
      const parts = pointer.split("/").slice(1);
      let current = obj;
      for (let i = 0; i < parts.length; i++) {
        const key = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
        current = current[key];
      }
      return current;
    }

    function copySelectedNode(workbench, kind) {
      if (!workbench._jsonExplorer) return;
      const pointer = workbench._jsonExplorer.selectedPointer;
      if (kind === "pointer") {
        copyToClipboard(pointer, workbench, "Copied JSON pointer.");
      } else if (kind === "path") {
        copyToClipboard(pointerToPath(pointer), workbench, "Copied JSONPath.");
      } else if (kind === "subtree") {
        const val = resolvePointer(workbench._jsonExplorer.value, pointer);
        copyToClipboard(JSON.stringify(val, null, 2), workbench, "Copied subtree JSON.");
      }
    }

    function handleTreeAction(workbench, action) {
      const explorer = workbench.form.querySelector("[data-json-explorer]");
      if (!explorer) return;
      if (action === "expand-all") {
        explorer.querySelectorAll("[data-json-branch]").forEach(b => b.open = true);
      } else if (action === "collapse-all") {
        explorer.querySelectorAll("[data-json-branch]").forEach(b => b.open = false);
      } else if (action === "focus-search") {
        const search = explorer.querySelector("[data-json-search]");
        if (search) {
          search.focus();
          search.select();
        }
      } else if (action === "clear-search") {
        const search = explorer.querySelector("[data-json-search]");
        if (search) {
          search.value = "";
          runTreeSearch(workbench, "first");
        }
      } else if (action === "previous-match") {
        runTreeSearch(workbench, "previous");
      } else if (action === "next-match") {
        runTreeSearch(workbench, "next");
      }
    }

    function runTreeSearch(workbench, navigation) {
      const explorer = workbench.form.querySelector("[data-json-explorer]");
      const input = explorer ? explorer.querySelector("[data-json-search]") : null;
      if (!explorer || !input || !workbench._jsonExplorer) return;
      const query = input.value.trim().toLowerCase();
      const tree = explorer.querySelector("[data-json-tree]");

      // Reset old highlights
      tree.querySelectorAll(".json-tree-row").forEach(r => {
        r.classList.remove("is-search-match", "is-active-search-match");
        const valSpan = r.querySelector("[data-json-value-text]");
        if (valSpan && valSpan.dataset.originalText) {
          valSpan.textContent = valSpan.dataset.originalText;
        }
      });

      if (!query) {
        workbench._jsonExplorer.matches = [];
        workbench._jsonExplorer.matchIndex = -1;
        updateSearchCount(explorer, 0, 0, false);
        return;
      }

      const matchedPointers = [];
      const rows = Array.from(tree.querySelectorAll("[data-json-node]"));
      rows.forEach(row => {
        const label = row.querySelector(".json-tree-label").textContent.toLowerCase();
        const valueTextEl = row.querySelector("[data-json-value-text]");
        const valText = valueTextEl ? valueTextEl.textContent.toLowerCase() : "";
        if (label.includes(query) || valText.includes(query)) {
          row.classList.add("is-search-match");
          matchedPointers.push(row.dataset.jsonPointer);
        }
      });

      workbench._jsonExplorer.matches = matchedPointers;

      if (matchedPointers.length === 0) {
        workbench._jsonExplorer.matchIndex = -1;
        updateSearchCount(explorer, 0, 0, true);
        return;
      }

      let index = workbench._jsonExplorer.matchIndex;
      if (navigation === "first") {
        index = 0;
      } else if (navigation === "next") {
        index = (index + 1) % matchedPointers.length;
      } else if (navigation === "previous") {
        index = (index - 1 + matchedPointers.length) % matchedPointers.length;
      }

      workbench._jsonExplorer.matchIndex = index;
      const activePointer = matchedPointers[index];
      const activeRow = tree.querySelector(`[data-json-pointer="${attr(activePointer)}"]`);
      if (activeRow) {
        activeRow.classList.add("is-active-search-match");
        expandToNode(activeRow);
        activeRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      selectTreeNode(workbench, activePointer);
      updateSearchCount(explorer, index + 1, matchedPointers.length, true);
    }

    function expandToNode(rowEl) {
      let parent = rowEl.parentElement;
      while (parent && parent.tagName !== "DIV" && parent.classList.contains("json-tree") === false) {
        if (parent.tagName === "DETAILS" && parent.classList.contains("json-tree-branch")) {
          parent.open = true;
        }
        parent = parent.parentElement;
      }
    }

    function updateSearchCount(explorer, current, total, active) {
      const el = explorer.querySelector("[data-json-search-count]");
      if (!el) return;
      if (!active) {
        el.textContent = "No search";
        return;
      }
      el.textContent = total === 0 ? "No matches" : `${current} of ${total}`;
    }

    return {
      filePrefix: "validohub-json",
      onMount: onMount,
      run: run,
      applySample: applySample
    };
  })(window.ValidoWorkbench);

  window.ValidoWorkbench.registerPlugin(JSON_FORMATTER_ALGORITHM, JsonPlugin);
  window.ValidoWorkbench.registerPlugin(JSON_VALIDATOR_ALGORITHM, JsonPlugin);
})();
