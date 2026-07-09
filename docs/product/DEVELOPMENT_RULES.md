# Development Rules

These rules are mandatory for future ValidoHub work.

## Product Bible First

- Before implementing any new workbench, read the Product Bible in `docs/product/`.
- Before changing an existing workbench, read that workbench's spec first.
- Every new workbench must have a product spec in `docs/product/` before implementation.
- Every completed workbench change must update its spec.

## Preserve Existing Quality

- Do not remove existing features unless explicitly requested.
- Do not replace production workbench behavior with placeholders.
- Do not add fake buttons, inactive controls, or "not available" UI.
- Tool pages are tool first, docs second.
- Documentation belongs below the interactive tool.

## Architecture Boundary

- New tools must live in ValidoHub assets, not Valido Engine.
- Valido Engine must remain generic.
- Do not add tool-specific JavaScript, CSS, or product behavior to Valido Engine.
- Do not change Engine unless the capability is truly generic and benefits future sites, not only ValidoHub.
- Prefer browser-only execution whenever possible.
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
