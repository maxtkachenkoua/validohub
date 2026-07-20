# France Premium Country Suite

France is the first full no-phase country expansion after Brazil and Poland. It must stay a premium country-neutral benchmark for future generated countries.

## Scope

- Country hub source: `countries/data/france.json`
- Country registration: `countries/france.yaml`
- Runtime: `assets/js/tools/france-suite.js`
- Tool count: 64 active France-specific workbenches under `tools/france-*.yaml`

## Product Rules Captured

- France has one global country hub plus country-specific tools for identifiers, banking, payments, tax, address, phone, privacy, vehicle, and developer workflows.
- Country-specific IBAN is required even when a global IBAN validator exists. The country page should route users to the local IBAN workbench and the global IBAN validator can remain a cross-country comparator.
- Every France tool must use the premium country workbench rhythm: branded header, samples, local browser-only analysis, immediate results directly after inputs, field cards, validation pipeline, quality notes, developer payload, and advanced details.
- Offline tools must state proof boundaries clearly. SIRENE/VIES/bank ownership/identity existence checks are official-system lookups, not browser proofs.

## Official Reference Baseline

- INSEE: SIREN, SIRET, NIC, Sirene, commune-style references.
- impots.gouv.fr: SIREN, SIRET, APE, TVA, EORI tax identifier context.
- Banque de France: RIB, IBAN, BIC banking structure.
- Service-Public: NIR privacy and structure boundary.
- La Poste: postal, CEDEX, and address conventions.

## Future Additions

When adding more French instruments, extend the same suite instead of creating weaker one-off pages. A new tool is not accepted unless it has a unique sample, unique summary, specific analysis notes, copyable result output, and local quality cards.
