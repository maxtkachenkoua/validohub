# Current State

This document records the current ValidoHub and Valido Engine boundary so future sessions do not accidentally undo it.

## Premium Country Contract

Full-premium country work is now gated by `docs/product/PREMIUM_COUNTRY_CONTRACT.md` and `npm run audit:country-premium -- --country <slug>`. The gate checks generated country pages, runtime field-breakdown coverage, related-link locality, foreign fallback copy, empty hub cards, `[object Object]`, generic tool shells, and readiness reporting before future country batches start.

## Repository Boundary

- Valido Engine is now a generic static site generator.
- ValidoHub owns product content, configuration, and browser assets.
- Site-specific browser behavior lives in `validohub/assets/`, not in Valido Engine.
- The browser-side Workbench Framework lives in `validohub/assets/js/workbench/`.
- Tool plugins live in `validohub/assets/js/tools/`.
- The Brand Asset System lives in `validohub/assets/js/brand-assets.js`.

## Current Working Plugins

- Base64 Workbench: `assets/js/tools/base64.js`
- URL Workbench: `assets/js/tools/url.js`
- JSON Workbench: `assets/js/tools/json.js`
- JWT Workbench: `assets/js/tools/jwt.js`
- PIX Workbench: `assets/js/tools/pix.js`
- Spain ID Workbench: `assets/js/tools/spain-id.js`
- Poland Premium Workbench Suite: `assets/js/tools/poland-suite.js`
- Poland Expansion Workbench Suite: `assets/js/tools/poland-expansion.js`
- Poland Baseline Workbench Suite: `assets/js/tools/poland-baseline.js`
- France Premium Workbench Suite: `assets/js/tools/france-suite.js`
- Netherlands Premium Workbench Suite: `assets/js/tools/netherlands-suite.js`
- Switzerland Premium Workbench Suite: `assets/js/tools/switzerland-suite.js`
- Germany Premium Workbench Suite: `assets/js/tools/germany-suite.js`
- Future Country Suite Factory: `assets/js/tools/country-suite-factory.js`


## Countries Platform

Countries are now treated as a first-class ValidoHub product section.

Current country hubs:

- Brazil: `/en/brazil/`
- France: `/en/france/`
- Germany: `/en/germany/`
- Italy: `/en/italy/`
- Netherlands: `/en/netherlands/`
- Poland: `/en/poland/`
- Spain: `/en/spain/`
- Switzerland: `/en/switzerland/`

Current country workbench routes:

