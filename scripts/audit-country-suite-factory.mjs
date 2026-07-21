import fs from 'node:fs';

const requiredFiles = [
  'assets/js/tools/country-suite-factory.js',
  'docs/product/COUNTRY_SUITE_FACTORY_SPEC.md',
  'assets/js/tools/country-legacy-rich-layer.js',
  'scripts/generate-europe-premium-batch.mjs'
];

const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`missing required factory file: ${file}`);
}

if (fs.existsSync('assets/js/tools/country-legacy-rich-layer.js')) {
  const legacy = fs.readFileSync('assets/js/tools/country-legacy-rich-layer.js', 'utf8');
  const requiredLegacyTokens = [
    'Premium debug layer',
    'Batch diagnostics',
    'Recent validations',
    'API preview',
    'Raw JSON',
    'validohub.brazil-suite',
    'validohub.poland-suite',
    'validohub.france-suite',
    'validohub.netherlands-suite'
  ];
  for (const token of requiredLegacyTokens) {
    if (!legacy.includes(token)) failures.push(`legacy rich layer is missing token: ${token}`);
  }
}

if (fs.existsSync('assets/js/tools/country-suite-factory.js')) {
  const factory = fs.readFileSync('assets/js/tools/country-suite-factory.js', 'utf8');
  const generator = fs.existsSync('scripts/generate-europe-premium-batch.mjs')
    ? fs.readFileSync('scripts/generate-europe-premium-batch.mjs', 'utf8')
    : '';
  const requiredTokens = [
    'ValidoHubCountrySuiteFactory',
    'validateSuiteConfig',
    'createSuite',
    'csf-hero',
    'csf-context',
    'renderToolContext',
    'toolContextProfile',
    'What this tool is for',
    'Checks locally',
    'csf-result-card',
    'csf-breakdown',
    'csf-quality',
    'csf-advanced',
    'csf-presets-grid',
    'csf-batch',
    'csf-rich-lab',
    'csf-rich-tab',
    'csf-rich-history',
    'csf-rich-batch-run',
    'csf-sample-button',
    'normalizeSamples',
    'relatedTools',
    'buildIbanGeneratorResult',
    'generateIban',
    'freshIbanGeneratorInput',
    'intentionalReviewFixture',
    'isReviewSampleLabel',
    'withToolSpecificContext',
    'forceIntentionalReview',
    'sampleIntent',
    'data-csf-sample-intent',
    'shouldFreshGenerate',
    'copyText',
    'showCopyToast',
    'csf-copy-toast',
    'data-csf-repair-action',
    'Premium debug layer',
    'toolIntelligence',
    'apiPreview',
    'rawJson',
    'relatedLocalTools',
    'csf-debug-table',
    'csf-api-tabs',
    'calculationDebugger',
    'developerApiPreview',
    'rawJsonOutput',
    'COUNTRY_INTELLIGENCE_PROFILES',
    'enhanceAnalyzerResult',
    'buildProfileResult',
    'spanishIdLetter',
    'germanIso7064Mod11_10',
    'italianCodiceFiscaleCheck',
    'ean13CheckDigit',
    'csf-promoted-shell',
    "closest('.workbench-card')",
    'font-size: clamp(1.32rem, 1.75vw, 1.68rem)',
    'min-height: 8.25rem',
    '.csf-button:hover',
    '.csf-sample-button:hover',
    ':focus-visible',
    'csf-strip-panel'
  ];
  for (const token of requiredTokens) {
    if (!factory.includes(token)) failures.push(`factory is missing token: ${token}`);
  }
  const requiredProfileSlugs = [
    'switzerland',
    'spain',
    'germany',
    'italy',
    'austria',
    'belgium',
    'czechia',
    'denmark',
    'finland',
    'ireland',
    'norway',
    'portugal',
    'romania',
    'sweden'
  ];
  for (const slug of requiredProfileSlugs) {
    if (!factory.includes(`${slug}: {`)) failures.push(`factory intelligence profile missing: ${slug}`);
  }
  for (const forbidden of ['identifier evidence', 'tax evidence', 'payment evidence', 'workflow']) {
    if (!factory.includes(forbidden)) failures.push(`factory weak-analyzer guard missing forbidden text token: ${forbidden}`);
  }
  if (factory.includes('data-csf-related')) {
    failures.push('factory must not render inert related-tool select menus');
  }
  if (factory.includes('if (index === 0 || /valid/i.test')) {
    failures.push('factory must not classify Invalid sample as Valid sample via /valid/i');
  }
  if (!factory.includes("activeSampleIntent !== 'review'")) {
    failures.push('factory IBAN generator must not fresh-generate over an active invalid/review sample');
  }
  if (!factory.includes('intentionalReviewFixture(value) ?')) {
    failures.push('factory batch diagnostics must preserve invalid/review fixture semantics');
  }
  if (!/\.csf-segment strong\s*\{[\s\S]*color: var\(--csf-ink\)/.test(factory)) {
    failures.push('factory breakdown segment values must keep dark readable text');
  }
  if (!factory.includes("officialLookupBoundary: 'Official boundary'")) {
    failures.push('factory quality cards must use localization-safe official boundary labels');
  }
  if (generator.includes('Official lookup boundary')) {
    failures.push('generator must not emit long Official lookup boundary card titles');
  }
  if ((factory.match(/class="csf-rich-badge"/g) || []).length > 1) {
    failures.push('factory rich layer must not duplicate the right-side local badge');
  }
  if (!factory.includes('background: var(--csf-success)')) {
    failures.push('factory primary action must use success color, not country red accents');
  }
  if (!factory.includes('Grouped valid sample') || !factory.includes('Invalid sample')) {
    failures.push('factory sample UX must expose clear valid/invalid examples');
  }
  if (!factory.includes('positionCopyToast') || !factory.includes('--csf-toast-left') || !factory.includes('--csf-toast-top')) {
    failures.push('factory copy toast must anchor above the clicked copy button and remain visually prominent');
  }
  if (!factory.includes('resultPassed || check.pass')) {
    failures.push('factory success pipelines must render passed checks green end to end');
  }
  if (!factory.includes('renderHero(suite, tool)}${renderToolContext(suite, tool)}${renderRichLayer(suite, tool)}')) {
    failures.push('factory must render the tool context block immediately after hero and before advanced tools');
  }
}

const existingSuites = [
  'assets/js/tools/brazil-suite.js',
  'assets/js/tools/poland-suite.js',
  'assets/js/tools/poland-expansion.js',
  'assets/js/tools/poland-baseline.js',
  'assets/js/tools/france-suite.js',
  'assets/js/tools/netherlands-suite.js'
];

for (const file of existingSuites) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('ValidoHubCountrySuiteFactory') || text.includes('country-suite-factory')) {
    failures.push(`${file} must not import or call the additive Country Suite Factory without an explicit migration task`);
  }
  if (text.includes('Samples and related tools')) {
    failures.push(`${file} must not render ambiguous Samples and related tools menus`);
  }
}

