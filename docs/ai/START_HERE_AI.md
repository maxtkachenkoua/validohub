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
6. `docs/ai/AI_DEVELOPMENT_PROTOCOL.md`
7. The corresponding `docs/product/*_SPEC.md` for the workbench or area being changed

For Country Hub work, also read:

- `docs/ai/COUNTRY_HUB_AI_GUIDE.md`
- `docs/product/COUNTRY_HUB_DESIGN_GUIDE.md`
- `docs/product/COUNTRIES_ARCHITECTURE.md`
- `docs/product/COUNTRY_HUB_TEMPLATE_SPEC.md`

If the task may affect architecture, also read:

8. `docs/ai/ARCHITECTURE_GUARDRAILS.md`
9. `docs/ai/DECISIONS.md`
10. `docs/product/FUTURE_ARCHITECTURE_REFACTOR.md`

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
