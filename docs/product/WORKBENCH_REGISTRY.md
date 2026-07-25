# Workbench Registry

This registry records production browser workbenches currently owned by ValidoHub.

## Generic Workbench Product Bar

All generic, non-country workbenches are governed by `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md`.
The global tools directory and launch workflow are governed by `docs/product/TOOLS_PORTAL_SPEC.md`; new global tools must be registered, searchable, audited, and visible on `/en/tools/`.

Generic tools must not be treated as lightweight utilities. They must match the Poland and Brazil premium country workbench baseline for visual polish, interaction density, advanced analysis, result cards, mode-specific presets, developer snippets, local/offline behavior, and exploratory functionality. The first preset, primary success path, invalid/error path, advanced tab, and mobile layout must all be audited before a generic tool can be called premium.

Future global tools must be born premium: deterministic neutral theme, tool-specific header, success-first preset, intentional invalid/edge preset, result block immediately after input, advanced analysis below results, premium cards, quality notes, copy/download, and browser verification. Do not ship a new global tool as a basic form with a plan to clean it up later.

Current global expansion adds these first-class workbenches: Phone E.164 Validator & Generator, Postal Code Validator & Generator, SWIFT/BIC Workbench, MRZ Passport Workbench, CSV Locale Normalizer, EU VAT Number Workbench, ISO 20022 / SEPA Inspector, Secret + PII Redactor, Locale Test Data Generator, and Webhook Signature Verifier.

## Global Premium Tools Batch V2

- Source JS: `assets/js/tools/generic-suite.js`
- Related YAML tool pages:
  - `tools/json-schema-workbench.yaml`
  - `tools/openapi-inspector.yaml`
  - `tools/yaml-toml-workbench.yaml`
  - `tools/xml-xpath-workbench.yaml`
  - `tools/csv-profiler.yaml`
  - `tools/sql-query-inspector.yaml`
  - `tools/cron-expression-workbench.yaml`
  - `tools/regex-explainer-generator.yaml`
  - `tools/date-timezone-workbench.yaml`
  - `tools/color-contrast-token-workbench.yaml`
  - `tools/markdown-mdx-inspector.yaml`
  - `tools/graphql-workbench.yaml`
  - `tools/email-domain-workbench.yaml`
  - `tools/user-agent-client-hints-parser.yaml`
  - `tools/http-security-headers-inspector.yaml`
- Product spec: `docs/product/GLOBAL_PREMIUM_TOOLS_BATCH_V2_SPEC.md`
- Current capabilities: browser-only parsing, validation, generation, fixture export, field breakdowns, pipelines, quality notes, Developer API previews, and snapshot JSON for structured developer workflows spanning APIs, data formats, schedulers, security headers, SQL, GraphQL, email/domain, user-agent parsing, colors, and documentation QA.
- Current quality status: Premium global batch implemented on the shared Generic Utility Workbench Suite; scoped audit required before final sign-off.

## Future Country Suite Factory

- Source JS: `assets/js/tools/country-suite-factory.js`
- Product spec: `docs/product/COUNTRY_SUITE_FACTORY_SPEC.md`
- Audits:
  - `node scripts/audit-country-suite-factory.mjs`
  - `npm run audit:country-suite`
- Current capabilities:
  - Additive-only reusable shell for future complete country suites; first proven by Switzerland Premium Country Suite V1.
  - Compact Brazil-scale country tool header, input, result card, validation pipeline, field breakdown, quality notes, advanced analysis, copy, and download controls.
  - Config validation for suite identity, country metadata, theme colors, tool names, codes, summaries, samples, quality notes, official-boundary copy, duplicate ids, and raw-payload sample labels.
  - Local overflow and wrapping rules for long primary values, field cards, JSON payloads, and advanced analysis.
  - Hardened sample/debug UX: multiple valid/invalid/short/wrong-prefix/edge examples, invalid fixtures forced to review, interactive repair actions, single-hierarchy anatomy/evidence breakdown, visible hover/focus states, and fresh IBAN generation on every Generate click.
  - Shared segment-anatomy enrichment for factory country tools: identifiers, tax/company IDs, VAT/customs, bank/account/payment references, IBAN/BIC, phone, postal, vehicle, date, amount, and developer-data payloads now expose readable parts wherever the local format supports it.
  - Explicit non-migration guard: Brazil, Poland, France, and Netherlands must not import or call the factory without a separate user-approved migration task.
- Known future ideas:
  - Per-country generator that emits factory configs from a researched country tool matrix.
  - Optional screenshot comparison against Brazil CPF/CNPJ once a browser visual-diff workflow is approved.
- Current quality status: Additive V1 template for future countries; not connected to existing accepted country suites.

## Base64 Workbench

- Source JS: `assets/js/tools/base64.js`
- Related YAML tool pages:
  - `tools/base64-encoder.yaml`
  - `tools/base64-decoder.yaml`
- Algorithm IDs:
  - `validohub.base64`
  - `validohub.base64-decoder`
- Current capabilities:
  - Encode
  - Decode
  - Validate
  - Unicode-safe text handling
  - Base64URL support
  - Padding options
  - Auto-detection
  - Detailed diagnostics
  - Advanced analysis
  - Hex preview
  - Text, JSON, image, PDF, and binary decode previews
  - File choose and drag-and-drop
  - Copy and smart download
  - Keyboard-friendly workflow
- Known future ideas:
  - Batch encode/decode
  - Line wrapping options
  - Data URL helper
  - MIME-aware file naming improvements
- Current quality status: Reference-quality production workbench.

## URL Workbench

- Source JS: `assets/js/tools/url.js`
- Related YAML tool pages:
  - `tools/url-encoder.yaml`
  - `tools/url-decoder.yaml`
