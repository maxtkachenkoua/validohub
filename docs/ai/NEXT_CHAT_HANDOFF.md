# Next Chat Handoff

This file is the compact project memory for a fresh AI chat. Read it after `AGENTS.md` and `docs/ai/START_HERE_AI.md` before changing ValidoHub.

## Current Product Direction

ValidoHub is a premium browser-only developer intelligence platform. The user wants every tool and country page to feel like a best-in-class product, not a generated utility. Poland and Brazil remain the visual and functional baseline: dense debugging, rich field breakdowns, strong local context, polished cards, and no generic filler.

The product goal is not only validation. Where the domain supports it, tools must also generate safe fixtures, explain structure, show debug internals, expose developer handoff data, and guide the user visually through what can be checked, generated, copied, or exported.

## Repository Boundary

- Work primarily in ValidoHub: `/Users/maxtkachenko/work/validohub`.
- Valido Engine is generic platform infrastructure only. Do not modify it for ValidoHub CSS, JS, UX, product pages, workbench behavior, or tool-specific logic.
- Always check `git status` in both ValidoHub and Valido Engine before implementation.
- Never revert user or previous-agent changes unless explicitly requested.

## Build Discipline

Use Build Hardening V2. Full builds are release gates, not the normal feedback loop.

Preferred loops:

- Portal/home/tools/countries shell: `npm run build:portal`.
- One country and its local tools: `npm run build:country -- --country <slug> [--locales en]`.
- Existing generated global tools: `npm run build:tools -- --slugs <slug-a>,<slug-b> [--locales en]`.
- Country audit: `npm run audit:country-premium -- --country <slug>`.
- Global tool audit: `npm run audit:tools -- --base http://127.0.0.1:<port> --slugs <slug-a>,<slug-b>`.

Only run `npm run build:full` / legacy `npm run build` when the user asks for a release gate or when new YAML routes must be materialized for the first time. After a route exists, use scoped rebuilds.

## Country Hub Contract

Every existing and future country must follow the same premium country system.

Required:

- Brazil-quality country hero with flag-color gradient background, real country shape, and real location map when data exists.
- No generic polygon placeholders for full-premium countries.
- Breadcrumb separators must be single slashes, not doubled.
- No obsolete official-language switch block if the site cannot switch to that state language.
- Hero clock must appear when the country has a valid IANA timezone. Placeholder values like `Europe local time zone` are forbidden.
- Country snapshot must be clean and compact: first row flag, official languages, capital; second row full-width main cities with city markers and populations. Do not duplicate currency/calling-code values already present in developer constants.
- Developer actions/constants remain their own block.
- Technical standards and lower-page cards must never be empty, icon-only, status-only, or `[object Object]`.
- Search placeholder and chips must include local market terms, not generic-only terms.
- Existing countries must not be degraded while adding new countries.

## Country Tool Contract

Every country tool must be premium, local, and debugger-rich.

Required:

