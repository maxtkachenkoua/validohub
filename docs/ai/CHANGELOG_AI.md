# AI Changelog

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
