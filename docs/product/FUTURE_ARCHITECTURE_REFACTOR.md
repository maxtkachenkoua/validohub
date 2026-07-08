# Future Architecture Refactor

Valido Engine is feature-complete for the MVP and must stay generic.

The current Base64 browser workbench proves the product direction, but ValidoHub-specific JavaScript and CSS should not live in Valido Engine long term.

## Target Direction

Move site-specific assets into ValidoHub:

```text
validohub/
  assets/
    css/
    js/
    images/
    tools/
      base64/
      url-encoder/
```

The Engine should provide generic asset inclusion and static generation boundaries. ValidoHub should own product behavior, styling refinements, and tool-specific browser execution.

## Refactor Goals

- Keep Valido Engine reusable for other static tool sites.
- Let ValidoHub evolve quickly as a product.
- Avoid hardcoding ValidoHub tool behavior in Engine.
- Keep browser-only tool execution as site-owned assets where possible.
- Preserve static output and no-runtime architecture.

## Likely Future Work

- Add a generic Engine asset pipeline that copies site assets into generated output.
- Add generic asset references without inventing tool-specific DSL fields prematurely.
- Move Base64 JavaScript and CSS from Engine resources into `validohub/assets`.
- Define a product spec before each new tool implementation.
- Keep generated routes and content models stable unless an approved architecture change is created.

## Non-Goals

- No runtime backend.
- No REST API for browser-capable tools.
- No Java algorithm execution for tools that browser APIs can handle.
- No React, Vue, or runtime frontend framework requirement.
