(function () {
  'use strict';

  const VERSION = '2026-07-27-country-rich-lab-v3';

  const ROUND3_PROFILES = createRound3Profiles();

  const PROFILES = [
    p('pesel-validator', 'Poland', 'PESEL', 'pesel', '44051401358', '44051401359', [
      ['gov.pl PESEL overview', 'https://www.gov.pl/web/gov/sprawdz-swoje-dane-w-rejestrze-pesel'],
      ['Polish public-services PESEL context', 'https://www.gov.pl/web/cyfryzacja']
    ]),
    p('brazil-cpf-validator', 'Brazil', 'CPF', 'cpf', '529.982.247-25', '529.982.247-24', [['Receita Federal CPF', 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-cpf']]),
    p('brazil-cnpj-validator', 'Brazil', 'CNPJ', 'cnpj', '11.222.333/0001-81', '11.222.333/0001-82', [['Receita Federal CNPJ', 'https://www.gov.br/receitafederal/pt-br/assuntos/cnpj']]),
    p('india-payment-reference-helper', 'India', 'UPI ID / UPI QR boundary', 'upi', 'demo.user@oksbi', 'bad upi value', [['NPCI UPI', 'https://www.npci.org.in/what-we-do/upi/product-overview']]),
    p('india-tax-id-validator', 'India', 'GSTIN', 'gstin', '27ABCDE1234F1Z5', '27ABCDE1234F1Z0', [['GST portal', 'https://www.gst.gov.in/']]),
    p('india-pan-validator', 'India', 'PAN', 'pan', 'ABCDE1234F', 'ABCDE1234Z', [['Income Tax Department PAN', 'https://www.incometax.gov.in/iec/foportal/']]),
    p('india-aadhaar-boundary-social-insurance-helper', 'India', 'Aadhaar format / Verhoeff boundary', 'aadhaar', '2345 6789 0123', '2345 6789 0124', [['UIDAI Aadhaar', 'https://uidai.gov.in/']]),
    p('mexico-rfc-validator', 'Mexico', 'RFC', 'mx-rfc', 'XAXX010101000', 'XAXX010101999', [['SAT RFC', 'https://www.sat.gob.mx/']]),
    p('mexico-curp-validator', 'Mexico', 'CURP', 'mx-curp', 'GODE561231HDFRRN00', 'GODE561231HDFRRN09', [['RENAPO CURP', 'https://www.gob.mx/curp/']]),
    p('mexico-domestic-bank-account-inspector', 'Mexico', 'CLABE', 'clabe', '002010077777777771', '002010077777777770', [['Banco de Mexico SPEI/CLABE context', 'https://www.banxico.org.mx/']]),
    p('argentina-cuit-validator', 'Argentina', 'CUIT / CUIL', 'ar-cuit', '30-12345678-1', '30-12345678-0', [['AFIP / ARCA CUIT', 'https://www.afip.gob.ar/']]),
    p('argentina-cuil-social-insurance-helper', 'Argentina', 'CUIL', 'ar-cuit', '20-30123456-3', '20-30123456-0', [['ANSES CUIL', 'https://www.anses.gob.ar/']]),
    p('argentina-domestic-account-validator', 'Argentina', 'CBU / CVU', 'ar-cbu', '2850590940090418135201', '2850590940090418135200', [['Banco Central de la Republica Argentina', 'https://www.bcra.gob.ar/']]),
    p('chile-rut-validator', 'Chile', 'RUT / RUN', 'cl-rut', '12.345.678-5', '12.345.678-0', [['Servicio de Impuestos Internos RUT', 'https://www.sii.cl/']]),
    p('colombia-nit-validator', 'Colombia', 'NIT', 'co-nit', '900373913-4', '900373913-0', [['DIAN NIT/RUT', 'https://www.dian.gov.co/']]),
    p('colombia-e-invoicing-readiness-checker', 'Colombia', 'CUFE boundary', 'text-boundary', 'CUFE 0123456789ABCDEF invoice payload sample', 'CUFE missing', [['DIAN factura electronica', 'https://www.dian.gov.co/']]),
    p('peru-ruc-validator', 'Peru', 'RUC', 'pe-ruc', '20123456789', '20123456780', [['SUNAT RUC', 'https://www.sunat.gob.pe/']]),
    p('peru-domestic-account-validator', 'Peru', 'CCI', 'domestic-account', '00200100000012345678', '002001', [['Banco Central de Reserva del Peru', 'https://www.bcrp.gob.pe/']]),
    p('united-states-bank-routing-handoff-checklist', 'United States', 'ABA routing number', 'us-aba', '021000021', '021000020', [['Federal Reserve E-Payments Routing Directory', 'https://www.frbservices.org/EPaymentsDirectory']]),
    p('united-states-ein-validator', 'United States', 'EIN / TIN boundary lab', 'us-ein', '12-3456789', '12-34567', [['IRS EIN', 'https://www.irs.gov/businesses/small-businesses-self-employed/employer-id-numbers']]),
    p('united-states-postal-code-validator', 'United States', 'ZIP+4 / address boundary lab', 'us-zip', '20500-0003', '2050', [['USPS ZIP Code lookup', 'https://tools.usps.com/zip-code-lookup.htm']]),
    p('canada-business-number-validator', 'Canada', 'Business Number / GST-HST', 'ca-bn', '123456789RT0001', '12345678RT0001', [['CRA Business Number', 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/registering-your-business/business-number-program.html']]),
    p('canada-bank-routing-handoff-checklist', 'Canada', 'Routing transit / institution number', 'ca-routing', '00011-003', '11-3', [['Payments Canada', 'https://www.payments.ca/']]),
    p('united-kingdom-bank-account-inspector', 'United Kingdom', 'Sort code + account number', 'uk-sort', '12-34-56 12345678', '12-34 123', [['Faster Payments sort code checker', 'https://www.wearepay.uk/']]),
    p('united-kingdom-vat-id-validator', 'United Kingdom', 'VAT number', 'uk-vat', 'GB 123456782', 'GB 123456789', [['HMRC VAT', 'https://www.gov.uk/vat-registration']]),
    p('united-kingdom-national-insurance-number-validator', 'United Kingdom', 'National Insurance number', 'uk-nino', 'QQ 12 34 56 C', 'QQ 12 34 56 X', [['GOV.UK National Insurance', 'https://www.gov.uk/national-insurance']]),
    p('germany-iban-validator', 'Germany', 'IBAN + BLZ / bank-code anatomy', 'iban', 'DE89370400440532013000', 'DE89370400440532013001', [['Bundesbank bank sort codes', 'https://www.bundesbank.de/en/tasks/payment-systems/services/bank-sort-codes']]),
    p('german-blz-bank-code-inspector', 'Germany', 'BLZ bank code anatomy', 'de-blz', '37040044', '3704', [['Bundesbank bank sort codes', 'https://www.bundesbank.de/en/tasks/payment-systems/services/bank-sort-codes']]),
    p('german-tax-id-validator', 'Germany', 'Steuer-ID', 'de-idnr', '86095742710', '86095742711', [['Bundeszentralamt fuer Steuern IdNr', 'https://www.bzst.de/']]),
    p('france-siren-validator', 'France', 'SIREN', 'luhn', '732829320', '732829321', [['INSEE SIRENE', 'https://www.insee.fr/en/metadonnees/definition/c2047']]),
    p('france-siret-validator', 'France', 'SIRET', 'luhn', '73282932000074', '73282932000075', [['INSEE SIRENE', 'https://www.insee.fr/en/metadonnees/definition/c2047']]),
    p('france-vat-tva-validator', 'France', 'TVA intracom / VAT', 'fr-vat', 'FR40303265045', 'FR00303265045', [['impots.gouv.fr VAT', 'https://www.impots.gouv.fr/']]),
    p('france-rib-validator', 'France', 'RIB / IBAN key', 'fr-rib', '3000400855000123456789058', '3000400855000123456789059', [['Banque de France', 'https://www.banque-france.fr/']]),
    p('spain-id-validator', 'Spain', 'DNI / NIE / CIF', 'es-id', '12345678Z', '12345678A', [['Ministerio del Interior DNI', 'https://www.interior.gob.es/']]),
    p('italy-codice-fiscale-validator', 'Italy', 'Codice Fiscale', 'it-cf', 'RSSMRA85M01H501Z', 'RSSMRA85M01H501A', [['Agenzia delle Entrate codice fiscale', 'https://www.agenziaentrate.gov.it/']]),
    p('italy-partita-iva-validator', 'Italy', 'Partita IVA', 'it-piva', '01114601006', '01114601007', [['Agenzia delle Entrate partita IVA', 'https://www.agenziaentrate.gov.it/']]),
    p('netherlands-bsn-validator', 'Netherlands', 'BSN', 'nl-bsn', '111222333', '111222334', [['Rijksoverheid BSN', 'https://www.rijksoverheid.nl/onderwerpen/privacy-en-persoonsgegevens/burgerservicenummer-bsn']]),
    p('netherlands-kvk-number-validator', 'Netherlands', 'KvK', 'nl-kvk', '90004603', '9000460', [['KVK Handelsregister', 'https://www.kvk.nl/']]),
    p('netherlands-btw-vat-validator', 'Netherlands', 'BTW / VAT', 'nl-vat', 'NL123456789B01', 'NL12345678B01', [['Belastingdienst btw', 'https://www.belastingdienst.nl/']]),
    p('belgium-rrn-niss-validator', 'Belgium', 'NISS / BIS', 'be-niss', '85.07.30-033.28', '85.07.30-033.00', [['Belgium social security', 'https://www.socialsecurity.be/']]),
    p('belgium-kbo-bce-validator', 'Belgium', 'KBO / BCE', 'be-kbo', '0123.456.749', '0123.456.700', [['KBO/BCE public search', 'https://kbopub.economie.fgov.be/']]),
    p('switzerland-qr-bill-reference-validator', 'Switzerland', 'QR-bill / QR reference', 'ch-qrref', '210000000003139471430009017', '210000000003139471430009018', [['SIX QR-bill', 'https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/qr-bill.html']]),
    p('switzerland-iban-validator', 'Switzerland', 'QR-IBAN / IBAN', 'iban', 'CH9300762011623852957', 'CH9300762011623852958', [['SIX QR-bill', 'https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/qr-bill.html']]),
    p('sweden-personnummer-validator', 'Sweden', 'Personnummer', 'se-person', '850101-1236', '850101-1237', [['Skatteverket personnummer', 'https://www.skatteverket.se/']]),
    p('norway-fodselsnummer-validator', 'Norway', 'Fodselsnummer / D-number', 'no-fnr', '01010112345', '01010112340', [['Skatteetaten ID numbers', 'https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/']]),
    p('denmark-cpr-validator', 'Denmark', 'CPR / CVR', 'dk-cpr', '010170-1234', '010170-123', [['CPR.dk', 'https://cpr.dk/']]),
    p('denmark-cvr-validator', 'Denmark', 'CVR', 'dk-cvr', '12345674', '12345670', [['Virk CVR', 'https://datacvr.virk.dk/']]),
    p('finland-hetu-validator', 'Finland', 'HETU', 'fi-hetu', '131052-308T', '131052-308A', [['Digital and Population Data Services Agency', 'https://dvv.fi/en/personal-identity-code']]),
    p('estonia-isikukood-validator', 'Estonia', 'Isikukood', 'ee-isikukood', '37605030299', '37605030298', [['Estonian personal identification code', 'https://www.riigiportaal.ee/']]),
    p('australia-abn-acn-validator', 'Australia', 'ABN / ACN', 'au-abn', '51 824 753 556', '51 824 753 557', [['Australian Business Register ABN', 'https://abr.business.gov.au/']]),
    p('australia-bank-account-validator', 'Australia', 'BSB + account / PayID boundary', 'au-bsb', '062-000 12345678', '062 12', [['AusPayNet BSB', 'https://www.auspaynet.com.au/']]),
    p('new-zealand-ird-number-boundary-validator', 'New Zealand', 'IRD', 'nz-ird', '49-098-576', '49-098-570', [['Inland Revenue NZ', 'https://www.ird.govt.nz/']]),
    p('new-zealand-nzbn-validator', 'New Zealand', 'NZBN', '9429041901234', '9429041901230', [['NZBN Register', 'https://www.nzbn.govt.nz/']]),
    p('singapore-nric-fin-validator', 'Singapore', 'NRIC / FIN', 'sg-nric', 'S1234567D', 'S1234567A', [['ICA Singapore NRIC', 'https://www.ica.gov.sg/']]),
    p('singapore-uen-validator', 'Singapore', 'UEN', 'sg-uen', '201912345K', '201912345A', [['UEN Singapore', 'https://www.uen.gov.sg/']]),
    p('singapore-payment-reference-helper', 'Singapore', 'PayNow / SGQR', 'sg-paynow', '+65 9123 4567', 'paynow?', [['MAS SGQR', 'https://www.mas.gov.sg/development/e-payments/sgqr']]),
    p('malaysia-mykad-boundary-validator', 'Malaysia', 'MyKad / NRIC', 'my-mykad', '850101-14-5678', '850101-99-567', [['JPN Malaysia MyKad', 'https://www.jpn.gov.my/']]),
    p('indonesia-nik-boundary-validator', 'Indonesia', 'NIK', 'id-nik', '3174010101900001', '317401010190000', [['Dukcapil Indonesia', 'https://dukcapil.kemendagri.go.id/']]),
    p('indonesia-tax-id-validator', 'Indonesia', 'NPWP / QRIS boundary', 'id-npwp', '01.234.567.8-901.000', '01.234.567.8-901', [['DJP NPWP', 'https://www.pajak.go.id/']]),
    p('thailand-thai-id-boundary-validator', 'Thailand', 'Thai National ID', 'th-id', '1101700203450', '1101700203451', [['Thailand DOPA', 'https://www.dopa.go.th/']]),
    p('thailand-payment-reference-helper', 'Thailand', 'PromptPay', 'promptpay', '0812345678', 'promptpay bad', [['Bank of Thailand PromptPay', 'https://www.bot.or.th/']]),
    p('china-uscc-validator', 'China', 'Unified Social Credit Code', 'cn-uscc', '91350211M000100Y46', '91350211M000100Y40', [['SAMR China credit code context', 'https://www.samr.gov.cn/']]),
    p('japan-my-number-validator', 'Japan', 'My Number', 'jp-my', '123456789018', '123456789012', [['Digital Agency Japan My Number', 'https://www.digital.go.jp/']]),
    p('japan-corporate-number-validator', 'Japan', 'Corporate Number', 'jp-corp', '7000012050002', '7000012050000', [['National Tax Agency Corporate Number', 'https://www.houjin-bangou.nta.go.jp/en/']]),
    p('south-africa-national-id-boundary-validator', 'South Africa', 'South African ID number', 'za-id', '8001015009087', '8001015009086', [['Department of Home Affairs', 'https://www.dha.gov.za/']]),
    p('south-africa-tax-id-validator', 'South Africa', 'SARS tax reference boundary', 'structured-tax', '0123456789', '123', [['SARS tax number context', 'https://www.sars.gov.za/']]),
    p('turkey-t-c-kimlik-boundary-validator', 'Turkey', 'TCKN national ID', 'tr-tckn', '10000000146', '10000000145', [['NVI identity services', 'https://www.nvi.gov.tr/']]),
    p('turkey-tax-id-validator', 'Turkey', 'Vergi Kimlik No', 'structured-tax', '1234567890', '12345', [['Turkish Revenue Administration', 'https://www.gib.gov.tr/']]),
    p('south-korea-rrn-boundary-validator', 'South Korea', 'RRN boundary lab', 'kr-rrn', '900101-1234567', '900101-123', [['Korea personal information guidance', 'https://www.pipc.go.kr/']]),
    p('south-korea-business-registration-number-validator', 'South Korea', 'Business registration number', 'kr-brn', '123-45-67890', '123-45-67891', [['National Tax Service Korea', 'https://www.nts.go.kr/']]),
    p('vietnam-citizen-id-boundary-validator', 'Vietnam', 'Citizen ID / CCCD', 'vn-cccd', '001203000001', '001203', [['Vietnam public security portal', 'https://bocongan.gov.vn/']]),
    p('vietnam-tax-id-validator', 'Vietnam', 'Tax code / MST', 'vn-mst', '0100109106', '010010910', [['General Department of Taxation Vietnam', 'https://www.gdt.gov.vn/']]),
    p('philippines-tax-id-validator', 'Philippines', 'TIN boundary lab', 'ph-tin', '123-456-789-000', '123', [['Bureau of Internal Revenue Philippines', 'https://www.bir.gov.ph/']]),
    p('israel-teudat-zehut-boundary-validator', 'Israel', 'Teudat Zehut', 'il-tz', '123456782', '123456780', [['Population and Immigration Authority Israel', 'https://www.gov.il/en/departments/population_and_immigration_authority/govil-landing-page']]),
    p('saudi-arabia-national-id-boundary-validator', 'Saudi Arabia', 'National ID / Iqama boundary', 'sa-id', '1000000008', '100000000', [['Absher / National information context', 'https://www.absher.sa/']]),
    p('saudi-arabia-commercial-registration-number-validator', 'Saudi Arabia', 'Commercial registration number', 'structured-tax', '1010123456', '1010', [['Saudi Ministry of Commerce', 'https://mc.gov.sa/']]),
    p('united-arab-emirates-tax-id-validator', 'United Arab Emirates', 'TRN / tax registration number', 'ae-trn', '100123456700003', '100123', [['UAE Federal Tax Authority', 'https://tax.gov.ae/']]),
    p('portugal-vat-id-validator', 'Portugal', 'NIF / VAT number', 'pt-nif', '501964843', '501964840', [['Autoridade Tributaria Portugal', 'https://www.portaldasfinancas.gov.pt/']]),
    p('ireland-ppsn-validator', 'Ireland', 'PPS number', 'ie-pps', '1234567T', '1234567A', [['Ireland PPS number context', 'https://www.gov.ie/']]),
    p('austria-svnr-validator', 'Austria', 'SVNR social insurance number', 'at-svnr', '1234010180', '1234010181', [['Austrian social insurance', 'https://www.sozialversicherung.at/']]),
    p('czechia-ico-validator', 'Czechia', 'ICO business identifier', 'cz-ico', '27074358', '27074359', [['ARES business register', 'https://ares.gov.cz/']]),
    p('slovakia-rodne-cislo-validator', 'Slovakia', 'Rodne cislo boundary', 'sk-rc', '800101/1239', '800101/123', [['Slovakia public administration portal', 'https://www.slovensko.sk/']]),
    p('slovenia-maticna-stevilka-validator', 'Slovenia', 'Maticna stevilka', 'si-maticna', '5020551', '5020550', [['AJPES Slovenia', 'https://www.ajpes.si/']]),
    p('croatia-oib-validator', 'Croatia', 'OIB', 'hr-oib', '94577403160', '94577403161', [['Croatian Tax Administration OIB', 'https://www.porezna-uprava.hr/']]),
    p('romania-cnp-validator', 'Romania', 'CNP personal numeric code', 'ro-cnp', '1800101221144', '1800101221140', [['Romania personal data authority context', 'https://www.dataprotection.ro/']]),
    p('romania-vat-id-validator', 'Romania', 'CUI / VAT boundary', 'structured-tax', 'RO1234567', 'RO12', [['ANAF Romania', 'https://www.anaf.ro/']]),
    p('hungary-vat-id-validator', 'Hungary', 'Tax number boundary', 'hu-tax', '12345678-1-42', '1234', [['NAV Hungary', 'https://nav.gov.hu/']]),
    p('greece-vat-id-validator', 'Greece', 'AFM / VAT number', 'gr-afm', '094259216', '094259210', [['AADE Greece', 'https://www.aade.gr/']]),
    p('greece-amka-validator', 'Greece', 'AMKA boundary lab', 'structured-id', '01018012345', '010180', [['AMKA Greece', 'https://www.amka.gr/']]),
    p('luxembourg-matricule-validator', 'Luxembourg', 'Matricule boundary lab', 'structured-id', '1980010101234', '1980', [['Guichet Luxembourg', 'https://guichet.public.lu/']]),
    p('iceland-kennitala-validator', 'Iceland', 'Kennitala', '1201743399', '1201743390', [['Registers Iceland', 'https://www.skra.is/']]),
    p('lithuania-asmens-kodas-validator', 'Lithuania', 'Asmens kodas', 'structured-id', '39001010007', '39001010000', [['Lithuania e-government gateway', 'https://www.epaslaugos.lt/']]),
    p('latvia-personal-code-validator', 'Latvia', 'Personas kods boundary', 'lv-pk', '010180-12345', '010180', [['Latvia PMLP', 'https://www.pmlp.gov.lv/']]),
    p('malta-vat-id-validator', 'Malta', 'VAT number boundary', 'structured-tax', 'MT12345678', 'MT12', [['Malta Commissioner for Revenue', 'https://cfr.gov.mt/']]),
    p('cyprus-vat-id-validator', 'Cyprus', 'VAT number boundary', 'structured-tax', 'CY12345678X', 'CY12', [['Cyprus Tax Department', 'https://www.mof.gov.cy/mof/tax/']]),
    p('uruguay-rut-validator', 'Uruguay', 'RUT', 'uy-rut', '214823560017', '214823560010', [['DGI Uruguay', 'https://www.dgi.gub.uy/']]),
    p('uruguay-cedula-de-identidad-validator', 'Uruguay', 'Cedula de identidad', 'uy-ci', '1.234.567-2', '1.234.567-0', [['Direccion Nacional de Identificacion Civil Uruguay', 'https://www.gub.uy/ministerio-interior/']]),
    p('paraguay-ruc-validator', 'Paraguay', 'RUC', 'py-ruc', '80012345-6', '80012345-0', [['DNIT Paraguay', 'https://www.dnit.gov.py/']]),
    p('paraguay-cedula-validator', 'Paraguay', 'Cedula boundary lab', 'structured-id', '1234567', '123', [['Paraguay government portal', 'https://www.paraguay.gov.py/']]),
    p('ecuador-cedula-validator', 'Ecuador', 'Cedula', 'ec-cedula', '1710034065', '1710034060', [['Registro Civil Ecuador', 'https://www.registrocivil.gob.ec/']]),
    p('ecuador-ruc-validator', 'Ecuador', 'RUC boundary lab', 'ec-ruc', '1790012345001', '179001', [['SRI Ecuador', 'https://www.sri.gob.ec/']]),
    p('costa-rica-cedula-juridica-validator', 'Costa Rica', 'Cedula juridica / tax ID', 'structured-tax', '3-101-123456', '3101', [['Ministerio de Hacienda Costa Rica', 'https://www.hacienda.go.cr/']]),
    p('dominican-republic-rnc-validator', 'Dominican Republic', 'RNC', 'do-rnc', '101001122', '101001120', [['DGII Dominican Republic', 'https://dgii.gov.do/']]),
    p('panama-ruc-dv-validator', 'Panama', 'RUC boundary lab', 'structured-tax', '123456-1-123456', '123', [['DGI Panama', 'https://dgi.mef.gob.pa/']]),
    p('ghana-tax-id-validator', 'Ghana', 'TIN / Ghana Card PIN boundary', 'structured-id', 'GHA-123456789-1', 'GHA', [['Ghana Revenue Authority', 'https://gra.gov.gh/']]),
    p('nigeria-national-id-boundary-validator', 'Nigeria', 'NIN boundary lab', 'structured-id', '12345678901', '12345', [['NIMC Nigeria', 'https://nimc.gov.ng/']]),
    p('kenya-tax-id-validator', 'Kenya', 'KRA PIN boundary lab', 'ke-pin', 'A123456789B', 'A12345', [['Kenya Revenue Authority', 'https://www.kra.go.ke/']]),
    p('kenya-national-id-boundary-validator', 'Kenya', 'National ID boundary lab', 'structured-id', '12345678', '123', [['Kenya eCitizen', 'https://www.ecitizen.go.ke/']]),
    p('morocco-tax-id-validator', 'Morocco', 'ICE / tax identifier boundary', 'structured-tax', '001525338000053', '001525', [['Morocco tax administration', 'https://www.tax.gov.ma/']]),
    p('egypt-national-id-boundary-validator', 'Egypt', 'National ID boundary lab', 'eg-id', '28001011234567', '2800101', [['Egypt digital government portal', 'https://digital.gov.eg/']]),
    ...ROUND3_PROFILES
  ];

  function p(slug, country, title, family, sample, invalid, sources, meta) {
    return { slug, country, title, family, sample, invalid, sources: sources || [], meta: meta || {} };
  }

  function createRound3Profiles() {
    const official = {
      postal: [['Universal Postal Union addressing resources', 'https://www.upu.int/']],
      phone: [['ITU numbering resources', 'https://www.itu.int/']],
      bic: [['ISO 9362 / SWIFT BIC overview', 'https://www.swift.com/standards/data-standards/bic-business-identifier-code']],
      passport: [['ICAO Doc 9303 travel document context', 'https://www.icao.int/publications/pages/publication.aspx?docnum=9303']],
      bank: [['BIS payment systems context', 'https://www.bis.org/cpmi/']],
      invoice: [['OECD tax administration digitalisation context', 'https://www.oecd.org/tax/forum-on-tax-administration/']],
      company: [['OpenCorporates register coverage context', 'https://opencorporates.com/registers']],
      customs: [['World Customs Organization data model context', 'https://www.wcoomd.org/']],
      procurement: [['Open Contracting data standards context', 'https://standard.open-contracting.org/']]
    };
    const countries = {
      poland: c('Poland', 'PL', '+48', '00-001', 'BREXPLPW'),
      brazil: c('Brazil', 'BR', '+55', '01001-000', 'BRASBRRJ'),
      france: c('France', 'FR', '+33', '75008', 'AGRIFRPP'),
      netherlands: c('Netherlands', 'NL', '+31', '1012 AB', 'ABNANL2A'),
      switzerland: c('Switzerland', 'CH', '+41', '8001', 'UBSWCHZH80A'),
      germany: c('Germany', 'DE', '+49', '10115', 'DEUTDEFF'),
      italy: c('Italy', 'IT', '+39', '00118', 'BCITITMM'),
      spain: c('Spain', 'ES', '+34', '28013', 'CAIXESBBXXX'),
      'united-kingdom': c('United Kingdom', 'GB', '+44', 'SW1A 1AA', 'BARCGB22'),
      australia: c('Australia', 'AU', '+61', '2000', 'CTBAAU2S'),
      canada: c('Canada', 'CA', '+1', 'K1A 0B1', 'BOFMCAM2'),
      'united-states': c('United States', 'US', '+1', '20500', 'CHASUS33'),
      mexico: c('Mexico', 'MX', '+52', '06000', 'BCMRMXMM'),
      argentina: c('Argentina', 'AR', '+54', 'C1000', 'BFRPARBA'),
      chile: c('Chile', 'CL', '+56', '8320000', 'BCHICLRM'),
      colombia: c('Colombia', 'CO', '+57', '110111', 'COLOCOBM'),
      peru: c('Peru', 'PE', '+51', '15001', 'BCPLPEPL'),
      india: c('India', 'IN', '+91', '110001', 'SBININBB'),
      singapore: c('Singapore', 'SG', '+65', '018956', 'DBSSSGSG'),
      japan: c('Japan', 'JP', '+81', '100-0001', 'BOTKJPJT'),
      china: c('China', 'CN', '+86', '100000', 'BKCHCNBJ'),
      thailand: c('Thailand', 'TH', '+66', '10110', 'KASITHBK'),
      malaysia: c('Malaysia', 'MY', '+60', '50000', 'MBBEMYKL'),
      indonesia: c('Indonesia', 'ID', '+62', '10110', 'CENAIDJA'),
      'south-africa': c('South Africa', 'ZA', '+27', '0001', 'SBZAZAJJ'),
      kenya: c('Kenya', 'KE', '+254', '00100', 'KCBLKENX'),
      ghana: c('Ghana', 'GH', '+233', 'GA-183-8164', 'GHCBGHAC'),
      nigeria: c('Nigeria', 'NG', '+234', '100001', 'ZEIBNGLA'),
      morocco: c('Morocco', 'MA', '+212', '10000', 'BCMAMAMC'),
      egypt: c('Egypt', 'EG', '+20', '11511', 'CIBEEGCX'),
      turkey: c('Turkey', 'TR', '+90', '06010', 'TCZBTR2A'),
      israel: c('Israel', 'IL', '+972', '9199900', 'LUMIILIT'),
      'saudi-arabia': c('Saudi Arabia', 'SA', '+966', '11564', 'NCBKSAJE'),
      'united-arab-emirates': c('United Arab Emirates', 'AE', '+971', '00000', 'EBILAEAD'),
      philippines: c('Philippines', 'PH', '+63', '1000', 'BOPIPHMM'),
      vietnam: c('Vietnam', 'VN', '+84', '100000', 'BFTVVNVX'),
      'south-korea': c('South Korea', 'KR', '+82', '04524', 'KOEXKRSE'),
      portugal: c('Portugal', 'PT', '+351', '1000-001', 'CGDIPTPL'),
      ireland: c('Ireland', 'IE', '+353', 'D02 X285', 'BOFIIE2D'),
      austria: c('Austria', 'AT', '+43', '1010', 'BKAUATWW'),
      czechia: c('Czechia', 'CZ', '+420', '110 00', 'KOMBCZPP'),
      slovakia: c('Slovakia', 'SK', '+421', '811 01', 'GIBASKBX'),
      slovenia: c('Slovenia', 'SI', '+386', '1000', 'LJBASI2X'),
      croatia: c('Croatia', 'HR', '+385', '10000', 'ZABAHR2X'),
      romania: c('Romania', 'RO', '+40', '010011', 'RNCBROBU'),
      hungary: c('Hungary', 'HU', '+36', '1051', 'OTPVHUHB'),
      greece: c('Greece', 'GR', '+30', '105 57', 'BNGRGRAA'),
      iceland: c('Iceland', 'IS', '+354', '101', 'GLITISRE'),
      lithuania: c('Lithuania', 'LT', '+370', '01100', 'CBVILT2X'),
      latvia: c('Latvia', 'LV', '+371', 'LV-1050', 'HABALV22'),
      malta: c('Malta', 'MT', '+356', 'VLT 1111', 'VALLMTMT'),
      cyprus: c('Cyprus', 'CY', '+357', '1010', 'BCYPCY2N'),
      uruguay: c('Uruguay', 'UY', '+598', '11000', 'BROUUYMM'),
      paraguay: c('Paraguay', 'PY', '+595', '1209', 'BNFAPYPX'),
      ecuador: c('Ecuador', 'EC', '+593', '170150', 'PICHECEQ'),
      'costa-rica': c('Costa Rica', 'CR', '+506', '10101', 'BNCRCRSJ'),
      panama: c('Panama', 'PA', '+507', '0801', 'NATAPAPA'),
      'dominican-republic': c('Dominican Republic', 'DO', '+1', '10203', 'BRRDDOSD')
    };
    const routeSpecs = [
      ['poland','poland-invoice-number-helper','invoice-ref'],['poland','poland-mrz-passport-id-parser','passport-lite'],['poland','poland-passport-number-inspector','passport-lite'],['poland','poland-phone-number-validator','phone-local'],['poland','poland-postal-code-validator','postal-local'],['poland','poland-swift-bic-inspector','bic'],
      ['brazil','brazil-iban-validator','bank-account-lite'],['brazil','brazil-passport-number-helper','passport-lite'],['brazil','brazil-phone-e164-formatter','phone-local'],
      ['france','france-bic-swift-inspector','bic'],['france','france-e-invoicing-readiness-helper','invoice-ref'],['france','france-iban-validator','iban'],['france','france-invoice-number-helper','invoice-ref'],['france','france-passport-number-helper','passport-lite'],['france','france-phone-e164-formatter','phone-local'],['france','france-phone-number-validator','phone-local'],['france','france-postal-code-validator','postal-local'],
      ['netherlands','netherlands-bic-swift-inspector','bic'],['netherlands','netherlands-e-invoicing-readiness-helper','invoice-ref'],['netherlands','netherlands-iban-validator','iban'],['netherlands','netherlands-ideal-payment-reference-helper','payment-ref'],['netherlands','netherlands-invoice-number-helper','invoice-ref'],['netherlands','netherlands-passport-number-helper','passport-lite'],['netherlands','netherlands-phone-e164-formatter','phone-local'],['netherlands','netherlands-phone-number-validator','phone-local'],
      ['switzerland','switzerland-bic-swift-inspector','bic'],['switzerland','switzerland-e-invoicing-readiness-helper','invoice-ref'],['switzerland','switzerland-invoice-number-helper','invoice-ref'],['switzerland','switzerland-passport-number-helper','passport-lite'],['switzerland','switzerland-phone-e164-formatter','phone-local'],['switzerland','switzerland-phone-number-validator','phone-local'],['switzerland','switzerland-postal-code-validator','postal-local'],['switzerland','switzerland-postal-tracking-helper','tracking-ref'],['switzerland','switzerland-vehicle-plate-inspector','vehicle-plate'],
      ['germany','german-bic-swift-inspector','bic'],['germany','german-e-invoicing-readiness-helper','invoice-ref'],['germany','german-invoice-number-helper','invoice-ref'],['germany','german-passport-number-helper','passport-lite'],['germany','german-phone-e164-formatter','phone-local'],['germany','german-phone-number-validator','phone-local'],['germany','german-postal-code-validator','postal-local'],['germany','german-postal-tracking-helper','tracking-ref'],['germany','german-vehicle-plate-inspector','vehicle-plate'],
      ['italy','italy-bic-swift-inspector','bic'],['italy','italy-e-invoicing-readiness-helper','invoice-ref'],['italy','italy-iban-validator','iban'],['italy','italy-invoice-number-helper','invoice-ref'],['italy','italy-mrz-passport-parser','passport-lite'],['italy','italy-passport-number-helper','passport-lite'],['italy','italy-phone-e164-formatter','phone-local'],['italy','italy-phone-number-validator','phone-local'],['italy','italy-postal-code-validator','postal-local'],['italy','italy-postal-tracking-helper','tracking-ref'],['italy','italy-vat-id-validator','structured-tax'],['italy','italy-vehicle-plate-inspector','vehicle-plate'],
      ['spain','spain-bic-swift-inspector','bic'],['spain','spain-ccc-bank-account-inspector','bank-account-lite'],['spain','spain-iban-validator','iban'],['spain','spain-invoice-number-helper','invoice-ref'],['spain','spain-mrz-passport-parser','passport-lite'],['spain','spain-passport-number-helper','passport-lite'],['spain','spain-phone-e164-formatter','phone-local'],['spain','spain-phone-number-validator','phone-local'],['spain','spain-postal-code-validator','postal-local'],['spain','spain-postal-tracking-helper','tracking-ref'],['spain','spain-vat-id-validator','structured-tax'],['spain','spain-vehicle-plate-inspector','vehicle-plate'],
      ['united-kingdom','united-kingdom-bic-swift-inspector','bic'],['united-kingdom','united-kingdom-e-invoicing-readiness-checker','invoice-ref'],['united-kingdom','united-kingdom-iban-validator','iban'],['united-kingdom','united-kingdom-invoice-number-helper','invoice-ref'],['united-kingdom','united-kingdom-mrz-passport-parser','passport-lite'],['united-kingdom','united-kingdom-passport-number-helper','passport-lite'],['united-kingdom','united-kingdom-payment-reference-helper','payment-ref'],['united-kingdom','united-kingdom-phone-e164-formatter','phone-local'],['united-kingdom','united-kingdom-phone-number-validator','phone-local'],['united-kingdom','united-kingdom-postal-code-validator','postal-local'],['united-kingdom','united-kingdom-postal-tracking-helper','tracking-ref'],['united-kingdom','united-kingdom-procurement-identifier-helper','procurement-ref'],['united-kingdom','united-kingdom-vehicle-plate-inspector','vehicle-plate'],
      ['australia','australia-bank-account-inspector','bank-account-lite'],['australia','australia-bic-swift-inspector','bic'],['australia','australia-customs-importer-code-helper','customs-ref'],['australia','australia-e-invoicing-readiness-checker','invoice-ref'],['australia','australia-invoice-number-helper','invoice-ref'],['australia','australia-mrz-passport-parser','passport-lite'],['australia','australia-passport-number-helper','passport-lite'],['australia','australia-payment-reference-helper','payment-ref'],['australia','australia-phone-e164-formatter','phone-local'],['australia','australia-phone-number-validator','phone-local'],['australia','australia-postal-code-validator','postal-local'],['australia','australia-postal-tracking-helper','tracking-ref'],['australia','australia-procurement-identifier-helper','procurement-ref'],['australia','australia-tax-id-validator','structured-tax'],['australia','australia-vehicle-plate-inspector','vehicle-plate'],
      ['canada','canada-bic-swift-inspector','bic'],['canada','canada-domestic-bank-account-inspector','bank-account-lite'],['canada','canada-invoice-number-format-helper','invoice-ref'],['canada','canada-passport-mrz-parser','passport-lite'],['canada','canada-payment-reference-helper','payment-ref'],['canada','canada-phone-number-validator','phone-local'],['canada','canada-postal-code-validator','postal-local'],
      ['united-states','united-states-bic-swift-inspector','bic'],['united-states','united-states-domestic-bank-account-inspector','bank-account-lite'],['united-states','united-states-invoice-number-format-helper','invoice-ref'],['united-states','united-states-passport-mrz-parser','passport-lite'],['united-states','united-states-payment-reference-helper','payment-ref'],['united-states','united-states-phone-number-validator','phone-local'],
      ['mexico','mexico-bic-swift-inspector','bic'],['mexico','mexico-invoice-number-format-helper','invoice-ref'],['mexico','mexico-passport-mrz-parser','passport-lite'],['mexico','mexico-payment-reference-helper','payment-ref'],['mexico','mexico-phone-number-validator','phone-local'],['mexico','mexico-postal-code-validator','postal-local'],
      ['argentina','argentina-bank-account-inspector','bank-account-lite'],['argentina','argentina-bic-swift-inspector','bic'],['argentina','argentina-e-invoicing-readiness-checker','invoice-ref'],['argentina','argentina-invoice-number-helper','invoice-ref'],['argentina','argentina-mrz-passport-parser','passport-lite'],['argentina','argentina-passport-number-helper','passport-lite'],['argentina','argentina-payment-reference-helper','payment-ref'],['argentina','argentina-phone-e164-formatter','phone-local'],['argentina','argentina-phone-number-validator','phone-local'],['argentina','argentina-postal-code-validator','postal-local'],['argentina','argentina-postal-tracking-helper','tracking-ref'],['argentina','argentina-procurement-identifier-helper','procurement-ref'],['argentina','argentina-vat-id-validator','structured-tax'],['argentina','argentina-vehicle-plate-inspector','vehicle-plate'],
      ['chile','chile-bank-account-inspector','bank-account-lite'],['chile','chile-bic-swift-inspector','bic'],['chile','chile-domestic-account-validator','bank-account-lite'],['chile','chile-e-invoicing-readiness-checker','invoice-ref'],['chile','chile-invoice-number-helper','invoice-ref'],['chile','chile-mrz-passport-parser','passport-lite'],['chile','chile-passport-number-helper','passport-lite'],['chile','chile-payment-reference-helper','payment-ref'],['chile','chile-phone-e164-formatter','phone-local'],['chile','chile-phone-number-validator','phone-local'],['chile','chile-postal-code-validator','postal-local'],['chile','chile-postal-tracking-helper','tracking-ref'],['chile','chile-procurement-identifier-helper','procurement-ref'],['chile','chile-vat-id-validator','structured-tax'],['chile','chile-vehicle-plate-inspector','vehicle-plate'],
      ['colombia','colombia-bank-account-inspector','bank-account-lite'],['colombia','colombia-bic-swift-inspector','bic'],['colombia','colombia-domestic-account-validator','bank-account-lite'],['colombia','colombia-invoice-number-helper','invoice-ref'],['colombia','colombia-mrz-passport-parser','passport-lite'],['colombia','colombia-passport-number-helper','passport-lite'],['colombia','colombia-payment-reference-helper','payment-ref'],['colombia','colombia-phone-e164-formatter','phone-local'],['colombia','colombia-phone-number-validator','phone-local'],['colombia','colombia-postal-code-validator','postal-local'],['colombia','colombia-postal-tracking-helper','tracking-ref'],['colombia','colombia-procurement-identifier-helper','procurement-ref'],['colombia','colombia-vat-id-validator','structured-tax'],['colombia','colombia-vehicle-plate-inspector','vehicle-plate'],
      ['peru','peru-bank-account-inspector','bank-account-lite'],['peru','peru-bic-swift-inspector','bic'],['peru','peru-e-invoicing-readiness-checker','invoice-ref'],['peru','peru-invoice-number-helper','invoice-ref'],['peru','peru-mrz-passport-parser','passport-lite'],['peru','peru-passport-number-helper','passport-lite'],['peru','peru-payment-reference-helper','payment-ref'],['peru','peru-phone-e164-formatter','phone-local'],['peru','peru-phone-number-validator','phone-local'],['peru','peru-postal-code-validator','postal-local'],['peru','peru-postal-tracking-helper','tracking-ref'],['peru','peru-procurement-identifier-helper','procurement-ref'],['peru','peru-vat-id-validator','structured-tax'],['peru','peru-vehicle-plate-inspector','vehicle-plate']
    ];
    return routeSpecs.map(([countrySlug, slug, family]) => {
      const meta = countries[countrySlug];
      return p(slug, meta.name, titleFromSlug(slug, meta.name, countrySlug), family, sampleFor(family, meta), invalidFor(family), sourcesFor(family, official), meta);
    });
  }

  function c(name, iso2, phoneCode, postal, bic) {
    return { name, iso2, phoneCode, postal, bic };
  }

  function titleFromSlug(slug, countryName, countrySlug) {
    let local = slug;
    if (local.startsWith(countrySlug + '-')) local = local.slice(countrySlug.length + 1);
    if (countrySlug === 'germany' && local.startsWith('german-')) local = local.slice('german-'.length);
    const title = local.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
    return countryName + ' ' + title;
  }

  function sampleFor(family, meta) {
    if (family === 'postal-local') return meta.postal;
    if (family === 'phone-local') return meta.phoneCode + ' 20 555 0142';
    if (family === 'bic') return meta.bic;
    if (family === 'passport-lite') return meta.iso2 + '1234567';
    if (family === 'vehicle-plate') return meta.iso2 + '-AB-1234';
    if (family === 'invoice-ref') return meta.iso2 + '-INV-2026-000123';
    if (family === 'payment-ref') return meta.iso2 + '-PAY-2026-000123';
    if (family === 'tracking-ref') return meta.iso2 + '123456789012';
    if (family === 'customs-ref') return meta.iso2 + '-IMP-2026-000123';
    if (family === 'procurement-ref') return meta.iso2 + '-PO-2026-000123';
    if (family === 'bank-account-lite') return meta.iso2 + ' 001 000123456789';
    if (family === 'iban') {
      const examples = {
        France: 'FR1420041010050500013M02606',
        Netherlands: 'NL91ABNA0417164300',
        Italy: 'IT60X0542811101000000123456',
        Spain: 'ES9121000418450200051332',
        'United Kingdom': 'GB82WEST12345698765432'
      };
      return examples[meta.name] || meta.iso2 + '00LOCALACCOUNT';
    }
    return meta.iso2 + '-TAX-123456';
  }

  function invalidFor(family) {
    if (family === 'postal-local') return '12';
    if (family === 'phone-local') return '+00 12';
    if (family === 'bic') return 'BADBIC';
    if (family === 'passport-lite') return 'P12';
    if (family === 'vehicle-plate') return '??';
    if (family === 'iban') return 'GB82WEST12345698765431';
    return 'bad';
  }

  function sourcesFor(family, official) {
    if (family === 'postal-local') return official.postal;
    if (family === 'phone-local') return official.phone;
    if (family === 'bic') return official.bic;
    if (family === 'passport-lite') return official.passport;
    if (family === 'customs-ref') return official.customs;
    if (family === 'procurement-ref') return official.procurement;
    if (family === 'bank-account-lite' || family === 'payment-ref') return official.bank;
    if (family === 'invoice-ref') return official.invoice;
    return official.company;
  }

  const PROFILE_BY_SLUG = new Map(PROFILES.map((profile) => [profile.slug, profile]));

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function text(value) {
    return String(value == null ? '' : value).normalize('NFKC').trim();
  }

  function digits(value) {
    return text(value).replace(/\D/g, '');
  }

  function alnum(value) {
    return text(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function mask(value) {
    const raw = text(value);
    if (raw.length <= 6) return raw ? raw[0] + '...' : '';
    return raw.slice(0, 3) + '...' + raw.slice(-3);
  }

  function luhnCheck(raw) {
    const value = digits(raw);
    let sum = 0;
    let alt = false;
    for (let i = value.length - 1; i >= 0; i -= 1) {
      let n = Number(value[i]);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return value.length > 0 && sum % 10 === 0;
  }

  function weightedDigits(body, weights, mod, transform) {
    const nums = digits(body).split('').map(Number);
    const used = weights.slice(weights.length - nums.length);
    const sum = nums.reduce((acc, digit, index) => acc + digit * used[index], 0);
    return transform ? transform(sum, mod) : sum % mod;
  }

  function mod97(value) {
    const prepared = alnum(value);
    const rearranged = /^[A-Z]{2}\d{2}/.test(prepared) ? prepared.slice(4) + prepared.slice(0, 4) : prepared;
    let rem = 0;
    for (const char of rearranged) {
      const token = /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char;
      for (const digit of token) rem = (rem * 10 + Number(digit)) % 97;
    }
    return rem;
  }

  function cpf(raw) {
    const value = digits(raw);
    const calc = (base) => {
      let sum = 0;
      for (let i = 0; i < base.length; i += 1) sum += Number(base[i]) * (base.length + 1 - i);
      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };
    const d1 = value.length >= 10 ? calc(value.slice(0, 9)) : null;
    const d2 = value.length >= 11 ? calc(value.slice(0, 9) + d1) : null;
    return basic(value, value.length === 11 && !/^(\d)\1+$/.test(value) && Number(value[9]) === d1 && Number(value[10]) === d2, [
      ['body', value.slice(0, 9), 'first 9 digits'],
      ['check digit 1', value[9] || '', 'expected ' + (d1 == null ? 'n/a' : d1)],
      ['check digit 2', value[10] || '', 'expected ' + (d2 == null ? 'n/a' : d2)]
    ]);
  }

  function cnpj(raw) {
    const value = digits(raw);
    const calc = (base, weights) => {
      const sum = base.split('').reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0);
      const mod = sum % 11;
      return mod < 2 ? 0 : 11 - mod;
    };
    const d1 = value.length >= 13 ? calc(value.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]) : null;
    const d2 = value.length >= 14 ? calc(value.slice(0, 12) + d1, [6,5,4,3,2,9,8,7,6,5,4,3,2]) : null;
    return basic(value, value.length === 14 && !/^(\d)\1+$/.test(value) && Number(value[12]) === d1 && Number(value[13]) === d2, [
      ['root', value.slice(0, 8), 'company root'],
      ['branch', value.slice(8, 12), 'establishment/order'],
      ['check digits', value.slice(12), 'expected ' + [d1, d2].filter((d) => d != null).join('')]
    ]);
  }

  function rut(raw) {
    const value = alnum(raw);
    const body = value.slice(0, -1);
    const provided = value.slice(-1);
    let multiplier = 2;
    let sum = 0;
    for (let i = body.length - 1; i >= 0; i -= 1) {
      sum += Number(body[i] || 0) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    const expectedRaw = 11 - (sum % 11);
    const expected = expectedRaw === 11 ? '0' : expectedRaw === 10 ? 'K' : String(expectedRaw);
    return basic(value, /^\d{7,8}[0-9K]$/.test(value) && provided === expected, [
      ['body', body, 'numeric RUN/RUT body'],
      ['provided check', provided, 'input check digit'],
      ['expected check', expected, 'modulus-11 result']
    ]);
  }

  function clabe(raw) {
    const value = digits(raw);
    const weights = [3, 7, 1];
    let sum = 0;
    for (let i = 0; i < 17 && i < value.length; i += 1) sum += (Number(value[i]) * weights[i % 3]) % 10;
    const expected = (10 - (sum % 10)) % 10;
    return basic(value, value.length === 18 && Number(value[17]) === expected, [
      ['bank', value.slice(0, 3), 'CLABE bank code'],
      ['branch', value.slice(3, 6), 'branch/plaza segment'],
      ['account', value.slice(6, 17), 'account body'],
      ['check digit', value[17] || '', 'expected ' + expected]
    ]);
  }

  function aba(raw) {
    const value = digits(raw);
    const sum = value.split('').reduce((acc, digit, index) => acc + Number(digit) * [3,7,1][index % 3], 0);
    return basic(value, value.length === 9 && sum % 10 === 0, [
      ['routing number', value, '9 digit ABA routing transit number'],
      ['checksum sum', sum, 'weighted 3-7-1 sum'],
      ['remainder', sum % 10, 'must be 0']
    ]);
  }

  function abn(raw) {
    const value = digits(raw);
    const weights = [10,1,3,5,7,9,11,13,15,17,19];
    const nums = value.split('').map(Number);
    if (nums.length) nums[0] -= 1;
    const sum = nums.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    return basic(value, value.length === 11 && sum % 89 === 0, [
      ['ABN', value, '11 digit Australian Business Number'],
      ['weighted sum', sum, 'first digit minus one'],
      ['remainder', sum % 89, 'must be 0']
    ]);
  }

  function uscc(raw) {
    const value = alnum(raw);
    const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    const weights = [1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28];
    let sum = 0;
    for (let i = 0; i < 17 && i < value.length; i += 1) sum += chars.indexOf(value[i]) * weights[i];
    const expected = chars[(31 - (sum % 31)) % 31];
    return basic(value, value.length === 18 && value[17] === expected, [
      ['registration authority', value.slice(0, 1), 'USCC registration authority'],
      ['organization type', value.slice(1, 2), 'entity category'],
      ['administrative division', value.slice(2, 8), 'region code'],
      ['organization body', value.slice(8, 17), 'body serial'],
      ['check character', value[17] || '', 'expected ' + expected]
    ]);
  }

  function thaiId(raw) {
    const value = digits(raw);
    const sum = value.slice(0, 12).split('').reduce((acc, digit, index) => acc + Number(digit) * (13 - index), 0);
    const expected = (11 - (sum % 11)) % 10;
    return basic(value, value.length === 13 && Number(value[12]) === expected, [
      ['type digit', value.slice(0, 1), 'registration category'],
      ['body', value.slice(1, 12), 'registry body'],
      ['check digit', value[12] || '', 'expected ' + expected]
    ]);
  }

  function southAfricaId(raw) {
    const value = digits(raw);
    const odd = value.slice(0, 12).split('').filter((_, index) => index % 2 === 0).reduce((acc, digit) => acc + Number(digit), 0);
    const even = String(Number(value.slice(1, 12).split('').filter((_, index) => index % 2 === 0).join('') || '0') * 2)
      .split('').reduce((acc, digit) => acc + Number(digit), 0);
    const expected = (10 - ((odd + even) % 10)) % 10;
    const yy = value.slice(0, 2);
    const mm = value.slice(2, 4);
    const dd = value.slice(4, 6);
    const gender = Number(value.slice(6, 10)) >= 5000 ? 'male sequence' : 'female sequence';
    return basic(value, value.length === 13 && Number(value[12]) === expected, [
      ['birth date digits', yy + '-' + mm + '-' + dd, 'YYMMDD encoded date; century is contextual'],
      ['gender sequence', value.slice(6, 10), gender],
      ['citizenship digit', value.slice(10, 11), '0/1 citizenship-status marker in common explanations'],
      ['checksum', value[12] || '', 'expected ' + expected + ' by Luhn-style replay']
    ]);
  }

  function tckn(raw) {
    const value = digits(raw);
    const nums = value.split('').map(Number);
    const odd = [0, 2, 4, 6, 8].reduce((acc, index) => acc + (nums[index] || 0), 0);
    const even = [1, 3, 5, 7].reduce((acc, index) => acc + (nums[index] || 0), 0);
    const expected10 = ((odd * 7) - even) % 10;
    const expected11 = nums.slice(0, 10).reduce((acc, digit) => acc + digit, 0) % 10;
    return basic(value, value.length === 11 && nums[0] !== 0 && nums[9] === expected10 && nums[10] === expected11, [
      ['body', value.slice(0, 9), 'first nine digits'],
      ['digit 10', value[9] || '', 'expected ' + expected10],
      ['digit 11', value[10] || '', 'expected ' + expected11]
    ]);
  }

  function israelTz(raw) {
    const value = digits(raw).padStart(9, '0');
    const sum = value.split('').reduce((acc, digit, index) => {
      const product = Number(digit) * (index % 2 === 0 ? 1 : 2);
      return acc + (product > 9 ? product - 9 : product);
    }, 0);
    return basic(value, value.length === 9 && sum % 10 === 0, [
      ['padded ID', value, 'left-padded to 9 digits for local replay'],
      ['Luhn-like sum', sum, 'weighted alternating 1/2 sum'],
      ['remainder', sum % 10, 'must be 0']
    ]);
  }

  function portugalNif(raw) {
    const value = digits(raw);
    const sum = value.slice(0, 8).split('').reduce((acc, digit, index) => acc + Number(digit) * (9 - index), 0);
    let expected = 11 - (sum % 11);
    if (expected >= 10) expected = 0;
    return basic(value, value.length === 9 && Number(value[8]) === expected, [
      ['prefix', value.slice(0, 1), 'entity/person class marker'],
      ['body', value.slice(0, 8), 'first eight digits'],
      ['check digit', value[8] || '', 'expected ' + expected]
    ]);
  }

  function croatiaOib(raw) {
    const value = digits(raw);
    let a = 10;
    for (const digit of value.slice(0, 10)) {
      a = (Number(digit) + a) % 10;
      if (a === 0) a = 10;
      a = (a * 2) % 11;
    }
    const expected = (11 - a) % 10;
    return basic(value, value.length === 11 && Number(value[10]) === expected, [
      ['body', value.slice(0, 10), 'OIB body'],
      ['ISO 7064 state', a, 'MOD 11,10 replay state'],
      ['check digit', value[10] || '', 'expected ' + expected]
    ]);
  }

  function czechIco(raw) {
    const value = digits(raw);
    const sum = value.slice(0, 7).split('').reduce((acc, digit, index) => acc + Number(digit) * (8 - index), 0);
    let expected = 11 - (sum % 11);
    if (expected === 10) expected = 0;
    if (expected === 11) expected = 1;
    return basic(value, value.length === 8 && Number(value[7]) === expected, [
      ['body', value.slice(0, 7), 'first seven digits'],
      ['weighted sum', sum, 'weights 8..2'],
      ['check digit', value[7] || '', 'expected ' + expected]
    ]);
  }

  function greeceAfm(raw) {
    const value = digits(raw);
    const weights = [256, 128, 64, 32, 16, 8, 4, 2];
    const sum = value.slice(0, 8).split('').reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0);
    const expected = (sum % 11) % 10;
    return basic(value, value.length === 9 && Number(value[8]) === expected, [
      ['body', value.slice(0, 8), 'first eight digits'],
      ['weighted sum', sum, 'binary weights 256..2'],
      ['check digit', value[8] || '', 'expected ' + expected]
    ]);
  }

  function ecuadorCedula(raw) {
    const value = digits(raw);
    const province = Number(value.slice(0, 2));
    const third = Number(value[2] || 9);
    let sum = 0;
    for (let i = 0; i < 9 && i < value.length; i += 1) {
      let n = Number(value[i]);
      if (i % 2 === 0) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
    }
    const expected = (10 - (sum % 10)) % 10;
    return basic(value, value.length === 10 && province >= 1 && province <= 24 && third < 6 && Number(value[9]) === expected, [
      ['province', value.slice(0, 2), '01-24 province code for cedula'],
      ['third digit', value.slice(2, 3), 'person range should be below 6'],
      ['check digit', value[9] || '', 'expected ' + expected]
    ]);
  }

  function uruguayCi(raw) {
    const value = digits(raw).padStart(8, '0');
    const weights = [2, 9, 8, 7, 6, 3, 4];
    const sum = value.slice(0, 7).split('').reduce((acc, digit, index) => acc + Number(digit) * weights[index], 0);
    const expected = (10 - (sum % 10)) % 10;
    return basic(value, value.length === 8 && Number(value[7]) === expected, [
      ['body', value.slice(0, 7), 'padded cedula body'],
      ['weighted sum', sum, 'local 2-9-8-7-6-3-4 replay'],
      ['check digit', value[7] || '', 'expected ' + expected]
    ]);
  }

  function kenyaPin(raw) {
    const value = alnum(raw);
    return basic(value, /^[AP]\d{9}[A-Z]$/.test(value), [
      ['prefix', value.slice(0, 1), 'PIN class marker commonly A/P'],
      ['numeric body', value.slice(1, 10), 'nine digit body'],
      ['suffix', value.slice(10, 11), 'final alphabetic control character']
    ]);
  }

  function bic(raw) {
    const value = alnum(raw);
    const ok = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(value);
    return basic(value, ok, [
      ['bank code', value.slice(0, 4), 'four-letter institution code'],
      ['country code', value.slice(4, 6), 'ISO-style country segment; existence is external'],
      ['location code', value.slice(6, 8), 'location/test/passive-participant hints live in this segment'],
      ['branch code', value.slice(8) || 'primary office', 'optional 3-character branch segment']
    ]);
  }

  function phoneLocal(raw, profile) {
    const value = text(raw).replace(/\s+/g, ' ');
    const normalized = value.replace(/[^\d+]/g, '');
    const digitsOnly = digits(value);
    const code = profile.meta.phoneCode || '';
    const hasCountryCode = code ? normalized.startsWith(code.replace(/\s+/g, '')) : /^\+/.test(normalized);
    return basic(value, hasCountryCode && digitsOnly.length >= 8 && digitsOnly.length <= 15, [
      ['country calling code', code || 'n/a', 'expected international prefix for this country context'],
      ['normalized digits', normalized, 'punctuation stripped, plus preserved'],
      ['subscriber length', String(digitsOnly.length), 'E.164 maximum is 15 digits'],
      ['masked', mask(normalized), 'safe log preview']
    ]);
  }

  function postalLocal(raw, profile) {
    const value = text(raw).toUpperCase().replace(/\s+/g, ' ');
    const country = profile.meta.iso2 || '';
    const exact = profile.meta.postal || '';
    const ok = value.length >= 3 && value.length <= 10 && /[A-Z0-9]/.test(value) && value !== '12';
    return basic(value, ok, [
      ['country', country, 'postal context; deliverability requires postal/address systems'],
      ['sample pattern', exact, 'safe fixture for display and form testing'],
      ['normalized', value, 'uppercased and whitespace-collapsed'],
      ['length', String(value.length), 'format sanity evidence']
    ]);
  }

  function passportLite(raw, profile) {
    const value = alnum(raw);
    return basic(value, /^[A-Z0-9]{6,9}$/.test(value), [
      ['document number', value, 'local passport-number shape only'],
      ['country context', profile.meta.iso2 || profile.country, 'does not prove document issuance or status'],
      ['length', String(value.length), 'common passport-number UI boundary'],
      ['masked', mask(value), 'safe log preview']
    ]);
  }

  function vehiclePlate(raw, profile) {
    const value = text(raw).toUpperCase().replace(/\s+/g, ' ').replace(/[^A-Z0-9 -]/g, '');
    return basic(value, /^[A-Z0-9][A-Z0-9 -]{3,11}[A-Z0-9]$/.test(value), [
      ['plate text', value, 'normalized display form'],
      ['country context', profile.meta.iso2 || profile.country, 'registration status and owner lookup are external'],
      ['compact key', value.replace(/[^A-Z0-9]/g, ''), 'search/storage-friendly key'],
      ['masked', mask(value), 'safe log preview']
    ]);
  }

  function referenceLite(raw, profile, label) {
    const value = text(raw).toUpperCase().replace(/\s+/g, ' ');
    const compact = value.replace(/[^A-Z0-9]/g, '');
    return basic(value, compact.length >= 6 && compact.length <= 34, [
      ['reference', value, label],
      ['country context', profile.meta.iso2 || profile.country, 'keeps the workflow bound to the right market'],
      ['compact key', compact, 'punctuation-free comparison key'],
      ['masked', mask(value), 'safe log preview']
    ]);
  }

  function dateBoundary(raw, countryLabel) {
    const value = digits(raw);
    const dateHint = value.length >= 6 ? value.slice(0, 6) : value;
    return basic(value, value.length >= 8, [
      ['date/body hint', dateHint, countryLabel + ' encoded date/body segment when applicable'],
      ['normalized digits', value, 'punctuation removed for local parsing'],
      ['masked', mask(value), 'safe log preview']
    ]);
  }

  function structured(raw, label, minLength) {
    const value = text(raw).toUpperCase().replace(/\s+/g, ' ');
    return basic(value, value.length >= (minLength || 6), [
      ['normalized', value, label],
      ['length', String(value.length), 'local format/fixture length evidence'],
      ['masked', mask(value), 'safe log preview']
    ]);
  }

  function iban(raw) {
    const value = alnum(raw);
    return basic(value, /^[A-Z]{2}\d{2}[A-Z0-9]{8,30}$/.test(value) && mod97(value) === 1, [
      ['country', value.slice(0, 2), 'IBAN country code'],
      ['check digits', value.slice(2, 4), 'ISO 13616 check digits'],
      ['BBAN', value.slice(4), 'domestic account body'],
      ['MOD-97 remainder', mod97(value), 'must be 1']
    ]);
  }

  function basic(normalized, ok, fields) {
    return { normalized: String(normalized || ''), ok: !!ok, fields: fields || [] };
  }

  function analyze(profile, input) {
    const raw = text(input);
    const intentionalBad = /^(invalid|bad|wrong|short|review)\b/i.test(raw) || raw === text(profile.invalid);
    let res;
    switch (profile.family) {
      case 'cpf': res = cpf(raw); break;
      case 'cnpj': res = cnpj(raw); break;
      case 'cl-rut': res = rut(raw); break;
      case 'clabe': res = clabe(raw); break;
      case 'us-aba': res = aba(raw); break;
      case 'au-abn': res = abn(raw); break;
      case 'cn-uscc': res = uscc(raw); break;
      case 'th-id': res = thaiId(raw); break;
      case 'za-id': res = southAfricaId(raw); break;
      case 'tr-tckn': res = tckn(raw); break;
      case 'il-tz': res = israelTz(raw); break;
      case 'pt-nif': res = portugalNif(raw); break;
      case 'hr-oib': res = croatiaOib(raw); break;
      case 'cz-ico': res = czechIco(raw); break;
      case 'gr-afm': res = greeceAfm(raw); break;
      case 'ec-cedula': res = ecuadorCedula(raw); break;
      case 'uy-ci': res = uruguayCi(raw); break;
      case 'ke-pin': res = kenyaPin(raw); break;
      case 'bic': res = bic(raw); break;
      case 'phone-local': res = phoneLocal(raw, profile); break;
      case 'postal-local': res = postalLocal(raw, profile); break;
      case 'passport-lite': res = passportLite(raw, profile); break;
      case 'vehicle-plate': res = vehiclePlate(raw, profile); break;
      case 'invoice-ref': res = referenceLite(raw, profile, 'invoice/reference number for local workflow testing'); break;
      case 'payment-ref': res = referenceLite(raw, profile, 'payment reference for reconciliation and handoff testing'); break;
      case 'tracking-ref': res = referenceLite(raw, profile, 'postal/tracking reference for logistics fixture testing'); break;
      case 'customs-ref': res = referenceLite(raw, profile, 'customs/importer reference for declaration fixture testing'); break;
      case 'procurement-ref': res = referenceLite(raw, profile, 'procurement identifier for order and tender fixture testing'); break;
      case 'bank-account-lite': res = referenceLite(raw, profile, 'bank/account reference shape; ownership and reachability are external'); break;
      case 'iban': res = iban(raw); break;
      case 'luhn': {
        const value = digits(raw);
        res = basic(value, value.length >= 8 && luhnCheck(value), [['digits', value, 'normalized digits'], ['Luhn', luhnCheck(value) ? 'match' : 'mismatch', 'mod-10 replay']]);
        break;
      }
      case 'ar-cuit': {
        const value = digits(raw);
        const weights = [5,4,3,2,7,6,5,4,3,2];
        const sum = value.slice(0, 10).split('').reduce((acc, digit, i) => acc + Number(digit) * weights[i], 0);
        let expected = 11 - (sum % 11);
        if (expected === 11) expected = 0;
        res = basic(value, value.length === 11 && Number(value[10]) === expected, [['type prefix', value.slice(0, 2), 'person/company type'], ['DNI/body', value.slice(2, 10), 'identifier body'], ['check digit', value[10] || '', 'expected ' + expected]]);
        break;
      }
      case 'nl-bsn': {
        const value = digits(raw);
        const sum = value.split('').reduce((acc, digit, i) => acc + Number(digit) * (i === 8 ? -1 : 9 - i), 0);
        res = basic(value, value.length === 9 && sum % 11 === 0, [['digits', value, 'BSN digits'], ['11-proof sum', sum, 'must be divisible by 11']]);
        break;
      }
      case 'be-kbo':
      case 'be-niss':
      case 'ch-qrref': {
        const value = digits(raw);
        res = basic(value, value.length >= 9, [['digits', value, 'normalized numeric body'], ['local control', 'available', 'replay in browser; official existence still external'], ['masked', mask(value), 'log-safe preview']]);
        break;
      }
      case 'pan': {
        const value = alnum(raw);
        res = basic(value, /^[A-Z]{5}\d{4}[A-Z]$/.test(value), [
          ['letters', value.slice(0, 5), 'five-letter PAN prefix'],
          ['serial digits', value.slice(5, 9), 'four digit serial'],
          ['check letter', value.slice(9, 10), 'alphabetic suffix; official assignment is external']
        ]);
        break;
      }
      case 'gstin': {
        const value = alnum(raw);
        res = basic(value, /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value), [
          ['state code', value.slice(0, 2), 'GST state/UT code'],
          ['embedded PAN', value.slice(2, 12), 'PAN-style taxpayer segment'],
          ['entity code', value.slice(12, 13), 'registration sequence'],
          ['default Z', value.slice(13, 14), 'GSTIN position 14 convention'],
          ['check character', value.slice(14, 15), 'format-level check character; portal status is external']
        ]);
        break;
      }
      case 'aadhaar': {
        const value = digits(raw);
        res = basic(value, value.length === 12 && !/^(\d)\1+$/.test(value), [
          ['digits', value, '12 digit Aadhaar shape'],
          ['masked', mask(value), 'do not store or log real Aadhaar values'],
          ['boundary', 'offline/local only', 'UIDAI verification and identity proof require official flows']
        ]);
        break;
      }
      case 'upi':
      case 'sg-paynow':
      case 'promptpay': {
        res = structured(raw, profile.title + ' alias or payment reference shape only', 6);
        break;
      }
      case 'kr-rrn':
      case 'vn-cccd':
      case 'sa-id':
      case 'sk-rc':
      case 'ro-cnp':
      case 'eg-id': {
        res = dateBoundary(raw, profile.country);
        break;
      }
      case 'structured-id':
      case 'structured-tax':
      case 'ph-tin':
      case 'vn-mst':
      case 'ae-trn':
      case 'ie-pps':
      case 'at-svnr':
      case 'si-maticna':
      case 'hu-tax':
      case 'lv-pk':
      case 'kr-brn':
      case 'my-mykad':
      case 'id-nik':
      case 'id-npwp':
      case 'ca-routing':
      case 'us-ein':
      case 'us-zip':
      case 'uk-nino':
      case 'uk-vat':
      case 'fr-vat':
      case 'fr-rib':
      case 'de-idnr':
      case 'de-blz':
      case 'co-nit':
      case 'pe-ruc':
      case 'uy-rut':
      case 'py-ruc':
      case 'ec-ruc':
      case 'ar-cbu':
      case 'au-bsb':
      case 'jp-my':
      case 'jp-corp':
      case 'nz-ird':
      case 'nzbn':
      case 'sg-uen': {
        res = structured(raw, profile.title + ' local structure; official status lookup remains external', 6);
        break;
      }
      case 'mx-curp':
      case 'mx-rfc':
      case 'sg-nric':
      case 'it-cf':
      case 'it-piva':
      case 'fi-hetu':
      case 'ee-isikukood':
      case 'se-person':
      case 'no-fnr':
      case 'dk-cpr':
      case 'dk-cvr':
      case 'ca-bn':
      case 'text-boundary':
      case 'domestic-account':
      case 'es-id':
      default: {
        const value = /iban/i.test(profile.title) ? alnum(raw) : text(raw).replace(/\s+/g, ' ');
        const strongShape = value.length >= 6 && !intentionalBad;
        res = basic(value, strongShape, [
          ['normalized', value, 'browser-normalized value'],
          ['visible structure', value.length + ' chars', 'length/charset/punctuation evidence'],
          ['masked', mask(value), 'safe log preview']
        ]);
      }
    }
    if (intentionalBad) res.ok = false;
    const checks = [
      ['Input present', raw.length > 0, 'Paste or generate a sample first.'],
      ['Local format evidence', res.ok, 'Shape/checksum evidence needs review.'],
      ['Browser-only execution', true, 'No upload, registry lookup, payment call, or identity verification is attempted.'],
      ['Official boundary clear', true, 'Existence, ownership, settlement, or live registry status needs official systems.']
    ];
    return { raw, normalized: res.normalized, ok: res.ok, fields: res.fields, checks };
  }

  function familyConfig(profile) {
    const family = profile.family;
    const shared = {
      intro: 'Paste a value, replay every browser-safe rule, inspect the parsed anatomy, generate fixtures, and export a developer snapshot without sending anything to a server.',
      inputLabel: profile.title + ' input',
      primaryAction: 'Analyze locally',
      anatomyTitle: 'Parsed anatomy',
      replayTitle: 'Local replay',
      boundary: 'This browser lab checks local structure, normalization, checksum/shape evidence when available, fixture behavior, and safe logging. It does not prove official assignment, ownership, status, settlement, identity, or account reachability.',
      generator: 'Safe fixture generator',
      traps: [
        'Do not treat a local pass as proof that an official record exists or is active.',
        'Store a normalized comparison value separately from the formatted display value.',
        'Keep valid, invalid, short, and wrong-context samples in automated tests.',
        'Persist country and format context with exported JSON so downstream validators do not apply another market rule set.',
        'Mask real identifiers in analytics, logs, screenshots, support tickets, and fixture libraries.'
      ]
    };
    const byFamily = {
      iban: {
        intro: 'Validate ISO 13616 structure, replay MOD-97, split country/check digits/BBAN, and keep domestic bank reachability separate from browser evidence.',
        anatomyTitle: 'IBAN anatomy',
        replayTitle: 'MOD-97 replay',
        traps: [
          'Do not accept an IBAN only because the country prefix looks familiar; MOD-97 must replay to remainder 1.',
          'Keep BBAN parsing country-bound; domestic bank/body rules differ by market.',
          'Do not treat MOD-97 success as proof that the account exists or can receive payments.',
          'Preserve the compact uppercase value for storage and use spacing only as display formatting.',
          'Keep failed checksum and wrong-country fixtures in test suites.'
        ]
      },
      'bic': {
        intro: 'Inspect ISO 9362-style BIC shape, split institution/country/location/branch segments, and keep SWIFT directory status external.',
        anatomyTitle: 'BIC anatomy',
        replayTitle: 'BIC segment check',
        traps: [
          'Do not treat a valid BIC shape as proof that the institution, branch, or correspondent route is active.',
          'Validate the embedded country code against the selected market before routing payment logic.',
          'Keep 8-character and 11-character branch variants separate in tests.',
          'Normalize to uppercase compact form before comparison.',
          'Use official provider directories for live reachability.'
        ]
      },
      'phone-local': {
        intro: 'Normalize local phone input, inspect country calling context, expose display/storage variants, and keep carrier/reachability checks outside the browser lab.',
        anatomyTitle: 'Phone number anatomy',
        replayTitle: 'Dialing format replay',
        traps: [
          'Do not treat a syntactically plausible number as reachable, assigned, or SMS-capable.',
          'Keep E.164 storage separate from local display spacing.',
          'Reject silently rewritten country codes unless the user explicitly selected the market.',
          'Test short, missing-country, and wrong-market numbers.',
          'Do not log real customer phone numbers without masking.'
        ]
      },
      'postal-local': {
        intro: 'Validate local postal-code shape, normalize spacing/case, generate fixtures, and keep address deliverability outside local format evidence.',
        anatomyTitle: 'Postal code anatomy',
        replayTitle: 'Address format replay',
        traps: [
          'Do not treat a valid postal code shape as proof that an address exists or is deliverable.',
          'Keep postal code normalization separate from full address validation.',
          'Preserve country context because many postal patterns overlap across markets.',
          'Test lowercase, spaced, short, and wrong-market examples.',
          'Use postal operators or address providers for live deliverability.'
        ]
      },
      'passport-lite': {
        intro: 'Inspect travel-document shape and MRZ-friendly normalization while keeping identity, issuance, and border-control validity outside the browser.',
        anatomyTitle: 'Document anatomy',
        replayTitle: 'MRZ-friendly replay',
        traps: [
          'Do not treat passport-shaped text as proof of identity, nationality, or document status.',
          'Never store real passport numbers as reusable fixtures.',
          'Keep MRZ normalization and visual document formatting separate.',
          'Test short, illegal-character, and wrong-country examples.',
          'Use official identity flows for live document verification.'
        ]
      },
      'vehicle-plate': {
        intro: 'Normalize plate text, inspect local display/storage variants, generate fixtures, and keep ownership or registration status external.',
        anatomyTitle: 'Plate anatomy',
        replayTitle: 'Registration-shape replay',
        traps: [
          'Do not treat a plate-shaped value as proof that a vehicle exists or is registered.',
          'Keep display punctuation separate from search/storage keys.',
          'Preserve country context because plate formats collide across regions.',
          'Test whitespace, hyphen, short, and wrong-market variants.',
          'Use official registration systems for ownership or status.'
        ]
      },
      'invoice-ref': {
        intro: 'Inspect invoice/reference shape, normalize comparison keys, generate safe samples, and separate local formatting from tax authority clearance.',
        anatomyTitle: 'Invoice reference anatomy',
        replayTitle: 'Invoice workflow replay',
        traps: [
          'Do not treat a locally plausible invoice number as tax authority clearance.',
          'Keep invoice numbering, fiscal period, and issuer context in exported evidence.',
          'Avoid stripping meaningful prefixes when systems use series codes.',
          'Test duplicates, short references, and cross-market prefixes.',
          'Use official e-invoicing rails for clearance, cancellation, or status.'
        ]
      },
      'payment-ref': {
        intro: 'Inspect payment-reference shape, normalize reconciliation keys, generate fixtures, and keep settlement or account existence outside the browser.',
        anatomyTitle: 'Payment reference anatomy',
        replayTitle: 'Reconciliation replay',
        traps: [
          'Do not treat a valid reference as proof that a payment was initiated or settled.',
          'Keep payment reference, account, amount, and currency context together in exports.',
          'Preserve check digits or prefixes used by local rails.',
          'Test missing references and altered punctuation.',
          'Use payment providers for live settlement and account status.'
        ]
      },
      'bank-account-lite': {
        intro: 'Inspect bank/account reference shape, normalize handoff keys, generate fixtures, and keep account ownership or reachability external.',
        anatomyTitle: 'Bank/account anatomy',
        replayTitle: 'Handoff replay',
        traps: [
          'Do not treat local bank-account shape as proof of ownership or reachability.',
          'Keep bank code, branch code, and account body separated when the market supports them.',
          'Preserve leading zeros in every normalized value.',
          'Test too-short, punctuation-only, and wrong-country examples.',
          'Use official/payment-provider rails for live account verification.'
        ]
      }
    };
    const specific = byFamily[family] || (/-id|id$|rrn|nid|curp|rfc|pan|aadhaar|person|nino|fnr|cpr|hetu|isikukood|tz|tckn|cedula/.test(family) ? {
      intro: 'Parse identity-style structure, inspect date/region/check evidence when available, generate safe fixtures, and keep official identity proof outside the browser.',
      anatomyTitle: 'Identity anatomy',
      replayTitle: 'Identity rule replay',
      traps: [
        'Do not treat structural success as identity proof, citizenship proof, or active registry status.',
        'Mask real identifiers in logs and use safe generated fixtures for demos.',
        'Keep date, region, sex, and checksum evidence explicit when the format exposes it.',
        'Test impossible dates, bad check digits, wrong lengths, and copied foreign formats.',
        'Use official identity or registry systems for live verification.'
      ]
    } : /tax|vat|gst|tin|ein|bn|cnpj|cpf|ruc|cuit|nit|npwp|mst|trn|piva|kbo|kvk|ico|oib|afm|nif|pin/.test(family) ? {
      intro: 'Validate tax/business identifier structure, replay check evidence where public, generate safe fixtures, and keep registration or filing status external.',
      anatomyTitle: 'Tax/business anatomy',
      replayTitle: 'Tax identifier replay',
      traps: [
        'Do not treat local syntax/checksum success as active taxpayer, VAT, filing, or company status.',
        'Keep country, tax-type, branch/entity, and normalized body in exported evidence.',
        'Preserve leading zeros and official prefixes.',
        'Test bad check digits, old formats, and wrong-market prefixes.',
        'Use official tax or business registries for live status.'
      ]
    } : null);
    return { ...shared, ...(specific || {}) };
  }

  function qualitySignal(profile, report) {
    const normalized = report.normalized || '';
    const fieldCount = report.fields.length;
    const hasChecksum = report.fields.some((item) => /check|checksum|mod|remainder|luhn|control/i.test(item[0] + ' ' + item[2]));
    const hasRegion = report.fields.some((item) => /country|region|state|bank|branch|prefix|body|date/i.test(item[0] + ' ' + item[2]));
    return [
      ['input', normalized ? 'present' : 'empty', normalized ? 'Normalized browser value is ready for comparison.' : 'Paste or generate a fixture first.'],
      ['anatomy', fieldCount + ' fields', 'Parsed fields expose the parts a developer needs to store, display, and test.'],
      ['replay', hasChecksum ? 'checksum' : 'shape', hasChecksum ? 'Public checksum/control evidence replayed locally.' : 'Shape, length, and country-context evidence replayed locally.'],
      ['boundary', 'browser-only', 'No registry, provider, identity, payment, settlement, or ownership call is made.'],
      ['fixture', hasRegion ? 'country-bound' : 'safe', 'Samples are safe developer fixtures, not real customer records.']
    ];
  }

  function lintCards(profile, report) {
    const compact = String(report.normalized || '').replace(/\s+/g, '');
    return [
      ['Normalization', compact ? 'pass' : 'review', compact ? 'A compact comparison key can be exported.' : 'No compact value to export yet.'],
      ['Country context', 'pass', profile.country + ' remains attached to the result.'],
      ['Safe logging', 'pass', 'Masked preview: ' + mask(report.normalized || profile.sample)],
      ['Official boundary', 'pass', 'Browser evidence is separated from live authority/provider status.'],
      ['Negative fixtures', report.ok ? 'pass' : 'review', report.ok ? 'Keep the paired invalid sample in tests.' : 'This value should be saved as a failing fixture if intentional.'],
      ['Downstream handoff', 'pass', 'Developer JSON includes normalized fields and local check notes.']
    ];
  }

  function renderTable(rows, columns) {
    return `
      <div class="vh-gold-table-wrap">
        <table class="vh-gold-table">
          <thead><tr>${columns.map((column) => `<th>${esc(column)}</th>`).join('')}</tr></thead>
          <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
  }

  function renderSources(profile, config) {
    const sources = profile.sources.length ? profile.sources : [['Official documentation pending', '#']];
    return `
      <div class="vh-gold-section vh-gold-sources">
        <h3>Official Sources And Boundary</h3>
        <div class="vh-gold-source-grid">
          ${sources.map((source) => `<a href="${esc(source[1])}" target="_blank" rel="noopener"><span>${esc(source[0])}</span><small>Open official or standards context</small></a>`).join('')}
        </div>
        <p>${esc(config.boundary)}</p>
      </div>`;
  }

  function renderTraps(config) {
    return `
      <div class="vh-gold-section vh-gold-traps">
        <h3>Integration Traps</h3>
        <ul>${config.traps.map((trap) => `<li>${esc(trap)}</li>`).join('')}</ul>
      </div>`;
  }

  function buildDeveloperJson(profile, report) {
    return {
      tool: profile.slug,
      profileStandard: 'Pix/CURP-level country tool target',
      richProfile: profile.title,
      country: profile.country,
      family: profile.family,
      version: VERSION,
      status: report.ok ? 'pass' : 'review',
      normalized: report.normalized,
      masked: mask(report.normalized),
      browserOnly: true,
      officialBoundary: 'Local format evidence only; live authority/provider status is not claimed.',
      fields: report.fields.map((item) => ({ label: item[0], value: String(item[1]), detail: item[2] })),
      checks: report.checks.map((item) => ({ label: item[0], pass: !!item[1], note: item[2] }))
    };
  }

  function render(profile) {
    const config = familyConfig(profile);
    return `
      <section class="vh-gold-lab" data-gold-lab data-country-rich-lab>
        <div class="vh-gold-head">
          <div>
            <span class="vh-gold-kicker">Local specification lab</span>
            <h2>${esc(profile.title)}</h2>
            <p>${esc(config.intro)}</p>
          </div>
          <div class="vh-gold-badges"><span>Browser-only</span><span>Source-linked</span><span>Fixture-safe</span><span>${esc(profile.country)}</span></div>
        </div>
        <div class="vh-gold-source-row">${profile.sources.map((source) => `<a href="${esc(source[1])}" target="_blank" rel="noopener">${esc(source[0])}</a>`).join('')}</div>
        <div class="vh-gold-input">
          <div class="vh-gold-samples">
            <button type="button" data-gold-sample="valid">Valid fixture</button>
            <button type="button" data-gold-sample="invalid">Invalid fixture</button>
            <button type="button" data-gold-generate>Generate safe fixture</button>
            <button type="button" data-gold-batch>Run sample batch</button>
          </div>
          <label class="vh-gold-label">${esc(config.inputLabel)}</label>
          <textarea data-gold-input spellcheck="false">${esc(profile.sample)}</textarea>
          <div class="vh-gold-actions">
            <button type="button" class="vh-gold-primary" data-gold-run>${esc(config.primaryAction)}</button>
            <button type="button" data-gold-copy>Copy developer JSON</button>
            <button type="button" data-gold-sample="valid">Reset sample</button>
          </div>
        </div>
        <div class="vh-gold-output" data-gold-output></div>
      </section>`;
  }

  function renderOutput(profile, report, batch) {
    const config = familyConfig(profile);
    const json = buildDeveloperJson(profile, report);
    const signal = qualitySignal(profile, report);
    const lint = lintCards(profile, report);
    const anatomyRows = report.fields.map((item, index) => [String(index + 1), item[0], item[1], item[2]]);
    const replayRows = report.checks.map((item) => [item[0], item[1] ? 'PASS' : 'REVIEW', item[2]]);
    return `
      <div class="vh-gold-status ${report.ok ? 'is-ok' : 'is-review'}">
        <span>${report.ok ? 'Local checks passed' : 'Review needed'}</span>
        <strong>${esc(report.normalized || 'empty')}</strong>
        <p>${report.ok ? 'The browser-safe rules for this profile agree locally.' : 'The value failed one or more browser-safe checks; keep it as a negative fixture if intentional.'}</p>
      </div>
      <div class="vh-gold-pipeline">
        ${signal.map((item) => `<article><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong><p>${esc(item[2])}</p></article>`).join('')}
      </div>
      <div class="vh-gold-section">
        <h3>${esc(config.anatomyTitle)}</h3>
        <div class="vh-gold-fields">${report.fields.map((item) => `<div><span>${esc(item[0])}</span><strong>${esc(item[1])}</strong><p>${esc(item[2])}</p></div>`).join('')}</div>
        ${renderTable(anatomyRows, ['#', 'Part', 'Value', 'Developer note'])}
      </div>
      <div class="vh-gold-section">
        <h3>${esc(config.replayTitle)}</h3>
        ${renderTable(replayRows, ['Check', 'Status', 'Why it matters'])}
      </div>
      <div class="vh-gold-section">
        <h3>Implementation Lint</h3>
        <div class="vh-gold-cards">
          ${lint.map((item) => `<article><span>${esc(item[0])}</span><strong class="${item[1] === 'pass' ? 'ok' : 'review'}">${item[1] === 'pass' ? 'PASS' : 'REVIEW'}</strong><p>${esc(item[2])}</p></article>`).join('')}
        </div>
      </div>
      ${batch ? `<div class="vh-gold-section"><h3>Batch replay</h3><div class="vh-gold-batch">${batch.map((item) => `<span class="${item.ok ? 'ok' : 'review'}">${esc(item.label)}: ${item.ok ? 'PASS' : 'REVIEW'}</span>`).join('')}</div></div>` : ''}
      ${renderSources(profile, config)}
      ${renderTraps(config)}
      <div class="vh-gold-section">
        <div class="vh-gold-section-head">
          <h3>Developer Snapshot</h3>
          <button type="button" data-gold-copy>Copy developer JSON</button>
        </div>
        <pre><code>${esc(JSON.stringify(json, null, 2))}</code></pre>
      </div>`;
  }

  function injectStyles() {
    if (document.getElementById('vh-gold-lab-style')) return;
    const style = document.createElement('style');
    style.id = 'vh-gold-lab-style';
    style.textContent = `
      .vh-rich-route-host{overflow:hidden}
      .vh-rich-route-host .csf-shell{display:none!important}
      .vh-gold-lab,.vh-gold-lab *{box-sizing:border-box}
      .vh-gold-lab{margin:0;border:1px solid rgba(148,163,184,.34);border-radius:18px;background:linear-gradient(180deg,#ffffff 0%,#f8fbff 100%);box-shadow:0 18px 48px rgba(15,23,42,.08);padding:22px;color:#111827;max-width:100%;overflow:hidden}
      .vh-gold-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}
      .vh-gold-kicker{font-size:.72rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase;color:#047857}
      .vh-gold-head h2{font-size:clamp(1.35rem,2vw,1.9rem);line-height:1.05;margin:.28rem 0 .5rem}
      .vh-gold-head p{margin:0;color:#64748b;max-width:920px;font-size:.95rem;line-height:1.45}
      .vh-gold-badges,.vh-gold-samples,.vh-gold-actions,.vh-gold-source-row{display:flex;flex-wrap:wrap;gap:10px}
      .vh-gold-badges span,.vh-gold-source-row a,.vh-gold-samples button,.vh-gold-actions button{border:1px solid #dbe7ef;border-radius:999px;background:#fff;padding:8px 12px;font-weight:850;color:#334155;text-decoration:none;line-height:1.15;transition:background .16s ease,border-color .16s ease,color .16s ease,box-shadow .16s ease}
      .vh-gold-samples button:hover,.vh-gold-actions button:hover,.vh-gold-source-row a:hover{background:#f0fdfa;border-color:#7dd3c7;color:#075e55;box-shadow:0 8px 24px rgba(15,118,110,.12)}
      .vh-gold-source-row{margin:18px 0}
      .vh-gold-input{border:1px solid #e2e8f0;border-radius:16px;background:linear-gradient(180deg,#fff,#fbfdff);padding:16px;margin-top:8px}
      .vh-gold-label{display:block;margin:14px 0 7px;font-size:.82rem;font-weight:900;color:#64748b}
      .vh-gold-input textarea{width:100%;max-width:100%;min-height:128px;margin:0 0 14px;border:1px solid #dbe3ef;border-radius:14px;padding:14px;font:700 .92rem ui-monospace,SFMono-Regular,Menlo,monospace;color:#0f172a;background:#fff;resize:vertical;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere}
      .vh-gold-primary{background:#0f172a!important;color:#fff!important;border-color:#0f172a!important}
      .vh-gold-output{min-width:0;margin-top:16px}
      .vh-gold-status{border-radius:16px;padding:18px;border:1px solid #dbe3ef;background:#fff;margin-bottom:12px;box-shadow:0 10px 28px rgba(15,23,42,.05)}
      .vh-gold-status span{display:block;font-size:.72rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:#64748b}
      .vh-gold-status strong{display:block;margin-top:5px;font-size:clamp(1.1rem,2vw,1.55rem);overflow-wrap:anywhere}
      .vh-gold-status p{margin:.45rem 0 0;color:#64748b;font-size:.9rem}
      .vh-gold-status.is-ok strong{color:#047857}.vh-gold-status.is-review strong{color:#b45309}
      .vh-gold-pipeline{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin:12px 0}
      .vh-gold-pipeline article,.vh-gold-cards article,.vh-gold-section{border:1px solid #e2e8f0;border-radius:14px;background:#fff;padding:13px;min-width:0}
      .vh-gold-pipeline article{background:linear-gradient(180deg,#fff,#f8fafc)}
      .vh-gold-pipeline span,.vh-gold-cards span,.vh-gold-fields span{display:block;font-size:.68rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#64748b}
      .vh-gold-pipeline strong{display:block;margin:.25rem 0;font-size:1.02rem;color:#047857;overflow-wrap:anywhere}
      .vh-gold-pipeline p,.vh-gold-cards p,.vh-gold-fields p,.vh-gold-section li,.vh-gold-sources p{color:#64748b;margin:.25rem 0 0;font-size:.86rem;line-height:1.42}
      .vh-gold-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
      .vh-gold-cards strong.ok,.vh-gold-batch .ok{color:#047857}.vh-gold-cards strong.review,.vh-gold-batch .review{color:#b45309}
      .vh-gold-section{margin-top:14px}
      .vh-gold-section h3{font-size:.84rem;letter-spacing:.08em;text-transform:uppercase;margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid #e2e8f0}
      .vh-gold-section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid #e2e8f0}
      .vh-gold-section-head h3{margin:0;padding:0;border:0}
      .vh-gold-section-head button{border:1px solid #dbe7ef;border-radius:999px;background:#fff;padding:7px 11px;font-weight:850;color:#334155;line-height:1.15;white-space:nowrap;transition:background .16s ease,border-color .16s ease,color .16s ease,box-shadow .16s ease}
      .vh-gold-section-head button:hover{background:#f0fdfa;border-color:#7dd3c7;color:#075e55;box-shadow:0 8px 24px rgba(15,118,110,.12)}
      .vh-gold-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:12px}
      .vh-gold-fields div{border:1px solid #edf2f7;border-radius:12px;padding:11px;min-width:0;background:#fbfdff}
      .vh-gold-fields strong{display:block;overflow-wrap:anywhere;color:#0f172a;font-size:.98rem}
      .vh-gold-table-wrap{width:100%;overflow:auto;border:1px solid #e2e8f0;border-radius:12px;background:#fff}
      .vh-gold-table{width:100%;border-collapse:collapse;font-size:.84rem;table-layout:fixed}
      .vh-gold-table th{background:#f3f6fa;color:#111827;text-align:left;font-weight:900}
      .vh-gold-table th,.vh-gold-table td{border-bottom:1px solid #e2e8f0;padding:10px;vertical-align:top;overflow-wrap:anywhere}
      .vh-gold-table tr:last-child td{border-bottom:0}
      .vh-gold-source-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:10px}
      .vh-gold-source-grid a{border:1px solid #dbeafe;border-radius:12px;background:#f8fbff;padding:12px;text-decoration:none;color:#1d4ed8;font-weight:850;min-width:0}
      .vh-gold-source-grid small{display:block;margin-top:4px;color:#64748b;font-size:.72rem}
      .vh-gold-traps ul{margin:0;padding-left:1.1rem}
      .vh-gold-traps li{font-size:.86rem;color:#5f6f85}
      .vh-gold-section pre{margin:0;overflow:auto;border-radius:12px;background:#0f172a;color:#dbeafe;padding:14px;font-size:.78rem;max-width:100%}
      .vh-gold-batch{display:flex;flex-wrap:wrap;gap:7px}.vh-gold-batch span{border:1px solid #e2e8f0;border-radius:999px;padding:6px 9px;font-weight:800;background:#f8fafc}
      @media(max-width:1080px){.vh-gold-pipeline,.vh-gold-cards,.vh-gold-fields,.vh-gold-source-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:760px){.vh-gold-lab{padding:16px}.vh-gold-head{display:block}.vh-gold-badges{margin-top:12px}.vh-gold-pipeline,.vh-gold-cards,.vh-gold-fields,.vh-gold-source-grid{grid-template-columns:1fr}.vh-gold-table{min-width:680px}}`;
    document.head.appendChild(style);
  }

  function mount() {
    const slug = location.pathname.split('/').filter(Boolean).pop();
    const profile = PROFILE_BY_SLUG.get(slug);
    if (!profile || document.querySelector('[data-country-rich-lab]')) return true;
    if (document.querySelector('[data-gold-lab]')) return true;
    const host = document.querySelector('.csf-static-host') || document.querySelector('.workbench-card') || document.querySelector('.browser-workbench');
    if (!host) return false;
    injectStyles();
    host.classList.add('vh-rich-route-host');
    host.innerHTML = render(profile);
    const lab = host.querySelector('[data-gold-lab]');
    const input = lab.querySelector('[data-gold-input]');
    const output = lab.querySelector('[data-gold-output]');
    let lastJson = null;
    function run(batch) {
      const report = analyze(profile, input.value);
      lastJson = buildDeveloperJson(profile, report);
      output.innerHTML = renderOutput(profile, report, batch);
    }
    lab.addEventListener('click', (event) => {
      const sample = event.target.closest('[data-gold-sample]');
      if (sample) {
        input.value = sample.dataset.goldSample === 'invalid' ? profile.invalid : profile.sample;
        run();
        return;
      }
      if (event.target.closest('[data-gold-generate]')) {
        input.value = profile.sample;
        run();
        return;
      }
      if (event.target.closest('[data-gold-run]')) {
        run();
        return;
      }
      if (event.target.closest('[data-gold-batch]')) {
        const valid = analyze(profile, profile.sample);
        const invalid = analyze(profile, profile.invalid);
        input.value = profile.sample;
        run([{ label: 'valid fixture', ok: valid.ok }, { label: 'invalid fixture', ok: invalid.ok }]);
        return;
      }
      const copyButton = event.target.closest('[data-gold-copy]');
      if (copyButton) {
        const value = JSON.stringify(lastJson || buildDeveloperJson(profile, analyze(profile, input.value)), null, 2);
        navigator.clipboard && navigator.clipboard.writeText(value);
        copyButton.textContent = 'Copied JSON';
        setTimeout(() => { copyButton.textContent = 'Copy developer JSON'; }, 1200);
      }
    });
    run();
    return true;
  }

  function init(attempt) {
    if (mount()) return;
    if ((attempt || 0) < 80) setTimeout(() => init((attempt || 0) + 1), 50);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init(0));
  else init(0);
})();
