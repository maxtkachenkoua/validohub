import { access, cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRouteRegistry } from './route-registry.mjs';
import { renderCountryPage } from './build-countries-portal.mjs';
import { refreshGeneratedAssetLinks, updateBundleAssetLinks } from './dev-asset-links.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const CORE_PRODUCTION_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

const COUNTRY_RUNTIME_BY_SLUG = {
  france: 'france-suite.js',
  netherlands: 'netherlands-suite.js',
  switzerland: 'switzerland-suite.js',
  germany: 'germany-suite.js',
  italy: 'italy-suite.js',
  spain: 'spain-suite.js',
  venezuela: 'venezuela-suite.js',
  uruguay: 'uruguay-suite.js',
  suriname: 'suriname-suite.js',
  peru: 'peru-suite.js',
  paraguay: 'paraguay-suite.js',
  guyana: 'guyana-suite.js',
  ecuador: 'ecuador-suite.js',
  colombia: 'colombia-suite.js',
  chile: 'chile-suite.js',
  bolivia: 'bolivia-suite.js',
  argentina: 'argentina-suite.js',
  brazil: 'brazil-suite.js',
  poland: 'poland-suite.js',
  "united-states": 'united-states-suite.js',
  canada: 'canada-suite.js',
  mexico: 'mexico-suite.js',
  belize: 'belize-suite.js',
  guatemala: 'guatemala-suite.js',
  'el-salvador': 'el-salvador-suite.js',
  honduras: 'honduras-suite.js',
  nicaragua: 'nicaragua-suite.js',
  'costa-rica': 'costa-rica-suite.js',
  panama: 'panama-suite.js',
  bahamas: 'bahamas-suite.js',
  cuba: 'cuba-suite.js',
  jamaica: 'jamaica-suite.js',
  haiti: 'haiti-suite.js',
  'dominican-republic': 'dominican-republic-suite.js',
  'antigua-and-barbuda': 'antigua-and-barbuda-suite.js',
  dominica: 'dominica-suite.js',
  'saint-kitts-and-nevis': 'saint-kitts-and-nevis-suite.js',
  'saint-lucia': 'saint-lucia-suite.js',
  'saint-vincent-and-the-grenadines': 'saint-vincent-and-the-grenadines-suite.js',
  grenada: 'grenada-suite.js',
  barbados: 'barbados-suite.js',
  'trinidad-and-tobago': 'trinidad-and-tobago-suite.js',
  japan: 'japan-suite.js',
  india: 'india-suite.js',
  singapore: 'singapore-suite.js',
  'south-korea': 'south-korea-suite.js',
  'united-arab-emirates': 'united-arab-emirates-suite.js',
  'vanuatu': 'vanuatu-suite.js',
  'tuvalu': 'tuvalu-suite.js',
  'tonga': 'tonga-suite.js',
  'solomon-islands': 'solomon-islands-suite.js',
  'samoa': 'samoa-suite.js',
  'papua-new-guinea': 'papua-new-guinea-suite.js',
  'palau': 'palau-suite.js',
  'new-zealand': 'new-zealand-suite.js',
  'nauru': 'nauru-suite.js',
  'micronesia': 'micronesia-suite.js',
  'marshall-islands': 'marshall-islands-suite.js',
  'kiribati': 'kiribati-suite.js',
  'fiji': 'fiji-suite.js',
  'australia': 'australia-suite.js',
  'zimbabwe': 'zimbabwe-suite.js',
  'zambia': 'zambia-suite.js',
  'uganda': 'uganda-suite.js',
  'tunisia': 'tunisia-suite.js',
  'togo': 'togo-suite.js',
  'tanzania': 'tanzania-suite.js',
  'sudan': 'sudan-suite.js',
  'south-sudan': 'south-sudan-suite.js',
  'south-africa': 'south-africa-suite.js',
  'somalia': 'somalia-suite.js',
  'sierra-leone': 'sierra-leone-suite.js',
  'seychelles': 'seychelles-suite.js',
  'senegal': 'senegal-suite.js',
  'sao-tome-and-principe': 'sao-tome-and-principe-suite.js',
  'rwanda': 'rwanda-suite.js',
  'nigeria': 'nigeria-suite.js',
  'niger': 'niger-suite.js',
  'namibia': 'namibia-suite.js',
  'mozambique': 'mozambique-suite.js',
  'morocco': 'morocco-suite.js',
  'mauritius': 'mauritius-suite.js',
  'mauritania': 'mauritania-suite.js',
  'mali': 'mali-suite.js',
  'malawi': 'malawi-suite.js',
  'madagascar': 'madagascar-suite.js',
  'libya': 'libya-suite.js',
  'liberia': 'liberia-suite.js',
  'lesotho': 'lesotho-suite.js',
  'kenya': 'kenya-suite.js',
  'guinea-bissau': 'guinea-bissau-suite.js',
  'guinea': 'guinea-suite.js',
  'ghana': 'ghana-suite.js',
  'gambia': 'gambia-suite.js',
  'gabon': 'gabon-suite.js',
  'ethiopia': 'ethiopia-suite.js',
  'eswatini': 'eswatini-suite.js',
  'eritrea': 'eritrea-suite.js',
  'equatorial-guinea': 'equatorial-guinea-suite.js',
  'egypt': 'egypt-suite.js',
  'djibouti': 'djibouti-suite.js',
  'democratic-republic-of-the-congo': 'democratic-republic-of-the-congo-suite.js',
  'cote-d-ivoire': 'cote-d-ivoire-suite.js',
  'congo': 'congo-suite.js',
  'comoros': 'comoros-suite.js',
  'chad': 'chad-suite.js',
  'central-african-republic': 'central-african-republic-suite.js',
  'cameroon': 'cameroon-suite.js',
  'cabo-verde': 'cabo-verde-suite.js',
  'burundi': 'burundi-suite.js',
  'burkina-faso': 'burkina-faso-suite.js',
  'botswana': 'botswana-suite.js',
  'benin': 'benin-suite.js',
  'angola': 'angola-suite.js',
  'algeria': 'algeria-suite.js',
  'yemen': 'yemen-suite.js',
  'turkey': 'turkey-suite.js',
  'timor-leste': 'timor-leste-suite.js',
  'taiwan': 'taiwan-suite.js',
  'syria': 'syria-suite.js',
  'palestine': 'palestine-suite.js',
  'north-korea': 'north-korea-suite.js',
  'maldives': 'maldives-suite.js',
  'lebanon': 'lebanon-suite.js',
  'kazakhstan': 'kazakhstan-suite.js',
  'iraq': 'iraq-suite.js',
  'iran': 'iran-suite.js',
  'georgia': 'georgia-suite.js',
  'brunei': 'brunei-suite.js',
  'bhutan': 'bhutan-suite.js',
  'azerbaijan': 'azerbaijan-suite.js',
  'armenia': 'armenia-suite.js',
  'afghanistan': 'afghanistan-suite.js',
  china: 'china-suite.js',
  indonesia: 'indonesia-suite.js',
  malaysia: 'malaysia-suite.js',
  thailand: 'thailand-suite.js',
  vietnam: 'vietnam-suite.js',
  philippines: 'philippines-suite.js',
  pakistan: 'pakistan-suite.js',
  bangladesh: 'bangladesh-suite.js',
  'saudi-arabia': 'saudi-arabia-suite.js',
  israel: 'israel-suite.js',
  nepal: 'nepal-suite.js',
  'sri-lanka': 'sri-lanka-suite.js',
  myanmar: 'myanmar-suite.js',
  cambodia: 'cambodia-suite.js',
  laos: 'laos-suite.js',
  mongolia: 'mongolia-suite.js',
  uzbekistan: 'uzbekistan-suite.js',
  kyrgyzstan: 'kyrgyzstan-suite.js',
  tajikistan: 'tajikistan-suite.js',
  turkmenistan: 'turkmenistan-suite.js',
  qatar: 'qatar-suite.js',
  kuwait: 'kuwait-suite.js',
  bahrain: 'bahrain-suite.js',
  oman: 'oman-suite.js',
  jordan: 'jordan-suite.js',
};

