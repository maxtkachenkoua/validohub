# Development Rules

These rules are mandatory for future ValidoHub work.

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

## Preserve Existing Quality

- Do not remove existing features unless explicitly requested.
- Existing capabilities must never disappear accidentally.
- Do not replace production workbench behavior with placeholders.
- Do not add fake buttons, inactive controls, or "not available" UI.
- Prefer additive improvements.
- Preserve production quality.
- Tool pages are tool first, docs second.
- Documentation belongs below the interactive tool.
- Country Hubs must inherit the Brazil reference design unless the user explicitly approves a reusable architecture update.
- Do not invent a different Country Hub layout for each country.
- Complete country suites must not inherit another country's visible terms, group summaries, samples, or related-tool links. Long sample labels, result values, code blocks, and developer payloads must wrap or scroll locally and never create page-level horizontal overflow.
- Complete country suites must meet the fixed-regression bar from France, Netherlands, and Switzerland. A future country is not complete if any tool shows the plain generated "Run the tool" shell, a hybrid generic-plus-premium shell, oversized landing-hero typography on tool pages, a large empty textarea with generic buttons, red/error styling for passed validation, missing field breakdowns, missing quality notes, empty output/result placeholders, raw payloads inside sample dropdown labels, cross-country related-link leakage, foreign-country fallback copy, `[object Object]` text, empty lower-page info cards, icon-only/status-only country hub cards, or page-level horizontal overflow.
- Every country-scoped tool in every existing and future country must have a named field breakdown or equivalent detected-evidence breakdown. Field breakdown is a primary debugging surface, not decorative content. Generic result cards alone are not enough, including for broad CSV, JSON, API, data-quality, form-field, OCR, checklist, localization, privacy, IBAN, and identifier tools.
- Every country hub lower-page card/list renderer must normalize structured entries before display. Support `title`, `name`, `label`, `language`, `code`, `text`, `description`, and `note` shapes; never stringify objects into visible UI.
- Every future full-country suite and every new country-scoped standalone tool must run `npm run audit:country-suite` and build successfully before being called complete. The audit must guard factory shell mounting, compact tool-shell proportions, field breakdown presence across all countries, and country hub empty-card regressions.

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

## Validation Expectations

- Run Engine doctor against ValidoHub after content/config changes.
- Run publish after workbench asset changes.
- Browser-verify changed workbenches from the generated site.
- Run relevant JavaScript syntax checks for changed assets.
- Run Maven tests when Engine behavior may be affected, or when doing final validation.
