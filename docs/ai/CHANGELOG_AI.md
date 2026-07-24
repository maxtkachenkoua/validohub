
## 2026-07-24 - Shared Tool Hero and Country Visual Rules Hardening

- Removed decorative acronym/logo tiles and hero-side Examples panels from the shared country-suite and generic-suite tool shells; samples remain near the input where they are actionable.
- Added shared Integration traps blocks for country-scoped and global tools so every workbench carries concrete developer time-savers and common integration mistakes without per-tool filler.
- Recorded the country raster visual rule: generate outline and location as independent final assets, use national flag colors, keep continent maps neutral except for the target country, and reject paired/cropped images, vertical split panels, white side gutters, satellite textures, and accidental neighboring-country highlights.
- Kept Valido Engine untouched and verified the shared runtime changes with scoped build:tools and scoped Colombia build.

## 2026-07-24 - North America Premium Batch V1

- Added browser-only premium country suites for 23 North America countries: United States, Canada, Mexico, Belize, Guatemala, El Salvador, Honduras, Nicaragua, Costa Rica, Panama, Bahamas, Cuba, Jamaica, Haiti, Dominican Republic, Antigua and Barbuda, Dominica, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines, Grenada, Barbados, and Trinidad and Tobago.
- Added `docs/product/NORTH_AMERICA_PREMIUM_SUITE_SPEC.md` and `scripts/generate-north-america-premium-batch.mjs`; generated suites include 22 local workbenches per country with field anatomy, quality notes, batch/debug/API layers, and Integration traps.
- Extended the route registry and scoped country dev builder so JSON-backed `countries/data/*.json` `hub.routes` materialize real country tool pages without requiring legacy YAML route files.
- Updated release/scoped build mappings and premium audit mappings for the new Country Suite Factory runtimes; scoped audits passed for United States, Canada, Mexico, and Jamaica.
- Updated `audit:country-premium -- --country <slug>` to use English-only scoped checks during development and to treat JSON `hub.routes` as valid factory-suite tool source data.
- Hardened country visual rendering so missing raster PNG assets do not render broken images; North America pages without generated premium PNG maps omit the visual cards until those assets are produced.
- Ran scoped English-only `build:country` for all 23 North America countries and kept Valido Engine untouched.

## 2026-07-23 - Country Tool Anatomy Breakdown V1

- Added shared Country Suite Factory anatomy enrichment so factory-based country tools explain local value segments instead of only showing generic evidence cards.
- Structured values now expose readable prefixes, body blocks, registry/type blocks, check/control digits, routing/account pieces, postal/phone/vehicle/date/amount parts, display-only punctuation, and official-boundary notes where the format supports it.
- Browser-verified Colombia NIT `900.123.456-7` on the generated local site: the UI now shows `900` as registry prefix, `123456` as registry body, and `7` as check digit.
- Removed the duplicate compact segment/strip rendering for generated anatomy results so users see one detailed anatomy card grid instead of repeated values.
- Completed civic main-city profiles for every current country hub so full-premium countries no longer fall back to a single capital plus `population varies by source`; microstates use honest town/quarter/district context.
- Audited local IBAN coverage: every country whose data contains IBAN workflows has both a country-scoped validator and generator; non-IBAN markets continue to use domestic account/payment tools instead of fake IBAN routes.
- Strengthened country hub intent filters so the selected block has a visible active pill, check marker, counter styling, and `aria-pressed`/`aria-current` state.
- Restyled country hub catalog group headers as distinct section bands with accent rails and separated child lists so selected parent categories no longer blend into their first tool rows.
- Simplified country catalog group counters so category clicks show the plain total while `visible/total` fractions appear only during text search; count badges now resize safely.
- Kept Valido Engine untouched; scoped Colombia/Peru/Uruguay checks, country-suite audit, and Peru/Uruguay premium audits passed.

## 2026-07-23 - Global Tools Deep Premium Lens V1

- Upgraded the shared Batch 4-7 global runtime in `assets/js/tools/generic-suite.js` from mostly generic static signal/risk counting into domain-specific browser-only lenses.
- Added specialized cards, field breakdown rows, pipeline checks, domain-risk names, and developer JSON for Kubernetes YAML, Dockerfile, GitHub Actions, Terraform, CORS, Accessibility, Prompt Injection, RAG chunking, JSONL fine-tune, HTML SEO, and browser storage workflows.
- Kept Valido Engine untouched and documented the hardening in Current State and Workbench Registry.

## 2026-07-23 - South America Premium Batch V1

- Added full-premium South America coverage excluding Brazil: Argentina (argentina), Bolivia (bolivia), Chile (chile), Colombia (colombia), Ecuador (ecuador), Guyana (guyana), Paraguay (paraguay), Peru (peru), Suriname (suriname), Uruguay (uruguay), Venezuela (venezuela).
- Used Country Suite Factory V1, domestic LATAM banking/payment terminology, runtime localization, field breakdowns, same-country related links, and official/live lookup boundaries.
- Added `docs/product/SOUTH_AMERICA_PREMIUM_SUITE_SPEC.md` as the batch contract.

## 2026-07-23 - Global Premium Tools Batch V2

- Added fifteen new premium global workbench definitions for JSON Schema, OpenAPI, YAML/TOML, XML/XPath, CSV profiling, SQL query risk inspection, cron expressions, regex explanation/generation, date/timezone conversion, color contrast/tokens, Markdown/MDX, GraphQL, email/domain parsing, user-agent/client hints, and HTTP security headers.
- Wired the batch into the shared ValidoHub generic-suite runtime, build mappings, Tools portal discovery, and global premium audit route list.
- Added `docs/product/GLOBAL_PREMIUM_TOOLS_BATCH_V2_SPEC.md` as the batch product contract.
- Kept Valido Engine untouched; new YAML routes require one full route materialization build before scoped `build:tools` loops can refresh pages.

## 2026-07-22 - Homepage command center visual polish

- Tightened homepage hero typography and spacing so the first viewport reads like a premium launcher instead of an oversized marketing panel.
- Added a compact coverage metric strip and actionable signal buttons that reuse the real homepage search behavior.
- Strengthened the homepage visual layer with denser command lanes, richer but restrained gradients, and mobile-safe responsive rules.
- Kept Valido Engine untouched and used the fast `npm run build:portal` path for homepage/countries-only regeneration.

## 2026-07-22 - Homepage command center refinement

- Reworked the Homepage Portal away from a large marketing/stat hero into a denser command-center launcher.
- Added first-class global tool discovery for JSON, JWT, Base64, URL, Regex, UUID, IBAN validation, and IBAN generation alongside premium country workbenches.
- Added real launcher lanes for Global Tools, Country Tools, Generators, and the Debug Contract; cards now link only to real routes or stable in-page sections.
- Updated the homepage spec so future AI sessions keep global tools visible and do not regress to empty stat panels or hero-only marketing.
- Kept Valido Engine untouched and used the fast `npm run build:portal` path for homepage/countries-only regeneration.

## 2026-07-21 - Strict Europe full-premium expansion batch

