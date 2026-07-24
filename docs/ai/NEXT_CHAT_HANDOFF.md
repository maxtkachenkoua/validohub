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

- `/en/tools/` portal entry and search/category discoverability.
- Tool-specific premium shell matching Poland/Brazil quality.
- Multiple valid/invalid/edge/generator samples.
- Validation and generation together when users naturally search for both.
- Immediate result cards, field/component/token/byte breakdown, processing pipeline, quality notes, developer JSON/API preview, copy/download/history where useful.
- Domain depth beyond competitors: do not stop at a basic validator/converter if the public web has stronger capability.
- Browser-only/privacy boundary when possible.
- Scoped build/audit via `build:tools` and `audit:tools` during normal iteration.

## New Country Generation Rule

When asked to make a country full premium, do not make a thin suite. Generate as many meaningful local tools as the country supports. 60 tools is a density reference, not a cap and not a padding quota. If there are more high-quality local workflows, add more. If fewer genuinely useful offline/browser-only workflows exist, ship fewer but keep quality high.

For local markets, include generators in addition to validators wherever useful: identifiers, tax/company fixtures, IBAN/BBAN, phone, postal, invoice, payment, filing/reference numbers, test data, and other local developer workflows.

If a local format has richer requirements than the shared factory can model, add local enrichment for that tool rather than forcing it into a weak generic analyzer. Every finished tool should aim to be more useful than the best public competitor for that specific workflow.

## Europe Coverage Notes

Strict Europe excludes Russia and Belarus by product/political choice. Treat disputed or special territories deliberately rather than dumping them into Europe by accident. UK should be modeled as United Kingdom, with regional context/tools for England & Wales, Scotland, Northern Ireland, and Wales where useful. Republic of Ireland remains its own country. Northern Ireland is UK regional context, not a separate country.

## Known Current Work State

Recent work added/polished global tools, tools portal, homepage experiments, and Build Hardening V2. The ValidoHub worktree is intentionally dirty with active feature changes. Continue from current state; do not clean, reset, or revert. Generated output should not be committed.

Before final sign-off on any new task, run the smallest relevant scoped build and audit first. Only run full build as a release gate.

## 2026-07-24 Checkpoint Notes

- North America source suites have been expanded to the current 61-tool browser-only baseline and all 23 North America country sources have real IANA hero clock time zones plus 3-4 civic snapshot cities/towns. `/en/countries/` was rebuilt once so the North America group exists in generated output.
- Existing country raster visuals have already been generated and saved as source assets under `assets/images/countries/`. Do not regenerate or replace them during normal builds, audits, generator work, CSS fixes, or country/tool expansion. Only touch country images when the user explicitly asks for image regeneration for named countries.
- Do not assume all country raster visuals are accepted. France and United Kingdom were visually approved as the target feel; Guyana was approved after tight image-only cards with compact overlay labels. USA, Canada, and Mexico received newer checked source PNGs. Several earlier generated raster assets for other countries may still have bad framing, split-panel/gutter artifacts, wrong geometry, or weak continent context. The user explicitly paused image work; do not touch country images again unless asked.
- Country visual generation rule: create two independent final raster assets, not a two-panel composite. Outline image = tight country silhouette only, national-flag color treatment, minimal padding, no text baked into the bitmap. Location image = recognizable continent/region in neutral gray, only target country highlighted, no accidental neighboring highlights, no side gutters, no labels inside the bitmap. The page renderer provides only compact overlay labels `Country Shape` and `Location`.
- Known unresolved bug: some Europe pages can appear fully unstyled in local preview after scoped asset rebuilds. The likely cause is stale generated HTML linking an old deleted CSS bundle hash while the manifest points to the current bundle. Fix by refreshing generated page asset links or scoped rebuilding affected countries from source; do not hand-edit generated pages and do not run a full build unless the user asks.
- Scoped country builds mutate shared generated assets; run multiple country builds sequentially, not in parallel, to avoid shared JS/CSS copy races.
- During development, skip localization builds/tests unless the user explicitly asks for final/release validation. Prefer `--locales en` and portal-only scripts that do not rebuild all localization.
