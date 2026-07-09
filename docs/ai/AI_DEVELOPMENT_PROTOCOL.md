# AI Development Protocol

This is the permanent AI contract for ValidoHub.

## Before Every Implementation

Always:

- Read `docs/ai/START_HERE_AI.md`.
- Read the Product Bible in `docs/product/`.
- Read `docs/product/CURRENT_STATE.md`.
- Read `docs/product/WORKBENCH_REGISTRY.md`.
- Read the corresponding `docs/product/*_SPEC.md`.
- Understand the existing implementation before changing it.

## Implementation Rules

Always:

- Prefer additive improvements.
- Reuse the existing Workbench Framework.
- Keep browser-only execution whenever possible.
- Keep the privacy-first philosophy.
- Validate before commit.
- Keep documentation synchronized with implementation.

Never:

- Remove existing features without explicit approval.
- Redesign UX without explicit approval.
- Modify Engine unless the change is generic.
- Duplicate framework logic.
- Introduce fake buttons.
- Break browser-only execution.
- Move product logic into Engine.

## Documentation Workflow

After every completed feature update, update documentation in this order:

1. The corresponding `docs/product/*_SPEC.md`
2. `docs/product/CURRENT_STATE.md`
3. `docs/product/WORKBENCH_REGISTRY.md`
4. `docs/ai/CHANGELOG_AI.md`

If architecture changed, also update:

5. `docs/ai/DECISIONS.md`
6. `docs/ai/ARCHITECTURE_GUARDRAILS.md`

Only then commit.

## Documentation Integrity

Documentation is part of the architecture.

The AI must treat documentation as first-class project artifacts.

If code and documentation disagree:

- Stop.
- Do not silently modify code.
- Do not silently modify documentation.
- Report the inconsistency.
- Ask which one is now the source of truth.

Never rewrite documentation merely because code changed. Never rewrite code merely because documentation is older. Require an explicit architectural decision.

## Regression Rule

Before modifying an existing Workbench:

- Read its specification.
- Preserve all documented capabilities.
- Preserve UX unless explicitly requested.

New functionality must be additive. Removing production features requires explicit approval.

When in doubt, preserve behavior.
