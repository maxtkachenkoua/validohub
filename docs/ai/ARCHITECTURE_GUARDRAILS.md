# Architecture Guardrails

These boundaries are durable unless changed by an explicit architectural decision in `DECISIONS.md`.

## Valido Engine Boundary

Valido Engine is generic.

Engine responsibilities:

- Static site generation
- Routing
- Publishing
- SEO fields
- Sitemap
- Robots
- Search index
- Generic asset copying

Engine must never know about ValidoHub-specific tools or product behavior, including:

- Base64
- URL
- JSON
- JWT
- HTML
- XML
- CSV
- Regex
- Any future workbench implementation

Engine must not contain ValidoHub-specific JavaScript, CSS, plugin behavior, or product UX decisions.

## ValidoHub Boundary

ValidoHub owns:

- Browser assets
- Browser plugins
- Workbench Framework
- Product CSS
- Product JavaScript
- Tool UX
- Product Bible
- AI Operating System documentation

ValidoHub tools should run browser-only whenever possible. Input should stay local to the browser for browser-capable tools.

## Generated Output Boundary

The generated site root is `generated/validohub`.

Rules:

- Do not serve from the project root.
- Do not edit generated files by hand.
- Do not commit generated output.
- Publish first, then preview from `generated/validohub`.

## Architecture Change Rule

If a requested feature appears to require changing Engine, stop and ask:

- Is the change generic?
- Would another static tool site benefit?
- Can it be solved in ValidoHub assets instead?
- Does it require a new decision record?

If the change is ValidoHub-specific, keep it in ValidoHub.
