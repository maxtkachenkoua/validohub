# AI Changelog

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
