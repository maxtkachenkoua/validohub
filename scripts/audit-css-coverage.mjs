import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');

// Pages to audit
const auditPages = [
  { path: 'en/poland/index.html', source: 'Node' },
  { path: 'en/brazil/index.html', source: 'Node' },
  { path: 'en/germany/index.html', source: 'Node' },
  { path: 'en/poland/pesel-validator/index.html', source: 'Java' },
  { path: 'en/tools/base64-decoder/index.html', source: 'Java' },
  { path: 'en/identifiers/pesel/index.html', source: 'Node' }
];

// Classes to ignore (third-party highlighting, dynamic states, etc.)
const ignoreClasses = new Set([
  'token', 'keyword', 'string', 'comment', 'number', 'function', 'operator',
  'class-name', 'boolean', 'property', 'regex', 'important', 'variable',
  'bold', 'italic', 'namespace', 'tag', 'attr-name', 'attr-value', 'punctuation',
  'language-javascript', 'language-python', 'language-java', 'language-go',
  'language-rust', 'language-json', 'language-html', 'language-css', 'active', 'open'
]);

function categorizeClass(className) {
  const name = className.toLowerCase();
  if (name.includes('layout') || name.includes('shell') || name.includes('stack') || name.includes('grid') || name.includes('container') || name.includes('wrapper') || name.includes('header') || name.includes('footer') || name.includes('nav') || name.includes('main') || name.includes('sidebar') || name.includes('preview-panel')) {
    return 'layout';
  }
  if (name.includes('card')) return 'card';
  if (name.includes('form') || name.includes('field') || name.includes('input') || name.includes('select') || name.includes('label') || name.includes('option') || name.includes('checkbox') || name.includes('textarea') || name.includes('fieldset') || name.includes('legend') || name.includes('preset') || name.includes('history')) {
    return 'form';
  }
  if (name.includes('button') || name.includes('btn') || name.includes('action')) {
    return 'button';
  }
  if (name.includes('breadcrumb')) return 'breadcrumb';
  if (name.includes('table') || name.includes('thead') || name.includes('tbody') || name.includes('tr') || name.includes('th') || name.includes('td')) {
    return 'table';
  }
  if (name.includes('visual') || name.includes('map') || name.includes('marker') || name.includes('flag') || name.includes('accent') || name.includes('outline') || name.includes('canvas') || name.includes('shape') || name.includes('shadow')) {
    return 'visual';
  }
  if (name.includes('align') || name.includes('flex') || name.includes('gap') || name.includes('margin') || name.includes('padding') || name.startsWith('mb-') || name.startsWith('mt-') || name.startsWith('mr-') || name.startsWith('ml-') || name.startsWith('flex-') || name.startsWith('sr-') || name.includes('visually-') || name.startsWith('text-') || name.startsWith('bg-') || name.startsWith('color-') || name.includes('brand-') || name.startsWith('vh-mt-') || name.startsWith('vh-mb-') || name.startsWith('vh-pt-') || name.startsWith('vh-pb-')) {
    return 'utility';
  }
  if (name.includes('workbench') || name.includes('feedback') || name.includes('badge') || name.includes('status')) {
    return 'workbench';
  }
  return 'utility';
}

async function findBundleCss() {
  const cssDir = resolve(siteRoot, 'assets', 'css');
  const files = await readdir(cssDir);
  const bundleFile = files.find(f => f.startsWith('bundle.') && f.endsWith('.css'));
  if (!bundleFile) {
    throw new Error('FATAL: Compiled CSS bundle not found in generated outputs');
  }
  return resolve(cssDir, bundleFile);
}