- Added a documented strict-Europe premium generation batch for Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania), Albania (albania), Andorra (andorra), Bosnia and Herzegovina (bosnia-and-herzegovina), Bulgaria (bulgaria), Croatia (croatia), Cyprus (cyprus), Estonia (estonia), Greece (greece), Hungary (hungary), Iceland (iceland), Latvia (latvia), Liechtenstein (liechtenstein), Lithuania (lithuania), Luxembourg (luxembourg), Malta (malta), Moldova (moldova), Monaco (monaco), Montenegro (montenegro), North Macedonia (north-macedonia), San Marino (san-marino), Serbia (serbia), Slovakia (slovakia), Slovenia (slovenia), Ukraine (ukraine), United Kingdom (united-kingdom), Vatican City (vatican-city).
- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.
- Added `docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.

## 2026-07-21 - Country tool sample correctness and debug UX hardening

- Fixed the shared factory sample classifier so `Invalid sample` no longer matches the word `valid` and cannot be treated as a success fixture.
- Added broader valid/invalid/short/wrong-prefix/edge examples to generated factory country tools and forced intentional invalid/review fixtures into review results even when a broad generic analyzer would otherwise pass.
- Made factory repair suggestions interactive, tool-specific, and action-backed: load valid fixture, load invalid fixture, try short sample, run sample batch, or copy normalized output.
- Reworked factory evidence breakdown hierarchy to avoid duplicate `Evidence breakdown` / `Identifier breakdown` headers, added safer token-strip spacing, and improved wrapping so long values do not touch card borders.
- Added hover/focus/active affordances for country tool buttons, sample chips, related links, rich tabs, and repair actions.
- Removed duplicate local badges from the advanced tools body and kept a single badge in the summary.
- Updated global and country-scoped IBAN generator behavior so Generate creates fresh structural fixtures and country routes infer local profiles for France and Netherlands as well as existing supported profiles.
- Added audit and product-rule coverage for these regressions so future countries inherit the same standard.
- Kept Valido Engine untouched.

## 2026-07-21 - Factory sample UX and IBAN generator hardening

- Replaced confusing factory sample dropdown behavior with clear valid/invalid/edge sample buttons and same-country related links that actually navigate.
- Collapsed history, batch diagnostics, API preview, raw JSON, and related local workflows into compact advanced tooling so PESEL-rich depth stays available without taking over the main input area.
- Changed factory primary action styling to success-first instead of inheriting red country accents for normal Validate/Generate actions.
- Added a global `iban-generator` plus country-scoped IBAN generator coverage for generated factory countries and existing bespoke/premium countries, with local check-digit generation, MOD-97 replay, BBAN/check-digit breakdown, masked output, and official bank-ownership boundary notes.
- Added audit and Product Bible rules so future country generation cannot regress to `Review sample`, inert related-tool selects, red success actions, oversized history/batch panels, or validator-only IBAN coverage.
- Kept Valido Engine untouched.

## 2026-07-21 - Factory analyzer intelligence hardening

- Fixed the Country Suite Factory rich-layer gap where some national ID/company/social tools rendered PESEL-rich UI but still used generic analyzer semantics.
- Added shared country-aware analyzer profiles for Switzerland, Spain, Germany, Italy, Austria, Belgium, Czechia, Denmark, Finland, Ireland, Norway, Portugal, Romania, and Sweden.
- Czech Rodne cislo, Czech ICO, Swiss AHV/UID, Spanish DNI/NIE/CIF, German IdNr/Handelsregister, Italian Codice Fiscale/Partita IVA, and the Europe batch core ID/company samples now decode local fields and checksum/control evidence instead of generic `identifier evidence` cards.
- Updated valid fixtures whose previous sample values failed their own local checksum/formula, and added factory audit/doc rules blocking generic analyzer output for finished local ID/company/social/tax tools.
- Kept Valido Engine untouched.

## 2026-07-21 - Native factory rich layer for all factory countries

- Raised Country Suite Factory V1 to native PESEL-rich parity for all factory-based countries.
- Added `csf-rich-lab` to `assets/js/tools/country-suite-factory.js` so Austria, Czechia, Norway, Sweden, Denmark, Finland, Spain, Italy, Germany, Switzerland, and future factory suites get browser history, multi-row diagnostics, API preview, raw JSON/audit output, and same-country related-tool UX from the shared factory.
- Added audit and product-rule coverage so future country work must improve the shared factory instead of adding one-off rich-debug patches.
- Browser-verified the Norway factory tool route from generated output with the rich layer, result card, pipeline, field breakdown, quality notes, advanced panels, no generic `Run the tool` fallback, no raw blue links, and no console errors.
- Kept Valido Engine untouched.

## 2026-07-21 - Legacy country PESEL-rich parity bridge

- Added `assets/js/tools/country-legacy-rich-layer.js` for accepted bespoke country suites: Brazil, Poland, France, and Netherlands.
- The bridge preserves existing bespoke analyzers while adding shared PESEL-depth surfaces: recent validations, batch diagnostics, API preview, raw JSON capture, and country-local related-tool UX.
- Updated full and one-country build mappings so legacy suites load the bridge before their runtime and `npm run build:country -- --country <slug>` keeps selected country tool pages current.
- Added audit/doc guardrails so future work cannot remove the bridge or ship bespoke country tools below the PESEL-rich standard without an explicit equivalent migration.
- Kept Valido Engine untouched.

## 2026-07-21 - PESEL-rich factory and SVG integrity hardening

- Upgraded Country Suite Factory tools toward the Poland PESEL debug-depth bar: presets, recent validations, batch validation, result-first output, field/evidence token strips, calculation/parser debugger, repair suggestions, developer API preview, and raw JSON output.
- Removed inline `<style>` generation from country map/location SVG assets after full build integrity rejected inlined country SVG styles. Future country visuals must paint paths with SVG attributes or external bundle CSS, never embedded SVG style blocks.
- Added permanent rules to the premium country docs requiring every future country tool to target PESEL-level debug depth without faking checksum math for non-checksum domains.
- Full build and country-suite/premium audits passed after the fix.

## 2026-07-21 - Country snapshot and one-country build hardening

- Reworked `npm run build:country -- --country <slug>` so it recompiles shared assets and renders the English country hub from source before localizing that single country tree.
- Fixed the civic snapshot overlap regression by separating the outer snapshot section from the inner layout wrapper and tightening responsive card wrapping.
- Added generated flag-gradient variables to country heroes and civic snapshots so new countries inherit Brazil-strength flag color backgrounds instead of mostly white/default themes.
- Added premium audit blockers and project rules for missing flag-gradient variables, duplicated civic snapshot layout classes, and missing civic layout wrappers.
- Kept Valido Engine untouched.

## 2026-07-21 - Europe batch hub regression hardening

- Fixed the first 10-country Europe batch hub regressions: empty Technical Standards cards now have plug type, voltage, and frequency values; country search placeholders and chips now use local identifiers/payment rails instead of the generic IBAN/SWIFT/SEPA/VAT/INVOICE fallback; country outline/location visuals now use flag-color identity.
- Removed country breadcrumb official-language quick actions where government-language switching is not real, added a required civic snapshot before Developer Actions, fixed duplicate breadcrumb separator risk, and strengthened all country hero backgrounds toward the Brazil flag-gradient baseline.
- Added premium audit blockers for empty technical standards, generic country search placeholders, and object/string rendering leaks so future countries cannot pass with these regressions.
- Promoted the fixes into the Premium Country Contract, country-suite guardrails, and Europe batch spec as mandatory future-country rules.
- Kept Valido Engine untouched.

## 2026-07-21 - Europe premium 10-country stress batch (superseded by strict-Europe V2)

- Added a documented 10-country premium generation batch for Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania).
- Each country uses Country Suite Factory V1, 60 local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, and explicit official boundaries.
- Added `docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md` so future AI sessions treat batch generation quality as a contract, not a one-off.
- Superseded by the strict-Europe V2 expansion, where the same generator contract covers all approved missing strict-Europe countries and keeps 60 as a density reference rather than a hard cap.

# 2026-07-21 - Premium country suite tool-count rule

- Documented that full-country suite tool count is quality-driven, not quota-driven.
- Treat 60 tools as reference density only: add more when local workflows justify it, ship fewer when fewer strong offline/browser-only tools exist, and never pad with weak tools.
- Added the rule to AI entrypoint, country-suite guardrails, and Country Suite Factory spec so future country prompts inherit it.

# 2026-07-21 - Spain Premium Country Suite V1

- Upgraded Spain from two standalone country tools into a full premium Country Suite Factory V1 suite.
- Preserved existing Spain ID and Spain IBAN routes while switching them to `validohub.spain-suite`.
- Added `assets/js/tools/spain-suite.js`, expanded Spain country metadata, 60 Spain-specific tool YAML pages, factory/build mappings, and audit coverage.
- Kept Valido Engine untouched.

# 2026-07-21 - Core Locale Matrix and Country Dev Build

Changed:

- Narrowed the production locale matrix to seven core locales: `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.
- Added `npm run build:country -- --country <slug>` as a fast ValidoHub-only development refresh for a single generated country tree after a prior full publish.
- Added full-build pruning for stale generated locale directories when the locale matrix changes.
- Restricted the global language switcher to the configured seven production locales and added a build guard so it cannot drift from `site.yaml`.
- Documented that partial country builds are dev accelerators and full `npm run build` remains the release gate.

