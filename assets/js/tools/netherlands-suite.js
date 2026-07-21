(() => {
  'use strict';

  const ALGORITHM_ID = 'validohub.netherlands-suite';
  const TOOLS = [
  {
    "id": "netherlands-bsn-validator",
    "name": "BSN Validator & Explainer",
    "group": "identity",
    "category": "national-identifiers",
    "code": "BSN",
    "summary": "Validate Dutch BSN numbers, replay the eleven-test checksum, normalize punctuation, and produce privacy-safe diagnostics.",
    "sample": "123456782",
    "kind": "bsn",
    "related": [
      "netherlands-bsn-masker",
      "netherlands-personal-data-fixture-generator",
      "netherlands-pii-masker",
      "netherlands-digid-boundary-helper"
    ]
  },
  {
    "id": "netherlands-bsn-masker",
    "name": "BSN Masker",
    "group": "privacy",
    "category": "privacy",
    "code": "BSN",
    "summary": "Mask Dutch BSN-like values for logs, support tickets, screenshots, and test reports.",
    "sample": "BSN 123456782 for test user",
    "kind": "generic",
    "related": [
      "netherlands-bsn-validator",
      "netherlands-pii-masker",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-personal-data-fixture-generator"
    ]
  },
  {
    "id": "netherlands-rsin-validator",
    "name": "RSIN Validator & Explainer",
    "group": "business",
    "category": "national-identifiers",
    "code": "RSIN",
    "summary": "Validate Dutch RSIN-style legal entity identifiers, run local eleven-test evidence, and separate structure from official registry status.",
    "sample": "818152011",
    "kind": "bsn",
    "related": [
      "netherlands-kvk-number-validator",
      "netherlands-btw-vat-validator",
      "netherlands-eori-validator",
      "netherlands-company-onboarding-auditor"
    ]
  },
  {
    "id": "netherlands-kvk-number-validator",
    "name": "KVK Number Validator",
    "group": "business",
    "category": "business",
    "code": "KVK",
    "summary": "Validate Dutch Chamber of Commerce number shape, normalize eight-digit references, and prepare registry-safe onboarding payloads.",
    "sample": "90006485",
    "kind": "kvk",
    "related": [
      "netherlands-rsin-validator",
      "netherlands-kvk-branch-number-helper",
      "netherlands-company-onboarding-auditor",
      "netherlands-ubo-readiness-helper"
    ]
  },
  {
    "id": "netherlands-kvk-branch-number-helper",
    "name": "KVK Branch Number Helper",
    "group": "business",
    "category": "business",
    "code": "BRANCH",
    "summary": "Normalize Dutch KVK branch-number references, inspect twelve-digit establishment-shaped values, and prepare CRM import fields.",
    "sample": "000012345678",
    "kind": "generic",
    "related": [
      "netherlands-kvk-number-validator",
      "netherlands-company-onboarding-auditor",
      "netherlands-address-normalizer",
      "netherlands-bag-address-readiness-helper"
    ]
  },
  {
    "id": "netherlands-btw-vat-validator",
    "name": "Dutch BTW / VAT Validator",
    "group": "tax",
    "category": "tax",
    "code": "BTW",
    "summary": "Validate Dutch VAT identifier syntax, inspect NL prefix and B-suffix structure, and prepare VIES-ready payloads.",
    "sample": "NL123456789B01",
    "kind": "vat",
    "related": [
      "netherlands-rsin-validator",
      "netherlands-kvk-number-validator",
      "netherlands-btw-rate-sanity-helper",
      "netherlands-invoice-number-helper"
    ]
  },
  {
    "id": "netherlands-eori-validator",
    "name": "Dutch EORI Validator",
    "group": "customs",
    "category": "customs",
    "code": "EORI",
    "summary": "Validate Netherlands EORI-shaped identifiers, extract NL country prefix evidence, and document customs lookup boundaries.",
    "sample": "NL123456789",
    "kind": "generic",
    "related": [
      "netherlands-btw-vat-validator",
      "netherlands-rsin-validator",
      "netherlands-company-onboarding-auditor",
      "netherlands-compliance-checklist-generator"
    ]
  },
  {
    "id": "netherlands-company-onboarding-auditor",
    "name": "Company Onboarding Auditor",
    "group": "business",
    "category": "business",
    "code": "ONBOARD",
    "summary": "Audit Dutch company onboarding snippets for KVK, RSIN, BTW, address, contact, and payment readiness.",
    "sample": "KVK 90006485\nRSIN 818152011\nBTW NL123456789B01\nIBAN NL91ABNA0417164300",
    "kind": "generic",
    "related": [
      "netherlands-kvk-number-validator",
      "netherlands-rsin-validator",
      "netherlands-btw-vat-validator",
      "netherlands-iban-validator"
    ]
  },
  {
    "id": "netherlands-ubo-readiness-helper",
    "name": "UBO Readiness Helper",
    "group": "business",
    "category": "compliance",
    "code": "UBO",
    "summary": "Prepare Dutch UBO onboarding checklists with company identifiers, representative fields, privacy notes, and official-register boundaries.",
    "sample": "KVK 90006485\nDirector Jansen\nControl 25 percent",
    "kind": "generic",
    "related": [
      "netherlands-company-onboarding-auditor",
      "netherlands-kvk-number-validator",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-compliance-checklist-generator"
    ]
  },
  {
    "id": "netherlands-rvo-relation-number-helper",
    "name": "RVO Relation Number Helper",
    "group": "government",
    "category": "government",
    "code": "RVO",
    "summary": "Normalize RVO relation-number-shaped references, separate account fields from official portal status, and prepare safe support snippets.",
    "sample": "RVO relatie 203456789",
    "kind": "generic",
    "related": [
      "netherlands-company-onboarding-auditor",
      "netherlands-rsin-validator",
      "netherlands-compliance-checklist-generator",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-digid-boundary-helper",
    "name": "DigiD Boundary Helper",
    "group": "identity",
    "category": "privacy",
    "code": "DigiD",
    "summary": "Create integration notes for DigiD-related forms without storing credentials or pretending browser-side identity verification.",
    "sample": "DigiD login required\nBSN 123456782\nReturn URL https://example.test/callback",
    "kind": "generic",
    "related": [
      "netherlands-bsn-validator",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-form-field-auditor",
      "netherlands-pii-masker"
    ]
  },
  {
    "id": "netherlands-id-card-format-helper",
    "name": "Dutch ID Card Format Helper",
    "group": "identity",
    "category": "documents",
    "code": "ID",
    "summary": "Inspect Dutch identity-card-like document references, normalize display, and keep official document verification out of browser scope.",
    "sample": "ID NL1234567",
    "kind": "generic",
    "related": [
      "netherlands-bsn-validator",
      "netherlands-passport-number-helper",
      "netherlands-pii-masker",
      "netherlands-personal-data-fixture-generator"
    ]
  },
  {
    "id": "netherlands-passport-number-helper",
    "name": "Dutch Passport Number Helper",
    "group": "identity",
    "category": "documents",
    "code": "PASS",
    "summary": "Normalize Dutch passport-number-like values, create masked travel-document fixtures, and flag OCR/document-status limits.",
    "sample": "NLD123456",
    "kind": "generic",
    "related": [
      "netherlands-id-card-format-helper",
      "netherlands-document-ocr-fixer",
      "netherlands-pii-masker",
      "netherlands-personal-data-fixture-generator"
    ]
  },
  {
    "id": "netherlands-driving-licence-format-helper",
    "name": "Driving Licence Format Helper",
    "group": "vehicle",
    "category": "documents",
    "code": "DL",
    "summary": "Inspect Dutch driving-licence-shaped values, normalize document text, and separate offline syntax from authority checks.",
    "sample": "Rijbewijs 1234567890",
    "kind": "generic",
    "related": [
      "netherlands-license-plate-inspector",
      "netherlands-rdw-vehicle-data-redaction-helper",
      "netherlands-vin-validator",
      "netherlands-id-card-format-helper"
    ]
  },
  {
    "id": "netherlands-license-plate-inspector",
    "name": "Dutch License Plate Inspector",
    "group": "vehicle",
    "category": "vehicle",
    "code": "PLATE",
    "summary": "Inspect Dutch license-plate patterns, normalize punctuation, classify common plate groups, and build fleet-safe examples.",
    "sample": "12-AB-34",
    "kind": "generic",
    "related": [
      "netherlands-rdw-vehicle-data-redaction-helper",
      "netherlands-vin-validator",
      "netherlands-driving-licence-format-helper",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-rdw-vehicle-data-redaction-helper",
    "name": "RDW Vehicle Data Redaction Helper",
    "group": "vehicle",
    "category": "privacy",
    "code": "RDW",
    "summary": "Mask Dutch vehicle snippets containing plates, VINs, dates, and owner-adjacent references before sharing logs.",
    "sample": "Kenteken 12-AB-34\nVIN W0L000051T2123456\nMeldcode 1234",
    "kind": "generic",
    "related": [
      "netherlands-license-plate-inspector",
      "netherlands-vin-validator",
      "netherlands-pii-masker",
      "netherlands-document-ocr-fixer"
    ]
  },
  {
    "id": "netherlands-vin-validator",
    "name": "VIN Validator for Netherlands Workflows",
    "group": "vehicle",
    "category": "vehicle",
    "code": "VIN",
    "summary": "Validate VIN structure, split WMI/VDS/VIS segments, and prepare masked vehicle data for Dutch fleet workflows.",
    "sample": "W0L000051T2123456",
    "kind": "generic",
    "related": [
      "netherlands-license-plate-inspector",
      "netherlands-rdw-vehicle-data-redaction-helper",
      "netherlands-data-quality-workbench",
      "netherlands-document-ocr-fixer"
    ]
  },
  {
    "id": "netherlands-iban-validator",
    "name": "Dutch IBAN Validator",
    "group": "banking",
    "category": "finance",
    "code": "IBAN",
    "summary": "Validate Dutch IBANs, split country and check digits, bank code, account number, MOD-97 evidence, and masked payment fields.",
    "sample": "NL91ABNA0417164300",
    "kind": "iban",
    "related": [
      "netherlands-bic-swift-inspector",
      "netherlands-bank-code-inspector",
      "netherlands-sepa-transfer-helper",
      "netherlands-masked-iban-formatter"
    ]
  },
  {
    "id": "netherlands-bic-swift-inspector",
    "name": "Dutch BIC / SWIFT Inspector",
    "group": "banking",
    "category": "finance",
    "code": "BIC",
    "summary": "Validate Dutch BIC/SWIFT syntax, split institution, country, location, and branch segments, and flag non-NL routing.",
    "sample": "ABNANL2A",
    "kind": "bic",
    "related": [
      "netherlands-iban-validator",
      "netherlands-bank-code-inspector",
      "netherlands-sepa-transfer-helper",
      "netherlands-payment-reconciliation-helper"
    ]
  },
  {
    "id": "netherlands-bank-code-inspector",
    "name": "Dutch Bank Code Inspector",
    "group": "banking",
    "category": "finance",
    "code": "BANK",
    "summary": "Inspect the four-letter bank code embedded in Dutch IBANs and prepare bank-selection payloads without claiming account ownership.",
    "sample": "ABNA",
    "kind": "generic",
    "related": [
      "netherlands-iban-validator",
      "netherlands-bic-swift-inspector",
      "netherlands-masked-iban-formatter",
      "netherlands-sepa-transfer-helper"
    ]
  },
  {
    "id": "netherlands-sepa-transfer-helper",
    "name": "SEPA Transfer Helper",
    "group": "payments",
    "category": "payments",
    "code": "SEPA",
    "summary": "Build SEPA-transfer-ready field bundles from Dutch IBAN, BIC, EUR amount, creditor, and remittance input.",
    "sample": "NL91ABNA0417164300\nABNANL2A\nEUR 1250,75\nFactuur INV-2026-0042",
    "kind": "generic",
    "related": [
      "netherlands-iban-validator",
      "netherlands-bic-swift-inspector",
      "netherlands-remittance-text-builder",
      "netherlands-payment-reconciliation-helper"
    ]
  },
  {
    "id": "netherlands-sepa-direct-debit-mandate-helper",
    "name": "SEPA Direct Debit Mandate Helper",
    "group": "payments",
    "category": "payments",
    "code": "MANDATE",
    "summary": "Normalize Dutch SEPA mandate references, inspect character set and length, and produce logging-safe masked mandate values.",
    "sample": "MND-NL-2026-CUSTOMER-0042",
    "kind": "generic",
    "related": [
      "netherlands-sepa-transfer-helper",
      "netherlands-iban-validator",
      "netherlands-remittance-text-builder",
      "netherlands-payment-reconciliation-helper"
    ]
  },
  {
    "id": "netherlands-ideal-payment-reference-helper",
    "name": "iDEAL Payment Reference Helper",
    "group": "payments",
    "category": "payments",
    "code": "iDEAL",
    "summary": "Normalize iDEAL payment references, extract PSP and order hints, and create reconciliation-safe checkout snippets.",
    "sample": "iDEAL PSPREF-2026-ORDER-0042 amount 49,95 EUR",
    "kind": "generic",
    "related": [
      "netherlands-payment-reconciliation-helper",
      "netherlands-remittance-text-builder",
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-payment-reconciliation-helper",
    "name": "Payment Reconciliation Helper",
    "group": "payments",
    "category": "data-quality",
    "code": "RECON",
    "summary": "Audit Dutch payment records for IBAN, amount, invoice reference, date, and duplicate-risk evidence locally.",
    "sample": "IBAN NL91ABNA0417164300\nAmount 1250,75 EUR\nInvoice INV-2026-0042\nDate 14-07-2026",
    "kind": "generic",
    "related": [
      "netherlands-iban-validator",
      "netherlands-bank-statement-parser",
      "netherlands-ideal-payment-reference-helper",
      "netherlands-invoice-number-helper"
    ]
  },
  {
    "id": "netherlands-bank-statement-parser",
    "name": "Bank Statement Parser",
    "group": "banking",
    "category": "data-quality",
    "code": "STMT",
    "summary": "Extract dates, EUR amounts, references, IBAN-like strings, and reconciliation hints from Dutch bank-statement text.",
    "sample": "14-07-2026 SEPA OVERBOEKING CLIENT JANSEN +1.250,75 EUR REF INV-2026-0042",
    "kind": "generic",
    "related": [
      "netherlands-payment-reconciliation-helper",
      "netherlands-iban-validator",
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-masked-iban-formatter",
    "name": "Masked IBAN Formatter",
    "group": "banking",
    "category": "privacy",
    "code": "MASK",
    "summary": "Mask Dutch IBANs for logs, screenshots, support tickets, and audit evidence while preserving useful hints.",
    "sample": "NL91ABNA0417164300",
    "kind": "iban",
    "related": [
      "netherlands-iban-validator",
      "netherlands-bsn-masker",
      "netherlands-pii-masker",
      "netherlands-gdpr-avg-redaction-helper"
    ]
  },
  {
    "id": "netherlands-remittance-text-builder",
    "name": "Dutch Remittance Text Builder",
    "group": "payments",
    "category": "payments",
    "code": "REMIT",
    "summary": "Clean Dutch payment descriptions for bank transfers, invoices, and reconciliation-safe references.",
    "sample": "Factuur nr. INV-2026-0042 / klant Jansen BV",
    "kind": "generic",
    "related": [
      "netherlands-sepa-transfer-helper",
      "netherlands-payment-reconciliation-helper",
      "netherlands-invoice-number-helper",
      "netherlands-slug-normalizer"
    ]
  },
  {
    "id": "netherlands-postcode-validator",
    "name": "Dutch Postcode Validator",
    "group": "address",
    "category": "postal",
    "code": "POSTCODE",
    "summary": "Validate Dutch postcode shape, normalize 1234 AB display, and prepare address-ready postal fields.",
    "sample": "1012 AB",
    "kind": "postcode",
    "related": [
      "netherlands-address-normalizer",
      "netherlands-house-number-addition-helper",
      "netherlands-bag-address-readiness-helper",
      "netherlands-phone-number-validator"
    ]
  },
  {
    "id": "netherlands-address-normalizer",
    "name": "Dutch Address Normalizer",
    "group": "address",
    "category": "address",
    "code": "ADDR",
    "summary": "Normalize Dutch address blocks with street, house number, addition, postcode, city, and country fields.",
    "sample": "Damrak 1-A\n1012 LG Amsterdam\nNederland",
    "kind": "generic",
    "related": [
      "netherlands-postcode-validator",
      "netherlands-house-number-addition-helper",
      "netherlands-bag-address-readiness-helper",
      "netherlands-address-transliteration-normalizer"
    ]
  },
  {
    "id": "netherlands-house-number-addition-helper",
    "name": "House Number Addition Helper",
    "group": "address",
    "category": "address",
    "code": "HNO",
    "summary": "Inspect Dutch house-number additions, split numeric and suffix parts, and prepare form-safe address components.",
    "sample": "Damrak 1-A bis",
    "kind": "generic",
    "related": [
      "netherlands-address-normalizer",
      "netherlands-postcode-validator",
      "netherlands-bag-address-readiness-helper",
      "netherlands-form-field-auditor"
    ]
  },
  {
    "id": "netherlands-bag-address-readiness-helper",
    "name": "BAG Address Readiness Helper",
    "group": "address",
    "category": "government",
    "code": "BAG",
    "summary": "Prepare Dutch BAG lookup payloads with postcode, house number, addition, and city hints while staying offline.",
    "sample": "1012 LG\nDamrak 1-A\nAmsterdam",
    "kind": "generic",
    "related": [
      "netherlands-postcode-validator",
      "netherlands-address-normalizer",
      "netherlands-house-number-addition-helper",
      "netherlands-municipality-code-inspector"
    ]
  },
  {
    "id": "netherlands-municipality-code-inspector",
    "name": "Municipality Code Inspector",
    "group": "address",
    "category": "government",
    "code": "MUNI",
    "summary": "Inspect Dutch municipality-code-shaped values, normalize numeric keys, and prepare geography fields for imports.",
    "sample": "0363 Amsterdam",
    "kind": "generic",
    "related": [
      "netherlands-province-code-mapper",
      "netherlands-bag-address-readiness-helper",
      "netherlands-address-normalizer",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-province-code-mapper",
    "name": "Province Code Mapper",
    "group": "address",
    "category": "locale",
    "code": "PROV",
    "summary": "Map Dutch province names and common abbreviations to stable developer labels and fixture values.",
    "sample": "Noord-Holland / NH",
    "kind": "generic",
    "related": [
      "netherlands-municipality-code-inspector",
      "netherlands-address-normalizer",
      "netherlands-postcode-validator",
      "netherlands-json-fixture-generator"
    ]
  },
  {
    "id": "netherlands-phone-number-validator",
    "name": "Dutch Phone Number Validator",
    "group": "phone",
    "category": "phone",
    "code": "PHONE",
    "summary": "Validate Dutch phone-number shapes, classify mobile, landline, service-like numbers, and prepare contact fixtures.",
    "sample": "06 12345678",
    "kind": "phone",
    "related": [
      "netherlands-phone-e164-formatter",
      "netherlands-address-normalizer",
      "netherlands-pii-masker",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-phone-e164-formatter",
    "name": "Dutch Phone E.164 Formatter",
    "group": "phone",
    "category": "phone",
    "code": "+31",
    "summary": "Normalize Dutch phone numbers to +31-style E.164 display, preserve local hints, and mask contact data for logs.",
    "sample": "020 123 4567",
    "kind": "phone",
    "related": [
      "netherlands-phone-number-validator",
      "netherlands-pii-masker",
      "netherlands-form-field-auditor",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-date-locale-formatter",
    "name": "Dutch Date / Locale Formatter",
    "group": "locale",
    "category": "localization",
    "code": "DATE",
    "summary": "Parse ISO and Dutch date input, render nl-NL display, and expose locale-safe date fields for interfaces.",
    "sample": "14-07-2026",
    "kind": "generic",
    "related": [
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-csv-locale-normalizer",
      "netherlands-json-fixture-generator",
      "netherlands-form-field-auditor"
    ]
  },
  {
    "id": "netherlands-eur-decimal-currency-formatter",
    "name": "EUR Decimal / Currency Formatter",
    "group": "locale",
    "category": "finance",
    "code": "EUR",
    "summary": "Parse Dutch money input, normalize EUR display, convert to integer cents, and generate storage-safe amount fields.",
    "sample": "EUR 1.250,75",
    "kind": "currency",
    "related": [
      "netherlands-date-locale-formatter",
      "netherlands-payment-reconciliation-helper",
      "netherlands-btw-rate-sanity-helper",
      "netherlands-bank-statement-parser"
    ]
  },
  {
    "id": "netherlands-address-transliteration-normalizer",
    "name": "Dutch Address Transliteration Normalizer",
    "group": "address",
    "category": "localization",
    "code": "ASCII",
    "summary": "Normalize Dutch address text, preserve diacritics where needed, and prepare ASCII-safe variants for legacy systems.",
    "sample": "Dhr. Van der Meer\ns-Gravenhage\nNoord-Brabant",
    "kind": "generic",
    "related": [
      "netherlands-address-normalizer",
      "netherlands-slug-normalizer",
      "netherlands-document-ocr-fixer",
      "netherlands-csv-locale-normalizer"
    ]
  },
  {
    "id": "netherlands-slug-normalizer",
    "name": "Dutch Slug Normalizer",
    "group": "developer",
    "category": "text",
    "code": "SLUG",
    "summary": "Normalize Dutch labels for URL slugs, strip punctuation safely, and keep searchable ASCII variants.",
    "sample": "Factuur voor s-Hertogenbosch BV",
    "kind": "generic",
    "related": [
      "netherlands-address-transliteration-normalizer",
      "netherlands-json-fixture-generator",
      "netherlands-regex-pack-helper",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-btw-rate-sanity-helper",
    "name": "Dutch BTW Rate Sanity Helper",
    "group": "tax",
    "category": "tax",
    "code": "BTW%",
    "summary": "Check Dutch VAT/BTW rate values, net/gross/tax consistency, and invoice-safe amount formatting.",
    "sample": "Net 100,00\nBTW 21%\nGross 121,00",
    "kind": "currency",
    "related": [
      "netherlands-btw-vat-validator",
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-invoice-number-helper",
      "netherlands-vat-return-field-helper"
    ]
  },
  {
    "id": "netherlands-invoice-number-helper",
    "name": "Dutch Invoice Number Helper",
    "group": "tax",
    "category": "invoices",
    "code": "INV",
    "summary": "Normalize Dutch invoice-number display, extract year and sequence hints, and build search keys for billing workflows.",
    "sample": "INV-2026-0042",
    "kind": "generic",
    "related": [
      "netherlands-btw-rate-sanity-helper",
      "netherlands-e-invoicing-readiness-helper",
      "netherlands-payment-reconciliation-helper",
      "netherlands-remittance-text-builder"
    ]
  },
  {
    "id": "netherlands-e-invoicing-readiness-helper",
    "name": "E-Invoicing Readiness Helper",
    "group": "tax",
    "category": "invoices",
    "code": "EINV",
    "summary": "Check Dutch e-invoicing field readiness for supplier, buyer, VAT, IBAN, amount, reference, and Peppol handoff.",
    "sample": "Supplier KVK 90006485\nBTW NL123456789B01\nIBAN NL91ABNA0417164300\nINV-2026-0042",
    "kind": "generic",
    "related": [
      "netherlands-peppol-readiness-helper",
      "netherlands-invoice-number-helper",
      "netherlands-btw-vat-validator",
      "netherlands-iban-validator"
    ]
  },
  {
    "id": "netherlands-peppol-readiness-helper",
    "name": "Peppol Readiness Helper",
    "group": "tax",
    "category": "invoices",
    "code": "PEPPOL",
    "summary": "Prepare Dutch Peppol participant and invoice fields, flag missing routing data, and explain network lookup boundaries.",
    "sample": "KVK 90006485\nEndpoint NL KVK 90006485\nInvoice INV-2026-0042",
    "kind": "generic",
    "related": [
      "netherlands-e-invoicing-readiness-helper",
      "netherlands-kvk-number-validator",
      "netherlands-btw-vat-validator",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-vat-return-field-helper",
    "name": "VAT Return Field Helper",
    "group": "tax",
    "category": "tax",
    "code": "RETURN",
    "summary": "Organize Dutch VAT-return-style amounts, rates, periods, and evidence notes before official filing.",
    "sample": "Period Q2 2026\n1a 210,00\n5b 42,00\nBTW NL123456789B01",
    "kind": "generic",
    "related": [
      "netherlands-btw-rate-sanity-helper",
      "netherlands-btw-vat-validator",
      "netherlands-compliance-checklist-generator",
      "netherlands-audit-file-readiness-checker"
    ]
  },
  {
    "id": "netherlands-audit-file-readiness-checker",
    "name": "Audit File Readiness Checker",
    "group": "tax",
    "category": "data-quality",
    "code": "XAF",
    "summary": "Inspect Dutch audit-file snippets for separators, dates, account codes, VAT fields, debit/credit, and encoding risks.",
    "sample": "JournalCode TransactionNr Date Account Debit Credit VAT\nSALES 2026001 20260714 8000 0,00 1250,75 NL123456789B01",
    "kind": "generic",
    "related": [
      "netherlands-vat-return-field-helper",
      "netherlands-bank-statement-parser",
      "netherlands-data-quality-workbench",
      "netherlands-audit-trail-checklist-generator"
    ]
  },
  {
    "id": "netherlands-payroll-tax-number-helper",
    "name": "Payroll Tax Number Helper",
    "group": "tax",
    "category": "payroll",
    "code": "LOON",
    "summary": "Normalize Dutch payroll-tax-number-shaped values and separate offline syntax from Belastingdienst employer status.",
    "sample": "Loonheffingennummer 123456789L01",
    "kind": "generic",
    "related": [
      "netherlands-wage-tax-readiness-helper",
      "netherlands-compliance-checklist-generator",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-wage-tax-readiness-helper",
    "name": "Wage Tax Readiness Helper",
    "group": "tax",
    "category": "payroll",
    "code": "WAGE",
    "summary": "Audit Dutch wage-tax snippets for employer references, period fields, employee privacy boundaries, and amount formatting.",
    "sample": "Employer 90006485\nPeriod 2026-07\nLoon 4250,00\nLoonheffing 123456789L01",
    "kind": "generic",
    "related": [
      "netherlands-payroll-tax-number-helper",
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-pii-masker",
      "netherlands-compliance-checklist-generator"
    ]
  },
  {
    "id": "netherlands-compliance-checklist-generator",
    "name": "Compliance Checklist Generator",
    "group": "compliance",
    "category": "developer",
    "code": "CHECK",
    "summary": "Generate implementation checklists for Dutch identifiers, invoices, payments, privacy masking, and official lookup boundaries.",
    "sample": "Need onboarding checklist for KVK, BTW, IBAN, postcode, AVG and Peppol",
    "kind": "generic",
    "related": [
      "netherlands-company-onboarding-auditor",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-audit-trail-checklist-generator",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-audit-trail-checklist-generator",
    "name": "Audit Trail Checklist Generator",
    "group": "compliance",
    "category": "developer",
    "code": "AUDIT",
    "summary": "Generate Dutch audit-trail checklist items for invoices, payments, tax evidence, payload exports, and privacy-safe logging.",
    "sample": "Payments invoices BTW return bank statement import",
    "kind": "generic",
    "related": [
      "netherlands-audit-file-readiness-checker",
      "netherlands-compliance-checklist-generator",
      "netherlands-api-payload-auditor",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-gdpr-avg-redaction-helper",
    "name": "AVG / GDPR Redaction Helper",
    "group": "privacy",
    "category": "privacy",
    "code": "AVG",
    "summary": "Redact Dutch personal and financial data in logs while separating AVG/GDPR privacy boundaries from live compliance advice.",
    "sample": "BSN 123456782\nIBAN NL91ABNA0417164300\nTelefoon 06 12345678\nKVK 90006485",
    "kind": "generic",
    "related": [
      "netherlands-pii-masker",
      "netherlands-bsn-masker",
      "netherlands-masked-iban-formatter",
      "netherlands-rdw-vehicle-data-redaction-helper"
    ]
  },
  {
    "id": "netherlands-pii-masker",
    "name": "Dutch PII Masker",
    "group": "privacy",
    "category": "privacy",
    "code": "PII",
    "summary": "Detect BSN, IBAN, postcode, phone, VAT, KVK, plate, email, and name-like Dutch data and produce safer debug snippets.",
    "sample": "Jan Jansen, BSN 123456782, NL91ABNA0417164300, 1012 AB, 06 12345678",
    "kind": "generic",
    "related": [
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-bsn-masker",
      "netherlands-masked-iban-formatter",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-personal-data-fixture-generator",
    "name": "Personal Data Fixture Generator",
    "group": "privacy",
    "category": "developer",
    "code": "TEST",
    "summary": "Generate fictional Dutch development fixtures for identity, address, contact, banking, and invoice test scenarios.",
    "sample": "Create safe NL checkout fixture with BSN-like, postcode, phone and IBAN-like fields",
    "kind": "generic",
    "related": [
      "netherlands-bsn-validator",
      "netherlands-postcode-validator",
      "netherlands-phone-number-validator",
      "netherlands-json-fixture-generator"
    ]
  },
  {
    "id": "netherlands-data-quality-workbench",
    "name": "Netherlands Data Quality Workbench",
    "group": "developer",
    "category": "data-quality",
    "code": "DQ",
    "summary": "Audit Dutch records across identifiers, address, phone, tax, banking, and locale fields for quality and completeness.",
    "sample": "KVK 90006485\nBTW NL123456789B01\nIBAN NL91ABNA0417164300\n1012 AB Amsterdam\n06 12345678",
    "kind": "generic",
    "related": [
      "netherlands-company-onboarding-auditor",
      "netherlands-pii-masker",
      "netherlands-payment-reconciliation-helper",
      "netherlands-form-field-auditor"
    ]
  },
  {
    "id": "netherlands-document-ocr-fixer",
    "name": "Dutch Document OCR Fixer",
    "group": "developer",
    "category": "data-quality",
    "code": "OCR",
    "summary": "Clean OCR output from Dutch documents, restore common separators, detect identifiers, and flag risky recognition artifacts.",
    "sample": "KVK 9O006485\nNL91 ABNA O4171643OO\n1O12 AB Amsterdam",
    "kind": "generic",
    "related": [
      "netherlands-data-quality-workbench",
      "netherlands-address-transliteration-normalizer",
      "netherlands-pii-masker",
      "netherlands-api-payload-auditor"
    ]
  },
  {
    "id": "netherlands-csv-locale-normalizer",
    "name": "Dutch CSV Locale Normalizer",
    "group": "developer",
    "category": "data-quality",
    "code": "CSV",
    "summary": "Normalize Dutch CSV rows with semicolons, comma decimals, date fields, VAT/IBAN hints, and import-safe headers.",
    "sample": "datum;bedrag;btw;iban\n14-07-2026;1.250,75;21%;NL91ABNA0417164300",
    "kind": "generic",
    "related": [
      "netherlands-date-locale-formatter",
      "netherlands-eur-decimal-currency-formatter",
      "netherlands-audit-file-readiness-checker",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-json-fixture-generator",
    "name": "Dutch JSON Fixture Generator",
    "group": "developer",
    "category": "developer",
    "code": "JSON",
    "summary": "Generate Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.",
    "sample": "customer checkout fixture for Amsterdam BV with KVK, BTW, IBAN, postcode and phone",
    "kind": "generic",
    "related": [
      "netherlands-personal-data-fixture-generator",
      "netherlands-api-payload-auditor",
      "netherlands-form-field-auditor",
      "netherlands-regex-pack-helper"
    ]
  },
  {
    "id": "netherlands-regex-pack-helper",
    "name": "Dutch Regex Pack Helper",
    "group": "developer",
    "category": "developer",
    "code": "REGEX",
    "summary": "Build Dutch regex snippets for BSN-like, KVK, VAT, postcode, IBAN, phone, and plate fields with safety notes.",
    "sample": "Need regex for postcode, KVK, NL VAT, IBAN and mobile phone",
    "kind": "generic",
    "related": [
      "netherlands-json-fixture-generator",
      "netherlands-form-field-auditor",
      "netherlands-api-payload-auditor",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-api-payload-auditor",
    "name": "Dutch API Payload Auditor",
    "group": "developer",
    "category": "developer",
    "code": "API",
    "summary": "Audit Dutch API payloads for local identifiers, masking, locale formatting, field names, and official lookup boundaries.",
    "sample": "{\"kvk\":\"90006485\",\"btw\":\"NL123456789B01\",\"iban\":\"NL91ABNA0417164300\",\"postcode\":\"1012 AB\"}",
    "kind": "generic",
    "related": [
      "netherlands-json-fixture-generator",
      "netherlands-form-field-auditor",
      "netherlands-pii-masker",
      "netherlands-data-quality-workbench"
    ]
  },
  {
    "id": "netherlands-form-field-auditor",
    "name": "Dutch Form Field Auditor",
    "group": "developer",
    "category": "developer",
    "code": "FORM",
    "summary": "Review Dutch form fields for labels, examples, validation hints, privacy risk, postcode layout, and payment fields.",
    "sample": "Fields postcode, huisnummer, toevoeging, BSN, KVK, BTW, IBAN, telefoon",
    "kind": "generic",
    "related": [
      "netherlands-postcode-validator",
      "netherlands-house-number-addition-helper",
      "netherlands-api-payload-auditor",
      "netherlands-gdpr-avg-redaction-helper"
    ]
  },
  {
    "id": "netherlands-email-domain-fixture-helper",
    "name": "Dutch Email Domain Fixture Helper",
    "group": "developer",
    "category": "developer",
    "code": "EMAIL",
    "summary": "Create privacy-safe Dutch email/domain fixtures, avoid real personal addresses, and generate deterministic testing aliases.",
    "sample": "Need company fixture email for Jansen BV Amsterdam invoice flow",
    "kind": "generic",
    "related": [
      "netherlands-json-fixture-generator",
      "netherlands-personal-data-fixture-generator",
      "netherlands-form-field-auditor",
      "netherlands-pii-masker"
    ]
  },
  {
    "id": "netherlands-health-insurance-boundary-helper",
    "name": "Health Insurance Boundary Helper",
    "group": "privacy",
    "category": "compliance",
    "code": "CARE",
    "summary": "Prepare Dutch health-insurance-adjacent data notes, mask sensitive values, and keep official or medical verification outside browser scope.",
    "sample": "Zorg workflow BSN 123456782 policy ref TEST-2026 birth date 1990-07-14",
    "kind": "generic",
    "related": [
      "netherlands-bsn-masker",
      "netherlands-gdpr-avg-redaction-helper",
      "netherlands-pii-masker",
      "netherlands-compliance-checklist-generator"
    ]
  },
  {
    "id": "netherlands-postnl-tracking-helper",
    "name": "PostNL Tracking Helper",
    "group": "logistics",
    "category": "logistics",
    "code": "POSTNL",
    "summary": "Inspect PostNL-like tracking references, normalize shipment text, and separate carrier status lookup from offline parsing.",
    "sample": "3SABCD123456789",
    "kind": "generic",
    "related": [
      "netherlands-address-normalizer",
      "netherlands-postcode-validator",
      "netherlands-data-quality-workbench",
      "netherlands-form-field-auditor"
    ]
  },
  {
    "id": "netherlands-ean-code-inspector",
    "name": "Dutch EAN / GS1 Code Inspector",
    "group": "developer",
    "category": "retail",
    "code": "EAN",
    "summary": "Inspect EAN/GTIN-style product codes for Dutch retail fixtures, replay check digits, and prepare catalog-safe examples.",
    "sample": "8712345678906",
    "kind": "generic",
    "related": [
      "netherlands-data-quality-workbench",
      "netherlands-json-fixture-generator",
      "netherlands-compliance-checklist-generator",
      "netherlands-regex-pack-helper"
    ]
  }
];

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  const digits = (value) => String(value || '').replace(/\D/g, '');
  const compact = (value) => String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const linesOf = (value) => String(value || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  function mod97(value) {
    const cleaned = compact(value);
    const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
    let remainder = 0;
    for (const char of rearranged) {
      const part = /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char;
      for (const digit of part) remainder = (remainder * 10 + Number(digit)) % 97;
    }
    return remainder;
  }

  function mask(value) {
    const cleaned = compact(value);
    if (cleaned.length <= 8) return cleaned.replace(/.(?=.{2})/g, '*');
    return cleaned.slice(0, 4) + ' ' + '*'.repeat(Math.max(4, cleaned.length - 8)) + ' ' + cleaned.slice(-4);
  }

  function bsnCheck(value) {
    const normalized = digits(value).padStart(9, '0').slice(-9);
    const weights = [9, 8, 7, 6, 5, 4, 3, 2, -1];
    const sum = normalized.split('').reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
    return { normalized, weights, sum, ok: /^\d{9}$/.test(normalized) && sum % 11 === 0 };
  }

  function eanCheck(value) {
    const normalized = digits(value);
    if (!/^\d{8}$|^\d{12,14}$/.test(normalized)) return false;
    const body = normalized.slice(0, -1).split('').reverse().map(Number);
    const sum = body.reduce((total, digit, index) => total + digit * (index % 2 === 0 ? 3 : 1), 0);
    return (10 - (sum % 10)) % 10 === Number(normalized.at(-1));
  }

  function classifyTool(tool) {
    const id = tool.id;
    if (tool.kind !== 'generic') return tool.kind;
    if (/address|bag|house-number|postcode|municipality|province/.test(id)) return 'address';
    if (/license-plate|rdw|vin|vehicle/.test(id)) return 'vehicle';
    if (/invoice|peppol|vat-return|audit-file|payroll|wage-tax|btw-rate/.test(id)) return 'taxWorkflow';
    if (/pii|gdpr|avg|masker|health|fixture/.test(id)) return 'privacyWorkflow';
    if (/csv|json|regex|api|form|ocr|data-quality|email|slug|transliteration/.test(id)) return 'developerWorkflow';
    if (/sepa|ideal|payment|statement|remittance|bank/.test(id)) return 'paymentWorkflow';
    return 'generic';
  }

  function extractDutchEvidence(raw) {
    return {
      bsn: raw.match(/\b\d{9}\b/)?.[0],
      kvk: raw.match(/\b\d{8}\b/)?.[0],
      iban: raw.match(/NL[0-9]{2}[A-Z]{4}[0-9]{10}/i)?.[0],
      vat: raw.match(/NL\d{9}B\d{2}/i)?.[0],
      postcode: raw.match(/\b\d{4}\s?[A-Z]{2}\b/i)?.[0],
      phone: raw.match(/(?:\+31|0)[0-9 .-]{8,12}/)?.[0],
      plate: raw.match(/\b[A-Z0-9]{1,3}-[A-Z0-9]{1,3}-[A-Z0-9]{1,3}\b/i)?.[0],
      vin: raw.match(/\b[A-HJ-NPR-Z0-9]{17}\b/i)?.[0],
      amount: raw.match(/[0-9][0-9.]*,[0-9]{2}/)?.[0],
      date: raw.match(/\b\d{2}[-/]\d{2}[-/]\d{4}\b/)?.[0]
    };
  }

  function addField(fields, label, value, note = '') {
    fields.push({ label, value: value || 'Not detected', note });
  }

  function addBreakdown(parts, label, value, note = '', tone = 'blue') {
    parts.push({ label, value: value || 'Not detected', note, tone });
  }

  function analyze(tool, input) {
    const raw = String(input || tool.sample || '').trim();
    const d = digits(raw);
    const c = compact(raw);
    const lines = linesOf(raw);
    const fields = [];
    const checks = [];
    const breakdown = [];
    const suggestions = [];
    let ok = !!raw;
    let primary = raw;
    let breakdownTitle = tool.code + ' field breakdown';
    let breakdownSummary = 'Local Dutch structure, extracted fields, and browser-only verification evidence.';

    const check = (label, pass, text) => {
      checks.push({ label, pass: !!pass, text });
      if (!pass) ok = false;
      if (!pass) suggestions.push(text);
    };

    const type = classifyTool(tool);

    if (type === 'bsn') {
      const result = bsnCheck(raw);
      primary = result.normalized;
      breakdownTitle = tool.code + ' eleven-test breakdown';
      breakdownSummary = 'Dutch BSN/RSIN values are split into body digits, checksum digit, weights, and official-boundary evidence.';
      check('Input present', !!raw, 'Input is required.');
      check('Nine digits', /^\d{9}$/.test(result.normalized), 'Dutch BSN/RSIN values use nine digits.');
      check('Eleven-test', result.ok, 'Weighted eleven-test must divide cleanly by 11.');
      addField(fields, 'normalized', result.normalized);
      addField(fields, 'masked', mask(result.normalized));
      addField(fields, 'checksum sum', String(result.sum), 'Sum modulo 11 should equal 0.');
      addField(fields, 'weights', result.weights.join(' · '));
      addBreakdown(breakdown, 'body digits', result.normalized.slice(0, 8), 'positions 1-8 replay weighted evidence', 'red');
      addBreakdown(breakdown, 'check digit', result.normalized.slice(8), 'position 9 uses negative weight -1', 'blue');
      addBreakdown(breakdown, 'weight vector', result.weights.join(' '), '9 8 7 6 5 4 3 2 -1', 'green');
      addBreakdown(breakdown, 'modulo evidence', result.sum + ' mod 11', result.ok ? 'passes local checksum' : 'does not pass local checksum', result.ok ? 'green' : 'red');
    } else if (type === 'kvk') {
      primary = d.slice(0, 8);
      breakdownTitle = 'KVK registry number breakdown';
      breakdownSummary = 'Dutch Chamber of Commerce references are checked for shape and prepared for official KVK lookup handoff.';
      check('Input present', !!raw, 'KVK input is required.');
      check('Eight digits', /^\d{8}$/.test(primary), 'KVK numbers use eight digits.');
      check('Registry boundary', true, 'Official company status requires KVK.');
      addField(fields, 'normalized', primary);
      addField(fields, 'masked', mask(primary));
      addField(fields, 'lookup boundary', 'KVK official registry');
      addBreakdown(breakdown, 'registry key', primary, 'complete eight-digit KVK reference', 'red');
      addBreakdown(breakdown, 'front block', primary.slice(0, 4), 'positions 1-4', 'blue');
      addBreakdown(breakdown, 'tail block', primary.slice(4, 8), 'positions 5-8', 'blue');
      addBreakdown(breakdown, 'official status', 'external lookup', 'existence and active status are not browser-proved', 'green');
    } else if (type === 'vat') {
      primary = c;
      const body = c.match(/^NL(\d{9})B(\d{2})$/);
      breakdownTitle = 'Dutch BTW / VAT field breakdown';
      breakdownSummary = 'Dutch VAT identifiers expose an NL prefix, nine-digit body, B separator, suffix, and VIES lookup boundary.';
      check('NL prefix', /^NL/.test(c), 'Dutch VAT IDs start with NL.');
      check('BTW syntax', /^NL\d{9}B\d{2}$/.test(c), 'Expected NL + 9 digits + B + 2 digits.');
      check('VIES boundary', true, 'Live VAT status requires VIES or official lookup.');
      addField(fields, 'normalized', primary);
      addField(fields, 'masked', mask(primary));
      addField(fields, 'body', body?.[1] || 'Not detected');
      addField(fields, 'suffix', body ? 'B' + body[2] : 'Not detected');
      addBreakdown(breakdown, 'country prefix', c.slice(0, 2), 'must be NL', 'red');
      addBreakdown(breakdown, 'identifier body', body?.[1], 'nine digits carried after prefix', 'blue');
      addBreakdown(breakdown, 'B separator', body ? 'B' : 'Not detected', 'Dutch VAT syntax separator', 'green');
      addBreakdown(breakdown, 'suffix', body?.[2], 'two trailing digits', 'blue');
    } else if (type === 'iban') {
      primary = c;
      breakdownTitle = 'Dutch IBAN BBAN breakdown';
      breakdownSummary = 'NL IBANs expose country code, ISO check digits, four-letter bank code, and ten-digit account number.';
      check('NL country', /^NL/.test(c), 'Dutch IBAN starts with NL.');
      check('Length 18', c.length === 18, 'NL IBAN length is 18 characters.');
      check('MOD-97', c.length === 18 && mod97(c) === 1, 'ISO 13616 MOD-97 check digits must equal 1.');
      addField(fields, 'iban', c);
      addField(fields, 'bank code', c.slice(4, 8));
      addField(fields, 'account', c.slice(8));
      addField(fields, 'masked', mask(c));
      addBreakdown(breakdown, 'country', c.slice(0, 2), 'ISO country prefix', 'red');
      addBreakdown(breakdown, 'check digits', c.slice(2, 4), 'MOD-97 control digits', 'blue');
      addBreakdown(breakdown, 'bank code', c.slice(4, 8), 'Dutch four-letter institution code', 'green');
      addBreakdown(breakdown, 'account number', c.slice(8), 'ten-digit domestic account segment', 'blue');
    } else if (type === 'bic') {
      primary = c;
      breakdownTitle = 'BIC / SWIFT routing breakdown';
      breakdownSummary = 'BIC values split into institution, country, location, and optional branch segments.';
      check('BIC syntax', /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(c), 'BIC is 8 or 11 characters.');
      check('NL country', c.slice(4, 6) === 'NL', 'Dutch BIC should use NL country segment.');
      addField(fields, 'institution', c.slice(0, 4));
      addField(fields, 'country', c.slice(4, 6));
      addField(fields, 'location', c.slice(6, 8));
      addField(fields, 'branch', c.slice(8) || 'Primary office');
      addBreakdown(breakdown, 'institution', c.slice(0, 4), 'bank identifier', 'red');
      addBreakdown(breakdown, 'country', c.slice(4, 6), 'must be NL for Dutch routing', 'blue');
      addBreakdown(breakdown, 'location', c.slice(6, 8), 'location code', 'green');
      addBreakdown(breakdown, 'branch', c.slice(8) || 'primary', 'optional three-character branch', 'blue');
    } else if (type === 'postcode') {
      primary = c.replace(/^(\d{4})([A-Z]{2})$/, '$1 $2');
      breakdownTitle = 'Dutch postcode breakdown';
      breakdownSummary = 'Postcodes split into four digits, two letters, display spacing, and BAG/address lookup boundaries.';
      check('Postcode shape', /^\d{4} [A-Z]{2}$/.test(primary), 'Expected NNNN AA display.');
      check('Letters present', /[A-Z]{2}$/.test(primary), 'Dutch postcode has two trailing letters.');
      addField(fields, 'normalized', primary);
      addField(fields, 'digits', primary.slice(0, 4));
      addField(fields, 'letters', primary.slice(-2));
      addField(fields, 'BAG boundary', 'Address existence requires official data.');
      addBreakdown(breakdown, 'numeric area', primary.slice(0, 4), 'four-digit postcode area', 'red');
      addBreakdown(breakdown, 'letter pair', primary.slice(-2), 'two-letter street-side segment', 'blue');
      addBreakdown(breakdown, 'display spacer', 'single space', 'canonical UI format is NNNN AA', 'green');
      addBreakdown(breakdown, 'official lookup', 'BAG / postal data', 'existence is not browser-proved', 'blue');
    } else if (type === 'phone') {
      const p = raw.replace(/[() .-]/g, '');
      const local = p.startsWith('+31') ? '0' + p.slice(3) : p;
      primary = p.startsWith('+31') ? p : '+31' + local.replace(/^0/, '');
      breakdownTitle = 'Dutch phone number breakdown';
      breakdownSummary = 'Phone values split into country code, local trunk, area/mobile evidence, subscriber digits, and E.164 output.';
      check('Dutch shape', /^(\+31|0)\d{8,9}$/.test(p), 'Expected +31 or local trunk zero.');
      check('Mobile or area evidence', /^(\+316|06|\+3120|020|\+3110|010)/.test(p), 'Detected common Dutch mobile or area-code evidence.');
      addField(fields, 'e164', primary);
      addField(fields, 'local', local);
      addField(fields, 'type', /^06/.test(local) ? 'Mobile-like' : 'Landline/service-like');
      addBreakdown(breakdown, 'country code', '+31', 'international dialing prefix', 'red');
      addBreakdown(breakdown, 'local trunk', local.startsWith('0') ? '0' : 'removed', 'local display keeps trunk zero', 'blue');
      addBreakdown(breakdown, 'area/mobile', local.slice(0, /^06/.test(local) ? 2 : 3), 'classification hint', 'green');
      addBreakdown(breakdown, 'subscriber', local.replace(/^0/, '').slice(/^06/.test(local) ? 1 : 2), 'remaining subscriber digits', 'blue');
    } else if (type === 'currency') {
      const amount = raw.match(/[0-9][0-9.]*,[0-9]{2}/)?.[0] || '0,00';
      const cents = Math.round(Number(amount.replace(/\./g, '').replace(',', '.')) * 100);
      primary = amount;
      breakdownTitle = 'Dutch EUR amount breakdown';
      breakdownSummary = 'Money values split into display amount, integer cents, decimal separator, grouping separator, and storage-ready fields.';
      check('Amount detected', Number.isFinite(cents), 'Dutch EUR display uses comma decimals.');
      check('Cents storage', Number.isFinite(cents), 'Store money as integer cents.');
      addField(fields, 'display', 'EUR ' + amount);
      addField(fields, 'integer cents', String(cents));
      addField(fields, 'decimal separator', 'Comma (,)');
      addBreakdown(breakdown, 'whole amount', amount.split(',')[0], 'period may be thousands grouping', 'red');
      addBreakdown(breakdown, 'cents', amount.split(',')[1] || '00', 'two decimal digits', 'blue');
      addBreakdown(breakdown, 'storage', String(cents), 'integer cents for APIs/databases', 'green');
      addBreakdown(breakdown, 'locale', 'nl-NL', 'render at UI edge', 'blue');
    } else if (type === 'vehicle') {
      const evidence = extractDutchEvidence(raw);
      primary = evidence.plate || evidence.vin || raw;
      breakdownTitle = 'Dutch vehicle evidence breakdown';
      breakdownSummary = 'Vehicle workflows split plate/VIN/meldcode-like evidence and keep RDW ownership or status checks external.';
      check('Input present', !!raw, 'Vehicle input is required.');
      check('Vehicle evidence', !!(evidence.plate || evidence.vin || d.length >= 4), 'Plate, VIN, or vehicle-reference evidence should be present.');
      addField(fields, 'plate', evidence.plate || 'Not detected');
      addField(fields, 'vin', evidence.vin || 'Not detected');
      addField(fields, 'masked', mask(primary));
      addBreakdown(breakdown, 'plate evidence', evidence.plate || 'Not detected', 'registration-shape candidate', 'red');
      addBreakdown(breakdown, 'VIN evidence', evidence.vin || 'Not detected', '17-character vehicle identifier candidate', 'blue');
      addBreakdown(breakdown, 'RDW boundary', 'official lookup', 'vehicle status is not browser-proved', 'green');
    } else {
      const evidence = extractDutchEvidence(raw);
      primary = lines[0] || raw;
      breakdownTitle = tool.code + ' extracted evidence breakdown';
      breakdownSummary = 'The workbench extracts Dutch identifiers, locale values, lines, and handoff boundaries from unstructured input.';
      check('Input present', !!raw, 'Input is analyzed locally.');
      check('Dutch evidence', Object.values(evidence).some(Boolean) || raw.length > 3, 'Local patterns or structured text should be present.');
      check('Official boundary', true, 'Live registry, bank, tax, identity, and carrier status stay outside the browser.');
      Object.entries(evidence).forEach(([key, value]) => addField(fields, key, value || 'Not detected'));
      addField(fields, 'line count', String(lines.length || 1));
      addField(fields, 'masked primary', mask(primary));
      addBreakdown(breakdown, 'first line', lines[0] || raw.slice(0, 80), 'primary evidence row', 'red');
      addBreakdown(breakdown, 'detected IBAN', evidence.iban || 'Not detected', 'banking evidence', 'blue');
      addBreakdown(breakdown, 'detected KVK/BTW', [evidence.kvk, evidence.vat].filter(Boolean).join(' / ') || 'Not detected', 'company or tax evidence', 'green');
      addBreakdown(breakdown, 'locale evidence', [evidence.postcode, evidence.phone, evidence.amount, evidence.date].filter(Boolean).join(' / ') || 'Not detected', 'address, phone, amount, or date hints', 'blue');
    }

    return {
      status: ok ? 'success' : 'review',
      headline: ok ? 'Netherlands data evidence looks strong' : 'Review Netherlands data before handoff',
      detail: ok ? 'Offline structural checks completed in this browser.' : 'Some offline checks need attention before handoff.',
      tool: tool.name,
      kind: tool.code,
      primary,
      normalized: primary,
      masked: mask(primary),
      inputChars: raw.length,
      lineCount: lines.length || 1,
      checks,
      fields,
      breakdown,
      breakdownTitle,
      breakdownSummary,
      suggestions: suggestions.length ? suggestions : ['Use normalized values for forms and masked values for logs.', 'Use official Dutch systems for live existence, ownership, entitlement, and filing status.'],
      boundary: 'Official KVK, BAG, VIES, bank ownership, DigiD, RDW, tax filing, or carrier status requires the responsible external system.'
    };
  }

  function renderPipeline(result) {
    return '<div class="nls-panel nls-pipeline-panel"><div class="nls-section-head"><span class="nls-icon">' + esc(result.kind) + '</span><div><h3>Validation pipeline</h3><p>Netherlands checks completed in this browser.</p></div></div><div class="nls-bar"></div><div class="nls-pipeline">' + result.checks.map((check) => '<article class="nls-step ' + (check.pass ? 'is-pass' : 'is-review') + '"><span>' + (check.pass ? 'PASS' : 'REVIEW') + '</span><strong>' + esc(check.label) + '</strong><small>' + esc(check.text) + '</small></article>').join('') + '</div></div>';
  }

  function renderResultCards(result) {
    return '<div class="nls-result-card ' + (result.status === 'success' ? 'is-pass' : 'is-review') + '"><div class="nls-result-top"><span class="nls-status">' + (result.status === 'success' ? '✓' : '!') + '</span><div><h2 class="nls-headline">' + esc(result.headline) + '</h2><p class="nls-detail">' + esc(result.detail) + '</p></div><button type="button" class="nls-copy" data-nls-copy="' + esc(result.normalized) + '">Copy result</button></div><div class="nls-primary">' + esc(result.primary) + '</div><div class="nls-grid">' + result.fields.map((field) => '<article class="nls-mini"><span class="nls-label">' + esc(field.label) + '</span><strong class="nls-value">' + esc(field.value) + '</strong>' + (field.note ? '<small class="nls-note">' + esc(field.note) + '</small>' : '') + '</article>').join('') + '</div></div>';
  }

  function renderFieldBreakdown(result) {
    return '<div class="nls-panel nls-breakdown"><div class="nls-section-head"><span class="nls-icon">▥</span><div><h3>' + esc(result.breakdownTitle) + '</h3><p>' + esc(result.breakdownSummary) + '</p></div></div><div class="nls-segments">' + result.breakdown.map((part) => '<article class="nls-segment tone-' + esc(part.tone || 'blue') + '"><strong>' + esc(part.value) + '</strong><span>' + esc(part.label) + '</span></article>').join('') + '</div><div class="nls-grid nls-breakdown-grid">' + result.breakdown.map((part) => '<article class="nls-mini"><span class="nls-label">' + esc(part.label) + '</span><strong class="nls-value">' + esc(part.value) + '</strong><small class="nls-note">' + esc(part.note) + '</small></article>').join('') + '</div></div>';
  }

  function renderQuality(result) {
    return '<div class="nls-quality"><div class="nls-section-head"><span class="nls-icon">◇</span><div><h3>Quality notes</h3><p>What this tool proves locally and what must stay outside the browser.</p></div></div><div class="nls-grid"><article class="nls-mini"><span class="nls-label">Privacy boundary</span><strong>Browser-only</strong><small class="nls-note">Input is analyzed locally and is not uploaded by ValidoHub.</small></article><article class="nls-mini"><span class="nls-label">Official lookup boundary</span><strong>External systems</strong><small class="nls-note">' + esc(result.boundary) + '</small></article><article class="nls-mini"><span class="nls-label">Fixture safety</span><strong>Masked outputs</strong><small class="nls-note">Use normalized values for forms, masked values for logs, and fictional fixtures for tests.</small></article><article class="nls-mini"><span class="nls-label">Repair hints</span><strong>' + esc(result.suggestions[0] || 'Ready') + '</strong><small class="nls-note">' + esc(result.suggestions.slice(1).join(' ')) + '</small></article></div></div>';
  }

  function renderAdvanced(result) {
    return '<details class="nls-advanced" open><summary>Advanced analysis</summary><pre>' + esc(JSON.stringify(result, null, 2)) + '</pre></details>';
  }

  function render(result) {
    return '<section class="nls-results">' + renderPipeline(result) + renderResultCards(result) + renderFieldBreakdown(result) + renderQuality(result) + renderAdvanced(result) + '</section>';
  }

  function injectStyles() {
    if (document.getElementById('nls-premium-v2-styles')) return;
    const style = document.createElement('style');
    style.id = 'nls-premium-v2-styles';
    style.textContent = `
      .nls-shell {
        --n-red: #ae1c28;
        --n-blue: #21468b;
        --n-green: #0f766e;
        color: #111827;
      }
      .nls-shell * { box-sizing: border-box; }
      .nls-hero {
        border: 1px solid #d8e2ef;
        border-top: 4px solid var(--n-green);
        border-radius: .95rem;
        background: linear-gradient(125deg, rgba(15, 118, 110, .08), #fff 44%, rgba(33, 70, 139, .08));
        padding: 1rem 1.25rem 1.1rem;
        margin: .9rem 0 1.05rem;
        box-shadow: 0 18px 44px rgba(15, 23, 42, .065);
      }
      .nls-grid-hero {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(16rem, .75fr);
        gap: 1.25rem;
        align-items: center;
      }
      .nls-eyebrow,
      .nls-label,
      .nls-step span,
      .nls-segment span {
        color: #64748b;
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .13em;
        text-transform: uppercase;
      }
      .nls-mark {
        display: flex;
        width: 3.25rem;
        height: 3.25rem;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(33, 70, 139, .25);
        border-left: 5px solid var(--n-red);
        border-right: 5px solid var(--n-blue);
        border-radius: .68rem;
        background: #fff;
        font-size: .95rem;
        font-weight: 950;
        color: #0f172a;
        margin: .45rem 0 .38rem;
      }
      .nls-title {
        font-size: clamp(1.32rem, 1.75vw, 1.68rem);
        line-height: 1.16;
        margin: .05rem 0;
        color: #0f172a;
        letter-spacing: 0;
      }
      .nls-summary {
        max-width: 44rem;
        margin: .35rem 0 0;
        font-size: .88rem;
        line-height: 1.42;
        color: #64748b;
      }
      .nls-chips {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
        margin-top: .7rem;
      }
      .nls-chips span,
      .nls-pill {
        border: 1px solid #cbd8e8;
        border-radius: 999px;
        background: #fff;
        padding: .28rem .58rem;
        color: #0f766e;
        font-size: .78rem;
        font-weight: 850;
      }
      .nls-samples span {
        display: block;
        margin-bottom: .42rem;
        color: #0f172a;
        font-size: .98rem;
        font-weight: 900;
      }
      .nls-sample-button,
      .nls-related-link,
      .nls-textarea {
        min-width: 0;
        max-width: 100%;
        border: 1px solid #cbd8e8;
        border-radius: .75rem;
        background: #fff;
        padding: .72rem .85rem;
        color: #111827;
        font: inherit;
        font-size: .92rem;
        font-weight: 760;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .nls-sample-button {
        width: 100%;
        cursor: pointer;
        text-align: left;
      }
      .nls-related-list {
        display: grid;
        gap: .42rem;
        margin-top: .55rem;
      }
      .nls-related-link {
        display: block;
        color: #0f172a;
        text-decoration: none;
        font-size: .84rem;
      }
      .nls-textarea {
        width: 100%;
        min-height: 8.25rem;
        resize: vertical;
      }
      .nls-input {
        padding: 1.05rem 0;
      }
      .nls-input-head,
      .nls-result-top,
      .nls-actions,
      .nls-section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .8rem;
        flex-wrap: wrap;
      }
      .nls-input-head h2 {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.2;
      }
      .nls-section-head {
        justify-content: flex-start;
        margin-bottom: .8rem;
      }
      .nls-section-head h3 {
        margin: 0;
        color: #0f172a;
        text-transform: uppercase;
        letter-spacing: .11em;
        font-size: .94rem;
      }
      .nls-section-head p {
        margin: .2rem 0 0;
        color: #64748b;
        font-size: .9rem;
        font-weight: 700;
      }
      .nls-icon {
        display: grid;
        place-items: center;
        min-width: 3.1rem;
        height: 3.1rem;
        border: 1px solid #bbf7d0;
        border-radius: .72rem;
        background: #ecfdf5;
        color: #0f766e;
        font-weight: 950;
      }
      .nls-actions {
        justify-content: flex-start;
        margin-top: .85rem;
      }
      .nls-run,
      .nls-secondary,
      .nls-clear,
      .nls-copy {
        border: 1px solid #cbd8e8;
        border-radius: .78rem;
        background: #fff;
        padding: .68rem .9rem;
        color: #0f172a;
        font-size: .9rem;
        font-weight: 900;
        cursor: pointer;
      }
      .nls-run {
        background: #0f766e;
        color: #fff;
        box-shadow: 0 10px 24px rgba(15, 118, 110, .16);
      }
      .nls-clear {
        border: 0;
        color: #64748b;
      }
      .nls-results {
        display: grid;
        gap: 1rem;
      }
      .nls-panel,
      .nls-result-card,
      .nls-quality {
        border: 1px solid #d8e2ef;
        border-radius: .95rem;
        background: #fff;
        padding: 1.15rem;
        box-shadow: 0 20px 50px rgba(15, 23, 42, .06);
        min-width: 0;
      }
      .nls-result-card.is-pass {
        background: linear-gradient(125deg, rgba(16, 185, 129, .08), #fff 48%, rgba(33, 70, 139, .05));
        border-color: #bbf7d0;
      }
      .nls-result-card.is-review {
        background: linear-gradient(125deg, rgba(220, 38, 38, .07), #fff 54%, rgba(33, 70, 139, .05));
        border-color: #fecaca;
      }
      .nls-status {
        display: grid;
        place-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: .78rem;
        background: #dcfce7;
        color: #16803a;
        font-size: 1.55rem;
        font-weight: 950;
      }
      .is-review .nls-status {
        background: #fee2e2;
        color: #b91c1c;
      }
      .nls-headline {
        margin: 0;
        color: #0f172a;
        font-size: 1.3rem;
      }
      .nls-detail {
        margin: .2rem 0 0;
        color: #64748b;
        font-size: .92rem;
        font-weight: 750;
      }
      .nls-primary {
        margin: .95rem 0;
        padding: .82rem;
        border: 1px solid #d8e2ef;
        border-radius: .75rem;
        background: #f8fafc;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: .95rem;
        font-weight: 900;
        overflow: auto;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
      }
      .nls-pipeline,
      .nls-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
        gap: .72rem;
        margin: .8rem 0;
      }
      .nls-step,
      .nls-mini {
        border: 1px solid #d8e2ef;
        border-radius: .78rem;
        padding: .82rem;
        background: #fff;
        min-width: 0;
      }
      .nls-step.is-pass {
        border-color: #bbf7d0;
        background: #f0fdf4;
      }
      .nls-step.is-review {
        border-color: #fecaca;
        background: #fff7f7;
      }
      .nls-step strong,
      .nls-mini strong,
      .nls-segment strong {
        display: block;
        margin: .28rem 0;
        color: #0f172a;
        font-size: .98rem;
        overflow-wrap: anywhere;
      }
      .nls-step small,
      .nls-note {
        display: block;
        color: #64748b;
        font-size: .82rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }
      .nls-bar {
        height: .36rem;
        border-radius: 999px;
        background: linear-gradient(90deg, #ef233c, #ffbe0b, #16a34a, #2563eb);
        margin: .82rem 0 1rem;
      }
      .nls-breakdown {
        background: linear-gradient(120deg, #fff, #f8fafc 55%, rgba(33, 70, 139, .06));
      }
      .nls-segments {
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
        align-items: stretch;
        justify-content: center;
        margin: .8rem 0 1rem;
      }
      .nls-segment {
        min-width: min(10.5rem, 100%);
        border: 1px solid #c4b5fd;
        border-radius: .78rem;
        background: linear-gradient(180deg, #fff, #faf7ff);
        padding: .78rem;
        text-align: center;
        box-shadow: 0 14px 34px rgba(124, 58, 237, .07);
      }
      .nls-segment strong {
        font-size: 1.08rem;
        color: #7c3aed;
      }
      .nls-segment.tone-red { border-color: rgba(174, 28, 40, .25); }
      .nls-segment.tone-red strong { color: #ae1c28; }
      .nls-segment.tone-blue { border-color: rgba(33, 70, 139, .25); }
      .nls-segment.tone-blue strong { color: #21468b; }
      .nls-segment.tone-green { border-color: rgba(15, 118, 110, .25); }
      .nls-segment.tone-green strong { color: #0f766e; }
      .nls-quality {
        background: linear-gradient(120deg, #fff, rgba(250, 204, 21, .08));
      }
      .nls-advanced {
        margin-top: .1rem;
        border: 1px solid #d8e2ef;
        border-radius: .95rem;
        background: #fff;
        overflow: hidden;
      }
      .nls-advanced summary {
        padding: .82rem 1rem;
        color: #0f172a;
        font-size: .95rem;
        font-weight: 950;
        cursor: pointer;
      }
      .nls-advanced pre {
        margin: 0;
        background: #0f172a;
        color: #e5eefc;
        padding: .9rem;
        font-size: .78rem;
        line-height: 1.5;
        max-width: 100%;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      @media (max-width: 760px) {
        .nls-grid-hero { grid-template-columns: 1fr; }
        .nls-title { font-size: 1.42rem; }
        .nls-panel,
        .nls-result-card,
        .nls-quality { padding: .95rem; }
        .nls-status {
          width: 2.8rem;
          height: 2.8rem;
        }
        .nls-segments { justify-content: stretch; }
        .nls-segment { width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  function mount(root) {
    if (!root || root.dataset.nlsMounted) return;
    root.dataset.nlsMounted = 'v2';
    root.classList.add('nls-shell');
    injectStyles();

    const slug = location.pathname.split('/').filter(Boolean).pop();
    const tool = TOOLS.find((candidate) => candidate.id === slug) || TOOLS[0];
    root.innerHTML = '<section class="nls-hero"><div class="nls-grid-hero"><div><span class="nls-eyebrow">Netherlands workbench</span><div class="nls-mark">' + esc(tool.code) + '</div><h2 class="nls-title">' + esc(tool.name) + '</h2><p class="nls-summary">' + esc(tool.summary) + '</p><div class="nls-chips"><span>Browser-only</span><span>Offline checks</span><span>Netherlands-specific</span><span>Field breakdown</span><span>Quality notes</span></div></div><div class="nls-samples"><span>Examples</span><button class="nls-sample-button" type="button" data-action="sample">Use valid sample for ' + esc(tool.code) + '</button><div class="nls-related-list">' + TOOLS.filter((item) => item.id !== tool.id).slice(0, 6).map((item) => '<a class="nls-related-link" href="/en/netherlands/' + esc(item.id) + '/">' + esc(item.name) + '</a>').join('') + '</div></div></div></section><section class="nls-input"><div class="nls-input-head"><h2>Validate</h2><span class="nls-pill">Waiting for Dutch data</span></div><textarea class="nls-textarea" spellcheck="false">' + esc(tool.sample) + '</textarea><div class="nls-actions"><button class="nls-run" type="button">Validate</button><button class="nls-secondary" type="button" data-action="copy">Copy result</button><button class="nls-secondary" type="button" data-action="download">Download result</button><button class="nls-clear" type="button">Clear</button></div></section><div class="nls-output"></div>';

    const textarea = $('.nls-textarea', root);
    const output = $('.nls-output', root);
    let last = null;

    const run = () => {
      last = analyze(tool, textarea.value);
      output.innerHTML = render(last);
      $('.nls-pill', root).textContent = last.status === 'success' ? 'Offline checks passed' : 'Review needed';
    };

    $('.nls-run', root).addEventListener('click', run);
    $('.nls-clear', root).addEventListener('click', () => {
      textarea.value = '';
      output.innerHTML = '';
      $('.nls-pill', root).textContent = 'Waiting for Dutch data';
    });
    root.addEventListener('click', (event) => {
      const copy = event.target.closest('[data-nls-copy]');
      if (copy) navigator.clipboard?.writeText(copy.dataset.nlsCopy || '');
      if (event.target.dataset.action === 'sample') {
        textarea.value = tool.sample;
        run();
      }
      if (event.target.dataset.action === 'copy' && last) navigator.clipboard?.writeText(last.normalized || '');
      if (event.target.dataset.action === 'download' && last) {
        const blob = new Blob([JSON.stringify(last, null, 2)], { type: 'application/json' });
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = tool.id + '-result.json';
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      }
    });
    run();
  }

  function init() {
    mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
