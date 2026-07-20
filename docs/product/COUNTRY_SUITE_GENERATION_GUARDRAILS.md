# Country Suite Generation Guardrails

This document records regression rules learned while building the France suite and first reapplied during the Netherlands suite. Future country generation must treat these as acceptance criteria, not optional cleanup.

## Absolute Rules

- Do not reuse another country's visible copy as a fallback. No PESEL, NIP, REGON, KRS, PIX, CPF, CNPJ, PLN, NRB, KSeF, JPK, or other foreign-local terms may appear in a new country hub or country tool unless the page intentionally compares countries.
- Country hub route groups must have country-specific summaries. If the renderer has grouped labels, add a group map for the target country instead of inheriting Poland or Brazil text.
- Country tool related links must stay country-local by default. A France tool should link to France tools, a Poland tool to Poland tools, Brazil to Brazil, etc. Cross-country links need an explicit comparison section, not automatic related-tool spillover.
- Generated country workbenches must preserve the premium structure: branded header, samples and related tools, input controls, immediate result cards, validation pipeline, dedicated field breakdown panels, quality notes, advanced analysis below results, developer payload, and local/offline boundaries.
- Country tool headers must use the compact Brazil workbench scale, not landing-page hero scale. Tool titles should fit as workbench headings, sample controls should sit inside the header without creating a tall first viewport, and the input/results area must remain visible quickly after the header.
- Country tool typography and spacing must be proportionate across the whole shell, not only the hero. The mark, eyebrow, title, summary, chips, sample selector, textarea, buttons, result cards, pipeline cards, field-breakdown tiles, quality notes, and advanced panels must share the compact Brazil workbench rhythm. Do not ship oversized text, giant input boxes for short samples, or chunky cards that make the tool feel less refined than Brazil CPF/CNPJ.
- Dedicated field breakdown is mandatory for every country-scoped tool in every country, including standalone Germany/Spain-style tools and full country suites. Field breakdown is one of the main debugging surfaces. Identifier tools split body/check digits, banking tools split country/check/bank/account pieces, tax tools split prefix/body/suffix/rate boxes, address/phone tools split locale components, and developer/data tools split detected evidence groups. Even broad text/data tools must render an explicit "detected fields / evidence slices" breakdown instead of only generic result cards. A country suite is not Brazil-level premium if it only has generic result cards.
- Long values must never widen the page. This includes select options, sample labels, related-tool labels, primary results, field cards, tables, JSON payloads, code blocks, and monospaced previews.
- Sample dropdown labels must be short human labels, never raw payloads. Put raw fixture content into the input when selected; do not show tabular, JSON, IBAN, CSV, FEC, OCR, or multiline samples as option text.
- Result grids and cards must use `min-width: 0`, responsive `minmax(0, 1fr)` or equivalent constraints, and `overflow-wrap`/local `overflow:auto` where values can be long.
- Developer payloads and advanced analysis must use local scrolling or wrapping inside the panel. They must not create horizontal page scroll.
- Country hub lower-page cards must never render as icon-only/status-only placeholders. Official sources, ecosystem, localization notes, developer examples, resources, and similar info-card grids must have a visible title and summary; renderers must support `title/text`, `name/description`, `label/description`, `language/code`, and `note`-style structured data instead of silently producing empty `<h3>` or empty paragraph content.
- Every supported locale route must receive the same structural guardrails. Do not only fix `/en/`.
- "Fully premium country" includes full localization for the interactive tool workbench, not only route titles and descriptions. Runtime strings must cover every supported locale: inputs, buttons, status pills, errors, diagnostics, result labels, field breakdowns, pipeline labels, quality notes, advanced analysis labels, developer payload labels, sample labels, and browser-only boundary copy.
- Future factory-based country suites must provide a suite-level `i18n`/`localeStrings` dictionary or an equivalent documented localization bridge. Do not hard-code English user-facing strings in finished country runtimes except protocol names, official abbreviations, code literals, sample identifiers, or intentional local terms.
- A factory-based country route must not be overwritten by a generic utility workbench during post-processing. If an existing standalone country tool such as Germany IBAN graduates into a full suite, the generic utility injector must detect the factory algorithm and skip that route.
- Factory-based country suites must not flash or remain on the generic "Run the tool" workbench. Build/post-process must collapse the generic `.workbench-card` to a factory host, load `country-suite-factory.js` before the country runtime, and verify every generated country tool mounts the premium shell with `.csf-hero`, `.csf-result-card`, `.csf-pipeline`, `.csf-breakdown`, `.csf-quality`, and `.csf-advanced`.
- Valido Engine stays generic. Fix country-suite copy, related links, CSS, JS, and post-processing in ValidoHub unless a truly reusable static-site capability is missing.
- Future full-country suites should use Country Suite Factory V1 (`assets/js/tools/country-suite-factory.js`) unless there is a documented reason to build a bespoke suite runtime. The factory is additive-only and must not migrate accepted Brazil, Poland, France, or Netherlands suites without explicit user approval.

