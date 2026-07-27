# Factory Locale Date Currency Gold Floor

Date: 2026-07-27

Scope:

- Runtime: `assets/js/tools/country-suite-factory.js`
- Tool families: locale-number parsers, currency/decimal formatters, date-locale formatters, calendar-week helpers, timezone/business-hours helpers, and holiday-calendar fixture helpers.
- Count at implementation time: 234 route candidates across 188 suites.

What changed:

- Added a targeted locale/date/currency analyzer after banking and before document/reference/payment/tax fallback analyzers.
- Added localized number extraction with group and decimal separator detection.
- Added canonical machine-number export using dot decimal notation.
- Added currency marker detection for ISO codes and common symbols.
- Added date token extraction, component-order detection, ISO date output, and day/month ambiguity hints.
- Added ISO week replay for valid date inputs.
- Added timezone and business-hour evidence slices for timezone/business-hours helper routes.
- Added masked developer JSON output and route sample-shape replay.
- Added `csf-locale-format-bar` with full-width auto-fit layout rules so locale rails do not collapse.
- Preserved official boundaries: no exchange-rate, legal-tender, holiday, DST-policy, or live business-opening status is claimed locally.

Why this matters:

- Locale/date/currency tools are high-value integration utilities when they expose parser anatomy and machine-safe outputs, not just generic "input present" validation.
- This pass makes those country routes useful for CSV imports, API handoff, accounting fixtures, localized UI tests, date/week debugging, and timezone/business-hour boundary checks.

Representative QA:

- `node --check assets/js/tools/country-suite-factory.js`
- `npm run build:country -- --country algeria --locales en`
- `npm run build:country -- --country canada --locales en`
- `npm run build:country -- --country bahamas --locales en`
- `npm run build:country -- --country japan --locales en`
- Local preview from `generated/validohub` on `http://127.0.0.1:8138`
- Headless Playwright smoke:
  - `/en/algeria/algeria-calendar-week-helper/`
  - `/en/algeria/algeria-locale-number-parser/`
  - `/en/algeria/algeria-currency-decimal-formatter/`
  - `/en/algeria/algeria-date-locale-formatter/`
  - `/en/japan/japan-calendar-week-helper/`
  - `/en/japan/japan-locale-number-parser/`
  - `/en/canada/canada-currency-decimal-formatter/`
  - `/en/canada/canada-timezone-business-hours-helper/`
  - `/en/bahamas/bahamas-date-locale-formatter/`
  - Negative scope: `/en/algeria/algeria-bank-account-validator/`, `/en/algeria/algeria-payment-reference-helper/`

Observed smoke result:

- Factory locale/date/currency routes show exactly one `csf-locale-format-bar` with four cards.
- Valid samples reach `Offline checks passed`.
- Review samples reach `Review needed`.
- No target route showed horizontal overflow at 1440px.
- Banking negative route stayed in the banking rail and did not receive the locale rail.
- Payment-reference negative route stayed in the payment workflow rail and did not receive the locale rail.

Open boundaries:

- This is a strong shared factory floor, not a claim that all 234 routes are bespoke Pix/CURP/Spain-ID pages.
- Deeper country-specific date, tax-calendar, holiday, exchange-rate, timezone, and localization formats should be promoted to dedicated Gold Labs when public browser-checkable rules justify it.
