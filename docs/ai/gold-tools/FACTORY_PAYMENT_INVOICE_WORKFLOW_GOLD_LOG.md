# Factory Payment Invoice Workflow Gold Floor

Date: 2026-07-27

Scope:

- Runtime: `assets/js/tools/country-suite-factory.js`
- Tool families: `paymentref`, `payment`, `remittance`, `invoice`, `einvoice`, `procurement`
- Count at implementation time: 1,161 generated tools across 191 country suites

What changed:

- Added a targeted payment/commercial workflow analyzer before the broad tax/business and generic fallback analyzers.
- Added workflow kind detection for payment reference, invoice, e-invoice, remittance, and procurement routes.
- Added reference extraction from labelled text, RF/INV/PO/RFP/RFQ/TENDER-like tokens, JSON ids, and XML ids.
- Added browser-local XML/JSON/e-invoice payload classification.
- Added amount/currency, date, party/account, line-count, route-shape, current-shape, masking, and developer JSON output.
- Added placeholder rejection so repeated fake references stay review cases.
- Added `csf-payment-workflow-bar` with full-width auto-fit layout rules so text does not collapse into vertical columns.
- Preserved official boundaries: no payment settlement, bank/account ownership, tax clearance, e-invoice delivery, supplier eligibility, award status, or registry existence is claimed locally.

Why this matters:

- These routes previously looked and behaved too much like weak validators, despite users needing copy-ready references, parser anatomy, fixture generation/debug data, and clear local-vs-official boundaries.
- The pass raises the broad factory floor for commercial workflows while keeping bespoke Gold Lab routes above it.

Representative QA:

- `node --check assets/js/tools/country-suite-factory.js`
- `npm run build:country -- --country algeria --locales en`
- `npm run build:country -- --country germany --locales en`
- `npm run build:country -- --country australia --locales en`
- `npm run build:country -- --country japan --locales en`
- Local preview from `generated/validohub` on `http://127.0.0.1:8138`
- Headless Playwright smoke:
  - `/en/algeria/algeria-payment-reference-helper/`
  - `/en/algeria/algeria-remittance-text-builder/`
  - `/en/algeria/algeria-invoice-number-helper/`
  - `/en/algeria/algeria-e-invoicing-readiness-checker/`
  - `/en/algeria/algeria-procurement-identifier-helper/`
  - `/en/germany/german-xrechnung-readiness-helper/`
  - `/en/germany/german-zugferd-readiness-helper/`
  - `/en/japan/japan-payment-reference-helper/`
  - `/en/japan/japan-e-invoicing-readiness-checker/`
  - Negative scope: `/en/algeria/algeria-vin-validator/`

Observed smoke result:

- Factory workflow routes show exactly one `csf-payment-workflow-bar` with four cards.
- Valid samples reach `Offline checks passed`.
- Review samples reach `Review needed`.
- No target route showed horizontal overflow at 1440px.
- Tax/business rail did not appear on workflow routes.
- VIN negative route stayed in the document/reference rail and did not receive the payment rail.
- Australia payment/e-invoicing routes are already intercepted by `gold-tools-lab.js`; they were treated as existing route-bound Gold Lab profiles, not factory smoke targets.

Open boundaries:

- This is a strong shared factory floor, not a claim that all 1,161 routes are bespoke Pix/CURP/Spain-ID pages.
- Deeper country-specific commercial formats such as QR-bills, Peppol/UBL profiles, local tax-cleared e-invoice signatures, BPAY/PayID, UPI, PromptPay, Pix, and local procurement registries should be promoted to dedicated Gold Labs when public browser-checkable rules justify it.
