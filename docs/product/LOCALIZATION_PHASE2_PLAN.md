# Localization Phase 2 Plan

Status: In progress

## Goals

- Prepare ValidoHub for scalable multi-locale expansion (30-50 locales) without changing URL structure.
- Keep locale as the first path segment.
- Keep route slugs stable and non-translated.

## Phase 2 scope (this kickoff)

- Enable initial locale set in site config: `en`, `pl`, `de`, `es`, `pt-BR`.
- Keep fallback behavior safe when translated pages are not yet generated.
- Add global language controls in header with country-official quick language buttons.

## Behavior contract

Priority order for language selection:

1. User explicit choice (saved preference)
2. URL locale
3. Browser locale
4. Country-official locale hints
5. Default locale (`en`)

## UX requirements

- Language switcher available from any page.
- Country pages show dedicated quick buttons for official language(s).
- If target locale page does not exist yet, keep user on current page and persist preference.

## Next implementation steps

1. Add locale-aware content packs for selected pilot locales.
2. Generate localized route variants for pilot locale set.
3. Emit hreflang alternates for all generated locale siblings.
4. Add translation completeness checks into build validation.
5. Expand locale matrix in waves based on traffic and country coverage.
