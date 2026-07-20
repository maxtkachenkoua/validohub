# Start Here AI

This is the entry point for every AI session working on ValidoHub.

Do not rely on prior chat history. Treat repository documentation as the source of project memory.

If you arrived here from the repository root, keep `AGENTS.md` in mind as the canonical short entrypoint. If you did not read it yet, read `AGENTS.md` now.

## Mandatory Reading Order

Read in this order before implementation:

1. `docs/ai/START_HERE_AI.md`
2. `docs/product/PRODUCT_VISION.md`
3. `docs/product/CURRENT_STATE.md`
4. `docs/product/DEVELOPMENT_RULES.md`
5. `docs/product/WORKBENCH_REGISTRY.md`
6. `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md`
7. `docs/ai/AI_DEVELOPMENT_PROTOCOL.md`
8. The corresponding `docs/product/*_SPEC.md` for the workbench or area being changed

For visual identity, logo, icon, or brand work, also read:

- `docs/product/BRAND_ASSET_SYSTEM.md`
- `docs/product/BRAND_REGISTRY.md`

For Country Hub work, also read:

- `docs/ai/COUNTRY_HUB_AI_GUIDE.md`
- `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`
- `docs/product/COUNTRIES_ARCHITECTURE.md`
- `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`
- `docs/product/POLAND_COUNTRY_HUB_GOLD_STANDARD.md`
- `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md`
- `docs/product/COUNTRY_SUITE_FACTORY_SPEC.md`
- `docs/product/FRANCE_PREMIUM_SUITE_SPEC.md`, `docs/product/NETHERLANDS_PREMIUM_SUITE_SPEC.md`, `docs/product/SWITZERLAND_PREMIUM_SUITE_SPEC.md`, and `docs/product/GERMANY_PREMIUM_SUITE_SPEC.md` when generating or expanding a full country suite from scratch

For future full-country suites and standalone country-scoped tools, treat the fixed-regression bar in `docs/product/DEVELOPMENT_RULES.md` and `docs/product/COUNTRY_SUITE_GENERATION_GUARDRAILS.md` as mandatory acceptance criteria. Do not call a country complete if it repeats any previously fixed issue: generic "Run the tool" shell, hybrid shell, oversized tool UI, red success states, missing field breakdown, `[object Object]`, empty cards, icon-only/status-only lower cards, raw sample labels, foreign fallback copy, cross-country related links, or horizontal overflow. Field breakdown is required in every country because it is one of the main debugging surfaces.

For generic, non-country tools, the gold standard is not a simple utility page. Read `docs/product/GENERIC_WORKBENCH_GOLD_STANDARD.md` and treat Poland/Brazil premium workbenches as the visual and functional baseline.

If the task may affect architecture, also read:

9. `docs/ai/ARCHITECTURE_GUARDRAILS.md`
10. `docs/ai/DECISIONS.md`
11. `docs/product/FUTURE_ARCHITECTURE_REFACTOR.md`

## Continuing Unfinished Work

Before continuing unfinished work:

- Check `git status`.
- Read the relevant spec and current implementation.
- Preserve existing behavior unless the user explicitly asks to change it.
- Do not infer missing architectural decisions from chat memory.
- If documentation and implementation disagree, stop and report the inconsistency.

## Engine Modification Rule

ValidoHub is the product.

If you are asked to implement a developer tool, browser feature, UX improvement, Workbench, plugin, browser behavior, or product capability, it almost certainly belongs in ValidoHub, not in Valido Engine.

Valido Engine may be modified only when the change is truly generic and benefits future static tool sites. Never modify Engine for ValidoHub-specific workbench behavior, product CSS, product JavaScript, or tool-specific logic.

Always verify before modifying Engine.

## Validation Expectations

For ValidoHub work, validate from the generated site:

- Run Engine doctor against `site.yaml`.
- Run publish.
- Serve from `generated/validohub`, never from the project root.
- Browser-verify changed workbenches.
- Confirm `generated/` was not committed.

For documentation-only work:

- Run `git diff`.
- Confirm only documentation files changed.
- Do not run publish unless documentation explicitly affects generated content.

## Commit Expectations

- Make small, logical commits.
- Commit only files in scope.
- Keep generated output out of commits.
- Update documentation before committing completed feature work.
