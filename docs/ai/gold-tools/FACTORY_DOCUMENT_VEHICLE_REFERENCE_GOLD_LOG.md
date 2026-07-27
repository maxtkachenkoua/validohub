# Factory Document Vehicle Reference Gold Floor Log

Date: 2026-07-27

Scope:

- Runtime: `assets/js/tools/country-suite-factory.js`.
- Targeted generated tool kinds: `document`, `passport`, `plate`, `vin`, `vehicle`, `vehicleMask`, `customs`, and `tracking`.
- Count at implementation time: 2,090 tools across 191 country suites.
- Kind breakdown: 1,085 document, 316 customs, 189 vehicle, 168 VIN, 167 plate, 163 tracking, 1 passport, 1 vehicleMask.

What changed:

- Added a narrow document/vehicle/reference analyzer that runs before the older broad tax/business analyzer.
- Added family classification for MRZ, Passport, Document, Plate, VIN, Vehicle, Customs, and Tracking.
- Added route sample-shape replay, primary token extraction, masked previews, developer JSON `parts`, official-boundary fields, and family-specific breakdown slices.
- VIN tools now expose WMI, VDS, VIS, and I/O/Q charset evidence.
- MRZ tools now parse both real newlines and escaped `\n` fixtures, expose MRZ line count, document type, issuing-country hint, and check-slot replay when numeric check digits are available.
- Customs tools now expose importer/declaration reference, HS-code evidence, and amount/currency hints.
- Tracking tools now expose tracking prefix/body slices and carrier-status boundaries.
- Added `csf-document-reference-bar` with full-width auto-fit grid rules so cards do not collapse into vertical text.

Explicit boundaries:

- This is a factory floor, not a bespoke Gold claim for every route.
- It does not prove document authenticity, identity, visa eligibility, vehicle ownership, registration status, inspection/insurance status, customs filing acceptance, shipment existence, or carrier delivery status.
- It intentionally excludes payment, invoice, e-invoice, remittance, and procurement workflows; those need a separate workflow/reference pass.
- It intentionally leaves richer dedicated Gold Lab routes in control when they own the page.

Representative QA:

- `node --check assets/js/tools/country-suite-factory.js`
- Scoped builds, sequential only:
  - `npm run build:country -- --country algeria --locales en`
  - `npm run build:country -- --country japan --locales en`
  - `npm run build:country -- --country australia --locales en`
- Generated runtime sync:
  - `cmp -s assets/js/tools/country-suite-factory.js generated/validohub/assets/js/tools/country-suite-factory.js`
- Browser smoke on `http://127.0.0.1:8137`:
  - `/en/algeria/algeria-mrz-passport-parser/`
  - `/en/algeria/algeria-vehicle-plate-inspector/`
  - `/en/australia/australia-vin-validator/`
  - `/en/algeria/algeria-customs-declaration-helper/`
  - `/en/algeria/algeria-postal-tracking-helper/`
  - `/en/algeria/algeria-postal-code-validator/` as negative scope check.

Observed QA results:

- MRZ, plate, VIN, customs, and tracking routes render the document/reference rail with 4 cards and zero horizontal overflow.
- Valid fixtures return `Offline checks passed`.
- Invalid fixtures return `Review needed`.
- Developer output/body evidence includes `parts` or family-specific anatomy such as MRZ lines, WMI/VDS/VIS, HS evidence, or tracking prefix.
- Postal negative route remains in the contact/address family and does not receive the document/reference rail.

Build notes:

- Do not run scoped country builds in parallel; they share generated asset copy paths.
- Full build was not run for this pass.