- Brazil PIX Workbench: `/en/brazil/brazil-pix-validator/`
- Brazil IBAN Validator: `/en/brazil/brazil-iban-validator/`
- France SIREN Validator & Explainer: `/en/france/france-siren-validator/`
- France SIRET Validator & Explainer: `/en/france/france-siret-validator/`
- French IBAN Validator: `/en/france/france-iban-validator/`
- French VAT / TVA Validator: `/en/france/france-vat-tva-validator/`
- NIR Key Validator: `/en/france/france-nir-key-validator/`
- German Tax ID / IdNr Validator: `/en/germany/german-tax-id-validator/`
- German USt-IdNr / VAT Validator: `/en/germany/german-vat-ust-idnr-validator/`
- German IBAN Validator: `/en/germany/germany-iban-validator/`
- German BLZ Bank Code Inspector: `/en/germany/german-blz-bank-code-inspector/`
- German XRechnung Readiness Helper: `/en/germany/german-xrechnung-readiness-helper/`
- German DATEV Export Readiness Checker: `/en/germany/german-datev-export-readiness-checker/`
- German Postal Code Validator: `/en/germany/german-postal-code-validator/`
- Dutch BSN Validator & Explainer: `/en/netherlands/netherlands-bsn-validator/`
- Dutch KVK Number Validator: `/en/netherlands/netherlands-kvk-number-validator/`
- Dutch BTW / VAT Validator: `/en/netherlands/netherlands-btw-vat-validator/`
- Dutch IBAN Validator: `/en/netherlands/netherlands-iban-validator/`
- Dutch Postcode Validator: `/en/netherlands/netherlands-postcode-validator/`
- PESEL Validator: `/en/poland/pesel-validator/`
- Poland NIP Validator & Explainer: `/en/poland/poland-nip-validator/`
- Poland REGON Validator & Explainer: `/en/poland/poland-regon-validator/`
- Polish IBAN / NRB Workbench: `/en/poland/poland-iban-nrb-validator/`
- Polish Tax Microaccount Calculator: `/en/poland/poland-tax-microaccount-calculator/`
- Polish Postal Code Validator: `/en/poland/poland-postal-code-validator/`
- Polish Phone Number Workbench: `/en/poland/poland-phone-number-validator/`
- Polish License Plate Inspector: `/en/poland/poland-license-plate-inspector/`
- KRS Number Inspector: `/en/poland/poland-krs-inspector/`
- Polish VAT / EU VAT Syntax Workbench: `/en/poland/poland-vat-validator/`
- Polish Bank Code / NRB Inspector: `/en/poland/poland-bank-code-inspector/`
- Spain DNI/NIE/NIF/CIF Workbench: `/en/spain/spain-id-validator/`
- Spain IBAN Validator: `/en/spain/spain-iban-validator/`
- Swiss UID Validator & Explainer: `/en/switzerland/switzerland-uid-validator/`
- Swiss VAT / MWST Validator: `/en/switzerland/switzerland-vat-mwst-validator/`
- AHV / AVS Number Validator: `/en/switzerland/switzerland-ahv-avs-number-validator/`
- Swiss IBAN Validator: `/en/switzerland/switzerland-iban-validator/`
- Swiss QR-Bill Reference Validator: `/en/switzerland/switzerland-qr-bill-reference-validator/`
- Swiss Postal Code Validator: `/en/switzerland/switzerland-postal-code-validator/`

Route rules:

- Locale is always the first path segment.
- Global tools stay under `/{locale}/tools/{tool-slug}/`.
- Country hubs stay under `/{locale}/{country-slug}/`.
- Country workbenches stay under `/{locale}/{country-slug}/{tool-slug}/`.
- Do not localize route slugs.

The Countries navigation is ValidoHub-owned product behavior in `assets/js/countries.js`. It groups generated country hub links under a scalable Countries menu without hardcoding country names or changing Engine templates.

The global Countries Portal is now a ValidoHub-owned product page at:

```text
/en/countries/
```

Current source files:

- Portal metadata and shared country exports: `assets/js/countries.js`.
- Portal renderer and interactions: `assets/js/portal-countries.js`.
- Portal styling: `assets/css/validohub.css`.
- Post-publish route materializer: `scripts/build-countries-portal.mjs`.

The portal discovers available country hubs from generated links, shows roadmap countries from product-owned country metadata, groups countries by continent, supports instant search and filters, includes a lightweight interactive world map, and highlights Brazil as the Reference Implementation.

Countries Portal Visual Polish V1 is complete. The portal now uses stronger product messaging, richer derived platform metrics, subtle country identity accents, improved card elevation, polished filter controls, a more prominent world map interaction, refined continent headings, and a premium Brazil reference badge. This was a visual iteration only; routing, discovery, metadata ownership, and Engine boundaries did not change.

Current Engine does not generate arbitrary product pages such as `/en/countries/`, and it only emits country hubs that are connected to generated country-specific tools. To keep Engine generic, ValidoHub materializes the Countries Portal and metadata-only country hub shells after publish with `node scripts/build-countries-portal.mjs`. Do not move this product behavior into Engine unless a future generic static-page capability is approved.

Brazil now uses Country Hub Template V3 as the reference Developer Country Intelligence Portal. It also uses Country Hub Visual Identity V2 for real SVG geography. The rich hub is rendered by `assets/js/countries.js` from a generic country metadata structure and keeps the Engine-generated country page as fallback HTML.

