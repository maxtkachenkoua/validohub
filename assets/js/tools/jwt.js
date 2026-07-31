(function () {
  const JWT_ALGORITHM = "validohub.jwt-decoder";
  const KNOWN_ALGORITHMS = [
    "HS256", "HS384", "HS512",
    "RS256", "RS384", "RS512",
    "ES256", "ES384", "ES512",
    "PS256", "PS384", "PS512",
    "EdDSA", "none"
  ];

  const JwtPlugin = (function (framework) {
    const util = framework.utilities;

    function jwtInputField(workbench) {
      return workbench.primaryInput()
        || workbench.form.querySelector('textarea[name="token"], input[name="token"], textarea[name="input"], input[name="input"]');
    }

    function applySample(workbench, sampleId) {
      const input = jwtInputField(workbench);
      if (!input) return;

      if (sampleId === "jwt-valid") {
        input.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4MTYyMzkwMjJ9.qRnHm6s81-81Sg83t8n84t_302d9t8s1_888d3s1_88";
      } else if (sampleId === "jwt-expired") {
        input.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.dGVzdF9zaWduYXR1cmVfZXhwaXJlZA==";
      } else if (sampleId === "jwt-unsigned") {
        input.value = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.";
      } else if (sampleId === "jwt-malformed") {
        input.value = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0";
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
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

    function parseJwt(token) {
      const compact = token.trim();
      const parts = compact.split(".");
      if (parts.length !== 3) {
        return invalidJwt("token", ["JWT compact tokens must contain exactly three dot-separated sections."], ["Use header.payload.signature format.", "Unsigned JWTs still include the trailing dot for an empty signature."]);
      }
      if (!parts[0]) {
        return invalidJwt("header", ["Header section is empty."], ["Provide a Base64URL-encoded JSON header."]);
      }
      if (!parts[1]) {
        return invalidJwt("payload", ["Payload section is empty."], ["Provide a Base64URL-encoded JSON payload."]);
      }
      const header = decodeJsonSection(parts[0], "header");
      if (!header.valid) {
        return header;
      }
      const payload = decodeJsonSection(parts[1], "payload");
      if (!payload.valid) {
        return payload;
      }
      const parsed = {
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
      const decoded = decodeBase64Url(section, name);
      if (!decoded.valid) {
        return decoded;
      }
      try {
        return { valid: true, value: JSON.parse(decoded.text) };
      } catch (error) {
        return invalidJwt(name, [`${titleCase(name)} decoded, but is not valid JSON: ${error.message}`], [`Check that the ${name} section is JSON before Base64URL encoding.`, "Use double quotes around JSON object keys and string values."]);
      }
    }

    function decodeBase64Url(section, name) {
      if (!/^[A-Za-z0-9_-]*$/.test(section)) {
        return invalidJwt(name, [`${titleCase(name)} contains characters outside the Base64URL alphabet.`], ["Use only A-Z, a-z, 0-9, hyphen, and underscore in JWT sections.", "Do not use standard Base64 plus or slash characters in JWT compact serialization."]);
      }
      if (section.length % 4 === 1) {
        return invalidJwt(name, [`${titleCase(name)} has an invalid Base64URL length.`], [`Check for missing or extra characters in the ${name} section.`]);
      }
      let base64 = section.replace(/-/g, "+").replace(/_/g, "/");
      const remainder = base64.length % 4;
      if (remainder > 0) {
        base64 += "=".repeat(4 - remainder);
      }
      try {
        const text = decodeURIComponent(atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return { valid: true, text: text };
      } catch (error) {
        return { valid: true, text: atob(base64) };
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

    function titleCase(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function health(parsed) {
      const errors = [];
      const warnings = [];
      const badges = [];

      // Algorithm check
      const alg = parsed.header.alg;
      if (!alg) {
        errors.push("Algorithm claim (alg) is missing in header.");
      } else if (KNOWN_ALGORITHMS.indexOf(alg) === -1) {
        warnings.push(`Unknown signature algorithm: ${alg}.`);
      }

      if (alg === "none") {
        warnings.push("Token is unsigned (alg: none).");
        badges.push({ label: "Unsigned", state: "warning" });
      } else {
        badges.push({ label: alg || "Unsigned", state: alg ? "success" : "warning" });
      }

      // Type check
      const typ = parsed.header.typ;
      if (typ && typ.toUpperCase() !== "JWT") {
        warnings.push(`Type claim (typ) is set to '${typ}'. Standard token format type is 'JWT'.`);
      }

      // Expiration check
      const now = Math.floor(Date.now() / 1000);
      const exp = parsed.payload.exp;
      if (exp !== undefined) {
        if (typeof exp !== "number") {
          errors.push("Expiration time (exp) must be a numeric Unix timestamp.");
        } else if (now > exp) {
          errors.push(`Token has expired. Expiration time: ${new Date(exp * 1000).toUTCString()}.`);
          badges.push({ label: "Expired", state: "error" });
        } else {
          badges.push({ label: "Active", state: "success" });
        }
      } else {
        warnings.push("Expiration time (exp) is missing in payload.");
      }

      // Not before check
      const nbf = parsed.payload.nbf;
      if (nbf !== undefined) {
        if (typeof nbf !== "number") {
          errors.push("Not before time (nbf) must be a numeric Unix timestamp.");
        } else if (now < nbf) {
          errors.push(`Token is not active yet (not before ${new Date(nbf * 1000).toUTCString()}).`);
        }
      }

      const messages = errors.concat(warnings);
      return {
        errors: errors,
        warnings: warnings,
        messages: messages,
        badges: badges
      };
    }

    function claimRows(parsed) {
      const now = Math.floor(Date.now() / 1000);
      const registered = [
        ["iss", "Issuer"],
        ["sub", "Subject"],
        ["aud", "Audience"],
        ["exp", "Expiration"],
        ["nbf", "Not before"],
        ["iat", "Issued at"],
        ["jti", "JWT ID"]
      ];
      return registered.map(pair => {
        const key = pair[0];
        const value = parsed.payload[key];
        let status = value === undefined ? "missing" : "present";
        let detail = value === undefined ? "Not provided" : String(Array.isArray(value) ? value.join(", ") : value);
        if (["exp", "nbf", "iat"].indexOf(key) !== -1 && typeof value === "number") {
          const delta = value - now;
          detail = new Date(value * 1000).toUTCString();
          status = key === "exp" && delta < 0 ? "expired" : key === "nbf" && delta > 0 ? "future" : "ok";
        }
        return [key, pair[1], status, detail];
      });
    }

    function securityReview(parsed) {
      const alg = parsed.header.alg || "missing";
      const rows = [];
      rows.push(["Algorithm", alg, alg === "none" ? "review" : KNOWN_ALGORITHMS.indexOf(alg) === -1 ? "unknown" : "known"]);
      rows.push(["Signature bytes", String(parsed.signature ? parsed.signature.length : 0), parsed.signature ? "present" : "missing"]);
      rows.push(["Expiration", parsed.payload.exp === undefined ? "missing" : "present", parsed.payload.exp === undefined ? "review" : parsed.health.errors.some(e => e.indexOf("expired") !== -1) ? "expired" : "ok"]);
      rows.push(["Audience", parsed.payload.aud === undefined ? "missing" : "present", parsed.payload.aud === undefined ? "review" : "ok"]);
      rows.push(["Issuer", parsed.payload.iss === undefined ? "missing" : "present", parsed.payload.iss === undefined ? "review" : "ok"]);
      rows.push(["Subject", parsed.payload.sub === undefined ? "missing" : "present", parsed.payload.sub === undefined ? "review" : "ok"]);
      return rows;
    }

    function jwtRiskScore(parsed) {
      let score = 100;
      if (!parsed.header.alg || parsed.header.alg === "none") score -= 35;
      if (!parsed.signature) score -= 20;
      if (parsed.payload.exp === undefined) score -= 20;
      if (parsed.payload.aud === undefined) score -= 10;
      if (parsed.payload.iss === undefined) score -= 10;
      if (parsed.health.errors.length) score -= 25;
      if (parsed.health.warnings.length) score -= Math.min(20, parsed.health.warnings.length * 5);
      return Math.max(0, score);
    }

    function tableHtml(headers, rows) {
      return '<div class="generic-table-shell"><table class="pesel-dev-table"><thead><tr>'
        + headers.map(h => '<th>' + util.escapeHtml(h) + '</th>').join('')
        + '</tr></thead><tbody>'
        + rows.map(row => '<tr>' + row.map(cell => '<td>' + util.escapeHtml(String(cell)) + '</td>').join('') + '</tr>').join('')
        + '</tbody></table></div>';
    }

    function onMount(workbench) {
      workbench.form._workbench = workbench;

      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = "JWT Decoder & Explainer";
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = "Decode, parse, and validate JSON Web Tokens (JWT) locally inside your secure browser sandbox.";
        }

        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Shield</span>
            <span class="pesel-pill">📅 Claims Inspector</span>
            <span class="pesel-pill">⚡ Real-time Parser</span>
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
      const inputField = jwtInputField(workbench);
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
            <option value="jwt-valid">Valid Token</option>
            <option value="jwt-expired">Expired Token</option>
            <option value="jwt-unsigned">Unsigned Token</option>
            <option value="jwt-malformed">Malformed Token</option>
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
            <option value="">-- Recent Tokens --</option>
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
          localStorage.removeItem('validohub.jwt.history');
          const select = fieldGrid.querySelector('#pesel-history');
          select.innerHTML = '<option value="">-- Recent Tokens --</option>';
          workbench.setMessage('Validation history cleared.', 'success');
        });
      }

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.jwt.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent Tokens --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            const shortened = it.value.length > 20 ? it.value.substring(0, 18) + '...' : it.value;
            opt.textContent = `${shortened} (${it.date})`;
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
            <div class="pesel-empty-title">JWT Decoder Sandbox</div>
            <div class="pesel-empty-desc">Enter or paste a JSON Web Token above. Parse operations execute entirely inside your local browser.</div>
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
            <div class="pesel-timeline-node" data-node="header">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Header</span>
            </div>
            <div class="pesel-timeline-node" data-node="payload">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Payload</span>
            </div>
            <div class="pesel-timeline-node" data-node="complete">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Complete</span>
            </div>
          </div>

          <div class="pesel-results-container" style="display: none;"></div>
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>
          <div class="pesel-breakdown" id="jwt-visual-explorer" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
      }

      bindJwtInteractions(workbench);

      // Live-mode debounced validation logic trigger
      let debounceTimeout = null;
      if (inputField) {
        inputField.addEventListener('input', () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            workbench.run(workbench.form.dataset.activeAction || "decode", { quiet: true });
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

    function bindJwtInteractions(workbench) {
      if (workbench.form.dataset.jwtInteractionsBound === "true") {
        return;
      }
      workbench.form.dataset.jwtInteractionsBound = "true";
      const debouncedSearch = util.debounce(() => {
        runPayloadSearch(workbench, "first");
      }, 120);

      workbench.form.addEventListener("click", (event) => {
        const copy = event.target.closest("[data-jwt-copy]");
        if (copy) {
          copyJwtSection(workbench, copy.dataset.jwtCopy);
          return;
        }
        const download = event.target.closest("[data-jwt-download]");
        if (download) {
          downloadJwtSection(workbench, download.dataset.jwtDownload);
          return;
        }
        const action = event.target.closest("[data-jwt-tree-action]");
        if (action) {
          handlePayloadTreeAction(workbench, action.dataset.jwtTreeAction);
          return;
        }
        const node = event.target.closest("[data-jwt-node]");
        if (node) {
          selectPayloadNode(workbench, node.dataset.jwtPointer);
        }
      });

      workbench.form.addEventListener("input", (event) => {
        if (event.target.matches("[data-jwt-search]")) {
          debouncedSearch();
        }
      });

      workbench.form.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
          const search = workbench.form.querySelector("[data-jwt-search]");
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
      const values = workbench.values();
      const rawInput = values.input || values.token || '';
      const inputVal = rawInput.trim();

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const visualExplorer = workbench.form.querySelector('#jwt-visual-explorer');
      const timelineTracker = workbench.form.querySelector('.pesel-timeline-tracker');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');

      const startTime = performance.now();

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.jwt.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent Tokens --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            const shortened = it.value.length > 20 ? it.value.substring(0, 18) + '...' : it.value;
            opt.textContent = `${shortened} (${it.date})`;
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

      if (!inputVal) {
        workbench.setOutput("");
        workbench.clearPanels();
        workbench.setMessage(options.quiet ? "" : "Please enter a JWT token.", options.quiet ? "" : "error");
        if (emptyStateCard) emptyStateCard.style.display = 'flex';
        if (timelineTracker) timelineTracker.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (visualExplorer) visualExplorer.style.display = 'none';
        return;
      }

      if (emptyStateCard) emptyStateCard.style.display = 'none';
      if (timelineTracker) timelineTracker.style.display = 'flex';

      setTimelineStatus('input', 'active');
      setTimelineStatus('header', 'active');
      setTimelineStatus('payload', 'active');
      setTimelineStatus('complete', 'active');

      const progressBar = timelineTracker.querySelector('#pesel-progress-bar');
      if (progressBar) progressBar.style.width = '100%';

      const parsed = parseJwt(inputVal);
      const elapsed = (performance.now() - startTime).toFixed(2);

      if (!parsed.valid) {
        setTimelineStatus('header', 'error');
        setTimelineStatus('complete', 'error');

        workbench.setOutput(`Invalid JWT: ${parsed.errors.join(", ")}`);
        workbench.setMessage("Invalid JWT token.", "error");
        workbench.setBadge({ label: "Error", state: "error" });
        workbench.setStats([["Token sections", String(inputVal.split(".").length)], ["Input characters", String(inputVal.length)]], parsed.repairs, "error");

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: JWT Parse Error</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              ${parsed.errors.map(err => `
                <div class="pesel-result-row">
                  <span class="row-label">Parse Error Detail</span>
                  <span class="row-value">${err}</span>
                </div>
              `).join('')}
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (visualExplorer) visualExplorer.style.display = 'none';
        return;
      }

      // Add to history
      const historyItems = JSON.parse(localStorage.getItem('validohub.jwt.history') || '[]');
      if (!historyItems.some(it => it.value === inputVal)) {
        historyItems.unshift({ value: inputVal, date: new Date().toISOString().split('T')[0] });
        localStorage.setItem('validohub.jwt.history', JSON.stringify(historyItems.slice(0, 20)));
        refreshHistorySelect();
      }

      // Valid output formatted JSON
      const decodedOutput = JSON.stringify(decodedJson(parsed), null, 2);
      const claimTable = claimRows(parsed);
      const securityRows = securityReview(parsed);
      const riskScore = jwtRiskScore(parsed);
      workbench.setOutput(decodedOutput);
      workbench.setMessage("Decoded JWT locally in your browser.", parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setStats(stats(parsed), parsed.health.messages, parsed.health.errors.length > 0 ? "error" : parsed.health.warnings.length > 0 ? "warning" : "success");
      workbench.setBadge({ label: parsed.header.alg || "JWT", state: "success" });

      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
            <span>✓ Decoded Successfully</span>
            <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Decoded in: ${elapsed} ms</span>
          </div>
          <div class="pesel-results-grid reveal-element reveal-delay-1">
            <div class="pesel-result-row">
              <span class="row-label">Decoded Payload</span>
              <span class="row-value" style="word-break:break-all; font-family:monospace; max-height:160px; overflow-y:auto;">${decodedOutput}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Algorithm</span>
              <span class="row-value">${parsed.header.alg || 'none'}</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Type</span>
              <span class="row-value">${parsed.header.typ || 'JWT'}</span>
            </div>
          </div>
        `;
        resultsContainer.style.display = 'flex';
      }

      if (customActions) {
        customActions.innerHTML = `
          <button type="button" class="button button-secondary compact" id="custom-copy-result">Copy Payload JSON</button>
        `;
        customActions.querySelector('#custom-copy-result').addEventListener('click', () => {
          copyToClipboard(decodedOutput, workbench, 'Copied decoded payload JSON.');
        });
        customActions.style.display = 'flex';
      }

      // Render Visual Claims Explorer
      if (visualExplorer) {
        visualExplorer.innerHTML = jwtPreview(parsed);
        visualExplorer.style.display = 'block';

        window.setTimeout(() => {
          initializePayloadExplorer(workbench);
        }, 0);
      }

      // Setup API Developer Snippets Panel
      workbench.setAdvanced(`
        <div class="pesel-dev-section">
          <section class="generic-analysis-section">
            <h4>JWT security and claim intelligence</h4>
            <div class="generic-quality-grid">
              <article class="generic-quality-card"><strong>Local risk score</strong><p>${riskScore}/100 based on algorithm, signature presence, expiration, issuer, audience, and parser errors.</p></article>
              <article class="generic-quality-card"><strong>Verification boundary</strong><p>This workbench decodes and audits structure locally. Cryptographic trust still requires the correct secret, public key, or JWKS.</p></article>
              <article class="generic-quality-card"><strong>Claim clock</strong><p>exp, nbf, and iat are interpreted against the browser clock for immediate expiry and activation review.</p></article>
              <article class="generic-quality-card"><strong>Header safety</strong><p>alg none, unknown algorithms, missing typ, or empty signatures are surfaced as review conditions.</p></article>
            </div>
            <h5 style="margin:18px 0 8px;">Registered claims</h5>
            ${tableHtml(['Claim', 'Meaning', 'State', 'Value'], claimTable)}
            <h5 style="margin:18px 0 8px;">Security checklist</h5>
            ${tableHtml(['Check', 'Evidence', 'State'], securityRows)}
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
      return "<div class=\"jwt-badges\">" + parsed.health.badges.map(badge => {
        return "<span class=\"jwt-badge\" data-state=\"" + badge.state + "\">" + util.escapeHtml(badge.label) + "</span>";
      }).join("") + "</div>";
    }

    function tokenMarkup(parsed) {
      return "<span class=\"jwt-token-header\" style=\"color:#eb5757; font-weight:700;\">" + util.escapeHtml(parsed.parts[0]) + "</span>"
          + "<span class=\"jwt-token-dot\">.</span>"
          + "<span class=\"jwt-token-payload\" style=\"color:#8b5cf6; font-weight:700;\">" + util.escapeHtml(parsed.parts[1]) + "</span>"
          + "<span class=\"jwt-token-dot\">.</span>"
          + "<span class=\"jwt-token-signature\" style=\"color:#2f80ed; font-weight:700;\">" + util.escapeHtml(parsed.parts[2]) + "</span>";
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
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Signature</span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"signature\">Copy</button></div><pre class=\"jwt-signature\" style=\"font-family:monospace;\"><code>" + util.escapeHtml(parsed.signature || "Missing signature") + "</code></pre></section>";
    }

    function decodedCard(parsed) {
      const decoded = JSON.stringify(decodedJson(parsed), null, 2);
      return "<section class=\"jwt-section\"><div class=\"jwt-section-title\"><span>Decoded JSON</span><span><button type=\"button\" class=\"json-tool-button\" data-jwt-copy=\"decoded\">Copy</button><button type=\"button\" class=\"json-tool-button\" data-jwt-download=\"decoded\">Download</button></span></div><pre class=\"json-code\"><code>" + highlightJson(decoded) + "</code></pre></section>";
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

    function decodedJson(parsed) {
      return {
        header: parsed.header,
        payload: parsed.payload,
        signature: parsed.signature
      };
    }

    function stats(parsed) {
      const rowList = [];
      rowList.push(["Algorithm", parsed.header.alg || "none"]);
      if (parsed.header.typ) {
        rowList.push(["Type", parsed.header.typ]);
      }
      rowList.push(["Claims count", String(Object.keys(parsed.payload).length)]);
      const sizeBytes = util.utf8Bytes(parsed.token).length;
      rowList.push(["Token size", util.formatBytes(sizeBytes)]);
      return rowList;
    }

    function payloadExplorer(payload) {
      const state = { rendered: 0, limit: 900, capped: false };
      const tree = treeNode(payload, "payload", "", "$", 0, state);
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
      const type = rootType(value);
      const container = type === "array" || type === "object";
      const icon = type === "object" ? "{}" : type === "array" ? "[]" : "v";
      const row = "<div class=\"json-tree-row\" data-jwt-node data-jwt-pointer=\"" + attr(pointer) + "\" data-jwt-path=\"" + attr(jsonPath) + "\" style=\"--json-depth:" + depth + "\">"
          + "<span class=\"json-tree-toggle\"></span>"
          + "<span class=\"json-tree-label\">" + util.escapeHtml(label) + "</span>"
          + "<span class=\"json-tree-type\">" + icon + "</span>"
          + (container ? "" : "<span class=\"json-tree-value\">" + util.escapeHtml(String(value)) + "</span>")
          + "</div>";
      if (!container) {
        return "<div class=\"json-tree-leaf\">" + row + "</div>";
      }
      let html = "";
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const nextPointer = pointer + "/" + key.replace(/~/g, "~0").replace(/\//g, "~1");
        const nextPath = type === "array" ? jsonPath + "[" + key + "]" : jsonPath + "." + key;
        html += treeNode(value[key], key, nextPointer, nextPath, depth + 1, state);
      }
      const children = type === "array" ? "[" + keys.length + "]" : "{" + keys.length + "}";
      return "<details class=\"json-tree-branch\" open data-jwt-branch data-jwt-pointer=\"" + attr(pointer) + "\"><summary>" + row + "<span class=\"json-child-count\">" + children + "</span></summary>" + html + "</details>";
    }

    function rootType(v) {
      if (v === null) return "null";
      if (Array.isArray(v)) return "array";
      return typeof v;
    }

    function countNodes(v) {
      let count = 0;
      function countAll(val) {
        count++;
        if (val && typeof val === "object") {
          Object.keys(val).forEach(k => countAll(val[k]));
        }
      }
      countAll(v);
      return count;
    }

    function attr(v) {
      return v.replace(/"/g, "&quot;");
    }

    function initializePayloadExplorer(workbench) {
      const explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer) return;
      selectPayloadNode(workbench, "");
      const search = explorer.querySelector("[data-jwt-search]");
      if (search && search.value) {
        runPayloadSearch(workbench, "first");
      }
    }

    function selectPayloadNode(workbench, pointer) {
      const explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer || !workbench._jwt) return;
      explorer.querySelectorAll("[data-jwt-node]").forEach(node => {
        node.classList.toggle("is-selected", node.dataset.jwtPointer === pointer);
      });
      updateInspector(workbench, pointer);
    }

    function updateInspector(workbench, pointer) {
      const explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      const target = explorer ? explorer.querySelector("[data-jwt-node-details]") : null;
      if (!target || !workbench._jwt) return;
      const path = pointerToPath(pointer);
      let html = "";
      if (pointer === "") {
        html = "<strong>Payload root</strong><span>Select any claim row below to copy path or inspect values.</span>";
      } else {
        html = "<strong>JSON Path</strong><code>" + util.escapeHtml(path) + "</code>";
      }
      target.innerHTML = html;
    }

    function pointerToPath(pointer) {
      const parts = pointer.split("/").slice(1);
      let path = "payload";
      parts.forEach(p => {
        const dec = p.replace(/~1/g, "/").replace(/~0/g, "~");
        if (/^\d+$/.test(dec)) {
          path += "[" + dec + "]";
        } else {
          path += "." + dec;
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

    function copyJwtSection(workbench, key) {
      if (!workbench._jwt) return;
      if (key === "token") {
        copyToClipboard(workbench._jwt.token, workbench, "Copied raw token.");
      } else if (key === "header") {
        copyToClipboard(workbench._jwt.headerJson, workbench, "Copied header JSON.");
      } else if (key === "payload") {
        copyToClipboard(workbench._jwt.payloadJson, workbench, "Copied payload JSON.");
      } else if (key === "signature") {
        copyToClipboard(workbench._jwt.signature || "", workbench, "Copied signature.");
      } else if (key === "decoded") {
        const decoded = JSON.stringify(decodedJson(workbench._jwt), null, 2);
        copyToClipboard(decoded, workbench, "Copied decoded JSON.");
      }
    }

    function downloadJwtSection(workbench, key) {
      if (!workbench._jwt) return;
      let text = "";
      let filename = "jwt-section.json";
      if (key === "header") {
        text = workbench._jwt.headerJson;
        filename = "jwt-header.json";
      } else if (key === "payload") {
        text = workbench._jwt.payloadJson;
        filename = "jwt-payload.json";
      } else if (key === "decoded") {
        text = JSON.stringify(decodedJson(workbench._jwt), null, 2);
        filename = "jwt-decoded.json";
      }
      if (!text) return;
      const blob = new Blob([text], { type: "application/json;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      workbench.setMessage("Downloaded " + filename + ".", "success");
    }

    function handlePayloadTreeAction(workbench, action) {
      const explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      if (!explorer) return;
      if (action === "expand-all") {
        explorer.querySelectorAll("[data-jwt-branch]").forEach(b => b.open = true);
      } else if (action === "collapse-all") {
        explorer.querySelectorAll("[data-jwt-branch]").forEach(b => b.open = false);
      } else if (action === "clear-search") {
        const search = explorer.querySelector("[data-jwt-search]");
        if (search) {
          search.value = "";
          runPayloadSearch(workbench, "first");
        }
      } else if (action === "previous-match") {
        runPayloadSearch(workbench, "previous");
      } else if (action === "next-match") {
        runPayloadSearch(workbench, "next");
      }
    }

    function runPayloadSearch(workbench, navigation) {
      const explorer = workbench.form.querySelector("[data-jwt-payload-explorer]");
      const input = explorer ? explorer.querySelector("[data-jwt-search]") : null;
      if (!explorer || !input || !workbench._jwt) return;
      const query = input.value.trim().toLowerCase();
      const tree = explorer.querySelector("[data-jwt-tree]");

      tree.querySelectorAll(".json-tree-row").forEach(r => {
        r.classList.remove("is-search-match", "is-active-search-match");
      });

      if (!query) {
        updateSearchCount(explorer, 0, 0, false);
        return;
      }

      const matchedPointers = [];
      const rows = Array.from(tree.querySelectorAll("[data-jwt-node]"));
      rows.forEach(row => {
        const label = row.querySelector(".json-tree-label").textContent.toLowerCase();
        const valueSpan = row.querySelector(".json-tree-value");
        const valText = valueSpan ? valueSpan.textContent.toLowerCase() : "";
        if (label.includes(query) || valText.includes(query)) {
          row.classList.add("is-search-match");
          matchedPointers.push(row.dataset.jwtPointer);
        }
      });

      if (matchedPointers.length === 0) {
        updateSearchCount(explorer, 0, 0, true);
        return;
      }

      let index = 0;
      if (navigation === "next" || navigation === "previous") {
        const active = tree.querySelector(".is-active-search-match");
        const activePointer = active ? active.dataset.jwtPointer : null;
        const currentIdx = activePointer ? matchedPointers.indexOf(activePointer) : -1;
        if (navigation === "next") {
          index = (currentIdx + 1) % matchedPointers.length;
        } else {
          index = (currentIdx - 1 + matchedPointers.length) % matchedPointers.length;
        }
      }

      const activePointer = matchedPointers[index];
      const activeRow = tree.querySelector(`[data-jwt-pointer="${attr(activePointer)}"]`);
      if (activeRow) {
        activeRow.classList.add("is-active-search-match");
        expandToNode(activeRow);
        activeRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      selectPayloadNode(workbench, activePointer);
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
      const el = explorer.querySelector("[data-jwt-search-count]");
      if (!el) return;
      if (!active) {
        el.textContent = "No search";
        return;
      }
      el.textContent = total === 0 ? "No matches" : `${current} of ${total}`;
    }

    return {
      filePrefix: "validohub-jwt",
      onMount: onMount,
      run: run,
      applySample: applySample
    };
  })(window.ValidoWorkbench);

  window.ValidoWorkbench.registerPlugin(JWT_ALGORITHM, JwtPlugin);
})();
