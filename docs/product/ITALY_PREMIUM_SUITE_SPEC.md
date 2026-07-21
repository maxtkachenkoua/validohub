# Italy Premium Country Suite

Italy is the third future-country suite to consume Country Suite Factory V1 from the start. It follows the Poland/Brazil presentation bar and the Germany/Switzerland factory implementation path without modifying Valido Engine.

## Scope

- Country hub source: `countries/data/italy.json`
- Country registration: `countries/italy.yaml`
- Runtime: `assets/js/tools/italy-suite.js`
- Tool count: 60 active Italy-specific workbenches under `tools/italy-*.yaml`
- Shared shell: `assets/js/tools/country-suite-factory.js`

## Product Rules

- Italy has one global country hub plus country-specific tools for codice fiscale, Partita IVA, VAT, EORI, SDI, PEC, REA, ATECO, SPID/CIE boundaries, Italian IBAN, ABI/CAB, BIC, SEPA, Ri.Ba, pagoPA, FatturaPA, VAT/accounting workflows, addresses, phone, CAP, province/comune codes, privacy, documents, vehicles, customs, postal, and developer-data workflows.
- The suite uses Country Suite Factory V1 additively. Brazil, Poland, France, and Netherlands are not migrated or imported into the factory.
- Every Italy workbench uses the compact Brazil-scale country rhythm: branded header, short samples, immediate result cards, validation pipeline, dedicated field breakdown, quality notes, advanced developer payload, local wrapping, copy, and download.
- Field breakdown is mandatory on every Italy tool, including broad CSV, JSON, API, data-quality, privacy, OCR, checklist, and form helpers. Broad tools expose detected Italian evidence slices instead of generic cards only.
- Runtime localization covers every supported ValidoHub locale for shell controls, state labels, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
- Offline tools must state proof boundaries clearly. Agenzia Entrate, VIES, Registro Imprese, SDI, PEC delivery, bank directories, customs, PRA/Motorizzazione, carrier status, and identity proof are official-system checks, not browser proofs.

## Official Reference Baseline

- Agenzia delle Entrate: codice fiscale, Partita IVA, VAT returns, and fiscal context.
- Sistema di Interscambio: FatturaPA delivery, recipient code, and e-invoicing handoff context.
- Registro Imprese: company existence, REA, legal status, and registry boundaries.
- Banca d'Italia / banking directories: ABI/CAB, payments, and institution reference data.
- Agenzia delle Dogane e dei Monopoli: EORI and customs-status boundaries.
- Motorizzazione / PRA: vehicle registration and ownership boundaries.

## Runtime Localization

The factory-based runtime provides a suite-level i18n dictionary for all supported locale routes: `en`, `pl`, `de`, `es`, `pt-BR`, `fr`, `it`, `nl`, `pt-PT`, `cs`, `sk`, `uk`, `tr`, `ro`, `hu`, `sv`, `no`, `fi`, `da`, `ja`, `ko`, `zh-CN`, `zh-TW`, `ar`, `he`, `hi`, `id`, `vi`, `th`, and `ms`.

Deep editorial country hub localization still uses the existing ValidoHub localization pass. The Italy-specific interactive workbench runtime must not hard-code English-only controls except official acronyms, sample identifiers, protocol names, and code literals.
