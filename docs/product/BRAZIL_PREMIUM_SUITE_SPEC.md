# Brazil Premium Suite Spec

Brazil is being upgraded to the Poland country-hub gold standard while keeping Brazilian local standards, payment rails, fiscal documents, and privacy boundaries.

## Current Scope

- 60 available Brazil country workbenches.
- Browser-only execution.
- No backend, no REST API, no Java execution.
- Pix keeps its dedicated production workbench.
- The rest of the Brazil country tools use `validohub.brazil-suite` and `assets/js/tools/brazil-suite.js`.

## Header And Interaction Standard

Brazil suite pages use the vivid country-color header pattern: Brazilian flag-inspired gradient, stable tool identity mark, tool-specific summary, preset selector, and sample chips that immediately populate representative local data. This header is the visual reference for brighter country tool identities, while Poland is the breadth reference for applying the pattern across many tools.

## Quality Bar

Every Brazil tool must provide a real interactive workbench, not a decorative card. At minimum it must support local validation or normalization, masking, sample generation, copy/download through the shared framework, diagnostics, advanced analysis, and explicit official-lookup boundaries.

## Premium Diagnostics Standard

Every Brazil suite tool now renders the same premium diagnostics stack:

- country-colored validation pipeline with pass/check cards and progress bar;
- local result cards for normalized value, masked value, tool kind, offline scope, and official boundary;
- field breakdown or payload breakdown tailored to CPF, CNPJ, fiscal access keys, boleto, CEP, phone, vehicle, money, or generic Brazilian payloads;
- quality notes explaining privacy, fixture safety, official lookup limits, and developer handling;
- advanced analysis with developer JSON snapshot, validation trace, and integration hints.

This is the Brazil reference for high-density country tools. Future Brazil tools must join this shared renderer unless they have a stronger dedicated workbench like Pix.

## Tool Domains

- Identity and registry: CPF, CNPJ, RG, CNH, RENACH, RENAVAM, plates, voter title, NIS/PIS/PASEP, SUS/CNS, IE, IM, CNAE, IBGE.
- Tax and fiscal documents: NF-e, NFC-e, CT-e, MDF-e, NFS-e, SPED, eSocial, Reinf, Simples, DARF, GNRE, SAT CF-e.
- Banking and payments: Pix, boleto, linha digitavel, COMPE, ISPB, agency/account, BRL centavos, TED/DOC, CNAB 240/400, Open Finance.
- Address and locale: CEP, address, UF, DDD, phone, pt-BR date and transliteration.
- Developer operations: LGPD masking, fixtures, data quality, company onboarding, reconciliation, statements, OCR, compliance checklists, form fixtures.

## Future Rule

When another country is promoted to mature status, use Poland for layout and Brazil for proof that the model supports non-European, payment-heavy country ecosystems without Engine changes.