- Tool-specific hero and a compact context/explanation block after hero and before advanced diagnostics/input. It must explain what the tool is, where it is used, what is checked/generated locally, and what official boundary remains.
- Multiple example chips/buttons: success-first valid sample plus invalid, short, bad prefix/wrong country, bad checksum, grouped, or edge samples where relevant.
- Sample labels must be clear. Do not show `Review sample` or raw payloads as labels on finished tools.
- Samples must be executable. Invalid/short/bad-prefix/bad-checksum examples must produce review/error results, never fake-green success.
- Never infer validity with a naive substring match like `/valid/`, because `Invalid` contains `valid`.
- Generator actions must not overwrite an active invalid/bad-prefix fixture with a valid generated value unless the user explicitly chooses a valid/generate path.
- Success states must be green/neutral end to end. Red is only for actual review/error.
- Validate/Generate primary buttons must not be red for successful workflows, even for red-flag countries.
- Every tool needs a field/evidence breakdown. This is one of the main debugging surfaces and is mandatory for all countries and all future tools.
- Local analyzers must be local. National IDs, company IDs, VAT, EORI, social numbers, IBAN/BBAN, vehicle, postal, invoice, payment, and tax formats need local structure, field meaning, checksum/control logic where available, and developer output. Generic cards like `identifier evidence`, `tax evidence`, `payment evidence`, and `workflow` are only acceptable for unfinished broad text fallbacks.
- Field breakdown hierarchy must be clear. Do not stack duplicate `Evidence breakdown` then `Identifier breakdown` headings before fields.
- Field tokens and cards need padding, wrapping, and readable contrast. No text touching borders. No white/light text on white cards.
- History, batch validation, API preview, raw JSON, and related workflows are premium features, but keep them compact/collapsible so they do not dominate the main input.
- Developer Snapshot/raw JSON blocks must have an in-block `Copy developer JSON` action next to the snapshot heading. Do not force users to scroll back to the main action row to copy the current structured output.
- Related tools must navigate or perform a visible action. No inert native selects labelled `Samples and related tools`.
- Advanced diagnostic sections must not duplicate the same local badge in parent and child headers.
- Remove generic repair-suggestion columns when they add no value. Prefer clear sample chips and one centered replay/debugger surface.
- Quality notes must be tool-specific and useful: what this exact tool proves locally, what official/live boundary remains, fixture safety, and developer handling.
- Copy actions must show a visible confirmation popover anchored above the button that triggered the copy.
- Buttons/chips need visible hover/focus/active states.
- Copy/download/API/raw JSON must use the current result, not stale fixture state.

## IBAN Contract

IBAN coverage requires both validation and generation.

- Keep a global IBAN validator and global IBAN generator.
- Add country-scoped IBAN generators where the country has meaningful IBAN/BBAN rules.
- Country IBAN tools must infer the country from the route and reject or clearly flag wrong-country IBANs.
- IBAN generators must generate a fresh structural fixture on every `Generate` click.
- Invalid, short, bad-country-prefix, and bad-checksum examples must stay review/error paths and must not silently generate a valid IBAN.
- IBAN debug output should include country prefix, MOD-97 check digits, BBAN/account body, grouping/masking, local BBAN field map where possible, and official-boundary notes.

## Generic Global Tools Contract

Global tools are first-class products, not utilities.

Required:

- Highest priority country-tool rule: every country-scoped tool must aim to become a Pix/CURP-level best-in-world page to the maximum extent its format allows. This overrides older assumptions that a generated route, generic factory page, or shared overlay is sufficient. If the format supports richer local/browser-checkable behavior, build that richer page with bespoke UI/JS/CSS, parser/anatomy, generation, checksum/control/CRC replay, safe fixtures, batch/debug flows, developer copy/export, official source links, workflow-specific traps, and explicit local-vs-official boundaries.
- `/en/tools/` portal entry and search/category discoverability.
- Tool-specific premium shell matching Poland/Brazil quality.
- Multiple valid/invalid/edge/generator samples.
- Validation and generation together when users naturally search for both.
- Immediate result cards, field/component/token/byte breakdown, processing pipeline, quality notes, developer JSON/API preview, copy/download/history where useful.
- Domain depth beyond competitors: do not stop at a basic validator/converter if the public web has stronger capability.
- Gold/local flagship tools must be best-in-world interactive specification labs. The user expects each flagship tool to test every locally checkable function supported by the public format/specification, not just validate a shape. Required depth includes checksum/control/CRC replay, parser/anatomy output, normalization/masking, safe valid/invalid/edge fixtures, batch/debug flows, copy-ready JSON/API/payload output, QR/payload generation where relevant, domain-specific integration traps, and explicit local-vs-official boundary notes. PESEL is the identifier reference; Brazil Pix is the payment/QR/payload reference; IBAN is the banking/spec-registry reference.
- Do not use "Gold" as a staged/migration label. The user explicitly corrected this: Gold must mean bespoke maximum quality immediately, not "overlay now, bespoke later." Shared route-bound overlays are allowed only as internal triage/scaffolding and must not be presented as finished Gold. A finished Gold page must visibly hit the Pix/CURP/Spain ID bar on the actual route.
- Every tool should start from the same recognizable ValidoHub foundation: premium shell, compact hero, input/samples/actions, immediate result, breakdown, traps, official boundary, developer output, source links, copy/download states, and documentation hierarchy. This common base is for consistency only, not a functional limit. If a flagship format needs custom ValidoHub JavaScript, CSS, parser logic, QR/payload generation, fixture generation, anatomy explorers, repair/lint actions, registry/source panels, downloads, mode-specific UX, or any bespoke component of any complexity to become best in world, add that local enrichment instead of forcing the tool into the generic shell.
- Gold/local flagship tools should be one-stop browser labs: users can validate, generate, parse, debug, learn the format while testing, copy/export developer output, and follow official source links without needing weaker competitor tools for the same workflow.
- For every Gold/local flagship tool, keep an internal AI log under `docs/ai/gold-tools/` or the current documented successor location. The log is project memory, not user copy. It must track why the tool exists, official/primary sources, competitor notes, implemented capabilities, unsupported/boundary claims, samples, QA commands, browser observations, and open risks. Do not call a Gold tool complete when this log is missing or stale.
- Browser-only/privacy boundary when possible.
- Scoped build/audit via `build:tools` and `audit:tools` during normal iteration.

