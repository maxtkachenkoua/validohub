# Factory Bank Account Workflow Gold Floor

Date: 2026-07-27

Scope:

- Runtime: `assets/js/tools/country-suite-factory.js`
- Tool families: non-IBAN bank account, BIC/SWIFT, routing/bank-code/BLZ/sort-code, masked bank-account, direct-debit/SEPA/domestic-transfer, bank statement, and payment reconciliation routes.
- Count at implementation time: 806 id-matched route candidates across 192 suites.

What changed:

- Added a targeted banking analyzer before document/reference and payment workflow analyzers.
- Added BIC/SWIFT institution, country, location, and branch anatomy.
- Added BIC route-country inference from valid samples so generated suites without `iso2` do not reject correct country codes such as Algeria `DZ`.
- Added domestic routing/account slices, visible account body hints, masked previews, and developer JSON parts.
- Added ABA checksum replay when a nine-digit US routing candidate is visible.
- Added direct-debit/SEPA mandate reference and scheme hints.
- Added bank-statement/reconciliation line count, date, amount/currency, and reference hints.
- Added `csf-bank-account-bar` with full-width auto-fit layout rules so banking rail text does not collapse.
- Preserved official boundaries: no bank existence, account ownership, beneficiary match, balance, sanctions screening, or settlement state is claimed locally.

Why this matters:

- Bank/account pages were too close to generic payment validators. Users need copy-ready normalized values, masked support-safe previews, routing/account anatomy, and clear boundaries for provider-only checks.
- This raises the broad factory floor for banking workflows while leaving route-bound Gold Labs and bespoke banking/payment tools above it.

Representative QA:

- `node --check assets/js/tools/country-suite-factory.js`
- `npm run build:country -- --country algeria --locales en`
- `npm run build:country -- --country united-states --locales en`
- `npm run build:country -- --country germany --locales en`
- `npm run build:country -- --country australia --locales en`
- Local preview from `generated/validohub` on `http://127.0.0.1:8138`
- Headless Playwright smoke:
  - `/en/algeria/algeria-bank-account-validator/`
  - `/en/algeria/algeria-bic-swift-inspector/`
  - `/en/algeria/algeria-direct-debit-mandate-helper/`
  - `/en/algeria/algeria-bank-statement-parser/`
  - `/en/algeria/algeria-masked-bank-account-formatter/`
  - `/en/australia/australia-domestic-transfer-helper/`
  - Gold Lab intercept checks: `/en/germany/german-blz-bank-code-inspector/`, `/en/australia/australia-bank-account-validator/`
  - Negative scope: `/en/algeria/algeria-payment-reference-helper/`, `/en/algeria/algeria-vin-validator/`

Observed smoke result:

- Factory banking routes show exactly one `csf-bank-account-bar` with four cards.
- Valid samples reach `Offline checks passed`.
- Review samples reach `Review needed`.
- No target route showed horizontal overflow at 1440px.
- Payment-reference negative route stayed in the payment workflow rail and did not receive the banking rail.
- VIN negative route stayed in the document/reference rail and did not receive the banking rail.
- Germany BLZ and Australia bank-account routes are already intercepted by `gold-tools-lab.js`; they were treated as stronger route-bound Gold Lab profiles, not factory smoke failures.

Open boundaries:

- This is a strong shared factory floor, not a claim that all 806 routes are bespoke Pix/CURP/Spain-ID pages.
- Deeper local formats such as CLABE, sort code/account, BSB, BPAY/PayID, ABA/Fedwire/ACH, QR-bill, national bank-code registries, and rich bank-file formats should be promoted to dedicated Gold Labs when public browser-checkable rules justify it.
