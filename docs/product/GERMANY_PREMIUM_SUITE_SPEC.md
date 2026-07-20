# Germany Premium Country Suite

Germany is the second future-country suite to consume Country Suite Factory V1 from the start. It must keep the Poland/Brazil content bar while proving that a country with an existing generic IBAN route can graduate to a full premium factory suite without falling back to the generic shell.

## Scope

- Country hub source: `countries/data/germany.json`
- Country registration: `countries/germany.yaml`
- Runtime: `assets/js/tools/germany-suite.js`
- Tool count: 60 active Germany-specific workbenches under `tools/german-*.yaml` plus `tools/germany-iban-validator.yaml`
- Shared shell: `assets/js/tools/country-suite-factory.js`

## Product Rules

- Germany has one global country hub plus country-specific tools for IdNr, Steuernummer, USt-IdNr, EORI, Handelsregister, LEI, German IBAN, BLZ, BIC, SEPA, XRechnung, ZUGFeRD, DATEV, GoBD, SKR03/SKR04, payroll, VAT, address, phone, postal codes, documents, vehicles, privacy, and developer-data workflows.
- The suite uses Country Suite Factory V1 additively. Brazil, Poland, France, and Netherlands are not migrated or imported into the factory.
- The existing Germany IBAN route is upgraded into the Germany suite and must not be replaced by the generic utility workbench during post-processing.
- Every Germany workbench uses the compact Brazil-scale country rhythm: branded header, short samples, immediate result cards, validation pipeline, dedicated field breakdown, quality notes, advanced developer payload, local wrapping, copy, and download.
- Runtime localization covers every supported ValidoHub locale for shell controls, state labels, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
- Offline tools must state proof boundaries clearly. ELSTER, BZSt, VIES, Handelsregister, bank directories, Zoll/EORI, vehicle registry, carrier status, identity proof, and legal decisions are official-system checks, not browser proofs.

## Official Reference Baseline

- Bundeszentralamt fuer Steuern: IdNr, USt-IdNr, and tax identifier context.
- ELSTER and Finanzamt workflows: filing and regulated tax-status boundaries.
- Handelsregister: company existence, court, and legal status boundaries.
- Deutsche Bundesbank / banking directories: BLZ, payments, and institution reference data.
- KoSIT / XRechnung and ZUGFeRD/Factur-X: e-invoicing handoff context.
- Zoll: EORI and customs-status boundaries.

## Runtime Localization

The factory-based runtime provides a suite-level i18n dictionary for all supported locale routes:

`en`, `pl`, `de`, `es`, `pt-BR`, `fr`, `it`, `nl`, `pt-PT`, `cs`, `sk`, `uk`, `tr`, `ro`, `hu`, `sv`, `no`, `fi`, `da`, `ja`, `ko`, `zh-CN`, `zh-TW`, `ar`, `he`, `hi`, `id`, `vi`, `th`, and `ms`.

Deep editorial country hub localization still uses the existing ValidoHub localization pass. The Germany-specific interactive workbench runtime must not hard-code English-only controls except official acronyms, sample identifiers, protocol names, and code literals.