## New Country Generation Rule

When asked to make a country full premium, do not make a thin suite. Generate as many meaningful local tools as the country supports. 60 tools is a density reference, not a cap and not a padding quota. If there are more high-quality local workflows, add more. If fewer genuinely useful offline/browser-only workflows exist, ship fewer but keep quality high.

For local markets, include generators in addition to validators wherever useful: identifiers, tax/company fixtures, IBAN/BBAN, phone, postal, invoice, payment, filing/reference numbers, test data, and other local developer workflows.

If a local format has richer requirements than the shared factory can model, add local enrichment for that tool rather than forcing it into a weak generic analyzer. Every finished tool should aim to be more useful than the best public competitor for that specific workflow.

Country tool inventory must be triaged by value. A country may have 200 visible tools if it has 200 genuinely useful public/spec-backed developer workflows, while another may have only 2. Generated tools are raw inventory until classified. Promote only tools with real value; downgrade or hide filler, country-name swaps, fake validators, weak helpers, or pages that cannot do more than input-presence checks. Future counts should distinguish flagship/structured tools from limited boundary/reference utilities.

Country search placeholders, suggestion chips, and local term hints must be real country-market terms only. Do not show invented acronyms, generated SEO filler, or terms that do not exist for that country. Use only commonly used local identifiers, payment rails, tax/registry/document names, and real developer workflows that users would naturally search. They must be route-bound too: every visible hint needs a corresponding country tool route, or a documented alias from the local market term to an existing route, so stale country metadata cannot advertise tools the page does not actually have.

Country tool search dropdowns must close naturally when the user clicks outside the search form, presses Escape, clicks Clear, or tabs/focuses away. Suggestions must not linger over the country page until Clear is pressed.

## Europe Coverage Notes

Strict Europe excludes Russia and Belarus by product/political choice. Treat disputed or special territories deliberately rather than dumping them into Europe by accident. UK should be modeled as United Kingdom, with regional context/tools for England & Wales, Scotland, Northern Ireland, and Wales where useful. Republic of Ireland remains its own country. Northern Ireland is UK regional context, not a separate country.

## Known Current Work State

Recent work added/polished global tools, tools portal, homepage experiments, and Build Hardening V2. The ValidoHub worktree is intentionally dirty with active feature changes. Continue from current state; do not clean, reset, or revert. Generated output should not be committed.