- Algorithm IDs:
  - `validohub.url-encoder`
  - `validohub.url-decoder`
- Current capabilities:
  - Encode
  - Decode
  - Validate
  - UTF-8 support
  - Auto-detect already encoded input
  - Malformed percent-sequence diagnostics
  - Space handling notes
  - Character, byte, encoded length, decoded length, reserved character, unsafe character, and percent-byte stats
  - Invalid sequence highlighting
  - Advanced analysis
  - Samples
  - Copy and download through the shared framework
  - Mode-aware URL encode/decode API preview
  - URL encode/decode quality note cards
  - Decoder-first encoded success preset on decoder pages
- Known future ideas:
  - URL Parser
  - URL Analyzer
  - Query Parser
  - Query Builder
  - Component-level copy helpers
  - Normalize and sort query parameters
- Current quality status: Production-quality premium workbench with mode-correct presets and advanced analysis.

## JSON Workbench

- Source JS: `assets/js/tools/json.js`
- Related YAML tool pages:
  - `tools/json-formatter.yaml`
  - `tools/json-validator.yaml`
- Algorithm IDs:
  - `validohub.json-formatter`
  - `validohub.json-validator`
- Current capabilities:
  - Format / pretty print
  - Minify
  - Validate
  - Explain
  - Sort object keys
  - Remove empty values
  - Interactive tree explorer
  - JSONPath display and copy
  - Search by key/value with next and previous
  - Selected-node copy helpers for value, key, JSONPath, and subtree JSON
  - Syntax highlighting
  - Error line, column, token highlight, likely cause, and repair suggestions
  - Duplicate property warnings
  - Extended statistics
  - Large JSON mode with capped tree rendering
  - File choose and drag-and-drop
  - Copy and download through the shared framework
- Known future ideas:
  - JSON Diff
  - JSON Merge
  - JSON Schema Generator
  - TypeScript Generator
  - Java POJO Generator
  - Kotlin data class Generator
  - C# Generator
  - Go structs
  - YAML conversion
- Current quality status: Production-quality V2 workbench.

## JWT Workbench

- Source JS: `assets/js/tools/jwt.js`
- Related YAML tool page:
  - `tools/jwt-decoder.yaml`
- Algorithm ID:
  - `validohub.jwt-decoder`
- Current capabilities:
  - Decode
  - Validate
  - Inspect / parse
  - Analyze / explain
  - Header JSON pretty print and syntax highlighting
  - Payload JSON pretty print and syntax highlighting
  - Payload tree view
  - Payload search
  - Payload JSONPath display
  - Raw token section display
  - Signature display
  - Token analysis for algorithm, issuer, audience, subject, JWT ID, issued at, not before, and expiration
  - Token health badges for valid structure, expired, not yet valid, missing signature, weak algorithm, and unknown algorithm
  - Human-readable expiration and validity timing
  - Copy helpers for header, payload, signature, claims, raw token, and decoded JSON
  - Download helpers for header, payload, and decoded JSON
  - Error UX with malformed-section highlighting and repair suggestions
  - Safe sample JWT tokens
- Known future ideas:
  - Signature verification with explicit key-handling UX
  - JWKS fetching only if a future product spec approves network behavior
  - Claim expectation checks for issuer, audience, and subject
  - Token comparison
- Current quality status: Production-quality V1 workbench.


## PIX Workbench

- Source JS: `assets/js/tools/pix.js`
- Related YAML tool page:
  - `tools/brazil-pix-validator.yaml`
- Algorithm ID:
  - `validohub.brazil-pix`
- Current capabilities:
  - Validate PIX keys.
  - Detect CPF, CNPJ, email, Brazilian phone, and EVP random UUID keys.
  - Validate CPF and CNPJ check digits.
  - Normalize Brazilian phone keys to +55 format.
  - Parse BR Code / EMV payloads.
  - Explain PIX GUI, key, merchant, city, amount, TXID, currency, country, and CRC fields.
  - Generate static PIX BR Code payloads locally.
  - Generate QR SVG locally in the browser.
  - Copy payload and result JSON.
  - Download result JSON and generated QR SVG.
  - Show validation timeline, result cards, TLV table, CRC debugger, and developer JSON snapshot.
  - Provide presets and local-only input history.
- Known future ideas:
  - Dynamic PIX URL parser.
  - PIX copy-and-paste formatter.
  - Merchant presets.
  - Batch QR generation.
  - Browser-only QR image import if a decoder is approved.
- Current quality status: Production-quality V1 workbench modeled after the PESEL gold standard.

## France Premium Workbench Suite

- Source JS: `assets/js/tools/france-suite.js`
- Related YAML tool pages:
  - `tools/france-*.yaml`
- Algorithm ID:
  - `validohub.france-suite`
- Current capabilities:
  - 64 France-specific country workbenches.
  - SIREN, SIRET, NIC, TVA, EORI, APE/NAF, RCS, RM, Sirene-readiness, and onboarding diagnostics.
  - French IBAN, RIB, bank code, BIC, SEPA transfer, RUM, remittance, bank statement, masking, and reconciliation helpers.
  - Postal code, INSEE commune, department, region, CEDEX, address, transliteration, phone, E.164, date, EUR, CSV, accent, and slug localization helpers.
  - NIR syntax/key/masking, personal-data fixtures, GDPR/PII redaction, document OCR repair, vehicle plate, VIN, Crit'Air, carte grise, and vehicle redaction helpers.
  - Tax and compliance helpers for VAT rates, invoice numbers, e-invoicing/PDP/PPF readiness, FEC snippets, audit trails, API payloads, regex packs, JSON fixtures, and form fields.
  - Branded France workbench header, samples, immediate result card after inputs, validation pipeline, field breakdown, quality notes, local checks, copyable output, and developer JSON payload.
  - Browser-only/offline analysis with explicit boundaries for Sirene, VIES, bank ownership, identity proof, customs status, and official registry existence.
