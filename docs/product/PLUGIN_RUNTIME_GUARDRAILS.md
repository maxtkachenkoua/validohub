# Plugin Runtime Guardrails

Status: Active
Scope: Shared browser plugins used by multiple tool pages (for example country baseline suites).

## Why this exists

A single runtime error in a shared plugin can silently break many tool pages at once and force pages into generic fallback workbench UI.

Observed failure mode:

- Top-level config code (for example `tool()` setup) referenced a helper that was declared only inside `Plugin()` scope.
- Result: runtime `ReferenceError` during plugin initialization.
- User symptom: multiple pages render generic fallback controls instead of plugin-specific UI.

## Guardrails

- Scope rule: any helper used by top-level config builders (`tool()`, TOOLS map init, preset factories) must be declared in module scope before first use.
- Shadowing rule: do not reuse the same identifier for top-level helpers and inner `Plugin()` locals.
- Naming rule: prefer explicit helper names that encode intent (example: `edgeFixtureForKind`).
- Shared-risk rule: treat shared plugin files as blast-radius hotspots and test them first.

## Pre-release checks (required)

- Open at least one page per new plugin family and confirm no runtime `pageError`/`ReferenceError` is present.
- Hard reload (`Cmd+Shift+R`) each sampled page and verify plugin-specific controls render.
- Confirm page is not stuck in generic fallback workbench UI.
- Run full build and verify integrity checks pass.

## Triage playbook

If many pages suddenly look generic:

1. Check runtime errors for the shared plugin JS first.
2. Verify script asset loads and plugin registration runs.
3. Only then inspect YAML route metadata and generation artifacts.

## PR review checklist snippet

Copy into PR description when touching shared plugin code:

- [ ] Top-level helpers used by config init are defined in module scope.
- [ ] No helper name shadowing between module and `Plugin()` scopes.
- [ ] Runtime checked on at least one page per affected plugin family.
- [ ] Hard reload validated plugin-specific UI rendering.
- [ ] Full build integrity check passed.