Before final sign-off on any new task, run the smallest relevant scoped build and audit first. Only run full build as a release gate.

## 2026-07-27 Gold Tools Overlay State

- Shared Gold overlay source: `assets/js/tools/gold-tools-lab.js`.
- Current profile count: 281 route-bound profiles.
- Pix, Mexico CURP, and Spain ID remain the bespoke reference-quality pages. The shared overlay is the broad strong layer below those pages.
- Round 3 added 171 strong Gold profiles for postal codes, phone/E.164, BIC/SWIFT, passport-like document numbers, vehicle plates, invoice/payment/bank references, postal tracking, customs references, and procurement identifiers.
- New analyzer families include `bic`, `phone-local`, `postal-local`, `passport-lite`, `vehicle-plate`, and structured reference analyzers.
- Route-specific Gold overlay overrides exist for selected older Poland/Brazil standalone routes whose algorithm IDs are not country-suite IDs. Keep these narrow unless a whole legacy class is audited.
- QA/log: `docs/ai/gold-tools/ROUND3_STRONG_GOLD_EXPANSION_LOG.md`.
- Latest verified checks: JS/build-script syntax, VM replay of all 281 valid/invalid fixtures, generated route existence, script injection, and generated runtime asset sync. No full build was run.

## 2026-07-24 Checkpoint Notes

- North America source suites have been expanded to the current 61-tool browser-only baseline and all 23 North America country sources have real IANA hero clock time zones plus 3-4 civic snapshot cities/towns. `/en/countries/` was rebuilt once so the North America group exists in generated output.
- Existing country raster visuals have already been generated and saved as source assets under `assets/images/countries/`. Do not regenerate or replace them during normal builds, audits, generator work, CSS fixes, or country/tool expansion. Only touch country images when the user explicitly asks for image regeneration for named countries.
- Do not assume all country raster visuals are accepted. France and United Kingdom were visually approved as the target feel; Guyana was approved after tight image-only cards with compact overlay labels. USA, Canada, and Mexico received newer checked source PNGs. Several earlier generated raster assets for other countries may still have bad framing, split-panel/gutter artifacts, wrong geometry, or weak continent context. The user explicitly paused image work; do not touch country images again unless asked.
- Country visual generation rule: create two independent final raster assets, not a two-panel composite. Outline image = tight country silhouette only, national-flag color treatment, minimal padding, no text baked into the bitmap. Location image = recognizable continent/region in neutral gray, only target country highlighted, no accidental neighboring highlights, no side gutters, no labels inside the bitmap. The page renderer provides only compact overlay labels `Country Shape` and `Location`.
- Resolved visual debt: the known broken 887x887 paired-composite `*-outline.png` assets were replaced with standalone 1254x1254 country-shape PNGs for Albania, Andorra, Austria, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czechia, Denmark, Estonia, Finland, Greece, Hungary, Iceland, Ireland, Japan, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, North Macedonia, Norway, Romania, San Marino, Serbia, Slovakia, and Vatican City. Location PNGs were not touched. The 31 materialized routes were rebuilt sequentially with `build:country -- --country <slug> --locales en`; Japan's source PNG was repaired, but Japan is not currently in the source route registry.
- Resolved bug: some generated country pages, especially older Europe/South America preview pages, could appear fully unstyled after scoped asset rebuilds because their HTML still linked an old deleted CSS/JS bundle hash. Scoped `build:country`, `build:portal`, and `build:tools` now refresh generated HTML bundle links across the existing generated preview tree after recompiling shared hashed assets. Do not hand-edit generated pages and do not run a full build unless the user asks.
- Scoped country builds mutate shared generated assets; run multiple country builds sequentially, not in parallel, to avoid shared JS/CSS copy races.
- During development, skip localization builds/tests unless the user explicitly asks for final/release validation. Prefer `--locales en` and portal-only scripts that do not rebuild all localization.


