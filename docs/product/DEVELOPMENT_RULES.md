# Development Rules

These rules are mandatory for future ValidoHub work.

## Highest Priority Country Tool Rule

- For every country-scoped tool, the goal is to make the actual page Pix/CURP-level best-in-world to the maximum extent the format allows. This rule overrides older country-tool expectations that accepted generic/factory pages as sufficient. A country tool is not finished just because it has a route, a shared shell, a validator label, or a generic overlay. If the public format supports richer local/browser-checkable behavior, the page must implement that richness: custom UI, local JavaScript, parser/anatomy, generator, checksum/control/CRC replay, safe fixtures, batch/debug flows, copy/export output, official source links, concrete integration traps, and clear local-vs-official boundaries. If the format is genuinely limited, still make the page the best possible tool for that limited workflow, and do not fake unsupported semantics.

## Documentation Is Architecture

- Documentation is mandatory.
- Documentation is part of the architecture.
- Every feature update must update documentation.
- AI sessions must start with `docs/ai/START_HERE_AI.md`.
- If documentation and implementation disagree, stop and ask which source of truth is current.
- Do not silently rewrite documentation to match code.
- Do not silently rewrite code to match older documentation.

## Product Bible First

- Before implementing any new workbench, read the Product Bible in `docs/product/`.
- Before changing an existing workbench, read that workbench's spec first.
- Before changing a Country Hub, read `docs/ai/COUNTRY_HUB_AI_GUIDE.md`, `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`, `docs/product/COUNTRIES_ARCHITECTURE.md`, and `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`.
- Before generating a full country suite from scratch, also read `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md` and the current full-country suite specs such as `docs/product/FRANCE_PREMIUM_SUITE_SPEC.md` and `docs/product/NETHERLANDS_PREMIUM_SUITE_SPEC.md`.
- Every new workbench must have a product spec in `docs/product/` before implementation.
- Every completed workbench change must update its spec.
- Every completed workbench change must update `docs/product/WORKBENCH_REGISTRY.md` when capabilities, status, or source files change.
- Every completed feature change must update `docs/ai/CHANGELOG_AI.md`.

## Tool Inventory And Triage

- Country tool counts are value-driven, not quota-driven. One country may legitimately have 200 tools if its market has many high-value public formats, payment rails, tax workflows, registries, invoice formats, address/phone rules, and developer integration surfaces. Another country may legitimately have 2 tools if only 2 workflows are publicly checkable and useful. Both are correct when they are honest.
- Never pad a country with weak tools to make it look complete. Every visible tool must earn its place through real developer value: a public/spec-backed format, a common integration workflow, useful local validation/parsing/normalization/generation, safe fixtures, or an important official-boundary explanation.
- Treat generated country tools as raw inventory until triaged. A tool should be classified before being promoted: `flagship` for best-in-world labs, `structured` for useful parser/checksum/normalizer helpers, `boundary` for important but limited official/source-system guidance, or `hidden` for placeholders/filler that should not appear as a product tool.
- Hide or downgrade tools that are generic filler, country-name swaps, validators without public rules, helpers with no local workflow, fake samples, or pages that cannot do more than prove input presence. Do not let these inflate country counts or category counts.
- Country pages should eventually distinguish production-grade tools from limited helpers/reference utilities instead of presenting every generated artifact as equally valuable.
- Country search placeholders, suggestion chips, and local term hints must contain only real, commonly used, country-specific identifiers, payment rails, tax terms, registry terms, document names, or developer workflows. Do not invent acronyms or surface generated/filler terms for SEO. If a term is not a real local market concept or not useful enough for developers to search, do not show it in the country search UI. Search hints must also be route-bound: a hint may appear only when the country page has a corresponding tool route, or when a documented alias maps the local term to an existing route (for example a local tax acronym that is implemented by a VAT/tax-ID route).

## Preserve Existing Quality

