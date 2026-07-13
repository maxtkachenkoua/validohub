import { access, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

// Define explicit domain mathematical validator functions for examples checking
function validatePESEL(val) {
  if (!/^\d{11}$/.test(val)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(val[i]) * weights[i];
  const checksum = (10 - (sum % 10)) % 10;
  return checksum === parseInt(val[10]);
}

function validateNIP(val) {
  if (!/^\d{10}$/.test(val)) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(val[i]) * weights[i];
  const remainder = sum % 11;
  if (remainder === 10) return false;
  return remainder === parseInt(val[9]);
}

function validateREGON(val) {
  if (!/^\d{9}$/.test(val)) return false;
  const weights = [8, 9, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 8; i++) sum += parseInt(val[i]) * weights[i];
  const remainder = sum % 11;
  const checksum = remainder === 10 ? 0 : remainder;
  return checksum === parseInt(val[8]);
}

function validateCPF(val) {
  if (!/^\d{11}$/.test(val)) return false;
  if (/^(\d)\1{10}$/.test(val)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(val[i]) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(val[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(val[i]) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(val[10]);
}

function validateCNPJ(val) {
  if (!/^\d{14}$/.test(val)) return false;
  if (/^(\d)\1{13}$/.test(val)) return false;
  let size = 12;
  let numbers = val.substring(0, size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(val.charAt(12))) return false;
  size = 13;
  numbers = val.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(val.charAt(13));
}

function validateSteuerID(val) {
  if (!/^[1-9]\d{10}$/.test(val)) return false;
  const counts = {};
  for (let i = 0; i < 10; i++) counts[val[i]] = (counts[val[i]] || 0) + 1;
  const vals = Object.values(counts);
  let doubleCount = vals.filter(v => v === 2).length;
  let tripleCount = vals.filter(v => v === 3).length;
  if (!((doubleCount === 1 && tripleCount === 0) || (doubleCount === 0 && tripleCount === 1))) {
    return false;
  }
  let r = 10;
  for (let i = 0; i < 10; i++) {
    let s = (r + parseInt(val[i])) % 10;
    if (s === 0) s = 10;
    r = (s * 2) % 11;
  }
  const checksum = (11 - r) % 10;
  return checksum === parseInt(val[10]);
}

const algorithms = {
  'pesel': validatePESEL,
  'nip': validateNIP,
  'regon': validateREGON,
  'cpf': validateCPF,
  'cnpj': validateCNPJ,
  'steuer-id': validateSteuerID
};

// Simple Markdown block parser
function convertMarkdownToHtml(markdown) {
  const lines = markdown.split('\n');
  let html = [];
  let inCodeBlock = false;
  let codeContent = [];
  let inList = false;
  let inTable = false;
  let tableRows = [];

  for (let line of lines) {
    // 1. Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        html.push(`<pre><code>${codeContent.join('\n')}</code></pre>`);
        inCodeBlock = false;
        codeContent = [];
      } else {
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent.push(line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
      continue;
    }

    // 2. Handle lists
    const listMatch = line.match(/^[\*\-]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${parseInlineMarkdown(listMatch[1])}</li>`);
      continue;
    } else if (inList) {
      html.push('</ul>');
      inList = false;
    }

    // 3. Handle tables
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line.trim());
      continue;
    } else if (inTable) {
      html.push(renderHtmlTable(tableRows));
      inTable = false;
    }

    // 4. Handle headings (skip redundant main sections headers)
    if (line.startsWith('### ')) {
      html.push(`<h3>${parseInlineMarkdown(line.substring(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h2>${parseInlineMarkdown(line.substring(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      const headingText = line.substring(2).trim();
      if (
        headingText.includes('Frequently Asked Questions') ||
        headingText.includes('Official References') ||
        headingText.includes('Developer Implementation') ||
        headingText.includes('Structure') ||
        headingText.includes('Algorithm') ||
        headingText.includes('NIP Format') ||
        headingText.includes('REGON Format') ||
        headingText.includes('CPF Format') ||
        headingText.includes('CNPJ Format') ||
        headingText.includes('Steuer-ID Format') ||
        headingText.includes('PESEL Digit')
      ) {
        continue;
      }
      html.push(`<h1>${parseInlineMarkdown(headingText)}</h1>`);
      continue;
    }

    // 5. Paragraphs
    if (line.trim() === '') {
      continue;
    }
    html.push(`<p>${parseInlineMarkdown(line.trim())}</p>`);
  }

  if (inList) html.push('</ul>');
  if (inTable) html.push(renderHtmlTable(tableRows));

  return html.join('\n');
}

function parseInlineMarkdown(text) {
  let result = text;
  result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return result;
}

function renderHtmlTable(rows) {
  let html = '<div class="vh-table-container"><table class="vh-table">';
  let hasHeader = false;

  for (let row of rows) {
    const cells = row.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    if (cells.length === 0) continue;

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

// Safely escape JSON scripts elements to prevent closing script injections
function escapeHtmlJson(jsonStr) {
  return jsonStr
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// Strongly Typed Page Model Validator
function validatePageModel(model) {
  if (!model.slug || typeof model.slug !== 'string') throw new Error('Model validation failed: slug is required.');
  if (!model.displayName || typeof model.displayName !== 'string') throw new Error('Model validation failed: displayName is required.');
  if (!model.country || typeof model.country !== 'string') throw new Error('Model validation failed: country is required.');
  if (!model.length || typeof model.length !== 'number') throw new Error('Model validation failed: length is required.');
  if (!model.canonicalUrl || !model.canonicalUrl.startsWith('http')) throw new Error('Model validation failed: malformed canonical URL.');

  // Validate fields definitions and check constraints (no overlaps, no gaps)
  let covered = new Array(model.length).fill(false);
  model.fields.forEach(f => {
    if (!f.pattern || typeof f.pattern !== 'string') throw new Error(`Field ${f.id} must declare a visual layout pattern.`);
    const [start, end] = f.positions;
    if (start < 1 || end > model.length || start > end) {
      throw new Error(`Field ${f.id} range [${start}, ${end}] is out of bounds for length ${model.length}`);
    }
    for (let i = start - 1; i < end; i++) {
      if (covered[i]) {
        throw new Error(`Field ${f.id} range overlaps with another field at position ${i + 1}`);
      }
      covered[i] = true;
    }
  });

  for (let i = 0; i < model.length; i++) {
    if (!covered[i]) {
      throw new Error(`Identifier layout has a gap at digit position ${i + 1}`);
    }
  }
}

// Pure components rendering functions
function renderHeader() {
  return `
    <header class="site-header">
      <div class="vh-container header-inner">
        <a class="brand" href="/en/">
          <span class="brand-mark">V</span>
          <span class="brand-text">ValidoHub</span>
        </a>
        <nav class="primary-nav" aria-label="Main navigation">
          <a href="/en/">Home</a>
          <a href="/en/countries/">Countries</a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="vh-container footer-inner">
        <a class="brand" href="/en/">
          <span class="brand-mark">V</span>
          <span class="brand-text">ValidoHub</span>
        </a>
        <p>Static tools generated by Valido Engine.</p>
      </div>
    </footer>
  `;
}

function renderBreadcrumbs(model) {
  return `
    <nav class="vh-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/en/">Home</a></li>
        <li><a href="/en/${model.countryCode.toLowerCase()}/">${model.country}</a></li>
        <li><span aria-current="page">${model.displayName}</span></li>
      </ol>
    </nav>
  `;
}

function renderHero(model) {
  return `
    <header class="vh-page-intro">
      <span class="vh-eyebrow">${model.category}</span>
      <h1>${model.displayName}</h1>
      <p>${model.description}</p>
      <div class="vh-flex vh-gap-sm vh-mt-md vh-flex-wrap">
        <span class="vh-badge vh-badge--active">🔒 Local Spec</span>
        <span class="vh-badge vh-badge--verified">${model.status === 'verified' ? '✓ Verified Source' : '⚠ Draft specification'}</span>
        <span class="vh-badge">📅 Reviewed: ${model.reviewedAt}</span>
        <span class="vh-badge">✓ Privacy Assured</span>
      </div>
    </header>
  `;
}

function renderQuickFacts(model) {
  return `
    <div class="vh-metadata-grid">
      <div class="vh-metadata-item">
        <dt class="vh-metadata-label">Region / Jurisdiction</dt>
        <dd class="vh-metadata-value">${model.country} (${model.countryCode})</dd>
      </div>
      <div class="vh-metadata-item">
        <dt class="vh-metadata-label">Identifier Category</dt>
        <dd class="vh-metadata-value">${model.category}</dd>
      </div>
      <div class="vh-metadata-item">
        <dt class="vh-metadata-label">Format & Length</dt>
        <dd class="vh-metadata-value">${model.length} numeric digits</dd>
      </div>
      <div class="vh-metadata-item">
        <dt class="vh-metadata-label">Status Badge</dt>
        <dd class="vh-metadata-value">${model.status.toUpperCase()}</dd>
      </div>
    </div>
  `;
}

function renderVisualStructure(model, structureHtml) {
  let blocks = '';
  model.fields.forEach(f => {
    const isChecksum = f.id === 'checksum';
    blocks += `
      <div class="vh-visual-block">
        <div class="vh-visual-block-header">${f.id}</div>
        <div class="vh-visual-block-body ${isChecksum ? 'vh-success' : ''}">${f.pattern}</div>
      </div>
    `;
  });

  return `
    <section class="vh-card">
      <div class="section-heading">
        <span class="vh-eyebrow">Visualization</span>
        <h2>Visual Structure Breakdown</h2>
      </div>
      <div class="vh-visual-blocks">
        ${blocks}
      </div>
      <div class="vh-mt-lg">
        ${structureHtml}
      </div>
    </section>
  `;
}

function renderChecksum(checksumHtml) {
  return `
    <section class="vh-card">
      <div class="section-heading">
        <span class="vh-eyebrow">Verification Math</span>
        <h2>Modulo Checksum Details</h2>
      </div>
      ${checksumHtml}
    </section>
  `;
}

function renderExamples(examples) {
  let rows = '';
  examples.forEach(ex => {
    const statusLabel = ex.valid
      ? '<span class="vh-success">✓ Valid</span>'
      : '<span class="vh-danger">✗ Invalid</span>';
    rows += `
      <tr>
        <td class="vh-font-mono vh-font-bold">${ex.input}</td>
        <td><strong>${ex.name}</strong> — ${ex.description}</td>
        <td>${statusLabel}</td>
      </tr>
    `;
  });

  return `
    <div class="vh-table-container">
      <table class="vh-table">
        <thead>
          <tr>
            <th>Sample Input</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderFAQ(faqHtml) {
  return faqHtml;
}

function renderReferences(referencesHtml) {
  return referencesHtml;
}

async function renderKnowledgeGraph(model, relationships) {
  const nodeRef = `identifier:${model.slug}`;
  const relNodes = [];

  for (const rel of relationships) {
    if (rel.source === nodeRef || rel.target === nodeRef) {
      const other = rel.source === nodeRef ? rel.target : rel.source;
      const type = rel.type.replace(/_/g, ' ');
      let displayName = other;
      let targetHref = '#';
      let typeBadge = 'Entity';

      if (other === 'country:poland') {
        displayName = 'Poland Country Hub';
        targetHref = '/en/poland/';
        typeBadge = 'Country';
      } else if (other === 'country:brazil') {
        displayName = 'Brazil Country Hub';
        targetHref = '/en/brazil/';
        typeBadge = 'Country';
      } else if (other === 'country:germany') {
        displayName = 'Germany Country Hub';
        targetHref = '/en/germany/';
        typeBadge = 'Country';
      } else if (other.startsWith('authority:')) {
        displayName = other.substring(10).toUpperCase();
        if (displayName === 'MF') displayName = 'Ministry of Finance';
        if (displayName === 'MC') displayName = 'Ministry of Digital Affairs';
        if (displayName === 'GUS') displayName = 'Central Statistical Office (GUS)';
        if (displayName === 'RECEITA-FEDERAL') displayName = 'Receita Federal (RFB)';
        if (displayName === 'BZST') displayName = 'Federal Central Tax Office (BZSt)';
        targetHref = '#';
        typeBadge = 'Authority';
      } else if (other.startsWith('workbench:')) {
        displayName = `${model.displayName} Validator`;
        targetHref = `/en/${model.country.toLowerCase()}/${model.slug}-validator/`;
        typeBadge = 'Workbench';
      }

      if (other !== nodeRef) {
        // Assert workbench links only if path exists
        let routeValid = true;
        if (typeBadge === 'Workbench') {
          const relativePath = targetHref.replace(/^\//, '');
          const checkPath = resolve(siteRoot, relativePath, 'index.html');
          routeValid = await pathExists(checkPath);
        }

        relNodes.push({
          name: displayName,
          href: targetHref,
          type,
          badge: typeBadge,
          isLink: targetHref !== '#' && routeValid
        });
      }
    }
  }

  let html = `
    <p class="vh-color-muted vh-mb-md">Verified connections map for the ${model.displayName} identifier in the central knowledge graph:</p>
    <div class="vh-graph">
  `;

  relNodes.forEach(node => {
    const arrowSymbol = '→';
    const linkElement = node.isLink
      ? `<a class="vh-graph-node" href="${node.href}"><span class="vh-graph-badge vh-graph-badge--orange">${node.badge}</span><span>${node.name}</span></a>`
      : `<span class="vh-graph-node"><span class="vh-graph-badge vh-graph-badge--grey">${node.badge}</span><span>${node.name}</span></span>`;

    html += `
      <div class="vh-graph-row">
        <div class="vh-graph-node vh-graph-node--current">
          <span class="vh-graph-badge">Identifier</span>
          <span>${model.displayName}</span>
        </div>
        <span class="vh-graph-arrow">${arrowSymbol}</span>
        <span class="vh-graph-relation">${node.type}</span>
        <span class="vh-graph-arrow">${arrowSymbol}</span>
        ${linkElement}
      </div>
    `;
  });

  html += '</div>';
  return html;
}

async function main() {
  console.log('--- STARTING VALIDO-ENGINE V2 PLATFORM COMPILER ---');

  const contentDir = resolve(projectRoot, 'content', 'identifiers');
  const items = await readdir(contentDir, { withFileTypes: true });
  const identifiers = items.filter(i => i.isDirectory()).map(i => i.name);
  identifiers.sort();

  const relationships = JSON.parse(await readFile(resolve(projectRoot, 'knowledge/relationships.json'), 'utf8'));

  // Load layout template
  const layoutTemplate = await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const contentTemplate = await readFile(resolve(projectRoot, 'templates', 'identifier.html'), 'utf8');

  for (const id of identifiers) {
    const dirPath = resolve(contentDir, id);
    const metaPath = resolve(dirPath, 'metadata.json');
    if (!(await pathExists(metaPath))) continue;

    console.log(`Compiling entity page: ${id}`);
    const metadata = JSON.parse(await readFile(metaPath, 'utf8'));

    // Load segment markdown files
    const overviewMd = await readFile(resolve(dirPath, 'overview.en.md'), 'utf8');
    const structureMd = await readFile(resolve(dirPath, 'structure.en.md'), 'utf8');
    const checksumMd = await readFile(resolve(dirPath, 'checksum.en.md'), 'utf8');
    const faqMd = await readFile(resolve(dirPath, 'faq.en.md'), 'utf8');
    const devNotesMd = await readFile(resolve(dirPath, 'developer-notes.en.md'), 'utf8');
    const referencesMd = await readFile(resolve(dirPath, 'references.en.md'), 'utf8');

    const examples = JSON.parse(await readFile(resolve(dirPath, 'examples.json'), 'utf8'));
    const snippets = JSON.parse(await readFile(resolve(dirPath, 'snippets.json'), 'utf8'));

    // Load graph schema properties
    const schemaFile = resolve(projectRoot, 'knowledge/entities/identifier', `${id}.json`);
    const schemaData = JSON.parse(await readFile(schemaFile, 'utf8'));

    // Map strongly typed Page Model properties
    const pageModel = {
      slug: id,
      displayName: metadata.name,
      formalName: schemaData.name,
      country: metadata.country,
      countryCode: id === 'steuer-id' ? 'Germany' : id === 'cpf' || id === 'cnpj' ? 'Brazil' : 'Poland',
      category: metadata.name === 'PESEL' ? 'Polish Personal Identifier' : metadata.name === 'Steuer-IdNr' ? 'German Personal Tax ID' : metadata.name === 'CPF' ? 'Brazilian Individual Taxpayer Registry' : metadata.name === 'CNPJ' ? 'Brazilian Business Taxpayer Registry' : 'Polish Tax ID',
      description: schemaData.shortDefinition,
      status: schemaData.verificationStatus,
      reviewedAt: new Date(schemaData.lastReviewedAt).toISOString().split('T')[0],
      canonicalUrl: `https://validohub.com/en/identifiers/${id}/`,
      fields: metadata.fields,
      length: metadata.length
    };

    // Run build-time strongly typed validations
    validatePageModel(pageModel);

    // Validate examples correctness using execution tests
    const validatorFunc = algorithms[id];
    if (validatorFunc) {
      examples.forEach(ex => {
        const computed = validatorFunc(ex.input);
        if (computed !== ex.valid) {
          throw new Error(`Example validation error: Input "${ex.input}" expected validity: ${ex.valid}, but validator returned: ${computed}`);
        }
      });
    }

    // Compile markdown content segments safely
    const overviewHtml = convertMarkdownToHtml(overviewMd);
    const structureHtml = convertMarkdownToHtml(structureMd);
    const checksumHtml = convertMarkdownToHtml(checksumMd);
    const devNotesHtml = convertMarkdownToHtml(devNotesMd);
    const referencesHtml = convertMarkdownToHtml(referencesMd);

    const faqBlocks = faqMd.split('###').map(b => b.trim()).filter(b => b && !b.startsWith('#'));
    let faqAccordionsHtml = '';
    faqBlocks.forEach(block => {
      const lines = block.split('\n');
      const question = lines[0].trim();
      const answer = lines.slice(1).join('\n').trim();
      faqAccordionsHtml += `
        <details class="vh-accordion">
          <summary>${question}</summary>
          <div class="rich-text">
            ${convertMarkdownToHtml(answer)}
          </div>
        </details>
      `;
    });

    // Populate Content Template
    let pageContent = contentTemplate
      .replaceAll('{{ ENTITY_NAME }}', () => pageModel.displayName)
      .replaceAll('{{ OVERVIEW_HTML }}', () => overviewHtml)
      .replaceAll('{{ VISUAL_STRUCTURE_SECTION }}', () => renderVisualStructure(pageModel, structureHtml))
      .replaceAll('{{ CHECKSUM_SECTION }}', () => renderChecksum(checksumHtml))
      .replaceAll('{{ EXAMPLES_TABLES }}', () => renderExamples(examples))
      .replaceAll('{{ DEVELOPER_NOTES_HTML }}', () => devNotesHtml)
      .replaceAll('{{ SNIPPET_JS }}', () => snippets.javascript)
      .replaceAll('{{ GRAPH_CONNECTIONS }}', () => '') // resolved later below
      .replaceAll('{{ FAQ_ACCORDIONS }}', () => renderFAQ(faqAccordionsHtml))
      .replaceAll('{{ REFERENCES_HTML }}', () => renderReferences(referencesHtml));

    // Resolve dynamic graph relations connections asynchronously
    const graphHtml = await renderKnowledgeGraph(pageModel, relationships);
    pageContent = pageContent.replaceAll('{{ GRAPH_CONNECTIONS }}', () => graphHtml);

    // Build layout template slots replacements
    const headHtml = `
      <title>${pageModel.displayName} | ValidoHub</title>
      <meta name="description" content="${pageModel.description}">
      <link rel="canonical" href="${pageModel.canonicalUrl}">
      <link rel="alternate" hreflang="en" href="${pageModel.canonicalUrl}">
    `;

    const breadcrumbsHtml = renderBreadcrumbs(pageModel);
    const heroHtml = renderHero(pageModel);
    const quickFactsHtml = renderQuickFacts(pageModel);

    // Assemble page content cards
    const finalContent = pageContent.replace('{{ QUICK_FACTS }}', () => quickFactsHtml);

    // Secure payload serialization to prevent script injection
    const escapedJsonPayload = escapeHtmlJson(JSON.stringify(snippets));
    const scriptsHtml = `
      <script type="application/json" id="vh-snippets-data">${escapedJsonPayload}</script>
      <script src="/assets/js/bundle.js" defer></script>
    `;

    // Reconstruct Layout shell
    let assembledHtml = layoutTemplate
      .replaceAll('{{ HEAD }}', () => headHtml)
      .replaceAll('{{ HEADER }}', () => renderHeader())
      .replaceAll('{{ BREADCRUMBS }}', () => breadcrumbsHtml)
      .replaceAll('{{ HERO }}', () => heroHtml)
      .replaceAll('{{ CONTENT }}', () => finalContent)
      .replaceAll('{{ FOOTER }}', () => renderFooter())
      .replaceAll('{{ SCRIPTS }}', () => scriptsHtml);

    const outputFilePath = resolve(siteRoot, locale, 'identifiers', id, 'index.html');
    await writeFile(outputFilePath, assembledHtml, 'utf8');
    console.log(`SUCCESS: Matched templates and generated static route /en/identifiers/${id}/`);
  }

  console.log('--- COMPLETED VALIDO-ENGINE V2 COMPILE PIPELINE ---');
}

main().catch(err => {
  console.error('Fatal compilation failure:', err);
  process.exit(1);
});
