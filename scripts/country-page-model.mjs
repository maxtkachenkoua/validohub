import { access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export class CountryPageModel {
  constructor(data) {
    this.slug = data.slug;
    this.displayName = data.displayName;
    this.nativeName = data.nativeName;
    this.flag = data.flag;
    this.iso2 = data.iso2;
    this.iso3 = data.iso3;
    this.capital = data.capital;
    this.region = data.region;
    this.subregion = data.subregion;
    this.currency = data.currency;
    this.languages = data.languages;
    this.callingCode = data.callingCode;
    this.internetTld = data.internetTld;
    this.drivingSide = data.drivingSide;
    this.timeZones = data.timeZones;
    this.locale = data.locale;
    this.dateFormats = data.dateFormats;
    this.decimalSeparator = data.decimalSeparator;
    this.thousandsSeparator = data.thousandsSeparator;
    this.plugTypes = data.plugTypes;
    this.voltage = data.voltage;
    this.frequency = data.frequency;
    this.emergencyNumbers = data.emergencyNumbers;
    this.postalCode = data.postalCode;
    this.addressFormat = data.addressFormat || { formatted: [], fields: [] };
    this.phoneFormats = data.phoneFormats || [];
    this.vehicleRegistration = data.vehicleRegistration;
    this.administrativeDivisions = data.administrativeDivisions;
    this.taxSystem = data.taxSystem;
    this.bankingSystem = data.bankingSystem || [];
    this.paymentSystems = data.paymentSystems || [];
    this.searchHints = data.searchHints || [];
    this.identifiers = data.identifiers || [];
    this.validators = data.validators || [];
    this.generators = data.generators || [];
    this.officialResources = data.officialResources || [];
    this.integrationChecklist = data.integrationChecklist || [];
    this.plannedWorkbenches = data.plannedWorkbenches || [];
    this.visualAssets = data.visualAssets || {};
    this.visualIdentity = data.visualIdentity || {};
    this.relationships = data.relationships || [];
    this.completionStatus = data.completionStatus;
  }
}

export function normalizeCountryData(countryData) {
  const cat = countryData.catalog || {};
  const hub = countryData.hub || {};
  const meta = hub.metadata || {};

  return new CountryPageModel({
    slug: countryData.id,
    displayName: cat.name || hub.name,
    nativeName: cat.nativeName || meta.nativeName,
    flag: cat.flag || hub.flag,
    iso2: cat.iso2 || meta.iso2,
    iso3: cat.iso3 || meta.iso3,
    capital: meta.capital,
    region: cat.region,
    subregion: meta.region || cat.region,
    currency: meta.currency || cat.currencyName,
    languages: meta.languages || cat.language,
    callingCode: meta.callingCode,
    internetTld: meta.internetTld,
    drivingSide: meta.drivingSide,
    timeZones: meta.timeZone || meta.primaryTimeZone,
    locale: meta.locale || meta.icuLocale,
    dateFormats: meta.dateFormat,
    decimalSeparator: meta.decimalSeparator,
    thousandsSeparator: meta.thousandsSeparator,
    plugTypes: meta.powerPlugTypes || meta.plugTypes,
    voltage: meta.voltage,
    frequency: meta.frequency,
    emergencyNumbers: meta.emergencyNumber,
    postalCode: meta.postalCodeFormat,
    addressFormat: hub.addressExample,
    phoneFormats: hub.phoneExamples || [],
    vehicleRegistration: meta.vehicleRegistration || meta.licensePlateFormat,
    administrativeDivisions: meta.administrativeDivisions || meta.divisions,
    taxSystem: meta.taxSystem || hub.taxSystem,
    bankingSystem: (hub.bankingOverview || []).slice().sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || '')),
    paymentSystems: (hub.payments || []).slice().sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || '')),
    searchHints: (hub.searchHints || cat.searchHints || []).slice(),
    identifiers: (cat.identifiers || []).slice().sort((a, b) => a.localeCompare(b)),
    validators: (cat.availableWorkbenches || []).slice().sort((a, b) => a.localeCompare(b)),
    generators: (cat.generators || []).slice().sort((a, b) => a.localeCompare(b)),
    officialResources: (hub.officialResources || []).slice().sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || '')),
    integrationChecklist: hub.integrationChecklist || [],
    plannedWorkbenches: (hub.plannedWorkbenches || []).slice().sort((a, b) => (a.name || '').localeCompare(b.name || '')),
    visualAssets: countryData.visualAssets || {},
    visualIdentity: hub.visualIdentity || {},
    relationships: hub.validationRules || [],
    completionStatus: cat.completion
  });
}

