#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const COUNTRIES = [
  {
    "slug": "algeria",
    "iso2": "DZ",
    "iso3": "DZA",
    "isoNumeric": "012",
    "name": "Algeria",
    "adjective": "Algerian",
    "nativeName": "Al-Jazair",
    "flag": "🇩🇿",
    "language": "Arabic and Tamazight",
    "localLanguage": "ar-DZ",
    "currency": "DZD",
    "currencyName": "Algerian dinar",
    "symbol": "DZD",
    "locale": "ar-DZ",
    "icu": "ar_DZ",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+213",
    "capital": "Algiers",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 47M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "DZ-ID-123456",
      "company": "DZ-REG-123456",
      "social": "DZ-SOC-123456",
      "iban": "DZ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+213 123 456 789",
      "postal": "1000 Algiers",
      "plate": "DZ 1234",
      "vat": "DZ123456789",
      "amount": "1,234.56 DZD",
      "date": "24/07/2026",
      "address": "Central business district, Algiers 1000",
      "json": "{\"country\":\"DZ\",\"taxNumber\":\"DZ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#006233",
      "#FFFFFF",
      "#D21034"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "14 / 17 / 102",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Algiers",
      "Oran",
      "Constantine",
      "Annaba"
    ],
    "timeZone": "Africa/Algiers"
  },
  {
    "slug": "angola",
    "iso2": "AO",
    "iso3": "AGO",
    "isoNumeric": "024",
    "name": "Angola",
    "adjective": "Angolan",
    "nativeName": "Angola",
    "flag": "🇦🇴",
    "language": "Portuguese",
    "localLanguage": "pt-AO",
    "currency": "AOA",
    "currencyName": "Angolan kwanza",
    "symbol": "AOA",
    "locale": "pt-AO",
    "icu": "pt_AO",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Dot (.)",
    "phone": "+244",
    "capital": "Luanda",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 37M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "AO-ID-123456",
      "company": "AO-REG-123456",
      "social": "AO-SOC-123456",
      "iban": "AO00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+244 123 456 789",
      "postal": "1000 Luanda",
      "plate": "AO 1234",
      "vat": "AO123456789",
      "amount": "1,234.56 AOA",
      "date": "24/07/2026",
      "address": "Central business district, Luanda 1000",
      "json": "{\"country\":\"AO\",\"taxNumber\":\"AO123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CC092F",
      "#000000",
      "#FFCB00"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "113 / 115",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Luanda",
      "Huambo",
      "Lobito",
      "Benguela"
    ],
    "timeZone": "Africa/Luanda"
  },
  {
    "slug": "benin",
    "iso2": "BJ",
    "iso3": "BEN",
    "isoNumeric": "204",
    "name": "Benin",
    "adjective": "Beninese",
    "nativeName": "Benin",
    "flag": "🇧🇯",
    "language": "French",
    "localLanguage": "fr-BJ",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-BJ",
    "icu": "fr_BJ",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+229",
    "capital": "Porto-Novo",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 14M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "BJ-ID-123456",
      "company": "BJ-REG-123456",
      "social": "BJ-SOC-123456",
      "iban": "BJ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+229 123 456 789",
      "postal": "1000 Porto-Novo",
      "plate": "BJ 1234",
      "vat": "BJ123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Porto-Novo 1000",
      "json": "{\"country\":\"BJ\",\"taxNumber\":\"BJ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#008751",
      "#FCD116",
      "#E8112D"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Cotonou",
      "Porto-Novo",
      "Parakou",
      "Abomey-Calavi"
    ],
    "timeZone": "Africa/Porto-Novo"
  },
  {
    "slug": "botswana",
    "iso2": "BW",
    "iso3": "BWA",
    "isoNumeric": "072",
    "name": "Botswana",
    "adjective": "Botswana",
    "nativeName": "Botswana",
    "flag": "🇧🇼",
    "language": "English and Tswana",
    "localLanguage": "en-BW",
    "currency": "BWP",
    "currencyName": "Botswana pula",
    "symbol": "BWP",
    "locale": "en-BW",
    "icu": "en_BW",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+267",
    "capital": "Gaborone",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 2.7M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "BW-ID-123456",
      "company": "BW-REG-123456",
      "social": "BW-SOC-123456",
      "iban": "BW00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+267 123 456 789",
      "postal": "1000 Gaborone",
      "plate": "BW 1234",
      "vat": "BW123456789",
      "amount": "1,234.56 BWP",
      "date": "24/07/2026",
      "address": "Central business district, Gaborone 1000",
      "json": "{\"country\":\"BW\",\"taxNumber\":\"BW123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#75AADB",
      "#000000",
      "#FFFFFF"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Gaborone",
      "Francistown",
      "Molepolole",
      "Maun"
    ],
    "timeZone": "Africa/Gaborone"
  },
  {
    "slug": "burkina-faso",
    "iso2": "BF",
    "iso3": "BFA",
    "isoNumeric": "854",
    "name": "Burkina Faso",
    "adjective": "Burkinabe",
    "nativeName": "Burkina Faso",
    "flag": "🇧🇫",
    "language": "French",
    "localLanguage": "fr-BF",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-BF",
    "icu": "fr_BF",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+226",
    "capital": "Ouagadougou",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 23M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "BF-ID-123456",
      "company": "BF-REG-123456",
      "social": "BF-SOC-123456",
      "iban": "BF00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+226 123 456 789",
      "postal": "1000 Ouagadougou",
      "plate": "BF 1234",
      "vat": "BF123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Ouagadougou 1000",
      "json": "{\"country\":\"BF\",\"taxNumber\":\"BF123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#EF2B2D",
      "#009E49",
      "#FCD116"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Ouagadougou",
      "Bobo-Dioulasso",
      "Koudougou",
      "Ouahigouya"
    ],
    "timeZone": "Africa/Ouagadougou"
  },
  {
    "slug": "burundi",
    "iso2": "BI",
    "iso3": "BDI",
    "isoNumeric": "108",
    "name": "Burundi",
    "adjective": "Burundian",
    "nativeName": "Burundi",
    "flag": "🇧🇮",
    "language": "Kirundi, French, and English",
    "localLanguage": "fr-BI",
    "currency": "BIF",
    "currencyName": "Burundian franc",
    "symbol": "BIF",
    "locale": "fr-BI",
    "icu": "fr_BI",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+257",
    "capital": "Gitega",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 14M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "BI-ID-123456",
      "company": "BI-REG-123456",
      "social": "BI-SOC-123456",
      "iban": "BI00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+257 123 456 789",
      "postal": "1000 Gitega",
      "plate": "BI 1234",
      "vat": "BI123456789",
      "amount": "1,234.56 BIF",
      "date": "24/07/2026",
      "address": "Central business district, Gitega 1000",
      "json": "{\"country\":\"BI\",\"taxNumber\":\"BI123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#1EB53A",
      "#FFFFFF",
      "#CE1126"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Bujumbura",
      "Gitega",
      "Ngozi",
      "Rumonge"
    ],
    "timeZone": "Africa/Bujumbura"
  },
  {
    "slug": "cabo-verde",
    "iso2": "CV",
    "iso3": "CPV",
    "isoNumeric": "132",
    "name": "Cabo Verde",
    "adjective": "Cabo Verdean",
    "nativeName": "Cabo Verde",
    "flag": "🇨🇻",
    "language": "Portuguese",
    "localLanguage": "pt-CV",
    "currency": "CVE",
    "currencyName": "Cape Verdean escudo",
    "symbol": "CVE",
    "locale": "pt-CV",
    "icu": "pt_CV",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+238",
    "capital": "Praia",
    "continent": "Africa",
    "region": "Western Africa / Atlantic",
    "population": "approximately 0.6M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CV-ID-123456",
      "company": "CV-REG-123456",
      "social": "CV-SOC-123456",
      "iban": "CV00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+238 123 456 789",
      "postal": "1000 Praia",
      "plate": "CV 1234",
      "vat": "CV123456789",
      "amount": "1,234.56 CVE",
      "date": "24/07/2026",
      "address": "Central business district, Praia 1000",
      "json": "{\"country\":\"CV\",\"taxNumber\":\"CV123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#003893",
      "#FFFFFF",
      "#CF2027"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "132 / 130",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Praia",
      "Mindelo",
      "Santa Maria",
      "Assomada"
    ],
    "timeZone": "Atlantic/Cape_Verde"
  },
  {
    "slug": "cameroon",
    "iso2": "CM",
    "iso3": "CMR",
    "isoNumeric": "120",
    "name": "Cameroon",
    "adjective": "Cameroonian",
    "nativeName": "Cameroon",
    "flag": "🇨🇲",
    "language": "French and English",
    "localLanguage": "fr-CM",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "fr-CM",
    "icu": "fr_CM",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+237",
    "capital": "Yaounde",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 29M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CM-ID-123456",
      "company": "CM-REG-123456",
      "social": "CM-SOC-123456",
      "iban": "CM00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+237 123 456 789",
      "postal": "1000 Yaounde",
      "plate": "CM 1234",
      "vat": "CM123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, Yaounde 1000",
      "json": "{\"country\":\"CM\",\"taxNumber\":\"CM123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#007A5E",
      "#CE1126",
      "#FCD116"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Douala",
      "Yaounde",
      "Garoua",
      "Bamenda"
    ],
    "timeZone": "Africa/Douala"
  },
  {
    "slug": "central-african-republic",
    "iso2": "CF",
    "iso3": "CAF",
    "isoNumeric": "140",
    "name": "Central African Republic",
    "adjective": "Central African",
    "nativeName": "Republique centrafricaine",
    "flag": "🇨🇫",
    "language": "French and Sango",
    "localLanguage": "fr-CF",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "fr-CF",
    "icu": "fr_CF",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+236",
    "capital": "Bangui",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 5.8M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CF-ID-123456",
      "company": "CF-REG-123456",
      "social": "CF-SOC-123456",
      "iban": "CF00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+236 123 456 789",
      "postal": "1000 Bangui",
      "plate": "CF 1234",
      "vat": "CF123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, Bangui 1000",
      "json": "{\"country\":\"CF\",\"taxNumber\":\"CF123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#003082",
      "#FFFFFF",
      "#D21034"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Bangui",
      "Bimbo",
      "Berberati",
      "Carnot"
    ],
    "timeZone": "Africa/Bangui"
  },
  {
    "slug": "chad",
    "iso2": "TD",
    "iso3": "TCD",
    "isoNumeric": "148",
    "name": "Chad",
    "adjective": "Chadian",
    "nativeName": "Tchad",
    "flag": "🇹🇩",
    "language": "Arabic and French",
    "localLanguage": "fr-TD",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "fr-TD",
    "icu": "fr_TD",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+235",
    "capital": "NDjamena",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 18M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "TD-ID-123456",
      "company": "TD-REG-123456",
      "social": "TD-SOC-123456",
      "iban": "TD00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+235 123 456 789",
      "postal": "1000 NDjamena",
      "plate": "TD 1234",
      "vat": "TD123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, NDjamena 1000",
      "json": "{\"country\":\"TD\",\"taxNumber\":\"TD123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#002664",
      "#FECB00",
      "#C60C30"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type E / Type F",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "NDjamena",
      "Moundou",
      "Abeche",
      "Sarh"
    ],
    "timeZone": "Africa/Ndjamena"
  },
  {
    "slug": "comoros",
    "iso2": "KM",
    "iso3": "COM",
    "isoNumeric": "174",
    "name": "Comoros",
    "adjective": "Comorian",
    "nativeName": "Comores",
    "flag": "🇰🇲",
    "language": "Comorian, Arabic, and French",
    "localLanguage": "fr-KM",
    "currency": "KMF",
    "currencyName": "Comorian franc",
    "symbol": "KMF",
    "locale": "fr-KM",
    "icu": "fr_KM",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+269",
    "capital": "Moroni",
    "continent": "Africa",
    "region": "Eastern Africa / Indian Ocean",
    "population": "approximately 0.9M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "KM-ID-123456",
      "company": "KM-REG-123456",
      "social": "KM-SOC-123456",
      "iban": "KM00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+269 123 456 789",
      "postal": "1000 Moroni",
      "plate": "KM 1234",
      "vat": "KM123456789",
      "amount": "1,234.56 KMF",
      "date": "24/07/2026",
      "address": "Central business district, Moroni 1000",
      "json": "{\"country\":\"KM\",\"taxNumber\":\"KM123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#3A75C4",
      "#FFC61E",
      "#3D8E33"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Moroni",
      "Mutsamudu",
      "Fomboni",
      "Domoni"
    ],
    "timeZone": "Indian/Comoro"
  },
  {
    "slug": "congo",
    "iso2": "CG",
    "iso3": "COG",
    "isoNumeric": "178",
    "name": "Republic of the Congo",
    "adjective": "Congolese",
    "nativeName": "Congo",
    "flag": "🇨🇬",
    "language": "French",
    "localLanguage": "fr-CG",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "fr-CG",
    "icu": "fr_CG",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+242",
    "capital": "Brazzaville",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 6M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CG-ID-123456",
      "company": "CG-REG-123456",
      "social": "CG-SOC-123456",
      "iban": "CG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+242 123 456 789",
      "postal": "1000 Brazzaville",
      "plate": "CG 1234",
      "vat": "CG123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, Brazzaville 1000",
      "json": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#009543",
      "#FBDE4A",
      "#DC241F"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Brazzaville",
      "Pointe-Noire",
      "Dolisie",
      "Nkayi"
    ],
    "timeZone": "Africa/Brazzaville"
  },
  {
    "slug": "cote-d-ivoire",
    "iso2": "CI",
    "iso3": "CIV",
    "isoNumeric": "384",
    "name": "Cote dIvoire",
    "adjective": "Ivorian",
    "nativeName": "Cote dIvoire",
    "flag": "🇨🇮",
    "language": "French",
    "localLanguage": "fr-CI",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-CI",
    "icu": "fr_CI",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+225",
    "capital": "Yamoussoukro",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 31M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CI-ID-123456",
      "company": "CI-REG-123456",
      "social": "CI-SOC-123456",
      "iban": "CI00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+225 123 456 789",
      "postal": "1000 Yamoussoukro",
      "plate": "CI 1234",
      "vat": "CI123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Yamoussoukro 1000",
      "json": "{\"country\":\"CI\",\"taxNumber\":\"CI123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#F77F00",
      "#FFFFFF",
      "#009E60"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "110 / 111 / 180",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Abidjan",
      "Bouake",
      "Yamoussoukro",
      "Daloa"
    ],
    "timeZone": "Africa/Abidjan"
  },
  {
    "slug": "democratic-republic-of-the-congo",
    "iso2": "CD",
    "iso3": "COD",
    "isoNumeric": "180",
    "name": "Democratic Republic of the Congo",
    "adjective": "Congolese",
    "nativeName": "Republique democratique du Congo",
    "flag": "🇨🇩",
    "language": "French",
    "localLanguage": "fr-CD",
    "currency": "CDF",
    "currencyName": "Congolese franc",
    "symbol": "CDF",
    "locale": "fr-CD",
    "icu": "fr_CD",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+243",
    "capital": "Kinshasa",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 105M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "CD-ID-123456",
      "company": "CD-REG-123456",
      "social": "CD-SOC-123456",
      "iban": "CD00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+243 123 456 789",
      "postal": "1000 Kinshasa",
      "plate": "CD 1234",
      "vat": "CD123456789",
      "amount": "1,234.56 CDF",
      "date": "24/07/2026",
      "address": "Central business district, Kinshasa 1000",
      "json": "{\"country\":\"CD\",\"taxNumber\":\"CD123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#007FFF",
      "#F7D618",
      "#CE1021"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Kinshasa",
      "Lubumbashi",
      "Mbuji-Mayi",
      "Kisangani"
    ],
    "timeZone": "Africa/Kinshasa"
  },
  {
    "slug": "djibouti",
    "iso2": "DJ",
    "iso3": "DJI",
    "isoNumeric": "262",
    "name": "Djibouti",
    "adjective": "Djiboutian",
    "nativeName": "Jabuuti / Djibouti",
    "flag": "🇩🇯",
    "language": "Arabic and French",
    "localLanguage": "fr-DJ",
    "currency": "DJF",
    "currencyName": "Djiboutian franc",
    "symbol": "DJF",
    "locale": "fr-DJ",
    "icu": "fr_DJ",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+253",
    "capital": "Djibouti",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 1.1M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "DJ-ID-123456",
      "company": "DJ-REG-123456",
      "social": "DJ-SOC-123456",
      "iban": "DJ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+253 123 456 789",
      "postal": "1000 Djibouti",
      "plate": "DJ 1234",
      "vat": "DJ123456789",
      "amount": "1,234.56 DJF",
      "date": "24/07/2026",
      "address": "Central business district, Djibouti 1000",
      "json": "{\"country\":\"DJ\",\"taxNumber\":\"DJ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#6AB2E7",
      "#12AD2B",
      "#D7141A"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Djibouti",
      "Ali Sabieh",
      "Tadjoura",
      "Obock"
    ],
    "timeZone": "Africa/Djibouti"
  },
  {
    "slug": "egypt",
    "iso2": "EG",
    "iso3": "EGY",
    "isoNumeric": "818",
    "name": "Egypt",
    "adjective": "Egyptian",
    "nativeName": "Misr",
    "flag": "🇪🇬",
    "language": "Arabic",
    "localLanguage": "ar-EG",
    "currency": "EGP",
    "currencyName": "Egyptian pound",
    "symbol": "EGP",
    "locale": "ar-EG",
    "icu": "ar_EG",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+20",
    "capital": "Cairo",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 112M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "EG-ID-123456",
      "company": "EG-REG-123456",
      "social": "EG-SOC-123456",
      "iban": "EG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+20 123 456 789",
      "postal": "1000 Cairo",
      "plate": "EG 1234",
      "vat": "EG123456789",
      "amount": "1,234.56 EGP",
      "date": "24/07/2026",
      "address": "Central business district, Cairo 1000",
      "json": "{\"country\":\"EG\",\"taxNumber\":\"EG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CE1126",
      "#FFFFFF",
      "#000000"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "122 / 123 / 180",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Cairo",
      "Alexandria",
      "Giza",
      "Shubra El Kheima"
    ],
    "timeZone": "Africa/Cairo"
  },
  {
    "slug": "equatorial-guinea",
    "iso2": "GQ",
    "iso3": "GNQ",
    "isoNumeric": "226",
    "name": "Equatorial Guinea",
    "adjective": "Equatoguinean",
    "nativeName": "Guinea Ecuatorial",
    "flag": "🇬🇶",
    "language": "Spanish, French, and Portuguese",
    "localLanguage": "es-GQ",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "es-GQ",
    "icu": "es_GQ",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Dot (.)",
    "phone": "+240",
    "capital": "Malabo",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 1.8M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GQ-ID-123456",
      "company": "GQ-REG-123456",
      "social": "GQ-SOC-123456",
      "iban": "GQ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+240 123 456 789",
      "postal": "1000 Malabo",
      "plate": "GQ 1234",
      "vat": "GQ123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, Malabo 1000",
      "json": "{\"country\":\"GQ\",\"taxNumber\":\"GQ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#3E9A00",
      "#FFFFFF",
      "#E32118"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 114 / 115",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Bata",
      "Malabo",
      "Ebebiyin",
      "Aconibe"
    ],
    "timeZone": "Africa/Malabo"
  },
  {
    "slug": "eritrea",
    "iso2": "ER",
    "iso3": "ERI",
    "isoNumeric": "232",
    "name": "Eritrea",
    "adjective": "Eritrean",
    "nativeName": "Eritrea",
    "flag": "🇪🇷",
    "language": "Tigrinya, Arabic, and English",
    "localLanguage": "ti-ER",
    "currency": "ERN",
    "currencyName": "Eritrean nakfa",
    "symbol": "ERN",
    "locale": "en-ER",
    "icu": "en_ER",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+291",
    "capital": "Asmara",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 3.7M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ER-ID-123456",
      "company": "ER-REG-123456",
      "social": "ER-SOC-123456",
      "iban": "ER00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+291 123 456 789",
      "postal": "1000 Asmara",
      "plate": "ER 1234",
      "vat": "ER123456789",
      "amount": "1,234.56 ERN",
      "date": "24/07/2026",
      "address": "Central business district, Asmara 1000",
      "json": "{\"country\":\"ER\",\"taxNumber\":\"ER123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#12AD2B",
      "#4189DD",
      "#EA0437"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type L",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "113 / 114 / 116",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Asmara",
      "Keren",
      "Massawa",
      "Assab"
    ],
    "timeZone": "Africa/Asmara"
  },
  {
    "slug": "eswatini",
    "iso2": "SZ",
    "iso3": "SWZ",
    "isoNumeric": "748",
    "name": "Eswatini",
    "adjective": "Swazi",
    "nativeName": "eSwatini",
    "flag": "🇸🇿",
    "language": "Swati and English",
    "localLanguage": "en-SZ",
    "currency": "SZL",
    "currencyName": "Swazi lilangeni",
    "symbol": "SZL",
    "locale": "en-SZ",
    "icu": "en_SZ",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+268",
    "capital": "Mbabane",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 1.2M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SZ-ID-123456",
      "company": "SZ-REG-123456",
      "social": "SZ-SOC-123456",
      "iban": "SZ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+268 123 456 789",
      "postal": "1000 Mbabane",
      "plate": "SZ 1234",
      "vat": "SZ123456789",
      "amount": "1,234.56 SZL",
      "date": "24/07/2026",
      "address": "Central business district, Mbabane 1000",
      "json": "{\"country\":\"SZ\",\"taxNumber\":\"SZ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#3E5EB9",
      "#FFD900",
      "#B10C0C"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type M",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 977",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Manzini",
      "Mbabane",
      "Big Bend",
      "Malkerns"
    ],
    "timeZone": "Africa/Mbabane"
  },
  {
    "slug": "ethiopia",
    "iso2": "ET",
    "iso3": "ETH",
    "isoNumeric": "231",
    "name": "Ethiopia",
    "adjective": "Ethiopian",
    "nativeName": "Ityophiya",
    "flag": "🇪🇹",
    "language": "Amharic",
    "localLanguage": "am-ET",
    "currency": "ETB",
    "currencyName": "Ethiopian birr",
    "symbol": "ETB",
    "locale": "am-ET",
    "icu": "am_ET",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+251",
    "capital": "Addis Ababa",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 129M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ET-ID-123456",
      "company": "ET-REG-123456",
      "social": "ET-SOC-123456",
      "iban": "ET00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+251 123 456 789",
      "postal": "1000 Addis Ababa",
      "plate": "ET 1234",
      "vat": "ET123456789",
      "amount": "1,234.56 ETB",
      "date": "24/07/2026",
      "address": "Central business district, Addis Ababa 1000",
      "json": "{\"country\":\"ET\",\"taxNumber\":\"ET123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#078930",
      "#FCDD09",
      "#DA121A"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "911 / 907",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Addis Ababa",
      "Dire Dawa",
      "Mekelle",
      "Gondar"
    ],
    "timeZone": "Africa/Addis_Ababa"
  },
  {
    "slug": "gabon",
    "iso2": "GA",
    "iso3": "GAB",
    "isoNumeric": "266",
    "name": "Gabon",
    "adjective": "Gabonese",
    "nativeName": "Gabon",
    "flag": "🇬🇦",
    "language": "French",
    "localLanguage": "fr-GA",
    "currency": "XAF",
    "currencyName": "Central African CFA franc",
    "symbol": "XAF",
    "locale": "fr-GA",
    "icu": "fr_GA",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+241",
    "capital": "Libreville",
    "continent": "Africa",
    "region": "Middle Africa",
    "population": "approximately 2.5M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GA-ID-123456",
      "company": "GA-REG-123456",
      "social": "GA-SOC-123456",
      "iban": "GA00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+241 123 456 789",
      "postal": "1000 Libreville",
      "plate": "GA 1234",
      "vat": "GA123456789",
      "amount": "1,234.56 XAF",
      "date": "24/07/2026",
      "address": "Central business district, Libreville 1000",
      "json": "{\"country\":\"GA\",\"taxNumber\":\"GA123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#009E60",
      "#FCD116",
      "#3A75C4"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "1730 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Libreville",
      "Port-Gentil",
      "Franceville",
      "Oyem"
    ],
    "timeZone": "Africa/Libreville"
  },
  {
    "slug": "gambia",
    "iso2": "GM",
    "iso3": "GMB",
    "isoNumeric": "270",
    "name": "Gambia",
    "adjective": "Gambian",
    "nativeName": "The Gambia",
    "flag": "🇬🇲",
    "language": "English",
    "localLanguage": "en-GM",
    "currency": "GMD",
    "currencyName": "Gambian dalasi",
    "symbol": "GMD",
    "locale": "en-GM",
    "icu": "en_GM",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+220",
    "capital": "Banjul",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 2.8M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GM-ID-123456",
      "company": "GM-REG-123456",
      "social": "GM-SOC-123456",
      "iban": "GM00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+220 123 456 789",
      "postal": "1000 Banjul",
      "plate": "GM 1234",
      "vat": "GM123456789",
      "amount": "1,234.56 GMD",
      "date": "24/07/2026",
      "address": "Central business district, Banjul 1000",
      "json": "{\"country\":\"GM\",\"taxNumber\":\"GM123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CE1126",
      "#FFFFFF",
      "#0C1C8C"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Serekunda",
      "Brikama",
      "Bakau",
      "Banjul"
    ],
    "timeZone": "Africa/Banjul"
  },
  {
    "slug": "ghana",
    "iso2": "GH",
    "iso3": "GHA",
    "isoNumeric": "288",
    "name": "Ghana",
    "adjective": "Ghanaian",
    "nativeName": "Ghana",
    "flag": "🇬🇭",
    "language": "English",
    "localLanguage": "en-GH",
    "currency": "GHS",
    "currencyName": "Ghanaian cedi",
    "symbol": "GHS",
    "locale": "en-GH",
    "icu": "en_GH",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+233",
    "capital": "Accra",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 34M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GH-ID-123456",
      "company": "GH-REG-123456",
      "social": "GH-SOC-123456",
      "iban": "GH00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+233 123 456 789",
      "postal": "1000 Accra",
      "plate": "GH 1234",
      "vat": "GH123456789",
      "amount": "1,234.56 GHS",
      "date": "24/07/2026",
      "address": "Central business district, Accra 1000",
      "json": "{\"country\":\"GH\",\"taxNumber\":\"GH123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CE1126",
      "#FCD116",
      "#006B3F"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 999",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Accra",
      "Kumasi",
      "Tamale",
      "Sekondi-Takoradi"
    ],
    "timeZone": "Africa/Accra"
  },
  {
    "slug": "guinea",
    "iso2": "GN",
    "iso3": "GIN",
    "isoNumeric": "324",
    "name": "Guinea",
    "adjective": "Guinean",
    "nativeName": "Guinee",
    "flag": "🇬🇳",
    "language": "French",
    "localLanguage": "fr-GN",
    "currency": "GNF",
    "currencyName": "Guinean franc",
    "symbol": "GNF",
    "locale": "fr-GN",
    "icu": "fr_GN",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+224",
    "capital": "Conakry",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 14M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GN-ID-123456",
      "company": "GN-REG-123456",
      "social": "GN-SOC-123456",
      "iban": "GN00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+224 123 456 789",
      "postal": "1000 Conakry",
      "plate": "GN 1234",
      "vat": "GN123456789",
      "amount": "1,234.56 GNF",
      "date": "24/07/2026",
      "address": "Central business district, Conakry 1000",
      "json": "{\"country\":\"GN\",\"taxNumber\":\"GN123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CE1126",
      "#FCD116",
      "#009460"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F / Type K",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Conakry",
      "Nzerekore",
      "Kankan",
      "Kindia"
    ],
    "timeZone": "Africa/Conakry"
  },
  {
    "slug": "guinea-bissau",
    "iso2": "GW",
    "iso3": "GNB",
    "isoNumeric": "624",
    "name": "Guinea-Bissau",
    "adjective": "Bissau-Guinean",
    "nativeName": "Guine-Bissau",
    "flag": "🇬🇼",
    "language": "Portuguese",
    "localLanguage": "pt-GW",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "pt-GW",
    "icu": "pt_GW",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+245",
    "capital": "Bissau",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 2.2M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "GW-ID-123456",
      "company": "GW-REG-123456",
      "social": "GW-SOC-123456",
      "iban": "GW00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+245 123 456 789",
      "postal": "1000 Bissau",
      "plate": "GW 1234",
      "vat": "GW123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Bissau 1000",
      "json": "{\"country\":\"GW\",\"taxNumber\":\"GW123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#CE1126",
      "#FCD116",
      "#009E49"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 117",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Bissau",
      "Bafata",
      "Gabu",
      "Bissora"
    ],
    "timeZone": "Africa/Bissau"
  },
  {
    "slug": "kenya",
    "iso2": "KE",
    "iso3": "KEN",
    "isoNumeric": "404",
    "name": "Kenya",
    "adjective": "Kenyan",
    "nativeName": "Kenya",
    "flag": "🇰🇪",
    "language": "Swahili and English",
    "localLanguage": "en-KE",
    "currency": "KES",
    "currencyName": "Kenyan shilling",
    "symbol": "KES",
    "locale": "en-KE",
    "icu": "en_KE",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+254",
    "capital": "Nairobi",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 56M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "KE-ID-123456",
      "company": "KE-REG-123456",
      "social": "KE-SOC-123456",
      "iban": "KE00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+254 123 456 789",
      "postal": "1000 Nairobi",
      "plate": "KE 1234",
      "vat": "KE123456789",
      "amount": "1,234.56 KES",
      "date": "24/07/2026",
      "address": "Central business district, Nairobi 1000",
      "json": "{\"country\":\"KE\",\"taxNumber\":\"KE123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#000000",
      "#BB0000",
      "#006600"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG"
    ],
    "plugTypes": "Type G",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Nairobi",
      "Mombasa",
      "Kisumu",
      "Nakuru"
    ],
    "timeZone": "Africa/Nairobi"
  },
  {
    "slug": "lesotho",
    "iso2": "LS",
    "iso3": "LSO",
    "isoNumeric": "426",
    "name": "Lesotho",
    "adjective": "Basotho",
    "nativeName": "Lesotho",
    "flag": "🇱🇸",
    "language": "Sesotho and English",
    "localLanguage": "en-LS",
    "currency": "LSL",
    "currencyName": "Lesotho loti",
    "symbol": "LSL",
    "locale": "en-LS",
    "icu": "en_LS",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+266",
    "capital": "Maseru",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 2.3M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "LS-ID-123456",
      "company": "LS-REG-123456",
      "social": "LS-SOC-123456",
      "iban": "LS00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+266 123 456 789",
      "postal": "1000 Maseru",
      "plate": "LS 1234",
      "vat": "LS123456789",
      "amount": "1,234.56 LSL",
      "date": "24/07/2026",
      "address": "Central business district, Maseru 1000",
      "json": "{\"country\":\"LS\",\"taxNumber\":\"LS123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#00209F",
      "#FFFFFF",
      "#009543"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type M",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 123",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Maseru",
      "Teyateyaneng",
      "Mafeteng",
      "Hlotse"
    ],
    "timeZone": "Africa/Maseru"
  },
  {
    "slug": "liberia",
    "iso2": "LR",
    "iso3": "LBR",
    "isoNumeric": "430",
    "name": "Liberia",
    "adjective": "Liberian",
    "nativeName": "Liberia",
    "flag": "🇱🇷",
    "language": "English",
    "localLanguage": "en-LR",
    "currency": "LRD",
    "currencyName": "Liberian dollar",
    "symbol": "LRD",
    "locale": "en-LR",
    "icu": "en_LR",
    "date": "MM/DD/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+231",
    "capital": "Monrovia",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 5.5M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "LR-ID-123456",
      "company": "LR-REG-123456",
      "social": "LR-SOC-123456",
      "iban": "LR00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+231 123 456 789",
      "postal": "1000 Monrovia",
      "plate": "LR 1234",
      "vat": "LR123456789",
      "amount": "1,234.56 LRD",
      "date": "24/07/2026",
      "address": "Central business district, Monrovia 1000",
      "json": "{\"country\":\"LR\",\"taxNumber\":\"LR123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#BF0A30",
      "#FFFFFF",
      "#002868"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type A / Type B / Type C / Type F",
    "voltage": "120V / 220V",
    "frequency": "50Hz / 60Hz",
    "emergencyNumber": "911",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Monrovia",
      "Gbarnga",
      "Buchanan",
      "Ganta"
    ],
    "timeZone": "Africa/Monrovia"
  },
  {
    "slug": "libya",
    "iso2": "LY",
    "iso3": "LBY",
    "isoNumeric": "434",
    "name": "Libya",
    "adjective": "Libyan",
    "nativeName": "Libya",
    "flag": "🇱🇾",
    "language": "Arabic",
    "localLanguage": "ar-LY",
    "currency": "LYD",
    "currencyName": "Libyan dinar",
    "symbol": "LYD",
    "locale": "ar-LY",
    "icu": "ar_LY",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+218",
    "capital": "Tripoli",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 7M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "LY-ID-123456",
      "company": "LY-REG-123456",
      "social": "LY-SOC-123456",
      "iban": "LY00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+218 123 456 789",
      "postal": "1000 Tripoli",
      "plate": "LY 1234",
      "vat": "LY123456789",
      "amount": "1,234.56 LYD",
      "date": "24/07/2026",
      "address": "Central business district, Tripoli 1000",
      "json": "{\"country\":\"LY\",\"taxNumber\":\"LY123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#239E46",
      "#000000",
      "#E70013"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type L",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "1515 / 193",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Tripoli",
      "Benghazi",
      "Misrata",
      "Bayda"
    ],
    "timeZone": "Africa/Tripoli"
  },
  {
    "slug": "madagascar",
    "iso2": "MG",
    "iso3": "MDG",
    "isoNumeric": "450",
    "name": "Madagascar",
    "adjective": "Malagasy",
    "nativeName": "Madagasikara",
    "flag": "🇲🇬",
    "language": "Malagasy and French",
    "localLanguage": "fr-MG",
    "currency": "MGA",
    "currencyName": "Malagasy ariary",
    "symbol": "MGA",
    "locale": "fr-MG",
    "icu": "fr_MG",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+261",
    "capital": "Antananarivo",
    "continent": "Africa",
    "region": "Eastern Africa / Indian Ocean",
    "population": "approximately 31M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MG-ID-123456",
      "company": "MG-REG-123456",
      "social": "MG-SOC-123456",
      "iban": "MG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+261 123 456 789",
      "postal": "1000 Antananarivo",
      "plate": "MG 1234",
      "vat": "MG123456789",
      "amount": "1,234.56 MGA",
      "date": "24/07/2026",
      "address": "Central business district, Antananarivo 1000",
      "json": "{\"country\":\"MG\",\"taxNumber\":\"MG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#FFFFFF",
      "#FC3D32",
      "#007E3A"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Antananarivo",
      "Toamasina",
      "Antsirabe",
      "Fianarantsoa"
    ],
    "timeZone": "Indian/Antananarivo"
  },
  {
    "slug": "malawi",
    "iso2": "MW",
    "iso3": "MWI",
    "isoNumeric": "454",
    "name": "Malawi",
    "adjective": "Malawian",
    "nativeName": "Malawi",
    "flag": "🇲🇼",
    "language": "English and Chichewa",
    "localLanguage": "en-MW",
    "currency": "MWK",
    "currencyName": "Malawian kwacha",
    "symbol": "MWK",
    "locale": "en-MW",
    "icu": "en_MW",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+265",
    "capital": "Lilongwe",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 21M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MW-ID-123456",
      "company": "MW-REG-123456",
      "social": "MW-SOC-123456",
      "iban": "MW00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+265 123 456 789",
      "postal": "1000 Lilongwe",
      "plate": "MW 1234",
      "vat": "MW123456789",
      "amount": "1,234.56 MWK",
      "date": "24/07/2026",
      "address": "Central business district, Lilongwe 1000",
      "json": "{\"country\":\"MW\",\"taxNumber\":\"MW123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#000000",
      "#CE1126",
      "#339E35"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "997 / 998 / 999",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Lilongwe",
      "Blantyre",
      "Mzuzu",
      "Zomba"
    ],
    "timeZone": "Africa/Blantyre"
  },
  {
    "slug": "mali",
    "iso2": "ML",
    "iso3": "MLI",
    "isoNumeric": "466",
    "name": "Mali",
    "adjective": "Malian",
    "nativeName": "Mali",
    "flag": "🇲🇱",
    "language": "French",
    "localLanguage": "fr-ML",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-ML",
    "icu": "fr_ML",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+223",
    "capital": "Bamako",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 23M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ML-ID-123456",
      "company": "ML-REG-123456",
      "social": "ML-SOC-123456",
      "iban": "ML00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+223 123 456 789",
      "postal": "1000 Bamako",
      "plate": "ML 1234",
      "vat": "ML123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Bamako 1000",
      "json": "{\"country\":\"ML\",\"taxNumber\":\"ML123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#14B53A",
      "#FCD116",
      "#CE1126"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Bamako",
      "Sikasso",
      "Mopti",
      "Segou"
    ],
    "timeZone": "Africa/Bamako"
  },
  {
    "slug": "mauritania",
    "iso2": "MR",
    "iso3": "MRT",
    "isoNumeric": "478",
    "name": "Mauritania",
    "adjective": "Mauritanian",
    "nativeName": "Muritaniya",
    "flag": "🇲🇷",
    "language": "Arabic",
    "localLanguage": "ar-MR",
    "currency": "MRU",
    "currencyName": "Mauritanian ouguiya",
    "symbol": "MRU",
    "locale": "ar-MR",
    "icu": "ar_MR",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+222",
    "capital": "Nouakchott",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 5M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MR-ID-123456",
      "company": "MR-REG-123456",
      "social": "MR-SOC-123456",
      "iban": "MR00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+222 123 456 789",
      "postal": "1000 Nouakchott",
      "plate": "MR 1234",
      "vat": "MR123456789",
      "amount": "1,234.56 MRU",
      "date": "24/07/2026",
      "address": "Central business district, Nouakchott 1000",
      "json": "{\"country\":\"MR\",\"taxNumber\":\"MR123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#00A95C",
      "#FFC400",
      "#D01C1F"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Nouakchott",
      "Nouadhibou",
      "Kiffa",
      "Kaedi"
    ],
    "timeZone": "Africa/Nouakchott"
  },
  {
    "slug": "mauritius",
    "iso2": "MU",
    "iso3": "MUS",
    "isoNumeric": "480",
    "name": "Mauritius",
    "adjective": "Mauritian",
    "nativeName": "Maurice",
    "flag": "🇲🇺",
    "language": "English, French, and Mauritian Creole",
    "localLanguage": "en-MU",
    "currency": "MUR",
    "currencyName": "Mauritian rupee",
    "symbol": "MUR",
    "locale": "en-MU",
    "icu": "en_MU",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+230",
    "capital": "Port Louis",
    "continent": "Africa",
    "region": "Eastern Africa / Indian Ocean",
    "population": "approximately 1.3M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MU-ID-123456",
      "company": "MU-REG-123456",
      "social": "MU-SOC-123456",
      "iban": "MU00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+230 123 456 789",
      "postal": "1000 Port Louis",
      "plate": "MU 1234",
      "vat": "MU123456789",
      "amount": "1,234.56 MUR",
      "date": "24/07/2026",
      "address": "Central business district, Port Louis 1000",
      "json": "{\"country\":\"MU\",\"taxNumber\":\"MU123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#EA2839",
      "#1A206D",
      "#FFD500"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 150",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Port Louis",
      "Beau Bassin-Rose Hill",
      "Vacoas-Phoenix",
      "Curepipe"
    ],
    "timeZone": "Indian/Mauritius"
  },
  {
    "slug": "morocco",
    "iso2": "MA",
    "iso3": "MAR",
    "isoNumeric": "504",
    "name": "Morocco",
    "adjective": "Moroccan",
    "nativeName": "Al-Maghrib",
    "flag": "🇲🇦",
    "language": "Arabic and Tamazight",
    "localLanguage": "ar-MA",
    "currency": "MAD",
    "currencyName": "Moroccan dirham",
    "symbol": "MAD",
    "locale": "ar-MA",
    "icu": "ar_MA",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Space",
    "phone": "+212",
    "capital": "Rabat",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 38M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MA-ID-123456",
      "company": "MA-REG-123456",
      "social": "MA-SOC-123456",
      "iban": "MA00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+212 123 456 789",
      "postal": "1000 Rabat",
      "plate": "MA 1234",
      "vat": "MA123456789",
      "amount": "1,234.56 MAD",
      "date": "24/07/2026",
      "address": "Central business district, Rabat 1000",
      "json": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#C1272D",
      "#006233",
      "#FFFFFF"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "19 / 15",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Casablanca",
      "Fez",
      "Tangier",
      "Marrakesh"
    ],
    "timeZone": "Africa/Casablanca"
  },
  {
    "slug": "mozambique",
    "iso2": "MZ",
    "iso3": "MOZ",
    "isoNumeric": "508",
    "name": "Mozambique",
    "adjective": "Mozambican",
    "nativeName": "Mocambique",
    "flag": "🇲🇿",
    "language": "Portuguese",
    "localLanguage": "pt-MZ",
    "currency": "MZN",
    "currencyName": "Mozambican metical",
    "symbol": "MZN",
    "locale": "pt-MZ",
    "icu": "pt_MZ",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+258",
    "capital": "Maputo",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 34M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "MZ-ID-123456",
      "company": "MZ-REG-123456",
      "social": "MZ-SOC-123456",
      "iban": "MZ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+258 123 456 789",
      "postal": "1000 Maputo",
      "plate": "MZ 1234",
      "vat": "MZ123456789",
      "amount": "1,234.56 MZN",
      "date": "24/07/2026",
      "address": "Central business district, Maputo 1000",
      "json": "{\"country\":\"MZ\",\"taxNumber\":\"MZ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#009739",
      "#000000",
      "#FCD116"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F / Type M",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 119",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Maputo",
      "Matola",
      "Nampula",
      "Beira"
    ],
    "timeZone": "Africa/Maputo"
  },
  {
    "slug": "namibia",
    "iso2": "NA",
    "iso3": "NAM",
    "isoNumeric": "516",
    "name": "Namibia",
    "adjective": "Namibian",
    "nativeName": "Namibia",
    "flag": "🇳🇦",
    "language": "English",
    "localLanguage": "en-NA",
    "currency": "NAD",
    "currencyName": "Namibian dollar",
    "symbol": "NAD",
    "locale": "en-NA",
    "icu": "en_NA",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+264",
    "capital": "Windhoek",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 3M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "NA-ID-123456",
      "company": "NA-REG-123456",
      "social": "NA-SOC-123456",
      "iban": "NA00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+264 123 456 789",
      "postal": "1000 Windhoek",
      "plate": "NA 1234",
      "vat": "NA123456789",
      "amount": "1,234.56 NAD",
      "date": "24/07/2026",
      "address": "Central business district, Windhoek 1000",
      "json": "{\"country\":\"NA\",\"taxNumber\":\"NA123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#003580",
      "#FFFFFF",
      "#009543"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type M",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Windhoek",
      "Walvis Bay",
      "Swakopmund",
      "Rundu"
    ],
    "timeZone": "Africa/Windhoek"
  },
  {
    "slug": "niger",
    "iso2": "NE",
    "iso3": "NER",
    "isoNumeric": "562",
    "name": "Niger",
    "adjective": "Nigerien",
    "nativeName": "Niger",
    "flag": "🇳🇪",
    "language": "French",
    "localLanguage": "fr-NE",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-NE",
    "icu": "fr_NE",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+227",
    "capital": "Niamey",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 27M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "NE-ID-123456",
      "company": "NE-REG-123456",
      "social": "NE-SOC-123456",
      "iban": "NE00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+227 123 456 789",
      "postal": "1000 Niamey",
      "plate": "NE 1234",
      "vat": "NE123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Niamey 1000",
      "json": "{\"country\":\"NE\",\"taxNumber\":\"NE123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#E05206",
      "#FFFFFF",
      "#0DB02B"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type E / Type F",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Niamey",
      "Zinder",
      "Maradi",
      "Agadez"
    ],
    "timeZone": "Africa/Niamey"
  },
  {
    "slug": "nigeria",
    "iso2": "NG",
    "iso3": "NGA",
    "isoNumeric": "566",
    "name": "Nigeria",
    "adjective": "Nigerian",
    "nativeName": "Nigeria",
    "flag": "🇳🇬",
    "language": "English",
    "localLanguage": "en-NG",
    "currency": "NGN",
    "currencyName": "Nigerian naira",
    "symbol": "NGN",
    "locale": "en-NG",
    "icu": "en_NG",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+234",
    "capital": "Abuja",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 229M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "NG-ID-123456",
      "company": "NG-REG-123456",
      "social": "NG-SOC-123456",
      "iban": "NG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+234 123 456 789",
      "postal": "1000 Abuja",
      "plate": "NG 1234",
      "vat": "NG123456789",
      "amount": "1,234.56 NGN",
      "date": "24/07/2026",
      "address": "Central business district, Abuja 1000",
      "json": "{\"country\":\"NG\",\"taxNumber\":\"NG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#008751",
      "#FFFFFF",
      "#111827"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 199",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Lagos",
      "Kano",
      "Ibadan",
      "Abuja"
    ],
    "timeZone": "Africa/Lagos"
  },
  {
    "slug": "rwanda",
    "iso2": "RW",
    "iso3": "RWA",
    "isoNumeric": "646",
    "name": "Rwanda",
    "adjective": "Rwandan",
    "nativeName": "Rwanda",
    "flag": "🇷🇼",
    "language": "Kinyarwanda, French, English, and Swahili",
    "localLanguage": "en-RW",
    "currency": "RWF",
    "currencyName": "Rwandan franc",
    "symbol": "RWF",
    "locale": "en-RW",
    "icu": "en_RW",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+250",
    "capital": "Kigali",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 14M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "RW-ID-123456",
      "company": "RW-REG-123456",
      "social": "RW-SOC-123456",
      "iban": "RW00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+250 123 456 789",
      "postal": "1000 Kigali",
      "plate": "RW 1234",
      "vat": "RW123456789",
      "amount": "1,234.56 RWF",
      "date": "24/07/2026",
      "address": "Central business district, Kigali 1000",
      "json": "{\"country\":\"RW\",\"taxNumber\":\"RW123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#00A1DE",
      "#FAD201",
      "#20603D"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type J",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 113",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Kigali",
      "Butare",
      "Gitarama",
      "Ruhengeri"
    ],
    "timeZone": "Africa/Kigali"
  },
  {
    "slug": "sao-tome-and-principe",
    "iso2": "ST",
    "iso3": "STP",
    "isoNumeric": "678",
    "name": "Sao Tome and Principe",
    "adjective": "Sao Tomean",
    "nativeName": "Sao Tome e Principe",
    "flag": "🇸🇹",
    "language": "Portuguese",
    "localLanguage": "pt-ST",
    "currency": "STN",
    "currencyName": "Sao Tome and Principe dobra",
    "symbol": "STN",
    "locale": "pt-ST",
    "icu": "pt_ST",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+239",
    "capital": "Sao Tome",
    "continent": "Africa",
    "region": "Middle Africa / Gulf of Guinea",
    "population": "approximately 0.2M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ST-ID-123456",
      "company": "ST-REG-123456",
      "social": "ST-SOC-123456",
      "iban": "ST00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+239 123 456 789",
      "postal": "1000 Sao Tome",
      "plate": "ST 1234",
      "vat": "ST123456789",
      "amount": "1,234.56 STN",
      "date": "24/07/2026",
      "address": "Central business district, Sao Tome 1000",
      "json": "{\"country\":\"ST\",\"taxNumber\":\"ST123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#12AD2B",
      "#FFCE00",
      "#D21034"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type F",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Sao Tome",
      "Santo Antonio",
      "Neves",
      "Trindade"
    ],
    "timeZone": "Africa/Sao_Tome"
  },
  {
    "slug": "senegal",
    "iso2": "SN",
    "iso3": "SEN",
    "isoNumeric": "686",
    "name": "Senegal",
    "adjective": "Senegalese",
    "nativeName": "Senegal",
    "flag": "🇸🇳",
    "language": "French",
    "localLanguage": "fr-SN",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-SN",
    "icu": "fr_SN",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+221",
    "capital": "Dakar",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 18M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SN-ID-123456",
      "company": "SN-REG-123456",
      "social": "SN-SOC-123456",
      "iban": "SN00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+221 123 456 789",
      "postal": "1000 Dakar",
      "plate": "SN 1234",
      "vat": "SN123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Dakar 1000",
      "json": "{\"country\":\"SN\",\"taxNumber\":\"SN123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#00853F",
      "#FDEF42",
      "#E31B23"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type E / Type K",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "17 / 18",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Dakar",
      "Touba",
      "Thies",
      "Kaolack"
    ],
    "timeZone": "Africa/Dakar"
  },
  {
    "slug": "seychelles",
    "iso2": "SC",
    "iso3": "SYC",
    "isoNumeric": "690",
    "name": "Seychelles",
    "adjective": "Seychellois",
    "nativeName": "Sesel",
    "flag": "🇸🇨",
    "language": "Seychellois Creole, English, and French",
    "localLanguage": "en-SC",
    "currency": "SCR",
    "currencyName": "Seychellois rupee",
    "symbol": "SCR",
    "locale": "en-SC",
    "icu": "en_SC",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+248",
    "capital": "Victoria",
    "continent": "Africa",
    "region": "Eastern Africa / Indian Ocean",
    "population": "approximately 0.1M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SC-ID-123456",
      "company": "SC-REG-123456",
      "social": "SC-SOC-123456",
      "iban": "SC00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+248 123 456 789",
      "postal": "1000 Victoria",
      "plate": "SC 1234",
      "vat": "SC123456789",
      "amount": "1,234.56 SCR",
      "date": "24/07/2026",
      "address": "Central business district, Victoria 1000",
      "json": "{\"country\":\"SC\",\"taxNumber\":\"SC123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#003F87",
      "#FCD856",
      "#D62828"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type G",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 151",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Victoria",
      "Anse Boileau",
      "Beau Vallon",
      "Takamaka"
    ],
    "timeZone": "Indian/Mahe"
  },
  {
    "slug": "sierra-leone",
    "iso2": "SL",
    "iso3": "SLE",
    "isoNumeric": "694",
    "name": "Sierra Leone",
    "adjective": "Sierra Leonean",
    "nativeName": "Sierra Leone",
    "flag": "🇸🇱",
    "language": "English",
    "localLanguage": "en-SL",
    "currency": "SLE",
    "currencyName": "Sierra Leonean leone",
    "symbol": "SLE",
    "locale": "en-SL",
    "icu": "en_SL",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+232",
    "capital": "Freetown",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 8.8M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SL-ID-123456",
      "company": "SL-REG-123456",
      "social": "SL-SOC-123456",
      "iban": "SL00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+232 123 456 789",
      "postal": "1000 Freetown",
      "plate": "SL 1234",
      "vat": "SL123456789",
      "amount": "1,234.56 SLE",
      "date": "24/07/2026",
      "address": "Central business district, Freetown 1000",
      "json": "{\"country\":\"SL\",\"taxNumber\":\"SL123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#1EB53A",
      "#FFFFFF",
      "#0072C6"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 019",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Freetown",
      "Bo",
      "Kenema",
      "Makeni"
    ],
    "timeZone": "Africa/Freetown"
  },
  {
    "slug": "somalia",
    "iso2": "SO",
    "iso3": "SOM",
    "isoNumeric": "706",
    "name": "Somalia",
    "adjective": "Somali",
    "nativeName": "Soomaaliya",
    "flag": "🇸🇴",
    "language": "Somali and Arabic",
    "localLanguage": "so-SO",
    "currency": "SOS",
    "currencyName": "Somali shilling",
    "symbol": "SOS",
    "locale": "so-SO",
    "icu": "so_SO",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+252",
    "capital": "Mogadishu",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 19M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SO-ID-123456",
      "company": "SO-REG-123456",
      "social": "SO-SOC-123456",
      "iban": "SO00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+252 123 456 789",
      "postal": "1000 Mogadishu",
      "plate": "SO 1234",
      "vat": "SO123456789",
      "amount": "1,234.56 SOS",
      "date": "24/07/2026",
      "address": "Central business district, Mogadishu 1000",
      "json": "{\"country\":\"SO\",\"taxNumber\":\"SO123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#4189DD",
      "#FFFFFF",
      "#111827"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "888 / 999",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Mogadishu",
      "Hargeisa",
      "Bosaso",
      "Kismayo"
    ],
    "timeZone": "Africa/Mogadishu"
  },
  {
    "slug": "south-africa",
    "iso2": "ZA",
    "iso3": "ZAF",
    "isoNumeric": "710",
    "name": "South Africa",
    "adjective": "South African",
    "nativeName": "South Africa",
    "flag": "🇿🇦",
    "language": "English and other official languages",
    "localLanguage": "en-ZA",
    "currency": "ZAR",
    "currencyName": "South African rand",
    "symbol": "ZAR",
    "locale": "en-ZA",
    "icu": "en_ZA",
    "date": "YYYY/MM/DD",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+27",
    "capital": "Pretoria",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 63M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ZA-ID-123456",
      "company": "ZA-REG-123456",
      "social": "ZA-SOC-123456",
      "iban": "ZA00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+27 123 456 789",
      "postal": "1000 Pretoria",
      "plate": "ZA 1234",
      "vat": "ZA123456789",
      "amount": "1,234.56 ZAR",
      "date": "24/07/2026",
      "address": "Central business district, Pretoria 1000",
      "json": "{\"country\":\"ZA\",\"taxNumber\":\"ZA123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#007A4D",
      "#FFB612",
      "#DE3831"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type M / Type N",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 10111",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Johannesburg",
      "Cape Town",
      "Durban",
      "Pretoria"
    ],
    "timeZone": "Africa/Johannesburg"
  },
  {
    "slug": "south-sudan",
    "iso2": "SS",
    "iso3": "SSD",
    "isoNumeric": "728",
    "name": "South Sudan",
    "adjective": "South Sudanese",
    "nativeName": "South Sudan",
    "flag": "🇸🇸",
    "language": "English",
    "localLanguage": "en-SS",
    "currency": "SSP",
    "currencyName": "South Sudanese pound",
    "symbol": "SSP",
    "locale": "en-SS",
    "icu": "en_SS",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+211",
    "capital": "Juba",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 11M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SS-ID-123456",
      "company": "SS-REG-123456",
      "social": "SS-SOC-123456",
      "iban": "SS00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+211 123 456 789",
      "postal": "1000 Juba",
      "plate": "SS 1234",
      "vat": "SS123456789",
      "amount": "1,234.56 SSP",
      "date": "24/07/2026",
      "address": "Central business district, Juba 1000",
      "json": "{\"country\":\"SS\",\"taxNumber\":\"SS123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#000000",
      "#DA121A",
      "#078930"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 999",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Juba",
      "Malakal",
      "Wau",
      "Yei"
    ],
    "timeZone": "Africa/Juba"
  },
  {
    "slug": "sudan",
    "iso2": "SD",
    "iso3": "SDN",
    "isoNumeric": "729",
    "name": "Sudan",
    "adjective": "Sudanese",
    "nativeName": "As-Sudan",
    "flag": "🇸🇩",
    "language": "Arabic and English",
    "localLanguage": "ar-SD",
    "currency": "SDG",
    "currencyName": "Sudanese pound",
    "symbol": "SDG",
    "locale": "ar-SD",
    "icu": "ar_SD",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+249",
    "capital": "Khartoum",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 50M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "SD-ID-123456",
      "company": "SD-REG-123456",
      "social": "SD-SOC-123456",
      "iban": "SD00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+249 123 456 789",
      "postal": "1000 Khartoum",
      "plate": "SD 1234",
      "vat": "SD123456789",
      "amount": "1,234.56 SDG",
      "date": "24/07/2026",
      "address": "Central business district, Khartoum 1000",
      "json": "{\"country\":\"SD\",\"taxNumber\":\"SD123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#D21034",
      "#FFFFFF",
      "#000000"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 777",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Khartoum",
      "Omdurman",
      "Port Sudan",
      "Nyala"
    ],
    "timeZone": "Africa/Khartoum"
  },
  {
    "slug": "tanzania",
    "iso2": "TZ",
    "iso3": "TZA",
    "isoNumeric": "834",
    "name": "Tanzania",
    "adjective": "Tanzanian",
    "nativeName": "Tanzania",
    "flag": "🇹🇿",
    "language": "Swahili and English",
    "localLanguage": "sw-TZ",
    "currency": "TZS",
    "currencyName": "Tanzanian shilling",
    "symbol": "TZS",
    "locale": "sw-TZ",
    "icu": "sw_TZ",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+255",
    "capital": "Dodoma",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 68M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "TZ-ID-123456",
      "company": "TZ-REG-123456",
      "social": "TZ-SOC-123456",
      "iban": "TZ00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+255 123 456 789",
      "postal": "1000 Dodoma",
      "plate": "TZ 1234",
      "vat": "TZ123456789",
      "amount": "1,234.56 TZS",
      "date": "24/07/2026",
      "address": "Central business district, Dodoma 1000",
      "json": "{\"country\":\"TZ\",\"taxNumber\":\"TZ123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#1EB53A",
      "#FCD116",
      "#00A3DD"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "112 / 114 / 115",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Dar es Salaam",
      "Mwanza",
      "Dodoma",
      "Arusha"
    ],
    "timeZone": "Africa/Dar_es_Salaam"
  },
  {
    "slug": "togo",
    "iso2": "TG",
    "iso3": "TGO",
    "isoNumeric": "768",
    "name": "Togo",
    "adjective": "Togolese",
    "nativeName": "Togo",
    "flag": "🇹🇬",
    "language": "French",
    "localLanguage": "fr-TG",
    "currency": "XOF",
    "currencyName": "West African CFA franc",
    "symbol": "XOF",
    "locale": "fr-TG",
    "icu": "fr_TG",
    "date": "DD/MM/YYYY",
    "decimal": "Comma (,)",
    "thousands": "Space",
    "phone": "+228",
    "capital": "Lome",
    "continent": "Africa",
    "region": "Western Africa",
    "population": "approximately 9M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "TG-ID-123456",
      "company": "TG-REG-123456",
      "social": "TG-SOC-123456",
      "iban": "TG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+228 123 456 789",
      "postal": "1000 Lome",
      "plate": "TG 1234",
      "vat": "TG123456789",
      "amount": "1,234.56 XOF",
      "date": "24/07/2026",
      "address": "Central business district, Lome 1000",
      "json": "{\"country\":\"TG\",\"taxNumber\":\"TG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#006A4E",
      "#FFCE00",
      "#D21034"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C",
    "voltage": "220V",
    "frequency": "50Hz",
    "emergencyNumber": "117 / 118",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Lome",
      "Sokode",
      "Kara",
      "Kpalime"
    ],
    "timeZone": "Africa/Lome"
  },
  {
    "slug": "tunisia",
    "iso2": "TN",
    "iso3": "TUN",
    "isoNumeric": "788",
    "name": "Tunisia",
    "adjective": "Tunisian",
    "nativeName": "Tunis",
    "flag": "🇹🇳",
    "language": "Arabic",
    "localLanguage": "ar-TN",
    "currency": "TND",
    "currencyName": "Tunisian dinar",
    "symbol": "TND",
    "locale": "ar-TN",
    "icu": "ar_TN",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Space",
    "phone": "+216",
    "capital": "Tunis",
    "continent": "Africa",
    "region": "Northern Africa",
    "population": "approximately 12M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "TN-ID-123456",
      "company": "TN-REG-123456",
      "social": "TN-SOC-123456",
      "iban": "TN00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+216 123 456 789",
      "postal": "1000 Tunis",
      "plate": "TN 1234",
      "vat": "TN123456789",
      "amount": "1,234.56 TND",
      "date": "24/07/2026",
      "address": "Central business district, Tunis 1000",
      "json": "{\"country\":\"TN\",\"taxNumber\":\"TN123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#E70013",
      "#FFFFFF",
      "#111827"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type E",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "190 / 197 / 198",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Tunis",
      "Sfax",
      "Sousse",
      "Kairouan"
    ],
    "timeZone": "Africa/Tunis"
  },
  {
    "slug": "uganda",
    "iso2": "UG",
    "iso3": "UGA",
    "isoNumeric": "800",
    "name": "Uganda",
    "adjective": "Ugandan",
    "nativeName": "Uganda",
    "flag": "🇺🇬",
    "language": "English and Swahili",
    "localLanguage": "en-UG",
    "currency": "UGX",
    "currencyName": "Ugandan shilling",
    "symbol": "UGX",
    "locale": "en-UG",
    "icu": "en_UG",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+256",
    "capital": "Kampala",
    "continent": "Africa",
    "region": "Eastern Africa",
    "population": "approximately 50M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "UG-ID-123456",
      "company": "UG-REG-123456",
      "social": "UG-SOC-123456",
      "iban": "UG00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+256 123 456 789",
      "postal": "1000 Kampala",
      "plate": "UG 1234",
      "vat": "UG123456789",
      "amount": "1,234.56 UGX",
      "date": "24/07/2026",
      "address": "Central business district, Kampala 1000",
      "json": "{\"country\":\"UG\",\"taxNumber\":\"UG123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#000000",
      "#FCDC04",
      "#D90000"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type G",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Kampala",
      "Nansana",
      "Kira",
      "Mbarara"
    ],
    "timeZone": "Africa/Kampala"
  },
  {
    "slug": "zambia",
    "iso2": "ZM",
    "iso3": "ZMB",
    "isoNumeric": "894",
    "name": "Zambia",
    "adjective": "Zambian",
    "nativeName": "Zambia",
    "flag": "🇿🇲",
    "language": "English",
    "localLanguage": "en-ZM",
    "currency": "ZMW",
    "currencyName": "Zambian kwacha",
    "symbol": "ZMW",
    "locale": "en-ZM",
    "icu": "en_ZM",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+260",
    "capital": "Lusaka",
    "continent": "Africa",
    "region": "Eastern Africa / Southern Africa",
    "population": "approximately 21M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ZM-ID-123456",
      "company": "ZM-REG-123456",
      "social": "ZM-SOC-123456",
      "iban": "ZM00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+260 123 456 789",
      "postal": "1000 Lusaka",
      "plate": "ZM 1234",
      "vat": "ZM123456789",
      "amount": "1,234.56 ZMW",
      "date": "24/07/2026",
      "address": "Central business district, Lusaka 1000",
      "json": "{\"country\":\"ZM\",\"taxNumber\":\"ZM123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#198A00",
      "#DE2010",
      "#000000"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type C / Type D / Type G",
    "voltage": "230V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Lusaka",
      "Ndola",
      "Kitwe",
      "Livingstone"
    ],
    "timeZone": "Africa/Lusaka"
  },
  {
    "slug": "zimbabwe",
    "iso2": "ZW",
    "iso3": "ZWE",
    "isoNumeric": "716",
    "name": "Zimbabwe",
    "adjective": "Zimbabwean",
    "nativeName": "Zimbabwe",
    "flag": "🇿🇼",
    "language": "English, Shona, and Ndebele",
    "localLanguage": "en-ZW",
    "currency": "ZWL",
    "currencyName": "Zimbabwean dollar",
    "symbol": "ZWL",
    "locale": "en-ZW",
    "icu": "en_ZW",
    "date": "DD/MM/YYYY",
    "decimal": "Dot (.)",
    "thousands": "Comma (,)",
    "phone": "+263",
    "capital": "Harare",
    "continent": "Africa",
    "region": "Southern Africa",
    "population": "approximately 17M",
    "identifiers": [
      "National ID boundary",
      "company registration number",
      "tax number / VAT boundary",
      "postal/address code",
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
      "tax": "tax number / VAT boundary",
      "social": "social security boundary",
      "register": "business registry",
      "invoice": "tax invoice",
      "payment": "bank transfer / payment reference",
      "plate": "vehicle plate",
      "postal": "postal/address code",
      "privacy": "data protection / privacy boundary"
    },
    "samples": {
      "personal": "ZW-ID-123456",
      "company": "ZW-REG-123456",
      "social": "ZW-SOC-123456",
      "iban": "ZW00BANK000123456789",
      "bank": "001 1234567890",
      "phone": "+263 123 456 789",
      "postal": "1000 Harare",
      "plate": "ZW 1234",
      "vat": "ZW123456789",
      "amount": "1,234.56 ZWL",
      "date": "24/07/2026",
      "address": "Central business district, Harare 1000",
      "json": "{\"country\":\"ZW\",\"taxNumber\":\"ZW123456789\",\"paymentReference\":\"INV-2026-001\"}"
    },
    "theme": [
      "#009739",
      "#FCE300",
      "#E4002B"
    ],
    "marker": {
      "x": 45,
      "y": 55
    },
    "related": [
      "ZA",
      "NG",
      "KE"
    ],
    "plugTypes": "Type D / Type G",
    "voltage": "240V",
    "frequency": "50Hz",
    "emergencyNumber": "999 / 112",
    "searchHints": [
      "NATIONAL ID",
      "TAX",
      "VAT",
      "COMPANY",
      "BANK",
      "POSTAL"
    ],
    "cities": [
      "Harare",
      "Bulawayo",
      "Chitungwiza",
      "Mutare"
    ],
    "timeZone": "Africa/Harare"
  }
];

