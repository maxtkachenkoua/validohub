# Gold Tools AI Index

Internal AI memory for the 50 flagship local-market tools. This is not user-facing copy.

Gold status requires:

- One-stop browser lab behavior: validate, generate, parse, debug, learn, copy/export, and inspect official boundaries on the page.
- Public/source-backed local checks only. Never claim official existence, ownership, tax status, payment settlement, identity proof, or registry status without an official live system.
- Official or primary source links near the relevant explanation when such sources exist.
- AI implementation log kept current during code changes.

## 2026-07-26 Implementation Pass

Status values:

- `overlay-v1`: route receives `assets/js/tools/gold-tools-lab.js` after scoped rebuild.
- `legacy-rich`: route already has a bespoke rich tool and receives Gold source/log discipline.
- `source-route`: route exists in generated country output even if no standalone `tools/*.yaml` file exists.
- `needs-follow-up`: public algorithm/source depth should be deepened after browser QA.
- `bespoke-gold-v1`: dedicated runtime was deepened beyond the shared overlay into a source-linked format lab.
- `bespoke-gold-v2`: Pix-level dedicated runtime with accepted polish baseline after browser QA.

| # | Country | Gold target | Route slug | Status |
|---:|---|---|---|---|
| 1 | Poland | PESEL | `pesel-validator` | legacy-rich, overlay-v1 |
| 2 | Brazil | Pix BR Code / QR / payment payload | `brazil-pix-validator` | bespoke-gold-v2 |
| 3 | Brazil | CPF / CNPJ | `brazil-cpf-validator`, `brazil-cnpj-validator` | overlay-v1 |
| 4 | India | UPI ID / UPI QR | `india-payment-reference-helper` | overlay-v1, nearest route |
| 5 | India | GSTIN | `india-tax-id-validator` | overlay-v1, nearest route |
| 6 | India | PAN | `india-pan-validator` | overlay-v1 |
| 7 | India | Aadhaar format / Verhoeff boundary | `india-aadhaar-boundary-social-insurance-helper` | overlay-v1 |
| 8 | Mexico | RFC | `mexico-rfc-validator` | source-route, overlay-v1 |
| 9 | Mexico | CURP | `mexico-curp-validator` | source-route, bespoke-gold-v1 |
| 10 | Mexico | CLABE | `mexico-domestic-bank-account-inspector` | source-route, nearest route |
| 11 | Argentina | CUIT / CUIL | `argentina-cuit-validator`, `argentina-cuil-social-insurance-helper` | overlay-v1 |
| 12 | Argentina | CBU / CVU | `argentina-domestic-account-validator` | overlay-v1, nearest route |
| 13 | Chile | RUT / RUN | `chile-rut-validator` | overlay-v1 |
| 14 | Colombia | NIT / CUFE | `colombia-nit-validator`, `colombia-e-invoicing-readiness-checker` | overlay-v1 |
| 15 | Peru | RUC / CCI | `peru-ruc-validator`, `peru-domestic-account-validator` | overlay-v1 |
| 16 | United States | ABA routing number | `united-states-bank-routing-handoff-checklist` | source-route, nearest route |
| 17 | United States | EIN / TIN boundary lab | `united-states-ein-validator` | source-route, overlay-v1 |
| 18 | United States | ZIP+4 / address boundary lab | `united-states-postal-code-validator` | source-route, overlay-v1 |
| 19 | Canada | Business Number / GST-HST | `canada-business-number-validator` | source-route, overlay-v1 |
| 20 | Canada | routing transit / institution number | `canada-bank-routing-handoff-checklist` | source-route, nearest route |
| 21 | United Kingdom | Sort code + account number | `united-kingdom-bank-account-inspector` | overlay-v1, nearest route |
| 22 | United Kingdom | VAT number | `united-kingdom-vat-id-validator` | overlay-v1 |
| 23 | United Kingdom | National Insurance number | `united-kingdom-national-insurance-number-validator` | overlay-v1 |
| 24 | Germany | IBAN + BLZ / bank-code anatomy | `germany-iban-validator`, `german-blz-bank-code-inspector` | overlay-v1 |
| 25 | Germany | Steuer-ID | `german-tax-id-validator` | overlay-v1 |
| 26 | France | SIREN / SIRET | `france-siren-validator`, `france-siret-validator` | overlay-v1 |
| 27 | France | TVA intracom / VAT | `france-vat-tva-validator` | overlay-v1 |
| 28 | France | RIB / IBAN key | `france-rib-validator` | overlay-v1 |
| 29 | Spain | DNI / NIE / CIF | `spain-id-validator` | bespoke-gold-v1 |
| 30 | Italy | Codice Fiscale | `italy-codice-fiscale-validator` | overlay-v1 |
| 31 | Italy | Partita IVA | `italy-partita-iva-validator` | overlay-v1 |
| 32 | Netherlands | BSN | `netherlands-bsn-validator` | overlay-v1 |
| 33 | Netherlands | KvK / BTW | `netherlands-kvk-number-validator`, `netherlands-btw-vat-validator` | overlay-v1 |
| 34 | Belgium | NISS / BIS | `belgium-rrn-niss-validator` | overlay-v1 |
| 35 | Switzerland | QR-bill / QR-IBAN | `switzerland-qr-bill-reference-validator`, `switzerland-iban-validator` | overlay-v1 |
| 36 | Sweden | Personnummer | `sweden-personnummer-validator` | overlay-v1 |
| 37 | Norway | Fodselsnummer / D-number | `norway-fodselsnummer-validator` | overlay-v1 |
| 38 | Denmark | CPR / CVR | `denmark-cpr-validator`, `denmark-cvr-validator` | overlay-v1 |
| 39 | Finland | HETU | `finland-hetu-validator` | overlay-v1 |
| 40 | Estonia | Isikukood | `estonia-isikukood-validator` | overlay-v1 |
| 41 | Australia | ABN / ACN | `australia-abn-acn-validator` | overlay-v1 |
| 42 | Australia | BSB + account / PayID boundary | `australia-bank-account-validator` | overlay-v1 |
| 43 | New Zealand | IRD / NZBN | `new-zealand-ird-number-boundary-validator`, `new-zealand-nzbn-validator` | overlay-v1 |
| 44 | Singapore | NRIC / FIN | `singapore-nric-fin-validator` | overlay-v1 |
| 45 | Singapore | UEN / PayNow / SGQR | `singapore-uen-validator`, `singapore-payment-reference-helper` | overlay-v1 |
| 46 | Malaysia | MyKad / NRIC | `malaysia-mykad-boundary-validator` | overlay-v1 |
| 47 | Indonesia | NIK / NPWP / QRIS | `indonesia-nik-boundary-validator`, `indonesia-tax-id-validator` | overlay-v1 |
| 48 | Thailand | Thai National ID / PromptPay | `thailand-thai-id-boundary-validator`, `thailand-payment-reference-helper` | overlay-v1 |
| 49 | China | Unified Social Credit Code | `china-uscc-validator` | overlay-v1 |
| 50 | Japan | My Number / Corporate Number | `japan-my-number-validator`, `japan-corporate-number-validator` | overlay-v1 |

