# Asia Premium Batch Suite Spec

This spec covers the Asia full-premium generation batch: Japan (japan), India (india), Singapore (singapore), South Korea (south-korea), United Arab Emirates (united-arab-emirates), China (china), Indonesia (indonesia), Malaysia (malaysia), Thailand (thailand), Vietnam (vietnam), Philippines (philippines), Pakistan (pakistan), Bangladesh (bangladesh), Saudi Arabia (saudi-arabia), Israel (israel), Nepal (nepal), Sri Lanka (sri-lanka), Myanmar (myanmar), Cambodia (cambodia), Laos (laos), Mongolia (mongolia), Uzbekistan (uzbekistan), Kyrgyzstan (kyrgyzstan), Tajikistan (tajikistan), Turkmenistan (turkmenistan), Qatar (qatar), Kuwait (kuwait), Bahrain (bahrain), Oman (oman), Jordan (jordan), Afghanistan (afghanistan), Armenia (armenia), Azerbaijan (azerbaijan), Bhutan (bhutan), Brunei (brunei), Georgia (georgia), Iran (iran), Iraq (iraq), Kazakhstan (kazakhstan), Lebanon (lebanon), Maldives (maldives), North Korea (north-korea), Palestine (palestine), Syria (syria), Taiwan (taiwan), Timor-Leste (timor-leste), Turkey (turkey), Yemen (yemen).

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. 60 tools is a density reference, not a cap or a filler target: add every meaningful local validator/generator/parser/debugger, and stop only when the local market truly has no more useful workflows.
- Every tool must render compact premium shell UI, validate/generate/explain where safe, validation pipeline, result cards, field breakdown, tool-context explanation, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Local generators must create fresh values on every Generate click, enforce country prefixes/check digits, and route invalid/bad-prefix fixtures into review/error states rather than green success.
- Country-specific analyzers must replace generic parser output whenever a local identifier has real structure. Generic "source payload / offline only" breakdown is only a fallback for tools with no formal structure.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.
- Russia and Belarus are explicitly excluded from ValidoHub scope. Transcontinental and disputed territories require an explicit product decision before inclusion.

## Batch Countries

