# Decisions

Append new decisions. Never rewrite history.

Each decision should include:

- Decision
- Reason
- Alternatives considered
- Consequences
- Status

## Decision: Valido Engine Remains Generic

Reason:

Valido Engine should be reusable for static tool sites beyond ValidoHub. Product-specific behavior would make Engine harder to evolve and harder to trust as infrastructure.

Alternatives considered:

- Put browser workbench behavior in Engine templates.
- Add tool-specific switches to Engine.

Consequences:

- ValidoHub must own its browser assets and workbench plugins.
- Future tools should not require Engine changes unless a generic platform capability is missing.

Status:

Accepted.

## Decision: ValidoHub Owns Browser Workbench Assets

Reason:

Base64, URL, JSON, and future tools are ValidoHub product behavior. They need fast iteration without making Engine product-specific.

Alternatives considered:

- Keep workbench JavaScript and CSS inside Engine resources.
- Add DSL fields for every tool interaction.

Consequences:

- Workbench Framework lives in `assets/js/workbench/`.
- Tool plugins live in `assets/js/tools/`.
- Product styling lives in `assets/css/`.
- Engine copies site-owned assets into generated output.

Status:

Accepted.

## Decision: Documentation Is Part Of Architecture

Reason:

Future AI sessions must be able to continue development without chat history. Product decisions, guardrails, and workflows must live in the repository.

Alternatives considered:

- Rely on chat history.
- Rely only on code inspection.

Consequences:

- Every completed feature update must update relevant documentation.
- Documentation and implementation disagreements must stop work until resolved.
- Product specs are required before new workbench implementation.

Status:

Accepted.
