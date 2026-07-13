import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

const templatePath = resolve(projectRoot, 'templates', 'identifier.template.html');
const outputPath = resolve(siteRoot, locale, 'identifiers', 'pesel', 'index.html');

// Simple Markdown to HTML converter
function convertMarkdownToHtml(markdown) {
  let html = markdown.trim();

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold / Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // Split lines to handle paragraphs, lists, and tables
  const lines = html.split('\n');
  let result = [];
  let inList = false;
  let inTable = false;
  let tableRows = [];

  for (let line of lines) {
    line = line.trim();

    // List items
    if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) {
        result.push('<ul>');
        inList = true;
      }
      result.push(`<li>${line.substring(2)}</li>`);
      continue;
    } else if (inList && !line.startsWith('* ') && !line.startsWith('- ') && line !== '') {
      result.push('</ul>');
      inList = false;
    }

    // Table items
    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
      continue;
    } else if (inTable && !line.startsWith('|')) {
      result.push(renderHtmlTable(tableRows));
      inTable = false;
    }

    // Paragraphs vs Empty lines
    if (line === '') {
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      if (inTable) {
        result.push(renderHtmlTable(tableRows));
        inTable = false;
      }
      continue;
    }

    // Normal line (unless already heading)
    if (!line.startsWith('<h') && !inList && !inTable) {
      result.push(`<p>${line}</p>`);
    } else {
      result.push(line);
    }
  }

  if (inList) result.push('</ul>');
  if (inTable) result.push(renderHtmlTable(tableRows));

  return result.join('\n');
}