- Known future ideas:
  - Larger official dictionaries for APE/NAF, departments, regions, bank codes, and commune names.
  - Optional live lookup integrations only after a privacy/network product spec.
  - Deeper all-locale editorial translation pass for the dense France-specific workbench copy.
- Current quality status: Production-quality V1 country suite and France expansion benchmark.

## Netherlands Premium Workbench Suite

- Source JS: `assets/js/tools/netherlands-suite.js`
- Related YAML tool pages:
  - `tools/netherlands-*.yaml`
- Algorithm ID:
  - `validohub.netherlands-suite`
- Current capabilities:
  - 63 Netherlands-specific country workbenches.
  - BSN, RSIN, KVK, BTW/VAT, EORI, DigiD-boundary, UBO, RVO, document, driving-licence, vehicle plate, RDW redaction, and VIN diagnostics.
  - Dutch IBAN, BIC/SWIFT, bank code, SEPA transfer, SEPA mandate, iDEAL references, remittance, masked IBAN, statement parsing, and payment reconciliation helpers.
  - Postcode, address, house-number addition, BAG readiness, municipality/province, phone, E.164, date, EUR, transliteration, and slug helpers.
  - Tax and compliance helpers for BTW rates, invoice numbers, e-invoicing, Peppol readiness, VAT returns, Dutch audit-file snippets, payroll tax, wage tax, audit trails, and compliance checklists.
  - AVG/GDPR redaction, Dutch PII masking, personal fixtures, data-quality audits, OCR cleanup, CSV normalization, JSON fixtures, regex packs, API payload audits, form-field audits, email fixtures, health-insurance boundaries, PostNL tracking, and EAN/GS1 fixtures.
  - Branded Netherlands workbench header, short sample selector labels, immediate result card after inputs, validation pipeline, dedicated field breakdown panels, quality notes, local checks, copyable output, and developer JSON payload.
  - Brazil-style field breakdown coverage for BSN/RSIN eleven-test digits, KVK, BTW/VAT, EORI, Dutch IBAN/BBAN, BIC, postcode, phone, EUR values, vehicle/RDW/VIN/plate evidence, audit-file snippets, and developer/data payloads.
  - Browser-only/offline analysis with explicit boundaries for KVK, BAG, VIES, bank ownership, DigiD, RDW, tax filing, identity proof, and carrier status.
- Known future ideas:
  - Larger Dutch dictionaries for bank codes, municipality/province names, vehicle plate families, VAT return box labels, and Peppol participant formats.
  - Optional live lookup integrations only after a privacy/network product spec.
  - Deeper all-locale editorial translation pass for dense Netherlands-specific workbench copy.
- Current quality status: Production-quality V2 country suite, Brazil-style field-breakdown benchmark, and first post-guardrails generation benchmark.

## Italy Premium Workbench Suite

- Source JS: `assets/js/tools/italy-suite.js`
- Shared shell JS: `assets/js/tools/country-suite-factory.js`
- Related YAML tool pages:
  - `tools/italy-*.yaml`
- Algorithm ID: `validohub.italy-suite`
- Product spec:
  - `docs/product/ITALY_PREMIUM_SUITE_SPEC.md`
- Current capabilities:
  - 60 Italy-specific country workbenches.
  - Codice fiscale, Partita IVA, VAT ID, EORI, SDI, PEC, REA, Registro Imprese, ATECO, SPID/CIE boundary, company onboarding, and tax/company diagnostics.
  - Italian IBAN, ABI/CAB, BIC/SWIFT, SEPA transfer, direct debit mandates, Ri.Ba, pagoPA, remittance, masked IBAN, statement parsing, and payment reconciliation helpers.
  - FatturaPA XML, SDI routing, VAT rates, VAT returns, invoice numbers, e-invoicing readiness, accounting audit trails, and EUR amount helpers.
  - CAP, address, transliteration, province, comune/Belfiore, phone, E.164, date, CSV, slug, OCR, JSON, regex, API, form, and data-quality helpers.
  - GDPR/privacy redaction, Italian PII masking, personal fixtures, passport/ID/residence-permit/driving-licence/tessera sanitaria helpers, vehicle plates, VIN, customs, and postal tracking helpers.
  - Country Suite Factory V1 shell with compact Brazil-scale header, short samples, immediate result card, validation pipeline, dedicated field breakdown, quality notes, copy/download controls, and advanced developer payload.
- Current quality status: Production-quality V1 factory country suite.

## Germany Premium Workbench Suite

- Source JS: `assets/js/tools/germany-suite.js`
- Shared shell JS: `assets/js/tools/country-suite-factory.js`
- Related YAML tool pages:
  - `tools/german-*.yaml`
  - `tools/germany-iban-validator.yaml`
- Algorithm ID:
  - `validohub.germany-suite`
- Product spec:
  - `docs/product/GERMANY_PREMIUM_SUITE_SPEC.md`