function isAlphabetical(arr, keyExtractor = (x) => x) {
  for (let i = 0; i < arr.length - 1; i++) {
    const a = keyExtractor(arr[i]);
    const b = keyExtractor(arr[i + 1]);
    if (a.localeCompare(b) > 0) {
      return false;
    }
  }
  return true;
}

export async function validateCountryPageModel(model, routeRegistry = null) {
  // 1. Required Identity Fields
  const required = ['slug', 'displayName', 'iso2', 'iso3', 'region'];
  for (const field of required) {
    if (!model[field]) {
      throw new Error(`Validation Error: Missing required country identity field "${field}"`);
    }
  }

  // 2. ISO Codes Formats
  if (!/^[A-Z]{2}$/.test(model.iso2)) {
    throw new Error(`Validation Error: Invalid ISO-2 code format: "${model.iso2}"`);
  }
  if (!/^[A-Z]{3}$/.test(model.iso3)) {
    throw new Error(`Validation Error: Invalid ISO-3 code format: "${model.iso3}"`);
  }

  // 3. Local Visual Asset Paths
  if (model.visualAssets) {
    const assets = ['outlineSrc', 'mapSrc'];
    for (const key of assets) {
      const src = model.visualAssets[key];
      if (src) {
        // Assert local asset path matches /assets/...
        if (!src.startsWith('/assets/')) {
          throw new Error(`Validation Error: Visual asset path must be local relative to /assets/: "${src}"`);
        }
        // Check file exists in project directory
        const fullPath = resolve(projectRoot, src.replace(/^\//, ''));
        if (!(await fileExists(fullPath))) {
          throw new Error(`Validation Error: Visual asset file does not exist on disk: "${src}" (resolved: ${fullPath})`);
        }
      }
    }
  }

  // 4. Valid Registered Internal Routes (if Registry is passed)
  if (routeRegistry) {
    // Check validators route registrations
    for (const workbench of model.validators) {
      // Find route by title matching workbench
      const matches = routeRegistry.getAll().some(r => r.title.includes(workbench) || r.path.includes(workbench.toLowerCase().replace(/\s+/g, '-')));
      if (!matches) {
        throw new Error(`Validation Error: Validator Workbench "${workbench}" is not registered in the RouteRegistry`);
      }
    }
  }

  // 5. Valid Official External URLs
  if (model.officialResources) {
    for (const resource of model.officialResources) {
      if (resource.url) {
        try {
          const parsed = new URL(resource.url);
          if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            throw new Error(`Invalid protocol: ${parsed.protocol}`);
          }
        } catch (err) {
          throw new Error(`Validation Error: Official resource "${resource.title || resource.name}" has invalid URL "${resource.url}": ${err.message}`);
        }
      }
    }
  }

  // 6. Duplication checks
  const idSet = new Set(model.identifiers);
  if (idSet.size !== model.identifiers.length) {
    throw new Error(`Validation Error: Duplicate identifiers registered: ${model.identifiers}`);
  }

  const valSet = new Set(model.validators);
  if (valSet.size !== model.validators.length) {
    throw new Error(`Validation Error: Duplicate validators registered: ${model.validators}`);
  }

  // 7. Deterministic Array Ordering checks (Alphabetical)
  if (model.identifiers && !isAlphabetical(model.identifiers)) {
    throw new Error(`Validation Error: Country identifiers list must be sorted alphabetically: [${model.identifiers.join(', ')}]`);
  }
  if (model.validators && !isAlphabetical(model.validators)) {
    throw new Error(`Validation Error: Country validators list must be sorted alphabetically: [${model.validators.join(', ')}]`);
  }
  if (model.paymentSystems && !isAlphabetical(model.paymentSystems, x => x.name || x.title || '')) {
    throw new Error(`Validation Error: Payment systems list must be sorted alphabetically.`);
  }
  if (model.officialResources && !isAlphabetical(model.officialResources, x => x.title || x.name || '')) {
    throw new Error(`Validation Error: Official resources list must be sorted alphabetically.`);
  }
}
