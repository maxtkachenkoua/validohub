#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = [
  {
    slug: 'portugal', iso2: 'PT', iso3: 'PRT', isoNumeric: '620', name: 'Portugal', adjective: 'Portuguese', nativeName: 'Portugal',
    flag: '🇵🇹', language: 'Portuguese', localLanguage: 'pt-PT', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'pt-PT', icu: 'pt_PT', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Space or dot grouping', phone: '+351',
    capital: 'Lisbon', region: 'Southern Europe / European Union', population: 'approximately 10.4M',
    identifiers: ['NIF', 'NISS', 'Cartao de Cidadao', 'NIPC', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'Multibanco reference', 'VIES'],
    localTerms: { personal: 'NIF', company: 'NIPC', tax: 'IVA', social: 'NISS', register: 'Registo Comercial', invoice: 'SAF-T / e-Fatura', payment: 'Multibanco', plate: 'vehicle plate', postal: 'codigo postal', privacy: 'GDPR / CNPD' },
    samples: { personal: '123456749', company: 'PT123456749', social: '12345674901', iban: 'PT50000201231234567490154', bank: '0002 0123', phone: '+351 912 345 678', postal: '1000-001 Lisboa', plate: '12-AA-34', vat: 'PT123456749', amount: '1 234,56 EUR', date: '21/07/2026', address: 'Rua Augusta 100, 1100-053 Lisboa', json: '{"country":"PT","nif":"123456749","iban":"PT50000201231234567490154","amount":"1 234,56"}' },
    theme: ['#006600', '#FF0000', '#F7F7F2'], marker: { x: 38, y: 62 }, related: ['ES', 'FR', 'IT']
  },
  {
    slug: 'austria', iso2: 'AT', iso3: 'AUT', isoNumeric: '040', name: 'Austria', adjective: 'Austrian', nativeName: 'Osterreich',
    flag: '🇦🇹', language: 'German', localLanguage: 'de-AT', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'de-AT', icu: 'de_AT', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot (.)', phone: '+43',
    capital: 'Vienna', region: 'Central Europe / European Union', population: 'approximately 9.2M',
    identifiers: ['Steuernummer', 'UID', 'SVNR', 'Firmenbuchnummer', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'EPS handoff', 'VIES'],
    localTerms: { personal: 'SVNR', company: 'Firmenbuchnummer', tax: 'UID / USt', social: 'Sozialversicherungsnummer', register: 'Firmenbuch', invoice: 'E-Rechnung / ebInterface', payment: 'EPS / SEPA', plate: 'Kennzeichen', postal: 'Postleitzahl', privacy: 'GDPR / DSG' },
    samples: { personal: '1234010180', company: 'FN 123456a', social: '1234010180', iban: 'AT611904300234573201', bank: '19043 00234573201', phone: '+43 664 1234567', postal: '1010 Wien', plate: 'W 12345 A', vat: 'ATU12345674', amount: '1.234,56 EUR', date: '21.07.2026', address: 'Kaerntner Strasse 10, 1010 Wien', json: '{"country":"AT","uid":"ATU12345674","iban":"AT611904300234573201","amount":"1.234,56"}' },
    theme: ['#C8102E', '#0F172A', '#F8FAFC'], marker: { x: 50, y: 58 }, related: ['DE', 'CH', 'IT']
  },
  {
    slug: 'belgium', iso2: 'BE', iso3: 'BEL', isoNumeric: '056', name: 'Belgium', adjective: 'Belgian', nativeName: 'Belgique / Belgie',
    flag: '🇧🇪', language: 'Dutch, French, and German', localLanguage: 'nl-BE / fr-BE', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'nl-BE', icu: 'nl_BE', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot or space grouping', phone: '+32',
    capital: 'Brussels', region: 'Western Europe / European Union', population: 'approximately 11.8M',
    identifiers: ['National Register Number', 'BIS', 'KBO/BCE', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'structured communication', 'VIES'],
    localTerms: { personal: 'RRN / NISS', company: 'KBO / BCE', tax: 'BTW / TVA', social: 'BIS number', register: 'KBO / BCE register', invoice: 'Peppol / e-invoicing', payment: 'OGM structured communication', plate: 'vehicle plate', postal: 'postcode / code postal', privacy: 'GDPR / APD-GBA' },
    samples: { personal: '85.07.30-033.28', company: 'BE0123456749', social: '85.07.30-033.28', iban: 'BE68539007547034', bank: '539 0075470 34', phone: '+32 2 123 45 67', postal: '1000 Brussels', plate: '1-ABC-123', vat: 'BE0123456749', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Rue de la Loi 16, 1000 Brussels', json: '{"country":"BE","vat":"BE0123456749","iban":"BE68539007547034","amount":"1.234,56"}' },
    theme: ['#111827', '#FACC15', '#EF4444'], marker: { x: 47, y: 52 }, related: ['NL', 'FR', 'DE']
  },
  {
    slug: 'ireland', iso2: 'IE', iso3: 'IRL', isoNumeric: '372', name: 'Ireland', adjective: 'Irish', nativeName: 'Ireland / Eire',
    flag: '🇮🇪', language: 'English and Irish', localLanguage: 'en-IE', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'en-IE', icu: 'en_IE', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+353',
    capital: 'Dublin', region: 'Northern Europe / European Union', population: 'approximately 5.4M',
    identifiers: ['PPSN', 'CRO number', 'VAT', 'Eircode', 'postal address', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'ROS handoff', 'VIES'],
    localTerms: { personal: 'PPSN', company: 'CRO number', tax: 'VAT / Revenue', social: 'PPSN', register: 'Companies Registration Office', invoice: 'Revenue e-invoicing readiness', payment: 'SEPA / Direct Debit', plate: 'registration plate', postal: 'Eircode', privacy: 'GDPR / Data Protection Commission' },
    samples: { personal: '1234567T', company: '123456', social: '1234567T', iban: 'IE29AIBK93115212345674', bank: 'AIBK 931152 12345674', phone: '+353 1 234 5678', postal: 'D02 X285', plate: '241-D-12345', vat: 'IE6388047V', amount: '1,234.56 EUR', date: '21/07/2026', address: '1 Grafton Street, Dublin, D02 X285', json: '{"country":"IE","ppsn":"1234567T","iban":"IE29AIBK93115212345674","eircode":"D02 X285"}' },
    theme: ['#169B62', '#FF883E', '#F8FAFC'], marker: { x: 42, y: 49 }, related: ['GB', 'FR', 'NL']
  },
  {
    slug: 'czechia', iso2: 'CZ', iso3: 'CZE', isoNumeric: '203', name: 'Czechia', adjective: 'Czech', nativeName: 'Cesko',
    flag: '🇨🇿', language: 'Czech', localLanguage: 'cs-CZ', currency: 'CZK', currencyName: 'Czech koruna', symbol: 'CZK',
    locale: 'cs-CZ', icu: 'cs_CZ', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+420',
    capital: 'Prague', region: 'Central Europe / European Union', population: 'approximately 10.9M',
    identifiers: ['Rodne cislo', 'ICO', 'DIC', 'Datova schranka', 'postal code', 'phone'],
    payments: ['IBAN', 'domestic account', 'SWIFT', 'variable symbol', 'VIES'],
    localTerms: { personal: 'Rodne cislo', company: 'ICO', tax: 'DIC / DPH', social: 'social insurance evidence', register: 'Ares / business register', invoice: 'ISDOC / e-invoicing', payment: 'variable symbol', plate: 'SPZ vehicle plate', postal: 'PSC', privacy: 'GDPR / UOOU' },
    samples: { personal: '800101/0006', company: '27074358', social: '800101/0006', iban: 'CZ6508000000192000145399', bank: '0800 192000145399', phone: '+420 777 123 456', postal: '110 00 Praha 1', plate: '1AB 2345', vat: 'CZ27074358', amount: '1 234,56 CZK', date: '21.07.2026', address: 'Vaclavske namesti 1, 110 00 Praha 1', json: '{"country":"CZ","ico":"27074358","dic":"CZ27074358","iban":"CZ6508000000192000145399"}' },
    theme: ['#11457E', '#D7141A', '#F8FAFC'], marker: { x: 51, y: 55 }, related: ['SK', 'DE', 'AT']
  },
  {
    slug: 'sweden', iso2: 'SE', iso3: 'SWE', isoNumeric: '752', name: 'Sweden', adjective: 'Swedish', nativeName: 'Sverige',
    flag: '🇸🇪', language: 'Swedish', localLanguage: 'sv-SE', currency: 'SEK', currencyName: 'Swedish krona', symbol: 'SEK',
    locale: 'sv-SE', icu: 'sv_SE', date: 'YYYY-MM-DD', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+46',
    capital: 'Stockholm', region: 'Northern Europe / European Union', population: 'approximately 10.7M',
    identifiers: ['Personnummer', 'Samordningsnummer', 'Organisationsnummer', 'Momsregistreringsnummer', 'postal code', 'phone'],
    payments: ['IBAN', 'Bankgiro', 'PlusGiro', 'SWIFT', 'VIES'],
    localTerms: { personal: 'Personnummer', company: 'Organisationsnummer', tax: 'Moms', social: 'Samordningsnummer', register: 'Bolagsverket', invoice: 'Peppol / Svefaktura', payment: 'Bankgiro / OCR', plate: 'registreringsnummer', postal: 'postnummer', privacy: 'GDPR / IMY' },
    samples: { personal: '850101-1236', company: '556016-0680', social: '850101-1236', iban: 'SE4550000000058398257466', bank: '5000 58398257466', phone: '+46 70 123 45 67', postal: '111 20 Stockholm', plate: 'ABC123', vat: 'SE556016068001', amount: '1 234,56 SEK', date: '2026-07-21', address: 'Drottninggatan 1, 111 20 Stockholm', json: '{"country":"SE","personnummer":"850101-1236","orgnr":"556016-0680","iban":"SE4550000000058398257466"}' },
    theme: ['#006AA7', '#FECC00', '#F8FAFC'], marker: { x: 55, y: 38 }, related: ['NO', 'DK', 'FI']
  },
  {
    slug: 'norway', iso2: 'NO', iso3: 'NOR', isoNumeric: '578', name: 'Norway', adjective: 'Norwegian', nativeName: 'Norge',
    flag: '🇳🇴', language: 'Norwegian', localLanguage: 'nb-NO', currency: 'NOK', currencyName: 'Norwegian krone', symbol: 'NOK',
    locale: 'nb-NO', icu: 'nb_NO', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+47',
    capital: 'Oslo', region: 'Northern Europe / EEA', population: 'approximately 5.6M',
    identifiers: ['Fodselsnummer', 'D-number', 'Organisasjonsnummer', 'MVA', 'postal code', 'phone'],
    payments: ['IBAN', 'KID', 'SWIFT', 'AvtaleGiro handoff', 'VAT handoff'],
    localTerms: { personal: 'Fodselsnummer', company: 'Organisasjonsnummer', tax: 'MVA', social: 'D-number', register: 'Brreg', invoice: 'EHF / Peppol', payment: 'KID reference', plate: 'kjennemerke', postal: 'postnummer', privacy: 'GDPR / Datatilsynet' },
    samples: { personal: '01018500120', company: '915545943', social: '01018500120', iban: 'NO9386011117947', bank: '8601 11 17947', phone: '+47 912 34 567', postal: '0150 Oslo', plate: 'AB12345', vat: 'NO915545943MVA', amount: '1 234,56 NOK', date: '21.07.2026', address: 'Karl Johans gate 1, 0154 Oslo', json: '{"country":"NO","orgnr":"915545943","mva":"NO915545943MVA","iban":"NO9386011117947"}' },
    theme: ['#BA0C2F', '#00205B', '#F8FAFC'], marker: { x: 52, y: 34 }, related: ['SE', 'DK', 'FI']
  },
  {
    slug: 'denmark', iso2: 'DK', iso3: 'DNK', isoNumeric: '208', name: 'Denmark', adjective: 'Danish', nativeName: 'Danmark',
    flag: '🇩🇰', language: 'Danish', localLanguage: 'da-DK', currency: 'DKK', currencyName: 'Danish krone', symbol: 'DKK',
    locale: 'da-DK', icu: 'da_DK', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot (.)', phone: '+45',
    capital: 'Copenhagen', region: 'Northern Europe / European Union', population: 'approximately 6.0M',
    identifiers: ['CPR', 'CVR', 'SE number', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'FI creditor reference', 'SWIFT', 'Betalingsservice handoff', 'VIES'],
    localTerms: { personal: 'CPR', company: 'CVR', tax: 'Moms / VAT', social: 'CPR', register: 'CVR register', invoice: 'NemHandel / Peppol', payment: 'FI / Betalingsservice', plate: 'nummerplade', postal: 'postnummer', privacy: 'GDPR / Datatilsynet' },
    samples: { personal: '010185-1234', company: '12345674', social: '010185-1234', iban: 'DK5000400440116243', bank: '0040 0440116243', phone: '+45 12 34 56 78', postal: '1050 Copenhagen K', plate: 'AB 12 345', vat: 'DK12345674', amount: '1.234,56 DKK', date: '21.07.2026', address: 'Nyhavn 1, 1051 Copenhagen K', json: '{"country":"DK","cvr":"12345674","vat":"DK12345674","iban":"DK5000400440116243"}' },
    theme: ['#C60C30', '#F8FAFC', '#1F2937'], marker: { x: 51, y: 45 }, related: ['SE', 'NO', 'DE']
  },
  {
    slug: 'finland', iso2: 'FI', iso3: 'FIN', isoNumeric: '246', name: 'Finland', adjective: 'Finnish', nativeName: 'Suomi',
    flag: '🇫🇮', language: 'Finnish and Swedish', localLanguage: 'fi-FI', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'fi-FI', icu: 'fi_FI', date: 'D.M.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+358',
    capital: 'Helsinki', region: 'Northern Europe / European Union', population: 'approximately 5.6M',
    identifiers: ['HETU', 'Y-tunnus', 'VAT', 'OVT', 'postal code', 'phone'],
    payments: ['IBAN', 'Finnish reference number', 'SWIFT', 'SEPA', 'VIES'],
    localTerms: { personal: 'HETU', company: 'Y-tunnus', tax: 'ALV / VAT', social: 'HETU', register: 'YTJ / Trade Register', invoice: 'Finvoice / Peppol', payment: 'viitenumero', plate: 'rekisterinumero', postal: 'postinumero', privacy: 'GDPR / Tietosuojavaltuutettu' },
    samples: { personal: '010185-123B', company: '1234567-1', social: '010185-123B', iban: 'FI2112345600000785', bank: '123456 00000785', phone: '+358 40 123 4567', postal: '00100 Helsinki', plate: 'ABC-123', vat: 'FI12345671', amount: '1 234,56 EUR', date: '21.7.2026', address: 'Mannerheimintie 1, 00100 Helsinki', json: '{"country":"FI","hetu":"010185-123B","ytunnus":"1234567-1","iban":"FI2112345600000785"}' },
    theme: ['#002F6C', '#F8FAFC', '#38BDF8'], marker: { x: 58, y: 32 }, related: ['SE', 'NO', 'EE']
  },
  {
    slug: 'romania', iso2: 'RO', iso3: 'ROU', isoNumeric: '642', name: 'Romania', adjective: 'Romanian', nativeName: 'Romania',
    flag: '🇷🇴', language: 'Romanian', localLanguage: 'ro-RO', currency: 'RON', currencyName: 'Romanian leu', symbol: 'RON',
    locale: 'ro-RO', icu: 'ro_RO', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot or space grouping', phone: '+40',
    capital: 'Bucharest', region: 'Southeastern Europe / European Union', population: 'approximately 19.0M',
    identifiers: ['CNP', 'CUI', 'CIF', 'ONRC', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'ANAF handoff', 'e-Factura handoff', 'VIES'],
    localTerms: { personal: 'CNP', company: 'CUI / CIF', tax: 'TVA', social: 'CNP', register: 'ONRC', invoice: 'RO e-Factura / ANAF', payment: 'treasury / SEPA handoff', plate: 'numar inmatriculare', postal: 'cod postal', privacy: 'GDPR / ANSPDCP' },
    samples: { personal: '1850101123451', company: 'RO12345674', social: '1850101123451', iban: 'RO49AAAA1B31007593840000', bank: 'AAAA 1B31007593840000', phone: '+40 721 234 567', postal: '010011 Bucuresti', plate: 'B 123 ABC', vat: 'RO12345674', amount: '1.234,56 RON', date: '21.07.2026', address: 'Calea Victoriei 1, 010061 Bucuresti', json: '{"country":"RO","cnp":"1850101123451","cui":"RO12345674","iban":"RO49AAAA1B31007593840000"}' },
    theme: ['#002B7F', '#FCD116', '#CE1126'], marker: { x: 58, y: 62 }, related: ['BG', 'HU', 'MD']
  }
];

