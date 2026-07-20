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
    "france": {
      "outlineSrc": "/assets/images/countries/france-outline.svg",
      "outlineAlt": "France country outline",
      "mapSrc": "/assets/images/countries/france-location.svg",
      "mapAlt": "World map with France location marker",
      "mapMarker": {
        "x": 48,
        "y": 38,
        "label": "France"
      },
      "source": "Simplified public-domain geographic reference"
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
    "netherlands": {
      "outlineSrc": "/assets/images/countries/netherlands-outline.svg",
      "outlineAlt": "Netherlands country outline",
      "mapSrc": "/assets/images/countries/netherlands-location.svg",
      "mapAlt": "World map with Netherlands location marker",
      "mapMarker": {
        "x": 49,
        "y": 35,
        "label": "Netherlands"
      },
      "source": "Simplified public-domain geographic reference"
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
    },
    "switzerland": {
      "outlineSrc": "/assets/images/countries/switzerland-outline.svg",
      "outlineAlt": "Switzerland country outline",
      "mapSrc": "/assets/images/countries/switzerland-location.svg",
      "mapAlt": "World map with Switzerland location marker",
      "mapMarker": {
        "x": 50,
        "y": 36,
        "label": "Switzerland"
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
    "france": {
      "flag": "🇫🇷",
      "name": "France",
      "badge": "Western Europe premium country hub",
      "description": "Developer intelligence for French company, tax, banking, address, identity-boundary, payment, vehicle, privacy, and localization workflows with browser-only validation where possible.",
      "metadata": {
        "nativeName": "France",
        "population": "approximately 68M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "643,801 km²",
        "capital": "Paris",
        "largestCity": "Paris",
        "continent": "Europe",
        "region": "Western Europe / European Union",
        "languages": "French",
        "currency": "Euro",
        "currencyCode": "EUR",
        "currencySymbol": "€",
        "callingCode": "+33",
        "internetTld": ".fr",
        "drivingSide": "Right",
        "iso2": "FR",
        "iso3": "FRA",
        "isoNumeric": "250",
        "locale": "fr-FR",
        "icuLocale": "fr_FR",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space ( ) or narrow no-break space",
        "addressFormat": "Recipient, street number and name, postcode locality, France",
        "postalCodeFormat": "NNNNN",
        "primaryTimeZone": "Europe/Paris (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type E",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "fr-FR",
        "cldrLocale": "fr_FR",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "france",
        "outlineLabel": "France outline",
        "mapLabel": "France in the world",
        "continentBadge": "Europe",
        "flagLabel": "France flag",
        "heroAccentPrimary": "0 85 164",
        "heroAccentSecondary": "255 255 255",
        "heroAccentTertiary": "239 65 53"
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
          "tags": [
            "payments"
          ]
        },
        {
          "icon": "☎️",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "phone"
          ]
        }
      ],
      "sections": [
        {
          "title": "Identifier stack",
          "description": "France combines SIREN company identifiers, SIRET establishment identifiers, TVA tax identifiers, INSEE commune codes, and privacy-sensitive NIR values.",
          "cards": [
            {
              "icon": "🏢",
              "name": "SIREN",
              "status": "available",
              "tags": [
                "business",
                "checksum"
              ],
              "description": "Nine-digit company identifier with local Luhn check evidence."
            },
            {
              "icon": "🏬",
              "name": "SIRET",
              "status": "available",
              "tags": [
                "establishment",
                "checksum"
              ],
              "description": "Fourteen-digit establishment identifier: SIREN plus NIC."
            },
            {
              "icon": "🧾",
              "name": "TVA intracommunautaire",
              "status": "available",
              "tags": [
                "tax",
                "eu"
              ],
              "description": "FR plus a two-character key and SIREN; local key derivation can be checked before VIES."
            },
            {
              "icon": "🪪",
              "name": "NIR",
              "status": "available",
              "tags": [
                "identity",
                "privacy"
              ],
              "description": "Sensitive personal identifier; ValidoHub provides syntax/key and masking helpers, not identity proof."
            }
          ]
        },
        {
          "title": "Banking and payment stack",
          "description": "French banking data is built around RIB fields, IBAN conversion, BIC routing, and SEPA remittance conventions.",
          "cards": [
            {
              "brandKey": "iban",
              "name": "French IBAN",
              "status": "available",
              "tags": [
                "banking",
                "mod97"
              ],
              "description": "27-character IBAN beginning with FR, with embedded RIB structure."
            },
            {
              "icon": "🏦",
              "name": "RIB",
              "status": "available",
              "tags": [
                "banking"
              ],
              "description": "Bank code, branch code, 11-character account number, and two-digit RIB key."
            },
            {
              "brandKey": "sepa",
              "name": "SEPA",
              "status": "available",
              "tags": [
                "payments",
                "eu"
              ],
              "description": "Transfer, direct debit mandate, RUM, and remittance helpers for French payments."
            },
            {
              "icon": "🔎",
              "name": "Reconciliation",
              "status": "available",
              "tags": [
                "payments",
                "data-quality"
              ],
              "description": "Local parsers for amounts, dates, references, masked IBANs, and duplicate-risk notes."
            }
          ]
        },
        {
          "title": "Localization and data quality",
          "description": "French forms need careful treatment of accents, comma decimals, DD/MM/YYYY dates, CEDEX addresses, phone ranges, and privacy-safe logs.",
          "cards": [
            {
              "icon": "📍",
              "name": "Address and postal",
              "status": "available",
              "tags": [
                "postal",
                "address"
              ],
              "description": "Postal code, department, commune, region, CEDEX, and address normalization tools."
            },
            {
              "icon": "☎️",
              "name": "Phone numbers",
              "status": "available",
              "tags": [
                "phone"
              ],
              "description": "National 0X spacing, +33 E.164 conversion, range classification, and masking."
            },
            {
              "icon": "€",
              "name": "EUR formatting",
              "status": "available",
              "tags": [
                "localization",
                "currency"
              ],
              "description": "Comma decimals, space thousands, API-safe numeric parsing, and display formatting."
            },
            {
              "icon": "🛡️",
              "name": "Privacy boundary",
              "status": "available",
              "tags": [
                "privacy"
              ],
              "description": "GDPR, PII masking, NIR masking, vehicle redaction, and fixture generation."
            }
          ]
        }
      ],
      "toolGroups": [
        {
          "icon": "🏢",
          "title": "Business identity",
          "description": "Company, establishment, registry, customs, and onboarding identifiers.",
          "items": [
            {
              "label": "SIREN Validator & Explainer",
              "status": "available",
              "tags": [
                "national-identifiers",
                "business"
              ],
              "description": "Validate French SIREN company identifiers, replay the Luhn check digit, and produce registry-safe diagnostics."
            },
            {
              "label": "SIRET Validator & Explainer",
              "status": "available",
              "tags": [
                "national-identifiers",
                "business"
              ],
              "description": "Validate French SIRET establishment identifiers, split SIREN and NIC, and verify local checksum evidence."
            },
            {
              "label": "NIC Establishment Code Inspector",
              "status": "available",
              "tags": [
                "national-identifiers",
                "business"
              ],
              "description": "Inspect the five-digit NIC establishment suffix used inside French SIRET numbers."
            },
            {
              "label": "APE / NAF Code Inspector",
              "status": "available",
              "tags": [
                "business",
                "business"
              ],
              "description": "Inspect French APE/NAF activity codes, normalize punctuation, and prepare Sirene enrichment fields."
            },
            {
              "label": "RCS Number Helper",
              "status": "available",
              "tags": [
                "business",
                "business"
              ],
              "description": "Normalize RCS registration text, extract registry city and SIREN evidence, and prepare onboarding notes."
            },
            {
              "label": "Répertoire des Métiers Helper",
              "status": "available",
              "tags": [
                "business",
                "business"
              ],
              "description": "Normalize RM craft registration references and extract SIREN-ready identifier evidence."
            },
            {
              "label": "Company Onboarding Auditor",
              "status": "available",
              "tags": [
                "business",
                "business"
              ],
              "description": "Audit French company onboarding snippets for SIREN, SIRET, TVA, address, and payment readiness."
            },
            {
              "label": "Sirene Lookup Readiness Helper",
              "status": "available",
              "tags": [
                "government",
                "business"
              ],
              "description": "Prepare SIRENE API lookup payloads with normalized SIREN/SIRET values and offline validation notes."
            }
          ]
        },
        {
          "icon": "🏦",
          "title": "Banking and RIB",
          "description": "IBAN, RIB, BIC, bank-code, and statement parsing workflows.",
          "items": [
            {
              "label": "French IBAN Validator",
              "status": "available",
              "tags": [
                "banking",
                "banking"
              ],
              "description": "Validate French IBANs, split RIB segments, run MOD-97, and expose bank, branch, account, and key fields."
            },
            {
              "label": "RIB Validator & Explainer",
              "status": "available",
              "tags": [
                "banking",
                "banking"
              ],
              "description": "Validate French RIB components, inspect bank code, branch code, account number, and RIB key evidence."
            },
            {
              "label": "French Bank Code Inspector",
              "status": "available",
              "tags": [
                "banking",
                "banking"
              ],
              "description": "Inspect five-digit French bank and branch code pairs used in RIB and IBAN payloads."
            },
            {
              "label": "French BIC / SWIFT Inspector",
              "status": "available",
              "tags": [
                "banking",
                "banking"
              ],
              "description": "Validate French BIC/SWIFT syntax and distinguish 8-character institution codes from 11-character branch codes."
            },
            {
              "label": "Masked IBAN Formatter",
              "status": "available",
              "tags": [
                "privacy",
                "banking"
              ],
              "description": "Mask French IBANs and RIB strings for logs, screenshots, support tickets, and audit evidence."
            },
            {
              "label": "Bank Statement Parser",
              "status": "available",
              "tags": [
                "data-quality",
                "banking"
              ],
              "description": "Extract dates, amounts, references, IBAN-like strings, and reconciliation hints from French bank statement text."
            }
          ]
        },
        {
          "icon": "💶",
          "title": "SEPA payments",
          "description": "Transfer, mandate, remittance, and reconciliation helpers.",
          "items": [
            {
              "label": "SEPA Transfer Helper",
              "status": "available",
              "tags": [
                "payments",
                "payments"
              ],
              "description": "Build SEPA transfer-ready field bundles from French IBAN, BIC, amount, creditor, and remittance input."
            },
            {
              "label": "SEPA Direct Debit RUM Helper",
              "status": "available",
              "tags": [
                "payments",
                "payments"
              ],
              "description": "Normalize French SEPA mandate references and inspect length, character set, and logging-safe masked values."
            },
            {
              "label": "French Remittance Text Builder",
              "status": "available",
              "tags": [
                "payments",
                "payments"
              ],
              "description": "Clean French remittance text for bank transfers, invoices, and reconciliation-safe references."
            },
            {
              "label": "Payment Reconciliation Helper",
              "status": "available",
              "tags": [
                "data-quality",
                "payments"
              ],
              "description": "Audit French payment records for IBAN, amount, invoice reference, date, and duplicate-risk evidence."
            }
          ]
        },
        {
          "icon": "📍",
          "title": "Address and locale",
          "description": "Postal, commune, department, region, CEDEX, address, and date conventions.",
          "items": [
            {
              "label": "French Postal Code Validator",
              "status": "available",
              "tags": [
                "postal",
                "address"
              ],
              "description": "Validate French postal codes, infer department prefixes, and flag overseas postal ranges."
            },
            {
              "label": "INSEE Commune Code Inspector",
              "status": "available",
              "tags": [
                "government",
                "address"
              ],
              "description": "Inspect five-character INSEE commune codes, department prefixes, Corsica notation, and overseas boundaries."
            },
            {
              "label": "Department Code Inspector",
              "status": "available",
              "tags": [
                "government",
                "address"
              ],
              "description": "Validate French department codes including Corsica and overseas department prefixes."
            },
            {
              "label": "Region Code Mapper",
              "status": "available",
              "tags": [
                "government",
                "address"
              ],
              "description": "Map French department evidence to practical region labels for forms, analytics, and QA notes."
            },
            {
              "label": "CEDEX Address Formatter",
              "status": "available",
              "tags": [
                "postal",
                "address"
              ],
              "description": "Format French business and CEDEX address blocks with postcode, locality, country, and line-order checks."
            },
            {
              "label": "French Address Normalizer",
              "status": "available",
              "tags": [
                "postal",
                "address"
              ],
              "description": "Normalize French address casing, spacing, postal code placement, and country-line output."
            },
            {
              "label": "Address Transliteration Normalizer",
              "status": "available",
              "tags": [
                "localization",
                "address"
              ],
              "description": "Produce ASCII-safe address variants while preserving the original French address for display."
            }
          ]
        },
        {
          "icon": "☎️",
          "title": "Phone numbers",
          "description": "French national and E.164 phone validation and formatting.",
          "items": [
            {
              "label": "French Phone Number Validator",
              "status": "available",
              "tags": [
                "phone",
                "phone"
              ],
              "description": "Validate French national and +33 phone numbers, classify ranges, and normalize spacing."
            },
            {
              "label": "French Phone E.164 Formatter",
              "status": "available",
              "tags": [
                "phone",
                "phone"
              ],
              "description": "Convert French phone numbers to E.164, national display spacing, and masked support-safe output."
            }
          ]
        },
        {
          "icon": "🧾",
          "title": "Tax and invoicing",
          "description": "TVA, invoices, e-invoicing, PDP/PPF, FEC, and audit evidence.",
          "items": [
            {
              "label": "French VAT / TVA Validator",
              "status": "available",
              "tags": [
                "tax",
                "tax"
              ],
              "description": "Validate French VAT syntax, derive the TVA key from SIREN, and prepare VIES-ready payloads."
            },
            {
              "label": "VAT Rate Sanity Helper",
              "status": "available",
              "tags": [
                "tax",
                "tax"
              ],
              "description": "Check French VAT rate values for common standard, reduced, super-reduced, and zero-rate scenarios."
            },
            {
              "label": "French Invoice Number Helper",
              "status": "available",
              "tags": [
                "commerce",
                "tax"
              ],
              "description": "Inspect French invoice numbering strings for chronology hints, uniqueness fields, and export-safe normalized values."
            },
            {
              "label": "E-Invoicing Readiness Helper",
              "status": "available",
              "tags": [
                "commerce",
                "tax"
              ],
              "description": "Audit French e-invoicing readiness fields: SIRET, TVA, buyer references, totals, and PDF/data boundaries."
            },
            {
              "label": "PDP / PPF Readiness Helper",
              "status": "available",
              "tags": [
                "commerce",
                "tax"
              ],
              "description": "Prepare French e-invoicing exchange payload readiness notes for PDP/PPF style integrations."
            },
            {
              "label": "FEC File Readiness Checker",
              "status": "available",
              "tags": [
                "data-quality",
                "tax"
              ],
              "description": "Inspect French FEC accounting export snippets for separators, dates, account codes, debit/credit, and encoding risks."
            },
            {
              "label": "Audit Trail Checklist Generator",
              "status": "available",
              "tags": [
                "compliance",
                "tax"
              ],
              "description": "Generate a French audit-trail checklist from invoice, payment, accounting, and customer evidence snippets."
            }
          ]
        },
        {
          "icon": "🛡️",
          "title": "Privacy and redaction",
          "description": "GDPR and PII masking for French data.",
          "items": [
            {
              "label": "GDPR Redaction Helper",
              "status": "available",
              "tags": [
                "privacy",
                "privacy"
              ],
              "description": "Find and mask French personal data candidates before logs, screenshots, exports, or support handoffs."
            },
            {
              "label": "French PII Masker",
              "status": "available",
              "tags": [
                "privacy",
                "privacy"
              ],
              "description": "Mask French identifiers, phone numbers, emails, IBANs, postal addresses, and person names in pasted text."
            }
          ]
        },
        {
          "icon": "🧹",
          "title": "Data quality",
          "description": "OCR, statement, and record-quality repair workbenches.",
          "items": [
            {
              "label": "France Data Quality Workbench",
              "status": "available",
              "tags": [
                "data-quality",
                "data"
              ],
              "description": "Audit French records for identifiers, payments, addresses, phone numbers, dates, and localization consistency."
            },
            {
              "label": "French Document OCR Fixer",
              "status": "available",
              "tags": [
                "data-quality",
                "data"
              ],
              "description": "Repair common OCR artifacts in French identifiers, invoices, addresses, and official document snippets."
            }
          ]
        },
        {
          "icon": "✅",
          "title": "Compliance",
          "description": "Implementation checklists and audit readiness.",
          "items": [
            {
              "label": "Compliance Checklist Generator",
              "status": "available",
              "tags": [
                "compliance",
                "compliance"
              ],
              "description": "Generate implementation checklists for French identifier, payment, tax, privacy, and localization workflows."
            }
          ]
        },
        {
          "icon": "🪪",
          "title": "Identity boundaries",
          "description": "NIR, personal documents, birth consistency, and fixture safety.",
          "items": [
            {
              "label": "NIR Syntax Inspector",
              "status": "available",
              "tags": [
                "identity",
                "identity"
              ],
              "description": "Inspect French NIR social security number structure, field groups, and offline boundary notes."
            },
            {
              "label": "NIR Key Validator",
              "status": "available",
              "tags": [
                "identity",
                "identity"
              ],
              "description": "Validate the two-digit NIR control key for numeric French social security identifiers."
            },
            {
              "label": "NIR Masker",
              "status": "available",
              "tags": [
                "privacy",
                "identity"
              ],
              "description": "Mask French NIR strings while preserving low-risk field evidence for debugging and QA."
            },
            {
              "label": "French Passport Number Helper",
              "status": "available",
              "tags": [
                "identity",
                "identity"
              ],
              "description": "Inspect French passport-like strings for safe fixture shape, length, and logging boundaries."
            },
            {
              "label": "French ID Card Format Helper",
              "status": "available",
              "tags": [
                "identity",
                "identity"
              ],
              "description": "Inspect French ID card-like values for shape, casing, and privacy-safe fixture handling."
            },
            {
              "label": "Birth Data Consistency Helper",
              "status": "available",
              "tags": [
                "identity",
                "identity"
              ],
              "description": "Check whether French date, department, commune, and NIR-like fields agree at syntax level."
            },
            {
              "label": "Health Insurance Boundary Helper",
              "status": "available",
              "tags": [
                "privacy",
                "identity"
              ],
              "description": "Explain offline boundaries for French health insurance identifiers and build safe test-data notes."
            },
            {
              "label": "Personal Data Fixture Generator",
              "status": "available",
              "tags": [
                "privacy",
                "identity"
              ],
              "description": "Generate privacy-safe French person fixtures with fake names, addresses, phones, and masked identifiers."
            }
          ]
        },
        {
          "icon": "🚗",
          "title": "Vehicle workflows",
          "description": "Plates, VIN, Crit’Air, carte grise, and vehicle data masking.",
          "items": [
            {
              "label": "French License Plate Inspector",
              "status": "available",
              "tags": [
                "vehicle",
                "vehicle"
              ],
              "description": "Validate French SIV plate syntax, normalize separators, and identify legacy plate boundaries."
            },
            {
              "label": "VIN Validator for France Workflows",
              "status": "available",
              "tags": [
                "vehicle",
                "vehicle"
              ],
              "description": "Validate VIN syntax and checksum for French registration and fleet data workflows."
            },
            {
              "label": "Crit'Air Readiness Helper",
              "status": "available",
              "tags": [
                "vehicle",
                "vehicle"
              ],
              "description": "Audit vehicle data snippets for Crit'Air certificate workflow readiness and offline boundary notes."
            },
            {
              "label": "Carte Grise Field Helper",
              "status": "available",
              "tags": [
                "vehicle",
                "vehicle"
              ],
              "description": "Inspect French registration certificate field snippets and map labels to developer-friendly keys."
            },
            {
              "label": "Driving Licence Format Helper",
              "status": "available",
              "tags": [
                "identity",
                "vehicle"
              ],
              "description": "Inspect French driving licence-like numbers for shape, masking, and data-entry QA boundaries."
            },
            {
              "label": "Vehicle Data Redaction Helper",
              "status": "available",
              "tags": [
                "privacy",
                "vehicle"
              ],
              "description": "Mask French vehicle identifiers, VINs, registration plates, owner names, and support-ticket snippets."
            },
            {
              "label": "Municipality / Department Plate Helper",
              "status": "available",
              "tags": [
                "government",
                "vehicle"
              ],
              "description": "Connect department, commune, postal, and plate snippets for QA without implying official lookup."
            }
          ]
        },
        {
          "icon": "⌘",
          "title": "Developer utilities",
          "description": "CSV, JSON, regex, API payload, form, slug, and accent normalization.",
          "items": [
            {
              "label": "French CSV Locale Normalizer",
              "status": "available",
              "tags": [
                "localization",
                "developer"
              ],
              "description": "Normalize French CSV snippets with semicolons, comma decimals, dates, and UTF-8 accents for imports."
            },
            {
              "label": "EUR Decimal / Currency Formatter",
              "status": "available",
              "tags": [
                "localization",
                "developer"
              ],
              "description": "Format French EUR amounts, parse comma decimals, and produce API-safe numeric values."
            },
            {
              "label": "French Accent Normalizer",
              "status": "available",
              "tags": [
                "localization",
                "developer"
              ],
              "description": "Normalize French accented text for search keys, ASCII fallbacks, slugs, and original-display preservation."
            },
            {
              "label": "French Slug Normalizer",
              "status": "available",
              "tags": [
                "developer",
                "developer"
              ],
              "description": "Create URL-safe French slugs while preserving accents in display text and explaining normalization choices."
            },
            {
              "label": "French JSON Fixture Generator",
              "status": "available",
              "tags": [
                "developer",
                "developer"
              ],
              "description": "Generate France-ready JSON fixtures containing identifiers, address, phone, payment, and privacy-safe sample values."
            },
            {
              "label": "French Regex Pack Helper",
              "status": "available",
              "tags": [
                "developer",
                "developer"
              ],
              "description": "Generate and explain regex snippets for French identifiers, phones, postal codes, plates, and locale fields."
            },
            {
              "label": "French API Payload Auditor",
              "status": "available",
              "tags": [
                "data-quality",
                "developer"
              ],
              "description": "Audit JSON or form payloads for French field names, identifiers, payments, locale, and privacy-safe logging."
            },
            {
              "label": "French Form Field Auditor",
              "status": "available",
              "tags": [
                "data-quality",
                "developer"
              ],
              "description": "Review French form-field labels, placeholders, masks, validation hints, and accessibility-safe data-entry flows."
            }
          ]
        },
        {
          "icon": "🛃",
          "title": "Customs",
          "description": "EORI and cross-border identifier readiness.",
          "items": [
            {
              "label": "French EORI Validator",
              "status": "available",
              "tags": [
                "customs",
                "customs"
              ],
              "description": "Validate French EORI identifiers, extract embedded SIRET data, and mark customs lookup boundaries."
            }
          ]
        }
      ],
      "officialResources": [
        {
          "icon": "🏛",
          "name": "INSEE Sirene / SIREN / SIRET",
          "status": "reference",
          "tags": [
            "business",
            "government"
          ],
          "description": "Authoritative reference for French business and establishment identifiers."
        },
        {
          "icon": "💶",
          "name": "impots.gouv.fr VAT and tax identifiers",
          "status": "reference",
          "tags": [
            "tax",
            "business"
          ],
          "description": "Official tax identifier context for SIREN, SIRET, TVA, APE, and EORI usage."
        },
        {
          "brandKey": "iban",
          "name": "Banque de France RIB / IBAN / BIC",
          "status": "reference",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Official French banking reference for RIB, IBAN, and BIC fields."
        },
        {
          "brandKey": "europeanUnion",
          "name": "European Commission VIES",
          "status": "reference",
          "tags": [
            "vat",
            "eu"
          ],
          "description": "EU VAT lookup boundary for French TVA numbers after local syntax checks."
        },
        {
          "icon": "🪪",
          "name": "Service-Public NIR guidance",
          "status": "reference",
          "tags": [
            "identity",
            "privacy"
          ],
          "description": "Public guidance for French social security number structure and usage boundaries."
        },
        {
          "icon": "✉️",
          "name": "La Poste address and postal conventions",
          "status": "reference",
          "tags": [
            "postal",
            "address"
          ],
          "description": "Postal addressing, CEDEX, delivery, and normalization conventions."
        }
      ],
      "relatedGlobalTools": [
        {
          "brandKey": "iban",
          "label": "Global IBAN Validator",
          "path": "/tools/iban-validator/",
          "tags": [
            "banking",
            "global"
          ]
        },
        {
          "icon": "{}",
          "label": "JSON Validator",
          "path": "/tools/json-validator/",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "🔐",
          "label": "JWT Decoder",
          "path": "/tools/jwt-decoder/",
          "tags": [
            "developer"
          ]
        },
        {
          "icon": "Aa",
          "label": "Case Converter",
          "path": "/tools/case-converter/",
          "tags": [
            "developer"
          ]
        }
      ],
      "relatedCategories": [
        {
          "label": "Banking tools",
          "path": "/categories/banking/",
          "tags": [
            "payments"
          ]
        },
        {
          "label": "Tax tools",
          "path": "/categories/tax/",
          "tags": [
            "tax"
          ]
        },
        {
          "label": "National identifiers",
          "path": "/categories/national-identifiers/",
          "tags": [
            "identity"
          ]
        }
      ],
      "futureCountryPages": [
        {
          "label": "Germany",
          "status": "available",
          "tags": [
            "country"
          ]
        },
        {
          "label": "Spain",
          "status": "available",
          "tags": [
            "country"
          ]
        },
        {
          "label": "Poland",
          "status": "available",
          "tags": [
            "country"
          ]
        },
        {
          "label": "Italy",
          "status": "planned",
          "tags": [
            "country"
          ]
        }
      ],
      "plannedWorkbenches": [],
      "availableWorkbenches": {
        "SIREN Validator & Explainer": {
          "status": "available",
          "tags": [
            "national-identifiers",
            "business"
          ],
          "description": "Validate French SIREN company identifiers, replay the Luhn check digit, and produce registry-safe diagnostics."
        },
        "SIRET Validator & Explainer": {
          "status": "available",
          "tags": [
            "national-identifiers",
            "business"
          ],
          "description": "Validate French SIRET establishment identifiers, split SIREN and NIC, and verify local checksum evidence."
        },
        "NIC Establishment Code Inspector": {
          "status": "available",
          "tags": [
            "national-identifiers",
            "business"
          ],
          "description": "Inspect the five-digit NIC establishment suffix used inside French SIRET numbers."
        },
        "French VAT / TVA Validator": {
          "status": "available",
          "tags": [
            "tax",
            "tax"
          ],
          "description": "Validate French VAT syntax, derive the TVA key from SIREN, and prepare VIES-ready payloads."
        },
        "French EORI Validator": {
          "status": "available",
          "tags": [
            "customs",
            "customs"
          ],
          "description": "Validate French EORI identifiers, extract embedded SIRET data, and mark customs lookup boundaries."
        },
        "APE / NAF Code Inspector": {
          "status": "available",
          "tags": [
            "business",
            "business"
          ],
          "description": "Inspect French APE/NAF activity codes, normalize punctuation, and prepare Sirene enrichment fields."
        },
        "RCS Number Helper": {
          "status": "available",
          "tags": [
            "business",
            "business"
          ],
          "description": "Normalize RCS registration text, extract registry city and SIREN evidence, and prepare onboarding notes."
        },
        "Répertoire des Métiers Helper": {
          "status": "available",
          "tags": [
            "business",
            "business"
          ],
          "description": "Normalize RM craft registration references and extract SIREN-ready identifier evidence."
        },
        "Company Onboarding Auditor": {
          "status": "available",
          "tags": [
            "business",
            "business"
          ],
          "description": "Audit French company onboarding snippets for SIREN, SIRET, TVA, address, and payment readiness."
        },
        "Sirene Lookup Readiness Helper": {
          "status": "available",
          "tags": [
            "government",
            "business"
          ],
          "description": "Prepare SIRENE API lookup payloads with normalized SIREN/SIRET values and offline validation notes."
        },
        "French IBAN Validator": {
          "status": "available",
          "tags": [
            "banking",
            "banking"
          ],
          "description": "Validate French IBANs, split RIB segments, run MOD-97, and expose bank, branch, account, and key fields."
        },
        "RIB Validator & Explainer": {
          "status": "available",
          "tags": [
            "banking",
            "banking"
          ],
          "description": "Validate French RIB components, inspect bank code, branch code, account number, and RIB key evidence."
        },
        "French Bank Code Inspector": {
          "status": "available",
          "tags": [
            "banking",
            "banking"
          ],
          "description": "Inspect five-digit French bank and branch code pairs used in RIB and IBAN payloads."
        },
        "French BIC / SWIFT Inspector": {
          "status": "available",
          "tags": [
            "banking",
            "banking"
          ],
          "description": "Validate French BIC/SWIFT syntax and distinguish 8-character institution codes from 11-character branch codes."
        },
        "SEPA Transfer Helper": {
          "status": "available",
          "tags": [
            "payments",
            "payments"
          ],
          "description": "Build SEPA transfer-ready field bundles from French IBAN, BIC, amount, creditor, and remittance input."
        },
        "SEPA Direct Debit RUM Helper": {
          "status": "available",
          "tags": [
            "payments",
            "payments"
          ],
          "description": "Normalize French SEPA mandate references and inspect length, character set, and logging-safe masked values."
        },
        "French Remittance Text Builder": {
          "status": "available",
          "tags": [
            "payments",
            "payments"
          ],
          "description": "Clean French remittance text for bank transfers, invoices, and reconciliation-safe references."
        },
        "Masked IBAN Formatter": {
          "status": "available",
          "tags": [
            "privacy",
            "banking"
          ],
          "description": "Mask French IBANs and RIB strings for logs, screenshots, support tickets, and audit evidence."
        },
        "Bank Statement Parser": {
          "status": "available",
          "tags": [
            "data-quality",
            "banking"
          ],
          "description": "Extract dates, amounts, references, IBAN-like strings, and reconciliation hints from French bank statement text."
        },
        "Payment Reconciliation Helper": {
          "status": "available",
          "tags": [
            "data-quality",
            "payments"
          ],
          "description": "Audit French payment records for IBAN, amount, invoice reference, date, and duplicate-risk evidence."
        },
        "French Postal Code Validator": {
          "status": "available",
          "tags": [
            "postal",
            "address"
          ],
          "description": "Validate French postal codes, infer department prefixes, and flag overseas postal ranges."
        },
        "INSEE Commune Code Inspector": {
          "status": "available",
          "tags": [
            "government",
            "address"
          ],
          "description": "Inspect five-character INSEE commune codes, department prefixes, Corsica notation, and overseas boundaries."
        },
        "Department Code Inspector": {
          "status": "available",
          "tags": [
            "government",
            "address"
          ],
          "description": "Validate French department codes including Corsica and overseas department prefixes."
        },
        "Region Code Mapper": {
          "status": "available",
          "tags": [
            "government",
            "address"
          ],
          "description": "Map French department evidence to practical region labels for forms, analytics, and QA notes."
        },
        "CEDEX Address Formatter": {
          "status": "available",
          "tags": [
            "postal",
            "address"
          ],
          "description": "Format French business and CEDEX address blocks with postcode, locality, country, and line-order checks."
        },
        "French Address Normalizer": {
          "status": "available",
          "tags": [
            "postal",
            "address"
          ],
          "description": "Normalize French address casing, spacing, postal code placement, and country-line output."
        },
        "Address Transliteration Normalizer": {
          "status": "available",
          "tags": [
            "localization",
            "address"
          ],
          "description": "Produce ASCII-safe address variants while preserving the original French address for display."
        },
        "French Phone Number Validator": {
          "status": "available",
          "tags": [
            "phone",
            "phone"
          ],
          "description": "Validate French national and +33 phone numbers, classify ranges, and normalize spacing."
        },
        "French Phone E.164 Formatter": {
          "status": "available",
          "tags": [
            "phone",
            "phone"
          ],
          "description": "Convert French phone numbers to E.164, national display spacing, and masked support-safe output."
        },
        "French Date / Locale Formatter": {
          "status": "available",
          "tags": [
            "localization",
            "localization"
          ],
          "description": "Parse French date strings, produce ISO dates, and show locale display variants for forms and APIs."
        },
        "VAT Rate Sanity Helper": {
          "status": "available",
          "tags": [
            "tax",
            "tax"
          ],
          "description": "Check French VAT rate values for common standard, reduced, super-reduced, and zero-rate scenarios."
        },
        "French Invoice Number Helper": {
          "status": "available",
          "tags": [
            "commerce",
            "tax"
          ],
          "description": "Inspect French invoice numbering strings for chronology hints, uniqueness fields, and export-safe normalized values."
        },
        "E-Invoicing Readiness Helper": {
          "status": "available",
          "tags": [
            "commerce",
            "tax"
          ],
          "description": "Audit French e-invoicing readiness fields: SIRET, TVA, buyer references, totals, and PDF/data boundaries."
        },
        "PDP / PPF Readiness Helper": {
          "status": "available",
          "tags": [
            "commerce",
            "tax"
          ],
          "description": "Prepare French e-invoicing exchange payload readiness notes for PDP/PPF style integrations."
        },
        "FEC File Readiness Checker": {
          "status": "available",
          "tags": [
            "data-quality",
            "tax"
          ],
          "description": "Inspect French FEC accounting export snippets for separators, dates, account codes, debit/credit, and encoding risks."
        },
        "Audit Trail Checklist Generator": {
          "status": "available",
          "tags": [
            "compliance",
            "tax"
          ],
          "description": "Generate a French audit-trail checklist from invoice, payment, accounting, and customer evidence snippets."
        },
        "GDPR Redaction Helper": {
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Find and mask French personal data candidates before logs, screenshots, exports, or support handoffs."
        },
        "French PII Masker": {
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Mask French identifiers, phone numbers, emails, IBANs, postal addresses, and person names in pasted text."
        },
        "France Data Quality Workbench": {
          "status": "available",
          "tags": [
            "data-quality",
            "data"
          ],
          "description": "Audit French records for identifiers, payments, addresses, phone numbers, dates, and localization consistency."
        },
        "Compliance Checklist Generator": {
          "status": "available",
          "tags": [
            "compliance",
            "compliance"
          ],
          "description": "Generate implementation checklists for French identifier, payment, tax, privacy, and localization workflows."
        },
        "NIR Syntax Inspector": {
          "status": "available",
          "tags": [
            "identity",
            "identity"
          ],
          "description": "Inspect French NIR social security number structure, field groups, and offline boundary notes."
        },
        "NIR Key Validator": {
          "status": "available",
          "tags": [
            "identity",
            "identity"
          ],
          "description": "Validate the two-digit NIR control key for numeric French social security identifiers."
        },
        "NIR Masker": {
          "status": "available",
          "tags": [
            "privacy",
            "identity"
          ],
          "description": "Mask French NIR strings while preserving low-risk field evidence for debugging and QA."
        },
        "French Passport Number Helper": {
          "status": "available",
          "tags": [
            "identity",
            "identity"
          ],
          "description": "Inspect French passport-like strings for safe fixture shape, length, and logging boundaries."
        },
        "French ID Card Format Helper": {
          "status": "available",
          "tags": [
            "identity",
            "identity"
          ],
          "description": "Inspect French ID card-like values for shape, casing, and privacy-safe fixture handling."
        },
        "Birth Data Consistency Helper": {
          "status": "available",
          "tags": [
            "identity",
            "identity"
          ],
          "description": "Check whether French date, department, commune, and NIR-like fields agree at syntax level."
        },
        "Health Insurance Boundary Helper": {
          "status": "available",
          "tags": [
            "privacy",
            "identity"
          ],
          "description": "Explain offline boundaries for French health insurance identifiers and build safe test-data notes."
        },
        "Personal Data Fixture Generator": {
          "status": "available",
          "tags": [
            "privacy",
            "identity"
          ],
          "description": "Generate privacy-safe French person fixtures with fake names, addresses, phones, and masked identifiers."
        },
        "French License Plate Inspector": {
          "status": "available",
          "tags": [
            "vehicle",
            "vehicle"
          ],
          "description": "Validate French SIV plate syntax, normalize separators, and identify legacy plate boundaries."
        },
        "VIN Validator for France Workflows": {
          "status": "available",
          "tags": [
            "vehicle",
            "vehicle"
          ],
          "description": "Validate VIN syntax and checksum for French registration and fleet data workflows."
        },
        "Crit'Air Readiness Helper": {
          "status": "available",
          "tags": [
            "vehicle",
            "vehicle"
          ],
          "description": "Audit vehicle data snippets for Crit'Air certificate workflow readiness and offline boundary notes."
        },
        "Carte Grise Field Helper": {
          "status": "available",
          "tags": [
            "vehicle",
            "vehicle"
          ],
          "description": "Inspect French registration certificate field snippets and map labels to developer-friendly keys."
        },
        "Driving Licence Format Helper": {
          "status": "available",
          "tags": [
            "identity",
            "vehicle"
          ],
          "description": "Inspect French driving licence-like numbers for shape, masking, and data-entry QA boundaries."
        },
        "Vehicle Data Redaction Helper": {
          "status": "available",
          "tags": [
            "privacy",
            "vehicle"
          ],
          "description": "Mask French vehicle identifiers, VINs, registration plates, owner names, and support-ticket snippets."
        },
        "Municipality / Department Plate Helper": {
          "status": "available",
          "tags": [
            "government",
            "vehicle"
          ],
          "description": "Connect department, commune, postal, and plate snippets for QA without implying official lookup."
        },
        "French Document OCR Fixer": {
          "status": "available",
          "tags": [
            "data-quality",
            "data"
          ],
          "description": "Repair common OCR artifacts in French identifiers, invoices, addresses, and official document snippets."
        },
        "French CSV Locale Normalizer": {
          "status": "available",
          "tags": [
            "localization",
            "developer"
          ],
          "description": "Normalize French CSV snippets with semicolons, comma decimals, dates, and UTF-8 accents for imports."
        },
        "EUR Decimal / Currency Formatter": {
          "status": "available",
          "tags": [
            "localization",
            "developer"
          ],
          "description": "Format French EUR amounts, parse comma decimals, and produce API-safe numeric values."
        },
        "French Accent Normalizer": {
          "status": "available",
          "tags": [
            "localization",
            "developer"
          ],
          "description": "Normalize French accented text for search keys, ASCII fallbacks, slugs, and original-display preservation."
        },
        "French Slug Normalizer": {
          "status": "available",
          "tags": [
            "developer",
            "developer"
          ],
          "description": "Create URL-safe French slugs while preserving accents in display text and explaining normalization choices."
        },
        "French JSON Fixture Generator": {
          "status": "available",
          "tags": [
            "developer",
            "developer"
          ],
          "description": "Generate France-ready JSON fixtures containing identifiers, address, phone, payment, and privacy-safe sample values."
        },
        "French Regex Pack Helper": {
          "status": "available",
          "tags": [
            "developer",
            "developer"
          ],
          "description": "Generate and explain regex snippets for French identifiers, phones, postal codes, plates, and locale fields."
        },
        "French API Payload Auditor": {
          "status": "available",
          "tags": [
            "data-quality",
            "developer"
          ],
          "description": "Audit JSON or form payloads for French field names, identifiers, payments, locale, and privacy-safe logging."
        },
        "French Form Field Auditor": {
          "status": "available",
          "tags": [
            "data-quality",
            "developer"
          ],
          "description": "Review French form-field labels, placeholders, masks, validation hints, and accessibility-safe data-entry flows."
        }
      }
    },
    "germany": {
      "flag": "🇩🇪",
      "name": "Germany",
      "badge": "Premium Germany developer suite",
      "description": "Developer intelligence and browser-only workbenches for German tax identifiers, banking, accounting, locale conventions, privacy, documents, vehicles, and integration QA.",
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
          "title": "German IBAN",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "DE IBANs expose country, MOD-97 check digits, BLZ, and account-number slices in the Germany workbench."
        },
        {
          "brandKey": "sepa",
          "title": "SEPA",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ],
          "text": "German credit transfers and direct debits use SEPA-ready account, mandate, remittance, and creditor evidence."
        },
        {
          "brandKey": "swift",
          "title": "BIC / SWIFT",
          "status": "available",
          "tags": [
            "banking"
          ],
          "text": "BIC/SWIFT fields can be shape-checked locally; bank participation and ownership remain official/provider checks."
        },
        {
          "title": "Girocard",
          "status": "available",
          "tags": [
            "payments"
          ],
          "text": "Girocard routing and terminal snippets are inspected as local payment evidence without network authorization."
        }
      ],
      "officialResources": [
        {
          "title": "Bundeszentralamt fuer Steuern",
          "note": "IdNr, USt-IdNr, and tax identifier context; official status remains outside offline checks.",
          "status": "available",
          "tags": [
            "tax"
          ]
        },
        {
          "title": "ELSTER",
          "note": "Official electronic tax filing context for tax returns and pre-submission handoffs.",
          "status": "available",
          "tags": [
            "tax",
            "filing"
          ]
        },
        {
          "title": "Handelsregister",
          "note": "Commercial register existence, court, and legal status require official registry lookup.",
          "status": "available",
          "tags": [
            "registry"
          ]
        },
        {
          "title": "Deutsche Bundesbank",
          "note": "Banking, BLZ, payments, and regulatory context for German financial integrations.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "title": "KoSIT / XRechnung",
          "note": "German public-sector e-invoicing specification context and Leitweg-ID workflow references.",
          "status": "available",
          "tags": [
            "einvoice"
          ]
        },
        {
          "title": "Zoll",
          "note": "Customs and EORI status are official customs-system matters, not browser proofs.",
          "status": "available",
          "tags": [
            "customs"
          ]
        }
      ],
      "plannedWorkbenches": [
        {
          "name": "Live Handelsregister Lookup",
          "status": "planned",
          "tags": [
            "government",
            "registry"
          ],
          "description": "Future official commercial-registry integration after a privacy and network product spec."
        },
        {
          "name": "Live VIES VAT Status Lookup",
          "status": "planned",
          "tags": [
            "tax",
            "vat"
          ],
          "description": "Future EU VAT status check; current tools validate only browser-side syntax and handoff readiness."
        },
        {
          "name": "Live Bank Directory Enrichment",
          "status": "planned",
          "tags": [
            "banking"
          ],
          "description": "Future BLZ/BIC institution-name enrichment; current tools do not prove bank account ownership."
        },
        {
          "name": "Postal Delivery Verification",
          "status": "planned",
          "tags": [
            "postal",
            "addresses"
          ],
          "description": "Future delivery-point verification; current tools only inspect PLZ and address structure."
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
      "availableWorkbenches": [
        {
          "name": "German Tax ID / IdNr Validator",
          "slug": "german-tax-id-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "taxid"
          ],
          "description": "Validate German Steueridentifikationsnummer shape, replay ISO 7064 MOD 11,10 check digit evidence, and separate offline syntax from identity proof."
        },
        {
          "name": "German Steuernummer Format Helper",
          "slug": "german-steuernummer-format-helper",
          "status": "available",
          "tags": [
            "tax",
            "steuernummer"
          ],
          "description": "Inspect German tax-number snippets, normalize separators, detect Bundesland-style segments, and prepare ELSTER-safe diagnostics."
        },
        {
          "name": "German USt-IdNr / VAT Validator",
          "slug": "german-vat-ust-idnr-validator",
          "status": "available",
          "tags": [
            "tax",
            "vat"
          ],
          "description": "Validate German VAT display syntax, normalize DE prefixes, inspect numeric body length, and prepare VIES handoff notes."
        },
        {
          "name": "German EORI / Customs Identifier Helper",
          "slug": "german-eori-validator",
          "status": "available",
          "tags": [
            "tax",
            "eori"
          ],
          "description": "Inspect German EORI/customs identifier payloads, country prefixes, digit evidence, and customs-boundary notes."
        },
        {
          "name": "German Handelsregister Readiness Helper",
          "slug": "german-handelsregister-readiness-helper",
          "status": "available",
          "tags": [
            "tax",
            "register"
          ],
          "description": "Audit HRB/HRA register references, court snippets, company names, and offline commercial-registry handoff evidence."
        },
        {
          "name": "German LEI Context Helper",
          "slug": "german-lei-helper",
          "status": "available",
          "tags": [
            "tax",
            "lei"
          ],
          "description": "Inspect Legal Entity Identifier shape, German company context, and official GLEIF lookup boundaries for onboarding payloads."
        },
        {
          "name": "German Company Onboarding Auditor",
          "slug": "german-company-onboarding-auditor",
          "status": "available",
          "tags": [
            "tax",
            "company"
          ],
          "description": "Check company intake snippets for USt-IdNr, Handelsregister, IBAN, address, and official registry boundaries."
        },
        {
          "name": "German ELSTER Readiness Helper",
          "slug": "german-elster-readiness-helper",
          "status": "available",
          "tags": [
            "tax",
            "taxdoc"
          ],
          "description": "Audit German tax-submission snippets for IdNr, Steuernummer, USt-IdNr, year, period, and official ELSTER boundary evidence."
        },
        {
          "name": "German Finanzamt Field Helper",
          "slug": "german-tax-office-field-helper",
          "status": "available",
          "tags": [
            "tax",
            "taxdoc"
          ],
          "description": "Inspect tax-office and assessment snippets for Steuernummer, Bundesland, city, year, and filing context without official lookup."
        },
        {
          "name": "German IBAN Validator",
          "slug": "germany-iban-validator",
          "status": "available",
          "tags": [
            "finance",
            "iban"
          ],
          "description": "Validate German IBAN numbers, extract BLZ and account segments, and explain where official bank-directory checks begin."
        },
        {
          "name": "German BLZ Bank Code Inspector",
          "slug": "german-blz-bank-code-inspector",
          "status": "available",
          "tags": [
            "finance",
            "blz"
          ],
          "description": "Inspect German eight-digit Bankleitzahl evidence, normalize bank-routing snippets, and separate directory lookup from local format checks."
        },
        {
          "name": "German BIC / SWIFT Inspector",
          "slug": "german-bic-swift-inspector",
          "status": "available",
          "tags": [
            "finance",
            "bic"
          ],
          "description": "Inspect BIC/SWIFT shape, verify DE country-code evidence, and prepare payment-routing diagnostics."
        },
        {
          "name": "German SEPA Transfer Helper",
          "slug": "german-sepa-transfer-helper",
          "status": "available",
          "tags": [
            "finance",
            "sepa"
          ],
          "description": "Check German SEPA-ready bundles for IBAN, BIC, amount, creditor, remittance, and bank-boundary notes."
        },
        {
          "name": "German SEPA Direct Debit Mandate Helper",
          "slug": "german-sepa-direct-debit-mandate-helper",
          "status": "available",
          "tags": [
            "finance",
            "mandate"
          ],
          "description": "Audit mandate references, creditor identifiers, German IBAN evidence, debtor fields, and direct-debit readiness notes."
        },
        {
          "name": "German Girocard Routing Helper",
          "slug": "german-girocard-routing-helper",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Inspect Girocard/girocard payment references, BLZ hints, terminal snippets, and card-network boundary notes."
        },
        {
          "name": "German Remittance Text Builder",
          "slug": "german-remittance-text-builder",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Normalize German Verwendungszweck text, detect invoice, customer, amount, and SEPA-safe length evidence."
        },
        {
          "name": "German Payment Reconciliation Helper",
          "slug": "german-payment-reconciliation-helper",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Extract German IBANs, invoice ids, EUR amounts, dates, and counterparty evidence from reconciliation text."
        },
        {
          "name": "German Bank Statement Parser",
          "slug": "german-bank-statement-parser",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Parse German bank-statement snippets for booking dates, IBANs, BLZ/BIC evidence, amounts, and reconciliation hints."
        },
        {
          "name": "German Masked IBAN Formatter",
          "slug": "german-masked-iban-formatter",
          "status": "available",
          "tags": [
            "finance",
            "iban"
          ],
          "description": "Mask German IBANs for logs, keep country/check/BLZ hints, and prepare privacy-safe banking previews."
        },
        {
          "name": "German EUR Decimal Currency Formatter",
          "slug": "german-eur-decimal-currency-formatter",
          "status": "available",
          "tags": [
            "localization",
            "amount"
          ],
          "description": "Parse German Euro amounts, normalize comma decimals, produce display strings, and expose integer cent values."
        },
        {
          "name": "German VAT Rate Sanity Helper",
          "slug": "german-vat-rate-sanity-helper",
          "status": "available",
          "tags": [
            "finance",
            "amount"
          ],
          "description": "Check German VAT rate snippets, net/gross consistency, and invoice-friendly EUR amount evidence."
        },
        {
          "name": "German VAT Return Field Helper",
          "slug": "german-vat-return-field-helper",
          "status": "available",
          "tags": [
            "finance",
            "taxdoc"
          ],
          "description": "Inspect Umsatzsteuer-Voranmeldung snippets for period, tax base, VAT rate, amount, and official filing boundaries."
        },
        {
          "name": "German Invoice Number Helper",
          "slug": "german-invoice-number-helper",
          "status": "available",
          "tags": [
            "finance",
            "invoice"
          ],
          "description": "Normalize German invoice-number snippets, detect year/sequence evidence, and flag accounting-system boundary notes."
        },
        {
          "name": "German XRechnung Readiness Helper",
          "slug": "german-xrechnung-readiness-helper",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Audit German XRechnung snippets for Leitweg-ID, supplier, buyer, amount, tax, and XML handoff evidence."
        },
        {
          "name": "German ZUGFeRD Readiness Helper",
          "slug": "german-zugferd-readiness-helper",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Inspect ZUGFeRD/Factur-X readiness snippets for invoice, PDF/XML, amount, tax, and recipient evidence."
        },
        {
          "name": "German E-Invoicing Readiness Helper",
          "slug": "german-e-invoicing-readiness-helper",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Check German e-invoicing payloads for XRechnung, ZUGFeRD, Leitweg-ID, VAT, amount, and recipient readiness."
        },
        {
          "name": "German DATEV Export Readiness Checker",
          "slug": "german-datev-export-readiness-checker",
          "status": "available",
          "tags": [
            "finance",
            "accounting"
          ],
          "description": "Audit DATEV export snippets for account codes, booking date, amount, tax key, BU-Schluessel, and CSV handoff evidence."
        },
        {
          "name": "German GoBD Audit Trail Checklist Generator",
          "slug": "german-gobd-audit-trail-checklist-generator",
          "status": "available",
          "tags": [
            "finance",
            "accounting"
          ],
          "description": "Check German audit-trail snippets for immutability, timestamps, document ids, tax periods, and GoBD boundary notes."
        },
        {
          "name": "German SKR03 / SKR04 Account Code Helper",
          "slug": "german-skr03-skr04-account-code-helper",
          "status": "available",
          "tags": [
            "finance",
            "accounting"
          ],
          "description": "Inspect German chart-of-accounts snippets, detect SKR03/SKR04-like codes, and prepare accounting integration notes."
        },
        {
          "name": "German Payroll Social Security Helper",
          "slug": "german-payroll-social-security-helper",
          "status": "available",
          "tags": [
            "finance",
            "payroll"
          ],
          "description": "Audit German payroll snippets for employee, Sozialversicherung context, amount, month, and health-insurance boundary evidence."
        },
        {
          "name": "German Wage Tax Readiness Helper",
          "slug": "german-wage-tax-readiness-helper",
          "status": "available",
          "tags": [
            "finance",
            "payroll"
          ],
          "description": "Inspect Lohnsteuer snippets for IdNr, employer, period, wage tax, church tax hints, and ELSTER boundary evidence."
        },
        {
          "name": "German Health Insurance Boundary Helper",
          "slug": "german-health-insurance-boundary-helper",
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Inspect German health-insurance snippets, member numbers, employer evidence, and privacy/official boundary notes."
        },
        {
          "name": "German Address Normalizer",
          "slug": "german-address-normalizer",
          "status": "available",
          "tags": [
            "localization",
            "address"
          ],
          "description": "Normalize German street, house number, postal code, city, and country lines for local forms."
        },
        {
          "name": "German Address Transliteration Normalizer",
          "slug": "german-address-transliteration-normalizer",
          "status": "available",
          "tags": [
            "localization",
            "address"
          ],
          "description": "Normalize German umlaut and ß variants, preserve postal fields, and prepare ASCII-safe address keys."
        },
        {
          "name": "German Postal Code Validator",
          "slug": "german-postal-code-validator",
          "status": "available",
          "tags": [
            "localization",
            "postal"
          ],
          "description": "Validate German five-digit postal code shape, detect address context, and separate delivery proof from local checks."
        },
        {
          "name": "German Federal State Code Mapper",
          "slug": "german-federal-state-code-mapper",
          "status": "available",
          "tags": [
            "localization",
            "state"
          ],
          "description": "Map German Bundesland abbreviations/names, detect regional context, and expose integration-safe state evidence."
        },
        {
          "name": "German Municipality Code Inspector",
          "slug": "german-municipality-code-inspector",
          "status": "available",
          "tags": [
            "localization",
            "municipality"
          ],
          "description": "Inspect German municipality-code snippets, normalize AGS-like digits, and mark official-statistics lookup boundaries."
        },
        {
          "name": "German Phone Number Validator",
          "slug": "german-phone-number-validator",
          "status": "available",
          "tags": [
            "localization",
            "phone"
          ],
          "description": "Validate German phone-number shape, normalize trunk prefixes, and prepare E.164 handoff notes."
        },
        {
          "name": "German Phone E.164 Formatter",
          "slug": "german-phone-e164-formatter",
          "status": "available",
          "tags": [
            "localization",
            "phone"
          ],
          "description": "Normalize German national numbers to +49 where possible, inspect subscriber length, and flag telecom lookup boundaries."
        },
        {
          "name": "German Date Locale Formatter",
          "slug": "german-date-locale-formatter",
          "status": "available",
          "tags": [
            "localization",
            "date"
          ],
          "description": "Parse German DD.MM.YYYY snippets, normalize ISO dates, and expose locale parsing evidence."
        },
        {
          "name": "German CSV Locale Normalizer",
          "slug": "german-csv-locale-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Normalize CSV snippets containing German semicolons, comma decimals, dates, VAT ids, and postal-code fields."
        },
        {
          "name": "German Slug Normalizer",
          "slug": "german-slug-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Normalize German umlauts, ß, punctuation, and whitespace into stable ASCII slug keys."
        },
        {
          "name": "German Document OCR Fixer",
          "slug": "german-document-ocr-fixer",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Repair common OCR spacing in German IdNr, USt-IdNr, IBAN, postal code, amount, and invoice snippets."
        },
        {
          "name": "German PII Masker",
          "slug": "german-pii-masker",
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Mask German IdNr, phone, IBAN, postal address, email, and document-like evidence for logs."
        },
        {
          "name": "German GDPR / DSGVO Redaction Helper",
          "slug": "german-gdpr-dsgvo-redaction-helper",
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Detect German personal, banking, tax, and address evidence, then prepare privacy-safe redaction notes."
        },
        {
          "name": "German Personal Data Fixture Generator",
          "slug": "german-personal-data-fixture-generator",
          "status": "available",
          "tags": [
            "privacy",
            "privacy"
          ],
          "description": "Generate and inspect safe German-looking personal-data fixtures for tests without implying real identity."
        },
        {
          "name": "German ID Card Format Helper",
          "slug": "german-id-card-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Personalausweis-style alphanumeric document snippets, MRZ-like evidence, and identity-proof boundaries."
        },
        {
          "name": "German Passport Number Helper",
          "slug": "german-passport-number-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect German passport-number snippets, MRZ-like evidence, and official identity-document boundaries."
        },
        {
          "name": "German Driving Licence Format Helper",
          "slug": "german-driving-licence-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect German driving-licence snippets, authority/date evidence, and official mobility boundary notes."
        },
        {
          "name": "German Residence Permit Format Helper",
          "slug": "german-residence-permit-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Aufenthaltstitel snippets, card/document evidence, and official immigration-status boundaries."
        },
        {
          "name": "German Vehicle Plate Inspector",
          "slug": "german-vehicle-plate-inspector",
          "status": "available",
          "tags": [
            "national-identifiers",
            "plate"
          ],
          "description": "Inspect German vehicle plate region prefixes, serial letters/digits, and fleet-safe redaction evidence."
        },
        {
          "name": "German VIN Validator",
          "slug": "german-vin-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "vin"
          ],
          "description": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare German vehicle-intake diagnostics."
        },
        {
          "name": "German Vehicle Data Redaction Helper",
          "slug": "german-vehicle-data-redaction-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "privacy"
          ],
          "description": "Mask VINs, plates, owner snippets, and address evidence for German vehicle workflows."
        },
        {
          "name": "German Customs Declaration Helper",
          "slug": "german-customs-declaration-helper",
          "status": "available",
          "tags": [
            "tax",
            "customs"
          ],
          "description": "Inspect customs snippets for EORI, invoice, amount, goods, and official Zoll boundary notes."
        },
        {
          "name": "German Postal Tracking Helper",
          "slug": "german-postal-tracking-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Inspect German parcel tracking snippets, postal-code evidence, carrier boundary notes, and log-safe previews."
        },
        {
          "name": "German Data Quality Workbench",
          "slug": "german-data-quality-workbench",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Audit German mixed datasets for IdNr, USt-IdNr, IBAN, PLZ, phone, amount, date, and address evidence."
        },
        {
          "name": "German JSON Fixture Generator",
          "slug": "german-json-fixture-generator",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Generate and inspect German-localized JSON snippets with locale, VAT, IBAN, address, and amount fields."
        },
        {
          "name": "German Regex Pack Helper",
          "slug": "german-regex-pack-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Prepare regex snippets for German IdNr, USt-IdNr, IBAN, PLZ, phone, amount, and date fields."
        },
        {
          "name": "German API Payload Auditor",
          "slug": "german-api-payload-auditor",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Audit German API payloads for locale, identifiers, banking, address, privacy, and official-boundary evidence."
        },
        {
          "name": "German Form Field Auditor",
          "slug": "german-form-field-auditor",
          "status": "available",
          "tags": [
            "developer-tools",
            "developer"
          ],
          "description": "Review German form-field labels, placeholders, masks, validation hints, and accessibility-safe data-entry flows."
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
          "name": "IdNr",
          "description": "Eleven digits using ISO 7064 MOD 11,10 check digit evidence; identity proof remains official."
        },
        {
          "name": "Steuernummer",
          "description": "State/tax-office specific digit blocks commonly displayed with slash separators."
        },
        {
          "name": "USt-IdNr",
          "description": "DE plus nine digits; active VAT status requires VIES or official tax systems."
        },
        {
          "name": "German IBAN",
          "description": "DE plus 20 digits; MOD-97 validates the IBAN and BLZ/account slices are exposed locally."
        },
        {
          "name": "PLZ",
          "description": "Five-digit German postal code shape; delivery proof requires postal reference data."
        },
        {
          "name": "Phone",
          "description": "+49 or trunk-zero German number evidence; allocation and subscriber status require telecom sources."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating IdNr as identity proof",
          "text": "The browser can inspect shape and check digit evidence, but it cannot prove that a person or identity exists."
        },
        {
          "title": "Confusing Steuernummer and USt-IdNr",
          "text": "Steuernummer is local tax-office context; USt-IdNr is the DE VAT identifier used for EU VAT workflows."
        },
        {
          "title": "Assuming BLZ means ownership",
          "text": "IBAN and BLZ slicing does not prove the account belongs to a company or person."
        },
        {
          "title": "Using dot decimals in German imports",
          "text": "Many German CSV/accounting flows expect comma decimal values and semicolon separators."
        }
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
          "description": "DE IBAN format with BLZ and ten-digit account segment breakdown."
        },
        {
          "name": "BLZ",
          "status": "available",
          "tags": [
            "banking"
          ],
          "description": "Eight-digit Bankleitzahl routing evidence; bank name enrichment requires reference data."
        },
        {
          "brandKey": "sepa",
          "name": "SEPA",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Credit transfer and direct debit readiness fields for German EUR accounts."
        },
        {
          "brandKey": "swift",
          "name": "SWIFT / BIC",
          "status": "available",
          "tags": [
            "banking"
          ],
          "description": "International routing identifier shape with DE country-code evidence."
        }
      ],
      "localizationNotes": [
        {
          "title": "Comma decimals",
          "text": "German business CSV and accounting workflows commonly use comma decimals and semicolon separators."
        },
        {
          "title": "DD.MM.YYYY dates",
          "text": "Human-facing German dates are usually day-month-year with dots; store ISO dates for APIs."
        },
        {
          "title": "Umlauts and ss",
          "text": "Search keys often need ASCII-safe normalization for ae/oe/ue and ss while display names preserve German spelling."
        }
      ],
      "ecosystem": [
        {
          "title": "Tax identity",
          "text": "IdNr, Steuernummer, USt-IdNr, Finanzamt, ELSTER, and VAT return workflows form the tax identity cluster."
        },
        {
          "title": "Business registry",
          "text": "Handelsregister, HRB/HRA, company onboarding, LEI, EORI, and official lookup boundaries form the company evidence cluster."
        },
        {
          "title": "Payments",
          "text": "German IBAN, BLZ, BIC, SEPA, direct debit, remittance, bank statements, and reconciliation form the payment cluster."
        },
        {
          "title": "Accounting",
          "text": "XRechnung, ZUGFeRD, DATEV, GoBD, SKR03/SKR04, VAT rates, and invoice evidence form the accounting cluster."
        },
        {
          "title": "Locale and privacy",
          "text": "PLZ, addresses, phone numbers, comma decimals, dates, DSGVO redaction, and PII masking form the data-quality cluster."
        }
      ],
      "highlights": [
        {
          "title": "Premium Germany suite",
          "text": "Sixty browser-only Germany workbenches cover tax, banking, accounting, locale, privacy, vehicles, and developer-data workflows."
        },
        {
          "title": "Field breakdown everywhere",
          "text": "Each tool exposes named German evidence slices for debugging instead of only generic result cards."
        },
        {
          "title": "Official boundaries preserved",
          "text": "Registry, tax, bank, vehicle, carrier, and identity status checks remain outside browser-only validation."
        }
      ],
      "developerNotes": [
        {
          "title": "Normalize for storage",
          "text": "Store compact identifiers such as DE VAT, IdNr, and IBAN separately from display punctuation."
        },
        {
          "title": "Mask before logging",
          "text": "IdNr, IBAN, phone, address, and document evidence should be masked in logs and screenshots."
        },
        {
          "title": "Use official systems for status",
          "text": "ValidoHub provides offline shape evidence and handoff payloads, not regulated official decisions."
        }
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
    "netherlands": {
      "flag": "🇳🇱",
      "name": "Netherlands",
      "badge": "Western Europe premium country hub",
      "description": "Developer intelligence for Dutch identity, business registry, tax, banking, address, payment, privacy, vehicle, audit-file, and localization workflows with browser-only validation where possible.",
      "metadata": {
        "nativeName": "Nederland",
        "population": "approximately 18M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "41,543 km²",
        "capital": "Amsterdam",
        "largestCity": "Amsterdam",
        "continent": "Europe",
        "region": "Western Europe / European Union",
        "languages": "Dutch",
        "currency": "Euro",
        "currencyCode": "EUR",
        "currencySymbol": "€",
        "callingCode": "+31",
        "internetTld": ".nl",
        "drivingSide": "Right",
        "iso2": "NL",
        "iso3": "NLD",
        "isoNumeric": "528",
        "locale": "nl-NL",
        "icuLocale": "nl_NL",
        "dateFormat": "DD-MM-YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Period (.)",
        "addressFormat": "Recipient, street name house number addition, postcode locality, Netherlands",
        "postalCodeFormat": "NNNN AA",
        "primaryTimeZone": "Europe/Amsterdam (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type F",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "nl-NL",
        "cldrLocale": "nl_NL",
        "metricVsImperial": "Metric-first",
        "administrativeDivisions": [
          "Provinces",
          "Municipalities",
          "Water boards"
        ],
        "taxSystem": {
          "name": "Belastingdienst / BTW",
          "description": "Dutch tax workflows revolve around BTW/VAT identifiers, payroll-tax references, VAT return fields, invoice evidence, and official filing boundaries."
        },
        "licensePlateFormat": "Dutch plates use several series such as 12-AB-34, AB-12-CD, 1-ABC-23, and current vehicle-specific patterns."
      },
      "visualIdentity": {
        "countryId": "netherlands",
        "outlineLabel": "Netherlands outline",
        "mapLabel": "Netherlands in the world",
        "continentBadge": "Europe",
        "flagLabel": "Netherlands flag",
        "heroAccentPrimary": "174 28 40",
        "heroAccentSecondary": "255 255 255",
        "heroAccentTertiary": "33 70 139"
      },
      "localizationExamples": [
        {
          "label": "Date",
          "value": "14-07-2026"
        },
        {
          "label": "Time",
          "value": "14:35"
        },
        {
          "label": "Currency",
          "value": "€ 1.250,75"
        },
        {
          "label": "Phone",
          "value": "+31 6 12345678"
        },
        {
          "label": "Postal code",
          "value": "1012 AB"
        },
        {
          "label": "Address",
          "value": "Damrak 1-A, 1012 LG Amsterdam"
        }
      ],
      "addressExample": {
        "formatted": [
          "Jansen BV",
          "Damrak 1-A",
          "1012 LG Amsterdam",
          "Nederland"
        ],
        "fields": [
          {
            "label": "Street",
            "value": "Damrak",
            "description": "Street name precedes house number in common address entry."
          },
          {
            "label": "House number",
            "value": "1-A",
            "description": "House-number additions must be stored separately when possible."
          },
          {
            "label": "Postcode",
            "value": "1012 LG",
            "description": "Four digits plus two letters with a space for display."
          },
          {
            "label": "Locality",
            "value": "Amsterdam",
            "description": "City/locality is paired with postcode for lookup handoff."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "06 12345678",
          "description": "Dutch mobile numbers commonly start with 06 locally or +31 6 internationally.",
          "tags": [
            "phone",
            "mobile"
          ]
        },
        {
          "label": "Amsterdam landline",
          "value": "020 123 4567",
          "description": "Geographic numbers preserve area-code context when normalized.",
          "tags": [
            "phone",
            "landline"
          ]
        }
      ],
      "localFormats": [
        {
          "name": "Postcode",
          "description": "NNNN AA display with a space between digits and letters.",
          "status": "available",
          "tags": [
            "postal"
          ]
        },
        {
          "name": "Dutch IBAN",
          "description": "NLkk BANK 0000 0000 00 after MOD-97, with a four-letter bank code.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "name": "BTW identifier",
          "description": "NL prefix, nine digits, B separator, and two trailing digits for VAT syntax.",
          "status": "available",
          "tags": [
            "tax"
          ]
        }
      ],
      "integrationChecklist": [
        "Normalize BSN, KVK, RSIN, BTW, IBAN, postcode, and phone values before storage.",
        "Keep raw personal identifiers out of logs; use masked values in support and analytics payloads.",
        "Treat KVK, VIES, BAG, bank ownership, DigiD, and RDW status as official external lookups.",
        "Place country-specific IBAN validation under the Netherlands hub even when the global IBAN tool exists."
      ],
      "validationRules": [
        {
          "name": "BSN eleven-test",
          "description": "A nine-digit BSN can be checked locally with weighted eleven-test math, but this does not prove identity.",
          "status": "available",
          "tags": [
            "identity",
            "checksum"
          ]
        },
        {
          "name": "Dutch IBAN MOD-97",
          "description": "NL IBANs validate through ISO 13616 MOD-97 and expose bank-code/account fields.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "name": "Postcode shape",
          "description": "Dutch postcodes use four digits and two letters; delivery existence requires BAG or postal data.",
          "status": "available",
          "tags": [
            "address"
          ]
        }
      ],
      "commonMistakes": [
        "Using a BSN checksum as proof that a person exists.",
        "Displaying raw long samples in dropdown labels instead of short human labels.",
        "Treating global IBAN validation as enough for Dutch bank-code and account slicing.",
        "Forgetting house-number additions when preparing BAG lookup payloads."
      ],
      "payments": [
        {
          "name": "Dutch IBAN / SEPA",
          "description": "EUR transfers use IBAN, BIC where needed, SEPA references, and clear ownership-boundary notes.",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ]
        },
        {
          "name": "SEPA Direct Debit",
          "description": "Mandate references, creditor data, IBAN, amount, and remittance need consistent formatting.",
          "status": "available",
          "tags": [
            "payments"
          ]
        },
        {
          "name": "iDEAL",
          "description": "Dominant Dutch online payment method; browser tools can prepare and reconcile references, not provider settlement status.",
          "status": "available",
          "tags": [
            "payments"
          ]
        }
      ],
      "bankingOverview": [
        {
          "name": "BIC / SWIFT",
          "description": "BIC syntax separates institution, country, location, and optional branch while live routing remains external.",
          "status": "available",
          "tags": [
            "bic"
          ]
        },
        {
          "name": "Bank statement imports",
          "description": "Dutch statement snippets combine comma decimals, local dates, SEPA references, and masked account data.",
          "status": "available",
          "tags": [
            "data-quality"
          ]
        },
        {
          "name": "Dutch IBAN",
          "description": "NL IBAN structure contains country code, two check digits, four-letter bank code, and ten-digit account number.",
          "status": "available",
          "tags": [
            "iban"
          ]
        }
      ],
      "officialResources": [
        {
          "title": "BAG / Kadaster",
          "note": "Official address and building registry context for postcode and locality confirmation.",
          "status": "available",
          "tags": [
            "address"
          ]
        },
        {
          "title": "Belastingdienst",
          "note": "Official Dutch tax administration reference for BTW, payroll tax, returns, and filing boundaries.",
          "status": "available",
          "tags": [
            "tax"
          ]
        },
        {
          "title": "De Nederlandsche Bank",
          "note": "Central bank and payment-system context for banking and financial-sector boundaries.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "title": "Kamer van Koophandel",
          "note": "Official business registry context for KVK numbers, branches, and company status lookup.",
          "status": "available",
          "tags": [
            "business"
          ]
        },
        {
          "title": "Logius / DigiD",
          "note": "Official digital identity ecosystem reference; browser tools must never claim live DigiD verification.",
          "status": "available",
          "tags": [
            "identity"
          ]
        },
        {
          "title": "RDW",
          "note": "Official vehicle registry context for license plate and vehicle status checks.",
          "status": "available",
          "tags": [
            "vehicle"
          ]
        }
      ],
      "availableWorkbenches": [
        {
          "name": "Audit File Readiness Checker",
          "description": "Browser-only Netherlands workbench for audit file readiness checker with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Audit Trail Checklist Generator",
          "description": "Browser-only Netherlands workbench for audit trail checklist generator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "AVG / GDPR Redaction Helper",
          "description": "Browser-only Netherlands workbench for avg / gdpr redaction helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "BAG Address Readiness Helper",
          "description": "Browser-only Netherlands workbench for bag address readiness helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Bank Statement Parser",
          "description": "Browser-only Netherlands workbench for bank statement parser with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "BSN Masker",
          "description": "Browser-only Netherlands workbench for bsn masker with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "BSN Validator & Explainer",
          "description": "Browser-only Netherlands workbench for bsn validator & explainer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Company Onboarding Auditor",
          "description": "Browser-only Netherlands workbench for company onboarding auditor with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Compliance Checklist Generator",
          "description": "Browser-only Netherlands workbench for compliance checklist generator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "DigiD Boundary Helper",
          "description": "Browser-only Netherlands workbench for digid boundary helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Driving Licence Format Helper",
          "description": "Browser-only Netherlands workbench for driving licence format helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Address Normalizer",
          "description": "Browser-only Netherlands workbench for dutch address normalizer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Address Transliteration Normalizer",
          "description": "Browser-only Netherlands workbench for dutch address transliteration normalizer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch API Payload Auditor",
          "description": "Browser-only Netherlands workbench for dutch api payload auditor with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Bank Code Inspector",
          "description": "Browser-only Netherlands workbench for dutch bank code inspector with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch BIC / SWIFT Inspector",
          "description": "Browser-only Netherlands workbench for dutch bic / swift inspector with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch BTW / VAT Validator",
          "description": "Browser-only Netherlands workbench for dutch btw / vat validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch BTW Rate Sanity Helper",
          "description": "Browser-only Netherlands workbench for dutch btw rate sanity helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch CSV Locale Normalizer",
          "description": "Browser-only Netherlands workbench for dutch csv locale normalizer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Date / Locale Formatter",
          "description": "Browser-only Netherlands workbench for dutch date / locale formatter with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Document OCR Fixer",
          "description": "Browser-only Netherlands workbench for dutch document ocr fixer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch EAN / GS1 Code Inspector",
          "description": "Browser-only Netherlands workbench for dutch ean / gs1 code inspector with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Email Domain Fixture Helper",
          "description": "Browser-only Netherlands workbench for dutch email domain fixture helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch EORI Validator",
          "description": "Browser-only Netherlands workbench for dutch eori validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Form Field Auditor",
          "description": "Browser-only Netherlands workbench for dutch form field auditor with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch IBAN Validator",
          "description": "Browser-only Netherlands workbench for dutch iban validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch ID Card Format Helper",
          "description": "Browser-only Netherlands workbench for dutch id card format helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Invoice Number Helper",
          "description": "Browser-only Netherlands workbench for dutch invoice number helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch JSON Fixture Generator",
          "description": "Browser-only Netherlands workbench for dutch json fixture generator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch License Plate Inspector",
          "description": "Browser-only Netherlands workbench for dutch license plate inspector with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Passport Number Helper",
          "description": "Browser-only Netherlands workbench for dutch passport number helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Phone E.164 Formatter",
          "description": "Browser-only Netherlands workbench for dutch phone e.164 formatter with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Phone Number Validator",
          "description": "Browser-only Netherlands workbench for dutch phone number validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch PII Masker",
          "description": "Browser-only Netherlands workbench for dutch pii masker with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Postcode Validator",
          "description": "Browser-only Netherlands workbench for dutch postcode validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Regex Pack Helper",
          "description": "Browser-only Netherlands workbench for dutch regex pack helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Remittance Text Builder",
          "description": "Browser-only Netherlands workbench for dutch remittance text builder with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Dutch Slug Normalizer",
          "description": "Browser-only Netherlands workbench for dutch slug normalizer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "E-Invoicing Readiness Helper",
          "description": "Browser-only Netherlands workbench for e-invoicing readiness helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "EUR Decimal / Currency Formatter",
          "description": "Browser-only Netherlands workbench for eur decimal / currency formatter with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Health Insurance Boundary Helper",
          "description": "Browser-only Netherlands workbench for health insurance boundary helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "House Number Addition Helper",
          "description": "Browser-only Netherlands workbench for house number addition helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "iDEAL Payment Reference Helper",
          "description": "Browser-only Netherlands workbench for ideal payment reference helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "KVK Branch Number Helper",
          "description": "Browser-only Netherlands workbench for kvk branch number helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "KVK Number Validator",
          "description": "Browser-only Netherlands workbench for kvk number validator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Masked IBAN Formatter",
          "description": "Browser-only Netherlands workbench for masked iban formatter with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Municipality Code Inspector",
          "description": "Browser-only Netherlands workbench for municipality code inspector with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Netherlands Data Quality Workbench",
          "description": "Browser-only Netherlands workbench for netherlands data quality workbench with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Payment Reconciliation Helper",
          "description": "Browser-only Netherlands workbench for payment reconciliation helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Payroll Tax Number Helper",
          "description": "Browser-only Netherlands workbench for payroll tax number helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Peppol Readiness Helper",
          "description": "Browser-only Netherlands workbench for peppol readiness helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Personal Data Fixture Generator",
          "description": "Browser-only Netherlands workbench for personal data fixture generator with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "PostNL Tracking Helper",
          "description": "Browser-only Netherlands workbench for postnl tracking helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Province Code Mapper",
          "description": "Browser-only Netherlands workbench for province code mapper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "RDW Vehicle Data Redaction Helper",
          "description": "Browser-only Netherlands workbench for rdw vehicle data redaction helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "RSIN Validator & Explainer",
          "description": "Browser-only Netherlands workbench for rsin validator & explainer with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "RVO Relation Number Helper",
          "description": "Browser-only Netherlands workbench for rvo relation number helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "SEPA Direct Debit Mandate Helper",
          "description": "Browser-only Netherlands workbench for sepa direct debit mandate helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "SEPA Transfer Helper",
          "description": "Browser-only Netherlands workbench for sepa transfer helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "UBO Readiness Helper",
          "description": "Browser-only Netherlands workbench for ubo readiness helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "VAT Return Field Helper",
          "description": "Browser-only Netherlands workbench for vat return field helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "VIN Validator for Netherlands Workflows",
          "description": "Browser-only Netherlands workbench for vin validator for netherlands workflows with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        },
        {
          "name": "Wage Tax Readiness Helper",
          "description": "Browser-only Netherlands workbench for wage tax readiness helper with local diagnostics, copyable results, quality notes, and official lookup boundaries.",
          "status": "available",
          "tags": [
            "workbench",
            "country"
          ]
        }
      ],
      "plannedWorkbenches": [],
      "relatedGlobalTools": [
        {
          "name": "Global IBAN Validator",
          "description": "Use global IBAN validation for cross-country detection, then switch to the Netherlands IBAN workbench for Dutch BBAN slicing.",
          "status": "available",
          "tags": [
            "global",
            "iban"
          ]
        }
      ],
      "highlights": [
        "Netherlands now ships as a full premium country suite rather than a metadata-only hub.",
        "Every workbench runs locally in browser and exposes official lookup boundaries.",
        "BSN, KVK, BTW, IBAN, postcode, iDEAL, SEPA, BAG, RDW, AVG, and audit-file workflows are linked from the country hub."
      ],
      "developerNotes": [
        "Use nl-NL display only at the UI boundary; keep normalized canonical values in storage.",
        "Mask BSN, IBAN, phones, and document-like values before logs, screenshots, or telemetry."
      ],
      "developerExamples": [
        {
          "language": "javascript",
          "title": "Normalize Dutch postcode",
          "note": "Keep display formatting separate from storage.",
          "code": "const normalized = input.toUpperCase().replace(/\\s+/g, '').replace(/^(\\d{4})([A-Z]{2})$/, '$1 $2');"
        }
      ],
      "localizationNotes": [
        {
          "name": "Comma decimals",
          "description": "Dutch decimal display uses comma while thousands grouping commonly uses a period.",
          "tags": [
            "locale",
            "money"
          ]
        },
        {
          "name": "Postcode spacing",
          "description": "Normalize compact input but display Dutch postcodes with a space between digits and letters.",
          "tags": [
            "address",
            "postal"
          ]
        }
      ],
      "ecosystem": [
        {
          "name": "BSN to privacy boundary",
          "description": "BSN is sensitive personal data; local checksum is not identity proof.",
          "tags": [
            "identity",
            "privacy"
          ]
        },
        {
          "name": "KVK to company onboarding",
          "description": "KVK, RSIN, BTW, address, and IBAN often travel together in B2B onboarding.",
          "tags": [
            "business",
            "tax"
          ]
        },
        {
          "name": "IBAN to payments",
          "description": "Dutch IBAN, BIC, SEPA references, and iDEAL order references are core payment fixtures.",
          "tags": [
            "banking",
            "payments"
          ]
        }
      ]
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
    },
    "switzerland": {
      "flag": "🇨🇭",
      "name": "Switzerland",
      "badge": "Central Europe premium country hub",
      "description": "Developer intelligence for Swiss identity, company registry, tax, banking, QR-bill payment, canton, address, phone, privacy, payroll, vehicle, and localization workflows with browser-only validation where possible.",
      "metadata": {
        "nativeName": "Schweiz / Suisse / Svizzera / Svizra",
        "population": "approximately 9M",
        "populationNote": "Approximate 2026 population context; do not treat as a timeless constant.",
        "area": "41,285 km²",
        "capital": "Bern",
        "largestCity": "Zurich",
        "continent": "Europe",
        "region": "Central Europe / EFTA / Schengen",
        "languages": "German, French, Italian, Romansh",
        "currency": "Swiss franc",
        "currencyCode": "CHF",
        "currencySymbol": "CHF",
        "callingCode": "+41",
        "internetTld": ".ch",
        "drivingSide": "Right",
        "iso2": "CH",
        "iso3": "CHE",
        "isoNumeric": "756",
        "locale": "de-CH",
        "icuLocale": "de_CH",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Period (.) or comma by language context",
        "thousandsSeparator": "Apostrophe (') or space",
        "addressFormat": "Recipient, street house number, postal code locality, Switzerland",
        "postalCodeFormat": "NNNN",
        "primaryTimeZone": "Europe/Zurich (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type J",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112 / 117 / 118 / 144",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "de-CH / fr-CH / it-CH",
        "cldrLocale": "de_CH",
        "metricVsImperial": "Metric-first",
        "administrativeDivisions": [
          "Cantons",
          "Municipalities",
          "Districts in selected cantons"
        ],
        "taxSystem": {
          "name": "Federal Tax Administration / MWST",
          "description": "Swiss tax workflows use UID and MWST/VAT suffixes, canton context, QR-bill payment evidence, salary certificates, and official filing boundaries."
        },
        "licensePlateFormat": "Canton prefix plus serial digits, such as ZH 123456."
      },
      "visualIdentity": {
        "countryId": "switzerland",
        "outlineLabel": "Switzerland outline",
        "mapLabel": "Switzerland in the world",
        "continentBadge": "Europe",
        "flagLabel": "Switzerland flag",
        "heroAccentPrimary": "220 38 38",
        "heroAccentSecondary": "255 255 255",
        "heroAccentTertiary": "17 24 39"
      },
      "localizationExamples": [
        {
          "label": "Date",
          "value": "14.07.2026"
        },
        {
          "label": "Time",
          "value": "14:35"
        },
        {
          "label": "Currency",
          "value": "CHF 1'250.75"
        },
        {
          "label": "Phone",
          "value": "+41 79 123 45 67"
        },
        {
          "label": "Postal code",
          "value": "8001"
        },
        {
          "label": "Address",
          "value": "Bahnhofstrasse 1, 8001 Zurich"
        }
      ],
      "addressExample": {
        "formatted": [
          "Alpine Test AG",
          "Bahnhofstrasse 1",
          "8001 Zurich",
          "Switzerland"
        ],
        "fields": [
          {
            "label": "Street",
            "value": "Bahnhofstrasse",
            "description": "Street name precedes house number in common Swiss address entry."
          },
          {
            "label": "House number",
            "value": "1",
            "description": "House number should remain a separate field where possible."
          },
          {
            "label": "Postal code",
            "value": "8001",
            "description": "Four-digit Swiss postal code."
          },
          {
            "label": "Locality",
            "value": "Zurich",
            "description": "Locality pairs with postal code and canton context."
          }
        ]
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "+41 79 123 45 67",
          "description": "Swiss mobile-style display with +41 country prefix.",
          "tags": [
            "mobile",
            "E.164"
          ]
        },
        {
          "label": "Zurich landline",
          "value": "+41 44 123 45 67",
          "description": "Geographic number display with area-code evidence.",
          "tags": [
            "landline",
            "Zurich"
          ]
        },
        {
          "label": "Domestic display",
          "value": "079 123 45 67",
          "description": "Domestic trunk 0 should be removed when formatting to E.164.",
          "tags": [
            "domestic"
          ]
        }
      ],
      "payments": [
        {
          "name": "CHF",
          "description": "Swiss franc amounts use local grouping and decimal conventions; store API values as decimal or integer rappen.",
          "status": "available",
          "tags": [
            "currency"
          ]
        },
        {
          "name": "QR-bill",
          "description": "Swiss QR-bill payloads combine creditor, account, amount, currency, and structured QR references.",
          "status": "available",
          "tags": [
            "payments",
            "invoice"
          ]
        },
        {
          "name": "SEPA",
          "description": "Switzerland participates in SEPA contexts, but local bank and compliance checks remain provider-specific.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "name": "SIC",
          "description": "SIC and BC clearing references support Swiss interbank routing context without proving account ownership.",
          "status": "available",
          "tags": [
            "clearing"
          ]
        }
      ],
      "bankingOverview": [
        {
          "name": "Swiss IBAN",
          "description": "CH IBANs are 21 characters and expose country, check digits, clearing/account evidence, and MOD-97 proof.",
          "status": "available",
          "tags": [
            "IBAN"
          ]
        },
        {
          "name": "BIC / SWIFT",
          "description": "BIC values provide routing syntax and CH/LI country-code evidence, not live bank status.",
          "status": "available",
          "tags": [
            "BIC"
          ]
        },
        {
          "name": "BC / SIC clearing",
          "description": "Swiss bank clearing numbers are useful for payment routing and account-intake diagnostics.",
          "status": "available",
          "tags": [
            "clearing"
          ]
        }
      ],
      "officialResources": [
        {
          "title": "Federal Statistical Office",
          "note": "Country, canton, municipality, and statistical reference context.",
          "status": "available",
          "tags": [
            "statistics"
          ]
        },
        {
          "title": "Federal Tax Administration",
          "note": "MWST/VAT, tax forms, and regulated tax status remain official-system matters.",
          "status": "available",
          "tags": [
            "tax"
          ]
        },
        {
          "title": "Fedpol / identity context",
          "note": "Identity documents and passport status require official processes; ValidoHub only inspects structure.",
          "status": "available",
          "tags": [
            "identity"
          ]
        },
        {
          "title": "SIX / QR-bill references",
          "note": "QR-bill and Swiss payment standards should be checked against official payment specifications for production.",
          "status": "available",
          "tags": [
            "payments"
          ]
        },
        {
          "title": "Zefix",
          "note": "Company existence, names, legal forms, and registry status require official Zefix or cantonal registry lookup.",
          "status": "available",
          "tags": [
            "company"
          ]
        }
      ],
      "integrationChecklist": [
        "Normalize UID and VAT suffixes before storing company identifiers.",
        "Treat AHV/AVS as sensitive personal data and mask it in logs.",
        "Run Swiss IBAN MOD-97 locally, then use official bank or payment systems for ownership/status.",
        "Keep QR-bill references and QR payloads layout-safe in forms and PDFs.",
        "Store canton as a structured two-letter code when address, tax, payroll, or vehicle workflows need it.",
        "Support de-CH, fr-CH, it-CH, and neutral API formats without localizing route slugs."
      ],
      "validationRules": [
        {
          "name": "UID",
          "description": "CHE plus nine digits, optionally displayed with MWST, TVA, or IVA for VAT contexts."
        },
        {
          "name": "AHV/AVS",
          "description": "Thirteen digits beginning with 756 and using an EAN-style check digit."
        },
        {
          "name": "Swiss IBAN",
          "description": "CH or LI plus 19 alphanumeric characters with ISO MOD-97 validation."
        },
        {
          "name": "QR reference",
          "description": "Twenty-seven digits with recursive MOD-10 control digit."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating UID syntax as registry proof",
          "text": "A valid-looking UID does not prove active company status."
        },
        {
          "title": "Logging AHV/AVS raw values",
          "text": "Swiss social insurance numbers are sensitive and should be masked in diagnostics."
        },
        {
          "title": "Mixing locale separators",
          "text": "Swiss German, French, Italian, and API numeric formats need explicit handling."
        },
        {
          "title": "Using raw QR payloads as select labels",
          "text": "Long QR-bill payloads must stay inside inputs or local scroll containers."
        }
      ],
      "highlights": [
        {
          "title": "Premium browser-only suite",
          "text": "58 Swiss workbenches run locally with no server calls."
        },
        {
          "title": "Payment-grade diagnostics",
          "text": "IBAN, QR-bill, ESR, SIC, BIC, CHF, and reconciliation helpers expose field breakdowns."
        },
        {
          "title": "Privacy-first Swiss workflows",
          "text": "FADP/GDPR redaction, AHV masking, PII masking, and fixture generation are included."
        }
      ],
      "developerNotes": [
        {
          "title": "Official-system boundary",
          "text": "Use ValidoHub for local evidence and official Swiss systems for legal status, identity proof, registry state, and tax filing."
        },
        {
          "title": "Locale scope",
          "text": "Swiss production systems often need de-CH, fr-CH, it-CH, and neutral ISO/API formatting in the same product."
        },
        {
          "title": "Payment data handling",
          "text": "QR-bill payloads, IBANs, references, and amount strings can become long; wrap and scroll locally."
        }
      ],
      "developerExamples": [
        {
          "language": "JavaScript",
          "code": "const swissPayload = { locale: 'de-CH', uid: 'CHE-123.456.789 MWST', iban: 'CH9300762011623852957' };"
        },
        {
          "language": "JSON",
          "code": "{ \"country\": \"CH\", \"currency\": \"CHF\", \"postalCode\": \"8001\", \"canton\": \"ZH\" }"
        }
      ],
      "jsonExamples": [
        {
          "title": "Swiss company fixture",
          "value": {
            "country": "CH",
            "uid": "CHE-123.456.789 MWST",
            "iban": "CH9300762011623852957",
            "canton": "ZH",
            "locale": "de-CH"
          }
        }
      ],
      "localizationNotes": [
        {
          "title": "Language variants",
          "text": "Use de-CH, fr-CH, and it-CH examples where customer-facing copy or address display depends on language."
        },
        {
          "title": "Currency",
          "text": "CHF values can use apostrophe grouping in Swiss German contexts and should be normalized for APIs."
        },
        {
          "title": "Dates",
          "text": "DD.MM.YYYY is common, while APIs should use ISO 8601."
        }
      ],
      "ecosystem": [
        {
          "title": "Company identity",
          "text": "UID, Zefix, MWST suffix, address, and canton evidence form the company onboarding cluster."
        },
        {
          "title": "Payments",
          "text": "Swiss IBAN, SIC/BC, BIC, QR-bill, ESR references, CHF amounts, and reconciliation evidence form the payment cluster."
        },
        {
          "title": "Personal data",
          "text": "AHV/AVS, phone, health insurance, address, and document references require privacy-aware handling."
        }
      ],
      "plannedWorkbenches": []
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
      "status": "available",
      "featured": true,
      "reference": true,
      "summary": "Premium developer intelligence for French identifiers, SIREN/SIRET, TVA, RIB/IBAN, NIR boundaries, postal formats, payments, locale conventions, privacy-safe fixtures, and offline validation workflows.",
      "identifiers": [
        "SIREN",
        "SIRET",
        "NIC",
        "TVA",
        "NIR",
        "APE/NAF",
        "EORI",
        "RCS",
        "RM",
        "INSEE commune"
      ],
      "payments": [
        "IBAN",
        "RIB",
        "BIC",
        "SEPA",
        "RUM",
        "EUR",
        "Remittance"
      ],
      "features": [
        "banking",
        "business",
        "commerce",
        "customs",
        "data-quality",
        "developer",
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
        "SIREN Validator & Explainer",
        "SIRET Validator & Explainer",
        "NIC Establishment Code Inspector",
        "French VAT / TVA Validator",
        "French EORI Validator",
        "APE / NAF Code Inspector",
        "RCS Number Helper",
        "Répertoire des Métiers Helper",
        "Company Onboarding Auditor",
        "Sirene Lookup Readiness Helper",
        "French IBAN Validator",
        "RIB Validator & Explainer",
        "French Bank Code Inspector",
        "French BIC / SWIFT Inspector",
        "SEPA Transfer Helper",
        "SEPA Direct Debit RUM Helper",
        "French Remittance Text Builder",
        "Masked IBAN Formatter",
        "Bank Statement Parser",
        "Payment Reconciliation Helper",
        "French Postal Code Validator",
        "INSEE Commune Code Inspector",
        "Department Code Inspector",
        "Region Code Mapper",
        "CEDEX Address Formatter",
        "French Address Normalizer",
        "Address Transliteration Normalizer",
        "French Phone Number Validator",
        "French Phone E.164 Formatter",
        "French Date / Locale Formatter",
        "VAT Rate Sanity Helper",
        "French Invoice Number Helper",
        "E-Invoicing Readiness Helper",
        "PDP / PPF Readiness Helper",
        "FEC File Readiness Checker",
        "Audit Trail Checklist Generator",
        "GDPR Redaction Helper",
        "French PII Masker",
        "France Data Quality Workbench",
        "Compliance Checklist Generator",
        "NIR Syntax Inspector",
        "NIR Key Validator",
        "NIR Masker",
        "French Passport Number Helper",
        "French ID Card Format Helper",
        "Birth Data Consistency Helper",
        "Health Insurance Boundary Helper",
        "Personal Data Fixture Generator",
        "French License Plate Inspector",
        "VIN Validator for France Workflows",
        "Crit'Air Readiness Helper",
        "Carte Grise Field Helper",
        "Driving Licence Format Helper",
        "Vehicle Data Redaction Helper",
        "Municipality / Department Plate Helper",
        "French Document OCR Fixer",
        "French CSV Locale Normalizer",
        "EUR Decimal / Currency Formatter",
        "French Accent Normalizer",
        "French Slug Normalizer",
        "French JSON Fixture Generator",
        "French Regex Pack Helper",
        "French API Payload Auditor",
        "French Form Field Auditor"
      ],
      "plannedWorkbenches": [],
      "completion": 95,
      "coordinates": {
        "x": 49,
        "y": 36
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
      "language": "German",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Germany developer hub for tax identifiers, banking, accounting, locale formats, privacy, vehicles, and browser-only data-quality workflows.",
      "identifiers": [
        "IdNr",
        "Steuernummer",
        "USt-IdNr",
        "EORI",
        "Handelsregister",
        "BLZ",
        "IBAN",
        "PLZ"
      ],
      "payments": [
        "SEPA",
        "German IBAN",
        "BLZ",
        "BIC/SWIFT",
        "Girocard",
        "XRechnung",
        "ZUGFeRD"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "German Tax ID / IdNr Validator",
        "German Steuernummer Format Helper",
        "German USt-IdNr / VAT Validator",
        "German EORI / Customs Identifier Helper",
        "German Handelsregister Readiness Helper",
        "German LEI Context Helper",
        "German Company Onboarding Auditor",
        "German ELSTER Readiness Helper",
        "German Finanzamt Field Helper",
        "German IBAN Validator",
        "German BLZ Bank Code Inspector",
        "German BIC / SWIFT Inspector",
        "German SEPA Transfer Helper",
        "German SEPA Direct Debit Mandate Helper",
        "German Girocard Routing Helper",
        "German Remittance Text Builder",
        "German Payment Reconciliation Helper",
        "German Bank Statement Parser",
        "German Masked IBAN Formatter",
        "German EUR Decimal Currency Formatter",
        "German VAT Rate Sanity Helper",
        "German VAT Return Field Helper",
        "German Invoice Number Helper",
        "German XRechnung Readiness Helper",
        "German ZUGFeRD Readiness Helper",
        "German E-Invoicing Readiness Helper",
        "German DATEV Export Readiness Checker",
        "German GoBD Audit Trail Checklist Generator",
        "German SKR03 / SKR04 Account Code Helper",
        "German Payroll Social Security Helper",
        "German Wage Tax Readiness Helper",
        "German Health Insurance Boundary Helper",
        "German Address Normalizer",
        "German Address Transliteration Normalizer",
        "German Postal Code Validator",
        "German Federal State Code Mapper",
        "German Municipality Code Inspector",
        "German Phone Number Validator",
        "German Phone E.164 Formatter",
        "German Date Locale Formatter",
        "German CSV Locale Normalizer",
        "German Slug Normalizer",
        "German Document OCR Fixer",
        "German PII Masker",
        "German GDPR / DSGVO Redaction Helper",
        "German Personal Data Fixture Generator",
        "German ID Card Format Helper",
        "German Passport Number Helper",
        "German Driving Licence Format Helper",
        "German Residence Permit Format Helper",
        "German Vehicle Plate Inspector",
        "German VIN Validator",
        "German Vehicle Data Redaction Helper",
        "German Customs Declaration Helper",
        "German Postal Tracking Helper",
        "German Data Quality Workbench",
        "German JSON Fixture Generator",
        "German Regex Pack Helper",
        "German API Payload Auditor",
        "German Form Field Auditor"
      ],
      "plannedWorkbenches": [
        "Live Handelsregister lookup",
        "Live VIES status lookup",
        "Live bank directory lookup",
        "Live postal delivery verification"
      ],
      "completion": 100,
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
      "status": "available",
      "featured": true,
      "reference": true,
      "summary": "Premium developer intelligence for Dutch BSN, RSIN, KVK, BTW, EORI, IBAN, iDEAL, SEPA, postcode, BAG address, phone, locale, AVG privacy, audit-file, and offline validation workflows.",
      "identifiers": [
        "BAG",
        "BSN",
        "BTW",
        "DigiD",
        "EORI",
        "KVK",
        "RDW",
        "RSIN",
        "UBO"
      ],
      "payments": [
        "BIC",
        "EUR",
        "IBAN",
        "Mandate",
        "Remittance",
        "SEPA",
        "iDEAL"
      ],
      "features": [
        "address",
        "banking",
        "business",
        "data-quality",
        "developer",
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
        "Audit File Readiness Checker",
        "Audit Trail Checklist Generator",
        "AVG / GDPR Redaction Helper",
        "BAG Address Readiness Helper",
        "Bank Statement Parser",
        "BSN Masker",
        "BSN Validator & Explainer",
        "Company Onboarding Auditor",
        "Compliance Checklist Generator",
        "DigiD Boundary Helper",
        "Driving Licence Format Helper",
        "Dutch Address Normalizer",
        "Dutch Address Transliteration Normalizer",
        "Dutch API Payload Auditor",
        "Dutch Bank Code Inspector",
        "Dutch BIC / SWIFT Inspector",
        "Dutch BTW / VAT Validator",
        "Dutch BTW Rate Sanity Helper",
        "Dutch CSV Locale Normalizer",
        "Dutch Date / Locale Formatter",
        "Dutch Document OCR Fixer",
        "Dutch EAN / GS1 Code Inspector",
        "Dutch Email Domain Fixture Helper",
        "Dutch EORI Validator",
        "Dutch Form Field Auditor",
        "Dutch IBAN Validator",
        "Dutch ID Card Format Helper",
        "Dutch Invoice Number Helper",
        "Dutch JSON Fixture Generator",
        "Dutch License Plate Inspector",
        "Dutch Passport Number Helper",
        "Dutch Phone E.164 Formatter",
        "Dutch Phone Number Validator",
        "Dutch PII Masker",
        "Dutch Postcode Validator",
        "Dutch Regex Pack Helper",
        "Dutch Remittance Text Builder",
        "Dutch Slug Normalizer",
        "E-Invoicing Readiness Helper",
        "EUR Decimal / Currency Formatter",
        "Health Insurance Boundary Helper",
        "House Number Addition Helper",
        "iDEAL Payment Reference Helper",
        "KVK Branch Number Helper",
        "KVK Number Validator",
        "Masked IBAN Formatter",
        "Municipality Code Inspector",
        "Netherlands Data Quality Workbench",
        "Payment Reconciliation Helper",
        "Payroll Tax Number Helper",
        "Peppol Readiness Helper",
        "Personal Data Fixture Generator",
        "PostNL Tracking Helper",
        "Province Code Mapper",
        "RDW Vehicle Data Redaction Helper",
        "RSIN Validator & Explainer",
        "RVO Relation Number Helper",
        "SEPA Direct Debit Mandate Helper",
        "SEPA Transfer Helper",
        "UBO Readiness Helper",
        "VAT Return Field Helper",
        "VIN Validator for Netherlands Workflows",
        "Wage Tax Readiness Helper"
      ],
      "plannedWorkbenches": [],
      "completion": 95,
      "coordinates": {
        "x": 49,
        "y": 35
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
      "id": "switzerland",
      "flag": "🇨🇭",
      "name": "Switzerland",
      "iso2": "CH",
      "iso3": "CHE",
      "continent": "Europe",
      "region": "Europe",
      "language": "German, French, Italian, Romansh",
      "currency": "CHF",
      "currencyName": "Swiss franc",
      "status": "available",
      "featured": true,
      "reference": true,
      "summary": "Premium developer intelligence for Swiss UID, MWST/VAT, AHV/AVS, IBAN, QR-bill, ESR, SIC clearing, BIC, postal, canton, phone, FADP privacy, vehicle, payroll, tax, and locale workflows.",
      "identifiers": [
        "AHV/AVS",
        "BIC",
        "Canton",
        "EORI",
        "ESR",
        "IBAN",
        "MWST",
        "QR reference",
        "SIC/BC",
        "UID",
        "VIN"
      ],
      "payments": [
        "BIC",
        "CHF",
        "ESR",
        "IBAN",
        "QR-bill",
        "SEPA",
        "SIC"
      ],
      "features": [
        "address",
        "banking",
        "business",
        "data-quality",
        "developer",
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
        "AHV / AVS Number Validator",
        "Audit Trail Checklist Generator",
        "CHF Amount Formatter",
        "Canton Code Mapper",
        "Customs Declaration Helper",
        "Driving Licence Format Helper",
        "ESR Reference Checker",
        "FADP / GDPR Redaction Helper",
        "Health Insurance Boundary Helper",
        "Insurance Policy Number Helper",
        "MWST Rate Sanity Helper",
        "Multilingual Address Helper",
        "Municipality Code Inspector",
        "Payroll Social Security Helper",
        "Personal Data Fixture Generator",
        "Residence Permit Format Helper",
        "SIC / BC Number Inspector",
        "Salary Certificate Field Helper",
        "Swiss API Payload Auditor",
        "Swiss Address Normalizer",
        "Swiss Address Transliteration Normalizer",
        "Swiss BIC / SWIFT Inspector",
        "Swiss Bank Statement Parser",
        "Swiss CSV Locale Normalizer",
        "Swiss Company Onboarding Auditor",
        "Swiss Compliance Checklist Generator",
        "Swiss Data Quality Workbench",
        "Swiss Date / Locale Formatter",
        "Swiss Decimal / Currency Formatter",
        "Swiss Document OCR Fixer",
        "Swiss E-Invoicing Readiness Helper",
        "Swiss EORI / Customs Identifier Helper",
        "Swiss Form Field Auditor",
        "Swiss IBAN Validator",
        "Swiss ID Card Format Helper",
        "Swiss Invoice Number Helper",
        "Swiss JSON Fixture Generator",
        "Swiss PII Masker",
        "Swiss Passport Number Helper",
        "Swiss Payment Reconciliation Helper",
        "Swiss Phone E.164 Formatter",
        "Swiss Phone Number Validator",
        "Swiss Post Tracking Helper",
        "Swiss Postal Code Validator",
        "Swiss QR-Bill Payload Auditor",
        "Swiss QR-Bill Reference Validator",
        "Swiss Regex Pack Helper",
        "Swiss SEPA Transfer Helper",
        "Swiss Slug Normalizer",
        "Swiss UID Validator & Explainer",
        "Swiss VAT / MWST Validator",
        "Swiss VAT Return Field Helper",
        "Swiss Vehicle Plate Inspector",
        "Tax ID Boundary Helper",
        "VIN Validator for Swiss Workflows",
        "Vehicle Data Redaction Helper",
        "Withholding Tax Readiness Helper",
        "Zefix Readiness Helper"
      ],
      "plannedWorkbenches": [],
      "completion": 96,
      "coordinates": {
        "x": 50,
        "y": 36
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