- Japan: My Number, Corporate Number, Consumption tax / T-number, Zengin / Pay-easy reference, Qualified Invoice / T-number, APPI privacy.
- India: PAN, CIN / LLPIN, GSTIN, UPI / IFSC payment reference, GST e-invoice / IRN, DPDP Act privacy.
- Singapore: NRIC / FIN, UEN, GST, PayNow / FAST reference, InvoiceNow / Peppol, PDPA privacy.
- South Korea: RRN boundary, Business Registration Number, VAT / tax invoice number, virtual account / GIRO reference, National Tax Service e-tax invoice, PIPA privacy.
- United Arab Emirates: Emirates ID boundary, trade license number, VAT TRN, UAEFTS / WPS reference, VAT tax invoice, PDPL privacy.
- China: Resident ID boundary, USCC, VAT / taxpayer number, CNAPS / UnionPay reference, fapiao invoice, PIPL privacy.
- Indonesia: NIK boundary, NIB / company registration, NPWP, BI-FAST / QRIS reference, e-Faktur invoice, PDP Law privacy.
- Malaysia: MyKad boundary, SSM registration number, TIN / SST, DuitNow / FPX reference, MyInvois e-invoice, PDPA privacy.
- Thailand: Thai ID boundary, Juristic Person number, Revenue Department tax ID, PromptPay / BAHTNET reference, e-Tax invoice, PDPA privacy.
- Vietnam: Citizen ID boundary, enterprise registration code, tax code, NAPAS / VietQR reference, e-invoice code, PDPD privacy.
- Philippines: PhilSys boundary, SEC registration number, BIR TIN, InstaPay / PESONet reference, BIR invoice, Data Privacy Act privacy.
- Pakistan: CNIC boundary, SECP registration number, FBR NTN / STRN, Raast / 1LINK reference, FBR invoice, personal-data privacy.
- Bangladesh: NID boundary, RJSC registration number, TIN / BIN, BEFTN / NPSB reference, VAT invoice, personal-data privacy.
- Saudi Arabia: National ID boundary, Commercial Registration number, ZATCA VAT number, SADAD / SARIE reference, ZATCA e-invoice, PDPL privacy.
- Israel: Teudat Zehut boundary, company registration number, VAT / Osek number, Masav / Zahav reference, tax invoice, Privacy Protection Law.
- Nepal: Citizenship number boundary, company registration number, PAN / VAT, connectIPS / Fonepay reference, VAT invoice, Privacy Act boundary.
- Sri Lanka: NIC boundary, company registration number, TIN / VAT, LankaPay / CEFTS reference, VAT invoice, PDPA privacy.
- Myanmar: NRC boundary, DICA company number, TIN / commercial tax, CBM-Net / MPU reference, commercial tax invoice, privacy boundary.
- Cambodia: National ID boundary, company registration number, GDT TIN / VAT, Bakong / KHQR reference, VAT invoice, personal-data privacy.
- Laos: National ID boundary, enterprise registration number, TIN, LAPNet / BCEL One reference, tax invoice, data privacy boundary.
- Mongolia: Citizen registration number boundary, state registration number, VAT payer number, QPay / bank transfer reference, VAT e-barimt invoice, personal-data privacy.
- Uzbekistan: PINFL boundary, STIR / company tax number, STIR / QQS, Humo / Uzcard reference, e-invoice / hisob-faktura, personal-data privacy.
- Kyrgyzstan: PIN boundary, OKPO company code, TIN, Elkart / Elsom reference, tax invoice, personal-data privacy.
- Tajikistan: TIN boundary, company registration number, TIN / VAT, Korti Milli / bank reference, VAT invoice, personal-data privacy.
- Turkmenistan: Passport / ID boundary, company registration number, tax number, payment order reference, tax invoice, personal-data privacy.
- Qatar: QID boundary, commercial registration number, tax card number, QATCH / NAPS reference, tax invoice, PDPPL privacy.
- Kuwait: Civil ID boundary, commercial registration number, tax file number, KNET / CBK reference, tax invoice, data privacy boundary.
- Bahrain: CPR boundary, commercial registration number, VAT account number, BenefitPay / EFTS reference, VAT invoice, PDPL privacy.
- Oman: Civil number boundary, commercial registration number, VAT number, ACH / OmanNet reference, VAT invoice, PDPL privacy.
- Jordan: National number boundary, company national number, Income and Sales Tax number, CliQ / JoMoPay reference, sales tax invoice, personal-data privacy.
- Afghanistan: Tazkira boundary, company registration number, TIN, APS / bank transfer reference, tax invoice, personal-data privacy boundary.
- Armenia: public services number boundary, state register number, TIN / VAT, ArCa / bank transfer reference, tax invoice, personal-data privacy.
- Azerbaijan: FIN code boundary, company registration number, VOEN / TIN, AZIPS / XOHKS reference, e-invoice, personal-data privacy.
- Bhutan: CID boundary, company registration number, TPN / tax number, RMA / bank transfer reference, tax invoice, personal-data privacy boundary.
- Brunei: smart identity card boundary, ROC number, TIN, ACH / RTGS bank reference, tax invoice, PDPO privacy boundary.
- Georgia: personal number boundary, identification number, VAT / tax number, IBAN / RTGS reference, tax invoice, personal-data privacy.
- Iran: national code boundary, national company ID, economic code / VAT, Sheba / PAYA reference, tax invoice, personal-data privacy boundary.
- Iraq: national card boundary, company registration number, tax number, IBAN / RTGS reference, tax invoice, personal-data privacy boundary.
- Kazakhstan: IIN boundary, BIN, taxpayer number / VAT, IBAN / KISC reference, ESF e-invoice, personal-data privacy.
- Lebanon: national ID boundary, commercial registration number, VAT / tax number, IBAN / BDL reference, VAT invoice, personal-data privacy boundary.
- Maldives: National ID boundary, company registration number, TIN / GST number, MMA / bank transfer reference, GST invoice, data protection boundary.
- North Korea: resident certificate boundary, organization registration boundary, tax reference boundary, bank/payment reference boundary, trade invoice boundary, personal-data privacy boundary.
- Palestine: ID number boundary, company registration number, tax number / VAT, IBAN / PMMA reference, VAT invoice, personal-data privacy boundary.
- Syria: national number boundary, commercial registration number, tax number, bank/payment reference boundary, tax invoice, personal-data privacy boundary.
- Taiwan: National ID boundary, GUI number, VAT / business tax number, bank transfer / ACH reference, eGUI invoice, PDPA privacy.
- Timor-Leste: ID boundary, company registration number, tax identification number, R-TiMOR / bank reference, tax invoice, personal-data privacy boundary.
- Turkey: T.C. Kimlik boundary, MERSIS number, Vergi Kimlik Numarasi, IBAN / FAST reference, e-Fatura / e-Arsiv invoice, KVKK privacy.
- Yemen: national ID boundary, commercial registration number, tax number, bank/remittance reference boundary, tax invoice, personal-data privacy boundary.