if (fs.existsSync('scripts/build-all.mjs')) {
  const build = fs.readFileSync('scripts/build-all.mjs', 'utf8');
  for (const token of ['FACTORY_TOOL_ALGORITHMS', 'collapseFactoryWorkbenchShell', 'csf-static-host']) {
    if (!build.includes(token)) failures.push(`build pipeline missing factory shell guard token: ${token}`);
  }
  if (!build.includes("'validohub.iban-generator': 'generic-suite.js'")) {
    failures.push('build pipeline missing generic IBAN generator runtime mapping');
  }
  const ibanGeneratorMappings = build.match(/'validohub\.iban-generator': 'generic-suite\.js'/g) || [];
  if (ibanGeneratorMappings.length < 2) {
    failures.push('build pipeline must map IBAN generator in both post-process and integrity script tables');
  }
  const requiredLegacyMappings = [
    "'validohub.brazil-suite': ['country-legacy-rich-layer.js', 'brazil-suite.js']",
    "'validohub.poland-suite': ['country-legacy-rich-layer.js', 'poland-suite.js']",
    "'validohub.france-suite': ['country-legacy-rich-layer.js', 'france-suite.js']",
    "'validohub.netherlands-suite': ['country-legacy-rich-layer.js', 'netherlands-suite.js']"
  ];
  for (const token of requiredLegacyMappings) {
    if (!build.includes(token)) failures.push(`build pipeline missing legacy rich layer mapping: ${token}`);
  }
  const forbiddenMappings = [
    "'validohub.brazil-suite': 'country-suite-factory.js'",
    "'validohub.poland-suite': 'country-suite-factory.js'",
    "'validohub.france-suite': 'country-suite-factory.js'",
    "'validohub.netherlands-suite': 'country-suite-factory.js'"
  ];
  for (const token of forbiddenMappings) {
    if (build.includes(token)) failures.push(`existing country suite must not be remapped to factory: ${token}`);
  }
}

for (const slug of ['portugal', 'austria', 'belgium', 'ireland', 'czechia', 'sweden', 'norway', 'denmark', 'finland', 'romania']) {
  const file = `countries/data/${slug}.json`;
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('Europe local time zone')) {
    failures.push(`${file} must use a real IANA timezone for the hero clock`);
  }
}

