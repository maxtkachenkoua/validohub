# Europe Premium Batch Suite Spec

This spec covers the first 10-country premium generation stress test: Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania).

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. This batch uses 60 strong local workbenches per country because each selected market has enough identifiers, tax, payment, address, privacy, document, vehicle, logistics, and developer-data workflows to justify it.
- Every tool must render compact premium shell UI, validation pipeline, result cards, field breakdown, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.

## Batch Countries

- Portugal: NIF, NIPC, IVA, Multibanco, SAF-T / e-Fatura, GDPR / CNPD.
- Austria: SVNR, Firmenbuchnummer, UID / USt, EPS / SEPA, E-Rechnung / ebInterface, GDPR / DSG.
- Belgium: RRN / NISS, KBO / BCE, BTW / TVA, OGM structured communication, Peppol / e-invoicing, GDPR / APD-GBA.
- Ireland: PPSN, CRO number, VAT / Revenue, SEPA / Direct Debit, Revenue e-invoicing readiness, GDPR / Data Protection Commission.
- Czechia: Rodne cislo, ICO, DIC / DPH, variable symbol, ISDOC / e-invoicing, GDPR / UOOU.
- Sweden: Personnummer, Organisationsnummer, Moms, Bankgiro / OCR, Peppol / Svefaktura, GDPR / IMY.
- Norway: Fodselsnummer, Organisasjonsnummer, MVA, KID reference, EHF / Peppol, GDPR / Datatilsynet.
- Denmark: CPR, CVR, Moms / VAT, FI / Betalingsservice, NemHandel / Peppol, GDPR / Datatilsynet.
- Finland: HETU, Y-tunnus, ALV / VAT, viitenumero, Finvoice / Peppol, GDPR / Tietosuojavaltuutettu.
- Romania: CNP, CUI / CIF, TVA, treasury / SEPA handoff, RO e-Factura / ANAF, GDPR / ANSPDCP.

## Acceptance

Run the premium gate per country:

```bash
npm run audit:country-premium -- --country portugal
npm run audit:country-premium -- --country austria
npm run audit:country-premium -- --country belgium
npm run audit:country-premium -- --country ireland
npm run audit:country-premium -- --country czechia
npm run audit:country-premium -- --country sweden
npm run audit:country-premium -- --country norway
npm run audit:country-premium -- --country denmark
npm run audit:country-premium -- --country finland
npm run audit:country-premium -- --country romania
```

Then run `npm run audit:country-suite`, full `npm run build`, and Engine doctor before sign-off.