Spain Premium Country Suite V1 is complete as the fourth full future-country suite built on Country Suite Factory V1 and the final upgrade of an existing non-premium country hub. It preserves the existing Spain ID and Spain IBAN routes while adding 60 active Spain-specific workbenches for DNI, NIE, NIF, legacy CIF, ES VAT, EORI, NAF, Registro Mercantil readiness, Spanish IBAN, CCC, BIC, SEPA, Bizum, remittance, reconciliation, bank statements, EUR amounts, IVA rates and returns, Facturae, VeriFactu, SII, AEAT models, accounting audit trails, postal codes, addresses, provinces, municipalities, phone numbers, dates, CSV, slugs, OCR, GDPR/LOPDGDD redaction, PII masking, personal fixtures, documents, vehicle plates, VIN, customs, postal tracking, JSON/regex/API/form helpers, and data-quality workflows. These tools share `assets/js/tools/spain-suite.js`, call the additive-only `assets/js/tools/country-suite-factory.js`, use metadata-only `validohub.spain-suite`, run offline in the browser, include dedicated field breakdowns, and localize the interactive runtime for every configured production locale.

Poland Premium Workbench Suite V2 is complete as a PESEL-inspired expansion of the Poland country hub. It adds ten browser-only premium workbenches for NIP, REGON, Polish IBAN/NRB, tax microaccount input checks, postal codes, phone numbers, license plates, KRS numbers, Polish VAT syntax, and bank-code inspection. These tools share `assets/js/tools/poland-suite.js`, use metadata-only `validohub.poland-suite`, run offline in the browser, and clearly separate syntax/checksum/format diagnostics from official registry, VIES, bank, tax, phone, or vehicle-status lookups. V2 adds batch validation, masking, copyable test cases, versioned audit JSON, richer dictionaries, quality notes, and per-tool repair suggestions across all ten Poland tools.

Poland Expansion Workbench Suite V1 is complete as a second browser-only Poland pack. It adds fifteen additional premium workbenches for Polish ID cards, BIC/SWIFT, TERYT-like administrative codes, BLIK, PLN amounts, VAT calculations, pl-PL dates, addresses, VIN, EORI, PII masking, test-data generation, invoice numbering, grosz conversion, and SEPA transfer readiness. These tools share `assets/js/tools/poland-expansion.js`, use metadata-only `validohub.poland-expansion`, run offline in the browser, and avoid official registry, payment, customs, vehicle, tax-status, and banking lookups.

Country tool headers are now standardized for mature country workbenches. Poland Premium, Expansion, and Baseline suite tools use PL-aware premium headers with identity marks, tool-specific summaries, presets, local history, and sample chips. Brazil suite tools use the brighter flag-color header treatment with sample chips as the visual reference for vivid country identity. Future country suites should reuse this pattern before inventing new page headers. Individual country tools must stay at compact Brazil workbench scale across the full shell: header, mark, title, summary, chips, sample selector, textarea, buttons, result cards, validation pipeline, field breakdown, quality notes, and advanced panels. Country hub heroes can be large; tool pages should feel dense, premium, and immediately usable. `node scripts/audit-country-tool-shell.mjs` is the static compact-shell guard for France, Netherlands, generic premium hero sizing, and the related AI rules.

IBAN has a permanent two-layer product strategy. The global IBAN Validator remains the universal detector under `/en/tools/iban-validator/`; it validates ISO shape, length, MOD-97, grouping, masking, and links to deeper country workbenches when available. Country-specific IBAN validators are product pages only when they add local value beyond SEO: BBAN maps, bank/branch/account slicing, domestic check digits where available, local samples, common mistakes, and official lookup boundaries. Current country-specific coverage is Poland via the Polish IBAN / NRB Workbench, France and Netherlands through their premium country suites, plus Brazil, Germany, and Spain IBAN validators through the country-aware generic finance runtime.

