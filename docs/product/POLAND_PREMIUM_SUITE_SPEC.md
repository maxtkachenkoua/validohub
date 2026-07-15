# Poland Premium Workbench Suite Spec

## Scope

This suite adds ten PESEL-inspired premium browser workbenches for Poland:

- NIP Validator & Explainer: `tools/poland-nip-validator.yaml`.
- REGON Validator & Explainer: `tools/poland-regon-validator.yaml`.
- Polish IBAN / NRB Workbench: `tools/poland-iban-nrb-validator.yaml`.
- Polish Tax Microaccount Calculator: `tools/poland-tax-microaccount-calculator.yaml`.
- Polish Postal Code Validator: `tools/poland-postal-code-validator.yaml`.
- Polish Phone Number Workbench: `tools/poland-phone-number-validator.yaml`.
- Polish License Plate Inspector: `tools/poland-license-plate-inspector.yaml`.
- KRS Number Inspector: `tools/poland-krs-inspector.yaml`.
- Polish VAT / EU VAT Syntax Workbench: `tools/poland-vat-validator.yaml`.
- Polish Bank Code / NRB Inspector: `tools/poland-bank-code-inspector.yaml`.

## Quality Target

Every page must follow the PESEL gold-standard direction: tool first, local sandbox reassurance, presets, local history, validation timeline, structured result cards, breakdown, debugger, developer JSON snapshot, copy/download, mobile polish, and clear limitations.

V2 raises the suite toward the PESEL quality bar for all ten pages with batch validation, masking/anonymization helpers, audit JSON, copyable test cases, richer field tables, quality notes, stronger diagnostics, repair suggestions, expanded bank-code hints, expanded phone-prefix hints, and expanded license-plate prefix hints.

## Browser-Only Rule

All checks run locally. No backend, REST API, database, Java execution, official registry lookup, VIES lookup, bank lookup, phone lookup, vehicle lookup, or network call is implemented.

## Shared Asset

- Source JS: `assets/js/tools/poland-suite.js`
- Shared algorithm metadata: `validohub.poland-suite`

## Implemented Offline Coverage

- NIP checksum and fixtures.
- REGON 9/14 checksum and fixtures.
- Polish IBAN / NRB MOD-97 and bank segment breakdown.
- Tax microaccount input inspector with PESEL/NIP readiness and official-lookup boundary.
- Postal code normalization.
- Phone number normalization and category hints.
- License plate format and prefix hints.
- KRS 10-digit format inspection.
- Polish VAT syntax via PL + NIP.
- Bank code / branch code extraction from NRB or PL IBAN.

## Implemented V2 Coverage

- Batch validation for every Poland suite tool, up to 250 local lines.
- Copy normalized value, masked value, generated test case, and audit JSON.
- Result masking for NIP, REGON, IBAN/NRB, tax identifiers, phone numbers, license plates, KRS, VAT, and bank-account inputs.
- Field tables that expose checksum segments, control digits, bank segments, phone prefixes, plate prefixes, registry shape, and boundary notes.
- Quality notes with warnings and repair suggestions specific to each tool.
- Audit JSON version 2 with masked, proves, fields, diagnostics, warnings, and recommendations.
- Larger offline dictionaries for Polish bank institution codes, phone area prefixes, mobile-like prefixes, and license-plate prefixes.
- Mobile-safe batch and result layouts.
