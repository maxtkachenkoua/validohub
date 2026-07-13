import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const locale = 'en';

const templatePath = resolve(projectRoot, 'templates', 'identifier.template.html');

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
  console.log('--- STARTING INTERACTIVE ENTITY ENGINE (IEE) COMPILER ---');

  const contentDir = resolve(projectRoot, 'content', 'identifiers');
  const items = await readdir(contentDir, { withFileTypes: true });
  const identifiers = items.filter(i => i.isDirectory()).map(i => i.name);
  identifiers.sort();

  const relationships = JSON.parse(await readFile(resolve(projectRoot, 'knowledge/relationships.json'), 'utf8'));

  for (const id of identifiers) {
    const dirPath = resolve(contentDir, id);
    const metaPath = resolve(dirPath, 'metadata.json');
    if (!(await pathExists(metaPath))) {
      console.warn(`Skipping identifier "${id}": metadata.json missing.`);
      continue;
    }

    console.log(`Processing entity: ${id}`);
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

    // Compile markdown content segments
    const overviewHtml = convertMarkdownToHtml(overviewMd);
    const structureHtml = convertMarkdownToHtml(structureMd);
    const checksumHtml = convertMarkdownToHtml(checksumMd);
    const devNotesHtml = convertMarkdownToHtml(devNotesMd);
    const referencesHtml = convertMarkdownToHtml(referencesMd);

    // Provenance Verification status
    const isVerified = schemaData.verificationStatus === 'verified';
    const lastReviewed = new Date(schemaData.lastReviewedAt).toISOString().split('T')[0];
    const verificationText = isVerified ? '✓ Verified Source' : '⚠ Draft specification';

    // UI Modules Renderers
    let featureBadgesHtml = '';
    let quickFactsHtml = '';
    let visualStructureHtml = '';
    let checksumSectionHtml = '';
    let examplesTableHtml = '';
    let graphConnectionsHtml = '';
    let faqAccordionsHtml = '';

    metadata.layout.forEach(comp => {
      if (comp === 'Hero') {
        featureBadgesHtml = `
          <span class="pesel-pill active">🔒 Local Spec</span>
          <span class="pesel-pill">${verificationText}</span>
          <span class="pesel-pill">📅 Reviewed: ${lastReviewed}</span>
          <span class="pesel-pill">✓ Privacy Assured</span>
        `;
      } else if (comp === 'QuickFacts') {
        quickFactsHtml = `
          <div class="inspector-details-grid">
            <div>
              <dt>Region / Jurisdiction</dt>
              <dd>${metadata.country} (${schemaData.id.includes('steuer-id') ? 'DE' : schemaData.id.includes('cpf') || schemaData.id.includes('cnpj') ? 'BR' : 'PL'})</dd>
            </div>
            <div>
              <dt>Identifier Category</dt>
              <dd>${metadata.name === 'CPF' || metadata.name === 'PESEL' || metadata.name === 'Steuer-IdNr' ? 'Natural Persons' : 'Legal Entities / Businesses'}</dd>
            </div>
            <div>
              <dt>Format & Length</dt>
              <dd>${metadata.length} numeric digits</dd>
            </div>
            <div>
              <dt>Status Badge</dt>
              <dd>${schemaData.verificationStatus.toUpperCase()}</dd>
            </div>
          </div>
        `;
      } else if (comp === 'FieldExplorer') {
        // Build block-by-block visual structure
        let blocks = '';
        metadata.fields.forEach(f => {
          let blockLabel = f.id.toUpperCase();
          blocks += `
            <div class="pesel-visual-block">
              <div class="pesel-visual-block-header">${blockLabel}</div>
              <div class="pesel-visual-block-body">${f.id === 'checksum' ? `<span style="color:var(--accent);">${blockLabel}</span>` : blockLabel}</div>
            </div>
          `;
        });

        visualStructureHtml = `
          <section class="content-card">
            <div class="section-heading">
              <span class="eyebrow">Visualization</span>
              <h2>Visual Structure Breakdown</h2>
            </div>
            <div class="pesel-visual-blocks-container">
              ${blocks}
            </div>
            <div style="margin-top:20px;">
              ${structureHtml}
            </div>
          </section>
        `;
      } else if (comp === 'ChecksumExplorer') {
        checksumSectionHtml = `
          <section class="content-card">
            <div class="section-heading">
              <span class="eyebrow">Verification Math</span>
              <h2>Modulo Checksum Details</h2>
            </div>
            ${checksumHtml}
          </section>
        `;
      } else if (comp === 'ExampleExplorer') {
        examplesTableHtml = `
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
      } else if (comp === 'KnowledgeGraphViewer') {
        // Resolve graph links
        const nodeRef = `identifier:${id}`;
        const relNodes = [];
        relationships.forEach(rel => {
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
              targetHref = '#';
              typeBadge = 'Authority';
            } else if (other.startsWith('workbench:')) {
              displayName = `${metadata.name} Validator`;
              targetHref = `/en/${metadata.country.toLowerCase()}/${id}-validator/`;
              typeBadge = 'Workbench';
            }

            if (other !== nodeRef) {
              relNodes.push({ name: displayName, href: targetHref, type, badge: typeBadge });
            }
          }
        });

        graphConnectionsHtml = `
          <p style="color:var(--muted); margin-bottom:16px;">Verified connections map for the ${metadata.name} identifier in the central knowledge graph:</p>
          <div class="graph-visual-container">
        `;
        relNodes.forEach(node => {
          const arrowSymbol = '→';
          graphConnectionsHtml += `
            <div class="graph-visual-row">
              <div class="graph-node" style="border-color:#bfdbfe; background:#eff6ff;">
                <span class="graph-node-type">Identifier</span>
                <span>${metadata.name}</span>
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
      } else if (comp === 'FAQExplorer') {
        const faqBlocks = faqMd.trim().split('###').filter(b => b.trim());
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
      }
    });

    // Populate Reusable Template
    let templateHtml = await readFile(templatePath, 'utf8');

    // Breadcrumbs matching
    const breadcrumbHtml = `
      <a href="/en/">Home</a>
      <span aria-hidden="true">/</span>
      <a href="/en/countries/">Countries</a>
      <span aria-hidden="true">/</span>
      <a href="/en/${metadata.country.toLowerCase()}/">${metadata.country}</a>
      <span aria-hidden="true">/</span>
      <span>${metadata.name}</span>
    `;

    templateHtml = templateHtml
      .replaceAll('{{ TITLE }}', `${metadata.name} (${metadata.country} Tax ID) | ValidoHub`)
      .replaceAll('{{ DESCRIPTION }}', `Canonical specification, validation rules, and implementation code snippets for the ${metadata.name} identifier.`)
      .replaceAll('{{ CANONICAL }}', `https://validohub.com/en/identifiers/${id}/`)
      .replaceAll('{{ ENTITY_NAME }}', metadata.name)
      .replaceAll('{{ ENTITY_DESCRIPTION }}', schemaData.shortDefinition)
      .replaceAll('{{ FEATURE_BADGES }}', featureBadgesHtml)
      .replaceAll('{{ QUICK_FACTS }}', quickFactsHtml)
      .replaceAll('{{ OVERVIEW_HTML }}', overviewHtml)
      .replaceAll('{{ VISUAL_STRUCTURE_SECTION }}', visualStructureHtml)
      .replaceAll('{{ CHECKSUM_SECTION }}', checksumSectionHtml)
      .replaceAll('{{ EXAMPLES_TABLES }}', examplesTableHtml)
      .replaceAll('{{ DEVELOPER_NOTES_HTML }}', devNotesHtml)
      .replaceAll('{{ GRAPH_CONNECTIONS }}', graphConnectionsHtml)
      .replaceAll('{{ FAQ_ACCORDIONS }}', faqAccordionsHtml)
      .replaceAll('{{ REFERENCES_HTML }}', referencesHtml)
      .replaceAll('{{ SNIPPET_JS }}', snippets.javascript)
      .replaceAll('{{ SNIPPET_DATA_JSON }}', JSON.stringify(snippets));

    // Inject country custom breadcrumbs
    templateHtml = templateHtml.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/, `<nav class="breadcrumbs" aria-label="Breadcrumbs">${breadcrumbHtml}</nav>`);

    const outputFilePath = resolve(siteRoot, locale, 'identifiers', id, 'index.html');
    await mkdir(dirname(outputFilePath), { recursive: true });
    await writeFile(outputFilePath, templateHtml, 'utf8');

    console.log(`PASS: Generated static entity page under /en/identifiers/${id}/`);
  }

  console.log('--- COMPLETED INTERACTIVE ENTITY ENGINE (IEE) BUILD ---');
}

main().catch(err => {
  console.error('Fatal compilation failure:', err);
  process.exit(1);
});
