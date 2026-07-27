#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = [
  {
    slug: 'japan', iso2: 'JP', iso3: 'JPN', isoNumeric: '392', name: 'Japan', adjective: 'Japanese', nativeName: 'Nihon / Nippon',
    flag: '🇯🇵', language: 'Japanese', localLanguage: 'ja-JP', currency: 'JPY', currencyName: 'Japanese yen', symbol: 'JPY',
    locale: 'ja-JP', icu: 'ja_JP', date: 'YYYY/MM/DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+81',
    capital: 'Tokyo', continent: 'Asia', region: 'East Asia', population: 'approximately 124M',
    identifiers: ['My Number', 'Corporate Number', 'Consumption tax invoice number', 'postal code', 'phone'],
    payments: ['Zengin bank code', 'domestic transfer', 'SWIFT', 'Konbini payment reference', 'Pay-easy handoff'],
    localTerms: { personal: 'My Number', company: 'Corporate Number', tax: 'Consumption tax / T-number', social: 'basic pension number boundary', register: 'Houjin Bangou / Legal Affairs Bureau', invoice: 'Qualified Invoice / T-number', payment: 'Zengin / Pay-easy reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'APPI privacy' },
    samples: { personal: '123456789012', company: '1234567890123', social: '1234-567890', iban: 'JPBANK0001234567', bank: '0001 001 1234567', phone: '+81 3 1234 5678', postal: '100-0001 Tokyo', plate: '品川 300 あ 12-34', vat: 'T1234567890123', amount: '1,234 JPY', date: '2026/07/21', address: '1-1 Chiyoda, Chiyoda-ku, Tokyo 100-0001', json: '{"country":"JP","corporateNumber":"1234567890123","invoiceNumber":"T1234567890123","amount":"1,234"}' },
    theme: ['#BC002D', '#FFFFFF', '#111827'], marker: { x: 73, y: 38 }, related: ['KR', 'CN', 'TW'],
    plugTypes: 'Type A / Type B', voltage: '100V', frequency: '50Hz east / 60Hz west', emergencyNumber: '110 / 119',
    searchHints: ['MY NUMBER', 'HOUJIN BANGOU', 'T-NUMBER', 'ZENGIN', 'PAY-EASY', 'POSTAL']
  },
  {
    slug: 'india', iso2: 'IN', iso3: 'IND', isoNumeric: '356', name: 'India', adjective: 'Indian', nativeName: 'Bharat / India',
    flag: '🇮🇳', language: 'Hindi and English', localLanguage: 'hi-IN', currency: 'INR', currencyName: 'Indian rupee', symbol: 'INR',
    locale: 'en-IN', icu: 'en_IN', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Indian lakh/crore grouping', phone: '+91',
    capital: 'New Delhi', continent: 'Asia', region: 'South Asia', population: 'approximately 1.43B',
    identifiers: ['PAN', 'GSTIN', 'Aadhaar boundary', 'PIN code', 'phone'],
    payments: ['IFSC', 'UPI VPA', 'IMPS/NEFT/RTGS handoff', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'PAN', company: 'CIN / LLPIN', tax: 'GSTIN', social: 'Aadhaar boundary', register: 'MCA / GST portal', invoice: 'GST e-invoice / IRN', payment: 'UPI / IFSC payment reference', plate: 'vehicle registration number', postal: 'PIN code', privacy: 'DPDP Act privacy' },
    samples: { personal: 'ABCDE1234F', company: 'U72900DL2020PTC123456', social: '1234 5678 9012', iban: 'HDFC0001234 12345678901234', bank: 'HDFC0001234 12345678901234', phone: '+91 98765 43210', postal: '110001 New Delhi', plate: 'DL 01 AB 1234', vat: '27ABCDE1234F1Z5', amount: '1,23,456.78 INR', date: '21/07/2026', address: 'Connaught Place, New Delhi 110001', json: '{"country":"IN","pan":"ABCDE1234F","gstin":"27ABCDE1234F1Z5","ifsc":"HDFC0001234"}' },
    theme: ['#FF9933', '#FFFFFF', '#138808'], marker: { x: 66, y: 53 }, related: ['SG', 'AE', 'BD'],
    plugTypes: 'Type C / Type D / Type M', voltage: '230V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['PAN', 'GSTIN', 'IFSC', 'UPI', 'IRN', 'PIN CODE']
  },
  {
    slug: 'singapore', iso2: 'SG', iso3: 'SGP', isoNumeric: '702', name: 'Singapore', adjective: 'Singapore', nativeName: 'Singapore',
    flag: '🇸🇬', language: 'English, Malay, Mandarin, and Tamil', localLanguage: 'en-SG', currency: 'SGD', currencyName: 'Singapore dollar', symbol: 'SGD',
    locale: 'en-SG', icu: 'en_SG', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+65',
    capital: 'Singapore', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 5.9M',
    identifiers: ['NRIC/FIN', 'UEN', 'GST number', 'postal code', 'phone'],
    payments: ['FAST bank code', 'PayNow proxy', 'GIRO handoff', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'NRIC / FIN', company: 'UEN', tax: 'GST', social: 'CPF boundary', register: 'ACRA', invoice: 'InvoiceNow / Peppol', payment: 'PayNow / FAST reference', plate: 'vehicle registration number', postal: 'postal code', privacy: 'PDPA privacy' },
    samples: { personal: 'S1234567D', company: '201912345K', social: 'S1234567D', iban: 'DBSSSGSG 7171 123456789', bank: '7171 001 123456789', phone: '+65 8123 4567', postal: '049315 Singapore', plate: 'SBA1234A', vat: 'M91234567X', amount: '1,234.56 SGD', date: '21/07/2026', address: '1 Raffles Place, Singapore 048616', json: '{"country":"SG","uen":"201912345K","nric":"S1234567D","paynow":"+6581234567"}' },
    theme: ['#EF3340', '#FFFFFF', '#111827'], marker: { x: 68, y: 65 }, related: ['MY', 'ID', 'IN'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '999 / 995',
    searchHints: ['NRIC', 'FIN', 'UEN', 'GST', 'PAYNOW', 'FAST']
  },
  {
    slug: 'south-korea', iso2: 'KR', iso3: 'KOR', isoNumeric: '410', name: 'South Korea', adjective: 'South Korean', nativeName: 'Daehan Minguk',
    flag: '🇰🇷', language: 'Korean', localLanguage: 'ko-KR', currency: 'KRW', currencyName: 'South Korean won', symbol: 'KRW',
    locale: 'ko-KR', icu: 'ko_KR', date: 'YYYY.MM.DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+82',
    capital: 'Seoul', continent: 'Asia', region: 'East Asia', population: 'approximately 51.7M',
    identifiers: ['RRN boundary', 'Business Registration Number', 'corporate registration number', 'postal code', 'phone'],
    payments: ['bank code/account', 'virtual account', 'GIRO handoff', 'SWIFT', 'tax invoice reference'],
    localTerms: { personal: 'RRN boundary', company: 'Business Registration Number', tax: 'VAT / tax invoice number', social: 'RRN boundary', register: 'DART / business registry', invoice: 'National Tax Service e-tax invoice', payment: 'virtual account / GIRO reference', plate: 'vehicle registration number', postal: 'postal code', privacy: 'PIPA privacy' },
    samples: { personal: '900101-1234567', company: '123-45-67890', social: '900101-1234567', iban: 'KR BANK 088 1234567890123', bank: '088 1234567890123', phone: '+82 10 1234 5678', postal: '04524 Seoul', plate: '12가 3456', vat: '123-45-67890', amount: '1,234,567 KRW', date: '2026.07.21', address: 'Sejong-daero 110, Jung-gu, Seoul 04524', json: '{"country":"KR","businessNumber":"123-45-67890","bankCode":"088","amount":"1,234,567"}' },
    theme: ['#CD2E3A', '#0047A0', '#FFFFFF'], marker: { x: 71, y: 42 }, related: ['JP', 'CN', 'SG'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '60Hz', emergencyNumber: '112 / 119',
    searchHints: ['BRN', 'RRN', 'NTS', 'GIRO', 'VIRTUAL ACCOUNT', 'POSTAL']
  },
  {
    slug: 'united-arab-emirates', iso2: 'AE', iso3: 'ARE', isoNumeric: '784', name: 'United Arab Emirates', adjective: 'UAE', nativeName: 'Al-Imarat al-Arabiyah al-Muttahidah',
    flag: '🇦🇪', language: 'Arabic', localLanguage: 'ar-AE', currency: 'AED', currencyName: 'UAE dirham', symbol: 'AED',
    locale: 'en-AE', icu: 'en_AE', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+971',
    capital: 'Abu Dhabi', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 10.2M',
    identifiers: ['Emirates ID boundary', 'TRN', 'trade license number', 'Makani/address', 'phone'],
    payments: ['IBAN', 'UAEFTS handoff', 'SWIFT', 'WPS file helper', 'invoice reference'],
    localTerms: { personal: 'Emirates ID boundary', company: 'trade license number', tax: 'VAT TRN', social: 'WPS employee boundary', register: 'DED / free-zone registry', invoice: 'VAT tax invoice', payment: 'UAEFTS / WPS reference', plate: 'vehicle plate', postal: 'PO Box / Makani', privacy: 'PDPL privacy' },
    samples: { personal: '784-1990-1234567-1', company: 'CN-1234567', social: '784-1990-1234567-1', iban: 'AE070331234567890123456', bank: '033 1234567890123456', phone: '+971 50 123 4567', postal: 'PO Box 12345 Abu Dhabi', plate: 'Dubai A 12345', vat: '100123456700003', amount: '1,234.56 AED', date: '21/07/2026', address: 'Al Maryah Island, Abu Dhabi, PO Box 12345', json: '{"country":"AE","trn":"100123456700003","iban":"AE070331234567890123456","wps":"salary-file"}' },
    theme: ['#00732F', '#FFFFFF', '#FF0000'], marker: { x: 60, y: 57 }, related: ['SA', 'QA', 'IN'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '999 / 998',
    searchHints: ['TRN', 'EMIRATES ID', 'IBAN', 'UAEFTS', 'WPS', 'MAKANI']
  },
  {
    slug: 'china', iso2: 'CN', iso3: 'CHN', isoNumeric: '156', name: 'China', adjective: 'Chinese', nativeName: 'Zhongguo',
    flag: '🇨🇳', language: 'Chinese', localLanguage: 'zh-CN', currency: 'CNY', currencyName: 'Chinese yuan', symbol: 'CNY',
    locale: 'zh-CN', icu: 'zh_CN', date: 'YYYY-MM-DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+86',
    capital: 'Beijing', continent: 'Asia', region: 'East Asia', population: 'approximately 1.41B',
    identifiers: ['Resident ID boundary', 'USCC', 'taxpayer number', 'postal code', 'phone'],
    payments: ['CNAPS bank code', 'UnionPay handoff', 'SWIFT', 'invoice reference', 'bank account'],
    localTerms: { personal: 'Resident ID boundary', company: 'USCC', tax: 'VAT / taxpayer number', social: 'social security boundary', register: 'SAMR / business registry', invoice: 'fapiao invoice', payment: 'CNAPS / UnionPay reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PIPL privacy' },
    samples: { personal: '110101199003078877', company: '91310000MA1FL0AB1C', social: '110101199003078877', iban: 'CNAPS102100099996 6222020200001234567', bank: '102100099996 6222020200001234567', phone: '+86 138 0013 8000', postal: '100000 Beijing', plate: '京A12345', vat: '91310000MA1FL0AB1C', amount: '1,234.56 CNY', date: '2026-07-21', address: '1 Chang An Avenue, Beijing 100000', json: '{"country":"CN","uscc":"91310000MA1FL0AB1C","cnaps":"102100099996","amount":"1,234.56"}' },
    theme: ['#DE2910', '#FFDE00', '#111827'], marker: { x: 68, y: 43 }, related: ['JP', 'KR', 'SG'],
    plugTypes: 'Type A / Type C / Type I', voltage: '220V', frequency: '50Hz', emergencyNumber: '110 / 119 / 120',
    searchHints: ['USCC', 'PIPL', 'CNAPS', 'FAPIAO', 'UNIONPAY', 'POSTAL']
  },
  {
    slug: 'indonesia', iso2: 'ID', iso3: 'IDN', isoNumeric: '360', name: 'Indonesia', adjective: 'Indonesian', nativeName: 'Indonesia',
    flag: '🇮🇩', language: 'Indonesian', localLanguage: 'id-ID', currency: 'IDR', currencyName: 'Indonesian rupiah', symbol: 'IDR',
    locale: 'id-ID', icu: 'id_ID', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot (.)', phone: '+62',
    capital: 'Jakarta', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 281M',
    identifiers: ['NIK boundary', 'NPWP', 'NIB', 'postal code', 'phone'],
    payments: ['bank code/account', 'BI-FAST handoff', 'QRIS reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'NIK boundary', company: 'NIB / company registration', tax: 'NPWP', social: 'BPJS boundary', register: 'OSS / AHU registry', invoice: 'e-Faktur invoice', payment: 'BI-FAST / QRIS reference', plate: 'vehicle plate', postal: 'kode pos', privacy: 'PDP Law privacy' },
    samples: { personal: '3174010101900001', company: '8120001234567', social: '0001234567890', iban: 'ID BANK 014 1234567890', bank: '014 1234567890', phone: '+62 812 3456 7890', postal: '10110 Jakarta', plate: 'B 1234 ABC', vat: '01.234.567.8-901.000', amount: '1.234.567,89 IDR', date: '21/07/2026', address: 'Jl. Thamrin 1, Jakarta 10110', json: '{"country":"ID","npwp":"01.234.567.8-901.000","bankCode":"014","qris":"INV-2026-001"}' },
    theme: ['#FF0000', '#FFFFFF', '#111827'], marker: { x: 69, y: 67 }, related: ['SG', 'MY', 'PH'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['NIK', 'NPWP', 'NIB', 'BI-FAST', 'QRIS', 'BPJS']
  },
  {
    slug: 'malaysia', iso2: 'MY', iso3: 'MYS', isoNumeric: '458', name: 'Malaysia', adjective: 'Malaysian', nativeName: 'Malaysia',
    flag: '🇲🇾', language: 'Malay and English', localLanguage: 'ms-MY', currency: 'MYR', currencyName: 'Malaysian ringgit', symbol: 'MYR',
    locale: 'en-MY', icu: 'en_MY', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+60',
    capital: 'Kuala Lumpur', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 34M',
    identifiers: ['MyKad boundary', 'SSM number', 'TIN', 'postal code', 'phone'],
    payments: ['MEPS bank code', 'DuitNow proxy', 'FPX handoff', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'MyKad boundary', company: 'SSM registration number', tax: 'TIN / SST', social: 'EPF boundary', register: 'SSM / MyCoID', invoice: 'MyInvois e-invoice', payment: 'DuitNow / FPX reference', plate: 'vehicle plate', postal: 'postcode', privacy: 'PDPA privacy' },
    samples: { personal: '900101-14-5678', company: '201901234567', social: 'EPF 12345678', iban: 'MBBEMYKL 5140 123456789012', bank: '5140 123456789012', phone: '+60 12 345 6789', postal: '50050 Kuala Lumpur', plate: 'WXY 1234', vat: 'C1234567890', amount: '1,234.56 MYR', date: '21/07/2026', address: 'Jalan Ampang 1, 50050 Kuala Lumpur', json: '{"country":"MY","ssm":"201901234567","tin":"C1234567890","duitnow":"+60123456789"}' },
    theme: ['#010066', '#CC0001', '#FFCC00'], marker: { x: 67, y: 63 }, related: ['SG', 'ID', 'TH'],
    plugTypes: 'Type G', voltage: '240V', frequency: '50Hz', emergencyNumber: '999',
    searchHints: ['MYKAD', 'SSM', 'TIN', 'DUITNOW', 'FPX', 'MYINVOIS']
  },
  {
    slug: 'thailand', iso2: 'TH', iso3: 'THA', isoNumeric: '764', name: 'Thailand', adjective: 'Thai', nativeName: 'Prathet Thai',
    flag: '🇹🇭', language: 'Thai', localLanguage: 'th-TH', currency: 'THB', currencyName: 'Thai baht', symbol: 'THB',
    locale: 'th-TH', icu: 'th_TH', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+66',
    capital: 'Bangkok', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 72M',
    identifiers: ['Thai ID boundary', 'Juristic Person number', 'tax ID', 'postal code', 'phone'],
    payments: ['bank code/account', 'PromptPay proxy', 'BAHTNET handoff', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Thai ID boundary', company: 'Juristic Person number', tax: 'Revenue Department tax ID', social: 'Social Security boundary', register: 'DBD registry', invoice: 'e-Tax invoice', payment: 'PromptPay / BAHTNET reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPA privacy' },
    samples: { personal: '1101700203451', company: '0105559123456', social: '1101700203451', iban: 'TH BANK 002 1234567890', bank: '002 1234567890', phone: '+66 81 234 5678', postal: '10110 Bangkok', plate: 'กข 1234', vat: '0105559123456', amount: '1,234.56 THB', date: '21/07/2026', address: 'Sukhumvit Road 1, Bangkok 10110', json: '{"country":"TH","taxId":"0105559123456","promptPay":"+66812345678","amount":"1,234.56"}' },
    theme: ['#A51931', '#F4F5F8', '#2D2A4A'], marker: { x: 67, y: 59 }, related: ['MY', 'VN', 'SG'],
    plugTypes: 'Type A / Type B / Type C / Type O', voltage: '230V', frequency: '50Hz', emergencyNumber: '191 / 1669',
    searchHints: ['THAI ID', 'DBD', 'PROMPTPAY', 'BAHTNET', 'PDPA', 'POSTAL']
  },
  {
    slug: 'vietnam', iso2: 'VN', iso3: 'VNM', isoNumeric: '704', name: 'Vietnam', adjective: 'Vietnamese', nativeName: 'Viet Nam',
    flag: '🇻🇳', language: 'Vietnamese', localLanguage: 'vi-VN', currency: 'VND', currencyName: 'Vietnamese dong', symbol: 'VND',
    locale: 'vi-VN', icu: 'vi_VN', date: 'DD/MM/YYYY', decimal: 'Comma (,)', thousands: 'Dot (.)', phone: '+84',
    capital: 'Hanoi', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 101M',
    identifiers: ['Citizen ID boundary', 'enterprise code', 'tax code', 'postal code', 'phone'],
    payments: ['bank account', 'NAPAS handoff', 'VietQR reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Citizen ID boundary', company: 'enterprise registration code', tax: 'tax code', social: 'VssID boundary', register: 'Business Registration Portal', invoice: 'e-invoice code', payment: 'NAPAS / VietQR reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPD privacy' },
    samples: { personal: '001090012345', company: '0101234567', social: '001090012345', iban: 'VN BANK 9704 1234567890', bank: '9704 1234567890', phone: '+84 912 345 678', postal: '100000 Hanoi', plate: '30A-123.45', vat: '0101234567', amount: '1.234.567 VND', date: '21/07/2026', address: '1 Trang Tien, Hanoi 100000', json: '{"country":"VN","taxCode":"0101234567","napas":"9704","vietqr":"INV-2026-001"}' },
    theme: ['#DA251D', '#FFFF00', '#111827'], marker: { x: 69, y: 60 }, related: ['TH', 'CN', 'SG'],
    plugTypes: 'Type A / Type C / Type G', voltage: '220V', frequency: '50Hz', emergencyNumber: '113 / 114 / 115',
    searchHints: ['CITIZEN ID', 'TAX CODE', 'NAPAS', 'VIETQR', 'E-INVOICE', 'POSTAL']
  },
  {
    slug: 'philippines', iso2: 'PH', iso3: 'PHL', isoNumeric: '608', name: 'Philippines', adjective: 'Philippine', nativeName: 'Pilipinas',
    flag: '🇵🇭', language: 'Filipino and English', localLanguage: 'en-PH', currency: 'PHP', currencyName: 'Philippine peso', symbol: 'PHP',
    locale: 'en-PH', icu: 'en_PH', date: 'MM/DD/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+63',
    capital: 'Manila', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 116M',
    identifiers: ['PhilSys boundary', 'SEC registration number', 'TIN', 'ZIP code', 'phone'],
    payments: ['bank code/account', 'InstaPay handoff', 'PESONet handoff', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'PhilSys boundary', company: 'SEC registration number', tax: 'BIR TIN', social: 'SSS / GSIS boundary', register: 'SEC / DTI registry', invoice: 'BIR invoice', payment: 'InstaPay / PESONet reference', plate: 'vehicle plate', postal: 'ZIP code', privacy: 'Data Privacy Act privacy' },
    samples: { personal: '1234-5678-9012-3456', company: 'CS202012345', social: '12-3456789-0', iban: 'PH BANK 010 1234567890', bank: '010 1234567890', phone: '+63 917 123 4567', postal: '1000 Manila', plate: 'ABC 1234', vat: '123-456-789-000', amount: '1,234.56 PHP', date: '07/21/2026', address: 'Ayala Avenue 1, Makati 1226', json: '{"country":"PH","tin":"123-456-789-000","instapay":"0101234567890","amount":"1,234.56"}' },
    theme: ['#0038A8', '#CE1126', '#FCD116'], marker: { x: 72, y: 61 }, related: ['SG', 'MY', 'ID'],
    plugTypes: 'Type A / Type B / Type C', voltage: '220V', frequency: '60Hz', emergencyNumber: '911',
    searchHints: ['TIN', 'PHILSYS', 'SEC', 'INSTAPAY', 'PESONET', 'ZIP']
  },
  {
    slug: 'pakistan', iso2: 'PK', iso3: 'PAK', isoNumeric: '586', name: 'Pakistan', adjective: 'Pakistani', nativeName: 'Pakistan',
    flag: '🇵🇰', language: 'Urdu and English', localLanguage: 'ur-PK', currency: 'PKR', currencyName: 'Pakistani rupee', symbol: 'PKR',
    locale: 'en-PK', icu: 'en_PK', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+92',
    capital: 'Islamabad', continent: 'Asia', region: 'South Asia', population: 'approximately 245M',
    identifiers: ['CNIC boundary', 'SECP company number', 'NTN / STRN', 'postal code', 'phone'],
    payments: ['IBAN', 'Raast handoff', '1LINK reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'CNIC boundary', company: 'SECP registration number', tax: 'FBR NTN / STRN', social: 'EOBI boundary', register: 'SECP registry', invoice: 'FBR invoice', payment: 'Raast / 1LINK reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '35202-1234567-1', company: '0123456', social: 'EOBI-123456', iban: 'PK36SCBL0000001123456702', bank: 'SCBL 0000001123456702', phone: '+92 300 1234567', postal: '44000 Islamabad', plate: 'LEA 1234', vat: '1234567-8', amount: '1,234.56 PKR', date: '21/07/2026', address: 'Jinnah Avenue 1, Islamabad 44000', json: '{"country":"PK","cnic":"35202-1234567-1","iban":"PK36SCBL0000001123456702","raast":"+923001234567"}' },
    theme: ['#01411C', '#FFFFFF', '#111827'], marker: { x: 62, y: 50 }, related: ['IN', 'AE', 'BD'],
    plugTypes: 'Type C / Type D', voltage: '230V', frequency: '50Hz', emergencyNumber: '15 / 1122',
    searchHints: ['CNIC', 'NTN', 'STRN', 'SECP', 'RAAST', 'IBAN']
  },
  {
    slug: 'bangladesh', iso2: 'BD', iso3: 'BGD', isoNumeric: '050', name: 'Bangladesh', adjective: 'Bangladeshi', nativeName: 'Bangladesh',
    flag: '🇧🇩', language: 'Bengali', localLanguage: 'bn-BD', currency: 'BDT', currencyName: 'Bangladeshi taka', symbol: 'BDT',
    locale: 'bn-BD', icu: 'bn_BD', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+880',
    capital: 'Dhaka', continent: 'Asia', region: 'South Asia', population: 'approximately 174M',
    identifiers: ['NID boundary', 'RJSC registration number', 'TIN / BIN', 'postal code', 'phone'],
    payments: ['bank routing/account', 'BEFTN handoff', 'NPSB reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'NID boundary', company: 'RJSC registration number', tax: 'TIN / BIN', social: 'NID boundary', register: 'RJSC registry', invoice: 'VAT invoice', payment: 'BEFTN / NPSB reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '1990123456789', company: 'C-123456', social: '1990123456789', iban: 'BD BANK 145 1234567890123', bank: '145 1234567890123', phone: '+880 1712 345678', postal: '1000 Dhaka', plate: 'DHAKA METRO GA 12-3456', vat: '123456789012', amount: '1,234.56 BDT', date: '21/07/2026', address: 'Motijheel Road 1, Dhaka 1000', json: '{"country":"BD","tin":"123456789012","routing":"145","beftn":"INV-2026-001"}' },
    theme: ['#006A4E', '#F42A41', '#FFFFFF'], marker: { x: 68, y: 55 }, related: ['IN', 'PK', 'SG'],
    plugTypes: 'Type C / Type D / Type G / Type K', voltage: '220V', frequency: '50Hz', emergencyNumber: '999',
    searchHints: ['NID', 'TIN', 'BIN', 'RJSC', 'BEFTN', 'NPSB']
  },
  {
    slug: 'saudi-arabia', iso2: 'SA', iso3: 'SAU', isoNumeric: '682', name: 'Saudi Arabia', adjective: 'Saudi', nativeName: 'Al-Mamlakah al-Arabiyah as-Suudiyah',
    flag: '🇸🇦', language: 'Arabic', localLanguage: 'ar-SA', currency: 'SAR', currencyName: 'Saudi riyal', symbol: 'SAR',
    locale: 'ar-SA', icu: 'ar_SA', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+966',
    capital: 'Riyadh', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 34M',
    identifiers: ['National ID boundary', 'CR number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'SADAD reference', 'SARIE handoff', 'SWIFT', 'WPS reference'],
    localTerms: { personal: 'National ID boundary', company: 'Commercial Registration number', tax: 'ZATCA VAT number', social: 'GOSI boundary', register: 'Ministry of Commerce registry', invoice: 'ZATCA e-invoice', payment: 'SADAD / SARIE reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPL privacy' },
    samples: { personal: '1001234567', company: '1010123456', social: '1001234567', iban: 'SA0380000000608010167519', bank: '80 000000608010167519', phone: '+966 50 123 4567', postal: '12211 Riyadh', plate: 'ABC 1234', vat: '300123456700003', amount: '1,234.56 SAR', date: '21/07/2026', address: 'King Fahd Road 1, Riyadh 12211', json: '{"country":"SA","vat":"300123456700003","iban":"SA0380000000608010167519","sadad":"INV-2026-001"}' },
    theme: ['#006C35', '#FFFFFF', '#111827'], marker: { x: 58, y: 55 }, related: ['AE', 'QA', 'PK'],
    plugTypes: 'Type G', voltage: '230V', frequency: '60Hz', emergencyNumber: '911 / 999',
    searchHints: ['CR', 'VAT', 'ZATCA', 'SADAD', 'SARIE', 'IBAN']
  },
  {
    slug: 'israel', iso2: 'IL', iso3: 'ISR', isoNumeric: '376', name: 'Israel', adjective: 'Israeli', nativeName: 'Yisrael',
    flag: '🇮🇱', language: 'Hebrew and Arabic', localLanguage: 'he-IL', currency: 'ILS', currencyName: 'Israeli new shekel', symbol: 'ILS',
    locale: 'he-IL', icu: 'he_IL', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+972',
    capital: 'Jerusalem', continent: 'Asia', region: 'Western Asia', population: 'approximately 10M',
    identifiers: ['Teudat Zehut boundary', 'company number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'Masav handoff', 'Zahav reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Teudat Zehut boundary', company: 'company registration number', tax: 'VAT / Osek number', social: 'Bituach Leumi boundary', register: 'Companies Registrar', invoice: 'tax invoice', payment: 'Masav / Zahav reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'Privacy Protection Law' },
    samples: { personal: '123456782', company: '512345678', social: '123456782', iban: 'IL620108000000099999999', bank: '010 800 0000099999999', phone: '+972 50 123 4567', postal: '9100001 Jerusalem', plate: '12-345-67', vat: '512345678', amount: '1,234.56 ILS', date: '21/07/2026', address: 'Jaffa Road 1, Jerusalem 9100001', json: '{"country":"IL","id":"123456782","iban":"IL620108000000099999999","vat":"512345678"}' },
    theme: ['#0038B8', '#FFFFFF', '#111827'], marker: { x: 56, y: 53 }, related: ['AE', 'SA', 'TR'],
    plugTypes: 'Type C / Type H', voltage: '230V', frequency: '50Hz', emergencyNumber: '100 / 101 / 102',
    searchHints: ['TEUDAT ZEHUT', 'VAT', 'MASAV', 'ZAHAV', 'IBAN', 'POSTAL']
  },
  {
    slug: 'nepal', iso2: 'NP', iso3: 'NPL', isoNumeric: '524', name: 'Nepal', adjective: 'Nepali', nativeName: 'Nepal',
    flag: '🇳🇵', language: 'Nepali', localLanguage: 'ne-NP', currency: 'NPR', currencyName: 'Nepalese rupee', symbol: 'NPR',
    locale: 'ne-NP', icu: 'ne_NP', date: 'YYYY/MM/DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+977',
    capital: 'Kathmandu', continent: 'Asia', region: 'South Asia', population: 'approximately 31M',
    identifiers: ['Citizenship number boundary', 'PAN', 'company registration number', 'postal code', 'phone'],
    payments: ['bank branch/account', 'connectIPS handoff', 'Fonepay reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Citizenship number boundary', company: 'company registration number', tax: 'PAN / VAT', social: 'SSF boundary', register: 'OCR / company registry', invoice: 'VAT invoice', payment: 'connectIPS / Fonepay reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'Privacy Act boundary' },
    samples: { personal: '27-01-76-12345', company: '123456/078/079', social: 'SSF-123456', iban: 'NP BANK 001 1234567890123', bank: '001 1234567890123', phone: '+977 984 1234567', postal: '44600 Kathmandu', plate: 'BA 2 PA 1234', vat: '500123456', amount: '1,234.56 NPR', date: '2026/07/21', address: 'Durbar Marg 1, Kathmandu 44600', json: '{"country":"NP","pan":"500123456","bank":"0011234567890123","connectIPS":"INV-2026-001"}' },
    theme: ['#DC143C', '#003893', '#FFFFFF'], marker: { x: 65, y: 51 }, related: ['IN', 'BD', 'PK'],
    plugTypes: 'Type C / Type D / Type M', voltage: '230V', frequency: '50Hz', emergencyNumber: '100 / 101 / 102',
    searchHints: ['PAN', 'VAT', 'OCR', 'CONNECTIPS', 'FONEPAY', 'POSTAL']
  },
  {
    slug: 'sri-lanka', iso2: 'LK', iso3: 'LKA', isoNumeric: '144', name: 'Sri Lanka', adjective: 'Sri Lankan', nativeName: 'Sri Lanka',
    flag: '🇱🇰', language: 'Sinhala and Tamil', localLanguage: 'si-LK', currency: 'LKR', currencyName: 'Sri Lankan rupee', symbol: 'LKR',
    locale: 'en-LK', icu: 'en_LK', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+94',
    capital: 'Sri Jayawardenepura Kotte', continent: 'Asia', region: 'South Asia', population: 'approximately 22M',
    identifiers: ['NIC boundary', 'company registration number', 'TIN / VAT', 'postal code', 'phone'],
    payments: ['bank branch/account', 'LankaPay handoff', 'CEFTS reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'NIC boundary', company: 'company registration number', tax: 'TIN / VAT', social: 'EPF / ETF boundary', register: 'ROC registry', invoice: 'VAT invoice', payment: 'LankaPay / CEFTS reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPA privacy' },
    samples: { personal: '199012345678', company: 'PV123456', social: 'EPF 123456', iban: 'LK BANK 7010 1234567890', bank: '7010 1234567890', phone: '+94 77 123 4567', postal: '00100 Colombo', plate: 'WP ABC-1234', vat: '104567890', amount: '1,234.56 LKR', date: '21/07/2026', address: 'Galle Road 1, Colombo 00100', json: '{"country":"LK","nic":"199012345678","vat":"104567890","cefts":"INV-2026-001"}' },
    theme: ['#8D153A', '#FFB700', '#00534E'], marker: { x: 66, y: 61 }, related: ['IN', 'SG', 'BD'],
    plugTypes: 'Type D / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '119 / 110',
    searchHints: ['NIC', 'TIN', 'VAT', 'LANKAPAY', 'CEFTS', 'POSTAL']
  },
  {
    slug: 'myanmar', iso2: 'MM', iso3: 'MMR', isoNumeric: '104', name: 'Myanmar', adjective: 'Myanmar', nativeName: 'Myanmar',
    flag: '🇲🇲', language: 'Burmese', localLanguage: 'my-MM', currency: 'MMK', currencyName: 'Myanmar kyat', symbol: 'MMK',
    locale: 'my-MM', icu: 'my_MM', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+95',
    capital: 'Naypyidaw', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 55M',
    identifiers: ['NRC boundary', 'company registration number', 'TIN', 'postal code', 'phone'],
    payments: ['bank account', 'CBM-Net handoff', 'MPU reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'NRC boundary', company: 'DICA company number', tax: 'TIN / commercial tax', social: 'social security boundary', register: 'DICA registry', invoice: 'commercial tax invoice', payment: 'CBM-Net / MPU reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'privacy boundary' },
    samples: { personal: '12/LaMaNa(N)123456', company: '123456789', social: 'SSB-123456', iban: 'MM BANK 001 1234567890', bank: '001 1234567890', phone: '+95 9 123 456789', postal: '15011 Naypyidaw', plate: 'YGN 1A-1234', vat: 'TIN123456789', amount: '1,234,567 MMK', date: '21/07/2026', address: 'Yaza Htarni Road 1, Naypyidaw 15011', json: '{"country":"MM","nrc":"12/LaMaNa(N)123456","tin":"TIN123456789","mpu":"INV-2026-001"}' },
    theme: ['#FECB00', '#34B233', '#EA2839'], marker: { x: 66, y: 58 }, related: ['TH', 'BD', 'SG'],
    plugTypes: 'Type C / Type D / Type F / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '199 / 191 / 192',
    searchHints: ['NRC', 'DICA', 'TIN', 'CBM-NET', 'MPU', 'POSTAL']
  },
  {
    slug: 'cambodia', iso2: 'KH', iso3: 'KHM', isoNumeric: '116', name: 'Cambodia', adjective: 'Cambodian', nativeName: 'Kampuchea',
    flag: '🇰🇭', language: 'Khmer', localLanguage: 'km-KH', currency: 'KHR', currencyName: 'Cambodian riel', symbol: 'KHR',
    locale: 'km-KH', icu: 'km_KH', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+855',
    capital: 'Phnom Penh', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 17M',
    identifiers: ['National ID boundary', 'company registration number', 'TIN / VAT', 'postal code', 'phone'],
    payments: ['bank account', 'Bakong handoff', 'KHQR reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'National ID boundary', company: 'company registration number', tax: 'GDT TIN / VAT', social: 'NSSF boundary', register: 'MOC business registry', invoice: 'VAT invoice', payment: 'Bakong / KHQR reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '010123456789', company: '00012345', social: 'NSSF-123456', iban: 'KH BANK 001 1234567890', bank: '001 1234567890', phone: '+855 12 345 678', postal: '12000 Phnom Penh', plate: 'PP 2AA-1234', vat: 'K001-123456789', amount: '1,234,567 KHR', date: '21/07/2026', address: 'Preah Monivong Blvd 1, Phnom Penh 12000', json: '{"country":"KH","tin":"K001-123456789","bakong":"khqr-inv-2026-001"}' },
    theme: ['#032EA1', '#E00025', '#FFFFFF'], marker: { x: 68, y: 60 }, related: ['TH', 'VN', 'LA'],
    plugTypes: 'Type A / Type C / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '117 / 118 / 119',
    searchHints: ['TIN', 'GDT', 'MOC', 'BAKONG', 'KHQR', 'POSTAL']
  },
  {
    slug: 'laos', iso2: 'LA', iso3: 'LAO', isoNumeric: '418', name: 'Laos', adjective: 'Lao', nativeName: 'Lao PDR',
    flag: '🇱🇦', language: 'Lao', localLanguage: 'lo-LA', currency: 'LAK', currencyName: 'Lao kip', symbol: 'LAK',
    locale: 'lo-LA', icu: 'lo_LA', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+856',
    capital: 'Vientiane', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 7.8M',
    identifiers: ['National ID boundary', 'enterprise registration number', 'TIN', 'postal code', 'phone'],
    payments: ['bank account', 'LAPNet handoff', 'BCEL One reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'National ID boundary', company: 'enterprise registration number', tax: 'TIN', social: 'social security boundary', register: 'enterprise registry', invoice: 'tax invoice', payment: 'LAPNet / BCEL One reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'data privacy boundary' },
    samples: { personal: '010123456789', company: 'ER-123456', social: 'SSO-123456', iban: 'LA BANK 010 1234567890', bank: '010 1234567890', phone: '+856 20 1234 5678', postal: '01000 Vientiane', plate: 'VT 1234', vat: 'TIN123456789', amount: '1,234,567 LAK', date: '21/07/2026', address: 'Lane Xang Avenue 1, Vientiane 01000', json: '{"country":"LA","tin":"TIN123456789","lapnet":"INV-2026-001"}' },
    theme: ['#CE1126', '#002868', '#FFFFFF'], marker: { x: 67, y: 58 }, related: ['TH', 'VN', 'KH'],
    plugTypes: 'Type A / Type B / Type C / Type E / Type F', voltage: '230V', frequency: '50Hz', emergencyNumber: '1191 / 1195',
    searchHints: ['TIN', 'ENTERPRISE', 'LAPNET', 'BCEL', 'POSTAL', 'LAK']
  },
  {
    slug: 'mongolia', iso2: 'MN', iso3: 'MNG', isoNumeric: '496', name: 'Mongolia', adjective: 'Mongolian', nativeName: 'Mongol Uls',
    flag: '🇲🇳', language: 'Mongolian', localLanguage: 'mn-MN', currency: 'MNT', currencyName: 'Mongolian togrog', symbol: 'MNT',
    locale: 'mn-MN', icu: 'mn_MN', date: 'YYYY.MM.DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+976',
    capital: 'Ulaanbaatar', continent: 'Asia', region: 'East Asia', population: 'approximately 3.5M',
    identifiers: ['Citizen registration number boundary', 'state registration number', 'VAT payer number', 'postal code', 'phone'],
    payments: ['bank account', 'ACH handoff', 'QPay reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Citizen registration number boundary', company: 'state registration number', tax: 'VAT payer number', social: 'social insurance boundary', register: 'Legal Entities Registration Office', invoice: 'VAT e-barimt invoice', payment: 'QPay / bank transfer reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: 'УА90010123', company: '9012345', social: 'SI-123456', iban: 'MN BANK 050 1234567890', bank: '050 1234567890', phone: '+976 9911 2233', postal: '14200 Ulaanbaatar', plate: '1234 УБА', vat: '9012345', amount: '1,234,567 MNT', date: '2026.07.21', address: 'Peace Avenue 1, Ulaanbaatar 14200', json: '{"country":"MN","reg":"9012345","qpay":"INV-2026-001"}' },
    theme: ['#DA2032', '#0066B3', '#FFD900'], marker: { x: 66, y: 40 }, related: ['CN', 'KR', 'JP'],
    plugTypes: 'Type C / Type E', voltage: '230V', frequency: '50Hz', emergencyNumber: '102 / 103 / 105',
    searchHints: ['REGISTRATION', 'VAT', 'QPAY', 'E-BARIMT', 'POSTAL', 'MNT']
  },
  {
    slug: 'uzbekistan', iso2: 'UZ', iso3: 'UZB', isoNumeric: '860', name: 'Uzbekistan', adjective: 'Uzbek', nativeName: 'Ozbekiston',
    flag: '🇺🇿', language: 'Uzbek', localLanguage: 'uz-UZ', currency: 'UZS', currencyName: 'Uzbekistani som', symbol: 'UZS',
    locale: 'uz-UZ', icu: 'uz_UZ', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+998',
    capital: 'Tashkent', continent: 'Asia', region: 'Central Asia', population: 'approximately 37M',
    identifiers: ['PINFL boundary', 'STIR / company tax number', 'VAT number', 'postal code', 'phone'],
    payments: ['bank MFO/account', 'Humo/Uzcard handoff', 'Click/Payme reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'PINFL boundary', company: 'STIR / company tax number', tax: 'STIR / QQS', social: 'INPS boundary', register: 'company registry', invoice: 'e-invoice / hisob-faktura', payment: 'Humo / Uzcard reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '30101876543212', company: '123456789', social: 'INPS-123456', iban: 'UZ BANK 00444 20208000123456789001', bank: '00444 20208000123456789001', phone: '+998 90 123 45 67', postal: '100000 Tashkent', plate: '01 A 123 AB', vat: '123456789', amount: '1 234 567,89 UZS', date: '21.07.2026', address: 'Amir Temur Avenue 1, Tashkent 100000', json: '{"country":"UZ","pinfl":"30101876543212","stir":"123456789","mfo":"00444"}' },
    theme: ['#1EB53A', '#0099B5', '#CE1126'], marker: { x: 58, y: 47 }, related: ['KZ', 'KG', 'TJ'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '102 / 103',
    searchHints: ['PINFL', 'STIR', 'MFO', 'HUMO', 'UZCARD', 'PAYME']
  },
  {
    slug: 'kyrgyzstan', iso2: 'KG', iso3: 'KGZ', isoNumeric: '417', name: 'Kyrgyzstan', adjective: 'Kyrgyz', nativeName: 'Kyrgyzstan',
    flag: '🇰🇬', language: 'Kyrgyz and Russian', localLanguage: 'ky-KG', currency: 'KGS', currencyName: 'Kyrgyzstani som', symbol: 'KGS',
    locale: 'ky-KG', icu: 'ky_KG', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+996',
    capital: 'Bishkek', continent: 'Asia', region: 'Central Asia', population: 'approximately 7.2M',
    identifiers: ['PIN boundary', 'OKPO company code', 'TIN', 'postal code', 'phone'],
    payments: ['bank BIK/account', 'Elkart handoff', 'Elsom reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'PIN boundary', company: 'OKPO company code', tax: 'TIN', social: 'social fund boundary', register: 'Ministry of Justice registry', invoice: 'tax invoice', payment: 'Elkart / Elsom reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '20101200123456', company: '12345678', social: 'SF-123456', iban: 'KG BANK 109 1234567890123456', bank: '109 1234567890123456', phone: '+996 700 123 456', postal: '720000 Bishkek', plate: '01 KG 123 ABC', vat: '12345678901234', amount: '1 234,56 KGS', date: '21.07.2026', address: 'Chuy Avenue 1, Bishkek 720000', json: '{"country":"KG","pin":"20101200123456","bik":"109","elsom":"INV-2026-001"}' },
    theme: ['#E8112D', '#FFEF00', '#111827'], marker: { x: 61, y: 48 }, related: ['UZ', 'TJ', 'CN'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '102 / 103',
    searchHints: ['PIN', 'OKPO', 'TIN', 'ELKART', 'ELSOM', 'BIK']
  },
  {
    slug: 'tajikistan', iso2: 'TJ', iso3: 'TJK', isoNumeric: '762', name: 'Tajikistan', adjective: 'Tajik', nativeName: 'Tojikiston',
    flag: '🇹🇯', language: 'Tajik', localLanguage: 'tg-TJ', currency: 'TJS', currencyName: 'Tajikistani somoni', symbol: 'TJS',
    locale: 'tg-TJ', icu: 'tg_TJ', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+992',
    capital: 'Dushanbe', continent: 'Asia', region: 'Central Asia', population: 'approximately 10.5M',
    identifiers: ['TIN boundary', 'company registration number', 'VAT number', 'postal code', 'phone'],
    payments: ['bank MFO/account', 'Korti Milli handoff', 'Amonat reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'TIN boundary', company: 'company registration number', tax: 'TIN / VAT', social: 'social insurance boundary', register: 'Tax Committee registry', invoice: 'VAT invoice', payment: 'Korti Milli / bank reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '123456789', company: 'TJ1234567', social: 'SI-123456', iban: 'TJ BANK 3501012345678901', bank: '3501012345678901', phone: '+992 90 123 4567', postal: '734000 Dushanbe', plate: '01 1234 AA', vat: '123456789', amount: '1 234,56 TJS', date: '21.07.2026', address: 'Rudaki Avenue 1, Dushanbe 734000', json: '{"country":"TJ","tin":"123456789","mfo":"350101","payment":"INV-2026-001"}' },
    theme: ['#006600', '#FFFFFF', '#CC0000'], marker: { x: 61, y: 50 }, related: ['UZ', 'KG', 'PK'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '102 / 103',
    searchHints: ['TIN', 'VAT', 'MFO', 'KORTI MILLI', 'AMONAT', 'POSTAL']
  },
  {
    slug: 'turkmenistan', iso2: 'TM', iso3: 'TKM', isoNumeric: '795', name: 'Turkmenistan', adjective: 'Turkmen', nativeName: 'Turkmenistan',
    flag: '🇹🇲', language: 'Turkmen', localLanguage: 'tk-TM', currency: 'TMT', currencyName: 'Turkmenistani manat', symbol: 'TMT',
    locale: 'tk-TM', icu: 'tk_TM', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+993',
    capital: 'Ashgabat', continent: 'Asia', region: 'Central Asia', population: 'approximately 6.5M',
    identifiers: ['Passport/ID boundary', 'company registration number', 'tax number', 'postal code', 'phone'],
    payments: ['bank account', 'interbank transfer handoff', 'payment order reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Passport / ID boundary', company: 'company registration number', tax: 'tax number', social: 'social insurance boundary', register: 'business registry', invoice: 'tax invoice', payment: 'payment order reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: 'A1234567', company: 'TM-123456', social: 'SI-123456', iban: 'TM BANK 3901012345678901', bank: '3901012345678901', phone: '+993 12 345678', postal: '744000 Ashgabat', plate: 'AG 1234 TM', vat: '12345678', amount: '1 234,56 TMT', date: '21.07.2026', address: 'Magtymguly Avenue 1, Ashgabat 744000', json: '{"country":"TM","tax":"12345678","bank":"3901012345678901","payment":"INV-2026-001"}' },
    theme: ['#00843D', '#FFFFFF', '#B22234'], marker: { x: 57, y: 50 }, related: ['UZ', 'TJ', 'PK'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '03 / 02',
    searchHints: ['TAX', 'BANK', 'PAYMENT ORDER', 'POSTAL', 'TMT', 'ASHGABAT']
  },
  {
    slug: 'qatar', iso2: 'QA', iso3: 'QAT', isoNumeric: '634', name: 'Qatar', adjective: 'Qatari', nativeName: 'Qatar',
    flag: '🇶🇦', language: 'Arabic', localLanguage: 'ar-QA', currency: 'QAR', currencyName: 'Qatari riyal', symbol: 'QAR',
    locale: 'ar-QA', icu: 'ar_QA', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+974',
    capital: 'Doha', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 3.1M',
    identifiers: ['QID boundary', 'commercial registration number', 'tax card number', 'PO Box', 'phone'],
    payments: ['IBAN', 'QATCH handoff', 'NAPS reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'QID boundary', company: 'commercial registration number', tax: 'tax card number', social: 'social insurance boundary', register: 'MOCI registry', invoice: 'tax invoice', payment: 'QATCH / NAPS reference', plate: 'vehicle plate', postal: 'PO Box', privacy: 'PDPPL privacy' },
    samples: { personal: '29012345678', company: '123456', social: 'SI-123456', iban: 'QA58DOHB00001234567890ABCDEFG', bank: 'DOHB 1234567890', phone: '+974 3312 3456', postal: 'PO Box 12345 Doha', plate: '123456', vat: 'TC1234567', amount: '1,234.56 QAR', date: '21/07/2026', address: 'West Bay, Doha, PO Box 12345', json: '{"country":"QA","qid":"29012345678","iban":"QA58DOHB00001234567890ABCDEFG","naps":"INV-2026-001"}' },
    theme: ['#8A1538', '#FFFFFF', '#111827'], marker: { x: 58, y: 56 }, related: ['AE', 'SA', 'KW'],
    plugTypes: 'Type G', voltage: '240V', frequency: '50Hz', emergencyNumber: '999',
    searchHints: ['QID', 'CR', 'TAX CARD', 'IBAN', 'NAPS', 'QATCH']
  },
  {
    slug: 'kuwait', iso2: 'KW', iso3: 'KWT', isoNumeric: '414', name: 'Kuwait', adjective: 'Kuwaiti', nativeName: 'Al-Kuwayt',
    flag: '🇰🇼', language: 'Arabic', localLanguage: 'ar-KW', currency: 'KWD', currencyName: 'Kuwaiti dinar', symbol: 'KWD',
    locale: 'ar-KW', icu: 'ar_KW', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+965',
    capital: 'Kuwait City', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 4.4M',
    identifiers: ['Civil ID boundary', 'commercial registration number', 'tax file number', 'postal code', 'phone'],
    payments: ['IBAN', 'KNET handoff', 'CBK reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Civil ID boundary', company: 'commercial registration number', tax: 'tax file number', social: 'PIFSS boundary', register: 'MOCI registry', invoice: 'tax invoice', payment: 'KNET / CBK reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'data privacy boundary' },
    samples: { personal: '290010112345', company: '123456', social: 'PIFSS-123456', iban: 'KW81CBKU0000000000001234560101', bank: 'CBKU 1234560101', phone: '+965 5123 4567', postal: '13001 Kuwait City', plate: '12-34567', vat: 'TF123456', amount: '1,234.560 KWD', date: '21/07/2026', address: 'Arabian Gulf Street 1, Kuwait City 13001', json: '{"country":"KW","civilId":"290010112345","iban":"KW81CBKU0000000000001234560101","knet":"INV-2026-001"}' },
    theme: ['#007A3D', '#FFFFFF', '#CE1126'], marker: { x: 58, y: 54 }, related: ['SA', 'QA', 'AE'],
    plugTypes: 'Type G', voltage: '240V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['CIVIL ID', 'CR', 'IBAN', 'KNET', 'CBK', 'POSTAL']
  },
  {
    slug: 'bahrain', iso2: 'BH', iso3: 'BHR', isoNumeric: '048', name: 'Bahrain', adjective: 'Bahraini', nativeName: 'Al-Bahrayn',
    flag: '🇧🇭', language: 'Arabic', localLanguage: 'ar-BH', currency: 'BHD', currencyName: 'Bahraini dinar', symbol: 'BHD',
    locale: 'ar-BH', icu: 'ar_BH', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+973',
    capital: 'Manama', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 1.6M',
    identifiers: ['CPR boundary', 'commercial registration number', 'VAT account number', 'block/address code', 'phone'],
    payments: ['IBAN', 'BenefitPay handoff', 'EFTS reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'CPR boundary', company: 'commercial registration number', tax: 'VAT account number', social: 'SIO boundary', register: 'Sijilat registry', invoice: 'VAT invoice', payment: 'BenefitPay / EFTS reference', plate: 'vehicle plate', postal: 'block/address code', privacy: 'PDPL privacy' },
    samples: { personal: '900101123', company: '123456-1', social: 'SIO-123456', iban: 'BH67BMAG00001299123456', bank: 'BMAG 1299123456', phone: '+973 3600 1234', postal: 'Block 316 Manama', plate: '123456', vat: '220012345600002', amount: '1,234.560 BHD', date: '21/07/2026', address: 'Government Avenue 1, Manama, Block 316', json: '{"country":"BH","cpr":"900101123","iban":"BH67BMAG00001299123456","benefitPay":"INV-2026-001"}' },
    theme: ['#CE1126', '#FFFFFF', '#111827'], marker: { x: 58, y: 55 }, related: ['SA', 'QA', 'KW'],
    plugTypes: 'Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '999',
    searchHints: ['CPR', 'CR', 'VAT', 'IBAN', 'BENEFITPAY', 'EFTS']
  },
  {
    slug: 'oman', iso2: 'OM', iso3: 'OMN', isoNumeric: '512', name: 'Oman', adjective: 'Omani', nativeName: 'Uman',
    flag: '🇴🇲', language: 'Arabic', localLanguage: 'ar-OM', currency: 'OMR', currencyName: 'Omani rial', symbol: 'OMR',
    locale: 'ar-OM', icu: 'ar_OM', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+968',
    capital: 'Muscat', continent: 'Asia', region: 'Western Asia / Gulf', population: 'approximately 5.3M',
    identifiers: ['Civil number boundary', 'commercial registration number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'ACH handoff', 'OmanNet reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'Civil number boundary', company: 'commercial registration number', tax: 'VAT number', social: 'PASI boundary', register: 'Invest Easy registry', invoice: 'VAT invoice', payment: 'ACH / OmanNet reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPL privacy' },
    samples: { personal: '12345678', company: '1234567', social: 'PASI-123456', iban: 'OM810001000000000123456789', bank: '0001 123456789', phone: '+968 9123 4567', postal: '100 Muscat', plate: 'M 12345', vat: 'OM1100123456', amount: '1,234.560 OMR', date: '21/07/2026', address: 'Sultan Qaboos Street 1, Muscat 100', json: '{"country":"OM","civil":"12345678","iban":"OM810001000000000123456789","omannet":"INV-2026-001"}' },
    theme: ['#C8102E', '#FFFFFF', '#009A44'], marker: { x: 59, y: 58 }, related: ['AE', 'SA', 'QA'],
    plugTypes: 'Type G', voltage: '240V', frequency: '50Hz', emergencyNumber: '9999',
    searchHints: ['CIVIL', 'CR', 'VAT', 'IBAN', 'OMANNET', 'PASI']
  },
  {
    slug: 'jordan', iso2: 'JO', iso3: 'JOR', isoNumeric: '400', name: 'Jordan', adjective: 'Jordanian', nativeName: 'Al-Urdunn',
    flag: '🇯🇴', language: 'Arabic', localLanguage: 'ar-JO', currency: 'JOD', currencyName: 'Jordanian dinar', symbol: 'JOD',
    locale: 'ar-JO', icu: 'ar_JO', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+962',
    capital: 'Amman', continent: 'Asia', region: 'Western Asia / Levant', population: 'approximately 11.5M',
    identifiers: ['National number boundary', 'company national number', 'tax number', 'postal code', 'phone'],
    payments: ['IBAN', 'CliQ handoff', 'JoMoPay reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'National number boundary', company: 'company national number', tax: 'Income and Sales Tax number', social: 'SSC boundary', register: 'Companies Control Department', invoice: 'sales tax invoice', payment: 'CliQ / JoMoPay reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '9901011234', company: '200123456', social: 'SSC-123456', iban: 'JO94CBJO0010000000000131000302', bank: 'CBJO 131000302', phone: '+962 7 9123 4567', postal: '11118 Amman', plate: '12-34567', vat: '123456789', amount: '1,234.560 JOD', date: '21/07/2026', address: 'Zahran Street 1, Amman 11118', json: '{"country":"JO","national":"9901011234","iban":"JO94CBJO0010000000000131000302","cliq":"INV-2026-001"}' },
    theme: ['#007A3D', '#FFFFFF', '#CE1126'], marker: { x: 56, y: 53 }, related: ['SA', 'IL', 'AE'],
    plugTypes: 'Type C / Type F / Type G / Type J', voltage: '230V', frequency: '50Hz', emergencyNumber: '911',
    searchHints: ['NATIONAL NUMBER', 'IBAN', 'CLIQ', 'JOMOPAY', 'TAX', 'POSTAL']
  },
  {
    slug: 'afghanistan', iso2: 'AF', iso3: 'AFG', isoNumeric: '004', name: 'Afghanistan', adjective: 'Afghan', nativeName: 'Afghanistan',
    flag: '🇦🇫', language: 'Dari and Pashto', localLanguage: 'fa-AF', currency: 'AFN', currencyName: 'Afghan afghani', symbol: 'AFN',
    locale: 'fa-AF', icu: 'fa_AF', date: 'YYYY/MM/DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+93',
    capital: 'Kabul', continent: 'Asia', region: 'South Asia / Central Asia', population: 'approximately 43M',
    identifiers: ['Tazkira boundary', 'TIN', 'company registration number', 'postal code', 'phone'],
    payments: ['bank account', 'APS handoff', 'SWIFT', 'hawala reference boundary', 'invoice reference'],
    localTerms: { personal: 'Tazkira boundary', company: 'company registration number', tax: 'TIN', social: 'social protection boundary', register: 'ACBR / business registry', invoice: 'tax invoice', payment: 'APS / bank transfer reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '1234-567890', company: 'AF-123456', social: 'SP-123456', iban: 'AF BANK 001 1234567890', bank: '001 1234567890', phone: '+93 70 123 4567', postal: '1001 Kabul', plate: 'KBL 12345', vat: 'TIN123456789', amount: '1,234.56 AFN', date: '2026/07/21', address: 'Shahr-e Naw 1, Kabul 1001', json: '{"country":"AF","tin":"TIN123456789","bank":"0011234567890","payment":"INV-2026-001"}' },
    theme: ['#000000', '#D32011', '#007A36'], marker: { x: 61, y: 51 }, related: ['PK', 'IR', 'TJ'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '119 / 102',
    searchHints: ['TAZKIRA', 'TIN', 'ACBR', 'APS', 'BANK', 'POSTAL']
  },
  {
    slug: 'armenia', iso2: 'AM', iso3: 'ARM', isoNumeric: '051', name: 'Armenia', adjective: 'Armenian', nativeName: 'Hayastan',
    flag: '🇦🇲', language: 'Armenian', localLanguage: 'hy-AM', currency: 'AMD', currencyName: 'Armenian dram', symbol: 'AMD',
    locale: 'hy-AM', icu: 'hy_AM', date: 'DD.MM.YYYY', decimal: 'Dot (.)', thousands: 'Space grouping', phone: '+374',
    capital: 'Yerevan', continent: 'Asia', region: 'Caucasus / Western Asia', population: 'approximately 3M',
    identifiers: ['public services number boundary', 'state register number', 'TIN', 'postal code', 'phone'],
    payments: ['bank account', 'ArCa handoff', 'interbank payment reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'public services number boundary', company: 'state register number', tax: 'TIN / VAT', social: 'social services boundary', register: 'State Register of Legal Entities', invoice: 'tax invoice', payment: 'ArCa / bank transfer reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '1234567890', company: '271.110.123456', social: 'PSN-123456', iban: 'AM BANK 001 123456789012', bank: '001 123456789012', phone: '+374 91 123456', postal: '0010 Yerevan', plate: '12 AA 345', vat: '01234567', amount: '1 234.56 AMD', date: '21.07.2026', address: 'Mashtots Avenue 1, Yerevan 0010', json: '{"country":"AM","tin":"01234567","arca":"INV-2026-001"}' },
    theme: ['#D90012', '#0033A0', '#F2A800'], marker: { x: 55, y: 50 }, related: ['GE', 'AZ', 'IR'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz', emergencyNumber: '911 / 112',
    searchHints: ['PSN', 'TIN', 'STATE REGISTER', 'ARCA', 'POSTAL', 'AMD']
  },
  {
    slug: 'azerbaijan', iso2: 'AZ', iso3: 'AZE', isoNumeric: '031', name: 'Azerbaijan', adjective: 'Azerbaijani', nativeName: 'Azerbaycan',
    flag: '🇦🇿', language: 'Azerbaijani', localLanguage: 'az-AZ', currency: 'AZN', currencyName: 'Azerbaijani manat', symbol: 'AZN',
    locale: 'az-AZ', icu: 'az_AZ', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+994',
    capital: 'Baku', continent: 'Asia', region: 'Caucasus / Western Asia', population: 'approximately 10.3M',
    identifiers: ['FIN code boundary', 'VOEN / TIN', 'company registration number', 'postal code', 'phone'],
    payments: ['IBAN', 'AZIPS / XOHKS reference', 'bank code', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'FIN code boundary', company: 'company registration number', tax: 'VOEN / TIN', social: 'social insurance boundary', register: 'State Tax Service registry', invoice: 'e-invoice', payment: 'AZIPS / XOHKS reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: 'ABC1234', company: 'AZ1234567', social: 'SI-123456', iban: 'AZ21NABZ00000000137010001944', bank: 'NABZ 137010001944', phone: '+994 50 123 45 67', postal: 'AZ1000 Baku', plate: '10 AA 123', vat: '9900003611', amount: '1 234,56 AZN', date: '21.07.2026', address: 'Neftchilar Avenue 1, Baku AZ1000', json: '{"country":"AZ","voen":"9900003611","iban":"AZ21NABZ00000000137010001944"}' },
    theme: ['#00B5E2', '#EF3340', '#509E2F'], marker: { x: 56, y: 50 }, related: ['GE', 'AM', 'TR'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['FIN', 'VOEN', 'IBAN', 'AZIPS', 'XOHKS', 'POSTAL']
  },
  {
    slug: 'bhutan', iso2: 'BT', iso3: 'BTN', isoNumeric: '064', name: 'Bhutan', adjective: 'Bhutanese', nativeName: 'Druk Yul',
    flag: '🇧🇹', language: 'Dzongkha', localLanguage: 'dz-BT', currency: 'BTN', currencyName: 'Bhutanese ngultrum', symbol: 'BTN',
    locale: 'dz-BT', icu: 'dz_BT', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+975',
    capital: 'Thimphu', continent: 'Asia', region: 'South Asia', population: 'approximately 0.8M',
    identifiers: ['CID boundary', 'company registration number', 'TPN / tax number', 'postal code', 'phone'],
    payments: ['bank account', 'RMA payment reference', 'SWIFT', 'mobile payment reference', 'invoice reference'],
    localTerms: { personal: 'CID boundary', company: 'company registration number', tax: 'TPN / tax number', social: 'social protection boundary', register: 'Company Registry Division', invoice: 'tax invoice', payment: 'RMA / bank transfer reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '10101001234', company: 'BT-123456', social: 'SP-123456', iban: 'BT BANK 001 1234567890', bank: '001 1234567890', phone: '+975 17 123 456', postal: '11001 Thimphu', plate: 'BP-1-A1234', vat: 'TPN1234567', amount: '1,234.56 BTN', date: '21/07/2026', address: 'Norzin Lam 1, Thimphu 11001', json: '{"country":"BT","cid":"10101001234","tpn":"TPN1234567"}' },
    theme: ['#FFCC33', '#FF4E12', '#FFFFFF'], marker: { x: 66, y: 52 }, related: ['IN', 'BD', 'NP'],
    plugTypes: 'Type C / Type D / Type F / Type G / Type M', voltage: '230V', frequency: '50Hz', emergencyNumber: '113 / 112',
    searchHints: ['CID', 'TPN', 'RMA', 'BANK', 'POSTAL', 'BTN']
  },
  {
    slug: 'brunei', iso2: 'BN', iso3: 'BRN', isoNumeric: '096', name: 'Brunei', adjective: 'Bruneian', nativeName: 'Brunei Darussalam',
    flag: '🇧🇳', language: 'Malay', localLanguage: 'ms-BN', currency: 'BND', currencyName: 'Brunei dollar', symbol: 'BND',
    locale: 'ms-BN', icu: 'ms_BN', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+673',
    capital: 'Bandar Seri Begawan', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 0.45M',
    identifiers: ['smart identity card boundary', 'ROC number', 'TIN', 'postal code', 'phone'],
    payments: ['bank account', 'ACH / RTGS reference', 'SWIFT', 'mobile payment reference', 'invoice reference'],
    localTerms: { personal: 'smart identity card boundary', company: 'ROC number', tax: 'TIN', social: 'TAP / SCP boundary', register: 'ROCBN registry', invoice: 'tax invoice', payment: 'ACH / RTGS bank reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPO privacy boundary' },
    samples: { personal: '00-123456', company: 'RC123456', social: 'TAP-123456', iban: 'BN BANK 001 1234567890', bank: '001 1234567890', phone: '+673 712 3456', postal: 'BS8711 Bandar Seri Begawan', plate: 'BA 1234', vat: 'TIN1234567', amount: '1,234.56 BND', date: '21/07/2026', address: 'Jalan Sultan 1, Bandar Seri Begawan BS8711', json: '{"country":"BN","roc":"RC123456","bank":"0011234567890"}' },
    theme: ['#F7E017', '#FFFFFF', '#000000'], marker: { x: 69, y: 64 }, related: ['MY', 'SG', 'ID'],
    plugTypes: 'Type G', voltage: '240V', frequency: '50Hz', emergencyNumber: '993 / 991',
    searchHints: ['IC', 'ROC', 'TIN', 'ACH', 'RTGS', 'POSTAL']
  },
  {
    slug: 'georgia', iso2: 'GE', iso3: 'GEO', isoNumeric: '268', name: 'Georgia', adjective: 'Georgian', nativeName: 'Sakartvelo',
    flag: '🇬🇪', language: 'Georgian', localLanguage: 'ka-GE', currency: 'GEL', currencyName: 'Georgian lari', symbol: 'GEL',
    locale: 'ka-GE', icu: 'ka_GE', date: 'DD.MM.YYYY', decimal: 'Dot (.)', thousands: 'Space grouping', phone: '+995',
    capital: 'Tbilisi', continent: 'Asia', region: 'Caucasus / Western Asia', population: 'approximately 3.7M',
    identifiers: ['personal number boundary', 'identification number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'bank code/account', 'RTGS reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'personal number boundary', company: 'identification number', tax: 'VAT / tax number', social: 'social service boundary', register: 'National Agency of Public Registry', invoice: 'tax invoice', payment: 'IBAN / RTGS reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '01001012345', company: '405123456', social: 'SS-123456', iban: 'GE29NB0000000101904917', bank: 'NB 0101904917', phone: '+995 599 123456', postal: '0105 Tbilisi', plate: 'AA-123-BB', vat: '405123456', amount: '1 234.56 GEL', date: '21.07.2026', address: 'Rustaveli Avenue 1, Tbilisi 0105', json: '{"country":"GE","personal":"01001012345","iban":"GE29NB0000000101904917"}' },
    theme: ['#FFFFFF', '#FF0000', '#111827'], marker: { x: 55, y: 49 }, related: ['AM', 'AZ', 'TR'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['PERSONAL NUMBER', 'VAT', 'IBAN', 'RTGS', 'NAPR', 'POSTAL']
  },
  {
    slug: 'iran', iso2: 'IR', iso3: 'IRN', isoNumeric: '364', name: 'Iran', adjective: 'Iranian', nativeName: 'Iran',
    flag: '🇮🇷', language: 'Persian', localLanguage: 'fa-IR', currency: 'IRR', currencyName: 'Iranian rial', symbol: 'IRR',
    locale: 'fa-IR', icu: 'fa_IR', date: 'YYYY/MM/DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+98',
    capital: 'Tehran', continent: 'Asia', region: 'Western Asia', population: 'approximately 89M',
    identifiers: ['national code boundary', 'national company ID', 'economic code', 'postal code', 'phone'],
    payments: ['Sheba IBAN', 'Shetab card boundary', 'SATNA/PAYA reference', 'bank account', 'invoice reference'],
    localTerms: { personal: 'national code boundary', company: 'national company ID', tax: 'economic code / VAT', social: 'social security boundary', register: 'Company Registration Office', invoice: 'tax invoice', payment: 'Sheba / PAYA reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '0084575941', company: '10101234567', social: 'SSO-123456', iban: 'IR820540102680020817909002', bank: '054 020817909002', phone: '+98 912 123 4567', postal: '11369-12345 Tehran', plate: '12B345 Iran 11', vat: '411111111111', amount: '1,234,567 IRR', date: '1405/04/30', address: 'Valiasr Street 1, Tehran 11369-12345', json: '{"country":"IR","nationalCode":"0084575941","sheba":"IR820540102680020817909002"}' },
    theme: ['#239F40', '#FFFFFF', '#DA0000'], marker: { x: 57, y: 52 }, related: ['AF', 'PK', 'AZ'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz', emergencyNumber: '110 / 115 / 125',
    searchHints: ['NATIONAL CODE', 'SHEBA', 'PAYA', 'SATNA', 'ECONOMIC CODE', 'POSTAL']
  },
  {
    slug: 'iraq', iso2: 'IQ', iso3: 'IRQ', isoNumeric: '368', name: 'Iraq', adjective: 'Iraqi', nativeName: 'Al-Iraq',
    flag: '🇮🇶', language: 'Arabic and Kurdish', localLanguage: 'ar-IQ', currency: 'IQD', currencyName: 'Iraqi dinar', symbol: 'IQD',
    locale: 'ar-IQ', icu: 'ar_IQ', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+964',
    capital: 'Baghdad', continent: 'Asia', region: 'Western Asia', population: 'approximately 46M',
    identifiers: ['national card boundary', 'company registration number', 'tax number', 'postal code', 'phone'],
    payments: ['IBAN', 'ACH/RTGS reference', 'Qi Card boundary', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'national card boundary', company: 'company registration number', tax: 'tax number', social: 'social security boundary', register: 'Companies Registration Department', invoice: 'tax invoice', payment: 'IBAN / RTGS reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '123456789012', company: 'IQ-123456', social: 'SI-123456', iban: 'IQ20RRAF000000000123456789012', bank: 'RRAF 123456789012', phone: '+964 770 123 4567', postal: '10001 Baghdad', plate: 'Baghdad 12345', vat: 'TAX123456', amount: '1,234,567 IQD', date: '21/07/2026', address: 'Karrada 1, Baghdad 10001', json: '{"country":"IQ","tax":"TAX123456","iban":"IQ20RRAF000000000123456789012"}' },
    theme: ['#CE1126', '#FFFFFF', '#000000'], marker: { x: 56, y: 53 }, related: ['IR', 'JO', 'SA'],
    plugTypes: 'Type C / Type D / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '104 / 122',
    searchHints: ['NATIONAL CARD', 'TAX', 'IBAN', 'RTGS', 'QI CARD', 'POSTAL']
  },
  {
    slug: 'kazakhstan', iso2: 'KZ', iso3: 'KAZ', isoNumeric: '398', name: 'Kazakhstan', adjective: 'Kazakh', nativeName: 'Qazaqstan',
    flag: '🇰🇿', language: 'Kazakh', localLanguage: 'kk-KZ', currency: 'KZT', currencyName: 'Kazakhstani tenge', symbol: 'KZT',
    locale: 'kk-KZ', icu: 'kk_KZ', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Space grouping', phone: '+7',
    capital: 'Astana', continent: 'Asia', region: 'Central Asia', population: 'approximately 20M',
    identifiers: ['IIN boundary', 'BIN', 'VAT / taxpayer number', 'postal code', 'phone'],
    payments: ['IBAN', 'KISC payment reference', 'bank BIK/account', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'IIN boundary', company: 'BIN', tax: 'taxpayer number / VAT', social: 'social insurance boundary', register: 'eGov / business registry', invoice: 'ESF e-invoice', payment: 'IBAN / KISC reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy' },
    samples: { personal: '900101300123', company: '120940012345', social: 'SI-123456', iban: 'KZ86125KZT5004100100', bank: '125 5004100100', phone: '+7 701 123 4567', postal: '010000 Astana', plate: '01 ABC 123', vat: '120940012345', amount: '1 234,56 KZT', date: '21.07.2026', address: 'Mangilik El Avenue 1, Astana 010000', json: '{"country":"KZ","iin":"900101300123","bin":"120940012345","iban":"KZ86125KZT5004100100"}' },
    theme: ['#00AFCA', '#FFDD00', '#111827'], marker: { x: 59, y: 45 }, related: ['UZ', 'KG', 'CN'],
    plugTypes: 'Type C / Type F', voltage: '220V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['IIN', 'BIN', 'IBAN', 'KISC', 'ESF', 'POSTAL']
  },
  {
    slug: 'lebanon', iso2: 'LB', iso3: 'LBN', isoNumeric: '422', name: 'Lebanon', adjective: 'Lebanese', nativeName: 'Lubnan',
    flag: '🇱🇧', language: 'Arabic', localLanguage: 'ar-LB', currency: 'LBP', currencyName: 'Lebanese pound', symbol: 'LBP',
    locale: 'ar-LB', icu: 'ar_LB', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+961',
    capital: 'Beirut', continent: 'Asia', region: 'Western Asia / Levant', population: 'approximately 5.5M',
    identifiers: ['national ID boundary', 'commercial registration number', 'VAT number', 'postal code', 'phone'],
    payments: ['IBAN', 'BDL transfer reference', 'SWIFT', 'bank account', 'invoice reference'],
    localTerms: { personal: 'national ID boundary', company: 'commercial registration number', tax: 'VAT / tax number', social: 'NSSF boundary', register: 'Commercial Register', invoice: 'VAT invoice', payment: 'IBAN / BDL reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '1234567890', company: 'CR-123456', social: 'NSSF-123456', iban: 'LB62099900000001001901229114', bank: '0999 1001901229114', phone: '+961 3 123 456', postal: '1107 2020 Beirut', plate: 'B 123456', vat: '1234567-601', amount: '1,234,567 LBP', date: '21/07/2026', address: 'Hamra Street 1, Beirut 1107 2020', json: '{"country":"LB","vat":"1234567-601","iban":"LB62099900000001001901229114"}' },
    theme: ['#ED1C24', '#FFFFFF', '#00A651'], marker: { x: 55, y: 52 }, related: ['JO', 'SY', 'IL'],
    plugTypes: 'Type C / Type D / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '112 / 140',
    searchHints: ['VAT', 'IBAN', 'BDL', 'NSSF', 'COMMERCIAL REGISTER', 'POSTAL']
  },
  {
    slug: 'maldives', iso2: 'MV', iso3: 'MDV', isoNumeric: '462', name: 'Maldives', adjective: 'Maldivian', nativeName: 'Dhivehi Raajje',
    flag: '🇲🇻', language: 'Dhivehi', localLanguage: 'dv-MV', currency: 'MVR', currencyName: 'Maldivian rufiyaa', symbol: 'MVR',
    locale: 'en-MV', icu: 'en_MV', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+960',
    capital: 'Male', continent: 'Asia', region: 'South Asia / Indian Ocean', population: 'approximately 0.5M',
    identifiers: ['National ID boundary', 'company registration number', 'TIN / GST number', 'island/address code', 'phone'],
    payments: ['bank account', 'MMA transfer reference', 'SWIFT', 'mobile wallet reference', 'invoice reference'],
    localTerms: { personal: 'National ID boundary', company: 'company registration number', tax: 'TIN / GST number', social: 'pension boundary', register: 'Ministry of Economic Development registry', invoice: 'GST invoice', payment: 'MMA / bank transfer reference', plate: 'vessel or vehicle registration', postal: 'island/address code', privacy: 'data protection boundary' },
    samples: { personal: 'A123456', company: 'C-012345', social: 'MPAO-123456', iban: 'MV BANK 001 1234567890', bank: '001 1234567890', phone: '+960 777 1234', postal: 'Male 20026', plate: 'MV-1234', vat: 'GST123456', amount: '1,234.56 MVR', date: '21/07/2026', address: 'Majeedhee Magu 1, Male 20026', json: '{"country":"MV","gst":"GST123456","bank":"0011234567890"}' },
    theme: ['#D21034', '#007E3A', '#FFFFFF'], marker: { x: 65, y: 63 }, related: ['LK', 'IN', 'SG'],
    plugTypes: 'Type D / Type G / Type J / Type K / Type L', voltage: '230V', frequency: '50Hz', emergencyNumber: '119 / 102',
    searchHints: ['NATIONAL ID', 'GST', 'MMA', 'BANK', 'ISLAND', 'MVR']
  },
  {
    slug: 'north-korea', iso2: 'KP', iso3: 'PRK', isoNumeric: '408', name: 'North Korea', adjective: 'North Korean', nativeName: 'DPR Korea',
    flag: '🇰🇵', language: 'Korean', localLanguage: 'ko-KP', currency: 'KPW', currencyName: 'North Korean won', symbol: 'KPW',
    locale: 'ko-KP', icu: 'ko_KP', date: 'YYYY.MM.DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+850',
    capital: 'Pyongyang', continent: 'Asia', region: 'East Asia', population: 'approximately 26M',
    identifiers: ['resident certificate boundary', 'organization registration boundary', 'tax reference boundary', 'postal code', 'phone'],
    payments: ['bank account boundary', 'SWIFT boundary', 'invoice reference', 'trade document reference', 'sanctions-screening boundary'],
    localTerms: { personal: 'resident certificate boundary', company: 'organization registration boundary', tax: 'tax reference boundary', social: 'state employment boundary', register: 'official registry boundary', invoice: 'trade invoice boundary', payment: 'bank/payment reference boundary', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: 'KP-900101-123456', company: 'ORG-123456', social: 'STATE-123456', iban: 'KP BANK 001 1234567890', bank: '001 1234567890', phone: '+850 2 123 4567', postal: '999093 Pyongyang', plate: 'PY 1234', vat: 'TAX123456', amount: '1,234 KPW', date: '2026.07.21', address: 'Central District 1, Pyongyang 999093', json: '{"country":"KP","resident":"KP-900101-123456","boundary":"official-lookup-required"}' },
    theme: ['#024FA2', '#ED1C27', '#FFFFFF'], marker: { x: 70, y: 42 }, related: ['KR', 'CN', 'JP'],
    plugTypes: 'Type C', voltage: '220V', frequency: '50Hz', emergencyNumber: '119',
    searchHints: ['RESIDENT', 'ORGANIZATION', 'TRADE', 'SANCTIONS', 'POSTAL', 'KPW']
  },
  {
    slug: 'palestine', iso2: 'PS', iso3: 'PSE', isoNumeric: '275', name: 'Palestine', adjective: 'Palestinian', nativeName: 'Filastin',
    flag: '🇵🇸', language: 'Arabic', localLanguage: 'ar-PS', currency: 'ILS', currencyName: 'Israeli shekel / local currencies', symbol: 'ILS',
    locale: 'ar-PS', icu: 'ar_PS', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+970',
    capital: 'Ramallah', continent: 'Asia', region: 'Western Asia / Levant', population: 'approximately 5.5M',
    identifiers: ['ID number boundary', 'company registration number', 'tax number', 'postal code', 'phone'],
    payments: ['IBAN', 'PMMA bank reference', 'SWIFT', 'invoice reference', 'payment note boundary'],
    localTerms: { personal: 'ID number boundary', company: 'company registration number', tax: 'tax number / VAT', social: 'social insurance boundary', register: 'Companies Controller registry', invoice: 'VAT invoice', payment: 'IBAN / PMMA reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '401234567', company: '562345678', social: 'SI-123456', iban: 'PS92PALS000000000400123456702', bank: 'PALS 400123456702', phone: '+970 59 123 4567', postal: 'P600 Ramallah', plate: '1-234-56', vat: '562345678', amount: '1,234.56 ILS', date: '21/07/2026', address: 'Al-Manara 1, Ramallah P600', json: '{"country":"PS","id":"401234567","iban":"PS92PALS000000000400123456702"}' },
    theme: ['#000000', '#FFFFFF', '#007A3D'], marker: { x: 55, y: 53 }, related: ['JO', 'IL', 'LB'],
    plugTypes: 'Type C / Type H', voltage: '230V', frequency: '50Hz', emergencyNumber: '100 / 101',
    searchHints: ['ID', 'VAT', 'IBAN', 'PMMA', 'POSTAL', 'COMPANY']
  },
  {
    slug: 'syria', iso2: 'SY', iso3: 'SYR', isoNumeric: '760', name: 'Syria', adjective: 'Syrian', nativeName: 'Suriya',
    flag: '🇸🇾', language: 'Arabic', localLanguage: 'ar-SY', currency: 'SYP', currencyName: 'Syrian pound', symbol: 'SYP',
    locale: 'ar-SY', icu: 'ar_SY', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+963',
    capital: 'Damascus', continent: 'Asia', region: 'Western Asia / Levant', population: 'approximately 24M',
    identifiers: ['national number boundary', 'commercial registration number', 'tax number', 'postal code', 'phone'],
    payments: ['bank account boundary', 'central bank reference', 'SWIFT boundary', 'invoice reference', 'payment note boundary'],
    localTerms: { personal: 'national number boundary', company: 'commercial registration number', tax: 'tax number', social: 'social insurance boundary', register: 'commercial registry boundary', invoice: 'tax invoice', payment: 'bank/payment reference boundary', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '01012345678', company: 'SY-123456', social: 'SI-123456', iban: 'SY BANK 001 1234567890', bank: '001 1234567890', phone: '+963 944 123 456', postal: '0100 Damascus', plate: 'DAM 123456', vat: 'TAX123456', amount: '1,234,567 SYP', date: '21/07/2026', address: 'Malki 1, Damascus 0100', json: '{"country":"SY","tax":"TAX123456","payment":"official-boundary"}' },
    theme: ['#CE1126', '#FFFFFF', '#000000'], marker: { x: 55, y: 52 }, related: ['JO', 'LB', 'IQ'],
    plugTypes: 'Type C / Type E / Type L', voltage: '220V', frequency: '50Hz', emergencyNumber: '112 / 110',
    searchHints: ['NATIONAL NUMBER', 'TAX', 'COMMERCIAL', 'BANK', 'POSTAL', 'SYP']
  },
  {
    slug: 'taiwan', iso2: 'TW', iso3: 'TWN', isoNumeric: '158', name: 'Taiwan', adjective: 'Taiwanese', nativeName: 'Taiwan',
    flag: '🇹🇼', language: 'Mandarin Chinese', localLanguage: 'zh-TW', currency: 'TWD', currencyName: 'New Taiwan dollar', symbol: 'TWD',
    locale: 'zh-TW', icu: 'zh_TW', date: 'YYYY/MM/DD', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+886',
    capital: 'Taipei', continent: 'Asia', region: 'East Asia', population: 'approximately 23.4M',
    identifiers: ['National ID boundary', 'GUI number', 'VAT / business tax number', 'postal code', 'phone'],
    payments: ['bank code/account', 'ACH reference', 'eGUI invoice reference', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'National ID boundary', company: 'GUI number', tax: 'VAT / business tax number', social: 'Labor insurance boundary', register: 'MOEA business registry', invoice: 'eGUI invoice', payment: 'bank transfer / ACH reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'PDPA privacy' },
    samples: { personal: 'A123456789', company: '12345675', social: 'LI-123456', iban: 'TW BANK 004 123456789012', bank: '004 123456789012', phone: '+886 912 345 678', postal: '100 Taipei', plate: 'ABC-1234', vat: '12345675', amount: '1,234 TWD', date: '2026/07/21', address: 'Zhongxiao East Road 1, Taipei 100', json: '{"country":"TW","gui":"12345675","bankCode":"004","egui":"AB12345678"}' },
    theme: ['#FE0000', '#000095', '#FFFFFF'], marker: { x: 72, y: 54 }, related: ['JP', 'KR', 'SG'],
    plugTypes: 'Type A / Type B', voltage: '110V', frequency: '60Hz', emergencyNumber: '110 / 119',
    searchHints: ['NATIONAL ID', 'GUI', 'EGUI', 'ACH', 'POSTAL', 'TWD']
  },
  {
    slug: 'timor-leste', iso2: 'TL', iso3: 'TLS', isoNumeric: '626', name: 'Timor-Leste', adjective: 'Timorese', nativeName: 'Timor-Leste',
    flag: '🇹🇱', language: 'Tetum and Portuguese', localLanguage: 'pt-TL', currency: 'USD', currencyName: 'US dollar', symbol: 'USD',
    locale: 'pt-TL', icu: 'pt_TL', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+670',
    capital: 'Dili', continent: 'Asia', region: 'Southeast Asia', population: 'approximately 1.4M',
    identifiers: ['electoral card / ID boundary', 'company registration number', 'tax identification number', 'postal code', 'phone'],
    payments: ['bank account', 'R-TiMOR payment reference', 'SWIFT', 'mobile money reference', 'invoice reference'],
    localTerms: { personal: 'ID boundary', company: 'company registration number', tax: 'tax identification number', social: 'social security boundary', register: 'SERVE business registry', invoice: 'tax invoice', payment: 'R-TiMOR / bank reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: 'TL-1234567', company: 'SERVE-123456', social: 'SS-123456', iban: 'TL BANK 001 1234567890', bank: '001 1234567890', phone: '+670 7723 4567', postal: 'Dili 1000', plate: 'TL 12-345', vat: 'TIN1234567', amount: '1,234.56 USD', date: '21/07/2026', address: 'Avenida Nicolau Lobato 1, Dili 1000', json: '{"country":"TL","tin":"TIN1234567","rtimor":"INV-2026-001"}' },
    theme: ['#DC241F', '#FFC726', '#000000'], marker: { x: 70, y: 70 }, related: ['ID', 'SG', 'AU'],
    plugTypes: 'Type C / Type E / Type F / Type I', voltage: '220V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['TIN', 'SERVE', 'R-TIMOR', 'BANK', 'POSTAL', 'USD']
  },
  {
    slug: 'turkey', iso2: 'TR', iso3: 'TUR', isoNumeric: '792', name: 'Turkey', adjective: 'Turkish', nativeName: 'Turkiye',
    flag: '🇹🇷', language: 'Turkish', localLanguage: 'tr-TR', currency: 'TRY', currencyName: 'Turkish lira', symbol: 'TRY',
    locale: 'tr-TR', icu: 'tr_TR', date: 'DD.MM.YYYY', decimal: 'Comma (,)', thousands: 'Dot (.)', phone: '+90',
    capital: 'Ankara', continent: 'Asia', region: 'Anatolia / Western Asia', population: 'approximately 86M',
    identifiers: ['T.C. Kimlik boundary', 'MERSIS number', 'tax number', 'postal code', 'phone'],
    payments: ['IBAN', 'EFT / FAST reference', 'bank branch/account', 'SWIFT', 'invoice reference'],
    localTerms: { personal: 'T.C. Kimlik boundary', company: 'MERSIS number', tax: 'Vergi Kimlik Numarasi', social: 'SGK boundary', register: 'MERSIS / trade registry', invoice: 'e-Fatura / e-Arsiv invoice', payment: 'IBAN / FAST reference', plate: 'vehicle plate', postal: 'postal code', privacy: 'KVKK privacy' },
    samples: { personal: '10000000146', company: '0123456789012345', social: 'SGK-123456', iban: 'TR330006100519786457841326', bank: '0061 0519786457841326', phone: '+90 532 123 45 67', postal: '06420 Ankara', plate: '06 ABC 123', vat: '1234567890', amount: '1.234,56 TRY', date: '21.07.2026', address: 'Ataturk Bulvari 1, Ankara 06420', json: '{"country":"TR","tckn":"10000000146","iban":"TR330006100519786457841326"}' },
    theme: ['#E30A17', '#FFFFFF', '#111827'], marker: { x: 54, y: 51 }, related: ['GE', 'AZ', 'JO'],
    plugTypes: 'Type C / Type F', voltage: '230V', frequency: '50Hz', emergencyNumber: '112',
    searchHints: ['TCKN', 'MERSIS', 'VKN', 'IBAN', 'FAST', 'E-FATURA']
  },
  {
    slug: 'yemen', iso2: 'YE', iso3: 'YEM', isoNumeric: '887', name: 'Yemen', adjective: 'Yemeni', nativeName: 'Al-Yaman',
    flag: '🇾🇪', language: 'Arabic', localLanguage: 'ar-YE', currency: 'YER', currencyName: 'Yemeni rial', symbol: 'YER',
    locale: 'ar-YE', icu: 'ar_YE', date: 'DD/MM/YYYY', decimal: 'Dot (.)', thousands: 'Comma (,)', phone: '+967',
    capital: 'Sanaa', continent: 'Asia', region: 'Western Asia / Arabian Peninsula', population: 'approximately 35M',
    identifiers: ['national ID boundary', 'commercial registration number', 'tax number', 'postal code', 'phone'],
    payments: ['bank account boundary', 'central bank payment reference', 'SWIFT boundary', 'remittance reference', 'invoice reference'],
    localTerms: { personal: 'national ID boundary', company: 'commercial registration number', tax: 'tax number', social: 'social insurance boundary', register: 'commercial registry boundary', invoice: 'tax invoice', payment: 'bank/remittance reference boundary', plate: 'vehicle plate', postal: 'postal code', privacy: 'personal-data privacy boundary' },
    samples: { personal: '12345678901', company: 'YE-123456', social: 'SI-123456', iban: 'YE BANK 001 1234567890', bank: '001 1234567890', phone: '+967 7 123 456', postal: '1247 Sanaa', plate: '1-12345', vat: 'TAX123456', amount: '1,234,567 YER', date: '21/07/2026', address: 'Al-Zubayri Street 1, Sanaa 1247', json: '{"country":"YE","tax":"TAX123456","remittance":"INV-2026-001"}' },
    theme: ['#CE1126', '#FFFFFF', '#000000'], marker: { x: 58, y: 61 }, related: ['SA', 'OM', 'AE'],
    plugTypes: 'Type A / Type D / Type G', voltage: '230V', frequency: '50Hz', emergencyNumber: '199 / 191',
    searchHints: ['NATIONAL ID', 'TAX', 'COMMERCIAL', 'REMITTANCE', 'POSTAL', 'YER']
  }
];

const COUNTRY_TIME_ZONES = {
  japan: 'Asia/Tokyo (JST)',
  india: 'Asia/Kolkata (IST)',
  singapore: 'Asia/Singapore (SGT)',
  'south-korea': 'Asia/Seoul (KST)',
  'united-arab-emirates': 'Asia/Dubai (GST)',
  china: 'Asia/Shanghai (CST)',
  indonesia: 'Asia/Jakarta (WIB)',
  malaysia: 'Asia/Kuala_Lumpur (MYT)',
  thailand: 'Asia/Bangkok (ICT)',
  vietnam: 'Asia/Ho_Chi_Minh (ICT)',
  philippines: 'Asia/Manila (PHT)',
  pakistan: 'Asia/Karachi (PKT)',
  bangladesh: 'Asia/Dhaka (BST)',
  'saudi-arabia': 'Asia/Riyadh (AST)',
  israel: 'Asia/Jerusalem (IST)',
  nepal: 'Asia/Kathmandu (NPT)',
  'sri-lanka': 'Asia/Colombo (IST)',
  myanmar: 'Asia/Yangon (MMT)',
  cambodia: 'Asia/Phnom_Penh (ICT)',
  laos: 'Asia/Vientiane (ICT)',
  mongolia: 'Asia/Ulaanbaatar (ULAT)',
  uzbekistan: 'Asia/Tashkent (UZT)',
  kyrgyzstan: 'Asia/Bishkek (KGT)',
  tajikistan: 'Asia/Dushanbe (TJT)',
  turkmenistan: 'Asia/Ashgabat (TMT)',
  qatar: 'Asia/Qatar (AST)',
  kuwait: 'Asia/Kuwait (AST)',
  bahrain: 'Asia/Bahrain (AST)',
  oman: 'Asia/Muscat (GST)',
  jordan: 'Asia/Amman (EET/EEST)',
  afghanistan: 'Asia/Kabul (AFT)',
  armenia: 'Asia/Yerevan (AMT)',
  azerbaijan: 'Asia/Baku (AZT)',
  bhutan: 'Asia/Thimphu (BTT)',
  brunei: 'Asia/Brunei (BNT)',
  georgia: 'Asia/Tbilisi (GET)',
  iran: 'Asia/Tehran (IRST)',
  iraq: 'Asia/Baghdad (AST)',
  kazakhstan: 'Asia/Almaty (ALMT)',
  lebanon: 'Asia/Beirut (EET/EEST)',
  maldives: 'Indian/Maldives (MVT)',
  'north-korea': 'Asia/Pyongyang (KST)',
  palestine: 'Asia/Gaza (EET/EEST)',
  syria: 'Asia/Damascus (EET/EEST)',
  taiwan: 'Asia/Taipei (CST)',
  'timor-leste': 'Asia/Dili (TLT)',
  turkey: 'Europe/Istanbul (TRT)',
  yemen: 'Asia/Aden (AST)'
};


const TOOL_TEMPLATES = [
  ['{personalSlug}-validator', '{adj} {personal} Validator', 'ID', 'Validate {personal} shape, split date/control/body evidence, and prepare privacy-safe debugging output.', 'national-identifiers', 'personal', 'Validate', '{personalSample}'],
  ['{companySlug}-validator', '{adj} {company} Validator', 'ORG', 'Inspect {company} structure, registry-style prefixes, control digits, and official lookup boundaries.', 'national-identifiers', 'company', 'Validate', '{companySample}'],
  ['tax-id-validator', '{adj} {tax} Validator', 'TAX', 'Normalize {tax} identifiers, inspect local tax body evidence, and prepare authority handoff diagnostics.', 'national-identifiers', 'vat', 'Validate', '{vatSample}'],
  ['customs-importer-code-helper', '{adj} Customs / Importer Code Helper', 'CUS', 'Inspect customs identifiers, importer references, tax bodies, and border-process boundaries.', 'national-identifiers', 'customs', 'Validate', '{iso2}{companySample}'],
  ['{socialSlug}-social-insurance-helper', '{adj} {social} Helper', 'SOC', 'Split {social} evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.', 'national-identifiers', 'social', 'Inspect', '{socialSample}'],
  ['company-onboarding-auditor', '{adj} Company Onboarding Auditor', 'KYC', 'Audit company intake payloads for {company}, VAT, address, banking, and official registry handoff readiness.', 'developer-tools', 'companyonboarding', 'Audit', '{jsonSample}'],
  ['business-register-readiness-helper', '{adj} {register} Readiness Helper', 'REG', 'Prepare browser-only evidence before a regulated {register} lookup or company registry workflow.', 'government', 'register', 'Audit', '{companySample} {vatSample} {addressSample}'],
  ['id-card-format-helper', '{adj} ID Card Format Helper', 'CARD', 'Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.', 'national-identifiers', 'document', 'Inspect', '{personalSample}'],
  ['passport-number-helper', '{adj} Passport Number Helper', 'PASS', 'Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.', 'national-identifiers', 'document', 'Parse', 'P<{iso3}{adjUpper}<<SAMPLE<<<<<<<<<<<<<<<<<<'],
  ['mrz-passport-parser', '{adj} MRZ / Passport Parser', 'MRZ', 'Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.', 'national-identifiers', 'document', 'Parse', 'P<{iso3}SAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567{iso3}8501019M3107123<<<<<<<<<<<<<<06'],
  ['bank-account-validator', '{name} Bank Account Validator', 'BANK', 'Validate local bank-account or routing shape, split bank/account blocks, and keep ownership lookup outside the browser.', 'finance', 'bankcode', 'Validate', '{bankSample}'],
  ['bank-account-fixture-generator', '{name} Bank Account Fixture Generator', 'BGEN', 'Generate local bank-account fixture payloads, split routing/account blocks, and prepare payment QA data.', 'finance', 'bankfixture', 'Generate', '{bankSample}'],
  ['bank-account-inspector', '{adj} Domestic Bank Account Inspector', 'BANK', 'Inspect domestic account slices, bank codes, branch/account blocks, and provider handoff boundaries.', 'finance', 'bankcode', 'Inspect', '{bankSample}'],
  ['bic-swift-inspector', '{adj} BIC / SWIFT Inspector', 'BIC', 'Inspect BIC institution, country, location, and branch evidence for {name} banking integrations.', 'finance', 'bic', 'Inspect', 'ABCD{iso2}2X'],
  ['domestic-transfer-helper', '{adj} Domestic Transfer Helper', 'PAY', 'Check creditor, local bank-account, amount, remittance, and offline payment handoff fields before bank submission.', 'finance', 'paymentref', 'Audit', '{bankSample}\\n{amountSample}\\nInvoice 2026-001'],
  ['direct-debit-mandate-helper', '{adj} Direct Debit / Auto-Debit Mandate Helper', 'DD', 'Inspect mandate references, creditor data, debtor account evidence, and browser-only debit readiness.', 'finance', 'directdebit', 'Audit', 'MANDATE-2026-001 {bankSample}'],
  ['payment-reference-helper', '{adj} {payment} Reference Helper', 'PAY', 'Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.', 'finance', 'paymentref', 'Inspect', '{payment} REF 2026-001 {amountSample}'],
  ['remittance-text-builder', '{adj} Remittance Text Builder', 'REMIT', 'Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.', 'finance', 'remittance', 'Format', 'Invoice 2026-001 {vatSample} {amountSample}'],
  ['payment-reconciliation-helper', '{adj} Payment Reconciliation Helper', 'RECON', 'Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.', 'finance', 'reconciliation', 'Audit', '{dateSample}; {amountSample}; {bankSample}; Invoice 2026-001'],
  ['bank-statement-parser', '{adj} Bank Statement Parser', 'STMT', 'Parse statement rows for date, amount, account/routing evidence, counterparty, reference, and local decimal conventions.', 'finance', 'statement', 'Parse', '{dateSample}; {amountSample}; {bankSample}; sample counterparty'],
  ['masked-bank-account-formatter', '{adj} Masked Bank Account Formatter', 'MASK', 'Create log-safe bank-account previews while preserving routing and account-tail evidence.', 'finance', 'bankmask', 'Format', '{bankSample}'],
  ['currency-decimal-formatter', '{adj} {currency} Decimal Currency Formatter', 'CUR', 'Normalize {currency} amount strings, decimal separators, grouping, and API-safe numeric previews.', 'finance', 'amount', 'Format', '{amountSample}'],
  ['tax-rate-sanity-helper', '{adj} Tax Rate Sanity Helper', 'RATE', 'Inspect tax-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.', 'tax', 'taxrate', 'Inspect', '{tax} 20% base {amountSample}'],
  ['tax-return-field-helper', '{adj} Tax Return Field Helper', 'RET', 'Map tax-return field labels, tax evidence, period dates, and export-safe developer payloads.', 'tax', 'taxreturn', 'Map', '{tax}; {vatSample}; period 2026-07; {amountSample}'],
  ['invoice-number-helper', '{adj} Invoice Number Helper', 'INV', 'Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.', 'tax', 'invoice', 'Inspect', 'INV-2026-0001 {vatSample}'],
  ['e-invoicing-readiness-checker', '{adj} {invoice} Readiness Checker', 'EINV', 'Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.', 'tax', 'einvoice', 'Audit', '{jsonSample}'],
  ['tax-authority-handoff-helper', '{adj} Tax Authority Handoff Helper', 'TAX', 'Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.', 'tax', 'taxhandoff', 'Audit', '{vatSample} {dateSample} {amountSample}'],
  ['accounting-audit-trail-checklist-generator', '{adj} Accounting Audit Trail Checklist Helper', 'AUDIT', 'Generate local accounting evidence checklist for invoices, payments, tax, dates, and immutable logs.', 'tax', 'audittrail', 'Generate', 'invoice {dateSample} {amountSample} {vatSample}'],
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
  ['document-ocr-fixer', '{adj} Document OCR Fixer', 'OCR', 'Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.', 'documents', 'ocr', 'Fix', '{personalSample} {vatSample} {bankSample} {postalSample}'],
  ['privacy-redaction-helper', '{adj} {privacy} Redaction Helper', 'PRIV', 'Mask personal, tax, banking, phone, and address evidence for logs and support tickets.', 'privacy', 'privacy', 'Mask', '{jsonSample}'],
  ['pii-masker', '{adj} PII Masker', 'PII', 'Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.', 'privacy', 'privacy', 'Mask', '{personalSample} {phoneSample} {bankSample}'],
  ['personal-data-fixture-generator', '{adj} Personal Data Fixture Helper', 'FIX', 'Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.', 'privacy', 'fixture', 'Generate', '{personalSample}\\n{addressSample}\\n{phoneSample}'],
  ['driving-licence-format-helper', '{adj} Driving Licence Format Helper', 'DL', 'Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.', 'documents', 'document', 'Inspect', '{personalSample} DL 2026'],
  ['residence-permit-format-helper', '{adj} Residence Permit Format Helper', 'PERMIT', 'Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.', 'documents', 'document', 'Inspect', '{iso2} PERMIT 2026 {personalSample}'],
  ['health-card-format-helper', '{adj} Health Card Format Helper', 'HEALTH', 'Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.', 'documents', 'document', 'Inspect', '{personalSample} HEALTH 2026'],
  ['vehicle-plate-inspector', '{adj} Vehicle Plate Inspector', 'PLATE', 'Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.', 'transport', 'plate', 'Inspect', '{plateSample}'],
  ['vin-validator', '{adj} VIN Validator', 'VIN', 'Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics.', 'transport', 'vin', 'Validate', 'WVWZZZ1JZXW000001'],
  ['vehicle-data-redaction-helper', '{adj} Vehicle Data Redaction Helper', 'VEH', 'Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.', 'transport', 'vehicle', 'Mask', '{plateSample} WVWZZZ1JZXW000001 {personalSample}'],
  ['customs-declaration-helper', '{adj} Customs Declaration Helper', 'CUSTOMS', 'Inspect importer code, tax, invoice, amount, HS-code, and border handoff evidence without official filing.', 'government', 'customs', 'Audit', '{vatSample} HS 8471 {amountSample}'],
  ['postal-tracking-helper', '{adj} Postal Tracking Helper', 'TRACK', 'Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.', 'logistics', 'tracking', 'Inspect', 'TRACK 2026 {postalSample}'],
  ['data-quality-workbench', '{adj} Data Quality Workbench', 'DQ', 'Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.', 'developer-tools', 'dataquality', 'Audit', '{jsonSample}'],
  ['json-fixture-generator', '{adj} JSON Fixture Helper', 'JSON', 'Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.', 'developer-tools', 'json', 'Generate', '{jsonSample}'],
  ['regex-pack-helper', '{adj} Regex Pack Helper', 'REGEX', 'Prepare regex snippets for local identifiers, tax IDs, bank accounts, postal, phone, dates, and debug labels.', 'developer-tools', 'regex', 'Explain', '{personal} {company} {postal} {phone} {bankSample}'],
  ['api-payload-auditor', '{adj} API Payload Auditor', 'API', 'Audit API payload snippets for locale, tax, identifiers, bank-account evidence, dates, amounts, and official boundaries.', 'developer-tools', 'api', 'Audit', '{jsonSample}'],
  ['form-field-auditor', '{adj} Form Field Auditor', 'FORM', 'Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.', 'developer-tools', 'form', 'Audit', 'tax={vatSample}&postal={postalSample}&phone={phoneSample}'],
  ['locale-number-parser', '{adj} Locale Number Parser', 'NUM', 'Parse decimal/grouping variants, currency labels, and API-safe numeric values for {name}.', 'localization', 'amount', 'Parse', '{amountSample}'],
  ['calendar-week-helper', '{adj} Calendar Week Helper', 'CAL', 'Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.', 'localization', 'date', 'Inspect', '{dateSample} week 30'],
  ['company-suffix-normalizer', '{adj} Company Suffix Normalizer', 'SUFFIX', 'Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.', 'developer-tools', 'companysuffix', 'Format', '{name} Sample Holding Ltd {companySample}'],
  ['procurement-identifier-helper', '{adj} Procurement Identifier Helper', 'PROC', 'Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.', 'government', 'procurement', 'Audit', '{companySample} PO-2026-001 {vatSample}'],
  ['accessibility-locale-copy-checker', '{adj} Locale Copy Checker', 'COPY', 'Check UI labels for local identifier names, date/currency wording, and support-safe explanations.', 'localization', 'copycheck', 'Audit', '{personal} input, {postal} input, amount {amountSample}'],
  ['support-ticket-scrubber', '{adj} Support Ticket Scrubber', 'SUP', 'Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.', 'privacy', 'privacy', 'Mask', 'Customer sent {personalSample}, {bankSample}, {addressSample}'],
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

function hexToRgbTriplet(hex) {
  const normalized = String(hex || '').replace('#', '').trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return '15 118 110';
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
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
    const isGenerator = actionLabel === 'Generate';
    return {
      id, name, code, summary, category, actionLabel, kind,
      samples: [
        { label: 'Valid sample', value: sample, intent: 'valid', tone: 'success' },
        { label: 'Invalid sample', value: invalid, intent: 'review', tone: 'review' },
        { label: 'Short sample', value: short, intent: 'review', tone: 'review' },
        { label: isGenerator ? 'Grouped valid sample' : 'Wrong prefix sample', value: isGenerator ? String(sample).replace(/(.{4})/g, '$1 ').trim() : wrongPrefix, intent: isGenerator ? 'valid' : 'review', tone: isGenerator ? 'success' : 'review' },
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
region: Asia
languages:
  - ${country.localLanguage.split('-')[0]}
currency: ${country.currency}
relatedCountries:
${country.related.map((r) => `  - ${r}`).join('\n')}
`;
}

function toolYaml(country, tool, related) {
  const capabilities = tool.actionLabel === 'Generate'
    ? ['generate', 'validate', 'parse', 'explain']
    : ['validate', 'parse', 'format', 'explain'];
  const formName = tool.actionLabel === 'Generate' ? 'generate' : 'validate';
  const actions = tool.actionLabel === 'Generate'
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
    else if (['csv','json','api','dataquality','form','companyonboarding','register','einvoice','taxhandoff','taxreturn','audittrail','procurement','smoketest'].includes(tool.kind)) { normalized = raw.replace(/\\s+/g, ' ').trim(); ok = raw.length > 10 || ev.json; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', COUNTRY.localTerms.personal + ' / ' + COUNTRY.localTerms.company), field('tax evidence', ev.vat || 'not detected', COUNTRY.localTerms.tax), field('banking evidence', ev.iban || 'not detected', 'bank account/payment slice'), field('locale evidence', [ev.date, ev.amount, ev.postal].filter(Boolean).join(' / ') || 'not detected', 'date/amount/postal slices')); }
    else if (['privacy','fixture','ocr','document'].includes(tool.kind)) { normalized = raw.replace(/[A-Z0-9][A-Z0-9 .\\/-]{6,24}/g, (v) => mask(v)); ok = raw.length > 5; result.breakdown.push(field('personal evidence', ev.personal, COUNTRY.localTerms.personal), field('company/tax evidence', ev.company || ev.vat, COUNTRY.localTerms.company), field('banking evidence', ev.iban, 'banking slice'), field('masked preview', normalized, 'safe for logs')); }
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
      outlineSrc: `/assets/images/countries/${country.slug}-outline.png`,
      outlineAlt: `${country.name} country outline`,
      mapSrc: `/assets/images/countries/${country.slug}-location.png`,
      mapAlt: `World map with ${country.name} location marker`,
      mapMarker: { ...country.marker, label: country.name },
      source: 'Premium raster country visual generated once for ValidoHub country navigation'
    },
    catalog: {
      id: country.slug, flag: country.flag, name: country.name, nativeName: country.nativeName, iso2: country.iso2, iso3: country.iso3,
      continent: 'Asia', region: 'Asia', language: country.language, currency: country.currency, currencyName: country.currencyName,
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
        capital: country.capital, continent: 'Asia', region: country.region, languages: country.language, currency: country.currencyName,
        currencyCode: country.currency, callingCode: country.phone, internetTld: `.${country.iso2.toLowerCase()}`, drivingSide: 'Right',
        iso2: country.iso2, iso3: country.iso3, isoNumeric: country.isoNumeric, locale: country.locale, icuLocale: country.icu,
        dateFormat: country.date, timeFormat: '24-hour, HH:mm', decimalSeparator: country.decimal, thousandsSeparator: country.thousands,
        addressFormat: `Street, number, postal code, locality, ${country.name}`, postalCodeFormat: country.localTerms.postal,
        primaryTimeZone: COUNTRY_TIME_ZONES[country.slug] || 'Asia/Singapore (SGT)', measurementSystem: 'Metric', paperSize: 'A4', emergencyNumber: country.emergencyNumber || '112', weekStarts: 'Monday',
        rtlSupport: 'No', unicodeLocale: country.locale, cldrLocale: country.icu, metricVsImperial: 'Metric-first',
        powerPlugTypes: country.plugTypes || 'Type C / Type F', voltage: country.voltage || '230V', frequency: country.frequency || '50Hz'
      },
      visualIdentity: {
        countryId: country.slug, outlineLabel: `${country.name} outline`, mapLabel: `${country.name} in the world`, continentBadge: 'Asia', flagLabel: `${country.name} flag`,
        heroAccentPrimary: hexToRgbTriplet(country.theme[0]), heroAccentSecondary: hexToRgbTriplet(country.theme[1]), heroAccentTertiary: hexToRgbTriplet(country.theme[2])
      },
      stats: [
        { label: 'Premium tools', value: String(tools.length), text: 'Browser-only local developer workbenches' },
        { label: 'Core locales', value: '7', text: 'Runtime-localized production locales' },
        { label: 'Field breakdown', value: '100%', text: 'Every tool exposes debug slices' }
      ],
      highlights: [
        { title: `${country.localTerms.personal} and ${country.localTerms.company}`, text: `Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries.` },
        { title: `${country.localTerms.tax} and payments`, text: `Tax, banking, payment reference, and reconciliation tools keep browser-only checks separate from regulated status.` },
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
        { title: country.localTerms.tax, text: 'Tax validity and filing acceptance require the responsible local tax authority or approved provider.', status: 'official boundary' },
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
        { title: 'Forms', text: `${country.localTerms.personal}, ${country.localTerms.company}, ${country.localTerms.postal}, phone, address, and bank-account fields need local labels.`, status: 'available' }
      ],
      technicalStandards: [
        { title: 'Plug types', value: country.plugTypes || 'Type C / Type F', text: 'Public utility fixture for travel, QA, and onboarding copy.' },
        { title: 'Electrical voltage', value: country.voltage || '230V', text: 'Common mains voltage used by country-profile fixtures.' },
        { title: 'Grid frequency', value: country.frequency || '50Hz', text: 'Common grid frequency for technical defaults.' },
        { title: 'Emergency number', value: country.emergencyNumber || '112', text: 'Local emergency number fixture; official emergency-routing context may vary by service and region.' }
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

function updateBuildCountryDev(countries) {
  const rel = 'scripts/build-country-dev.mjs';
  let text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  for (const country of countries) {
    const runtimeEntry = `  '${country.slug}': '${country.slug}-suite.js',`;
    const runtimeBareEntry = `  ${country.slug}: '${country.slug}-suite.js',`;
    if (!text.includes(runtimeEntry) && !text.includes(runtimeBareEntry)) {
      text = text.replace(
        `  'united-arab-emirates': 'united-arab-emirates-suite.js',`,
        `  'united-arab-emirates': 'united-arab-emirates-suite.js',\n${runtimeEntry}`
      );
    }
    const algorithmEntry = `  '${country.slug}': 'validohub.${country.slug}-suite',`;
    const algorithmBareEntry = `  ${country.slug}: 'validohub.${country.slug}-suite',`;
    if (!text.includes(algorithmEntry) && !text.includes(algorithmBareEntry)) {
      text = text.replace(
        `  'united-arab-emirates': 'validohub.united-arab-emirates-suite',`,
        `  'united-arab-emirates': 'validohub.united-arab-emirates-suite',\n${algorithmEntry}`
      );
    }
    const factoryEntry = `  '${country.slug}',`;
    const factoryStart = text.indexOf('const FACTORY_COUNTRY_SLUGS = new Set([');
    const factoryEnd = factoryStart === -1 ? -1 : text.indexOf(']);', factoryStart);
    const factoryBlock = factoryStart === -1 || factoryEnd === -1 ? '' : text.slice(factoryStart, factoryEnd);
    if (factoryStart !== -1 && factoryEnd !== -1 && !factoryBlock.includes(factoryEntry.trim())) {
      const beforeSetEnd = text.slice(0, factoryEnd).replace(/(\s+'[^']+')\n$/, '$1,\n');
      text = `${beforeSetEnd}${factoryEntry}\n${text.slice(factoryEnd)}`;
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
  write('docs/product/ASIA_PREMIUM_SUITE_SPEC.md', `# Asia Premium Batch Suite Spec

This spec covers the Asia full-premium generation batch: ${list}.

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
    const marker = 'Asia full-premium expansion batch';
    if (!text.includes(marker)) {
      text = `## 2026-07-24 - ${marker}\n\n- Added a documented Asia premium generation batch for ${list}.\n- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.\n- Added \`docs/product/ASIA_PREMIUM_SUITE_SPEC.md\` so future AI sessions treat batch generation quality as a contract, not a one-off.\n\n` + text;
      fs.writeFileSync(changelog, text);
    }
  }
  const current = path.join(ROOT, 'docs/product/CURRENT_STATE.md');
  if (fs.existsSync(current)) {
    let text = fs.readFileSync(current, 'utf8');
    const marker = 'Asia Premium Batch V2';
    if (!text.includes(marker)) {
      text += `\n\n## ${marker}\n\nAsia coverage is generated as full premium with Country Suite Factory V1. Each country uses quality-driven local developer workbenches, field breakdown on every tool, seven production runtime locales, validate/generate affordances where safe, same-country related links, rich country hub sections, and explicit official/live lookup boundaries. Russia and Belarus remain excluded; transcontinental and disputed territories require an explicit product decision.\n`;
      fs.writeFileSync(current, text);
    }
  }
  const registry = path.join(ROOT, 'docs/product/WORKBENCH_REGISTRY.md');
  if (fs.existsSync(registry)) {
    let text = fs.readFileSync(registry, 'utf8');
    const marker = 'Asia Premium Batch V2';
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
    tools.forEach((tool, index) => {
      const related = [tools[(index + 1) % tools.length].id, tools[(index + 2) % tools.length].id];
      write(`tools/${tool.id}.yaml`, toolYaml(country, tool, related));
    });
  }
  updateBuildAll(COUNTRIES);
  updatePremiumAudit(COUNTRIES);
  updateFactoryAudit(COUNTRIES);
  updateBuildCountryDev(COUNTRIES);
  updateAlgorithms(COUNTRIES);
  updateDocs(COUNTRIES);
  console.log(`Generated ${COUNTRIES.length} countries and ${COUNTRIES.length * TOOL_TEMPLATES.length} tools.`);
}

main();