const LEGACY_RICH_LAYER = 'country-legacy-rich-layer.js';
const LEGACY_RICH_COUNTRIES = new Set(['brazil', 'poland', 'france', 'netherlands']);
const GOLD_LAB_RUNTIME = 'gold-tools-lab.js';
const GOLD_LAB_COUNTRIES = new Set([
  'argentina',
  'australia',
  'austria',
  'belgium',
  'brazil',
  'canada',
  'chile',
  'china',
  'colombia',
  'costa-rica',
  'croatia',
  'cyprus',
  'czechia',
  'denmark',
  'dominican-republic',
  'ecuador',
  'egypt',
  'estonia',
  'finland',
  'france',
  'germany',
  'ghana',
  'greece',
  'hungary',
  'iceland',
  'india',
  'indonesia',
  'ireland',
  'israel',
  'italy',
  'japan',
  'kenya',
  'latvia',
  'lithuania',
  'luxembourg',
  'malaysia',
  'malta',
  'mexico',
  'morocco',
  'netherlands',
  'new-zealand',
  'nigeria',
  'norway',
  'panama',
  'paraguay',
  'peru',
  'philippines',
  'poland',
  'portugal',
  'romania',
  'saudi-arabia',
  'singapore',
  'slovakia',
  'slovenia',
  'south-africa',
  'south-korea',
  'spain',
  'sweden',
  'switzerland',
  'thailand',
  'turkey',
  'united-arab-emirates',
  'united-kingdom',
  'united-states',
  'uruguay',
  'vietnam'
]);
const GOLD_LAB_ALGORITHMS = new Set([
  'validohub.pesel'
]);
const GOLD_STANDALONE_RUNTIMES_BY_COUNTRY = {
  brazil: ['pix.js'],
  poland: ['pesel.js'],
  spain: ['spain-id.js']
};
const STANDALONE_RUNTIME_BY_ALGORITHM = new Map([
  ['validohub.brazil-pix', ['pix.js']],
  ['validohub.spain-id', ['spain-id.js']]
]);
const GOLD_LAB_ROUTE_OVERRIDES = new Set([
  '/en/poland/poland-invoice-number-helper/index.html',
  '/en/poland/poland-mrz-passport-id-parser/index.html',
  '/en/poland/poland-passport-number-inspector/index.html',
  '/en/poland/poland-swift-bic-inspector/index.html',
  '/en/brazil/brazil-iban-validator/index.html'
]);