- Current capabilities:
  - 60 Germany-specific country workbenches.
  - IdNr, Steuernummer, USt-IdNr, EORI, Handelsregister, LEI, company onboarding, ELSTER, Finanzamt, and customs diagnostics.
  - German IBAN, BLZ, BIC/SWIFT, SEPA transfer, direct debit mandates, Girocard, remittance, masked IBAN, statement parsing, and payment reconciliation helpers.
  - VAT, invoice, XRechnung, ZUGFeRD, e-invoicing, DATEV, GoBD, SKR03/SKR04, payroll, wage tax, and health-insurance boundary helpers.
  - Postal code, address, transliteration, Bundesland, municipality, phone, E.164, date, EUR, CSV, slug, OCR, JSON, regex, API, form, and data-quality helpers.
  - DSGVO/GDPR redaction, German PII masking, personal fixtures, passport/ID/residence-permit/driving-licence helpers, vehicle plates, VIN, vehicle redaction, customs declaration, and postal tracking helpers.
  - Country Suite Factory V1 shell with compact Brazil-scale header, short samples, immediate result card, validation pipeline, dedicated field breakdown, quality notes, copy/download controls, and advanced developer payload.
  - Runtime localization for every supported ValidoHub locale across workbench labels, states, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
  - Browser-only/offline analysis with explicit boundaries for BZSt, ELSTER, VIES, Handelsregister, bank directories, Zoll/EORI, identity proof, vehicle registry status, carrier delivery state, and legal decisions.
- Known future ideas:
  - Live registry/tax/bank/postal integrations only after privacy and network product specs.
  - Larger German dictionaries for BLZ, Bundesland, tax-office, postal-region, and accounting-code enrichment.
- Current quality status: Production-quality V1 country suite, second Country Suite Factory consumer, and first generic-country IBAN route graduation benchmark.

## Switzerland Premium Workbench Suite

- Source JS: `assets/js/tools/switzerland-suite.js`
- Shared shell JS: `assets/js/tools/country-suite-factory.js`
- Related YAML tool pages:
  - `tools/switzerland-*.yaml`
- Algorithm ID:
  - `validohub.switzerland-suite`
- Product spec:
  - `docs/product/SWITZERLAND_PREMIUM_SUITE_SPEC.md`
- Current capabilities:
  - 58 Switzerland-specific country workbenches.
  - UID, MWST/VAT, AHV/AVS, EORI/customs, company onboarding, Zefix-readiness, salary certificate, payroll, withholding-tax, VAT-return, and tax-boundary diagnostics.
  - Swiss IBAN, SIC/BC clearing, BIC/SWIFT, SEPA transfer, QR-bill payloads, QR/ESR references, CHF amount formatting, payment reconciliation, and bank-statement parsing helpers.
  - Postal code, address, transliteration, multilingual address, canton-code, municipality, phone, E.164, date, decimal/currency, CSV, slug, JSON, regex, API, and form-field helpers.
  - FADP/GDPR redaction, Swiss PII masking, data-quality audits, OCR cleanup, personal-data fixtures, passport/ID/residence-permit/driving-licence helpers, health-insurance boundaries, insurance-policy snippets, vehicle plates, VIN, vehicle redaction, customs declaration, and Swiss Post tracking helpers.
  - Country Suite Factory V1 shell with compact Brazil-scale header, short samples, immediate result card, validation pipeline, dedicated field breakdown, quality notes, copy/download controls, and advanced developer payload.
  - Runtime localization for every supported ValidoHub locale across workbench labels, states, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
  - Browser-only/offline analysis with explicit boundaries for Zefix, UID register status, tax filing, identity proof, AHV/AVS identity, bank ownership, QR-bill settlement, customs status, carrier delivery state, vehicle registry status, and official legal decisions.
- Known future ideas:
  - Deeper official dictionaries for canton/municipality codes, Swiss bank clearing numbers, VAT fields, and QR-bill payload validation after source audit.
  - Human-reviewed static editorial translations for the full Switzerland country hub body.
  - Optional live lookup integrations only after a privacy/network product spec.
- Current quality status: Production-quality V1 country suite and first full Country Suite Factory V1 consumer.

## Spain Premium Country Suite V1

- Status: active
- Source JS: `assets/js/tools/spain-suite.js`
- Factory dependency: `assets/js/tools/country-suite-factory.js`
- Algorithm ID: `validohub.spain-suite`
- Routes: `tools/spain-*.yaml`
- Notes: Full Spain country suite covering identity, tax, banking, payments, e-invoicing, locale, privacy, document, vehicle, postal, and developer-data workflows. Existing `spain-id-validator` and `spain-iban-validator` routes are preserved inside the suite.

## Spain ID Workbench

- Source JS: `assets/js/tools/spain-id.js`
- Related YAML tool page:
  - `tools/spain-id-validator.yaml`
- Algorithm ID:
  - `validohub.spain-id`
- Current capabilities:
  - Validate DNI, NIE, NIF, legal-entity NIF / legacy CIF-style identifiers, and optional `ES` VAT-prefixed syntax.
  - Normalize separators and uppercase letters.
  - Explain DNI/NIE modulo-23 control-letter calculation.
  - Explain legal-entity CIF/NIF weighted control digit or letter calculation.
  - Detect entity-family context from legal-entity prefix.
  - Generate fictional DNI, NIE, and CIF/NIF test fixtures locally.
  - Show validation timeline, result cards, token breakdown, checksum debugger, and developer JSON snapshot.
  - Provide presets and local-only input history.
  - Copy normalized identifier and download result JSON through the shared framework.
- Known future ideas:
  - Dedicated VAT / VIES Workbench with explicit network policy.
  - Batch CSV validation.
  - Mask/anonymize helper for logs.
  - Spain phone, postal code, IBAN, and Bizum-specific tools.
- Current quality status: Production-quality V1 workbench modeled after PESEL and PIX.

## Poland Premium Workbench Suite

- Source JS: `assets/js/tools/poland-suite.js`
- Related YAML tool pages:
  - `tools/poland-nip-validator.yaml`
  - `tools/poland-regon-validator.yaml`
  - `tools/poland-iban-nrb-validator.yaml`
  - `tools/poland-tax-microaccount-calculator.yaml`
  - `tools/poland-postal-code-validator.yaml`
  - `tools/poland-phone-number-validator.yaml`
  - `tools/poland-license-plate-inspector.yaml`
  - `tools/poland-krs-inspector.yaml`
  - `tools/poland-vat-validator.yaml`
  - `tools/poland-bank-code-inspector.yaml`