Reason:

The 24+ locale full-site generation path was too expensive for scaling toward 100-200 countries. Seven core production locales preserve global coverage while keeping generated size, build time, sitemap volume, and link validation manageable.

Impact:

- ValidoHub owns the locale matrix and partial country build tooling.
- Valido Engine remains untouched.
- Future locale expansion is demand-driven instead of default all-locale generation.

## 2026-07-20 - Italy Premium Country Suite V1

- Added Italy as a full premium country hub with 60 browser-only workbenches on Country Suite Factory V1.
- Added `assets/js/tools/italy-suite.js`, `countries/italy.yaml`, Italy visual assets, and `tools/italy-*.yaml` pages.
- Registered `validohub.italy-suite` in build/runtime mappings and country-suite audits, including mandatory field-breakdown coverage.
- Added `docs/product/ITALY_PREMIUM_SUITE_SPEC.md` and updated current-state/factory guardrails so future countries keep the Poland/Brazil/Germany quality bar.

## Germany Premium Country Suite V1

- Added Germany as the second Country Suite Factory V1 consumer with 60 active Germany-specific workbenches.
- Upgraded the existing German IBAN country route from the generic IBAN runtime into the full Germany suite while preserving the route.
- Added Germany hub metadata, available workbench catalog, official-boundary notes, ecosystem sections, field-breakdown coverage, runtime localization, docs, build mappings, and audits.
- Hardened the build pipeline so factory-based country algorithms skip generic utility workbench injection.

# AI Changelog

## 2026-07-21 - Premium Country Contract hardening gate

- Added `docs/product/PREMIUM_COUNTRY_CONTRACT.md` as the mandatory full-premium country contract.
- Added `npm run audit:country-premium` / `scripts/audit-country-premium.mjs` to generate readiness reports and block known country regressions before future country batches.
- Wired the contract into AI start docs, country-suite guardrails, and factory audit expectations.


## 2026-07-20 - All-Country Field Breakdown Requirement

- Expanded the field-breakdown requirement from full premium suites to every country-scoped tool in every country.
- Extended `scripts/audit-country-field-breakdown.mjs` to cover standalone Germany/Spain country tools in addition to Brazil, Poland, France, Netherlands, and Switzerland suites.
- Confirmed Germany and Spain IBAN tools use the country-aware generic IBAN breakdown, and Spain ID has its own identifier breakdown/debugger.
- Updated `docs/product/DEVELOPMENT_RULES.md`, `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md`, and `docs/ai/START_HERE_AI.md` to say field breakdown is a primary debugging surface and mandatory for all country tools.
- Valido Engine remains untouched.

## 2026-07-20 - Future Country Fixed-Regression Rule

- Promoted all recently fixed country-suite regressions into `docs/product/DEVELOPMENT_RULES.md` as a mandatory future-country acceptance bar.
- Updated `docs/ai/START_HERE_AI.md` so future country work reads the rule before implementation.
- The rule now explicitly blocks generic or hybrid tool shells, oversized tool UI, red success states, missing field breakdowns, raw sample dropdown payloads, foreign fallback copy, cross-country related links, `[object Object]`, empty or icon-only lower hub cards, and page-level horizontal overflow.
- Valido Engine remains untouched.

## 2026-07-20 - Country Field Breakdown Audit

- Added `scripts/audit-country-field-breakdown.mjs` and wired it into `npm run audit:country-suite` so accepted country suites cannot lose a named field-breakdown panel.
- Upgraded `assets/js/tools/france-suite.js` to render a dedicated field breakdown from extracted French local fields, matching the premium country-suite contract.
- Strengthened country-suite guardrails and Factory V1 spec: every premium country tool, including broad text/data helpers, must expose field slices or detected-evidence groups instead of only generic result cards.
- Kept the change in ValidoHub runtime assets, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Switzerland Premium Country Suite V1

- Added Switzerland as a full premium available country hub with 58 active country-specific browser workbenches.
- Added `countries/switzerland.yaml`, `countries/data/switzerland.json`, Switzerland visual SVG assets, `tools/switzerland-*.yaml`, `assets/js/tools/switzerland-suite.js`, and `docs/product/SWITZERLAND_PREMIUM_SUITE_SPEC.md`.
- Used Country Suite Factory V1 from the start, making Switzerland the first full future-country factory consumer without migrating Brazil, Poland, France, or Netherlands.
- Added runtime localization for every supported ValidoHub locale across Switzerland workbench shell labels, states, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
- Added ValidoHub build mappings so Switzerland pages load `country-suite-factory.js` before `switzerland-suite.js`, and extended same-country related-link pruning to Switzerland.
- Covered Swiss UID, MWST/VAT, AHV/AVS, EORI/customs, IBAN, SIC/BC, BIC/SWIFT, QR-bill, ESR, CHF, tax, payroll, company onboarding, Zefix readiness, FADP/GDPR privacy, address, canton, phone, vehicle, OCR, data-quality, API, JSON, regex, and form-audit workflows.
- Kept the implementation in ValidoHub assets, content, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Country Suite Factory V1

- Added `assets/js/tools/country-suite-factory.js` as an additive-only future-country runtime with compact Brazil-scale header, input, result, validation pipeline, dedicated field breakdown, quality notes, advanced analysis, copy, and download controls.
- Added config validation for suite identity, country metadata, theme colors, tool ids, names, codes, summaries, short-label samples, quality notes, official boundaries, duplicate ids, and raw payload sample labels.
- Added `docs/product/COUNTRY_SUITE_FACTORY_SPEC.md` and linked it from the Country Hub mandatory reading flow.
- Added `scripts/audit-country-suite-factory.mjs` and `npm run audit:country-suite` to protect the factory contract and assert that accepted Brazil, Poland, France, and Netherlands suites do not import or call the factory without an explicit migration task.
- Promoted all-locale runtime localization to the factory contract: future premium country suites must localize workbench controls, statuses, errors, result labels, field breakdowns, quality notes, samples, and advanced/developer labels across every supported ValidoHub locale.
- Kept the factory additive and unconnected to existing country suites. Valido Engine remains untouched.

## 2026-07-20 - Country Tool Shell Hardening Pass

- Tightened France suite runtime sizing to the compact Brazil workbench scale: smaller hero padding, mark, title, summary, chips, selector, input typography, result cards, pipeline, field cards, quality notes, and advanced payload panels.
- Tightened generic premium hero sizing in `assets/css/workbench.css` so global utility workbenches follow the same compact tool-shell rhythm instead of drifting toward landing-page hero proportions.
- Added `scripts/audit-country-tool-shell.mjs` to catch compact-shell regressions in France, Netherlands, generic premium hero sizing, and the country-suite guardrails before future countries are called complete.
- Updated current-state and country-suite guardrails so future country generation runs the shell audit and compares representative tools against Brazil CPF/CNPJ typography, spacing, textarea height, button sizing, result card density, and field-breakdown proportions.
- Kept the hardening pass inside ValidoHub assets, scripts, and docs. Valido Engine remains untouched.

## 2026-07-20 - Netherlands Premium Suite V2 Field Breakdown Pass