## Ghana/Kenya-Approved Country Visual Baseline

Finished country hubs must use premium 3D raster country visuals, not flat procedural/SVG-derived scaffolds. The outline asset is a single raised tactile relief country cutout with national-flag color treatment, bevels, texture, tight framing, and no text. The location asset is a separate raised neutral-gray relief continent/region map with engraved borders, only the target country highlighted in flag colors, and at most one tasteful pin. Baked labels, UI badges, split panels, gutters, satellite textures, neighboring-country highlights, and invented polygon blobs are regressions.

## 2026-07-25 All-Country Baseline Checkpoint

- Country source/data/image coverage is now aligned at 194 country slugs: Asia 48, Europe 43, Africa 54, North America 23, South America 12, Oceania 14. Russia and Belarus remain intentionally excluded by product decision.
- Africa country shape/location source PNGs were regenerated into the Ghana/Kenya-approved premium 3D raster style. Do not replace them with procedural/SVG-derived scaffolds.
- Full Oceania source coverage exists for Australia, Fiji, Kiribati, Marshall Islands, Micronesia, Nauru, New Zealand, Palau, Papua New Guinea, Samoa, Solomon Islands, Tonga, Tuvalu, and Vanuatu, with premium outline/location PNGs.
- United States outline/location PNGs were regenerated with explicit stars-and-stripes treatment. Canada and Mexico must remain neutral in the USA location asset.
- North America now has YAML source manifests for all 23 generated country suites; do not regress back to data-only source coverage.
- Hero visual images use contain-style fitting with a warm studio frame so wide island/archipelago assets remain visible instead of cropped.
- Verification completed with scoped commands only: final Africa country builds/audits, all Oceania country builds/audits, United States build/audit, Fiji post-CSS build/audit, `build:portal -- --locales en`, and `audit:country-suite` passed. No full build was run.
- Future content-quality work remains: the factory baseline still gives many countries similar category/tool-count distributions. The user explicitly wants all countries present first, then local tool depth/realism fixed continent by continent.

## 2026-07-26 Approved Premium Site Baseline

- The user approved the current ValidoHub revision as the top visual/product baseline and explicitly asked to commit and push it as the rollback point if future iterations regress.
- This baseline includes the all-country source/data/image coverage, premium Ghana/Kenya-style raster country visuals, Africa/Oceania/USA visual pass, and the Countries Portal interactive neutral world map.
- The accepted Countries Portal map standard is: calm neutral atlas at rest, no square/diamond/flag fallback markers, hover/focus shows a premium raster mini-card using the saved `assets/images/countries/*-outline.png` asset, click/Enter opens the country hub, and active SVG geography receives only a restrained outline/glow. Do not reintroduce bright all-country flag fills or flat SVG flag painting as the primary visual effect.
- Current known limitation: the base world SVG geometry is simplified Natural Earth-style atlas data. Cosmetic CSS can soften active contours, but truly more detailed country outlines require a deliberate high-detail atlas asset pipeline rather than ad hoc path edits.
- Treat the commit containing this checkpoint as the approved recovery baseline before large country-tool realism, atlas, or content-depth refactors.

## 2026-07-26 Gold Tools Lab V1 Checkpoint

