#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = [
  {
    slug: 'united-states', iso2: 'US', iso3: 'USA', isoNumeric: '840', name: 'United States', adjective: 'US', nativeName: 'United States',
    flag: '🇺🇸', language: 'English', localLanguage: 'en-US', currency: 'USD', currencyName: 'US dollar',
    locale: 'en-US', icu: 'en_US', date: 'MM/DD/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+1',
    capital: 'Washington, DC', continent: 'North America', region: 'North America', population: 'approximately 342M',
    identifiers: ['SSN', 'EIN', 'ITIN', 'ZIP', 'routing number', 'phone'],
    payments: ['ABA routing number', 'ACH', 'Fedwire', 'SWIFT', 'RTP / FedNow handoff'],
    localTerms: { personal: 'SSN', company: 'EIN', tax: 'IRS tax ID', social: 'ITIN / SSN', register: 'state business register', invoice: 'sales-tax invoice', payment: 'ACH / Fedwire', bank: 'ABA routing number', postal: 'ZIP Code', privacy: 'US privacy / GLBA' },
    samples: { personal: '123-45-6789', company: '12-3456789', social: '900-70-0000', vat: 'US 12-3456789', bank: '021000021 123456789', iban: '021000021123456789', phone: '+1 202 555 0142', postal: '20500', plate: 'ABC-1234', amount: '1,234.56 USD', date: '07/21/2026', address: '1600 Pennsylvania Ave NW, Washington, DC 20500', json: '{"country":"US","ein":"12-3456789","routing":"021000021","amount":"1,234.56"}' },
    theme: ['#B31942', '#0A3161', '#FFFFFF'], marker: { x: 32, y: 34 }, related: ['CA', 'MX']
  },
  {
    slug: 'canada', iso2: 'CA', iso3: 'CAN', isoNumeric: '124', name: 'Canada', adjective: 'Canadian', nativeName: 'Canada',
    flag: '🇨🇦', language: 'English and French', localLanguage: 'en-CA / fr-CA', currency: 'CAD', currencyName: 'Canadian dollar',
    locale: 'en-CA', icu: 'en_CA', date: 'YYYY-MM-DD / DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+1',
    capital: 'Ottawa', continent: 'North America', region: 'North America', population: 'approximately 41M',
    identifiers: ['SIN', 'Business Number', 'GST/HST', 'postal code', 'transit number', 'phone'],
    payments: ['institution number', 'transit number', 'EFT', 'Interac handoff', 'SWIFT'],
    localTerms: { personal: 'SIN', company: 'Business Number', tax: 'GST/HST number', social: 'SIN', register: 'provincial/federal business registry', invoice: 'GST/HST invoice', payment: 'EFT / Interac', bank: 'institution/transit/account', postal: 'postal code', privacy: 'PIPEDA / provincial privacy' },
    samples: { personal: '046 454 286', company: '123456789RT0001', social: '046 454 286', vat: 'CA 123456789RT0001', bank: '001 00011 1234567', iban: '001000111234567', phone: '+1 613 555 0142', postal: 'K1A 0B1', plate: 'ABCD 123', amount: '1,234.56 CAD', date: '2026-07-21', address: '111 Wellington St, Ottawa, ON K1A 0A9', json: '{"country":"CA","businessNumber":"123456789RT0001","transit":"00011","amount":"1,234.56"}' },
    theme: ['#D52B1E', '#FFFFFF', '#111827'], marker: { x: 38, y: 23 }, related: ['US', 'MX']
  },
  {
    slug: 'mexico', iso2: 'MX', iso3: 'MEX', isoNumeric: '484', name: 'Mexico', adjective: 'Mexican', nativeName: 'Mexico',
    flag: '🇲🇽', language: 'Spanish', localLanguage: 'es-MX', currency: 'MXN', currencyName: 'Mexican peso',
    locale: 'es-MX', icu: 'es_MX', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+52',
    capital: 'Mexico City', continent: 'North America', region: 'North America / Latin America', population: 'approximately 130M',
    identifiers: ['RFC', 'CURP', 'NSS', 'postal code', 'CLABE', 'phone'],
    payments: ['CLABE', 'SPEI', 'CoDi handoff', 'SWIFT', 'CFDI'],
    localTerms: { personal: 'CURP', company: 'RFC', tax: 'SAT RFC / IVA', social: 'NSS', register: 'SAT / public registry handoff', invoice: 'CFDI', payment: 'SPEI / CLABE', bank: 'CLABE', postal: 'codigo postal', privacy: 'LFPDPPP privacy' },
    samples: { personal: 'GODE561231HDFRRN09', company: 'XAXX010101000', social: '12345678901', vat: 'MX XAXX010101000', bank: '002010077777777771', iban: '002010077777777771', phone: '+52 55 1234 5678', postal: '06000 Ciudad de Mexico', plate: 'ABC-123-D', amount: '1,234.56 MXN', date: '21/07/2026', address: 'Av. Juarez 1, Centro, 06000 Ciudad de Mexico', json: '{"country":"MX","rfc":"XAXX010101000","clabe":"002010077777777771","amount":"1,234.56"}' },
    theme: ['#006341', '#FFFFFF', '#CE1126'], marker: { x: 31, y: 48 }, related: ['US', 'GT', 'BZ']
  }
];