- Do not remove existing features unless explicitly requested.
- Existing capabilities must never disappear accidentally.
- Do not replace production workbench behavior with placeholders.
- Do not add fake buttons, inactive controls, or "not available" UI.
- Prefer additive improvements.
- Preserve production quality.
- Every finished global tool and every finished country suite must target best-in-world usefulness for its specific workflow: match the strongest public competitor's meaningful capabilities, then add ValidoHub's richer browser-only diagnostics, field breakdowns, fixture generation, developer payloads, and official-boundary explanations wherever the domain supports them. Do not ship "premium" work that is merely nicer-looking than a basic validator.
- Gold/local flagship tools are mandatory best-in-world interactive specification labs. For every structured identifier, banking, payment, tax, registry, invoice, postal, phone, or local-market format, implement every local/browser-checkable function the public format or specification supports: validation, parsing, checksum/control/CRC replay, field anatomy, normalization, masking, safe fixture generation, batch/debug flows, copy-ready JSON/API/payload output, and concrete integration traps. If competitors expose meaningful capability, match it and add deeper ValidoHub diagnostics. If official existence, settlement, registry status, or ownership cannot be proven locally, state that boundary prominently instead of simulating it.
- Do not call an intermediate overlay, generic analyzer, or route-bound enhancement "Gold" unless the visible tool is already best-in-world for that workflow. Gold means bespoke maximum quality on the actual page: one connected lab, custom logic/UI where needed, source-backed behavior, complete local/browser-checkable functionality, rich samples, developer output, official-boundary clarity, and Pix/CURP/Spain-level polish. A shared overlay may be used only as triage or migration scaffolding and must not be presented as finished Gold.
- All tools must share the same recognizable ValidoHub product foundation: premium shell, compact hero, input/samples/actions, immediate result, breakdown, traps, official boundary, developer output, source links, copy/download states, and documentation hierarchy. This common base is for consistency only; it is not a functional limit. If a Gold/local flagship tool needs custom local JavaScript, CSS, parser logic, QR/payload generation, fixture generation, mode-specific UI, anatomy explorers, source-linked docs, repair/lint actions, batch debuggers, custom result cards, downloads, registry panels, or any other bespoke component of any complexity to become best in world, add that tool-specific enrichment in ValidoHub. Never reduce a rich local format to a weak generic/factory analyzer because the base shell is simpler.
- Brazil Pix is the current elite bespoke-tool reference for payment/payload workflows and for future Gold tools generally. Use its product pattern as the standard when deepening other valuable tools: one primary connected lab, visible Gold identity, no duplicate lower sandbox, input-driven evidence panels, generator/parser/debugger/source/traps working from the same state, and layout hardening so long payloads, tables, QR output, controls, and JSON scroll or wrap locally instead of widening the page.
- Pix-derived layout fixes are now mandatory for future Gold tools: analysis tables must fill their cards instead of leaving dead right-side space, raw values must be clipped/wrapped/scrolled inside their own cells or wrappers, Integration traps must use compact soft typography, and Developer Snapshot must sit after the human-readable diagnostics rather than interrupting the primary workflow.
- Gold tools must be designed so a developer who lands on the page can validate, generate, parse, debug, learn, copy/export, and verify official boundaries without needing another public tool for the same workflow. The competitive target is not "better than current ValidoHub"; it is "better than the strongest public alternatives for this exact format." Where official or primary sources exist, the page must link them near the relevant explanation and use them to justify claims.
- Every Gold/local flagship implementation must maintain an internal AI log under `docs/ai/gold-tools/` or the current documented successor location. The log is not user-facing marketing copy; it is project memory for future AI sessions. It must record why the tool exists, official/primary sources checked, competitor capability notes, required capabilities, implemented behavior, intentionally unsupported claims, sample cases, QA/build/audit notes, and open risks. A Gold tool is not complete if its AI log is missing or stale.
- Tool pages are tool first, docs second.
- Documentation belongs below the interactive tool.
- Country Hubs must inherit the Brazil reference design unless the user explicitly approves a reusable architecture update.
- Do not invent a different Country Hub layout for each country.
- Complete country suites must not inherit another country's visible terms, group summaries, samples, or related-tool links. Long sample labels, result values, code blocks, and developer payloads must wrap or scroll locally and never create page-level horizontal overflow.
- Complete country suites must meet the fixed-regression bar from France, Netherlands, and Switzerland. A future country is not complete if any tool shows the plain generated "Run the tool" shell, a hybrid generic-plus-premium shell, oversized landing-hero typography on tool pages, a large empty textarea with generic buttons, red/error styling for passed validation, missing field breakdowns, missing quality notes, empty output/result placeholders, raw payloads inside sample dropdown labels, cross-country related-link leakage, foreign-country fallback copy, `[object Object]` text, empty lower-page info cards, icon-only/status-only country hub cards, or page-level horizontal overflow.
- Every country-scoped tool in every existing and future country must have a named field breakdown or equivalent detected-evidence breakdown.
- Structured country values must expose segment anatomy wherever the format supports it: prefixes, body blocks, registry/type blocks, check/control digits, routing/account pieces, postal/phone/vehicle/date/amount parts, and display-only punctuation. Do not claim owner/status semantics without live official lookup; for free-text/data tools, show detected evidence slices instead of inventing hidden meaning.
- For country structured tools, the analyzer must be as local as the UI. National ID, social ID, company-register, VAT, EORI, and similar formats must expose field-level local meaning, checksum/control evidence when the format has it, pass/review pipeline checks, and useful debugger/developer output. Generic factory labels such as `identifier evidence`, `tax evidence`, `payment evidence`, or `workflow` are acceptable only for unfinished broad text-tool fallbacks, never for a finished premium ID/company/social/tax tool.
- Country tool samples must be clear example actions, not confusing review-only dropdowns. Use short buttons/chips such as `Valid sample`, `Grouped valid sample`, `Invalid sample`, `Short sample`, or a named edge case; never expose raw payloads or `Review sample` as the visible sample label for finished tools.
- Sample semantics must be executable, not decorative. A visible `Invalid sample`, `Short sample`, wrong-prefix, bad-checksum, or review/edge fixture must render a review/error result when inspected or validated. Never classify labels with a naive `/valid/` match because `Invalid` contains `valid`.
- Factory sample semantics must be carried in data, not inferred from copy alone. Sample buttons need an explicit review/valid intent, invalid fixture values must remain self-marking when pasted into batch/debug flows, and generator actions must not overwrite an active invalid/bad-prefix fixture with a newly generated valid value.
- Every country tool should expose multiple paste examples where the domain supports it: at minimum one success-first valid sample plus invalid, short, wrong-prefix/bad-country, bad-checksum, grouped, or edge samples as applicable. Samples must be loaded through clear chips/buttons with visible hover/focus/active states.
- Country tool related controls must navigate or clearly perform an action. Do not ship inert native select menus labelled "Samples and related tools"; related tools should be same-country links or explicit buttons with observable behavior.
- Every country/factory tool must include a compact context block after the hero and before advanced diagnostics or input. It should explain what the tool is for, where the format is used, what the browser checks locally, and which official/source-system boundary remains. This copy must be tool-specific, not generic filler.
- History, batch validation, API preview, raw JSON, and related workflow diagnostics are premium requirements, but they must not dominate the main input area. Keep them compact or collapsible while preserving PESEL-depth access.
- Success-first primary actions must not use red country accents. Red is reserved for review/error states; validation/generation buttons on valid workflows should use success/neutral styling even for red-flag countries.
- IBAN coverage requires both validation and generation. Maintain the global `iban-generator` and country-scoped `*-iban-generator` tools so developers can generate structural IBAN fixtures, replay MOD-97, inspect BBAN/check digits, and stay inside the browser-only official-boundary contract.
- IBAN generators must produce a fresh structural fixture on every `Generate` click. Reusing the same value after repeated clicks is a product bug. Country-scoped IBAN generators must infer the country from the country route and use local BBAN/sample context instead of falling back to the global default.
- IBAN generators must also respect invalid examples. Pressing `Generate` after choosing `Invalid sample`, `Short sample`, `Bad country prefix`, or any review fixture must show the review path for that fixture instead of silently generating a valid IBAN.
- Field/evidence breakdown sections must have one clear hierarchy. Do not stack duplicate headings such as `Evidence breakdown` immediately followed by `Identifier breakdown` before all fields. Token strips, segment tiles, and detailed cards need clear spacing, local wrapping, and enough padding so monospaced text never touches borders.
- Field/evidence breakdown values must remain readable across success/review states and localization. Do not use low-contrast white/light text on white cards; segment values, mini-card values, and token strips must keep dark text or a proven accessible accent with local wrapping.
- Quality notes must be tool-specific. Do not ship the same four generic cards everywhere. Quality notes should explain what this exact tool proves locally, what official/live boundary remains, fixture safety, and developer handling. Do not ship a separate generic “Repair suggestions” column in the advanced layer; use clear sample buttons and one centered replay/debugger surface instead.
- Copy actions must show a visible confirmation popover anchored above the button that triggered the copy. Do not use a quiet corner notice or a distant toast that makes users wonder which action copied.
- A successful validation/generation pipeline must be visually green end to end. Red/review cards are only for actual review/invalid states.
- Country hero clocks require a real IANA timezone such as `Europe/Helsinki`; placeholder values like `Europe local time zone` are forbidden because they silently remove the clock.
- Country hero clock data must be validated against `Intl.DateTimeFormat` before sign-off. Strings that merely look like `Area/Name` but are not real IANA zones, such as `territory/region`, must be rejected by the renderer or generator. New country batch generators must write a concrete city/business timezone for every country hub.
- Country civic snapshots must show 3-4 meaningful main cities with approximate population/context whenever the country has enough populated places. Do not fall back to a single capital plus `population varies by source` for full-premium countries; microstates may use main towns, quarters, or districts with honest labels.
- Country hub intent/category filters must expose a clearly visible selected state, not a text-only active class. The active chip needs enough contrast to be obvious on country-themed palettes and must keep `aria-pressed`/`aria-current` in sync with the visible selection.
- Advanced diagnostic sections must not duplicate the same local badge in parent and child headers. One badge per advanced container is enough.
- Every copy action in country/factory tools must provide visible feedback near the triggering control, preferably through the shared anchored toast/announcer. A silent `Copy` button is a UX regression because users cannot tell whether clipboard writes succeeded.
- Accepted bespoke country suites must keep the shared legacy rich layer enabled. Do not remove `country-legacy-rich-layer.js` from Brazil, Poland, France, or Netherlands mappings unless an explicit migration replaces it with equivalent PESEL-rich controls on every local tool page.
 Factory-based country suites must keep the native `csf-rich-lab` debug layer enabled in `country-suite-factory.js`. Do not add rich history/batch/API/raw-JSON controls as one-off per-country patches for Austria, Czechia, Norway, Sweden, Denmark, Finland, or future factory suites; improve the shared factory so every current and future factory country receives the same depth.
 Field breakdown is a primary debugging surface, not decorative content. Generic result cards alone are not enough, including for broad CSV, JSON, API, data-quality, form-field, OCR, checklist, localization, privacy, IBAN, and identifier tools.