Poland Baseline Workbench Suite V1 is complete as the broad Poland baseline layer. It adds twenty-four additional premium browser-only tools for KSeF XML, JPK XML, split payment, PKD, PKWiU, BDO, CEIDG readiness, company onboarding, invoice data, receipts, transfer titles, payment QR, bank statements, postal addresses, TERYT hierarchy, municipality codes, MRZ/passport parsing, passport numbers, driving licence snippets, vehicle registration documents, insurance policies, parcel tracking, PPE energy codes, and Polish data quality. These tools share `assets/js/tools/poland-baseline.js`, use metadata-only `validohub.poland-baseline`, run offline in the browser, include a real local SVG QR generator for payment QR payloads, and keep official registry, bank, tax, gateway, utility, carrier, vehicle, insurance, and legal-status lookups out of scope.

France Premium Country Suite V1 is complete as the first no-phase country expansion from scratch. It adds a full France country hub plus sixty-four active country-specific workbenches for SIREN, SIRET, NIC, TVA, EORI, APE/NAF, RCS/RM helpers, company onboarding, Sirene readiness, French IBAN, RIB, BIC, SEPA, RUM, remittance, masking, statement parsing, reconciliation, postal codes, INSEE commune codes, departments, regions, CEDEX, addresses, phone numbers, dates, VAT rates, invoices, e-invoicing/PDP/PPF readiness, FEC, audit trails, GDPR/PII masking, data quality, NIR syntax/key/masking, personal-document helpers, personal fixtures, vehicle plates, VIN, Crit'Air, carte grise, OCR repair, CSV, EUR amounts, accents, slugs, JSON fixtures, regex packs, API payloads, and form-field audits. These tools share `assets/js/tools/france-suite.js`, use metadata-only `validohub.france-suite`, run offline in the browser where possible, place result cards immediately after input controls, and keep Sirene, VIES, bank ownership, customs status, identity proof, and live official-state lookups out of scope.

Netherlands Premium Country Suite V2 is complete as the first full country generated after the country-suite anti-regression guardrails were documented and then upgraded to the Brazil-style field-breakdown bar. It adds a Netherlands country hub plus sixty-three active country-specific workbenches for BSN, RSIN, KVK, BTW/VAT, EORI, DigiD boundaries, UBO/RVO helpers, Dutch IBAN/BIC/SEPA/iDEAL, postcode/BAG/address/phone/locale workflows, BTW rates, invoice/e-invoicing/Peppol/VAT return/audit-file/payroll helpers, AVG/GDPR/PII masking, document OCR, CSV/JSON/regex/API/form audits, vehicle/RDW/VIN/plates, PostNL tracking, and EAN fixtures. These tools share `assets/js/tools/netherlands-suite.js`, use metadata-only `validohub.netherlands-suite`, run offline in the browser, place result cards immediately after input controls, use short sample selector labels, include dedicated field breakdown panels for every major Dutch tool family, and keep KVK, BAG, VIES, bank ownership, DigiD, RDW, tax filing, and carrier status lookups out of scope.

Switzerland Premium Country Suite V1 is complete as the first full future-country suite built on Country Suite Factory V1 from the start. It adds a Switzerland country hub plus fifty-eight active country-specific workbenches for UID, MWST/VAT, AHV/AVS, EORI/customs, Swiss IBAN, SIC/BC clearing, BIC/SWIFT, SEPA, QR-bill, ESR, CHF amounts, VAT rates and returns, invoices, e-invoicing, salary certificates, payroll, withholding-tax readiness, company onboarding, Zefix readiness, FADP/GDPR redaction, PII masking, data quality, OCR repair, JSON/regex/API/form helpers, postal codes, addresses, phone numbers, cantons, multilingual locale workflows, personal-document helpers, health-insurance boundaries, vehicle plates, VIN, and customs/postal workflows. These tools share `assets/js/tools/switzerland-suite.js`, call the additive-only `assets/js/tools/country-suite-factory.js`, use metadata-only `validohub.switzerland-suite`, run offline in the browser, include dedicated field breakdowns, and localize the interactive runtime for every supported ValidoHub locale.