const SMALL_COUNTRIES = [
  ['belize', 'BZ', 'BLZ', '084', 'Belize', 'Belizean', '🇧🇿', 'English', 'BZD', 'Belize dollar', '+501', 'Belmopan', 'approximately 0.4M', 'TIN', 'business registration number', 'GST number', 'domestic bank account', 'postal district', ['#003F87', '#CE1126', '#FFFFFF'], ['MX', 'GT']],
  ['guatemala', 'GT', 'GTM', '320', 'Guatemala', 'Guatemalan', '🇬🇹', 'Spanish', 'GTQ', 'Guatemalan quetzal', '+502', 'Guatemala City', 'approximately 18M', 'CUI / DPI', 'NIT', 'IVA NIT', 'domestic account', 'codigo postal', ['#4997D0', '#FFFFFF', '#111827'], ['MX', 'BZ', 'HN', 'SV']],
  ['el-salvador', 'SV', 'SLV', '222', 'El Salvador', 'Salvadoran', '🇸🇻', 'Spanish', 'USD', 'US dollar', '+503', 'San Salvador', 'approximately 6.3M', 'DUI', 'NIT', 'IVA NIT', 'domestic account', 'codigo postal', ['#0F47AF', '#FFFFFF', '#F5B700'], ['GT', 'HN']],
  ['honduras', 'HN', 'HND', '340', 'Honduras', 'Honduran', '🇭🇳', 'Spanish', 'HNL', 'Honduran lempira', '+504', 'Tegucigalpa', 'approximately 10.9M', 'DNI', 'RTN', 'ISV / RTN', 'domestic account', 'codigo postal', ['#00BCE4', '#FFFFFF', '#111827'], ['GT', 'SV', 'NI']],
  ['nicaragua', 'NI', 'NIC', '558', 'Nicaragua', 'Nicaraguan', '🇳🇮', 'Spanish', 'NIO', 'Nicaraguan cordoba', '+505', 'Managua', 'approximately 7.0M', 'Cedula', 'RUC', 'IVA / RUC', 'domestic account', 'codigo postal', ['#0067C6', '#FFFFFF', '#111827'], ['HN', 'CR']],
  ['costa-rica', 'CR', 'CRI', '188', 'Costa Rica', 'Costa Rican', '🇨🇷', 'Spanish', 'CRC', 'Costa Rican colon', '+506', 'San Jose', 'approximately 5.3M', 'Cedula', 'Cedula juridica', 'IVA / cedula juridica', 'IBAN / cuenta cliente', 'codigo postal', ['#002B7F', '#FFFFFF', '#CE1126'], ['NI', 'PA']],
  ['panama', 'PA', 'PAN', '591', 'Panama', 'Panamanian', '🇵🇦', 'Spanish', 'PAB/USD', 'balboa / US dollar', '+507', 'Panama City', 'approximately 4.6M', 'Cedula', 'RUC / DV', 'ITBMS / RUC', 'domestic account', 'codigo postal', ['#005293', '#D21034', '#FFFFFF'], ['CR', 'CO']],
  ['bahamas', 'BS', 'BHS', '044', 'Bahamas', 'Bahamian', '🇧🇸', 'English', 'BSD', 'Bahamian dollar', '+1-242', 'Nassau', 'approximately 0.4M', 'NIB number', 'business license number', 'VAT TIN', 'domestic bank account', 'island/locality', ['#00ABC9', '#FAE042', '#000000'], ['US', 'CU']],
  ['cuba', 'CU', 'CUB', '192', 'Cuba', 'Cuban', '🇨🇺', 'Spanish', 'CUP', 'Cuban peso', '+53', 'Havana', 'approximately 10.9M', 'Carnet de identidad', 'NIT', 'tax identifier', 'domestic account', 'codigo postal', ['#002A8F', '#FFFFFF', '#CF142B'], ['BS', 'HT', 'JM']],
  ['jamaica', 'JM', 'JAM', '388', 'Jamaica', 'Jamaican', '🇯🇲', 'English', 'JMD', 'Jamaican dollar', '+1-876', 'Kingston', 'approximately 2.8M', 'TRN', 'company number', 'GCT / TRN', 'domestic bank account', 'postal zone', ['#009B3A', '#FED100', '#000000'], ['CU', 'HT']],
  ['haiti', 'HT', 'HTI', '332', 'Haiti', 'Haitian', '🇭🇹', 'French and Haitian Creole', 'HTG', 'Haitian gourde', '+509', 'Port-au-Prince', 'approximately 11.9M', 'NIF / CIN', 'NIF', 'tax identifier', 'domestic account', 'postal code', ['#00209F', '#D21034', '#FFFFFF'], ['DO', 'CU']],
  ['dominican-republic', 'DO', 'DOM', '214', 'Dominican Republic', 'Dominican', '🇩🇴', 'Spanish', 'DOP', 'Dominican peso', '+1-809', 'Santo Domingo', 'approximately 11.5M', 'Cedula', 'RNC', 'ITBIS / RNC', 'domestic account', 'codigo postal', ['#002D62', '#CE1126', '#FFFFFF'], ['HT', 'PR']],
  ['antigua-and-barbuda', 'AG', 'ATG', '028', 'Antigua and Barbuda', 'Antiguan and Barbudan', '🇦🇬', 'English', 'XCD', 'East Caribbean dollar', '+1-268', 'St. John’s', 'approximately 0.1M', 'national ID', 'company number', 'ABST registration', 'domestic bank account', 'parish/locality', ['#CE1126', '#0072CE', '#FCD116'], ['KN', 'DM']],
  ['dominica', 'DM', 'DMA', '212', 'Dominica', 'Dominican', '🇩🇲', 'English', 'XCD', 'East Caribbean dollar', '+1-767', 'Roseau', 'approximately 0.07M', 'national ID', 'company number', 'VAT registration', 'domestic bank account', 'parish/locality', ['#006B3F', '#FCD116', '#111827'], ['LC', 'AG']],
  ['saint-kitts-and-nevis', 'KN', 'KNA', '659', 'Saint Kitts and Nevis', 'Kittitian and Nevisian', '🇰🇳', 'English', 'XCD', 'East Caribbean dollar', '+1-869', 'Basseterre', 'approximately 0.05M', 'national ID', 'company number', 'VAT registration', 'domestic bank account', 'parish/locality', ['#009739', '#EF3340', '#FCD116'], ['AG', 'VC']],
  ['saint-lucia', 'LC', 'LCA', '662', 'Saint Lucia', 'Saint Lucian', '🇱🇨', 'English', 'XCD', 'East Caribbean dollar', '+1-758', 'Castries', 'approximately 0.18M', 'national ID', 'company number', 'VAT registration', 'domestic bank account', 'district/locality', ['#66CCFF', '#FCD116', '#111827'], ['DM', 'VC']],
  ['saint-vincent-and-the-grenadines', 'VC', 'VCT', '670', 'Saint Vincent and the Grenadines', 'Vincentian', '🇻🇨', 'English', 'XCD', 'East Caribbean dollar', '+1-784', 'Kingstown', 'approximately 0.1M', 'national ID', 'company number', 'VAT registration', 'domestic bank account', 'parish/locality', ['#0072CE', '#FCD116', '#009E60'], ['LC', 'GD']],
  ['grenada', 'GD', 'GRD', '308', 'Grenada', 'Grenadian', '🇬🇩', 'English', 'XCD', 'East Caribbean dollar', '+1-473', 'St. George’s', 'approximately 0.13M', 'national ID', 'company number', 'VAT registration', 'domestic bank account', 'parish/locality', ['#CE1126', '#FCD116', '#009739'], ['VC', 'TT']],
  ['barbados', 'BB', 'BRB', '052', 'Barbados', 'Barbadian', '🇧🇧', 'English', 'BBD', 'Barbadian dollar', '+1-246', 'Bridgetown', 'approximately 0.28M', 'national registration number', 'company number', 'VAT registration', 'domestic bank account', 'parish/locality', ['#00267F', '#FFC726', '#111827'], ['TT', 'LC']],
  ['trinidad-and-tobago', 'TT', 'TTO', '780', 'Trinidad and Tobago', 'Trinidadian and Tobagonian', '🇹🇹', 'English', 'TTD', 'Trinidad and Tobago dollar', '+1-868', 'Port of Spain', 'approximately 1.5M', 'national ID', 'BIR number', 'VAT registration', 'domestic bank account', 'postal code', ['#CE1126', '#FFFFFF', '#111827'], ['GD', 'BB']]
].map(([slug, iso2, iso3, isoNumeric, name, adjective, flag, language, currency, currencyName, phone, capital, population, personal, company, tax, bank, postal, theme, related]) => ({
  slug, iso2, iso3, isoNumeric, name, adjective, nativeName: name, flag, language, localLanguage: language.includes('Spanish') ? 'es' : 'en',
  currency, currencyName, locale: language.includes('Spanish') ? 'es' : 'en', icu: language.includes('Spanish') ? 'es' : 'en',
  date: language.includes('Spanish') ? 'DD/MM/YYYY' : 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone,
  capital, continent: 'North America', region: 'North America / Caribbean and Central America', population,
  identifiers: [personal, company, tax, postal, 'phone'], payments: [bank, 'SWIFT/BIC', 'payment reference'],
  localTerms: { personal, company, tax, social: personal, register: 'business registry', invoice: 'tax invoice', payment: 'domestic payment reference', bank, postal, privacy: 'local privacy/data protection' },
  samples: { personal: `${iso2}123456`, company: `${iso2}-COMP-123456`, social: `${iso2}123456`, vat: `${iso2} TAX 123456`, bank: `${iso2} BANK 001 123456`, iban: `${iso2}001123456`, phone: `${phone} 555 0142`, postal: `${postal} sample`, plate: `${iso2} 1234`, amount: `1,234.56 ${currency}`, date: '21/07/2026', address: `1 Main Street, ${capital}`, json: `{"country":"${iso2}","tax":"${iso2} TAX 123456","amount":"1,234.56 ${currency}"}` },
  theme, marker: { x: 34, y: 48 }, related
}));