## Acceptance

Run the premium gate per country:

```bash
npm run audit:country-premium -- --country japan
npm run audit:country-premium -- --country india
npm run audit:country-premium -- --country singapore
npm run audit:country-premium -- --country south-korea
npm run audit:country-premium -- --country united-arab-emirates
npm run audit:country-premium -- --country china
npm run audit:country-premium -- --country indonesia
npm run audit:country-premium -- --country malaysia
npm run audit:country-premium -- --country thailand
npm run audit:country-premium -- --country vietnam
npm run audit:country-premium -- --country philippines
npm run audit:country-premium -- --country pakistan
npm run audit:country-premium -- --country bangladesh
npm run audit:country-premium -- --country saudi-arabia
npm run audit:country-premium -- --country israel
npm run audit:country-premium -- --country nepal
npm run audit:country-premium -- --country sri-lanka
npm run audit:country-premium -- --country myanmar
npm run audit:country-premium -- --country cambodia
npm run audit:country-premium -- --country laos
npm run audit:country-premium -- --country mongolia
npm run audit:country-premium -- --country uzbekistan
npm run audit:country-premium -- --country kyrgyzstan
npm run audit:country-premium -- --country tajikistan
npm run audit:country-premium -- --country turkmenistan
npm run audit:country-premium -- --country qatar
npm run audit:country-premium -- --country kuwait
npm run audit:country-premium -- --country bahrain
npm run audit:country-premium -- --country oman
npm run audit:country-premium -- --country jordan
npm run audit:country-premium -- --country afghanistan
npm run audit:country-premium -- --country armenia
npm run audit:country-premium -- --country azerbaijan
npm run audit:country-premium -- --country bhutan
npm run audit:country-premium -- --country brunei
npm run audit:country-premium -- --country georgia
npm run audit:country-premium -- --country iran
npm run audit:country-premium -- --country iraq
npm run audit:country-premium -- --country kazakhstan
npm run audit:country-premium -- --country lebanon
npm run audit:country-premium -- --country maldives
npm run audit:country-premium -- --country north-korea
npm run audit:country-premium -- --country palestine
npm run audit:country-premium -- --country syria
npm run audit:country-premium -- --country taiwan
npm run audit:country-premium -- --country timor-leste
npm run audit:country-premium -- --country turkey
npm run audit:country-premium -- --country yemen
```

Then run `npm run audit:country-suite`, full `npm run build`, and Engine doctor before sign-off.
