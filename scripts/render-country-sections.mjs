import { escape } from 'node:querystring';
import { countryThemeStyleAttr } from './country-theme-style.mjs';

function cleanHtml(html) {
  // Sort classes alphabetically on all HTML elements for byte-identical determinism
  return html.replace(/class=["']([^"']+)["']/g, (match, classList) => {
    const sorted = classList.split(/\s+/).filter(Boolean).sort().join(' ');
    return `class="${sorted}"`;
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function createSection(eyebrow, title, className, description, content) {
  if (!content) return '';
  const html = `
    <section class="vh-country-section vh-${className}">
      <div class="section-heading">
        <span class="vh-eyebrow">${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
        ${description ? `<p>${escapeHtml(description)}</p>` : ''}
      </div>
      <div class="vh-section-content">
        ${content}
      </div>
    </section>
  `;
  return cleanHtml(html);
}

function createMetricCard(label, value, icon = null, copyValue = null, brandKey = null) {
  const brandIcon = icon ? `<span class="vh-country-card-icon" aria-hidden="true">${icon}</span>` : '';
  const valBlock = copyValue 
    ? `<span class="vh-country-code-value"><code>${escapeHtml(value)}</code><button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(copyValue)}" data-copy-label="${escapeHtml(label)}">Copy</button></span>`
    : `<strong>${escapeHtml(value)}</strong>`;

  const html = `
    <article class="vh-country-metric-card">
      ${brandIcon}
      <span class="vh-country-card-label">${escapeHtml(label)}</span>
      ${valBlock}
    </article>
  `;
  return html;
}

const CIVIC_CITY_PROFILES = {
  albania: [
    ['Tirana', 'approx. 0.6M municipality', 'TI'],
    ['Durres', 'approx. 0.1M', 'DR'],
    ['Vlore', 'approx. 0.1M', 'VL'],
    ['Elbasan', 'approx. 0.1M', 'EL']
  ],
  andorra: [
    ['Andorra la Vella', 'approx. 0.02M', 'AV'],
    ['Escaldes-Engordany', 'approx. 0.01M', 'EE'],
    ['Encamp', 'approx. 0.01M', 'EN'],
    ['La Massana', 'approx. 0.01M', 'LM']
  ],
  argentina: [
    ['Buenos Aires', 'approx. 3.1M city / 15M metro', 'BA'],
    ['Cordoba', 'approx. 1.6M', 'CB'],
    ['Rosario', 'approx. 1.3M metro', 'RO'],
    ['Mendoza', 'approx. 1.1M metro', 'MZ']
  ],
  austria: [
    ['Vienna', 'approx. 2.0M', 'WI'],
    ['Graz', 'approx. 0.3M', 'GZ'],
    ['Linz', 'approx. 0.2M', 'LZ'],
    ['Salzburg', 'approx. 0.2M', 'SZ']
  ],
  belgium: [
    ['Brussels', 'approx. 0.2M city / 1.2M region', 'BR'],
    ['Antwerp', 'approx. 0.5M', 'AN'],
    ['Ghent', 'approx. 0.3M', 'GE'],
    ['Charleroi', 'approx. 0.2M', 'CH']
  ],
  brazil: [
    ['Sao Paulo', 'approx. 11.5M', 'SP'],
    ['Rio de Janeiro', 'approx. 6.2M', 'RJ'],
    ['Brasilia', 'approx. 2.8M', 'DF'],
    ['Salvador', 'approx. 2.4M', 'SA']
  ],
  bolivia: [
    ['Santa Cruz de la Sierra', 'approx. 1.9M', 'SC'],
    ['El Alto', 'approx. 1.1M', 'EA'],
    ['La Paz', 'approx. 0.8M', 'LP'],
    ['Cochabamba', 'approx. 0.8M', 'CB']
  ],
  'united-states': [
    ['New York City', 'approx. 8.3M', 'NY'],
    ['Los Angeles', 'approx. 3.8M', 'LA'],
    ['Chicago', 'approx. 2.7M', 'CH'],
    ['Houston', 'approx. 2.3M', 'HO']
  ],
  canada: [
    ['Toronto', 'approx. 3.0M city / 6M metro', 'TO'],
    ['Montreal', 'approx. 1.8M city / 4M metro', 'MT'],
    ['Calgary', 'approx. 1.4M', 'CG'],
    ['Ottawa', 'approx. 1.1M city / 1.5M metro', 'OT']
  ],
  mexico: [
    ['Mexico City', 'approx. 9.2M city / 22M metro', 'MX'],
    ['Tijuana', 'approx. 1.9M', 'TJ'],
    ['Ecatepec', 'approx. 1.6M', 'EC'],
    ['Leon', 'approx. 1.6M', 'LE']
  ],
  belize: [
    ['Belize City', 'approx. 0.06M', 'BZ'],
    ['San Ignacio', 'approx. 0.02M', 'SI'],
    ['Belmopan', 'approx. 0.02M', 'BP'],
    ['Orange Walk Town', 'approx. 0.02M', 'OW']
  ],
  guatemala: [
    ['Guatemala City', 'approx. 1.0M city / 3M metro', 'GC'],
    ['Villa Nueva', 'approx. 0.6M', 'VN'],
    ['Mixco', 'approx. 0.5M', 'MX'],
    ['Quetzaltenango', 'approx. 0.2M', 'QZ']
  ],
  'el-salvador': [
    ['San Salvador', 'approx. 0.3M city / 1.7M metro', 'SS'],
    ['Soyapango', 'approx. 0.25M', 'SO'],
    ['Santa Ana', 'approx. 0.25M', 'SA'],
    ['San Miguel', 'approx. 0.2M', 'SM']
  ],
  honduras: [
    ['Tegucigalpa', 'approx. 1.2M metro', 'TG'],
    ['San Pedro Sula', 'approx. 0.8M', 'SP'],
    ['Choloma', 'approx. 0.3M', 'CH'],
    ['La Ceiba', 'approx. 0.2M', 'LC']
  ],
  nicaragua: [
    ['Managua', 'approx. 1.1M', 'MG'],
    ['Leon', 'approx. 0.2M', 'LE'],
    ['Masaya', 'approx. 0.2M', 'MS'],
    ['Chinandega', 'approx. 0.15M', 'CH']
  ],
  'costa-rica': [
    ['San Jose', 'approx. 0.35M city / 2M metro', 'SJ'],
    ['Alajuela', 'approx. 0.3M canton', 'AL'],
    ['Cartago', 'approx. 0.2M canton', 'CA'],
    ['Heredia', 'approx. 0.15M canton', 'HE']
  ],
  panama: [
    ['Panama City', 'approx. 0.9M city / 1.9M metro', 'PC'],
    ['San Miguelito', 'approx. 0.3M', 'SM'],
    ['Tocumen', 'approx. 0.1M', 'TC'],
    ['David', 'approx. 0.1M', 'DV']
  ],
  bahamas: [
    ['Nassau', 'approx. 0.27M', 'NS'],
    ['Freeport', 'approx. 0.03M', 'FP'],
    ['West End', 'approx. 0.01M', 'WE'],
    ['Coopers Town', 'approx. 0.01M', 'CT']
  ],
  cuba: [
    ['Havana', 'approx. 2.1M', 'HA'],
    ['Santiago de Cuba', 'approx. 0.4M', 'SC'],
    ['Camaguey', 'approx. 0.3M', 'CM'],
    ['Holguin', 'approx. 0.3M', 'HG']
  ],
  jamaica: [
    ['Kingston', 'approx. 0.6M metro', 'KG'],
    ['Portmore', 'approx. 0.2M', 'PM'],
    ['Spanish Town', 'approx. 0.15M', 'ST'],
    ['Montego Bay', 'approx. 0.1M', 'MB']
  ],
  haiti: [
    ['Port-au-Prince', 'approx. 1M city / 3M metro', 'PP'],
    ['Carrefour', 'approx. 0.5M', 'CF'],
    ['Delmas', 'approx. 0.4M', 'DE'],
    ['Cap-Haitien', 'approx. 0.3M', 'CH']
  ],
  'dominican-republic': [
    ['Santo Domingo', 'approx. 1.0M city / 3M metro', 'SD'],
    ['Santiago de los Caballeros', 'approx. 0.7M', 'ST'],
    ['La Romana', 'approx. 0.2M', 'LR'],
    ['San Pedro de Macoris', 'approx. 0.2M', 'SP']
  ],
  'antigua-and-barbuda': [
    ["St. John's", 'approx. 0.02M', 'SJ'],
    ['All Saints', 'approx. 0.003M', 'AS'],
    ['Liberta', 'approx. 0.003M', 'LB'],
    ['Codrington', 'Barbuda main settlement', 'CD']
  ],
  dominica: [
    ['Roseau', 'approx. 0.015M', 'RS'],
    ['Portsmouth', 'approx. 0.004M', 'PM'],
    ['Marigot', 'approx. 0.003M', 'MG'],
    ['Mahaut', 'approx. 0.002M', 'MH']
  ],
  'saint-kitts-and-nevis': [
    ['Basseterre', 'approx. 0.013M', 'BS'],
    ['Charlestown', 'approx. 0.002M', 'CH'],
    ['Sandy Point Town', 'approx. 0.003M', 'SP'],
    ['Cayon', 'approx. 0.003M', 'CY']
  ],
  'saint-lucia': [
    ['Castries', 'approx. 0.02M city / 0.07M district', 'CA'],
    ['Vieux Fort', 'approx. 0.005M town / 0.02M district', 'VF'],
    ['Gros Islet', 'approx. 0.02M district', 'GI'],
    ['Soufriere', 'approx. 0.008M', 'SF']
  ],
  'saint-vincent-and-the-grenadines': [
    ['Kingstown', 'approx. 0.013M', 'KG'],
    ['Georgetown', 'approx. 0.002M', 'GT'],
    ['Barrouallie', 'approx. 0.005M', 'BR'],
    ['Port Elizabeth', 'Bequia main town', 'PE']
  ],
  grenada: [
    ["St. George's", 'approx. 0.034M', 'SG'],
    ['Gouyave', 'approx. 0.003M', 'GV'],
    ['Grenville', 'approx. 0.002M', 'GR'],
    ['Victoria', 'approx. 0.002M', 'VC']
  ],
  barbados: [
    ['Bridgetown', 'approx. 0.11M metro', 'BG'],
    ['Speightstown', 'approx. 0.004M', 'SP'],
    ['Oistins', 'approx. 0.002M', 'OI'],
    ['Holetown', 'approx. 0.001M', 'HT']
  ],
  bahrain: [
    ['Manama', 'approx. 0.2M city / 0.7M metro', 'MA'],
    ['Riffa', 'approx. 0.1M', 'RI'],
    ['Muharraq', 'approx. 0.2M governorate', 'MU'],
    ['Hamad Town', 'approx. 0.1M', 'HT']
  ],
  'trinidad-and-tobago': [
    ['Chaguanas', 'approx. 0.08M', 'CH'],
    ['San Fernando', 'approx. 0.05M', 'SF'],
    ['Port of Spain', 'approx. 0.04M city / 0.5M metro', 'PS'],
    ['Arima', 'approx. 0.03M', 'AR']
  ],
  'bosnia-and-herzegovina': [
    ['Sarajevo', 'approx. 0.3M city / 0.4M metro', 'SA'],
    ['Banja Luka', 'approx. 0.2M', 'BL'],
    ['Tuzla', 'approx. 0.1M', 'TZ'],
    ['Zenica', 'approx. 0.1M', 'ZE']
  ],
  bulgaria: [
    ['Sofia', 'approx. 1.3M', 'SO'],
    ['Plovdiv', 'approx. 0.3M', 'PV'],
    ['Varna', 'approx. 0.3M', 'VA'],
    ['Burgas', 'approx. 0.2M', 'BU']
  ],
  chile: [
    ['Santiago', 'approx. 6.8M metro', 'ST'],
    ['Valparaiso', 'approx. 1.0M metro', 'VP'],
    ['Concepcion', 'approx. 1.0M metro', 'CC'],
    ['La Serena', 'approx. 0.5M metro', 'LS']
  ],
  colombia: [
    ['Bogota', 'approx. 7.9M', 'BO'],
    ['Medellin', 'approx. 2.6M', 'ME'],
    ['Cali', 'approx. 2.2M', 'CA'],
    ['Barranquilla', 'approx. 1.3M', 'BQ']
  ],
  croatia: [
    ['Zagreb', 'approx. 0.8M', 'ZG'],
    ['Split', 'approx. 0.2M', 'SP'],
    ['Rijeka', 'approx. 0.1M', 'RI'],
    ['Osijek', 'approx. 0.1M', 'OS']
  ],
  cyprus: [
    ['Nicosia', 'approx. 0.2M district', 'NI'],
    ['Limassol', 'approx. 0.2M', 'LI'],
    ['Larnaca', 'approx. 0.1M', 'LA'],
    ['Paphos', 'approx. 0.1M', 'PA']
  ],
  czechia: [
    ['Prague', 'approx. 1.4M', 'PR'],
    ['Brno', 'approx. 0.4M', 'BR'],
    ['Ostrava', 'approx. 0.3M', 'OS'],
    ['Plzen', 'approx. 0.2M', 'PL']
  ],
  denmark: [
    ['Copenhagen', 'approx. 0.7M city / 1.4M urban', 'CP'],
    ['Aarhus', 'approx. 0.3M', 'AA'],
    ['Odense', 'approx. 0.2M', 'OD'],
    ['Aalborg', 'approx. 0.1M', 'AL']
  ],
  ecuador: [
    ['Guayaquil', 'approx. 2.7M', 'GY'],
    ['Quito', 'approx. 2.0M', 'QU'],
    ['Cuenca', 'approx. 0.6M canton', 'CU'],
    ['Santo Domingo', 'approx. 0.5M canton', 'SD']
  ],
  estonia: [
    ['Tallinn', 'approx. 0.5M', 'TA'],
    ['Tartu', 'approx. 0.1M', 'TR'],
    ['Narva', 'approx. 0.1M', 'NA'],
    ['Parnu', 'approx. 0.05M', 'PA']
  ],
  finland: [
    ['Helsinki', 'approx. 0.7M', 'HE'],
    ['Espoo', 'approx. 0.3M', 'ES'],
    ['Tampere', 'approx. 0.3M', 'TA'],
    ['Vantaa', 'approx. 0.2M', 'VA']
  ],
  france: [
    ['Paris', 'approx. 2.1M', 'PA'],
    ['Marseille', 'approx. 0.9M', 'MA'],
    ['Lyon', 'approx. 0.5M', 'LY'],
    ['Toulouse', 'approx. 0.5M', 'TO']
  ],
  germany: [
    ['Berlin', 'approx. 3.8M', 'BE'],
    ['Hamburg', 'approx. 1.9M', 'HH'],
    ['Munich', 'approx. 1.5M', 'MU'],
    ['Cologne', 'approx. 1.1M', 'CO']
  ],
  greece: [
    ['Athens', 'approx. 3.1M metro', 'AT'],
    ['Thessaloniki', 'approx. 1.1M metro', 'TH'],
    ['Patras', 'approx. 0.2M', 'PA'],
    ['Heraklion', 'approx. 0.2M', 'HE']
  ],
  guyana: [
    ['Georgetown', 'approx. 0.2M metro', 'GT'],
    ['Linden', 'approx. 0.03M', 'LI'],
    ['New Amsterdam', 'approx. 0.02M', 'NA'],
    ['Anna Regina', 'approx. 0.01M', 'AR']
  ],
  hungary: [
    ['Budapest', 'approx. 1.7M', 'BU'],
    ['Debrecen', 'approx. 0.2M', 'DE'],
    ['Szeged', 'approx. 0.2M', 'SZ'],
    ['Miskolc', 'approx. 0.2M', 'MI']
  ],
  iceland: [
    ['Reykjavik', 'approx. 0.1M city / 0.2M capital area', 'RV'],
    ['Kopavogur', 'approx. 0.04M', 'KO'],
    ['Hafnarfjordur', 'approx. 0.03M', 'HF'],
    ['Akureyri', 'approx. 0.02M', 'AK']
  ],
  bangladesh: [
    ['Dhaka', 'approx. 10M city / 23M metro', 'DH'],
    ['Chattogram', 'approx. 5M metro', 'CG'],
    ['Khulna', 'approx. 1M metro', 'KH'],
    ['Sylhet', 'approx. 0.7M metro', 'SY']
  ],
  china: [
    ['Shanghai', 'approx. 25M municipality', 'SH'],
    ['Beijing', 'approx. 22M municipality', 'BJ'],
    ['Guangzhou', 'approx. 19M municipality', 'GZ'],
    ['Shenzhen', 'approx. 18M municipality', 'SZ']
  ],
  cambodia: [
    ['Phnom Penh', 'approx. 2.3M metro', 'PP'],
    ['Siem Reap', 'approx. 0.25M', 'SR'],
    ['Battambang', 'approx. 0.2M', 'BT'],
    ['Sihanoukville', 'approx. 0.1M', 'SV']
  ],
  afghanistan: [
    ['Kabul', 'approx. 4.5M', 'KA'],
    ['Kandahar', 'approx. 0.6M', 'KD'],
    ['Herat', 'approx. 0.6M', 'HE'],
    ['Mazar-i-Sharif', 'approx. 0.5M', 'MS']
  ],
  armenia: [
    ['Yerevan', 'approx. 1.1M', 'YE'],
    ['Gyumri', 'approx. 0.1M', 'GY'],
    ['Vanadzor', 'approx. 0.08M', 'VA'],
    ['Vagharshapat', 'approx. 0.05M', 'VG']
  ],
  azerbaijan: [
    ['Baku', 'approx. 2.3M city / 3M metro', 'BA'],
    ['Ganja', 'approx. 0.3M', 'GJ'],
    ['Sumqayit', 'approx. 0.3M', 'SQ'],
    ['Mingachevir', 'approx. 0.1M', 'MI']
  ],
  bhutan: [
    ['Thimphu', 'approx. 0.1M', 'TH'],
    ['Phuntsholing', 'approx. 0.03M', 'PH'],
    ['Punakha', 'approx. 0.02M district center', 'PU'],
    ['Paro', 'approx. 0.01M', 'PA']
  ],
  brunei: [
    ['Bandar Seri Begawan', 'approx. 0.1M metro', 'BS'],
    ['Kuala Belait', 'approx. 0.03M', 'KB'],
    ['Seria', 'approx. 0.02M', 'SE'],
    ['Tutong', 'approx. 0.02M', 'TU']
  ],
  georgia: [
    ['Tbilisi', 'approx. 1.2M', 'TB'],
    ['Batumi', 'approx. 0.2M', 'BT'],
    ['Kutaisi', 'approx. 0.1M', 'KU'],
    ['Rustavi', 'approx. 0.1M', 'RU']
  ],
  iran: [
    ['Tehran', 'approx. 9.5M city / 16M metro', 'TE'],
    ['Mashhad', 'approx. 3.4M', 'MA'],
    ['Isfahan', 'approx. 2.2M', 'IS'],
    ['Shiraz', 'approx. 1.9M', 'SH']
  ],
  iraq: [
    ['Baghdad', 'approx. 7M city / 9M metro', 'BG'],
    ['Mosul', 'approx. 1.7M', 'MO'],
    ['Basra', 'approx. 1.4M', 'BA'],
    ['Erbil', 'approx. 0.9M', 'ER']
  ],
  kazakhstan: [
    ['Almaty', 'approx. 2.2M', 'AL'],
    ['Astana', 'approx. 1.4M', 'AS'],
    ['Shymkent', 'approx. 1.2M', 'SH'],
    ['Karaganda', 'approx. 0.5M', 'KA']
  ],
  lebanon: [
    ['Beirut', 'approx. 2M metro', 'BE'],
    ['Tripoli', 'approx. 0.2M city / 0.5M metro', 'TR'],
    ['Sidon', 'approx. 0.2M metro', 'SI'],
    ['Tyre', 'approx. 0.1M', 'TY']
  ],
  maldives: [
    ['Male', 'approx. 0.2M metro', 'MA'],
    ['Addu City', 'approx. 0.03M', 'AD'],
    ['Fuvahmulah', 'approx. 0.01M', 'FU'],
    ['Kulhudhuffushi', 'approx. 0.01M', 'KU']
  ],
  'north-korea': [
    ['Pyongyang', 'approx. 3M', 'PY'],
    ['Hamhung', 'approx. 0.8M', 'HH'],
    ['Chongjin', 'approx. 0.6M', 'CJ'],
    ['Nampo', 'approx. 0.4M', 'NP']
  ],
  palestine: [
    ['Gaza City', 'approx. 0.7M', 'GZ'],
    ['Hebron', 'approx. 0.2M', 'HB'],
    ['Nablus', 'approx. 0.2M', 'NB'],
    ['Ramallah', 'approx. 0.04M city / 0.4M governorate', 'RA']
  ],
  syria: [
    ['Damascus', 'approx. 2M city / 5M metro', 'DA'],
    ['Aleppo', 'approx. 2M', 'AL'],
    ['Homs', 'approx. 0.8M', 'HO'],
    ['Latakia', 'approx. 0.4M', 'LA']
  ],
  taiwan: [
    ['New Taipei', 'approx. 4M', 'NT'],
    ['Taichung', 'approx. 2.8M', 'TC'],
    ['Kaohsiung', 'approx. 2.7M', 'KH'],
    ['Taipei', 'approx. 2.5M', 'TP']
  ],
  'timor-leste': [
    ['Dili', 'approx. 0.3M', 'DI'],
    ['Baucau', 'approx. 0.02M', 'BA'],
    ['Maliana', 'approx. 0.02M', 'MA'],
    ['Suai', 'approx. 0.01M', 'SU']
  ],
  turkey: [
    ['Istanbul', 'approx. 16M', 'IS'],
    ['Ankara', 'approx. 5.8M province', 'AN'],
    ['Izmir', 'approx. 4.5M province', 'IZ'],
    ['Bursa', 'approx. 3.2M province', 'BU']
  ],
  yemen: [
    ['Sanaa', 'approx. 3M metro', 'SA'],
    ['Aden', 'approx. 1M', 'AD'],
    ['Taiz', 'approx. 0.7M', 'TA'],
    ['Al Hudaydah', 'approx. 0.6M', 'HU']
  ],
  ireland: [
    ['Dublin', 'approx. 0.6M city / 1.3M county', 'DU'],
    ['Cork', 'approx. 0.2M', 'CK'],
    ['Limerick', 'approx. 0.1M', 'LI'],
    ['Galway', 'approx. 0.1M', 'GA']
  ],
  india: [
    ['Mumbai', 'approx. 12M city / 21M metro', 'MU'],
    ['Delhi', 'approx. 11M city / 33M metro', 'DL'],
    ['Bengaluru', 'approx. 8M city / 14M metro', 'BL'],
    ['Hyderabad', 'approx. 7M city / 11M metro', 'HY']
  ],
  indonesia: [
    ['Jakarta', 'approx. 10M city / 32M metro', 'JK'],
    ['Surabaya', 'approx. 3M', 'SB'],
    ['Bandung', 'approx. 2.5M', 'BD'],
    ['Medan', 'approx. 2.4M', 'MD']
  ],
  israel: [
    ['Jerusalem', 'approx. 1.0M', 'JR'],
    ['Tel Aviv-Yafo', 'approx. 0.5M city / 4M metro', 'TA'],
    ['Haifa', 'approx. 0.3M', 'HF'],
    ['Rishon LeZion', 'approx. 0.3M', 'RL']
  ],
  jordan: [
    ['Amman', 'approx. 4M metro', 'AM'],
    ['Zarqa', 'approx. 1.5M governorate', 'ZA'],
    ['Irbid', 'approx. 0.6M city / 2M governorate', 'IR'],
    ['Aqaba', 'approx. 0.2M', 'AQ']
  ],
  italy: [
    ['Rome', 'approx. 2.8M', 'RM'],
    ['Milan', 'approx. 1.4M', 'MI'],
    ['Naples', 'approx. 0.9M', 'NA'],
    ['Turin', 'approx. 0.8M', 'TO']
  ],
  japan: [
    ['Tokyo', 'approx. 14M prefecture / 37M metro', 'TY'],
    ['Yokohama', 'approx. 3.8M', 'YK'],
    ['Osaka', 'approx. 2.8M city / 19M metro', 'OS'],
    ['Nagoya', 'approx. 2.3M', 'NG']
  ],
  latvia: [
    ['Riga', 'approx. 0.6M', 'RI'],
    ['Daugavpils', 'approx. 0.08M', 'DA'],
    ['Liepaja', 'approx. 0.07M', 'LI'],
    ['Jelgava', 'approx. 0.06M', 'JE']
  ],
  liechtenstein: [
    ['Schaan', 'approx. 0.006M', 'SC'],
    ['Vaduz', 'approx. 0.006M', 'VA'],
    ['Triesen', 'approx. 0.005M', 'TR'],
    ['Balzers', 'approx. 0.005M', 'BA']
  ],
  lithuania: [
    ['Vilnius', 'approx. 0.6M', 'VI'],
    ['Kaunas', 'approx. 0.3M', 'KA'],
    ['Klaipeda', 'approx. 0.2M', 'KL'],
    ['Siauliai', 'approx. 0.1M', 'SI']
  ],
  kuwait: [
    ['Kuwait City', 'approx. 0.1M city / 3M metro', 'KW'],
    ['Al Ahmadi', 'approx. 0.7M governorate', 'AH'],
    ['Hawalli', 'approx. 0.2M', 'HA'],
    ['Salmiya', 'approx. 0.2M', 'SA']
  ],
  kyrgyzstan: [
    ['Bishkek', 'approx. 1.1M', 'BI'],
    ['Osh', 'approx. 0.3M', 'OS'],
    ['Jalal-Abad', 'approx. 0.1M', 'JA'],
    ['Karakol', 'approx. 0.08M', 'KA']
  ],
  laos: [
    ['Vientiane', 'approx. 1M prefecture', 'VI'],
    ['Pakse', 'approx. 0.1M', 'PA'],
    ['Savannakhet', 'approx. 0.1M', 'SA'],
    ['Luang Prabang', 'approx. 0.06M', 'LP']
  ],
  luxembourg: [
    ['Luxembourg City', 'approx. 0.1M', 'LU'],
    ['Esch-sur-Alzette', 'approx. 0.04M', 'ES'],
    ['Differdange', 'approx. 0.03M', 'DI'],
    ['Dudelange', 'approx. 0.02M', 'DU']
  ],
  malaysia: [
    ['Kuala Lumpur', 'approx. 1.9M city / 8M metro', 'KL'],
    ['George Town', 'approx. 0.8M metro', 'GT'],
    ['Johor Bahru', 'approx. 0.9M city / 2M metro', 'JB'],
    ['Ipoh', 'approx. 0.8M', 'IP']
  ],
  malta: [
    ['Birkirkara', 'approx. 0.03M', 'BI'],
    ['Mosta', 'approx. 0.02M', 'MO'],
    ['Sliema', 'approx. 0.02M', 'SL'],
    ['Valletta', 'approx. 0.006M', 'VA']
  ],
  mongolia: [
    ['Ulaanbaatar', 'approx. 1.6M', 'UB'],
    ['Erdenet', 'approx. 0.1M', 'ER'],
    ['Darkhan', 'approx. 0.08M', 'DA'],
    ['Choibalsan', 'approx. 0.04M', 'CH']
  ],
  moldova: [
    ['Chisinau', 'approx. 0.7M municipality', 'CH'],
    ['Balti', 'approx. 0.1M', 'BA'],
    ['Tiraspol', 'approx. 0.1M', 'TI'],
    ['Bender', 'approx. 0.09M', 'BD']
  ],
  monaco: [
    ['Monte Carlo', 'approx. 0.02M quarter', 'MC'],
    ['La Condamine', 'approx. 0.01M quarter', 'LC'],
    ['Fontvieille', 'approx. 0.004M quarter', 'FV'],
    ['Monaco-Ville', 'approx. 0.001M quarter', 'MV']
  ],
  montenegro: [
    ['Podgorica', 'approx. 0.2M', 'PG'],
    ['Niksic', 'approx. 0.06M', 'NK'],
    ['Herceg Novi', 'approx. 0.03M', 'HN'],
    ['Pljevlja', 'approx. 0.03M', 'PV']
  ],
  netherlands: [
    ['Amsterdam', 'approx. 0.9M', 'AM'],
    ['Rotterdam', 'approx. 0.7M', 'RT'],
    ['The Hague', 'approx. 0.6M', 'DH'],
    ['Utrecht', 'approx. 0.4M', 'UT']
  ],
  'north-macedonia': [
    ['Skopje', 'approx. 0.5M', 'SK'],
    ['Bitola', 'approx. 0.07M', 'BI'],
    ['Kumanovo', 'approx. 0.07M', 'KU'],
    ['Prilep', 'approx. 0.06M', 'PR']
  ],
  norway: [
    ['Oslo', 'approx. 0.7M', 'OS'],
    ['Bergen', 'approx. 0.3M', 'BE'],
    ['Trondheim', 'approx. 0.2M', 'TR'],
    ['Stavanger', 'approx. 0.1M', 'ST']
  ],
  myanmar: [
    ['Yangon', 'approx. 5M metro', 'YA'],
    ['Mandalay', 'approx. 1.5M', 'MD'],
    ['Naypyidaw', 'approx. 1M union territory', 'NP'],
    ['Mawlamyine', 'approx. 0.3M', 'MW']
  ],
  nepal: [
    ['Kathmandu', 'approx. 1M city / 3M valley', 'KT'],
    ['Pokhara', 'approx. 0.5M', 'PK'],
    ['Lalitpur', 'approx. 0.3M', 'LP'],
    ['Biratnagar', 'approx. 0.25M', 'BI']
  ],
  oman: [
    ['Muscat', 'approx. 1.5M governorate', 'MU'],
    ['Seeb', 'approx. 0.5M', 'SE'],
    ['Salalah', 'approx. 0.3M', 'SL'],
    ['Sohar', 'approx. 0.2M', 'SO']
  ],
  paraguay: [
    ['Asuncion', 'approx. 0.5M city / 2.8M metro', 'AS'],
    ['Ciudad del Este', 'approx. 0.3M', 'CE'],
    ['San Lorenzo', 'approx. 0.3M', 'SL'],
    ['Luque', 'approx. 0.3M', 'LU']
  ],
  pakistan: [
    ['Karachi', 'approx. 15M city / 20M metro', 'KA'],
    ['Lahore', 'approx. 13M', 'LA'],
    ['Faisalabad', 'approx. 3.8M', 'FA'],
    ['Rawalpindi', 'approx. 2.3M', 'RA']
  ],
  peru: [
    ['Lima', 'approx. 10M metro', 'LI'],
    ['Arequipa', 'approx. 1.1M metro', 'AQ'],
    ['Trujillo', 'approx. 1.0M metro', 'TR'],
    ['Chiclayo', 'approx. 0.6M metro', 'CH']
  ],
  philippines: [
    ['Quezon City', 'approx. 3M', 'QC'],
    ['Manila', 'approx. 1.8M city / 14M metro', 'MN'],
    ['Davao City', 'approx. 1.8M', 'DV'],
    ['Caloocan', 'approx. 1.7M', 'CA']
  ],
  poland: [
    ['Warsaw', 'approx. 1.9M', 'WA'],
    ['Krakow', 'approx. 0.8M', 'KR'],
    ['Wroclaw', 'approx. 0.7M', 'WR'],
    ['Lodz', 'approx. 0.7M', 'LD']
  ],
  portugal: [
    ['Lisbon', 'approx. 0.5M city / 2.9M metro', 'LX'],
    ['Porto', 'approx. 0.2M city / 1.7M metro', 'PT'],
    ['Vila Nova de Gaia', 'approx. 0.3M', 'VG'],
    ['Amadora', 'approx. 0.2M', 'AM']
  ],
  qatar: [
    ['Doha', 'approx. 1M city / 2.4M metro', 'DO'],
    ['Al Rayyan', 'approx. 0.6M municipality', 'AR'],
    ['Al Wakrah', 'approx. 0.3M municipality', 'AW'],
    ['Umm Salal', 'approx. 0.1M municipality', 'US']
  ],
  romania: [
    ['Bucharest', 'approx. 1.7M', 'BU'],
    ['Cluj-Napoca', 'approx. 0.3M', 'CJ'],
    ['Timisoara', 'approx. 0.3M', 'TM'],
    ['Iasi', 'approx. 0.3M', 'IS']
  ],
  'san-marino': [
    ['Serravalle', 'approx. 0.01M', 'SE'],
    ['Borgo Maggiore', 'approx. 0.007M', 'BM'],
    ['City of San Marino', 'approx. 0.004M', 'SM'],
    ['Domagnano', 'approx. 0.004M', 'DO']
  ],
  'saudi-arabia': [
    ['Riyadh', 'approx. 7.7M metro', 'RI'],
    ['Jeddah', 'approx. 4.8M metro', 'JE'],
    ['Mecca', 'approx. 2.4M', 'MK'],
    ['Medina', 'approx. 1.5M', 'MD']
  ],
  serbia: [
    ['Belgrade', 'approx. 1.4M city / 1.7M metro', 'BG'],
    ['Novi Sad', 'approx. 0.3M', 'NS'],
    ['Nis', 'approx. 0.2M', 'NI'],
    ['Kragujevac', 'approx. 0.2M', 'KG']
  ],
  singapore: [
    ['Central Area', 'approx. 0.09M planning area', 'CA'],
    ['Tampines', 'approx. 0.25M planning area', 'TP'],
    ['Jurong West', 'approx. 0.27M planning area', 'JW'],
    ['Woodlands', 'approx. 0.26M planning area', 'WL']
  ],
  slovakia: [
    ['Bratislava', 'approx. 0.5M', 'BA'],
    ['Kosice', 'approx. 0.2M', 'KE'],
    ['Presov', 'approx. 0.08M', 'PO'],
    ['Zilina', 'approx. 0.08M', 'ZA']
  ],
  slovenia: [
    ['Ljubljana', 'approx. 0.3M', 'LJ'],
    ['Maribor', 'approx. 0.1M', 'MB'],
    ['Celje', 'approx. 0.04M', 'CE'],
    ['Kranj', 'approx. 0.04M', 'KR']
  ],
  spain: [
    ['Madrid', 'approx. 3.3M', 'MD'],
    ['Barcelona', 'approx. 1.7M', 'BC'],
    ['Valencia', 'approx. 0.8M', 'VA'],
    ['Seville', 'approx. 0.7M', 'SV']
  ],
  'sri-lanka': [
    ['Colombo', 'approx. 0.7M city / 5.6M metro', 'CO'],
    ['Dehiwala-Mount Lavinia', 'approx. 0.2M', 'DM'],
    ['Moratuwa', 'approx. 0.2M', 'MO'],
    ['Kandy', 'approx. 0.1M city / 1.5M district', 'KA']
  ],
  'south-korea': [
    ['Seoul', 'approx. 9.4M city / 26M metro', 'SE'],
    ['Busan', 'approx. 3.3M', 'BU'],
    ['Incheon', 'approx. 3.0M', 'IC'],
    ['Daegu', 'approx. 2.4M', 'DG']
  ],
  suriname: [
    ['Paramaribo', 'approx. 0.2M', 'PA'],
    ['Lelydorp', 'approx. 0.02M', 'LE'],
    ['Nieuw Nickerie', 'approx. 0.01M', 'NN'],
    ['Moengo', 'approx. 0.01M', 'MO']
  ],
  thailand: [
    ['Bangkok', 'approx. 5.5M city / 11M metro', 'BK'],
    ['Nonthaburi', 'approx. 0.25M', 'NB'],
    ['Nakhon Ratchasima', 'approx. 0.13M city / 2.6M province', 'NR'],
    ['Chiang Mai', 'approx. 0.13M city / 1.2M metro', 'CM']
  ],
  sweden: [
    ['Stockholm', 'approx. 1.0M municipality / 1.7M urban', 'ST'],
    ['Gothenburg', 'approx. 0.6M', 'GB'],
    ['Malmo', 'approx. 0.4M', 'MA'],
    ['Uppsala', 'approx. 0.2M', 'UP']
  ],
  switzerland: [
    ['Zurich', 'approx. 0.4M', 'ZH'],
    ['Geneva', 'approx. 0.2M', 'GE'],
    ['Basel', 'approx. 0.2M', 'BS'],
    ['Bern', 'approx. 0.1M', 'BE']
  ],
  tajikistan: [
    ['Dushanbe', 'approx. 1M', 'DU'],
    ['Khujand', 'approx. 0.2M', 'KH'],
    ['Kulob', 'approx. 0.1M', 'KU'],
    ['Bokhtar', 'approx. 0.1M', 'BO']
  ],
  turkmenistan: [
    ['Ashgabat', 'approx. 1M', 'AS'],
    ['Turkmenabat', 'approx. 0.3M', 'TB'],
    ['Dasoguz', 'approx. 0.2M', 'DZ'],
    ['Mary', 'approx. 0.2M', 'MR']
  ],
  ukraine: [
    ['Kyiv', 'approx. 3.0M', 'KY'],
    ['Kharkiv', 'approx. 1.4M pre-war', 'KH'],
    ['Odesa', 'approx. 1.0M', 'OD'],
    ['Dnipro', 'approx. 1.0M', 'DN']
  ],
  'united-kingdom': [
    ['London', 'approx. 9.0M', 'LN'],
    ['Birmingham', 'approx. 1.1M', 'BI'],
    ['Leeds', 'approx. 0.8M', 'LE'],
    ['Glasgow', 'approx. 0.6M', 'GL']
  ],
  'united-arab-emirates': [
    ['Dubai', 'approx. 3.7M emirate', 'DU'],
    ['Abu Dhabi', 'approx. 1.6M city / emirate hub', 'AD'],
    ['Sharjah', 'approx. 1.3M', 'SH'],
    ['Al Ain', 'approx. 0.8M', 'AA']
  ],
  uruguay: [
    ['Montevideo', 'approx. 1.3M', 'MV'],
    ['Salto', 'approx. 0.1M', 'SA'],
    ['Ciudad de la Costa', 'approx. 0.1M', 'CC'],
    ['Paysandu', 'approx. 0.08M', 'PY']
  ],
  uzbekistan: [
    ['Tashkent', 'approx. 3M', 'TA'],
    ['Samarkand', 'approx. 0.6M', 'SA'],
    ['Namangan', 'approx. 0.6M', 'NA'],
    ['Andijan', 'approx. 0.5M', 'AN']
  ],
  vietnam: [
    ['Ho Chi Minh City', 'approx. 9M city / 22M metro region', 'HC'],
    ['Hanoi', 'approx. 8.5M municipality', 'HN'],
    ['Hai Phong', 'approx. 2M', 'HP'],
    ['Da Nang', 'approx. 1.2M', 'DN']
  ],
  'vatican-city': [
    ['Vatican City', 'approx. 0.0008M', 'VA'],
    ['St. Peter area', 'microstate district', 'SP'],
    ['Vatican Museums area', 'microstate district', 'VM'],
    ['Gardens area', 'microstate district', 'VG']
  ],
  venezuela: [
    ['Caracas', 'approx. 2.9M metro', 'CA'],
    ['Maracaibo', 'approx. 1.7M metro', 'MA'],
    ['Valencia', 'approx. 1.5M metro', 'VA'],
    ['Barquisimeto', 'approx. 1.0M metro', 'BQ']
  ],
  algeria: [
    ['Algiers', 'approx. population varies by source', 'A'],
    ['Oran', 'approx. population varies by source', 'O'],
    ['Constantine', 'approx. population varies by source', 'C'],
    ['Annaba', 'approx. population varies by source', 'A']
  ],
  angola: [
    ['Luanda', 'approx. population varies by source', 'L'],
    ['Huambo', 'approx. population varies by source', 'H'],
    ['Lobito', 'approx. population varies by source', 'L'],
    ['Benguela', 'approx. population varies by source', 'B']
  ],
  benin: [
    ['Cotonou', 'approx. population varies by source', 'C'],
    ['Porto-Novo', 'approx. population varies by source', 'PN'],
    ['Parakou', 'approx. population varies by source', 'P'],
    ['Abomey-Calavi', 'approx. population varies by source', 'AC']
  ],
  botswana: [
    ['Gaborone', 'approx. population varies by source', 'G'],
    ['Francistown', 'approx. population varies by source', 'F'],
    ['Molepolole', 'approx. population varies by source', 'M'],
    ['Maun', 'approx. population varies by source', 'M']
  ],
  'burkina-faso': [
    ['Ouagadougou', 'approx. population varies by source', 'O'],
    ['Bobo-Dioulasso', 'approx. population varies by source', 'BD'],
    ['Koudougou', 'approx. population varies by source', 'K'],
    ['Ouahigouya', 'approx. population varies by source', 'O']
  ],
  burundi: [
    ['Bujumbura', 'approx. population varies by source', 'B'],
    ['Gitega', 'approx. population varies by source', 'G'],
    ['Ngozi', 'approx. population varies by source', 'N'],
    ['Rumonge', 'approx. population varies by source', 'R']
  ],
  'cabo-verde': [
    ['Praia', 'approx. population varies by source', 'P'],
    ['Mindelo', 'approx. population varies by source', 'M'],
    ['Santa Maria', 'approx. population varies by source', 'S'],
    ['Assomada', 'approx. population varies by source', 'A']
  ],
  cameroon: [
    ['Douala', 'approx. population varies by source', 'D'],
    ['Yaounde', 'approx. population varies by source', 'Y'],
    ['Garoua', 'approx. population varies by source', 'G'],
    ['Bamenda', 'approx. population varies by source', 'B']
  ],
  'central-african-republic': [
    ['Bangui', 'approx. population varies by source', 'B'],
    ['Bimbo', 'approx. population varies by source', 'B'],
    ['Berberati', 'approx. population varies by source', 'B'],
    ['Carnot', 'approx. population varies by source', 'C']
  ],
  chad: [
    ['NDjamena', 'approx. population varies by source', 'N'],
    ['Moundou', 'approx. population varies by source', 'M'],
    ['Abeche', 'approx. population varies by source', 'A'],
    ['Sarh', 'approx. population varies by source', 'S']
  ],
  comoros: [
    ['Moroni', 'approx. population varies by source', 'M'],
    ['Mutsamudu', 'approx. population varies by source', 'M'],
    ['Fomboni', 'approx. population varies by source', 'F'],
    ['Domoni', 'approx. population varies by source', 'D']
  ],
  congo: [
    ['Brazzaville', 'approx. population varies by source', 'B'],
    ['Pointe-Noire', 'approx. population varies by source', 'PN'],
    ['Dolisie', 'approx. population varies by source', 'D'],
    ['Nkayi', 'approx. population varies by source', 'N']
  ],
  'cote-d-ivoire': [
    ['Abidjan', 'approx. population varies by source', 'A'],
    ['Bouake', 'approx. population varies by source', 'B'],
    ['Yamoussoukro', 'approx. population varies by source', 'Y'],
    ['Daloa', 'approx. population varies by source', 'D']
  ],
  'democratic-republic-of-the-congo': [
    ['Kinshasa', 'approx. population varies by source', 'K'],
    ['Lubumbashi', 'approx. population varies by source', 'L'],
    ['Mbuji-Mayi', 'approx. population varies by source', 'MM'],
    ['Kisangani', 'approx. population varies by source', 'K']
  ],
  djibouti: [
    ['Djibouti', 'approx. population varies by source', 'D'],
    ['Ali Sabieh', 'approx. population varies by source', 'A'],
    ['Tadjoura', 'approx. population varies by source', 'T'],
    ['Obock', 'approx. population varies by source', 'O']
  ],
  egypt: [
    ['Cairo', 'approx. population varies by source', 'C'],
    ['Alexandria', 'approx. population varies by source', 'A'],
    ['Giza', 'approx. population varies by source', 'G'],
    ['Shubra El Kheima', 'approx. population varies by source', 'S']
  ],
  'equatorial-guinea': [
    ['Bata', 'approx. population varies by source', 'B'],
    ['Malabo', 'approx. population varies by source', 'M'],
    ['Ebebiyin', 'approx. population varies by source', 'E'],
    ['Aconibe', 'approx. population varies by source', 'A']
  ],
  eritrea: [
    ['Asmara', 'approx. population varies by source', 'A'],
    ['Keren', 'approx. population varies by source', 'K'],
    ['Massawa', 'approx. population varies by source', 'M'],
    ['Assab', 'approx. population varies by source', 'A']
  ],
  eswatini: [
    ['Manzini', 'approx. population varies by source', 'M'],
    ['Mbabane', 'approx. population varies by source', 'M'],
    ['Big Bend', 'approx. population varies by source', 'B'],
    ['Malkerns', 'approx. population varies by source', 'M']
  ],
  ethiopia: [
    ['Addis Ababa', 'approx. population varies by source', 'A'],
    ['Dire Dawa', 'approx. population varies by source', 'D'],
    ['Mekelle', 'approx. population varies by source', 'M'],
    ['Gondar', 'approx. population varies by source', 'G']
  ],
  gabon: [
    ['Libreville', 'approx. population varies by source', 'L'],
    ['Port-Gentil', 'approx. population varies by source', 'PG'],
    ['Franceville', 'approx. population varies by source', 'F'],
    ['Oyem', 'approx. population varies by source', 'O']
  ],
  gambia: [
    ['Serekunda', 'approx. population varies by source', 'S'],
    ['Brikama', 'approx. population varies by source', 'B'],
    ['Bakau', 'approx. population varies by source', 'B'],
    ['Banjul', 'approx. population varies by source', 'B']
  ],
  ghana: [
    ['Accra', 'approx. population varies by source', 'A'],
    ['Kumasi', 'approx. population varies by source', 'K'],
    ['Tamale', 'approx. population varies by source', 'T'],
    ['Sekondi-Takoradi', 'approx. population varies by source', 'ST']
  ],
  guinea: [
    ['Conakry', 'approx. population varies by source', 'C'],
    ['Nzerekore', 'approx. population varies by source', 'N'],
    ['Kankan', 'approx. population varies by source', 'K'],
    ['Kindia', 'approx. population varies by source', 'K']
  ],
  'guinea-bissau': [
    ['Bissau', 'approx. population varies by source', 'B'],
    ['Bafata', 'approx. population varies by source', 'B'],
    ['Gabu', 'approx. population varies by source', 'G'],
    ['Bissora', 'approx. population varies by source', 'B']
  ],
  kenya: [
    ['Nairobi', 'approx. population varies by source', 'N'],
    ['Mombasa', 'approx. population varies by source', 'M'],
    ['Kisumu', 'approx. population varies by source', 'K'],
    ['Nakuru', 'approx. population varies by source', 'N']
  ],
  lesotho: [
    ['Maseru', 'approx. population varies by source', 'M'],
    ['Teyateyaneng', 'approx. population varies by source', 'T'],
    ['Mafeteng', 'approx. population varies by source', 'M'],
    ['Hlotse', 'approx. population varies by source', 'H']
  ],
  liberia: [
    ['Monrovia', 'approx. population varies by source', 'M'],
    ['Gbarnga', 'approx. population varies by source', 'G'],
    ['Buchanan', 'approx. population varies by source', 'B'],
    ['Ganta', 'approx. population varies by source', 'G']
  ],
  libya: [
    ['Tripoli', 'approx. population varies by source', 'T'],
    ['Benghazi', 'approx. population varies by source', 'B'],
    ['Misrata', 'approx. population varies by source', 'M'],
    ['Bayda', 'approx. population varies by source', 'B']
  ],
  madagascar: [
    ['Antananarivo', 'approx. population varies by source', 'A'],
    ['Toamasina', 'approx. population varies by source', 'T'],
    ['Antsirabe', 'approx. population varies by source', 'A'],
    ['Fianarantsoa', 'approx. population varies by source', 'F']
  ],
  malawi: [
    ['Lilongwe', 'approx. population varies by source', 'L'],
    ['Blantyre', 'approx. population varies by source', 'B'],
    ['Mzuzu', 'approx. population varies by source', 'M'],
    ['Zomba', 'approx. population varies by source', 'Z']
  ],
  mali: [
    ['Bamako', 'approx. population varies by source', 'B'],
    ['Sikasso', 'approx. population varies by source', 'S'],
    ['Mopti', 'approx. population varies by source', 'M'],
    ['Segou', 'approx. population varies by source', 'S']
  ],
  mauritania: [
    ['Nouakchott', 'approx. population varies by source', 'N'],
    ['Nouadhibou', 'approx. population varies by source', 'N'],
    ['Kiffa', 'approx. population varies by source', 'K'],
    ['Kaedi', 'approx. population varies by source', 'K']
  ],
  mauritius: [
    ['Port Louis', 'approx. population varies by source', 'P'],
    ['Beau Bassin-Rose Hill', 'approx. population varies by source', 'BR'],
    ['Vacoas-Phoenix', 'approx. population varies by source', 'VP'],
    ['Curepipe', 'approx. population varies by source', 'C']
  ],
  morocco: [
    ['Casablanca', 'approx. population varies by source', 'C'],
    ['Fez', 'approx. population varies by source', 'F'],
    ['Tangier', 'approx. population varies by source', 'T'],
    ['Marrakesh', 'approx. population varies by source', 'M']
  ],
  mozambique: [
    ['Maputo', 'approx. population varies by source', 'M'],
    ['Matola', 'approx. population varies by source', 'M'],
    ['Nampula', 'approx. population varies by source', 'N'],
    ['Beira', 'approx. population varies by source', 'B']
  ],
  namibia: [
    ['Windhoek', 'approx. population varies by source', 'W'],
    ['Walvis Bay', 'approx. population varies by source', 'W'],
    ['Swakopmund', 'approx. population varies by source', 'S'],
    ['Rundu', 'approx. population varies by source', 'R']
  ],
  niger: [
    ['Niamey', 'approx. population varies by source', 'N'],
    ['Zinder', 'approx. population varies by source', 'Z'],
    ['Maradi', 'approx. population varies by source', 'M'],
    ['Agadez', 'approx. population varies by source', 'A']
  ],
  nigeria: [
    ['Lagos', 'approx. population varies by source', 'L'],
    ['Kano', 'approx. population varies by source', 'K'],
    ['Ibadan', 'approx. population varies by source', 'I'],
    ['Abuja', 'approx. population varies by source', 'A']
  ],
  rwanda: [
    ['Kigali', 'approx. population varies by source', 'K'],
    ['Butare', 'approx. population varies by source', 'B'],
    ['Gitarama', 'approx. population varies by source', 'G'],
    ['Ruhengeri', 'approx. population varies by source', 'R']
  ],
  'sao-tome-and-principe': [
    ['Sao Tome', 'approx. population varies by source', 'S'],
    ['Santo Antonio', 'approx. population varies by source', 'S'],
    ['Neves', 'approx. population varies by source', 'N'],
    ['Trindade', 'approx. population varies by source', 'T']
  ],
  senegal: [
    ['Dakar', 'approx. population varies by source', 'D'],
    ['Touba', 'approx. population varies by source', 'T'],
    ['Thies', 'approx. population varies by source', 'T'],
    ['Kaolack', 'approx. population varies by source', 'K']
  ],
  seychelles: [
    ['Victoria', 'approx. population varies by source', 'V'],
    ['Anse Boileau', 'approx. population varies by source', 'A'],
    ['Beau Vallon', 'approx. population varies by source', 'B'],
    ['Takamaka', 'approx. population varies by source', 'T']
  ],
  'sierra-leone': [
    ['Freetown', 'approx. population varies by source', 'F'],
    ['Bo', 'approx. population varies by source', 'B'],
    ['Kenema', 'approx. population varies by source', 'K'],
    ['Makeni', 'approx. population varies by source', 'M']
  ],
  somalia: [
    ['Mogadishu', 'approx. population varies by source', 'M'],
    ['Hargeisa', 'approx. population varies by source', 'H'],
    ['Bosaso', 'approx. population varies by source', 'B'],
    ['Kismayo', 'approx. population varies by source', 'K']
  ],
  'south-africa': [
    ['Johannesburg', 'approx. population varies by source', 'J'],
    ['Cape Town', 'approx. population varies by source', 'C'],
    ['Durban', 'approx. population varies by source', 'D'],
    ['Pretoria', 'approx. population varies by source', 'P']
  ],
  'south-sudan': [
    ['Juba', 'approx. population varies by source', 'J'],
    ['Malakal', 'approx. population varies by source', 'M'],
    ['Wau', 'approx. population varies by source', 'W'],
    ['Yei', 'approx. population varies by source', 'Y']
  ],
  sudan: [
    ['Khartoum', 'approx. population varies by source', 'K'],
    ['Omdurman', 'approx. population varies by source', 'O'],
    ['Port Sudan', 'approx. population varies by source', 'P'],
    ['Nyala', 'approx. population varies by source', 'N']
  ],
  tanzania: [
    ['Dar es Salaam', 'approx. population varies by source', 'D'],
    ['Mwanza', 'approx. population varies by source', 'M'],
    ['Dodoma', 'approx. population varies by source', 'D'],
    ['Arusha', 'approx. population varies by source', 'A']
  ],
  togo: [
    ['Lome', 'approx. population varies by source', 'L'],
    ['Sokode', 'approx. population varies by source', 'S'],
    ['Kara', 'approx. population varies by source', 'K'],
    ['Kpalime', 'approx. population varies by source', 'K']
  ],
  tunisia: [
    ['Tunis', 'approx. population varies by source', 'T'],
    ['Sfax', 'approx. population varies by source', 'S'],
    ['Sousse', 'approx. population varies by source', 'S'],
    ['Kairouan', 'approx. population varies by source', 'K']
  ],
  uganda: [
    ['Kampala', 'approx. population varies by source', 'K'],
    ['Nansana', 'approx. population varies by source', 'N'],
    ['Kira', 'approx. population varies by source', 'K'],
    ['Mbarara', 'approx. population varies by source', 'M']
  ],
  zambia: [
    ['Lusaka', 'approx. population varies by source', 'L'],
    ['Ndola', 'approx. population varies by source', 'N'],
    ['Kitwe', 'approx. population varies by source', 'K'],
    ['Livingstone', 'approx. population varies by source', 'L']
  ],
  zimbabwe: [
    ['Harare', 'approx. population varies by source', 'H'],
    ['Bulawayo', 'approx. population varies by source', 'B'],
    ['Chitungwiza', 'approx. population varies by source', 'C'],
    ['Mutare', 'approx. population varies by source', 'M']
  ]
};

function renderCityShield(initials) {
  return `<span class="vh-country-city-shield" aria-hidden="true">${escapeHtml(initials)}</span>`;
}

function renderCityChip(city) {
  const [name, population, initials] = city;
  return `
    <li>
      ${renderCityShield(initials)}
      <span>${escapeHtml(name)} <small>(${escapeHtml(population)})</small></span>
    </li>
  `;
}

export function renderCountryCivicSnapshot(model) {
  const cities = CIVIC_CITY_PROFILES[model.slug] || [[model.capital, 'population varies by source', model.iso2 || 'CT']];
  const civicItems = [
    { label: 'Flag', value: `${model.flag} ${model.displayName}`, hint: 'country marker' },
    { label: 'Official languages', value: model.languages, hint: 'state language profile' },
    { label: 'Capital', value: model.capital, hint: 'seat of government' }
  ].filter(item => item.value);

  const factsHtml = civicItems.map(item => `
    <article class="vh-country-civic-fact">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <small>${escapeHtml(item.hint)}</small>
    </article>
  `).join('\n');

  const content = `
    <div class="vh-country-civic-layout vh-country-civic-layout--full-cities">
      <div class="vh-country-civic-facts">
        ${factsHtml}
      </div>
      <div class="vh-country-city-panel">
        <div class="vh-flex vh-align-center vh-justify-between vh-gap-sm">
          <h3>Main cities</h3>
          <span class="vh-country-status-badge vh-custom-badge">approx.</span>
        </div>
        <ul>
          ${cities.map(renderCityChip).join('\n')}
        </ul>
      </div>
    </div>
  `;

  const html = `
    <section class="vh-country-section vh-country-civic-snapshot vh-country-${model.slug} vh-country-theme--${model.slug}" ${countryThemeStyleAttr(model)}>
      <div class="section-heading">
        <span class="vh-eyebrow">Country Snapshot</span>
        <h2>${escapeHtml(model.displayName)} civic profile</h2>
        <p>Quick national context for forms, onboarding flows, locale defaults, and developer fixtures.</p>
      </div>
      <div class="vh-section-content">
        ${content}
      </div>
    </section>
  `;
  return cleanHtml(html);
}

function createInfoCard(title, text, icon = null, status = null, related = [], href = null, disabled = false) {
  const tag = href ? 'a' : 'article';
  const hrefAttr = href ? `href="${href}"` : '';
  const disabledClass = disabled ? 'is-disabled' : '';
  const linkClass = href ? 'is-linked' : 'is-reference';
  
  const statusBadge = status 
    ? `<span class="vh-country-status-badge vh-country-status-${status.toLowerCase() === 'ready' ? 'ready' : (status.toLowerCase() === 'available' ? 'ready' : 'in-progress')}">${escapeHtml(status)}</span>`
    : '';

  const iconText = icon ? String(icon) : '';
  const iconClass = iconText && /^[A-Za-z0-9+./-]{2,8}$/.test(iconText) ? ' vh-country-card-icon-text' : '';
  const iconBlock = icon ? `<span class="vh-country-card-icon${iconClass}" aria-hidden="true">${escapeHtml(icon)}</span>` : '';
  
  const relatedChips = related.length > 0
    ? `<div class="vh-country-badge-row">${related.map(r => `<span class="vh-country-status-badge vh-custom-badge">${escapeHtml(r)}</span>`).join('')}</div>`
    : '';

  const html = `
    <${tag} class="vh-country-info-card ${disabledClass} ${linkClass}" ${hrefAttr}>
      <div class="vh-flex vh-align-center vh-justify-between vh-gap-sm">
        <div class="vh-flex vh-align-center vh-gap-xs">
          ${iconBlock}
          <h3>${escapeHtml(title)}</h3>
        </div>
        ${statusBadge}
      </div>
      <p class="vh-mt-xs vh-mb-xs">${escapeHtml(text)}</p>
      ${relatedChips}
    </${tag}>
  `;
  return html;
}

function getCountryValidatorRoutes(model, routeRegistry) {
  if (!routeRegistry) return [];
  return routeRegistry.getAll()
    .filter(r => r.type === 'validator' && r.path.startsWith(`/en/${model.slug}/`))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
}

function routeSlug(route) {
  return route.path.split('/').filter(Boolean).at(-1) || '';
}

const COUNTRY_FLAGS = {
  brazil: '🇧🇷',
  br: '🇧🇷',
  germany: '🇩🇪',
  de: '🇩🇪',
  netherlands: '🇳🇱',
  nl: '🇳🇱',
  poland: '🇵🇱',
  pl: '🇵🇱',
  spain: '🇪🇸',
  es: '🇪🇸'
};

function getCountryFlag(value) {
  const key = String(value || '').toLowerCase().trim();
  return COUNTRY_FLAGS[key] || COUNTRY_FLAGS[key.replace(/\s+/g, '-')] || '🏳';
}

const POLAND_ROUTE_IDENTITIES = {
  'pesel-validator': 'PESEL',
  'poland-nip-validator': 'NIP',
  'poland-regon-validator': 'REGON',
  'poland-iban-nrb-validator': 'IBAN',
  'poland-vat-validator': 'VAT',
  'poland-krs-inspector': 'KRS',
  'poland-postal-code-validator': 'POST',
  'poland-phone-number-validator': '+48',
  'poland-blik-code-helper': 'BLIK',
  'poland-ksef-invoice-xml-validator': 'KSeF',
  'poland-bdo-number-inspector': 'BDO',
  'poland-driving-licence-inspector': 'DL',
  'poland-eori-inspector': 'EORI',
  'poland-id-card-validator': 'ID',
  'poland-license-plate-inspector': 'PLATE',
  'poland-mrz-passport-id-parser': 'MRZ',
  'poland-municipality-code-inspector': 'TERYT',
  'poland-passport-number-inspector': 'PASS',
  'poland-vehicle-registration-certificate-helper': 'VRC',
  'poland-teryt-code-inspector': 'TERYT',
  'poland-teryt-hierarchy-explorer': 'TERYT',
  'poland-vin-validator': 'VIN',
  'poland-ceidg-readiness-checker': 'CEIDG',
  'poland-jpk-file-validator': 'JPK',
  'poland-pkd-code-inspector': 'PKD',
  'poland-pkwiu-code-inspector': 'PKWiU',
  'poland-company-onboarding-auditor': 'KYC',
  'poland-invoice-data-auditor': 'INV',
  'poland-invoice-duplicate-risk-detector': 'DUP',
  'poland-invoice-number-helper': 'INV',
  'poland-ksef-fa2-field-mapper-assistant': 'FA(2)',
  'poland-receipt-paragon-helper': 'PAR',
  'poland-tax-microaccount-calculator': 'TAX',
  'poland-vat-calculator': 'VAT',
  'poland-pln-amount-formatter': 'PLN',
  'poland-grosz-converter': 'gr',
  'poland-bank-code-inspector': 'BANK',
  'poland-bank-statement-parser': 'STMT',
  'poland-bank-transfer-reconciliation-helper': 'RECON',
  'poland-swift-bic-inspector': 'BIC',
  'poland-iban-owner-name-precheck': 'IBAN',
  'poland-payment-qr-generator': 'QR',
  'poland-sepa-transfer-helper': 'SEPA',
  'poland-split-payment-helper': 'MPP',
  'poland-transfer-title-builder': 'TITLE',
  'poland-address-formatter': 'ADDR',
  'poland-address-transliteration-normalizer': 'ASCII',
  'poland-date-locale-formatter': 'DATE',
  'poland-parcel-tracking-inspector': 'PKG',
  'poland-postal-address-parser-pro': 'ADDR',
  'poland-data-quality-workbench': 'DQ',
  'poland-pii-masker': 'PII',
  'poland-test-data-generator': 'TEST',
  'poland-compliance-checklist-generator': 'CHECK',
  'poland-energy-meter-ppe-inspector': 'PPE',
  'poland-insurance-policy-number-helper': 'POLICY',
  'poland-ocr-postprocessing-fixer': 'OCR',
  'poland-payroll-net-gross-sanity-helper': 'PAY',
  'poland-upo-edeklaracje-payload-checker': 'UPO',
  'poland-vies-readiness-helper': 'VIES'
};

function acronymFromText(value, fallback = 'ID') {
  const words = String(value || '')
    .replace(/[^A-Za-z0-9+ ]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return fallback;
  const joined = words.join('');
  if (joined.length <= 6) return joined;
  return words.slice(0, 4).map(word => word[0]).join('').toUpperCase() || fallback;
}

const BRAZIL_ROUTE_IDENTITIES = {
  "brazil-pix-validator": "PIX",
  "brazil-cpf-validator": "CPF",
  "brazil-cnpj-validator": "CNPJ",
  "brazil-rg-inspector": "RG",
  "brazil-cnh-validator": "CNH",
  "brazil-renach-inspector": "RENACH",
  "brazil-renavam-validator": "RENAVAM",
  "brazil-license-plate-validator": "PLATE",
  "brazil-titulo-eleitor-validator": "TSE",
  "brazil-nis-pis-pasep-validator": "NIS",
  "brazil-sus-card-validator": "SUS",
  "brazil-passport-number-helper": "PASS",
  "brazil-state-registration-ie-validator": "IE",
  "brazil-municipal-registration-im-helper": "IM",
  "brazil-cnae-code-inspector": "CNAE",
  "brazil-natureza-juridica-code-inspector": "NJ",
  "brazil-ibge-municipality-code-inspector": "IBGE",
  "brazil-nfe-access-key-validator": "NF-e",
  "brazil-nfce-access-key-validator": "NFC-e",
  "brazil-cte-access-key-validator": "CT-e",
  "brazil-mdfe-access-key-validator": "MDF-e",
  "brazil-nfe-xml-readiness-checker": "XML",
  "brazil-nfse-number-helper": "NFS-e",
  "brazil-sped-efd-icms-ipi-checker": "SPED",
  "brazil-sped-efd-contribuicoes-checker": "EFD",
  "brazil-esocial-event-id-inspector": "eSocial",
  "brazil-reinf-event-id-inspector": "Reinf",
  "brazil-simples-nacional-das-helper": "DAS",
  "brazil-darf-code-helper": "DARF",
  "brazil-gnre-guide-helper": "GNRE",
  "brazil-sat-cfe-key-inspector": "CF-e",
  "brazil-pix-copy-paste-decoder": "PIX",
  "brazil-pix-qr-payload-generator": "QR",
  "brazil-boleto-barcode-validator": "BOLETO",
  "brazil-linha-digitavel-validator": "LD",
  "brazil-boleto-due-date-factor": "DUE",
  "brazil-compe-bank-code-inspector": "COMPE",
  "brazil-ispb-code-inspector": "ISPB",
  "brazil-agencia-conta-masker": "AG",
  "brazil-brl-centavos-converter": "BRL",
  "brazil-ted-doc-transfer-helper": "TED",
  "brazil-cnab240-file-inspector": "240",
  "brazil-cnab400-file-inspector": "400",
  "brazil-open-finance-consent-helper": "OF",
  "brazil-cep-validator": "CEP",
  "brazil-address-formatter": "ADDR",
  "brazil-uf-state-code-inspector": "UF",
  "brazil-ddd-phone-validator": "DDD",
  "brazil-phone-e164-formatter": "+55",
  "brazil-date-locale-formatter": "DATE",
  "brazil-address-transliteration-normalizer": "ASCII",
  "brazil-pii-masker": "PII",
  "brazil-test-data-generator": "TEST",
  "brazil-data-quality-workbench": "DQ",
  "brazil-lgpd-redaction-helper": "LGPD",
  "brazil-company-onboarding-auditor": "KYC",
  "brazil-payment-reconciliation-helper": "RECON",
  "brazil-bank-statement-parser": "STMT",
  "brazil-ocr-postprocessing-fixer": "OCR",
  "brazil-compliance-checklist-generator": "CHECK",
  "brazil-form-fixture-generator": "FORM"
};

function getRouteIdentity(route) {
  const slug = routeSlug(route);
  return BRAZIL_ROUTE_IDENTITIES[slug] || POLAND_ROUTE_IDENTITIES[slug] || acronymFromText(route.title, 'TOOL');
}

function getIdentifierIdentity(route) {
  return acronymFromText(route.metadata?.displayName || route.title, 'ID');
}

function getStandardIdentity(name, fallback = 'STD') {
  const value = String(name || '').toLowerCase();
  if (value.includes('blik')) return 'BLIK';
  if (value.includes('ksef')) return 'KSeF';
  if (value.includes('ceidg')) return 'CEIDG';
  if (value.includes('gus')) return 'GUS';
  if (value.includes('zus')) return 'ZUS';
  if (value.includes('krs')) return 'KRS';
  if (value.includes('poczta')) return 'POST';
  if (value.includes('narodowy bank') || value.includes('nbp')) return 'NBP';
  if (value.includes('iban')) return 'IBAN';
  if (value.includes('nrb')) return 'NRB';
  if (value.includes('swift') || value.includes('bic')) return 'BIC';
  if (value.includes('sepa')) return 'SEPA';
  if (value.includes('ideal') || value.includes('ideal')) return 'iDEAL';
  if (value.includes('kvk')) return 'KVK';
  if (value.includes('bsn')) return 'BSN';
  if (value.includes('rsin')) return 'RSIN';
  if (value.includes('digid')) return 'DigiD';
  if (value.includes('ahv') || value.includes('avs')) return 'AHV';
  if (value.includes('mwst')) return 'MWST';
  if (value.includes('uid')) return 'UID';
  if (value.includes('qr-bill') || value.includes('qr reference')) return 'QR';
  if (value.includes('sic') || value.includes('clearing')) return 'SIC';
  if (value.includes('canton')) return 'CT';
  if (value.includes('belastingdienst')) return 'TAX';
  if (value.includes('rdw')) return 'RDW';
  if (value.includes('bag')) return 'BAG';
  if (value.includes('split') || value.includes('mpp')) return 'MPP';
  if (value.includes('payment qr') || value.includes('qr')) return 'QR';
  if (value.includes('pln') || value.includes('grosz')) return 'PLN';
  if (value.includes('card')) return 'CARD';
  if (value.includes('bank')) return 'BANK';
  return acronymFromText(name, fallback);
}

const POLAND_ROUTE_DESCRIPTIONS = {
  'pesel-validator': 'Validate PESEL numbers, decode birth date and gender, replay checksum math, and inspect privacy-safe diagnostics offline.',
  'poland-nip-validator': 'Validate Polish tax identifiers, inspect checksum math, mask values for logs, and build safe NIP test cases locally.',
  'poland-regon-validator': 'Check REGON 9- and 14-digit structures, explain weighted checksums, and prepare safe business-register fixtures.',
  'poland-iban-nrb-validator': 'Inspect Polish bank-account numbers, MOD-97 control digits, bank segments, branch hints, and masked account payloads.',
  'poland-vat-validator': 'Validate PL VAT syntax through the local NIP checksum, normalize country prefixes, and prepare VIES-ready test payloads.',
  'poland-krs-inspector': 'Inspect KRS registry numbers, normalize ten-digit records, and separate offline shape checks from official company status.',
  'poland-postal-code-validator': 'Normalize NN-NNN postal codes, batch-check address data, and flag format mistakes before checkout or CRM import.',
  'poland-phone-number-validator': 'Normalize +48 phone numbers, classify mobile, landline, service, and premium ranges, and prepare log-safe contact fixtures.',
  'poland-blik-code-helper': 'Check six-digit BLIK code shape, mask short-lived payment codes, and document what browser-only checks cannot prove.',
  'poland-ksef-invoice-xml-validator': 'Validate KSeF invoice XML readiness, spot required FA(2) fields, and prepare safer e-invoicing payloads before upload.',
  'poland-bdo-number-inspector': 'Inspect BDO registry-shaped numbers for waste and packaging workflows, normalize input, and separate format checks from official status.',
  'poland-driving-licence-inspector': 'Inspect Polish driving licence numbers, normalize document-shaped input, and prepare safe transport or identity fixtures.',
  'poland-eori-inspector': 'Inspect PL EORI syntax, verify NIP-like roots where possible, and separate customs-registration status from offline checks.',
  'poland-id-card-validator': 'Validate Polish ID-card number structure, explain the letter-to-number checksum, and create fictional identity-document fixtures.',
  'poland-license-plate-inspector': 'Inspect Polish license plate structure, region prefixes, serial parts, and fleet-safe masked vehicle fixtures.',
  'poland-mrz-passport-id-parser': 'Parse passport and ID-card MRZ lines, verify check digits, and extract travel-document fields without sending data anywhere.',
  'poland-municipality-code-inspector': 'Inspect municipality and voivodeship code shapes, classify administrative segments, and prepare import-safe geography keys.',
  'poland-passport-number-inspector': 'Normalize Polish passport-number input, check document-shaped syntax, and prepare masked travel-document test values.',
  'poland-vehicle-registration-certificate-helper': 'Inspect Polish vehicle registration certificate fields, normalize serial-style input, and document offline verification boundaries.',
  'poland-teryt-code-inspector': 'Classify Polish TERYT-like administrative codes, identify voivodeship prefixes, and prepare clean geography keys for data imports.',
  'poland-teryt-hierarchy-explorer': 'Explore TERYT hierarchy levels, relate voivodeship, county, and municipality codes, and prepare consistent location keys.',
  'poland-vin-validator': 'Validate VIN structure, split vehicle identity segments, and prepare masked vehicle-data diagnostics for Polish workflows.',
  'poland-ceidg-readiness-checker': 'Check whether sole-proprietor onboarding data is CEIDG-ready, normalize identifiers, and list missing business fields.',
  'poland-jpk-file-validator': 'Inspect JPK file naming and XML readiness, catch common VAT-reporting payload issues, and prepare upload-safe checks.',
  'poland-pkd-code-inspector': 'Inspect PKD activity codes, normalize section and class notation, and prepare company-classification data for onboarding flows.',
  'poland-pkwiu-code-inspector': 'Normalize PKWiU product and service classification codes, inspect dotted segments, and prepare invoice-friendly classification fields.',
  'poland-company-onboarding-auditor': 'Audit Polish company onboarding inputs across NIP, REGON, KRS, VAT, address, and banking fields before CRM import.',
  'poland-invoice-data-auditor': 'Audit Polish invoice fields for buyer, seller, VAT, dates, amounts, and identifier consistency before issuing documents.',
  'poland-invoice-duplicate-risk-detector': 'Detect duplicate-risk patterns in invoice numbers, dates, amounts, and counterparties without exposing accounting data.',
  'poland-invoice-number-helper': 'Normalize invoice-number display, extract year and sequence hints, and build search keys for billing workflows.',
  'poland-ksef-fa2-field-mapper-assistant': 'Map local invoice fields to KSeF FA(2) concepts, highlight required data, and prepare implementation notes.',
  'poland-receipt-paragon-helper': 'Inspect receipt and paragon-style fields, normalize fiscal references, and document what must remain cash-register sourced.',
  'poland-tax-microaccount-calculator': 'Check whether a NIP or PESEL-shaped source value is ready for official Polish tax microaccount workflows.',
  'poland-vat-calculator': 'Calculate Polish VAT net, gross, and tax amounts for common rates while keeping legal and tax-classification boundaries explicit.',
  'poland-pln-amount-formatter': 'Parse Polish money input, normalize PLN display, convert to integer grosz, and produce storage-safe amount fields.',
  'poland-grosz-converter': 'Convert between PLN display values and integer grosz storage values for payment, billing, and accounting payloads.',
  'poland-bank-code-inspector': 'Decode Polish NRB and IBAN bank-routing segments, explain MOD-97 checks, and mask account identifiers for developer workflows.',
  'poland-bank-statement-parser': 'Parse Polish bank-statement-like rows, normalize amounts and dates, and prepare reconciliation-friendly transaction data.',
  'poland-bank-transfer-reconciliation-helper': 'Compare transfer title, amount, account, and reference fields to spot reconciliation mismatches before import.',
  'poland-swift-bic-inspector': 'Inspect BIC/SWIFT syntax for Polish banking workflows, split bank, country, location, and branch segments, and flag non-PL routing.',
  'poland-iban-owner-name-precheck': 'Precheck IBAN and owner-name fields for formatting consistency while separating offline checks from bank ownership verification.',
  'poland-payment-qr-generator': 'Build payment QR payloads from recipient, account, amount, title, and reference fields for offline transfer testing.',
  'poland-sepa-transfer-helper': 'Check whether Polish transfer text contains the core IBAN, BIC, amount, and reference parts needed before bank execution.',
  'poland-split-payment-helper': 'Prepare split-payment MPP fields with VAT amount, gross amount, supplier NIP, and invoice reference consistency checks.',
  'poland-transfer-title-builder': 'Build Polish transfer titles, normalize reference text, and generate copy-safe payment memo variants.',
  'poland-address-formatter': 'Normalize Polish address snippets, detect postal-code and city hints, and mask address fragments before sharing logs.',
  'poland-address-transliteration-normalizer': 'Normalize Polish address text, preserve diacritics where needed, and prepare ASCII-safe variants for legacy systems.',
  'poland-date-locale-formatter': 'Parse ISO and Polish date input, render Europe/Warsaw display, and expose locale-safe date fields for interfaces.',
  'poland-parcel-tracking-inspector': 'Inspect parcel and tracking-number-like input, normalize courier references, and prepare logistics-safe masked examples.',
  'poland-postal-address-parser-pro': 'Parse Polish postal address blocks into recipient, street, building, flat, postal code, city, and country fields.',
  'poland-data-quality-workbench': 'Audit Polish records across identifiers, address, phone, tax, banking, and locale fields for quality and completeness.',
  'poland-pii-masker': 'Detect common Polish PII-like patterns in text, mask identifiers, accounts, phones, and emails, and prepare safer debug snippets.',
  'poland-test-data-generator': 'Generate fictional Polish development fixtures for checkout, identity, address, banking, and contact test scenarios.',
  'poland-compliance-checklist-generator': 'Generate implementation checklists for Polish identifiers, invoices, payments, privacy masking, and official lookup boundaries.',
  'poland-energy-meter-ppe-inspector': 'Inspect Polish PPE energy-meter identifiers, normalize utility-style input, and document offline structure limits.',
  'poland-insurance-policy-number-helper': 'Normalize Polish insurance policy references, prepare masked examples, and separate local formatting from insurer verification.',
  'poland-ocr-postprocessing-fixer': 'Clean OCR output from Polish documents, restore common diacritics and separators, and flag risky recognition artifacts.',
  'poland-payroll-net-gross-sanity-helper': 'Check Polish payroll net/gross sanity, locale decimal formatting, and copy-safe salary examples for HR workflows.',
  'poland-upo-edeklaracje-payload-checker': 'Inspect UPO and e-Deklaracje payload-shaped data, normalize references, and flag missing submission fields.',
  'poland-vies-readiness-helper': 'Prepare Polish VAT IDs for VIES-style checks, normalize PL prefixes, and document what browser-only validation cannot confirm.'
};

const BRAZIL_ROUTE_DESCRIPTIONS = {
  "brazil-pix-validator": "Validate Pix keys and BR Code payloads, inspect EMV fields, generate QR-friendly payment data, and explain offline payment boundaries.",
  "brazil-cpf-validator": "Validate CPF numbers, replay modulus-11 check digits, mask personal identifiers, and generate safe fictional fixtures locally.",
  "brazil-cnpj-validator": "Validate CNPJ company identifiers, inspect both check digits, normalize punctuation, and build safe business test cases.",
  "brazil-rg-inspector": "Inspect RG-shaped identity numbers, normalize issuer notation, mask document values, and document state-level offline limits.",
  "brazil-cnh-validator": "Inspect Brazilian CNH driver-license numbers, normalize eleven-digit records, and separate offline shape checks from official DETRAN status.",
  "brazil-renach-inspector": "Normalize RENACH driver-record references, check common document shape, mask values, and prepare transport onboarding fixtures.",
  "brazil-renavam-validator": "Validate RENAVAM-shaped vehicle registry numbers, inspect length and check-digit behavior where possible, and create safe vehicle fixtures.",
  "brazil-license-plate-validator": "Inspect Mercosul and legacy Brazilian license plate patterns, classify format family, and prepare fleet-safe masked examples.",
  "brazil-titulo-eleitor-validator": "Check voter-title shaped numbers, normalize zones and sections, explain offline boundaries, and generate fictional electoral test values.",
  "brazil-nis-pis-pasep-validator": "Inspect NIS, PIS, and PASEP eleven-digit identifiers, normalize punctuation, mask values, and prepare payroll-safe fixtures.",
  "brazil-sus-card-validator": "Inspect Brazilian CNS/SUS card numbers, normalize fifteen-digit health identifiers, and separate offline shape checks from health-system status.",
  "brazil-passport-number-helper": "Normalize Brazilian passport-like document input, mask travel references, and prepare fictional identity document fixtures.",
  "brazil-state-registration-ie-validator": "Inspect state-registration IE values, normalize UF context, and document state-specific rules that require dedicated official validation.",
  "brazil-municipal-registration-im-helper": "Normalize municipal-registration references, identify city context fields, and prepare invoice-safe examples without claiming city status lookup.",
  "brazil-cnae-code-inspector": "Inspect CNAE activity codes, normalize class and subclass notation, and prepare company-classification data for onboarding flows.",
  "brazil-natureza-juridica-code-inspector": "Inspect Brazilian legal-nature codes, normalize numeric notation, and prepare business-register payload hints for company workflows.",
  "brazil-ibge-municipality-code-inspector": "Inspect seven-digit IBGE municipality codes, split UF and locality hints, and prepare geography keys for data imports.",
  "brazil-nfe-access-key-validator": "Validate 44-digit NF-e access keys, replay modulo-11 check digit math, split UF, date, CNPJ, model, series, and number fields.",
  "brazil-nfce-access-key-validator": "Validate NFC-e access keys, explain consumer invoice key segments, and prepare upload-safe test keys for retail flows.",
  "brazil-cte-access-key-validator": "Inspect CT-e transport document keys, split access-key segments, replay check digits, and prepare logistics invoice fixtures.",
  "brazil-mdfe-access-key-validator": "Validate MDF-e manifest access keys, classify document model fields, and prepare cargo-document diagnostics offline.",
  "brazil-nfe-xml-readiness-checker": "Check NF-e XML payload readiness, spot common issuer, recipient, amount, and access-key fields before fiscal upload.",
  "brazil-nfse-number-helper": "Normalize NFS-e service invoice references, identify municipal context, and document what city portals must verify externally.",
  "brazil-sped-efd-icms-ipi-checker": "Inspect SPED EFD ICMS/IPI file headers and record-shaped lines, flag common separators, dates, CNPJ values, and fiscal periods.",
  "brazil-sped-efd-contribuicoes-checker": "Check EFD Contribuições payload shape, normalize period and establishment fields, and prepare safer tax-file diagnostics.",
  "brazil-esocial-event-id-inspector": "Inspect eSocial event identifiers, normalize employer references, and separate offline syntax checks from government receipt status.",
  "brazil-reinf-event-id-inspector": "Inspect EFD-Reinf event ID shape, normalize reporting-period hints, and document official submission boundaries.",
  "brazil-simples-nacional-das-helper": "Prepare Simples Nacional DAS references, normalize period and CNPJ inputs, and explain what browser-only checks cannot confirm.",
  "brazil-darf-code-helper": "Inspect DARF revenue-code shaped inputs, normalize dates and amounts, and prepare tax-payment payload notes for developers.",
  "brazil-gnre-guide-helper": "Normalize GNRE guide fields, identify UF, amount, taxpayer, and reference data needed before external state portal submission.",
  "brazil-sat-cfe-key-inspector": "Inspect SAT CF-e coupon keys, split fiscal document segments, and prepare retail diagnostics without contacting tax services.",
  "brazil-pix-copy-paste-decoder": "Decode Pix copy-and-paste BR Code text, inspect EMV fields, merchant data, CRC, amount, city, and transaction references locally.",
  "brazil-pix-qr-payload-generator": "Build Pix QR payload test strings from key, recipient, amount, city, and transaction ID fields while staying fully browser-only.",
  "brazil-boleto-barcode-validator": "Validate boleto barcode shape, inspect bank code, currency, due-date factor, amount fields, and check digit boundaries.",
  "brazil-linha-digitavel-validator": "Validate boleto linha digitável fields, normalize punctuation, replay field-level check digits, and mask payment references.",
  "brazil-boleto-due-date-factor": "Convert boleto due-date factors to dates, inspect rollover-era assumptions, and prepare payment schedule test cases.",
  "brazil-compe-bank-code-inspector": "Inspect three-digit COMPE bank codes, normalize routing references, and prepare Brazilian bank-selection payloads for forms.",
  "brazil-ispb-code-inspector": "Inspect eight-digit ISPB participant codes, normalize payment-network references, and separate syntax from official participant status.",
  "brazil-agencia-conta-masker": "Normalize and mask Brazilian agency and account fields, preserve check digits, and produce log-safe banking snippets.",
  "brazil-brl-centavos-converter": "Parse Brazilian real amounts, normalize comma decimals, convert to integer centavos, and generate storage-safe payment fields.",
  "brazil-ted-doc-transfer-helper": "Check Brazilian transfer payload fields for bank code, agency, account, CPF/CNPJ, amount, and recipient consistency before handoff.",
  "brazil-cnab240-file-inspector": "Inspect CNAB 240 fixed-width records, count segments, flag line-length issues, and prepare bank-file diagnostics offline.",
  "brazil-cnab400-file-inspector": "Inspect CNAB 400 fixed-width remittance or return files, validate row lengths, and summarize record-type distribution locally.",
  "brazil-open-finance-consent-helper": "Prepare Brazilian Open Finance consent payload notes, validate CPF/CNPJ party fields, and document browser-only privacy boundaries.",
  "brazil-cep-validator": "Normalize Brazilian CEP postal codes, validate NNNNN-NNN display, batch-check address lists, and prepare delivery-safe fixtures.",
  "brazil-address-formatter": "Format Brazilian address blocks with street, number, complement, bairro, city, UF, CEP, and country fields for forms and labels.",
  "brazil-uf-state-code-inspector": "Inspect Brazilian UF codes, normalize state abbreviations, and prepare state-aware payloads for tax, address, and logistics forms.",
  "brazil-ddd-phone-validator": "Validate Brazilian DDD area-code patterns, classify mobile and landline shapes, and prepare contact-field diagnostics.",
  "brazil-phone-e164-formatter": "Normalize Brazilian phone numbers to +55 E.164-style display, preserve DDD, mask contact data, and generate safe fixtures.",
  "brazil-date-locale-formatter": "Parse ISO and Brazilian DD/MM/YYYY dates, render pt-BR locale display, and expose date fields for localized interfaces.",
  "brazil-address-transliteration-normalizer": "Normalize Portuguese address text, preserve accents where needed, and prepare ASCII-safe variants for legacy systems.",
  "brazil-pii-masker": "Detect Brazilian CPF, CNPJ, CEP, phone, boleto, Pix-like, and email patterns in text and produce privacy-safe masked output.",
  "brazil-test-data-generator": "Generate fictional Brazilian identity, company, address, phone, payment, and invoice fixtures for local development and QA.",
  "brazil-data-quality-workbench": "Audit Brazilian records across CPF, CNPJ, CEP, phone, Pix, boleto, tax, banking, and locale fields for completeness and safety.",
  "brazil-lgpd-redaction-helper": "Redact Brazilian personal and financial data in logs, classify sensitive patterns, and document LGPD-safe debugging boundaries.",
  "brazil-company-onboarding-auditor": "Audit onboarding fields for CNPJ, CNAE, IE, IM, address, fiscal document, banking, Pix, and contact readiness.",
  "brazil-payment-reconciliation-helper": "Compare amount, payer, recipient, Pix, boleto, bank-account, and invoice references to flag reconciliation mismatches locally.",
  "brazil-bank-statement-parser": "Parse Brazilian bank-statement-like rows, normalize BRL amounts and dates, and prepare reconciliation-friendly transaction data.",
  "brazil-ocr-postprocessing-fixer": "Clean OCR output from Brazilian documents, restore common separators, detect CPF/CNPJ/CEP candidates, and flag risky artifacts.",
  "brazil-compliance-checklist-generator": "Generate implementation checklists for Brazilian identifiers, fiscal documents, payments, privacy masking, and official lookup boundaries.",
  "brazil-form-fixture-generator": "Generate fictional Brazilian form payloads for identity, company, address, payment, invoice, and locale UI testing."
};

function getSwitzerlandRouteDescription(slug) {
  if (/ahv|avs/.test(slug)) return 'Validate Swiss social-insurance number structure, replay the check digit, mask sensitive values, and keep identity proof outside the browser.';
  if (/uid/.test(slug)) return 'Normalize Swiss UID values, inspect CHE numeric blocks, and prepare company-registry handoff data without claiming official status.';
  if (/vat|mwst/.test(slug)) return 'Inspect Swiss MWST/VAT display syntax, UID roots, suffixes, rates, and tax-return evidence for browser-only readiness checks.';
  if (/iban/.test(slug)) return 'Validate Swiss IBAN structure, run MOD-97 locally, split clearing/account evidence, and document bank-ownership boundaries.';
  if (/qr-bill|esr/.test(slug)) return 'Check Swiss QR-bill or ESR payment references, payload evidence, recursive control digits, and invoice-payment readiness.';
  if (/sic|clearing|bic|swift|sepa|bank|payment|reconciliation|statement/.test(slug)) return 'Inspect Swiss banking and payment data across SIC/BC, BIC, SEPA, CHF, references, statements, and reconciliation evidence.';
  if (/postal|address|phone|canton|municipality|date|decimal|currency|csv|slug|multilingual/.test(slug)) return 'Normalize Swiss locale, address, canton, phone, postal, date, CHF, and multilingual formatting evidence for developer workflows.';
  if (/fadp|gdpr|pii|data-quality|ocr|json|regex|api|form|fixture|redaction/.test(slug)) return 'Audit Swiss developer payloads, privacy-sensitive text, fixtures, OCR, API fields, regex packs, and data-quality evidence locally.';
  if (/passport|id-card|permit|licence|license|health|insurance|vehicle|plate|vin/.test(slug)) return 'Inspect Swiss document, insurance, vehicle, plate, and VIN-shaped data while separating offline structure from official status.';
  if (/customs|eori|zefix|company|payroll|salary|withholding|tax/.test(slug)) return 'Prepare Swiss tax, customs, payroll, company, Zefix, and regulated handoff evidence without live registry or filing claims.';
  return 'Run a Swiss browser-only validation, formatting, payment, privacy, or developer-data workflow with local field breakdowns.';
}

function getCountryRouteDescription(route) {
  const slug = routeSlug(route);
  if (slug.startsWith('brazil-')) return BRAZIL_ROUTE_DESCRIPTIONS[slug] || 'Run a browser-only Brazilian validation, formatting, or data-quality workflow tailored to this local standard.';
  if (slug.startsWith('switzerland-')) return getSwitzerlandRouteDescription(slug);
  return POLAND_ROUTE_DESCRIPTIONS[slug] || route.metadata?.summary || 'Run a browser-only country validation, formatting, or data-quality workflow.';
}

function getPolandRouteDescription(route) {
  return getCountryRouteDescription(route);
}

const POLAND_IDENTIFIER_DESCRIPTIONS = {
  nip: 'Tax identifier spec for Polish VAT, invoices, company onboarding, and compliance workflows.',
  pesel: 'Personal identity registry spec for PESEL birth-date encoding, gender digit, and checksum behavior.',
  regon: 'Business registry spec for REGON 9- and 14-digit structures, GUS context, and checksum math.'
};

const BRAZIL_IDENTIFIER_DESCRIPTIONS = {
  cpf: 'Personal tax identifier spec with eleven digits and two modulus-11 check digits.',
  cnpj: 'Company tax identifier spec with branch/order digits and two check digits.',
  rg: 'Identity document reference with state-level issuer differences and official-status boundaries.'
};

function getCountryIdentifierDescription(route) {
  const slug = routeSlug(route);
  const key = slug || String(route.metadata?.displayName || '').toLowerCase();
  if (slug.startsWith('brazil-')) return BRAZIL_IDENTIFIER_DESCRIPTIONS[key] || route.metadata?.summary || 'Official Brazilian identifier specification with structure, checksum, and implementation notes.';
  return POLAND_IDENTIFIER_DESCRIPTIONS[key] || route.metadata?.summary || 'Official identifier specification with structure, checksum, and implementation notes.';
}

function getPolandIdentifierDescription(route) {
  return getCountryIdentifierDescription(route);
}

function createRouteCard(route, description, tags = [], status = 'available') {
  return createInfoCard(
    route.title || 'Interactive Workbench',
    description || 'Run a browser-only country validation, formatting, or data-quality workflow.',
    getRouteIdentity(route),
    status,
    tags,
    route.path
  );
}

const POLAND_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.',
    tags: ['identity', 'registry'],
    match: /(pesel|nip|regon|krs|id-card|passport|mrz|driving|license-plate|vehicle-registration|vin|eori|bdo|teryt|municipality)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.',
    tags: ['tax', 'business'],
    match: /(vat|ksef|jpk|invoice|receipt|paragon|pkd|pkwiu|ceidg|company|tax-microaccount)/
  },
  {
    key: 'banking',
    title: 'Banking, payments & money movement',
    summary: 'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.',
    tags: ['banking', 'payments'],
    match: /(iban|nrb|bank|swift|bic|sepa|blik|split-payment|payment-qr|transfer-title|grosz|pln-amount|statement)/
  },
  {
    key: 'address',
    title: 'Address, phone, logistics & local format',
    summary: 'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.',
    tags: ['localization', 'operations'],
    match: /(postal|address|phone|parcel|date-locale)/
  },
  {
    key: 'developer',
    title: 'Developer data operations',
    summary: 'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.',
    tags: ['developer', 'data-quality'],
    match: /(pii-masker|test-data|data-quality)/
  }
];

const BRAZIL_WORKBENCH_GROUPS = [
  { key:'identity', title:'Identity, registry & official numbers', summary:'CPF, CNPJ, RG, CNH, voter, health, vehicle, and official registry-shaped data.', tags:['identity','registry'], match: /(cpf|cnpj|rg|cnh|renach|renavam|license-plate|titulo|nis|pis|pasep|sus|passport|estadual|municipal|cnae|natureza|ibge)/ },
  { key:'tax', title:'Tax, invoices & business compliance', summary:'NF-e, NFC-e, CT-e, MDF-e, SPED, eSocial, Reinf, Simples, DARF, GNRE, and fiscal XML workflows.', tags:['tax','business'], match: /(nfe|nfce|cte|mdfe|xml|nfse|sped|esocial|reinf|simples|darf|gnre|sat-cfe)/ },
  { key:'banking', title:'Banking, Pix, boleto & money movement', summary:'Pix, boleto, linha digitavel, COMPE, ISPB, CNAB, TED/DOC, BRL amounts, and Open Finance helpers.', tags:['banking','payments'], match: /(pix|boleto|linha|compe|ispb|agencia|brl|centavos|ted|doc|cnab|open-finance|payment|bank)/ },
  { key:'address', title:'Address, phone, logistics & local format', summary:'CEP, Brazilian addresses, UF, DDD, phone, locale dates, and transliteration-ready text.', tags:['localization','operations'], match: /(cep|address|uf|ddd|phone|date-locale|transliteration)/ },
  { key:'developer', title:'Developer data operations', summary:'LGPD masking, test fixtures, data-quality audits, reconciliation, OCR cleanup, and compliance checklists.', tags:['developer','data-quality'], match: /(pii|lgpd|test-data|data-quality|company-onboarding|reconciliation|statement|ocr|compliance|fixture)/ }
];

const FRANCE_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'SIREN, SIRET, NIC, NIR, EORI, APE/NAF, RCS, RM, documents, vehicle identifiers, and French registry-shaped data.',
    tags: ['identity', 'registry'],
    match: /(siren|siret|nic|nir|eori|ape|naf|rcs|rm-number|sirene|id-card|passport|driving|licence|license|plate|vin|carte-grise|critair|municipality|commune)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'TVA, VAT rates, French invoices, e-invoicing, PDP/PPF readiness, FEC snippets, audit trails, and compliance helpers.',
    tags: ['tax', 'business'],
    match: /(vat|tva|invoice|e-invoicing|pdp|ppf|fec|audit|compliance|company-onboarding)/
  },
  {
    key: 'banking',
    title: 'Banking, SEPA, RIB & money movement',
    summary: 'French IBAN, RIB, BIC, bank codes, SEPA transfers, RUM, remittance, masking, statements, and reconciliation.',
    tags: ['banking', 'payments'],
    match: /(iban|rib|bank|bic|swift|sepa|rum|remittance|payment|statement|reconciliation|masked-iban)/
  },
  {
    key: 'address',
    title: 'Address, phone, postal & local format',
    summary: 'Postal codes, INSEE commune codes, departments, regions, CEDEX, French addresses, phone numbers, dates, EUR amounts, accents, and slugs.',
    tags: ['localization', 'operations'],
    match: /(postal|insee|commune|department|region|cedex|address|phone|date|decimal|currency|accent|slug|transliteration|csv)/
  },
  {
    key: 'developer',
    title: 'Developer data operations',
    summary: 'GDPR/PII masking, data-quality audits, OCR cleanup, JSON fixtures, regex packs, API payload audits, and form-field reviews.',
    tags: ['developer', 'data-quality'],
    match: /(gdpr|pii|data-quality|ocr|json|regex|api|form-field|fixture|redaction|masker)/
  }
];