Germany Premium Country Suite V1 is complete as the second full future-country suite built on Country Suite Factory V1 and the first country to upgrade an existing generic IBAN route into a full suite route. It adds a Germany country hub plus 60 active country-specific workbenches for IdNr, Steuernummer, USt-IdNr, EORI, Handelsregister, LEI, German IBAN, BLZ, BIC, SEPA, direct debit, Girocard, remittance, reconciliation, bank statements, EUR amounts, VAT rates and returns, invoices, XRechnung, ZUGFeRD, e-invoicing, DATEV, GoBD, SKR03/SKR04, payroll, wage tax, health-insurance boundaries, addresses, postal codes, phone numbers, dates, CSV, slugs, OCR, DSGVO redaction, PII masking, personal fixtures, documents, vehicle plates, VIN, customs, postal tracking, JSON/regex/API/form helpers, and data-quality workflows. These tools share `assets/js/tools/germany-suite.js`, call the additive-only `assets/js/tools/country-suite-factory.js`, use metadata-only `validohub.germany-suite`, run offline in the browser, include dedicated field breakdowns, and localize the interactive runtime for every supported ValidoHub locale.

Italy Premium Country Suite V1 is complete as the third full future-country suite built on Country Suite Factory V1. It adds an Italy country hub plus 60 active country-specific workbenches for codice fiscale, Partita IVA, VAT, EORI, SDI, PEC, REA, ATECO, SPID/CIE boundaries, Italian IBAN, ABI/CAB, BIC, SEPA, Ri.Ba, pagoPA, FatturaPA, VAT/accounting workflows, CAP, addresses, provinces, comune/Belfiore codes, phone numbers, dates, CSV, slugs, OCR, GDPR redaction, PII masking, personal fixtures, documents, vehicle plates, VIN, customs, postal tracking, JSON/regex/API/form helpers, and data-quality workflows. These tools share `assets/js/tools/italy-suite.js`, call the additive-only `assets/js/tools/country-suite-factory.js`, use metadata-only `validohub.italy-suite`, run offline in the browser, include dedicated field breakdowns, and localize the interactive runtime for every supported ValidoHub locale.

Country Suite Generation Guardrails are now permanent current-state rules. Future full-country generation must read `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md`, avoid foreign-country fallback copy, keep related links same-country by default, keep sample selector labels short, place results before advanced analysis, make long values layout-safe, cover all supported localized routes structurally, keep generated output out of commits, and leave Valido Engine untouched unless a truly generic platform capability is required.

Country Suite Factory V1 is available for future countries and is now proven by Switzerland V1. It lives in `assets/js/tools/country-suite-factory.js`, is specified in `docs/product/COUNTRY_SUITE_FACTORY_SPEC.md`, and is audited by `node scripts/audit-country-suite-factory.mjs` or `npm run audit:country-suite`. The factory is additive-only: it must not remap, import into, or migrate Brazil, Poland, France, or Netherlands without a separate explicit migration task. Future countries should use it to get the compact Brazil-scale shell, immediate results, validation pipeline, dedicated field breakdown, quality notes, advanced analysis, copy/download controls, local overflow safety, config validation, and suite-level runtime localization from the start.

Country Suite Factory V1 now also carries the PESEL-rich debug layer for factory-based country tools. Factory-rendered suites get success-first presets, recent local history, batch validation, result-first analysis, visual field/evidence token strips, calculation/parser debugger panels, repair suggestions, developer API preview, raw JSON/audit output, and richer advanced analysis. Poland PESEL remains the benchmark for identifier-like tools; non-checksum domains must expose equivalent parser or evidence diagnostics instead of thin generic output.

Country Suite Factory sample/debug hardening is active across factory countries. Factory tools now expose multiple clear paste examples, prevent invalid/short/wrong-prefix fixtures from passing as success, use interactive repair actions, render a single-hierarchy evidence breakdown, show visible button/sample hover states, and keep IBAN generators fresh on every Generate click. These fixes are protected by `npm run audit:country-suite`.

Brazil is also the canonical Country Hub design reference. Future country hubs must read `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md` and `docs/ai/COUNTRY_HUB_AI_GUIDE.md` before implementation. Spain, Poland, Germany, France, Japan, and all future countries inherit the Brazil structure and design language; only metadata and local content should change.