## Required Audit Before Calling A Country Complete

Run this sweep after any new full country or broad country-suite generation:

1. Build the site and confirm `Build Integrity Verification: PASSED`.
2. Grep the generated country hub and representative country tools for foreign-country terms from current baselines.
3. Inspect related links for representative tools and confirm links stay under `/{locale}/{country}/` unless explicitly designed otherwise.
4. Open at least one identifier, one banking/tax, one developer/data, and one address/locale tool.
5. Select the first sample and confirm it succeeds or intentionally demonstrates a clear error state.
6. Open the samples/related selector and confirm long sample payloads do not appear as option labels.
7. Confirm every country-scoped tool renders a dedicated field breakdown panel, not just headline result cards. Run `npm run audit:country-suite`; it must include the field-breakdown audit and fail if Brazil, Poland, France, Netherlands, Switzerland, Germany, Spain, or a future country tool loses its named breakdown panel.
8. Confirm the tool header uses compact Brazil workbench proportions and does not consume the first viewport like a landing hero.
9. Compare at least one identifier/tax tool against a Brazil CPF/CNPJ workbench and confirm typography, spacing, textarea height, button sizing, chip sizing, result card density, and field-breakdown tiles feel equally polished and proportionate.
10. Confirm runtime localization covers every supported locale for representative tools, including workbench buttons, statuses, errors, field breakdowns, quality notes, samples, and advanced/developer labels.
11. For factory-based suites, confirm script order is dependency-first (`country-suite-factory.js` before the country runtime), generated HTML does not ship `.workbench-heading`/`>Run the tool<`, and every generated tool mounts the premium shell instead of leaving the generic fallback visible.
12. Run `npm run audit:country-suite` and fix any factory or compact-shell regression before calling the suite complete.
13. If the country uses a bespoke runtime, document why it does not use Country Suite Factory V1.
14. Check result cards, primary output, tables, and developer payload with long input; no page-level horizontal overflow is allowed.
15. Check desktop and mobile widths for the country hub search/results panel and the tool result panel.
16. Inspect lower-page country hub info-card sections and confirm no card is only an icon plus status badge; every info card needs a visible title and summary.
17. Confirm generated output under `generated/validohub` is not committed.
18. Confirm Valido Engine remains untouched unless the task explicitly required a generic Engine capability.

## Known Regression Cases To Prevent

