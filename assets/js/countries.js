(function () {
  'use strict';

  const RESERVED_TOP_LEVEL = new Set(['tools', 'categories', 'assets', 'countries']);
  const LOCALE_PATTERN = /^[a-z]{2}(?:-[a-z]{2})?$/i;

  const STATUS_LABELS = {
    ready: 'Ready',
    available: 'Available',
    comingSoon: 'Coming soon',
    planned: 'Planned',
    experimental: 'Experimental',
    deprecated: 'Deprecated'
  };

  const SHARED_WORLD_MAP_SRC = '/assets/images/countries/world-map.svg';

  const COUNTRY_VISUAL_ASSETS = {
    "brazil": {
      "outlineSrc": "/assets/images/countries/brazil-outline.svg",
      "outlineAlt": "Brazil country outline",
      "mapSrc": "/assets/images/countries/brazil-location.svg",
      "mapAlt": "World map with Brazil location marker",
      "mapMarker": {
        "x": 49,
        "y": 52,
        "label": "Brazil"
      },
      "source": "Natural Earth geometry"
    },
    "germany": {
      "outlineSrc": "/assets/images/countries/germany-outline.svg",
      "outlineAlt": "Germany country outline",
      "mapSrc": "/assets/images/countries/germany-location.svg",
      "mapAlt": "World map with Germany location marker",
      "mapMarker": {
        "x": 50,
        "y": 50,
        "label": "Germany"
      },
      "source": "Natural Earth geometry"
    },
    "poland": {
      "outlineSrc": "/assets/images/countries/poland-outline.svg",
      "outlineAlt": "Poland country outline",
      "mapSrc": "/assets/images/countries/poland-location.svg",
      "mapAlt": "World map with Poland location marker",
      "mapMarker": {
        "x": 46,
        "y": 41,
        "label": "Poland"
      },
      "source": "Natural Earth geometry"
    },
    "spain": {
      "outlineSrc": "/assets/images/countries/spain-outline.svg",
      "outlineAlt": "Spain country outline",
      "mapSrc": "/assets/images/countries/spain-location.svg",
      "mapAlt": "World map with Spain location marker",
      "mapMarker": {
        "x": 41,
        "y": 63,
        "label": "Spain"
      },
      "source": "Simplified public-domain geographic reference"
    }
  }

  const COUNTRY_HUBS = {
    "brazil": {
      "flag": "🇧🇷",
      "name": "Brazil",
      "badge": "Reference country hub",
      "description": "Developer intelligence for Brazilian identifiers, Pix and boleto payments, fiscal documents, banking formats, locale conventions, privacy-safe fixtures, and official-system boundaries.",
      "metadata": {
        "population": "203M+",
        "area": "8,515,767 km²",
        "capital": "Brasilia",
        "largestCity": "Sao Paulo",
        "continent": "South America",
        "languages": "Portuguese",
        "currency": "Brazilian real",
        "currencyCode": "BRL",
        "currencySymbol": "R$",
        "callingCode": "+55",
        "internetTld": ".br",
        "drivingSide": "Right",
        "iso2": "BR",
        "iso3": "BRA",
        "isoNumeric": "076",
        "locale": "pt-BR",
        "icuLocale": "pt_BR",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street, number, district, city, state, CEP",
        "postalCodeFormat": "NNNNN-NNN",
        "primaryTimeZone": "UTC-03",
        "utcRange": "UTC-02 to UTC-05",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type N",
        "voltage": "127V / 220V",
        "frequency": "60Hz",
        "emergencyNumber": "190",
        "weekStarts": "Sunday",
        "rtlSupport": "No",
        "unicodeLocale": "pt-BR",
        "cldrLocale": "pt_BR",
        "metricVsImperial": "Metric-first",
        "nativeName": "Brasil",
        "region": "South America / Mercosur",
        "timeZone": "America/Sao_Paulo and regional zones"
      },
      "visualIdentity": {
        "countryId": "brazil",
        "outlineLabel": "Brazil outline",
        "mapLabel": "Brazil in the world",
        "continentBadge": "South America",
        "flagLabel": "Brazil flag",
        "heroAccentPrimary": "22 101 52",
        "heroAccentSecondary": "202 138 4",
        "heroAccentTertiary": "37 99 235"
      },
      "stats": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌎",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Official language",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "💳",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🚗",
          "label": "Driving side",
          "valueKey": "drivingSide",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🧭",
          "label": "UTC range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        }
      ],
      "countryProfile": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "▣",
          "label": "Area",
          "valueKey": "area",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌎",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Official language",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🚗",
          "label": "Driving side",
          "valueKey": "drivingSide",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📏",
          "label": "Measurement system",
          "valueKey": "measurementSystem",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📄",
          "label": "Paper size",
          "valueKey": "paperSize",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🔌",
          "label": "Power plug types",
          "valueKey": "powerPlugTypes",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⚡",
          "label": "Voltage",
          "valueKey": "voltage",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⏱",
          "label": "Frequency",
          "valueKey": "frequency",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🚨",
          "label": "Emergency number",
          "valueKey": "emergencyNumber",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "💳",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency"
          ]
        },
        {
          "icon": "🕒",
          "label": "Timezone range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        },
        {
          "icon": "📅",
          "label": "Week starts",
          "valueKey": "weekStarts",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "↔",
          "label": "RTL support",
          "valueKey": "rtlSupport",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🔤",
          "label": "Unicode locale",
          "valueKey": "unicodeLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "CLDR locale",
          "valueKey": "cldrLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "📐",
          "label": "Metric vs Imperial",
          "valueKey": "metricVsImperial",
          "tags": [
            "locale"
          ]
        }
      ],
      "quickActions": [
        {
          "label": "Copy Locale",
          "valueKey": "locale"
        },
        {
          "label": "Copy Currency Code",
          "valueKey": "currencyCode"
        },
        {
          "label": "Copy Phone Code",
          "valueKey": "callingCode"
        },
        {
          "label": "Copy ISO2",
          "valueKey": "iso2"
        },
        {
          "label": "Copy ISO3",
          "valueKey": "iso3"
        },
        {
          "label": "Copy Numeric ISO",
          "valueKey": "isoNumeric"
        },
        {
          "label": "Copy Internet TLD",
          "valueKey": "internetTld"
        },
        {
          "label": "Copy Date Format",
          "valueKey": "dateFormat"
        },
        {
          "label": "Copy Postal Code Format",
          "valueKey": "postalCodeFormat"
        },
        {
          "label": "Copy Primary Time Zone",
          "valueKey": "primaryTimeZone"
        }
      ],
      "cheatSheet": [
        {
          "label": "ISO2",
          "valueKey": "iso2",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "ISO3",
          "valueKey": "iso3",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Numeric ISO",
          "valueKey": "isoNumeric",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Locale",
          "valueKey": "locale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "Language",
          "valueKey": "languages",
          "icon": "🗣",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Currency",
          "value": "Brazilian real (BRL)",
          "copyValueKey": "currencyCode",
          "icon": "💳",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "label": "Currency symbol",
          "valueKey": "currencySymbol",
          "icon": "💵",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Phone country code",
          "valueKey": "callingCode",
          "icon": "☎",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "icon": "🌐",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Date format",
          "valueKey": "dateFormat",
          "icon": "📅",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time format",
          "valueKey": "timeFormat",
          "icon": "⏱",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Decimal separator",
          "valueKey": "decimalSeparator",
          "copyValue": "comma decimal separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Thousands separator",
          "valueKey": "thousandsSeparator",
          "copyValue": "dot thousands separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Address format",
          "valueKey": "addressFormat",
          "icon": "📍",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Postal code format",
          "valueKey": "postalCodeFormat",
          "icon": "✉",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Primary time zone",
          "valueKey": "primaryTimeZone",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        },
        {
          "label": "Time zones",
          "valueKey": "utcRange",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        }
      ],
      "localFormats": [
        {
          "icon": "🧾",
          "name": "CPF",
          "status": "planned",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Individual taxpayer identifier. CPF numbers have 11 digits and checksum rules.",
          "related": [
            "CPF Validator"
          ]
        },
        {
          "icon": "🏢",
          "name": "CNPJ",
          "status": "planned",
          "category": "Business identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Company taxpayer identifier. CNPJ numbers have 14 digits and checksum rules.",
          "related": [
            "CNPJ Validator"
          ]
        },
        {
          "icon": "✉",
          "name": "CEP",
          "status": "planned",
          "category": "Postal",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Postal code format with 8 digits, commonly displayed as NNNNN-NNN.",
          "related": [
            "CEP Lookup"
          ]
        },
        {
          "brandKey": "pix",
          "name": "PIX",
          "status": "comingSoon",
          "category": "Payments",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Instant payment ecosystem. Keys can be CPF, CNPJ, email, phone, random key, or QR payload.",
          "related": [
            "PIX Workbench"
          ]
        },
        {
          "icon": "🪪",
          "name": "RG",
          "status": "planned",
          "category": "Identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "State-issued identity document. Formats vary by issuing state."
        },
        {
          "icon": "🚗",
          "name": "CNH",
          "status": "planned",
          "category": "Identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Brazilian driver license identifier used in identity and mobility workflows."
        },
        {
          "icon": "🚙",
          "name": "RENAVAM",
          "status": "planned",
          "category": "Vehicle",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Vehicle registry identifier used for Brazilian vehicle records."
        },
        {
          "icon": "☎",
          "name": "Brazilian phone numbers",
          "status": "planned",
          "category": "Phone",
          "tags": [
            "phone"
          ],
          "description": "Phone numbers use country code +55, area codes, mobile prefixes, and local formatting rules.",
          "related": [
            "Brazil Phone Validator"
          ]
        },
        {
          "brandKey": "iban",
          "name": "Brazil IBAN / banking notes",
          "status": "ready",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Brazil is not an IBAN-first domestic transfer market; bank, branch, account, PIX, and SWIFT/BIC context matters."
        }
      ],
      "payments": [
        {
          "title": "Boleto",
          "text": "Barcode and linha digitavel payment slips with amount, due-date factor, bank code, and check digit behavior.",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "title": "BRL amount and centavos",
          "text": "Brazilian real workflows normalize comma decimals, integer centavos, and copyable payment payloads.",
          "status": "available",
          "tags": [
            "payments",
            "currency"
          ]
        },
        {
          "title": "Card payments",
          "text": "Debit and credit card flows follow global card-network rules plus Brazilian amount and document-field conventions.",
          "status": "ready",
          "tags": [
            "payments"
          ]
        },
        {
          "title": "CNAB remittance and return files",
          "text": "Bank file workflows need row-length inspection, record-type summaries, and reconciliation-ready diagnostics.",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "title": "Payment QR and title fields",
          "text": "QR-like payment payloads, descriptions, transaction IDs, and recipient fields need deterministic local checks before banking handoff.",
          "status": "available",
          "tags": [
            "payments"
          ]
        },
        {
          "title": "Pix",
          "text": "Instant payment rail using keys, QR codes, copy-and-paste BR Code payloads, and EMV-style fields.",
          "status": "available",
          "tags": [
            "payments",
            "pix"
          ]
        },
        {
          "title": "TED / DOC transfers",
          "text": "Traditional transfer records require bank, agency, account, owner document, and amount field consistency.",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        }
      ],
      "officialResources": [
        {
          "title": "Banco Central do Brasil",
          "description": "Central bank and official reference context for Pix, ISPB, Open Finance, and financial-system data.",
          "status": "available",
          "tags": [
            "government",
            "banking"
          ]
        },
        {
          "title": "Correios",
          "description": "Postal authority context for CEP and Brazilian address-format conventions.",
          "status": "available",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "title": "Denatran / SENATRAN",
          "description": "National traffic authority context for CNH, RENAVAM, and vehicle-document workflows.",
          "status": "available",
          "tags": [
            "government",
            "vehicle"
          ]
        },
        {
          "title": "IBGE",
          "description": "Official geography and statistics context for UF, municipality codes, and regional identifiers.",
          "status": "available",
          "tags": [
            "government",
            "geo"
          ]
        },
        {
          "title": "Receita Federal",
          "description": "Tax administration context for CPF, CNPJ, fiscal documents, DARF, and compliance workflows.",
          "status": "available",
          "tags": [
            "government",
            "tax"
          ]
        },
        {
          "title": "Serpro",
          "description": "Government technology context for official APIs, fiscal integrations, and identity-related services.",
          "status": "available",
          "tags": [
            "government",
            "api"
          ]
        },
        {
          "title": "TSE",
          "description": "Electoral authority context for voter title, zone, and section data.",
          "status": "available",
          "tags": [
            "government",
            "identity"
          ]
        }
      ],
      "plannedWorkbenches": [
        {
          "name": "PIX Workbench",
          "status": "comingSoon",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Inspect PIX keys and QR payloads after a dedicated product spec is approved."
        },
        {
          "name": "CPF Validator",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Validate and explain CPF structure and checksum rules."
        },
        {
          "name": "CNPJ Validator",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Validate and explain CNPJ structure and checksum rules."
        },
        {
          "name": "CEP Lookup",
          "status": "planned",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Parse and explain CEP postal-code format without implying live lookup until specified."
        },
        {
          "name": "Brazil Phone Validator",
          "status": "planned",
          "tags": [
            "phone"
          ],
          "description": "Validate Brazilian country code, area code, and local number patterns."
        },
        {
          "name": "Brazil Banking Tools",
          "status": "planned",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Developer utilities for bank code, branch, account, and check digit workflows."
        }
      ],
      "relatedGlobalTools": [
        {
          "label": "JSON Formatter",
          "path": "tools/json-formatter/",
          "icon": "▣",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "JWT Decoder",
          "path": "tools/jwt-decoder/",
          "brandKey": "jwt",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Base64 Encoder",
          "path": "tools/base64-encoder/",
          "icon": "⟲",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "URL Encoder",
          "path": "tools/url-encoder/",
          "icon": "🔗",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Regex Tester",
          "path": "tools/regex-tester/",
          "icon": ".*",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "IBAN Validator",
          "path": "tools/iban-validator/",
          "brandKey": "iban",
          "tags": [
            "banking"
          ]
        }
      ],
      "relatedCategories": [
        {
          "label": "Finance",
          "path": "categories/finance/",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "label": "National Identifiers",
          "path": "categories/national-identifiers/",
          "tags": [
            "identifiers"
          ]
        },
        {
          "label": "Developer Tools",
          "path": "categories/developer-tools/",
          "tags": [
            "developer"
          ]
        }
      ],
      "futureCountryPages": [
        {
          "label": "Poland",
          "status": "available",
          "path": "poland/"
        },
        {
          "label": "Spain",
          "status": "available",
          "path": "spain/"
        },
        {
          "label": "Germany",
          "status": "planned"
        },
        {
          "label": "France",
          "status": "planned"
        },
        {
          "label": "Austria",
          "status": "planned"
        },
        {
          "label": "Portugal",
          "status": "planned"
        },
        {
          "label": "Italy",
          "status": "planned"
        },
        {
          "label": "Netherlands",
          "status": "planned"
        },
        {
          "label": "Belgium",
          "status": "planned"
        },
        {
          "label": "United Kingdom",
          "status": "planned"
        },
        {
          "label": "United States",
          "status": "planned"
        },
        {
          "label": "Canada",
          "status": "planned"
        },
        {
          "label": "Mexico",
          "status": "planned"
        },
        {
          "label": "Argentina",
          "status": "planned"
        },
        {
          "label": "Chile",
          "status": "planned"
        },
        {
          "label": "Japan",
          "status": "planned"
        },
        {
          "label": "South Korea",
          "status": "planned"
        },
        {
          "label": "Singapore",
          "status": "planned"
        },
        {
          "label": "Australia",
          "status": "planned"
        },
        {
          "label": "India",
          "status": "planned"
        },
        {
          "label": "Ukraine",
          "status": "planned"
        }
      ],
      "localizationExamples": [
        {
          "label": "Date",
          "value": "31/12/2026",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time",
          "value": "14:25",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Currency",
          "value": "R$ 1.234,56",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Decimal",
          "value": "1.234,56",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Percentage",
          "value": "35,7%",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Phone",
          "value": "+55 11 91234-5678",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Postal code",
          "value": "01310-100",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Address example",
          "value": "Av. Paulista, 1000 - Bela Vista, Sao Paulo - SP, 01310-100",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Example person name",
          "value": "Ana Silva",
          "tags": [
            "locale"
          ]
        }
      ],
      "addressExample": {
        "formatted": [
          "Maria Silva",
          "Av. Paulista, 1000 - Bela Vista",
          "01310-100 Sao Paulo - SP",
          "Brazil"
        ],
        "fields": [
          {
            "label": "Recipient",
            "value": "Maria Silva",
            "description": "Person or organization receiving mail."
          },
          {
            "label": "Street and number",
            "value": "Av. Paulista, 1000",
            "description": "Brazilian addresses usually include street type, name, and building number."
          },
          {
            "label": "District",
            "value": "Bela Vista",
            "description": "Bairro or local district is commonly used for delivery context."
          },
          {
            "label": "CEP and city",
            "value": "01310-100 Sao Paulo - SP",
            "description": "Eight-digit CEP plus city and UF state code."
          },
          {
            "label": "Country",
            "value": "Brazil",
            "description": "Country label for international mail and cross-border records."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "+55 11 91234-5678",
          "description": "Country code +55, DDD 11, and nine-digit mobile number."
        },
        {
          "label": "Landline",
          "value": "+55 21 3456-7890",
          "description": "DDD plus eight-digit landline number."
        },
        {
          "label": "Toll-free",
          "value": "0800 123 4567",
          "description": "Service numbers use national service prefixes, not E.164 contact format."
        }
      ],
      "integrationChecklist": [
        "Locale pt-BR configured for dates, amounts, and interface copy.",
        "UTF-8 encoding preserved for Portuguese names, addresses, and accents.",
        "CPF, CNPJ, CEP, Pix, boleto, and fiscal access-key fields validated separately.",
        "BRL amounts stored in integer centavos and displayed with comma decimals.",
        "Pix and boleto payloads treated as payment instructions, not proof of settlement.",
        "Official status checks separated from browser-only format and checksum validation.",
        "LGPD masking applied before logs, support tickets, screenshots, or analytics.",
        "UF, DDD, municipality, and address fields normalized before imports.",
        "Fiscal XML and SPED-like files checked locally before official portal submission.",
        "Fictional fixtures clearly separated from real personal, tax, and banking data."
      ],
      "validationRules": [
        {
          "name": "CPF",
          "description": "Eleven-digit personal tax identifier with two modulus-11 check digits.",
          "status": "available",
          "tags": [
            "identifier",
            "tax"
          ]
        },
        {
          "name": "CNPJ",
          "description": "Fourteen-digit company tax identifier with branch/order digits and two check digits.",
          "status": "available",
          "tags": [
            "identifier",
            "business"
          ]
        },
        {
          "name": "Pix",
          "description": "Instant-payment key and BR Code payload ecosystem for Brazilian bank transfers.",
          "status": "available",
          "tags": [
            "payment",
            "banking"
          ]
        },
        {
          "name": "Boleto",
          "description": "Barcode and linha digitavel payment-slip conventions with local check-digit behavior.",
          "status": "available",
          "tags": [
            "payment",
            "banking"
          ]
        },
        {
          "name": "NF-e",
          "description": "Fiscal document access-key convention for Brazilian electronic invoices.",
          "status": "available",
          "tags": [
            "tax",
            "invoice"
          ]
        }
      ],
      "commonMistakes": [
        "Brazil is not IBAN-first for domestic transfers.",
        "CPF and CNPJ are different identifiers.",
        "Dates use DD/MM/YYYY in common display.",
        "Decimal separator is comma.",
        "CEP is not ZIP.",
        "PIX keys are not always random.",
        "Phone numbers require area codes."
      ],
      "bankingOverview": [
        {
          "name": "Agencia and account",
          "description": "Brazilian bank transfers usually require bank code, agency, account number, account type, and CPF/CNPJ owner fields.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "name": "Boleto barcode",
          "description": "Boletos use barcode and linha digitavel representations with bank, currency, due-date factor, amount, and check digits.",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "name": "BRL and centavos",
          "description": "Brazilian money workflows use comma decimals and integer centavos for storage, APIs, invoices, and reconciliation.",
          "status": "available",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "name": "CNAB 240",
          "description": "Fixed-width bank files commonly use 240-character rows for remittance and return workflows.",
          "status": "available",
          "tags": [
            "banking",
            "file"
          ]
        },
        {
          "name": "CNAB 400",
          "description": "Legacy fixed-width bank files use 400-character rows and need strict line-length validation before bank handoff.",
          "status": "available",
          "tags": [
            "banking",
            "file"
          ]
        },
        {
          "name": "COMPE bank code",
          "description": "Three-digit COMPE bank codes identify Brazilian financial institutions in many payment and account forms.",
          "status": "available",
          "tags": [
            "banking",
            "routing"
          ]
        },
        {
          "name": "ISPB participant code",
          "description": "Eight-digit ISPB codes identify payment-system participants, especially in Pix and banking integrations.",
          "status": "available",
          "tags": [
            "banking",
            "routing"
          ]
        },
        {
          "name": "Open Finance",
          "description": "Brazilian Open Finance flows require consent-oriented party identifiers, scopes, and privacy boundaries.",
          "status": "available",
          "tags": [
            "banking",
            "api"
          ]
        },
        {
          "name": "Pix",
          "description": "Pix keys and EMV BR Code payloads support instant-payment workflows, QR payloads, amount fields, and transaction references.",
          "status": "available",
          "tags": [
            "payments",
            "pix"
          ]
        },
        {
          "name": "TED / DOC",
          "description": "Traditional transfer flows require bank, agency, account, owner identity, amount, and recipient consistency checks.",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        }
      ],
      "localizationNotes": [
        {
          "name": "Plural rules",
          "description": "Portuguese pluralization should use locale-aware message formatting.",
          "tags": [
            "locale"
          ]
        },
        {
          "name": "Week starts",
          "description": "Many Brazilian calendars display Sunday as the first day of week.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Calendar",
          "description": "Gregorian calendar is the ordinary civil calendar.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Sorting",
          "description": "Use locale-aware collation instead of ASCII sorting for user-facing text.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Unicode",
          "description": "Use UTF-8 and preserve accents in names and addresses.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "ICU",
          "description": "ICU locale commonly appears as pt_BR.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Locale naming",
          "description": "Prefer BCP 47 pt-BR in web APIs and pt_BR where ICU/platform conventions require it.",
          "tags": [
            "locale",
            "developer"
          ]
        }
      ],
      "ecosystem": [
        {
          "name": "PIX",
          "description": "Payment rail connected to banks, wallets, QR payments, and customer identifiers.",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "name": "CPF",
          "description": "Individual tax identifier that can also appear as a PIX key type.",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "name": "CNPJ",
          "description": "Company tax identifier used in business, tax, and payment workflows.",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "name": "CEP",
          "description": "Postal code used in address normalization and shipping flows.",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "name": "Phone",
          "description": "Phone data intersects with identity, contact, and PIX key workflows.",
          "tags": [
            "phone"
          ]
        },
        {
          "name": "Banks",
          "description": "Bank code, branch, account, and check digit often matter in integrations.",
          "tags": [
            "banking"
          ]
        },
        {
          "name": "Government",
          "description": "Government systems are authoritative for many identifier contexts.",
          "tags": [
            "government"
          ]
        },
        {
          "name": "Payments",
          "description": "Payments connect currency, identifiers, QR payloads, bank accounts, and receipts.",
          "tags": [
            "payments"
          ]
        }
      ],
      "highlights": [
        "Brazil commonly uses the pt-BR locale.",
        "Dates are commonly written as DD/MM/YYYY.",
        "The decimal separator is comma and the thousands separator is dot.",
        "CPF has 11 digits and CNPJ has 14 digits.",
        "CEP has 8 digits and is commonly displayed as NNNNN-NNN.",
        "PIX is the primary instant payment system.",
        "PIX keys can be CPF, CNPJ, email, phone, random key, or QR payload.",
        "Brazil is not an IBAN-first domestic transfer market.",
        "Brazilian banking integrations often require bank code, branch, account, account type, and check digit."
      ],
      "developerNotes": [
        "Use pt-BR formatting for user-facing currency, date, time, and number display.",
        "Store normalized identifiers separately from display masks when validation specs are available.",
        "Treat CPF, CNPJ, CEP, phone, and PIX payload validation as separate workflows; do not mix format checks with business verification.",
        "Confirm official references before deep-linking regulatory or government documentation."
      ],
      "developerExamples": [
        {
          "title": "Java Locale",
          "language": "java",
          "brandKey": "java",
          "code": "Locale.forLanguageTag(\"pt-BR\")",
          "note": "Use BCP 47 locale tags for Java formatting APIs."
        },
        {
          "title": "Java currency format",
          "language": "java",
          "brandKey": "java",
          "code": "NumberFormat.getCurrencyInstance(Locale.forLanguageTag(\"pt-BR\")).format(value)",
          "note": "Formats values using Brazilian Portuguese currency conventions."
        },
        {
          "title": "JavaScript Intl Currency",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.NumberFormat(\"pt-BR\", { style: \"currency\", currency: \"BRL\" })",
          "note": "Formats BRL values with pt-BR separators and currency display."
        },
        {
          "title": "TypeScript locale constant",
          "language": "typescript",
          "brandKey": "typescript",
          "code": "const brazilLocale = 'pt-BR' as const;",
          "note": "Keep locale constants explicit when building typed formatting helpers."
        },
        {
          "title": "JavaScript Date",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.DateTimeFormat(\"pt-BR\")",
          "note": "Uses the browser Intl implementation for localized Brazilian date display."
        },
        {
          "title": "Python locale",
          "language": "python",
          "brandKey": "python",
          "code": "locale.setlocale(locale.LC_ALL, \"pt_BR.UTF-8\")",
          "note": "Requires the pt_BR locale to be installed on the host operating system."
        },
        {
          "title": "Go language tag",
          "language": "go",
          "brandKey": "go",
          "code": "language.MustParse(\"pt-BR\")",
          "note": "Use golang.org/x/text/language when locale-aware behavior is needed."
        },
        {
          "title": "C# culture",
          "language": "csharp",
          "brandKey": "csharp",
          "code": "CultureInfo.GetCultureInfo(\"pt-BR\")",
          "note": "Use CultureInfo for formatting Brazilian dates, numbers, and currency."
        },
        {
          "title": "Kotlin Locale",
          "language": "kotlin",
          "brandKey": "kotlin",
          "code": "Locale.forLanguageTag(\"pt-BR\")",
          "note": "Kotlin on the JVM can use Java Locale APIs."
        },
        {
          "title": "ICU locale",
          "language": "text",
          "code": "pt_BR",
          "note": "Common ICU locale identifier for Brazilian Portuguese."
        },
        {
          "title": "PostgreSQL formatting note",
          "language": "sql",
          "brandKey": "postgresql",
          "code": "to_char(amount, 'FM999G999G990D00')",
          "note": "Database formatting depends on locale/session settings; prefer app-layer Intl formatting when possible."
        },
        {
          "title": "JSON payload locale",
          "language": "json",
          "code": "{\n  \"country\": \"BR\",\n  \"locale\": \"pt-BR\",\n  \"currency\": \"BRL\"\n}",
          "note": "Formatting examples only; not a validation schema."
        },
        {
          "title": "Currency formatting note",
          "language": "text",
          "code": "BRL uses comma decimals and dot thousands separators in pt-BR display.",
          "note": "Keep stored numeric values separate from localized display strings."
        },
        {
          "title": "Date formatting note",
          "language": "text",
          "code": "DD/MM/YYYY",
          "note": "Validate machine-readable dates separately from localized presentation."
        }
      ],
      "jsonExamples": [
        {
          "title": "Customer",
          "code": "{\n  \"name\": \"Ana Silva\",\n  \"country\": \"BR\",\n  \"locale\": \"pt-BR\"\n}"
        },
        {
          "title": "Address",
          "code": "{\n  \"street\": \"Av. Paulista\",\n  \"number\": \"1000\",\n  \"district\": \"Bela Vista\",\n  \"city\": \"Sao Paulo\",\n  \"state\": \"SP\",\n  \"postalCode\": \"01310-100\"\n}"
        },
        {
          "title": "CPF",
          "code": "{\n  \"type\": \"CPF\",\n  \"formatted\": \"123.456.789-09\",\n  \"normalized\": \"12345678909\"\n}"
        },
        {
          "title": "PIX",
          "code": "{\n  \"type\": \"PIX\",\n  \"keyType\": \"email\",\n  \"key\": \"ana@example.com\"\n}"
        },
        {
          "title": "Phone",
          "code": "{\n  \"countryCode\": \"+55\",\n  \"areaCode\": \"11\",\n  \"localNumber\": \"91234-5678\",\n  \"normalized\": \"5511912345678\"\n}"
        }
      ],
      "availableWorkbenches": {
        "Brazil Pix Validator": {
          "status": "experimental",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Discovery page only. The PIX validator workbench is not implemented in this phase."
        }
      },
      "discovery": {
        "relatedResources": {
          "identifiers": [
            {
              "name": "CEP",
              "slug": "cep",
              "description": "Código de Endereçamento Postal. Brazilian postal code system.",
              "link": null
            },
            {
              "name": "CNH",
              "slug": "cnh",
              "description": "Carteira Nacional de Habilitação. Brazilian driver license identifier.",
              "link": null
            },
            {
              "name": "CNPJ",
              "slug": "cnpj",
              "description": "Cadastro Nacional da Pessoa Jurídica. Brazilian business taxpayer identification number.",
              "link": null
            },
            {
              "name": "CPF",
              "slug": "cpf",
              "description": "Cadastro de Pessoas Físicas. Brazilian individual taxpayer registry number.",
              "link": "brazil/brazil-pix-validator"
            },
            {
              "name": "RENAVAM",
              "slug": "renavam",
              "description": "Registro Nacional de Veículos Automotores. Brazilian national vehicle registry number.",
              "link": null
            },
            {
              "name": "RG",
              "slug": "rg",
              "description": "Registro Geral. Brazilian general identity card document.",
              "link": null
            }
          ],
          "payments": [
            {
              "name": "Boleto Bancário",
              "slug": "boleto",
              "description": "Popular Brazilian invoice-based push payment method.",
              "link": null
            },
            {
              "name": "PIX",
              "slug": "pix",
              "description": "Brazilian instant payment network managed by the Central Bank of Brazil.",
              "link": null
            },
            {
              "name": "SWIFT",
              "slug": "swift",
              "description": "Global financial messaging network for international bank wire transfers.",
              "link": null
            }
          ],
          "standards": [],
          "authorities": [],
          "workbenches": [
            {
              "name": "Brazil Pix Validator",
              "slug": "brazil-pix-validator",
              "description": "",
              "link": "brazil/brazil-pix-validator"
            }
          ]
        },
        "relatedCountries": [
          {
            "name": "Germany",
            "slug": "germany",
            "via": [
              "SWIFT"
            ]
          },
          {
            "name": "Poland",
            "slug": "poland",
            "via": [
              "SWIFT"
            ]
          },
          {
            "name": "Spain",
            "slug": "spain",
            "via": [
              "SWIFT"
            ]
          }
        ]
      }
    },
    "germany": {
      "flag": "🇩🇪",
      "name": "Germany",
      "badge": "Central Europe country hub",
      "description": "Developer intelligence for German tax identifiers, locale conventions, postal layouts, phone parsing, and banking integration.",
      "metadata": {
        "nativeName": "Deutschland",
        "population": "approximately 84.4M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "357,022 km²",
        "capital": "Berlin",
        "largestCity": "Berlin",
        "continent": "Europe",
        "region": "Central Europe / European Union",
        "languages": "German",
        "currency": "Euro",
        "currencyCode": "EUR",
        "currencySymbol": "€",
        "callingCode": "+49",
        "internetTld": ".de",
        "drivingSide": "Right",
        "iso2": "DE",
        "iso3": "DEU",
        "isoNumeric": "276",
        "locale": "de-DE",
        "icuLocale": "de_DE",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street name number, postal code City",
        "postalCodeFormat": "NNNNN",
        "primaryTimeZone": "Europe/Berlin (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type F",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "de-DE",
        "cldrLocale": "de_DE",
        "metricVsImperial": "Metric-first"
      },
      "stats": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "brandKey": "europeanUnion",
          "label": "Region",
          "valueKey": "region",
          "tags": [
            "government",
            "locale"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🕒",
          "label": "UTC range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        }
      ],
      "countryProfile": [
        {
          "icon": "🏷",
          "label": "Native name",
          "valueKey": "nativeName",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "▣",
          "label": "Area",
          "valueKey": "area",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🚗",
          "label": "Driving side",
          "valueKey": "drivingSide",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📏",
          "label": "Measurement system",
          "valueKey": "measurementSystem",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📄",
          "label": "Paper size",
          "valueKey": "paperSize",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🔌",
          "label": "Power plug types",
          "valueKey": "powerPlugTypes",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⚡",
          "label": "Voltage",
          "valueKey": "voltage",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⏱",
          "label": "Frequency",
          "valueKey": "frequency",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🚨",
          "label": "Emergency number",
          "valueKey": "emergencyNumber",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency"
          ]
        },
        {
          "icon": "🕒",
          "label": "Timezone range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        },
        {
          "icon": "📅",
          "label": "Week starts",
          "valueKey": "weekStarts",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "↔",
          "label": "RTL support",
          "valueKey": "rtlSupport",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🔤",
          "label": "Unicode locale",
          "valueKey": "unicodeLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "CLDR locale",
          "valueKey": "cldrLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "📐",
          "label": "Metric vs Imperial",
          "valueKey": "metricVsImperial",
          "tags": [
            "locale"
          ]
        }
      ],
      "visualIdentity": {
        "countryId": "germany",
        "outlineLabel": "Germany outline",
        "mapLabel": "Germany in the world",
        "continentBadge": "Europe",
        "flagLabel": "Germany flag",
        "heroAccentPrimary": "17 17 17",
        "heroAccentSecondary": "193 18 31",
        "heroAccentTertiary": "242 201 76"
      },
      "quickActions": [
        {
          "label": "Copy Locale",
          "valueKey": "locale"
        },
        {
          "label": "Copy Currency Code",
          "valueKey": "currencyCode"
        },
        {
          "label": "Copy Currency Symbol",
          "valueKey": "currencySymbol"
        },
        {
          "label": "Copy Phone Code",
          "valueKey": "callingCode"
        },
        {
          "label": "Copy ISO2",
          "valueKey": "iso2"
        },
        {
          "label": "Copy ISO3",
          "valueKey": "iso3"
        },
        {
          "label": "Copy Numeric ISO",
          "valueKey": "isoNumeric"
        },
        {
          "label": "Copy Internet TLD",
          "valueKey": "internetTld"
        },
        {
          "label": "Copy Date Format",
          "valueKey": "dateFormat"
        },
        {
          "label": "Copy Postal Code Format",
          "valueKey": "postalCodeFormat"
        },
        {
          "label": "Copy Primary Time Zone",
          "valueKey": "primaryTimeZone"
        }
      ],
      "cheatSheet": [
        {
          "label": "ISO2",
          "valueKey": "iso2",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "ISO3",
          "valueKey": "iso3",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Numeric ISO",
          "valueKey": "isoNumeric",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Locale",
          "valueKey": "locale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "Language",
          "valueKey": "languages",
          "icon": "🗣",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Currency",
          "value": "Euro (EUR)",
          "copyValueKey": "currencyCode",
          "brandKey": "iban",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "label": "Currency symbol",
          "valueKey": "currencySymbol",
          "icon": "💵",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Phone country code",
          "valueKey": "callingCode",
          "icon": "☎",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "icon": "🌐",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Date format",
          "valueKey": "dateFormat",
          "icon": "📅",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time format",
          "valueKey": "timeFormat",
          "icon": "⏱",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Decimal separator",
          "valueKey": "decimalSeparator",
          "copyValue": "comma decimal separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Thousands separator",
          "valueKey": "thousandsSeparator",
          "copyValue": "dot thousands separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Address format",
          "valueKey": "addressFormat",
          "icon": "📍",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Postal code format",
          "valueKey": "postalCodeFormat",
          "icon": "✉",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Primary time zone",
          "valueKey": "primaryTimeZone",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        },
        {
          "label": "Time zones",
          "valueKey": "utcRange",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        }
      ],
      "localFormats": [
        {
          "icon": "🪪",
          "name": "Steueridentifikationsnummer (IdNr)",
          "status": "planned",
          "category": "National identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "11-digit personal tax identification number assigned to residents of Germany by the Bundeszentralamt für Steuern (BZSt). Does not change upon relocation or marriage.",
          "related": [
            "German Tax ID Inspector"
          ]
        },
        {
          "icon": "🪪",
          "name": "Umsatzsteuer-Identifikationsnummer (USt-IdNr)",
          "status": "planned",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "EU VAT number with DE prefix followed by 9 digits. Used for cross-border commerce validation.",
          "related": [
            "USt-IdNr / VAT Format Inspector"
          ]
        },
        {
          "icon": "🪪",
          "name": "Steuernummer (St.-Nr.)",
          "status": "planned",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Federal-state-specific tax number formats used for local corporate and personal tax filings. Can change when relocating between tax districts.",
          "related": [
            "Steuernummer Reference Tool"
          ]
        },
        {
          "icon": "🏢",
          "name": "Handelsregister context",
          "status": "planned",
          "category": "Business identifier",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Company registration numbers (HRB/HRA) indicating registry district and corporate form context. Used to verify legal entities.",
          "related": [
            "German Address Formatter"
          ]
        },
        {
          "icon": "✉",
          "name": "German postal code",
          "status": "planned",
          "category": "Postal",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Five-digit postal codes managed by Deutsche Post. First digit defines one of ten postal zones (Leitzonen).",
          "related": [
            "Germany Postal Code Validator"
          ]
        },
        {
          "icon": "☎",
          "name": "German phone numbers",
          "status": "planned",
          "category": "Phone",
          "tags": [
            "phone"
          ],
          "description": "Landline and mobile formats regulated by the Bundesnetzagentur. Features variable-length area codes.",
          "related": [
            "Germany Phone Validator"
          ]
        },
        {
          "brandKey": "iban",
          "name": "German IBAN",
          "status": "available",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "German bank accounts use DE prefix IBANs. Direct checksum verification is available.",
          "related": [
            "IBAN Validator"
          ]
        },
        {
          "brandKey": "swift",
          "name": "BIC / SWIFT",
          "status": "ready",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "SWIFT identification for German credit institutions. Identifies banks in domestic and international clearings."
        },
        {
          "brandKey": "vies",
          "name": "EU VAT / VIES",
          "status": "planned",
          "category": "Tax and business",
          "tags": [
            "tax",
            "government"
          ],
          "description": "German VAT registration status verification via VIES system context."
        }
      ],
      "payments": [
        {
          "brandKey": "iban",
          "title": "EUR and German IBAN",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Germany uses EUR and participates in IBAN-based European banking flows. Use the global IBAN Validator for checksum-level checks."
        },
        {
          "brandKey": "sepa",
          "title": "SEPA",
          "status": "ready",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Germany is a founding member of SEPA, supporting SEPA direct debits and credit transfers."
        },
        {
          "brandKey": "swift",
          "title": "BIC / SWIFT",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "text": "International bank transfers require BIC/SWIFT bank details along with account numbers."
        },
        {
          "icon": "💳",
          "title": "Card payments",
          "status": "ready",
          "tags": [
            "payments"
          ],
          "text": "Standard international Visa/Mastercard schemes along with local Girocard (formerly EC-Karte) routing conventions."
        }
      ],
      "officialResources": [
        {
          "label": "Bundeszentralamt für Steuern (BZSt)",
          "status": "available",
          "tags": [
            "government",
            "identifiers",
            "tax"
          ],
          "note": "Federal Central Tax Office website providing official Tax ID and VAT validation specifications."
        },
        {
          "label": "Deutsche Bundesbank",
          "status": "available",
          "tags": [
            "government",
            "banking"
          ],
          "note": "Central bank of Germany, providing currency indices, clearing rails, and bank code directory context."
        },
        {
          "label": "Bundesnetzagentur",
          "status": "available",
          "tags": [
            "government",
            "phone"
          ],
          "note": "Federal Network Agency supervising telecommunication numbering plans and area prefixes."
        },
        {
          "label": "Deutsche Post",
          "status": "available",
          "tags": [
            "postal",
            "addresses"
          ],
          "note": "Postal authority administering five-digit postal codes and official directory standards."
        },
        {
          "brandKey": "vies",
          "label": "European Commission VIES",
          "status": "available",
          "tags": [
            "tax",
            "government"
          ],
          "note": "EU official system for validating VAT registry records and registration validity."
        },
        {
          "brandKey": "sepa",
          "label": "European Payments Council / SEPA",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "note": "SEPA schemes regulator detailing credit transfer and direct debit specifications."
        }
      ],
      "plannedWorkbenches": [
        {
          "name": "German Tax ID Inspector",
          "status": "planned",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Inspect and explain German Tax ID (IdNr) structure and validation rules."
        },
        {
          "name": "USt-IdNr / VAT Format Inspector",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Validate the structural format of DE VAT numbers."
        },
        {
          "name": "Steuernummer Reference Tool",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Understand state-specific local tax number formats and schemas."
        },
        {
          "name": "Germany Phone Validator",
          "status": "planned",
          "tags": [
            "phone"
          ],
          "description": "Explain prefix layouts and digit counts for landline and mobile ranges."
        },
        {
          "name": "Germany Postal Code Validator",
          "status": "planned",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Identify five-digit postal zones and city mappings without full verification."
        },
        {
          "name": "German IBAN Tools",
          "status": "planned",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Explain country-specific bank code (BLZ) and account number offsets."
        },
        {
          "name": "German Address Formatter",
          "status": "planned",
          "tags": [
            "addresses"
          ],
          "description": "Format and normalize street, building, and town names using German postal layout standards."
        }
      ],
      "relatedGlobalTools": [
        {
          "label": "JSON Formatter",
          "path": "tools/json-formatter/",
          "icon": "▣",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Regex Tester",
          "path": "tools/regex-tester/",
          "icon": ".*",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "IBAN Validator",
          "path": "tools/iban-validator/",
          "brandKey": "iban",
          "tags": [
            "banking"
          ]
        }
      ],
      "relatedCategories": [
        {
          "label": "Finance",
          "path": "categories/finance/",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "label": "National Identifiers",
          "path": "categories/national-identifiers/",
          "tags": [
            "identifiers"
          ]
        },
        {
          "label": "Developer Tools",
          "path": "categories/developer-tools/",
          "tags": [
            "developer"
          ]
        }
      ],
      "availableWorkbenches": {},
      "futureCountryPages": [
        {
          "label": "Brazil",
          "status": "available",
          "path": "brazil/"
        },
        {
          "label": "Poland",
          "status": "available",
          "path": "poland/"
        },
        {
          "label": "Spain",
          "status": "available",
          "path": "spain/"
        },
        {
          "label": "France",
          "status": "planned"
        },
        {
          "label": "Portugal",
          "status": "planned"
        },
        {
          "label": "Italy",
          "status": "planned"
        },
        {
          "label": "Netherlands",
          "status": "planned"
        },
        {
          "label": "Belgium",
          "status": "planned"
        },
        {
          "label": "United Kingdom",
          "status": "planned"
        },
        {
          "label": "United States",
          "status": "planned"
        }
      ],
      "localizationExamples": [
        {
          "label": "Date",
          "value": "12.07.2026",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time",
          "value": "14:25",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Currency",
          "value": "1.234,56 €",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Decimal",
          "value": "1.234,56",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Percentage",
          "value": "35,7 %",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mobile phone",
          "value": "+49 170 1234567",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "+49 30 12345678",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Postal code",
          "value": "10117",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Address example",
          "value": "Friedrichstraße 100, 10117 Berlin",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Example person name",
          "value": "Max Mustermann",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mainland time zone",
          "value": "Europe/Berlin",
          "tags": [
            "time"
          ]
        }
      ],
      "addressExample": {
        "formatted": [
          "Max Mustermann",
          "Friedrichstraße 100",
          "10117 Berlin",
          "Germany"
        ],
        "fields": [
          {
            "label": "Recipient",
            "value": "Max Mustermann",
            "description": "Recipient name, company, or department."
          },
          {
            "label": "Street and number",
            "value": "Friedrichstraße 100",
            "description": "German layouts place the street name before the house number."
          },
          {
            "label": "Postal code and City",
            "value": "10117 Berlin",
            "description": "Five-digit numeric postal code (NNNNN) followed by city name."
          },
          {
            "label": "Country",
            "value": "Germany",
            "description": "Country label for international delivery."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "0170 1234567",
          "description": "German mobile network format display example.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "030 12345678",
          "description": "Berlin landline display example.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International mobile",
          "value": "+49 170 1234567",
          "description": "International mobile format using country code +49.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International landline",
          "value": "+49 30 12345678",
          "description": "International landline format for Berlin.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Normalized",
          "value": "491701234567",
          "description": "Digits-only normalization for backend databases.",
          "tags": [
            "phone",
            "developer"
          ]
        }
      ],
      "integrationChecklist": [
        "Locale de-DE configured",
        "UTF-8 encoding preserved",
        "Euro (EUR) formatting with comma decimals and dot separators",
        "Steuer-ID validation checksum rules",
        "USt-IdNr VAT ID format structure checks",
        "Steuernummer state-specific validation checks",
        "German postal code numeric format validation",
        "Phone code +49 prefix parsing",
        "SEPA direct debit mandate handling",
        "Girocard and Giropay clearing routes"
      ],
      "validationRules": [
        {
          "name": "Steuer-ID (IdNr)",
          "tags": [
            "identifiers",
            "government"
          ],
          "points": [
            "11 digits total",
            "Checksum uses modulo 11 algorithm",
            "Assigned by Bundeszentralamt für Steuern (BZSt)"
          ]
        },
        {
          "name": "USt-IdNr",
          "tags": [
            "identifiers",
            "tax"
          ],
          "points": [
            "Starts with DE followed by 9 digits",
            "Checksum uses ISO 7064 Mod 97,10 or similar validation"
          ]
        },
        {
          "name": "Steuernummer",
          "tags": [
            "identifiers",
            "tax"
          ],
          "points": [
            "Can be 10, 11, or 13 digits depending on federal state schema",
            "Used primarily for regional tax offices"
          ]
        },
        {
          "name": "Postal code",
          "tags": [
            "postal",
            "addresses"
          ],
          "points": [
            "Exactly five numeric digits",
            "No hyphens or alphabetical characters allowed"
          ]
        },
        {
          "name": "Phone",
          "tags": [
            "phone"
          ],
          "points": [
            "Variable-length area codes between 2 and 5 digits",
            "Zero prefix must be omitted in international formats"
          ]
        },
        {
          "name": "IBAN",
          "tags": [
            "banking",
            "payments"
          ],
          "points": [
            "German IBAN starts with DE followed by 2 control digits and 18-digit account details",
            "Standard Mod 97,10 checksum check"
          ]
        }
      ],
      "commonMistakes": [
        "Conflating Steuer-ID (personal) with Steuernummer (local tax office file number).",
        "Expecting phone number area codes to have a fixed length (German area codes vary from 2 to 5 digits).",
        "Omitting the space before the percent sign in formatting (e.g. using 35,7% instead of 35,7 %).",
        "Formatting currency as €1.234,56 instead of the natural German 1.234,56 €.",
        "Assuming postal codes starting with 0 do not exist (eastern Germany codes use leading zeros, e.g. Dresden is 01067).",
        "Confusing Handelsregister numbers with personal tax or national identification numbers."
      ],
      "bankingOverview": [
        {
          "brandKey": "iban",
          "name": "IBAN",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "DE-prefixed IBAN format is standard for international transfers."
        },
        {
          "brandKey": "sepa",
          "name": "SEPA",
          "status": "ready",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Euro accounts in Germany support SEPA credit transfers and direct debits."
        },
        {
          "brandKey": "swift",
          "name": "SWIFT / BIC",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "description": "Required for international non-SEPA transfers."
        }
      ],
      "localizationNotes": [
        {
          "name": "Plural rules",
          "description": "German uses standard Germanic plural forms (one, other).",
          "tags": [
            "locale"
          ]
        },
        {
          "name": "Week starts",
          "description": "Most German user interfaces expect Monday as the first day of week.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Calendar",
          "description": "Gregorian calendar is the ordinary civil calendar.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Unicode",
          "description": "Ensure support for German diacritics and special characters: ä, ö, ü, ß.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Timezone",
          "description": "Use Europe/Berlin for global civil time in Germany.",
          "tags": [
            "time",
            "developer"
          ]
        }
      ],
      "ecosystem": [
        {
          "name": "Steuer-ID",
          "description": "Personal tax identification number database.",
          "tags": [
            "identifiers",
            "government"
          ]
        },
        {
          "name": "USt-IdNr",
          "description": "Commercial VAT identification registry.",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "name": "Handelsregister",
          "description": "Commercial company registry.",
          "tags": [
            "identifiers",
            "government"
          ]
        }
      ],
      "highlights": [
        "Germany uses de-DE locale for formatting.",
        "EUR is formatted as 1.234,56 € with a space and trailing symbol.",
        "Umlauts (ä, ö, ü) and ß must be supported.",
        "Date format is DD.MM.YYYY.",
        "Week starts on Monday."
      ],
      "developerNotes": [
        "Validate German postal codes strictly as 5 digits.",
        "Support variable-length area codes in phone validation.",
        "Preserve case-sensitivity for character-coded Steuernummer configurations."
      ],
      "developerExamples": [
        {
          "title": "Java Locale",
          "language": "java",
          "brandKey": "java",
          "code": "Locale.forLanguageTag(\"de-DE\")",
          "note": "Use BCP 47 locale tags for Java formatting APIs."
        },
        {
          "title": "Java currency format",
          "language": "java",
          "brandKey": "java",
          "code": "NumberFormat.getCurrencyInstance(Locale.forLanguageTag(\"de-DE\")).format(value)",
          "note": "Formats values using German currency conventions."
        },
        {
          "title": "JavaScript Intl Currency",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.NumberFormat(\"de-DE\", { style: \"currency\", currency: \"EUR\" })",
          "note": "Formats EUR values with de-DE separators and currency display."
        },
        {
          "title": "JavaScript Date",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.DateTimeFormat(\"de-DE\", { timeZone: \"Europe/Berlin\" })",
          "note": "Use Europe/Berlin timezone for Germany local dates."
        },
        {
          "title": "Python locale",
          "language": "python",
          "brandKey": "python",
          "code": "locale.setlocale(locale.LC_ALL, \"de_DE.UTF-8\")",
          "note": "Requires the de_DE locale to be installed on the host operating system."
        },
        {
          "title": "Go language tag",
          "language": "go",
          "brandKey": "go",
          "code": "language.MustParse(\"de-DE\")",
          "note": "Use golang.org/x/text/language package for locale representation."
        }
      ],
      "discovery": {
        "relatedResources": {
          "identifiers": [
            {
              "name": "Steuer-IdNr",
              "slug": "steuer-id",
              "description": "Steueridentifikationsnummer. German personal tax identification number.",
              "link": null
            },
            {
              "name": "USt-IdNr",
              "slug": "ust-idnr",
              "description": "Umsatzsteuer-Identifikationsnummer. German VAT identification number.",
              "link": null
            }
          ],
          "payments": [
            {
              "name": "SEPA",
              "slug": "sepa",
              "description": "Single Euro Payments Area bank transfer standard.",
              "link": null
            },
            {
              "name": "SWIFT",
              "slug": "swift",
              "description": "Global financial messaging network for international bank wire transfers.",
              "link": null
            }
          ],
          "standards": [
            {
              "name": "IBAN",
              "slug": "iban",
              "description": "International Bank Account Number standard.",
              "link": "tools/iban-validator"
            }
          ],
          "authorities": [],
          "workbenches": []
        },
        "relatedCountries": [
          {
            "name": "Poland",
            "slug": "poland",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Spain",
            "slug": "spain",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Brazil",
            "slug": "brazil",
            "via": [
              "SWIFT"
            ]
          }
        ]
      }
    },
    "poland": {
      "flag": "🇵🇱",
      "name": "Poland",
      "badge": "Central Europe country hub",
      "description": "Developer intelligence for Polish identifiers, locale conventions, tax systems, EU payments, and banking context.",
      "metadata": {
        "nativeName": "Polska",
        "population": "approximately 37.6M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "312,696 km²",
        "capital": "Warsaw",
        "largestCity": "Warsaw",
        "continent": "Europe",
        "region": "Central Europe / European Union",
        "languages": "Polish",
        "currency": "Polish złoty",
        "currencyCode": "PLN",
        "currencySymbol": "zł",
        "callingCode": "+48",
        "internetTld": ".pl",
        "drivingSide": "Right",
        "iso2": "PL",
        "iso3": "POL",
        "isoNumeric": "616",
        "locale": "pl-PL",
        "icuLocale": "pl_PL",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space ( ) or Dot (.)",
        "addressFormat": "ul. Street name number/flat, postal code City",
        "postalCodeFormat": "NN-NNN",
        "primaryTimeZone": "Europe/Warsaw (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type E",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "pl-PL",
        "cldrLocale": "pl_PL",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "poland",
        "outlineLabel": "Poland outline",
        "mapLabel": "Poland in the world",
        "continentBadge": "Europe",
        "flagLabel": "Poland flag",
        "heroAccentPrimary": "159 18 57",
        "heroAccentSecondary": "244 63 94",
        "heroAccentTertiary": "228 228 231"
      },
      "stats": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "brandKey": "europeanUnion",
          "label": "Region",
          "valueKey": "region",
          "tags": [
            "government",
            "locale"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🕒",
          "label": "UTC range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        }
      ],
      "countryProfile": [
        {
          "icon": "🏷",
          "label": "Native name",
          "valueKey": "nativeName",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "▣",
          "label": "Area",
          "valueKey": "area",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🚗",
          "label": "Driving side",
          "valueKey": "drivingSide",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📏",
          "label": "Measurement system",
          "valueKey": "measurementSystem",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📄",
          "label": "Paper size",
          "valueKey": "paperSize",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🔌",
          "label": "Power plug types",
          "valueKey": "powerPlugTypes",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⚡",
          "label": "Voltage",
          "valueKey": "voltage",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⏱",
          "label": "Frequency",
          "valueKey": "frequency",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🚨",
          "label": "Emergency number",
          "valueKey": "emergencyNumber",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency"
          ]
        },
        {
          "icon": "🕒",
          "label": "Timezone range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        },
        {
          "icon": "📅",
          "label": "Week starts",
          "valueKey": "weekStarts",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "↔",
          "label": "RTL support",
          "valueKey": "rtlSupport",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🔤",
          "label": "Unicode locale",
          "valueKey": "unicodeLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "CLDR locale",
          "valueKey": "cldrLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "📐",
          "label": "Metric vs Imperial",
          "valueKey": "metricVsImperial",
          "tags": [
            "locale"
          ]
        }
      ],
      "quickActions": [
        {
          "label": "Copy Locale",
          "valueKey": "locale"
        },
        {
          "label": "Copy Currency Code",
          "valueKey": "currencyCode"
        },
        {
          "label": "Copy Currency Symbol",
          "valueKey": "currencySymbol"
        },
        {
          "label": "Copy Phone Code",
          "valueKey": "callingCode"
        },
        {
          "label": "Copy ISO2",
          "valueKey": "iso2"
        },
        {
          "label": "Copy ISO3",
          "valueKey": "iso3"
        },
        {
          "label": "Copy Numeric ISO",
          "valueKey": "isoNumeric"
        },
        {
          "label": "Copy Internet TLD",
          "valueKey": "internetTld"
        },
        {
          "label": "Copy Date Format",
          "valueKey": "dateFormat"
        },
        {
          "label": "Copy Postal Code Format",
          "valueKey": "postalCodeFormat"
        },
        {
          "label": "Copy Primary Time Zone",
          "valueKey": "primaryTimeZone"
        }
      ],
      "cheatSheet": [
        {
          "label": "ISO2",
          "valueKey": "iso2",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "ISO3",
          "valueKey": "iso3",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Numeric ISO",
          "valueKey": "isoNumeric",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Locale",
          "valueKey": "locale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "Language",
          "valueKey": "languages",
          "icon": "🗣",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Currency",
          "value": "Polish złoty (PLN)",
          "copyValueKey": "currencyCode",
          "brandKey": "iban",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "label": "Currency symbol",
          "valueKey": "currencySymbol",
          "icon": "💵",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Phone country code",
          "valueKey": "callingCode",
          "icon": "☎",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "icon": "🌐",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Date format",
          "valueKey": "dateFormat",
          "icon": "📅",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time format",
          "valueKey": "timeFormat",
          "icon": "⏱",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Decimal separator",
          "valueKey": "decimalSeparator",
          "copyValue": "comma decimal separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Thousands separator",
          "valueKey": "thousandsSeparator",
          "copyValue": "space thousands separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Address format",
          "valueKey": "addressFormat",
          "icon": "📍",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Postal code format",
          "valueKey": "postalCodeFormat",
          "icon": "✉",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Primary time zone",
          "valueKey": "primaryTimeZone",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        },
        {
          "label": "Time zones",
          "valueKey": "utcRange",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        }
      ],
      "localFormats": [
        {
          "icon": "🪪",
          "name": "PESEL",
          "status": "available",
          "category": "National identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Universal Electronic System for Registration of the Population. 11-digit identifier containing date of birth, serial, gender, and checksum control digit.",
          "related": [
            "PESEL Validator"
          ]
        },
        {
          "icon": "🪪",
          "name": "NIP",
          "status": "available",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Numer Identyfikacji Podatkowej. 10-digit tax identification number used by individuals and legal entities in Poland.",
          "related": [
            "NIP Validator & Explainer"
          ]
        },
        {
          "icon": "🏢",
          "name": "REGON",
          "status": "available",
          "category": "Business identifier",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "National Official Register of Business Entities. Supports 9-digit local registry numbers and 14-digit subdivision registration concepts.",
          "related": [
            "REGON Validator & Explainer"
          ]
        },
        {
          "brandKey": "iban",
          "name": "Polish IBAN",
          "status": "available",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Polish accounts use PL country prefix followed by a two-digit control checksum and 26-digit basic bank account numbers.",
          "related": [
            "Polish IBAN / NRB Workbench",
            "Polish Bank Code / NRB Inspector"
          ]
        },
        {
          "brandKey": "swift",
          "name": "BIC / SWIFT",
          "status": "available",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "BIC/SWIFT codes identify financial institutions for Polish and international bank account transfers."
        },
        {
          "brandKey": "vies",
          "name": "EU VAT / VIES",
          "status": "available",
          "category": "Tax and business",
          "tags": [
            "tax",
            "government"
          ],
          "description": "Polish VAT numbers prefix PL to the NIP string. EU VIES status checks represent a separate status query, not just local validation.",
          "related": [
            "Polish VAT / EU VAT Syntax Workbench"
          ]
        },
        {
          "icon": "✉",
          "name": "Polish postal code",
          "status": "available",
          "category": "Postal",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Five-digit code using NN-NNN pattern (e.g. 00-001 for main Warsaw). Broadly maps to postal zones and districts.",
          "related": [
            "Polish Postal Code Validator"
          ]
        },
        {
          "icon": "☎",
          "name": "Polish phone numbers",
          "status": "available",
          "category": "Phone",
          "tags": [
            "phone"
          ],
          "description": "Nine-digit national number length using country code +48 for mobile and regional landline prefixes.",
          "related": [
            "Polish Phone Number Workbench"
          ]
        },
        {
          "icon": "💸",
          "name": "BLIK",
          "status": "planned",
          "category": "Payments",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Six-digit mobile instant payment standard widely supported across Polish banking apps."
        }
      ],
      "payments": [
        {
          "brandKey": "iban",
          "title": "PLN and Polish IBAN",
          "status": "ready",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Poland uses PLN and participates in IBAN-based European banking flows. Domestic transfers use local clearing systems (Elixir)."
        },
        {
          "icon": "🏦",
          "title": "NRB domestic account",
          "status": "ready",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Domestic Polish account numbers use a 26-digit NRB structure that maps cleanly into a PL-prefixed IBAN."
        },
        {
          "brandKey": "sepa",
          "title": "SEPA",
          "status": "ready",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "SEPA credit transfers apply to Euro-denominated payments, but domestic flows mostly use PLN-native routing."
        },
        {
          "icon": "🧾",
          "title": "Split payment / MPP",
          "status": "available",
          "tags": [
            "payments",
            "tax"
          ],
          "text": "Polish split payment workflows separate VAT amount, supplier NIP, invoice reference, and gross transfer amount."
        },
        {
          "icon": "▦",
          "title": "Payment QR payloads",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "QR-like payment payloads are useful for transfer intent, amount, recipient account, and reference-field testing."
        },
        {
          "icon": "🏛",
          "title": "Tax microaccount",
          "status": "available",
          "tags": [
            "payments",
            "tax"
          ],
          "text": "Tax microaccount calculations depend on PESEL or NIP input and must be treated as payment-routing support, not a bank lookup."
        },
        {
          "brandKey": "swift",
          "title": "BIC / SWIFT",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "text": "BIC/SWIFT details are required for international SWIFT transfers and cross-border bank account payments."
        },
        {
          "icon": "💸",
          "title": "BLIK",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "BLIK uses short-lived six-digit consumer codes. The workbench validates shape and safe fixture behavior without pretending to verify live codes."
        },
        {
          "icon": "💳",
          "title": "Card payments",
          "status": "ready",
          "tags": [
            "payments"
          ],
          "text": "Debit and credit card flows follow global card network schemas plus Polish locale amount formatting conventions."
        },
        {
          "icon": "zł",
          "title": "PLN amount and grosz",
          "status": "available",
          "tags": [
            "payments",
            "currency"
          ],
          "text": "Polish money tools normalize comma decimals, grosz integer values, VAT rates, and copyable developer payloads."
        }
      ],
      "officialResources": [
        {
          "label": "GUS / Portal Statystyczny",
          "status": "available",
          "tags": [
            "government"
          ],
          "note": "Central Statistical Office for official database, classification, and statistical context."
        },
        {
          "label": "Podatki.gov.pl",
          "status": "available",
          "tags": [
            "government",
            "tax"
          ],
          "note": "Official tax administration portal for NIP, VAT, and business status references."
        },
        {
          "label": "ZUS",
          "status": "available",
          "tags": [
            "government",
            "identifiers"
          ],
          "note": "Social Insurance Institution reference portal for social security context."
        },
        {
          "label": "Narodowy Bank Polski",
          "status": "available",
          "tags": [
            "government",
            "banking"
          ],
          "note": "Central bank of Poland providing monetary policy and banking institution indexes."
        },
        {
          "label": "Poczta Polska",
          "status": "available",
          "tags": [
            "postal",
            "addresses"
          ],
          "note": "Postal authority and official postcode database lookup."
        },
        {
          "label": "Krajowy Rejestr Sądowy",
          "status": "available",
          "tags": [
            "government",
            "business"
          ],
          "note": "National Court Register context for KRS-shaped business identifiers and company records."
        },
        {
          "label": "CEIDG",
          "status": "available",
          "tags": [
            "government",
            "business"
          ],
          "note": "Central register context for sole-proprietor onboarding and business-data readiness checks."
        },
        {
          "label": "KSeF / e-Faktura",
          "status": "available",
          "tags": [
            "tax",
            "invoices"
          ],
          "note": "National e-invoicing context for KSeF XML payloads, invoice identifiers, and offline readiness."
        },
        {
          "label": "JPK / Ministerstwo Finansów",
          "status": "available",
          "tags": [
            "tax",
            "xml"
          ],
          "note": "Reference context for Polish tax control files, VAT reporting data, and XML submission readiness."
        },
        {
          "label": "TERYT / SIMC / ULIC",
          "status": "available",
          "tags": [
            "government",
            "addresses"
          ],
          "note": "Territorial and locality classification context for voivodeships, counties, municipalities, towns, and streets."
        },
        {
          "label": "BDO Registry",
          "status": "available",
          "tags": [
            "government",
            "environment"
          ],
          "note": "Waste database and product-packaging register context for BDO-shaped business identifiers."
        },
        {
          "label": "CEPiK",
          "status": "available",
          "tags": [
            "vehicles",
            "government"
          ],
          "note": "Vehicle and driver registry context for plates, VIN workflows, registration certificates, and licence data."
        },
        {
          "label": "UFG",
          "status": "available",
          "tags": [
            "insurance",
            "vehicles"
          ],
          "note": "Insurance guarantee fund context for vehicle insurance and policy-number workflows."
        },
        {
          "label": "Krajowa Administracja Skarbowa",
          "status": "available",
          "tags": [
            "customs",
            "tax"
          ],
          "note": "Customs and tax administration context for EORI, VAT, tax microaccounts, and compliance identifiers."
        },
        {
          "label": "NBP exchange and banking context",
          "status": "available",
          "tags": [
            "banking",
            "currency"
          ],
          "note": "Central-bank context for PLN, bank metadata, exchange-rate references, and financial institution naming."
        }
      ],
      "plannedWorkbenches": [],
      "relatedGlobalTools": [
        {
          "label": "JSON Formatter",
          "path": "tools/json-formatter/",
          "icon": "▣",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Regex Tester",
          "path": "tools/regex-tester/",
          "icon": ".*",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "IBAN Validator",
          "path": "tools/iban-validator/",
          "brandKey": "iban",
          "tags": [
            "banking"
          ]
        },
        {
          "label": "Polish IBAN / NRB Workbench",
          "path": "poland/poland-iban-nrb-validator/",
          "brandKey": "iban",
          "tags": [
            "banking",
            "payments"
          ]
        },
        {
          "label": "Polish VAT / EU VAT Syntax Workbench",
          "path": "poland/poland-vat-validator/",
          "brandKey": "vies",
          "tags": [
            "tax",
            "eu"
          ]
        }
      ],
      "relatedCategories": [
        {
          "label": "Finance",
          "path": "categories/finance/",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "label": "National Identifiers",
          "path": "categories/national-identifiers/",
          "tags": [
            "identifiers"
          ]
        },
        {
          "label": "Developer Tools",
          "path": "categories/developer-tools/",
          "tags": [
            "developer"
          ]
        }
      ],
      "availableWorkbenches": {
        "PESEL Validator": {
          "status": "available",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Validate, parse, generate, and explain Polish PESEL numbers."
        },
        "NIP Validator & Explainer": {
          "status": "available",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Validate, normalize, generate fixtures, and explain Polish NIP checksum behavior.",
          "path": "poland-nip-validator/"
        },
        "REGON Validator & Explainer": {
          "status": "available",
          "tags": [
            "identifiers",
            "government",
            "business"
          ],
          "description": "Validate 9- and 14-digit REGON numbers with checksum math and business-register context.",
          "path": "poland-regon-validator/"
        },
        "Polish IBAN / NRB Workbench": {
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Validate PL IBAN and domestic NRB account numbers with MOD-97 and bank-segment diagnostics.",
          "path": "poland-iban-nrb-validator/"
        },
        "Polish Tax Microaccount Calculator": {
          "status": "available",
          "tags": [
            "tax",
            "payments"
          ],
          "description": "Inspect PESEL or NIP inputs for Polish tax microaccount workflows with clear offline limits.",
          "path": "poland-tax-microaccount-calculator/"
        },
        "Polish Postal Code Validator": {
          "status": "available",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Normalize and validate Polish NN-NNN postal-code format.",
          "path": "poland-postal-code-validator/"
        },
        "Polish Phone Number Workbench": {
          "status": "available",
          "tags": [
            "phone",
            "locale"
          ],
          "description": "Normalize +48 phone numbers and classify mobile, landline, service, and premium-like ranges.",
          "path": "poland-phone-number-validator/"
        },
        "Polish License Plate Inspector": {
          "status": "available",
          "tags": [
            "vehicle",
            "identifiers"
          ],
          "description": "Inspect Polish license-plate structure and region-prefix hints.",
          "path": "poland-license-plate-inspector/"
        },
        "KRS Number Inspector": {
          "status": "available",
          "tags": [
            "business",
            "government"
          ],
          "description": "Validate KRS number shape and explain National Court Register boundaries.",
          "path": "poland-krs-inspector/"
        },
        "Polish VAT / EU VAT Syntax Workbench": {
          "status": "available",
          "tags": [
            "tax",
            "vat",
            "eu"
          ],
          "description": "Validate PL VAT syntax using the underlying NIP checksum and explain VIES boundaries.",
          "path": "poland-vat-validator/"
        },
        "Polish Bank Code / NRB Inspector": {
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Extract Polish bank and branch segments from valid NRB or PL IBAN input.",
          "path": "poland-bank-code-inspector/"
        },
        "Polish ID Card Validator": {
          "status": "available",
          "tags": [
            "identifiers",
            "poland",
            "workbench"
          ],
          "description": "Validate and explain Polish dowod osobisty number structure and checksum with offline diagnostics.",
          "path": "poland-id-card-validator/"
        },
        "Polish BIC / SWIFT Inspector": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Inspect BIC/SWIFT syntax, PL country code, branch segment, and banking integration boundaries.",
          "path": "poland-swift-bic-inspector/"
        },
        "TERYT Code Inspector": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Inspect Polish TERYT-like administrative code shapes for voivodeship, county, gmina, SIMC, and ULIC workflows.",
          "path": "poland-teryt-code-inspector/"
        },
        "BLIK Code Helper": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Validate BLIK code shape, generate safe fictional fixtures, and explain browser-only security boundaries.",
          "path": "poland-blik-code-helper/"
        },
        "PLN Amount Formatter": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Normalize Polish zloty amounts, convert grosz, and format developer-safe money values.",
          "path": "poland-pln-amount-formatter/"
        },
        "Polish VAT Calculator": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Calculate net, VAT, and gross values for common Polish VAT rates with rounding diagnostics.",
          "path": "poland-vat-calculator/"
        },
        "Polish Date / Locale Formatter": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Format dates for pl-PL, Europe/Warsaw, ISO, display, and developer payload workflows.",
          "path": "poland-date-locale-formatter/"
        },
        "Polish Address Formatter": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Normalize Polish address lines, postal codes, building/apartment hints, and developer payload shapes.",
          "path": "poland-address-formatter/"
        },
        "VIN Validator for Poland Workflows": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Validate VIN structure and checksum for fleet, insurance, parking, and vehicle intake workflows.",
          "path": "poland-vin-validator/"
        },
        "Polish EORI Inspector": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Inspect PL EORI syntax, NIP-like roots, customs workflow boundaries, and safe fixture formats.",
          "path": "poland-eori-inspector/"
        },
        "Polish PII Masker": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Mask Polish identifiers, account numbers, phones, emails, and address-like values for logs and support.",
          "path": "poland-pii-masker/"
        },
        "Polish Test Data Generator": {
          "status": "available",
          "tags": [
            "developer-tools",
            "poland",
            "workbench"
          ],
          "description": "Generate safe fictional Polish developer fixtures for identifiers, banking, phone, postal, and address forms.",
          "path": "poland-test-data-generator/"
        },
        "Polish Invoice Number Helper": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Normalize invoice numbering patterns, detect year/sequence hints, and generate safe invoice fixtures.",
          "path": "poland-invoice-number-helper/"
        },
        "PLN Grosz Converter": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Convert PLN to grosz and grosz to PLN with precise rounding and copyable developer payloads.",
          "path": "poland-grosz-converter/"
        },
        "Polish SEPA Transfer Helper": {
          "status": "available",
          "tags": [
            "finance",
            "poland",
            "workbench"
          ],
          "description": "Inspect Polish SEPA transfer readiness using IBAN, BIC, amount, and reference-field diagnostics.",
          "path": "poland-sepa-transfer-helper/"
        }
      },
      "futureCountryPages": [
        {
          "label": "Brazil",
          "status": "available",
          "path": "brazil/"
        },
        {
          "label": "Poland",
          "status": "available",
          "path": "poland/"
        },
        {
          "label": "Germany",
          "status": "planned"
        },
        {
          "label": "France",
          "status": "planned"
        },
        {
          "label": "Portugal",
          "status": "planned"
        },
        {
          "label": "Italy",
          "status": "planned"
        },
        {
          "label": "Netherlands",
          "status": "planned"
        },
        {
          "label": "Belgium",
          "status": "planned"
        },
        {
          "label": "United Kingdom",
          "status": "planned"
        },
        {
          "label": "United States",
          "status": "planned"
        },
        {
          "label": "Canada",
          "status": "planned"
        },
        {
          "label": "Mexico",
          "status": "planned"
        },
        {
          "label": "Argentina",
          "status": "planned"
        },
        {
          "label": "Chile",
          "status": "planned"
        },
        {
          "label": "Japan",
          "status": "planned"
        },
        {
          "label": "Australia",
          "status": "planned"
        },
        {
          "label": "India",
          "status": "planned"
        },
        {
          "label": "Ukraine",
          "status": "planned"
        }
      ],
      "localizationExamples": [
        {
          "label": "Date",
          "value": "11.07.2026",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time",
          "value": "14:25",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Currency",
          "value": "1 234,56 zł",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Decimal",
          "value": "1 234,56",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Percentage",
          "value": "35,7%",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mobile phone",
          "value": "+48 501 234 567",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "+48 22 123 45 67",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Postal code",
          "value": "00-001",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Address example",
          "value": "ul. Marszałkowska 100/10, 00-001 Warszawa",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Example person name",
          "value": "Jan Kowalski",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mainland time zone",
          "value": "Europe/Warsaw",
          "tags": [
            "time"
          ]
        }
      ],
      "addressExample": {
        "formatted": [
          "Jan Kowalski",
          "ul. Marszałkowska 100 m. 10",
          "00-001 Warszawa",
          "Poland"
        ],
        "fields": [
          {
            "label": "Recipient",
            "value": "Jan Kowalski",
            "description": "Fictional person or organization receiving mail."
          },
          {
            "label": "Street type and name",
            "value": "ul. Marszałkowska",
            "description": "Polish addresses usually include the street type and name."
          },
          {
            "label": "Building and flat number",
            "value": "100 m. 10",
            "description": "Building number and apartment unit details."
          },
          {
            "label": "Postal code",
            "value": "00-001",
            "description": "Five-digit postal code with hyphen (NN-NNN)."
          },
          {
            "label": "City",
            "value": "Warszawa",
            "description": "City or municipality for display and delivery."
          },
          {
            "label": "Country",
            "value": "Poland",
            "description": "Country label for international mail and cross-border records."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "501 234 567",
          "description": "Polish mobile layout display example.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "22 123 45 67",
          "description": "Warsaw-style landline display example.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International mobile",
          "value": "+48 501 234 567",
          "description": "Use +48 for international representation.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International landline",
          "value": "+48 22 123 45 67",
          "description": "International layout for Warsaw landline.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Normalized",
          "value": "48501234567",
          "description": "Digits-only normalization for databases.",
          "tags": [
            "phone",
            "developer"
          ]
        }
      ],
      "integrationChecklist": [
        "Locale pl-PL configured",
        "UTF-8 encoding preserved",
        "Złoty (PLN) formatting with comma decimals and space thousands separators",
        "PESEL validation rules and checksum",
        "NIP tax identifier checksum rules",
        "REGON business register length and checks",
        "Polish postal code display mask (NN-NNN)",
        "Phone code +48 formatting",
        "NRB domestic format vs IBAN PL representation",
        "BLIK payment system integration parameters"
      ],
      "validationRules": [
        {
          "name": "PESEL",
          "tags": [
            "identifiers",
            "government"
          ],
          "points": [
            "11 digits total",
            "Checksum uses 1-3-7-9 weight factors",
            "Encodes date of birth and gender (even for female, odd for male)"
          ]
        },
        {
          "name": "NIP",
          "tags": [
            "identifiers",
            "tax"
          ],
          "points": [
            "10 digits total",
            "Checksum uses 6-5-7-2-3-4-5-6-7 weights",
            "Used for tax administration and invoices"
          ]
        },
        {
          "name": "REGON",
          "tags": [
            "identifiers",
            "government"
          ],
          "points": [
            "Supports 9-digit local registry and 14-digit subdivision layouts",
            "Weighted checksum algorithm verifies structural validity"
          ]
        },
        {
          "name": "Postal code",
          "tags": [
            "postal",
            "addresses"
          ],
          "points": [
            "Five digits in NN-NNN mask",
            "First digit defines the main postal region (e.g. 0 for Warsaw)"
          ]
        },
        {
          "name": "Phone",
          "tags": [
            "phone"
          ],
          "points": [
            "Nine digits excluding country code +48",
            "Mobile ranges and regional landline prefixes have different shapes"
          ]
        },
        {
          "name": "IBAN",
          "tags": [
            "banking",
            "payments"
          ],
          "points": [
            "Polish IBAN starts with PL followed by control digits and 26-digit NRB",
            "Direct checksum verification using modulo 97"
          ]
        }
      ],
      "commonMistakes": [
        "Treating BLIK as a bank account identifier rather than a mobile payment token.",
        "Conflating NIP (tax) and PESEL (personal) identifiers.",
        "Using comma instead of space for thousands formatting, which looks unnatural to Polish users.",
        "Forgetting the hyphen in the NN-NNN postal code display.",
        "Hardcoding PLN symbol position before the amount (PLN should be formatted as 123,45 zł or 123,45 PLN).",
        "Conflating 26-digit domestic NRB accounts with 28-character PL IBANs in databases."
      ],
      "bankingOverview": [
        {
          "brandKey": "iban",
          "name": "IBAN",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "PL-prefixed IBAN format is standard for international transfers."
        },
        {
          "icon": "🏦",
          "name": "NRB domestic account",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "The 26-digit domestic account layout carries control digits, bank segment, branch context, and account sequence."
        },
        {
          "icon": "🏦",
          "name": "Bank code segment",
          "status": "available",
          "tags": [
            "banking"
          ],
          "description": "Bank and branch hints can be extracted from a structurally valid NRB or PL IBAN without doing an official lookup."
        },
        {
          "brandKey": "sepa",
          "name": "SEPA",
          "status": "ready",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Euro accounts in Poland support SEPA, but domestic transfers use PLN clearing (Elixir)."
        },
        {
          "brandKey": "swift",
          "name": "SWIFT / BIC",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "description": "Required for international non-SEPA transfers."
        },
        {
          "icon": "💸",
          "name": "BLIK",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Widely popular domestic instant mobile payment solution using six-digit short-lived codes."
        },
        {
          "icon": "🏦",
          "name": "Domestic account context",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "description": "Elixir is the domestic clearing system processing PLN transfers in three daily sessions."
        },
        {
          "icon": "🧾",
          "name": "Split payment / MPP",
          "status": "available",
          "tags": [
            "payments",
            "tax"
          ],
          "description": "Split-payment transfers combine gross amount, VAT amount, invoice reference, and supplier NIP into one banking workflow."
        },
        {
          "icon": "🏛",
          "name": "Tax microaccount",
          "status": "available",
          "tags": [
            "tax",
            "payments"
          ],
          "description": "Tax microaccount helpers derive payment-account context from PESEL or NIP input for offline pre-checks."
        },
        {
          "icon": "▦",
          "name": "Payment QR and title fields",
          "status": "available",
          "tags": [
            "payments"
          ],
          "description": "Payment QR and transfer title workflows standardize amount, account, recipient, reference, and invoice text before banking handoff."
        },
        {
          "icon": "zł",
          "name": "PLN, grosz and VAT amounts",
          "status": "available",
          "tags": [
            "currency",
            "payments"
          ],
          "description": "Polish money workflows need comma decimals, integer grosz payloads, VAT rounding, and copyable audit output."
        }
      ],
      "localizationNotes": [
        {
          "name": "Plural rules",
          "description": "Polish has complex plural forms (1, 2-4, 5-21, etc.) depending on the noun case.",
          "tags": [
            "locale"
          ]
        },
        {
          "name": "Week starts",
          "description": "Most Polish user interfaces expect Monday as the first day of week.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Calendar",
          "description": "Gregorian calendar is the ordinary civil calendar.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Unicode",
          "description": "Ensure support for Polish diacritics: ą, ć, ę, ł, ń, ó, ś, ź, ż.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Timezone",
          "description": "Use Europe/Warsaw for global civil time in Poland.",
          "tags": [
            "time",
            "developer"
          ]
        }
      ],
      "ecosystem": [
        {
          "name": "PESEL",
          "description": "Personal identity register for citizens and residents.",
          "tags": [
            "identifiers",
            "government"
          ]
        },
        {
          "name": "NIP",
          "description": "Tax identification number register.",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "name": "REGON",
          "description": "National register of business entities.",
          "tags": [
            "identifiers",
            "government"
          ]
        },
        {
          "name": "BLIK",
          "description": "Mobile payment standard used by millions of bank customers.",
          "tags": [
            "payments",
            "banking"
          ]
        }
      ],
      "highlights": [
        "Poland uses pl-PL locale for formatting.",
        "PLN is displayed with space separators and 'zł' symbol at the end (e.g. 1 234,56 zł).",
        "Diacritics like ł and ż are common and must be preserved.",
        "BLIK is the leading mobile payment method in Poland.",
        "Date format is DD.MM.YYYY."
      ],
      "developerNotes": [
        "Ensure database tables support UTF-8 for Polish diacritics.",
        "Validate local PESEL, NIP, and REGON formats separately.",
        "Use PL country prefix for IBAN validation on Polish accounts."
      ],
      "developerExamples": [
        {
          "title": "Java Locale",
          "language": "java",
          "brandKey": "java",
          "code": "Locale.forLanguageTag(\"pl-PL\")",
          "note": "Use BCP 47 locale tags for Java formatting APIs."
        },
        {
          "title": "Java currency format",
          "language": "java",
          "brandKey": "java",
          "code": "NumberFormat.getCurrencyInstance(Locale.forLanguageTag(\"pl-PL\")).format(value)",
          "note": "Formats values using Polish currency conventions."
        },
        {
          "title": "JavaScript Intl Currency",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.NumberFormat(\"pl-PL\", { style: \"currency\", currency: \"PLN\" })",
          "note": "Formats PLN values with pl-PL separators and currency display."
        },
        {
          "title": "JavaScript Date",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.DateTimeFormat(\"pl-PL\", { timeZone: \"Europe/Warsaw\" })",
          "note": "Use Europe/Warsaw timezone for Poland local dates."
        },
        {
          "title": "Python locale",
          "language": "python",
          "brandKey": "python",
          "code": "locale.setlocale(locale.LC_ALL, \"pl_PL.UTF-8\")",
          "note": "Requires the pl_PL locale to be installed on the host operating system."
        },
        {
          "title": "Go language tag",
          "language": "go",
          "brandKey": "go",
          "code": "language.MustParse(\"pl-PL\")",
          "note": "Use golang.org/x/text/language package for locale representation."
        }
      ],
      "discovery": {
        "relatedResources": {
          "identifiers": [
            {
              "name": "NIP",
              "slug": "nip",
              "description": "Numer Identyfikacji Podatkowej. Polish tax identification number.",
              "link": null
            },
            {
              "name": "PESEL",
              "slug": "pesel",
              "description": "Universal Electronic System for Registration of the Population. 11-digit Polish national ID.",
              "link": null
            },
            {
              "name": "REGON",
              "slug": "regon",
              "description": "National Official Register of Business Entities in Poland.",
              "link": null
            }
          ],
          "payments": [
            {
              "name": "BLIK",
              "slug": "blik",
              "description": "Polish mobile instant payment system.",
              "link": null
            },
            {
              "name": "SEPA",
              "slug": "sepa",
              "description": "Single Euro Payments Area bank transfer standard.",
              "link": null
            },
            {
              "name": "SWIFT",
              "slug": "swift",
              "description": "Global financial messaging network for international bank wire transfers.",
              "link": null
            }
          ],
          "standards": [
            {
              "name": "IBAN",
              "slug": "iban",
              "description": "International Bank Account Number standard.",
              "link": "tools/iban-validator"
            }
          ],
          "authorities": [
            {
              "name": "Narodowy Bank Polski",
              "slug": "nbp",
              "description": "Central Bank of Poland.",
              "link": null
            },
            {
              "name": "Poczta Polska",
              "slug": "poczta-polska",
              "description": "Polish national postal administration.",
              "link": null
            }
          ],
          "workbenches": []
        },
        "relatedCountries": [
          {
            "name": "Germany",
            "slug": "germany",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Spain",
            "slug": "spain",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Brazil",
            "slug": "brazil",
            "via": [
              "SWIFT"
            ]
          }
        ]
      }
    },
    "spain": {
      "flag": "🇪🇸",
      "name": "Spain",
      "badge": "Architecture reuse country hub",
      "description": "Developer intelligence for Spanish identifiers, locale conventions, EU payments, banking context, government systems, and implementation pitfalls.",
      "metadata": {
        "nativeName": "España",
        "population": "approximately 49.6M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "506,030 km²",
        "capital": "Madrid",
        "largestCity": "Madrid",
        "continent": "Europe",
        "region": "Southern Europe / European Union",
        "languages": "Spanish; Catalan/Valencian, Galician, Basque, and Aranese co-official regionally",
        "currency": "Euro",
        "currencyCode": "EUR",
        "currencySymbol": "€",
        "callingCode": "+34",
        "internetTld": ".es",
        "drivingSide": "Right",
        "iso2": "ES",
        "iso3": "ESP",
        "isoNumeric": "724",
        "locale": "es-ES",
        "icuLocale": "es_ES",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street type/name, number, floor/door, postal code, municipality, province",
        "postalCodeFormat": "NNNNN",
        "primaryTimeZone": "Europe/Madrid (CET/CEST)",
        "utcRange": "UTC+01/+02 mainland; UTC+00/+01 Canary Islands",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type F",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "es-ES",
        "cldrLocale": "es_ES",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "spain",
        "outlineLabel": "Spain outline",
        "mapLabel": "Spain in the world",
        "continentBadge": "Europe",
        "flagLabel": "Spain flag",
        "heroAccentPrimary": "153 27 27",
        "heroAccentSecondary": "217 119 6",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "brandKey": "europeanUnion",
          "label": "Region",
          "valueKey": "region",
          "tags": [
            "government",
            "locale"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🕒",
          "label": "UTC range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        }
      ],
      "countryProfile": [
        {
          "icon": "🏷",
          "label": "Native name",
          "valueKey": "nativeName",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "people"
          ]
        },
        {
          "icon": "▣",
          "label": "Area",
          "valueKey": "area",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "government"
          ]
        },
        {
          "icon": "🏙",
          "label": "Largest city",
          "valueKey": "largestCity",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌍",
          "label": "Continent",
          "valueKey": "continent",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🗣",
          "label": "Languages",
          "valueKey": "languages",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🚗",
          "label": "Driving side",
          "valueKey": "drivingSide",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📏",
          "label": "Measurement system",
          "valueKey": "measurementSystem",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "📄",
          "label": "Paper size",
          "valueKey": "paperSize",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🔌",
          "label": "Power plug types",
          "valueKey": "powerPlugTypes",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⚡",
          "label": "Voltage",
          "valueKey": "voltage",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "⏱",
          "label": "Frequency",
          "valueKey": "frequency",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🚨",
          "label": "Emergency number",
          "valueKey": "emergencyNumber",
          "tags": [
            "phone"
          ]
        },
        {
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        },
        {
          "brandKey": "iban",
          "label": "Currency",
          "valueKey": "currencyCode",
          "detailKey": "currency",
          "tags": [
            "currency"
          ]
        },
        {
          "icon": "🕒",
          "label": "Timezone range",
          "valueKey": "utcRange",
          "tags": [
            "time"
          ]
        },
        {
          "icon": "📅",
          "label": "Week starts",
          "valueKey": "weekStarts",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "↔",
          "label": "RTL support",
          "valueKey": "rtlSupport",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🔤",
          "label": "Unicode locale",
          "valueKey": "unicodeLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "🌐",
          "label": "CLDR locale",
          "valueKey": "cldrLocale",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "icon": "📐",
          "label": "Metric vs Imperial",
          "valueKey": "metricVsImperial",
          "tags": [
            "locale"
          ]
        }
      ],
      "quickActions": [
        {
          "label": "Copy Locale",
          "valueKey": "locale"
        },
        {
          "label": "Copy Currency Code",
          "valueKey": "currencyCode"
        },
        {
          "label": "Copy Currency Symbol",
          "valueKey": "currencySymbol"
        },
        {
          "label": "Copy Phone Code",
          "valueKey": "callingCode"
        },
        {
          "label": "Copy ISO2",
          "valueKey": "iso2"
        },
        {
          "label": "Copy ISO3",
          "valueKey": "iso3"
        },
        {
          "label": "Copy Numeric ISO",
          "valueKey": "isoNumeric"
        },
        {
          "label": "Copy Internet TLD",
          "valueKey": "internetTld"
        },
        {
          "label": "Copy Date Format",
          "valueKey": "dateFormat"
        },
        {
          "label": "Copy Postal Code Format",
          "valueKey": "postalCodeFormat"
        },
        {
          "label": "Copy Primary Time Zone",
          "valueKey": "primaryTimeZone"
        }
      ],
      "cheatSheet": [
        {
          "label": "ISO2",
          "valueKey": "iso2",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "ISO3",
          "valueKey": "iso3",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Numeric ISO",
          "valueKey": "isoNumeric",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Locale",
          "valueKey": "locale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "icon": "🌐",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "label": "Language",
          "valueKey": "languages",
          "icon": "🗣",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Currency",
          "value": "Euro (EUR)",
          "copyValueKey": "currencyCode",
          "brandKey": "iban",
          "tags": [
            "currency",
            "payments"
          ]
        },
        {
          "label": "Currency symbol",
          "valueKey": "currencySymbol",
          "icon": "💵",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Phone country code",
          "valueKey": "callingCode",
          "icon": "☎",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "icon": "🌐",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Date format",
          "valueKey": "dateFormat",
          "icon": "📅",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time format",
          "valueKey": "timeFormat",
          "icon": "⏱",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Decimal separator",
          "valueKey": "decimalSeparator",
          "copyValue": "comma decimal separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Thousands separator",
          "valueKey": "thousandsSeparator",
          "copyValue": "dot thousands separator",
          "icon": "🔢",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Address format",
          "valueKey": "addressFormat",
          "icon": "📍",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Postal code format",
          "valueKey": "postalCodeFormat",
          "icon": "✉",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Primary time zone",
          "valueKey": "primaryTimeZone",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        },
        {
          "label": "Time zones",
          "valueKey": "utcRange",
          "icon": "🕒",
          "tags": [
            "time"
          ]
        }
      ],
      "localFormats": [
        {
          "icon": "🪪",
          "name": "DNI",
          "status": "planned",
          "category": "National identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Documento Nacional de Identidad for Spanish citizens. Typical developer handling includes eight digits plus a control letter, preserving formatted and normalized representations.",
          "related": [
            "DNI Validator"
          ]
        },
        {
          "icon": "🪪",
          "name": "NIE",
          "status": "planned",
          "category": "Foreigner identity",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Número de Identidad de Extranjero used for foreigner identification contexts. Common patterns use X, Y, or Z prefix, seven digits, and a control letter.",
          "related": [
            "NIE Validator"
          ]
        },
        {
          "brandKey": "agenciaTributaria",
          "name": "NIF",
          "status": "planned",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Número de Identificación Fiscal is the tax-identification concept. It may relate to DNI, NIE, or legal-entity identifiers, so do not treat it as one universal format.",
          "related": [
            "NIF Inspector"
          ]
        },
        {
          "brandKey": "agenciaTributaria",
          "name": "CIF legacy",
          "status": "planned",
          "category": "Legacy business tax term",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "CIF is a historical term still present in legacy data and user language. Prefer current NIF terminology for legal-entity tax identifiers.",
          "related": [
            "Legacy CIF Inspector"
          ]
        },
        {
          "brandKey": "seguridadSocialEspana",
          "name": "NAF / Social Security number",
          "status": "planned",
          "category": "Social security",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "High-level developer context for Spanish social-security affiliation numbers. Business meaning and verification require official systems."
        },
        {
          "brandKey": "correosEspana",
          "name": "Spanish postal code",
          "status": "planned",
          "category": "Postal",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Five-digit postal code. The first two digits broadly align with province or autonomous-city prefixes, but postal validation is not administrative validation.",
          "related": [
            "Spain Postal Code Validator"
          ]
        },
        {
          "icon": "☎",
          "name": "Spanish phone numbers",
          "status": "planned",
          "category": "Phone",
          "tags": [
            "phone"
          ],
          "description": "Phone data uses country code +34. Mobile, landline, and service ranges need dedicated parsing rules before validation.",
          "related": [
            "Spain Phone Validator"
          ]
        },
        {
          "brandKey": "iban",
          "name": "Spanish IBAN",
          "status": "available",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Spanish IBANs use the ES country prefix. The existing global IBAN Validator route is available for generic IBAN checks.",
          "related": [
            "IBAN Validator"
          ]
        },
        {
          "brandKey": "swift",
          "name": "BIC / SWIFT",
          "status": "ready",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "BIC/SWIFT codes identify financial institutions for international banking contexts. Do not infer domestic account ownership from a BIC."
        },
        {
          "brandKey": "vies",
          "name": "EU VAT / VIES",
          "status": "planned",
          "category": "Tax and business",
          "tags": [
            "tax",
            "government"
          ],
          "description": "Spanish VAT identifier syntax and EU VIES status checks are different concerns. VIES is a business-status lookup, not just string validation.",
          "related": [
            "Spain VAT / VIES Workbench"
          ]
        },
        {
          "icon": "🚗",
          "name": "Vehicle registration",
          "status": "planned",
          "category": "Vehicle",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Informational overview for Spanish vehicle registration formats. Do not implement plate validation without a dedicated workbench spec."
        },
        {
          "brandKey": "bizum",
          "name": "Bizum",
          "status": "planned",
          "category": "Payments",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Domestic instant-payment experience commonly tied to Spanish banks and mobile numbers. Future tools should be informational unless a meaningful inspector is specified.",
          "related": [
            "Bizum Reference / Inspector"
          ]
        }
      ],
      "payments": [
        {
          "brandKey": "iban",
          "title": "EUR and Spanish IBAN",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Spain uses EUR and participates in IBAN-based European banking flows. Use the global IBAN Validator for generic checksum-level checks only."
        },
        {
          "brandKey": "sepa",
          "title": "SEPA",
          "status": "ready",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "SEPA credit transfer and direct debit contexts matter for euro-denominated domestic and cross-border payment integrations."
        },
        {
          "brandKey": "swift",
          "title": "BIC / SWIFT",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "text": "International transfers may require BIC/SWIFT details in addition to account identifiers and payment purpose data."
        },
        {
          "brandKey": "bizum",
          "title": "Bizum",
          "status": "planned",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Bizum appears in Spanish consumer payment UX. Treat it as future product research, not a validation feature in this hub."
        },
        {
          "icon": "💳",
          "title": "Card payments",
          "status": "ready",
          "tags": [
            "payments"
          ],
          "text": "Card flows use global payment-network behavior plus Spanish locale display conventions for amounts, receipts, and dates."
        },
        {
          "icon": "🏦",
          "title": "Direct debit",
          "status": "planned",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "Direct debit usually intersects with SEPA mandates, creditor identifiers, account data, and authorization state."
        },
        {
          "brandKey": "vies",
          "title": "EU VAT / VIES",
          "status": "planned",
          "tags": [
            "tax",
            "payments"
          ],
          "text": "VAT number format checks and EU VIES business-status lookups must remain separate in future workbenches."
        }
      ],
      "officialResources": [
        {
          "brandKey": "gobiernoEspana",
          "label": "Gobierno de España / Administracion.gob.es",
          "status": "available",
          "tags": [
            "government"
          ],
          "note": "Primary government entry points for Spanish public administration references. Use official pages before deep-linking."
        },
        {
          "icon": "🪪",
          "label": "Ministerio del Interior",
          "status": "available",
          "tags": [
            "government",
            "identifiers"
          ],
          "note": "Authoritative starting point for DNI and NIE public-service context. Confirm exact procedural URLs before linking deep references."
        },
        {
          "brandKey": "agenciaTributaria",
          "label": "Agencia Tributaria",
          "status": "available",
          "tags": [
            "government",
            "tax",
            "identifiers"
          ],
          "note": "Tax authority for NIF, VAT, and fiscal-identification context. Keep legal interpretation out of this page."
        },
        {
          "brandKey": "seguridadSocialEspana",
          "label": "Seguridad Social",
          "status": "available",
          "tags": [
            "government",
            "identifiers"
          ],
          "note": "Official social-security portal for affiliation and contribution contexts."
        },
        {
          "brandKey": "bancoEspana",
          "label": "Banco de España",
          "status": "available",
          "tags": [
            "government",
            "banking"
          ],
          "note": "Central bank and banking-system reference point, including payment-system context."
        },
        {
          "brandKey": "correosEspana",
          "label": "Correos",
          "status": "available",
          "tags": [
            "postal",
            "addresses"
          ],
          "note": "Postal authority and official postal-code lookup starting point."
        },
        {
          "brandKey": "vies",
          "label": "European Commission VIES",
          "status": "available",
          "tags": [
            "tax",
            "government"
          ],
          "note": "Official EU VAT number validation entry point. Use for business-status lookup, not local syntax alone."
        },
        {
          "brandKey": "sepa",
          "label": "European Payments Council / SEPA",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "note": "Reference source for SEPA payment scheme context."
        }
      ],
      "plannedWorkbenches": [
        {
          "name": "DNI Validator",
          "status": "planned",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Explain DNI structure, normalization, and check-letter behavior after a dedicated product spec is approved."
        },
        {
          "name": "NIE Validator",
          "status": "planned",
          "tags": [
            "identifiers",
            "government"
          ],
          "description": "Explain NIE prefix, digits, and control-letter behavior without identity verification claims."
        },
        {
          "name": "NIF Inspector",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Inspect NIF type context for personal and legal-entity identifiers."
        },
        {
          "name": "Legacy CIF Inspector",
          "status": "planned",
          "tags": [
            "identifiers",
            "tax"
          ],
          "description": "Help developers handle legacy CIF-labeled data while migrating terminology to current NIF language."
        },
        {
          "name": "Spain Phone Validator",
          "status": "planned",
          "tags": [
            "phone"
          ],
          "description": "Validate Spanish phone display and normalized +34 forms after a dedicated spec."
        },
        {
          "name": "Spain Postal Code Validator",
          "status": "planned",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Explain five-digit postal codes and province-prefix context without claiming address validity."
        },
        {
          "name": "Spain VAT / VIES Workbench",
          "status": "planned",
          "tags": [
            "tax",
            "government"
          ],
          "description": "Separate VAT syntax checks from VIES business-status lookup and audit notes."
        },
        {
          "name": "Spanish IBAN Tools",
          "status": "planned",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Country-specific explanations around ES IBANs, domestic context, and SEPA usage."
        },
        {
          "name": "Bizum Reference / Inspector",
          "status": "planned",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Only after a clear spec defines what can be inspected safely without payment initiation or bank access."
        }
      ],
      "relatedGlobalTools": [
        {
          "label": "JSON Formatter",
          "path": "tools/json-formatter/",
          "icon": "▣",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "JWT Decoder",
          "path": "tools/jwt-decoder/",
          "brandKey": "jwt",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Base64 Encoder",
          "path": "tools/base64-encoder/",
          "icon": "⟲",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "URL Encoder",
          "path": "tools/url-encoder/",
          "icon": "🔗",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "Regex Tester",
          "path": "tools/regex-tester/",
          "icon": ".*",
          "tags": [
            "developer"
          ]
        },
        {
          "label": "IBAN Validator",
          "path": "tools/iban-validator/",
          "brandKey": "iban",
          "tags": [
            "banking"
          ]
        }
      ],
      "relatedCategories": [
        {
          "label": "Finance",
          "path": "categories/finance/",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "label": "National Identifiers",
          "path": "categories/national-identifiers/",
          "tags": [
            "identifiers"
          ]
        },
        {
          "label": "Developer Tools",
          "path": "categories/developer-tools/",
          "tags": [
            "developer"
          ]
        }
      ],
      "futureCountryPages": [
        {
          "label": "Brazil",
          "status": "available",
          "path": "brazil/"
        },
        {
          "label": "Poland",
          "status": "available",
          "path": "poland/"
        },
        {
          "label": "Germany",
          "status": "planned"
        },
        {
          "label": "France",
          "status": "planned"
        },
        {
          "label": "Portugal",
          "status": "planned"
        },
        {
          "label": "Italy",
          "status": "planned"
        },
        {
          "label": "Netherlands",
          "status": "planned"
        },
        {
          "label": "Belgium",
          "status": "planned"
        },
        {
          "label": "United Kingdom",
          "status": "planned"
        },
        {
          "label": "United States",
          "status": "planned"
        },
        {
          "label": "Canada",
          "status": "planned"
        },
        {
          "label": "Mexico",
          "status": "planned"
        },
        {
          "label": "Argentina",
          "status": "planned"
        },
        {
          "label": "Chile",
          "status": "planned"
        },
        {
          "label": "Japan",
          "status": "planned"
        },
        {
          "label": "Australia",
          "status": "planned"
        },
        {
          "label": "India",
          "status": "planned"
        },
        {
          "label": "Ukraine",
          "status": "planned"
        }
      ],
      "localizationExamples": [
        {
          "label": "Date",
          "value": "31/12/2026",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "label": "Time",
          "value": "14:25",
          "tags": [
            "locale",
            "time"
          ]
        },
        {
          "label": "Currency",
          "value": "1.234,56 €",
          "tags": [
            "currency"
          ]
        },
        {
          "label": "Decimal",
          "value": "1.234,56",
          "tags": [
            "locale",
            "currency"
          ]
        },
        {
          "label": "Percentage",
          "value": "35,7 %",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mobile phone",
          "value": "+34 612 34 56 78",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "+34 91 123 45 67",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Postal code",
          "value": "28013",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "label": "Address example",
          "value": "Calle Mayor, 10, 2º B, 28013 Madrid",
          "tags": [
            "addresses"
          ]
        },
        {
          "label": "Example person name",
          "value": "Lucía Martín",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mainland time zone",
          "value": "Europe/Madrid",
          "tags": [
            "time"
          ]
        },
        {
          "label": "Canary Islands note",
          "value": "Europe/Madrid is not correct for Canary Islands local time",
          "tags": [
            "time"
          ]
        }
      ],
      "addressExample": {
        "formatted": [
          "Lucía Martín",
          "Calle Mayor, 10, 2º B",
          "28013 Madrid",
          "Madrid",
          "Spain"
        ],
        "fields": [
          {
            "label": "Recipient",
            "value": "Lucía Martín",
            "description": "Fictional person or organization receiving mail."
          },
          {
            "label": "Street type and name",
            "value": "Calle Mayor",
            "description": "Spanish addresses often include the street type before the street name."
          },
          {
            "label": "Building number",
            "value": "10",
            "description": "Number within the street."
          },
          {
            "label": "Floor and door",
            "value": "2º B",
            "description": "Common optional apartment or unit context."
          },
          {
            "label": "Postal code",
            "value": "28013",
            "description": "Five-digit postal code. The prefix 28 is associated with Madrid province context."
          },
          {
            "label": "Municipality",
            "value": "Madrid",
            "description": "City or municipality for display and delivery."
          },
          {
            "label": "Province",
            "value": "Madrid",
            "description": "Useful for structured data and disambiguation."
          },
          {
            "label": "Autonomous community",
            "value": "Community of Madrid",
            "description": "Optional structured regional field depending on the use case."
          },
          {
            "label": "Country",
            "value": "Spain",
            "description": "Country label for international mail and cross-border records."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "612 34 56 78",
          "description": "Informational mobile display example. Do not treat this as complete validation.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Landline",
          "value": "91 123 45 67",
          "description": "Madrid-style landline display example using national formatting.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International mobile",
          "value": "+34 612 34 56 78",
          "description": "Use +34 for international display.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "International landline",
          "value": "+34 91 123 45 67",
          "description": "International display form for a landline example.",
          "tags": [
            "phone"
          ]
        },
        {
          "label": "Normalized",
          "value": "34612345678",
          "description": "Digits-only normalization is useful for storage and comparison, but not full validation.",
          "tags": [
            "phone",
            "developer"
          ]
        }
      ],
      "integrationChecklist": [
        "Locale configured",
        "UTF-8",
        "Currency formatting",
        "Date formatting",
        "DNI and NIE terminology",
        "NIF versus legacy CIF terminology",
        "Postal code display",
        "Phone formatting",
        "Mainland versus Canary Islands timezone",
        "Regional language handling",
        "SEPA and IBAN context",
        "VIES versus local VAT syntax"
      ],
      "validationRules": [
        {
          "name": "DNI",
          "tags": [
            "identifiers",
            "government"
          ],
          "points": [
            "Eight digits plus control letter in common developer contexts",
            "Formatted and normalized forms should be stored separately",
            "Check-letter behavior is not identity verification"
          ]
        },
        {
          "name": "NIE",
          "tags": [
            "identifiers",
            "government"
          ],
          "points": [
            "Common prefix letters include X, Y, and Z",
            "Uses digits and a control letter",
            "Foreigner identification context differs from Spanish citizen DNI"
          ]
        },
        {
          "name": "NIF",
          "tags": [
            "identifiers",
            "tax"
          ],
          "points": [
            "Tax identification concept, not one universal string shape",
            "May represent personal or legal-entity contexts",
            "Business verification requires authoritative systems"
          ]
        },
        {
          "name": "CIF legacy",
          "tags": [
            "identifiers",
            "tax"
          ],
          "points": [
            "Legacy term appears in old data and user vocabulary",
            "Current terminology should prefer NIF for legal entities",
            "Migration logic should be explicit"
          ]
        },
        {
          "name": "Postal code",
          "tags": [
            "postal",
            "addresses"
          ],
          "points": [
            "Five digits",
            "Province-prefix context is useful but not enough for address validation",
            "Correos remains the official postal reference"
          ]
        },
        {
          "name": "Phone",
          "tags": [
            "phone"
          ],
          "points": [
            "Country code +34",
            "Mobile, landline, and service ranges differ",
            "Normalize before comparison but preserve display format"
          ]
        },
        {
          "name": "IBAN",
          "tags": [
            "banking",
            "payments"
          ],
          "points": [
            "Spanish IBANs start with ES",
            "Checksum validation does not prove account ownership",
            "SEPA and domestic payment context still matters"
          ]
        },
        {
          "name": "VAT / VIES",
          "tags": [
            "tax",
            "government"
          ],
          "points": [
            "Spanish VAT syntax and EU VIES status lookup are separate",
            "VIES responses are business-status checks",
            "Do not cache regulatory status without a product spec"
          ]
        }
      ],
      "commonMistakes": [
        "DNI, NIE, NIF, and legacy CIF are not interchangeable terms.",
        "Formatting validation is not identity verification.",
        "VIES status lookup is different from local syntax validation.",
        "Mainland Spain and the Canary Islands do not always share the same local time.",
        "Spain has multiple co-official languages in relevant autonomous communities.",
        "Preserve accents and use locale-aware collation for names and addresses.",
        "Postal code is not the same as province or administrative validation.",
        "IBAN checksum validation does not prove account ownership.",
        "Do not imply Bizum payment initiation or bank access from an informational page."
      ],
      "bankingOverview": [
        {
          "brandKey": "iban",
          "name": "IBAN",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Global IBAN validation exists; Spain-specific interpretation remains a future workbench."
        },
        {
          "brandKey": "sepa",
          "name": "SEPA",
          "status": "ready",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Spain participates in SEPA euro payment schemes. Future tools may explain mandates and transfer contexts."
        },
        {
          "brandKey": "swift",
          "name": "SWIFT / BIC",
          "status": "ready",
          "tags": [
            "banking"
          ],
          "description": "Relevant for international bank identification and cross-border transfer metadata."
        },
        {
          "brandKey": "bizum",
          "name": "Bizum",
          "status": "planned",
          "tags": [
            "payments",
            "banking"
          ],
          "description": "Domestic instant-payment ecosystem. No parsing or payment behavior is implemented."
        },
        {
          "icon": "🏦",
          "name": "Domestic account context",
          "status": "planned",
          "tags": [
            "banking"
          ],
          "description": "Legacy domestic bank/account identifiers can appear in old records even when IBAN is the modern exchange format."
        },
        {
          "brandKey": "vies",
          "name": "VIES",
          "status": "planned",
          "tags": [
            "tax",
            "government"
          ],
          "description": "Useful for EU VAT business-status checks. It is not a substitute for local tax advice."
        },
        {
          "icon": "💳",
          "name": "Cards",
          "status": "ready",
          "tags": [
            "payments"
          ],
          "description": "Card acceptance and receipts should still localize EUR amounts, dates, and decimal separators."
        }
      ],
      "localizationNotes": [
        {
          "name": "Plural rules",
          "description": "Spanish pluralization should use locale-aware message formatting.",
          "tags": [
            "locale"
          ]
        },
        {
          "name": "Week starts",
          "description": "Most Spanish user interfaces expect Monday as the first day of week.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Calendar",
          "description": "Gregorian calendar is the ordinary civil calendar.",
          "tags": [
            "locale",
            "date"
          ]
        },
        {
          "name": "Sorting",
          "description": "Use locale-aware collation and preserve accents such as á, é, í, ó, ú, ü, and ñ.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Regional languages",
          "description": "Catalan/Valencian, Galician, Basque, and Aranese may be co-official in relevant regions.",
          "tags": [
            "locale"
          ]
        },
        {
          "name": "Unicode",
          "description": "Use UTF-8 and preserve accents and ordinal markers in names and addresses.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "ICU",
          "description": "ICU locale commonly appears as es_ES.",
          "tags": [
            "locale",
            "developer"
          ]
        },
        {
          "name": "Timezone",
          "description": "Use Europe/Madrid for mainland and Balearic contexts; Canary Islands need a separate timezone choice.",
          "tags": [
            "time",
            "developer"
          ]
        }
      ],
      "ecosystem": [
        {
          "name": "DNI",
          "description": "National identity context for Spanish citizens. Future validators must avoid identity-verification claims.",
          "tags": [
            "identifiers",
            "government"
          ]
        },
        {
          "name": "NIE",
          "description": "Foreigner identification context used in many administrative and commercial flows.",
          "tags": [
            "identifiers",
            "government"
          ]
        },
        {
          "name": "NIF",
          "description": "Tax identification concept that intersects with DNI, NIE, and legal-entity identifiers.",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "name": "SEPA",
          "description": "Payment ecosystem connecting EUR, IBAN, direct debit, credit transfers, and cross-border flows.",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "name": "Bizum",
          "description": "Domestic instant-payment experience commonly encountered by Spanish users.",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "name": "Correos",
          "description": "Postal authority context for postal-code and addressing workflows.",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "name": "VIES",
          "description": "EU VAT validation service context for business identifiers.",
          "tags": [
            "tax",
            "government"
          ]
        },
        {
          "name": "Regional languages",
          "description": "Localization work may need Spanish plus co-official regional languages.",
          "tags": [
            "locale"
          ]
        }
      ],
      "highlights": [
        "Spain commonly uses the es-ES locale for Spanish display conventions.",
        "Dates are commonly written as DD/MM/YYYY and times use a 24-hour clock.",
        "EUR uses comma decimals and dot thousands separators in Spanish display.",
        "DNI, NIE, NIF, and legacy CIF have different meanings and should not be conflated.",
        "Spanish postal codes use five digits, but postal syntax is not address verification.",
        "Spain participates in SEPA and uses IBAN for modern bank account exchange.",
        "Bizum is important in consumer payment UX but no Bizum tool is implemented yet.",
        "Mainland Spain and the Canary Islands differ in local time.",
        "Regional co-official languages can affect labels, names, sorting, and user expectations."
      ],
      "developerNotes": [
        "Use es-ES formatting for user-facing currency, date, time, and number display unless a regional locale is explicitly selected.",
        "Store normalized identifiers separately from display masks when future validator specs exist.",
        "Treat DNI, NIE, NIF, VAT, phone, postal code, and IBAN as separate workflows.",
        "Keep VIES business-status lookup separate from local syntax checks.",
        "Confirm official references before deep-linking regulatory, tax, identity, postal, or banking documentation."
      ],
      "developerExamples": [
        {
          "title": "Java Locale",
          "language": "java",
          "brandKey": "java",
          "code": "Locale.forLanguageTag(\"es-ES\")",
          "note": "Use BCP 47 locale tags for Java formatting APIs."
        },
        {
          "title": "Java currency format",
          "language": "java",
          "brandKey": "java",
          "code": "NumberFormat.getCurrencyInstance(Locale.forLanguageTag(\"es-ES\")).format(value)",
          "note": "Formats values using Spanish currency conventions."
        },
        {
          "title": "JavaScript Intl Currency",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.NumberFormat(\"es-ES\", { style: \"currency\", currency: \"EUR\" })",
          "note": "Formats EUR values with es-ES separators and currency display."
        },
        {
          "title": "JavaScript Date",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.DateTimeFormat(\"es-ES\", { timeZone: \"Europe/Madrid\" })",
          "note": "Use an explicit timezone when records may cross mainland and Canary Islands contexts."
        },
        {
          "title": "TypeScript locale constant",
          "language": "typescript",
          "brandKey": "typescript",
          "code": "const spainLocale = 'es-ES' as const;",
          "note": "Keep locale constants explicit when building typed formatting helpers."
        },
        {
          "title": "Python locale",
          "language": "python",
          "brandKey": "python",
          "code": "locale.setlocale(locale.LC_ALL, \"es_ES.UTF-8\")",
          "note": "Requires the es_ES locale to be installed on the host operating system. Babel may be safer for portable apps."
        },
        {
          "title": "Go language tag",
          "language": "go",
          "brandKey": "go",
          "code": "language.MustParse(\"es-ES\")",
          "note": "Use golang.org/x/text/language when locale-aware behavior is needed."
        },
        {
          "title": "C# culture",
          "language": "csharp",
          "brandKey": "csharp",
          "code": "CultureInfo.GetCultureInfo(\"es-ES\")",
          "note": "Use CultureInfo for formatting Spanish dates, numbers, and currency."
        },
        {
          "title": "Kotlin Locale",
          "language": "kotlin",
          "brandKey": "kotlin",
          "code": "Locale.forLanguageTag(\"es-ES\")",
          "note": "Kotlin on the JVM can use Java Locale APIs."
        },
        {
          "title": "ICU locale",
          "language": "text",
          "code": "es_ES",
          "note": "Common ICU locale identifier for Spanish in Spain."
        },
        {
          "title": "PostgreSQL formatting note",
          "language": "sql",
          "brandKey": "postgresql",
          "code": "to_char(amount, 'FM999G999G990D00')",
          "note": "Database formatting depends on locale/session settings; prefer app-layer Intl formatting when possible."
        },
        {
          "title": "JSON payload locale",
          "language": "json",
          "code": "{\n  \"country\": \"ES\",\n  \"locale\": \"es-ES\",\n  \"currency\": \"EUR\",\n  \"timeZone\": \"Europe/Madrid\"\n}",
          "note": "Formatting examples only; not a validation schema."
        },
        {
          "title": "Currency formatting note",
          "language": "text",
          "code": "EUR in es-ES display commonly uses comma decimals and dot thousands separators.",
          "note": "Keep stored numeric values separate from localized display strings."
        },
        {
          "title": "Date formatting note",
          "language": "text",
          "code": "DD/MM/YYYY",
          "note": "Validate machine-readable dates separately from localized presentation."
        }
      ],
      "jsonExamples": [
        {
          "title": "Customer",
          "code": "{\n  \"name\": \"Lucía Martín\",\n  \"country\": \"ES\",\n  \"locale\": \"es-ES\"\n}"
        },
        {
          "title": "Address",
          "code": "{\n  \"streetType\": \"Calle\",\n  \"streetName\": \"Mayor\",\n  \"buildingNumber\": \"10\",\n  \"floorDoor\": \"2º B\",\n  \"postalCode\": \"28013\",\n  \"municipality\": \"Madrid\",\n  \"province\": \"Madrid\",\n  \"autonomousCommunity\": \"Community of Madrid\"\n}"
        },
        {
          "title": "DNI test fixture",
          "code": "{\n  \"type\": \"DNI\",\n  \"formatted\": \"00000000-T\",\n  \"normalized\": \"00000000T\",\n  \"fixture\": true,\n  \"note\": \"Fictional test value; not identity verification.\"\n}"
        },
        {
          "title": "Phone",
          "code": "{\n  \"countryCode\": \"+34\",\n  \"nationalDisplay\": \"612 34 56 78\",\n  \"normalized\": \"34612345678\"\n}"
        },
        {
          "title": "Banking context",
          "code": "{\n  \"country\": \"ES\",\n  \"currency\": \"EUR\",\n  \"ibanCountryPrefix\": \"ES\",\n  \"paymentArea\": \"SEPA\",\n  \"ownershipVerified\": false\n}"
        },
        {
          "title": "VAT context",
          "code": "{\n  \"country\": \"ES\",\n  \"vatId\": \"ESX0000000T\",\n  \"syntaxChecked\": false,\n  \"viesStatusChecked\": false,\n  \"fixture\": true\n}"
        }
      ],
      "availableWorkbenches": {},
      "discovery": {
        "relatedResources": {
          "identifiers": [
            {
              "name": "CCC",
              "slug": "ccc",
              "description": "Código de Cuenta Corriente. Legacy Spanish bank account format.",
              "link": null
            },
            {
              "name": "CIF",
              "slug": "cif",
              "description": "Código de Identificación Fiscal. Spanish business tax identification number.",
              "link": null
            },
            {
              "name": "NIE",
              "slug": "nie",
              "description": "Número de Identidad de Extranjero. Spanish identification number for foreigners.",
              "link": null
            },
            {
              "name": "NIF",
              "slug": "nif",
              "description": "Número de Identificación Fiscal. Spanish tax identification number for individuals.",
              "link": null
            }
          ],
          "payments": [
            {
              "name": "Bizum",
              "slug": "bizum",
              "description": "Spanish instant mobile payment system.",
              "link": null
            },
            {
              "name": "SEPA",
              "slug": "sepa",
              "description": "Single Euro Payments Area bank transfer standard.",
              "link": null
            },
            {
              "name": "SWIFT",
              "slug": "swift",
              "description": "Global financial messaging network for international bank wire transfers.",
              "link": null
            }
          ],
          "standards": [
            {
              "name": "IBAN",
              "slug": "iban",
              "description": "International Bank Account Number standard.",
              "link": "tools/iban-validator"
            }
          ],
          "authorities": [],
          "workbenches": []
        },
        "relatedCountries": [
          {
            "name": "Germany",
            "slug": "germany",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Poland",
            "slug": "poland",
            "via": [
              "IBAN",
              "SEPA",
              "SWIFT"
            ]
          },
          {
            "name": "Brazil",
            "slug": "brazil",
            "via": [
              "SWIFT"
            ]
          }
        ]
      }
    }
  }

  const COUNTRY_PORTAL_CATALOG = [
    {
      "id": "argentina",
      "flag": "🇦🇷",
      "name": "Argentina",
      "iso2": "AR",
      "iso3": "ARG",
      "continent": "South America",
      "region": "South America",
      "language": "Spanish",
      "currency": "ARS",
      "currencyName": "Argentine peso",
      "status": "planned",
      "summary": "Future hub for Argentinian tax identifiers, banking aliases, and localization details.",
      "identifiers": [
        "CUIT",
        "CUIL",
        "DNI"
      ],
      "payments": [
        "CBU",
        "CVU",
        "Alias"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "CUIT Validator",
        "CBU Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 39,
        "y": 83
      }
    },
    {
      "id": "austria",
      "flag": "🇦🇹",
      "name": "Austria",
      "iso2": "AT",
      "iso3": "AUT",
      "continent": "Europe",
      "region": "Europe",
      "language": "German",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for Austrian localization, identity, tax, and EU banking conventions.",
      "identifiers": [
        "UID",
        "SVNR"
      ],
      "payments": [
        "IBAN",
        "SEPA"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Austrian VAT ID Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 51,
        "y": 37
      }
    },
    {
      "id": "belgium",
      "flag": "🇧🇪",
      "name": "Belgium",
      "iso2": "BE",
      "iso3": "BEL",
      "continent": "Europe",
      "region": "Europe",
      "language": "Dutch / French / German",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for Belgian multilingual locale, identifiers, VAT, and EU payment context.",
      "identifiers": [
        "national number",
        "VAT"
      ],
      "payments": [
        "IBAN",
        "SEPA"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Belgian National Number Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 50,
        "y": 35
      }
    },
    {
      "id": "brazil",
      "flag": "🇧🇷",
      "name": "Brazil",
      "iso2": "BR",
      "iso3": "BRA",
      "continent": "South America",
      "region": "South America",
      "language": "Portuguese",
      "currency": "BRL",
      "currencyName": "Brazilian real",
      "status": "available",
      "featured": true,
      "reference": true,
      "summary": "Developer intelligence for Brazilian identifiers, payments, banking formats, locale conventions, and official systems.",
      "identifiers": [
        "CNAE",
        "CNH",
        "CNPJ",
        "CNS/SUS",
        "CPF",
        "IBGE",
        "IE",
        "IM",
        "NIS/PIS/PASEP",
        "RENACH",
        "RENAVAM",
        "RG",
        "Título de Eleitor"
      ],
      "payments": [
        "Boleto",
        "BRL",
        "CNAB 240",
        "CNAB 400",
        "COMPE",
        "ISPB",
        "Linha digitável",
        "Open Finance",
        "Pix",
        "TED/DOC"
      ],
      "features": [
        "banking",
        "business",
        "commerce",
        "data-quality",
        "fiscal",
        "government",
        "identity",
        "localization",
        "payments",
        "phone",
        "postal",
        "privacy",
        "tax",
        "vehicle"
      ],
      "availableWorkbenches": [
        "Agência / Conta Masker",
        "Boleto Barcode Validator",
        "Boleto Due-Date Factor Helper",
        "Brazil Address Formatter",
        "Brazil Address Transliteration Normalizer",
        "Brazil Bank Statement Parser",
        "Brazil Company Onboarding Auditor",
        "Brazil Compliance Checklist Generator",
        "Brazil Data Quality Workbench",
        "Brazil Date / Locale Formatter",
        "Brazil Form Fixture Generator",
        "Brazil License Plate Inspector",
        "Brazil OCR Post-Processing Fixer",
        "Brazil Passport Number Helper",
        "Brazil Payment Reconciliation Helper",
        "Brazil Phone E.164 Formatter",
        "Brazil PII Masker",
        "Brazil Pix Validator",
        "Brazil Test Data Generator",
        "BRL Centavos Converter",
        "CEP Postal Code Validator",
        "CNAB 240 File Inspector",
        "CNAB 400 File Inspector",
        "CNAE Code Inspector",
        "CNH Driver License Inspector",
        "CNPJ Validator & Explainer",
        "CNS / SUS Card Validator",
        "COMPE Bank Code Inspector",
        "CPF Validator & Explainer",
        "CT-e Access Key Validator",
        "DARF Code Helper",
        "DDD Phone Validator",
        "EFD-Reinf Event ID Inspector",
        "eSocial Event ID Inspector",
        "GNRE Guide Helper",
        "IBGE Municipality Code Inspector",
        "Inscrição Estadual Helper",
        "Inscrição Municipal Helper",
        "ISPB Code Inspector",
        "LGPD Redaction Helper",
        "Linha Digitável Validator",
        "MDF-e Access Key Validator",
        "Natureza Jurídica Code Inspector",
        "NF-e Access Key Validator",
        "NF-e XML Readiness Checker",
        "NFC-e Access Key Validator",
        "NFS-e Number Helper",
        "NIS / PIS / PASEP Inspector",
        "Open Finance Consent Helper",
        "Pix Copy-and-Paste Decoder",
        "Pix QR Payload Generator",
        "RENACH Number Inspector",
        "RENAVAM Vehicle Registry Validator",
        "RG Number Inspector",
        "SAT CF-e Key Inspector",
        "Simples Nacional DAS Helper",
        "SPED EFD Contribuições Checker",
        "SPED EFD ICMS/IPI Checker",
        "TED / DOC Transfer Helper",
        "Título de Eleitor Validator",
        "UF State Code Inspector"
      ],
      "plannedWorkbenches": [],
      "completion": 95,
      "coordinates": {
        "x": 39,
        "y": 67
      }
    },
    {
      "id": "canada",
      "flag": "🇨🇦",
      "name": "Canada",
      "iso2": "CA",
      "iso3": "CAN",
      "continent": "North America",
      "region": "North America",
      "language": "English / French",
      "currency": "CAD",
      "currencyName": "Canadian dollar",
      "status": "planned",
      "summary": "Future hub for Canadian bilingual locale handling, postal codes, tax, and banking notes.",
      "identifiers": [
        "SIN",
        "postal code",
        "business number"
      ],
      "payments": [
        "institution number",
        "transit number"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Canadian Postal Code Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 35,
        "y": 16
      }
    },
    {
      "id": "chile",
      "flag": "🇨🇱",
      "name": "Chile",
      "iso2": "CL",
      "iso3": "CHL",
      "continent": "South America",
      "region": "South America",
      "language": "Spanish",
      "currency": "CLP",
      "currencyName": "Chilean peso",
      "status": "planned",
      "summary": "Future hub for Chilean RUT, banking, address, and localization notes.",
      "identifiers": [
        "RUT",
        "RUN"
      ],
      "payments": [
        "bank account",
        "SWIFT"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "RUT Validator"
      ],
      "completion": 20,
      "coordinates": {
        "x": 38,
        "y": 86
      }
    },
    {
      "id": "france",
      "flag": "🇫🇷",
      "name": "France",
      "iso2": "FR",
      "iso3": "FRA",
      "continent": "Europe",
      "region": "Europe",
      "language": "French",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for French identifiers, localization, postal formats, and EU payment notes.",
      "identifiers": [
        "NIR",
        "SIREN",
        "SIRET"
      ],
      "payments": [
        "IBAN",
        "SEPA"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "SIREN Validator",
        "SIRET Validator"
      ],
      "completion": 20,
      "coordinates": {
        "x": 49,
        "y": 38
      }
    },
    {
      "id": "germany",
      "flag": "🇩🇪",
      "name": "Germany",
      "iso2": "DE",
      "iso3": "DEU",
      "continent": "Europe",
      "region": "Europe",
      "language": "Placeholder",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "inProgress",
      "summary": "Future hub for Germany validation rules and locale formats.",
      "identifiers": [],
      "payments": [],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Placeholder Workbench"
      ],
      "completion": 20,
      "coordinates": {
        "x": 50,
        "y": 35
      }
    },
    {
      "id": "italy",
      "flag": "🇮🇹",
      "name": "Italy",
      "iso2": "IT",
      "iso3": "ITA",
      "continent": "Europe",
      "region": "Europe",
      "language": "Italian",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for Italian tax identifiers, VAT, fiscal code, and EU banking notes.",
      "identifiers": [
        "Codice fiscale",
        "Partita IVA"
      ],
      "payments": [
        "IBAN",
        "SEPA"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Codice Fiscale Validator"
      ],
      "completion": 20,
      "coordinates": {
        "x": 51,
        "y": 40
      }
    },
    {
      "id": "japan",
      "flag": "🇯🇵",
      "name": "Japan",
      "iso2": "JP",
      "iso3": "JPN",
      "continent": "Asia",
      "region": "Asia",
      "language": "Japanese",
      "currency": "JPY",
      "currencyName": "Japanese yen",
      "status": "planned",
      "summary": "Future hub for Japanese localization, address formats, era dates, and payment context.",
      "identifiers": [
        "My Number",
        "postal code"
      ],
      "payments": [
        "bank codes",
        "domestic transfers"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "Japanese Address Notes",
        "Japan Postal Code Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 71,
        "y": 37
      }
    },
    {
      "id": "mexico",
      "flag": "🇲🇽",
      "name": "Mexico",
      "iso2": "MX",
      "iso3": "MEX",
      "continent": "North America",
      "region": "North America",
      "language": "Spanish",
      "currency": "MXN",
      "currencyName": "Mexican peso",
      "status": "planned",
      "summary": "Future hub for Mexican RFC, CURP, address, and payment implementation context.",
      "identifiers": [
        "RFC",
        "CURP",
        "postal code"
      ],
      "payments": [
        "CLABE",
        "SPEI"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "RFC Validator",
        "CURP Validator",
        "CLABE Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 32,
        "y": 48
      }
    },
    {
      "id": "netherlands",
      "flag": "🇳🇱",
      "name": "Netherlands",
      "iso2": "NL",
      "iso3": "NLD",
      "continent": "Europe",
      "region": "Europe",
      "language": "Dutch",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for Dutch identifiers, addresses, VAT, and banking notes.",
      "identifiers": [
        "BSN",
        "KvK",
        "VAT"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "iDEAL"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "BSN Validator",
        "Dutch VAT Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 50,
        "y": 34
      }
    },
    {
      "id": "poland",
      "flag": "🇵🇱",
      "name": "Poland",
      "iso2": "PL",
      "iso3": "POL",
      "continent": "Europe",
      "region": "Europe",
      "language": "Polish",
      "currency": "PLN",
      "currencyName": "Polish zloty",
      "status": "available",
      "summary": "Developer intelligence for Polish identifiers, locale conventions, and EU-oriented validation workflows.",
      "identifiers": [
        "PESEL",
        "NIP",
        "REGON",
        "KRS",
        "VAT",
        "NRB",
        "ID card",
        "EORI",
        "VIN",
        "TERYT"
      ],
      "payments": [
        "IBAN",
        "BLIK",
        "SEPA",
        "NRB",
        "Tax microaccount",
        "BIC",
        "SWIFT",
        "PLN"
      ],
      "features": [
        "identity",
        "government",
        "banking",
        "tax",
        "payments",
        "postal",
        "phone",
        "vehicle",
        "business",
        "commerce",
        "data-quality",
        "localization",
        "vehicles",
        "customs"
      ],
      "availableWorkbenches": [
        "PESEL Validator",
        "NIP Validator & Explainer",
        "REGON Validator & Explainer",
        "Polish IBAN / NRB Workbench",
        "Polish Tax Microaccount Calculator",
        "Polish Postal Code Validator",
        "Polish Phone Number Workbench",
        "Polish License Plate Inspector",
        "KRS Number Inspector",
        "Polish VAT / EU VAT Syntax Workbench",
        "Polish Bank Code / NRB Inspector",
        "Polish ID Card Validator",
        "Polish BIC / SWIFT Inspector",
        "TERYT Code Inspector",
        "BLIK Code Helper",
        "PLN Amount Formatter",
        "Polish VAT Calculator",
        "Polish Date / Locale Formatter",
        "Polish Address Formatter",
        "VIN Validator for Poland Workflows",
        "Polish EORI Inspector",
        "Polish PII Masker",
        "Polish Test Data Generator",
        "Polish Invoice Number Helper",
        "PLN Grosz Converter",
        "Polish SEPA Transfer Helper",
        "Polish VIES Readiness Helper",
        "Polish UPO / e-Deklaracje Payload Checker",
        "Polish KSeF FA(2) Field Mapper Assistant",
        "Polish Payroll Net/Gross Sanity Helper",
        "Polish Bank Transfer Reconciliation Helper",
        "Polish IBAN Owner-Name Precheck",
        "Polish Address Transliteration & Normalization",
        "Polish OCR Post-Processing Fixer",
        "Polish Invoice Duplicate-Risk Detector",
        "Polish Compliance Checklist Generator"
      ],
      "plannedWorkbenches": [],
      "completion": 90,
      "coordinates": {
        "x": 52,
        "y": 34
      }
    },
    {
      "id": "portugal",
      "flag": "🇵🇹",
      "name": "Portugal",
      "iso2": "PT",
      "iso3": "PRT",
      "continent": "Europe",
      "region": "Europe",
      "language": "Portuguese",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "planned",
      "summary": "Future hub for Portuguese NIF, postal, locale, and EU banking conventions.",
      "identifiers": [
        "NIF",
        "postal code"
      ],
      "payments": [
        "IBAN",
        "SEPA"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "NIF Validator"
      ],
      "completion": 20,
      "coordinates": {
        "x": 47,
        "y": 43
      }
    },
    {
      "id": "spain",
      "flag": "🇪🇸",
      "name": "Spain",
      "nativeName": "España",
      "iso2": "ES",
      "iso3": "ESP",
      "continent": "Europe",
      "region": "Europe",
      "language": "Spanish / regional co-official languages",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "inProgress",
      "summary": "Developer intelligence for Spanish identifiers, locale conventions, EU payments, banking context, government systems, and implementation pitfalls.",
      "identifiers": [
        "DNI",
        "NIE",
        "NIF",
        "CIF legacy",
        "NAF",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "SWIFT",
        "Bizum",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "DNI Validator",
        "NIE Validator",
        "NIF Inspector",
        "Legacy CIF Inspector",
        "Spain Phone Validator",
        "Spain Postal Code Validator",
        "Spain VAT / VIES Workbench",
        "Spanish IBAN Tools",
        "Bizum Reference / Inspector"
      ],
      "completion": 68,
      "coordinates": {
        "x": 49,
        "y": 41
      }
    },
    {
      "id": "ukraine",
      "flag": "🇺🇦",
      "name": "Ukraine",
      "iso2": "UA",
      "iso3": "UKR",
      "continent": "Europe",
      "region": "Europe",
      "language": "Ukrainian",
      "currency": "UAH",
      "currencyName": "Ukrainian hryvnia",
      "status": "planned",
      "summary": "Future hub for Ukrainian identifiers, banking, locale, and government integration notes.",
      "identifiers": [
        "RNOKPP",
        "EDRPOU"
      ],
      "payments": [
        "IBAN",
        "bank codes"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "RNOKPP Notes",
        "EDRPOU Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 54,
        "y": 36
      }
    },
    {
      "id": "united-kingdom",
      "flag": "🇬🇧",
      "name": "United Kingdom",
      "iso2": "GB",
      "iso3": "GBR",
      "continent": "Europe",
      "region": "Europe",
      "language": "English",
      "currency": "GBP",
      "currencyName": "Pound sterling",
      "status": "planned",
      "summary": "Future hub for UK identifiers, postcodes, banking, and localization behavior.",
      "identifiers": [
        "NINO",
        "UTR",
        "postcode"
      ],
      "payments": [
        "sort code",
        "IBAN",
        "Faster Payments"
      ],
      "features": [
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "UK Postcode Notes",
        "NINO Validator"
      ],
      "completion": 20,
      "coordinates": {
        "x": 48,
        "y": 33
      }
    },
    {
      "id": "united-states",
      "flag": "🇺🇸",
      "name": "United States",
      "iso2": "US",
      "iso3": "USA",
      "continent": "North America",
      "region": "North America",
      "language": "English",
      "currency": "USD",
      "currencyName": "US dollar",
      "status": "planned",
      "summary": "Future hub for US identifiers, postal formats, banking rails, and locale edge cases.",
      "identifiers": [
        "SSN",
        "EIN",
        "ZIP"
      ],
      "payments": [
        "ACH",
        "routing number",
        "SWIFT"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [],
      "plannedWorkbenches": [
        "ZIP Notes",
        "Routing Number Notes"
      ],
      "completion": 20,
      "coordinates": {
        "x": 30,
        "y": 27
      }
    }
  ]

  const WORKBENCH_DISCOVERY = {
    "brazil-brazil-pix-validator": {
      "authorities": [
        "Receita Federal"
      ],
      "countries": [
        "Brazil"
      ],
      "standards": [],
      "validates": [
        "CPF"
      ]
    },
    "iban-validator": {
      "authorities": [],
      "countries": [],
      "standards": [
        "IBAN"
      ],
      "validates": []
    },
    "nif-nie-validator": {
      "authorities": [
        "Agencia Tributaria"
      ],
      "countries": [
        "Spain"
      ],
      "standards": [],
      "validates": [
        "NIE",
        "NIF"
      ]
    },
    "nip-validator": {
      "authorities": [
        "Ministry of Finance"
      ],
      "countries": [
        "Poland"
      ],
      "standards": [],
      "validates": [
        "NIP"
      ]
    },
    "pesel-validator": {
      "authorities": [
        "Ministry of Digital Affairs"
      ],
      "countries": [
        "Poland"
      ],
      "standards": [],
      "validates": [
        "PESEL"
      ]
    },
    "regon-validator": {
      "authorities": [
        "GUS"
      ],
      "countries": [
        "Poland"
      ],
      "standards": [],
      "validates": [
        "REGON"
      ]
    },
    "steuernummer-validator": {
      "authorities": [
        "BZSt"
      ],
      "countries": [
        "Germany"
      ],
      "standards": [],
      "validates": [
        "Steuer-IdNr"
      ]
    }
  }

  function pathParts(href) {
    try {
      const url = new URL(href, window.location.origin);
      return url.pathname.split('/').filter(p => p && p !== 'index.html');
    } catch (error) {
      return [];
    }
  }

  function isCountryHubLink(link) {
    const parts = pathParts(link.getAttribute('href') || '');
    if (parts.length !== 2 || !LOCALE_PATTERN.test(parts[0])) {
      return false;
    }
    return !RESERVED_TOP_LEVEL.has(parts[1]);
  }

  function isCurrentLink(link) {
    const target = pathParts(link.getAttribute('href') || '').join('/');
    const current = pathParts(window.location.pathname).join('/');
    return target && (current === target || current.startsWith(target + '/'));
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text !== undefined && text !== null) {
      element.textContent = text;
    }
    return element;
  }

  function createSection(eyebrow, title, className, description) {
    const section = createElement('section', `country-section ${className || ''}`.trim());
    const heading = createElement('header', 'section-heading');
    heading.append(
      createElement('span', 'eyebrow', eyebrow),
      createElement('h2', null, title)
    );
    if (description) {
      heading.appendChild(createElement('p', null, description));
    }
    section.appendChild(heading);
    return section;
  }

  function valueFor(country, item) {
    if (item.value !== undefined) {
      return item.value;
    }
    return country.metadata[item.valueKey] || '';
  }

  function copyValueFor(country, item) {
    if (item.copyValue !== undefined) {
      return item.copyValue;
    }
    if (item.copyValueKey) {
      return country.metadata[item.copyValueKey] || '';
    }
    return valueFor(country, item);
  }

  function normalizeStatus(status) {
    return status || 'planned';
  }

  function statusClass(status) {
    return normalizeStatus(status).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).toLowerCase();
  }

  function statusLabel(status) {
    return STATUS_LABELS[normalizeStatus(status)] || normalizeStatus(status);
  }

  function countryUrl(locale, path) {
    return `/${locale}/${path}`;
  }

  function tagsValue(tags) {
    return (tags || []).join(' ');
  }

  function applyTags(element, tags) {
    if (tags && tags.length) {
      element.dataset.countryTags = tagsValue(tags);
    }
  }

  function createStatusBadge(status) {
    const badge = createElement('span', `country-status-badge country-status-${statusClass(status)}`, statusLabel(status));
    badge.dataset.status = statusClass(status);
    return badge;
  }

  function createBrandAsset(brandKey, options) {
    if (!brandKey || !window.ValidoHubBrands || typeof window.ValidoHubBrands.createBrandMark !== 'function') {
      return null;
    }
    return window.ValidoHubBrands.createBrandMark(brandKey, options || {});
  }

  function createCopyButton(value, label) {
    if (!value) {
      return null;
    }
    const button = createElement('button', 'country-copy-button', 'Copy');
    button.type = 'button';
    button.dataset.copyValue = value;
    button.setAttribute('aria-label', `Copy ${label || value}`);
    return button;
  }

  function createCodeValue(value, label, copyValue) {
    const wrapper = createElement('span', 'country-code-value');
    const text = createElement('code', null, value);
    wrapper.appendChild(text);
    const copy = createCopyButton(copyValue || value, label);
    if (copy) {
      wrapper.appendChild(copy);
    }
    return wrapper;
  }

  function createMetricCard(country, item, className) {
    const value = valueFor(country, item);
    const card = createElement('article', `country-metric-card ${className || ''}`.trim());
    applyTags(card, item.tags);
    const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
    if (brandMark) {
      card.appendChild(brandMark);
    } else if (item.icon) {
      const icon = createElement('span', 'country-card-icon', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      card.appendChild(icon);
    }
    card.appendChild(createElement('span', 'country-card-label', item.label));
    card.appendChild(createCodeValue(value, item.label, copyValueFor(country, item)));
    if (item.detailKey && country.metadata[item.detailKey]) {
      card.appendChild(createElement('span', 'country-card-detail', country.metadata[item.detailKey]));
    }
    return card;
  }

  function createHero(country) {
    const hero = createElement('header', 'country-hero');
    applyCountryAccent(hero, country);

    const main = createElement('div', 'country-hero-main');
    const flag = createElement('span', 'country-flag', country.flag);
    flag.setAttribute('aria-hidden', 'true');

    const copy = createElement('div', 'country-hero-copy');
    copy.append(
      createElement('span', 'eyebrow', 'Country Intelligence'),
      createElement('h1', null, country.name),
      createElement('p', null, country.description)
    );

    const badges = createElement('div', 'country-badge-row');
    badges.append(
      createStatusBadge('ready'),
      createStatusBadge('available'),
      createElement('span', 'country-status-badge', country.badge)
    );
    copy.appendChild(badges);
    main.append(flag, copy);

    const stats = createElement('div', 'country-summary-grid country-stats-grid');
    country.stats.forEach((item) => stats.appendChild(createMetricCard(country, item, 'country-stat-card')));

    const visual = createCountryVisual(country);

    hero.append(main, visual, stats);
    return hero;
  }

  function applyCountryAccent(element, country) {
    const visualIdentity = country.visualIdentity || {};
    if (visualIdentity.heroAccentPrimary) {
      element.style.setProperty('--country-accent-1', visualIdentity.heroAccentPrimary);
    }
    if (visualIdentity.heroAccentSecondary) {
      element.style.setProperty('--country-accent-2', visualIdentity.heroAccentSecondary);
    }
    if (visualIdentity.heroAccentTertiary) {
      element.style.setProperty('--country-accent-3', visualIdentity.heroAccentTertiary);
    }
  }

  function createCountryVisual(country) {
    const visual = createElement('aside', 'country-visual-panel');
    visual.setAttribute('aria-label', `${country.name} visual identity`);

    const visualIdentity = country.visualIdentity || {};
    const assets = COUNTRY_VISUAL_ASSETS[visualIdentity.countryId] || {};
    const sourceLabel = assets.source ? createElement('span', 'country-visual-source', assets.source) : null;
    const outline = createVisualCard({
      className: 'country-outline-card',
      title: visualIdentity.outlineLabel || `${country.name} outline`,
      src: assets.outlineSrc,
      alt: assets.outlineAlt || `${country.name} country outline`
    });
    const map = createVisualCard({
      className: 'country-world-map-card',
      title: visualIdentity.mapLabel || `${country.name} location`,
      src: assets.mapSrc,
      alt: assets.mapAlt || `World map highlighting ${country.name}`,
      marker: assets.mapMarker
    });

    const badge = createElement('div', 'country-continent-card');
    badge.append(
      createElement('span', 'country-continent-label', visualIdentity.continentBadge || country.metadata.continent),
      createElement('span', 'country-continent-caption', 'Continent'),
      createElement('span', 'country-continent-flag', country.flag)
    );
    if (sourceLabel) {
      badge.appendChild(sourceLabel);
    }
    visual.append(outline, map, badge);
    return visual;
  }

  function createVisualCard(options) {
    const card = createElement('div', `country-visual-card ${options.className || ''}`.trim());
    const art = createElement('div', 'country-visual-art');
    if (options.src) {
      const image = document.createElement('img');
      image.src = options.src;
      image.alt = options.alt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.className = 'country-visual-image';
      art.appendChild(image);
      if (options.marker) {
        const marker = createElement('span', 'country-location-marker');
        marker.style.setProperty('--marker-x', `${options.marker.x}%`);
        marker.style.setProperty('--marker-y', `${options.marker.y}%`);
        marker.setAttribute('aria-label', `${options.marker.label} location`);
        marker.append(
          createElement('span', 'country-location-pulse'),
          createElement('span', 'country-location-dot'),
          createElement('span', 'country-location-label', options.marker.label)
        );
        art.appendChild(marker);
      }
    } else {
      art.appendChild(createElement('span', 'country-visual-fallback', options.title));
    }
    card.append(
      art,
      createElement('span', 'country-visual-label', options.title)
    );
    return card;
  }

  function createQuickActions(country) {
    const actions = (country.quickActions || [])
      .map((item) => ({ label: item.label, value: country.metadata[item.valueKey] }))
      .filter((item) => item.value);

    if (!actions.length) {
      return null;
    }

    const section = createSection('Quick actions', `Copy common ${country.name} values`, 'country-quick-actions', 'Fast copy controls for identifiers and locale values developers repeatedly need.');
    const bar = createElement('div', 'country-action-bar');
    actions.forEach((item) => {
      const button = createElement('button', 'country-action-button', item.label);
      button.type = 'button';
      button.dataset.copyValue = item.value;
      button.dataset.copyLabel = item.label;
      bar.appendChild(button);
    });
    section.appendChild(bar);
    return section;
  }

  function createCheatSheet(country) {
    const section = createSection('Developer cheat sheet', `${country.name} at a glance`, 'country-cheat-sheet', 'Copy-ready codes, locale formats, and implementation constants.');
    const grid = createElement('div', 'country-fact-grid');
    country.cheatSheet.forEach((item) => grid.appendChild(createMetricCard(country, item)));
    section.appendChild(grid);
    return section;
  }

  function createInfoCard(item, options) {
    const card = createElement(options.href ? 'a' : 'article', options.className || 'country-info-card');
    if (options.href) {
      card.href = options.href;
    }
    if (options.disabled) {
      card.setAttribute('aria-disabled', 'true');
      card.classList.add('is-disabled');
    }
    applyTags(card, item.tags);

    const top = createElement('div', 'country-card-top');
    const title = createElement('div', 'country-title-row');
    const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
    if (brandMark) {
      title.appendChild(brandMark);
    } else if (item.icon) {
      const icon = createElement('span', 'country-card-icon', item.icon);
      icon.setAttribute('aria-hidden', 'true');
      title.appendChild(icon);
    }
    title.appendChild(createElement('h3', null, item.name || item.title || item.label));
    top.appendChild(title);
    if (item.status) {
      top.appendChild(createStatusBadge(item.status));
    }
    card.appendChild(top);
    if (item.logoSrc) {
      const logo = document.createElement('img');
      logo.src = item.logoSrc;
      logo.alt = item.logoAlt || `${item.brand || item.label || item.name || item.title} logo`;
      logo.loading = 'lazy';
      logo.decoding = 'async';
      logo.className = 'country-brand-logo';
      card.appendChild(logo);
    } else if (!brandMark && item.brand) {
      card.appendChild(createElement('span', 'country-brand-placeholder', item.brand));
    }
    if (item.category) {
      card.appendChild(createElement('span', 'country-card-meta', item.category));
    }
    card.appendChild(createElement('p', null, item.description || item.text || item.note || options.fallbackText || ''));
    if (item.related && item.related.length) {
      const related = createElement('div', 'country-related-inline');
      item.related.forEach((label) => related.appendChild(createElement('span', 'country-mini-chip', label)));
      card.appendChild(related);
    }
    return card;
  }

  function createLocalFormats(country) {
    const section = createSection('Local formats', 'Identifiers, addresses, phones, and banking context', 'country-local-formats', `Important ${country.name} formats to account for before building validators or integrations.`);
    const grid = createElement('div', 'country-card-grid');
    country.localFormats.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createCountryProfile(country) {
    const section = createSection('Developer Country Profile', `${country.name} implementation profile`, 'country-profile', 'Country metadata that future hubs can reuse as structured data.');
    const grid = createElement('div', 'country-fact-grid');
    country.countryProfile.forEach((item) => grid.appendChild(createMetricCard(country, item)));
    section.appendChild(grid);
    return section;
  }

  function createLocalizationExamples(country) {
    const section = createSection('Localization examples', `${country.name} display examples`, 'country-localization-examples', 'Concrete examples for locale-aware UI formatting.');
    const grid = createElement('div', 'country-fact-grid');
    country.localizationExamples.forEach((item) => {
      const card = createElement('article', 'country-metric-card country-example-card');
      applyTags(card, item.tags);
      card.append(
        createElement('span', 'country-card-label', item.label),
        createCodeValue(item.value, item.label)
      );
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createAddressExample(country) {
    const section = createSection('Address example', `Formatted ${country.name} address`, 'country-address-example', 'A realistic display example plus field-level explanation.');
    const layout = createElement('div', 'country-split-layout');
    const addressCard = createElement('article', 'country-address-card');
    const pre = createElement('pre', 'country-code-block');
    pre.appendChild(createElement('code', null, country.addressExample.formatted.join('\n')));
    addressCard.append(
      createElement('h3', null, 'Display format'),
      pre,
      createCopyButton(country.addressExample.formatted.join('\n'), `${country.name} address example`)
    );

    const fields = createElement('div', 'country-card-grid country-card-grid-compact');
    country.addressExample.fields.forEach((item) => {
      fields.appendChild(createInfoCard({
        icon: '📍',
        name: item.label,
        status: 'available',
        tags: ['addresses'],
        description: `${item.value} — ${item.description}`
      }, { className: 'country-info-card' }));
    });
    layout.append(addressCard, fields);
    section.appendChild(layout);
    return section;
  }

  function createPhoneExamples(country) {
    const section = createSection('Phone number examples', `${country.name} phone formats`, 'country-phone-examples', 'Examples only. Validate phone rules in a future dedicated workbench.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.phoneExamples.forEach((item) => {
      const card = createInfoCard({
        icon: '☎',
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card' });
      card.appendChild(createCodeValue(item.value, item.label));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createIntegrationChecklist(country) {
    const section = createSection('Developer Integration Checklist', `${country.name} integration reminders`, 'country-integration-checklist', 'Informational checklist only; no runtime validation.');
    const list = createElement('ul', 'country-checklist');
    country.integrationChecklist.forEach((item) => {
      const li = createElement('li');
      li.append(
        createElement('span', 'country-check-box', '□'),
        createElement('span', null, item)
      );
      list.appendChild(li);
    });
    section.appendChild(list);
    return section;
  }

  function createValidationRules(country) {
    const section = createSection('Validation rules', `${country.name} implementation expectations`, 'country-validation-rules', 'Rule summaries only. This section does not implement validators.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.validationRules.forEach((item) => {
      const card = createInfoCard({
        icon: '✓',
        name: item.name,
        status: 'planned',
        tags: item.tags,
        description: 'Validation behavior requires a dedicated workbench spec before implementation.'
      }, { className: 'country-info-card' });
      const list = createElement('ul', 'country-compact-list');
      item.points.forEach((point) => list.appendChild(createElement('li', null, point)));
      card.appendChild(list);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createCommonMistakes(country) {
    const section = createSection('Common integration mistakes', `${country.name} pitfalls to avoid`, 'country-common-mistakes');
    const list = createElement('ul', 'country-highlight-list');
    country.commonMistakes.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createBankingOverview(country) {
    const section = createSection('Banking overview', `${country.name} payments and banking ecosystem`, 'country-banking-overview', 'Purpose summaries only. No banking or payment validation is implemented.');
    const grid = createElement('div', 'country-card-grid');
    country.bankingOverview.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createPayments(country) {
    const section = createSection('Payments & banking', `Developer notes for ${country.name} payment flows`, 'country-payments', 'High-level context only. Payment and banking validators need separate specs before implementation.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.payments.forEach((item) => grid.appendChild(createInfoCard(item, { className: 'country-info-card' })));
    section.appendChild(grid);
    return section;
  }

  function createOfficialResources(country) {
    const section = createSection('Official resources', 'Reference sources to confirm before implementation', 'country-resources', 'Label-only references avoid broken or guessed links while keeping the implementation path clear.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.officialResources.forEach((item) => {
      const card = createInfoCard(item, { className: 'country-resource-card' });
      card.appendChild(createElement('span', 'country-resource-note', 'Label-only reference'));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function collectAvailableWorkbenches(stack) {
    const links = Array.from(stack.querySelectorAll('.related-section .link-card'));
    return links.map((link) => ({
      label: link.textContent.replace(/→/g, '').trim(),
      href: link.getAttribute('href') || '#'
    }));
  }

  function createAvailableWorkbenches(country, availableLinks) {
    const section = createSection('Available workbenches', `${country.name}-related pages currently in ValidoHub`, 'country-available-workbenches', 'Generated country routes that exist today. Scaffolded pages are marked clearly.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    if (availableLinks.length === 0) {
      const empty = createInfoCard({
        icon: '🧭',
        name: 'No country workbenches yet',
        status: 'planned',
        description: 'Country intelligence is available now; interactive country-specific validators require their own future specs.'
      }, { className: 'country-info-card' });
      grid.appendChild(empty);
    }

    availableLinks.forEach((item) => {
      const metadata = country.availableWorkbenches[item.label] || {
        status: 'available',
        description: 'Country-related page generated from ValidoHub content.',
        tags: ['workbench']
      };
      grid.appendChild(createInfoCard({
        icon: '🧪',
        name: item.label,
        status: metadata.status,
        tags: metadata.tags || ['workbench'],
        description: metadata.description
      }, {
        className: 'country-info-card country-link-card',
        href: item.href
      }));
    });

    section.appendChild(grid);
    return section;
  }

  function createPlannedWorkbenches(country) {
    const section = createSection('Planned workbenches', `Future ${country.name} tools that need their own specs`, 'country-planned-workbenches', 'These cards are discovery markers, not inactive buttons. They do not link until a tool exists.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.plannedWorkbenches.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🧩',
        name: item.name,
        status: item.status,
        tags: item.tags,
        description: item.description
      }, {
        className: 'country-info-card country-future-card',
        disabled: true
      }));
    });
    section.appendChild(grid);
    return section;
  }

  function createRelatedGlobalTools(country, locale) {
    const section = createSection('Related global tools', `Useful general-purpose tools for ${country.name} integrations`, 'country-related-global');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.relatedGlobalTools.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: item.icon,
        brandKey: item.brandKey,
        brandLabel: item.brandLabel,
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: 'Open the global tool.'
      }, {
        className: 'country-info-card country-link-card',
        href: countryUrl(locale, item.path)
      }));
    });
    section.appendChild(grid);
    return section;
  }

  function createDiscoveryLinks(country, locale) {
    const section = createSection('Discovery links', 'Related categories and future country hubs', 'country-discovery-links', 'Internal paths are linked only when they exist; future country hubs stay as non-link cards.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    country.relatedCategories.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🏷',
        name: item.label,
        status: 'available',
        tags: item.tags,
        description: 'Browse related ValidoHub category.'
      }, {
        className: 'country-info-card country-link-card',
        href: countryUrl(locale, item.path)
      }));
    });

    country.futureCountryPages.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🌍',
        name: item.label,
        status: item.status,
        tags: ['country'],
        description: item.status === 'available' ? 'Open the country hub.' : 'Future country hub candidate.'
      }, {
        className: item.path ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
        href: item.path ? countryUrl(locale, item.path) : null,
        disabled: !item.path
      }));
    });

    section.appendChild(grid);
    return section;
  }

  function createRelatedResources(country, locale) {
    if (!country.discovery || !country.discovery.relatedResources) return null;
    const res = country.discovery.relatedResources;
    const relCountries = country.discovery.relatedCountries || [];

    const hasIdentifiers = res.identifiers && res.identifiers.length > 0;
    const hasPayments = res.payments && res.payments.length > 0;
    const hasStandards = res.standards && res.standards.length > 0;
    const hasAuthorities = res.authorities && res.authorities.length > 0;
    const hasWorkbenches = res.workbenches && res.workbenches.length > 0;

    if (!hasIdentifiers && !hasPayments && !hasStandards && !hasAuthorities && !hasWorkbenches && relCountries.length === 0) {
      return null;
    }

    const section = createSection('Related resources', 'Graph-powered developer metadata & navigation', 'country-related-resources', 'This navigation index is compiled dynamically from the ValidoHub Knowledge Graph.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');

    if (hasIdentifiers) {
      res.identifiers.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🆔',
          name: item.name,
          status: 'available',
          tags: ['identifier'],
          description: item.description || 'Official country identifier.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasPayments) {
      res.payments.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '💳',
          name: item.name,
          status: 'available',
          tags: ['payment'],
          description: item.description || 'Supported payment system.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasStandards) {
      res.standards.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '📜',
          name: item.name,
          status: 'available',
          tags: ['standard'],
          description: item.description || 'Banking standard format.'
        }, {
          className: item.link ? 'country-info-card country-link-card' : 'country-info-card country-future-card',
          href: item.link ? countryUrl(locale, item.link) : null
        }));
      });
    }

    if (hasAuthorities) {
      res.authorities.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🏛',
          name: item.name,
          status: 'available',
          tags: ['authority'],
          description: item.description || 'Governing authority.'
        }, {
          className: 'country-info-card country-future-card',
          href: null
        }));
      });
    }

    if (hasWorkbenches) {
      res.workbenches.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🛠',
          name: item.name,
          status: 'available',
          tags: ['workbench'],
          description: item.description || 'Interactive validation tool.'
        }, {
          className: 'country-info-card country-link-card',
          href: countryUrl(locale, item.link)
        }));
      });
    }

    if (relCountries.length > 0) {
      relCountries.forEach(item => {
        grid.appendChild(createInfoCard({
          icon: '🌍',
          name: item.name,
          status: 'available',
          tags: item.via.slice(0, 2),
          description: `Shares standards: ${item.via.join(', ')}`
        }, {
          className: 'country-info-card country-link-card',
          href: countryUrl(locale, item.slug)
        }));
      });
    }

    section.appendChild(grid);
    return section;
  }

  function enhanceWorkbenchPage() {
    const isPeselPage = !!document.querySelector('form[data-algorithm-id="validohub.pesel"]');
    if (isPeselPage) {
      const card = document.querySelector('.related-resources-discovery');
      if (card) card.remove();
      return;
    }
    const parts = pathParts(window.location.pathname);
    if (parts.length !== 3 || !LOCALE_PATTERN.test(parts[0])) {
      return;
    }
    const countrySlug = parts[1];
    const workbenchSlug = parts[2];
    const key = `${countrySlug}-${workbenchSlug}`;

    const info = WORKBENCH_DISCOVERY[key] || WORKBENCH_DISCOVERY[workbenchSlug];
    if (!info) return;

    const stack = document.querySelector('.page-stack');
    if (!stack) return;

    if (workbenchSlug !== 'pesel-validator') {
      const card = createElement('article', 'content-card related-resources-discovery');
      const heading = createElement('div', 'section-heading');
      heading.appendChild(createElement('span', 'eyebrow', 'ValidoHub Knowledge Graph'));
      heading.appendChild(createElement('h2', null, 'Graph-Powered Discovery'));
      card.appendChild(heading);

      const desc = createElement('p', null, 'This metadata is verified against official source registries and updated by active audits.');
      desc.style.color = 'var(--muted)';
      desc.style.marginBottom = '20px';
      card.appendChild(desc);

      const ul = createElement('ul', 'country-highlight-list');
      ul.style.marginTop = '16px';

      if (info.validates && info.validates.length > 0) {
        const li = createElement('li');
        li.innerHTML = `<strong>Validates:</strong> ${info.validates.join(', ')}`;
        ul.appendChild(li);
      }
      if (info.standards && info.standards.length > 0) {
        const li = createElement('li');
        li.innerHTML = `<strong>Related Standards:</strong> ${info.standards.join(', ')}`;
        ul.appendChild(li);
      }
      if (info.authorities && info.authorities.length > 0) {
        const li = createElement('li');
        li.innerHTML = `<strong>Official Authorities:</strong> ${info.authorities.join(', ')}`;
        ul.appendChild(li);
      }
      if (info.countries && info.countries.length > 0) {
        const li = createElement('li');
        li.innerHTML = `<strong>Supported Countries:</strong> ${info.countries.join(', ')}`;
        ul.appendChild(li);
      }

      card.appendChild(ul);

      const wbCard = stack.querySelector('.workbench-card');
      if (wbCard && wbCard.nextSibling) {
        stack.insertBefore(card, wbCard.nextSibling);
      } else {
        stack.appendChild(card);
      }
    }

  }

  function createHighlights(country) {
    const section = createSection('Things developers should know', `${country.name} implementation highlights`, 'country-highlights');
    const list = createElement('ul', 'country-highlight-list');
    country.highlights.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createDeveloperNotes(country) {
    const section = createSection('Developer notes', `Practical ${country.name} implementation reminders`, 'country-developer-notes');
    const list = createElement('ul', 'country-note-list');
    country.developerNotes.forEach((note) => list.appendChild(createElement('li', null, note)));
    section.appendChild(list);
    return section;
  }

  function createDeveloperExamples(country) {
    const section = createSection('Developer API examples', `Copy-ready ${country.name} API and locale snippets`, 'country-developer-examples', 'Examples only. No runtime execution.');
    const grid = createElement('div', 'country-code-grid');
    country.developerExamples.forEach((item) => {
      const card = createElement('article', 'country-code-card');
      applyTags(card, ['developer', 'locale']);
      const top = createElement('div', 'country-card-top');
      const title = createElement('div', 'country-title-row');
      const brandMark = createBrandAsset(item.brandKey, { label: item.brandLabel });
      if (brandMark) {
        title.appendChild(brandMark);
      }
      title.appendChild(createElement('h3', null, item.title));
      top.append(
        title,
        createElement('span', 'country-card-meta', item.language)
      );
      const pre = createElement('pre', 'country-code-block');
      const code = createElement('code', null, item.code);
      pre.appendChild(code);
      const copy = createCopyButton(item.code, item.title);
      card.append(top, pre);
      if (copy) {
        card.appendChild(copy);
      }
      card.appendChild(createElement('p', null, item.note));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createJsonExamples(country) {
    const section = createSection('JSON examples', `${country.name} payload examples`, 'country-json-examples', 'Formatting examples only. These are not validation schemas.');
    const grid = createElement('div', 'country-code-grid');
    country.jsonExamples.forEach((item) => {
      const card = createElement('article', 'country-code-card');
      applyTags(card, ['developer', 'json']);
      const top = createElement('div', 'country-card-top');
      top.append(
        createElement('h3', null, item.title),
        createElement('span', 'country-card-meta', 'json')
      );
      const pre = createElement('pre', 'country-code-block');
      pre.appendChild(createElement('code', null, item.code));
      card.append(top, pre, createCopyButton(item.code, `${item.title} JSON example`));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function createLocalizationNotes(country) {
    const section = createSection('Localization notes', `${country.name} locale behavior`, 'country-localization-notes', 'Implementation reminders for text, sorting, calendar, and locale APIs.');
    const grid = createElement('div', 'country-card-grid country-card-grid-compact');
    country.localizationNotes.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '🌐',
        name: item.name,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card' }));
    });
    section.appendChild(grid);
    return section;
  }

  function createCountryEcosystem(country) {
    const section = createSection('Country ecosystem', `${country.name} developer relationships`, 'country-ecosystem', 'How identifiers, payments, banks, government, and addresses connect at a product-design level.');
    const grid = createElement('div', 'country-ecosystem-grid');
    country.ecosystem.forEach((item) => {
      grid.appendChild(createInfoCard({
        icon: '•',
        name: item.name,
        status: 'available',
        tags: item.tags,
        description: item.description
      }, { className: 'country-info-card country-ecosystem-card' }));
    });
    section.appendChild(grid);
    return section;
  }

  function createAdSlot(name) {
    const slot = createElement('aside', 'country-ad-slot country-ad-slot-disabled');
    slot.hidden = true;
    slot.setAttribute('aria-hidden', 'true');
    slot.dataset.adSlot = name;
    return slot;
  }

  function createCopyAnnouncer() {
    const announcer = createElement('div', 'country-copy-announcer');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('role', 'status');
    return announcer;
  }

  function copyText(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    return Promise.resolve();
  }

  function bindCopyControls(root) {
    const announcer = root.querySelector('.country-copy-announcer');
    root.addEventListener('click', (event) => {
      const button = event.target.closest('[data-copy-value]');
      if (!button || !root.contains(button)) {
        return;
      }
      const value = button.dataset.copyValue || '';
      if (!value) {
        return;
      }
      copyText(value)
        .then(() => {
          const original = button.textContent;
          button.textContent = 'Copied';
          if (announcer) {
            announcer.textContent = `Copied ${button.dataset.copyLabel || value}`;
          }
          window.setTimeout(() => {
            button.textContent = original;
          }, 1300);
        })
        .catch(() => {
          if (announcer) {
            announcer.textContent = 'Copy failed. Select the value manually.';
          }
        });
    });
  }

  function renderCountryHub(stack, locale, country) {
    if (!stack || stack.dataset.countryHubRendered === 'true') {
      return;
    }

    const availableLinks = collectAvailableWorkbenches(stack);
    const breadcrumbs = stack.querySelector('.breadcrumbs');
    Array.from(stack.children).forEach((child) => {
      if (child !== breadcrumbs) {
        child.remove();
      }
    });

    stack.classList.add('country-hub-page');

    const elementsToAppend = [];
    const appendSafely = (fn, ...args) => {
      try {
        const el = fn(...args);
        if (el) {
          elementsToAppend.push(el);
        }
      } catch (err) {
        console.error('Error rendering country hub component:', err);
      }
    };

    appendSafely(createHero, country);
    appendSafely(createQuickActions, country);
    appendSafely(createAdSlot, 'country-hub-after-hero');
    appendSafely(createCountryProfile, country);
    appendSafely(createCheatSheet, country);
    appendSafely(createLocalizationExamples, country);
    appendSafely(createAddressExample, country);
    appendSafely(createPhoneExamples, country);
    appendSafely(createLocalFormats, country);
    appendSafely(createIntegrationChecklist, country);
    appendSafely(createValidationRules, country);
    appendSafely(createCommonMistakes, country);
    appendSafely(createPayments, country);
    appendSafely(createBankingOverview, country);
    appendSafely(createOfficialResources, country);
    appendSafely(createAvailableWorkbenches, country, availableLinks);
    appendSafely(createPlannedWorkbenches, country);
    appendSafely(createRelatedGlobalTools, country, locale);
    appendSafely(createRelatedResources, country, locale);
    appendSafely(createDiscoveryLinks, country, locale);
    appendSafely(createHighlights, country);
    appendSafely(createDeveloperNotes, country);
    appendSafely(createDeveloperExamples, country);
    appendSafely(createJsonExamples, country);
    appendSafely(createLocalizationNotes, country);
    appendSafely(createCountryEcosystem, country);
    appendSafely(createAdSlot, 'country-hub-before-footer');
    appendSafely(createCopyAnnouncer);

    stack.append(...elementsToAppend);
    bindCopyControls(stack);
    stack.dataset.countryHubRendered = 'true';
  }

  function enhanceCountryHubPage() {
    const parts = pathParts(window.location.pathname);
    if (parts.length !== 2 || !LOCALE_PATTERN.test(parts[0])) {
      return;
    }

    const country = COUNTRY_HUBS[parts[1]];
    if (!country) {
      return;
    }

    renderCountryHub(document.querySelector('.page-stack'), parts[0], country);
  }

  function enhanceCountriesNavigation(nav) {
    if (!nav || nav.dataset.countriesEnhanced === 'true') {
      return;
    }

    const countryLinks = Array.from(nav.querySelectorAll('a')).filter(isCountryHubLink);
    if (countryLinks.length === 0) {
      return;
    }

    const menu = document.createElement('details');
    menu.className = 'countries-menu';
    menu.dataset.countryCount = String(countryLinks.length);

    const summary = document.createElement('summary');
    summary.textContent = 'Countries';
    summary.setAttribute('aria-label', 'Browse country tools');

    if (countryLinks.some(isCurrentLink)) {
      summary.classList.add('is-active');
    }

    const panel = document.createElement('div');
    panel.className = 'countries-menu-panel';
    panel.setAttribute('role', 'list');

    const locale = pathParts(window.location.pathname)[0] || 'en';
    if (LOCALE_PATTERN.test(locale)) {
      const portalLink = document.createElement('a');
      portalLink.href = `/${locale}/countries/`;
      portalLink.textContent = 'All Countries';
      portalLink.setAttribute('role', 'listitem');
      portalLink.classList.toggle('is-active', pathParts(window.location.pathname).join('/') === `${locale}/countries`);
      panel.appendChild(portalLink);
    }

    countryLinks
      .map((link) => {
        const cloned = link.cloneNode(true);
        cloned.classList.toggle('is-active', isCurrentLink(cloned));
        cloned.setAttribute('role', 'listitem');
        return { original: link, cloned };
      })
      .sort((left, right) => left.cloned.textContent.trim().localeCompare(right.cloned.textContent.trim()))
      .forEach(({ original, cloned }) => {
        panel.appendChild(cloned);
        original.remove();
      });

    menu.append(summary, panel);

    const homeLink = Array.from(nav.querySelectorAll('a')).find((link) => {
      const parts = pathParts(link.getAttribute('href') || '');
      return parts.length === 1 && LOCALE_PATTERN.test(parts[0]);
    });

    if (homeLink && homeLink.nextSibling) {
      nav.insertBefore(menu, homeLink.nextSibling);
    } else {
      nav.appendChild(menu);
    }

    nav.dataset.countriesEnhanced = 'true';

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target)) {
        menu.removeAttribute('open');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        menu.removeAttribute('open');
        summary.focus();
      }
    });
  }

  function initCountriesPlatform() {
    document.querySelectorAll('.primary-nav').forEach(enhanceCountriesNavigation);
    enhanceCountryHubPage();
    enhanceWorkbenchPage();

    if (window.location.pathname.indexOf('/pesel-validator/') !== -1) {
      const script = document.createElement('script');
      script.src = '/assets/js/tools/pesel.js';
      document.body.appendChild(script);
    }
  }

  window.ValidoHubCountries = Object.freeze({
    hubs: COUNTRY_HUBS,
    portalCatalog: COUNTRY_PORTAL_CATALOG,
    statusLabels: STATUS_LABELS,
    reservedTopLevel: RESERVED_TOP_LEVEL,
    localePattern: LOCALE_PATTERN,
    createBrandAsset,
    createElement,
    pathParts,
    statusLabel,
    statusClass,
    countryUrl
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountriesPlatform);
  } else {
    initCountriesPlatform();
  }
}());
