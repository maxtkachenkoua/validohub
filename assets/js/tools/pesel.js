(function () {
  'use strict';

  const PESEL_ALGORITHM = 'validohub.pesel';

  const isValidCalendarDate = function (year, month, day) {
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === (month - 1) && d.getDate() === day;
  };

  const generateRandomPesel = function (gender, invalidType) {
    const startYear = 1970 + Math.floor(Math.random() * 50); // 1970 to 2020
    let yearVal = startYear % 100;
    let monthVal = 1 + Math.floor(Math.random() * 12);

    // Century offsets
    let monthOffset = 0;
    if (startYear >= 1800 && startYear < 1900) monthOffset = 80;
    else if (startYear >= 2000 && startYear < 2100) monthOffset = 20;
    else if (startYear >= 2100 && startYear < 2200) monthOffset = 40;
    else if (startYear >= 2200 && startYear < 2300) monthOffset = 60;

    let encodedMonth = monthVal + monthOffset;

    // Day
    let daysInMonth = new Date(startYear, monthVal, 0).getDate();
    let dayVal = 1 + Math.floor(Math.random() * daysInMonth);

    if (invalidType === 'date') {
      dayVal = 35; // mathematically impossible day
    }

    // Serial (last digit represents gender)
    let serialDigits = [];
    for (let i = 0; i < 3; i++) serialDigits.push(Math.floor(Math.random() * 10));

    let genderDigit = Math.floor(Math.random() * 10);
    if (gender === 'male' && genderDigit % 2 === 0) {
      genderDigit = (genderDigit + 1) % 10;
    } else if (gender === 'female' && genderDigit % 2 !== 0) {
      genderDigit = (genderDigit + 1) % 10;
    }

    const part = [
      String(yearVal).padStart(2, '0'),
      String(encodedMonth).padStart(2, '0'),
      String(dayVal).padStart(2, '0'),
      serialDigits.join(''),
      String(genderDigit)
    ].join('');

    // Calculate checksum
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(part[i], 10) * weights[i];
    }
    let calculatedChecksum = (10 - (sum % 10)) % 10;

    if (invalidType === 'checksum') {
      calculatedChecksum = (calculatedChecksum + 1) % 10; // mismatch!
    }

    return part + calculatedChecksum;
  };

  const syntaxHighlightJson = function (jsonObj) {
    let jsonStr = JSON.stringify(jsonObj, null, 2);
    jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="json-' + cls + '">' + match + '</span>';
    });
  };

  const injectStyles = function () {
    if (document.getElementById('pesel-premium-styles')) return;
    const style = document.createElement('style');
    style.id = 'pesel-premium-styles';
    style.textContent = `
      .pesel-premium-panel {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }
      .pesel-badge-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .pesel-pill {
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 4px 10px;
        border-radius: 9999px;
        background: var(--surface-soft);
        border: 1px solid var(--line);
        color: var(--muted);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .pesel-pill.active {
        background: rgba(47, 128, 237, 0.1);
        border-color: rgba(47, 128, 237, 0.3);
        color: #2f80ed;
      }
      .pesel-empty-state {
        border: 1px dashed var(--line);
        border-radius: 8px;
        padding: 40px 20px;
        text-align: center;
        background: var(--surface-soft);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        transition: opacity 0.2s;
      }
      .pesel-empty-title {
        font-size: 1rem;
        font-weight: 700;
        color: var(--text);
      }
      .pesel-empty-desc {
        font-size: 0.85rem;
        color: var(--muted);
        max-width: 420px;
        line-height: 1.5;
      }
      .pesel-trust-row {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 16px;
      }
      .pesel-trust-badge {
        font-size: 0.72rem;
        color: var(--muted);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .pesel-playground-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }
      .pesel-playground-btn {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 10px;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text);
        cursor: pointer;
        transition: all 0.2s;
        text-align: center;
      }
      .pesel-playground-btn:hover {
        border-color: var(--muted);
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0,0,0,0.05);
      }
      .pesel-playground-btn:active {
        transform: translateY(0);
      }
      .pesel-history-list {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-height: 280px;
        overflow-y: auto;
        margin-top: 8px;
      }
      .pesel-history-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 0.8rem;
        transition: all 0.2s;
      }
      .pesel-history-item:hover {
        border-color: var(--muted);
      }
      .pesel-history-meta {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-history-value {
        font-family: monospace;
        font-weight: 700;
        cursor: pointer;
        color: var(--text);
      }
      .pesel-history-badge {
        font-size: 0.65rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .pesel-history-badge.valid { background: rgba(22, 163, 74, 0.1); color: #16a34a; }
      .pesel-history-badge.invalid { background: rgba(220, 38, 38, 0.1); color: #dc2626; }
      .pesel-history-actions {
        display: flex;
        gap: 6px;
      }
      .pesel-history-action-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 0.75rem;
        color: var(--muted);
        padding: 2px 4px;
        border-radius: 4px;
        transition: background 0.2s, color 0.2s;
      }
      .pesel-history-action-btn:hover {
        background: var(--line);
        color: var(--text);
      }
      .pesel-pipeline {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-section-title {
        font-size: 0.9rem;
        font-weight: 700;
        margin: 0 0 16px 0;
        color: var(--text);
        display: flex;
        align-items: center;
        gap: 8px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        border-bottom: 1px solid var(--line);
        padding-bottom: 8px;
      }
      .pesel-pipeline-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
      }
      .pesel-step {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.85rem;
        font-weight: 500;
        padding: 14px;
        border-radius: 6px;
        background: var(--surface);
        border: 1px solid var(--line);
        transition: border-color 0.2s, box-shadow 0.2s;
        gap: 10px;
      }
      .pesel-step.success {
        border-color: rgba(22, 163, 74, 0.25);
        background: rgba(22, 163, 74, 0.01);
      }
      .pesel-step.failure {
        border-color: rgba(220, 38, 38, 0.25);
        background: rgba(220, 38, 38, 0.01);
      }
      .pesel-step.pending {
        color: var(--muted);
        opacity: 0.65;
      }
      .pesel-step-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }
      .pesel-step-title {
        font-weight: 700;
        color: var(--text);
      }
      .pesel-step-desc {
        font-size: 0.76rem;
        color: var(--muted);
        line-height: 1.4;
      }
      .pesel-step-badge {
        font-size: 0.65rem;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 0.05em;
      }
      .pesel-step.success .pesel-step-badge {
        background: rgba(22, 163, 74, 0.1);
        color: #16a34a;
      }
      .pesel-step.failure .pesel-step-badge {
        background: rgba(220, 38, 38, 0.1);
        color: #dc2626;
      }
      .pesel-step.pending .pesel-step-badge {
        background: var(--line);
        color: var(--muted);
      }

      /* Timeline styles */
      .pesel-timeline-tracker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px 20px;
        margin-bottom: 20px;
        position: relative;
        overflow-x: auto;
      }
      .pesel-timeline-line {
        position: absolute;
        top: 24px;
        left: 36px;
        right: 36px;
        height: 2px;
        background: var(--line);
        z-index: 1;
      }
      .pesel-timeline-progress {
        position: absolute;
        top: 24px;
        left: 36px;
        height: 2px;
        background: #16a34a;
        z-index: 2;
        width: 0%;
        transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pesel-timeline-node {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        z-index: 3;
        position: relative;
        min-width: 60px;
      }
      .pesel-timeline-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--surface);
        border: 2px solid var(--line);
        transition: all 0.25s ease;
      }
      .pesel-timeline-node.active .pesel-timeline-dot {
        border-color: #16a34a;
        background: #16a34a;
        box-shadow: 0 0 8px rgba(22, 163, 74, 0.4);
      }
      .pesel-timeline-node.error .pesel-timeline-dot {
        border-color: #dc2626;
        background: #dc2626;
        box-shadow: 0 0 8px rgba(220, 38, 38, 0.4);
      }
      .pesel-timeline-node-text {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--muted);
      }
      .pesel-timeline-node.active .pesel-timeline-node-text {
        color: var(--text);
      }

      .pesel-results-container {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface-soft);
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .pesel-results-header {
        font-size: 1.05rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pesel-results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }
      .pesel-result-row {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        position: relative;
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .pesel-result-row:hover {
        border-color: var(--muted);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      .pesel-result-row .row-label {
        font-size: 0.72rem;
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .pesel-result-row .row-value {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text);
      }
      .pesel-row-copy-btn {
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        font-size: 0.75rem;
        color: var(--muted);
        transition: background 0.2s, color 0.2s;
      }
      .pesel-row-copy-btn:hover {
        background: var(--line);
        color: var(--text);
      }
      .pesel-breakdown {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-breakdown-digits {
        display: flex;
        gap: 6px;
        justify-content: center;
        margin: 16px 0;
      }
      .pesel-digit-box {
        font-family: monospace;
        font-size: 1.4rem;
        font-weight: 700;
        width: 36px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface);
        transition: all 0.2s ease;
      }
      .pesel-digit-box.is-hovered {
        background: var(--line) !important;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.08);
      }
      .pesel-digit-box.year { border-color: rgba(47, 128, 237, 0.4); color: #2f80ed; }
      .pesel-digit-box.month { border-color: rgba(16, 185, 129, 0.4); color: #10b981; }
      .pesel-digit-box.day { border-color: rgba(245, 158, 11, 0.4); color: #f59e0b; }
      .pesel-digit-box.serial { border-color: rgba(139, 92, 246, 0.4); color: #8b5cf6; }
      .pesel-digit-box.checksum { border-color: rgba(236, 72, 153, 0.4); color: #ec4899; }

      .pesel-breakdown-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        margin-top: 12px;
      }
      .pesel-legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 4px;
        border: 1px solid var(--line);
        background: var(--surface);
        transition: all 0.2s ease;
        cursor: pointer;
      }
      .pesel-legend-item.is-hovered {
        border-color: var(--muted);
        background: var(--surface-soft);
      }
      .pesel-legend-item::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 2px;
      }
      .pesel-legend-item.year::before { background: #2f80ed; }
      .pesel-legend-item.month::before { background: #10b981; }
      .pesel-legend-item.day::before { background: #f59e0b; }
      .pesel-legend-item.serial::before { background: #8b5cf6; }
      .pesel-legend-item.checksum::before { background: #ec4899; }

      .pesel-checksum-debugger {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-debugger-table-container {
        overflow-x: auto;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface);
      }
      .pesel-dev-table {
        width: 100%;
        border-collapse: collapse;
        font-family: monospace;
        font-size: 0.8rem;
      }
      .pesel-dev-table th, .pesel-dev-table td {
        border-bottom: 1px solid var(--line);
        padding: 8px 10px;
        text-align: center;
        transition: background 0.15s ease;
      }
      .pesel-dev-table tbody tr.is-active td {
        background: rgba(47, 128, 237, 0.08) !important;
        color: var(--text);
      }
      .pesel-dev-table tbody tr:hover td {
        background: var(--line);
      }
      .pesel-dev-table th {
        background: var(--surface-soft);
        color: var(--muted);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.72rem;
      }
      .pesel-formula-summary {
        margin-top: 16px;
        padding: 14px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 6px;
        font-family: monospace;
        font-size: 0.85rem;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .pesel-formula-summary .pesel-formula-step {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed var(--line);
        padding-bottom: 6px;
      }
      .pesel-formula-summary .pesel-formula-step:last-child {
        border-bottom: none;
        padding-bottom: 0;
        font-weight: 700;
      }

      /* DevTools Accordions */
      .pesel-dev-section {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pesel-dev-accordion {
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--surface-soft);
        overflow: hidden;
      }
      .pesel-dev-accordion summary {
        font-size: 0.78rem;
        font-weight: 700;
        padding: 10px 14px;
        cursor: pointer;
        background: var(--surface);
        border-bottom: 1px solid transparent;
        user-select: none;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .pesel-dev-accordion summary::after {
        content: '▼';
        font-size: 0.65rem;
        color: var(--muted);
        transition: transform 0.2s;
      }
      .pesel-dev-accordion[open] summary::after {
        transform: rotate(-180deg);
      }
      .pesel-dev-accordion[open] summary {
        border-bottom-color: var(--line);
      }
      .pesel-dev-accordion-content {
        padding: 14px;
        background: var(--surface);
        position: relative;
      }
      .pesel-dev-accordion-copy-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 0.72rem;
        color: var(--muted);
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      }
      .pesel-dev-accordion-copy-btn:hover {
        background: var(--line);
        color: var(--text);
      }
      .pesel-dev-accordion-content pre {
        margin: 0;
        font-family: monospace;
        font-size: 0.8rem;
        line-height: 1.4;
        white-space: pre-wrap;
      }

      /* Developer API Documentation card */
      .pesel-api-card {
        background: var(--surface-soft);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 20px;
      }
      .pesel-api-tabs {
        display: flex;
        gap: 6px;
        border-bottom: 1px solid var(--line);
        padding-bottom: 8px;
        margin-bottom: 12px;
      }
      .pesel-api-tab {
        background: none;
        border: 1px solid transparent;
        color: var(--muted);
        font-size: 0.75rem;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .pesel-api-tab.active {
        background: var(--surface);
        border-color: var(--line);
        color: var(--text);
      }

      .json-key { color: #f2c94c; font-weight: 600; }
      .json-string { color: #10b981; }
      .json-number { color: #2f80ed; }
      .json-boolean { color: #eb5757; }
      .json-null { color: #828282; }

      /* Visual Reveal Keyframe Classes */
      @keyframes reveal {
        from {
          opacity: 0;
          transform: translateY(6px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .reveal-element {
        opacity: 0;
        animation: reveal 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .reveal-delay-1 { animation-delay: 50ms; }
      .reveal-delay-2 { animation-delay: 100ms; }
      .reveal-delay-3 { animation-delay: 150ms; }
      .reveal-delay-4 { animation-delay: 200ms; }
      .reveal-delay-5 { animation-delay: 250ms; }

      /* Interactive Discovery */
      .pesel-discovery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      .pesel-discovery-card {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 16px;
        background: var(--surface-soft);
        text-decoration: none;
        color: inherit;
        transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .pesel-discovery-card:hover {
        transform: translateY(-2px);
        border-color: var(--muted);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      .pesel-discovery-card h4 {
        margin: 0 0 8px 0;
        font-size: 0.95rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .pesel-discovery-card h4 span {
        transition: transform 0.2s;
      }
      .pesel-discovery-card:hover h4 span {
        transform: translateX(3px);
      }
      .pesel-discovery-card p {
        margin: 0 0 12px 0;
        font-size: 0.82rem;
        color: var(--muted);
        line-height: 1.4;
      }
      .pesel-discovery-card .card-footer {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .doc-accordion summary {
        font-weight: 600;
        padding: 12px;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .doc-accordion summary:hover {
        background: var(--surface-soft);
      }
      .doc-callout {
        border-left: 3px solid #2f80ed;
        padding: 12px 16px;
        background: var(--surface-soft);
        border-radius: 0 6px 6px 0;
        margin: 16px 0;
        font-size: 0.85rem;
        color: var(--text);
      }
      .doc-callout.warning {
        border-left-color: #eb5757;
        background: rgba(235, 87, 87, 0.03);
      }
      .doc-callout.tip {
        border-left-color: #10b981;
        background: rgba(16, 185, 129, 0.03);
      }
    `;
    document.head.appendChild(style);
  };

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

  const updateUrlQuery = function (value) {
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?value=" + value;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  const apiSnippets = {
    curl: `curl -X POST https://api.validohub.com/v1/pl/pesel/validate \\\n  -H "Content-Type: application/json" \\\n  -d '{"pesel": "$INPUT$"}'`,
    javascript: `fetch("https://api.validohub.com/v1/pl/pesel/validate", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ pesel: "$INPUT$" })\n})\n.then(res => res.json())\n.then(data => console.log(data));`,
    python: `import requests\n\nres = requests.post(\n    "https://api.validohub.com/v1/pl/pesel/validate",\n    json={"pesel": "$INPUT$"}\n)\nprint(res.json())`,
    java: `import java.net.http.*;\nimport java.net.URI;\n\nvar client = HttpClient.newHttpClient();\nvar request = HttpRequest.newBuilder()\n    .uri(URI.create("https://api.validohub.com/v1/pl/pesel/validate"))\n    .header("Content-Type", "application/json")\n    .POST(HttpRequest.BodyPublishers.ofString("{\\"pesel\\": \\"$INPUT$\\"}"))\n    .build();\nvar response = client.send(request, HttpResponse.BodyHandlers.ofString());\nSystem.out.println(response.body());`,
    csharp: `using System.Net.Http;\nusing System.Text.Json;\n\nvar client = new HttpClient();\nvar content = new StringContent("{\\"pesel\\":\\"$INPUT$\\"}", System.Text.Encoding.UTF8, "application/json");\nvar response = await client.PostAsync("https://api.validohub.com/v1/pl/pesel/validate", content);\nvar result = await response.Content.ReadAsStringAsync();\nConsole.WriteLine(result);`,
    go: `package main\n\nimport (\n\t"bytes"\n\t"io/ioutil"\n\t"net/http"\n\t"fmt"\n)\n\nfunc main() {\n\tpayload := []byte(\`{"pesel": "$INPUT$"}\`)\n\tres, _ := http.Post("https://api.validohub.com/v1/pl/pesel/validate", "application/json", bytes.NewBuffer(payload))\n\tdefer res.Body.Close()\n\tbody, _ := ioutil.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}`
  };

  const PeselPlugin = {
    filePrefix: 'pesel-validation',
    applySample: function (workbench, name) {
      const input = workbench.primaryInput();
      if (!input) return;

      if (name === 'valid-male') {
        input.value = '92082612336';
      } else if (name === 'valid-female') {
        input.value = '92082612343';
      } else if (name === 'invalid-checksum') {
        input.value = '92082612335';
      } else if (name === 'invalid-length') {
        input.value = '920826';
      } else if (name === 'invalid-date') {
        input.value = '92023012346';
      } else if (name === 'non-digits') {
        input.value = '9208261234a';
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
    },
    onMount: function (workbench) {
      injectStyles();

      // Format documentation list items using client-side regexp bold translation globally in document
      document.querySelectorAll('.doc-accordion .rich-text').forEach(el => {
        el.querySelectorAll('li').forEach(li => {
          let html = li.innerHTML;
          if (html.includes('**')) {
            html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            li.innerHTML = html;
          }
        });
      });

      // Style blockquote callouts
      document.querySelectorAll('.doc-accordion .rich-text blockquote').forEach(bq => {
        const text = bq.textContent.trim();
        if (text.startsWith('[!NOTE]')) {
          bq.className = 'doc-callout';
          bq.innerHTML = bq.innerHTML.replace('[!NOTE]', '');
        } else if (text.startsWith('[!WARNING]')) {
          bq.className = 'doc-callout warning';
          bq.innerHTML = bq.innerHTML.replace('[!WARNING]', '');
        } else if (text.startsWith('[!TIP]')) {
          bq.className = 'doc-callout tip';
          bq.innerHTML = bq.innerHTML.replace('[!TIP]', '');
        }
      });

      // Refine the page intro header to Stripe-quality aesthetics
      const pageIntro = document.querySelector('.page-intro');
      if (pageIntro) {
        const introTitle = pageIntro.querySelector('h1');
        if (introTitle) introTitle.textContent = 'PESEL Validator & Explainer';
        const introDesc = pageIntro.querySelector('p');
        if (introDesc) {
          introDesc.textContent = 'Validate an 11-digit Polish PESEL, decode birth date and gender, and inspect the checksum calculation locally in your browser.';
        }

        // Inject Stripe-style trust badges
        if (!pageIntro.querySelector('.pesel-badge-row')) {
          const badgeRow = document.createElement('div');
          badgeRow.className = 'pesel-badge-row';
          badgeRow.innerHTML = `
            <span class="pesel-pill active">🔒 Local Sandbox</span>
            <span class="pesel-pill">✓ Privacy Guaranteed</span>
            <span class="pesel-pill">📅 Centuries 1800-2200</span>
            <span class="pesel-pill">⚡ Live Parser</span>
          `;
          pageIntro.appendChild(badgeRow);
        }
      }

      // Hide default introductory boilerplate inside the form card
      const headingText = workbench.form.querySelector('.workbench-heading');
      if (headingText) {
        headingText.style.display = 'none';
      }

      // Hide legacy Output text area completely
      const outputField = workbench.form.querySelector('.output-field');
      if (outputField) {
        outputField.style.display = 'none';
      }

      // Hide framework default copy and download buttons
      const copyBtn = workbench.form.querySelector('[data-tool-copy]');
      if (copyBtn) copyBtn.style.display = 'none';
      const downloadBtn = workbench.form.querySelector('[data-tool-download]');
      if (downloadBtn) downloadBtn.style.display = 'none';

      // Insert Presets & History into native field grid
      const fieldGrid = workbench.form.querySelector('.field-grid');
      const inputField = workbench.primaryInput();
      if (fieldGrid && !workbench.form.querySelector('#pesel-presets')) {
        // Style main input field's label parent to span across both grid columns
        const peselField = fieldGrid.querySelector('label.field');
        if (peselField) {
          peselField.style.gridColumn = '1 / -1';
        }

        // Create Presets field
        const presetsField = document.createElement('div');
        presetsField.className = 'field';
        presetsField.innerHTML = `
          <div style="height: 18px; display: flex; align-items: center;">
            <span style="font-size: 0.92rem; font-weight: 720; color: var(--text);">Presets</span>
          </div>
          <select class="pesel-select" id="pesel-presets" style="width: 100%; height: 42px; padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;">
            <option value="">-- Select Preset --</option>
            <option value="valid-male">Valid Male (92082612336)</option>
            <option value="valid-female">Valid Female (92082612343)</option>
            <option value="invalid-checksum">Invalid Checksum (92082612335)</option>
            <option value="invalid-date">Invalid Date (92023012346)</option>
            <option value="non-digits">Contains Letters (9208261234a)</option>
            <option value="too-short">Too Short (920826)</option>
          </select>
        `;

        // Create History field
        const historyField = document.createElement('div');
        historyField.className = 'field';
        historyField.innerHTML = `
          <div style="height: 18px; display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span style="font-size: 0.92rem; font-weight: 720; color: var(--text);">History</span>
            <button type="button" class="button button-ghost compact" id="pesel-clear-history-btn" style="font-size: 0.72rem; padding: 0; border: none; background: none; margin: 0; cursor: pointer; height: auto; line-height: 1; color: var(--muted); font-weight: 600;">Clear</button>
          </div>
          <select class="pesel-select" id="pesel-history" style="width: 100%; height: 42px; padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface); color: var(--text); font-size: 0.85rem; cursor: pointer;">
            <option value="">-- Recent Validations --</option>
          </select>
        `;

        // Prepend inside fieldGrid
        fieldGrid.insertBefore(historyField, fieldGrid.firstChild);
        fieldGrid.insertBefore(presetsField, fieldGrid.firstChild);

        // Handle preset changes
        fieldGrid.querySelector('#pesel-presets').addEventListener('change', (e) => {
          const val = e.target.value;
          if (val) {
            PeselPlugin.applySample(workbench, val);
          }
        });

        // Handle history selection
        fieldGrid.querySelector('#pesel-history').addEventListener('change', (e) => {
          const val = e.target.value;
          if (val) {
            if (inputField) {
              inputField.value = val;
              inputField.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        });

        // Handle history clear
        fieldGrid.querySelector('#pesel-clear-history-btn').addEventListener('click', () => {
          localStorage.removeItem('validohub.pesel.history');
          const select = fieldGrid.querySelector('#pesel-history');
          select.innerHTML = '<option value="">-- Recent Validations --</option>';
          workbench.setMessage('Validation history cleared.', 'success');
        });
      }

      // Populate history select on mount
      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent Validations --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            opt.textContent = `${it.value} (${it.valid ? '✓' : '✗'} - ${it.date})`;
            historySelect.appendChild(opt);
          });
        }
      };
      refreshHistorySelect();

      // Insert Generator row right above the button row
      if (!workbench.form.querySelector('.pesel-generator-row')) {
        const genRow = document.createElement('div');
        genRow.className = 'pesel-generator-row';
        genRow.style.margin = '16px 0';
        genRow.style.borderTop = '1px solid var(--line)';
        genRow.style.paddingTop = '12px';
        genRow.innerHTML = `
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--muted); letter-spacing: 0.05em;">Generator:</span>
            <button type="button" class="pesel-playground-btn" id="gen-valid-rand" style="padding: 4px 8px; font-size: 0.72rem;">Random Valid</button>
            <button type="button" class="pesel-playground-btn" id="gen-male-rand" style="padding: 4px 8px; font-size: 0.72rem;">Male</button>
            <button type="button" class="pesel-playground-btn" id="gen-female-rand" style="padding: 4px 8px; font-size: 0.72rem;">Female</button>
            <button type="button" class="pesel-playground-btn" id="gen-bad-sum" style="padding: 4px 8px; font-size: 0.72rem;">Bad Checksum</button>
            <button type="button" class="pesel-playground-btn" id="gen-bad-date" style="padding: 4px 8px; font-size: 0.72rem;">Bad Date</button>
          </div>
        `;
        workbench.form.insertBefore(genRow, workbench.form.querySelector('.button-row'));

        const triggerGen = (gender, invalidType) => {
          if (inputField) {
            inputField.value = generateRandomPesel(gender, invalidType);
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
          }
        };

        genRow.querySelector('#gen-valid-rand').addEventListener('click', () => triggerGen(null, null));
        genRow.querySelector('#gen-male-rand').addEventListener('click', () => triggerGen('male', null));
        genRow.querySelector('#gen-female-rand').addEventListener('click', () => triggerGen('female', null));
        genRow.querySelector('#gen-bad-sum').addEventListener('click', () => triggerGen(null, 'checksum'));
        genRow.querySelector('#gen-bad-date').addEventListener('click', () => triggerGen(null, 'date'));
      }

      // Insert pipeline, empty states and premium outputs elements
      if (!workbench.form.querySelector('.pesel-premium-panel')) {
        const premiumPanel = document.createElement('div');
        premiumPanel.className = 'pesel-premium-panel';
        premiumPanel.innerHTML = `
          <!-- Elegant default empty state -->
          <div class="pesel-empty-state" id="pesel-empty-state-card">
            <span style="font-size: 2rem;">🛡️</span>
            <div class="pesel-empty-title">PESEL Verification Sandbox</div>
            <div class="pesel-empty-desc">Enter or paste an 11-digit Polish national identity number above. Live validation executes instantly in your browser sandbox.</div>
            <div class="pesel-trust-row">
              <span class="pesel-trust-badge">🔒 Local Execution</span>
              <span class="pesel-trust-badge">⚡ Zero Network Latency</span>
              <span class="pesel-trust-badge">✓ Privacy Shield</span>
            </div>
          </div>

          <!-- Visual progress timeline -->
          <div class="pesel-timeline-tracker" style="display: none;">
            <div class="pesel-timeline-line"></div>
            <div class="pesel-timeline-progress" id="pesel-progress-bar"></div>
            <div class="pesel-timeline-node" data-node="present">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Input</span>
            </div>
            <div class="pesel-timeline-node" data-node="digits">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Regex</span>
            </div>
            <div class="pesel-timeline-node" data-node="length">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Length</span>
            </div>
            <div class="pesel-timeline-node" data-node="month">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Century</span>
            </div>
            <div class="pesel-timeline-node" data-node="date">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Calendar</span>
            </div>
            <div class="pesel-timeline-node" data-node="checksum">
              <div class="pesel-timeline-dot"></div>
              <span class="pesel-timeline-node-text">Check</span>
            </div>
          </div>

          <!-- Premium Results summary block -->
          <div class="pesel-results-container" style="display: none;"></div>

          <!-- Dynamic Action Buttons Row -->
          <div class="pesel-custom-actions button-row" style="display: none; margin-bottom: 8px;"></div>

          <!-- Live Pipeline progress indicator -->
          <div class="pesel-pipeline" style="display: none;">
            <div class="pesel-section-title">
              <span>🧭</span> Validation Pipeline
            </div>
            <div class="pesel-pipeline-list">
              <div class="pesel-step pending" data-step="present">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Input Present</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Ensures the input value is not blank.</div>
              </div>
              <div class="pesel-step pending" data-step="digits">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Digits Only</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Ensures no alphabetic or special characters.</div>
              </div>
              <div class="pesel-step pending" data-step="length">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Length Validation</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Ensures the value is exactly 11 digits.</div>
              </div>
              <div class="pesel-step pending" data-step="month">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Century Offset</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Validates birth century month offset encoding.</div>
              </div>
              <div class="pesel-step pending" data-step="date">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Calendar Validation</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Verifies day existence in the calendar.</div>
              </div>
              <div class="pesel-step pending" data-step="checksum">
                <div class="pesel-step-header">
                  <span class="pesel-step-title">Checksum Verification</span>
                  <span class="pesel-step-badge">Pending</span>
                </div>
                <div class="pesel-step-desc">Verifies Polish registry weight control digit.</div>
              </div>
            </div>
          </div>

          <!-- PESEL Digit Breakdown segment -->
          <div class="pesel-breakdown" style="display: none;"></div>

          <!-- Checksum step by step debugger matrix -->
          <div class="pesel-checksum-debugger" style="display: none;"></div>
        `;
        workbench.form.appendChild(premiumPanel);
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

      // Delete duplicate discovery sections
      const discoveryBlock = document.querySelector('.related-resources-discovery');
      if (discoveryBlock) {
        discoveryBlock.remove();
      }

      // Attach keyboard shortcuts and live-validation debounce listener
      let debounceTimeout = null;
      if (inputField) {
        inputField.addEventListener('input', () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            workbench.run();
          }, 250);
        });
      }

      document.addEventListener('keydown', (e) => {
        // Focus Input shortcut: "/" (when not currently typing in inputs)
        if (e.key === '/' && document.activeElement !== inputField) {
          e.preventDefault();
          if (inputField) inputField.focus();
        }
        // Ctrl+L/Cmd+L shortcut: Clear form
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
          e.preventDefault();
          workbench.clear();
          // Reset URL
          const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
        }
        // Ctrl+C shortcut: Copy JSON
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && workbench.lastResult) {
          e.preventDefault();
          copyToClipboard(JSON.stringify(workbench.lastResult, null, 2), workbench, 'Copied raw JSON payload.');
        }
      });

      // Parse shareable value query param on load
      const urlParams = new URLSearchParams(window.location.search);
      const sharedVal = urlParams.get('value') || urlParams.get('pesel');
      if (sharedVal && inputField) {
        inputField.value = sharedVal;
        setTimeout(() => {
          inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }, 100);
      }
    },
    run: function (workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.pesel || '';
      const inputVal = rawInput.replace(/\s/g, '');

      const premiumPanel = workbench.form.querySelector('.pesel-premium-panel');
      const resultsContainer = workbench.form.querySelector('.pesel-results-container');
      const customActions = workbench.form.querySelector('.pesel-custom-actions');
      const breakdownPanel = workbench.form.querySelector('.pesel-breakdown');
      const checksumDebugger = workbench.form.querySelector('.pesel-checksum-debugger');
      const timelineTracker = workbench.form.querySelector('.pesel-timeline-tracker');
      const pipelineBlock = workbench.form.querySelector('.pesel-pipeline');
      const emptyStateCard = workbench.form.querySelector('#pesel-empty-state-card');

      const startTime = performance.now();

      const setStepStatus = function (stepName, state, errorMsg) {
        if (!premiumPanel) return;
        const step = premiumPanel.querySelector(`[data-step="${stepName}"]`);
        if (!step) return;

        step.className = `pesel-step ${state}`;
        const badge = step.querySelector('.pesel-step-badge');
        if (badge) {
          badge.textContent = state === 'success' ? 'Pass' : (state === 'failure' ? `Fail` : 'Pending');
        }
        const desc = step.querySelector('.pesel-step-desc');
        if (desc) {
          desc.textContent = state === 'failure' ? `Failed: ${errorMsg}` : (state === 'success' ? 'Validation check passed.' : 'Verification pending.');
        }

        // Timeline Node Highlighting
        const node = premiumPanel.querySelector(`[data-node="${stepName}"]`);
        if (node) {
          node.className = `pesel-timeline-node ${state === 'success' ? 'active' : (state === 'failure' ? 'error' : '')}`;
        }
      };

      const refreshHistorySelect = () => {
        const historySelect = workbench.form.querySelector('#pesel-history');
        if (historySelect) {
          const items = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
          historySelect.innerHTML = '<option value="">-- Recent Validations --</option>';
          items.forEach(it => {
            const opt = document.createElement('option');
            opt.value = it.value;
            opt.textContent = `${it.value} (${it.valid ? '✓' : '✗'} - ${it.date})`;
            historySelect.appendChild(opt);
          });
        }
      };

      const resetSteps = () => {
        ['present', 'digits', 'length', 'month', 'date', 'checksum'].forEach(s => setStepStatus(s, 'pending'));
        if (timelineTracker) timelineTracker.style.display = 'none';
        if (pipelineBlock) pipelineBlock.style.display = 'none';
        if (emptyStateCard) emptyStateCard.style.display = 'flex';
      };

      if (!inputVal) {
        workbench.setMessage('Please enter a PESEL number.', 'error');
        workbench.setOutput('');
        workbench.setBadge({ label: 'Waiting for input', state: '' });
        workbench.clearPanels();
        resetSteps();
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }

      // Hide empty state card and display pipelines
      if (emptyStateCard) emptyStateCard.style.display = 'none';
      if (timelineTracker) timelineTracker.style.display = 'flex';
      if (pipelineBlock) pipelineBlock.style.display = 'block';

      setStepStatus('present', 'success');

      // Update URL query parameters
      updateUrlQuery(inputVal);

      // Step 2: Digits only check
      if (/\D/.test(inputVal)) {
        setStepStatus('digits', 'failure', 'Contains non-numeric characters.');
        setStepStatus('length', 'pending');
        setStepStatus('month', 'pending');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_CHARACTERS', message: 'Contains non-digit characters.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid structure: Must contain digits only.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHARACTERS`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_CHARACTERS']], ['Input must contain exactly 11 numeric characters.'], 'error');

        const elapsed = (performance.now() - startTime).toFixed(2);

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Non-Digits Present</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_CHARACTERS</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Explanation</span>
                <span class="row-value">Value contains characters other than digits 0-9.</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        // Chrome DevTools style advanced accordions
        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>✓ Input Present\n✗ Digits Only Check (Failed: non-numeric character found)\n○ Length Check (Skipped)\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Regex Details</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
              </div>
            </details>
          </div>
        `);

        // Attach copy button listeners to DevTools cards
        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.replace('Copy', '').trim(), workbench, 'Copied card content.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('digits', 'success');

      // Step 3: Length check
      if (inputVal.length !== 11) {
        setStepStatus('length', 'failure', `Expected 11 characters, got ${inputVal.length}`);
        setStepStatus('month', 'pending');
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_LENGTH', length: inputVal.length, message: 'Must be exactly 11 digits.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid structure: Length is ${inputVal.length} (expected 11).`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_LENGTH`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_LENGTH']], [`Expected 11 digits, but got ${inputVal.length}.`], 'error');

        const elapsed = (performance.now() - startTime).toFixed(2);

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Invalid Length</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_LENGTH</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Actual Length</span>
                <span class="row-value">${inputVal.length} characters (Expected: 11)</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>✓ Input Present\n✓ Digits Only Check\n✗ Length Check (Failed: got ${inputVal.length})\n○ Month Offset (Skipped)\n○ Date Verification (Skipped)\n○ Checksum Matching (Skipped)</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Regex Details</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>Pattern: /^\\d{11}$/\nMatched: false</pre>
              </div>
            </details>
          </div>
        `);

        // Attach copy button listeners to DevTools cards
        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.replace('Copy', '').trim(), workbench, 'Copied card content.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('length', 'success');

      // Math calculations variables
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const digits = inputVal.split('').map(Number);
      let sum = 0;
      const checksumSteps = [];

      for (let i = 0; i < 10; i++) {
        const product = digits[i] * weights[i];
        sum += product;
        checksumSteps.push({
          index: i + 1,
          digit: digits[i],
          weight: weights[i],
          product: product,
          runningSum: sum
        });
      }

      const modulo = sum % 10;
      const calculatedChecksum = (10 - modulo) % 10;
      const expectedChecksum = digits[10];
      const isChecksumValid = calculatedChecksum === expectedChecksum;

      // Extract raw date fields
      let year = parseInt(inputVal.substring(0, 2), 10);
      let month = parseInt(inputVal.substring(2, 4), 10);
      const day = parseInt(inputVal.substring(4, 6), 10);

      // Century offsets
      let century = 1900;
      let monthOffset = 0;
      if (month > 80 && month < 93) {
        century = 1800;
        monthOffset = 80;
      } else if (month > 20 && month < 33) {
        century = 2000;
        monthOffset = 20;
      } else if (month > 40 && month < 53) {
        century = 2100;
        monthOffset = 40;
      } else if (month > 60 && month < 73) {
        century = 2200;
        monthOffset = 60;
      }

      const parsedMonth = month - monthOffset;
      const fullYear = century + year;

      // Step 4: Validate month offset range
      if (parsedMonth < 1 || parsedMonth > 12) {
        setStepStatus('month', 'failure', `Month digits ${month} do not map to standard century offsets.`);
        setStepStatus('date', 'pending');
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_MONTH_OFFSET', rawMonth: month, message: 'Invalid month offset encoded.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid month: Encoded month range is invalid.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_MONTH_OFFSET`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_MONTH_OFFSET']], ['The birth month digits do not map to any valid century offset range.'], 'error');

        // Add history entry
        const historyItems = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, valid: false, date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.pesel.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const elapsed = (performance.now() - startTime).toFixed(2);

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Invalid Month Range</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_MONTH_OFFSET</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Decoded Month digits</span>
                <span class="row-value">${month} (Decodes to impossible birth month: ${parsedMonth})</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('month', 'success');

      // Step 5: Validate calendar date
      if (!isValidCalendarDate(fullYear, parsedMonth, day)) {
        setStepStatus('date', 'failure', `Date ${fullYear}-${parsedMonth}-${day} does not exist in calendar.`);
        setStepStatus('checksum', 'pending');

        const result = { valid: false, errorCode: 'INVALID_DATE', date: `${fullYear}-${parsedMonth}-${day}`, message: 'Invalid calendar date.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid date: ${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} does not exist.`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_DATE`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_DATE']], [`The parsed calendar date ${fullYear}-${parsedMonth}-${day} is mathematically impossible (e.g. Feb 30th).`], 'error');

        // Add history entry
        const historyItems = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, valid: false, date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.pesel.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const elapsed = (performance.now() - startTime).toFixed(2);

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Invalid Calendar Date</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_DATE</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Parsed Date</span>
                <span class="row-value">${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} (Exceeds day counts for ${monthNames[parsedMonth - 1]})</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        if (checksumDebugger) checksumDebugger.style.display = 'none';
        return;
      }
      setStepStatus('date', 'success');

      // Step 6: Check checksum validation status
      if (!isChecksumValid) {
        setStepStatus('checksum', 'failure', `Provided check digit ${expectedChecksum} does not match expected ${calculatedChecksum}`);

        const result = {
          valid: false,
          gradient: null,
          errorCode: 'INVALID_CHECKSUM',
          expected: calculatedChecksum,
          received: expectedChecksum
        };
        workbench.lastResult = result;
        workbench.setMessage('Invalid checksum control digit.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHECKSUM`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([
          ['Status', 'Failed'],
          ['Error Code', 'INVALID_CHECKSUM'],
          ['Provided Checksum', String(expectedChecksum)],
          ['Calculated Checksum', String(calculatedChecksum)]
        ], ['The last control digit does not match Polish population registration checksum formula.'], 'error');

        // Add history entry
        const historyItems = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
        if (!historyItems.some(it => it.value === inputVal)) {
          historyItems.unshift({ value: inputVal, valid: false, date: new Date().toISOString().split('T')[0] });
          localStorage.setItem('validohub.pesel.history', JSON.stringify(historyItems.slice(0, 20)));
          refreshHistorySelect();
        }

        const elapsed = (performance.now() - startTime).toFixed(2);

        if (resultsContainer) {
          resultsContainer.innerHTML = `
            <div class="pesel-results-header reveal-element" style="color: #dc2626; justify-content: space-between;">
              <span>✗ Validation Failed: Checksum Mismatch</span>
              <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
            </div>
            <div class="pesel-results-grid reveal-element reveal-delay-1">
              <div class="pesel-result-row">
                <span class="row-label">Error Code</span>
                <span class="row-value">INVALID_CHECKSUM</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Expected Check Digit (d11)</span>
                <span class="row-value">${calculatedChecksum}</span>
              </div>
              <div class="pesel-result-row">
                <span class="row-label">Actual Received Digit</span>
                <span class="row-value">${expectedChecksum} (Difference at digit 11: expected ${calculatedChecksum}, received ${expectedChecksum})</span>
              </div>
            </div>
          `;
          resultsContainer.style.display = 'flex';
        }

        // Render Checksum Debugger even for failed checksums so they can learn why
        if (checksumDebugger) {
          checksumDebugger.innerHTML = `
            <div class="pesel-section-title" style="color: #dc2626; justify-content: space-between;">
              <span>🧮</span> Checksum Debugger (Failed)
              <button type="button" class="button button-secondary compact" id="pesel-replay-calc-btn" style="font-size: 0.72rem; padding: 2px 6px;">▶ Replay Calculation</button>
            </div>
            <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">Formula: (1·d1 + 3·d2 + 7·d3 + 9·d4 + 1·d5 + 3·d6 + 7·d7 + 9·d8 + 1·d9 + 3·d10) % 10</p>
            <div class="pesel-debugger-table-container">
              <table class="pesel-dev-table" id="pesel-debugger-table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Digit</th>
                    <th>Weight</th>
                    <th>Product</th>
                    <th>Running Sum</th>
                  </tr>
                </thead>
                <tbody>
                  ${checksumSteps.map(s => `
                    <tr data-row="${s.index}">
                      <td>d${s.index}</td>
                      <td style="font-weight: 700; color: var(--text);">${s.digit}</td>
                      <td>${s.weight}</td>
                      <td style="font-weight: 700;">${s.product}</td>
                      <td style="color: var(--muted);">${s.runningSum}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="pesel-formula-summary">
              <div class="pesel-formula-step" id="step-products-sum">
                <span>Sum of Products</span>
                <span>${sum}</span>
              </div>
              <div class="pesel-formula-step" id="step-modulo">
                <span>Modulo Operation (Sum % 10)</span>
                <span>${modulo}</span>
              </div>
              <div class="pesel-formula-step" id="step-calc-checksum">
                <span>Calculated Check Digit ((10 - Modulo) % 10)</span>
                <span style="color: #dc2626; font-weight: 700;">${calculatedChecksum}</span>
              </div>
              <div class="pesel-formula-step" id="step-provided-checksum">
                <span>Provided Check Digit (d11)</span>
                <span style="font-weight: 700;">${expectedChecksum}</span>
              </div>
              <div class="pesel-formula-step" id="step-final-status">
                <span>Status</span>
                <span style="color: #dc2626; font-weight: 700;">✗ Checksum Mismatch</span>
              </div>
            </div>
          `;

          // Bind recalculate action
          const runReplayAnimation = () => {
            const rows = checksumDebugger.querySelectorAll('#pesel-debugger-table tbody tr');
            const formulaSteps = checksumDebugger.querySelectorAll('.pesel-formula-summary .pesel-formula-step');

            rows.forEach(r => r.classList.remove('is-active'));
            formulaSteps.forEach(f => f.style.opacity = '0.3');

            let step = 0;
            const animateNextRow = () => {
              if (step < rows.length) {
                if (step > 0) rows[step - 1].classList.remove('is-active');
                rows[step].classList.add('is-active');
                step++;
                setTimeout(animateNextRow, 120);
              } else {
                rows[step - 1].classList.remove('is-active');
                let fStep = 0;
                const animateFormula = () => {
                  if (fStep < formulaSteps.length) {
                    formulaSteps[fStep].style.opacity = '1';
                    fStep++;
                    setTimeout(animateFormula, 150);
                  }
                };
                animateFormula();
              }
            };
            animateNextRow();
          };
          checksumDebugger.querySelector('#pesel-replay-calc-btn').addEventListener('click', runReplayAnimation);
          runReplayAnimation();

          checksumDebugger.style.display = 'block';
        }

        workbench.setAdvanced(`
          <div class="pesel-dev-section">
            <details class="pesel-dev-accordion" open>
              <summary>Validation Pipeline Logs</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✗ Checksum Valid (Failed: expected ${expectedChecksum}, calculated ${calculatedChecksum})</pre>
              </div>
            </details>
            <details class="pesel-dev-accordion">
              <summary>Raw JSON Output</summary>
              <div class="pesel-dev-accordion-content">
                <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
                <pre>${syntaxHighlightJson(result)}</pre>
              </div>
            </details>
          </div>
        `);

        // Attach copy button listeners to DevTools cards
        document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
          const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
          const pre = card.querySelector('pre');
          if (btn && pre) {
            btn.addEventListener('click', () => {
              copyToClipboard(pre.textContent.replace('Copy', '').trim(), workbench, 'Copied card content.');
              btn.textContent = 'Copied!';
              setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
            });
          }
        });

        if (customActions) customActions.style.display = 'none';
        if (breakdownPanel) breakdownPanel.style.display = 'none';
        return;
      }
      setStepStatus('checksum', 'success');

      // Add to local history safely
      const historyItems = JSON.parse(localStorage.getItem('validohub.pesel.history') || '[]');
      if (!historyItems.some(it => it.value === inputVal)) {
        historyItems.unshift({ value: inputVal, valid: true, date: new Date().toISOString().split('T')[0] });
        localStorage.setItem('validohub.pesel.history', JSON.stringify(historyItems.slice(0, 20)));
        refreshHistorySelect();
      }

      // Valid state! Extract metadata
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const dateStr = `${day} ${monthNames[parsedMonth - 1]} ${fullYear}`;
      const genderDigit = digits[9];
      const gender = (genderDigit % 2 === 0) ? 'Female' : 'Male';
      const serialPart = inputVal.substring(6, 10);

      const result = {
        valid: true,
        normalized: inputVal,
        metadata: {
          birthDate: dateStr,
          birthYear: fullYear,
          century: `${century}s`,
          gender: gender,
          serial: serialPart,
          providedChecksum: expectedChecksum,
          calculatedChecksum: calculatedChecksum
        }
      };

      workbench.lastResult = result;

      // Update feedback stats
      workbench.setStats([
        ['Birth Date', dateStr],
        ['Gender', gender],
        ['Century', `${century}s`],
        ['Serial Code', serialPart],
        ['Verification Status', '✓ Valid']
      ], [`Length Check: Pass (11 digits)`, `Checksum Check: Pass`], 'success');

      const elapsed = (performance.now() - startTime).toFixed(2);

      // Render the single premium summary card with smooth reveal classes and trust indicators
      if (resultsContainer) {
        resultsContainer.innerHTML = `
          <div class="pesel-results-header reveal-element" style="color: #16a34a; justify-content: space-between;">
            <span>✓ Valid Polish PESEL</span>
            <span style="font-size: 0.72rem; font-weight: 500; color: var(--muted);">Verification time: ${elapsed} ms</span>
          </div>
          <div class="pesel-results-grid reveal-element reveal-delay-1">
            <div class="pesel-result-row">
              <span class="row-label">Normalized PESEL</span>
              <span class="row-value">${inputVal}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${inputVal}" aria-label="Copy Normalized Value">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Birth Date</span>
              <span class="row-value">${dateStr}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${dateStr}" aria-label="Copy Birth Date">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Gender</span>
              <span class="row-value">${gender}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${gender}" aria-label="Copy Gender">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Century</span>
              <span class="row-value">${century}s</span>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Serial Number</span>
              <span class="row-value">${serialPart}</span>
              <button type="button" class="pesel-row-copy-btn" data-copy-val="${serialPart}" aria-label="Copy Serial Code">Copy</button>
            </div>
            <div class="pesel-result-row">
              <span class="row-label">Control Digit</span>
              <span class="row-value">${expectedChecksum} (Passed)</span>
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

      // Render custom copy JSON and download button row with reveal delay
      if (customActions) {
        customActions.innerHTML = `
          <button type="button" class="button button-secondary compact reveal-element reveal-delay-2" id="custom-copy-json">Copy JSON</button>
          <button type="button" class="button button-secondary compact reveal-element reveal-delay-2" id="custom-download-json">Download JSON</button>
          <button type="button" class="button button-secondary compact reveal-element reveal-delay-2" id="custom-copy-link">Copy Link</button>
        `;
        customActions.querySelector('#custom-copy-json').addEventListener('click', () => {
          copyToClipboard(JSON.stringify(result, null, 2), workbench, 'Copied raw JSON to clipboard.');
        });
        customActions.querySelector('#custom-download-json').addEventListener('click', () => {
          const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `pesel-validator-output-${inputVal}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          workbench.setMessage('Downloaded result file.', 'success');
        });
        customActions.querySelector('#custom-copy-link').addEventListener('click', () => {
          copyToClipboard(window.location.href, workbench, 'Copied shareable URL link.');
        });
        customActions.style.display = 'flex';
      }

      // Render the PESEL breakdown visualization card with hover highlighting
      if (breakdownPanel) {
        breakdownPanel.className = 'pesel-breakdown reveal-element reveal-delay-3';
        breakdownPanel.innerHTML = `
          <div class="pesel-section-title">
            <span>📊</span> Identifier Breakdown
          </div>
          <div class="pesel-breakdown-digits">
            <span class="pesel-digit-box year" title="Year of Birth">${inputVal.substring(0, 1)}</span>
            <span class="pesel-digit-box year" title="Year of Birth">${inputVal.substring(1, 2)}</span>
            <span class="pesel-digit-box month" title="Month of Birth">${inputVal.substring(2, 3)}</span>
            <span class="pesel-digit-box month" title="Month of Birth">${inputVal.substring(3, 4)}</span>
            <span class="pesel-digit-box day" title="Day of Birth">${inputVal.substring(4, 5)}</span>
            <span class="pesel-digit-box day" title="Day of Birth">${inputVal.substring(5, 6)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code">${inputVal.substring(6, 7)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code">${inputVal.substring(7, 8)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code">${inputVal.substring(8, 9)}</span>
            <span class="pesel-digit-box serial" title="Sequence Code & Gender">${inputVal.substring(9, 10)}</span>
            <span class="pesel-digit-box checksum" title="Control Checksum Digit">${inputVal.substring(10, 11)}</span>
          </div>
          <div class="pesel-breakdown-legend">
            <span class="pesel-legend-item year">YY (Year)</span>
            <span class="pesel-legend-item month">MM (Month)</span>
            <span class="pesel-legend-item day">DD (Day)</span>
            <span class="pesel-legend-item serial">Sequence & Gender</span>
            <span class="pesel-legend-item checksum">Check Digit</span>
          </div>
        `;

        // Interactivity details explanation box
        const descBox = document.createElement('div');
        descBox.className = 'pesel-breakdown-desc-box';
        descBox.style.marginTop = '16px';
        descBox.style.padding = '12px 16px';
        descBox.style.border = '1px solid var(--line)';
        descBox.style.borderRadius = '6px';
        descBox.style.background = 'var(--surface)';
        descBox.style.fontSize = '0.85rem';
        descBox.style.lineHeight = '1.4';
        descBox.style.color = 'var(--muted)';
        descBox.innerHTML = 'Hover over any digit group above to see its encoding rules and specifications.';
        breakdownPanel.appendChild(descBox);

        const setupHover = (selector, type, text) => {
          breakdownPanel.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
              breakdownPanel.querySelectorAll(`.pesel-digit-box.${type}, .pesel-legend-item.${type}`).forEach(target => {
                target.classList.add('is-hovered');
              });
              descBox.innerHTML = text;
              descBox.style.color = 'var(--text)';
            });
            el.addEventListener('mouseleave', () => {
              breakdownPanel.querySelectorAll(`.pesel-digit-box.${type}, .pesel-legend-item.${type}`).forEach(target => {
                target.classList.remove('is-hovered');
              });
              descBox.innerHTML = 'Hover over any digit group above to see its encoding rules and specifications.';
              descBox.style.color = 'var(--muted)';
            });
          });
        };

        setupHover('.year', 'year', `<strong>Birth Year (YY):</strong> Raw digits: <code>${inputVal.substring(0, 2)}</code>. Decoded year: <code>${fullYear}</code>. Century offset: <code>${monthOffset > 0 ? monthOffset : 0}</code>. Maps to the last two digits of birth year.`);
        setupHover('.month', 'month', `<strong>Birth Month (MM):</strong> Raw digits: <code>${inputVal.substring(2, 4)}</code>. Decoded month: <code>${parsedMonth}</code> (${monthNames[parsedMonth - 1]}). Month digits 3 and 4 encode century offsets (e.g. <code>+20</code> for 2000s).`);
        setupHover('.day', 'day', `<strong>Birth Day (DD):</strong> Raw digits: <code>${inputVal.substring(4, 6)}</code>. Decoded day: <code>${day}</code>. Encodes the calendar day of birth. Calendar validation checks calendar day counts.`);
        setupHover('.serial', 'serial', `<strong>Sequence & Gender (ZZZG):</strong> Raw serial code digits: <code>${serialPart}</code>. Digit 10 (G) is <code>${genderDigit}</code>. Decoded gender: <code>${gender}</code> (even numbers represent Female, odd represent Male).`);
        setupHover('.checksum', 'checksum', `<strong>Check Digit (X):</strong> Raw digit: <code>${expectedChecksum}</code>. Calculated control check digit: <code>${calculatedChecksum}</code>. Matching verification: <code>${isChecksumValid ? 'PASS' : 'FAIL'}</code>.`);

        breakdownPanel.style.display = 'block';
      }

      // Render Checksum Debugger matrix with replay animation
      if (checksumDebugger) {
        checksumDebugger.className = 'pesel-checksum-debugger reveal-element reveal-delay-4';
        checksumDebugger.innerHTML = `
          <div class="pesel-section-title" style="color: #16a34a; justify-content: space-between;">
            <span>🧮</span> Checksum Debugger
            <button type="button" class="button button-secondary compact" id="pesel-replay-calc-btn" style="font-size: 0.72rem; padding: 2px 6px;">▶ Replay Calculation</button>
          </div>
          <p style="color: var(--muted); font-size: 0.8rem; margin: -8px 0 16px 0;">Formula: (1·d1 + 3·d2 + 7·d3 + 9·d4 + 1·d5 + 3·d6 + 7·d7 + 9·d8 + 1·d9 + 3·d10) % 10</p>
          <div class="pesel-debugger-table-container">
            <table class="pesel-dev-table" id="pesel-debugger-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Digit</th>
                  <th>Weight</th>
                  <th>Product</th>
                  <th>Running Sum</th>
                </tr>
              </thead>
              <tbody>
                ${checksumSteps.map(s => `
                  <tr data-row="${s.index}">
                    <td>d${s.index}</td>
                    <td style="font-weight: 700; color: var(--text);">${s.digit}</td>
                    <td>${s.weight}</td>
                    <td style="font-weight: 700;">${s.product}</td>
                    <td style="color: var(--muted);">${s.runningSum}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="pesel-formula-summary">
            <div class="pesel-formula-step" id="step-products-sum">
              <span>Sum of Products</span>
              <span>${sum}</span>
            </div>
            <div class="pesel-formula-step" id="step-modulo">
              <span>Modulo Operation (Sum % 10)</span>
              <span>${modulo}</span>
            </div>
            <div class="pesel-formula-step" id="step-calc-checksum">
              <span>Calculated Check Digit ((10 - Modulo) % 10)</span>
              <span style="color: #16a34a; font-weight: 700;">${calculatedChecksum}</span>
            </div>
            <div class="pesel-formula-step" id="step-provided-checksum">
              <span>Provided Check Digit (d11)</span>
              <span style="font-weight: 700;">${expectedChecksum}</span>
            </div>
            <div class="pesel-formula-step" id="step-final-status">
              <span>Status</span>
              <span style="color: #16a34a; font-weight: 700;">✓ Checksum Matches</span>
            </div>
          </div>
        `;

        // Interactive Replay animation handler
        const runReplayAnimation = () => {
          const rows = checksumDebugger.querySelectorAll('#pesel-debugger-table tbody tr');
          const formulaSteps = checksumDebugger.querySelectorAll('.pesel-formula-summary .pesel-formula-step');

          // Reset visibility styles
          rows.forEach(r => r.classList.remove('is-active'));
          formulaSteps.forEach(f => f.style.opacity = '0.3');

          let step = 0;
          const animateNextRow = () => {
            if (step < rows.length) {
              if (step > 0) rows[step - 1].classList.remove('is-active');
              rows[step].classList.add('is-active');
              step++;
              setTimeout(animateNextRow, 120);
            } else {
              rows[step - 1].classList.remove('is-active');
              // Animate final equation summary cards sequentially
              let fStep = 0;
              const animateFormula = () => {
                if (fStep < formulaSteps.length) {
                  formulaSteps[fStep].style.opacity = '1';
                  fStep++;
                  setTimeout(animateFormula, 150);
                }
              };
              animateFormula();
            }
          };
          animateNextRow();
        };

        // Attach trigger handler
        checksumDebugger.querySelector('#pesel-replay-calc-btn').addEventListener('click', runReplayAnimation);
        runReplayAnimation(); // Auto run once on validation completes

        checksumDebugger.style.display = 'block';
      }

      // Update DevTools structured accordions
      workbench.setAdvanced(`
        <div class="pesel-dev-section reveal-element reveal-delay-5">
          <details class="pesel-dev-accordion" open>
            <summary>Validation Pipeline Logs</summary>
            <div class="pesel-dev-accordion-content">
              <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
              <pre>✓ Input Present\n✓ Digits Only Check\n✓ Exactly 11 Digits Check\n✓ Century/Month Offset Valid\n✓ Calendar Date Valid\n✓ Checksum Valid</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Regex & Structure Details</summary>
            <div class="pesel-dev-accordion-content">
              <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
              <pre>Pattern: /^\\d{11}$/\nMatched: true</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Decoded Date Internals</summary>
            <div class="pesel-dev-accordion-content">
              <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
              <pre>Raw Year Digits: ${year}\nRaw Month Digits: ${month}\nRaw Day Digits: ${day}\nCentury Group Offset: ${monthOffset}\nParsed Month: ${parsedMonth}\nDecoded Year: ${fullYear}</pre>
            </div>
          </details>
          <details class="pesel-dev-accordion">
            <summary>Raw JSON Output</summary>
            <div class="pesel-dev-accordion-content" style="background: var(--code-bg); padding: 12px; border-radius: 6px;">
              <button type="button" class="pesel-dev-accordion-copy-btn">Copy</button>
              <pre style="margin: 0; font-family: monospace;">${syntaxHighlightJson(result)}</pre>
            </div>
          </details>
        </div>

        <!-- Developer API Preview block -->
        <div class="pesel-api-card" style="margin-top: 16px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface-soft); padding: 20px;">
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
      `);

      // Bind dynamic API tabs trigger
      const apiCodeBlock = premiumPanel.querySelector('#pesel-api-code-block');
      const tabs = premiumPanel.querySelectorAll('.pesel-api-tab');
      tabs.forEach(t => {
        t.addEventListener('click', () => {
          tabs.forEach(btn => btn.classList.remove('active'));
          t.classList.add('active');
          const lang = t.dataset.lang;
          if (apiCodeBlock && apiSnippets[lang]) {
            apiCodeBlock.textContent = apiSnippets[lang].replace('$INPUT$', inputVal);
          }
        });
      });

      // Attach copy button listeners to DevTools cards
      document.querySelectorAll('.pesel-dev-accordion-content').forEach(card => {
        const btn = card.querySelector('.pesel-dev-accordion-copy-btn');
        const pre = card.querySelector('pre');
        if (btn && pre) {
          btn.addEventListener('click', () => {
            copyToClipboard(pre.textContent.replace('Copy', '').trim(), workbench, 'Copied card content.');
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
          });
        }
      });

      // Animate progress timeline progress-bar
      const progressBar = premiumPanel.querySelector('#pesel-progress-bar');
      if (progressBar) {
        progressBar.style.width = '100%';
      }

      let outputText = `Validation Result: VALID\n\n`;
      outputText += `• Normalized PESEL: ${inputVal}\n`;
      outputText += `• Birth Date: ${dateStr}\n`;
      outputText += `• Century: ${century}s\n`;
      outputText += `• Gender: ${gender}\n`;
      outputText += `• Serial Code: ${serialPart}\n`;
      outputText += `• Checksum Control: ${expectedChecksum} (Passed)`;

      workbench.setOutput(outputText);
      workbench.setMessage('PESEL matches checksum formula.', 'success');
      workbench.setBadge({ label: 'Valid', state: 'success' });
    }
  };

  if (window.ValidoWorkbench) {
    window.ValidoWorkbench.registerPlugin(PESEL_ALGORITHM, PeselPlugin);
  }
}());
