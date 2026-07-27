# Brazil CPF/CNPJ Gold Workbench Spec

Brazil CPF and CNPJ are promoted from shared Gold overlay profiles into a dedicated browser-only Gold runtime.

## Scope

- Source JS: `assets/js/tools/brazil-tax-id.js`
- Country routes:
  - `/en/brazil/brazil-cpf-validator/`
  - `/en/brazil/brazil-cnpj-validator/`
- Route host algorithm after post-processing: `validohub.brazil-tax-id`
- AI log: `docs/ai/gold-tools/BRAZIL_TAX_ID_GOLD_LOG.md`

## Product Rules

- CPF and CNPJ must render as a connected primary lab, not as the shared lower-page Gold overlay.
- The lab must normalize punctuation, preserve leading zeros, reject repeated-placeholder fixtures, replay both modulo-11 check digits, show field anatomy, and produce copy-ready developer JSON.
- Safe fixture generation is required for both CPF and CNPJ.
- Invalid, short, repeated, and bad-check-digit samples must render review states.
- Official boundary must stay explicit: local pass does not prove identity, company existence, Receita status, ownership, tax standing, or authorization to transact.
- Copy actions must use the current result and show visible feedback near the clicked control.
- Long values, replay tables, and JSON must wrap or scroll locally without page-level horizontal overflow.

## Official Reference Baseline

- Receita Federal CPF services and CPF consultation context.
- Receita Federal CNPJ services and CNPJ registration/consultation context.
- Publicly documented community implementation practice for CPF/CNPJ modulo-11 check-digit replay is used only for local structural evidence; Receita remains the official source for status and registration facts.

## Acceptance Checks

- `node --check assets/js/tools/brazil-tax-id.js`
- `node --check scripts/build-country-dev.mjs`
- `node --check scripts/build-all.mjs`
- `npm run build:country -- --country brazil --locales en`
- Confirm generated CPF/CNPJ routes load `brazil-tax-id.js` and do not load `gold-tools-lab.js`.
- Browser-smoke valid, bad-check-digit, short/repeated, generator, copy JSON, and mobile overflow paths.
