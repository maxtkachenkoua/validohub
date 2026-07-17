# Workbench Registry

This registry records production browser workbenches currently owned by ValidoHub.

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
- Known future ideas:
  - URL Parser
  - URL Analyzer
  - Query Parser
  - Query Builder
  - Component-level copy helpers
  - Normalize and sort query parameters
- Current quality status: Production workbench, below Base64 and JSON in depth.

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