const NETHERLANDS_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'BSN, RSIN, KVK, BTW, EORI, DigiD boundaries, documents, vehicle identifiers, and Dutch registry-shaped data.',
    tags: ['identity', 'registry'],
    match: /(bsn|rsin|kvk|btw|vat|eori|digid|ubo|rvo|id-card|passport|driving|licence|license|plate|rdw|vin|company-onboarding)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'BTW rates, Dutch invoices, Peppol/e-invoicing readiness, audit files, payroll tax, compliance, and reporting helpers.',
    tags: ['tax', 'business'],
    match: /(btw|vat|invoice|e-invoicing|peppol|audit|xaf|payroll|wage-tax|compliance|ubo|company-onboarding)/
  },
  {
    key: 'banking',
    title: 'Banking, SEPA, iDEAL & money movement',
    summary: 'Dutch IBAN, BIC, bank codes, SEPA transfers and mandates, iDEAL references, remittance, statements, and reconciliation.',
    tags: ['banking', 'payments'],
    match: /(iban|bic|swift|bank|sepa|ideal|payment|mandate|remittance|statement|reconciliation|masked-iban)/
  },
  {
    key: 'address',
    title: 'Address, phone, postal & local format',
    summary: 'Dutch postcodes, house-number additions, BAG readiness, municipality/province codes, phones, dates, EUR amounts, and slugs.',
    tags: ['localization', 'operations'],
    match: /(postcode|postal|address|house-number|bag|municipality|province|phone|date|decimal|currency|slug|transliteration|csv)/
  },
  {
    key: 'developer',
    title: 'Developer data operations',
    summary: 'AVG/GDPR redaction, PII masking, data-quality audits, OCR cleanup, JSON fixtures, regex packs, API payload audits, and form reviews.',
    tags: ['developer', 'data-quality'],
    match: /(avg|gdpr|pii|data-quality|ocr|json|regex|api|form-field|fixture|redaction|masker|csv)/
  }
];

