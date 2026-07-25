# Oceania Baseline Batch Suite Spec

This spec covers the Oceania baseline generation batch: Australia (australia), Fiji (fiji), Kiribati (kiribati), Marshall Islands (marshall-islands), Micronesia (micronesia), Nauru (nauru), New Zealand (new-zealand), Palau (palau), Papua New Guinea (papua-new-guinea), Samoa (samoa), Solomon Islands (solomon-islands), Tonga (tonga), Tuvalu (tuvalu), Vanuatu (vanuatu).

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. 60 tools is a density reference, not a cap or a filler target: add every meaningful local validator/generator/parser/debugger, and stop only when the local market truly has no more useful workflows.
- Every tool must render compact premium shell UI, validate/generate/explain where safe, validation pipeline, result cards, field breakdown, tool-context explanation, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Local generators must create fresh values on every Generate click, enforce country prefixes/check digits, and route invalid/bad-prefix fixtures into review/error states rather than green success.
- Country-specific analyzers must replace generic parser output whenever a local identifier has real structure. Generic "source payload / offline only" breakdown is only a fallback for tools with no formal structure.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.
- Only UN member sovereign Oceania countries are included; territories and dependencies require an explicit product decision before inclusion.

## Batch Countries

- Australia: TFN boundary, ABN / ACN, GST / ABN, BSB / BPAY / PayID reference, tax invoice, Privacy Act privacy.
- Fiji: TIN boundary, company registration number, FRCS tax / VAT boundary, bank transfer reference, tax invoice, privacy boundary.
- Kiribati: national ID boundary, company registration number, tax boundary, bank transfer reference, tax invoice, privacy boundary.
- Marshall Islands: national ID boundary, business corporation number, tax boundary, wire/payment reference, invoice, privacy boundary.
- Micronesia: national ID boundary, company registration number, tax boundary, wire/payment reference, invoice, privacy boundary.
- Nauru: national ID boundary, company registration number, tax boundary, bank transfer reference, invoice, privacy boundary.
- New Zealand: IRD number boundary, NZBN, GST / IRD, NZ bank account/payment reference, GST tax invoice, Privacy Act privacy.
- Palau: national ID boundary, business registration number, tax boundary, wire/payment reference, invoice, privacy boundary.
- Papua New Guinea: TIN boundary, company registration number, GST / IRC tax boundary, bank transfer reference, GST tax invoice, privacy boundary.
- Samoa: tax ID boundary, company registration number, VAGST / tax boundary, bank transfer reference, tax invoice, privacy boundary.
- Solomon Islands: TIN boundary, company registration number, GST / tax boundary, bank transfer reference, tax invoice, privacy boundary.
- Tonga: tax ID boundary, company registration number, consumption tax boundary, bank transfer reference, tax invoice, privacy boundary.
- Tuvalu: national ID boundary, company registration number, tax boundary, bank transfer reference, invoice, privacy boundary.
- Vanuatu: tax ID boundary, company registration number, VAT boundary, bank transfer reference, VAT tax invoice, privacy boundary.

## Acceptance

Run the premium gate per country:

```bash
npm run audit:country-premium -- --country australia
npm run audit:country-premium -- --country fiji
npm run audit:country-premium -- --country kiribati
npm run audit:country-premium -- --country marshall-islands
npm run audit:country-premium -- --country micronesia
npm run audit:country-premium -- --country nauru
npm run audit:country-premium -- --country new-zealand
npm run audit:country-premium -- --country palau
npm run audit:country-premium -- --country papua-new-guinea
npm run audit:country-premium -- --country samoa
npm run audit:country-premium -- --country solomon-islands
npm run audit:country-premium -- --country tonga
npm run audit:country-premium -- --country tuvalu
npm run audit:country-premium -- --country vanuatu
```

Then run `npm run audit:country-suite`, full `npm run build`, and Engine doctor before sign-off.