- Algorithm ID:
  - `validohub.poland-suite`
- Current capabilities:
  - NIP checksum validation, normalization, safe fixture generation, and checksum debugger.
  - REGON 9/14-digit validation, normalization, safe fixture generation, and checksum debugger.
  - Polish IBAN / NRB MOD-97 validation and bank/account segment explanation.
  - Tax microaccount input readiness checks for PESEL-shaped and valid NIP inputs with official-status boundary copy.
  - Polish postal-code normalization and NN-NNN diagnostics.
  - Polish phone number normalization and mobile/landline/service/premium-style classification hints.
  - Polish license-plate structural inspection and region-prefix hints.
  - KRS 10-digit format inspection with registry-status boundary copy.
  - Polish VAT syntax validation using PL + NIP checksum and VIES boundary copy.
  - Polish bank-code / branch segment inspection from valid NRB or PL IBAN.
  - Shared presets, recent local inputs, validation timeline, result cards, field breakdown, debugger, developer JSON, copy normalized, copy JSON, and downloads through the shared framework.
  - Batch validation for every tool with mixed valid/invalid reporting.
  - Mask/anonymize helpers for logs, screenshots, support tickets, and developer fixtures.
  - Copy helpers for normalized value, masked value, generated test case, and audit JSON.
  - Versioned audit JSON with masked, proves, fields, diagnostics, warnings, and recommendations.
  - Richer offline dictionaries for Polish bank codes, phone area prefixes, mobile-like prefixes, and license-plate prefixes.
  - Tool-specific repair suggestions and clearer offline/live-boundary language.
- Known future ideas:
  - CSV import/export for larger batch files.
  - Official lookup integrations only if a future privacy/network product spec explicitly approves them.
  - Even deeper administrative license-plate coverage and bank-code dictionary expansion.
  - Dedicated printable audit report layout.
- Current quality status: Production-quality V2 suite modeled after the PESEL gold standard.


## Poland Expansion Workbench Suite

- Source JS: `assets/js/tools/poland-expansion.js`
- Related YAML tool pages:
  - `tools/poland-id-card-validator.yaml`
  - `tools/poland-swift-bic-inspector.yaml`
  - `tools/poland-teryt-code-inspector.yaml`
  - `tools/poland-blik-code-helper.yaml`
  - `tools/poland-pln-amount-formatter.yaml`
  - `tools/poland-vat-calculator.yaml`
  - `tools/poland-date-locale-formatter.yaml`
  - `tools/poland-address-formatter.yaml`
  - `tools/poland-vin-validator.yaml`
  - `tools/poland-eori-inspector.yaml`
  - `tools/poland-pii-masker.yaml`
  - `tools/poland-test-data-generator.yaml`
  - `tools/poland-invoice-number-helper.yaml`
  - `tools/poland-grosz-converter.yaml`
  - `tools/poland-sepa-transfer-helper.yaml`
- Algorithm ID:
  - `validohub.poland-expansion`
- Current capabilities:
  - Polish ID card structure and checksum diagnostics.
  - Polish BIC/SWIFT syntax and PL country-code inspection.
  - TERYT-like administrative-code shape inspection.
  - BLIK six-digit code helper with security boundary copy.
  - PLN amount formatting and grosz conversion.
  - Polish VAT net/VAT/gross calculator for common offline rates.
  - Polish date and locale formatter for `pl-PL` and `Europe/Warsaw`.
  - Polish address formatter and postal-code extraction.
  - VIN structure and checksum validation for vehicle intake workflows.
  - PL EORI syntax and NIP-like root inspection.
  - Polish PII masker for logs/support workflows.
  - Safe fictional Poland test-data generator.
  - Invoice number normalization and fixture generation.
  - Polish SEPA transfer readiness inspection.
  - Shared presets, local history, batch validation, masking, field breakdown, quality notes, audit JSON, copy helpers, and mobile-safe layout.
- Known future ideas:
  - Dedicated official-reference docs per tool after source audit.
  - Deeper TERYT/SIMC/ULIC dictionaries if local datasets are approved.
  - Larger bank/BIC dictionary and CSV import/export.
- Current quality status: Production-quality V1 expansion pack modeled after PESEL and Poland Premium Suite.

## Poland Baseline Workbench Suite

- Source JS: `assets/js/tools/poland-baseline.js`
- Related YAML tool pages:
  - `tools/poland-ksef-invoice-xml-validator.yaml`
  - `tools/poland-jpk-file-validator.yaml`
  - `tools/poland-split-payment-helper.yaml`
  - `tools/poland-pkd-code-inspector.yaml`
  - `tools/poland-pkwiu-code-inspector.yaml`
  - `tools/poland-bdo-number-inspector.yaml`
  - `tools/poland-ceidg-readiness-checker.yaml`
  - `tools/poland-company-onboarding-auditor.yaml`
  - `tools/poland-invoice-data-auditor.yaml`
  - `tools/poland-receipt-paragon-helper.yaml`
  - `tools/poland-transfer-title-builder.yaml`
  - `tools/poland-payment-qr-generator.yaml`
  - `tools/poland-bank-statement-parser.yaml`
  - `tools/poland-postal-address-parser-pro.yaml`
  - `tools/poland-teryt-hierarchy-explorer.yaml`
  - `tools/poland-municipality-code-inspector.yaml`
  - `tools/poland-mrz-passport-id-parser.yaml`
  - `tools/poland-passport-number-inspector.yaml`
  - `tools/poland-driving-licence-inspector.yaml`
  - `tools/poland-vehicle-registration-certificate-helper.yaml`
  - `tools/poland-insurance-policy-number-helper.yaml`
  - `tools/poland-parcel-tracking-inspector.yaml`
  - `tools/poland-energy-meter-ppe-inspector.yaml`
  - `tools/poland-vies-readiness-helper.yaml`
  - `tools/poland-upo-edeklaracje-payload-checker.yaml`
  - `tools/poland-ksef-fa2-field-mapper-assistant.yaml`
  - `tools/poland-payroll-net-gross-sanity-helper.yaml`
  - `tools/poland-bank-transfer-reconciliation-helper.yaml`
  - `tools/poland-iban-owner-name-precheck.yaml`
  - `tools/poland-address-transliteration-normalizer.yaml`
  - `tools/poland-ocr-postprocessing-fixer.yaml`
  - `tools/poland-invoice-duplicate-risk-detector.yaml`
  - `tools/poland-compliance-checklist-generator.yaml`
  - `tools/poland-data-quality-workbench.yaml`