const SWITZERLAND_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, company & regulated numbers',
    summary: 'AHV/AVS, UID, MWST/VAT, EORI, Zefix readiness, personal documents, health insurance, vehicles, and Swiss registry-shaped evidence.',
    tags: ['identity', 'registry'],
    match: /(ahv|avs|uid|mwst|vat|eori|zefix|passport|id-card|permit|driving|licence|license|health|insurance|vehicle|plate|vin|company|customs)/
  },
  {
    key: 'tax',
    title: 'Tax, payroll, invoices & compliance',
    summary: 'Swiss VAT rates and returns, invoices, e-invoicing, salary certificates, payroll, withholding tax, compliance, and audit-trail helpers.',
    tags: ['tax', 'business'],
    match: /(vat|mwst|invoice|e-invoicing|salary|payroll|withholding|tax|compliance|audit|company-onboarding)/
  },
  {
    key: 'banking',
    title: 'Banking, QR-bill & money movement',
    summary: 'Swiss IBAN, SIC/BC clearing, BIC/SWIFT, SEPA, QR-bill, ESR, CHF amounts, bank statements, and reconciliation workflows.',
    tags: ['banking', 'payments'],
    match: /(iban|sic|clearing|bic|swift|sepa|qr-bill|esr|payment|bank|statement|reconciliation|chf|amount)/
  },
  {
    key: 'address',
    title: 'Address, canton, phone & local format',
    summary: 'Swiss postal codes, addresses, cantons, municipality hints, phone numbers, E.164, multilingual address text, dates, decimals, and CSV normalization.',
    tags: ['localization', 'operations'],
    match: /(postal|address|canton|municipality|phone|date|decimal|currency|csv|slug|multilingual|transliteration)/
  },
  {
    key: 'developer',
    title: 'Developer data, privacy & fixtures',
    summary: 'FADP/GDPR redaction, PII masking, data-quality audits, OCR cleanup, JSON fixtures, regex packs, API payload audits, and form-field reviews.',
    tags: ['developer', 'data-quality'],
    match: /(fadp|gdpr|pii|data-quality|ocr|json|regex|api|form-field|fixture|redaction|masker|personal-data)/
  }
];