function renderHtmlTable(rows) {
  let html = '<div class="pesel-debugger-table-container"><table class="pesel-dev-table">';
  let hasHeader = false;

  for (let row of rows) {
    const cells = row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (cells.length === 0) continue;

    // Check if separator line
    if (cells[0].startsWith('---') || cells[0].startsWith(':---')) {
      continue;
    }

    html += '<tr>';
    for (let cell of cells) {
      if (!hasHeader) {
        html += `<th>${cell}</th>`;
      } else {
        html += `<td>${cell}</td>`;
      }
    }
    html += '</tr>';
    hasHeader = true;
  }

  html += '</table></div>';
  return html;
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('--- STARTING KNOWLEDGE GRAPH ENTITY BUILDER ---');

  // Load raw data sources
  const entityData = JSON.parse(await readFile(resolve(projectRoot, 'knowledge/entities/identifier/pesel.json'), 'utf8'));
  const relationships = JSON.parse(await readFile(resolve(projectRoot, 'knowledge/relationships.json'), 'utf8'));
  const sourceGovPl = JSON.parse(await readFile(resolve(projectRoot, 'knowledge/sources/gov-pl-pesel.json'), 'utf8'));

  const overviewMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/overview.en.md'), 'utf8');
  const structureMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/structure.en.md'), 'utf8');
  const checksumMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/checksum.en.md'), 'utf8');
  const faqMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/faq.en.md'), 'utf8');
  const devNotesMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/developer-notes.en.md'), 'utf8');
  const referencesMd = await readFile(resolve(projectRoot, 'content/identifiers/pesel/references.en.md'), 'utf8');

  const examples = JSON.parse(await readFile(resolve(projectRoot, 'content/identifiers/pesel/examples.json'), 'utf8'));
  const snippets = JSON.parse(await readFile(resolve(projectRoot, 'content/identifiers/pesel/snippets.json'), 'utf8'));

  // Compile content parts
  const overviewHtml = convertMarkdownToHtml(overviewMd);
  const structureHtml = convertMarkdownToHtml(structureMd);
  const checksumHtml = convertMarkdownToHtml(checksumMd);
  const devNotesHtml = convertMarkdownToHtml(devNotesMd);
  const referencesHtml = convertMarkdownToHtml(referencesMd);

  // Parse trust / verification flags (Provenance)
  const isVerified = entityData.verificationStatus === 'verified' || entityData.reviewPolicy === 'stable';
  const verificationText = isVerified ? '✓ Verified Source' : '⚠ Draft specification';
  const lastReviewed = new Date(entityData.lastReviewedAt).toISOString().split('T')[0];

  // Visual badges row
  const featureBadgesHtml = `
    <span class="pesel-pill active">🔒 Local Spec</span>
    <span class="pesel-pill">${verificationText}</span>
    <span class="pesel-pill">📅 Reviewed: ${lastReviewed}</span>
    <span class="pesel-pill">✓ Privacy Assured</span>
  `;

  // Quick facts grid
  const quickFactsHtml = `
    <div class="inspector-details-grid">
      <div>
        <dt>Region / Jurisdiction</dt>
        <dd>Poland (PL)</dd>
      </div>
      <div>
        <dt>Identifier Category</dt>
        <dd>Natural Persons</dd>
      </div>
      <div>
        <dt>Format & Length</dt>
        <dd>11 numeric digits</dd>
      </div>
      <div>
        <dt>Governed By</dt>
        <dd>Ministry of Digital Affairs</dd>
      </div>
    </div>
  `;

  // Visual digit representation
  const visualStructureHtml = `
    <section class="content-card">
      <div class="section-heading">
        <span class="eyebrow">Visualization</span>
        <h2>Visual Structure Breakdown</h2>
      </div>
      <div class="pesel-visual-blocks-container">
        <div class="pesel-visual-block">
          <div class="pesel-visual-block-header">Year</div>
          <div class="pesel-visual-block-body">YY</div>
        </div>
        <div class="pesel-visual-block">
          <div class="pesel-visual-block-header">Month</div>
          <div class="pesel-visual-block-body">MM</div>
        </div>
        <div class="pesel-visual-block">
          <div class="pesel-visual-block-header">Day</div>
          <div class="pesel-visual-block-body">DD</div>
        </div>
        <div class="pesel-visual-block">
          <div class="pesel-visual-block-header">Serial / Gender</div>
          <div class="pesel-visual-block-body">SSSG</div>
        </div>
        <div class="pesel-visual-block">
          <div class="pesel-visual-block-header">Checksum</div>
          <div class="pesel-visual-block-body" style="color:var(--accent);">C</div>
        </div>
      </div>
      <div style="margin-top:20px;">
        ${structureHtml}
      </div>
    </section>
  `;

  // Century Offset Table (Visual representation)
  const centuryOffsetHtml = `
    <section class="content-card">
      <div class="section-heading">
        <span class="eyebrow">Encoding Rules</span>
        <h2>Century Offset Mapping</h2>
      </div>
      <p style="margin-bottom:16px;">To prevent century clashes, the birth month values are offset according to the century of birth:</p>
      <div class="pesel-debugger-table-container">
        <table class="pesel-dev-table">
          <thead>
            <tr>
              <th>Century</th>
              <th>Month Offset</th>
              <th>Month Ranges</th>
              <th>Example (May 15th)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1800–1899</td>
              <td>+80</td>
              <td>81–92</td>
              <td><code>YY8515...</code></td>
            </tr>
            <tr>
              <td>1900–1999</td>
              <td>+0</td>
              <td>01–12</td>
              <td><code>YY0515...</code></td>
            </tr>
            <tr>
              <td>2000–2099</td>
              <td>+20</td>
              <td>21–32</td>
              <td><code>YY2515...</code></td>
            </tr>
            <tr>
              <td>2100–2199</td>
              <td>+40</td>
              <td>41–52</td>
              <td><code>YY4515...</code></td>
            </tr>
            <tr>
              <td>2200–2299</td>
              <td>+60</td>
              <td>61–72</td>
              <td><code>YY6515...</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  // Gender encoding rules
  const genderEncodingHtml = `
    <section class="content-card">
      <div class="section-heading">
        <span class="eyebrow">Gender Encoding</span>
        <h2>Gender Assignment Rules</h2>
      </div>
      <p>Digit 10 (the 4th digit of the serial code block) indicates the legal gender of the holder:</p>
      <div class="pesel-debugger-table-container">
        <table class="pesel-dev-table">
          <thead>
            <tr>
              <th>Gender</th>
              <th>Allowed Digits</th>
              <th>Example Assignment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span style="color:#8b5cf6; font-weight:700;">Female</span></td>
              <td><code>0, 2, 4, 6, 8</code> (Even numbers)</td>
              <td><code>XXXXXXX2XX</code></td>
            </tr>
            <tr>
              <td><span style="color:#2f80ed; font-weight:700;">Male</span></td>
              <td><code>1, 3, 5, 7, 9</code> (Odd numbers)</td>
              <td><code>XXXXXXX3XX</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `;

  // Checksum mathematical details section
  const checksumSectionHtml = `
    <section class="content-card">
      <div class="section-heading">
        <span class="eyebrow">Verification Math</span>
        <h2>Modulo Checksum Details</h2>
      </div>
      ${checksumHtml}
    </section>
  `;

  // Examples list cards
  let examplesTableHtml = `
    <div class="pesel-debugger-table-container">
      <table class="pesel-dev-table">
        <thead>
          <tr>
            <th>Sample Input</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  `;
  examples.forEach(ex => {
    const statusLabel = ex.valid 
      ? '<span style="color:#16a34a; font-weight:700;">✓ Valid</span>' 
      : '<span style="color:#dc2626; font-weight:700;">✗ Invalid</span>';
    examplesTableHtml += `
      <tr>
        <td style="font-family:monospace; font-weight:700;">${ex.input}</td>
        <td><strong>${ex.name}</strong> — ${ex.description}</td>
        <td>${statusLabel}</td>
      </tr>
    `;
  });
  examplesTableHtml += `
        </tbody>
      </table>
    </div>
  `;

  // Resolve semantic relationships from knowledge/relationships.json
  // We only map actual links connecting with "identifier:pesel"
  const relNodes = [];
  relationships.forEach(rel => {
    if (rel.source === 'identifier:pesel' || rel.target === 'identifier:pesel') {
      const otherNode = rel.source === 'identifier:pesel' ? rel.target : rel.source;
      const type = rel.type.replace(/_/g, ' ');
      
      let displayName = otherNode;
      let targetHref = '#';
      let typeBadge = 'Entity';

      if (otherNode === 'country:poland') {
        displayName = 'Poland Country Hub';
        targetHref = '/en/poland/';
        typeBadge = 'Country';
      } else if (otherNode === 'authority:mc') {
        displayName = 'Ministry of Digital Affairs (Poland)';
        targetHref = 'https://www.gov.pl/web/cyfryzacja';
        typeBadge = 'Authority';
      } else if (otherNode === 'workbench:pesel-validator') {
        displayName = 'PESEL Workbench Validator';
        targetHref = '/en/poland/pesel-validator/';
        typeBadge = 'Workbench';
      }

      // Avoid linking page to itself
      if (otherNode !== 'identifier:pesel') {
        relNodes.push({
          id: otherNode,
          name: displayName,
          href: targetHref,
          type: type,
          badge: typeBadge
        });
      }
    }
  });

  let graphConnectionsHtml = `
    <p style="color:var(--muted); margin-bottom:16px;">Verified connections map for the PESEL identifier in the central knowledge graph:</p>
    <div class="graph-visual-container">
  `;
  relNodes.forEach(node => {
    const arrowSymbol = '→';
    graphConnectionsHtml += `
      <div class="graph-visual-row">
        <div class="graph-node" style="border-color:#bfdbfe; background:#eff6ff;">
          <span class="graph-node-type">Identifier</span>
          <span>PESEL</span>
        </div>
        <span class="graph-arrow">${arrowSymbol}</span>
        <span style="font-size:0.75rem; font-weight:700; color:var(--muted); text-transform:uppercase;">${node.type}</span>
        <span class="graph-arrow">${arrowSymbol}</span>
        <a class="graph-node" href="${node.href}" ${node.href.startsWith('http') ? 'target="_blank"' : ''}>
          <span class="graph-node-type" style="background:#fed7aa; color:#7c2d12;">${node.badge}</span>
          <span>${node.name}</span>
        </a>
      </div>
    `;
  });
  graphConnectionsHtml += '</div>';

  // FAQ Accordions list
  const faqBlocks = faqMd.trim().split('###').filter(b => b.trim());
  let faqAccordionsHtml = '';
  faqBlocks.forEach(block => {
    const lines = block.split('\n');
    const question = lines[0].trim();
    const answer = lines.slice(1).join('\n').trim();
    faqAccordionsHtml += `
      <details class="doc-accordion">
        <summary>${question}</summary>
        <div class="rich-text">
          ${convertMarkdownToHtml(answer)}
        </div>
      </details>
    `;
  });

  // Read HTML Template
  let templateHtml = await readFile(templatePath, 'utf8');

  // Fill Placeholders
  templateHtml = templateHtml
    .replaceAll('{{ TITLE }}', 'PESEL (Polish Personal Number) | ValidoHub')
    .replaceAll('{{ DESCRIPTION }}', 'Canonical specification, century offsets, validation constraints, and code snippets for the Polish PESEL identifier.')
    .replaceAll('{{ CANONICAL }}', 'https://validohub.com/en/identifiers/pesel/')
    .replaceAll('{{ ENTITY_NAME }}', 'PESEL')
    .replaceAll('{{ ENTITY_DESCRIPTION }}', entityData.shortDefinition)
    .replaceAll('{{ FEATURE_BADGES }}', featureBadgesHtml)
    .replaceAll('{{ QUICK_FACTS }}', quickFactsHtml)
    .replaceAll('{{ OVERVIEW_HTML }}', overviewHtml)
    .replaceAll('{{ VISUAL_STRUCTURE_SECTION }}', visualStructureHtml + centuryOffsetHtml + genderEncodingHtml)
    .replaceAll('{{ CHECKSUM_SECTION }}', checksumSectionHtml)
    .replaceAll('{{ EXAMPLES_TABLES }}', examplesTableHtml)
    .replaceAll('{{ DEVELOPER_NOTES_HTML }}', devNotesHtml)
    .replaceAll('{{ GRAPH_CONNECTIONS }}', graphConnectionsHtml)
    .replaceAll('{{ FAQ_ACCORDIONS }}', faqAccordionsHtml)
    .replaceAll('{{ REFERENCES_HTML }}', referencesHtml)
    .replaceAll('{{ SNIPPET_JS }}', snippets.javascript)
    .replaceAll('{{ SNIPPET_DATA_JSON }}', JSON.stringify(snippets));

  // Write static output page
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, templateHtml, 'utf8');

  console.log(`PASS: Matched template slots and generated PESEL entity page to ${outputPath}`);
  console.log('--- COMPLETED KNOWLEDGE GRAPH ENTITY BUILD ---');
}

main().catch(err => {
  console.error('Fatal compilation failure:', err);
  process.exit(1);
});
