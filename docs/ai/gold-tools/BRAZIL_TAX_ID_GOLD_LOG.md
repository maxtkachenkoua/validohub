# Brazil CPF/CNPJ Gold Log

Date: 2026-07-27

## Why This Tool Exists

CPF and CNPJ are high-value Brazilian developer formats used in account onboarding, billing, fiscal forms, PIX-key handling, LGPD masking, and test-data workflows. They support real browser-checkable structure and two public modulo-11 check digits, so they deserve a dedicated Pix/CURP/Spain-class lab instead of only the shared Gold overlay.

## Sources

- Receita Federal CPF service area: `https://www.gov.br/receitafederal/pt-br/servicos/cadastro/cidadao`
- CPF consultation service: `https://www.gov.br/pt-br/servicos/consultar-cadastro-de-pessoas-fisicas`
- Receita Federal CNPJ service area: `https://www.gov.br/receitafederal/pt-br/servicos/cadastro/cnpj`
- CNPJ registration service: `https://www.gov.br/pt-br/servicos/inscrever-no-cnpj`

## Implemented Capabilities

- Dedicated `assets/js/tools/brazil-tax-id.js` runtime for `brazil-cpf-validator` and `brazil-cnpj-validator`.
- Connected primary lab replacing the country-suite route host.
- CPF and CNPJ normalization, display formatting, masked logging form, digits-only storage form, and repeated-placeholder rejection.
- CPF two-digit modulo-11 replay with per-position weight/product table.
- CNPJ two-digit modulo-11 replay with branch/anatomy fields and per-position weight/product table.
- Valid, bad-check-digit, short, repeated/branch samples.
- Safe fictional CPF and CNPJ fixture generation.
- Validation pipeline, field breakdown, official source panel, integration traps, and Developer Snapshot JSON.
- Scoped/full build post-processing removes `gold-tools-lab.js`, injects `brazil-tax-id.js`, and marks the route host as `validohub.brazil-tax-id`.

## Unsupported And Boundary Claims

The lab does not verify identity, company existence, Receita status, ownership, tax standing, account ownership, PIX reachability, or authorization to transact. It proves only local shape, normalization, placeholder rejection, and check-digit math.

## Fixtures

- Valid CPF: `529.982.247-25`
- Bad CPF check digit: `529.982.247-24`
- Repeated CPF: `111.111.111-11`
- Short CPF: `529.982.247`
- Valid CNPJ: `11.222.333/0001-81`
- Bad CNPJ check digit: `11.222.333/0001-82`
- Branch-style CNPJ fixture: `04.252.011/0001-10`
- Short CNPJ: `11.222.333/0001`

## QA Notes

Verification completed in this pass:

- `node --check assets/js/tools/brazil-tax-id.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- `npm run build:country -- --country brazil --locales en`
- Generated-route grep confirmed CPF/CNPJ routes use `data-algorithm-id="validohub.brazil-tax-id"`, load `brazil-tax-id.js`, and do not load `gold-tools-lab.js`.
- `npm run audit:country-premium -- --country brazil --locales en` passed: `full-premium-ready`, 63 tools, 0 blockers, 1 warning (`availableWorkbenches (61) differs from tool YAML count (63)`).
- Headless Playwright smoke on `http://127.0.0.1:8135/en/brazil/brazil-cpf-validator/` and `/en/brazil/brazil-cnpj-validator/` confirmed primary lab mount, valid fixture success, bad-check-digit review state, generated fixture output, only `brazil-tax-id.js` as route tool script, and no desktop or 390px mobile horizontal overflow.
- `npm run audit:country-suite` still fails on broad pre-existing generated-tree guardrails outside this CPF/CNPJ scope: legacy-suite mapping expectations and many South America generated factory pages missing `country-suite-factory.js`.

## Open Risks

- CPF/CNPJ check-digit rules are stable and widely implemented, but official Receita pages describe registration/status services more directly than algorithm math. Keep the UI wording to "local structural evidence" and never imply official assignment or status.