const SPAIN_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'DNI, NIE, NIF, CIF, EORI, NAF, documents, vehicle identifiers, and Spanish registry-shaped evidence.',
    tags: ['identity', 'registry'],
    match: /(dni|nie|nif|cif|id-validator|vat-id|eori|naf|registro|mercantil|id-card|passport|driving|licence|license|residence|health|plate|vin|vehicle|mrz|province|municipality)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'IVA, AEAT models, Facturae, VeriFactu, SII, invoices, company onboarding, and accounting audit helpers.',
    tags: ['tax', 'business'],
    match: /(vat|iva|aeat|facturae|verifactu|sii|invoice|company|registro|mercantil|accounting|audit|tax|modelo)/
  },
  {
    key: 'banking',
    title: 'Banking, SEPA, Bizum & money movement',
    summary: 'Spanish IBAN, CCC, bank and branch codes, BIC, SEPA transfers, Bizum, remittance, statements, and reconciliation.',
    tags: ['banking', 'payments'],
    match: /(iban|ccc|bank|bic|swift|sepa|bizum|remittance|payment|statement|reconciliation|masked-iban|eur|decimal|currency)/
  },
  {
    key: 'address',
    title: 'Address, phone, postal & local format',
    summary: 'Spanish postal codes, addresses, provinces, municipalities, phones, E.164, dates, EUR amounts, CSV, and slugs.',
    tags: ['localization', 'operations'],
    match: /(postal|address|province|municipality|phone|date|decimal|currency|csv|slug|transliteration)/
  },
  {
    key: 'developer',
    title: 'Developer data, privacy & fixtures',
    summary: 'GDPR/LOPDGDD redaction, PII masking, data-quality audits, OCR cleanup, JSON fixtures, regex packs, API payload audits, and form reviews.',
    tags: ['developer', 'data-quality'],
    match: /(gdpr|lopdgdd|pii|data-quality|ocr|json|regex|api|form-field|fixture|redaction|masker|personal-data|customs|tracking)/
  }
];