- A first Gold Tools Lab overlay exists at `assets/js/tools/gold-tools-lab.js` for flagship local-market tools. It is additive and ValidoHub-owned; Valido Engine was not changed. Brazil Pix is intentionally excluded from the shared overlay because it has a bespoke Gold runtime.
- The overlay adds source links, valid/invalid fixtures, fixture generation, local analysis, field/anatomy evidence, batch replay, integration traps, official-boundary notes, and developer JSON. It preserves existing bespoke PESEL, Spain ID, legacy-rich, and Country Suite Factory behavior; Pix uses its own full-page runtime.
- Build wiring exists in `scripts/build-all.mjs` and scoped `scripts/build-country-dev.mjs`. Standalone PESEL receives `gold-tools-lab.js`; standalone Pix deliberately does not, because `pix.js` owns the complete Gold page.
- Important Pix correction: do not interpret “remove the duplicate Gold overlay” as “remove Gold from Pix.” Pix must visibly remain `Brazil PIX Gold Workbench` / `Gold Browser Lab`, with a connected Gold status strip driven by the same input as QR generation, TLV parsing, CRC replay, developer JSON, source links, and integration traps.
- AI memory lives under `docs/ai/gold-tools/`. Keep `docs/ai/gold-tools/INDEX.md` and `ROUND1_IMPLEMENTATION_LOG.md` current before calling any Gold deepening complete.
- Verification already run without full build: `node --check` for the overlay/build scripts, sequential scoped country builds, route-profile existence check, representative script injection greps, browser smoke for Brazil Pix / Poland PESEL / India PAN, and `audit:country-premium` for Brazil, Poland, India, and United States.
- Next product work should deepen exact public algorithms and official-source panels profile by profile. Do not add more filler tools or fake “Gold” labels; the user wants fewer but truly valuable tools where necessary.

## 2026-07-26 Brazil Pix Bespoke Gold V2

- Brazil Pix is the first flagship promoted beyond the shared overlay into a bespoke Gold runtime. Source: `assets/js/tools/pix.js`; spec: `docs/product/PIX_WORKBENCH_SPEC.md`; AI log: `docs/ai/gold-tools/BRAZIL_PIX_GOLD_LOG.md`.
- Added BR Code formatting, deliberate bad-CRC fixtures, safe-fixture diff, nested TLV paths, offsets, raw TLV segments, CRC replay input, implementation lint, official BCB/source links, and Pix-specific integration traps.
- Restored visible Gold identity inside the main Pix runtime after user feedback: the page now has Gold naming and an input-driven `Connected PIX evidence` strip while still avoiding the old duplicate lower overlay.
- Locked in the accepted Pix polish baseline after browser QA: `Payload Diff Against Safe Fixture` and `BR Code EMV TLV Explorer` tables must fill their analysis cards, long payload/TLV/JSON values must stay contained locally without page-level horizontal overflow, and Integration traps must use compact softer supporting typography. Future bespoke Gold tools should copy this connected layout discipline.
- `build:country` now copies standalone Gold runtimes for Brazil (`pix.js`) and Poland (`pesel.js`) so scoped country builds do not leave stale generated standalone runtime files.
- Verified with `node --check assets/js/tools/pix.js`, `node --check scripts/build-country-dev.mjs`, `npm run build:country -- --country brazil --locales en`, `npm run audit:country-premium -- --country brazil --locales en`, and browser smoke for valid BR Code plus bad-CRC flows.

## 2026-07-26 Mexico CURP Bespoke Gold V1

- Mexico CURP is the next flagship promoted beyond the shared Gold overlay. Source: `assets/js/tools/mexico-suite.js`; spec: `docs/product/MEXICO_CURP_WORKBENCH_SPEC.md`; AI log: `docs/ai/gold-tools/MEXICO_CURP_GOLD_LOG.md`.
- The bespoke lab mounts only on `mexico-curp-validator` and marks itself with `data-gold-lab`, so `gold-tools-lab.js` skips the duplicate lower sandbox.
- Implemented CURP normalization, public anatomy parsing, calendar/date and age estimate, sex marker, official state/entity code mapping, homoclave/century inference as local evidence, weighted check-digit replay, safe fixture generation, batch replay, source/boundary copy, Integration traps, and Developer Snapshot JSON.
- Important fixture correction: `GODE561231HDFRRN00` is the safe valid fixture; the older generated `GODE561231HDFRRN09` is a bad-digit sample and must not be reused as valid.
- Verified with `node --check assets/js/tools/mexico-suite.js`, `node --check assets/js/tools/gold-tools-lab.js`, `npm run build:country -- --country mexico --locales en`, browser smoke on `/en/mexico/mexico-curp-validator/`, and `npm run audit:country-premium -- --country mexico --locales en` (61 tools, 0 blockers, 0 warnings).

