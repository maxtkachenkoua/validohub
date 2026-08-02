#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = [
  {
    "slug": "australia",
    "iso2": "AU",
    "iso3": "AUS",
    "isoNumeric": "036",
    "name": "Australia",
    "adjective": "Australian",
    "nativeName": "Australia",
    "flag": "🇦🇺",
    "language": "English",
    "localLanguage": "en-AU",
    "currency": "AUD",
    "currencyName": "Australian dollar",
    "symbol": "AUD",
    "locale": "en-AU",
    "icu": "en_AU",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+61",
    "capital": "Canberra",
    "continent": "Oceania",
    "region": "Australia and New Zealand",
    "population": "approximately 27M",
    "identifiers": [
      "Tax File Number boundary",
      "Australian Business Number",
      "GST registration boundary",
      "postcode",
      "phone"
    ],
    "payments": [
      "BSB/account number",
      "PayID / Osko handoff",
      "BPAY reference",
      "SWIFT/BIC",
      "invoice reference"
    ],
    "localTerms": {
      "personal": "TFN boundary",
      "company": "ABN / ACN",
      "tax": "GST / ABN",
      "social": "Medicare boundary",
      "register": "ASIC / ABR",
      "invoice": "tax invoice",
      "payment": "BSB / BPAY / PayID reference",
      "plate": "vehicle plate",
      "postal": "postcode",
      "privacy": "Privacy Act privacy"
    },
    "samples": {
      "personal": "123 456 782",
      "company": "51 824 753 556",
      "social": "Medicare 2123456701",
      "iban": "AU BSB 062000 12345678",
      "bank": "062-000 12345678",
      "phone": "+61 412 345 678",
      "postal": "2600 Canberra ACT",
      "plate": "ABC123",
      "vat": "51824753556",
      "amount": "1,234.56 AUD",
      "date": "24/07/2026",
      "address": "1 National Circuit, Canberra ACT 2600",
      "json": "{\"country\":\"AU\",\"abn\":\"51824753556\",\"bsb\":\"062000\",\"amount\":\"1,234.56\"}"
    },
    "theme": [
      "#012169",
      "#FFFFFF",
      "#E4002B"
    ],
    "marker": {
      "x": 77,
      "y": 78
    },
    "related": [
      "NZ",
      "PG",
      "FJ"
    ],
    "plugTypes": "Type I",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "000 / 112",
    "searchHints": [
      "TFN",
      "ABN",
      "ACN",
      "BSB",
      "BPAY",
      "POSTCODE"
    ],
    "cities": [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth"
    ],
    "timeZone": "Australia/Sydney"
  },
  {
    "slug": "fiji",
    "iso2": "FJ",
    "iso3": "FJI",
    "isoNumeric": "242",
    "name": "Fiji",
    "adjective": "Fijian",
    "nativeName": "Fiji / Viti",
    "flag": "🇫🇯",
    "language": "English, Fijian, and Fiji Hindi",
    "localLanguage": "en-FJ",
    "currency": "FJD",
    "currencyName": "Fijian dollar",
    "symbol": "FJD",
    "locale": "en-FJ",
    "icu": "en_FJ",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+679",
    "capital": "Suva",
    "continent": "Oceania",
    "region": "Melanesia",
    "population": "approximately 0.9M",
    "identifiers": [
      "Tax Identification Number boundary",
      "company registration number",
      "FRCS tax boundary",
      "postal/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "TIN boundary",
      "company": "company registration number",
      "tax": "FRCS tax / VAT boundary",
      "social": "FNPF boundary",
      "register": "Registrar of Companies",
      "invoice": "tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "postal/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "FJ-TIN-123456",
      "company": "FJ-REG-123456",
      "social": "FNPF-123456",
      "iban": "FJ BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+679 123 4567",
      "postal": "Suva",
      "plate": "FJ 1234",
      "vat": "FJ123456789",
      "amount": "1,234.56 FJD",
      "date": "24/07/2026",
      "address": "Victoria Parade, Suva",
      "json": "{\"country\":\"FJ\",\"tin\":\"FJ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#68BFE5",
      "#FFFFFF",
      "#CF142B"
    ],
    "marker": {
      "x": 84,
      "y": 72
    },
    "related": [
      "AU",
      "NZ",
      "PG"
    ],
    "plugTypes": "Type I",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "911 / 917",
    "searchHints": [
      "TIN",
      "FRCS",
      "VAT",
      "BANK",
      "POSTAL",
      "FNPF"
    ],
    "cities": [
      "Suva",
      "Nadi",
      "Lautoka",
      "Labasa"
    ],
    "timeZone": "Pacific/Fiji"
  },
  {
    "slug": "kiribati",
    "iso2": "KI",
    "iso3": "KIR",
    "isoNumeric": "296",
    "name": "Kiribati",
    "adjective": "I-Kiribati",
    "nativeName": "Kiribati",
    "flag": "🇰🇮",
    "language": "English and Gilbertese",
    "localLanguage": "en-KI",
    "currency": "AUD",
    "currencyName": "Australian dollar",
    "symbol": "AUD",
    "locale": "en-KI",
    "icu": "en_KI",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+686",
    "capital": "South Tarawa",
    "continent": "Oceania",
    "region": "Micronesia",
    "population": "approximately 0.13M",
    "identifiers": [
      "national ID boundary",
      "company registration number",
      "tax boundary",
      "island/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "company registration number",
      "tax": "tax boundary",
      "social": "social protection boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "island/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "KI-ID-123456",
      "company": "KI-REG-123456",
      "social": "KI-SOC-123456",
      "iban": "KI BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+686 12345",
      "postal": "South Tarawa",
      "plate": "KI 1234",
      "vat": "KI123456789",
      "amount": "1,234.56 AUD",
      "date": "24/07/2026",
      "address": "Bairiki, South Tarawa",
      "json": "{\"country\":\"KI\",\"taxNumber\":\"KI123456789\"}"
    },
    "theme": [
      "#CE1126",
      "#FFFFFF",
      "#003F87"
    ],
    "marker": {
      "x": 92,
      "y": 58
    },
    "related": [
      "FJ",
      "TV",
      "MH"
    ],
    "plugTypes": "Type I",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 994 / 993",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "COMPANY",
      "BANK",
      "ISLAND",
      "PHONE"
    ],
    "cities": [
      "South Tarawa",
      "Betio",
      "Bikenibeu",
      "Teaoraereke"
    ],
    "timeZone": "Pacific/Tarawa"
  },
  {
    "slug": "marshall-islands",
    "iso2": "MH",
    "iso3": "MHL",
    "isoNumeric": "584",
    "name": "Marshall Islands",
    "adjective": "Marshallese",
    "nativeName": "Aolepan Aorokin Majel",
    "flag": "🇲🇭",
    "language": "Marshallese and English",
    "localLanguage": "en-MH",
    "currency": "USD",
    "currencyName": "United States dollar",
    "symbol": "USD",
    "locale": "en-MH",
    "icu": "en_MH",
    "date": "MM/DD/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+692",
    "capital": "Majuro",
    "continent": "Oceania",
    "region": "Micronesia",
    "population": "approximately 0.04M",
    "identifiers": [
      "national ID boundary",
      "business corporation number",
      "tax boundary",
      "atoll/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "wire reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "business corporation number",
      "tax": "tax boundary",
      "social": "social security boundary",
      "register": "corporations registry",
      "invoice": "invoice",
      "payment": "wire/payment reference",
      "plate": "vehicle plate",
      "postal": "atoll/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "MH-ID-123456",
      "company": "MH-REG-123456",
      "social": "MH-SOC-123456",
      "iban": "MH BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+692 247 1234",
      "postal": "Majuro MH 96960",
      "plate": "MH 1234",
      "vat": "MH123456789",
      "amount": "1,234.56 USD",
      "date": "07/24/2026",
      "address": "Delap, Majuro MH 96960",
      "json": "{\"country\":\"MH\",\"company\":\"MH-REG-123456\"}"
    },
    "theme": [
      "#003893",
      "#FFFFFF",
      "#F77F00"
    ],
    "marker": {
      "x": 91,
      "y": 51
    },
    "related": [
      "FM",
      "PW",
      "KI"
    ],
    "plugTypes": "Type A / Type B",
    "voltage": "120V",
    "frequency": "60Hz",
    "emergencyNumber": "911",
    "searchHints": [
      "NATIONAL ID",
      "COMPANY",
      "TAX",
      "BANK",
      "ATOLL",
      "PHONE"
    ],
    "cities": [
      "Majuro",
      "Ebeye",
      "Laura",
      "Rita"
    ],
    "timeZone": "Pacific/Majuro"
  },
  {
    "slug": "micronesia",
    "iso2": "FM",
    "iso3": "FSM",
    "isoNumeric": "583",
    "name": "Micronesia",
    "adjective": "Micronesian",
    "nativeName": "Federated States of Micronesia",
    "flag": "🇫🇲",
    "language": "English",
    "localLanguage": "en-FM",
    "currency": "USD",
    "currencyName": "United States dollar",
    "symbol": "USD",
    "locale": "en-FM",
    "icu": "en_FM",
    "date": "MM/DD/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+691",
    "capital": "Palikir",
    "continent": "Oceania",
    "region": "Micronesia",
    "population": "approximately 0.11M",
    "identifiers": [
      "national ID boundary",
      "company registration number",
      "tax boundary",
      "state/island locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "wire reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "company registration number",
      "tax": "tax boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "invoice",
      "payment": "wire/payment reference",
      "plate": "vehicle plate",
      "postal": "state/island locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "FM-ID-123456",
      "company": "FM-REG-123456",
      "social": "FM-SOC-123456",
      "iban": "FM BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+691 320 1234",
      "postal": "Palikir, Pohnpei",
      "plate": "FM 1234",
      "vat": "FM123456789",
      "amount": "1,234.56 USD",
      "date": "07/24/2026",
      "address": "Palikir, Pohnpei State",
      "json": "{\"country\":\"FM\",\"taxNumber\":\"FM123456789\"}"
    },
    "theme": [
      "#75B2DD",
      "#FFFFFF",
      "#111827"
    ],
    "marker": {
      "x": 88,
      "y": 55
    },
    "related": [
      "MH",
      "PW",
      "PG"
    ],
    "plugTypes": "Type A / Type B",
    "voltage": "120V",
    "frequency": "60Hz",
    "emergencyNumber": "911",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "COMPANY",
      "BANK",
      "STATE",
      "PHONE"
    ],
    "cities": [
      "Weno",
      "Palikir",
      "Kolonia",
      "Tofol"
    ],
    "timeZone": "Pacific/Pohnpei"
  },
  {
    "slug": "nauru",
    "iso2": "NR",
    "iso3": "NRU",
    "isoNumeric": "520",
    "name": "Nauru",
    "adjective": "Nauruan",
    "nativeName": "Naoero",
    "flag": "🇳🇷",
    "language": "Nauruan and English",
    "localLanguage": "en-NR",
    "currency": "AUD",
    "currencyName": "Australian dollar",
    "symbol": "AUD",
    "locale": "en-NR",
    "icu": "en_NR",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+674",
    "capital": "Yaren",
    "continent": "Oceania",
    "region": "Micronesia",
    "population": "approximately 0.01M",
    "identifiers": [
      "national ID boundary",
      "company registration number",
      "tax boundary",
      "district/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "company registration number",
      "tax": "tax boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "district/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "NR-ID-123456",
      "company": "NR-REG-123456",
      "social": "NR-SOC-123456",
      "iban": "NR BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+674 123 4567",
      "postal": "Yaren District",
      "plate": "NR 1234",
      "vat": "NR123456789",
      "amount": "1,234.56 AUD",
      "date": "24/07/2026",
      "address": "Yaren District, Nauru",
      "json": "{\"country\":\"NR\",\"company\":\"NR-REG-123456\"}"
    },
    "theme": [
      "#002B7F",
      "#FFC72C",
      "#FFFFFF"
    ],
    "marker": {
      "x": 88,
      "y": 62
    },
    "related": [
      "KI",
      "FM",
      "AU"
    ],
    "plugTypes": "Type I",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "110 / 111 / 112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "COMPANY",
      "BANK",
      "DISTRICT",
      "PHONE"
    ],
    "cities": [
      "Yaren",
      "Aiwo",
      "Anabar",
      "Denigomodu"
    ],
    "timeZone": "Pacific/Nauru"
  },
  {
    "slug": "new-zealand",
    "iso2": "NZ",
    "iso3": "NZL",
    "isoNumeric": "554",
    "name": "New Zealand",
    "adjective": "New Zealand",
    "nativeName": "Aotearoa / New Zealand",
    "flag": "🇳🇿",
    "language": "English, Maori, and New Zealand Sign Language",
    "localLanguage": "en-NZ",
    "currency": "NZD",
    "currencyName": "New Zealand dollar",
    "symbol": "NZD",
    "locale": "en-NZ",
    "icu": "en_NZ",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+64",
    "capital": "Wellington",
    "continent": "Oceania",
    "region": "Australia and New Zealand",
    "population": "approximately 5.3M",
    "identifiers": [
      "IRD number",
      "NZBN",
      "GST number",
      "postcode",
      "phone"
    ],
    "payments": [
      "bank account number",
      "domestic transfer",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "IRD number boundary",
      "company": "NZBN",
      "tax": "GST / IRD",
      "social": "RealMe boundary",
      "register": "Companies Office / NZBN",
      "invoice": "GST tax invoice",
      "payment": "NZ bank account/payment reference",
      "plate": "vehicle plate",
      "postal": "postcode",
      "privacy": "Privacy Act privacy"
    },
    "samples": {
      "personal": "123-456-789",
      "company": "9429000000000",
      "social": "RealMe boundary",
      "iban": "NZ 12 1234 1234567 00",
      "bank": "12-1234-1234567-00",
      "phone": "+64 21 123 4567",
      "postal": "6011 Wellington",
      "plate": "ABC123",
      "vat": "123456789",
      "amount": "1,234.56 NZD",
      "date": "24/07/2026",
      "address": "1 Molesworth Street, Wellington 6011",
      "json": "{\"country\":\"NZ\",\"ird\":\"123456789\",\"nzbn\":\"9429000000000\"}"
    },
    "theme": [
      "#00247D",
      "#FFFFFF",
      "#CC142B"
    ],
    "marker": {
      "x": 84,
      "y": 85
    },
    "related": [
      "AU",
      "FJ",
      "TO"
    ],
    "plugTypes": "Type I",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "111",
    "searchHints": [
      "IRD",
      "NZBN",
      "GST",
      "BANK",
      "POSTCODE",
      "REALME"
    ],
    "cities": [
      "Auckland",
      "Wellington",
      "Christchurch",
      "Hamilton"
    ],
    "timeZone": "Pacific/Auckland"
  },
  {
    "slug": "palau",
    "iso2": "PW",
    "iso3": "PLW",
    "isoNumeric": "585",
    "name": "Palau",
    "adjective": "Palauan",
    "nativeName": "Belau",
    "flag": "🇵🇼",
    "language": "Palauan and English",
    "localLanguage": "en-PW",
    "currency": "USD",
    "currencyName": "United States dollar",
    "symbol": "USD",
    "locale": "en-PW",
    "icu": "en_PW",
    "date": "MM/DD/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+680",
    "capital": "Ngerulmud",
    "continent": "Oceania",
    "region": "Micronesia",
    "population": "approximately 0.02M",
    "identifiers": [
      "national ID boundary",
      "business registration number",
      "tax boundary",
      "state/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "wire reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "business registration number",
      "tax": "tax boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "invoice",
      "payment": "wire/payment reference",
      "plate": "vehicle plate",
      "postal": "state/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "PW-ID-123456",
      "company": "PW-REG-123456",
      "social": "PW-SOC-123456",
      "iban": "PW BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+680 488 1234",
      "postal": "Ngerulmud, Melekeok",
      "plate": "PW 1234",
      "vat": "PW123456789",
      "amount": "1,234.56 USD",
      "date": "07/24/2026",
      "address": "Ngerulmud, Melekeok State",
      "json": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}"
    },
    "theme": [
      "#4AADD6",
      "#FFDE00",
      "#111827"
    ],
    "marker": {
      "x": 82,
      "y": 59
    },
    "related": [
      "FM",
      "MH",
      "PG"
    ],
    "plugTypes": "Type A / Type B",
    "voltage": "120V",
    "frequency": "60Hz",
    "emergencyNumber": "911",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "COMPANY",
      "BANK",
      "STATE",
      "PHONE"
    ],
    "cities": [
      "Koror",
      "Ngerulmud",
      "Melekeok",
      "Airai"
    ],
    "timeZone": "Pacific/Palau"
  },
  {
    "slug": "papua-new-guinea",
    "iso2": "PG",
    "iso3": "PNG",
    "isoNumeric": "598",
    "name": "Papua New Guinea",
    "adjective": "Papua New Guinean",
    "nativeName": "Papua New Guinea",
    "flag": "🇵🇬",
    "language": "English, Tok Pisin, and Hiri Motu",
    "localLanguage": "en-PG",
    "currency": "PGK",
    "currencyName": "Papua New Guinean kina",
    "symbol": "PGK",
    "locale": "en-PG",
    "icu": "en_PG",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+675",
    "capital": "Port Moresby",
    "continent": "Oceania",
    "region": "Melanesia",
    "population": "approximately 10M",
    "identifiers": [
      "Tax Identification Number boundary",
      "company registration number",
      "GST boundary",
      "province/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "TIN boundary",
      "company": "company registration number",
      "tax": "GST / IRC tax boundary",
      "social": "NID boundary",
      "register": "IPA business registry",
      "invoice": "GST tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "province/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "PG-TIN-123456",
      "company": "PG-REG-123456",
      "social": "PG-NID-123456",
      "iban": "PG BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+675 7123 4567",
      "postal": "Port Moresby NCD",
      "plate": "PG 1234",
      "vat": "PG123456789",
      "amount": "1,234.56 PGK",
      "date": "24/07/2026",
      "address": "Waigani, Port Moresby NCD",
      "json": "{\"country\":\"PG\",\"tin\":\"PG123456789\"}"
    },
    "theme": [
      "#000000",
      "#CE1126",
      "#FCD116"
    ],
    "marker": {
      "x": 79,
      "y": 68
    },
    "related": [
      "AU",
      "FJ",
      "SB"
    ],
    "plugTypes": "Type I",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "111 / 112",
    "searchHints": [
      "TIN",
      "IRC",
      "GST",
      "IPA",
      "BANK",
      "PHONE"
    ],
    "cities": [
      "Port Moresby",
      "Lae",
      "Mount Hagen",
      "Madang"
    ],
    "timeZone": "Pacific/Port_Moresby"
  },
  {
    "slug": "samoa",
    "iso2": "WS",
    "iso3": "WSM",
    "isoNumeric": "882",
    "name": "Samoa",
    "adjective": "Samoan",
    "nativeName": "Samoa",
    "flag": "🇼🇸",
    "language": "Samoan and English",
    "localLanguage": "en-WS",
    "currency": "WST",
    "currencyName": "Samoan tala",
    "symbol": "WST",
    "locale": "en-WS",
    "icu": "en_WS",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+685",
    "capital": "Apia",
    "continent": "Oceania",
    "region": "Polynesia",
    "population": "approximately 0.22M",
    "identifiers": [
      "tax identification number boundary",
      "company registration number",
      "VAGST boundary",
      "village/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "tax ID boundary",
      "company": "company registration number",
      "tax": "VAGST / tax boundary",
      "social": "social protection boundary",
      "register": "MCIL company registry",
      "invoice": "tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "village/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "WS-TIN-123456",
      "company": "WS-REG-123456",
      "social": "WS-SOC-123456",
      "iban": "WS BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+685 12345",
      "postal": "Apia",
      "plate": "WS 1234",
      "vat": "WS123456789",
      "amount": "1,234.56 WST",
      "date": "24/07/2026",
      "address": "Beach Road, Apia",
      "json": "{\"country\":\"WS\",\"taxNumber\":\"WS123456789\"}"
    },
    "theme": [
      "#002B7F",
      "#CE1126",
      "#FFFFFF"
    ],
    "marker": {
      "x": 88,
      "y": 74
    },
    "related": [
      "TO",
      "FJ",
      "TV"
    ],
    "plugTypes": "Type I",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "911 / 999",
    "searchHints": [
      "TIN",
      "VAGST",
      "COMPANY",
      "BANK",
      "VILLAGE",
      "PHONE"
    ],
    "cities": [
      "Apia",
      "Vaitele",
      "Faleula",
      "Siusega"
    ],
    "timeZone": "Pacific/Apia"
  },
  {
    "slug": "solomon-islands",
    "iso2": "SB",
    "iso3": "SLB",
    "isoNumeric": "090",
    "name": "Solomon Islands",
    "adjective": "Solomon Islands",
    "nativeName": "Solomon Islands",
    "flag": "🇸🇧",
    "language": "English",
    "localLanguage": "en-SB",
    "currency": "SBD",
    "currencyName": "Solomon Islands dollar",
    "symbol": "SBD",
    "locale": "en-SB",
    "icu": "en_SB",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+677",
    "capital": "Honiara",
    "continent": "Oceania",
    "region": "Melanesia",
    "population": "approximately 0.75M",
    "identifiers": [
      "tax identification number boundary",
      "company registration number",
      "GST/tax boundary",
      "province/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "TIN boundary",
      "company": "company registration number",
      "tax": "GST / tax boundary",
      "social": "social boundary",
      "register": "company registry",
      "invoice": "tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "province/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "SB-TIN-123456",
      "company": "SB-REG-123456",
      "social": "SB-SOC-123456",
      "iban": "SB BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+677 12345",
      "postal": "Honiara",
      "plate": "SB 1234",
      "vat": "SB123456789",
      "amount": "1,234.56 SBD",
      "date": "24/07/2026",
      "address": "Mendana Avenue, Honiara",
      "json": "{\"country\":\"SB\",\"taxNumber\":\"SB123456789\"}"
    },
    "theme": [
      "#0051BA",
      "#FCD116",
      "#215B33"
    ],
    "marker": {
      "x": 82,
      "y": 70
    },
    "related": [
      "PG",
      "FJ",
      "VU"
    ],
    "plugTypes": "Type I / Type G",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "999",
    "searchHints": [
      "TIN",
      "TAX",
      "COMPANY",
      "BANK",
      "PROVINCE",
      "PHONE"
    ],
    "cities": [
      "Honiara",
      "Gizo",
      "Auki",
      "Tulagi"
    ],
    "timeZone": "Pacific/Guadalcanal"
  },
  {
    "slug": "tonga",
    "iso2": "TO",
    "iso3": "TON",
    "isoNumeric": "776",
    "name": "Tonga",
    "adjective": "Tongan",
    "nativeName": "Tonga",
    "flag": "🇹🇴",
    "language": "Tongan and English",
    "localLanguage": "en-TO",
    "currency": "TOP",
    "currencyName": "Tongan paʻanga",
    "symbol": "TOP",
    "locale": "en-TO",
    "icu": "en_TO",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+676",
    "capital": "Nukuʻalofa",
    "continent": "Oceania",
    "region": "Polynesia",
    "population": "approximately 0.11M",
    "identifiers": [
      "tax identification number boundary",
      "company registration number",
      "consumption tax boundary",
      "village/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "tax ID boundary",
      "company": "company registration number",
      "tax": "consumption tax boundary",
      "social": "social boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "village/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "TO-TIN-123456",
      "company": "TO-REG-123456",
      "social": "TO-SOC-123456",
      "iban": "TO BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+676 12345",
      "postal": "Nukuʻalofa",
      "plate": "TO 1234",
      "vat": "TO123456789",
      "amount": "1,234.56 TOP",
      "date": "24/07/2026",
      "address": "Taufaʻahau Road, Nukuʻalofa",
      "json": "{\"country\":\"TO\",\"taxNumber\":\"TO123456789\"}"
    },
    "theme": [
      "#C10000",
      "#FFFFFF",
      "#111827"
    ],
    "marker": {
      "x": 87,
      "y": 77
    },
    "related": [
      "WS",
      "FJ",
      "TV"
    ],
    "plugTypes": "Type I",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "911 / 922",
    "searchHints": [
      "TIN",
      "TAX",
      "COMPANY",
      "BANK",
      "VILLAGE",
      "PHONE"
    ],
    "cities": [
      "Nukuʻalofa",
      "Neiafu",
      "Haveluloto",
      "Vaini"
    ],
    "timeZone": "Pacific/Tongatapu"
  },
  {
    "slug": "tuvalu",
    "iso2": "TV",
    "iso3": "TUV",
    "isoNumeric": "798",
    "name": "Tuvalu",
    "adjective": "Tuvaluan",
    "nativeName": "Tuvalu",
    "flag": "🇹🇻",
    "language": "Tuvaluan and English",
    "localLanguage": "en-TV",
    "currency": "AUD",
    "currencyName": "Australian dollar",
    "symbol": "AUD",
    "locale": "en-TV",
    "icu": "en_TV",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+688",
    "capital": "Funafuti",
    "continent": "Oceania",
    "region": "Polynesia",
    "population": "approximately 0.01M",
    "identifiers": [
      "national ID boundary",
      "company registration number",
      "tax boundary",
      "island/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "national ID boundary",
      "company": "company registration number",
      "tax": "tax boundary",
      "social": "social boundary",
      "register": "business registry",
      "invoice": "invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "island/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "TV-ID-123456",
      "company": "TV-REG-123456",
      "social": "TV-SOC-123456",
      "iban": "TV BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+688 12345",
      "postal": "Funafuti",
      "plate": "TV 1234",
      "vat": "TV123456789",
      "amount": "1,234.56 AUD",
      "date": "24/07/2026",
      "address": "Vaiaku, Funafuti",
      "json": "{\"country\":\"TV\",\"taxNumber\":\"TV123456789\"}"
    },
    "theme": [
      "#5BCAE8",
      "#FFFFFF",
      "#CF142B"
    ],
    "marker": {
      "x": 91,
      "y": 69
    },
    "related": [
      "KI",
      "WS",
      "FJ"
    ],
    "plugTypes": "Type I",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "911",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "COMPANY",
      "BANK",
      "ISLAND",
      "PHONE"
    ],
    "cities": [
      "Funafuti",
      "Vaiaku",
      "Asau",
      "Savave"
    ],
    "timeZone": "Pacific/Funafuti"
  },
  {
    "slug": "vanuatu",
    "iso2": "VU",
    "iso3": "VUT",
    "isoNumeric": "548",
    "name": "Vanuatu",
    "adjective": "Vanuatuan",
    "nativeName": "Vanuatu",
    "flag": "🇻🇺",
    "language": "Bislama, English, and French",
    "localLanguage": "en-VU",
    "currency": "VUV",
    "currencyName": "Vanuatu vatu",
    "symbol": "VUV",
    "locale": "en-VU",
    "icu": "en_VU",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+678",
    "capital": "Port Vila",
    "continent": "Oceania",
    "region": "Melanesia",
    "population": "approximately 0.33M",
    "identifiers": [
      "tax identification number boundary",
      "company registration number",
      "VAT boundary",
      "island/locality",
      "phone"
    ],
    "payments": [
      "bank account",
      "domestic transfer reference",
      "SWIFT/BIC",
      "invoice reference",
      "payment reconciliation"
    ],
    "localTerms": {
      "personal": "tax ID boundary",
      "company": "company registration number",
      "tax": "VAT boundary",
      "social": "social boundary",
      "register": "VFSC / company registry",
      "invoice": "VAT tax invoice",
      "payment": "bank transfer reference",
      "plate": "vehicle plate",
      "postal": "island/locality",
      "privacy": "privacy boundary"
    },
    "samples": {
      "personal": "VU-TIN-123456",
      "company": "VU-REG-123456",
      "social": "VU-SOC-123456",
      "iban": "VU BANK 1234567890",
      "bank": "001 1234567890",
      "phone": "+678 12345",
      "postal": "Port Vila",
      "plate": "VU 1234",
      "vat": "VU123456789",
      "amount": "1,234 VUV",
      "date": "24/07/2026",
      "address": "Lini Highway, Port Vila",
      "json": "{\"country\":\"VU\",\"taxNumber\":\"VU123456789\"}"
    },
    "theme": [
      "#009543",
      "#D21034",
      "#000000"
    ],
    "marker": {
      "x": 83,
      "y": 73
    },
    "related": [
      "FJ",
      "SB",
      "AU"
    ],
    "plugTypes": "Type I",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 111",
    "searchHints": [
      "TIN",
      "VAT",
      "COMPANY",
      "BANK",
      "ISLAND",
      "PHONE"
    ],
    "cities": [
      "Port Vila",
      "Luganville",
      "Norsup",
      "Isangel"
    ],
    "timeZone": "Pacific/Efate"
  }
];