const COUNTRY_TIME_ZONES = {
  japan: 'Asia/Tokyo (JST)',
  india: 'Asia/Kolkata (IST)',
  singapore: 'Africa/Abidjan (GMT)',
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
region: Africa
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '${accent}', accent2: '${accent2}', accent3: '${accent3}' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\\W/g, '') + 'Suite'] = suite; return true; }
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
      continent: 'Africa', region: 'Africa', language: country.language, currency: country.currency, currencyName: country.currencyName,
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
        capital: country.capital, continent: 'Africa', region: country.region, languages: country.language, currency: country.currencyName,
        currencyCode: country.currency, callingCode: country.phone, internetTld: `.${country.iso2.toLowerCase()}`, drivingSide: 'Right',
        iso2: country.iso2, iso3: country.iso3, isoNumeric: country.isoNumeric, locale: country.locale, icuLocale: country.icu,
        dateFormat: country.date, timeFormat: '24-hour, HH:mm', decimalSeparator: country.decimal, thousandsSeparator: country.thousands,
        addressFormat: `Street, number, postal code, locality, ${country.name}`, postalCodeFormat: country.localTerms.postal,
        primaryTimeZone: COUNTRY_TIME_ZONES[country.slug] || 'Africa/Abidjan (GMT)', measurementSystem: 'Metric', paperSize: 'A4', emergencyNumber: country.emergencyNumber || '112', weekStarts: 'Monday',
        rtlSupport: 'No', unicodeLocale: country.locale, cldrLocale: country.icu, metricVsImperial: 'Metric-first',
        powerPlugTypes: country.plugTypes || 'Type C / Type F', voltage: country.voltage || '230V', frequency: country.frequency || '50Hz'
      },
      visualIdentity: {
        countryId: country.slug, outlineLabel: `${country.name} outline`, mapLabel: `${country.name} in the world`, continentBadge: 'Africa', flagLabel: `${country.name} flag`,
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
  write('docs/product/AFRICA_BASELINE_SUITE_SPEC.md', `# Africa Baseline Batch Suite Spec

This spec covers the Africa baseline generation batch: ${list}.

## Contract

- Use Country Suite Factory V1 for every new country runtime.
- Keep the tool count quality-driven. 60 tools is a density reference, not a cap or a filler target: add every meaningful local validator/generator/parser/debugger, and stop only when the local market truly has no more useful workflows.
- Every tool must render compact premium shell UI, validate/generate/explain where safe, validation pipeline, result cards, field breakdown, tool-context explanation, quality notes, advanced analysis, developer JSON, localized controls, and explicit official/live lookup boundaries.
- Local generators must create fresh values on every Generate click, enforce country prefixes/check digits, and route invalid/bad-prefix fixtures into review/error states rather than green success.
- Country-specific analyzers must replace generic parser output whenever a local identifier has real structure. Generic "source payload / offline only" breakdown is only a fallback for tools with no formal structure.
- Country hubs must contain human-readable highlights, developer notes, common mistakes, official boundaries, ecosystem cards, localization notes, and routes. No [object Object], empty cards, foreign fallback copy, or icon-only/status-only placeholders.
- Related tools stay same-country by default.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.
- Western Sahara is not included in this 54-country source batch because no approved source outline/location asset exists yet; disputed territories require an explicit product decision before inclusion.

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
    const marker = 'Africa baseline expansion batch';
    if (!text.includes(marker)) {
      text = `## 2026-07-24 - ${marker}\n\n- Added a documented Asia premium generation batch for ${list}.\n- Each country uses Country Suite Factory V1, quality-driven local workbenches, runtime localization for en/es/pt-BR/de/fr/pl/uk, mandatory field breakdown, same-country related links, validate/generate affordances, and explicit official boundaries.\n- Added \`docs/product/AFRICA_BASELINE_SUITE_SPEC.md\` so future AI sessions treat batch generation quality as a contract, not a one-off.\n\n` + text;
      fs.writeFileSync(changelog, text);
    }
  }
  const current = path.join(ROOT, 'docs/product/CURRENT_STATE.md');
  if (fs.existsSync(current)) {
    let text = fs.readFileSync(current, 'utf8');
    const marker = 'Africa Baseline Batch V1';
    if (!text.includes(marker)) {
      text += `\n\n## ${marker}\n\nAfrica coverage is generated as a baseline country-suite skeleton with Country Suite Factory V1. Each country uses quality-driven local developer workbenches, field breakdown on every tool, seven production runtime locales, validate/generate affordances where safe, same-country related links, rich country hub sections, and explicit official/live lookup boundaries. Western Sahara is not included in this 54-country source batch because no approved source outline/location asset exists yet; disputed territories require an explicit product decision.\n`;
      fs.writeFileSync(current, text);
    }
  }
  const registry = path.join(ROOT, 'docs/product/WORKBENCH_REGISTRY.md');
  if (fs.existsSync(registry)) {
    let text = fs.readFileSync(registry, 'utf8');
    const marker = 'Africa Baseline Batch V1';
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
  console.log(`Generated Africa ${COUNTRIES.length} countries and ${COUNTRIES.length * TOOL_TEMPLATES.length} tools.`);
}

main();