Country Hub Template V3 includes:

- Hero and quick summary.
- Real Brazil SVG outline and highlighted world map visual identity.
- Rich Country Statistics.
- Developer Quick Actions.
- Developer Country Profile.
- Developer Cheat Sheet.
- Localization Examples.
- Address Example.
- Phone Number Examples.
- Local Formats.
- Developer Integration Checklist.
- Validation Rules.
- Common Integration Mistakes.
- Payments & Banking.
- Banking Overview.
- Government & Official Resources.
- Available Workbenches.
- Planned Workbenches.
- Related Global Tools.
- Discovery Links.
- Things Developers Should Know.
- Developer Notes.
- Developer API Examples with copyable snippets.
- JSON Examples.
- Localization Notes.
- Country Ecosystem.
- Copy buttons for important code/value fields.
- Reusable status chips.
- Official brand/logo placeholder support.
- Semantic discovery tags for future filtering/search.
- Hidden future ad-slot regions.

This does not implement PIX, CPF, CNPJ, CEP, phone, or banking validators.

Advanced metadata such as tags, featured status, display order, and icon remain future architecture requirements unless the Engine DSL explicitly supports them.

Permanent Country Hub rules:

- Brazil is the reference implementation.
- Country Hub improvements must be reusable.
- New country hubs must not invent different layouts.
- Official and famous brand identities should use legally usable official SVG/logo assets where possible.
- Monochrome SVG logos are preferred for a calm documentation-grade appearance.
- Semantic icons are for non-branded concepts such as CPF, CNPJ, CEP, Regex, JSON, Base64, URL, Unicode, Locale, Calendar, and ICU.

## Brand Asset System

ValidoHub now has a project-wide Brand Asset System:

- Architecture doc: `docs/product/BRAND_ASSET_SYSTEM.md`.
- Registry doc: `docs/product/BRAND_REGISTRY.md`.
- Runtime registry: `assets/js/brand-assets.js`.
- First reference consumer: Brazil Country Hub through `assets/js/countries.js`.

Every current and future page, workbench, Country Hub, card, navigation surface, Markdown page, and generated page must use the Brand Asset System when a recognizable brand, technology, organization, payment system, language, database, framework, protocol, standard, or ecosystem appears visually.

AI assistants must check the Brand Registry before choosing a logo or icon. New brands require a registry entry first.

Current registered brands include PIX, Java, Python, Go, Kotlin, C#, .NET, Node.js, React, Next.js, TypeScript, JavaScript, Docker, Kubernetes, PostgreSQL, MySQL, MongoDB, Redis, JWT, Stripe, Visa, Mastercard, American Express, SWIFT, SEPA, IBAN, Bizum, VIES, European Union, GitHub, OpenAPI, GraphQL, gov.br, Gobierno de España, Agencia Tributaria, Seguridad Social, Banco de España, Banco Central do Brasil, Receita Federal, Correos, and Correos Spain.

## Localization

ValidoHub now has a seven-locale production localization core: `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`. Locale remains the first path segment and route slugs are not translated. The language switcher is available globally and must expose exactly those configured production locales. Country pages expose official-language quick choices, and the release build produces localized route variants for all discovered pages in the configured locale set. Larger locale waves remain demand-driven expansion work, not the default production matrix.

The final ValidoHub post-publish pass in `scripts/localization-pass.mjs` localizes common UI shell text, country names, canonical URLs, hreflang alternates, same-locale links, rich Node-owned country pages, the Countries Portal, and identifier reference pages. This is a build-time localization layer; Valido Engine remains generic and unchanged.

Deep editorial body content is still treated as a future human-reviewed content-pack layer. Do not change the Poland page structure while adding translations. Keep technical identifiers such as `Europe/Warsaw`, locale codes, route slugs, and code snippets stable. For development, `npm run build:country -- --country <slug>` can refresh a single generated country tree across the configured core locales after a prior full publish; it is a dev accelerator, not a release substitute. Full builds prune stale generated locale directories before publish validation so removed locales cannot remain deployable as dead output.