const ITALY_WORKBENCH_GROUPS = [
  {
    key: 'identity',
    title: 'Identity, registry & official numbers',
    summary: 'Codice fiscale, Partita IVA, REA, EORI, ATECO, documents, vehicle identifiers, and Italian registry-shaped evidence.',
    tags: ['identity', 'registry'],
    match: /(codice|fiscale|partita|iva|vat-id|rea|eori|ateco|registro|imprese|id-card|passport|residence|driving|licence|license|health|vehicle|plate|vin|mrz|province|municipality)/
  },
  {
    key: 'tax',
    title: 'Tax, invoices & business compliance',
    summary: 'FatturaPA, SDI, PEC, VAT rates and returns, e-invoicing, company onboarding, and accounting audit helpers.',
    tags: ['tax', 'business'],
    match: /(vat|iva|fatturapa|sdi|pec|invoice|e-invoicing|company|registro|imprese|accounting|audit|tax|return|codice-destinatario)/
  },
  {
    key: 'banking',
    title: 'Banking, SEPA, pagoPA & money movement',
    summary: 'Italian IBAN, ABI/CAB, BIC, SEPA transfers, Ri.Ba, pagoPA, remittance, statements, and reconciliation.',
    tags: ['banking', 'payments'],
    match: /(iban|abi|cab|bank|bic|swift|sepa|riba|pago|remittance|payment|statement|reconciliation|masked-iban|eur|decimal|currency)/
  },
  {
    key: 'address',
    title: 'Address, phone, postal & local format',
    summary: 'CAP, Italian addresses, provinces, comuni, phone numbers, E.164, dates, EUR amounts, CSV, and slugs.',
    tags: ['localization', 'operations'],
    match: /(postal|address|province|municipality|phone|date|decimal|currency|csv|slug|transliteration|comune)/
  },
  {
    key: 'developer',
    title: 'Developer data, privacy & fixtures',
    summary: 'GDPR redaction, PII masking, data-quality audits, OCR cleanup, JSON fixtures, regex packs, API payload audits, and form reviews.',
    tags: ['developer', 'data-quality'],
    match: /(gdpr|pii|data-quality|ocr|json|regex|api|form-field|fixture|redaction|masker|personal-data|customs|tracking)/
  }
];

