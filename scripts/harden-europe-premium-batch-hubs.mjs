#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = {
  portugal: {
    name: 'Portugal', iso2: 'PT', flag: ['#006600', '#FF0000', '#FFD100'], marker: { x: 38, y: 62 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['NIF', 'NIPC', 'NISS', 'MULTIBANCO', 'IBAN', 'SAF-T'],
    payments: ['Multibanco reference', 'MB Way handoff', 'SEPA', 'IBAN', 'SWIFT/BIC', 'SAF-T/e-Fatura']
  },
  austria: {
    name: 'Austria', iso2: 'AT', flag: ['#C8102E', '#FFFFFF', '#C8102E'], marker: { x: 50, y: 58 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['SVNR', 'ATU', 'UID', 'FN', 'IBAN', 'EPS'],
    payments: ['EPS handoff', 'SEPA', 'IBAN', 'SWIFT/BIC', 'ATU VAT', 'ebInterface']
  },
  belgium: {
    name: 'Belgium', iso2: 'BE', flag: ['#111111', '#FAE042', '#ED2939'], marker: { x: 47, y: 52 },
    plugTypes: 'Type C / Type E', voltage: '230V', frequency: '50Hz',
    searchHints: ['RRN/NISS', 'KBO/BCE', 'BIS', 'OGM', 'IBAN', 'VAT'],
    payments: ['OGM structured communication', 'SEPA', 'IBAN', 'SWIFT/BIC', 'KBO/BCE VAT', 'Peppol']
  },
  ireland: {
    name: 'Ireland', iso2: 'IE', flag: ['#169B62', '#FFFFFF', '#FF883E'], marker: { x: 42, y: 49 },
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz',
    searchHints: ['PPSN', 'CRO', 'EIRCODE', 'VAT', 'IBAN', 'ROS'],
    payments: ['SEPA', 'IBAN', 'SWIFT/BIC', 'ROS handoff', 'Eircode', 'CRO/VAT']
  },
  czechia: {
    name: 'Czechia', iso2: 'CZ', flag: ['#11457E', '#FFFFFF', '#D7141A'], marker: { x: 51, y: 55 },
    plugTypes: 'Type C / Type E', voltage: '230V', frequency: '50Hz',
    searchHints: ['RODNE CISLO', 'ICO', 'DIC', 'VARIABLE SYMBOL', 'IBAN', 'DATOVA'],
    payments: ['Variabilni symbol', 'Konstantni symbol', 'SEPA', 'IBAN', 'SWIFT/BIC', 'Datova schranka']
  },
  sweden: {
    name: 'Sweden', iso2: 'SE', flag: ['#006AA7', '#FECC00', '#006AA7'], marker: { x: 55, y: 38 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['PERSONNUMMER', 'ORGNR', 'BANKGIRO', 'PLUSGIRO', 'OCR', 'IBAN'],
    payments: ['Bankgiro', 'PlusGiro', 'OCR reference', 'SEPA', 'IBAN', 'Swedish VAT']
  },
  norway: {
    name: 'Norway', iso2: 'NO', flag: ['#BA0C2F', '#FFFFFF', '#00205B'], marker: { x: 52, y: 34 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['FODSELSNUMMER', 'ORGNR', 'KID', 'MVA', 'IBAN', 'EHF'],
    payments: ['KID reference', 'AvtaleGiro handoff', 'EHF / Peppol', 'IBAN', 'SWIFT/BIC', 'MVA']
  },
  denmark: {
    name: 'Denmark', iso2: 'DK', flag: ['#C60C30', '#FFFFFF', '#C60C30'], marker: { x: 51, y: 45 },
    plugTypes: 'Type C / Type E / Type F / Type K', voltage: '230V', frequency: '50Hz',
    searchHints: ['CPR', 'CVR', 'FI REFERENCE', 'BETALINGSSERVICE', 'IBAN', 'NEMHANDEL'],
    payments: ['FI creditor reference', 'Betalingsservice', 'NemHandel', 'SEPA', 'IBAN', 'Danish VAT']
  },
  finland: {
    name: 'Finland', iso2: 'FI', flag: ['#002F6C', '#FFFFFF', '#002F6C'], marker: { x: 58, y: 32 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['HETU', 'Y-TUNNUS', 'VIITENUMERO', 'OVT', 'IBAN', 'FINVOICE'],
    payments: ['Viitenumero reference', 'Finvoice', 'OVT', 'SEPA', 'IBAN', 'Finnish VAT']
  },
  romania: {
    name: 'Romania', iso2: 'RO', flag: ['#002B7F', '#FCD116', '#CE1126'], marker: { x: 58, y: 62 },
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['CNP', 'CUI/CIF', 'ANAF', 'E-FACTURA', 'IBAN', 'ONRC'],
    payments: ['RO e-Factura', 'ANAF handoff', 'Treasury payment evidence', 'SEPA', 'IBAN', 'Romanian VAT']
  }
};

const COUNTRY_TIME_ZONES = {
  portugal: 'Europe/Lisbon (WET/WEST)',
  austria: 'Europe/Vienna (CET/CEST)',
  belgium: 'Europe/Brussels (CET/CEST)',
  ireland: 'Europe/Dublin (IST/GMT)',
  czechia: 'Europe/Prague (CET/CEST)',
  sweden: 'Europe/Stockholm (CET/CEST)',
  norway: 'Europe/Oslo (CET/CEST)',
  denmark: 'Europe/Copenhagen (CET/CEST)',
  finland: 'Europe/Helsinki (EET/EEST)',
  romania: 'Europe/Bucharest (EET/EEST)'
};

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function rgb(hex) {
  const clean = hex.replace('#', '');
  return `${parseInt(clean.slice(0, 2), 16)} ${parseInt(clean.slice(2, 4), 16)} ${parseInt(clean.slice(4, 6), 16)}`;
}

function outlineSvg(meta) {
  const [c1, c2, c3] = meta.flag;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${meta.name} flag-colored outline">
  <defs>
    <linearGradient id="flagGradient" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="0.52" stop-color="${c2}"/>
      <stop offset="1" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="220" rx="18" fill="#f8fafc"/>
  <rect x="20" y="20" width="280" height="180" rx="18" fill="${c1}" opacity=".09"/>
  <path d="M86 48 L151 31 L222 55 L245 108 L219 169 L150 191 L84 158 L64 96 Z" fill="url(#flagGradient)" opacity=".30" stroke="${c1}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M86 48 L151 31 L222 55 L245 108 L219 169 L150 191 L84 158 L64 96 Z" fill="none" stroke="${c3}" stroke-width="2" stroke-linejoin="round" opacity=".7"/>
  <circle cx="160" cy="110" r="30" fill="#ffffff" opacity=".88"/>
  <text x="160" y="121" text-anchor="middle" font-family="Inter, Arial" font-size="44" font-weight="900" fill="#0f172a">${meta.iso2}</text>
</svg>
`;
}

function locationSvg(meta) {
  const [c1, c2, c3] = meta.flag;
  const x = meta.marker.x * 3.2;
  const y = meta.marker.y * 2.2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${meta.name} flag-colored location">
  <defs>
    <linearGradient id="mapFlag" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="0.5" stop-color="${c2}"/>
      <stop offset="1" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="320" height="220" rx="18" fill="#eef4fb"/>
  <path d="M22 72 C62 44 101 50 139 70 C173 89 206 80 247 58 C270 45 294 42 306 50" fill="none" stroke="${c1}" stroke-width="11" stroke-linecap="round" opacity=".22"/>
  <path d="M42 150 C82 126 119 132 151 151 C190 173 231 159 285 128" fill="none" stroke="${c3}" stroke-width="11" stroke-linecap="round" opacity=".24"/>
  <circle cx="${x}" cy="${y}" r="22" fill="url(#mapFlag)" opacity=".38"/>
  <circle cx="${x}" cy="${y}" r="9" fill="${c3}"/>
  <circle cx="${x}" cy="${y}" r="4" fill="#0f172a"/>
  <text x="24" y="196" font-family="Inter, Arial" font-size="18" font-weight="800" fill="#0f172a">${meta.name}</text>
</svg>
`;
}

for (const [slug, meta] of Object.entries(COUNTRIES)) {
  const file = path.join(ROOT, 'countries/data', `${slug}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data.catalog.searchHints = meta.searchHints;
  data.catalog.payments = meta.payments;
  data.hub.searchHints = meta.searchHints;
  data.hub.metadata.powerPlugTypes = meta.plugTypes;
  data.hub.metadata.voltage = meta.voltage;
  data.hub.metadata.frequency = meta.frequency;
  data.hub.metadata.primaryTimeZone = COUNTRY_TIME_ZONES[slug]
    || data.hub.metadata.primaryTimeZone
    || 'Europe/Brussels (CET/CEST)';
  data.hub.visualIdentity.heroAccentPrimary = rgb(meta.flag[0]);
  data.hub.visualIdentity.heroAccentSecondary = rgb(meta.flag[1]);
  data.hub.visualIdentity.heroAccentTertiary = rgb(meta.flag[2]);
  data.hub.technicalStandards = [
    { title: 'Power plug types', text: meta.plugTypes },
    { title: 'Electrical voltage', text: meta.voltage },
    { title: 'Grid frequency', text: meta.frequency },
    { title: 'Emergency number', text: data.hub.metadata.emergencyNumber || '112' }
  ];
  writeJson(file, data);
  fs.writeFileSync(path.join(ROOT, 'assets/images/countries', `${slug}-outline.svg`), outlineSvg(meta));
  fs.writeFileSync(path.join(ROOT, 'assets/images/countries', `${slug}-location.svg`), locationSvg(meta));
}

console.log('Hardened Europe premium batch country hubs.');