## 2026-07-27 Bespoke Gold Layout Polish Baseline

- Pix/CURP layout fixes are now explicit product rules in `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md`.
- Future Gold tools must avoid hover/focus layout jumps: do not use vertical `translateY` hover motion inside dense button/chip/control rows; use contained color, border, and inset-shadow states instead.
- Dense fixture generators must use stable responsive grids. Five-field forms should be balanced as `3 + 2` or another deliberate layout instead of `4 + 1`; action rows need real spacing from the card above.
- Date-dependent fixture generators need a real browser date picker or clear date control. Tiny closed choices should use segmented controls when appropriate.
- Developer Snapshot blocks need a nearby `Copy developer JSON` action with visible feedback and clipboard fallback.
- Long identifiers, payloads, tables, code blocks, generated artifacts, and JSON must wrap or scroll locally and never widen the page.

## 2026-07-27 Spain ID Bespoke Gold V1

- Spain DNI/NIE/NIF/CIF has been promoted from legacy rich / overlay candidate into a bespoke Gold runtime. Source: `assets/js/tools/spain-id.js`; spec: `docs/product/SPAIN_ID_WORKBENCH_SPEC.md`; AI log: `docs/ai/gold-tools/SPAIN_ID_GOLD_LOG.md`.
- The standalone lab marks itself with `data-gold-lab` so `gold-tools-lab.js` must not mount a duplicate lower sandbox.
- Route-specific build hardening is required for this class of tool: the generated `/en/spain/spain-id-validator/` page is still materialized from `validohub.spain-suite`, so scoped and full builders postprocess the route to remove `gold-tools-lab.js` and append `spain-id.js`.
- Implemented local DNI/NIE modulo-23 replay, NIE X/Y/Z prefix mapping, legal-entity NIF / legacy CIF weighted control digit/letter replay, entity-prefix context, VAT-prefix normalization, safe DNI/NIE/CIF fixture generation, sample chips, batch replay, anatomy table, official-source/boundary panel, Spain-specific Integration traps, and Developer Snapshot JSON copy.
- Official boundary remains strict: local pass does not prove identity, document authenticity, taxpayer status, company registration, VIES status, ownership, or official assignment.
- Verified with syntax checks, `build:country -- --country spain --locales en`, generated HTML script grep, browser smoke, and `audit:country-premium -- --country spain --locales en` passing `full-premium-ready`.

## 2026-07-27 Gold Tools Round 2 Flagship Expansion

- Shared Gold overlay coverage now contains 110 route-bound profiles in `assets/js/tools/gold-tools-lab.js`.
- The overlay remains broad triage, not a substitute for bespoke Pix/CURP/Spain-class runtimes. Promote a tool to bespoke only when it can justify a dedicated UX/parser/spec log.
- Newly deepened browser analyzers include South Africa ID, Turkey TCKN, Israel Teudat Zehut, Portugal NIF, Croatia OIB, Czech ICO, Greece AFM, Ecuador cedula, Uruguay cedula, and Kenya KRA PIN.
- Shape/boundary families for PAN, GSTIN, Aadhaar, payment aliases, date-coded national IDs, and structured tax/registry identifiers now show more specific anatomy and official-boundary output.
- Build wiring was synchronized in scoped and full builders. The expanded country set was rebuilt sequentially with `npm run build:country -- --country <slug> --locales en`; no full build was run.
- Verification completed: JS syntax checks, 110/110 valid fixture PASS, 110/110 invalid fixture REVIEW, 0 missing profile routes, and 0 missing shared scripts except the deliberate Spain bespoke route.
- See `docs/ai/gold-tools/ROUND2_FLAGSHIP_EXPANSION_LOG.md` for the detailed AI trace.