- Every country hub lower-page card/list renderer must normalize structured entries before display. Support `title`, `name`, `label`, `language`, `code`, `text`, `description`, and `note` shapes; never stringify objects into visible UI.
- Every future full-country suite and every new country-scoped standalone tool must run `npm run audit:country-suite` and build successfully before being called complete. The audit must guard factory shell mounting, compact tool-shell proportions, field breakdown presence across all countries, and country hub empty-card regressions. `npm run build:country -- --country <slug>` is allowed for fast development loops after a prior full publish, but it must refresh the selected country hub and every local tool page under that country with current CSS/JS bundle links. A full `npm run build` remains the release gate.
- Country shape/location visuals must remain Brazil/Guyana-quality. Use real geometry sources or premium raster assets; never ship LLM-invented polygon blobs for full-premium countries. Raster country visuals are generated once, saved under `assets/images/countries/`, referenced from `countries/data/*.json`, and only copied by scoped builds. Visual cards may show only compact overlay labels such as `Country Shape` and `Location`; do not add large headings like `Official administrative outline`, `Geographic position...`, or bottom captions inside the cards. Assets must be tightly framed around the country silhouette or continent/location context, avoid empty side gutters, opaque side panels, and decorative noise, and use gradients/accent glow based on the national flag colors.
- Country raster visuals must be generated as two independent final assets: one country-outline image and one location-map image. Do not generate a paired/two-panel composite and crop it later. The outline asset must show the country silhouette only, tightly framed with minimal padding and national-flag color treatment. The location asset must show the continent/region as recognizable neutral-gray geography with only the target country highlighted; surrounding countries stay neutral. White/gray side gutters, vertical split panels, accidental neighboring-country highlights, satellite/terrain textures, text labels inside the image, and UI badges baked into the bitmap are regressions.
- Approved country visual baseline after Ghana/Kenya: use premium 3D raster artwork for finished country hubs. The outline asset should look like a raised tactile relief country cutout with beveled edges, soft cast shadow, realistic material texture, and national-flag color treatment. The location asset should look like a raised neutral-gray relief continent/region map with engraved borders, subtle terrain/material texture, one small tasteful pin if useful, and only the target country highlighted in its flag palette. Procedural/SVG-derived flat renders are acceptable only as temporary scaffolding, not as the finished premium standard.
- Existing country raster visuals are source assets once saved under `assets/images/countries/` and referenced from `countries/data/*.json`. Do not regenerate or replace existing country outline/location images during normal country builds, audits, generator runs, CSS fixes, tool fixes, or regional expansion work. Only regenerate country images when the user explicitly asks for image regeneration for specific countries or an approved visual QA task names those countries.
- Full-country generation must update the source generator and docs, not only generated HTML. If a new region/country batch is added, verify the country JSON, route registry, generated hub pages, and `/en/countries/` continent grouping in the same dev loop. Country-page scoped builds do not rebuild the Countries portal automatically.
- New premium country batches must ship with a dense local tool surface from the start. USA/Canada/Mexico and other high-demand countries require at least the current North America baseline of 61 browser-only local workbenches; smaller jurisdictions can reuse the same breadth but must not fake official checks or invented local algorithms.
- Country and global tool heroes must stay tool-first and compact. Do not render decorative acronym/logo tiles such as `DL`, `IBAN`, or `HDR` in the hero. Do not render a right-side `Examples`/related-links panel in the hero; sample buttons belong near the input and related workflows belong in the compact advanced/debug layer.
- Every country-scoped tool and every global tool must expose a compact developer time-saver block, currently named `Integration traps`, with 3-10 concrete mistakes to avoid: local/offline boundary confusion, wrong normalization/storage assumptions, missing negative fixtures, masked-output handling, and domain-specific runtime/official-system caveats. This block must be workflow-specific integration advice, not ValidoHub marketing copy and not repeated filler. A bank account tool, phone tool, tax ID tool, privacy scrubber, API payload auditor, and invoice helper should surface different failure modes that developers actually hit while wiring that exact workflow.