const GENERIC_COUNTRY_WORKBENCH_GROUPS = [
  { key: 'identity', title: 'Identity, registry & official numbers', summary: 'Local identifiers, registry-shaped numbers, personal documents, vehicle identifiers, and official-format evidence.', tags: ['identity', 'registry'], match: /(id|identity|tax|vat|eori|registry|register|company|passport|document|driving|licence|license|plate|vehicle|vin|mrz)/ },
  { key: 'tax', title: 'Tax, invoices & business compliance', summary: 'Local tax, invoice, reporting, onboarding, audit, and business-compliance workflows.', tags: ['tax', 'business'], match: /(tax|vat|invoice|fiscal|e-invoicing|company|audit|compliance|return|payroll)/ },
  { key: 'banking', title: 'Banking, payments & money movement', summary: 'Local banking identifiers, payment references, bank statements, transfers, remittance, and reconciliation helpers.', tags: ['banking', 'payments'], match: /(iban|bank|bic|swift|sepa|payment|transfer|remittance|statement|reconciliation|currency|amount)/ },
  { key: 'address', title: 'Address, phone, postal & local format', summary: 'Postal codes, addresses, phones, dates, amounts, CSV, transliteration, and local formatting helpers.', tags: ['localization', 'operations'], match: /(postal|address|phone|date|currency|decimal|csv|slug|locale|transliteration)/ },
  { key: 'developer', title: 'Developer data, privacy & fixtures', summary: 'Privacy redaction, PII masking, test fixtures, OCR cleanup, API payload, regex, form-field, and data-quality tools.', tags: ['developer', 'data-quality'], match: /(privacy|gdpr|pii|mask|fixture|ocr|json|regex|api|form|data-quality|redaction)/ }
];