## Generated Site Root

The generated static site root is:

```text
/Users/maxtkachenko/work/validohub/generated/validohub
```

This is intentional. Do not serve ValidoHub from the project root. The project root contains source files such as YAML, Markdown, product docs, and raw assets. The deployable website is the generated output directory.

## Commands

Run these from `/Users/maxtkachenko/work/valido-engine`.

Doctor:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="doctor --site /Users/maxtkachenko/work/validohub/site.yaml"
```

Publish:

```bash
mvn -q -pl valido-cli exec:java -Dexec.mainClass=com.validoengine.cli.EngineMain -Dexec.args="publish --site /Users/maxtkachenko/work/validohub/site.yaml"
```

ValidoHub post-publish route materialization:

```bash
cd /Users/maxtkachenko/work/validohub
node scripts/build-countries-portal.mjs
```

Fast country-only development refresh after a prior full build/publish:

```bash
cd /Users/maxtkachenko/work/validohub
npm run build:country -- --country italy
```

This syncs the country runtime assets, materializes only `/{locale}/{country}/` for the configured core locales, and runs targeted country HTML guards. Run `npm run build` before release.

Local preview:

```bash
cd /Users/maxtkachenko/work/validohub/generated/validohub
python3 -m http.server 8130 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8130/
```

## Local Java Note

The target stack is Java 21. Some local Codex sessions currently have only Java 17 installed. In those sessions, the established temporary validation workaround is:

```bash
mvn clean test -Dmaven.compiler.release=17
```

Do not treat this workaround as a product architecture change.

## Hard Rule

Never serve from the ValidoHub project root. Always serve from `generated/validohub` after publishing.


## Brazil Premium Suite

Brazil now follows the Poland country-hub gold-standard layout with its own local tool portfolio. Brazil owns 60 available country workbenches through ValidoHub content/config and browser assets. Engine remains generic. Pix keeps its dedicated workbench; the broader Brazil portfolio uses `assets/js/tools/brazil-suite.js`.

## Generic Utility Workbench Suite

Global non-country tools now use the ValidoHub-owned Generic Utility Workbench Suite when they do not yet justify a dedicated gold-standard plugin. The suite lives in `assets/js/tools/generic-suite.js` and covers HTML encode/decode, slug generation, case conversion, UUID, IBAN, regex, text diff, and hash tools with real browser-only behavior. The ValidoHub build post-processes those generated tool pages in `scripts/build-all.mjs`, materializes full premium workbench markup where Engine output is too generic, and injects the shared workbench helper scripts plus `generic-suite.js` without changing Valido Engine. The generic suite now includes the premium country-tool interaction baseline where the domain supports it: branded tool headers, working success-first samples, intentional edge/error samples, local result cards, validation pipelines, field breakdowns, quality notes, expanded advanced analysis, UUID batch generation, IBAN masked display, regex capture-group reporting, text diff result cards, hash digest comparison, and corrected hash/slug execution.

Generic tools are now governed by `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md`. That standard is mandatory product memory: generic tools must look and behave like first-class premium workbenches, not secondary utilities. Poland and Brazil country workbenches are the visual and functional baseline. Future generic tools must be tool-first, mode-correct, richly interactive, competitor-aware, advanced-analysis-heavy, and deeper than the strongest public tools in their category wherever the domain supports it.

Future generic instruments must start from the premium contract, not from a temporary generic form. New tools need deterministic neutral theming, success-first presets, polished invalid/error states, result cards immediately after input, advanced analysis below results, copy/download affordances, and browser verification before being called complete.


## European Premium Batch V1

Portugal, Austria, Belgium, Ireland, Czechia, Sweden, Norway, Denmark, Finland, and Romania are generated as the first 10-country premium stress batch. Each country uses Country Suite Factory V1 with 60 local developer workbenches, field breakdown on every tool, seven production runtime locales, same-country related links, rich country hub sections, and explicit official/live lookup boundaries.