const COUNTRY_ALGORITHM_BY_SLUG = {
  albania: 'validohub.albania-suite',
  andorra: 'validohub.andorra-suite',
  'bosnia-and-herzegovina': 'validohub.bosnia-and-herzegovina-suite',
  brazil: 'validohub.brazil-suite',
  bulgaria: 'validohub.bulgaria-suite',
  croatia: 'validohub.croatia-suite',
  cyprus: 'validohub.cyprus-suite',
  czechia: 'validohub.czechia-suite',
  denmark: 'validohub.denmark-suite',
  estonia: 'validohub.estonia-suite',
  finland: 'validohub.finland-suite',
  france: 'validohub.france-suite',
  germany: 'validohub.germany-suite',
  greece: 'validohub.greece-suite',
  hungary: 'validohub.hungary-suite',
  iceland: 'validohub.iceland-suite',
  ireland: 'validohub.ireland-suite',
  italy: 'validohub.italy-suite',
  latvia: 'validohub.latvia-suite',
  liechtenstein: 'validohub.liechtenstein-suite',
  lithuania: 'validohub.lithuania-suite',
  luxembourg: 'validohub.luxembourg-suite',
  malta: 'validohub.malta-suite',
  moldova: 'validohub.moldova-suite',
  monaco: 'validohub.monaco-suite',
  montenegro: 'validohub.montenegro-suite',
  netherlands: 'validohub.netherlands-suite',
  'north-macedonia': 'validohub.north-macedonia-suite',
  norway: 'validohub.norway-suite',
  poland: 'validohub.poland-suite',
  portugal: 'validohub.portugal-suite',
  romania: 'validohub.romania-suite',
  'san-marino': 'validohub.san-marino-suite',
  serbia: 'validohub.serbia-suite',
  slovakia: 'validohub.slovakia-suite',
  slovenia: 'validohub.slovenia-suite',
  spain: 'validohub.spain-suite',
  sweden: 'validohub.sweden-suite',
  switzerland: 'validohub.switzerland-suite',
  ukraine: 'validohub.ukraine-suite',
  'united-kingdom': 'validohub.united-kingdom-suite',
  'vatican-city': 'validohub.vatican-city-suite',
  austria: 'validohub.austria-suite',
  belgium: 'validohub.belgium-suite',
  venezuela: 'validohub.venezuela-suite',
  uruguay: 'validohub.uruguay-suite',
  suriname: 'validohub.suriname-suite',
  peru: 'validohub.peru-suite',
  paraguay: 'validohub.paraguay-suite',
  guyana: 'validohub.guyana-suite',
  ecuador: 'validohub.ecuador-suite',
  colombia: 'validohub.colombia-suite',
  chile: 'validohub.chile-suite',
  bolivia: 'validohub.bolivia-suite',
  argentina: 'validohub.argentina-suite',
  "united-states": 'validohub.united-states-suite',
  canada: 'validohub.canada-suite',
  mexico: 'validohub.mexico-suite',
  belize: 'validohub.belize-suite',
  guatemala: 'validohub.guatemala-suite',
  'el-salvador': 'validohub.el-salvador-suite',
  honduras: 'validohub.honduras-suite',
  nicaragua: 'validohub.nicaragua-suite',
  'costa-rica': 'validohub.costa-rica-suite',
  panama: 'validohub.panama-suite',
  bahamas: 'validohub.bahamas-suite',
  cuba: 'validohub.cuba-suite',
  jamaica: 'validohub.jamaica-suite',
  haiti: 'validohub.haiti-suite',
  'dominican-republic': 'validohub.dominican-republic-suite',
  'antigua-and-barbuda': 'validohub.antigua-and-barbuda-suite',
  dominica: 'validohub.dominica-suite',
  'saint-kitts-and-nevis': 'validohub.saint-kitts-and-nevis-suite',
  'saint-lucia': 'validohub.saint-lucia-suite',
  'saint-vincent-and-the-grenadines': 'validohub.saint-vincent-and-the-grenadines-suite',
  grenada: 'validohub.grenada-suite',
  barbados: 'validohub.barbados-suite',
  'trinidad-and-tobago': 'validohub.trinidad-and-tobago-suite',
  japan: 'validohub.japan-suite',
  india: 'validohub.india-suite',
  singapore: 'validohub.singapore-suite',
  'south-korea': 'validohub.south-korea-suite',
  'united-arab-emirates': 'validohub.united-arab-emirates-suite',
  'vanuatu': 'validohub.vanuatu-suite',
  'tuvalu': 'validohub.tuvalu-suite',
  'tonga': 'validohub.tonga-suite',
  'solomon-islands': 'validohub.solomon-islands-suite',
  'samoa': 'validohub.samoa-suite',
  'papua-new-guinea': 'validohub.papua-new-guinea-suite',
  'palau': 'validohub.palau-suite',
  'new-zealand': 'validohub.new-zealand-suite',
  'nauru': 'validohub.nauru-suite',
  'micronesia': 'validohub.micronesia-suite',
  'marshall-islands': 'validohub.marshall-islands-suite',
  'kiribati': 'validohub.kiribati-suite',
  'fiji': 'validohub.fiji-suite',
  'australia': 'validohub.australia-suite',
  'zimbabwe': 'validohub.zimbabwe-suite',
  'zambia': 'validohub.zambia-suite',
  'uganda': 'validohub.uganda-suite',
  'tunisia': 'validohub.tunisia-suite',
  'togo': 'validohub.togo-suite',
  'tanzania': 'validohub.tanzania-suite',
  'sudan': 'validohub.sudan-suite',
  'south-sudan': 'validohub.south-sudan-suite',
  'south-africa': 'validohub.south-africa-suite',
  'somalia': 'validohub.somalia-suite',
  'sierra-leone': 'validohub.sierra-leone-suite',
  'seychelles': 'validohub.seychelles-suite',
  'senegal': 'validohub.senegal-suite',
  'sao-tome-and-principe': 'validohub.sao-tome-and-principe-suite',
  'rwanda': 'validohub.rwanda-suite',
  'nigeria': 'validohub.nigeria-suite',
  'niger': 'validohub.niger-suite',
  'namibia': 'validohub.namibia-suite',
  'mozambique': 'validohub.mozambique-suite',
  'morocco': 'validohub.morocco-suite',
  'mauritius': 'validohub.mauritius-suite',
  'mauritania': 'validohub.mauritania-suite',
  'mali': 'validohub.mali-suite',
  'malawi': 'validohub.malawi-suite',
  'madagascar': 'validohub.madagascar-suite',
  'libya': 'validohub.libya-suite',
  'liberia': 'validohub.liberia-suite',
  'lesotho': 'validohub.lesotho-suite',
  'kenya': 'validohub.kenya-suite',
  'guinea-bissau': 'validohub.guinea-bissau-suite',
  'guinea': 'validohub.guinea-suite',
  'ghana': 'validohub.ghana-suite',
  'gambia': 'validohub.gambia-suite',
  'gabon': 'validohub.gabon-suite',
  'ethiopia': 'validohub.ethiopia-suite',
  'eswatini': 'validohub.eswatini-suite',
  'eritrea': 'validohub.eritrea-suite',
  'equatorial-guinea': 'validohub.equatorial-guinea-suite',
  'egypt': 'validohub.egypt-suite',
  'djibouti': 'validohub.djibouti-suite',
  'democratic-republic-of-the-congo': 'validohub.democratic-republic-of-the-congo-suite',
  'cote-d-ivoire': 'validohub.cote-d-ivoire-suite',
  'congo': 'validohub.congo-suite',
  'comoros': 'validohub.comoros-suite',
  'chad': 'validohub.chad-suite',
  'central-african-republic': 'validohub.central-african-republic-suite',
  'cameroon': 'validohub.cameroon-suite',
  'cabo-verde': 'validohub.cabo-verde-suite',
  'burundi': 'validohub.burundi-suite',
  'burkina-faso': 'validohub.burkina-faso-suite',
  'botswana': 'validohub.botswana-suite',
  'benin': 'validohub.benin-suite',
  'angola': 'validohub.angola-suite',
  'algeria': 'validohub.algeria-suite',
  'yemen': 'validohub.yemen-suite',
  'turkey': 'validohub.turkey-suite',
  'timor-leste': 'validohub.timor-leste-suite',
  'taiwan': 'validohub.taiwan-suite',
  'syria': 'validohub.syria-suite',
  'palestine': 'validohub.palestine-suite',
  'north-korea': 'validohub.north-korea-suite',
  'maldives': 'validohub.maldives-suite',
  'lebanon': 'validohub.lebanon-suite',
  'kazakhstan': 'validohub.kazakhstan-suite',
  'iraq': 'validohub.iraq-suite',
  'iran': 'validohub.iran-suite',
  'georgia': 'validohub.georgia-suite',
  'brunei': 'validohub.brunei-suite',
  'bhutan': 'validohub.bhutan-suite',
  'azerbaijan': 'validohub.azerbaijan-suite',
  'armenia': 'validohub.armenia-suite',
  'afghanistan': 'validohub.afghanistan-suite',
  'jordan': 'validohub.jordan-suite',
  'oman': 'validohub.oman-suite',
  'bahrain': 'validohub.bahrain-suite',
  'kuwait': 'validohub.kuwait-suite',
  'qatar': 'validohub.qatar-suite',
  'turkmenistan': 'validohub.turkmenistan-suite',
  'tajikistan': 'validohub.tajikistan-suite',
  'kyrgyzstan': 'validohub.kyrgyzstan-suite',
  'uzbekistan': 'validohub.uzbekistan-suite',
  'mongolia': 'validohub.mongolia-suite',
  'laos': 'validohub.laos-suite',
  'cambodia': 'validohub.cambodia-suite',
  'myanmar': 'validohub.myanmar-suite',
  'sri-lanka': 'validohub.sri-lanka-suite',
  'nepal': 'validohub.nepal-suite',
  china: 'validohub.china-suite',
  indonesia: 'validohub.indonesia-suite',
  malaysia: 'validohub.malaysia-suite',
  thailand: 'validohub.thailand-suite',
  vietnam: 'validohub.vietnam-suite',
  philippines: 'validohub.philippines-suite',
  pakistan: 'validohub.pakistan-suite',
  bangladesh: 'validohub.bangladesh-suite',
  'saudi-arabia': 'validohub.saudi-arabia-suite',
  israel: 'validohub.israel-suite',
};