- France inherited Poland route-group copy: "PESEL, NIP, REGON, KRS..." appeared on the France hub. Future renderers must not default non-Brazil countries to Poland text.
- France tool related sections pulled Poland, Brazil, Spain, Germany, and generic tools into every France tool. Country tool related sections must be pruned or generated as same-country by default.
- France FEC sample text appeared directly in a native select option, causing the browser dropdown and page layout to stretch. Option labels must stay short and raw samples must be loaded into inputs only.
- France FEC results and developer payload exposed long monospaced values that could stretch cards. Country result components need wrapping, `min-width: 0`, and local overflow from the start.
- Netherlands is the first post-guardrails generation benchmark. It must remain free of foreign-country fallback copy, same-country related-link leakage, raw sample option labels, and page-level overflow from long Dutch audit, banking, address, or developer payloads.
- Netherlands initially shipped country tool headers and tool-shell typography too large: oversized title, loose hero spacing, large sample selector, tall textarea, chunky buttons/cards, and disproportionate field-breakdown tiles. Future country tools must be visually compared against Brazil CPF/CNPJ after implementation and tightened before they are called premium.
- France and generic workbenches also carried older, larger shell values. `scripts/audit-country-tool-shell.mjs` now protects the compact Brazil-scale tokens for France, Netherlands, generic premium hero, and this guardrails document.
- Switzerland initially exposed some tools as the generic "Run the tool" shell because the generated page loaded `switzerland-suite.js` before its factory dependency. Multi-script country suites must preserve dependency order in `scripts/build-all.mjs`, and the factory audit must check generated pages for that order.
- Switzerland CSV Locale Normalizer (`/en/switzerland/switzerland-csv-locale-normalizer/`) is the named regression case for "poor" country-tool UI: a finished premium country tool must never remain on the plain generated workbench with only a large textarea, generic action buttons, and empty output. Browser QA must confirm this route, plus representative identifier/payment/document routes, mounts the full premium shell before sign-off.
- Germany IBAN existed as a country-aware generic IBAN utility before Germany became a full suite. Future upgrades from standalone generic country tools to factory suites must preserve the route while switching the algorithm/runtime to the country suite and preventing generic utility reinjection.
- Switzerland CSV Locale Normalizer also exposed a hybrid shell where the premium factory UI mounted below the old generic `Workbench / Run the tool` header. Factory pages must collapse the generated workbench to a `csf-static-host` before scripts run, and `npm run audit:country-suite` must fail if generated Swiss factory pages contain `.workbench-heading` or literal `>Run the tool<`.
- Switzerland hub lower-page lists exposed `[object Object]` in highlights, developer notes, and common mistakes because structured `{title, text}` entries were rendered as strings. Country hub renderers must support both string entries and structured title/text entries, and the build must fail on literal `[object Object]` in generated HTML.
- Switzerland developer examples, ecosystem, and localization-note cards rendered as icon-only/status-only placeholders because renderers assumed one field shape while the country data used `language/code` or `title/text`. Future country hub info-card renderers must normalize `title`, `name`, `label`, or `language` into the card title and `text`, `description`, or `note` into the summary; build and suite audits must fail on empty country info-card titles or summaries.
- France initially extracted local fields but displayed them as a generic result grid without a named field-breakdown panel. Future suites must ship a visible breakdown title, segment strip or equivalent field slices, and detailed field cards for every tool family before they can be called premium.

## Future Country Prompt Contract

When the user asks for a complete country, interpret it as:

- Create or expand the country hub to Poland/Brazil quality.
- Add a broad local tool suite where offline/browser-only validation or analysis is useful.
- Treat Brazil CPF/CNPJ-style validation pipeline, field breakdown, result card, and quality-note richness as the minimum visual/functionality bar for structured local tools.
- Treat Brazil's compact country tool proportions as the size baseline. Rich country hub heroes can be large; individual tools should be dense workbenches across header, inputs, results, breakdowns, quality notes, and advanced analysis.
- Localize all static country content and all interactive runtime strings for every supported locale. A suite with English-only workbench controls is not complete.
- Apply the country-suite guardrails in this document before final response.
- Prefer the additive Country Suite Factory V1 for new country tool suites. Do not migrate existing accepted suites as part of creating a new country.
- Document any new country-specific patterns in the country spec and `docs/ai/CHANGELOG_AI.md`.
