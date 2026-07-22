# Europe Premium Batch Suite Spec

This spec covers the strict-Europe full-premium generation batch: Portugal (portugal), Austria (austria), Belgium (belgium), Ireland (ireland), Czechia (czechia), Sweden (sweden), Norway (norway), Denmark (denmark), Finland (finland), Romania (romania), Albania (albania), Andorra (andorra), Bosnia and Herzegovina (bosnia-and-herzegovina), Bulgaria (bulgaria), Croatia (croatia), Cyprus (cyprus), Estonia (estonia), Greece (greece), Hungary (hungary), Iceland (iceland), Latvia (latvia), Liechtenstein (liechtenstein), Lithuania (lithuania), Luxembourg (luxembourg), Malta (malta), Moldova (moldova), Monaco (monaco), Montenegro (montenegro), North Macedonia (north-macedonia), San Marino (san-marino), Serbia (serbia), Slovakia (slovakia), Slovenia (slovenia), Ukraine (ukraine), United Kingdom (united-kingdom), Vatican City (vatican-city).

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. 60 tools is a density reference, not a cap or a filler target: add every meaningful local validator/generator/parser/debugger, and stop only when the local market truly has no more useful workflows.
- Every tool must render compact premium shell UI, validate/generate/explain where safe, validation pipeline, result cards, field breakdown, tool-context explanation, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Local generators must create fresh values on every Generate click, enforce country prefixes/check digits, and route invalid/bad-prefix fixtures into review/error states rather than green success.
- Country-specific analyzers must replace generic parser output whenever a local identifier has real structure. Generic "source payload / offline only" breakdown is only a fallback for tools with no formal structure.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.
- Russia and Belarus are explicitly excluded. Controversial/special territories and Asia-adjacent markets are handled later by separate jurisdiction rules.

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
- Albania: Personal number, NIPT, TVSH / VAT, bank payment reference, fiscalization invoice, GDPR-aligned privacy.
- Andorra: CASS number, NRT, IGI / NRT, SEPA reference, IGI invoice, LQPD privacy.
- Bosnia and Herzegovina: JMBG, JIB, PDV, domestic payment reference, PDV invoice, personal-data protection.
- Bulgaria: EGN, UIC / EIK, DDS / VAT, payment code, DDS invoice, GDPR / CPDP.
- Croatia: OIB, MBS / OIB, PDV / VAT, model i poziv na broj, PDV invoice, GDPR / AZOP.
- Cyprus: Civil ID, HE company number, VAT, SEPA reference, VAT invoice, GDPR / Commissioner.
- Estonia: Isikukood, registry code, KMKR / VAT, payment reference, e-invoice, GDPR / AKI.
- Greece: AMKA, GEMI number, AFM / VAT, RF payment code, myDATA / AADE invoice, GDPR / HDPA.
- Hungary: TAJ, company registry number, adoszam / VAT, GIRO / NAV reference, NAV Online Szamla, GDPR / NAIH.
- Iceland: Kennitala, company kennitala, VSK / VAT, payment reference, e-invoice, GDPR / Persónuvernd.
- Latvia: personal code, registration number, PVN / VAT, payment reference, PVN invoice, GDPR / DVI.
- Liechtenstein: PEID, company register number, MWST / VAT, Swiss-style payment reference, MWST invoice, GDPR / Datenschutzstelle.
- Lithuania: asmens kodas, company code, PVM / VAT, payment code, PVM invoice, GDPR / VDAI.
- Luxembourg: matricule, RCS number, TVA / VAT, SEPA reference, TVA invoice, GDPR / CNPD.
- Malta: ID card number, company C number, VAT, SEPA reference, VAT invoice, GDPR / IDPC.
- Moldova: IDNP, IDNO, TVA / VAT, payment reference, TVA invoice, personal-data protection.
- Monaco: NIS, RCI number, TVA / VAT, SEPA reference, TVA invoice, personal-data protection.
- Montenegro: JMBG, PIB, PDV / VAT, payment reference, PDV invoice, personal-data protection.
- North Macedonia: EMBG, company registration number, DDV / VAT, payment reference, DDV invoice, personal-data protection.
- San Marino: ISS code, COE number, operator code, SEPA reference, fiscal invoice, personal-data protection.
- Serbia: JMBG, MB / registration number, PIB / PDV, model i poziv na broj, eFaktura / PDV invoice, personal-data protection.
- Slovakia: Rodne cislo, ICO, DIC / DPH, variabilny symbol, DPH invoice, GDPR / UOOU.
- Slovenia: EMSO, maticna stevilka, davcna stevilka / DDV, UPN QR reference, eRacun / DDV invoice, GDPR / IP-RS.
- Ukraine: RNOKPP, EDRPOU, PDV / VAT, IBAN / MFO reference, PDV invoice / tax invoice, personal-data protection.
- United Kingdom: National Insurance number, Companies House number, VAT / UTR, sort code / Faster Payments, VAT invoice / HMRC MTD, UK GDPR / ICO.
- Vatican City: document number, Vatican entity code, fiscal reference, SEPA reference, fiscal invoice, personal-data protection.

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
npm run audit:country-premium -- --country albania
npm run audit:country-premium -- --country andorra
npm run audit:country-premium -- --country bosnia-and-herzegovina
npm run audit:country-premium -- --country bulgaria
npm run audit:country-premium -- --country croatia
npm run audit:country-premium -- --country cyprus
npm run audit:country-premium -- --country estonia
npm run audit:country-premium -- --country greece
npm run audit:country-premium -- --country hungary
npm run audit:country-premium -- --country iceland
npm run audit:country-premium -- --country latvia
npm run audit:country-premium -- --country liechtenstein
npm run audit:country-premium -- --country lithuania
npm run audit:country-premium -- --country luxembourg
npm run audit:country-premium -- --country malta
npm run audit:country-premium -- --country moldova
npm run audit:country-premium -- --country monaco
npm run audit:country-premium -- --country montenegro
npm run audit:country-premium -- --country north-macedonia
npm run audit:country-premium -- --country san-marino
npm run audit:country-premium -- --country serbia
npm run audit:country-premium -- --country slovakia
npm run audit:country-premium -- --country slovenia
npm run audit:country-premium -- --country ukraine
npm run audit:country-premium -- --country united-kingdom
npm run audit:country-premium -- --country vatican-city
```

Then run `npm run audit:country-suite`, full `npm run build`, and Engine doctor before sign-off.