const FACTORY_COUNTRY_SLUGS = new Set([
  'albania',
  'andorra',
  'bosnia-and-herzegovina',
  'austria',
  'belgium',
  'bulgaria',
  'croatia',
  'cyprus',
  'czechia',
  'denmark',
  'estonia',
  'finland',
  'germany',
  'greece',
  'hungary',
  'iceland',
  'ireland',
  'italy',
  'latvia',
  'liechtenstein',
  'lithuania',
  'luxembourg',
  'malta',
  'moldova',
  'monaco',
  'montenegro',
  'north-macedonia',
  'norway',
  'portugal',
  'romania',
  'san-marino',
  'serbia',
  'slovakia',
  'slovenia',
  'spain',
  'sweden',
  'switzerland',
  'ukraine',
  'united-kingdom',
  'vatican-city',
  'argentina',
  'united-states',
  'canada',
  'mexico',
  'belize',
  'guatemala',
  'el-salvador',
  'honduras',
  'nicaragua',
  'costa-rica',
  'panama',
  'bahamas',
  'cuba',
  'jamaica',
  'haiti',
  'dominican-republic',
  'antigua-and-barbuda',
  'dominica',
  'saint-kitts-and-nevis',
  'saint-lucia',
  'saint-vincent-and-the-grenadines',
  'grenada',
  'barbados',
  'trinidad-and-tobago',
  'japan',
  'india',
  'singapore',
  'south-korea',
  'united-arab-emirates',
  'china',
  'indonesia',
  'malaysia',
  'thailand',
  'vietnam',
  'philippines',
  'pakistan',
  'bangladesh',
  'saudi-arabia',
  'israel',
  'nepal',
  'sri-lanka',
  'myanmar',
  'cambodia',
  'laos',
  'mongolia',
  'uzbekistan',
  'kyrgyzstan',
  'tajikistan',
  'turkmenistan',
  'qatar',
  'kuwait',
  'bahrain',
  'oman',
  'jordan',
  'afghanistan',
  'armenia',
  'azerbaijan',
  'bhutan',
  'brunei',
  'georgia',
  'iran',
  'iraq',
  'kazakhstan',
  'lebanon',
  'maldives',
  'north-korea',
  'palestine',
  'syria',
  'taiwan',
  'timor-leste',
  'turkey',
  'yemen',
  'algeria',
  'angola',
  'benin',
  'botswana',
  'burkina-faso',
  'burundi',
  'cabo-verde',
  'cameroon',
  'central-african-republic',
  'chad',
  'comoros',
  'congo',
  'cote-d-ivoire',
  'democratic-republic-of-the-congo',
  'djibouti',
  'egypt',
  'equatorial-guinea',
  'eritrea',
  'eswatini',
  'ethiopia',
  'gabon',
  'gambia',
  'ghana',
  'guinea',
  'guinea-bissau',
  'kenya',
  'lesotho',
  'liberia',
  'libya',
  'madagascar',
  'malawi',
  'mali',
  'mauritania',
  'mauritius',
  'morocco',
  'mozambique',
  'namibia',
  'niger',
  'nigeria',
  'rwanda',
  'sao-tome-and-principe',
  'senegal',
  'seychelles',
  'sierra-leone',
  'somalia',
  'south-africa',
  'south-sudan',
  'sudan',
  'tanzania',
  'togo',
  'tunisia',
  'uganda',
  'zambia',
  'zimbabwe',
  'australia',
  'fiji',
  'kiribati',
  'marshall-islands',
  'micronesia',
  'nauru',
  'new-zealand',
  'palau',
  'papua-new-guinea',
  'samoa',
  'solomon-islands',
  'tonga',
  'tuvalu',
  'vanuatu',
]);

