# Netherlands Premium Country Suite

Netherlands is the first country generated after the France anti-regression guardrails were documented. It must prove that future full-country prompts can produce premium country pages and tools without inherited foreign copy, same-country related-link leaks, or layout breaks from long values.

## Scope

- Country hub source: `countries/data/netherlands.json`
- Country registration: `countries/netherlands.yaml`
- Runtime: `assets/js/tools/netherlands-suite.js`
- Tool count: 63 active Netherlands-specific workbenches under `tools/netherlands-*.yaml`

## Product Rules

- Netherlands has one global country hub plus country-specific tools for BSN, RSIN, KVK, BTW, EORI, IBAN, iDEAL, SEPA, postcode, BAG address, phone, vehicle, privacy, audit-file, and developer workflows.
- Country-specific IBAN is required because Dutch IBANs expose local bank-code and account-number structure beyond the global IBAN validator.
- Every Netherlands workbench uses premium country rhythm: branded header, short sample selector labels, browser-only analysis, immediate results after input, field cards, validation pipeline, dedicated field breakdown panels, quality notes, developer payload, and official lookup boundaries.
- Netherlands tool headers and full tool shells use compact Brazil workbench proportions. The country hub may be expressive, but individual tools must not use landing-page hero scale, oversized typography, giant short-input textareas, chunky controls, or over-large cards that push the input/result workflow too far down the page.
- Field breakdown is mandatory, not optional. BSN/RSIN tools split checksum/body/weight evidence, KVK splits registry blocks, BTW splits prefix/body/B-suffix, Dutch IBAN splits country/check/bank/account segments, BIC splits routing fields, postcode splits numeric/letter/BAG handoff, phone splits country/trunk/area/subscriber evidence, EUR tools split display/cents/storage, vehicle tools split plate/VIN/RDW evidence, and developer/data tools extract Dutch identifiers and locale evidence from text.
- Long values, statement rows, JSON, audit-file snippets, sample fixtures, result values, and developer payloads must wrap or scroll locally and never widen the page.
- Related links stay under the Netherlands country route by default. Cross-country links require an explicit comparison section.

## Official Reference Baseline

- Belastingdienst: BTW/VAT, payroll tax, VAT return, and filing boundaries.
- Kamer van Koophandel: KVK company and branch registry context.
- Logius / DigiD: digital identity handoff boundaries.
- BAG / Kadaster: address, postcode, building, and locality confirmation context.
- RDW: vehicle plate and registry status boundaries.
- De Nederlandsche Bank: banking and payment-system reference context.

## Future Additions

When adding more Dutch instruments, extend the shared Netherlands suite instead of creating weaker one-off pages. A new tool is not accepted unless it has a unique sample, unique summary, specific analysis notes, copyable result output, local quality cards, a dedicated field breakdown strategy, and layout-safe long-value behavior.
