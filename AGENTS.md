# AGENTS.md

Read this file first. Then immediately open `docs/ai/START_HERE_AI.md`.

Never begin implementation before reading the required Product Bible and AI documentation.

ValidoHub is the PRODUCT.

This repository owns:

- browser assets
- workbench framework
- browser plugins
- CSS
- JS
- UX
- Product Bible
- Workbench specifications

Developer tools belong here. Valido Engine is the platform and should be modified only for generic generation infrastructure.

## Localization Rule

Any new user-visible content, navigation label, UI chrome, page copy, tool card text, SEO shell text, or generated runtime copy must be localized for the production locales by default: `en`, `es`, `pt-BR`, `de`, `fr`, `pl`, and `uk`.

Do not add English-only visible copy and leave translation as a follow-up unless the user explicitly asks for an English-only experiment. Source generators, runtime JS, repair scripts, and localization audits should be updated in the same change so localized pages do not ship hybrid text.