async function runAudit() {
  console.log('=== STARTING CSS COVERAGE AUDIT ===');
  
  const cssPath = await findBundleCss();
  console.log(`Auditing CSS Bundle: ${cssPath.replace(projectRoot, '')}`);
  const cssContent = await readFile(cssPath, 'utf8');

  // Map of className -> { pages: Set, source: Set, category: string, covered: boolean }
  const classMap = new Map();

  for (const page of auditPages) {
    const pagePath = resolve(siteRoot, page.path);
    let htmlContent;
    try {
      htmlContent = await readFile(pagePath, 'utf8');
    } catch (err) {
      console.warn(`Warning: Could not read audited page ${page.path}`);
      continue;
    }

    const classRegex = /class=["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(htmlContent)) !== null) {
      const classList = match[1].split(/\s+/).filter(Boolean);
      for (const className of classList) {
        if (ignoreClasses.has(className) || className.startsWith('language-') || className.startsWith('prism-')) {
          continue;
        }

        if (!classMap.has(className)) {
          classMap.set(className, {
            pages: new Set(),
            source: new Set(),
            category: categorizeClass(className),
            covered: false
          });
        }

        const data = classMap.get(className);
        data.pages.add(page.path);
        data.source.add(page.source);
      }
    }
  }

  let missingCount = 0;
  const auditLines = [];

  // Check CSS coverage for each class
  for (const [className, data] of classMap.entries()) {
    // Regex matching class selector in CSS e.g. .className, .parent .className
    const regex = new RegExp(`\\.${className}(?![a-zA-Z0-9_-])`);
    const covered = regex.test(cssContent);
    data.covered = covered;

    if (!covered) {
      missingCount++;
    }

    const pagesList = Array.from(data.pages).map(p => p.split('/').pop()).join(', ');
    const sourceList = Array.from(data.source).join(' & ');
    auditLines.push({
      className,
      pages: pagesList,
      source: sourceList,
      category: data.category,
      covered: covered ? '✅ Covered' : '❌ MISSING'
    });
  }

  // Sort report lines: missing first, then alphabetical by class name
  auditLines.sort((a, b) => {
    if (a.covered.includes('MISSING') && !b.covered.includes('MISSING')) return -1;
    if (!a.covered.includes('MISSING') && b.covered.includes('MISSING')) return 1;
    return a.className.localeCompare(b.className);
  });

  // Build markdown report
  let reportMd = `# ValidoHub CSS Coverage Audit Report\n\n`;
  reportMd += `* **Total Audited Classes:** ${classMap.size}\n`;
  reportMd += `* **Covered Classes:** ${classMap.size - missingCount}\n`;
  reportMd += `* **Missing Selectors:** ${missingCount}\n\n`;
  reportMd += `| Class Name | Source Generator | Pages Using It | Category | CSS Coverage |\n`;
  reportMd += `| :--- | :--- | :--- | :--- | :--- |\n`;

  for (const line of auditLines) {
    reportMd += `| \`${line.className}\` | ${line.source} | ${line.pages} | ${line.category} | ${line.covered} |\n`;
  }

  const reportPath = resolve(projectRoot, 'docs', 'reports', 'css-audit.md');
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, reportMd, 'utf8');
  console.log(`✓ Coverage report written to docs/reports/css-audit.md`);

  // Report summary to stdout
  console.log(`--------------------------------------------------`);
  console.log(`CSS COVERAGE AUDIT SUMMARY:`);
  console.log(`  Total unique classes: ${classMap.size}`);
  console.log(`  Covered classes:      ${classMap.size - missingCount}`);
  console.log(`  Missing classes:      ${missingCount}`);
  console.log(`--------------------------------------------------`);

  if (missingCount > 0) {
    console.error('FATAL: The following visible component classes have no CSS coverage:');
    for (const line of auditLines) {
      if (line.covered.includes('MISSING')) {
        console.error(`  - \`${line.className}\` (Source: ${line.source}, Pages: ${line.pages}, Category: ${line.category})`);
      }
    }
    process.exit(1);
  } else {
    console.log('🎉 SUCCESS: All audited CSS classes are fully covered in the stylesheet bundle!');
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
