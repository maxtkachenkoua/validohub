# Country Tool MVP Triage

Date: 2026-07-27

## Scope

- Parsed mounted factory suites from `assets/js/tools/*-suite.js`.
- Parsed suite files: 190.
- Tools classified: 11,747.
- Special/legacy wrappers not counted by this parser: `brazil-suite.js`, `france-suite.js`, `generic-suite.js`, `netherlands-suite.js`, `poland-suite.js`.
- This is a product triage report, not a claim that all tools are bespoke Gold.

## MVP Decision

ValidoHub should not deploy the country catalog as "all tools are equally premium". The inventory is big enough, but the product needs visible prioritization:

- `SHIP/SPOTCHECK`: keep visible for MVP after representative browser smoke.
- `MERGE/GLOBALIZE`: useful as workflows, but weak as repeated per-country pages; consolidate into stronger global tools with country/locale selectors or keep lower-priority.
- `HIDE/REFERENCE`: weak as standalone workbenches; hide from primary country UX or demote to reference/checklist content.
- `REVIEW`: manually classify before MVP; many are potentially useful but currently too broad to call premium.

## Current Classification

| Decision | Count | MVP treatment |
|---|---:|---|
| `SHIP/SPOTCHECK` | 5,697 | Keep visible, sample-smoke representative countries, promote best formats to bespoke over time. |
| `REVIEW` | 2,948 | Do not market as premium yet; classify by family before launch. |
| `MERGE/GLOBALIZE` | 2,244 | Merge into global/locale-aware tools or keep as secondary discoverability only. |
| `HIDE/REFERENCE` | 858 | Hide/demote before MVP unless a country has a real local specification. |

## Tool Family Inventory

| Family | Count | MVP read |
|---|---:|---|
| Developer-data/privacy | 2,329 | Functional factory floor exists, but many are better globalized. |
| Identity/document | 1,933 | High-value; next bespoke queue starts here. |
| Tax/business | 1,418 | High-value, but readiness/checklist variants need demotion. |
| Bank/account | 1,066 | High-value; keep and spotcheck. |
| Contact/address/logistics | 980 | Keep core phone/postal/address; demote weak proof/checklist pages. |
| Other/manual | 781 | Manual review; many are likely filler. |
| Locale/date/currency | 703 | Keep as utility floor, lower marketing priority. |
| Payment/reference | 611 | Keep structured references; review broad reconciliation/remittance pages. |
| Vehicle | 597 | Keep VIN/plate; demote generic vehicle redaction unless needed. |
| Invoice/procurement | 544 | Keep invoice/reference; hide generic readiness checkers unless localized. |
| Customs/tracking | 480 | Keep importer/tracking when field evidence exists; review broad declarations. |
| BIC/SWIFT | 190 | Keep. |
| IBAN validator/mask | 79 | Keep. |
| IBAN generator | 36 | Keep; coverage still should be rechecked against countries with IBAN support. |

## Biggest Repeated Weak Patterns

These are the first patterns to hide, merge, or rewrite before MVP:

| Pattern | Count | Recommendation |
|---|---:|---|
| Privacy/PII/redaction/personal fixtures | 473 | Merge into a global privacy fixture/redaction lab with country profiles. |
| Company onboarding auditor | 190 | Hide or fold into local business/VAT page unless backed by real local fields. |
| API payload auditor | 190 | Merge into global API payload lab with country preset. |
| Business register readiness helper | 186 | Hide/demote unless it links to a real local registry flow. |
| Accessibility copy/form label helpers | 186 | Merge into global accessibility/form lab. |
| Slug normalizer | 167 | Merge into global transliteration/slug lab. |
| Regex pack helper | 167 | Merge into global regex generator/explainer with country presets. |
| E-invoicing readiness checker | 166 | Hide unless country has a real public e-invoicing spec. |
| Accounting audit-trail checklist | 165 | Hide/demote as reference content. |
| Tax authority handoff helper | 163 | Hide/demote; too generic without official workflow. |
| Support ticket scrubber | 163 | Merge into global privacy/support scrubber. |
| KYC/utility/sanctions bundle | 69 | Hide or merge into compliance/reference content. |
| E-commerce checkout locale auditor | 23 | Merge into global checkout locale tool. |
| Data retention policy helper | 23 | Hide/reference; legal/compliance boundary too high. |

## Highest-Value Bespoke Queue

After the factory floors, bespoke work should focus on real public formats where we can beat competitors:

1. United States: SSN boundary, EIN, ABA/routing, ZIP+4/address.
2. Canada: SIN, Business Number/GST-HST, routing transit/institution, postal.
3. Mexico: RFC, CLABE, CURP polish parity, SAT-style invoice references.
4. United Kingdom: National Insurance, Companies House number, VAT, sort code/account.
5. Germany: Steuer-ID, USt-IdNr, BLZ/IBAN, XRechnung/ZUGFeRD.
6. Italy: Codice Fiscale, Partita IVA, SDI/PEC, ABI/CAB/IBAN.
7. Spain: VAT/EORI/NAF/CCC around existing Spain ID Gold.
8. India: PAN, GSTIN, Aadhaar boundary, UPI/payment reference.
9. Japan: My Number, Corporate Number, bank/account, invoice/payment references.
10. Australia: ABN/ACN, TFN boundary, BSB/account, PayID/payment.
11. Switzerland: UID/MWST, QR-bill/reference, IBAN/QR-IBAN.
12. Argentina/Chile/Colombia/Peru: DNI/RUT/NIT/RUC/CUIT plus local account/payment references.

## MVP Visibility Policy

For MVP, country hubs should prefer a smaller credible set over a giant flat catalog:

- Primary visible: identity, tax/business identifiers, banking/IBAN/BIC, payment references, invoice references, phone/postal/address, vehicle/VIN, customs/tracking, locale/date/currency.
- Secondary/collapsible: CSV/JSON/API/data-quality/privacy tools that are genuinely country-aware.
- Hide/merge: repeated onboarding, readiness, checklist, handoff, policy, generic regex/slug/accessibility/support-ticket pages unless rewritten as real local tools.

## Next Implementation Step

Implemented 2026-07-27 in `scripts/render-country-sections.mjs`:

- Country hub default catalog shows `primary` and `secondary`.
- `reference` stays accessible by URL/search and is moved behind a closed "More reference workflows" section.
- Row-level tier pills make primary/secondary/reference status visible without deleting routes.
- `hide` routes should not be promoted further on country hubs before MVP; deleting or redirecting weak URLs remains a separate product decision.
- Keep existing URLs stable until the user approves deleting or redirecting weak routes.

## Verification Needed After Visibility Work

- Completed scoped builds for representative/affected routes: `canada`, `brazil`, `spain`, `mexico`, `poland`.
- Completed browser smoke for Poland catalog/reference group plus Poland IBAN generator, Brazil CPF/Pix, Spain ID, and Mexico CURP traps.
- Still useful before release: one larger all-country/source audit pass and a final full release build only when the user approves MVP release gate.
- No full build until MVP release gate.