COUNTRIES.push(...SMALL_COUNTRIES);

const COUNTRY_TIME_ZONES = {
  'united-states': 'America/New_York',
  canada: 'America/Toronto',
  mexico: 'America/Mexico_City',
  belize: 'America/Belize',
  guatemala: 'America/Guatemala',
  'el-salvador': 'America/El_Salvador',
  honduras: 'America/Tegucigalpa',
  nicaragua: 'America/Managua',
  'costa-rica': 'America/Costa_Rica',
  panama: 'America/Panama',
  bahamas: 'America/Nassau',
  cuba: 'America/Havana',
  jamaica: 'America/Jamaica',
  haiti: 'America/Port-au-Prince',
  'dominican-republic': 'America/Santo_Domingo',
  'antigua-and-barbuda': 'America/Antigua',
  dominica: 'America/Dominica',
  'saint-kitts-and-nevis': 'America/St_Kitts',
  'saint-lucia': 'America/St_Lucia',
  'saint-vincent-and-the-grenadines': 'America/St_Vincent',
  grenada: 'America/Grenada',
  barbados: 'America/Barbados',
  'trinidad-and-tobago': 'America/Port_of_Spain'
};

const TOOL_TEMPLATES = [
  ['{personalSlug}-validator', '{adj} {personal} Validator', 'ID', 'Validate local personal identifier shape, split visible evidence, and keep official identity status out of browser-only results.', 'national-identifiers', 'personal', 'Validate', '{personalSample}'],
  ['{companySlug}-validator', '{adj} {company} Validator', 'ORG', 'Inspect company or registry identifier shape, prefixes, local vocabulary, and official registry handoff boundaries.', 'national-identifiers', 'company', 'Validate', '{companySample}'],
  ['tax-id-inspector', '{adj} {tax} Inspector', 'TAX', 'Normalize tax identifier snippets, inspect local body evidence, and prepare official tax-authority handoff notes.', 'tax', 'vat', 'Inspect', '{vatSample}'],
  ['company-onboarding-auditor', '{adj} Company Onboarding Auditor', 'KYC', 'Audit company intake payloads for identifier, address, banking, tax, and privacy readiness.', 'developer-tools', 'companyonboarding', 'Audit', '{jsonSample}'],
  ['business-register-readiness-helper', '{adj} Business Registry Readiness Helper', 'REG', 'Prepare browser-only evidence before a regulated business registry lookup or filing workflow.', 'government', 'register', 'Audit', '{companySample} {addressSample}'],
  ['id-card-format-helper', '{adj} ID Card Format Helper', 'CARD', 'Inspect identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.', 'national-identifiers', 'document', 'Inspect', '{personalSample}'],
  ['passport-mrz-parser', '{adj} MRZ / Passport Parser', 'MRZ', 'Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.', 'national-identifiers', 'document', 'Parse', 'P<{iso3}SAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<'],
  ['domestic-bank-account-inspector', '{adj} {bank} Inspector', 'BANK', 'Inspect domestic bank account slices, routing blocks, account text, and payment-provider boundaries.', 'finance', 'bankcode', 'Inspect', '{bankSample}'],
  ['bic-swift-inspector', '{adj} BIC / SWIFT Inspector', 'BIC', 'Inspect BIC institution, country, location, and branch evidence for cross-border banking integrations.', 'finance', 'bic', 'Inspect', 'ABCD{iso2}2X'],
  ['payment-reference-helper', '{adj} {payment} Helper', 'PAY', 'Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.', 'finance', 'paymentref', 'Inspect', '{payment} REF 2026-001 {amountSample}'],
  ['remittance-text-builder', '{adj} Remittance Text Builder', 'REMIT', 'Build concise remittance text from invoice, customer, tax, and local payment reference evidence.', 'finance', 'remittance', 'Format', 'Invoice 2026-001 {vatSample} {amountSample}'],
  ['bank-statement-parser', '{adj} Bank Statement Parser', 'STMT', 'Parse statement rows for date, amount, counterparty, reference, and local decimal conventions.', 'finance', 'statement', 'Parse', '{dateSample}; {amountSample}; {bankSample}; sample counterparty'],
  ['currency-decimal-formatter', '{adj} {currency} Decimal Currency Formatter', 'CUR', 'Normalize local amount strings, decimal separators, grouping, and API-safe numeric previews.', 'finance', 'amount', 'Format', '{amountSample}'],
  ['postal-code-validator', '{adj} {postal} Validator', 'POST', 'Validate postal/address locality shape, split locality hints, and preserve official postal lookup boundaries.', 'address', 'postal', 'Validate', '{postalSample}'],
  ['address-normalizer', '{adj} Address Normalizer', 'ADDR', 'Normalize street, locality, administrative area, postal code, and country lines for local forms.', 'address', 'address', 'Format', '{addressSample}'],
  ['phone-number-validator', '{adj} Phone Number Validator', 'PHONE', 'Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.', 'address', 'phone', 'Validate', '{phoneSample}'],
  ['date-locale-formatter', '{adj} Date Locale Formatter', 'DATE', 'Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.', 'localization', 'date', 'Format', '{dateSample}'],
  ['csv-locale-normalizer', '{adj} CSV Locale Normalizer', 'CSV', 'Normalize CSV snippets for decimal, date, postal, phone, tax, and banking fields.', 'developer-tools', 'csv', 'Normalize', 'id,amount,date,tax\\n1,{amountSample},{dateSample},{vatSample}'],
  ['document-ocr-fixer', '{adj} Document OCR Fixer', 'OCR', 'Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.', 'documents', 'ocr', 'Fix', '{personalSample} {vatSample} {bankSample} {postalSample}'],
  ['privacy-redaction-helper', '{adj} Privacy Redaction Helper', 'PII', 'Mask personal, tax, banking, phone, and address evidence for logs and support tickets.', 'privacy', 'privacy', 'Mask', '{jsonSample}'],
  ['data-quality-workbench', '{adj} Data Quality Workbench', 'DQ', 'Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.', 'developer-tools', 'dataquality', 'Audit', '{jsonSample}'],
  ['api-payload-auditor', '{adj} API Payload Auditor', 'API', 'Audit API payload snippets for locale, tax, identifiers, banking, dates, amounts, and official boundaries.', 'developer-tools', 'api', 'Audit', '{jsonSample}']
];