function groupCountryWorkbenchRoutes(routes, model = null) {
  const sourceGroups = model?.iso2 === 'BR'
    ? BRAZIL_WORKBENCH_GROUPS
    : model?.iso2 === 'FR'
      ? FRANCE_WORKBENCH_GROUPS
      : model?.iso2 === 'NL'
        ? NETHERLANDS_WORKBENCH_GROUPS
        : model?.iso2 === 'CH'
          ? SWITZERLAND_WORKBENCH_GROUPS
          : model?.iso2 === 'ES'
            ? SPAIN_WORKBENCH_GROUPS
            : model?.iso2 === 'IT'
              ? ITALY_WORKBENCH_GROUPS
              : model?.iso2 === 'PL'
                ? POLAND_WORKBENCH_GROUPS
                : GENERIC_COUNTRY_WORKBENCH_GROUPS;
  const buckets = sourceGroups.map(group => ({ ...group, routes: [] }));
  const other = { key: 'other', title: 'Other country developer workflows', summary: 'Additional country-specific tools and inspectors.', tags: ['country'], routes: [] };

  for (const route of routes) {
    const slug = routeSlug(route);
    const group = buckets.find(item => item.match.test(slug));
    (group || other).routes.push(route);
  }

  return [...buckets, other].filter(group => group.routes.length > 0);
}

function renderExpandableRouteGroup(group, open = false, extraSearchText = '') {
  const rows = group.routes.map(route => `
    <a class="vh-country-catalog-row" data-intent-group="${escapeHtml(group.key)}" data-route-slug="${escapeHtml(routeSlug(route))}" data-search-text="${escapeHtml([route.title || '', routeSlug(route), route.path || '', getCountryRouteDescription(route), group.title, group.summary, extraSearchText].join(' '))}" href="${route.path}">
      <span>
        <strong>${escapeHtml(route.title || route.path)}</strong>
        <small>Browser-only local workbench</small>
      </span>
      <span class="vh-country-row-arrow" aria-hidden="true">→</span>
    </a>
  `).join('\n');

  return `
    <details class="vh-country-route-group" data-country-route-group="${escapeHtml(group.key)}" ${open ? 'open' : ''}>
      <summary>
        <span>
          <strong>${escapeHtml(group.title)}</strong>
          <small>${escapeHtml(group.summary)}</small>
        </span>
        <span class="vh-country-group-count">${group.routes.length}</span>
      </summary>
      <div class="vh-country-route-list">
        ${rows}
      </div>
    </details>
  `;
}

function findRoutes(routes, pattern) {
  return routes.filter(route => pattern.test(routeSlug(route)) || pattern.test((route.title || '').toLowerCase()));
}

function findFirstRoute(routes, patterns) {
  for (const pattern of patterns) {
    const found = routes.find(route => pattern.test(routeSlug(route)) || pattern.test((route.title || '').toLowerCase()));
    if (found) return found;
  }
  return null;
}

function findCountryStandardRoute(routes, label) {
  const text = String(label || '').toLowerCase();
  if (text.includes('pix')) return findFirstRoute(routes, [/pix-validator/, /pix-copy/, /pix-qr/]);
  if (text.includes('boleto')) return findFirstRoute(routes, [/boleto/]);
  if (text.includes('linha')) return findFirstRoute(routes, [/linha-digitavel/]);
  if (text.includes('compe')) return findFirstRoute(routes, [/compe/]);
  if (text.includes('ispb')) return findFirstRoute(routes, [/ispb/]);
  if (text.includes('cnab 240')) return findFirstRoute(routes, [/cnab240/]);
  if (text.includes('cnab 400')) return findFirstRoute(routes, [/cnab400/]);
  if (text.includes('brl') || text.includes('centavos')) return findFirstRoute(routes, [/brl-centavos/]);
  if (text.includes('ted') || text.includes('doc')) return findFirstRoute(routes, [/ted-doc/]);
  if (text.includes('open finance')) return findFirstRoute(routes, [/open-finance/]);
  if (text.includes('bank code')) return findFirstRoute(routes, [/bank-code/, /compe/]);
  if (text.includes('nrb domestic') || text.includes('iban') || text.includes('pln and polish iban')) return findFirstRoute(routes, [/iban-nrb/]);
  if (text.includes('swift') || text.includes('bic')) return findFirstRoute(routes, [/swift-bic/]);
  if (text.includes('sepa')) return findFirstRoute(routes, [/sepa-transfer/]);
  if (text.includes('blik')) return findFirstRoute(routes, [/blik-code/]);
  if (text.includes('split') || text.includes('mpp')) return findFirstRoute(routes, [/split-payment/]);
  if (text.includes('payment qr')) return findFirstRoute(routes, [/payment-qr/]);
  if (text.includes('tax microaccount')) return findFirstRoute(routes, [/tax-microaccount/]);
  if (text.includes('grosz')) return findFirstRoute(routes, [/grosz-converter/]);
  if (text.includes('pln amount')) return findFirstRoute(routes, [/pln-amount/]);
  if (text.includes('domestic account')) return findFirstRoute(routes, [/bank-code/, /iban-nrb/]);
  return null;
}

export function renderCountryWorkbenchCatalog(model, routeRegistry) {
  const routes = getCountryValidatorRoutes(model, routeRegistry);
  if (routes.length === 0) return '';

  const featuredPatterns = model.iso2 === 'BR'
    ? /(brazil-cpf-validator|brazil-cnpj-validator|brazil-pix-validator|brazil-boleto-barcode-validator|brazil-linha-digitavel-validator|brazil-nfe-access-key-validator|brazil-cep-validator|brazil-phone-e164-formatter|brazil-renavam-validator|brazil-data-quality-workbench)/
    : model.iso2 === 'FR'
      ? /(france-siren-validator|france-siret-validator|france-vat-tva-validator|france-iban-validator|france-rib-validator|france-postal-code-validator|france-phone-number-validator|france-fec-file-readiness-checker|france-nir-syntax-inspector|france-data-quality-workbench)/
      : model.iso2 === 'NL'
        ? /(netherlands-bsn-validator|netherlands-rsin-validator|netherlands-kvk-number-validator|netherlands-btw-vat-validator|netherlands-iban-validator|netherlands-postcode-validator|netherlands-phone-number-validator|netherlands-audit-file-readiness-checker|netherlands-pii-masker|netherlands-data-quality-workbench)/
        : model.iso2 === 'ES'
          ? /(spain-id-validator|spain-dni-validator|spain-nie-validator|spain-vat-id-validator|spain-iban-validator|spain-ccc-bank-account-inspector|spain-bizum-reference-helper|spain-postal-code-validator|spain-phone-number-validator|spain-data-quality-workbench)/
          : /(pesel-validator|poland-nip-validator|poland-regon-validator|poland-iban-nrb-validator|poland-vat-validator|poland-krs-inspector|poland-postal-code-validator|poland-phone-number-validator|poland-blik-code-helper|poland-ksef-invoice-xml-validator)/;
  const featured = routes.filter(route => featuredPatterns.test(routeSlug(route))).slice(0, 10);
  const groups = groupCountryWorkbenchRoutes(routes, model);
  const catalog = model.catalog || {};
  const countrySearchText = [
    model.summary,
    model.description,
    catalog.summary,
    ...(catalog.identifiers || []),
    ...(catalog.payments || []),
    ...(catalog.availableWorkbenches || []),
    ...(model.highlights || []).map(item => item?.text || item?.label || ''),
    ...(catalog.highlights || []).map(item => item?.text || item?.label || ''),
    ...(model.ecosystem || []).map(item => item?.text || item?.label || ''),
    ...(catalog.ecosystem || []).map(item => item?.text || item?.label || ''),
    ...(model.standards || []).map(item => item?.name || item?.label || ''),
    ...(catalog.standards || []).map(item => item?.name || item?.label || ''),
    ...(model.developerNotes || []).map(item => item?.text || item?.label || ''),
    ...(catalog.developerNotes || []).map(item => item?.text || item?.label || '')
  ].join(' ');
  const intentChips = groups.map(group => `<button class="vh-country-intent-chip" type="button" data-country-intent="${escapeHtml(group.key)}">${escapeHtml(group.title)} <span>${group.routes.length}</span></button>`).join('');

  const routeBySlug = (patternList) => findFirstRoute(routes, patternList)?.path || routes[0].path;
  const personPath = model.iso2 === 'BR'
    ? routeBySlug([/cpf-validator/, /rg-inspector/, /cnh-validator/, /phone/, /cep-validator/])
    : model.iso2 === 'FR'
      ? routeBySlug([/nir-syntax/, /id-card/, /passport/, /phone/, /postal-code/])
      : model.iso2 === 'NL'
        ? routeBySlug([/bsn-validator/, /id-card/, /passport/, /phone/, /postcode/])
        : model.iso2 === 'CH'
          ? routeBySlug([/ahv-avs/, /id-card/, /passport/, /residence-permit/, /phone/, /postal-code/])
          : model.iso2 === 'ES'
            ? routeBySlug([/dni-validator/, /nie-validator/, /id-validator/, /id-card/, /passport/, /phone/, /postal-code/])
            : routeBySlug([/pesel-validator/, /id-card/, /passport/, /phone-number/, /postal-code/]);
  const companyPath = model.iso2 === 'BR'
    ? routeBySlug([/cnpj-validator/, /cnae-code/, /state-registration/, /company/])
    : model.iso2 === 'FR'
      ? routeBySlug([/siren-validator/, /siret-validator/, /vat-tva/, /company/])
      : model.iso2 === 'NL'
        ? routeBySlug([/kvk-number/, /rsin/, /btw-vat/, /company/])
        : model.iso2 === 'CH'
          ? routeBySlug([/uid-validator/, /vat-mwst/, /company/, /zefix/])
          : model.iso2 === 'ES'
            ? routeBySlug([/vat-id-validator/, /cif/, /nif-validator/, /company/, /registro/, /aeat/, /invoice/])
            : routeBySlug([/poland-nip-validator/, /regon-validator/, /krs-inspector/, /company/]);
  const paymentPath = model.iso2 === 'BR'
    ? routeBySlug([/pix-validator/, /boleto/, /linha-digitavel/, /brl-centavos/, /cnab/])
    : model.iso2 === 'FR'
      ? routeBySlug([/iban-validator/, /rib-validator/, /bic-swift/, /sepa-transfer/, /remittance/])
      : model.iso2 === 'NL'
        ? routeBySlug([/iban-validator/, /bic-swift/, /ideal/, /sepa-transfer/, /remittance/])
        : model.iso2 === 'CH'
          ? routeBySlug([/iban-validator/, /qr-bill/, /sic-clearing/, /bic-swift/, /sepa-transfer/])
          : model.iso2 === 'ES'
            ? routeBySlug([/iban-validator/, /ccc-bank-account/, /bizum/, /sepa-transfer/, /bank-code/, /payment/])
            : routeBySlug([/poland-iban-nrb-validator/, /blik-code/, /swift-bic/, /sepa-transfer/, /payment-qr/]);

  const quickStarts = `
    <div class="vh-country-quick-starts" aria-label="Quick start scenarios">
      <a class="vh-country-quick-start" href="${personPath}">
        <strong>Validate personal identifiers</strong>
        <small>Personal IDs, documents, contact and address formats</small>
      </a>
      <a class="vh-country-quick-start" href="${companyPath}">
        <strong>Validate organization identifiers</strong>
        <small>Tax, registry, company and compliance references</small>
      </a>
      <a class="vh-country-quick-start" href="${paymentPath}">
        <strong>Validate payment data</strong>
        <small>Accounts, transfers, payment references and amount formats</small>
      </a>
    </div>
  `;

  const offlineBoundary = `
    <div class="vh-country-offline-boundary" role="note" aria-label="Offline validation boundary">
      <strong>Trusted offline boundary</strong>
      <p>Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.</p>
    </div>
  `;

  const stats = `
    <div class="vh-country-catalog-stats" aria-label="Country workbench coverage">
      <span><strong>${routes.length}</strong><small>available workbenches</small></span>
      <span><strong>${groups.length}</strong><small>organized domains</small></span>
      <span><strong>0</strong><small>server calls required</small></span>
    </div>
  `;

  const featuredHtml = featured.length > 0 ? `
    <div class="vh-country-featured-tools" aria-label="Featured country workbenches">
      ${featured.map(route => createRouteCard(route, getCountryRouteDescription(route))).join('\n')}
    </div>
  ` : '';

  const groupsHtml = `
    <div class="vh-country-intent-filters" data-country-intent-filters>
      <button class="vh-country-intent-chip is-active" type="button" data-country-intent="all">All intents <span>${routes.length}</span></button>
      ${intentChips}
    </div>
    <div class="vh-country-route-groups">
      ${groups.map((group, index) => renderExpandableRouteGroup(group, index < 2, countrySearchText)).join('\n')}
    </div>
    <p class="vh-country-tool-search-empty" data-country-tool-search-empty>No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.</p>
  `;

  const content = `
    ${quickStarts}
    ${offlineBoundary}
    ${stats}
    ${featuredHtml}
    ${groupsHtml}
  `;
  return createSection('Tool Catalog', `${model.displayName} workbench suite`, 'country-workbench-catalog', 'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.', content);
}

// 1. Facts Sections
export function renderCountryIdentityFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Capital City', model.capital, '🏛')}
      ${createMetricCard('Native Name', model.nativeName, '🗣')}
      ${createMetricCard('ISO Alpha-2', model.iso2, '🪪')}
      ${createMetricCard('ISO Alpha-3', model.iso3, '🪪')}
      ${createMetricCard('Calling Prefix', model.callingCode, '☎', model.callingCode)}
      ${createMetricCard('Internet TLD', model.internetTld, '🌐', model.internetTld)}
      ${createMetricCard('Driving Side', model.drivingSide, '🚗')}
      ${createMetricCard('Time Zones', model.timeZones, '🕒')}
    </div>
  `;
  return createSection('Geography & Standards', 'Identity & Standards Profile', 'country-identity-facts', 'Core country registry details and national system standards.', content);
}

export function renderCountryLocaleFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Active Locale', model.locale, '📅', model.locale)}
      ${createMetricCard('Date Format', model.dateFormats, '📆', model.dateFormats)}
      ${createMetricCard('Currency Name', model.currency, '💵')}
      ${createMetricCard('Decimal Separator', model.decimalSeparator, '🔢', model.decimalSeparator)}
      ${createMetricCard('Thousands Separator', model.thousandsSeparator, '🔢', model.thousandsSeparator)}
      ${createMetricCard('Postal Pattern', model.postalCode, '✉', model.postalCode)}
    </div>
  `;
  return createSection('Locale Conventions', 'Local Formats & Layouts', 'country-locale-facts', 'Locale preferences, separator characters, and display configurations.', content);
}

export function renderCountryTechnicalFacts(model) {
  const content = `
    <div class="vh-country-fact-grid">
      ${createMetricCard('Plug Types', model.plugTypes, '🔌')}
      ${createMetricCard('Electrical Voltage', model.voltage, '⚡')}
      ${createMetricCard('Grid Frequency', model.frequency, '⚡')}
      ${createMetricCard('Emergency Number', model.emergencyNumbers, '🚨', model.emergencyNumbers)}
    </div>
  `;
  return createSection('Technical Standards', 'Utility & Electrical Profile', 'country-tech-facts', 'Utility metrics, emergency networks, and infrastructure constants.', content);
}

// 2. Developer Cheat Sheets & Quick Copy
export function renderCountryQuickCopyBar(model) {
  const items = [
    { label: 'Locale', val: model.locale, hint: 'BCP 47' },
    { label: 'ISO-2', val: model.iso2, hint: 'country code' },
    { label: 'ISO-3', val: model.iso3, hint: 'alpha-3' },
    { label: 'Calling code', val: model.callingCode, hint: 'phone' },
    { label: 'TLD', val: model.internetTld, hint: 'domain' },
    { label: 'Date format', val: model.dateFormats, hint: 'display' },
    { label: 'Currency', val: model.currency, hint: 'money' },
    { label: 'Postal pattern', val: model.postalCode, hint: 'address' },
    { label: 'Decimal', val: model.decimalSeparator, hint: 'numbers' },
    { label: 'Thousands', val: model.thousandsSeparator, hint: 'numbers' }
  ].filter(i => i.val);

  if (items.length === 0) return '';

  const buttonsHtml = items.map(item => `
    <button class="vh-country-action-button" type="button" data-copy-value="${escapeHtml(item.val)}" data-copy-label="${escapeHtml(item.label)}">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.val)}</strong>
      <small>${escapeHtml(item.hint)}</small>
    </button>
  `).join('\n');

  const content = `
    <div class="vh-country-action-bar">
      ${buttonsHtml}
    </div>
  `;
  return createSection('Developer Actions', `Copy ${model.displayName} constants instantly`, 'country-quick-actions', 'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.', content);
}

// 3. Formatting Examples (Currency, dates, percentages)
export function renderCountryFormattingExamples(model, rawHubData) {
  const examples = rawHubData.localizationExamples || [];
  if (examples.length === 0) return '';

  const cardsHtml = examples.map(ex => createMetricCard(ex.label, ex.value, null, ex.value)).join('\n');

  const content = `
    <div class="vh-country-fact-grid">
      ${cardsHtml}
    </div>
  `;
  return createSection('Formatting Previews', 'Locale-aware display examples', 'country-formatting-examples', 'Real formatting previews representing dates, times, currency, and phone layouts.', content);
}

// 4. Address & Postal Format
export function renderCountryAddressFormat(model) {
  const addr = model.addressFormat;
  if (!addr || !addr.formatted || addr.formatted.length === 0) return '';

  const preBlock = `
    <div class="vh-country-address-card">
      <pre><code>${addr.formatted.map(escapeHtml).join('\n')}</code></pre>
      <button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(addr.formatted.join('\n'))}" data-copy-label="Address Example">Copy Address</button>
    </div>
  `;

  const fieldsGrid = addr.fields && addr.fields.length > 0
    ? `<div class="vh-country-card-grid-compact">
        ${addr.fields.map(f => createInfoCard(f.label, `${f.value} — ${f.description}`, '📍')).join('\n')}
       </div>`
    : '';

  const content = `
    <div class="vh-country-split-layout">
      ${preBlock}
      ${fieldsGrid}
    </div>
  `;
  return createSection('Address Standards', 'Structured address formatting', 'country-address-format', 'Display order, postal mask, street notation, and delivery-ready field sequence.', content);
}