- Upgraded `assets/js/tools/netherlands-suite.js` from a broad premium V1 into a Brazil-style V2 workbench runtime with dedicated field breakdown panels on every Netherlands tool family.
- Reduced the Netherlands tool header from oversized landing-hero scale to compact Brazil workbench proportions so inputs and results remain close to the first viewport.
- Tightened Netherlands tool typography and spacing across header, sample selector, chips, input textarea, buttons, result cards, pipeline cards, field breakdown tiles, and advanced panels so the full workbench reads closer to the Brazil visual rhythm.
- Added domain-specific breakdown slices for BSN/RSIN eleven-test numbers, KVK, BTW/VAT, EORI, Dutch IBAN/BBAN, BIC, postcode, phone, EUR values, vehicle/RDW/VIN/plate evidence, audit-file snippets, and developer/data payloads.
- Kept the premium ordering contract intact: branded header, short sample selector labels, input controls, immediate result card, validation pipeline, dedicated field breakdown, quality notes, then expanded advanced analysis/developer payload.
- Updated Netherlands product memory so future country suites are not accepted as "premium" unless every offline-capable tool has a real breakdown strategy, not just generic result cards.
- Rebuilt ValidoHub and kept the implementation inside ValidoHub browser assets and docs. Valido Engine remains untouched.

## 2026-07-19 - Netherlands Premium Country Suite V1

- Added Netherlands as a full available country hub and first complete country generated after the country-suite anti-regression guardrails.
- Added 63 Netherlands-specific workbenches covering BSN, RSIN, KVK, BTW/VAT, EORI, DigiD boundaries, Dutch IBAN/BIC/SEPA/iDEAL, postcode/BAG/address/phone/locale, tax and e-invoicing readiness, audit-file snippets, AVG/GDPR/PII masking, data quality, vehicle/RDW/VIN/plates, PostNL tracking, EAN fixtures, and developer workflow audits.
- Added the shared `assets/js/tools/netherlands-suite.js` premium runtime with Netherlands-branded headers, short sample labels, immediate result cards after input controls, validation pipelines, field breakdowns, quality notes, local checks, copyable output, and developer payloads.
- Added Netherlands country registration, country visual SVG assets, and `docs/product/NETHERLANDS_PREMIUM_SUITE_SPEC.md` as future-memory for complete country generation.
- Updated country-suite docs and current-state memory so future full-country prompts read both France and Netherlands suite specs plus the anti-regression guardrails.
- Kept implementation in ValidoHub country data, tool YAML, assets, build post-processing, and docs. Valido Engine remains untouched.

## 2026-07-19 - Country Suite Anti-Regression Guardrails

- Added `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md` as mandatory future memory for complete country generation.
- Recorded the France regressions that must not repeat: Poland fallback copy on France route groups, cross-country related-link spillover, long raw sample payloads inside native selectors, and long result/developer payload values stretching layouts.
- Added the guardrails doc to the Country Hub mandatory reading list in `docs/ai/START_HERE_AI.md`.
- Future country work must now audit same-country related links, foreign-term leakage, long-value layout safety, short sample labels, immediate result placement, all-locale coverage, generated-output exclusion, and Valido Engine cleanliness before calling a country complete.

## 2026-07-19 - France Premium Country Suite V1

- Added France as a full available country hub instead of a planned shell.
- Added 64 France-specific workbenches covering SIREN, SIRET, TVA, EORI, APE/NAF, French IBAN/RIB/BIC/SEPA, postal/address/phone/locale, tax and e-invoicing readiness, GDPR/PII masking, NIR boundaries, vehicle workflows, OCR repair, CSV/EUR/accent/slug utilities, JSON fixtures, regex packs, API payload audits, and form-field audits.
- Added the shared `assets/js/tools/france-suite.js` premium runtime with France-branded headers, samples, immediate result cards after input controls, validation pipelines, field breakdowns, quality notes, local checks, copyable output, and developer payloads.
- Added France country registration, country visual SVG assets, and `docs/product/FRANCE_PREMIUM_SUITE_SPEC.md` as future-memory for complete country generation.
- Kept the implementation in ValidoHub country data, tool YAML, assets, and docs. Valido Engine remains untouched.

## 2026-07-19 - Country-Specific IBAN Strategy And Workbenches

- Documented the permanent IBAN strategy: one global detector plus country-specific IBAN workbenches only when they add real local banking structure beyond SEO.
- Added Brazil, Germany, and Spain IBAN tool definitions using the country-aware generic finance runtime.
- Expanded the shared IBAN runtime with country detection, country-locked validation, BBAN field maps, local quality notes, wrong-country diagnostics, and deep country route guidance.
- Added Spain CCC check-digit replay, Germany BLZ/account slicing, and Brazil bank/branch/account/account-type slicing.
- Kept implementation in ValidoHub assets, tool YAML, and product docs. Valido Engine remains untouched.

## 2026-07-19 - Generic Tools Final Premium Contract And Completion Pass

- Strengthened `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md` with the new generic instrument contract: future global tools must be born premium, not shipped as basic forms for later cleanup.
- Added success-first presets, intentional edge/error samples, richer premium result cards, domain-specific result previews, and quality-note cards across the shared Generic Utility Workbench Suite.
- Added hash digest recompute/compare flows for MD5, SHA-1, and SHA-256 when users provide both input and an expected digest.
- Upgraded URL Encoder/Decoder mode integrity so decoder pages offer encoded success presets first and Developer API previews use the active encode/decode endpoint.
- Kept all work in ValidoHub product assets and docs. Valido Engine remains untouched.

## 2026-07-18 - Generic Workbench Gold Standard Doctrine

- Added `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md` as mandatory product memory for all current and future generic, non-country tools.
- Promoted Poland and Brazil premium country workbenches to the explicit visual and functional baseline for generic tools.
- Documented that generic tools must be competitor-aware, richly interactive, advanced-analysis-heavy, mode-correct, and deeper than the strongest public tools where the domain supports it.
- Added first-preset, success, invalid/error, advanced-analysis, copy/download/history, mobile, developer-snippet, documentation, and related-tool audits as the expected acceptance sweep before calling a generic tool premium.
- Linked the new standard from `docs/ai/START_HERE_AI.md`, `docs/product/CURRENT_STATE.md`, and `docs/product/WORKBENCH_REGISTRY.md`.

## 2026-07-18 - Generic Tools Premium Functionality Audit

- Audited the shared Generic Utility Workbench Suite against the Poland and Brazil premium workbench bar.
- Fixed generic-suite execution gaps: Slug Generator now uses its own slug workflow, hash tools call the intended MD5/SHA-1/SHA-256 algorithms, and sample chips populate the correct fields.
- Added UUID batch generation, IBAN masked display, regex capture-group reporting, and safer case-converter empty-token handling.
- Added ValidoHub build-time materialization for shared generic utility pages so Engine-generated documentation/form pages receive full premium workbench markup and helper script wiring without changing Valido Engine.
- Kept implementation in ValidoHub browser assets and documentation; Valido Engine remains untouched.

## 2026-07-18 - Generic Tools Premium UI Pass

- Added a shared premium identity shell for global generic tools, including tool marks, theme accents, domain summaries, capability chips, and browser-only privacy boundary.
- Tightened generic tool card typography so result and analysis panels match the Poland/Brazil premium standard instead of oversized bold blocks.
- Kept all changes in ValidoHub assets and documentation; Valido Engine remains untouched.

## 2026-07-17 - Brazil Premium Diagnostics Pass

- Upgraded the shared Brazil suite workbench renderer with premium pipeline progress, local result cards, tailored field breakdowns, quality notes, and advanced analysis.
- Documented Brazil as the diagnostics reference for broad country tool suites alongside Poland.
- Kept the implementation entirely in ValidoHub browser assets; Valido Engine remains untouched.

## Country Tool Header Standard

Changed:

- Added premium country-aware headers to Poland Premium, Expansion, and Baseline suite tools.
- Upgraded Brazil suite headers with brighter flag-color treatment and real sample chips.
- Documented country tool headers as the standard for future mature country suites.

Reason:

Country tool pages should immediately communicate local identity, presets, and useful entry points instead of opening with generic controls.

Impact:

- Future country tools should start with an identity-rich header using local colors, approved marks/acronyms, presets, samples, and local history when available.
- Valido Engine remains generic and untouched.


## All-Locale Localization Baseline

Changed:

- Promoted the language switcher list to the required localization matrix for country pages, tool pages, Workbenches, and visible UI.
- Expanded ValidoHub localized route generation beyond the earlier five-locale set.
- Added Poland as the first all-locale country-page acceptance test target.

Reason:

Future localization work must not silently ship partial language coverage when the product exposes more languages in the selector.

Impact:

- Any new localized country or tool must include every supported locale by default.
- Localized internal links must point at the selected locale route when that route exists.
- Valido Engine remains generic and untouched.


## Poland Localization Completion Sweep

- Tightened the Poland country-page localization pass for remaining rich country hub strings across supported locales.
- Added explicit localization coverage for intent tabs, catalog rows, identifier/specification cards, interactive sandbox copy, banking/payment prose, phone examples, graph labels, and short chips.
- Updated the country localization standard so future Poland-grade countries must sweep dense product surfaces, not just navigation and headings.

## Poland Four-Locale Deep Localization Parity

Changed:

- Brought the Poland Country Hub deep-section localization sweep to parity across Polish, German, Spanish, and Brazilian Portuguese.
- The developer checklist, knowledge graph, regional cross-links, highlights, developer notes, common mistakes, code examples, ecosystem, localization notes, and footer now share the same source-string coverage in every supported localized route.

Reason:

Any string localized in one supported language must be available in all supported localized languages.

Impact:

- Future country localization work should keep locale maps symmetrical for shared rich-section source strings.
- Valido Engine remains generic and untouched.

## Poland Localization Deep Section Sweep

Changed:

- Translated the remaining deep Poland Country Hub sections that appear below the primary catalog: developer checklist, knowledge graph, regional cross-links, key highlights, developer notes, common mistakes, code examples, country ecosystem, and localization notes.
- Updated the country localization standard and Poland gold standard so future countries must localize these lower-page product sections before being considered complete.

Reason:

Poland-grade localization must cover the full visible page, not only navigation, hero, cards, and top-level catalogs.

Impact:

- Future country localization work should include a lower-page screenshot/text sweep.
- Valido Engine remains generic and untouched.

## Poland Localization Pass V2

Changed:

- Completed the rich Poland Country Hub localization pass across Polish, German, Spanish, and Brazilian Portuguese for the remaining country facts, official sources, address, technical, locale, tags, badges, and copy controls.
- Added `docs/product/COUNTRY_LOCALIZATION_STANDARD.md` as the future-country localization checklist.
- Linked the localization standard from `docs/product/POLAND_COUNTRY_HUB_GOLD_STANDARD.md`.

Reason:

Localized country pages must feel fully native, not partially translated navigation around English rich sections.

Impact:

- Poland remains the mature Country Hub baseline for both structure and localization completeness.
- Future country work should localize every supported route before calling the country Poland-grade.
- Valido Engine remains generic and untouched.

## Poland Baseline Workbench Suite V1

Changed:

- Added 24 additional Poland country workbenches as the broad Poland baseline.
- Added `assets/js/tools/poland-baseline.js` and metadata-only `validohub.poland-baseline`.
- Added KSeF XML, JPK XML, split payment, PKD, PKWiU, BDO, CEIDG readiness, company onboarding, invoice data, receipts, transfer titles, payment QR, bank statements, postal addresses, TERYT hierarchy, municipality codes, MRZ/passport, passport number, driving licence, vehicle registration certificate, insurance policy, parcel tracking, PPE energy, and Polish data-quality pages.
- Linked all new tools from the Poland country hub.
- Added real browser-side SVG QR generation for the payment QR helper by reusing ValidoHub-owned QR infrastructure patterns.

Reason:

Poland needed a complete first country baseline beyond PESEL and the earlier premium/expansion suites.

Impact:

- Poland now has a broad suite of browser-only premium workbenches under `/en/poland/`.
- Engine remains untouched and generic.
- Official lookup, gateway submission, legal status, bank execution, and registry verification remain out of scope unless future product specs approve them.

This is an AI-oriented project history. It is not release notes.

Record changes that future AI assistants need to understand before continuing work.

## Phase 4: Engine And ValidoHub Asset Separation

Changed:

- Site-specific assets moved from Valido Engine into ValidoHub.
- Workbench Framework moved to `assets/js/workbench/`.
- Tool plugins moved to `assets/js/tools/`.
- Engine now copies site-owned assets into generated output.

Reason:

Engine must remain a generic static site generator. ValidoHub product behavior belongs in ValidoHub.

Impact:

- Future workbench behavior should be implemented in ValidoHub assets.
- Engine should not contain Base64, URL, JSON, or future workbench implementations.

## Base64 Workbench

Changed:

- Base64 became the reference-quality workbench.
- Implemented encode, decode, validate, Unicode support, Base64URL support, padding options, file support, diagnostics, analysis, hex preview, decode previews, copy, and smart downloads.

Reason:

ValidoHub needed a production-quality reference tool to define the quality bar.

Impact:

- Future workbenches should match or exceed the Base64 UX standard.

## URL Workbench

Changed:

- Implemented URL encode, decode, validate, auto-detection guidance, malformed percent diagnostics, stats, advanced analysis, samples, copy, and download.

Reason:

The URL tool proved the reusable Workbench Framework could support another production browser-only tool.

Impact:

- URL remains production-quality but has future room for parser, analyzer, and query-builder improvements.

## JSON Workbench V1

Changed:

- Implemented JSON formatter, validator, pretty print, minify, live mode, tree view, syntax highlighting, error line and column, copy, download, samples, file support, and statistics.

Reason:

JSON is a core developer workflow and needed a browser-only production workbench.

Impact:

- Established JSON-specific product spec and plugin.

## JSON Workbench V2

Changed:

- Added interactive tree explorer.
- Added JSONPath display and copy helpers.
- Added search with next and previous navigation.
- Added selected-node copy helpers.
- Added sort keys and remove empty actions.
- Improved syntax highlighting.
- Improved error token highlighting and repair suggestions.
- Added extended statistics and large JSON mode.

Reason:

JSON Workbench should feel comparable to professional developer tools such as DevUtils, JSON Editor Online, and VS Code JSON Viewer.

Impact:

- JSON is now a production-quality V2 workbench.
- Future JSON Diff, Merge, Schema, code generation, and conversion features remain out of scope until explicitly requested.

## JWT Workbench V1

Changed:

- Added browser-only JWT decoding, validation, inspection, and analysis.
- Added header, payload, signature, raw token, and decoded JSON sections.
- Added payload tree view, search, and JSONPath display.
- Added token health badges for structure, expiration, not-before, missing signature, weak algorithm, and unknown algorithm.
- Added human-readable expiration and validity timing.
- Added copy and download helpers for decoded sections.
- Added malformed-section error UX and safe sample tokens.

Reason:

JWT is a high-priority developer workflow and can be handled privately in the browser without backend execution.

Impact:

- JWT Workbench lives entirely in ValidoHub assets.
- Signature verification remains out of scope until key-handling UX is specified.

## PIX Workbench V1

Changed:

- Replaced the Brazil PIX preview with a production browser-only PIX Workbench.
- Added PIX key validation for CPF, CNPJ, email, Brazilian phone, and EVP UUID keys.
- Added CPF and CNPJ check digit validation.
- Added BR Code / EMV TLV parsing and explanation.
- Added static PIX payload generation with CRC16-CCITT-FALSE.
- Added local SVG QR generation, payload copy, QR SVG download, presets, local history, validation timeline, result cards, TLV table, CRC debugger, and developer JSON snapshot.

Reason:

Brazil PIX is a core Brazil developer workflow and should match the PESEL gold-standard tool quality instead of remaining a preview page.

Impact:

- PIX Workbench lives in ValidoHub assets.
- The workbench remains browser-only, offline, and privacy-first.
- No Banco Central lookup, payment initiation, dynamic PIX URL fetching, backend, REST API, database, or Java execution was added.

## Spain ID Workbench V1

Changed:

- Added a browser-only Spain DNI/NIE/NIF/CIF Workbench.
- Added DNI and NIE modulo-23 control-letter validation and explanation.
- Added legal-entity NIF / legacy CIF weighted control digit or letter validation.
- Added optional `ES` VAT-prefix syntax handling without VIES lookup.
- Added safe fictional fixture generation for DNI, NIE, and CIF/NIF patterns.
- Added presets, local history, validation timeline, result cards, token breakdown, checksum debugger, and developer JSON snapshot.

Reason:

Spain needed a first production-quality country workbench comparable to PESEL and PIX while preserving browser-only privacy and avoiding identity or tax-status claims.

Impact:

- Spain ID Workbench lives in ValidoHub assets.
- Valido Engine remains generic except for reusable asset-loading behavior when needed.
- No identity verification, Agencia Tributaria lookup, VIES lookup, backend, REST API, database, or Java execution was added.

## AI Operating System

Changed:

- Added `docs/ai/` as the AI-facing operating layer.
- Added entrypoint, development protocol, architecture guardrails, decision log, and AI changelog.

Reason:

Future AI assistants need enough repository-native context to continue ValidoHub without relying on prior conversations.

Impact:

- AI sessions must start with `docs/ai/START_HERE_AI.md`.
- Documentation updates are required after completed feature changes.


## Countries Platform

Changed:

- Added the Countries Architecture product note.
- Documented locale-first country hub and country workbench route rules.
- Added product-owned Countries navigation grouping in ValidoHub assets.
- Recorded Brazil and Poland as the current country hubs.

Reason:

ValidoHub needs a scalable country section for jurisdiction-specific developer tools without moving product logic into Valido Engine.

Impact:

- Country platform work belongs in ValidoHub unless a generic Engine capability is explicitly required.
- Country-specific validators still need their own product specs before implementation.
- Engine must not hardcode country, validator, or jurisdiction behavior.

## Country Hub Template V1

Changed:

- Added `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.
- Implemented Brazil as the reference Country Intelligence Hub.
- Added Brazil hero, Developer Cheat Sheet, local formats, payments and banking notes, official resource placeholders, available workbenches, planned workbenches, related global tools, developer notes, and hidden future ad-slot hooks.
- Kept the implementation in ValidoHub-owned assets.

Reason:

Country hubs should be useful developer intelligence pages, not only lists of generated tools.

Impact:

- Brazil is the reference model for future country hubs.
- PIX, CPF, CNPJ, CEP, phone, and banking validators are still not implemented.
- Any future move from product-side data to build-time SEO-rendered country data must be generic and must not introduce country-specific Engine logic.

## Country Hub Template V2

Changed:

- Expanded Brazil into the gold-standard Country Intelligence Hub.
- Added structured country metadata for stats, quick actions, cheat-sheet values, snippets, discovery cards, highlights, and future country references.
- Added copyable quick actions, copy buttons for important values, and copyable developer snippets.
- Added reusable status chips for Ready, Available, Coming soon, Planned, Experimental, and Deprecated.
- Added semantic discovery tags for future client-side filtering/search.
- Added richer internal discovery without broken links.

Reason:

Brazil should define the reusable quality bar for future country hubs without implementing country validators or moving product behavior into Engine.

Impact:

- Country Hub V2 remains entirely in ValidoHub assets and docs.
- PIX, CPF, CNPJ, CEP, phone, and banking validators remain unimplemented.
- Future country hubs should mostly require data additions, not custom rendering logic.

## Country Hub Template V3

Changed:

- Elevated Brazil into a premium Developer Country Intelligence Portal.
- Added country visual identity placeholders and official brand/logo placeholder support.
- Added Developer Country Profile, Localization Examples, Address Example, Phone Number Examples, Developer Integration Checklist, Validation Rules, Common Integration Mistakes, Banking Overview, JSON Examples, Localization Notes, and Country Ecosystem sections.
- Expanded Developer API Examples across Java, JavaScript, TypeScript, Python, Go, C#, Kotlin, PostgreSQL, text notes, and JSON payload examples.
- Expanded future country discovery placeholders without creating broken links.

Reason:

Brazil should be the reusable gold-standard template for future country hubs while keeping all product behavior in ValidoHub.

Impact:

- Country Hub V3 remains entirely in ValidoHub assets and docs.
- No PIX, CPF, CNPJ, CEP, phone, banking validator, new workbench, or new country was implemented.
- Future country hubs should reuse the same data-driven renderer and add country-specific data only.

## Country Hub Visual Identity V2

Changed:

- Replaced the Brazil country-shape placeholder with a real SVG Brazil outline.
- Replaced the dot-only location placeholder with a real miniature world map SVG highlighting Brazil.
- Added a reusable product-owned visual asset registry keyed by country id.
- Added asset-aware official logo rendering support while preserving safe text badges when logo usage rights are unclear.
- Updated Country Hub documentation with the real asset policy, SVG outline policy, world map component policy, and logo licensing considerations.

Reason:

Country hubs should feel like production-quality developer intelligence pages, not wireframes. Real geographic visuals make the Brazil reference hub clearer and set the right quality standard for future country hubs.

Impact:

- The change remains entirely in ValidoHub assets and docs.
- Valido Engine remains untouched.
- No PIX, CPF, CNPJ, CEP, phone, banking validator, new workbench, or new country was implemented.
- Future countries should add approved SVG assets and registry entries rather than custom rendering branches.

## Country Hub Design Standard

Changed:

- Added `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md` as the canonical Country Hub design reference.
- Added `docs/ai/COUNTRY_HUB_AI_GUIDE.md` as the implementation guide for future AI sessions.
- Documented Brazil as the permanent golden reference for future country hubs.
- Documented mandatory Country Hub sections, card anatomy, badge system, icon policy, logo policy, global brand asset policy, monochrome brand preference, copywriting style, localization strategy, responsive expectations, accessibility expectations, and visual QA checklist.
- Updated current state, development rules, country architecture, country template spec, workbench registry, and AI startup guidance to reference the new guides.

Reason:

Future country hubs need to inherit one reusable product standard instead of drifting into separate layouts and inconsistent visual systems.

Impact:

- This is documentation and design-system standardization only.
- Valido Engine remains untouched.
- No new country-specific functionality, validator, workbench, country, route, YAML field, JavaScript behavior, CSS behavior, or generated output was added.

## Brand Asset System

Changed:

- Added `assets/js/brand-assets.js` as the shared browser-side Brand Asset System registry and renderer.
- Added `docs/product/BRAND_ASSET_SYSTEM.md` as the permanent architecture guide.
- Added `docs/product/BRAND_REGISTRY.md` as the source of truth for visual identity decisions.
- Registered PIX, Java, Python, Go, Kotlin, C#, .NET, Node.js, React, Next.js, TypeScript, JavaScript, Docker, Kubernetes, PostgreSQL, MySQL, MongoDB, Redis, JWT, Stripe, Visa, Mastercard, American Express, SWIFT, SEPA, IBAN, GitHub, OpenAPI, GraphQL, gov.br, Banco Central do Brasil, Receita Federal, and Correios.
- Updated the Brazil Country Hub to use `brandKey` values and the shared renderer for visible brand/standard references.
- Updated AI and product documentation to require Brand Registry checks before logo/icon decisions.

Reason:

ValidoHub needs one permanent visual identity system so recognizable brands, technologies, payment systems, databases, languages, protocols, and standards are rendered consistently instead of through ad-hoc icons.

Impact:

- The change remains entirely in ValidoHub assets and docs.
- Valido Engine remains untouched.
- No official logos were bundled in this step.
- No new country-specific validator, workbench, country, route, YAML field, backend behavior, or generated output was added.

## Countries Portal V1

Changed:

- Added the global Countries Portal product page at `/en/countries/`.
- Added `assets/js/portal-countries.js` for portal rendering, search, filters, country previews, continent grouping, and lightweight map interactions.
- Extended `assets/js/countries.js` with shared country portal metadata exports and an `All Countries` navigation entry.
- Added ValidoHub-owned post-publish route generation through `scripts/build-countries-portal.mjs`.
- Added `docs/product/COUNTRIES_PORTAL_SPEC.md`.
- Updated country architecture, current state, registry, and future planning documentation.

Reason:

ValidoHub needs a global discovery homepage for country intelligence while Valido Engine remains a generic static site generator.

Impact:

- The change remains entirely in ValidoHub assets, scripts, and docs.
- Valido Engine remains untouched.
- Available country hubs are discovered from generated links.
- Roadmap countries are visible without creating fake hubs.
- No PIX, CPF, CNPJ, CEP, PESEL, banking, payment, or country-specific validator was implemented.

## Countries Portal Visual Polish V1

Changed:

- Improved Countries Portal hero messaging and hierarchy.
- Added richer derived platform metrics.
- Elevated Brazil as the flagship reference country with a premium Reference Implementation badge.
- Added subtle country identity accent strips to country cards.
- Improved card hover, focus, lift, and shadow states.
- Improved filter control styling and selected states.
- Improved world map presentation, marker animation, active-country emphasis, and selected-country focus line.
- Refined continent section headers.
- Added reduced-motion handling for portal microinteractions.

Reason:

The Countries Portal needed to feel more like a premium SaaS product while preserving the existing ValidoHub-owned architecture.

Impact:

- Visual polish only.
- Valido Engine remains untouched.
- Routes, metadata ownership, country discovery, validators, and workbench functionality did not change.

## Spain Country Hub V1

Changed:

- Added Spain as a generated country hub at `/en/spain/`.
- Added `countries/spain.yaml`.
- Added Spain country outline and highlighted world map assets.
- Added Spain country metadata, local-format context, localization examples, address and phone examples, payments and banking context, official resource labels, planned workbenches, related global tools, developer snippets, JSON examples, localization notes, and ecosystem cards.
- Added reusable Brand Asset entries for Bizum, VIES, European Union, Gobierno de España, Agencia Tributaria, Seguridad Social, Banco de España, and Correos Spain.
- Updated the Countries Portal so Spain is an in-progress real hub instead of a roadmap-only country.
- Extended the existing post-publish route materializer so metadata-only country hubs receive generated locale-first shells.
- Added generic portal search support for country native names.
- Cleaned generic Country Hub renderer copy that still mentioned Brazil in shared section headings.
- Allowed related global tool cards to pass `brandKey` through the existing shared card renderer.

Reason:

Spain proves the Brazil Country Hub reference implementation can be reused for another country through metadata and assets rather than a Spain-specific page system.

Impact:

- The change remains entirely in ValidoHub assets, country config, and docs.
- Valido Engine remains untouched.
- No DNI, NIE, NIF, CIF, VAT, VIES, phone, postal-code, IBAN, Bizum, payment, banking, tax, vehicle, or identity validator was implemented.
- Future Spain-specific tools require dedicated product specs before implementation.

## Poland Premium Workbench Suite V1

Changed:

- Added ten browser-only Poland premium workbenches modeled after the PESEL reference page.
- Added NIP, REGON, Polish IBAN / NRB, tax microaccount input, postal code, phone number, license plate, KRS, Polish VAT syntax, and bank-code tools.
- Added shared `assets/js/tools/poland-suite.js` with presets, recent local inputs, validation timeline, result cards, field breakdown, debugger, developer JSON, copy helpers, safe fixture generation, and offline boundary explanations.
- Updated Poland Country Hub metadata so the new pages are available and linked as country workbenches.
- Added `docs/product/POLAND_PREMIUM_SUITE_SPEC.md`.

Reason:

Poland needed a premium country-specific suite around the PESEL gold standard so developers can validate and understand the most common Polish identifiers, payments, tax, banking, postal, phone, and vehicle formats without leaving the browser.

Impact:

- Poland Premium Workbench Suite lives entirely in ValidoHub assets, content, and metadata.
- Valido Engine remains untouched.
- No official registry lookup, VIES lookup, bank lookup, vehicle lookup, phone lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Poland Premium Workbench Suite V2

Changed:

- Upgraded all ten Poland Premium Suite workbenches in the shared browser plugin.
- Added batch validation for every tool with mixed valid/invalid summaries and copyable batch JSON.
- Added masking/anonymization helpers for Polish identifiers, IBAN/NRB, phone numbers, license plates, VAT numbers, and bank-account inputs.
- Added copy helpers for masked value and generated test case in addition to normalized value and audit JSON.
- Added versioned audit JSON with fields, warnings, diagnostics, repair recommendations, proof scope, and boundary copy.
- Expanded offline bank-code, phone-prefix, mobile-prefix, and license-plate prefix dictionaries.
- Improved per-tool diagnostics, field tables, quality notes, and repair suggestions.
- Preserved browser-only execution and kept Valido Engine untouched.

Reason:

The first Poland suite pass established the pages. V2 moves all ten tools closer to the PESEL gold standard by making them more useful for real developer workflows, test fixtures, support logs, batch cleanup, and safe offline diagnostics.

Impact:

- The implementation remains entirely in ValidoHub assets and documentation.
- Valido Engine remains generic and untouched.
- No official registry lookup, VIES lookup, bank lookup, phone lookup, vehicle lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Poland Expansion Workbench Suite V1

Changed:

- Added fifteen additional browser-only Poland workbenches as a second premium country pack.
- Added Polish ID card, BIC/SWIFT, TERYT, BLIK, PLN amount, VAT calculator, date/locale, address, VIN, EORI, PII masker, test-data generator, invoice number, grosz converter, and SEPA transfer helper pages.
- Added shared `assets/js/tools/poland-expansion.js` with presets, local history, batch validation, masking, result cards, field breakdowns, quality notes, audit JSON, and copy helpers.
- Added metadata-only `validohub.poland-expansion` and linked all new tools from the Poland country hub.
- Added `docs/product/POLAND_EXPANSION_SUITE_SPEC.md`.

Reason:

Poland had enough high-confidence browser-only developer workflows to expand beyond PESEL and the first ten premium validators without changing Valido Engine or adding official lookup behavior.

Impact:

- The implementation remains entirely in ValidoHub assets, content, config, and documentation.
- Valido Engine remains untouched.
- No official registry lookup, banking lookup, payment execution, customs lookup, vehicle lookup, tax-status lookup, backend, REST API, database, or Java execution was added.

## Localization Foundation Pass

Changed:

- Completed the initial ValidoHub localization foundation for `pl`, `de`, `es`, and `pt-BR`.
- Added a final build-time localization pass for route materialization, canonical URLs, hreflang alternates, same-locale links, common UI labels, and country-page shell text.
- Ensured rich Node-owned pages such as country hubs, the Countries Portal, and identifier reference pages are generated for localized routes instead of keeping Java fallback shells.
- Kept technical identifiers such as route slugs, locale codes, and IANA time zones stable.

Reason:

Users should be able to choose a supported language from any page and stay in that locale across the generated site without changing Valido Engine.

Impact:

- The change remains in ValidoHub scripts, assets, and documentation.
- Valido Engine remains untouched.
- Deep human editorial translations remain future content-pack work.

## Brazil Premium Suite baseline

- Added Brazil country-hub portfolio with 60 available local workbenches.
- Added `validohub.brazil-suite` metadata and browser-side suite plugin.
- Updated country renderer to support Brazil-specific identities, descriptions, workbench grouping, and quick-start routing without Valido Engine changes.

## Generic Utility Workbench Suite V1

Changed:

- Added `assets/js/tools/generic-suite.js` as a shared browser-only plugin for global non-country tools.
- Wired generic algorithm IDs through the ValidoHub build process without changing Valido Engine.
- Added premium shared workbench card styling for generic utility result cards, pipeline panels, quality notes, previews, and advanced analysis.
- Documented the baseline that available generic tools must provide real browser behavior, tool-specific descriptions, identity markers, compact card typography, and expanded advanced analysis.

Reason:

Global utility tools such as HTML, UUID, hash, regex, IBAN, case conversion, slug generation, and text diff needed to stop looking like weak documentation pages and meet the same product-quality direction as country tools.

Impact:

- ValidoHub owns the browser behavior and styling.
- Valido Engine remains generic and untouched.
- No backend, REST API, database, Java execution, or server-side runtime was added.
# 2026-07-21

- Added the Homepage Portal as a ValidoHub-owned command-center homepage rendered after publish, with working country/tool search, featured premium workbenches, country hub entry cards, platform metrics, and premium-contract messaging.
- Added `npm run build:portal` for fast homepage + Countries Portal development rebuilds after a prior full build, including targeted localization only for `/` and `/countries/`.
- Documented the homepage/countries portal ownership and rebuild workflow in `docs/product/HOMEPAGE_PORTAL_SPEC.md`, `docs/product/COUNTRIES_PORTAL_SPEC.md`, `docs/product/CURRENT_STATE.md`, and `docs/ai/START_HERE_AI.md` so future AI sessions do not reintroduce generic homepage shells or full-site rebuilds for portal-only iteration.

- Hardened Country Suite Factory sample semantics: invalid/short/bad-country/review sample buttons now carry executable review intent, invalid fixture values remain self-marking for batch/debug flows, and IBAN generators no longer fresh-generate over an active invalid fixture.
- Added shared country-suite copy feedback via a toast/status announcer for Copy result, Copy normalized, batch JSON copy, and repair-copy actions.
- Fixed factory field/evidence breakdown readability by keeping segment/card/token values high-contrast and wrapped inside their containers.
- Added audit/documentation guardrails so future countries cannot ship silent copy actions, valid-looking invalid samples, low-contrast breakdown text, or localization-fragile official-boundary cards.

- Upgraded Country Suite Factory V1 toward Poland PESEL-level tool richness for factory-based country suites: presets/history, batch validation, result-first analysis, visual field/evidence strips, calculation/parser debugger, repair suggestions, developer API preview, and raw JSON/audit output.
- Added permanent product rules requiring PESEL-like debug depth for every country-scoped tool, with domain-appropriate parser/evidence diagnostics for non-checksum tools.
- Refined the shared country-tool debug layer after visual QA: copy feedback must appear as a prominent toast anchored above the triggering button, success pipelines must render green only, field/evidence token strips must keep dark padded text, and the advanced layer should use one centered replay calculation instead of a generic repair-suggestions column.
- Replaced placeholder `Europe local time zone` values in new Europe country data with real IANA zones so every country hub can render the compact hero clock reliably.
- Added a mandatory factory tool-context block after each country-tool hero and before advanced diagnostics/input. The block explains the real workflow use case, local browser checks, and official/source-system boundary with tool-specific copy.
- Added `docs/ai/PREMIUM_COUNTRY_PLAYBOOK.md` as the AI handoff for future premium country work and switched copy feedback to an anchored popover above the clicked copy button.
# 2026-07-22 - Global tools portal and mega-premium expansion

- Added `/en/tools/` as a first-class global tools portal with search, featured workbenches, categories, and premium discovery cards.
- Added ten global mega-premium workbench configs: Phone E.164, Postal Code, SWIFT/BIC, MRZ Passport, CSV Locale Normalizer, EU VAT, ISO 20022 / SEPA, Secret + PII Redactor, Locale Test Data Generator, and Webhook Signature Verifier.
- Added `docs/product/TOOLS_PORTAL_SPEC.md` so future AI sessions know global tools must be registered, searchable, audited, invalid-state correct, and richer than a basic generated form.
- Extended global premium audit coverage so the Tools portal and new invalid/review samples are release gates.

# 2026-07-22 - Build Hardening V2

- Added `npm run build:tools` for scoped global-tool development builds that refresh assets, runtime scripts, `/en/tools/`, selected generated tool pages, and localized tools portal shells without invoking the full Java publisher.
- Added `npm run audit:tools -- --slugs ...` for selected global-tool premium checks and kept `build:full` / `audit:full` as explicit release-gate commands.
- Documented the new workflow in `docs/product/BUILD_HARDENING_V2.md`, `docs/product/CURRENT_STATE.md`, and `docs/ai/START_HERE_AI.md` so future sessions avoid full-site rebuilds for normal iteration.

# 2026-07-22 - Next Chat Handoff

- Added `docs/ai/NEXT_CHAT_HANDOFF.md` as compact project memory for fresh AI sessions.
- Linked the handoff from `START_HERE_AI.md` so future chats inherit the fixed-regression bar, build discipline, country/tool contracts, IBAN rules, and Europe modeling notes without relying on chat history.


## Global Premium Tools Batch V3

Added 15 global premium workbenches across Web/API Quality, Data & Integration, and Security / Ops Premium. The batch also hardens the shared generic-suite advanced-analysis layout so field cards, pipelines, quality notes, API previews, and JSON/code blocks stay contained without horizontal page overflow.


## Global Premium Tools Batch 4-7

Added 20 global premium workbenches across Cloud / DevOps, AI / Data / RAG, Backend / API, and Frontend / QA. These continue the browser-only premium standard with local static analyzers, tool-specific samples, validation pipelines, field breakdowns, quality notes, Developer API previews, and snapshot JSON.

## Guyana Country Visual Assets

- Replaced the Guyana country visual cards with premium raster assets for the outline and South America location map.
- Taught the country visual renderer to support raster assets through `<img>` while preserving inline SVG support.
- Updated scoped `build:country` to copy country visual PNG/WebP/JPG assets into `generated/validohub`, so local country rebuilds render the images without a full build.
- Removed visible headings/captions from country visual cards and recorded the Guyana raster-visual standard: image-only cards, tight framing, no decorative clutter, no LLM-invented outline blobs, and national-flag color gradients/accent glow for future country visuals.
- Added Argentina raster country visuals using the same compact overlay-label card standard and Argentina flag palette.
- Added Chile, Peru, and Colombia raster country visuals using the same compact overlay-label card standard and national flag palettes.

## Full Country Raster Visual Migration

- Replaced all existing country shape/location visual references with saved premium raster PNG assets under `assets/images/countries/`.
- Ensured 59/59 country data files now carry non-null PNG `visualAssets`, including planned Canada, Japan, Mexico, and United States entries that previously had no visuals.
- Reconfirmed the Guyana-style rule: compact overlay labels only, no large headings/captions, no generated SVG blobs, tight framing, national-flag color palettes, and no build-time image regeneration.

## North America Follow-Up Hardening

- Fixed the North America generator baseline so all 23 country suites produce 61 browser-only local workbenches instead of a shallow 22-tool set.
- Added 3-4 main-city civic snapshot data for North America countries and documented that a single-capital fallback is not acceptable for full-premium country suites.
- Rebuilt the English Countries portal after North America generation so `/en/countries/` includes the `North America` group with all 23 countries.
- Replaced the USA, Canada, and Mexico source raster assets with checked non-split-panel outline/location PNGs as the control set for the remaining North America visual cleanup.
- Fixed North America hero clocks by replacing placeholder `Local time zone varies by territory/region` values with real IANA zones for all 23 countries and hardening the renderer so invalid pseudo-zones do not produce dead clocks.

## 2026-07-24 Baseline Checkpoint

- Recorded the current North America/country-visual checkpoint in `docs/ai/NEXT_CHAT_HANDOFF.md`, including the accepted visual rules, the paused/unaccepted country image cleanup, the stale CSS bundle-link risk on older generated country pages, and the requirement to run country scoped builds sequentially.
- Preserved the current dirty worktree as a baseline commit by request so later visual/runtime regressions can be compared against this checkpoint.
