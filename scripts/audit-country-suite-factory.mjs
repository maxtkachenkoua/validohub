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
    'rawJson',
    'relatedLocalTools',
    'csf-debug-table',
    'calculationDebugger',
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
  if (!factory.includes('renderHero(suite, tool)}${renderInput(suite, tool)}<div data-csf-output></div>${renderToolContext(suite, tool)}${renderRichLayer(suite, tool)}')) {
    failures.push('factory must render styled samples/input immediately after hero, then context before advanced tools');
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
  if (!build.includes('...TOOL_SCRIPT_BY_ALGORITHM')) {
    failures.push('build pipeline integrity script table must inherit TOOL_SCRIPT_BY_ALGORITHM instead of drifting into a second manual suite mapping');
  }
  const requiredLegacyMappings = [
    { algorithm: 'validohub.brazil-suite', runtime: 'brazil-suite.js' },
    { algorithm: 'validohub.poland-suite', runtime: 'poland-suite.js' },
    { algorithm: 'validohub.france-suite', runtime: 'france-suite.js' },
    { algorithm: 'validohub.netherlands-suite', runtime: 'netherlands-suite.js' }
  ];
  for (const mapping of requiredLegacyMappings) {
    const pattern = new RegExp(`'${mapping.algorithm}'\\s*:\\s*\\[[^\\]]*'country-legacy-rich-layer\\.js'[^\\]]*'${mapping.runtime.replace('.', '\\.')}'`);
    if (!pattern.test(build)) {
      failures.push(`build pipeline missing legacy rich layer mapping: ${mapping.algorithm} -> country-legacy-rich-layer.js before ${mapping.runtime}`);
    }
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
  { slug: 'vanuatu', runtime: 'vanuatu-suite.js', label: 'Vanuatuan' },
  { slug: 'tuvalu', runtime: 'tuvalu-suite.js', label: 'Tuvaluan' },
  { slug: 'tonga', runtime: 'tonga-suite.js', label: 'Tongan' },
  { slug: 'solomon-islands', runtime: 'solomon-islands-suite.js', label: 'Solomon Islands' },
  { slug: 'samoa', runtime: 'samoa-suite.js', label: 'Samoan' },
  { slug: 'papua-new-guinea', runtime: 'papua-new-guinea-suite.js', label: 'Papua New Guinean' },
  { slug: 'palau', runtime: 'palau-suite.js', label: 'Palauan' },
  { slug: 'new-zealand', runtime: 'new-zealand-suite.js', label: 'New Zealand' },
  { slug: 'nauru', runtime: 'nauru-suite.js', label: 'Nauruan' },
  { slug: 'micronesia', runtime: 'micronesia-suite.js', label: 'Micronesian' },
  { slug: 'marshall-islands', runtime: 'marshall-islands-suite.js', label: 'Marshallese' },
  { slug: 'kiribati', runtime: 'kiribati-suite.js', label: 'I-Kiribati' },
  { slug: 'fiji', runtime: 'fiji-suite.js', label: 'Fijian' },
  { slug: 'australia', runtime: 'australia-suite.js', label: 'Australian' },
  { slug: 'zimbabwe', runtime: 'zimbabwe-suite.js', label: 'Zimbabwean' },
  { slug: 'zambia', runtime: 'zambia-suite.js', label: 'Zambian' },
  { slug: 'uganda', runtime: 'uganda-suite.js', label: 'Ugandan' },
  { slug: 'tunisia', runtime: 'tunisia-suite.js', label: 'Tunisian' },
  { slug: 'togo', runtime: 'togo-suite.js', label: 'Togolese' },
  { slug: 'tanzania', runtime: 'tanzania-suite.js', label: 'Tanzanian' },
  { slug: 'sudan', runtime: 'sudan-suite.js', label: 'Sudanese' },
  { slug: 'south-sudan', runtime: 'south-sudan-suite.js', label: 'South Sudanese' },
  { slug: 'south-africa', runtime: 'south-africa-suite.js', label: 'South African' },
  { slug: 'somalia', runtime: 'somalia-suite.js', label: 'Somali' },
  { slug: 'sierra-leone', runtime: 'sierra-leone-suite.js', label: 'Sierra Leonean' },
  { slug: 'seychelles', runtime: 'seychelles-suite.js', label: 'Seychellois' },
  { slug: 'senegal', runtime: 'senegal-suite.js', label: 'Senegalese' },
  { slug: 'sao-tome-and-principe', runtime: 'sao-tome-and-principe-suite.js', label: 'Sao Tomean' },
  { slug: 'rwanda', runtime: 'rwanda-suite.js', label: 'Rwandan' },
  { slug: 'nigeria', runtime: 'nigeria-suite.js', label: 'Nigerian' },
  { slug: 'niger', runtime: 'niger-suite.js', label: 'Nigerien' },
  { slug: 'namibia', runtime: 'namibia-suite.js', label: 'Namibian' },
  { slug: 'mozambique', runtime: 'mozambique-suite.js', label: 'Mozambican' },
  { slug: 'morocco', runtime: 'morocco-suite.js', label: 'Moroccan' },
  { slug: 'mauritius', runtime: 'mauritius-suite.js', label: 'Mauritian' },
  { slug: 'mauritania', runtime: 'mauritania-suite.js', label: 'Mauritanian' },
  { slug: 'mali', runtime: 'mali-suite.js', label: 'Malian' },
  { slug: 'malawi', runtime: 'malawi-suite.js', label: 'Malawian' },
  { slug: 'madagascar', runtime: 'madagascar-suite.js', label: 'Malagasy' },
  { slug: 'libya', runtime: 'libya-suite.js', label: 'Libyan' },
  { slug: 'liberia', runtime: 'liberia-suite.js', label: 'Liberian' },
  { slug: 'lesotho', runtime: 'lesotho-suite.js', label: 'Basotho' },
  { slug: 'kenya', runtime: 'kenya-suite.js', label: 'Kenyan' },
  { slug: 'guinea-bissau', runtime: 'guinea-bissau-suite.js', label: 'Bissau-Guinean' },
  { slug: 'guinea', runtime: 'guinea-suite.js', label: 'Guinean' },
  { slug: 'ghana', runtime: 'ghana-suite.js', label: 'Ghanaian' },
  { slug: 'gambia', runtime: 'gambia-suite.js', label: 'Gambian' },
  { slug: 'gabon', runtime: 'gabon-suite.js', label: 'Gabonese' },
  { slug: 'ethiopia', runtime: 'ethiopia-suite.js', label: 'Ethiopian' },
  { slug: 'eswatini', runtime: 'eswatini-suite.js', label: 'Swazi' },
  { slug: 'eritrea', runtime: 'eritrea-suite.js', label: 'Eritrean' },
  { slug: 'equatorial-guinea', runtime: 'equatorial-guinea-suite.js', label: 'Equatoguinean' },
  { slug: 'egypt', runtime: 'egypt-suite.js', label: 'Egyptian' },
  { slug: 'djibouti', runtime: 'djibouti-suite.js', label: 'Djiboutian' },
  { slug: 'democratic-republic-of-the-congo', runtime: 'democratic-republic-of-the-congo-suite.js', label: 'Congolese' },
  { slug: 'cote-d-ivoire', runtime: 'cote-d-ivoire-suite.js', label: 'Ivorian' },
  { slug: 'congo', runtime: 'congo-suite.js', label: 'Congolese' },
  { slug: 'comoros', runtime: 'comoros-suite.js', label: 'Comorian' },
  { slug: 'chad', runtime: 'chad-suite.js', label: 'Chadian' },
  { slug: 'central-african-republic', runtime: 'central-african-republic-suite.js', label: 'Central African' },
  { slug: 'cameroon', runtime: 'cameroon-suite.js', label: 'Cameroonian' },
  { slug: 'cabo-verde', runtime: 'cabo-verde-suite.js', label: 'Cabo Verdean' },
  { slug: 'burundi', runtime: 'burundi-suite.js', label: 'Burundian' },
  { slug: 'burkina-faso', runtime: 'burkina-faso-suite.js', label: 'Burkinabe' },
  { slug: 'botswana', runtime: 'botswana-suite.js', label: 'Botswana' },
  { slug: 'benin', runtime: 'benin-suite.js', label: 'Beninese' },
  { slug: 'angola', runtime: 'angola-suite.js', label: 'Angolan' },
  { slug: 'algeria', runtime: 'algeria-suite.js', label: 'Algerian' },
  { slug: 'yemen', runtime: 'yemen-suite.js', label: 'Yemeni' },
  { slug: 'turkey', runtime: 'turkey-suite.js', label: 'Turkish' },
  { slug: 'timor-leste', runtime: 'timor-leste-suite.js', label: 'Timorese' },
  { slug: 'taiwan', runtime: 'taiwan-suite.js', label: 'Taiwanese' },
  { slug: 'syria', runtime: 'syria-suite.js', label: 'Syrian' },
  { slug: 'palestine', runtime: 'palestine-suite.js', label: 'Palestinian' },
  { slug: 'north-korea', runtime: 'north-korea-suite.js', label: 'North Korean' },
  { slug: 'maldives', runtime: 'maldives-suite.js', label: 'Maldivian' },
  { slug: 'lebanon', runtime: 'lebanon-suite.js', label: 'Lebanese' },
  { slug: 'kazakhstan', runtime: 'kazakhstan-suite.js', label: 'Kazakh' },
  { slug: 'iraq', runtime: 'iraq-suite.js', label: 'Iraqi' },
  { slug: 'iran', runtime: 'iran-suite.js', label: 'Iranian' },
  { slug: 'georgia', runtime: 'georgia-suite.js', label: 'Georgian' },
  { slug: 'brunei', runtime: 'brunei-suite.js', label: 'Bruneian' },
  { slug: 'bhutan', runtime: 'bhutan-suite.js', label: 'Bhutanese' },
  { slug: 'azerbaijan', runtime: 'azerbaijan-suite.js', label: 'Azerbaijani' },
  { slug: 'armenia', runtime: 'armenia-suite.js', label: 'Armenian' },
  { slug: 'afghanistan', runtime: 'afghanistan-suite.js', label: 'Afghan' },
  { slug: 'jordan', runtime: 'jordan-suite.js', label: 'Jordanian' },
  { slug: 'oman', runtime: 'oman-suite.js', label: 'Omani' },
  { slug: 'bahrain', runtime: 'bahrain-suite.js', label: 'Bahraini' },
  { slug: 'kuwait', runtime: 'kuwait-suite.js', label: 'Kuwaiti' },
  { slug: 'qatar', runtime: 'qatar-suite.js', label: 'Qatari' },
  { slug: 'turkmenistan', runtime: 'turkmenistan-suite.js', label: 'Turkmen' },
  { slug: 'tajikistan', runtime: 'tajikistan-suite.js', label: 'Tajik' },
  { slug: 'kyrgyzstan', runtime: 'kyrgyzstan-suite.js', label: 'Kyrgyz' },
  { slug: 'uzbekistan', runtime: 'uzbekistan-suite.js', label: 'Uzbek' },
  { slug: 'mongolia', runtime: 'mongolia-suite.js', label: 'Mongolian' },
  { slug: 'laos', runtime: 'laos-suite.js', label: 'Lao' },
  { slug: 'cambodia', runtime: 'cambodia-suite.js', label: 'Cambodian' },
  { slug: 'myanmar', runtime: 'myanmar-suite.js', label: 'Myanmar' },
  { slug: 'sri-lanka', runtime: 'sri-lanka-suite.js', label: 'Sri Lankan' },
  { slug: 'nepal', runtime: 'nepal-suite.js', label: 'Nepali' },
  { slug: 'israel', runtime: 'israel-suite.js', label: 'Israeli' },
  { slug: 'saudi-arabia', runtime: 'saudi-arabia-suite.js', label: 'Saudi' },
  { slug: 'bangladesh', runtime: 'bangladesh-suite.js', label: 'Bangladeshi' },
  { slug: 'pakistan', runtime: 'pakistan-suite.js', label: 'Pakistani' },
  { slug: 'philippines', runtime: 'philippines-suite.js', label: 'Philippine' },
  { slug: 'vietnam', runtime: 'vietnam-suite.js', label: 'Vietnamese' },
  { slug: 'thailand', runtime: 'thailand-suite.js', label: 'Thai' },
  { slug: 'malaysia', runtime: 'malaysia-suite.js', label: 'Malaysian' },
  { slug: 'indonesia', runtime: 'indonesia-suite.js', label: 'Indonesian' },
  { slug: 'china', runtime: 'china-suite.js', label: 'Chinese' },
  { slug: 'united-arab-emirates', runtime: 'united-arab-emirates-suite.js', label: 'UAE' },
  { slug: 'south-korea', runtime: 'south-korea-suite.js', label: 'South Korean' },
  { slug: 'singapore', runtime: 'singapore-suite.js', label: 'Singapore' },
  { slug: 'india', runtime: 'india-suite.js', label: 'Indian' },
  { slug: 'japan', runtime: 'japan-suite.js', label: 'Japanese' },
  { slug: 'vatican-city', runtime: 'vatican-city-suite.js', label: 'Vatican' },
  { slug: 'united-kingdom', runtime: 'united-kingdom-suite.js', label: 'British' },
  { slug: 'ukraine', runtime: 'ukraine-suite.js', label: 'Ukrainian' },
  { slug: 'slovenia', runtime: 'slovenia-suite.js', label: 'Slovenian' },
  { slug: 'slovakia', runtime: 'slovakia-suite.js', label: 'Slovak' },
  { slug: 'serbia', runtime: 'serbia-suite.js', label: 'Serbian' },
  { slug: 'san-marino', runtime: 'san-marino-suite.js', label: 'Sammarinese' },
  { slug: 'north-macedonia', runtime: 'north-macedonia-suite.js', label: 'Macedonian' },
  { slug: 'montenegro', runtime: 'montenegro-suite.js', label: 'Montenegrin' },
  { slug: 'monaco', runtime: 'monaco-suite.js', label: 'Monegasque' },
  { slug: 'moldova', runtime: 'moldova-suite.js', label: 'Moldovan' },
  { slug: 'malta', runtime: 'malta-suite.js', label: 'Maltese' },
  { slug: 'luxembourg', runtime: 'luxembourg-suite.js', label: 'Luxembourgish' },
  { slug: 'lithuania', runtime: 'lithuania-suite.js', label: 'Lithuanian' },
  { slug: 'liechtenstein', runtime: 'liechtenstein-suite.js', label: 'Liechtenstein' },
  { slug: 'latvia', runtime: 'latvia-suite.js', label: 'Latvian' },
  { slug: 'iceland', runtime: 'iceland-suite.js', label: 'Icelandic' },
  { slug: 'hungary', runtime: 'hungary-suite.js', label: 'Hungarian' },
  { slug: 'greece', runtime: 'greece-suite.js', label: 'Greek' },
  { slug: 'estonia', runtime: 'estonia-suite.js', label: 'Estonian' },
  { slug: 'cyprus', runtime: 'cyprus-suite.js', label: 'Cypriot' },
  { slug: 'croatia', runtime: 'croatia-suite.js', label: 'Croatian' },
  { slug: 'bulgaria', runtime: 'bulgaria-suite.js', label: 'Bulgarian' },
  { slug: 'bosnia-and-herzegovina', runtime: 'bosnia-and-herzegovina-suite.js', label: 'Bosnian' },
  { slug: 'andorra', runtime: 'andorra-suite.js', label: 'Andorran' },
  { slug: 'albania', runtime: 'albania-suite.js', label: 'Albanian' },
  { slug: 'romania', runtime: 'romania-suite.js', label: 'Romanian' },
  { slug: 'finland', runtime: 'finland-suite.js', label: 'Finnish' },
  { slug: 'denmark', runtime: 'denmark-suite.js', label: 'Danish' },
  { slug: 'norway', runtime: 'norway-suite.js', label: 'Norwegian' },
  { slug: 'sweden', runtime: 'sweden-suite.js', label: 'Swedish' },
  { slug: 'czechia', runtime: 'czechia-suite.js', label: 'Czech' },
  { slug: 'ireland', runtime: 'ireland-suite.js', label: 'Irish' },
  { slug: 'belgium', runtime: 'belgium-suite.js', label: 'Belgian' },
  { slug: 'austria', runtime: 'austria-suite.js', label: 'Austrian' },
  { slug: 'portugal', runtime: 'portugal-suite.js', label: 'Portuguese' },
  { slug: 'venezuela', runtime: 'venezuela-suite.js', label: 'Venezuelan' },
  { slug: 'uruguay', runtime: 'uruguay-suite.js', label: 'Uruguayan' },
  { slug: 'suriname', runtime: 'suriname-suite.js', label: 'Surinamese' },
  { slug: 'peru', runtime: 'peru-suite.js', label: 'Peruvian' },
  { slug: 'paraguay', runtime: 'paraguay-suite.js', label: 'Paraguayan' },
  { slug: 'guyana', runtime: 'guyana-suite.js', label: 'Guyanese' },
  { slug: 'ecuador', runtime: 'ecuador-suite.js', label: 'Ecuadorian' },
  { slug: 'colombia', runtime: 'colombia-suite.js', label: 'Colombian' },
  { slug: 'chile', runtime: 'chile-suite.js', label: 'Chilean' },
  { slug: 'bolivia', runtime: 'bolivia-suite.js', label: 'Bolivian' },
  { slug: 'argentina', runtime: 'argentina-suite.js', label: 'Argentine' }
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
      if (suite.slug === 'spain' && entry === 'spain-id-validator') continue;
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