const COUNTRY_TIME_ZONES = {
  japan: 'Asia/Tokyo (JST)',
  india: 'Asia/Kolkata (IST)',
  singapore: 'Oceania/Abidjan (GMT)',
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
region: Oceania
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
      outlineSrc: `/assets/images/countries/${country.slug}-outline.jpg`,
      outlineAlt: `${country.name} country outline`,
      mapSrc: `/assets/images/countries/${country.slug}-location.jpg`,
      mapAlt: `World map with ${country.name} location marker`,
      mapMarker: { ...country.marker, label: country.name },
      source: 'Premium raster country visual generated once for ValidoHub country navigation'
    },
    catalog: {
      id: country.slug, flag: country.flag, name: country.name, nativeName: country.nativeName, iso2: country.iso2, iso3: country.iso3,
      continent: 'Oceania', region: 'Oceania', language: country.language, currency: country.currency, currencyName: country.currencyName,
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
        capital: country.capital, continent: 'Oceania', region: country.region, languages: country.language, currency: country.currencyName,
        currencyCode: country.currency, callingCode: country.phone, internetTld: `.${country.iso2.toLowerCase()}`, drivingSide: 'Right',
        iso2: country.iso2, iso3: country.iso3, isoNumeric: country.isoNumeric, locale: country.locale, icuLocale: country.icu,
        dateFormat: country.date, timeFormat: '24-hour, HH:mm', decimalSeparator: country.decimal, thousandsSeparator: country.thousands,
        addressFormat: `Street, number, postal code, locality, ${country.name}`, postalCodeFormat: country.localTerms.postal,
        primaryTimeZone: COUNTRY_TIME_ZONES[country.slug] || 'Oceania/Abidjan (GMT)', measurementSystem: 'Metric', paperSize: 'A4', emergencyNumber: country.emergencyNumber || '112', weekStarts: 'Monday',
        rtlSupport: 'No', unicodeLocale: country.locale, cldrLocale: country.icu, metricVsImperial: 'Metric-first',
        powerPlugTypes: country.plugTypes || 'Type C / Type F', voltage: country.voltage || '230V', frequency: country.frequency || '50Hz'
      },
      visualIdentity: {
        countryId: country.slug, outlineLabel: `${country.name} outline`, mapLabel: `${country.name} in the world`, continentBadge: 'Oceania', flagLabel: `${country.name} flag`,
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
  write('docs/product/OCEANIA_PREMIUM_SUITE_SPEC.md', `# Oceania Baseline Batch Suite Spec

This spec covers the Oceania baseline generation batch: ${list}.

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. 60 tools is a density reference, not a cap or a filler target: add every meaningful local validator/generator/parser/debugger, and stop only when the local market truly has no more useful workflows.
- Every tool must render compact premium shell UI, validate/generate/explain where safe, validation pipeline, result cards, field breakdown, tool-context explanation, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Local generators must create fresh values on every Generate click, enforce country prefixes/check digits, and route invalid/bad-prefix fixtures into review/error states rather than green success.
- Country-specific analyzers must replace generic parser output whenever a local identifier has real structure. Generic "source payload / offline only" breakdown is only a fallback for tools with no formal structure.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.
- Only UN member sovereign Oceania countries are included; territories and dependencies require an explicit product decision before inclusion.

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
    const marker = 'Oceania baseline expansion batch';
    if (!text.includes(marker)) {
      text = `## 2026-07-24 - ${marker}\n\n- Added a documented Oceania premium generation batch for ${list}.\n- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.\n- Added \`docs/product/OCEANIA_PREMIUM_SUITE_SPEC.md\` so future AI sessions treat batch generation quality as a contract, not a one-off.\n\n` + text;
      fs.writeFileSync(changelog, text);
    }
  }
  const current = path.join(ROOT, 'docs/product/CURRENT_STATE.md');
  if (fs.existsSync(current)) {
    let text = fs.readFileSync(current, 'utf8');
    const marker = 'Oceania Baseline Batch V1';
    if (!text.includes(marker)) {
      text += `\n\n## ${marker}\n\nOceania coverage is generated as a baseline country-suite skeleton with Country Suite Factory V1. Each country uses quality-driven local developer workbenches, field breakdown on every tool, seven production runtime locales, validate/generate affordances where safe, same-country related links, rich country hub sections, and explicit official/live lookup boundaries. Only UN member sovereign Oceania countries are included; territories and dependencies require an explicit product decision before inclusion.\n`;
      fs.writeFileSync(current, text);
    }
  }
  const registry = path.join(ROOT, 'docs/product/WORKBENCH_REGISTRY.md');
  if (fs.existsSync(registry)) {
    let text = fs.readFileSync(registry, 'utf8');
    const marker = 'Oceania Baseline Batch V1';
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
  console.log(`Generated Oceania ${COUNTRIES.length} countries and ${COUNTRIES.length * TOOL_TEMPLATES.length} tools.`);
}

main();
