# Switzerland Premium Country Suite

Switzerland is the first future-country suite to consume Country Suite Factory V1 from the start. It must prove that "make Switzerland fully premium" can be delivered without bespoke shell code, foreign-country fallback copy, or Engine changes.

## Scope

- Country hub source: `countries/data/switzerland.json`
- Country registration: `countries/switzerland.yaml`
- Runtime: `assets/js/tools/switzerland-suite.js`
- Tool count: 58 active Switzerland-specific workbenches under `tools/switzerland-*.yaml`
- Shared shell: `assets/js/tools/country-suite-factory.js`

## Product Rules

- Switzerland has one global country hub plus country-specific tools for UID, MWST/VAT, AHV/AVS, EORI/customs, Swiss IBAN, SIC/BC, BIC, QR-bill, ESR, CHF, address, phone, cantons, payroll, invoices, privacy, vehicles, and developer-data workflows.
- The suite uses Country Suite Factory V1 additively. Brazil, Poland, France, and Netherlands are not migrated or imported into the factory.
- Every Switzerland workbench uses the compact Brazil-scale country rhythm: branded header, short samples, immediate result cards, validation pipeline, dedicated field breakdown, quality notes, advanced developer payload, local wrapping, copy, and download.
- Runtime localization covers every supported ValidoHub locale for shell controls, state labels, sample labels, tool titles/summaries, diagnostics, quality notes, and advanced labels.
- Offline tools must state proof boundaries clearly. Zefix, UID register status, tax filing, identity proof, AHV/AVS identity, bank account ownership, QR-bill settlement, customs status, carrier delivery state, and vehicle registry status are official-system lookups, not browser proofs.

## Official Reference Baseline

- Swiss Federal Statistical Office: country, canton, municipality, and statistical context.
- Federal Tax Administration: UID/MWST tax context and regulated filing boundaries.
- Zefix / commercial registry context: company existence and legal status boundaries.
- SIX / Swiss payment specifications: QR-bill, QR reference, and payment data context.
- Swiss Post and canton/municipality systems: postal and address handoff boundaries.

## Runtime Localization

The factory-based runtime provides a suite-level i18n dictionary for all supported locale routes:

`en`, `pl`, `de`, `es`, `pt-BR`, `fr`, `it`, `nl`, `pt-PT`, `cs`, `sk`, `uk`, `tr`, `ro`, `hu`, `sv`, `no`, `fi`, `da`, `ja`, `ko`, `zh-CN`, `zh-TW`, `ar`, `he`, `hi`, `id`, `vi`, `th`, and `ms`.

Deep editorial country hub localization still uses the existing ValidoHub localization pass. The Switzerland-specific interactive workbench runtime must not hard-code English-only controls except official acronyms, sample identifiers, protocol names, and code literals.
