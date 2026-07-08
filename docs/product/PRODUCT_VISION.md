# ValidoHub Product Vision

ValidoHub is a professional developer tool platform.

It is not a documentation site that happens to include widgets. Each page must help a developer complete a real task quickly, confidently, and privately. Documentation exists to support the tool, not to compete with it.

## Product Principles

- Tool first, docs second.
- Browser-only execution whenever technically possible.
- No uploads for local utilities unless a future product spec explicitly justifies it.
- No fake controls, disabled promises, or "coming soon" actions on tool pages.
- Each page should feel useful within the first viewport.
- Every new tool must have a product spec before implementation.
- Base64 Encoder is the reference quality standard for future tools.

## User Promise

ValidoHub should feel fast, precise, and trustworthy:

- Input stays in the browser for browser-capable tools.
- Results are visible immediately.
- Validation errors are specific enough to fix the input.
- Copy, download, examples, keyboard flow, and mobile use are treated as core product behavior.

## Engine Boundary

Valido Engine must remain generic. It should generate static tool pages, route structures, and reusable shell behavior, but it must not become ValidoHub-specific product code.

Site-specific JavaScript, CSS, assets, and tool interaction logic should ultimately live in ValidoHub-owned assets, not inside the Engine.