## Brand And Icon Rules

- Before adding or changing a visual identity, read `docs/product/BRAND_ASSET_SYSTEM.md` and `docs/product/BRAND_REGISTRY.md`.
- AI assistants must never independently decide which icon or logo to use.
- If a brand is missing, add a Brand Registry entry before using it visually.
- Use official visual identity when an organization, payment system, company, technology, framework, protocol, language, database, operating system, standard, API, or ecosystem has one and the asset can be legally used.
- Prefer tasteful monochrome SVG logos for documentation-grade UI.
- Use generic semantic icons only when no official branding exists or licensing prevents use.
- Do not redraw official logos from memory.
- Do not replace famous brands with generic icons.
- Avoid emoji icons in new production UI. Existing legacy emoji can remain until a deliberate visual-system pass replaces it.
- Use `brandKey` and the Brand Asset System renderer instead of page-specific icon logic.

## Architecture Boundary

- New tools must live in ValidoHub assets, not Valido Engine.
- Valido Engine must remain generic.
- Do not add tool-specific JavaScript, CSS, or product behavior to Valido Engine.
- Do not change Engine unless the capability is truly generic and benefits future sites, not only ValidoHub.
- Prefer browser-only execution whenever possible.
- Browser-only first.
- No backend, REST API, database, server-side rendering, Java execution, React, or Vue for browser-capable tools.

## Generated Output

- Generated output must not be committed.
- Do not edit files under `generated/validohub` by hand.
- Do not serve ValidoHub from the project root.
- Publish from Engine, then preview from `generated/validohub`.
- When `site.yaml` locale matrix changes, the build must prune stale generated locale directories before validation/deploy. Do not leave obsolete `generated/validohub/<locale>/` trees in place; they can ship dead languages, broken links, and stale UI. The global language switcher must list exactly the configured production locales and no removed/experimental locales.

## Validation Expectations

For any country described as full premium, `docs/product/PREMIUM_COUNTRY_CONTRACT.md` is mandatory and `npm run audit:country-premium -- --country <slug>` must pass before sign-off.

- Run Engine doctor against ValidoHub after content/config changes.
- Run publish after workbench asset changes.
- Browser-verify changed workbenches from the generated site.
- Run relevant JavaScript syntax checks for changed assets.
- Run Maven tests when Engine behavior may be affected, or when doing final validation.