- Algorithm ID:
  - `validohub.poland-baseline`
- Current capabilities:
  - KSeF and JPK XML readiness inspection.
  - Split-payment, invoice, receipt, bank statement, transfer-title, payment QR, policy, and data-quality helpers.
  - PKD, PKWiU, BDO, TERYT hierarchy, municipality, PPE, parcel, passport, MRZ, driving-licence, and vehicle-document inspectors.
  - VIES readiness payload preparation, UPO/e-Deklaracje payload checks, KSeF FA(2) field mapping, payroll net/gross sanity checks.
  - Bank transfer reconciliation helper, IBAN owner-name pre-check, address transliteration and normalization, OCR post-processing fixes.
  - Invoice duplicate-risk detection and exportable compliance checklist generation.
  - CEIDG and company-onboarding local evidence checklists.
  - Real local SVG QR generation for the payment QR helper.
  - Shared smart presets, recent local inputs, batch review, masking, normalized output, audit JSON, pipeline cards, domain panels, quality analysis, and mobile-safe layout.
- Known future ideas:
  - Deeper per-tool official-reference docs after source audit.
  - Local dictionaries for PKD/PKWiU/TERYT/municipality/carrier/code systems if approved.
  - CSV import/export and printable audit packs.
  - Dedicated deeper product specs for any baseline tool promoted to a single-tool gold standard.
- Current quality status: Production-quality V1 broad baseline suite modeled after PESEL, Poland Premium Suite, and Poland Expansion Suite.

## Countries Platform

This is a product platform section, not a browser workbench plugin.

- Source JS: `assets/js/countries.js`
- Portal JS: `assets/js/portal-countries.js`
- Portal builder: `scripts/build-countries-portal.mjs`
- Related content/config:
  - `countries/brazil.yaml`
  - `countries/poland.yaml`
  - `countries/spain.yaml`
  - `tools/brazil-pix-validator.yaml`
  - `tools/pesel-validator.yaml`
- Current capabilities:
  - Locale-first country hub routes.
  - Locale-first country workbench routes.
  - Global Countries Portal at `/en/countries/`.
  - Product-owned post-publish portal route generation.
  - Product-owned post-publish metadata-only country hub shell generation.
  - Product-owned Countries navigation grouping.
  - `All Countries` menu entry.
  - Automatic discovery of generated country hubs from locale-first links.
  - Product-owned roadmap metadata for future countries.
  - Search by country name, ISO code, currency, language, identifier, and payment system.
  - Region, status, and developer feature filters.
  - Lightweight interactive world map.
  - Country card hover/focus previews.
  - Continent grouping.
  - Completion progress bars.
  - Brazil featured as Reference Implementation.
  - Brand Asset System consumer through `assets/js/brand-assets.js`.
  - Country Hub Template V3 renderer for Brazil.
  - Country Hub Design Guide as the permanent reusable design standard.
  - Country Hub AI Guide for future AI implementation discipline.
  - Structured country metadata model.
  - Country visual identity and official brand placeholder support.
  - Global brand asset policy for official logos, monochrome logo preference, and semantic icon fallback.
  - Registered brand rendering for PIX, Banco Central do Brasil, gov.br, Receita Federal, Correios, SWIFT, IBAN, JWT, Java, Python, Go, Kotlin, C#, JavaScript, TypeScript, and PostgreSQL on the Brazil hub.
  - Rich Country Statistics.
  - Developer Quick Actions.
  - Developer Country Profile.
  - Copy buttons for important country values and code snippets.
  - Reusable status chips for Ready, Available, Coming soon, Planned, Experimental, and Deprecated.
  - Brazil Developer Cheat Sheet.
  - Brazil localization examples, address examples, phone examples, local formats, payments, banking overview, official resources, available workbenches, planned workbenches, related global tools, developer notes, and integration checklist.
  - Spain Country Hub V1 as the first architecture-reuse proof for the Brazil Country Hub renderer and visual system.
  - Spain country profile, localization examples, address examples, phone examples, local formats, payments, banking overview, official resources, planned workbenches, related global tools, developer notes, and integration checklist.
  - Spain visual assets for country outline and highlighted world map.
  - Registered brand rendering for Bizum, VIES, European Union, Gobierno de España, Agencia Tributaria, Seguridad Social, Banco de España, Correos Spain, SEPA, SWIFT, IBAN, JWT, Java, Python, Go, Kotlin, C#, JavaScript, TypeScript, and PostgreSQL on the Spain hub.
  - Validation Rules and Common Integration Mistakes summaries without implementing validators.
  - Developer API Examples and JSON Examples with copyable snippets.
  - Localization Notes and Country Ecosystem cards.
  - Discovery Links and semantic tags for future search/filtering.
  - Hidden future ad-slot hooks.
  - No hardcoded Brazil or Poland behavior in Engine or browser assets.
  - Existing Engine country hub and breadcrumb generation.
