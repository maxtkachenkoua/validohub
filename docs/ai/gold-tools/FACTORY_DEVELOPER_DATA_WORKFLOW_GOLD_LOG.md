# Factory Developer Data Workflow Gold Floor

Date: 2026-07-27

## Scope

- Runtime: `assets/js/tools/country-suite-factory.js`.
- Coverage audit: 2,742 id/kind-matched tools across 187 parsed mounted country-suite files. Brazil, France, Netherlands, Poland, and the generic suite use older/special wrappers and were not counted by the mounted-suite parser in this audit.
- Families covered: CSV locale, JSON fixture/schema, API payload, webhook payload, OpenAPI, GraphQL, data quality, form fields, form autofill, regex helpers, slug/transliteration, personal-data fixtures, privacy redaction, PII masking, support-ticket scrubbing, OCR cleanup, integration smoke, SQL seed, test-case matrix, retention, checkout, and shipping-label workflows.

## What Changed

- Added `isDeveloperDataWorkflowTool`, `developerDataWorkflowKind`, `parseJsonLike`, `parseCsvLike`, `extractFieldKeys`, `safeFixtureFor`, `buildDeveloperDataWorkflowParsed`, and `buildDeveloperDataWorkflowResult`.
- Added JSON validity/type/key extraction, parse-error reporting, CSV delimiter/header/row-count/row-width checks, field/key extraction from labelled text, safe fixture JSON, privacy-signal detection, masked previews, OCR cleanup evidence, form/accessibility label evidence, and developer JSON output.
- Added `csf-developer-data-bar`, aligned to the full-width anti-overflow rail rules used by the other factory Gold floors.
- Analyzer priority now places developer-data after bank/account and locale/date/currency, and before broad document/payment/tax/contact fallbacks.

## Product Value

- CSV and data-quality pages now profile actual pasted data instead of only reporting generic validation state.
- JSON/API/webhook/schema pages now expose parse status, object type, top-level keys, and copyable safe fixtures.
- Privacy/scrubber/PII pages now flag sensitive fields and show irreversible masked previews without claiming compliance.
- Form/OCR/regex/slug helper pages now surface extractable field evidence and developer handoff JSON.

## Official Boundary

- Browser checks prove only local structure, parseability, field extraction, masking behavior, and fixture shape.
- They do not prove production source truth, legal/compliance acceptance, privacy-policy compliance, retention correctness, accessibility conformance, API compatibility, customer identity, or whether data came from an official system.

## QA

- Syntax:
  - `node --check assets/js/tools/country-suite-factory.js`
- Scoped builds only:
  - `npm run build:country -- --country algeria --locales en`
  - `npm run build:country -- --country canada --locales en`
  - `npm run build:country -- --country united-states --locales en`
  - `npm run build:country -- --country japan --locales en`
- Browser smoke on local preview:
  - `/en/algeria/algeria-csv-locale-normalizer/`
  - `/en/algeria/algeria-data-quality-workbench/`
  - `/en/algeria/algeria-regex-pack-helper/`
  - `/en/algeria/algeria-form-field-auditor/`
  - `/en/algeria/algeria-support-ticket-scrubber/`
  - `/en/algeria/algeria-document-ocr-fixer/`
  - `/en/canada/canada-api-payload-auditor/`
  - `/en/canada/canada-json-schema-local-rules-helper/`
  - `/en/canada/canada-form-autofill-fixture-generator/`
  - `/en/united-states/united-states-webhook-local-payload-fixture/`
  - `/en/japan/japan-data-quality-workbench/`
- Negative scope smoke:
  - `/en/algeria/algeria-bank-account-validator/` kept `csf-bank-account-bar`.
  - `/en/algeria/algeria-payment-reference-helper/` kept `csf-payment-workflow-bar`.
  - `/en/algeria/algeria-calendar-week-helper/` kept `csf-locale-format-bar`.

## Open Risks

- This is a strong shared factory floor, not a bespoke Pix/CURP/Spain-ID implementation for every data tool.
- Country-specific API schema, privacy-law, retention, e-commerce, OCR, and accessibility rules should be promoted into bespoke tools only where public specifications justify deeper local behavior.
- Generated suite display names can be shifted/misaligned, so future audits should continue to match route `id`/`kind` first and treat route copy as secondary evidence.
