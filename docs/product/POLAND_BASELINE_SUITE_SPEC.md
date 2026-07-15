# Poland Baseline Workbench Suite Spec

## Status

Production-quality V1 baseline complete.

## Purpose

The Poland Baseline Workbench Suite completes the first broad Poland country baseline after PESEL, Poland Premium Suite, and Poland Expansion Suite. It adds 24 browser-only Polish developer tools that follow the same product rule: tool first, documentation second, privacy-first local execution, and explicit offline/official-system boundaries.

## Source

- Browser plugin: `assets/js/tools/poland-baseline.js`
- Algorithm ID: `validohub.poland-baseline`
- Registry metadata: `algorithms/algorithms.yaml`
- Country links: `countries/data/poland.json`

## Tool Pages

- KSeF Invoice XML Validator: `/en/poland/poland-ksef-invoice-xml-validator/`
- JPK File Validator: `/en/poland/poland-jpk-file-validator/`
- Polish Split Payment / MPP Helper: `/en/poland/poland-split-payment-helper/`
- PKD Code Inspector: `/en/poland/poland-pkd-code-inspector/`
- PKWiU Code Inspector: `/en/poland/poland-pkwiu-code-inspector/`
- BDO Number Inspector: `/en/poland/poland-bdo-number-inspector/`
- CEIDG Data Readiness Checker: `/en/poland/poland-ceidg-readiness-checker/`
- Polish Company Onboarding Auditor: `/en/poland/poland-company-onboarding-auditor/`
- Polish Invoice Data Auditor: `/en/poland/poland-invoice-data-auditor/`
- Polish Receipt / Paragon Helper: `/en/poland/poland-receipt-paragon-helper/`
- Polish Transfer Title Builder: `/en/poland/poland-transfer-title-builder/`
- Polish Payment QR Generator: `/en/poland/poland-payment-qr-generator/`
- Polish Bank Statement Parser: `/en/poland/poland-bank-statement-parser/`
- Polish Postal Address Parser Pro: `/en/poland/poland-postal-address-parser-pro/`
- TERYT Hierarchy Explorer: `/en/poland/poland-teryt-hierarchy-explorer/`
- Polish Municipality / Voivodeship Code Inspector: `/en/poland/poland-municipality-code-inspector/`
- Polish MRZ Passport / ID Parser: `/en/poland/poland-mrz-passport-id-parser/`
- Polish Passport Number Inspector: `/en/poland/poland-passport-number-inspector/`
- Polish Driving Licence Inspector: `/en/poland/poland-driving-licence-inspector/`
- Polish Vehicle Registration Certificate Helper: `/en/poland/poland-vehicle-registration-certificate-helper/`
- Polish Insurance / Policy Number Helper: `/en/poland/poland-insurance-policy-number-helper/`
- Polish Parcel / Tracking Number Inspector: `/en/poland/poland-parcel-tracking-inspector/`
- Polish Energy Meter / PPE Number Inspector: `/en/poland/poland-energy-meter-ppe-inspector/`
- Polish Data Quality Workbench: `/en/poland/poland-data-quality-workbench/`

## Shared Capabilities

Every baseline tool provides:

- Browser-only validation, parsing, generation, and explanation.
- Smart presets and local-only recent input history.
- Batch review for up to 200 rows.
- Normalized value, masked value, and audit JSON copy helpers.
- Download through the shared Workbench Framework output path.
- Premium PESEL-style pipeline cards, result cards, identifier breakdown, domain workbench panel, quality analysis, and advanced developer JSON.
- Desktop and mobile layouts with no horizontal overflow in the verified baseline pages.

## Domain Capabilities

The suite covers fiscal XML readiness, JPK structure, split payment, business classifications, BDO, CEIDG/company onboarding, invoices, receipts, transfer titles, offline payment QR payloads, bank statements, addresses, TERYT/municipality codes, MRZ/passport, driving licence snippets, vehicle documents, insurance policies, parcel tracking, PPE energy codes, and Polish data-quality linting.

The Polish Payment QR tool reuses ValidoHub's browser-side QR generation approach. It creates a real SVG QR payload locally and does not upload payment data or execute a transfer.

## Boundaries

The suite does not perform official registry lookup, gateway submission, bank account ownership checks, KSeF/JPK acceptance, tax interpretation, customs status, delivery status, vehicle ownership, insurance validation, utility lookup, identity verification, or legal certification.

Official systems remain the source of truth for regulated status and operational decisions.

## Quality Baseline

This suite is a broad premium baseline rather than twenty-four deeply bespoke one-off products. PESEL remains the single-tool gold standard. Future iterations may deepen individual baseline tools with richer local dictionaries, official-reference documentation, CSV import/export, and printable audit reports after separate product specs.