// 5. Phone & Vehicle Registration
export function renderCountryPhoneFormats(model) {
  if (!model.phoneFormats || model.phoneFormats.length === 0) return '';

  const cardsHtml = model.phoneFormats.map(item => {
    const card = createInfoCard(item.label, item.description, '☎', 'available', item.tags || []);
    // Embed the phone template block
    const codeBlock = createMetricCard('Example layout', item.value, null, item.value);
    return `<div class="vh-country-phone-card-wrapper">${card}${codeBlock}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Phone Conventions', 'Telephone layouts & parsing guidelines', 'country-phone-formats', 'Mobile, regional landline, and international dialing representations.', content);
}

export function renderCountryVehicleRegistration(model, rawHubData) {
  const vehicle = rawHubData.vehicleRegistration || (model.vehicleRegistration ? { format: model.vehicleRegistration } : null);
  if (!vehicle || !vehicle.format) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${createInfoCard('License Plates Format', `Standard shape pattern: ${vehicle.format}. Example plate: ${vehicle.example || 'N/A'}.`, '🚗', 'available')}
      ${vehicle.notes ? createInfoCard('Validation & Encoding', vehicle.notes, 'ℹ', 'available') : ''}
    </div>
  `;
  return createSection('License Plates', 'Vehicle registration layout conventions', 'country-vehicle-registration', 'Standard registration plates formatting and region encodings.', content);
}

// 6. Ecosystem divisions & banking structures
export function renderCountryAdministrativeDivisions(model, rawHubData) {
  const divisions = rawHubData.administrativeDivisions || model.administrativeDivisions;
  if (!divisions || (Array.isArray(divisions) && divisions.length === 0)) return '';

  const listHtml = Array.isArray(divisions)
    ? `<ul class="vh-country-checklist">${divisions.map(d => `<li><span class="vh-country-check-box">□</span><span>${escapeHtml(d)}</span></li>`).join('')}</ul>`
    : `<p>${escapeHtml(divisions)}</p>`;

  return createSection('Administrative Divisions', 'National administrative divisions hierarchy', 'country-admin-divisions', 'Government subdivisions and territorial structure.', listHtml);
}

export function renderCountryTaxSystem(model, rawHubData) {
  const tax = rawHubData.taxSystem || model.taxSystem;
  if (!tax) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${createInfoCard(tax.name || 'National Tax System', tax.description || tax, '💸', 'available')}
      ${tax.authority ? createInfoCard('Tax Administration Authority', tax.authority, '🏛', 'available') : ''}
    </div>
  `;
  return createSection('Tax System', 'Business registration & tax overview', 'country-tax-system', 'Tax identification numbers, vat rules, and compliance requirements.', content);
}

export function renderCountryBankingSystem(model, routeRegistry = null) {
  if (!model.bankingSystem || model.bankingSystem.length === 0) return '';

  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const toolRoutes = findRoutes(routes, /(iban|nrb|bank|swift|bic|sepa|blik|pix|boleto|linha|compe|ispb|agencia|brl|centavos|ted|doc|cnab|open-finance|split-payment|payment-qr|transfer-title|grosz|pln-amount|statement|tax-microaccount)/).slice(0, 12);

  const cardsHtml = model.bankingSystem.map(bank => {
    const relatedRoute = findCountryStandardRoute(routes, bank.name);
    return createInfoCard(bank.name, bank.description, getStandardIdentity(bank.name, 'BANK'), bank.status || 'available', bank.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related banking workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getCountryRouteDescription(route))}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
    ${toolsHtml}
  `;
  const countryName = model.displayName || model.name || 'Country';
  const isPoland = model.iso2 === 'PL';
  const sectionTitle = isPoland ? 'Polish account, transfer & clearing standards' : countryName + ' account, transfer & banking standards';
  const sectionDescription = isPoland
    ? 'IBAN, NRB, BIC, SEPA, Elixir-style routing context, and payment-ready developer workflows.'
    : 'IBAN, domestic account context, BIC/SWIFT, SEPA or local clearing notes, and payment-ready developer workflows.';
  return createSection('Banking Standards', sectionTitle, 'country-banking-system', sectionDescription, content);
}

export function renderCountryPaymentSystems(model, routeRegistry = null) {
  if (!model.paymentSystems || model.paymentSystems.length === 0) return '';

  const routes = getCountryValidatorRoutes(model, routeRegistry);
  const toolRoutes = findRoutes(routes, /(blik|pix|boleto|linha|split-payment|payment-qr|sepa|transfer-title|tax-microaccount|vat-calculator|grosz|pln-amount|brl|centavos|ted|doc|iban|nrb)/).slice(0, 12);

  const cardsHtml = model.paymentSystems.map(pay => {
    const title = pay.title || pay.name;
    const relatedRoute = findCountryStandardRoute(routes, title);
    return createInfoCard(title, pay.text || pay.description, getStandardIdentity(title, 'PAY'), pay.status || 'available', pay.tags || [], relatedRoute?.path || null);
  }).join('\n');
  const toolsHtml = toolRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>Related payment workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${toolRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getCountryRouteDescription(route))}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
    ${toolsHtml}
  `;
  const countryName = model.displayName || model.name || 'Country';
  const isPoland = model.iso2 === 'PL';
  const sectionTitle = isPoland ? 'Polish payment rails & offline helpers' : countryName + ' payment rails & offline helpers';
  const sectionDescription = isPoland
    ? 'BLIK, SEPA, split payment, payment QR, PLN amounts, VAT amounts, and transfer-reference workflows.'
    : 'Local payment systems, card context, bank transfer references, currency formatting, and browser-only payment data helpers.';
  return createSection('Payment Networks', sectionTitle, 'country-payment-systems', sectionDescription, content);
}

// 7. National Identifiers & Validators
export function renderCountryIdentifiers(model, routeRegistry) {
  if (!model.identifiers || model.identifiers.length === 0) return '';

  const idRoutes = routeRegistry.getAll().filter(r => r.type === 'identifier' && r.metadata.countryCode === model.iso2);
  const validatorRoutes = getCountryValidatorRoutes(model, routeRegistry);
  const identifierRoutes = findRoutes(validatorRoutes, /(pesel|nip|regon|krs|cpf|cnpj|rg|cnh|renach|renavam|titulo|nis|pis|pasep|sus|estadual|municipal|cnae|natureza|ibge|id-card|passport|mrz|driving|license-plate|vehicle-registration|vin|eori|bdo|teryt|municipality|ppe|postal-code|phone-number|cep)/);
  if (idRoutes.length === 0 && identifierRoutes.length === 0) return '';

  const cardsHtml = idRoutes.map(r => {
    return createInfoCard(
      r.metadata.displayName,
      getCountryIdentifierDescription(r),
      getIdentifierIdentity(r),
      'available',
      ['identifier', 'specification'],
      r.path
    );
  }).join('\n');

  const routeGroups = identifierRoutes.length > 0 ? `
    <div class="vh-country-subsection">
      <h3>${identifierRoutes.length} related identifier workbenches</h3>
      <div class="vh-country-route-list vh-country-route-list-compact">
        ${identifierRoutes.map(route => `
          <a class="vh-country-catalog-row" href="${route.path}">
            <span><strong>${escapeHtml(route.title)}</strong><small>${escapeHtml(getCountryRouteDescription(route))}</small></span>
            <span class="vh-country-row-arrow" aria-hidden="true">→</span>
          </a>
        `).join('\n')}
      </div>
    </div>
  ` : '';

  const content = `
    ${cardsHtml ? `<div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>` : ''}
    ${routeGroups}
  `;
  return createSection('National Identifiers', 'Identifier registry specs & workbenches', 'country-identifiers-specs', `Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped ${model.displayName} data.`, content);
}

export function renderCountryValidators(model, routeRegistry) {
  if (!model.validators || model.validators.length === 0) return '';

  const valRoutes = getCountryValidatorRoutes(model, routeRegistry);

  const cardsHtml = valRoutes.map(r => {
    return createInfoCard(
      r.title || 'Interactive Validator',
      getCountryRouteDescription(r),
      getRouteIdentity(r),
      'available',
      ['validator', 'workbench'],
      r.path
    );
  }).join('\n');

  if (cardsHtml.length === 0) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Interactive Sandboxes', 'Developer Validator Workbenches', 'country-validators-sandboxes', 'Pre-rendered interactive validator tools to test identifiers in a real browser.', content);
}

// 8. Roadmap & checklists
export function renderCountryIntegrationChecklist(model) {
  if (!model.integrationChecklist || model.integrationChecklist.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${model.integrationChecklist.map(item => `
        <li>
          <span class="vh-country-check-box">☑</span>
          <span>${escapeHtml(item)}</span>
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Developer Checklist', 'Integration checklist reminders', 'country-integration-checklist', 'Important checkmarks to verify when deploying localized pipelines.', listHtml);
}

export function renderCountryRoadmap(model) {
  if (!model.plannedWorkbenches || model.plannedWorkbenches.length === 0) return '';

  const cardsHtml = model.plannedWorkbenches.map(item => {
    return createInfoCard(
      item.name,
      item.description,
      '🧩',
      item.status || 'planned',
      item.tags || [],
      null,
      true
    );
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Product Roadmap', 'Future workbenches timeline', 'country-roadmap-timeline', 'Roadmap schedule for upcoming developer workbenches and specs.', content);
}

// 9. Official Resources
export function renderCountryOfficialResources(model) {
  if (!model.officialResources || model.officialResources.length === 0) return '';

  const cardsHtml = model.officialResources.map(res => {
    const normalized = normalizeInfoEntry(res);
    const card = createInfoCard(
      normalized.title,
      normalized.text || 'Official country authority resource and portal guides.',
      getStandardIdentity(normalized.title, 'SRC'),
      normalized.status,
      normalized.tags
    );
    const badge = `<span class="vh-country-visual-caption">Reference note, not a link</span>`;
    return `<div class="vh-country-resource-card-wrapper">${card}${badge}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Official Sources', 'National regulatory & reference portals', 'country-official-sources', 'Verified legislative resources to validate compliance formats.', content);
}

// 10. Knowledge Graph and cross-linking
export function renderCountryKnowledgeGraph(model, countryDiscovery, routeRegistry) {
  if (!countryDiscovery || !countryDiscovery.relatedResources) return '';

  const res = countryDiscovery.relatedResources;
  const cards = [];

  // 1. Identifiers Graph links
  if (res.identifiers && res.identifiers.length > 0) {
    res.identifiers.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : `/en/identifiers/${item.slug}/`;
      const isRegistered = routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'National identifier metadata.',
        getStandardIdentity(item.name, 'ID'),
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'identifier'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 2. Payments Graph links
  if (res.payments && res.payments.length > 0) {
    res.payments.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : null;
      const isRegistered = activePath && routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'Payment system standard.',
        getStandardIdentity(item.name, 'PAY'),
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'payment'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 3. Standards Graph links
  if (res.standards && res.standards.length > 0) {
    res.standards.forEach(item => {
      const activePath = item.link ? `/en/${item.link}/` : null;
      const isRegistered = activePath && routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'National banking standard format.',
        getStandardIdentity(item.name, 'STD'),
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'standard'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  // 4. Workbenches Graph links
  if (res.workbenches && res.workbenches.length > 0) {
    res.workbenches.forEach(item => {
      const activePath = `/en/${model.slug}/${item.slug}/`;
      const isRegistered = routeRegistry && routeRegistry.has(activePath);
      cards.push(createInfoCard(
        item.name,
        item.description || 'Interactive validation tool.',
        getStandardIdentity(item.name, 'TOOL'),
        isRegistered ? 'available' : 'planned',
        ['graph-node', 'validator'],
        isRegistered ? activePath : null,
        !isRegistered
      ));
    });
  }

  if (cards.length === 0) return '';

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cards.join('\n')}
    </div>
  `;
  return createSection('Knowledge Graph', 'Graph-powered developer metadata & navigation', 'country-knowledge-graph', 'Pre-rendered relationship paths compiled directly from the ValidoHub central index.', content);
}

export function renderCountryRelatedCountries(model, countryDiscovery, routeRegistry) {
  if (!countryDiscovery || !countryDiscovery.relatedCountries || countryDiscovery.relatedCountries.length === 0) return '';

  const cardsHtml = countryDiscovery.relatedCountries.map(item => {
    const activePath = `/en/${item.slug}/`;
    const isRegistered = routeRegistry && routeRegistry.has(activePath);
    return createInfoCard(
      item.name,
      `Shares standards: ${item.via.join(', ')}`,
      getCountryFlag(item.iso2 || item.slug || item.name),
      isRegistered ? 'available' : 'planned',
      item.via,
      isRegistered ? activePath : null,
      !isRegistered
    );
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Regional Cross-Links', 'Related regional standard conventions', 'country-cross-links', 'Countries sharing overlapping currency codes, payment gateways, or regulatory acts.', content);
}

// 11. Extra Rich Text blocks
function normalizeListEntry(entry) {
  if (entry && typeof entry === 'object') {
    return {
      title: entry.title || entry.name || entry.label || '',
      text: entry.text || entry.description || entry.note || ''
    };
  }
  return {
    title: '',
    text: String(entry || '')
  };
}

function renderChecklistEntry(entry) {
  const normalized = normalizeListEntry(entry);
  if (normalized.title && normalized.text) {
    return `<span><strong>${escapeHtml(normalized.title)}</strong><small>${escapeHtml(normalized.text)}</small></span>`;
  }
  return `<span>${escapeHtml(normalized.title || normalized.text)}</span>`;
}

function normalizeInfoEntry(entry) {
  if (entry && typeof entry === 'object') {
    return {
      title: entry.title || entry.name || entry.label || '',
      text: entry.text || entry.description || entry.note || entry.value || '',
      status: entry.status || 'available',
      tags: entry.tags || []
    };
  }
  return {
    title: String(entry || ''),
    text: '',
    status: 'available',
    tags: []
  };
}

export function renderCountryCommonMistakes(model, rawHubData) {
  const mistakes = rawHubData.commonMistakes || [];
  if (mistakes.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${mistakes.map(m => `
        <li>
          <span class="vh-country-check-box vh-color-danger">⚠</span>
          ${renderChecklistEntry(m)}
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Common Mistakes', 'Integration pitfalls to avoid', 'country-common-mistakes', 'Locale formatting and validation traps developers frequently encounter.', listHtml);
}

export function renderCountryHighlights(model, rawHubData) {
  const highlights = rawHubData.highlights || [];
  if (highlights.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${highlights.map(h => `
        <li>
          <span class="vh-country-check-box">✦</span>
          ${renderChecklistEntry(h)}
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Key Highlights', 'Highlights and quick summaries', 'country-highlights-notes', 'Summary overview of national localization rules.', listHtml);
}

export function renderCountryDeveloperNotes(model, rawHubData) {
  const notes = rawHubData.developerNotes || [];
  if (notes.length === 0) return '';

  const listHtml = `
    <ul class="vh-country-checklist">
      ${notes.map(n => `
        <li>
          <span class="vh-country-check-box">▪</span>
          ${renderChecklistEntry(n)}
        </li>
      `).join('')}
    </ul>
  `;
  return createSection('Developer Notes', 'Developer implementation instructions', 'country-developer-notes', 'Important coding notes for storage, parameters, and validations.', listHtml);
}

export function renderCountryDeveloperExamples(model, rawHubData) {
  const examples = rawHubData.developerExamples || [];
  if (examples.length === 0) return '';

  const cardsHtml = examples.map(ex => {
    const language = ex.language || 'code';
    const title = ex.title || ex.name || ex.label || `${language} fixture`;
    const note = ex.note || ex.description || ex.text || `Copy-ready ${language} example for local country workflow testing.`;
    const card = createInfoCard(title, note, '💻', 'available', [language]);
    const codeBlock = `
      <div class="vh-country-address-card vh-mt-xs">
        <pre><code class="language-${language}">${escapeHtml(ex.code)}</code></pre>
        <button class="vh-country-copy-button" type="button" data-copy-value="${escapeHtml(ex.code)}" data-copy-label="${escapeHtml(title)}">Copy Code</button>
      </div>
    `;
    return `<div class="vh-country-code-example-wrapper">${card}${codeBlock}</div>`;
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Code Examples', 'Developer integration code snippets', 'country-developer-examples', 'Ready-to-use programming snippets in JavaScript, Java, Python, and Go.', content);
}

export function renderCountryLocalizationNotes(model, rawHubData) {
  const notes = rawHubData.localizationNotes || [];
  if (notes.length === 0) return '';

  const cardsHtml = notes.map(n => {
    const normalized = normalizeInfoEntry(n);
    return createInfoCard(normalized.title, normalized.text, '📝', normalized.status, normalized.tags);
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Localization Notes', 'Local conventions and grammar exceptions', 'country-localization-notes', 'Grammar peculiarities, diacritics, and calendar configurations.', content);
}

export function renderCountryEcosystem(model, rawHubData) {
  const eco = rawHubData.ecosystem || [];
  if (eco.length === 0) return '';

  const cardsHtml = eco.map(item => {
    const normalized = normalizeInfoEntry(item);
    return createInfoCard(normalized.title, normalized.text, '🔗', normalized.status, normalized.tags);
  }).join('\n');

  const content = `
    <div class="vh-country-card-grid-compact">
      ${cardsHtml}
    </div>
  `;
  return createSection('Country Ecosystem', 'National ecosystem directories', 'country-ecosystem-nodes', 'Canonical national portals, APIs, and registries related to compliance formats.', content);
}