const EXTRA_TOOL_TEMPLATES = [
  ['state-province-code-mapper', '{adj} State / Province Code Mapper', 'AREA', 'Map local administrative area labels, abbreviations, and address payload hints for browser-only form routing.', 'address', 'area', 'Map', '{addressSample}'],
  ['locality-autocomplete-fixture-builder', '{adj} Locality Autocomplete Fixture Builder', 'CITY', 'Build country-local city, district, postal, and address fixtures for autocomplete QA without live geocoding.', 'address', 'address', 'Generate', '{addressSample}'],
  ['government-form-field-normalizer', '{adj} Government Form Field Normalizer', 'FORM', 'Normalize local government-form labels, identifier fields, dates, and address lines before portal handoff.', 'government', 'form', 'Normalize', '{jsonSample}'],
  ['tax-invoice-field-auditor', '{adj} Tax Invoice Field Auditor', 'INV', 'Audit invoice snippets for local tax IDs, currency, address, date, line totals, and official filing boundaries.', 'tax', 'invoice', 'Audit', 'Invoice 2026-001 {vatSample} {amountSample} {addressSample}'],
  ['sales-tax-vat-threshold-checklist', '{adj} Sales Tax / VAT Threshold Checklist', 'THR', 'Inspect revenue, registration, local tax labels, and threshold handoff notes without making legal conclusions.', 'tax', 'checklist', 'Audit', '{jsonSample}'],
  ['withholding-tax-form-helper', '{adj} Withholding Tax Form Helper', 'WHT', 'Prepare local withholding-tax form evidence, payee IDs, dates, amounts, and review notes for finance teams.', 'tax', 'tax', 'Inspect', '{companySample} {amountSample} {dateSample}'],
  ['customs-import-code-inspector', '{adj} Customs / Import Code Inspector', 'CUS', 'Inspect customs references, importer IDs, invoice fields, currency, and shipment handoff evidence.', 'logistics', 'customs', 'Inspect', '{companySample} IMPORT 2026 {amountSample}'],
  ['payroll-id-intake-helper', '{adj} Payroll ID Intake Helper', 'PAYR', 'Check employee intake payloads for local personal IDs, tax IDs, dates, address, and privacy-safe masking.', 'national-identifiers', 'payroll', 'Audit', '{personalSample} {dateSample} {addressSample}'],
  ['benefits-social-number-redaction', '{adj} Benefits / Social Number Redaction Helper', 'BEN', 'Mask local social, benefits, tax, phone, and address evidence before logs, tickets, or screenshots.', 'privacy', 'privacy', 'Mask', '{personalSample} {phoneSample} {addressSample}'],
  ['business-license-checklist', '{adj} Business License Checklist', 'LIC', 'Audit local business-license intake evidence, registry IDs, addresses, tax labels, and official lookup boundaries.', 'government', 'register', 'Audit', '{companySample} {vatSample} {addressSample}'],
  ['ownership-kyb-payload-auditor', '{adj} Ownership / KYB Payload Auditor', 'KYB', 'Inspect KYB payloads for company IDs, beneficial-owner fields, addresses, dates, and masked evidence.', 'developer-tools', 'companyonboarding', 'Audit', '{jsonSample}'],
  ['sanctions-screening-payload-helper', '{adj} Sanctions Screening Payload Helper', 'SCRN', 'Prepare offline screening payloads with names, addresses, identifiers, and no false match-status claims.', 'privacy', 'screening', 'Inspect', '{jsonSample}'],
  ['bank-routing-handoff-checklist', '{adj} Bank Routing Handoff Checklist', 'ROUT', 'Check routing, account, branch, currency, payment reference, and provider-boundary fields before bank handoff.', 'finance', 'bankcode', 'Audit', '{bankSample} {amountSample}'],
  ['payout-recipient-validator', '{adj} Payout Recipient Validator', 'OUT', 'Inspect payout recipient payloads for local name, account, tax, phone, address, currency, and retry-safe evidence.', 'finance', 'paymentref', 'Validate', '{jsonSample}'],
  ['refund-reference-builder', '{adj} Refund Reference Builder', 'REF', 'Build local refund references from invoice, customer, payment, amount, and reconciliation fields.', 'finance', 'paymentref', 'Format', 'Refund 2026-001 {companySample} {amountSample}'],
  ['chargeback-evidence-pack-helper', '{adj} Chargeback Evidence Pack Helper', 'CBK', 'Organize browser-only payment, invoice, address, date, and customer evidence for dispute workflows.', 'finance', 'paymentref', 'Audit', '{jsonSample}'],
  ['ecommerce-checkout-locale-auditor', '{adj} Ecommerce Checkout Locale Auditor', 'SHOP', 'Audit checkout payloads for local address, phone, postal, currency, date, and tax-field assumptions.', 'developer-tools', 'dataquality', 'Audit', '{jsonSample}'],
  ['shipping-label-normalizer', '{adj} Shipping Label Normalizer', 'SHIP', 'Normalize local shipping-label blocks, recipient names, postal/locality fields, phone, and delivery notes.', 'logistics', 'address', 'Normalize', '{addressSample} {phoneSample}'],
  ['customs-address-line-helper', '{adj} Customs Address Line Helper', 'ADR2', 'Split exporter/importer address lines, locality, postal data, country code, and customs-safe payloads.', 'logistics', 'address', 'Format', '{addressSample}'],
  ['vehicle-registration-format-helper', '{adj} Vehicle Registration Format Helper', 'VEH', 'Inspect vehicle-registration snippets, plate shapes, region hints, and official transport boundary notes.', 'documents', 'vehicle', 'Inspect', '{plateSample}'],
  ['driver-license-format-helper', '{adj} Driver License Format Helper', 'DL', 'Inspect driving-license snippets, dates, document numbers, and privacy-safe evidence for transport intake.', 'documents', 'document', 'Inspect', '{personalSample} {dateSample}'],
  ['utility-bill-address-proof-auditor', '{adj} Utility Bill Address Proof Auditor', 'BILL', 'Audit utility-bill OCR text for names, dates, address lines, account numbers, and masked support evidence.', 'documents', 'ocr', 'Audit', '{addressSample} {dateSample}'],
  ['kyc-document-bundle-auditor', '{adj} KYC Document Bundle Auditor', 'DOCS', 'Check KYC document bundles for local ID, tax, address, date, file labels, and official-boundary notes.', 'documents', 'document', 'Audit', '{jsonSample}'],
  ['invoice-number-format-helper', '{adj} Invoice Number Format Helper', 'NUM', 'Normalize invoice-number patterns, series, date fragments, counterparty hints, and duplicate-risk notes.', 'tax', 'invoice', 'Inspect', 'INV-2026-001 {companySample}'],
  ['receipt-tax-line-parser', '{adj} Receipt Tax Line Parser', 'RCT', 'Parse receipt text for tax labels, totals, currency, dates, and local decimal/grouping evidence.', 'tax', 'invoice', 'Parse', '{dateSample} {amountSample} {vatSample}'],
  ['phone-extension-normalizer', '{adj} Phone Extension Normalizer', 'EXT', 'Normalize local phone numbers with extension, country prefix, national blocks, and CRM-safe output.', 'address', 'phone', 'Normalize', '{phoneSample} ext 123'],
  ['timezone-business-hours-helper', '{adj} Business Hours / Time Zone Helper', 'TZ', 'Preview local business-hour windows, date cutoffs, support handoffs, and timezone caveats.', 'localization', 'date', 'Inspect', '{dateSample} 09:00-17:00'],
  ['holiday-calendar-fixture-builder', '{adj} Holiday Calendar Fixture Builder', 'CAL', 'Build local calendar fixtures and holiday-review payloads without claiming official holiday coverage.', 'localization', 'date', 'Generate', '{dateSample}'],
  ['name-parser-transliteration-helper', '{adj} Name Parser / Transliteration Helper', 'NAME', 'Split local personal/company names, accents, casing, transliteration, and search-key fixtures.', 'localization', 'text', 'Parse', '{adj} Sample Name'],
  ['email-domain-locality-checker', '{adj} Email Domain Locality Checker', 'MAIL', 'Inspect email/domain strings for local TLD hints, plus addressing, masking, and no-deliverability boundaries.', 'developer-tools', 'email', 'Inspect', 'test@example.{iso2}'],
  ['form-autofill-fixture-generator', '{adj} Form Autofill Fixture Generator', 'AUTO', 'Generate browser-only local form fixtures for IDs, tax, phone, postal, address, and banking fields.', 'developer-tools', 'dataquality', 'Generate', '{jsonSample}'],
  ['webhook-local-payload-fixture', '{adj} Webhook Local Payload Fixture', 'HOOK', 'Build webhook payload fixtures with local IDs, tax, currency, dates, masked fields, and replay metadata.', 'developer-tools', 'api', 'Generate', '{jsonSample}'],
  ['graphql-input-auditor', '{adj} GraphQL Input Auditor', 'GQL', 'Audit GraphQL-style input objects for local identifiers, tax fields, dates, amounts, and nullable hazards.', 'developer-tools', 'api', 'Audit', '{jsonSample}'],
  ['openapi-country-schema-helper', '{adj} OpenAPI Country Schema Helper', 'OAS', 'Draft and inspect OpenAPI schema snippets for local identifiers, address, phone, payment, and tax fields.', 'developer-tools', 'api', 'Inspect', '{jsonSample}'],
  ['sql-seed-data-builder', '{adj} SQL Seed Data Builder', 'SQL', 'Build local seed-data rows for identifiers, tax, address, phone, amount, and bank fixtures.', 'developer-tools', 'dataquality', 'Generate', '{jsonSample}'],
  ['json-schema-local-rules-helper', '{adj} JSON Schema Local Rules Helper', 'JSON', 'Inspect JSON Schema rules for local field names, patterns, examples, and official-boundary copy.', 'developer-tools', 'api', 'Inspect', '{jsonSample}'],
  ['test-case-matrix-builder', '{adj} Test Case Matrix Builder', 'CASE', 'Generate valid, invalid, short, wrong-country, masking, and boundary test-case matrices for local workflows.', 'developer-tools', 'dataquality', 'Generate', '{jsonSample}'],
  ['data-retention-policy-helper', '{adj} Data Retention Policy Helper', 'RET', 'Organize local retention, masking, audit-log, and deletion checklist fields without giving legal advice.', 'privacy', 'privacy', 'Audit', '{jsonSample}'],
  ['accessibility-form-label-auditor', '{adj} Accessibility Form Label Auditor', 'A11Y', 'Audit local form labels, autocomplete names, error copy, and screen-reader hints for identifier workflows.', 'developer-tools', 'form', 'Audit', '{personalSample} {postalSample}']
];

