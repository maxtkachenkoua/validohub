(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.france-suite';
  const TOOLS = [
  {
    "id": "france-siren-validator",
    "name": "SIREN Validator & Explainer",
    "group": "business",
    "category": "national-identifiers",
    "code": "SIREN",
    "summary": "Validate French SIREN company identifiers, replay the Luhn check digit, and produce registry-safe diagnostics.",
    "sample": "732829320",
    "kind": "siren"
  },
  {
    "id": "france-siret-validator",
    "name": "SIRET Validator & Explainer",
    "group": "business",
    "category": "national-identifiers",
    "code": "SIRET",
    "summary": "Validate French SIRET establishment identifiers, split SIREN and NIC, and verify local checksum evidence.",
    "sample": "73282932000074",
    "kind": "siret"
  },
  {
    "id": "france-nic-inspector",
    "name": "NIC Establishment Code Inspector",
    "group": "business",
    "category": "national-identifiers",
    "code": "NIC",
    "summary": "Inspect the five-digit NIC establishment suffix used inside French SIRET numbers.",
    "sample": "00074",
    "kind": "nic"
  },
  {
    "id": "france-vat-tva-validator",
    "name": "French VAT / TVA Validator",
    "group": "tax",
    "category": "tax",
    "code": "TVA",
    "summary": "Validate French VAT syntax, derive the TVA key from SIREN, and prepare VIES-ready payloads.",
    "sample": "FR40303265045",
    "kind": "vat"
  },
  {
    "id": "france-eori-validator",
    "name": "French EORI Validator",
    "group": "customs",
    "category": "customs",
    "code": "EORI",
    "summary": "Validate French EORI identifiers, extract embedded SIRET data, and mark customs lookup boundaries.",
    "sample": "FR73282932000074",
    "kind": "eori"
  },
  {
    "id": "france-ape-naf-code-inspector",
    "name": "APE / NAF Code Inspector",
    "group": "business",
    "category": "business",
    "code": "APE",
    "summary": "Inspect French APE/NAF activity codes, normalize punctuation, and prepare Sirene enrichment fields.",
    "sample": "6201Z",
    "kind": "ape"
  },
  {
    "id": "france-rcs-number-helper",
    "name": "RCS Number Helper",
    "group": "business",
    "category": "business",
    "code": "RCS",
    "summary": "Normalize RCS registration text, extract registry city and SIREN evidence, and prepare onboarding notes.",
    "sample": "RCS PARIS 732 829 320",
    "kind": "rcs"
  },
  {
    "id": "france-rm-number-helper",
    "name": "Répertoire des Métiers Helper",
    "group": "business",
    "category": "business",
    "code": "RM",
    "summary": "Normalize RM craft registration references and extract SIREN-ready identifier evidence.",
    "sample": "RM 732 829 320 PARIS",
    "kind": "rm"
  },
  {
    "id": "france-company-onboarding-auditor",
    "name": "Company Onboarding Auditor",
    "group": "business",
    "category": "business",
    "code": "ONBOARD",
    "summary": "Audit French company onboarding snippets for SIREN, SIRET, TVA, address, and payment readiness.",
    "sample": "SIRET 73282932000074\nTVA FR40303265045\nIBAN FR7630006000011234567890189",
    "kind": "companyAudit"
  },
  {
    "id": "france-sirene-lookup-readiness-helper",
    "name": "Sirene Lookup Readiness Helper",
    "group": "business",
    "category": "government",
    "code": "SIRENE",
    "summary": "Prepare SIRENE API lookup payloads with normalized SIREN/SIRET values and offline validation notes.",
    "sample": "73282932000074",
    "kind": "sireneReady"
  },
  {
    "id": "france-iban-validator",
    "name": "French IBAN Validator",
    "group": "banking",
    "category": "banking",
    "code": "IBAN",
    "summary": "Validate French IBANs, split RIB segments, run MOD-97, and expose bank, branch, account, and key fields.",
    "sample": "FR7630006000011234567890189",
    "kind": "iban"
  },
  {
    "id": "france-rib-validator",
    "name": "RIB Validator & Explainer",
    "group": "banking",
    "category": "banking",
    "code": "RIB",
    "summary": "Validate French RIB components, inspect bank code, branch code, account number, and RIB key evidence.",
    "sample": "30006 00001 12345678901 89",
    "kind": "rib"
  },
  {
    "id": "france-bank-code-inspector",
    "name": "French Bank Code Inspector",
    "group": "banking",
    "category": "banking",
    "code": "BANK",
    "summary": "Inspect five-digit French bank and branch code pairs used in RIB and IBAN payloads.",
    "sample": "30006 00001",
    "kind": "bankCode"
  },
  {
    "id": "france-bic-swift-inspector",
    "name": "French BIC / SWIFT Inspector",
    "group": "banking",
    "category": "banking",
    "code": "BIC",
    "summary": "Validate French BIC/SWIFT syntax and distinguish 8-character institution codes from 11-character branch codes.",
    "sample": "AGRIFRPP",
    "kind": "bic"
  },
  {
    "id": "france-sepa-transfer-helper",
    "name": "SEPA Transfer Helper",
    "group": "payments",
    "category": "payments",
    "code": "SEPA",
    "summary": "Build SEPA transfer-ready field bundles from French IBAN, BIC, amount, creditor, and remittance input.",
    "sample": "FR7630006000011234567890189\nAGRIFRPP\nEUR 1250,75\nFacture FA-2026-0042",
    "kind": "sepa"
  },
  {
    "id": "france-sepa-direct-debit-rum-helper",
    "name": "SEPA Direct Debit RUM Helper",
    "group": "payments",
    "category": "payments",
    "code": "RUM",
    "summary": "Normalize French SEPA mandate references and inspect length, character set, and logging-safe masked values.",
    "sample": "RUM-2026-CLIENT-00042",
    "kind": "rum"
  },
  {
    "id": "france-remittance-text-builder",
    "name": "French Remittance Text Builder",
    "group": "payments",
    "category": "payments",
    "code": "REMIT",
    "summary": "Clean French remittance text for bank transfers, invoices, and reconciliation-safe references.",
    "sample": "Facture n° FA-2026-0042 / Client Élodie Martin",
    "kind": "remittance"
  },
  {
    "id": "france-masked-iban-formatter",
    "name": "Masked IBAN Formatter",
    "group": "banking",
    "category": "privacy",
    "code": "MASK",
    "summary": "Mask French IBANs and RIB strings for logs, screenshots, support tickets, and audit evidence.",
    "sample": "FR7630006000011234567890189",
    "kind": "ibanMask"
  },
  {
    "id": "france-bank-statement-parser",
    "name": "Bank Statement Parser",
    "group": "banking",
    "category": "data-quality",
    "code": "STATEMENT",
    "summary": "Extract dates, amounts, references, IBAN-like strings, and reconciliation hints from French bank statement text.",
    "sample": "12/07/2026 VIR SEPA CLIENT MARTIN +1 250,75 EUR REF FA-2026-0042",
    "kind": "statement"
  },
  {
    "id": "france-payment-reconciliation-helper",
    "name": "Payment Reconciliation Helper",
    "group": "payments",
    "category": "data-quality",
    "code": "RECON",
    "summary": "Audit French payment records for IBAN, amount, invoice reference, date, and duplicate-risk evidence.",
    "sample": "IBAN FR7630006000011234567890189\nMontant 1250,75 EUR\nFacture FA-2026-0042\nDate 12/07/2026",
    "kind": "reconciliation"
  },
  {
    "id": "france-postal-code-validator",
    "name": "French Postal Code Validator",
    "group": "address",
    "category": "postal",
    "code": "POSTAL",
    "summary": "Validate French postal codes, infer department prefixes, and flag overseas postal ranges.",
    "sample": "75008",
    "kind": "postal"
  },
  {
    "id": "france-insee-commune-code-inspector",
    "name": "INSEE Commune Code Inspector",
    "group": "address",
    "category": "government",
    "code": "COMMUNE",
    "summary": "Inspect five-character INSEE commune codes, department prefixes, Corsica notation, and overseas boundaries.",
    "sample": "75056",
    "kind": "commune"
  },
  {
    "id": "france-department-code-inspector",
    "name": "Department Code Inspector",
    "group": "address",
    "category": "government",
    "code": "DEPT",
    "summary": "Validate French department codes including Corsica and overseas department prefixes.",
    "sample": "75",
    "kind": "department"
  },
  {
    "id": "france-region-code-mapper",
    "name": "Region Code Mapper",
    "group": "address",
    "category": "government",
    "code": "REGION",
    "summary": "Map French department evidence to practical region labels for forms, analytics, and QA notes.",
    "sample": "75",
    "kind": "region"
  },
  {
    "id": "france-cedex-address-formatter",
    "name": "CEDEX Address Formatter",
    "group": "address",
    "category": "postal",
    "code": "CEDEX",
    "summary": "Format French business and CEDEX address blocks with postcode, locality, country, and line-order checks.",
    "sample": "Valido SAS\n10 rue de Rivoli\n75001 PARIS CEDEX 01",
    "kind": "cedex"
  },
  {
    "id": "france-address-normalizer",
    "name": "French Address Normalizer",
    "group": "address",
    "category": "postal",
    "code": "ADDR",
    "summary": "Normalize French address casing, spacing, postal code placement, and country-line output.",
    "sample": "10 rue de rivoli, 75001 paris, france",
    "kind": "address"
  },
  {
    "id": "france-address-transliteration-normalizer",
    "name": "Address Transliteration Normalizer",
    "group": "address",
    "category": "localization",
    "code": "ASCII",
    "summary": "Produce ASCII-safe address variants while preserving the original French address for display.",
    "sample": "8 avenue des Champs-Élysées, 75008 Paris",
    "kind": "transliteration"
  },
  {
    "id": "france-phone-number-validator",
    "name": "French Phone Number Validator",
    "group": "phone",
    "category": "phone",
    "code": "PHONE",
    "summary": "Validate French national and +33 phone numbers, classify ranges, and normalize spacing.",
    "sample": "06 12 34 56 78",
    "kind": "phone"
  },
  {
    "id": "france-phone-e164-formatter",
    "name": "French Phone E.164 Formatter",
    "group": "phone",
    "category": "phone",
    "code": "E164",
    "summary": "Convert French phone numbers to E.164, national display spacing, and masked support-safe output.",
    "sample": "01 42 68 53 00",
    "kind": "phoneE164"
  },
  {
    "id": "france-date-locale-formatter",
    "name": "French Date / Locale Formatter",
    "group": "localization",
    "category": "localization",
    "code": "DATE",
    "summary": "Parse French date strings, produce ISO dates, and show locale display variants for forms and APIs.",
    "sample": "14/07/2026",
    "kind": "date"
  },
  {
    "id": "france-vat-rate-sanity-helper",
    "name": "VAT Rate Sanity Helper",
    "group": "tax",
    "category": "tax",
    "code": "VAT RATE",
    "summary": "Check French VAT rate values for common standard, reduced, super-reduced, and zero-rate scenarios.",
    "sample": "20%\n10%\n5,5%\n2,1%",
    "kind": "vatRate"
  },
  {
    "id": "france-invoice-number-helper",
    "name": "French Invoice Number Helper",
    "group": "tax",
    "category": "commerce",
    "code": "INVOICE",
    "summary": "Inspect French invoice numbering strings for chronology hints, uniqueness fields, and export-safe normalized values.",
    "sample": "FA-2026-000142",
    "kind": "invoice"
  },
  {
    "id": "france-e-invoicing-readiness-helper",
    "name": "E-Invoicing Readiness Helper",
    "group": "tax",
    "category": "commerce",
    "code": "E-INV",
    "summary": "Audit French e-invoicing readiness fields: SIRET, TVA, buyer references, totals, and PDF/data boundaries.",
    "sample": "SIRET 73282932000074\nTVA FR40303265045\nFacture FA-2026-000142\nTotal TTC 1250,75",
    "kind": "einvoice"
  },
  {
    "id": "france-pdp-ppf-readiness-helper",
    "name": "PDP / PPF Readiness Helper",
    "group": "tax",
    "category": "commerce",
    "code": "PDP",
    "summary": "Prepare French e-invoicing exchange payload readiness notes for PDP/PPF style integrations.",
    "sample": "Supplier SIRET 73282932000074\nBuyer SIRET 55210055400013\nInvoice FA-2026-000142",
    "kind": "pdp"
  },
  {
    "id": "france-fec-file-readiness-checker",
    "name": "FEC File Readiness Checker",
    "group": "tax",
    "category": "data-quality",
    "code": "FEC",
    "summary": "Inspect French FEC accounting export snippets for separators, dates, account codes, debit/credit, and encoding risks.",
    "sample": "JournalCode\tEcritureNum\tEcritureDate\tCompteNum\tDebit\tCredit\nVE\tFA2026001\t20260714\t707000\t0,00\t1250,75",
    "kind": "fec"
  },
  {
    "id": "france-audit-trail-checklist-generator",
    "name": "Audit Trail Checklist Generator",
    "group": "tax",
    "category": "compliance",
    "code": "AUDIT",
    "summary": "Generate a French audit-trail checklist from invoice, payment, accounting, and customer evidence snippets.",
    "sample": "Invoice FA-2026-000142 paid by SEPA on 14/07/2026, SIRET 73282932000074",
    "kind": "audit"
  },
  {
    "id": "france-gdpr-redaction-helper",
    "name": "GDPR Redaction Helper",
    "group": "privacy",
    "category": "privacy",
    "code": "GDPR",
    "summary": "Find and mask French personal data candidates before logs, screenshots, exports, or support handoffs.",
    "sample": "Élodie Martin, 06 12 34 56 78, elodie@example.fr, NIR 269054958815780",
    "kind": "gdpr"
  },
  {
    "id": "france-pii-masker",
    "name": "French PII Masker",
    "group": "privacy",
    "category": "privacy",
    "code": "PII",
    "summary": "Mask French identifiers, phone numbers, emails, IBANs, postal addresses, and person names in pasted text.",
    "sample": "Jean Dupont - 06 12 34 56 78 - FR7630006000011234567890189",
    "kind": "pii"
  },
  {
    "id": "france-data-quality-workbench",
    "name": "France Data Quality Workbench",
    "group": "data",
    "category": "data-quality",
    "code": "DATA",
    "summary": "Audit French records for identifiers, payments, addresses, phone numbers, dates, and localization consistency.",
    "sample": "SIRET=73282932000074; TVA=FR40303265045; CP=75008; TEL=0612345678",
    "kind": "dataQuality"
  },
  {
    "id": "france-compliance-checklist-generator",
    "name": "Compliance Checklist Generator",
    "group": "compliance",
    "category": "compliance",
    "code": "CHECK",
    "summary": "Generate implementation checklists for French identifier, payment, tax, privacy, and localization workflows.",
    "sample": "Build onboarding flow with SIRET, TVA, IBAN, phone, invoice number, GDPR logging",
    "kind": "checklist"
  },
  {
    "id": "france-nir-syntax-inspector",
    "name": "NIR Syntax Inspector",
    "group": "identity",
    "category": "identity",
    "code": "NIR",
    "summary": "Inspect French NIR social security number structure, field groups, and offline boundary notes.",
    "sample": "269054958815780",
    "kind": "nir"
  },
  {
    "id": "france-nir-key-validator",
    "name": "NIR Key Validator",
    "group": "identity",
    "category": "identity",
    "code": "NIR KEY",
    "summary": "Validate the two-digit NIR control key for numeric French social security identifiers.",
    "sample": "269054958815780",
    "kind": "nirKey"
  },
  {
    "id": "france-nir-masker",
    "name": "NIR Masker",
    "group": "identity",
    "category": "privacy",
    "code": "NIR MASK",
    "summary": "Mask French NIR strings while preserving low-risk field evidence for debugging and QA.",
    "sample": "269054958815780",
    "kind": "nirMask"
  },
  {
    "id": "france-passport-number-helper",
    "name": "French Passport Number Helper",
    "group": "identity",
    "category": "identity",
    "code": "PASS",
    "summary": "Inspect French passport-like strings for safe fixture shape, length, and logging boundaries.",
    "sample": "12AB34567",
    "kind": "passport"
  },
  {
    "id": "france-id-card-format-helper",
    "name": "French ID Card Format Helper",
    "group": "identity",
    "category": "identity",
    "code": "CNI",
    "summary": "Inspect French ID card-like values for shape, casing, and privacy-safe fixture handling.",
    "sample": "123456789012",
    "kind": "idcard"
  },
  {
    "id": "france-birth-data-consistency-helper",
    "name": "Birth Data Consistency Helper",
    "group": "identity",
    "category": "identity",
    "code": "BIRTH",
    "summary": "Check whether French date, department, commune, and NIR-like fields agree at syntax level.",
    "sample": "NIR 269054958815780\nBirth date 05/1969\nDepartment 49",
    "kind": "birth"
  },
  {
    "id": "france-health-insurance-boundary-helper",
    "name": "Health Insurance Boundary Helper",
    "group": "identity",
    "category": "privacy",
    "code": "HEALTH",
    "summary": "Explain offline boundaries for French health insurance identifiers and build safe test-data notes.",
    "sample": "NIR 269054958815780\nAttestation assurance maladie",
    "kind": "health"
  },
  {
    "id": "france-personal-data-fixture-generator",
    "name": "Personal Data Fixture Generator",
    "group": "identity",
    "category": "privacy",
    "code": "FIXTURE",
    "summary": "Generate privacy-safe French person fixtures with fake names, addresses, phones, and masked identifiers.",
    "sample": "generate paris customer fixture",
    "kind": "personFixture"
  },
  {
    "id": "france-license-plate-inspector",
    "name": "French License Plate Inspector",
    "group": "vehicle",
    "category": "vehicle",
    "code": "PLATE",
    "summary": "Validate French SIV plate syntax, normalize separators, and identify legacy plate boundaries.",
    "sample": "AB-123-CD",
    "kind": "plate"
  },
  {
    "id": "france-vin-validator",
    "name": "VIN Validator for France Workflows",
    "group": "vehicle",
    "category": "vehicle",
    "code": "VIN",
    "summary": "Validate VIN syntax and checksum for French registration and fleet data workflows.",
    "sample": "VF1RFB00368123456",
    "kind": "vin"
  },
  {
    "id": "france-critair-readiness-helper",
    "name": "Crit'Air Readiness Helper",
    "group": "vehicle",
    "category": "vehicle",
    "code": "CRITAIR",
    "summary": "Audit vehicle data snippets for Crit'Air certificate workflow readiness and offline boundary notes.",
    "sample": "AB-123-CD\nVIN VF1RFB00368123456\nDiesel Euro 6\nFirst registration 2019",
    "kind": "critair"
  },
  {
    "id": "france-carte-grise-field-helper",
    "name": "Carte Grise Field Helper",
    "group": "vehicle",
    "category": "vehicle",
    "code": "REGDOC",
    "summary": "Inspect French registration certificate field snippets and map labels to developer-friendly keys.",
    "sample": "A AB-123-CD\nE VF1RFB00368123456\nB 14/07/2019\nP.3 ES",
    "kind": "carteGrise"
  },
  {
    "id": "france-driving-licence-format-helper",
    "name": "Driving Licence Format Helper",
    "group": "vehicle",
    "category": "identity",
    "code": "LICENCE",
    "summary": "Inspect French driving licence-like numbers for shape, masking, and data-entry QA boundaries.",
    "sample": "123456789012",
    "kind": "driver"
  },
  {
    "id": "france-vehicle-data-redaction-helper",
    "name": "Vehicle Data Redaction Helper",
    "group": "vehicle",
    "category": "privacy",
    "code": "VEH MASK",
    "summary": "Mask French vehicle identifiers, VINs, registration plates, owner names, and support-ticket snippets.",
    "sample": "Propriétaire Jean Dupont, plaque AB-123-CD, VIN VF1RFB00368123456",
    "kind": "vehicleMask"
  },
  {
    "id": "france-municipality-department-plate-helper",
    "name": "Municipality / Department Plate Helper",
    "group": "vehicle",
    "category": "government",
    "code": "LOCAL",
    "summary": "Connect department, commune, postal, and plate snippets for QA without implying official lookup.",
    "sample": "75056 Paris AB-123-CD 75008",
    "kind": "localVehicle"
  },
  {
    "id": "france-document-ocr-fixer",
    "name": "French Document OCR Fixer",
    "group": "data",
    "category": "data-quality",
    "code": "OCR",
    "summary": "Repair common OCR artifacts in French identifiers, invoices, addresses, and official document snippets.",
    "sample": "S1RET 732 829 32O OOO74\nTVA FR4O3O3265O45",
    "kind": "ocr"
  },
  {
    "id": "france-csv-locale-normalizer",
    "name": "French CSV Locale Normalizer",
    "group": "developer",
    "category": "localization",
    "code": "CSV",
    "summary": "Normalize French CSV snippets with semicolons, comma decimals, dates, and UTF-8 accents for imports.",
    "sample": "date;montant;libellé\n14/07/2026;1 250,75;Facture été",
    "kind": "csv"
  },
  {
    "id": "france-decimal-currency-formatter",
    "name": "EUR Decimal / Currency Formatter",
    "group": "developer",
    "category": "localization",
    "code": "EUR",
    "summary": "Format French EUR amounts, parse comma decimals, and produce API-safe numeric values.",
    "sample": "1 250,75 €",
    "kind": "currency"
  },
  {
    "id": "france-accent-normalizer",
    "name": "French Accent Normalizer",
    "group": "developer",
    "category": "localization",
    "code": "ACCENT",
    "summary": "Normalize French accented text for search keys, ASCII fallbacks, slugs, and original-display preservation.",
    "sample": "École supérieure d’ingénieurs à Lyon",
    "kind": "accent"
  },
  {
    "id": "france-slug-normalizer",
    "name": "French Slug Normalizer",
    "group": "developer",
    "category": "developer",
    "code": "SLUG",
    "summary": "Create URL-safe French slugs while preserving accents in display text and explaining normalization choices.",
    "sample": "Été à Saint-Germain-en-Laye",
    "kind": "slug"
  },
  {
    "id": "france-json-fixture-generator",
    "name": "French JSON Fixture Generator",
    "group": "developer",
    "category": "developer",
    "code": "JSON",
    "summary": "Generate France-ready JSON fixtures containing identifiers, address, phone, payment, and privacy-safe sample values.",
    "sample": "customer with siret iban paris address",
    "kind": "jsonFixture"
  },
  {
    "id": "france-regex-pack-helper",
    "name": "French Regex Pack Helper",
    "group": "developer",
    "category": "developer",
    "code": "REGEX",
    "summary": "Generate and explain regex snippets for French identifiers, phones, postal codes, plates, and locale fields.",
    "sample": "SIRET phone postal IBAN plate",
    "kind": "regexPack"
  },
  {
    "id": "france-api-payload-auditor",
    "name": "French API Payload Auditor",
    "group": "developer",
    "category": "data-quality",
    "code": "API",
    "summary": "Audit JSON or form payloads for French field names, identifiers, payments, locale, and privacy-safe logging.",
    "sample": "{\"siret\":\"73282932000074\",\"vat\":\"FR40303265045\",\"phone\":\"0612345678\",\"postalCode\":\"75008\"}",
    "kind": "apiAudit"
  },
  {
    "id": "france-form-field-auditor",
    "name": "French Form Field Auditor",
    "group": "developer",
    "category": "data-quality",
    "code": "FORM",
    "summary": "Review French form-field labels, placeholders, masks, validation hints, and accessibility-safe data-entry flows.",
    "sample": "Fields: SIRET, TVA, IBAN, Téléphone, Code postal, Adresse, Date de naissance",
    "kind": "formAudit"
  }
];
  const TOOL_BY_SLUG = Object.fromEntries(TOOLS.map((tool) => [tool.id, tool]));
  function normalize(v){return String(v||'').trim()} function digits(v){return normalize(v).replace(/\D/g,'')} function alnum(v){return normalize(v).toUpperCase().replace(/[^A-Z0-9]/g,'')}
  function luhnValid(num){const s=digits(num);let sum=0,dbl=false;for(let i=s.length-1;i>=0;i--){let n=+s[i];if(dbl){n*=2;if(n>9)n-=9}sum+=n;dbl=!dbl}return s.length>0&&sum%10===0}
  function mod97(value){const p=alnum(value),m=p.slice(4)+p.slice(0,4);let r=0;for(const c of m){const part=/[A-Z]/.test(c)?String(c.charCodeAt(0)-55):c;for(const d of part)r=(r*10+Number(d))%97}return r}
  function ibanValid(v){const i=alnum(v);return i.length===27&&i.startsWith('FR')&&mod97(i)===1}
  function vatKey(siren){const n=Number(digits(siren).slice(0,9));return Number.isFinite(n)?String((12+3*(n%97))%97).padStart(2,'0'):''}
  function nirKey(base){const b=digits(base).slice(0,13);if(b.length!==13)return '';const k=97n-(BigInt(b)%97n);return String(k===97n?0n:k).padStart(2,'0')}
  function mask(v){const s=normalize(v);return s.length<9?s.replace(/.(?=.{2})/g,'*'):s.slice(0,4)+'••••'+s.slice(-4)}
  function currentTool(){const slug=(location.pathname.match(/\/([^\/]+)\/?$/)||[])[1]||'';return TOOL_BY_SLUG[slug]||TOOLS[0]}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function findings(raw){const t=normalize(raw),d=digits(t),a=alnum(t);return {siren:(d.match(/\d{9}/)||[])[0]||'',siret:(d.match(/\d{14}/)||[])[0]||'',iban:(a.match(/FR[A-Z0-9]{25}/)||[])[0]||'',vat:(a.match(/FR[A-Z0-9]{2}\d{9}/)||[])[0]||'',phone:(t.match(/(?:\+33|0)\s*[1-9](?:[ .-]*\d{2}){4}/)||[])[0]||'',postal:(d.match(/(?:0[1-9]|[1-8]\d|9[0-8])\d{3}/)||[])[0]||'',plate:(t.toUpperCase().match(/[A-Z]{2}[- ]?\d{3}[- ]?[A-Z]{2}/)||[])[0]||'',vin:(a.match(/[A-HJ-NPR-Z0-9]{17}/)||[])[0]||''}}
  function breakdownFor(tool,result){const src=(result.fields&&result.fields.length?result.fields:[{label:'Primary output',value:result.primary,note:'Normalized local output'}]).filter(Boolean);const tones=['blue','red','green','amber'];const parts=src.slice(0,8).map((f,i)=>({label:f.label||('Field '+(i+1)),value:f.value||'Not detected',note:f.note||'Extracted browser-only evidence.',tone:tones[i%tones.length]}));if(!parts.length)parts.push({label:'Primary output',value:result.primary||'Not detected',note:'No structured field was detected.',tone:'blue'});return {breakdownTitle:(tool.code||tool.name)+' field breakdown',breakdownSummary:'French local structure, extracted fields, and official-system boundary evidence.',breakdown:parts};}
  function analyze(input, tool, action='validate'){const raw=normalize(input||tool.sample);const d=digits(raw),a=alnum(raw),f=findings(raw);let status='warning',headline='France workflow inspected',primary=raw,detail='Offline structural checks completed in this browser.';const fields=[],checks=[];const add=(l,v,n='')=>fields.push({label:l,value:v||'Not detected',note:n});const chk=(l,p,n)=>checks.push({label:l,pass:!!p,note:n});
    if(action==='generate'){status='success';headline='France fixture generated';primary=tool.sample;add('Fixture',tool.sample,'Synthetic sample only.');chk('Safe sample',true,'Fixture is not proof of a real entity.')}
    else if(tool.kind==='siren'){const s=f.siren||d.slice(0,9),ok=s.length===9&&luhnValid(s);status=ok?'success':'error';headline=ok?'Valid SIREN structure':'SIREN needs attention';primary=s;add('SIREN',s);add('Check digit',s.slice(-1));add('TVA key candidate',vatKey(s));chk('Nine digits',s.length===9,'SIREN uses nine digits.');chk('Luhn checksum',ok,'The ninth digit is replayed locally.')}
    else if(tool.kind==='siret'){const s=f.siret||d.slice(0,14),ok=s.length===14&&luhnValid(s);status=ok?'success':'error';headline=ok?'Valid SIRET structure':'SIRET needs attention';primary=s;add('SIRET',s);add('SIREN',s.slice(0,9));add('NIC',s.slice(9));chk('Fourteen digits',s.length===14,'SIRET is SIREN plus NIC.');chk('Checksum',ok,'Local Luhn evidence.')}
    else if(tool.kind==='vat'){const v=f.vat||a,s=v.slice(-9),k=v.slice(2,4),ex=vatKey(s),ok=/^FR[A-Z0-9]{2}\d{9}$/.test(v)&&k===ex;status=ok?'success':'error';headline=ok?'TVA key passes locally':'TVA needs review';primary=v;add('TVA',v);add('Key',k);add('Expected key',ex);add('SIREN',s);chk('FR prefix',v.startsWith('FR'),'French VAT starts FR.');chk('Local key',ok,'Derived from SIREN before VIES.')}
    else if(tool.kind==='iban'){const i=f.iban||a,b=i.slice(4),ok=ibanValid(i);status=ok?'success':'error';headline=ok?'French IBAN passes MOD-97':'French IBAN needs review';primary=i;add('IBAN',i);add('Bank code',b.slice(0,5));add('Branch code',b.slice(5,10));add('Account number',b.slice(10,21));add('RIB key',b.slice(21,23));chk('FR country code',i.startsWith('FR'),'France IBAN begins FR.');chk('27 characters',i.length===27,'French IBAN length.');chk('MOD-97',ok,'IBAN checksum equals 1.')}
    else if(tool.kind==='nir'||tool.kind==='nirKey'){const base=d.slice(0,13),key=d.slice(13,15),ex=nirKey(base),ok=d.length>=15&&key===ex;status=ok?'success':'warning';headline=ok?'NIR key passes locally':'NIR structure inspected';primary=d;add('Sex code',base[0]);add('Year',base.slice(1,3));add('Month',base.slice(3,5));add('Department',base.slice(5,7));add('Commune',base.slice(7,10));add('Order',base.slice(10,13));add('Key',key);add('Expected key',ex);chk('13-digit base',base.length===13,'Numeric NIR base.');chk('Two-digit key',key.length===2,'Control key.');chk('Key match',ok,'Official identity proof remains out of browser.')}
    else if(tool.kind==='phone'||tool.kind==='phoneE164'){const p=f.phone||raw,clean=digits(p),nat=clean.startsWith('33')?'0'+clean.slice(2):clean,ok=/^0[1-9]\d{8}$/.test(nat);status=ok?'success':'error';headline=ok?'French phone number ready':'Phone number needs review';primary=ok?'+33'+nat.slice(1):p;add('National',nat.replace(/(\d{2})(?=\d)/g,'$1 ').trim());add('E.164',ok?'+33'+nat.slice(1):'Unavailable');add('Range',({6:'Mobile',7:'Mobile',8:'Special services',9:'VoIP'}[nat[1]]||'Geographic / other'));chk('French shape',ok,'0X plus eight digits or +33 form.')}
    else if(tool.kind==='postal'){const pc=f.postal||d.slice(0,5),ok=/^\d{5}$/.test(pc);status=ok?'success':'error';headline=ok?'Postal code shape ready':'Postal code needs five digits';primary=pc;add('Postal code',pc);add('Department prefix',pc.startsWith('97')?pc.slice(0,3):pc.slice(0,2));chk('Five digits',ok,'French postal code syntax.')}
    else if(tool.kind==='bic'){const ok=/^[A-Z]{4}FR[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(a);status=ok?'success':'error';headline=ok?'French BIC syntax ready':'BIC needs review';primary=a;add('Institution',a.slice(0,4));add('Country',a.slice(4,6));add('Branch',a.slice(8)||'Primary office');chk('8 or 11 chars',a.length===8||a.length===11,'BIC length.');chk('FR slot',a.slice(4,6)==='FR','Country segment.')}
    else if(tool.kind==='plate'){const p=raw.toUpperCase().replace(/\s/g,'-'),ok=/^[A-Z]{2}-?\d{3}-?[A-Z]{2}$/.test(p);status=ok?'success':'warning';headline=ok?'SIV plate format ready':'Plate shape inspected';primary=p.replace(/^([A-Z]{2})-?(\d{3})-?([A-Z]{2})$/,'$1-$2-$3');add('Plate',primary);chk('SIV syntax',ok,'AA-123-AA style.')}
    else if(tool.kind==='ape'){const ok=/^\d{4}[A-Z]$/.test(a);status=ok?'success':'error';headline=ok?'APE / NAF code shape ready':'APE / NAF needs review';primary=a;add('APE / NAF',a);add('Division',a.slice(0,2));chk('Four digits plus letter',ok,'APE syntax.')}
    else if(/Mask|gdpr|pii|redaction/i.test(tool.kind+tool.name)){const m=raw.replace(/[A-Z]{2}\d{2}[A-Z0-9]{11,30}/gi,x=>mask(x)).replace(/(?:\+33|0)\s*[1-9](?:[ .-]*\d{2}){4}/g,x=>mask(x.replace(/\s/g,''))).replace(/\b\d{13,15}\b/g,x=>mask(x));status='success';headline='Privacy-safe masked output';primary=m;add('Masked output',m);chk('Masking applied',m!==raw,'Sensitive-looking patterns changed.')}
    else if(tool.kind==='currency'){const n=Number(raw.replace(/[^0-9,.-]/g,'').replace(/\s/g,'').replace(',','.'));const ok=Number.isFinite(n);status=ok?'success':'error';headline=ok?'EUR amount normalized':'Amount needs review';primary=ok?new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n):raw;add('API numeric',ok?n.toFixed(2):'Unavailable');add('French display',primary);chk('Numeric parse',ok,'Comma decimal accepted.')}
    else if(tool.kind==='date'){const m=raw.match(/(\d{1,2})[\/. -](\d{1,2})[\/. -](\d{2,4})/),iso=m?(String(m[3]).padStart(4,'20')+'-'+String(m[2]).padStart(2,'0')+'-'+String(m[1]).padStart(2,'0')):'';status=iso?'success':'error';headline=iso?'French date parsed':'Date needs DD/MM/YYYY evidence';primary=iso||raw;add('ISO date',iso);chk('DD/MM/YYYY shape',!!iso,'French locale date.')}
    else if(['accent','transliteration','slug'].includes(tool.kind)){const ascii=raw.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'");const slug=ascii.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');status='success';headline=tool.kind==='slug'?'French slug generated':'Accent-normalized text ready';primary=tool.kind==='slug'?slug:ascii;add('Original',raw);add('ASCII fallback',ascii);add('Slug',slug);chk('Original preserved',raw.length>0,'Keep original for display.')}
    else {const score=Object.values(f).filter(Boolean).length;status=score>1?'success':score?'warning':'info';headline=score>1?'France data evidence looks strong':score?'Partial French evidence detected':'France workflow checklist generated';primary=raw;Object.entries(f).forEach(([k,v])=>add(k,v||'Not detected'));chk('Company evidence',!!(f.siren||f.siret||f.vat),'SIREN/SIRET/TVA fields.');chk('Payment evidence',!!f.iban,'IBAN field.');chk('Locale evidence',!!(f.phone||f.postal),'Phone or postal fields.')}
    const result={status,headline,primary,detail,fields,checks,notes:['Browser-only: raw input is not uploaded by ValidoHub.','Official existence, ownership, live registry state, and account ownership require official systems.','Use generated fixtures only for testing; never treat them as real citizens, companies, or bank accounts.'],tool:tool.name,input:raw,timestamp:new Date().toISOString()};return Object.assign(result,breakdownFor(tool,result));}
  function injectStyles(){if(document.getElementById('france-suite-styles'))return;const s=document.createElement('style');s.id='france-suite-styles';s.textContent=`.frs-shell{font-family:Inter,ui-sans-serif,system-ui,sans-serif}.frs-shell .output-field,.frs-shell .tool-message,.frs-shell .tool-feedback,.frs-shell .preview-panel,.frs-shell .advanced-panel{display:none!important}.frs-hero{position:relative;overflow:hidden;border:1px solid #cbd5e1;border-radius:8px;background:linear-gradient(115deg,rgba(0,85,164,.10),#fff 44%,rgba(239,65,53,.10));padding:18px 20px;margin:0 0 18px;box-shadow:0 24px 70px rgba(15,23,42,.08)}.frs-hero:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(15,23,42,.04) 0 1px,transparent 1px 42px);opacity:.65}.frs-hero>*{position:relative}.frs-grid-hero{display:grid;grid-template-columns:1fr minmax(280px,420px);gap:18px;align-items:center}.frs-kicker{font-size:.78rem;font-weight:950;letter-spacing:.12em;text-transform:uppercase;color:#0f766e}.frs-mark{display:inline-flex;align-items:center;justify-content:center;min-width:56px;height:56px;border:1px solid rgba(0,85,164,.22);border-radius:8px;background:rgba(255,255,255,.82);font-weight:950;font-size:1rem;color:#0055a4;box-shadow:inset 4px 0 #0055a4,inset -4px 0 #ef4135}.frs-title{margin:.45rem 0;font-size:clamp(1.32rem,1.75vw,1.72rem);line-height:1.02;color:#111827;letter-spacing:0}.frs-summary{max-width:800px;color:#64748b;font-size:.9rem;line-height:1.45}.frs-chip-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.frs-chip{border:1px solid #cbd5e1;border-radius:999px;background:#fff;color:#115e59;font-weight:850;padding:5px 10px;font-size:.76rem}.frs-samples{border:1px solid #dbe3ee;border-radius:8px;background:rgba(255,255,255,.92);padding:12px}.frs-samples label{display:block;font-size:.76rem;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#64748b;margin-bottom:8px}.frs-samples select{width:100%;min-height:38px;border:1px solid #cbd5e1;border-radius:8px;background:white;padding:0 12px;font-weight:850}.frs-copy{border:1px solid #cbd5e1;background:white;color:#111827;padding:8px 12px;border-radius:8px;font-weight:900}.frs-shell textarea,.frs-shell input[type=text]{border-radius:8px!important;border:1px solid #cbd5e1!important;font:650 .92rem/1.42 Inter,system-ui,sans-serif}.frs-shell button,.frs-shell .button{border-radius:8px!important;font-weight:900!important}.frs-shell button[type=submit],.frs-shell .primary{background:#0f766e!important;border-color:#0f766e!important;color:white!important;box-shadow:0 12px 30px rgba(15,118,110,.18)}.frs-results{margin:18px 0}.frs-result-card{border:1px solid #cbd5e1;border-radius:8px;background:linear-gradient(115deg,#fff,#f8fafc 68%,rgba(239,65,53,.05));padding:16px;box-shadow:0 20px 60px rgba(15,23,42,.07)}.frs-result-top{display:flex;gap:14px;justify-content:space-between;align-items:flex-start}.frs-status{display:flex;gap:14px;align-items:center}.frs-status-icon{width:42px;height:42px;border-radius:8px;display:grid;place-items:center;font-weight:950;font-size:1.1rem;background:#e0f2fe;color:#0055a4}.frs-success .frs-status-icon{background:#dcfce7;color:#15803d}.frs-error .frs-status-icon{background:#fee2e2;color:#b91c1c}.frs-warning .frs-status-icon{background:#fef3c7;color:#92400e}.frs-headline{margin:0;font-size:1.18rem;line-height:1.2;color:#111827}.frs-detail{margin:.3rem 0 0;color:#64748b;font-weight:650}.frs-primary{margin-top:12px;border:1px solid #dbe3ee;border-radius:8px;background:#fff;padding:12px;font:800 .95rem/1.45 ui-monospace,SFMono-Regular,Menlo,monospace;color:#111827;white-space:pre-wrap;overflow:auto}.frs-pipeline{margin:12px 0;border:1px solid #dbe3ee;border-radius:8px;padding:12px;background:#fff}.frs-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.frs-step{position:relative;border-top:4px solid #2563eb;padding-top:10px;color:#64748b;font-weight:950;text-transform:uppercase;letter-spacing:.08em;font-size:.75rem}.frs-step:before{content:"";position:absolute;top:-10px;left:0;width:16px;height:16px;border-radius:50%;background:#0f766e;border:3px solid #fff;box-shadow:0 0 0 1px #cbd5e1}.frs-step.fail{border-color:#dc2626}.frs-step.fail:before{background:#dc2626}.frs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;margin-top:12px}.frs-mini{border:1px solid #dbe3ee;border-radius:8px;background:#fff;padding:12px;min-height:88px}.frs-label{font-size:.76rem;font-weight:950;letter-spacing:.10em;text-transform:uppercase;color:#64748b}.frs-value{margin-top:6px;font-weight:900;color:#111827;line-height:1.35;word-break:break-word}.frs-note{margin-top:8px;color:#64748b;font-size:.82rem;line-height:1.4}.frs-breakdown{border:1px solid #dbe3ee;border-radius:8px;background:linear-gradient(115deg,#fff,#f8fafc 68%,rgba(0,85,164,.06));padding:14px;margin-top:14px}.frs-breakdown-head{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px}.frs-breakdown-icon{display:grid;place-items:center;flex:0 0 34px;height:34px;border-radius:8px;border:1px solid #cbd5e1;background:#fff;color:#0055a4;font-weight:950}.frs-breakdown h3{margin:0;font-size:1rem;letter-spacing:.09em;text-transform:uppercase;color:#111827}.frs-breakdown p{margin:4px 0 0;color:#64748b;font-weight:650}.frs-segments{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0}.frs-segment{min-width:92px;max-width:210px;border:1px solid #dbe3ee;border-radius:8px;background:#fff;padding:10px 12px;text-align:center;overflow:hidden}.frs-segment strong{display:block;color:#0055a4;font-size:.98rem;line-height:1.2;overflow-wrap:anywhere}.frs-segment span{display:block;margin-top:5px;color:#64748b;font-size:.68rem;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.frs-segment.tone-red strong{color:#ef4135}.frs-segment.tone-green strong{color:#0f766e}.frs-segment.tone-amber strong{color:#b45309}.frs-quality{border:1px solid #dbe3ee;border-radius:8px;background:linear-gradient(115deg,#fff,#f8fafc 70%,rgba(0,85,164,.05));padding:14px;margin-top:14px}.frs-quality h3,.frs-advanced h3{margin:0 0 12px;font-size:1rem;letter-spacing:.09em;text-transform:uppercase;color:#111827}.frs-quality ul{margin:0;padding-left:18px;color:#475569;font-weight:650;line-height:1.6}.frs-advanced{border:1px solid #dbe3ee;border-radius:8px;background:#0f172a;color:#e5e7eb;padding:14px;margin-top:14px}.frs-advanced h3{color:#e5e7eb}.frs-advanced pre{margin:0;background:#111827;border-radius:8px;padding:12px;overflow:auto;color:#e5e7eb}.frs-empty{border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc;padding:16px;color:#64748b;font-weight:700}@media(max-width:760px){.frs-grid-hero{grid-template-columns:1fr}.frs-steps{grid-template-columns:1fr 1fr}.frs-result-top{flex-direction:column}.frs-copy{width:100%}.frs-segments{justify-content:flex-start}}`;document.head.appendChild(s)}
  function hero(tool,input){const h=document.createElement('section');h.className='frs-hero';const opts=TOOLS.filter(t=>t.group===tool.group||t.id===tool.id).slice(0,8).map(t=>'<option value="'+t.id+'">'+esc(t.name)+'</option>').join('');h.innerHTML='<div class="frs-grid-hero"><div><div class="frs-kicker">France workbench</div><div class="frs-mark">'+esc(tool.code)+'</div><h2 class="frs-title">'+esc(tool.name)+'</h2><p class="frs-summary">'+esc(tool.summary)+'</p><div class="frs-chip-row"><span class="frs-chip">Browser-only</span><span class="frs-chip">Offline checks</span><span class="frs-chip">France-specific</span><span class="frs-chip">Field breakdown</span><span class="frs-chip">Quality notes</span></div></div><div class="frs-samples"><label>Samples and related France tools</label><select data-frs-select><option value="__sample">Use sample fixture for '+esc(tool.code)+'</option>'+opts+'</select><div class="frs-chip-row"><button type="button" class="frs-copy" data-frs-load>Load sample</button><button type="button" class="frs-copy" data-frs-generate>Generate fixture</button></div></div></div>';h.querySelector('[data-frs-load]').onclick=()=>{input.value=tool.sample;input.dispatchEvent(new Event('input',{bubbles:true}))};h.querySelector('[data-frs-generate]').onclick=()=>{input.value=tool.sample;input.dispatchEvent(new Event('input',{bubbles:true}))};h.querySelector('[data-frs-select]').onchange=e=>{if(e.target.value==='__sample'){input.value=tool.sample;input.dispatchEvent(new Event('input',{bubbles:true}));return}const t=TOOL_BY_SLUG[e.target.value];if(t){input.value=t.sample;input.dispatchEvent(new Event('input',{bubbles:true}))}};return h}
  function render(mount,result){if(!result){mount.innerHTML='<div class="frs-empty">Load a France sample or paste real-world test data. Results appear here immediately after the input controls; advanced analysis stays below the result cards.</div>';return}const cls='frs-'+result.status,icon=result.status==='success'?'✓':result.status==='error'?'×':'!';const fields=result.fields.map(f=>'<div class="frs-mini"><div class="frs-label">'+esc(f.label)+'</div><div class="frs-value">'+esc(f.value)+'</div>'+(f.note?'<div class="frs-note">'+esc(f.note)+'</div>':'')+'</div>').join('');const breakdown=(result.breakdown||[]).map(p=>'<article class="frs-segment tone-'+esc(p.tone||'blue')+'"><strong>'+esc(p.value)+'</strong><span>'+esc(p.label)+'</span></article>').join('');const breakdownCards=(result.breakdown||[]).map(p=>'<div class="frs-mini"><div class="frs-label">'+esc(p.label)+'</div><div class="frs-value">'+esc(p.value)+'</div><div class="frs-note">'+esc(p.note||'Local evidence only.')+'</div></div>').join('');const steps=result.checks.slice(0,4).map(c=>'<div class="frs-step '+(c.pass?'':'fail')+'">'+esc(c.label)+'</div>').join('');const checks=result.checks.map(c=>'<div class="frs-mini"><div class="frs-label">'+(c.pass?'PASS':'REVIEW')+'</div><div class="frs-value">'+esc(c.label)+'</div><div class="frs-note">'+esc(c.note)+'</div></div>').join('');mount.innerHTML='<section class="frs-result-card '+cls+'"><div class="frs-result-top"><div class="frs-status"><div class="frs-status-icon">'+icon+'</div><div><h2 class="frs-headline">'+esc(result.headline)+'</h2><p class="frs-detail">'+esc(result.detail)+'</p></div></div><button type="button" class="frs-copy" data-copy>Copy result</button></div><div class="frs-primary">'+esc(result.primary)+'</div><div class="frs-pipeline"><div class="frs-steps">'+steps+'</div></div><div class="frs-grid">'+fields+'</div><div class="frs-breakdown"><div class="frs-breakdown-head"><span class="frs-breakdown-icon">#</span><div><h3>'+esc(result.breakdownTitle||'Field breakdown')+'</h3><p>'+esc(result.breakdownSummary||'Local structural slices.')+'</p></div></div><div class="frs-segments">'+breakdown+'</div><div class="frs-grid">'+breakdownCards+'</div></div><div class="frs-quality"><h3>Quality notes</h3><ul>'+result.notes.map(n=>'<li>'+esc(n)+'</li>').join('')+'</ul></div><div class="frs-quality"><h3>Local checks</h3><div class="frs-grid">'+checks+'</div></div><div class="frs-advanced"><h3>Developer payload</h3><pre>'+esc(JSON.stringify(result,null,2))+'</pre></div></section>';mount.querySelector('[data-copy]').onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(result.primary)}
  function updateWorkbench(workbench, action) {
    const form = workbench.form || document.querySelector('form');
    const tool = currentTool();
    const input = form.querySelector('[name="input"]') || form.querySelector('textarea,input[type="text"]');
    const mount = form.querySelector('.frs-results');
    const adv = form.querySelector('[data-adv]');
    const result = analyze(input ? input.value : tool.sample, tool, action || 'validate');
    if (mount) render(mount, result);
    if (adv) adv.textContent = JSON.stringify(result, null, 2);
    if (workbench.setOutput) workbench.setOutput(result.primary);
    if (workbench.setMessage) workbench.setMessage(result.headline, result.status === 'success' ? 'success' : result.status === 'error' ? 'error' : 'info');
    workbench.lastResult = result;
    return result;
  }
  function plugin(){const tool=currentTool();return{filePrefix:'france-suite',onMount(ctx){injectStyles();const form=ctx.form||document.querySelector('form');if(!form||form.dataset.franceSuiteMounted)return;form.dataset.franceSuiteMounted='1';form.classList.add('frs-shell');const input=form.querySelector('[name="input"]')||form.querySelector('textarea,input[type="text"]')||document.createElement('textarea');if(input){input.placeholder=tool.sample.split('\n')[0]}form.insertBefore(hero(tool,input),form.firstChild);const mount=document.createElement('section');mount.className='frs-results';form.appendChild(mount);const adv=document.createElement('section');adv.className='frs-advanced';adv.innerHTML='<h3>Advanced analysis</h3><pre data-adv>{}</pre>';form.appendChild(adv);form.addEventListener('submit',e=>{e.preventDefault();updateWorkbench(ctx,'validate')});form.querySelectorAll('button,[type="submit"]').forEach(b=>{const l=(b.textContent||b.value||'').toLowerCase();if(/generate/.test(l))b.addEventListener('click',()=>{input.value=tool.sample;updateWorkbench(ctx,'generate')})});input.addEventListener('input',()=>{if(input.value.trim().length>2)updateWorkbench(ctx,'validate')});if(!input.value.trim())input.value=tool.sample;updateWorkbench(ctx,'validate')},run(workbench,action){return updateWorkbench(workbench,action)},applySample(workbench,sample){const input=workbench.primaryInput?workbench.primaryInput():workbench.form.querySelector('[name="input"]');if(input){input.value=sample||tool.sample}return updateWorkbench(workbench,'validate')},detectInputMode(){return {label:'France offline',state:'france'}},validate:v=>analyze(v,tool,'validate'),parse:v=>analyze(v,tool,'parse'),generate:()=>analyze(tool.sample,tool,'generate'),explain:v=>analyze(v,tool,'explain')}}
  function register(){if(window.ValidoWorkbench&&typeof window.ValidoWorkbench.registerPlugin==='function'){window.ValidoWorkbench.registerPlugin(ALGORITHM_ID,plugin());window.ValidoWorkbench.mountAll&&window.ValidoWorkbench.mountAll();}else{window.addEventListener('DOMContentLoaded',register,{once:true})}}register();
})();