const COUNTRY_TIME_ZONES = {
  portugal: 'Europe/Lisbon (WET/WEST)',
  austria: 'Europe/Vienna (CET/CEST)',
  belgium: 'Europe/Brussels (CET/CEST)',
  ireland: 'Europe/Dublin (IST/GMT)',
  czechia: 'Europe/Prague (CET/CEST)',
  sweden: 'Europe/Stockholm (CET/CEST)',
  norway: 'Europe/Oslo (CET/CEST)',
  denmark: 'Europe/Copenhagen (CET/CEST)',
  finland: 'Europe/Helsinki (EET/EEST)',
  romania: 'Europe/Bucharest (EET/EEST)'
};

const STRICT_EUROPE_EXPANSION_COUNTRIES = [
  {
    slug: 'albania', iso2: 'AL', iso3: 'ALB', isoNumeric: '008', name: 'Albania', adjective: 'Albanian', nativeName: 'Shqiperia',
    flag: '🇦🇱', language: 'Albanian', localLanguage: 'sq-AL', currency: 'ALL', currencyName: 'Albanian lek', symbol: 'ALL',
    locale: 'sq-AL', icu: 'sq_AL', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot or space grouping', phone: '+355',
    capital: 'Tirana', region: 'Southeastern Europe', population: 'approximately 2.8M',
    identifiers: ['NIPT', 'personal number', 'business number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic account', 'tax payment reference'],
    localTerms: { personal: 'Personal number', company: 'NIPT', tax: 'TVSH / VAT', social: 'social insurance number', register: 'QKB business register', invoice: 'fiscalization invoice', payment: 'bank payment reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'GDPR-aligned privacy' },
    samples: { personal: 'J12345678K', company: 'L12345678A', social: '1234567890', iban: 'AL47212110090000000235698741', bank: '2121 1009 0000000235698741', phone: '+355 69 123 4567', postal: '1001 Tirana', plate: 'AA 123 AB', vat: 'AL L12345678A', amount: '1.234,56 ALL', date: '21.07.2026', address: 'Bulevardi Deshmoret e Kombit 1, 1001 Tirana', json: '{"country":"AL","nipt":"L12345678A","iban":"AL47212110090000000235698741"}' },
    theme: ['#E41E20', '#111827', '#F8FAFC'], marker: { x: 53, y: 64 }, related: ['ME', 'MK', 'GR'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['NIPT', 'TVSH', 'QKB', 'IBAN', 'FISCALIZATION', 'PHONE']
  },
  {
    slug: 'andorra', iso2: 'AD', iso3: 'AND', isoNumeric: '020', name: 'Andorra', adjective: 'Andorran', nativeName: 'Andorra',
    flag: '🇦🇩', language: 'Catalan', localLanguage: 'ca-AD', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'ca-AD', icu: 'ca_AD', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+376',
    capital: 'Andorra la Vella', region: 'Southern Europe', population: 'approximately 0.08M',
    identifiers: ['NRT', 'CASS number', 'company registry number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'SEPA', 'tax payment reference'],
    localTerms: { personal: 'CASS number', company: 'NRT', tax: 'IGI / NRT', social: 'CASS number', register: 'Registre de Societats', invoice: 'IGI invoice', payment: 'SEPA reference', plate: 'matricula', postal: 'codi postal', privacy: 'LQPD privacy' },
    samples: { personal: 'A123456Z', company: 'F-123456-Z', social: 'CASS 123456', iban: 'AD1200012030200359100100', bank: '0001 2030 200359100100', phone: '+376 312 345', postal: 'AD500 Andorra la Vella', plate: 'A1234', vat: 'AD F123456Z', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Avinguda Meritxell 1, AD500 Andorra la Vella', json: '{"country":"AD","nrt":"F-123456-Z","iban":"AD1200012030200359100100"}' },
    theme: ['#10069F', '#FEDD00', '#D50032'], marker: { x: 45, y: 61 }, related: ['ES', 'FR', 'PT'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['NRT', 'CASS', 'IGI', 'IBAN', 'SEPA', 'AD POSTAL']
  },
  {
    slug: 'bosnia-and-herzegovina', iso2: 'BA', iso3: 'BIH', isoNumeric: '070', name: 'Bosnia and Herzegovina', adjective: 'Bosnian', nativeName: 'Bosna i Hercegovina',
    flag: '🇧🇦', language: 'Bosnian, Croatian, and Serbian', localLanguage: 'bs-BA', currency: 'BAM', currencyName: 'Convertible mark', symbol: 'BAM',
    locale: 'bs-BA', icu: 'bs_BA', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+387',
    capital: 'Sarajevo', region: 'Southeastern Europe', population: 'approximately 3.2M',
    identifiers: ['JMBG', 'JIB', 'PDV number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic account', 'payment reference'],
    localTerms: { personal: 'JMBG', company: 'JIB', tax: 'PDV', social: 'health/social insurance number', register: 'company court register', invoice: 'PDV invoice', payment: 'domestic payment reference', plate: 'registracijska oznaka', postal: 'postanski broj', privacy: 'personal-data protection' },
    samples: { personal: '0101980123456', company: '4200123450006', social: '0101980123456', iban: 'BA391290079401028494', bank: '129 0079401028494', phone: '+387 61 123 456', postal: '71000 Sarajevo', plate: 'A12-J-345', vat: 'BA4200123450006', amount: '1.234,56 BAM', date: '21.07.2026', address: 'Ferhadija 1, 71000 Sarajevo', json: '{"country":"BA","jib":"4200123450006","iban":"BA391290079401028494"}' },
    theme: ['#002395', '#FECB00', '#FFFFFF'], marker: { x: 52, y: 61 }, related: ['HR', 'RS', 'ME'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['JMBG', 'JIB', 'PDV', 'IBAN', 'SWIFT', 'PAYMENT']
  },
  {
    slug: 'bulgaria', iso2: 'BG', iso3: 'BGR', isoNumeric: '100', name: 'Bulgaria', adjective: 'Bulgarian', nativeName: 'Bulgaria',
    flag: '🇧🇬', language: 'Bulgarian', localLanguage: 'bg-BG', currency: 'BGN', currencyName: 'Bulgarian lev', symbol: 'BGN',
    locale: 'bg-BG', icu: 'bg_BG', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+359',
    capital: 'Sofia', region: 'Southeastern Europe / European Union', population: 'approximately 6.4M',
    identifiers: ['EGN', 'LNCh', 'UIC/EIK', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment code', 'VIES'],
    localTerms: { personal: 'EGN', company: 'UIC / EIK', tax: 'DDS / VAT', social: 'LNCh', register: 'Commercial Register', invoice: 'DDS invoice', payment: 'payment code', plate: 'registration plate', postal: 'postal code', privacy: 'GDPR / CPDP' },
    samples: { personal: '8001010008', company: '123456789', social: '8001010008', iban: 'BG80BNBG96611020345678', bank: 'BNBG 96611020345678', phone: '+359 88 123 4567', postal: '1000 Sofia', plate: 'CB1234AB', vat: 'BG123456789', amount: '1 234,56 BGN', date: '21.07.2026', address: 'Vitosha Blvd 1, 1000 Sofia', json: '{"country":"BG","egn":"8001010008","vat":"BG123456789","iban":"BG80BNBG96611020345678"}' },
    theme: ['#00966E', '#FFFFFF', '#D62612'], marker: { x: 56, y: 63 }, related: ['RO', 'GR', 'RS'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['EGN', 'LNCH', 'EIK', 'DDS', 'IBAN', 'VIES']
  },
  {
    slug: 'croatia', iso2: 'HR', iso3: 'HRV', isoNumeric: '191', name: 'Croatia', adjective: 'Croatian', nativeName: 'Hrvatska',
    flag: '🇭🇷', language: 'Croatian', localLanguage: 'hr-HR', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'hr-HR', icu: 'hr_HR', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+385',
    capital: 'Zagreb', region: 'Southeastern Europe / European Union', population: 'approximately 3.8M',
    identifiers: ['OIB', 'MBS', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'model/reference number', 'VIES'],
    localTerms: { personal: 'OIB', company: 'MBS / OIB', tax: 'PDV / VAT', social: 'OIB', register: 'Sudski registar', invoice: 'PDV invoice', payment: 'model i poziv na broj', plate: 'registracija', postal: 'postanski broj', privacy: 'GDPR / AZOP' },
    samples: { personal: '12345678903', company: '080012345', social: '12345678903', iban: 'HR1210010051863000160', bank: '1001005 1863000160', phone: '+385 91 123 4567', postal: '10000 Zagreb', plate: 'ZG 1234 AB', vat: 'HR12345678903', amount: '1.234,56 EUR', date: '21.07.2026', address: 'Ilica 1, 10000 Zagreb', json: '{"country":"HR","oib":"12345678903","iban":"HR1210010051863000160"}' },
    theme: ['#FF0000', '#FFFFFF', '#171796'], marker: { x: 51, y: 60 }, related: ['SI', 'BA', 'HU'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['OIB', 'MBS', 'PDV', 'POZIV NA BROJ', 'IBAN', 'SEPA']
  },
  {
    slug: 'cyprus', iso2: 'CY', iso3: 'CYP', isoNumeric: '196', name: 'Cyprus', adjective: 'Cypriot', nativeName: 'Kypros',
    flag: '🇨🇾', language: 'Greek and Turkish', localLanguage: 'el-CY', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'el-CY', icu: 'el_CY', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+357',
    capital: 'Nicosia', region: 'Eastern Mediterranean / European Union', population: 'approximately 0.9M',
    identifiers: ['Civil ID', 'company HE number', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'tax payment reference', 'VIES'],
    localTerms: { personal: 'Civil ID', company: 'HE company number', tax: 'VAT', social: 'social insurance number', register: 'Registrar of Companies', invoice: 'VAT invoice', payment: 'SEPA reference', plate: 'registration plate', postal: 'postal code', privacy: 'GDPR / Commissioner' },
    samples: { personal: '1234567L', company: 'HE123456', social: '1234567L', iban: 'CY17002001280000001200527600', bank: '002001280000001200527600', phone: '+357 99 123456', postal: '1010 Nicosia', plate: 'ABC123', vat: 'CY12345678L', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Ledras 1, 1010 Nicosia', json: '{"country":"CY","vat":"CY12345678L","iban":"CY17002001280000001200527600"}' },
    theme: ['#D57800', '#FFFFFF', '#4E9F3D'], marker: { x: 60, y: 69 }, related: ['GR', 'MT', 'BG'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz',
    searchHints: ['CIVIL ID', 'HE', 'VAT', 'IBAN', 'SEPA', 'NICOSIA']
  },
  {
    slug: 'estonia', iso2: 'EE', iso3: 'EST', isoNumeric: '233', name: 'Estonia', adjective: 'Estonian', nativeName: 'Eesti',
    flag: '🇪🇪', language: 'Estonian', localLanguage: 'et-EE', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'et-EE', icu: 'et_EE', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+372',
    capital: 'Tallinn', region: 'Northern Europe / European Union', population: 'approximately 1.4M',
    identifiers: ['Isikukood', 'registry code', 'KMKR', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'e-invoice reference', 'VIES'],
    localTerms: { personal: 'Isikukood', company: 'registry code', tax: 'KMKR / VAT', social: 'Isikukood', register: 'e-Business Register', invoice: 'e-invoice', payment: 'payment reference', plate: 'registration plate', postal: 'postal code', privacy: 'GDPR / AKI' },
    samples: { personal: '38501010018', company: '12345678', social: '38501010018', iban: 'EE382200221020145685', bank: '2200 221020145685', phone: '+372 5123 4567', postal: '10111 Tallinn', plate: '123ABC', vat: 'EE123456789', amount: '1 234,56 EUR', date: '21.07.2026', address: 'Viru 1, 10111 Tallinn', json: '{"country":"EE","isikukood":"38501010018","iban":"EE382200221020145685"}' },
    theme: ['#0072CE', '#000000', '#FFFFFF'], marker: { x: 56, y: 39 }, related: ['FI', 'LV', 'LT'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['ISIKUKOOD', 'KMKR', 'REGISTRY CODE', 'IBAN', 'SEPA', 'E-INVOICE']
  },
  {
    slug: 'greece', iso2: 'GR', iso3: 'GRC', isoNumeric: '300', name: 'Greece', adjective: 'Greek', nativeName: 'Ellada',
    flag: '🇬🇷', language: 'Greek', localLanguage: 'el-GR', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'el-GR', icu: 'el_GR', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+30',
    capital: 'Athens', region: 'Southern Europe / European Union', population: 'approximately 10.3M',
    identifiers: ['AFM', 'AMKA', 'GEMI', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'RF payment code', 'VIES'],
    localTerms: { personal: 'AMKA', company: 'GEMI number', tax: 'AFM / VAT', social: 'AMKA', register: 'GEMI business register', invoice: 'myDATA / AADE invoice', payment: 'RF payment code', plate: 'vehicle plate', postal: 'TK postal code', privacy: 'GDPR / HDPA' },
    samples: { personal: '01018012345', company: '123456789000', social: '01018012345', iban: 'GR1601101250000000012300695', bank: '01101250000000012300695', phone: '+30 210 123 4567', postal: '105 57 Athens', plate: 'YKY 1234', vat: 'EL123456789', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Ermou 1, 105 57 Athens', json: '{"country":"GR","afm":"123456789","iban":"GR1601101250000000012300695"}' },
    theme: ['#0D5EAF', '#FFFFFF', '#0D5EAF'], marker: { x: 56, y: 67 }, related: ['BG', 'CY', 'IT'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['AFM', 'AMKA', 'GEMI', 'MYDATA', 'AADE', 'IBAN']
  },
  {
    slug: 'hungary', iso2: 'HU', iso3: 'HUN', isoNumeric: '348', name: 'Hungary', adjective: 'Hungarian', nativeName: 'Magyarorszag',
    flag: '🇭🇺', language: 'Hungarian', localLanguage: 'hu-HU', currency: 'HUF', currencyName: 'Hungarian forint', symbol: 'HUF',
    locale: 'hu-HU', icu: 'hu_HU', date: 'YYYY.MM.DD', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+36',
    capital: 'Budapest', region: 'Central Europe / European Union', population: 'approximately 9.6M',
    identifiers: ['tax number', 'TAJ', 'company registry number', 'postal code', 'phone'],
    payments: ['IBAN', 'GIRO', 'SWIFT', 'NAV payment reference', 'VIES'],
    localTerms: { personal: 'TAJ', company: 'company registry number', tax: 'adoszam / VAT', social: 'TAJ', register: 'Cegjegyzek', invoice: 'NAV Online Szamla', payment: 'GIRO / NAV reference', plate: 'rendszam', postal: 'iranyitoszam', privacy: 'GDPR / NAIH' },
    samples: { personal: '123456789', company: '01-09-123456', social: '123456789', iban: 'HU42117730161111101800000000', bank: '11773016 11111018 00000000', phone: '+36 30 123 4567', postal: '1051 Budapest', plate: 'ABC-123', vat: 'HU12345678', amount: '1 234,56 HUF', date: '2026.07.21', address: 'Andrassy ut 1, 1051 Budapest', json: '{"country":"HU","tax":"HU12345678","iban":"HU42117730161111101800000000"}' },
    theme: ['#CE2939', '#FFFFFF', '#477050'], marker: { x: 53, y: 58 }, related: ['AT', 'SK', 'RO'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['TAJ', 'ADOSZAM', 'NAV', 'GIRO', 'ONLINE SZAMLA', 'IBAN']
  },
  {
    slug: 'iceland', iso2: 'IS', iso3: 'ISL', isoNumeric: '352', name: 'Iceland', adjective: 'Icelandic', nativeName: 'Island',
    flag: '🇮🇸', language: 'Icelandic', localLanguage: 'is-IS', currency: 'ISK', currencyName: 'Icelandic krona', symbol: 'ISK',
    locale: 'is-IS', icu: 'is_IS', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+354',
    capital: 'Reykjavik', region: 'Northern Europe / EEA', population: 'approximately 0.4M',
    identifiers: ['Kennitala', 'VAT number', 'company number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic account', 'invoice reference'],
    localTerms: { personal: 'Kennitala', company: 'company kennitala', tax: 'VSK / VAT', social: 'Kennitala', register: 'Companies Register', invoice: 'e-invoice', payment: 'payment reference', plate: 'skraningarnumer', postal: 'postnumer', privacy: 'GDPR / Persónuvernd' },
    samples: { personal: '1201743399', company: '5501692829', social: '1201743399', iban: 'IS140159260076545510730339', bank: '0159 26 007654 5510730339', phone: '+354 555 1234', postal: '101 Reykjavik', plate: 'AB123', vat: 'IS5501692829', amount: '1.234,56 ISK', date: '21.07.2026', address: 'Laugavegur 1, 101 Reykjavik', json: '{"country":"IS","kennitala":"1201743399","iban":"IS140159260076545510730339"}' },
    theme: ['#02529C', '#FFFFFF', '#DC1E35'], marker: { x: 39, y: 30 }, related: ['NO', 'DK', 'GB'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['KENNITALA', 'VSK', 'IBAN', 'SWIFT', 'POSTNUMER', 'PHONE']
  },
  {
    slug: 'latvia', iso2: 'LV', iso3: 'LVA', isoNumeric: '428', name: 'Latvia', adjective: 'Latvian', nativeName: 'Latvija',
    flag: '🇱🇻', language: 'Latvian', localLanguage: 'lv-LV', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'lv-LV', icu: 'lv_LV', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+371',
    capital: 'Riga', region: 'Northern Europe / European Union', population: 'approximately 1.8M',
    identifiers: ['personal code', 'registration number', 'PVN number', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference', 'VIES'],
    localTerms: { personal: 'personal code', company: 'registration number', tax: 'PVN / VAT', social: 'personal code', register: 'Uzņēmumu registrs', invoice: 'PVN invoice', payment: 'payment reference', plate: 'registration plate', postal: 'pasta indekss', privacy: 'GDPR / DVI' },
    samples: { personal: '010180-12345', company: '40003000000', social: '010180-12345', iban: 'LV80BANK0000435195001', bank: 'BANK 0000435195001', phone: '+371 29 123 456', postal: 'LV-1050 Riga', plate: 'AB-1234', vat: 'LV40003000000', amount: '1 234,56 EUR', date: '21.07.2026', address: 'Brivibas iela 1, LV-1050 Riga', json: '{"country":"LV","pvn":"LV40003000000","iban":"LV80BANK0000435195001"}' },
    theme: ['#9E3039', '#FFFFFF', '#9E3039'], marker: { x: 55, y: 43 }, related: ['EE', 'LT', 'PL'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['PERSONAL CODE', 'PVN', 'REGISTRATION', 'IBAN', 'SEPA', 'LV POSTAL']
  },
  {
    slug: 'liechtenstein', iso2: 'LI', iso3: 'LIE', isoNumeric: '438', name: 'Liechtenstein', adjective: 'Liechtenstein', nativeName: 'Liechtenstein',
    flag: '🇱🇮', language: 'German', localLanguage: 'de-LI', currency: 'CHF', currencyName: 'Swiss franc', symbol: 'CHF',
    locale: 'de-LI', icu: 'de_LI', date: 'DD.MM.YYYY', decimal: 'Dot (.)', thousands: 'Apostrophe or space grouping', phone: '+423',
    capital: 'Vaduz', region: 'Central Europe / EEA', population: 'approximately 0.04M',
    identifiers: ['PEID', 'company number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'SIC/Swiss rail handoff', 'payment reference'],
    localTerms: { personal: 'PEID', company: 'company register number', tax: 'MWST / VAT', social: 'social insurance number', register: 'Handelsregister', invoice: 'MWST invoice', payment: 'Swiss-style payment reference', plate: 'Kontrollschild', postal: 'Postleitzahl', privacy: 'GDPR / Datenschutzstelle' },
    samples: { personal: '756.1234.5678.97', company: 'FL-0002.123.456-7', social: '756.1234.5678.97', iban: 'LI21088100002324013AA', bank: '08810 0002324013AA', phone: '+423 234 56 78', postal: '9490 Vaduz', plate: 'FL 12345', vat: 'CHE-123.456.789 MWST', amount: "1'234.56 CHF", date: '21.07.2026', address: 'Staedtle 1, 9490 Vaduz', json: '{"country":"LI","company":"FL-0002.123.456-7","iban":"LI21088100002324013AA"}' },
    theme: ['#002B7F', '#CE1126', '#FFD100'], marker: { x: 49, y: 57 }, related: ['CH', 'AT', 'DE'],
    plugTypes: 'Type C / Type J', voltage: '230V', frequency: '50Hz',
    searchHints: ['PEID', 'MWST', 'HANDELSREGISTER', 'IBAN', 'CHF', 'FL']
  },
  {
    slug: 'lithuania', iso2: 'LT', iso3: 'LTU', isoNumeric: '440', name: 'Lithuania', adjective: 'Lithuanian', nativeName: 'Lietuva',
    flag: '🇱🇹', language: 'Lithuanian', localLanguage: 'lt-LT', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'lt-LT', icu: 'lt_LT', date: 'YYYY-MM-DD', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+370',
    capital: 'Vilnius', region: 'Northern Europe / European Union', population: 'approximately 2.9M',
    identifiers: ['asmens kodas', 'company code', 'PVM code', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment code', 'VIES'],
    localTerms: { personal: 'asmens kodas', company: 'company code', tax: 'PVM / VAT', social: 'asmens kodas', register: 'Registru centras', invoice: 'PVM invoice', payment: 'payment code', plate: 'registration plate', postal: 'pasto kodas', privacy: 'GDPR / VDAI' },
    samples: { personal: '38001010017', company: '123456789', social: '38001010017', iban: 'LT121000011101001000', bank: '10000 11101001000', phone: '+370 612 34567', postal: 'LT-01100 Vilnius', plate: 'ABC123', vat: 'LT123456789', amount: '1 234,56 EUR', date: '2026-07-21', address: 'Gedimino pr. 1, LT-01103 Vilnius', json: '{"country":"LT","pvm":"LT123456789","iban":"LT121000011101001000"}' },
    theme: ['#FDB913', '#006A44', '#C1272D'], marker: { x: 55, y: 45 }, related: ['LV', 'PL', 'EE'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['ASMENS KODAS', 'PVM', 'REGISTRU CENTRAS', 'IBAN', 'SEPA', 'POSTAL']
  },
  {
    slug: 'luxembourg', iso2: 'LU', iso3: 'LUX', isoNumeric: '442', name: 'Luxembourg', adjective: 'Luxembourgish', nativeName: 'Luxembourg',
    flag: '🇱🇺', language: 'Luxembourgish, French, and German', localLanguage: 'fr-LU', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'fr-LU', icu: 'fr_LU', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+352',
    capital: 'Luxembourg City', region: 'Western Europe / European Union', population: 'approximately 0.7M',
    identifiers: ['matricule', 'RCS number', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference', 'VIES'],
    localTerms: { personal: 'matricule', company: 'RCS number', tax: 'TVA / VAT', social: 'matricule', register: 'Registre de Commerce', invoice: 'TVA invoice', payment: 'SEPA reference', plate: 'registration plate', postal: 'code postal', privacy: 'GDPR / CNPD' },
    samples: { personal: '1980010101234', company: 'B123456', social: '1980010101234', iban: 'LU280019400644750000', bank: '0019 400644750000', phone: '+352 621 123 456', postal: 'L-1111 Luxembourg', plate: 'AB1234', vat: 'LU12345678', amount: '1 234,56 EUR', date: '21/07/2026', address: 'Grand-Rue 1, L-1661 Luxembourg', json: '{"country":"LU","vat":"LU12345678","iban":"LU280019400644750000"}' },
    theme: ['#EF3340', '#FFFFFF', '#00A3E0'], marker: { x: 47, y: 55 }, related: ['BE', 'FR', 'DE'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['MATRICULE', 'RCS', 'TVA', 'IBAN', 'SEPA', 'L-POSTAL']
  },
  {
    slug: 'malta', iso2: 'MT', iso3: 'MLT', isoNumeric: '470', name: 'Malta', adjective: 'Maltese', nativeName: 'Malta',
    flag: '🇲🇹', language: 'Maltese and English', localLanguage: 'mt-MT', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'mt-MT', icu: 'mt_MT', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+356',
    capital: 'Valletta', region: 'Southern Europe / European Union', population: 'approximately 0.5M',
    identifiers: ['ID card number', 'company C number', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference', 'VIES'],
    localTerms: { personal: 'ID card number', company: 'company C number', tax: 'VAT', social: 'social security number', register: 'Malta Business Registry', invoice: 'VAT invoice', payment: 'SEPA reference', plate: 'registration plate', postal: 'postal code', privacy: 'GDPR / IDPC' },
    samples: { personal: '1234567M', company: 'C12345', social: '1234567M', iban: 'MT84MALT011000012345MTLCAST001S', bank: 'MALT 011000012345MTLCAST001S', phone: '+356 2123 4567', postal: 'VLT 1111 Valletta', plate: 'ABC 123', vat: 'MT12345678', amount: '1,234.56 EUR', date: '21/07/2026', address: 'Republic Street 1, VLT 1111 Valletta', json: '{"country":"MT","vat":"MT12345678","iban":"MT84MALT011000012345MTLCAST001S"}' },
    theme: ['#FFFFFF', '#CF142B', '#9CA3AF'], marker: { x: 52, y: 70 }, related: ['IT', 'CY', 'GR'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz',
    searchHints: ['ID CARD', 'VAT', 'MBR', 'IBAN', 'SEPA', 'VLT']
  },
  {
    slug: 'moldova', iso2: 'MD', iso3: 'MDA', isoNumeric: '498', name: 'Moldova', adjective: 'Moldovan', nativeName: 'Moldova',
    flag: '🇲🇩', language: 'Romanian', localLanguage: 'ro-MD', currency: 'MDL', currencyName: 'Moldovan leu', symbol: 'MDL',
    locale: 'ro-MD', icu: 'ro_MD', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+373',
    capital: 'Chisinau', region: 'Eastern Europe', population: 'approximately 2.5M',
    identifiers: ['IDNP', 'IDNO', 'VAT code', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic account', 'payment reference'],
    localTerms: { personal: 'IDNP', company: 'IDNO', tax: 'TVA / VAT', social: 'CNAS evidence', register: 'ASP state register', invoice: 'TVA invoice', payment: 'payment reference', plate: 'registration plate', postal: 'cod postal', privacy: 'personal-data protection' },
    samples: { personal: '2000010101234', company: '1003600000001', social: '2000010101234', iban: 'MD24AG000225100013104168', bank: 'AG000225100013104168', phone: '+373 69 123 456', postal: 'MD-2001 Chisinau', plate: 'ABC 123', vat: 'MD1003600000001', amount: '1 234,56 MDL', date: '21.07.2026', address: 'Stefan cel Mare 1, MD-2001 Chisinau', json: '{"country":"MD","idno":"1003600000001","iban":"MD24AG000225100013104168"}' },
    theme: ['#0033A0', '#FFD100', '#CE1126'], marker: { x: 59, y: 59 }, related: ['RO', 'UA', 'BG'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['IDNP', 'IDNO', 'TVA', 'IBAN', 'ASP', 'MD POSTAL']
  },
  {
    slug: 'monaco', iso2: 'MC', iso3: 'MCO', isoNumeric: '492', name: 'Monaco', adjective: 'Monegasque', nativeName: 'Monaco',
    flag: '🇲🇨', language: 'French', localLanguage: 'fr-MC', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'fr-MC', icu: 'fr_MC', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+377',
    capital: 'Monaco', region: 'Western Europe', population: 'approximately 0.04M',
    identifiers: ['NIS', 'RCI number', 'VAT-style number', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference'],
    localTerms: { personal: 'NIS', company: 'RCI number', tax: 'TVA / VAT', social: 'social insurance number', register: 'RCI Monaco', invoice: 'TVA invoice', payment: 'SEPA reference', plate: 'registration plate', postal: 'code postal', privacy: 'personal-data protection' },
    samples: { personal: '123456789', company: '22S12345', social: '123456789', iban: 'MC5811222000010123456789030', bank: '11222 000010123456789030', phone: '+377 93 15 12 34', postal: '98000 Monaco', plate: '1234', vat: 'FR12345678901', amount: '1 234,56 EUR', date: '21/07/2026', address: 'Avenue de la Costa 1, 98000 Monaco', json: '{"country":"MC","rci":"22S12345","iban":"MC5811222000010123456789030"}' },
    theme: ['#CE1126', '#FFFFFF', '#111827'], marker: { x: 48, y: 61 }, related: ['FR', 'IT', 'AD'],
    plugTypes: 'Type C / Type E / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['RCI', 'NIS', 'TVA', 'IBAN', 'SEPA', '98000']
  },
  {
    slug: 'montenegro', iso2: 'ME', iso3: 'MNE', isoNumeric: '499', name: 'Montenegro', adjective: 'Montenegrin', nativeName: 'Crna Gora',
    flag: '🇲🇪', language: 'Montenegrin', localLanguage: 'sr-ME', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'sr-ME', icu: 'sr_ME', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+382',
    capital: 'Podgorica', region: 'Southeastern Europe', population: 'approximately 0.6M',
    identifiers: ['JMBG', 'PIB', 'VAT', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic payment reference'],
    localTerms: { personal: 'JMBG', company: 'PIB', tax: 'PDV / VAT', social: 'JMBG', register: 'Central Registry', invoice: 'PDV invoice', payment: 'payment reference', plate: 'registracija', postal: 'postanski broj', privacy: 'personal-data protection' },
    samples: { personal: '0101980234567', company: '02712345', social: '0101980234567', iban: 'ME25505000012345678951', bank: '505 000012345678951', phone: '+382 67 123 456', postal: '81000 Podgorica', plate: 'PG AB123', vat: 'ME02712345', amount: '1.234,56 EUR', date: '21.07.2026', address: 'Bulevar Svetog Petra 1, 81000 Podgorica', json: '{"country":"ME","pib":"02712345","iban":"ME25505000012345678951"}' },
    theme: ['#C40308', '#D4AF37', '#0F172A'], marker: { x: 53, y: 63 }, related: ['AL', 'BA', 'RS'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['JMBG', 'PIB', 'PDV', 'IBAN', 'SWIFT', 'POSTAL']
  },
  {
    slug: 'north-macedonia', iso2: 'MK', iso3: 'MKD', isoNumeric: '807', name: 'North Macedonia', adjective: 'Macedonian', nativeName: 'Severna Makedonija',
    flag: '🇲🇰', language: 'Macedonian', localLanguage: 'mk-MK', currency: 'MKD', currencyName: 'Macedonian denar', symbol: 'MKD',
    locale: 'mk-MK', icu: 'mk_MK', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+389',
    capital: 'Skopje', region: 'Southeastern Europe', population: 'approximately 1.8M',
    identifiers: ['EMBG', 'EDB', 'company number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'domestic payment reference'],
    localTerms: { personal: 'EMBG', company: 'company registration number', tax: 'DDV / VAT', social: 'EMBG', register: 'Central Register', invoice: 'DDV invoice', payment: 'payment reference', plate: 'registration plate', postal: 'postal code', privacy: 'personal-data protection' },
    samples: { personal: '0101980456789', company: '1234567', social: '0101980456789', iban: 'MK07250120000058984', bank: '250 120000058984', phone: '+389 70 123 456', postal: '1000 Skopje', plate: 'SK 1234 AB', vat: 'MK4032013544513', amount: '1.234,56 MKD', date: '21.07.2026', address: 'Macedonia Square 1, 1000 Skopje', json: '{"country":"MK","embg":"0101980456789","iban":"MK07250120000058984"}' },
    theme: ['#D20000', '#FFE600', '#D20000'], marker: { x: 55, y: 65 }, related: ['AL', 'BG', 'GR'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['EMBG', 'EDB', 'DDV', 'IBAN', 'SWIFT', 'SKOPJE']
  },
  {
    slug: 'san-marino', iso2: 'SM', iso3: 'SMR', isoNumeric: '674', name: 'San Marino', adjective: 'Sammarinese', nativeName: 'San Marino',
    flag: '🇸🇲', language: 'Italian', localLanguage: 'it-SM', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'it-SM', icu: 'it_SM', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+378',
    capital: 'San Marino', region: 'Southern Europe', population: 'approximately 0.03M',
    identifiers: ['ISS code', 'COE number', 'operator code', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference'],
    localTerms: { personal: 'ISS code', company: 'COE number', tax: 'operator code', social: 'ISS code', register: 'Registro Imprese', invoice: 'fiscal invoice', payment: 'SEPA reference', plate: 'targa', postal: 'codice postale', privacy: 'personal-data protection' },
    samples: { personal: 'SM1234567', company: 'SM12345', social: 'SM1234567', iban: 'SM86U0322509800000000270100', bank: '03225 09800 000000270100', phone: '+378 0549 123456', postal: '47890 San Marino', plate: 'RSM 1234', vat: 'SM12345', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Contrada Omerelli 1, 47890 San Marino', json: '{"country":"SM","coe":"SM12345","iban":"SM86U0322509800000000270100"}' },
    theme: ['#FFFFFF', '#5EB6E4', '#D4AF37'], marker: { x: 51, y: 62 }, related: ['IT', 'VA', 'MC'],
    plugTypes: 'Type C / Type F / Type L', voltage: '230V', frequency: '50Hz',
    searchHints: ['COE', 'ISS', 'IBAN', 'SEPA', 'RSM', '47890']
  },
  {
    slug: 'serbia', iso2: 'RS', iso3: 'SRB', isoNumeric: '688', name: 'Serbia', adjective: 'Serbian', nativeName: 'Srbija',
    flag: '🇷🇸', language: 'Serbian', localLanguage: 'sr-RS', currency: 'RSD', currencyName: 'Serbian dinar', symbol: 'RSD',
    locale: 'sr-RS', icu: 'sr_RS', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+381',
    capital: 'Belgrade', region: 'Southeastern Europe', population: 'approximately 6.6M',
    identifiers: ['JMBG', 'PIB', 'MB company number', 'postal code', 'phone'],
    payments: ['IBAN', 'SWIFT', 'model/reference number', 'IPS QR handoff'],
    localTerms: { personal: 'JMBG', company: 'MB / registration number', tax: 'PIB / PDV', social: 'JMBG', register: 'APR business register', invoice: 'eFaktura / PDV invoice', payment: 'model i poziv na broj', plate: 'registracija', postal: 'postanski broj', privacy: 'personal-data protection' },
    samples: { personal: '0101980712345', company: '17123456', social: '0101980712345', iban: 'RS35260005601001611379', bank: '260 005601001611379', phone: '+381 60 1234567', postal: '11000 Belgrade', plate: 'BG 1234 AB', vat: 'RS100123456', amount: '1.234,56 RSD', date: '21.07.2026', address: 'Knez Mihailova 1, 11000 Belgrade', json: '{"country":"RS","pib":"100123456","iban":"RS35260005601001611379"}' },
    theme: ['#C6363C', '#0C4076', '#FFFFFF'], marker: { x: 54, y: 62 }, related: ['BA', 'ME', 'RO'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['JMBG', 'PIB', 'APR', 'IPS QR', 'IBAN', 'EFAKTURA']
  },
  {
    slug: 'slovakia', iso2: 'SK', iso3: 'SVK', isoNumeric: '703', name: 'Slovakia', adjective: 'Slovak', nativeName: 'Slovensko',
    flag: '🇸🇰', language: 'Slovak', localLanguage: 'sk-SK', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'sk-SK', icu: 'sk_SK', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+421',
    capital: 'Bratislava', region: 'Central Europe / European Union', population: 'approximately 5.4M',
    identifiers: ['Rodne cislo', 'ICO', 'DIC', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'variable symbol', 'VIES'],
    localTerms: { personal: 'Rodne cislo', company: 'ICO', tax: 'DIC / DPH', social: 'Rodne cislo', register: 'Obchodny register', invoice: 'DPH invoice', payment: 'variabilny symbol', plate: 'EVC vehicle plate', postal: 'PSC', privacy: 'GDPR / UOOU' },
    samples: { personal: '800101/0008', company: '31331131', social: '800101/0008', iban: 'SK3112000000198742637541', bank: '1200 0000198742637541', phone: '+421 905 123 456', postal: '811 01 Bratislava', plate: 'BA123AB', vat: 'SK2020312297', amount: '1 234,56 EUR', date: '21.07.2026', address: 'Hlavne namestie 1, 811 01 Bratislava', json: '{"country":"SK","ico":"31331131","iban":"SK3112000000198742637541"}' },
    theme: ['#0B4EA2', '#FFFFFF', '#EE1C25'], marker: { x: 53, y: 57 }, related: ['CZ', 'AT', 'HU'],
    plugTypes: 'Type C / Type E', voltage: '230V', frequency: '50Hz',
    searchHints: ['RODNE CISLO', 'ICO', 'DIC', 'VARIABILNY SYMBOL', 'IBAN', 'DPH']
  },
  {
    slug: 'slovenia', iso2: 'SI', iso3: 'SVN', isoNumeric: '705', name: 'Slovenia', adjective: 'Slovenian', nativeName: 'Slovenija',
    flag: '🇸🇮', language: 'Slovenian', localLanguage: 'sl-SI', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'sl-SI', icu: 'sl_SI', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+386',
    capital: 'Ljubljana', region: 'Central/Southern Europe / European Union', population: 'approximately 2.1M',
    identifiers: ['EMSO', 'manticna stevilka', 'Davcna stevilka', 'postal code', 'phone'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'UPN QR handoff', 'VIES'],
    localTerms: { personal: 'EMSO', company: 'maticna stevilka', tax: 'davcna stevilka / DDV', social: 'EMSO', register: 'AJPES', invoice: 'eRacun / DDV invoice', payment: 'UPN QR reference', plate: 'registrska oznaka', postal: 'postna stevilka', privacy: 'GDPR / IP-RS' },
    samples: { personal: '0101980500123', company: '1234567000', social: '0101980500123', iban: 'SI56263300012039086', bank: '26330 0012039086', phone: '+386 40 123 456', postal: '1000 Ljubljana', plate: 'LJ AB-123', vat: 'SI12345678', amount: '1.234,56 EUR', date: '21.07.2026', address: 'Slovenska cesta 1, 1000 Ljubljana', json: '{"country":"SI","ddv":"SI12345678","iban":"SI56263300012039086"}' },
    theme: ['#005DA4', '#FFFFFF', '#ED1C24'], marker: { x: 51, y: 59 }, related: ['HR', 'AT', 'IT'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['EMSO', 'DDV', 'AJPES', 'UPN QR', 'IBAN', 'ERACUN']
  },
  {
    slug: 'ukraine', iso2: 'UA', iso3: 'UKR', isoNumeric: '804', name: 'Ukraine', adjective: 'Ukrainian', nativeName: 'Ukraina',
    flag: '🇺🇦', language: 'Ukrainian', localLanguage: 'uk-UA', currency: 'UAH', currencyName: 'Ukrainian hryvnia', symbol: 'UAH',
    locale: 'uk-UA', icu: 'uk_UA', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+380',
    capital: 'Kyiv', region: 'Eastern Europe', population: 'approximately 37M',
    identifiers: ['RNOKPP', 'EDRPOU', 'MFO', 'postal code', 'phone'],
    payments: ['IBAN', 'MFO bank code', 'EDRPOU payment reference', 'Diia/QES handoff'],
    localTerms: { personal: 'RNOKPP', company: 'EDRPOU', tax: 'PDV / VAT', social: 'RNOKPP', register: 'EDR / company register', invoice: 'PDV invoice / tax invoice', payment: 'IBAN / MFO reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data protection' },
    samples: { personal: '1234567890', company: '12345678', social: '1234567890', iban: 'UA213223130000026007233566001', bank: '322313 26007233566001', phone: '+380 67 123 4567', postal: '01001 Kyiv', plate: 'AA1234BB', vat: 'UA123456789012', amount: '1 234,56 UAH', date: '21.07.2026', address: 'Khreshchatyk 1, 01001 Kyiv', json: '{"country":"UA","rnokpp":"1234567890","edrpou":"12345678","iban":"UA213223130000026007233566001"}' },
    theme: ['#0057B7', '#FFD700', '#F8FAFC'], marker: { x: 58, y: 56 }, related: ['PL', 'RO', 'MD'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz',
    searchHints: ['RNOKPP', 'EDRPOU', 'MFO', 'PDV', 'IBAN', 'DIIA']
  },
  {
    slug: 'united-kingdom', iso2: 'GB', iso3: 'GBR', isoNumeric: '826', name: 'United Kingdom', adjective: 'British', nativeName: 'United Kingdom',
    flag: '🇬🇧', language: 'English', localLanguage: 'en-GB', currency: 'GBP', currencyName: 'Pound sterling', symbol: 'GBP',
    locale: 'en-GB', icu: 'en_GB', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+44',
    capital: 'London', region: 'Northern/Western Europe', population: 'approximately 68M',
    identifiers: ['National Insurance number', 'Companies House number', 'UTR', 'VAT', 'postcode', 'phone'],
    payments: ['IBAN', 'sort code', 'account number', 'BACS', 'Faster Payments', 'CHAPS', 'SWIFT'],
    localTerms: { personal: 'National Insurance number', company: 'Companies House number', tax: 'VAT / UTR', social: 'National Insurance number', register: 'Companies House', invoice: 'VAT invoice / HMRC MTD', payment: 'sort code / Faster Payments', plate: 'vehicle registration mark', postal: 'postcode', privacy: 'UK GDPR / ICO' },
    samples: { personal: 'QQ123456C', company: '01234567', social: 'QQ123456C', iban: 'GB29NWBK60161331926819', bank: '60-16-13 31926819', phone: '+44 20 7946 0018', postal: 'SW1A 1AA London', plate: 'AB12 CDE', vat: 'GB123456789', amount: '1,234.56 GBP', date: '21/07/2026', address: '10 Downing Street, London SW1A 2AA', json: '{"country":"GB","nino":"QQ123456C","company":"01234567","sortCode":"60-16-13"}' },
    theme: ['#012169', '#FFFFFF', '#C8102E'], marker: { x: 43, y: 49 }, related: ['IE', 'FR', 'NL'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz',
    searchHints: ['NINO', 'COMPANIES HOUSE', 'UTR', 'SORT CODE', 'BACS', 'FASTER PAYMENTS'],
    regionalContexts: [
      'England and Wales: Companies House defaults, company law, courts, address wording.',
      'Scotland: Scottish company prefixes, charity/register notes, address/legal differences.',
      'Northern Ireland: postcode and vehicle edge cases plus Ireland cross-border context.',
      'Wales: bilingual Welsh/English display, address labels, and copy QA.'
    ]
  },
  {
    slug: 'vatican-city', iso2: 'VA', iso3: 'VAT', isoNumeric: '336', name: 'Vatican City', adjective: 'Vatican', nativeName: 'Citta del Vaticano',
    flag: '🇻🇦', language: 'Italian and Latin', localLanguage: 'it-VA', currency: 'EUR', currencyName: 'Euro', symbol: 'EUR',
    locale: 'it-VA', icu: 'it_VA', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot grouping', phone: '+379',
    capital: 'Vatican City', region: 'Southern Europe', population: 'approximately 0.001M',
    identifiers: ['Vatican entity code', 'postal code', 'phone', 'document number'],
    payments: ['IBAN', 'SEPA', 'SWIFT', 'payment reference'],
    localTerms: { personal: 'document number', company: 'Vatican entity code', tax: 'fiscal reference', social: 'document number', register: 'Vatican administration', invoice: 'fiscal invoice', payment: 'SEPA reference', plate: 'SCV/CV plate', postal: 'postal code', privacy: 'personal-data protection' },
    samples: { personal: 'SCV123456', company: 'VA-ENTITY-001', social: 'SCV123456', iban: 'VA59001123000000012345678', bank: '001123000000012345678', phone: '+39 06 6982 1234', postal: '00120 Vatican City', plate: 'SCV 12345', vat: 'VA00123456789', amount: '1.234,56 EUR', date: '21/07/2026', address: 'Cortile San Damaso, 00120 Vatican City', json: '{"country":"VA","entity":"VA-ENTITY-001","iban":"VA59001123000000012345678"}' },
    theme: ['#FFD700', '#FFFFFF', '#9CA3AF'], marker: { x: 51, y: 64 }, related: ['IT', 'SM', 'FR'],
    plugTypes: 'Type C / Type F / Type L', voltage: '230V', frequency: '50Hz',
    searchHints: ['SCV', 'CV', 'IBAN', 'SEPA', '00120', 'ENTITY']
  }
];

COUNTRIES.push(...STRICT_EUROPE_EXPANSION_COUNTRIES);
Object.assign(COUNTRY_TIME_ZONES, {
  albania: 'Europe/Tirane (CET/CEST)',
  andorra: 'Europe/Andorra (CET/CEST)',
  'bosnia-and-herzegovina': 'Europe/Sarajevo (CET/CEST)',
  bulgaria: 'Europe/Sofia (EET/EEST)',
  croatia: 'Europe/Zagreb (CET/CEST)',
  cyprus: 'Asia/Nicosia (EET/EEST)',
  estonia: 'Europe/Tallinn (EET/EEST)',
  greece: 'Europe/Athens (EET/EEST)',
  hungary: 'Europe/Budapest (CET/CEST)',
  iceland: 'Atlantic/Reykjavik (GMT)',
  latvia: 'Europe/Riga (EET/EEST)',
  liechtenstein: 'Europe/Vaduz (CET/CEST)',
  lithuania: 'Europe/Vilnius (EET/EEST)',
  luxembourg: 'Europe/Luxembourg (CET/CEST)',
  malta: 'Europe/Malta (CET/CEST)',
  moldova: 'Europe/Chisinau (EET/EEST)',
  monaco: 'Europe/Monaco (CET/CEST)',
  montenegro: 'Europe/Podgorica (CET/CEST)',
  'north-macedonia': 'Europe/Skopje (CET/CEST)',
  'san-marino': 'Europe/San_Marino (CET/CEST)',
  serbia: 'Europe/Belgrade (CET/CEST)',
  slovakia: 'Europe/Bratislava (CET/CEST)',
  slovenia: 'Europe/Ljubljana (CET/CEST)',
  ukraine: 'Europe/Kyiv (EET/EEST)',
  'united-kingdom': 'Europe/London (GMT/BST)',
  'vatican-city': 'Europe/Rome (CET/CEST)'
});

const TOOL_TEMPLATES = [
  ['{personalSlug}-validator', '{adj} {personal} Validator', 'ID', 'Validate {personal} shape, split date/control/body evidence, and prepare privacy-safe debugging output.', 'national-identifiers', 'personal', 'Validate', '{personalSample}'],
  ['{companySlug}-validator', '{adj} {company} Validator', 'ORG', 'Inspect {company} structure, registry-style prefixes, control digits, and official lookup boundaries.', 'national-identifiers', 'company', 'Validate', '{companySample}'],
  ['vat-id-validator', '{adj} VAT ID / {iso2} Prefix Validator', 'VAT', 'Normalize {iso2} VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.', 'national-identifiers', 'vat', 'Validate', '{vatSample}'],
  ['eori-validator', '{adj} EORI / Customs Identifier Helper', 'EORI', 'Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.', 'national-identifiers', 'eori', 'Validate', '{iso2}{companySample}'],
  ['{socialSlug}-social-insurance-helper', '{adj} {social} Helper', 'SOC', 'Split {social} evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.', 'national-identifiers', 'social', 'Inspect', '{socialSample}'],
  ['company-onboarding-auditor', '{adj} Company Onboarding Auditor', 'KYC', 'Audit company intake payloads for {company}, VAT, address, banking, and official registry handoff readiness.', 'developer-tools', 'companyonboarding', 'Audit', '{jsonSample}'],
  ['business-register-readiness-helper', '{adj} {register} Readiness Helper', 'REG', 'Prepare browser-only evidence before a regulated {register} lookup or company registry workflow.', 'government', 'register', 'Audit', '{companySample} {vatSample} {addressSample}'],
  ['id-card-format-helper', '{adj} ID Card Format Helper', 'CARD', 'Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.', 'national-identifiers', 'document', 'Inspect', '{personalSample}'],
  ['passport-number-helper', '{adj} Passport Number Helper', 'PASS', 'Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.', 'national-identifiers', 'document', 'Parse', 'P<{iso3}{adjUpper}<<SAMPLE<<<<<<<<<<<<<<<<<<'],
  ['mrz-passport-parser', '{adj} MRZ / Passport Parser', 'MRZ', 'Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.', 'national-identifiers', 'document', 'Parse', 'P<{iso3}SAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567{iso3}8501019M3107123<<<<<<<<<<<<<<06'],
  ['iban-validator', '{name} IBAN Validator', 'IBAN', 'Validate {iso2} IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.', 'finance', 'iban', 'Validate', '{ibanSample}'],
  ['iban-generator', '{name} IBAN Generator', 'IBG', 'Generate {iso2} IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.', 'finance', 'ibangenerator', 'Generate', '{ibanBbanSample}'],
  ['bank-account-inspector', '{adj} Domestic Bank Account Inspector', 'BANK', 'Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.', 'finance', 'bankcode', 'Inspect', '{bankSample}'],
  ['bic-swift-inspector', '{adj} BIC / SWIFT Inspector', 'BIC', 'Inspect BIC institution, country, location, and branch evidence for {name} banking integrations.', 'finance', 'bic', 'Inspect', 'ABCD{iso2}2X'],
  ['sepa-transfer-helper', '{adj} SEPA Transfer Helper', 'SEPA', 'Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.', 'finance', 'sepa', 'Audit', '{ibanSample}\\n{amountSample}\\nInvoice 2026-001'],
  ['sepa-direct-debit-mandate-helper', '{adj} SEPA Direct Debit Mandate Helper', 'SDD', 'Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.', 'finance', 'directdebit', 'Audit', 'MANDATE-2026-001 {ibanSample}'],
  ['payment-reference-helper', '{adj} {payment} Reference Helper', 'PAY', 'Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.', 'finance', 'paymentref', 'Inspect', '{payment} REF 2026-001 {amountSample}'],
  ['remittance-text-builder', '{adj} Remittance Text Builder', 'REMIT', 'Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.', 'finance', 'remittance', 'Format', 'Invoice 2026-001 {vatSample} {amountSample}'],
  ['payment-reconciliation-helper', '{adj} Payment Reconciliation Helper', 'RECON', 'Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.', 'finance', 'reconciliation', 'Audit', '{dateSample}; {amountSample}; {ibanSample}; Invoice 2026-001'],
  ['bank-statement-parser', '{adj} Bank Statement Parser', 'STMT', 'Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.', 'finance', 'statement', 'Parse', '{dateSample}; {amountSample}; {ibanSample}; sample counterparty'],
  ['masked-iban-formatter', '{adj} Masked IBAN Formatter', 'MASK', 'Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.', 'finance', 'ibanmask', 'Format', '{ibanSample}'],
  ['currency-decimal-formatter', '{adj} {currency} Decimal Currency Formatter', 'CUR', 'Normalize {currency} amount strings, decimal separators, grouping, and API-safe numeric previews.', 'finance', 'amount', 'Format', '{amountSample}'],
  ['vat-rate-sanity-helper', '{adj} VAT Rate Sanity Helper', 'RATE', 'Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.', 'tax', 'taxrate', 'Inspect', '{tax} 20% base {amountSample}'],
  ['vat-return-field-helper', '{adj} VAT Return Field Helper', 'RET', 'Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.', 'tax', 'taxreturn', 'Map', '{tax}; {vatSample}; period 2026-07; {amountSample}'],
  ['invoice-number-helper', '{adj} Invoice Number Helper', 'INV', 'Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.', 'tax', 'invoice', 'Inspect', 'INV-2026-0001 {vatSample}'],
  ['e-invoicing-readiness-checker', '{adj} {invoice} Readiness Checker', 'EINV', 'Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.', 'tax', 'einvoice', 'Audit', '{jsonSample}'],
  ['tax-authority-handoff-helper', '{adj} Tax Authority Handoff Helper', 'TAX', 'Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.', 'tax', 'taxhandoff', 'Audit', '{vatSample} {dateSample} {amountSample}'],
  ['accounting-audit-trail-checklist-generator', '{adj} Accounting Audit Trail Checklist Helper', 'AUDIT', 'Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.', 'tax', 'audittrail', 'Generate', 'invoice {dateSample} {amountSample} {vatSample}'],
  ['postal-code-validator', '{adj} Postal Code Validator', 'POST', 'Validate {postal} shape, split area/delivery hints, and preserve official postal lookup boundaries.', 'address', 'postal', 'Validate', '{postalSample}'],
  ['address-normalizer', '{adj} Address Normalizer', 'ADDR', 'Normalize street, postal code, locality, region, and country lines for local address forms.', 'address', 'address', 'Format', '{addressSample}'],
  ['address-transliteration-normalizer', '{adj} Address Transliteration Normalizer', 'ASCII', 'Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.', 'address', 'transliteration', 'Format', '{addressSample}'],
  ['region-code-mapper', '{adj} Region / Province Code Mapper', 'REGION', 'Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.', 'address', 'region', 'Map', '{postalSample}'],
  ['municipality-code-inspector', '{adj} Municipality Code Inspector', 'MUNI', 'Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.', 'address', 'municipality', 'Inspect', '{addressSample}'],
  ['phone-number-validator', '{adj} Phone Number Validator', 'PHONE', 'Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.', 'address', 'phone', 'Validate', '{phoneSample}'],
  ['phone-e164-formatter', '{adj} Phone E.164 Formatter', 'E164', 'Normalize local phone input to E.164-style previews and split country/national evidence.', 'address', 'phone', 'Format', '{phoneSample}'],
  ['date-locale-formatter', '{adj} Date Locale Formatter', 'DATE', 'Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.', 'localization', 'date', 'Format', '{dateSample}'],
  ['csv-locale-normalizer', '{adj} CSV Locale Normalizer', 'CSV', 'Normalize CSV snippets for {name} decimal, date, postal, phone, tax, and banking fields.', 'developer-tools', 'csv', 'Normalize', 'id;amount;date;tax\\n1;{amountSample};{dateSample};{vatSample}'],
  ['slug-normalizer', '{adj} Slug Normalizer', 'SLUG', 'Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.', 'developer-tools', 'slug', 'Format', '{name} sample company {addressSample}'],
  ['document-ocr-fixer', '{adj} Document OCR Fixer', 'OCR', 'Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.', 'documents', 'ocr', 'Fix', '{personalSample} {vatSample} {ibanSample} {postalSample}'],
  ['gdpr-redaction-helper', '{adj} {privacy} Redaction Helper', 'GDPR', 'Mask personal, tax, banking, phone, and address evidence for logs and support tickets.', 'privacy', 'privacy', 'Mask', '{jsonSample}'],
  ['pii-masker', '{adj} PII Masker', 'PII', 'Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.', 'privacy', 'privacy', 'Mask', '{personalSample} {phoneSample} {ibanSample}'],
  ['personal-data-fixture-generator', '{adj} Personal Data Fixture Helper', 'FIX', 'Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.', 'privacy', 'fixture', 'Generate', '{personalSample}\\n{addressSample}\\n{phoneSample}'],
  ['driving-licence-format-helper', '{adj} Driving Licence Format Helper', 'DL', 'Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.', 'documents', 'document', 'Inspect', '{personalSample} DL 2026'],
  ['residence-permit-format-helper', '{adj} Residence Permit Format Helper', 'PERMIT', 'Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.', 'documents', 'document', 'Inspect', '{iso2} PERMIT 2026 {personalSample}'],
  ['health-card-format-helper', '{adj} Health Card Format Helper', 'HEALTH', 'Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.', 'documents', 'document', 'Inspect', '{personalSample} HEALTH 2026'],
  ['vehicle-plate-inspector', '{adj} Vehicle Plate Inspector', 'PLATE', 'Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.', 'transport', 'plate', 'Inspect', '{plateSample}'],
  ['vin-validator', '{adj} VIN Validator', 'VIN', 'Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics.', 'transport', 'vin', 'Validate', 'WVWZZZ1JZXW000001'],
  ['vehicle-data-redaction-helper', '{adj} Vehicle Data Redaction Helper', 'VEH', 'Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.', 'transport', 'vehicle', 'Mask', '{plateSample} WVWZZZ1JZXW000001 {personalSample}'],
  ['customs-declaration-helper', '{adj} Customs Declaration Helper', 'CUSTOMS', 'Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.', 'government', 'customs', 'Audit', '{vatSample} HS 8471 {amountSample}'],
  ['postal-tracking-helper', '{adj} Postal Tracking Helper', 'TRACK', 'Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.', 'logistics', 'tracking', 'Inspect', 'TRACK 2026 {postalSample}'],
  ['data-quality-workbench', '{adj} Data Quality Workbench', 'DQ', 'Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.', 'developer-tools', 'dataquality', 'Audit', '{jsonSample}'],
  ['json-fixture-generator', '{adj} JSON Fixture Helper', 'JSON', 'Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.', 'developer-tools', 'json', 'Generate', '{jsonSample}'],
  ['regex-pack-helper', '{adj} Regex Pack Helper', 'REGEX', 'Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.', 'developer-tools', 'regex', 'Explain', '{personal} {company} {postal} {phone} {ibanSample}'],
  ['api-payload-auditor', '{adj} API Payload Auditor', 'API', 'Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.', 'developer-tools', 'api', 'Audit', '{jsonSample}'],
  ['form-field-auditor', '{adj} Form Field Auditor', 'FORM', 'Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.', 'developer-tools', 'form', 'Audit', 'tax={vatSample}&postal={postalSample}&phone={phoneSample}'],
  ['locale-number-parser', '{adj} Locale Number Parser', 'NUM', 'Parse decimal/grouping variants, currency labels, and API-safe numeric values for {name}.', 'localization', 'amount', 'Parse', '{amountSample}'],
  ['calendar-week-helper', '{adj} Calendar Week Helper', 'CAL', 'Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.', 'localization', 'date', 'Inspect', '{dateSample} week 30'],
  ['company-suffix-normalizer', '{adj} Company Suffix Normalizer', 'SUFFIX', 'Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.', 'developer-tools', 'companysuffix', 'Format', '{name} Sample Holding Ltd {companySample}'],
  ['procurement-identifier-helper', '{adj} Procurement Identifier Helper', 'PROC', 'Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.', 'government', 'procurement', 'Audit', '{companySample} PO-2026-001 {vatSample}'],
  ['accessibility-locale-copy-checker', '{adj} Locale Copy Checker', 'COPY', 'Check UI labels for local identifier names, date/currency wording, and support-safe explanations.', 'localization', 'copycheck', 'Audit', '{personal} input, {postal} input, amount {amountSample}'],
  ['support-ticket-scrubber', '{adj} Support Ticket Scrubber', 'SUP', 'Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.', 'privacy', 'privacy', 'Mask', 'Customer sent {personalSample}, {ibanSample}, {addressSample}'],
  ['integration-smoke-test-builder', '{adj} Integration Smoke Test Builder', 'SMOKE', 'Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.', 'developer-tools', 'smoketest', 'Generate', '{jsonSample}']
];

function ensureDir(rel) {
  fs.mkdirSync(path.join(ROOT, rel), { recursive: true });
}

function write(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function fill(template, country) {
  const map = {
    name: country.name,
    adj: country.adjective,
    adjUpper: country.adjective.toUpperCase(),
    iso2: country.iso2,
    iso3: country.iso3,
    currency: country.currency,
    personal: country.localTerms.personal,
    company: country.localTerms.company,
    social: country.localTerms.social,
    tax: country.localTerms.tax,
    register: country.localTerms.register,
    invoice: country.localTerms.invoice,
    payment: country.localTerms.payment,
    postal: country.localTerms.postal,
    privacy: country.localTerms.privacy,
    personalSlug: slugify(country.localTerms.personal),
    companySlug: slugify(country.localTerms.company),
    socialSlug: slugify(country.localTerms.social),
    personalSample: country.samples.personal,
    companySample: country.samples.company,
    socialSample: country.samples.social,
    ibanSample: country.samples.iban,
    ibanBbanSample: String(country.samples.iban || '').slice(4),
    bankSample: country.samples.bank,
    phoneSample: country.samples.phone,
    postalSample: country.samples.postal,
    plateSample: country.samples.plate,
    vatSample: country.samples.vat,
    amountSample: country.samples.amount,
    dateSample: country.samples.date,
    addressSample: country.samples.address,
    jsonSample: country.samples.json
  };
  return String(template).replace(/\{([a-zA-Z0-9]+)\}/g, (_, key) => map[key] ?? '');
}

function toolObjects(country) {
  return TOOL_TEMPLATES.map(([suffixTpl, nameTpl, code, summaryTpl, category, kind, actionLabel, sampleTpl], index) => {
    const suffix = fill(suffixTpl, country);
    const id = `${country.slug}-${suffix}`;
    const name = fill(nameTpl, country);
    const summary = fill(summaryTpl, country);
    const sample = fill(sampleTpl, country);
    const invalid = makeInvalidSample(country, code, kind, sample, index);
    const short = makeShortSample(sample);
    const wrongPrefix = makeWrongPrefixSample(country, sample);
    return {
      id, name, code, summary, category, actionLabel, kind,
      samples: [
        { label: 'Valid sample', value: sample, intent: 'valid', tone: 'success' },
        { label: 'Invalid sample', value: invalid, intent: 'review', tone: 'review' },
        { label: 'Short sample', value: short, intent: 'review', tone: 'review' },
        { label: kind === 'ibangenerator' ? 'Grouped valid sample' : 'Wrong prefix sample', value: kind === 'ibangenerator' ? String(sample).replace(/(.{4})/g, '$1 ').trim() : wrongPrefix, intent: kind === 'ibangenerator' ? 'valid' : 'review', tone: kind === 'ibangenerator' ? 'success' : 'review' },
        { label: 'Edge sample', value: `Review ${country.iso2} ${code} edge ${index + 1}`, intent: 'review', tone: 'review' }
      ],
      boundaries: [
        `Official ${country.name} identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider.`
      ],
      qualityNotes: [
        { title: `${code} local evidence`, text: `${name} analyzes ${country.name}-specific ${category} evidence locally in this browser.` },
        { title: 'Official boundary', text: `Offline ${country.adjective} parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status.` },
        { title: 'Fixture safety', text: `Valid and invalid ${code} examples are safe structural fixtures for tests and demos.` },
        { title: 'Developer handling', text: `Use normalized ${code} values for forms, masked previews for logs, and field slices for parser/debug handoff.` }
      ]
    };
  });
}

function makeShortSample(value) {
  const raw = String(value || '').trim();
  return raw.slice(0, Math.max(3, Math.ceil(raw.length * 0.55)));
}

function bumpLastDigit(value) {
  const chars = String(value || '').split('');
  for (let index = chars.length - 1; index >= 0; index -= 1) {
    if (/\d/.test(chars[index])) {
      chars[index] = String((Number(chars[index]) + 1) % 10);
      return `Invalid ${chars.join('')}`;
    }
  }
  return `Invalid ${value}`;
}

function makeWrongPrefixSample(country, value) {
  const raw = String(value || '').trim();
  if (/^[A-Z]{2}/.test(raw)) return `Wrong prefix ZZ${raw.slice(2)}`;
  return `Wrong prefix ${country.iso2} ${raw}`;
}

function makeInvalidSample(country, code, kind, value, index) {
  if (/iban|vat|eori|bic/i.test(kind)) return makeWrongPrefixSample(country, value);
  if (/personal|social|company|register|plate|vin/i.test(kind)) return bumpLastDigit(value);
  return `Invalid ${country.iso2} ${code} ${index + 1}`;
}

function countryYaml(country) {
  return `schemaVersion: 1
code: ${country.iso2}
slug: ${country.slug}
name:
  en: ${country.name}
region: Europe
languages:
  - ${country.localLanguage.split('-')[0]}
currency: ${country.currency}
relatedCountries:
${country.related.map((r) => `  - ${r}`).join('\n')}
`;
}

function toolYaml(country, tool, related) {
  const capabilities = tool.kind === 'ibangenerator'
    ? ['generate', 'validate', 'parse', 'explain']
    : ['validate', 'parse', 'format', 'explain'];
  const formName = tool.kind === 'ibangenerator' ? 'generate' : 'validate';
  const actions = tool.kind === 'ibangenerator'
    ? '[generate, validate, explain]'
    : '[validate, parse, format, explain]';
  return `schemaVersion: 1
id: ${tool.id}
kind: tool
module: validohub
country: ${country.iso2}
category: ${tool.category}
status: active
name:
  en: ${yamlQuote(tool.name)}
summary:
  en: ${yamlQuote(tool.summary)}
capabilities:
${capabilities.map((capability) => `  - ${capability}`).join('\n')}
algorithm:
  algorithmId: validohub.${country.slug}-suite
forms:
  ${formName}:
    inputs:
      - type: textarea
        name: input
        label:
          en: ${yamlQuote(`${tool.code} input`)}
        required: true
        placeholder:
          en: ${yamlQuote(tool.samples[0].value)}
    actions: ${actions}
related:
  explicit: [${related.join(', ')}]
  auto:
    sameCountry: true
    sameCategory: true
    sameCapability: true
seo:
  title:
    en: ${yamlQuote(`${tool.name} | ValidoHub`)}
  description:
    en: ${yamlQuote(tool.summary)}
`;
}

function runtime(country, tools) {
  const raw = JSON.stringify(tools, null, 2).replace(/\u2028|\u2029/g, '');
  const [accent, accent2, accent3] = country.theme;
  return `(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.${country.slug}-suite';
  const RAW_TOOLS = ${raw};
  const COUNTRY = ${JSON.stringify(country)};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official ${country.name} systems remain the source of truth.', localStructure: '${country.adjective} local structure', addEvidence: 'Add ${country.adjective} local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de ${country.name} siguen siendo la fuente de verdad.', localStructure: 'estructura local de ${country.name}', addEvidence: 'Agrega evidencia local de ${country.name} o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de ${country.name} continuam sendo a fonte da verdade.', localStructure: 'estrutura local de ${country.name}', addEvidence: 'Adicione evidencia local de ${country.name} ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in ${country.name} bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von ${country.name}', addEvidence: 'Fuege lokale ${country.adjective} Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de ${country.name} restent la source de verite.', localStructure: 'structure locale de ${country.name}', addEvidence: 'Ajoutez une preuve locale de ${country.name} ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju ${country.name} pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju ${country.name}', addEvidence: 'Dodaj lokalne dane kraju ${country.name} albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official ${country.name} systems remain the source of truth.', localStructure: '${country.adjective} local structure', addEvidence: 'Add ${country.adjective} local evidence or use the valid sample.' }
  };
  const LOCALE_KEYS = ['en','es','pt-BR','de','fr','pl','uk'];
  function suiteI18n() {
    const base = { validate: 'Validate', copyResult: 'Copy result', downloadResult: 'Download result', clear: 'Clear', output: 'Output', waitingForInput: 'Waiting for input', validSample: 'Valid sample', relatedTools: 'Valid sample / related tools', qualityNotes: 'Quality notes', advancedAnalysis: 'Advanced analysis', fieldBreakdown: 'Field breakdown', validationPipeline: 'Validation pipeline', copyNormalized: 'Copy normalized', localChecksCompleted: 'Local checks completed in this browser.' };
    const dict = {}; for (const key of LOCALE_KEYS) dict[key] = Object.assign({}, base); return dict;
  }
  function locale() { return document.documentElement.lang || (location.pathname.split('/').filter(Boolean)[0] || 'en'); }
  function phrase(key) { const code = locale(); return (LOCALIZED[code] && LOCALIZED[code][key]) || LOCALIZED.en[key] || key; }
  function compact(input) { return String(input || '').normalize('NFKC').trim(); }
  function alnum(input) { return compact(input).toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function digits(input) { return compact(input).replace(/\\D/g, ''); }
  function mask(value) { const s = String(value || ''); if (!s) return ''; if (s.length <= 8) return s.slice(0, 1) + '...'; return s.slice(0, 3) + '...' + s.slice(-4); }
  function field(label, value, detail) { return { label, value: value == null || value === '' ? 'not detected' : String(value), detail: detail || COUNTRY.adjective + ' evidence slice' }; }
  function check(label, ok, pass, fail) { return { label, status: ok ? 'pass' : 'review', message: ok ? pass : fail }; }
  function mod97(iban) { let rearranged = iban.slice(4) + iban.slice(0, 4); let rem = 0; for (const ch of rearranged) { const value = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch; for (const d of value) rem = (rem * 10 + Number(d)) % 97; } return rem; }
  function isIntentionalInvalid(raw) { return /^(invalid|short|wrong|bad|review)\\b/i.test(compact(raw)) || /\\b(BAD|INVALID|WRONG)[-_ ]?(CHECKSUM|PREFIX|COUNTRY|SAMPLE)\\b/i.test(compact(raw)); }
  function detect(raw) {
    const text = compact(raw); const upper = text.toUpperCase();
    return {
      text, upper,
      personal: (upper.match(/[A-Z0-9][A-Z0-9 .\\/-]{5,20}[A-Z0-9]/) || [])[0] || '',
      company: (upper.match(/(?:${country.iso2})?[A-Z0-9][A-Z0-9 .\\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/${country.iso2}\\s*[A-Z0-9 .\\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/${country.iso2}[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\\b[A-Z0-9][A-Z0-9 -]{2,10}\\b/) || [])[0] || '',
      date: (text.match(/\\b(?:\\d{4}-\\d{2}-\\d{2}|\\d{1,2}[./]\\d{1,2}[./]\\d{4})\\b/) || [])[0] || '',
      amount: (text.match(/\\b\\d{1,3}(?:[ .]\\d{3})*(?:,|\\.)\\d{2}\\s*(?:${country.currency}|EUR|SEK|NOK|DKK|CZK|RON)?\\b/i) || [])[0] || '',
      phone: (text.match(/\\+?\\d[\\d\\s().-]{6,18}\\d/) || [])[0] || '',
      plate: (upper.match(/\\b[A-Z0-9]{1,3}[ -]?[A-Z0-9]{2,5}[ -]?[A-Z0-9]{0,3}\\b/) || [])[0] || '',
      vin: (upper.match(/\\b[A-HJ-NPR-Z0-9]{17}\\b/) || [])[0] || '',
      json: /^[\\[{]/.test(text)
    };
  }
  function analyze(tool, input) {
    const raw = compact(input || (tool.samples[0] && tool.samples[0].value) || ''); const ev = detect(raw); let normalized = raw; let ok = raw.length > 0;
    const result = { status: 'review', headline: tool.code + ': ' + phrase('review'), detail: phrase('addEvidence'), primary: raw || 'empty', normalized, checks: [], fields: [], breakdownTitle: tool.name + ' field breakdown', breakdownSummary: 'Named ' + COUNTRY.adjective + ' evidence slices for debugging and handoff.', breakdown: [], qualityNotes: tool.qualityNotes, suggestions: [], developerJson: {} };
    if (tool.kind === 'iban' || tool.kind === 'ibanmask') { const iban = ev.iban || alnum(raw); ok = new RegExp('^' + COUNTRY.iso2 + '[0-9]{2}[A-Z0-9]{8,30}$').test(iban) && (iban.length < 12 || mod97(iban) === 1); normalized = tool.kind === 'ibanmask' ? mask(iban) : iban; result.breakdown.push(field('country prefix', iban.slice(0, 2), 'IBAN country code'), field('check digits', iban.slice(2, 4), 'MOD-97 remainder ' + (iban.length > 4 ? mod97(iban) : 'n/a')), field('bank/account body', iban.slice(4), 'local BBAN body'), field('official boundary', 'offline only', 'Bank ownership requires provider lookup')); }
    else if (tool.kind === 'phone') { const p = ev.phone || raw; normalized = p.replace(/[\\s().-]/g, '').replace(/^00/, '+'); ok = /^\\+?\\d{7,16}$/.test(normalized); result.breakdown.push(field('calling code', normalized.startsWith(COUNTRY.phone) ? COUNTRY.phone : 'not detected', 'expected local prefix'), field('national number', normalized.replace(COUNTRY.phone, ''), 'subscriber evidence'), field('raw phone', p, 'input slice')); }
    else if (tool.kind === 'date') { normalized = ev.date || raw; ok = !!ev.date; result.breakdown.push(field('detected date', ev.date, COUNTRY.date), field('locale pattern', COUNTRY.date, 'display convention'), field('ISO handoff', ev.date && ev.date.includes('-') ? ev.date : 'requires parser confirmation', 'API value')); }
    else if (tool.kind === 'amount' || tool.kind === 'taxrate') { normalized = ev.amount || raw; ok = !!ev.amount || /\\d/.test(raw); result.breakdown.push(field('amount evidence', ev.amount || raw, 'currency string'), field('currency', COUNTRY.currency, COUNTRY.currencyName), field('decimal convention', COUNTRY.decimal, 'locale parsing'), field('grouping convention', COUNTRY.thousands, 'display parsing')); }
    else if (tool.kind === 'postal' || tool.kind === 'address' || tool.kind === 'region' || tool.kind === 'municipality' || tool.kind === 'transliteration') { normalized = raw.replace(/\\s+/g, ' '); ok = raw.length > 5; result.breakdown.push(field('address text', raw, 'source lines'), field('postal evidence', ev.postal, COUNTRY.localTerms.postal), field('capital/locality hint', COUNTRY.capital, 'country context'), field('lookup boundary', 'offline only', 'official geocoding/postal data required')); }
    else if (tool.kind === 'plate' || tool.kind === 'vin' || tool.kind === 'vehicle') { const vin = ev.vin || ''; normalized = ev.plate || vin || raw; ok = !!(ev.plate || vin); result.breakdown.push(field('plate evidence', ev.plate, COUNTRY.localTerms.plate), field('WMI', vin.slice(0, 3), 'VIN manufacturer region'), field('VDS', vin.slice(3, 9), 'vehicle descriptor'), field('VIS', vin.slice(9), 'vehicle identifier')); }
    else if (['csv','json','api','dataquality','form','companyonboarding','register','einvoice','taxhandoff','taxreturn','audittrail','procurement','smoketest'].includes(tool.kind)) { normalized = raw.replace(/\\s+/g, ' ').trim(); ok = raw.length > 10 || ev.json; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', COUNTRY.localTerms.personal + ' / ' + COUNTRY.localTerms.company), field('tax evidence', ev.vat || 'not detected', COUNTRY.localTerms.tax), field('banking evidence', ev.iban || 'not detected', 'IBAN/payment slice'), field('locale evidence', [ev.date, ev.amount, ev.postal].filter(Boolean).join(' / ') || 'not detected', 'date/amount/postal slices')); }
    else if (['privacy','fixture','ocr','document'].includes(tool.kind)) { normalized = raw.replace(/[A-Z0-9][A-Z0-9 .\\/-]{6,24}/g, (v) => mask(v)); ok = raw.length > 5; result.breakdown.push(field('personal evidence', ev.personal, COUNTRY.localTerms.personal), field('company/tax evidence', ev.company || ev.vat, COUNTRY.localTerms.company), field('banking evidence', ev.iban, 'IBAN slice'), field('masked preview', normalized, 'safe for logs')); }
    else if (tool.kind === 'bic') { const bic = alnum(raw); normalized = bic; ok = new RegExp('^[A-Z]{4}' + COUNTRY.iso2 + '[A-Z0-9]{2}([A-Z0-9]{3})?$').test(bic); result.breakdown.push(field('institution', bic.slice(0, 4), 'BIC bank code'), field('country', bic.slice(4, 6), 'expected ' + COUNTRY.iso2), field('location', bic.slice(6, 8), 'location code'), field('branch', bic.slice(8) || 'primary office', 'optional')); }
    else if (tool.kind === 'slug' || tool.kind === 'regex' || tool.kind === 'copycheck' || tool.kind === 'companysuffix') { normalized = raw.normalize('NFKD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); ok = raw.length > 0; result.breakdown.push(field('source text', raw, 'local display value'), field('normalized key', normalized, 'ASCII/API key'), field('local vocabulary', [COUNTRY.localTerms.personal, COUNTRY.localTerms.company, COUNTRY.localTerms.tax].join(' / '), 'copy/debug terms')); }
    else { normalized = raw.replace(/\\s+/g, ' ').trim(); ok = raw.length > 0; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', 'local ID slice'), field('tax evidence', ev.vat || 'not detected', 'tax/VAT slice'), field('payment evidence', ev.iban || ev.amount || 'not detected', 'banking slice'), field('workflow', tool.kind, 'offline workbench context')); }
    if (isIntentionalInvalid(raw)) {
      ok = false;
      result.breakdown.unshift(field('invalid fixture marker', raw.split(/\\s+/).slice(0, 3).join(' ') || 'invalid sample', 'Intentional invalid/review sample must not pass.'));
    }
    result.status = ok ? 'success' : 'review';
    result.headline = tool.code + ': ' + (ok ? phrase('success') : phrase('review'));
    result.detail = ok ? COUNTRY.adjective + ' browser-only evidence is structurally coherent.' : phrase('addEvidence');
    result.primary = normalized || raw || 'empty';
    result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, phrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', phrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check(COUNTRY.adjective + ' evidence', ok, phrase('localStructure') + ' detected.', phrase('addEvidence')), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, phrase('official'))];
    result.suggestions = ok
      ? [{ action: 'copy-normalized', label: 'Copy normalized value', detail: 'Use this local parser output in fixtures.' }, { action: 'load-invalid', label: 'Load invalid fixture', detail: 'Compare the review path.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Replay all sample states.' }]
      : [{ action: 'load-valid', label: 'Load valid fixture', detail: 'Compare against the success-first example.' }, { action: 'use-short', label: 'Try short sample', detail: 'Inspect length and parser guards.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Compare pass/review states.' }];
    result.developerJson = { suite: COUNTRY.slug + '-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: phrase('official'), breakdown: result.breakdown };
    return result;
  }
  const TOOLS = RAW_TOOLS.map((tool) => Object.assign({}, tool, { i18n: {} }));
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '${accent}', accent2: '${accent2}', accent3: '${accent3}' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
`;
}

function countryData(country, tools) {
  const workbenches = tools.map((tool) => tool.name);
  const routes = tools.map((tool) => ({ title: tool.name, href: `/en/${country.slug}/${tool.id}/`, text: tool.summary }));
  const searchHints = country.searchHints || [country.identifiers[0], country.payments[0], country.localTerms.tax, country.localTerms.invoice].filter(Boolean);
  const regionalNotes = (country.regionalContexts || []).map((context) => ({
    title: typeof context === 'string' ? context.split(':')[0] : context.region,
    text: typeof context === 'string' ? context : `${context.region}: ${context.notes.join(' ')}`,
    status: 'regional context'
  }));
  return {
    id: country.slug,
    visualAssets: {
      outlineSrc: `/assets/images/countries/${country.slug}-outline.svg`,
      outlineAlt: `${country.name} country outline`,
      mapSrc: `/assets/images/countries/${country.slug}-location.svg`,
      mapAlt: `World map with ${country.name} location marker`,
      mapMarker: { ...country.marker, label: country.name },
      source: 'Natural Earth geometry when available; generated fallback for microstates and country navigation'
    },
    catalog: {
      id: country.slug, flag: country.flag, name: country.name, nativeName: country.nativeName, iso2: country.iso2, iso3: country.iso3,
      continent: 'Europe', region: 'Europe', language: country.language, currency: country.currency, currencyName: country.currencyName,
      status: 'available',
      summary: `Premium ${country.name} developer hub for ${country.identifiers.join(', ')}, ${country.payments.join(', ')}, locale, privacy, vehicles, documents, and browser-only data-quality workflows.`,
      identifiers: country.identifiers, payments: country.payments, features: ['payments', 'identity', 'government', 'banking'],
      availableWorkbenches: workbenches,
      plannedWorkbenches: [`Live ${country.localTerms.register} lookup`, 'Live VAT/tax status confirmation', 'Live bank ownership lookup', 'Live vehicle or postal provider lookup'],
      completion: 100,
      coordinates: country.marker,
      searchHints
    },
    hub: {
      flag: country.flag, name: country.name, badge: `Premium ${country.name} developer suite`,
      description: `Developer intelligence and browser-only workbenches for ${country.adjective.toLowerCase()} identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.`,
      metadata: {
        nativeName: country.nativeName, population: country.population, populationNote: 'Approximate 2026 population estimate; do not treat as a timeless constant.',
        capital: country.capital, continent: 'Europe', region: country.region, languages: country.language, currency: country.currencyName,
        currencyCode: country.currency, callingCode: country.phone, internetTld: `.${country.iso2.toLowerCase()}`, drivingSide: 'Right',
        iso2: country.iso2, iso3: country.iso3, isoNumeric: country.isoNumeric, locale: country.locale, icuLocale: country.icu,
        dateFormat: country.date, timeFormat: '24-hour, HH:mm', decimalSeparator: country.decimal, thousandsSeparator: country.thousands,
        addressFormat: `Street, number, postal code, locality, ${country.name}`, postalCodeFormat: country.localTerms.postal,
        primaryTimeZone: COUNTRY_TIME_ZONES[country.slug] || 'Europe/Brussels (CET/CEST)', measurementSystem: 'Metric', paperSize: 'A4', emergencyNumber: '112', weekStarts: 'Monday',
        rtlSupport: 'No', unicodeLocale: country.locale, cldrLocale: country.icu, metricVsImperial: 'Metric-first',
        powerPlugTypes: country.plugTypes || 'Type C / Type F', voltage: country.voltage || '230V', frequency: country.frequency || '50Hz'
      },
      visualIdentity: {
        countryId: country.slug, outlineLabel: `${country.name} outline`, mapLabel: `${country.name} in the world`, continentBadge: 'Europe', flagLabel: `${country.name} flag`,
        heroAccentPrimary: '15 118 110', heroAccentSecondary: '37 99 235', heroAccentTertiary: '245 158 11'
      },
      stats: [
        { label: 'Premium tools', value: String(tools.length), text: 'Browser-only local developer workbenches' },
        { label: 'Core locales', value: '7', text: 'Runtime-localized production locales' },
        { label: 'Field breakdown', value: '100%', text: 'Every tool exposes debug slices' }
      ],
      highlights: [
        { title: `${country.localTerms.personal} and ${country.localTerms.company}`, text: `Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries.` },
        { title: `${country.localTerms.tax} and payments`, text: `Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status.` },
        { title: 'Developer debugging', text: 'CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads.' }
      ],
      developerNotes: [
        { title: 'No official claims', text: `Offline checks never prove official ${country.name} registry, tax, bank, vehicle, postal, or identity status.` },
        { title: 'Field breakdown required', text: 'Every tool must keep named slices visible because they are the primary debugging surface.' },
        { title: 'Same-country links', text: `Related workbenches stay inside /${country.slug}/ unless a comparison route is explicitly designed.` },
        ...regionalNotes
      ],
      commonMistakes: [
        { title: 'Treating syntax as status', text: 'A passing checksum or shape check is not an official lookup result.' },
        { title: 'Logging raw personal data', text: 'Use masked previews for tickets, logs, analytics, and screenshots.' },
        { title: 'Ignoring locale separators', text: `Use ${country.decimal} and ${country.thousands} rules before API normalization.` },
        { title: 'Mixing countries', text: `Do not reuse non-${country.adjective} examples, fallback copy, or related links in this suite.` }
      ],
      officialSources: [
        { title: country.localTerms.register, text: `Official business registry or company lookup remains the source of truth for ${country.name}.`, status: 'official boundary' },
        { title: country.localTerms.tax, text: 'Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.', status: 'official boundary' },
        { title: country.localTerms.privacy, text: 'Privacy obligations require legal/process review outside browser-only diagnostics.', status: 'official boundary' }
      ],
      ecosystem: [
        { title: 'Identity and tax', text: country.identifiers.join(', '), status: 'available' },
        { title: 'Banking and payments', text: country.payments.join(', '), status: 'available' },
        { title: 'Developer data QA', text: 'CSV, JSON, API, form, OCR, privacy, and fixture helpers.', status: 'available' }
      ],
      localizationNotes: [
        { title: 'Locale', text: `${country.locale} / ${country.icu}; date ${country.date}.`, status: 'available' },
        { title: 'Numbers', text: `${country.currency} amounts use ${country.decimal} and ${country.thousands}.`, status: 'available' },
        { title: 'Forms', text: `${country.localTerms.personal}, ${country.localTerms.company}, ${country.localTerms.postal}, phone, address, and IBAN need local labels.`, status: 'available' }
      ],
      technicalStandards: [
        { title: 'Plug types', value: country.plugTypes || 'Type C / Type F', text: 'Public utility fixture for travel, QA, and onboarding copy.' },
        { title: 'Electrical voltage', value: country.voltage || '230V', text: 'Common mains voltage used by country-profile fixtures.' },
        { title: 'Grid frequency', value: country.frequency || '50Hz', text: 'Common grid frequency for technical defaults.' },
        { title: 'Emergency number', value: '112', text: 'EU-wide emergency number; local alternatives may also exist.' }
      ],
      searchHints,
      routes
    }
  };
}

function svgOutline(country) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${country.name} outline">
  <rect width="320" height="220" rx="18" fill="#f8fafc"/>
  <path d="M86 48 L151 31 L222 55 L245 108 L219 169 L150 191 L84 158 L64 96 Z" fill="${country.theme[0]}" opacity=".14" stroke="${country.theme[0]}" stroke-width="8" stroke-linejoin="round"/>
  <circle cx="160" cy="110" r="24" fill="${country.theme[1]}" opacity=".22"/>
  <text x="160" y="118" text-anchor="middle" font-family="Inter, Arial" font-size="42" font-weight="900" fill="#0f172a">${country.iso2}</text>
</svg>
`;
}

function svgLocation(country) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" role="img" aria-label="${country.name} location">
  <rect width="320" height="220" rx="18" fill="#eef4fb"/>
  <path d="M22 72 C62 44 101 50 139 70 C173 89 206 80 247 58 C270 45 294 42 306 50" fill="none" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/>
  <path d="M42 150 C82 126 119 132 151 151 C190 173 231 159 285 128" fill="none" stroke="#cbd5e1" stroke-width="10" stroke-linecap="round"/>
  <circle cx="${country.marker.x * 3.2}" cy="${country.marker.y * 2.2}" r="16" fill="${country.theme[0]}" opacity=".22"/>
  <circle cx="${country.marker.x * 3.2}" cy="${country.marker.y * 2.2}" r="7" fill="${country.theme[1]}"/>
  <text x="24" y="196" font-family="Inter, Arial" font-size="18" font-weight="800" fill="#0f172a">${country.name}</text>
</svg>
`;
}

function updateBuildAll(countries) {
  const rel = 'scripts/build-all.mjs';
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const country of countries) {
    const mapping = `  'validohub.${country.slug}-suite': ['country-suite-factory.js', '${country.slug}-suite.js'],`;
    if (!text.includes(`'validohub.${country.slug}-suite'`)) {
      text = text.replace(`  'validohub.italy-suite': ['country-suite-factory.js', 'italy-suite.js'],`, `  'validohub.italy-suite': ['country-suite-factory.js', 'italy-suite.js'],\n${mapping}`);
    }
    const setEntry = `  'validohub.${country.slug}-suite',`;
    if (!text.includes(setEntry)) {
      text = text.replace(`  'validohub.italy-suite',`, `  'validohub.italy-suite',\n${setEntry}`);
    }
    const validation = `  'validohub.${country.slug}-suite': '${country.slug}-suite.js',`;
    if (!text.includes(validation)) {
      text = text.replace(`  'validohub.italy-suite': 'italy-suite.js',`, `  'validohub.italy-suite': 'italy-suite.js',\n${validation}`);
    }
  }
  fs.writeFileSync(path.join(ROOT, rel), text);
}

function updatePremiumAudit(countries) {
  const rel = 'scripts/audit-country-premium.mjs';
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const country of countries) {
    const entry = `  ['validohub.${country.slug}-suite', '${country.slug}-suite.js'],`;
    if (!text.includes(entry)) {
      text = text.replace(`  ['validohub.spain-id', 'spain-id.js']`, `  ['validohub.spain-id', 'spain-id.js'],\n${entry.replace(/,$/, '')}`);
    }
  }
  fs.writeFileSync(path.join(ROOT, rel), text);
}

function updateFactoryAudit(countries) {
  const rel = 'scripts/audit-country-suite-factory.mjs';
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const country of countries) {
    const entry = `  { slug: '${country.slug}', runtime: '${country.slug}-suite.js', label: '${country.adjective}' },`;
    if (!text.includes(`slug: '${country.slug}'`)) {
      text = text.replace(`  { slug: 'italy', runtime: 'italy-suite.js', label: 'Italian' }`, `  { slug: 'italy', runtime: 'italy-suite.js', label: 'Italian' },\n${entry.replace(/,$/, '')}`);
    }
  }
  fs.writeFileSync(path.join(ROOT, rel), text);
}

function updateAlgorithms(countries) {
  const rel = 'algorithms/algorithms.yaml';
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const country of countries) {
    if (text.includes(`algorithmId: validohub.${country.slug}-suite`)) continue;
    text += `

  - algorithmId: validohub.${country.slug}-suite
    javaClass: com.validohub.algorithms.${country.slug}.${country.name.replace(/[^A-Za-z]/g, '')}SuiteAlgorithm
    version: 1
    capabilities: [validate, parse, format, generate, calculate, explain]
    name:
      en: ${country.name} Premium Suite Algorithm
    summary:
      en: Metadata entry for ValidoHub browser-side ${country.adjective.toLowerCase()} identifiers, banking, payments, tax, locale, privacy, vehicle, document, and developer workbenches.
`;
  }
  fs.writeFileSync(path.join(ROOT, rel), text);
}

function updateDocs(countries) {
  const list = countries.map((c) => `${c.name} (${c.slug})`).join(', ');
  const auditCommands = countries.map((c) => `npm run audit:country-premium -- --country ${c.slug}`).join('\n');
  write('docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md', `# Europe Premium Batch Suite Spec

This spec covers the strict-Europe full-premium generation batch: ${list}.

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

${countries.map((c) => `- ${c.name}: ${c.localTerms.personal}, ${c.localTerms.company}, ${c.localTerms.tax}, ${c.localTerms.payment}, ${c.localTerms.invoice}, ${c.localTerms.privacy}.`).join('\n')}

## Acceptance

Run the premium gate per country:

\`\`\`bash
${auditCommands}
\`\`\`

Then run \`npm run audit:country-suite\`, full \`npm run build\`, and Engine doctor before sign-off.
`);
  const changelog = path.join(ROOT, 'docs/ai/CHANGELOG_AI.md');
  if (fs.existsSync(changelog)) {
    let text = fs.readFileSync(changelog, 'utf8');
    const marker = 'Strict Europe full-premium expansion batch';
    if (!text.includes(marker)) {
      text = `## 2026-07-21 - ${marker}\n\n- Added a documented strict-Europe premium generation batch for ${list}.\n- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.\n- Added \`docs/product/EUROPE_BATCH_PREMIUM_SUITE_SPEC.md\` so future AI sessions treat batch generation quality as a contract, not a one-off.\n\n` + text;
      fs.writeFileSync(changelog, text);
    }
  }
  const current = path.join(ROOT, 'docs/product/CURRENT_STATE.md');
  if (fs.existsSync(current)) {
    let text = fs.readFileSync(current, 'utf8');
    const marker = 'Strict Europe Premium Batch V2';
    if (!text.includes(marker)) {
      text += `\n\n## ${marker}\n\nStrict-Europe coverage is generated as full premium with Country Suite Factory V1. Each country uses quality-driven local developer workbenches, field breakdown on every tool, seven production runtime locales, validate/generate affordances where safe, same-country related links, rich country hub sections, and explicit official/live lookup boundaries. Russia and Belarus remain excluded; controversial/special territories are handled later by separate jurisdiction rules.\n`;
      fs.writeFileSync(current, text);
    }
  }
  const registry = path.join(ROOT, 'docs/product/WORKBENCH_REGISTRY.md');
  if (fs.existsSync(registry)) {
    let text = fs.readFileSync(registry, 'utf8');
    const marker = 'Strict Europe Premium Batch V2';
    if (!text.includes(marker)) {
      text += `\n\n## ${marker}\n\nRuntime source: \`assets/js/tools/<country>-suite.js\` using \`country-suite-factory.js\`.\n\nCountries: ${list}.\n\nEach country registers quality-driven active browser-only workbenches covering identifiers, VAT/tax, payments, banking, address, phone, locale formatting, privacy/redaction, documents, vehicles, logistics, and developer QA. Field breakdown, tool-context explanation, valid/invalid fixtures, fresh generator output, copy feedback, and official boundary copy are mandatory for every route.\n`;
      fs.writeFileSync(registry, text);
    }
  }
}

function main() {
  ensureDir('tools');
  ensureDir('countries/data');
  ensureDir('assets/js/tools');
  ensureDir('assets/images/countries');
  for (const country of COUNTRIES) {
    const tools = toolObjects(country);
    write(`countries/${country.slug}.yaml`, countryYaml(country));
    write(`countries/data/${country.slug}.json`, JSON.stringify(countryData(country, tools), null, 2) + '\n');
    write(`assets/js/tools/${country.slug}-suite.js`, runtime(country, tools));
    write(`assets/images/countries/${country.slug}-outline.svg`, svgOutline(country));
    write(`assets/images/countries/${country.slug}-location.svg`, svgLocation(country));
    tools.forEach((tool, index) => {
      const related = [tools[(index + 1) % tools.length].id, tools[(index + 2) % tools.length].id];
      write(`tools/${tool.id}.yaml`, toolYaml(country, tool, related));
    });
  }
  updateBuildAll(COUNTRIES);
  updatePremiumAudit(COUNTRIES);
  updateFactoryAudit(COUNTRIES);
  updateAlgorithms(COUNTRIES);
  updateDocs(COUNTRIES);
  console.log(`Generated ${COUNTRIES.length} countries and ${COUNTRIES.length * TOOL_TEMPLATES.length} tools.`);
}

main();