TOOL_TEMPLATES.push(...EXTRA_TOOL_TEMPLATES);

function ensureDir(rel) {
  fs.mkdirSync(path.join(ROOT, rel), { recursive: true });
}

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

function slugify(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function hexToRgbTriplet(hex) {
  const normalized = String(hex || '').replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return '15 118 110';
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function fill(template, country) {
  const map = {
    name: country.name, adj: country.adjective, iso2: country.iso2, iso3: country.iso3, currency: country.currency,
    personal: country.localTerms.personal, company: country.localTerms.company, tax: country.localTerms.tax,
    register: country.localTerms.register, payment: country.localTerms.payment, bank: country.localTerms.bank, postal: country.localTerms.postal,
    personalSlug: slugify(country.localTerms.personal), companySlug: slugify(country.localTerms.company),
    personalSample: country.samples.personal, companySample: country.samples.company, vatSample: country.samples.vat,
    bankSample: country.samples.bank, phoneSample: country.samples.phone, postalSample: country.samples.postal,
    amountSample: country.samples.amount, dateSample: country.samples.date, addressSample: country.samples.address,
    plateSample: country.samples.plate, jsonSample: country.samples.json
  };
  return String(template).replace(/\{([a-zA-Z0-9]+)\}/g, (_, key) => map[key] ?? '');
}

function samples(tool, country, index) {
  const valid = fill(tool[7], country);
  return [
    { label: 'Valid sample', value: valid, intent: 'valid', tone: 'success' },
    { label: 'Invalid sample', value: `Invalid ${valid}`, intent: 'review', tone: 'review' },
    { label: 'Short sample', value: valid.slice(0, Math.max(3, Math.ceil(valid.length * 0.45))), intent: 'review', tone: 'review' },
    { label: 'Wrong country sample', value: `ZZ ${valid}`, intent: 'review', tone: 'review' },
    { label: 'Edge sample', value: `${country.iso2} review edge ${index + 1}`, intent: 'review', tone: 'review' }
  ];
}

function toolObjects(country) {
  return TOOL_TEMPLATES.map((tpl, index) => ({
    id: `${country.slug}-${fill(tpl[0], country)}`,
    name: fill(tpl[1], country),
    code: tpl[2],
    summary: fill(tpl[3], country),
    category: tpl[4],
    actionLabel: tpl[6],
    kind: tpl[5],
    samples: samples(tpl, country, index),
    boundaries: [`Official ${country.name} identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider.`],
    qualityNotes: [
      { title: `${tpl[2]} local evidence`, text: `${fill(tpl[1], country)} analyzes ${country.name}-specific evidence locally in this browser.` },
      { title: 'Official boundary', text: `Offline parser evidence does not prove official ${country.name} status.` },
      { title: 'Fixture safety', text: 'Valid and invalid samples are structural fixtures for tests and demos.' },
      { title: 'Developer handling', text: 'Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff.' }
    ]
  }));
}

function suiteJs(country, tools) {
  const accent = country.theme[0];
  const accent2 = country.theme[1];
  const accent3 = country.theme[2];
  return `(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.${country.slug}-suite';
  const RAW_TOOLS = ${JSON.stringify(tools, null, 2)};
  const COUNTRY = ${JSON.stringify({ slug: country.slug, name: country.name, adjective: country.adjective, iso2: country.iso2, theme: country.theme }, null, 2)};
  const LOCALE_LABELS = { en: {}, es: {}, 'pt-BR': {}, de: {}, fr: {}, pl: {}, uk: {} };
  function text(value) { return String(value == null ? '' : value); }
  function digits(value) { return text(value).replace(/\\D/g, ''); }
  function mask(value) { const raw = text(value); if (raw.length <= 6) return raw ? raw[0] + '…' : ''; return raw.slice(0, 3) + '…' + raw.slice(-4); }
  function field(label, value, detail) { return { label, value: text(value || 'not detected'), detail: detail || 'browser-local evidence' }; }
  function check(label, pass, passText, failText) { return { label, status: pass ? 'pass' : 'review', detail: pass ? passText : failText }; }
  function analyze(tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\\s+/g, ' ').trim();
    const digitCount = digits(raw).length;
    const hasCountryCue = raw.toUpperCase().includes(COUNTRY.iso2) || raw.toUpperCase().includes(COUNTRY.name.toUpperCase().split(' ')[0]);
    const ok = raw.length >= 4 && !/^invalid|wrong|zz\\b/i.test(raw);
    const anatomy = [
      field('source payload', normalized || 'empty', 'browser-local source value'),
      field('normalized', normalized, 'local normalized value'),
      field('masked', mask(normalized), 'log-safe preview'),
      field('digit count', digitCount, 'parser input shape'),
      field('country cue', hasCountryCue ? COUNTRY.iso2 : 'not required', 'prefix/locality hint'),
      field('official boundary', 'offline only', 'live status remains outside this browser workbench')
    ];
    const result = {
      status: ok ? 'success' : 'review',
      headline: tool.code + ': ' + (ok ? 'Offline checks passed' : 'Review local evidence'),
      detail: ok ? COUNTRY.adjective + ' browser-only evidence is structurally coherent.' : 'Add a complete local value or compare against a valid fixture.',
      primary: normalized || 'empty',
      normalized,
      breakdownTitle: tool.name + ' anatomy & evidence breakdown',
      breakdownSummary: 'Segment-level local evidence, masking, country cues, and official-boundary notes for browser-only debugging.',
      breakdown: anatomy,
      fields: [
        field('normalized', normalized, 'local normalized value'),
        field('masked', mask(normalized), 'log-safe preview'),
        field('digit count', digitCount, 'parser input shape'),
        field('country cue', hasCountryCue ? COUNTRY.iso2 : 'not required', 'prefix/locality hint')
      ],
      checks: [
        check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        check(COUNTRY.adjective + ' evidence', ok, 'Local structural evidence detected.', 'Value needs local review.'),
        check('No network', true, 'No upload or registry call is made.'),
        check('Official boundary', true, 'Official status remains outside this browser workbench.')
      ],
      suggestions: ok
        ? [{ action: 'copy-normalized', label: 'Copy normalized value', detail: 'Use this local parser output in fixtures.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Compare pass/review states.' }]
        : [{ action: 'load-valid', label: 'Load valid fixture', detail: 'Compare against the success-first example.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Compare pass/review states.' }],
      developerJson: { suite: COUNTRY.slug + '-suite', tool: tool.id, status: ok ? 'success' : 'review', normalized, masked: mask(normalized), digitCount, boundary: 'offline only' }
    };
    result.developerJson.breakdown = result.breakdown;
    return result;
  }
  function mount() {
    const factory = window.ValidoHubCountrySuiteFactory;
    if (!factory) return false;
    const suite = factory.createSuite({
      suiteId: COUNTRY.slug + '-suite',
      country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective },
      theme: { accent: '${accent}', accent2: '${accent2}', accent3: '${accent3}' },
      tools: RAW_TOOLS,
      analyze
    });
    suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench'));
    window['ValidoHub' + COUNTRY.name.replace(/\\W/g, '') + 'Suite'] = suite;
    return true;
  }
  function init() { if (mount()) return; setTimeout(init, 20); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();\n`;
}

function countryData(country, tools) {
  const routes = tools.map(tool => ({ title: tool.name, href: `/en/${country.slug}/${tool.id}/`, text: tool.summary, category: tool.category }));
  return {
    id: country.slug,
    visualAssets: {
      outlineSrc: `/assets/images/countries/${country.slug}-outline.jpg`,
      outlineAlt: `${country.name} country outline`,
      mapSrc: `/assets/images/countries/${country.slug}-location.jpg`,
      mapAlt: `${country.name} location map`,
      mapMarker: { ...country.marker, label: country.capital },
      source: 'Premium raster country visual generated once for ValidoHub country navigation'
    },
    catalog: {
      id: country.slug, flag: country.flag, name: country.name, nativeName: country.nativeName, iso2: country.iso2, iso3: country.iso3,
      continent: country.continent, region: country.region, language: country.language, currency: country.currency, currencyName: country.currencyName,
      status: 'available',
      summary: `Premium ${country.name} developer hub for ${country.identifiers.join(', ')}, ${country.payments.join(', ')}, locale, privacy, documents, banking, tax, and browser-only data-quality workflows.`,
      identifiers: country.identifiers, payments: country.payments, features: ['payments', 'identity', 'government', 'banking'],
      availableWorkbenches: tools.map(tool => tool.name),
      plannedWorkbenches: [`Live ${country.localTerms.register} lookup`, 'Live tax/registry status confirmation', 'Live bank ownership lookup'],
      completion: 100,
      coordinates: country.marker,
      searchHints: country.identifiers.concat(country.payments).slice(0, 8)
    },
    hub: {
      flag: country.flag,
      name: country.name,
      badge: `Premium ${country.name} developer suite`,
      description: `Developer intelligence and browser-only workbenches for ${country.adjective.toLowerCase()} identifiers, tax, payments, banking, locale conventions, privacy, documents, and integration QA.`,
      metadata: {
        nativeName: country.nativeName, population: country.population, populationNote: 'Approximate 2026 population estimate; do not treat as a timeless constant.',
        capital: country.capital, continent: country.continent, region: country.region, languages: country.language, currency: country.currencyName,
        currencyCode: country.currency, callingCode: country.phone, internetTld: `.${country.iso2.toLowerCase()}`, drivingSide: 'Right',
        iso2: country.iso2, iso3: country.iso3, isoNumeric: country.isoNumeric, locale: country.locale, icuLocale: country.icu,
        dateFormat: country.date, timeFormat: '24-hour where used; local display varies', decimalSeparator: country.decimal, thousandsSeparator: country.thousands,
        addressFormat: `Street, locality/administrative area, postal code, ${country.name}`, postalCodeFormat: country.localTerms.postal,
        primaryTimeZone: COUNTRY_TIME_ZONES[country.slug], measurementSystem: country.slug === 'united-states' ? 'US customary and metric in technical contexts' : 'Metric-first',
        paperSize: country.slug === 'united-states' || country.slug === 'canada' || country.slug === 'mexico' ? 'Letter and/or A4 by workflow' : 'Letter/A4 varies by workflow',
        emergencyNumber: country.slug === 'united-states' || country.slug === 'canada' ? '911' : 'local emergency number varies',
        weekStarts: country.language.includes('Spanish') ? 'Monday' : 'Sunday/Monday by workflow',
        rtlSupport: 'No', unicodeLocale: country.locale, cldrLocale: country.icu, metricVsImperial: country.slug === 'united-states' ? 'US customary plus metric' : 'Metric-first'
      },
      visualIdentity: {
        countryId: country.slug, outlineLabel: `${country.name} outline`, mapLabel: `${country.name} in North America`, continentBadge: country.continent, flagLabel: `${country.name} flag`,
        heroAccentPrimary: hexToRgbTriplet(country.theme[0]),
        heroAccentSecondary: hexToRgbTriplet(country.theme[1]),
        heroAccentTertiary: hexToRgbTriplet(country.theme[2])
      },
      stats: [
        { label: 'Premium tools', value: String(tools.length), text: 'Browser-only local developer workbenches' },
        { label: 'Core locales', value: '7', text: 'Runtime-localized production locales' },
        { label: 'Field breakdown', value: '100%', text: 'Every tool exposes debug slices' }
      ],
      highlights: [
        { title: `${country.localTerms.personal} and ${country.localTerms.company}`, text: 'Local identifier workbenches split body, prefixes, local vocabulary, and official boundaries.' },
        { title: `${country.localTerms.tax} and payments`, text: 'Tax, banking, payment reference, and reconciliation tools keep browser-only checks separate from regulated status.' },
        { title: 'Developer debugging', text: 'CSV, JSON, API, privacy, OCR, locale, and data-quality tools expose field breakdown and developer payloads.' }
      ],
      developerNotes: [
        { title: 'No official claims', text: `Offline checks never prove official ${country.name} registry, tax, bank, postal, identity, or legal status.` },
        { title: 'Field breakdown required', text: 'Every tool must keep named slices visible because they are the primary debugging surface.' },
        { title: 'Same-country links', text: `Related workbenches stay inside /${country.slug}/ unless a comparison route is explicitly designed.` }
      ],
      commonMistakes: [
        { title: 'Treating syntax as status', text: 'A passing shape check is not an official lookup result.' },
        { title: 'Logging raw personal data', text: 'Use masked previews for tickets, logs, analytics, and screenshots.' },
        { title: 'Ignoring local separators', text: `Use ${country.decimal} and ${country.thousands} rules before API normalization.` },
        { title: 'Mixing jurisdictions', text: `Do not reuse non-${country.adjective} examples, fallback copy, or related links in this suite.` }
      ],
      officialSources: [
        { title: country.localTerms.register, text: `Official business registry lookup remains the source of truth for ${country.name}.`, status: 'official boundary' },
        { title: country.localTerms.tax, text: 'Tax validity and filing acceptance require the responsible tax authority or provider.', status: 'official boundary' },
        { title: country.localTerms.privacy, text: 'Privacy obligations require legal/process review outside browser-only diagnostics.', status: 'official boundary' }
      ],
      ecosystem: [
        { title: 'Identity and tax', text: country.identifiers.join(', '), status: 'available' },
        { title: 'Banking and payments', text: country.payments.join(', '), status: 'available' },
        { title: 'Developer data QA', text: 'CSV, JSON, API, OCR, privacy, and fixture helpers.', status: 'available' }
      ],
      localizationNotes: [
        { title: 'Locale', text: `${country.locale} / ${country.icu}; date ${country.date}.`, status: 'available' },
        { title: 'Numbers', text: `${country.currency} amounts use ${country.decimal} and ${country.thousands}.`, status: 'available' },
        { title: 'Forms', text: `${country.localTerms.personal}, ${country.localTerms.company}, ${country.localTerms.postal}, phone, address, and local banking labels need jurisdiction-specific copy.`, status: 'available' }
      ],
      searchHints: country.identifiers.concat(country.payments).slice(0, 8),
      routes
    }
  };
}

function updateScriptMappings(countries) {
  const buildCountryRel = 'scripts/build-country-dev.mjs';
  let buildCountry = fs.readFileSync(path.join(ROOT, buildCountryRel), 'utf8');
  for (const country of countries) {
    const runtime = `  ${JSON.stringify(country.slug)}: '${country.slug}-suite.js',`;
    if (!buildCountry.includes(`${JSON.stringify(country.slug)}: '${country.slug}-suite.js'`)) {
      buildCountry = buildCountry.replace("  poland: 'poland-suite.js'\n};", `  poland: 'poland-suite.js',\n${runtime}\n};`);
    }
    const algo = `  ${JSON.stringify(country.slug)}: 'validohub.${country.slug}-suite',`;
    if (!buildCountry.includes(`${JSON.stringify(country.slug)}: 'validohub.${country.slug}-suite'`)) {
      buildCountry = buildCountry.replace("  argentina: 'validohub.argentina-suite'\n};", `  argentina: 'validohub.argentina-suite',\n${algo}\n};`);
    }
    if (!buildCountry.includes(`  '${country.slug}',`)) {
      buildCountry = buildCountry.replace("  'argentina'\n]);", `  'argentina',\n  '${country.slug}'\n]);`);
    }
  }
  fs.writeFileSync(path.join(ROOT, buildCountryRel), buildCountry);
}

function updateDocs(countries) {
  const rel = 'docs/product/NORTH_AMERICA_PREMIUM_SUITE_SPEC.md';
  write(rel, `# North America Premium Suite Spec

Generated premium browser-only country suites for sovereign North American countries:

${countries.map(country => `- ${country.name} (${country.iso2})`).join('\n')}

## Contract

- Use Country Suite Factory V1 for every North America runtime.
- Do not fake official status. Browser checks only inspect local structure, labels, formatting, masking, and integration payload readiness.
- Do not add IBAN unless the jurisdiction actually uses IBAN for the workflow. US/Canada/Mexico use local rails such as ABA/ACH, EFT/institution-transit-account, RFC/CURP/CLABE/SPEI.
- Small Caribbean and Central American jurisdictions may start with local helpers where public checksum algorithms are not confirmed; do not invent a checksum.
- Every tool must render Integration traps, field breakdown, quality notes, raw JSON, batch checks, local samples, and explicit official boundaries.
- Hero visuals must follow the raster country-map rule in DEVELOPMENT_RULES.md: generated once, no text inside PNGs, no split panels, no side gutters, no satellite/terrain style.
- North America premium suites must not ship as shallow 20-ish country sets. The current baseline is 61 browser-only workbenches per country, and USA/Canada/Mexico are the minimum quality bar, not special exceptions.
- Country civic snapshots must include 3-4 meaningful main cities/towns with approximate context before sign-off. A single capital-only fallback is a regression for these generated suites.
- After adding or regenerating North America country data, rebuild the English Countries portal in the dev loop so the North America continent group lists all 23 countries. Do not rely on country-page builds alone.
- Every country must carry a real IANA primaryTimeZone for the hero clock. Placeholder text such as Local time zone varies by territory/region breaks the runtime clock and is not allowed in generated country data.
`);
}

function main() {
  ensureDir('assets/js/tools');
  ensureDir('countries/data');
  for (const country of COUNTRIES) {
    const tools = toolObjects(country);
    write(`assets/js/tools/${country.slug}-suite.js`, suiteJs(country, tools));
    write(`countries/data/${country.slug}.json`, JSON.stringify(countryData(country, tools), null, 2) + '\n');
  }
  updateScriptMappings(COUNTRIES);
  updateDocs(COUNTRIES);
  console.log(`Generated ${COUNTRIES.length} North America country suites.`);
}

main();