- Known future ideas:
  - Move rich country data into a generic build-time model if SEO requirements demand it.
  - Country landing page editorial content.
  - Featured workbenches.
  - Country tool category grouping.
  - Tags, display order, and icons through approved generic metadata.
  - Country-specific validator specs before any implementation.
- Current quality status: Brazil is the reference Country Intelligence Portal V3; Spain is the first reuse-proof Country Hub V1; the Countries Portal is production-quality V1 for global discovery; country-specific validators remain future work.


## Brazil Premium Suite Workbench

- Source JS file: `assets/js/tools/brazil-suite.js`
- Algorithm metadata: `validohub.brazil-suite`
- Related pages: Brazil country-specific tool YAML files under `tools/brazil-*.yaml` except `brazil-pix-validator`, which uses the dedicated Pix plugin.
- Capabilities: browser-only validation, normalization, masking, fictional fixture generation, diagnostics, batch-ready text input, advanced JSON analysis, and offline/official-lookup boundaries for Brazilian identifiers, fiscal documents, banking, payment, address, and developer-data workflows.
- Quality status: Premium baseline, modeled after the Poland country-hub gold standard.

## Generic Utility Workbench Suite

- Source JS file: `assets/js/tools/generic-suite.js`
- Build wiring: `scripts/build-all.mjs` materializes full generic utility workbench markup after Engine publish and injects the shared workbench helpers, framework, and `generic-suite.js`.
- Related pages:
  - `tools/case-converter.yaml`
  - `tools/html-decoder.yaml`
  - `tools/html-encoder.yaml`
  - `tools/brazil-iban-validator.yaml`
  - `tools/germany-iban-validator.yaml`
  - `tools/iban-validator.yaml`
  - `tools/md5-generator.yaml`
  - `tools/regex-tester.yaml`
  - `tools/sha1-generator.yaml`
  - `tools/sha256-generator.yaml`
  - `tools/spain-iban-validator.yaml`
  - `tools/slug-generator.yaml`
  - `tools/text-diff.yaml`
  - `tools/uuid-generator.yaml`
- Current capabilities:
  - Browser-only execution with no backend, REST API, database, or Java execution.
  - Tool-specific validation, normalization, diagnostics, samples, copy, download, local result cards, preview, and expanded advanced analysis.
  - HTML encode/decode, slug generation, case conversion, UUID v4/v7 generation and validation, global IBAN MOD-97 validation, country-specific Brazil/Germany/Spain IBAN workbenches, regular-expression testing, text diffing, and MD5/SHA-1/SHA-256 hashing.
  - Working success-first sample chips and intentional edge/error samples for every generic-suite page.
  - UUID batch generation capped at 100 local values, UUID v4/v7 validation, canonical/compact/URN output, variant/version decoding, and UUID v7 timestamp inspection.
  - IBAN masked display alongside grouped output, country detection, country page routing, BBAN field maps, and MOD-97 diagnostics.
  - Country-aware IBAN maps now cover Brazil, Germany, Spain, Poland, France, Netherlands, Austria, Belgium, Czechia, Denmark, Finland, United Kingdom, Ireland, Italy, Norway, Portugal, Romania, Sweden, and Ukraine. Spain IBAN also replays domestic CCC check digits locally; Germany extracts BLZ/account segments; Brazil extracts bank, branch, account, and account-type fields. Poland remains on the dedicated Polish IBAN / NRB Workbench.
  - Regex capture-group reporting in output, named-group capture maps, match context snippets, replacement preview, flag audit, backtracking-risk heuristic, field breakdown, and developer JSON.
  - Dedicated gold-standard global hardening for JSON, JWT, Base64, and URL tools: JSON repair lab, schema inference, JSONPath/pointer and flattened fixture previews, secret-key scan; JWT registered-claim timeline, local security checklist, risk scoring, and verification-boundary copy; Base64 data-URI support, byte signatures, file-type sniffing, byte histograms, canonical standard/URL-safe analysis; URL full parser, query table, canonical URL output, redirect/credential/UTM/security hints.
  - Text diff premium result cards for added, removed, unchanged, and character delta metrics.
  - Hash digest shape validation and optional recompute/compare against provided input for MD5, SHA-1, and SHA-256.
  - Developer API preview before raw JSON on shared generic tools so integration handoff has a copy-ready payload shape while preserving the browser-only execution boundary.
  - `npm run audit:global-premium` is the fast-loop browser audit for global routes and must pass for global hardening work.
  - Correct dedicated slug generation and hash algorithm execution for MD5, SHA-1, and SHA-256.
  - Shared premium card styling so global tools visually match country workbench standards.
  - Premium generic tool header with identity mark, theme accent, domain-specific summary, capability chips, and privacy boundary.
- Known future ideas:
  - Promote high-traffic generic tools into dedicated gold-standard plugins when their domain requires deeper product UX.
  - Add human-reviewed documentation packs for each generic utility after usage data confirms priority.
  - Expand country-specific IBAN workbenches only when the page can add country-local structure, national checks, or real user demand beyond generic ISO validation.
- Current quality status: Production-quality V4 shared premium suite for global non-country tools, aligned with the Poland/Brazil premium workbench structure and hardened with domain-specific debugger depth where practical.


## Premium Country Readiness Gate

Future full-premium countries must pass `npm run audit:country-premium -- --country <slug>` in addition to `npm run audit:country-suite`. The readiness report lives in `docs/reports/country-premium-readiness.*` and records premium/partial/planned state, tool counts, generated pages, blockers, and warnings.