function usage() {
  return [
    'Usage: node scripts/build-country-dev.mjs --country <slug> [--locales en,es,pt-BR,de,fr,pl,uk]',
    '',
    'Fast country materializer. It recompiles shared CSS/JS assets, renders /en/<country>/ from source,',
    'clones the English country tree into selected locale trees, rewrites locale URLs, and runs targeted guards.',
    'Full npm run build remains the release gate.'
  ].join('\n');
}

function parseArgs(argv) {
  const args = { country: '', locales: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--country' || arg === '-c') args.country = argv[++i] || '';
    else if (arg.startsWith('--country=')) args.country = arg.slice('--country='.length);
    else if (arg === '--locales' || arg === '-l') args.locales = String(argv[++i] || '').split(',').map(s => s.trim()).filter(Boolean);
    else if (arg.startsWith('--locales=')) args.locales = arg.slice('--locales='.length).split(',').map(s => s.trim()).filter(Boolean);
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function compileDesignAssets() {
  const cssSourceFiles = [
    'variables.css',
    'reset.css',
    'base.css',
    'typography.css',
    'layout.css',
    'components.css',
    'country.css',
    'countries-portal.css',
    'workbench.css',
    'tables.css',
    'code.css',
    'accordion.css',
    'graph.css',
    'utilities.css',
    'validohub.css'
  ];

  let cssContent = '';
  for (const filename of cssSourceFiles) {
    const content = await readFile(resolve(projectRoot, 'assets', 'css', filename), 'utf8');
    cssContent += `/* --- ${filename} --- */\n${content.replace(/@import\s+[^;]+;/g, '')}\n`;
  }

  const jsContent = await readFile(resolve(projectRoot, 'assets', 'js', 'bundle.js'), 'utf8');
  const cssHash = createHash('sha256').update(cssContent).digest('hex').slice(0, 6);
  const jsHash = createHash('sha256').update(jsContent).digest('hex').slice(0, 6);
  const cssFileName = `bundle.${cssHash}.css`;
  const jsFileName = `bundle.${jsHash}.js`;
  const srcCssDir = resolve(projectRoot, 'assets', 'css');
  const destCssDir = resolve(siteRoot, 'assets', 'css');
  const destJsDir = resolve(siteRoot, 'assets', 'js');
  const hashedBundlePattern = /^bundle\.[a-f0-9]{6}\.(css|js)$/;

  for (const dir of [srcCssDir, destCssDir, destJsDir]) {
    if (!(await pathExists(dir))) continue;
    for (const file of await readdir(dir)) {
      if (hashedBundlePattern.test(file)) await rm(resolve(dir, file));
    }
  }

  await mkdir(destCssDir, { recursive: true });
  await mkdir(destJsDir, { recursive: true });
  await writeFile(resolve(srcCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destCssDir, cssFileName), cssContent, 'utf8');
  await writeFile(resolve(destJsDir, jsFileName), jsContent, 'utf8');

  const manifest = {
    css: `/assets/css/${cssFileName}`,
    js: `/assets/js/${jsFileName}`
  };
  await writeFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  await writeFile(resolve(siteRoot, 'assets-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  return manifest;
}

async function renderEnglishCountryFromSource(country, assetsManifest) {
  const routeRegistry = await buildRouteRegistry();
  const route = routeRegistry.getAll().find(item => item.type === 'country' && item.metadata?.id === country);
  if (!route) throw new Error(`Country route not found in source registry: ${country}`);
  await renderCountryPage(route, routeRegistry, assetsManifest);
  return routeRegistry;
}

async function renderEnglishCountryToolPages(country, assetsManifest) {
  const dataPath = resolve(projectRoot, 'countries', 'data', `${country}.json`);
  if (!(await pathExists(dataPath))) return 0;
  const data = JSON.parse(await readFile(dataPath, 'utf8'));
  const routes = Array.isArray(data.hub?.routes) ? data.hub.routes : [];
  if (!routes.length) return 0;

  const layoutTemplate = await readFile(resolve(projectRoot, 'templates', 'layout.html'), 'utf8');
  const runtimeTags = runtimeScriptsForCountry(country)
    .map(script => `<script src="/assets/js/tools/${script}?v=country-premium-20260719"></script>`)
    .join('\n');
  const relatedCards = routes.slice(0, 12).map(route => `
    <a href="${escapeHtml(route.href)}" class="link-card">
      <span>${escapeHtml(route.title)}</span>
      <span aria-hidden="true">→</span>
    </a>
  `).join('');
  let rendered = 0;

  for (const route of routes) {
    const href = String(route.href || '');
    if (!href.startsWith(`/en/${country}/`) || !href.endsWith('/')) continue;
    const title = route.title || `${data.catalog.name} Workbench`;
    const summary = route.text || route.summary || `Browser-only ${data.catalog.name} developer workbench.`;
    const category = route.category || 'country';
    const headHtml = `
  <title>${escapeHtml(title)} | ValidoHub</title>
  <meta name="description" content="${escapeHtml(summary)}">
  <link rel="canonical" href="https://validohub.com${escapeHtml(href)}">
  <link rel="stylesheet" href="${assetsManifest.css}">
`;
    const breadcrumbsHtml = `<nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><a href="/en/">Home</a></li>
      <li><a href="/en/${escapeHtml(country)}/">${escapeHtml(data.catalog.name)}</a></li>
      <li><a href="/en/categories/${escapeHtml(category)}/">${escapeHtml(category.replace(/-/g, ' '))}</a></li>
      <li><span>${escapeHtml(title)}</span></li>
    </ol>
  </nav>`;
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: title,
      description: summary,
      url: `https://validohub.com${href}`,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'All'
    };
    const contentHtml = `
        <header class="page-intro">
          <span class="eyebrow">${escapeHtml(data.catalog.name)} workbench</span>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(summary)}</p>
        </header>

        <section class="workbench-card csf-static-host" aria-label="Premium country workbench" data-algorithm-id="validohub.${escapeHtml(country)}-suite"></section>

        <section class="related-section">
          <div class="section-heading">
            <span class="eyebrow">Related tools</span>
            <h2>Continue with related ${escapeHtml(data.catalog.name)} tools</h2>
          </div>
          <div class="card-grid">${relatedCards}</div>
        </section>`;
    const assembledHtml = layoutTemplate
      .replaceAll('{{ HEAD }}', () => headHtml)
      .replaceAll('{{ HEADER }}', () => '')
      .replaceAll('{{ BREADCRUMBS }}', () => breadcrumbsHtml)
      .replaceAll('{{ HERO }}', () => '')
      .replaceAll('{{ CONTENT }}', () => contentHtml)
      .replaceAll('{{ FOOTER }}', () => '')
      .replaceAll('{{ JSON_LD }}', () => `<script type="application/ld+json">${escapeHtmlJson(JSON.stringify(jsonLd))}</script>`)
      .replaceAll('{{ SCRIPTS }}', () => `<script src="${assetsManifest.js}" defer></script>\n${runtimeTags}`);

    const outputFilePath = resolve(siteRoot, href.replace(/^\//, ''), 'index.html');
    await mkdir(dirname(outputFilePath), { recursive: true });
    await writeFile(outputFilePath, assembledHtml, 'utf8');
    rendered += 1;
  }

  return rendered;
}

async function configuredLocales() {
  const siteConfig = await readFile(resolve(projectRoot, 'site.yaml'), 'utf8');
  const inline = siteConfig.match(/^locales:\s*\[(.*?)\]\s*$/m);
  if (!inline) return CORE_PRODUCTION_LOCALES;
  const values = inline[1].split(',').map(item => item.trim()).filter(Boolean);
  return values.length ? values : CORE_PRODUCTION_LOCALES;
}

async function scanHtmlFiles(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await scanHtmlFiles(full));
    else if (entry.isFile() && entry.name === 'index.html') out.push(full);
  }
  return out;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeHtmlJson(value) {
  return String(value ?? '')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function routeFromFile(filePath) {
  return '/' + filePath.replace(siteRoot, '').replace(/\\/g, '/').replace(/^\//, '').replace(/index\.html$/, '');
}

function pruneRelatedLinksToCountry(content, { country, locale, suffix }) {
  if (!content.includes('class="related-section"')) return content;
  const allowedPrefix = `/${locale}/${country}/`;
  const pagePath = `/${locale}/${country}${suffix}`.endsWith('/') ? `/${locale}/${country}${suffix}` : `/${locale}/${country}${suffix}/`;
  return content.replace(/<section class="related-section">[\s\S]*?<\/section>/g, (section) => {
    return section.replace(/<a href="([^"]+)" class="link-card">[\s\S]*?<\/a>/g, (card, href) => {
      const normalizedHref = href.endsWith('/') ? href : `${href}/`;
      return normalizedHref.startsWith(allowedPrefix) && normalizedHref !== pagePath ? card : '';
    });
  });
}

function buildAlternateTags(country, suffix, locales) {
  const tags = locales.map(locale => `<link rel="alternate" hreflang="${locale}" href="https://validohub.com/${locale}/${country}${suffix}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com/en/${country}${suffix}">`);
  return tags.join('\n  ');
}

function localizeCountryHtml(content, { country, locale, suffix, locales }) {
  let next = content;
  next = next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${locale}">`);
  next = next.replace(new RegExp(`https://validohub\\.com/en/${escapeRegExp(country)}/`, 'g'), `https://validohub.com/${locale}/${country}/`);
  next = next.replace(new RegExp(`href="/en/${escapeRegExp(country)}/`, 'g'), `href="/${locale}/${country}/`);
  next = next.replace(new RegExp(`content="/en/${escapeRegExp(country)}/`, 'g'), `content="/${locale}/${country}/`);
  next = next.replace(/"inLanguage"\s*:\s*"en"/g, `"inLanguage":"${locale}"`);
  next = next.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  next = next.replace('</head>', `  ${buildAlternateTags(country, suffix, locales)}\n</head>`);
  next = pruneRelatedLinksToCountry(next, { country, locale, suffix });
  return next;
}

function updateAssetLinks(content, assetsManifest) {
  return updateBundleAssetLinks(content, assetsManifest);
}

async function rewriteHtmlTreeAssetLinks(dir, assetsManifest) {
  if (!(await pathExists(dir))) return 0;
  const htmlFiles = await scanHtmlFiles(dir);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    const next = updateAssetLinks(content, assetsManifest);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated += 1;
    }
  }
  return updated;
}

function runtimeScriptsForCountry(country) {
  const runtime = COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`;
  const scripts = LEGACY_RICH_COUNTRIES.has(country)
    ? [LEGACY_RICH_LAYER, runtime]
    : FACTORY_COUNTRY_SLUGS.has(country)
      ? ['country-suite-factory.js', runtime]
      : [runtime];
  if (GOLD_LAB_COUNTRIES.has(country)) scripts.push(GOLD_LAB_RUNTIME);
  return scripts;
}

function ensureOrderedToolScripts(content, scripts) {
  let next = content;
  const tags = [];
  for (const script of scripts) {
    const src = `/assets/js/tools/${script}`;
    const oldTag = new RegExp(`<script src="${escapeRegExp(src)}(?:\\?[^\"]*)?"></script>`, 'g');
    next = next.replace(oldTag, '');
    tags.push(`<script src="${src}?v=country-premium-20260719"></script>`);
  }
  return next.replace('</body>', tags.join('') + '\n</body>');
}

function ensureAdditionalToolScript(content, script) {
  const src = `/assets/js/tools/${script}`;
  if (content.includes(src)) return content;
  return content.replace('</body>', `<script src="${src}?v=country-premium-20260719"></script>\n</body>`);
}

function removeToolScript(content, script) {
  const src = `/assets/js/tools/${script}`;
  const oldTag = new RegExp(`<script src="${escapeRegExp(src)}(?:\\?[^\"]*)?"></script>\\s*`, 'g');
  return content.replace(oldTag, '');
}

function applyRouteSpecificRuntimeOverrides(content, filePath) {
  const normalizedFilePath = filePath.replace(/\\/g, '/');
  if (normalizedFilePath.endsWith('/en/spain/spain-id-validator/index.html')) {
    let next = removeToolScript(content, GOLD_LAB_RUNTIME);
    next = ensureAdditionalToolScript(next, 'spain-id.js');
    return next;
  }
  for (const routePath of GOLD_LAB_ROUTE_OVERRIDES) {
    if (normalizedFilePath.endsWith(routePath)) {
      return ensureAdditionalToolScript(content, GOLD_LAB_RUNTIME);
    }
  }
  return content;
}

async function refreshEnglishCountryRuntimeScripts(country) {
  const algorithmId = COUNTRY_ALGORITHM_BY_SLUG[country];
  if (!algorithmId) return 0;
  const dir = resolve(siteRoot, 'en', country);
  if (!(await pathExists(dir))) return 0;
  const htmlFiles = await scanHtmlFiles(dir);
  let updated = 0;
  for (const filePath of htmlFiles) {
    const content = await readFile(filePath, 'utf8');
    let next = content;
    if (content.includes(`data-algorithm-id="${algorithmId}"`)) {
      next = ensureOrderedToolScripts(content, runtimeScriptsForCountry(country));
    }
    for (const [standaloneAlgorithmId, scripts] of STANDALONE_RUNTIME_BY_ALGORITHM) {
      if (next.includes(`data-algorithm-id="${standaloneAlgorithmId}"`)) {
        next = removeToolScript(next, GOLD_LAB_RUNTIME);
        next = ensureOrderedToolScripts(next, scripts);
        break;
      }
    }
    for (const goldAlgorithmId of GOLD_LAB_ALGORITHMS) {
      if (next.includes(`data-algorithm-id="${goldAlgorithmId}"`)) {
        next = ensureAdditionalToolScript(next, GOLD_LAB_RUNTIME);
        break;
      }
    }
    next = applyRouteSpecificRuntimeOverrides(next, filePath);
    if (next !== content) {
      await writeFile(filePath, next, 'utf8');
      updated += 1;
    }
  }
  return updated;
}

async function syncRuntimeAssets(country) {
  const destTools = resolve(siteRoot, 'assets', 'js', 'tools');
  const destWorkbench = resolve(siteRoot, 'assets', 'js', 'workbench');
  await mkdir(destTools, { recursive: true });
  await mkdir(destWorkbench, { recursive: true });
  await cp(resolve(projectRoot, 'assets', 'js', 'workbench'), destWorkbench, { recursive: true });

  const runtime = COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`;
  const scripts = Array.from(new Set(runtimeScriptsForCountry(country)
    .concat(GOLD_STANDALONE_RUNTIMES_BY_COUNTRY[country] || [])))
    .filter((script) => script !== 'country-suite-factory.js');
  for (const script of scripts) {
    const sourceRuntime = resolve(projectRoot, 'assets', 'js', 'tools', script);
    if (await pathExists(sourceRuntime)) {
      await cp(sourceRuntime, resolve(destTools, script));
    }
  }

  const factory = resolve(projectRoot, 'assets', 'js', 'tools', 'country-suite-factory.js');
  if (await pathExists(factory)) {
    await cp(factory, resolve(destTools, 'country-suite-factory.js'));
  }
}

function isRasterVisualAsset(assetPath) {
  return /\.(?:avif|jpe?g|png|webp)$/i.test(String(assetPath || ''));
}

async function syncCountryVisualAssets(country) {
  const dataPath = resolve(projectRoot, 'countries', 'data', `${country}.json`);
  if (!(await pathExists(dataPath))) return 0;

  const model = JSON.parse(await readFile(dataPath, 'utf8'));
  const visualPaths = [
    model.visualAssets?.outlineSrc,
    model.visualAssets?.mapSrc
  ].filter(isRasterVisualAsset);

  let copied = 0;
  for (const assetPath of visualPaths) {
    const relativePath = assetPath.replace(/^\//, '');
    const sourcePath = resolve(projectRoot, relativePath);
    if (!(await pathExists(sourcePath))) continue;
    const targetPath = resolve(siteRoot, relativePath);
    await mkdir(dirname(targetPath), { recursive: true });
    await cp(sourcePath, targetPath);
    copied += 1;
  }

  return copied;
}

async function materializeLocaleCountry({ country, locale, locales }) {
  const sourceDir = resolve(siteRoot, 'en', country);
  const targetDir = resolve(siteRoot, locale, country);
  if (!(await pathExists(sourceDir))) {
    throw new Error(`Missing ${sourceDir}. Run npm run build once before using build:country for this country.`);
  }

  if (locale !== 'en') {
    await rm(targetDir, { recursive: true, force: true });
    await mkdir(dirname(targetDir), { recursive: true });
    await cp(sourceDir, targetDir, { recursive: true });
  }

  const htmlFiles = await scanHtmlFiles(targetDir);
  for (const filePath of htmlFiles) {
    const relative = filePath.replace(targetDir, '').replace(/\\/g, '/').replace(/\/index\.html$/, '/');
    const suffix = relative === '/index.html' || relative === '/' ? '/' : relative;
    const content = await readFile(filePath, 'utf8');
    const next = localizeCountryHtml(content, { country, locale, suffix, locales });
    await writeFile(filePath, next, 'utf8');
  }

  return htmlFiles.length;
}

async function refreshSelectedCountryRouteAssets(country, locales, assetsManifest) {
  let updated = 0;
  for (const locale of locales) {
    updated += await rewriteHtmlTreeAssetLinks(resolve(siteRoot, locale, country), assetsManifest);
    updated += await rewriteHtmlTreeAssetLinks(resolve(siteRoot, locale, 'countries'), assetsManifest);
  }
  return updated;
}

async function validateCountryHtml(country, locales) {
  const failures = [];
  let checked = 0;
  const isFactoryCountry = FACTORY_COUNTRY_SLUGS.has(country);
  const currentManifest = JSON.parse(await readFile(resolve(projectRoot, 'assets', 'assets-manifest.json'), 'utf8'));
  for (const locale of locales) {
    const dir = resolve(siteRoot, locale, country);
    if (!(await pathExists(dir))) {
      failures.push(`Missing localized country directory: /${locale}/${country}/`);
      continue;
    }
    const htmlFiles = await scanHtmlFiles(dir);
    checked += htmlFiles.length;
    for (const filePath of htmlFiles) {
      const content = await readFile(filePath, 'utf8');
      const route = routeFromFile(filePath);
      if (content.includes('[object Object]')) failures.push(`${route} contains [object Object]`);
      if (/<h3>\s*<\/h3>/.test(content)) failures.push(`${route} contains empty h3`);
      if (/<p class="vh-(?:mt-xs vh-mb-xs|mb-xs vh-mt-xs)">\s*<\/p>/.test(content)) failures.push(`${route} contains empty country info-card summary`);
      if (isFactoryCountry && content.includes('>Run the tool<')) failures.push(`${route} still shows generic Run the tool shell`);
      if (isFactoryCountry && content.includes('workbench-heading')) failures.push(`${route} still contains generic workbench heading`);
      const relatedSection = content.match(/<section class="related-section">[\s\S]*?<\/section>/)?.[0] || '';
      const foreignRelated = [...relatedSection.matchAll(/href="([^"]+)"/g)]
        .map(match => match[1])
        .filter(href => href.startsWith('/') && !href.startsWith(`/${locale}/${country}/`));
      if (foreignRelated.length) failures.push(`${route} has cross-country related links: ${foreignRelated.slice(0, 3).join(', ')}`);
      if (isFactoryCountry && content.includes('data-algorithm-id="validohub.') && content.includes(`${country}-suite`)) {
        if (!content.includes('/assets/js/tools/country-suite-factory.js')) failures.push(`${route} missing country-suite-factory.js`);
        if (!content.includes(`/assets/js/tools/${COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`}`)) failures.push(`${route} missing country runtime script`);
      }
      if (LEGACY_RICH_COUNTRIES.has(country) && content.includes('data-algorithm-id="validohub.') && content.includes(`${country}-suite`)) {
        if (!content.includes('/assets/js/tools/' + LEGACY_RICH_LAYER)) failures.push(`${route} missing ${LEGACY_RICH_LAYER}`);
        const layerIndex = content.indexOf('/assets/js/tools/' + LEGACY_RICH_LAYER);
        const runtimeIndex = content.indexOf(`/assets/js/tools/${COUNTRY_RUNTIME_BY_SLUG[country] || `${country}-suite.js`}`);
        if (layerIndex !== -1 && runtimeIndex !== -1 && layerIndex > runtimeIndex) failures.push(`${route} loads ${LEGACY_RICH_LAYER} after country runtime`);
      }
      const cssLinks = content.match(/<link[^>]*rel="stylesheet"[^>]*>/gi) || [];
      if (cssLinks.length !== 1) failures.push(`${route} has ${cssLinks.length} stylesheet links`);
      if (!content.includes(`href="${currentManifest.css}"`)) {
        failures.push(`${route} does not reference the current CSS bundle`);
      }
      if (!content.includes(`src="${currentManifest.js}"`)) {
        failures.push(`${route} does not reference the current JS bundle`);
      }
    }
  }
  if (failures.length) {
    throw new Error(`Country dev build validation failed:\n- ${failures.join('\n- ')}`);
  }
  return checked;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  const country = String(args.country || '').trim().toLowerCase();
  if (!country) throw new Error('Missing --country.\n' + usage());
  const locales = args.locales.length ? args.locales : await configuredLocales();
  if (!locales.includes('en')) locales.unshift('en');

  console.log(`=== ValidoHub country dev build: ${country} ===`);
  console.log(`Locales: ${locales.join(', ')}`);
  const assetsManifest = await compileDesignAssets();
  console.log(`✓ Compiled assets: ${assetsManifest.css}, ${assetsManifest.js}`);
  const globalAssetLinks = await refreshGeneratedAssetLinks(siteRoot, assetsManifest);
  console.log(`✓ Refreshed current CSS/JS bundle links on ${globalAssetLinks.updated} generated pages (checked ${globalAssetLinks.checked})`);
  await renderEnglishCountryFromSource(country, assetsManifest);
  console.log(`✓ Rendered /en/${country}/ from source`);
  const renderedToolPages = await renderEnglishCountryToolPages(country, assetsManifest);
  if (renderedToolPages) console.log(`✓ Rendered ${renderedToolPages} country tool pages from source`);
  await syncRuntimeAssets(country);
  const visualAssets = await syncCountryVisualAssets(country);
  console.log(`✓ Synced ${visualAssets} country visual assets`);
  const assetLinkUpdates = await refreshSelectedCountryRouteAssets(country, locales, assetsManifest);
  console.log(`✓ Refreshed current CSS/JS bundle links on ${assetLinkUpdates} selected country/portal pages`);
  const runtimeUpdates = await refreshEnglishCountryRuntimeScripts(country);
  console.log(`✓ Refreshed tool runtime scripts on ${runtimeUpdates} English country tool pages`);

  let pages = 0;
  for (const locale of locales) {
    pages += await materializeLocaleCountry({ country, locale, locales });
  }

  const checked = await validateCountryHtml(country, locales);
  console.log(`✓ Materialized ${pages} country pages for ${country}`);
  console.log(`✓ Targeted HTML guards passed on ${checked} pages`);
  console.log('Note: this is a dev accelerator. Run npm run build before release.');
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
