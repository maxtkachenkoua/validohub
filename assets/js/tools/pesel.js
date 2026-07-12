(function () {
  'use strict';

  const PESEL_ALGORITHM = 'validohub.pesel';

  const isValidCalendarDate = function (year, month, day) {
    const d = new Date(year, month - 1, day);
    return d.getFullYear() === year && d.getMonth() === (month - 1) && d.getDate() === day;
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
        input.value = '92023012346'; // Feb 30th
      } else if (name === 'non-digits') {
        input.value = '9208261234a';
      }
    },
    onMount: function (workbench) {
      // Add sample buttons dynamically on mount
      const heading = workbench.form.querySelector('.workbench-form-heading');
      if (heading && !workbench.form.querySelector('.sample-buttons-container')) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'sample-buttons-container';
        btnContainer.style.display = 'flex';
        btnContainer.style.flexWrap = 'wrap';
        btnContainer.style.gap = '6px';
        btnContainer.style.marginTop = '8px';

        const samples = [
          { name: 'valid-male', label: 'Valid Male' },
          { name: 'valid-female', label: 'Valid Female' },
          { name: 'invalid-checksum', label: 'Invalid Checksum' },
          { name: 'invalid-length', label: 'Invalid Length' },
          { name: 'invalid-date', label: 'Invalid Date' },
          { name: 'non-digits', label: 'Non-Digits' }
        ];

        samples.forEach(s => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'button button-ghost compact';
          btn.style.fontSize = '0.78rem';
          btn.style.padding = '4px 8px';
          btn.style.cursor = 'pointer';
          btn.textContent = s.label;
          btn.setAttribute('data-sample', s.name);
          btnContainer.appendChild(btn);
        });

        heading.after(btnContainer);
      }

      // Add custom copy buttons in button-row
      const buttonRow = workbench.form.querySelector('.button-row');
      if (buttonRow && !buttonRow.querySelector('.custom-copy-btn')) {
        // Copy JSON Button
        const copyJsonBtn = document.createElement('button');
        copyJsonBtn.type = 'button';
        copyJsonBtn.className = 'button button-secondary compact custom-copy-btn';
        copyJsonBtn.style.fontSize = '0.78rem';
        copyJsonBtn.style.padding = '4px 8px';
        copyJsonBtn.style.cursor = 'pointer';
        copyJsonBtn.textContent = 'Copy JSON';
        copyJsonBtn.addEventListener('click', () => {
          if (workbench.lastResult) {
            navigator.clipboard.writeText(JSON.stringify(workbench.lastResult, null, 2))
              .then(() => workbench.setMessage('Copied raw JSON to clipboard.', 'success'))
              .catch(() => workbench.setMessage('Copy failed.', 'error'));
          } else {
            workbench.setMessage('No result to copy yet.', 'error');
          }
        });
        buttonRow.appendChild(copyJsonBtn);

        // Copy Normalized Button
        const copyNormBtn = document.createElement('button');
        copyNormBtn.type = 'button';
        copyNormBtn.className = 'button button-secondary compact custom-copy-btn';
        copyNormBtn.style.fontSize = '0.78rem';
        copyNormBtn.style.padding = '4px 8px';
        copyNormBtn.style.cursor = 'pointer';
        copyNormBtn.textContent = 'Copy Normalized';
        copyNormBtn.addEventListener('click', () => {
          const input = workbench.primaryInput();
          if (input) {
            const normalized = input.value.replace(/\s/g, '');
            navigator.clipboard.writeText(normalized)
              .then(() => workbench.setMessage(`Copied normalized value: ${normalized}`, 'success'))
              .catch(() => workbench.setMessage('Copy failed.', 'error'));
          }
        });
        buttonRow.appendChild(copyNormBtn);
      }
    },
    run: function (workbench, action, options) {
      const values = workbench.values();
      const rawInput = values.pesel || '';
      const inputVal = rawInput.replace(/\s/g, ''); // Normalize whitespace

      if (!inputVal) {
        workbench.setMessage('Please enter a PESEL number.', 'error');
        workbench.setOutput('');
        workbench.setBadge({ label: 'Waiting for input', state: '' });
        workbench.clearPanels();
        return;
      }

      // Check for non-digits
      if (/\D/.test(inputVal)) {
        const result = { valid: false, errorCode: 'INVALID_CHARACTERS', message: 'Contains non-digit characters.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid structure: Must contain digits only.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHARACTERS\nError: The input contains non-numeric characters.`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_CHARACTERS']], ['Input must contain exactly 11 numeric characters.'], 'error');
        workbench.setAdvanced(`<div>Validation Pipeline Step: Reject non-digits (FAILED)</div>`);
        return;
      }

      // Check length
      if (inputVal.length !== 11) {
        const result = { valid: false, errorCode: 'INVALID_LENGTH', length: inputVal.length, message: 'Must be exactly 11 digits.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid structure: Length is ${inputVal.length} (expected 11).`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_LENGTH\nExpected: 11 digits\nActual: ${inputVal.length} digits.`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_LENGTH']], [`Expected 11 digits, but got ${inputVal.length}.`], 'error');
        workbench.setAdvanced(`<div>Validation Pipeline Step: Length verification (FAILED)</div>`);
        return;
      }

      // Weights: 1 3 7 9 1 3 7 9 1 3
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      const digits = inputVal.split('').map(Number);
      let sum = 0;
      const checksumSteps = [];

      for (let i = 0; i < 10; i++) {
        const product = digits[i] * weights[i];
        sum += product;
        checksumSteps.push(`Digit ${i+1} (${digits[i]}) * Weight ${weights[i]} = ${product}`);
      }

      const modulo = sum % 10;
      const calculatedChecksum = (10 - modulo) % 10;
      const expectedChecksum = digits[10];
      const isChecksumValid = calculatedChecksum === expectedChecksum;

      // Extract raw date fields
      let year = parseInt(inputVal.substring(0, 2), 10);
      let month = parseInt(inputVal.substring(2, 4), 10);
      const day = parseInt(inputVal.substring(4, 6), 10);

      // Handle century offsets
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

      // Validate month offset range
      if (parsedMonth < 1 || parsedMonth > 12) {
        const result = { valid: false, errorCode: 'INVALID_MONTH_OFFSET', rawMonth: month, message: 'Invalid month offset encoded in PESEL.' };
        workbench.lastResult = result;
        workbench.setMessage('Invalid month: Encoded month range is invalid.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_MONTH_OFFSET\nEncoded raw month: ${month}\nParsed Month: ${parsedMonth} (expected 1-12)`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_MONTH_OFFSET']], ['The birth month digits do not map to any valid century offset range.'], 'error');
        return;
      }

      // Validate calendar date
      if (!isValidCalendarDate(fullYear, parsedMonth, day)) {
        const result = { valid: false, errorCode: 'INVALID_DATE', date: `${fullYear}-${parsedMonth}-${day}`, message: 'Invalid calendar date.' };
        workbench.lastResult = result;
        workbench.setMessage(`Invalid date: ${fullYear}-${String(parsedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')} does not exist.`, 'error');
        workbench.setOutput(`Validation Failed: INVALID_DATE\nDecoded Date: ${fullYear}-${parsedMonth}-${day} (does not exist in calendar)`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([['Status', 'Failed'], ['Error Code', 'INVALID_DATE']], [`The parsed calendar date ${fullYear}-${parsedMonth}-${day} is mathematically impossible (e.g. Feb 30th).`], 'error');
        return;
      }

      // Check checksum validation status
      if (!isChecksumValid) {
        const result = {
          valid: false,
          errorCode: 'INVALID_CHECKSUM',
          expected: expectedChecksum,
          calculated: calculatedChecksum
        };
        workbench.lastResult = result;
        workbench.setMessage('Invalid checksum control digit.', 'error');
        workbench.setOutput(`Validation Failed: INVALID_CHECKSUM\nProvided checksum digit: ${expectedChecksum}\nCalculated checksum digit: ${calculatedChecksum}`);
        workbench.setBadge({ label: 'Error', state: 'error' });
        workbench.setStats([
          ['Status', 'Failed'],
          ['Error Code', 'INVALID_CHECKSUM'],
          ['Provided Checksum', String(expectedChecksum)],
          ['Calculated Checksum', String(calculatedChecksum)]
        ], ['The last control digit does not match Polish population registration checksum formula.'], 'error');

        // Render Developer Mode even for failed checksums so they can see the calculation
        const advHtml = `
          <div style="font-family: monospace; font-size: 0.8rem; padding: 12px; border-radius: 4px; background: var(--code-bg); color: var(--code-text); margin-top: 8px; line-height: 1.4;">
            <p style="margin-top: 0; font-weight: 600; color: #dc2626; font-size: 0.85rem;">[Checksum Failed]</p>
            ${checksumSteps.map(step => `<div>${step}</div>`).join('')}
            <div style="margin-top: 10px; border-top: 1px solid #444; padding-top: 8px; font-weight: 600;">
              Sum of Products = ${sum}<br>
              Sum % 10 = ${modulo}<br>
              (10 - Sum % 10) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum} - MATCH: FALSE)
            </div>
            <p style="margin-top: 12px; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Raw JSON Output]</p>
            <pre style="margin: 0; white-space: pre-wrap; font-family: monospace;">${JSON.stringify(result, null, 2)}</pre>
          </div>
        `;
        workbench.setAdvanced(advHtml);
        return;
      }

      // Checksum is valid and date is valid! Parse metadata
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

      // Update feedback card
      workbench.setStats([
        ['Birth Date', dateStr],
        ['Gender', gender],
        ['Century', `${century}s`],
        ['Serial Code', serialPart],
        ['Verification Status', '✓ Valid']
      ], [`Length Check: Pass (11 digits)`, `Checksum Check: Pass (Control digit ${expectedChecksum} matches)`], 'success');

      // Update advanced collapsible diagnostics
      const advHtml = `
        <div style="font-family: monospace; font-size: 0.8rem; padding: 12px; border-radius: 4px; background: var(--code-bg); color: var(--code-text); margin-top: 8px; line-height: 1.4;">
          <p style="margin-top: 0; font-weight: 600; color: #16a34a; font-size: 0.85rem;">[Checksum weighted multiplication steps]</p>
          ${checksumSteps.map(step => `<div>${step}</div>`).join('')}
          <div style="margin-top: 10px; border-top: 1px solid #444; padding-top: 8px; font-weight: 600;">
            Sum of Products = ${sum}<br>
            Sum % 10 = ${modulo}<br>
            (10 - Sum % 10) % 10 = ${calculatedChecksum} (Expected: ${expectedChecksum} - MATCH: TRUE)
          </div>
          <p style="margin-top: 12px; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Regex match status]</p>
          <div>Pattern: /^\\d{11}$/</div>
          <div>Match: true</div>
          <p style="margin-top: 12px; font-weight: 600; color: #f2c94c; font-size: 0.85rem;">[Raw JSON Output]</p>
          <pre style="margin: 0; white-space: pre-wrap; font-family: monospace;">${JSON.stringify(result, null, 2)}</pre>
        </div>
      `;
      workbench.setAdvanced(advHtml);

      // Output text
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