## Europe Premium Batch V1

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania).

Each country registers 60 active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown is mandatory for every route.


## Strict Europe Premium Batch V2

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania), Albania (albania), Andorra (andorra), Bosnia and Herzegovina (bosnia-and-herzegovina), Bulgaria (bulgaria), Croatia (croatia), Cyprus (cyprus), Estonia (estonia), Greece (greece), Hungary (hungary), Iceland (iceland), Latvia (latvia), Liechtenstein (liechtenstein), Lithuania (lithuania), Luxembourg (luxembourg), Malta (malta), Moldova (moldova), Monaco (monaco), Montenegro (montenegro), North Macedonia (north-macedonia), San Marino (san-marino), Serbia (serbia), Slovakia (slovakia), Slovenia (slovenia), Ukraine (ukraine), United Kingdom (united-kingdom), Vatican City (vatican-city).

Each country registers quality-driven active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown, tool-context explanation, valid/invalid fixtures, fresh generator output, copy feedback, and official boundary copy are mandatory for every route.


## Global Premium Tools Batch V3

Added 15 global premium workbenches across Web/API Quality, Data & Integration, and Security / Ops Premium. The batch also hardens the shared generic-suite advanced-analysis layout so field cards, pipelines, quality notes, API previews, and JSON/code blocks stay contained without horizontal page overflow.


## Global Premium Tools Batch 4-7

Added 20 global premium workbenches across Cloud / DevOps, AI / Data / RAG, Backend / API, and Frontend / QA. These continue the browser-only premium standard with local static analyzers, tool-specific samples, validation pipelines, field breakdowns, quality notes, Developer API previews, and snapshot JSON.

## Global Tools Deep Premium Lens V1

- Source JS: `assets/js/tools/generic-suite.js`
- Related tools: Batch 4-7 global workbenches across Cloud / DevOps, AI / Data / RAG, Backend / API, and Frontend / QA.
- Current capabilities: shared domain-specific browser-only lenses for Kubernetes YAML, Dockerfile, GitHub Actions, Terraform, CORS, Accessibility, Prompt Injection, RAG chunking, JSONL fine-tune datasets, HTML SEO, and browser storage. These lenses add domain cards, field breakdown rows, pipeline checks, risk names, and developer JSON beyond generic keyword counts.
- Current quality status: Deep premium shared hardening layer for newer global tools; dedicated full parsers remain future per-tool promotions where justified.


## South America Premium Batch V1

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Argentina (argentina), Bolivia (bolivia), Chile (chile), Colombia (colombia), Ecuador (ecuador), Guyana (guyana), Paraguay (paraguay), Peru (peru), Suriname (suriname), Uruguay (uruguay), Venezuela (venezuela).

Each country registers broad browser-only workbenches across identifiers, tax/invoicing, domestic banking/payments, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Domestic account/payment helpers replace IBAN-specific pages where the country does not use IBAN.


## Asia Premium Batch V2

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Japan (japan), India (india), Singapore (singapore), South Korea (south-korea), United Arab Emirates (united-arab-emirates).

Each country registers quality-driven active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown, tool-context explanation, valid/invalid fixtures, fresh generator output, copy feedback, and official boundary copy are mandatory for every route.


## Africa Baseline Batch V1

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Algeria (algeria), Angola (angola), Benin (benin), Botswana (botswana), Burkina Faso (burkina-faso), Burundi (burundi), Cabo Verde (cabo-verde), Cameroon (cameroon), Central African Republic (central-african-republic), Chad (chad), Comoros (comoros), Republic of the Congo (congo), Cote dIvoire (cote-d-ivoire), Democratic Republic of the Congo (democratic-republic-of-the-congo), Djibouti (djibouti), Egypt (egypt), Equatorial Guinea (equatorial-guinea), Eritrea (eritrea), Eswatini (eswatini), Ethiopia (ethiopia), Gabon (gabon), Gambia (gambia), Ghana (ghana), Guinea (guinea), Guinea-Bissau (guinea-bissau), Kenya (kenya), Lesotho (lesotho), Liberia (liberia), Libya (libya), Madagascar (madagascar), Malawi (malawi), Mali (mali), Mauritania (mauritania), Mauritius (mauritius), Morocco (morocco), Mozambique (mozambique), Namibia (namibia), Niger (niger), Nigeria (nigeria), Rwanda (rwanda), Sao Tome and Principe (sao-tome-and-principe), Senegal (senegal), Seychelles (seychelles), Sierra Leone (sierra-leone), Somalia (somalia), South Africa (south-africa), South Sudan (south-sudan), Sudan (sudan), Tanzania (tanzania), Togo (togo), Tunisia (tunisia), Uganda (uganda), Zambia (zambia), Zimbabwe (zimbabwe).

Each country registers quality-driven active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown, tool-context explanation, valid/invalid fixtures, fresh generator output, copy feedback, and official boundary copy are mandatory for every route.


## Oceania Baseline Batch V1

Runtime source: `assets/js/tools/<country>-suite.js` using `country-suite-factory.js`.

Countries: Australia (australia), Fiji (fiji), Kiribati (kiribati), Marshall Islands (marshall-islands), Micronesia (micronesia), Nauru (nauru), New Zealand (new-zealand), Palau (palau), Papua New Guinea (papua-new-guinea), Samoa (samoa), Solomon Islands (solomon-islands), Tonga (tonga), Tuvalu (tuvalu), Vanuatu (vanuatu).

Each country registers quality-driven active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown, tool-context explanation, valid/invalid fixtures, fresh generator output, copy feedback, and official boundary copy are mandatory for every route.