## Implementation Notes

- `assets/js/tools/gold-tools-lab.js` is a ValidoHub-owned enhancement layer. It mounts only on listed route slugs.
- The first pass intentionally avoids new YAML routes for North America and payment aliases when a nearby existing country route already exists.
- The overlay is additive. Existing PESEL, Pix, Spain ID, Brazil/France/Netherlands legacy rich layers, and factory shell behavior remain in place.
- Deeper per-format algorithms should be promoted from `overlay-v1` to bespoke profile handlers as official-source QA proceeds.
- Brazil Pix has been promoted to `bespoke-gold-v2`; see `docs/ai/gold-tools/BRAZIL_PIX_GOLD_LOG.md`.
- Mexico CURP has been promoted to `bespoke-gold-v1`; see `docs/ai/gold-tools/MEXICO_CURP_GOLD_LOG.md`.
- Spain DNI/NIE/NIF/CIF has been promoted to `bespoke-gold-v1`; see `docs/ai/gold-tools/SPAIN_ID_GOLD_LOG.md`.

## 2026-07-27 Round 2 Expansion

- Shared Gold overlay coverage now has 110 route-bound profiles; every profile slug resolves to a generated English route.
- Round 2 added deeper browser-side analyzers for South Africa ID, Turkey TCKN, Israel Teudat Zehut, Portugal NIF, Croatia OIB, Czech ICO, Greece AFM, Ecuador cedula, Uruguay cedula, and Kenya KRA PIN.
- PAN, GSTIN, Aadhaar, payment aliases, date-coded national IDs, and structured tax/registry identifiers now get family-specific anatomy/boundary output instead of a single generic normalized-value card.
- New flagship profiles were added for selected Africa, Asia, Europe, and Americas countries. This is broad Gold triage, not a claim that all 110 profiles are bespoke Pix-quality tools.
- `scripts/build-country-dev.mjs` and `scripts/build-all.mjs` were synchronized so scoped and release builds inject `gold-tools-lab.js` for the expanded country list.
- QA for the round is recorded in `docs/ai/gold-tools/ROUND2_FLAGSHIP_EXPANSION_LOG.md`.

## 2026-07-27 Round 3 Strong Gold Expansion

- Shared Gold overlay coverage now has 281 route-bound profiles; every profile slug resolves to a generated English route.
- Round 3 added 171 strong-but-broader profiles for postal codes, phone/E.164, BIC/SWIFT, passport/MRZ-adjacent helpers, vehicle plates, invoice numbers, bank/payment references, postal tracking, customs importer references, and procurement identifiers.
- New shared analyzers cover `bic`, `phone-local`, `postal-local`, `passport-lite`, `vehicle-plate`, and structured reference families for invoice, payment, tracking, customs, procurement, and bank/account workflows.
- This is the “strong Gold” layer below bespoke flagships: useful normalization, fixtures, anatomy, masking, traps, and developer JSON, but no fake official status or ownership claims.
- Five older standalone/legacy routes require route-specific overlay injection; see `docs/ai/gold-tools/ROUND3_STRONG_GOLD_EXPANSION_LOG.md`.