if (fs.existsSync('docs/product/COUNTRY_SUITE_FACTORY_SPEC.md')) {
  const spec = fs.readFileSync('docs/product/COUNTRY_SUITE_FACTORY_SPEC.md', 'utf8');
  for (const token of ['Additive-only', 'Do Not Migrate Existing Countries', 'Brazil-scale compact shell', 'Required Tool Config']) {
    if (!spec.includes(token)) failures.push(`factory spec missing section/token: ${token}`);
  }
}

const factoryGeneratedSuites = [
  { slug: 'switzerland', runtime: 'switzerland-suite.js', label: 'Swiss' },
  { slug: 'spain', runtime: 'spain-suite.js', label: 'Spanish' },
  { slug: 'germany', runtime: 'germany-suite.js', label: 'German' },
  { slug: 'italy', runtime: 'italy-suite.js', label: 'Italian' },
  { slug: 'romania', runtime: 'romania-suite.js', label: 'Romanian' },
  { slug: 'finland', runtime: 'finland-suite.js', label: 'Finnish' },
  { slug: 'denmark', runtime: 'denmark-suite.js', label: 'Danish' },
  { slug: 'norway', runtime: 'norway-suite.js', label: 'Norwegian' },
  { slug: 'sweden', runtime: 'sweden-suite.js', label: 'Swedish' },
  { slug: 'czechia', runtime: 'czechia-suite.js', label: 'Czech' },
  { slug: 'ireland', runtime: 'ireland-suite.js', label: 'Irish' },
  { slug: 'belgium', runtime: 'belgium-suite.js', label: 'Belgian' },
  { slug: 'austria', runtime: 'austria-suite.js', label: 'Austrian' },
  { slug: 'portugal', runtime: 'portugal-suite.js', label: 'Portuguese' }
];

for (const suite of factoryGeneratedSuites) {
  const runtimeFile = 'assets/js/tools/' + suite.runtime;
  if (fs.existsSync(runtimeFile)) {
    const runtimeText = fs.readFileSync(runtimeFile, 'utf8');
    if (runtimeText.includes('Review sample')) {
      failures.push(suite.runtime + ': factory runtimes must expose clear Invalid sample / Short sample examples, not Review sample');
    }
    const batchGenerated = ['romania', 'finland', 'denmark', 'norway', 'sweden', 'czechia', 'ireland', 'belgium', 'austria', 'portugal'].includes(suite.slug);
    if (batchGenerated) {
      for (const token of ['Invalid sample', 'Short sample', 'Edge sample', 'isIntentionalInvalid']) {
        if (!runtimeText.includes(token)) failures.push(`${suite.runtime}: generated runtime missing premium sample/analyzer token: ${token}`);
      }
    }
  }
  const generatedDir = 'generated/validohub/en/' + suite.slug;
  const generatedHub = generatedDir + '/index.html';
  if (fs.existsSync(generatedHub)) {
    const hubHtml = fs.readFileSync(generatedHub, 'utf8');
    if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<h3>\s*<\/h3>/.test(hubHtml)) {
      failures.push(suite.label + ' hub must not render empty country info-card titles');
    }
    if (/class="[^"]*vh-country-info-card[^"]*"[\s\S]*?<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(hubHtml)) {
      failures.push(suite.label + ' hub must not render empty country info-card summaries');
    }
  }
  if (fs.existsSync(generatedDir)) {
    const entries = fs.readdirSync(generatedDir)
      .filter((entry) => entry.startsWith(suite.slug + '-'))
      .filter((entry) => fs.existsSync(generatedDir + '/' + entry + '/index.html'));
    for (const entry of entries) {
      const html = fs.readFileSync(generatedDir + '/' + entry + '/index.html', 'utf8');
      const factoryIndex = html.search(/<script src="\/assets\/js\/tools\/country-suite-factory\.js(?:\?[^"]*)?"><\/script>/);
      const runtimeEsc = suite.runtime.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const suitePattern = new RegExp('<script src="/assets/js/tools/' + runtimeEsc + '(?:\\?[^"]*)?"></script>');
      const suiteIndex = html.search(suitePattern);
      if (factoryIndex === -1) failures.push(entry + ': missing country-suite-factory.js in generated factory page');
      if (suiteIndex === -1) failures.push(entry + ': missing ' + suite.runtime + ' in generated factory page');
      if (factoryIndex !== -1 && suiteIndex !== -1 && factoryIndex > suiteIndex) {
        failures.push(entry + ': ' + suite.runtime + ' loads before country-suite-factory.js');
      }
      if (html.includes('class="workbench-heading"') || html.includes('>Run the tool<')) {
        failures.push(entry + ': generated factory page must not ship the generic Run the tool shell');
      }
    }
  }
}

if (failures.length) {
  console.error('Country Suite Factory audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Country Suite Factory audit passed.');
