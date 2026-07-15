# Poland Expansion Workbench Suite Spec

## Scope

This suite adds fifteen additional browser-only premium Poland workbenches:

- Polish ID Card Validator: `tools/poland-id-card-validator.yaml`.
- Polish BIC / SWIFT Inspector: `tools/poland-swift-bic-inspector.yaml`.
- TERYT Code Inspector: `tools/poland-teryt-code-inspector.yaml`.
- BLIK Code Helper: `tools/poland-blik-code-helper.yaml`.
- PLN Amount Formatter: `tools/poland-pln-amount-formatter.yaml`.
- Polish VAT Calculator: `tools/poland-vat-calculator.yaml`.
- Polish Date / Locale Formatter: `tools/poland-date-locale-formatter.yaml`.
- Polish Address Formatter: `tools/poland-address-formatter.yaml`.
- VIN Validator for Poland Workflows: `tools/poland-vin-validator.yaml`.
- Polish EORI Inspector: `tools/poland-eori-inspector.yaml`.
- Polish PII Masker: `tools/poland-pii-masker.yaml`.
- Polish Test Data Generator: `tools/poland-test-data-generator.yaml`.
- Polish Invoice Number Helper: `tools/poland-invoice-number-helper.yaml`.
- PLN Grosz Converter: `tools/poland-grosz-converter.yaml`.
- Polish SEPA Transfer Helper: `tools/poland-sepa-transfer-helper.yaml`.

## Quality Target

The suite follows the PESEL and Poland Premium Suite standard: tool first, local sandbox reassurance, presets, batch validation, result cards, field breakdowns, masking, copy helpers, audit JSON, generated fixtures, clear diagnostics, mobile-safe layout, and honest offline boundaries.

## Browser-Only Rule

All checks run locally. No backend, REST API, database, Java execution, official registry lookup, banking lookup, customs lookup, vehicle lookup, tax-status lookup, or network call is implemented.

## Shared Asset

- Source JS: `assets/js/tools/poland-expansion.js`
- Shared algorithm metadata: `validohub.poland-expansion`

## Implemented Offline Coverage

- Polish ID card number structure and checksum diagnostics.
- Polish BIC/SWIFT syntax and PL country-code inspection.
- TERYT-like administrative code shape inspection.
- BLIK six-digit code shape, safe fixture generation, and security boundary copy.
- PLN amount formatting, grosz conversion, and developer money payloads.
- Polish VAT calculator for common rates with rounding notes.
- Polish date and locale formatting for pl-PL and Europe/Warsaw.
- Polish address normalization and postal-code extraction.
- VIN structure and ISO-style checksum validation.
- PL EORI syntax and NIP-like root inspection.
- Polish PII masking across identifiers, account numbers, phones, emails, and address-like text.
- Safe fictional Poland test-data generation.
- Invoice-number pattern normalization and fixture generation.
- PLN grosz conversion.
- Polish SEPA transfer readiness inspection.

