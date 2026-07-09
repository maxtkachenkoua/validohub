# Future Architecture Refactor

Valido Engine is feature-complete for the MVP and must stay generic.

Phase 4 is complete. ValidoHub-specific JavaScript and CSS now live in ValidoHub, not in Valido Engine.

## Completed Phase 4 Outcome

- Site-specific assets moved to `validohub/assets`.
- The browser-side Workbench Framework lives in `assets/js/workbench`.
- Tool plugins live in `assets/js/tools`.
- Valido Engine copies site-owned assets into generated output.
- Valido Engine no longer contains Base64, URL, or JSON implementation logic.
- Generated routes and content models stayed stable.
- Future tools should not require Engine changes unless the change is truly generic.

## Target Direction

Keep site-specific assets in ValidoHub:

```text
validohub/
  assets/
    css/
    js/
      workbench/
      tools/
```

The Engine should provide generic asset inclusion and static generation boundaries. ValidoHub should own product behavior, styling refinements, and tool-specific browser execution.

## Refactor Goals

- Keep Valido Engine reusable for other static tool sites.
- Let ValidoHub evolve quickly as a product.
- Avoid hardcoding ValidoHub tool behavior in Engine.
- Keep browser-only tool execution as site-owned assets where possible.
- Preserve static output and no-runtime architecture.

## Remaining Future Work

- Add generic asset references without inventing tool-specific DSL fields prematurely.
- Define a product spec before each new tool implementation.
- Keep generated routes and content models stable unless an approved architecture change is created.
- Continue moving product decisions into ValidoHub docs and assets, not Engine.

## Non-Goals

- No runtime backend.
- No REST API for browser-capable tools.
- No Java algorithm execution for tools that browser APIs can handle.
- No React, Vue, or runtime frontend framework requirement.
