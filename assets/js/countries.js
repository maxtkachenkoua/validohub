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
    "austria": {
      "outlineSrc": "/assets/images/countries/austria-outline.svg",
      "outlineAlt": "Austria country outline",
      "mapSrc": "/assets/images/countries/austria-location.svg",
      "mapAlt": "World map with Austria location marker",
      "mapMarker": {
        "x": 50,
        "y": 58,
        "label": "Austria"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
    "belgium": {
      "outlineSrc": "/assets/images/countries/belgium-outline.svg",
      "outlineAlt": "Belgium country outline",
      "mapSrc": "/assets/images/countries/belgium-location.svg",
      "mapAlt": "World map with Belgium location marker",
      "mapMarker": {
        "x": 47,
        "y": 52,
        "label": "Belgium"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
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
    "czechia": {
      "outlineSrc": "/assets/images/countries/czechia-outline.svg",
      "outlineAlt": "Czechia country outline",
      "mapSrc": "/assets/images/countries/czechia-location.svg",
      "mapAlt": "World map with Czechia location marker",
      "mapMarker": {
        "x": 51,
        "y": 55,
        "label": "Czechia"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
    "denmark": {
      "outlineSrc": "/assets/images/countries/denmark-outline.svg",
      "outlineAlt": "Denmark country outline",
      "mapSrc": "/assets/images/countries/denmark-location.svg",
      "mapAlt": "World map with Denmark location marker",
      "mapMarker": {
        "x": 51,
        "y": 45,
        "label": "Denmark"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
    "finland": {
      "outlineSrc": "/assets/images/countries/finland-outline.svg",
      "outlineAlt": "Finland country outline",
      "mapSrc": "/assets/images/countries/finland-location.svg",
      "mapAlt": "World map with Finland location marker",
      "mapMarker": {
        "x": 58,
        "y": 32,
        "label": "Finland"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
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
    "ireland": {
      "outlineSrc": "/assets/images/countries/ireland-outline.svg",
      "outlineAlt": "Ireland country outline",
      "mapSrc": "/assets/images/countries/ireland-location.svg",
      "mapAlt": "World map with Ireland location marker",
      "mapMarker": {
        "x": 42,
        "y": 49,
        "label": "Ireland"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
    "italy": {
      "outlineSrc": "/assets/images/countries/italy-outline.svg",
      "outlineAlt": "Italy country outline",
      "mapSrc": "/assets/images/countries/italy-location.svg",
      "mapAlt": "World map with Italy location marker",
      "mapMarker": {
        "x": 50,
        "y": 44,
        "label": "Italy"
      },
      "source": "Natural Earth geometry via ValidoHub world-map source"
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
    "norway": {
      "outlineSrc": "/assets/images/countries/norway-outline.svg",
      "outlineAlt": "Norway country outline",
      "mapSrc": "/assets/images/countries/norway-location.svg",
      "mapAlt": "World map with Norway location marker",
      "mapMarker": {
        "x": 52,
        "y": 34,
        "label": "Norway"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
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
    "portugal": {
      "outlineSrc": "/assets/images/countries/portugal-outline.svg",
      "outlineAlt": "Portugal country outline",
      "mapSrc": "/assets/images/countries/portugal-location.svg",
      "mapAlt": "World map with Portugal location marker",
      "mapMarker": {
        "x": 38,
        "y": 62,
        "label": "Portugal"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
    },
    "romania": {
      "outlineSrc": "/assets/images/countries/romania-outline.svg",
      "outlineAlt": "Romania country outline",
      "mapSrc": "/assets/images/countries/romania-location.svg",
      "mapAlt": "World map with Romania location marker",
      "mapMarker": {
        "x": 58,
        "y": 62,
        "label": "Romania"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
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
    "sweden": {
      "outlineSrc": "/assets/images/countries/sweden-outline.svg",
      "outlineAlt": "Sweden country outline",
      "mapSrc": "/assets/images/countries/sweden-location.svg",
      "mapAlt": "World map with Sweden location marker",
      "mapMarker": {
        "x": 55,
        "y": 38,
        "label": "Sweden"
      },
      "source": "Simplified generated geographic reference for ValidoHub country navigation"
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
    "austria": {
      "flag": "🇦🇹",
      "name": "Austria",
      "badge": "Premium Austria developer suite",
      "description": "Developer intelligence and browser-only workbenches for austrian identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Osterreich",
        "population": "approximately 9.2M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Vienna",
        "continent": "Europe",
        "region": "Central Europe / European Union",
        "languages": "German",
        "currency": "Euro",
        "currencyCode": "EUR",
        "callingCode": "+43",
        "internetTld": ".at",
        "drivingSide": "Right",
        "iso2": "AT",
        "iso3": "AUT",
        "isoNumeric": "040",
        "locale": "de-AT",
        "icuLocale": "de_AT",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street, number, postal code, locality, Austria",
        "postalCodeFormat": "Postleitzahl",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "de-AT",
        "cldrLocale": "de_AT",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "austria",
        "outlineLabel": "Austria outline",
        "mapLabel": "Austria in the world",
        "continentBadge": "Europe",
        "flagLabel": "Austria flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "SVNR and Firmenbuchnummer",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "UID / USt and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Austria registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /austria/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Dot (.) rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Austrian examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Firmenbuch",
          "text": "Official business registry or company lookup remains the source of truth for Austria.",
          "status": "official boundary"
        },
        {
          "title": "UID / USt",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / DSG",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "Steuernummer, UID, SVNR, Firmenbuchnummer, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, SEPA, SWIFT, EPS handoff, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "de-AT / de_AT; date DD.MM.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "EUR amounts use Comma (,) and Dot (.).",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "SVNR, Firmenbuchnummer, Postleitzahl, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Austrian SVNR Validator",
          "href": "/en/austria/austria-svnr-validator/",
          "text": "Validate SVNR shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Austrian Firmenbuchnummer Validator",
          "href": "/en/austria/austria-firmenbuchnummer-validator/",
          "text": "Inspect Firmenbuchnummer structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Austrian VAT ID / AT Prefix Validator",
          "href": "/en/austria/austria-vat-id-validator/",
          "text": "Normalize AT VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Austrian EORI / Customs Identifier Helper",
          "href": "/en/austria/austria-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Austrian Sozialversicherungsnummer Helper",
          "href": "/en/austria/austria-sozialversicherungsnummer-social-insurance-helper/",
          "text": "Split Sozialversicherungsnummer evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Austrian Company Onboarding Auditor",
          "href": "/en/austria/austria-company-onboarding-auditor/",
          "text": "Audit company intake payloads for Firmenbuchnummer, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Austrian Firmenbuch Readiness Helper",
          "href": "/en/austria/austria-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Firmenbuch lookup or company registry workflow."
        },
        {
          "title": "Austrian ID Card Format Helper",
          "href": "/en/austria/austria-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Austrian Passport Number Helper",
          "href": "/en/austria/austria-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Austrian MRZ / Passport Parser",
          "href": "/en/austria/austria-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Austria IBAN Validator",
          "href": "/en/austria/austria-iban-validator/",
          "text": "Validate AT IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Austria IBAN Generator",
          "href": "/en/austria/austria-iban-generator/",
          "text": "Generate AT IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Austrian Domestic Bank Account Inspector",
          "href": "/en/austria/austria-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Austrian BIC / SWIFT Inspector",
          "href": "/en/austria/austria-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Austria banking integrations."
        },
        {
          "title": "Austrian SEPA Transfer Helper",
          "href": "/en/austria/austria-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Austrian SEPA Direct Debit Mandate Helper",
          "href": "/en/austria/austria-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Austrian EPS / SEPA Reference Helper",
          "href": "/en/austria/austria-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Austrian Remittance Text Builder",
          "href": "/en/austria/austria-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Austrian Payment Reconciliation Helper",
          "href": "/en/austria/austria-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Austrian Bank Statement Parser",
          "href": "/en/austria/austria-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Austrian Masked IBAN Formatter",
          "href": "/en/austria/austria-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Austrian EUR Decimal Currency Formatter",
          "href": "/en/austria/austria-currency-decimal-formatter/",
          "text": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Austrian VAT Rate Sanity Helper",
          "href": "/en/austria/austria-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Austrian VAT Return Field Helper",
          "href": "/en/austria/austria-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Austrian Invoice Number Helper",
          "href": "/en/austria/austria-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Austrian E-Rechnung / ebInterface Readiness Checker",
          "href": "/en/austria/austria-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Austrian Tax Authority Handoff Helper",
          "href": "/en/austria/austria-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Austrian Accounting Audit Trail Checklist Helper",
          "href": "/en/austria/austria-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Austrian Postal Code Validator",
          "href": "/en/austria/austria-postal-code-validator/",
          "text": "Validate Postleitzahl shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Austrian Address Normalizer",
          "href": "/en/austria/austria-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Austrian Address Transliteration Normalizer",
          "href": "/en/austria/austria-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Austrian Region / Province Code Mapper",
          "href": "/en/austria/austria-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Austrian Municipality Code Inspector",
          "href": "/en/austria/austria-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Austrian Phone Number Validator",
          "href": "/en/austria/austria-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Austrian Phone E.164 Formatter",
          "href": "/en/austria/austria-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Austrian Date Locale Formatter",
          "href": "/en/austria/austria-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Austrian CSV Locale Normalizer",
          "href": "/en/austria/austria-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Austria decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Austrian Slug Normalizer",
          "href": "/en/austria/austria-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Austrian Document OCR Fixer",
          "href": "/en/austria/austria-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Austrian GDPR / DSG Redaction Helper",
          "href": "/en/austria/austria-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Austrian PII Masker",
          "href": "/en/austria/austria-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Austrian Personal Data Fixture Helper",
          "href": "/en/austria/austria-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Austrian Driving Licence Format Helper",
          "href": "/en/austria/austria-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Austrian Residence Permit Format Helper",
          "href": "/en/austria/austria-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Austrian Health Card Format Helper",
          "href": "/en/austria/austria-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Austrian Vehicle Plate Inspector",
          "href": "/en/austria/austria-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Austrian VIN Validator",
          "href": "/en/austria/austria-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Austrian Vehicle Data Redaction Helper",
          "href": "/en/austria/austria-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Austrian Customs Declaration Helper",
          "href": "/en/austria/austria-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Austrian Postal Tracking Helper",
          "href": "/en/austria/austria-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Austrian Data Quality Workbench",
          "href": "/en/austria/austria-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Austrian JSON Fixture Helper",
          "href": "/en/austria/austria-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Austrian Regex Pack Helper",
          "href": "/en/austria/austria-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Austrian API Payload Auditor",
          "href": "/en/austria/austria-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Austrian Form Field Auditor",
          "href": "/en/austria/austria-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Austrian Locale Number Parser",
          "href": "/en/austria/austria-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Austria."
        },
        {
          "title": "Austrian Calendar Week Helper",
          "href": "/en/austria/austria-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Austrian Company Suffix Normalizer",
          "href": "/en/austria/austria-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Austrian Procurement Identifier Helper",
          "href": "/en/austria/austria-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Austrian Locale Copy Checker",
          "href": "/en/austria/austria-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Austrian Support Ticket Scrubber",
          "href": "/en/austria/austria-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Austrian Integration Smoke Test Builder",
          "href": "/en/austria/austria-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "belgium": {
      "flag": "🇧🇪",
      "name": "Belgium",
      "badge": "Premium Belgium developer suite",
      "description": "Developer intelligence and browser-only workbenches for belgian identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Belgique / Belgie",
        "population": "approximately 11.8M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Brussels",
        "continent": "Europe",
        "region": "Western Europe / European Union",
        "languages": "Dutch, French, and German",
        "currency": "Euro",
        "currencyCode": "EUR",
        "callingCode": "+32",
        "internetTld": ".be",
        "drivingSide": "Right",
        "iso2": "BE",
        "iso3": "BEL",
        "isoNumeric": "056",
        "locale": "nl-BE",
        "icuLocale": "nl_BE",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot or space grouping",
        "addressFormat": "Street, number, postal code, locality, Belgium",
        "postalCodeFormat": "postcode / code postal",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "nl-BE",
        "cldrLocale": "nl_BE",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "belgium",
        "outlineLabel": "Belgium outline",
        "mapLabel": "Belgium in the world",
        "continentBadge": "Europe",
        "flagLabel": "Belgium flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "RRN / NISS and KBO / BCE",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "BTW / TVA and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Belgium registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /belgium/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Dot or space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Belgian examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "KBO / BCE register",
          "text": "Official business registry or company lookup remains the source of truth for Belgium.",
          "status": "official boundary"
        },
        {
          "title": "BTW / TVA",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / APD-GBA",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "National Register Number, BIS, KBO/BCE, VAT, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, SEPA, SWIFT, structured communication, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "nl-BE / nl_BE; date DD/MM/YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "EUR amounts use Comma (,) and Dot or space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "RRN / NISS, KBO / BCE, postcode / code postal, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Belgian RRN / NISS Validator",
          "href": "/en/belgium/belgium-rrn-niss-validator/",
          "text": "Validate RRN / NISS shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Belgian KBO / BCE Validator",
          "href": "/en/belgium/belgium-kbo-bce-validator/",
          "text": "Inspect KBO / BCE structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Belgian VAT ID / BE Prefix Validator",
          "href": "/en/belgium/belgium-vat-id-validator/",
          "text": "Normalize BE VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Belgian EORI / Customs Identifier Helper",
          "href": "/en/belgium/belgium-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Belgian BIS number Helper",
          "href": "/en/belgium/belgium-bis-number-social-insurance-helper/",
          "text": "Split BIS number evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Belgian Company Onboarding Auditor",
          "href": "/en/belgium/belgium-company-onboarding-auditor/",
          "text": "Audit company intake payloads for KBO / BCE, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Belgian KBO / BCE register Readiness Helper",
          "href": "/en/belgium/belgium-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated KBO / BCE register lookup or company registry workflow."
        },
        {
          "title": "Belgian ID Card Format Helper",
          "href": "/en/belgium/belgium-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Belgian Passport Number Helper",
          "href": "/en/belgium/belgium-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Belgian MRZ / Passport Parser",
          "href": "/en/belgium/belgium-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Belgium IBAN Validator",
          "href": "/en/belgium/belgium-iban-validator/",
          "text": "Validate BE IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Belgium IBAN Generator",
          "href": "/en/belgium/belgium-iban-generator/",
          "text": "Generate BE IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Belgian Domestic Bank Account Inspector",
          "href": "/en/belgium/belgium-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Belgian BIC / SWIFT Inspector",
          "href": "/en/belgium/belgium-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Belgium banking integrations."
        },
        {
          "title": "Belgian SEPA Transfer Helper",
          "href": "/en/belgium/belgium-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Belgian SEPA Direct Debit Mandate Helper",
          "href": "/en/belgium/belgium-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Belgian OGM structured communication Reference Helper",
          "href": "/en/belgium/belgium-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Belgian Remittance Text Builder",
          "href": "/en/belgium/belgium-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Belgian Payment Reconciliation Helper",
          "href": "/en/belgium/belgium-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Belgian Bank Statement Parser",
          "href": "/en/belgium/belgium-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Belgian Masked IBAN Formatter",
          "href": "/en/belgium/belgium-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Belgian EUR Decimal Currency Formatter",
          "href": "/en/belgium/belgium-currency-decimal-formatter/",
          "text": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Belgian VAT Rate Sanity Helper",
          "href": "/en/belgium/belgium-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Belgian VAT Return Field Helper",
          "href": "/en/belgium/belgium-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Belgian Invoice Number Helper",
          "href": "/en/belgium/belgium-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Belgian Peppol / e-invoicing Readiness Checker",
          "href": "/en/belgium/belgium-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Belgian Tax Authority Handoff Helper",
          "href": "/en/belgium/belgium-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Belgian Accounting Audit Trail Checklist Helper",
          "href": "/en/belgium/belgium-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Belgian Postal Code Validator",
          "href": "/en/belgium/belgium-postal-code-validator/",
          "text": "Validate postcode / code postal shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Belgian Address Normalizer",
          "href": "/en/belgium/belgium-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Belgian Address Transliteration Normalizer",
          "href": "/en/belgium/belgium-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Belgian Region / Province Code Mapper",
          "href": "/en/belgium/belgium-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Belgian Municipality Code Inspector",
          "href": "/en/belgium/belgium-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Belgian Phone Number Validator",
          "href": "/en/belgium/belgium-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Belgian Phone E.164 Formatter",
          "href": "/en/belgium/belgium-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Belgian Date Locale Formatter",
          "href": "/en/belgium/belgium-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Belgian CSV Locale Normalizer",
          "href": "/en/belgium/belgium-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Belgium decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Belgian Slug Normalizer",
          "href": "/en/belgium/belgium-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Belgian Document OCR Fixer",
          "href": "/en/belgium/belgium-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Belgian GDPR / APD-GBA Redaction Helper",
          "href": "/en/belgium/belgium-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Belgian PII Masker",
          "href": "/en/belgium/belgium-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Belgian Personal Data Fixture Helper",
          "href": "/en/belgium/belgium-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Belgian Driving Licence Format Helper",
          "href": "/en/belgium/belgium-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Belgian Residence Permit Format Helper",
          "href": "/en/belgium/belgium-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Belgian Health Card Format Helper",
          "href": "/en/belgium/belgium-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Belgian Vehicle Plate Inspector",
          "href": "/en/belgium/belgium-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Belgian VIN Validator",
          "href": "/en/belgium/belgium-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Belgian Vehicle Data Redaction Helper",
          "href": "/en/belgium/belgium-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Belgian Customs Declaration Helper",
          "href": "/en/belgium/belgium-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Belgian Postal Tracking Helper",
          "href": "/en/belgium/belgium-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Belgian Data Quality Workbench",
          "href": "/en/belgium/belgium-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Belgian JSON Fixture Helper",
          "href": "/en/belgium/belgium-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Belgian Regex Pack Helper",
          "href": "/en/belgium/belgium-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Belgian API Payload Auditor",
          "href": "/en/belgium/belgium-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Belgian Form Field Auditor",
          "href": "/en/belgium/belgium-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Belgian Locale Number Parser",
          "href": "/en/belgium/belgium-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Belgium."
        },
        {
          "title": "Belgian Calendar Week Helper",
          "href": "/en/belgium/belgium-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Belgian Company Suffix Normalizer",
          "href": "/en/belgium/belgium-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Belgian Procurement Identifier Helper",
          "href": "/en/belgium/belgium-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Belgian Locale Copy Checker",
          "href": "/en/belgium/belgium-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Belgian Support Ticket Scrubber",
          "href": "/en/belgium/belgium-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Belgian Integration Smoke Test Builder",
          "href": "/en/belgium/belgium-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
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
    "czechia": {
      "flag": "🇨🇿",
      "name": "Czechia",
      "badge": "Premium Czechia developer suite",
      "description": "Developer intelligence and browser-only workbenches for czech identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Cesko",
        "population": "approximately 10.9M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Prague",
        "continent": "Europe",
        "region": "Central Europe / European Union",
        "languages": "Czech",
        "currency": "Czech koruna",
        "currencyCode": "CZK",
        "callingCode": "+420",
        "internetTld": ".cz",
        "drivingSide": "Right",
        "iso2": "CZ",
        "iso3": "CZE",
        "isoNumeric": "203",
        "locale": "cs-CZ",
        "icuLocale": "cs_CZ",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space grouping",
        "addressFormat": "Street, number, postal code, locality, Czechia",
        "postalCodeFormat": "PSC",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "cs-CZ",
        "cldrLocale": "cs_CZ",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "czechia",
        "outlineLabel": "Czechia outline",
        "mapLabel": "Czechia in the world",
        "continentBadge": "Europe",
        "flagLabel": "Czechia flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "Rodne cislo and ICO",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "DIC / DPH and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Czechia registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /czechia/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Czech examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Ares / business register",
          "text": "Official business registry or company lookup remains the source of truth for Czechia.",
          "status": "official boundary"
        },
        {
          "title": "DIC / DPH",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / UOOU",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "Rodne cislo, ICO, DIC, Datova schranka, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, domestic account, SWIFT, variable symbol, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "cs-CZ / cs_CZ; date DD.MM.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "CZK amounts use Comma (,) and Space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "Rodne cislo, ICO, PSC, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Czech Rodne cislo Validator",
          "href": "/en/czechia/czechia-rodne-cislo-validator/",
          "text": "Validate Rodne cislo shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Czech ICO Validator",
          "href": "/en/czechia/czechia-ico-validator/",
          "text": "Inspect ICO structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Czech VAT ID / CZ Prefix Validator",
          "href": "/en/czechia/czechia-vat-id-validator/",
          "text": "Normalize CZ VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Czech EORI / Customs Identifier Helper",
          "href": "/en/czechia/czechia-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Czech social insurance evidence Helper",
          "href": "/en/czechia/czechia-social-insurance-evidence-social-insurance-helper/",
          "text": "Split social insurance evidence evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Czech Company Onboarding Auditor",
          "href": "/en/czechia/czechia-company-onboarding-auditor/",
          "text": "Audit company intake payloads for ICO, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Czech Ares / business register Readiness Helper",
          "href": "/en/czechia/czechia-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Ares / business register lookup or company registry workflow."
        },
        {
          "title": "Czech ID Card Format Helper",
          "href": "/en/czechia/czechia-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Czech Passport Number Helper",
          "href": "/en/czechia/czechia-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Czech MRZ / Passport Parser",
          "href": "/en/czechia/czechia-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Czechia IBAN Validator",
          "href": "/en/czechia/czechia-iban-validator/",
          "text": "Validate CZ IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Czechia IBAN Generator",
          "href": "/en/czechia/czechia-iban-generator/",
          "text": "Generate CZ IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Czech Domestic Bank Account Inspector",
          "href": "/en/czechia/czechia-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Czech BIC / SWIFT Inspector",
          "href": "/en/czechia/czechia-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Czechia banking integrations."
        },
        {
          "title": "Czech SEPA Transfer Helper",
          "href": "/en/czechia/czechia-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Czech SEPA Direct Debit Mandate Helper",
          "href": "/en/czechia/czechia-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Czech variable symbol Reference Helper",
          "href": "/en/czechia/czechia-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Czech Remittance Text Builder",
          "href": "/en/czechia/czechia-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Czech Payment Reconciliation Helper",
          "href": "/en/czechia/czechia-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Czech Bank Statement Parser",
          "href": "/en/czechia/czechia-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Czech Masked IBAN Formatter",
          "href": "/en/czechia/czechia-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Czech CZK Decimal Currency Formatter",
          "href": "/en/czechia/czechia-currency-decimal-formatter/",
          "text": "Normalize CZK amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Czech VAT Rate Sanity Helper",
          "href": "/en/czechia/czechia-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Czech VAT Return Field Helper",
          "href": "/en/czechia/czechia-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Czech Invoice Number Helper",
          "href": "/en/czechia/czechia-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Czech ISDOC / e-invoicing Readiness Checker",
          "href": "/en/czechia/czechia-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Czech Tax Authority Handoff Helper",
          "href": "/en/czechia/czechia-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Czech Accounting Audit Trail Checklist Helper",
          "href": "/en/czechia/czechia-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Czech Postal Code Validator",
          "href": "/en/czechia/czechia-postal-code-validator/",
          "text": "Validate PSC shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Czech Address Normalizer",
          "href": "/en/czechia/czechia-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Czech Address Transliteration Normalizer",
          "href": "/en/czechia/czechia-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Czech Region / Province Code Mapper",
          "href": "/en/czechia/czechia-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Czech Municipality Code Inspector",
          "href": "/en/czechia/czechia-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Czech Phone Number Validator",
          "href": "/en/czechia/czechia-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Czech Phone E.164 Formatter",
          "href": "/en/czechia/czechia-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Czech Date Locale Formatter",
          "href": "/en/czechia/czechia-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Czech CSV Locale Normalizer",
          "href": "/en/czechia/czechia-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Czechia decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Czech Slug Normalizer",
          "href": "/en/czechia/czechia-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Czech Document OCR Fixer",
          "href": "/en/czechia/czechia-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Czech GDPR / UOOU Redaction Helper",
          "href": "/en/czechia/czechia-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Czech PII Masker",
          "href": "/en/czechia/czechia-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Czech Personal Data Fixture Helper",
          "href": "/en/czechia/czechia-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Czech Driving Licence Format Helper",
          "href": "/en/czechia/czechia-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Czech Residence Permit Format Helper",
          "href": "/en/czechia/czechia-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Czech Health Card Format Helper",
          "href": "/en/czechia/czechia-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Czech Vehicle Plate Inspector",
          "href": "/en/czechia/czechia-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Czech VIN Validator",
          "href": "/en/czechia/czechia-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Czech Vehicle Data Redaction Helper",
          "href": "/en/czechia/czechia-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Czech Customs Declaration Helper",
          "href": "/en/czechia/czechia-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Czech Postal Tracking Helper",
          "href": "/en/czechia/czechia-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Czech Data Quality Workbench",
          "href": "/en/czechia/czechia-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Czech JSON Fixture Helper",
          "href": "/en/czechia/czechia-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Czech Regex Pack Helper",
          "href": "/en/czechia/czechia-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Czech API Payload Auditor",
          "href": "/en/czechia/czechia-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Czech Form Field Auditor",
          "href": "/en/czechia/czechia-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Czech Locale Number Parser",
          "href": "/en/czechia/czechia-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Czechia."
        },
        {
          "title": "Czech Calendar Week Helper",
          "href": "/en/czechia/czechia-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Czech Company Suffix Normalizer",
          "href": "/en/czechia/czechia-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Czech Procurement Identifier Helper",
          "href": "/en/czechia/czechia-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Czech Locale Copy Checker",
          "href": "/en/czechia/czechia-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Czech Support Ticket Scrubber",
          "href": "/en/czechia/czechia-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Czech Integration Smoke Test Builder",
          "href": "/en/czechia/czechia-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "denmark": {
      "flag": "🇩🇰",
      "name": "Denmark",
      "badge": "Premium Denmark developer suite",
      "description": "Developer intelligence and browser-only workbenches for danish identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Danmark",
        "population": "approximately 6.0M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Copenhagen",
        "continent": "Europe",
        "region": "Northern Europe / European Union",
        "languages": "Danish",
        "currency": "Danish krone",
        "currencyCode": "DKK",
        "callingCode": "+45",
        "internetTld": ".dk",
        "drivingSide": "Right",
        "iso2": "DK",
        "iso3": "DNK",
        "isoNumeric": "208",
        "locale": "da-DK",
        "icuLocale": "da_DK",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street, number, postal code, locality, Denmark",
        "postalCodeFormat": "postnummer",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "da-DK",
        "cldrLocale": "da_DK",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "denmark",
        "outlineLabel": "Denmark outline",
        "mapLabel": "Denmark in the world",
        "continentBadge": "Europe",
        "flagLabel": "Denmark flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "CPR and CVR",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "Moms / VAT and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Denmark registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /denmark/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Dot (.) rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Danish examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "CVR register",
          "text": "Official business registry or company lookup remains the source of truth for Denmark.",
          "status": "official boundary"
        },
        {
          "title": "Moms / VAT",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / Datatilsynet",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "CPR, CVR, SE number, VAT, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, FI creditor reference, SWIFT, Betalingsservice handoff, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "da-DK / da_DK; date DD.MM.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "DKK amounts use Comma (,) and Dot (.).",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "CPR, CVR, postnummer, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Danish CPR Validator",
          "href": "/en/denmark/denmark-cpr-validator/",
          "text": "Validate CPR shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Danish CVR Validator",
          "href": "/en/denmark/denmark-cvr-validator/",
          "text": "Inspect CVR structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Danish VAT ID / DK Prefix Validator",
          "href": "/en/denmark/denmark-vat-id-validator/",
          "text": "Normalize DK VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Danish EORI / Customs Identifier Helper",
          "href": "/en/denmark/denmark-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Danish CPR Helper",
          "href": "/en/denmark/denmark-cpr-social-insurance-helper/",
          "text": "Split CPR evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Danish Company Onboarding Auditor",
          "href": "/en/denmark/denmark-company-onboarding-auditor/",
          "text": "Audit company intake payloads for CVR, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Danish CVR register Readiness Helper",
          "href": "/en/denmark/denmark-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated CVR register lookup or company registry workflow."
        },
        {
          "title": "Danish ID Card Format Helper",
          "href": "/en/denmark/denmark-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Danish Passport Number Helper",
          "href": "/en/denmark/denmark-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Danish MRZ / Passport Parser",
          "href": "/en/denmark/denmark-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Denmark IBAN Validator",
          "href": "/en/denmark/denmark-iban-validator/",
          "text": "Validate DK IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Denmark IBAN Generator",
          "href": "/en/denmark/denmark-iban-generator/",
          "text": "Generate DK IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Danish Domestic Bank Account Inspector",
          "href": "/en/denmark/denmark-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Danish BIC / SWIFT Inspector",
          "href": "/en/denmark/denmark-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Denmark banking integrations."
        },
        {
          "title": "Danish SEPA Transfer Helper",
          "href": "/en/denmark/denmark-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Danish SEPA Direct Debit Mandate Helper",
          "href": "/en/denmark/denmark-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Danish FI / Betalingsservice Reference Helper",
          "href": "/en/denmark/denmark-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Danish Remittance Text Builder",
          "href": "/en/denmark/denmark-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Danish Payment Reconciliation Helper",
          "href": "/en/denmark/denmark-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Danish Bank Statement Parser",
          "href": "/en/denmark/denmark-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Danish Masked IBAN Formatter",
          "href": "/en/denmark/denmark-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Danish DKK Decimal Currency Formatter",
          "href": "/en/denmark/denmark-currency-decimal-formatter/",
          "text": "Normalize DKK amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Danish VAT Rate Sanity Helper",
          "href": "/en/denmark/denmark-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Danish VAT Return Field Helper",
          "href": "/en/denmark/denmark-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Danish Invoice Number Helper",
          "href": "/en/denmark/denmark-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Danish NemHandel / Peppol Readiness Checker",
          "href": "/en/denmark/denmark-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Danish Tax Authority Handoff Helper",
          "href": "/en/denmark/denmark-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Danish Accounting Audit Trail Checklist Helper",
          "href": "/en/denmark/denmark-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Danish Postal Code Validator",
          "href": "/en/denmark/denmark-postal-code-validator/",
          "text": "Validate postnummer shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Danish Address Normalizer",
          "href": "/en/denmark/denmark-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Danish Address Transliteration Normalizer",
          "href": "/en/denmark/denmark-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Danish Region / Province Code Mapper",
          "href": "/en/denmark/denmark-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Danish Municipality Code Inspector",
          "href": "/en/denmark/denmark-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Danish Phone Number Validator",
          "href": "/en/denmark/denmark-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Danish Phone E.164 Formatter",
          "href": "/en/denmark/denmark-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Danish Date Locale Formatter",
          "href": "/en/denmark/denmark-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Danish CSV Locale Normalizer",
          "href": "/en/denmark/denmark-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Denmark decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Danish Slug Normalizer",
          "href": "/en/denmark/denmark-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Danish Document OCR Fixer",
          "href": "/en/denmark/denmark-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Danish GDPR / Datatilsynet Redaction Helper",
          "href": "/en/denmark/denmark-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Danish PII Masker",
          "href": "/en/denmark/denmark-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Danish Personal Data Fixture Helper",
          "href": "/en/denmark/denmark-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Danish Driving Licence Format Helper",
          "href": "/en/denmark/denmark-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Danish Residence Permit Format Helper",
          "href": "/en/denmark/denmark-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Danish Health Card Format Helper",
          "href": "/en/denmark/denmark-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Danish Vehicle Plate Inspector",
          "href": "/en/denmark/denmark-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Danish VIN Validator",
          "href": "/en/denmark/denmark-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Danish Vehicle Data Redaction Helper",
          "href": "/en/denmark/denmark-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Danish Customs Declaration Helper",
          "href": "/en/denmark/denmark-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Danish Postal Tracking Helper",
          "href": "/en/denmark/denmark-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Danish Data Quality Workbench",
          "href": "/en/denmark/denmark-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Danish JSON Fixture Helper",
          "href": "/en/denmark/denmark-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Danish Regex Pack Helper",
          "href": "/en/denmark/denmark-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Danish API Payload Auditor",
          "href": "/en/denmark/denmark-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Danish Form Field Auditor",
          "href": "/en/denmark/denmark-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Danish Locale Number Parser",
          "href": "/en/denmark/denmark-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Denmark."
        },
        {
          "title": "Danish Calendar Week Helper",
          "href": "/en/denmark/denmark-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Danish Company Suffix Normalizer",
          "href": "/en/denmark/denmark-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Danish Procurement Identifier Helper",
          "href": "/en/denmark/denmark-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Danish Locale Copy Checker",
          "href": "/en/denmark/denmark-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Danish Support Ticket Scrubber",
          "href": "/en/denmark/denmark-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Danish Integration Smoke Test Builder",
          "href": "/en/denmark/denmark-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "finland": {
      "flag": "🇫🇮",
      "name": "Finland",
      "badge": "Premium Finland developer suite",
      "description": "Developer intelligence and browser-only workbenches for finnish identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Suomi",
        "population": "approximately 5.6M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Helsinki",
        "continent": "Europe",
        "region": "Northern Europe / European Union",
        "languages": "Finnish and Swedish",
        "currency": "Euro",
        "currencyCode": "EUR",
        "callingCode": "+358",
        "internetTld": ".fi",
        "drivingSide": "Right",
        "iso2": "FI",
        "iso3": "FIN",
        "isoNumeric": "246",
        "locale": "fi-FI",
        "icuLocale": "fi_FI",
        "dateFormat": "D.M.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space grouping",
        "addressFormat": "Street, number, postal code, locality, Finland",
        "postalCodeFormat": "postinumero",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "fi-FI",
        "cldrLocale": "fi_FI",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "finland",
        "outlineLabel": "Finland outline",
        "mapLabel": "Finland in the world",
        "continentBadge": "Europe",
        "flagLabel": "Finland flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "HETU and Y-tunnus",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "ALV / VAT and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Finland registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /finland/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Finnish examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "YTJ / Trade Register",
          "text": "Official business registry or company lookup remains the source of truth for Finland.",
          "status": "official boundary"
        },
        {
          "title": "ALV / VAT",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / Tietosuojavaltuutettu",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "HETU, Y-tunnus, VAT, OVT, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, Finnish reference number, SWIFT, SEPA, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "fi-FI / fi_FI; date D.M.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "EUR amounts use Comma (,) and Space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "HETU, Y-tunnus, postinumero, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Finnish HETU Validator",
          "href": "/en/finland/finland-hetu-validator/",
          "text": "Validate HETU shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Finnish Y-tunnus Validator",
          "href": "/en/finland/finland-y-tunnus-validator/",
          "text": "Inspect Y-tunnus structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Finnish VAT ID / FI Prefix Validator",
          "href": "/en/finland/finland-vat-id-validator/",
          "text": "Normalize FI VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Finnish EORI / Customs Identifier Helper",
          "href": "/en/finland/finland-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Finnish HETU Helper",
          "href": "/en/finland/finland-hetu-social-insurance-helper/",
          "text": "Split HETU evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Finnish Company Onboarding Auditor",
          "href": "/en/finland/finland-company-onboarding-auditor/",
          "text": "Audit company intake payloads for Y-tunnus, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Finnish YTJ / Trade Register Readiness Helper",
          "href": "/en/finland/finland-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated YTJ / Trade Register lookup or company registry workflow."
        },
        {
          "title": "Finnish ID Card Format Helper",
          "href": "/en/finland/finland-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Finnish Passport Number Helper",
          "href": "/en/finland/finland-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Finnish MRZ / Passport Parser",
          "href": "/en/finland/finland-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Finland IBAN Validator",
          "href": "/en/finland/finland-iban-validator/",
          "text": "Validate FI IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Finland IBAN Generator",
          "href": "/en/finland/finland-iban-generator/",
          "text": "Generate FI IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Finnish Domestic Bank Account Inspector",
          "href": "/en/finland/finland-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Finnish BIC / SWIFT Inspector",
          "href": "/en/finland/finland-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Finland banking integrations."
        },
        {
          "title": "Finnish SEPA Transfer Helper",
          "href": "/en/finland/finland-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Finnish SEPA Direct Debit Mandate Helper",
          "href": "/en/finland/finland-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Finnish viitenumero Reference Helper",
          "href": "/en/finland/finland-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Finnish Remittance Text Builder",
          "href": "/en/finland/finland-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Finnish Payment Reconciliation Helper",
          "href": "/en/finland/finland-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Finnish Bank Statement Parser",
          "href": "/en/finland/finland-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Finnish Masked IBAN Formatter",
          "href": "/en/finland/finland-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Finnish EUR Decimal Currency Formatter",
          "href": "/en/finland/finland-currency-decimal-formatter/",
          "text": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Finnish VAT Rate Sanity Helper",
          "href": "/en/finland/finland-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Finnish VAT Return Field Helper",
          "href": "/en/finland/finland-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Finnish Invoice Number Helper",
          "href": "/en/finland/finland-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Finnish Finvoice / Peppol Readiness Checker",
          "href": "/en/finland/finland-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Finnish Tax Authority Handoff Helper",
          "href": "/en/finland/finland-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Finnish Accounting Audit Trail Checklist Helper",
          "href": "/en/finland/finland-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Finnish Postal Code Validator",
          "href": "/en/finland/finland-postal-code-validator/",
          "text": "Validate postinumero shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Finnish Address Normalizer",
          "href": "/en/finland/finland-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Finnish Address Transliteration Normalizer",
          "href": "/en/finland/finland-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Finnish Region / Province Code Mapper",
          "href": "/en/finland/finland-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Finnish Municipality Code Inspector",
          "href": "/en/finland/finland-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Finnish Phone Number Validator",
          "href": "/en/finland/finland-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Finnish Phone E.164 Formatter",
          "href": "/en/finland/finland-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Finnish Date Locale Formatter",
          "href": "/en/finland/finland-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Finnish CSV Locale Normalizer",
          "href": "/en/finland/finland-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Finland decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Finnish Slug Normalizer",
          "href": "/en/finland/finland-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Finnish Document OCR Fixer",
          "href": "/en/finland/finland-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Finnish GDPR / Tietosuojavaltuutettu Redaction Helper",
          "href": "/en/finland/finland-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Finnish PII Masker",
          "href": "/en/finland/finland-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Finnish Personal Data Fixture Helper",
          "href": "/en/finland/finland-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Finnish Driving Licence Format Helper",
          "href": "/en/finland/finland-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Finnish Residence Permit Format Helper",
          "href": "/en/finland/finland-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Finnish Health Card Format Helper",
          "href": "/en/finland/finland-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Finnish Vehicle Plate Inspector",
          "href": "/en/finland/finland-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Finnish VIN Validator",
          "href": "/en/finland/finland-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Finnish Vehicle Data Redaction Helper",
          "href": "/en/finland/finland-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Finnish Customs Declaration Helper",
          "href": "/en/finland/finland-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Finnish Postal Tracking Helper",
          "href": "/en/finland/finland-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Finnish Data Quality Workbench",
          "href": "/en/finland/finland-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Finnish JSON Fixture Helper",
          "href": "/en/finland/finland-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Finnish Regex Pack Helper",
          "href": "/en/finland/finland-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Finnish API Payload Auditor",
          "href": "/en/finland/finland-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Finnish Form Field Auditor",
          "href": "/en/finland/finland-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Finnish Locale Number Parser",
          "href": "/en/finland/finland-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Finland."
        },
        {
          "title": "Finnish Calendar Week Helper",
          "href": "/en/finland/finland-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Finnish Company Suffix Normalizer",
          "href": "/en/finland/finland-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Finnish Procurement Identifier Helper",
          "href": "/en/finland/finland-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Finnish Locale Copy Checker",
          "href": "/en/finland/finland-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Finnish Support Ticket Scrubber",
          "href": "/en/finland/finland-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Finnish Integration Smoke Test Builder",
          "href": "/en/finland/finland-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "france": {
      "flag": "🇫🇷",
      "name": "France",
      "badge": "Western Europe premium country hub",
      "description": "Developer intelligence for French company, tax, banking, address, identity-boundary, payment, vehicle, privacy, and localization workflows with browser-only validation where possible.",
      "searchHints": [
        "SIREN",
        "SIRET",
        "TVA",
        "RIB",
        "RUM",
        "NIR"
      ],
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
      "searchHints": [
        "STEUER-ID",
        "UST-ID",
        "BLZ",
        "IBAN",
        "ELSTER",
        "XRECHNUNG"
      ],
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
    "ireland": {
      "flag": "🇮🇪",
      "name": "Ireland",
      "badge": "Premium Ireland developer suite",
      "description": "Developer intelligence and browser-only workbenches for irish identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Ireland / Eire",
        "population": "approximately 5.4M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Dublin",
        "continent": "Europe",
        "region": "Northern Europe / European Union",
        "languages": "English and Irish",
        "currency": "Euro",
        "currencyCode": "EUR",
        "callingCode": "+353",
        "internetTld": ".ie",
        "drivingSide": "Right",
        "iso2": "IE",
        "iso3": "IRL",
        "isoNumeric": "372",
        "locale": "en-IE",
        "icuLocale": "en_IE",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Dot (.)",
        "thousandsSeparator": "Comma (,)",
        "addressFormat": "Street, number, postal code, locality, Ireland",
        "postalCodeFormat": "Eircode",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "en-IE",
        "cldrLocale": "en_IE",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "ireland",
        "outlineLabel": "Ireland outline",
        "mapLabel": "Ireland in the world",
        "continentBadge": "Europe",
        "flagLabel": "Ireland flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "PPSN and CRO number",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "VAT / Revenue and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Ireland registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /ireland/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Dot (.) and Comma (,) rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Irish examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Companies Registration Office",
          "text": "Official business registry or company lookup remains the source of truth for Ireland.",
          "status": "official boundary"
        },
        {
          "title": "VAT / Revenue",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / Data Protection Commission",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "PPSN, CRO number, VAT, Eircode, postal address, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, SEPA, SWIFT, ROS handoff, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "en-IE / en_IE; date DD/MM/YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "EUR amounts use Dot (.) and Comma (,).",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "PPSN, CRO number, Eircode, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Irish PPSN Validator",
          "href": "/en/ireland/ireland-ppsn-validator/",
          "text": "Validate PPSN shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Irish CRO number Validator",
          "href": "/en/ireland/ireland-cro-number-validator/",
          "text": "Inspect CRO number structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Irish VAT ID / IE Prefix Validator",
          "href": "/en/ireland/ireland-vat-id-validator/",
          "text": "Normalize IE VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Irish EORI / Customs Identifier Helper",
          "href": "/en/ireland/ireland-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Irish PPSN Helper",
          "href": "/en/ireland/ireland-ppsn-social-insurance-helper/",
          "text": "Split PPSN evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Irish Company Onboarding Auditor",
          "href": "/en/ireland/ireland-company-onboarding-auditor/",
          "text": "Audit company intake payloads for CRO number, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Irish Companies Registration Office Readiness Helper",
          "href": "/en/ireland/ireland-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Companies Registration Office lookup or company registry workflow."
        },
        {
          "title": "Irish ID Card Format Helper",
          "href": "/en/ireland/ireland-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Irish Passport Number Helper",
          "href": "/en/ireland/ireland-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Irish MRZ / Passport Parser",
          "href": "/en/ireland/ireland-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Ireland IBAN Validator",
          "href": "/en/ireland/ireland-iban-validator/",
          "text": "Validate IE IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Ireland IBAN Generator",
          "href": "/en/ireland/ireland-iban-generator/",
          "text": "Generate IE IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Irish Domestic Bank Account Inspector",
          "href": "/en/ireland/ireland-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Irish BIC / SWIFT Inspector",
          "href": "/en/ireland/ireland-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Ireland banking integrations."
        },
        {
          "title": "Irish SEPA Transfer Helper",
          "href": "/en/ireland/ireland-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Irish SEPA Direct Debit Mandate Helper",
          "href": "/en/ireland/ireland-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Irish SEPA / Direct Debit Reference Helper",
          "href": "/en/ireland/ireland-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Irish Remittance Text Builder",
          "href": "/en/ireland/ireland-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Irish Payment Reconciliation Helper",
          "href": "/en/ireland/ireland-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Irish Bank Statement Parser",
          "href": "/en/ireland/ireland-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Irish Masked IBAN Formatter",
          "href": "/en/ireland/ireland-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Irish EUR Decimal Currency Formatter",
          "href": "/en/ireland/ireland-currency-decimal-formatter/",
          "text": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Irish VAT Rate Sanity Helper",
          "href": "/en/ireland/ireland-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Irish VAT Return Field Helper",
          "href": "/en/ireland/ireland-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Irish Invoice Number Helper",
          "href": "/en/ireland/ireland-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Irish Revenue e-invoicing readiness Readiness Checker",
          "href": "/en/ireland/ireland-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Irish Tax Authority Handoff Helper",
          "href": "/en/ireland/ireland-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Irish Accounting Audit Trail Checklist Helper",
          "href": "/en/ireland/ireland-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Irish Postal Code Validator",
          "href": "/en/ireland/ireland-postal-code-validator/",
          "text": "Validate Eircode shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Irish Address Normalizer",
          "href": "/en/ireland/ireland-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Irish Address Transliteration Normalizer",
          "href": "/en/ireland/ireland-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Irish Region / Province Code Mapper",
          "href": "/en/ireland/ireland-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Irish Municipality Code Inspector",
          "href": "/en/ireland/ireland-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Irish Phone Number Validator",
          "href": "/en/ireland/ireland-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Irish Phone E.164 Formatter",
          "href": "/en/ireland/ireland-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Irish Date Locale Formatter",
          "href": "/en/ireland/ireland-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Irish CSV Locale Normalizer",
          "href": "/en/ireland/ireland-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Ireland decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Irish Slug Normalizer",
          "href": "/en/ireland/ireland-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Irish Document OCR Fixer",
          "href": "/en/ireland/ireland-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Irish GDPR / Data Protection Commission Redaction Helper",
          "href": "/en/ireland/ireland-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Irish PII Masker",
          "href": "/en/ireland/ireland-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Irish Personal Data Fixture Helper",
          "href": "/en/ireland/ireland-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Irish Driving Licence Format Helper",
          "href": "/en/ireland/ireland-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Irish Residence Permit Format Helper",
          "href": "/en/ireland/ireland-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Irish Health Card Format Helper",
          "href": "/en/ireland/ireland-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Irish Vehicle Plate Inspector",
          "href": "/en/ireland/ireland-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Irish VIN Validator",
          "href": "/en/ireland/ireland-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Irish Vehicle Data Redaction Helper",
          "href": "/en/ireland/ireland-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Irish Customs Declaration Helper",
          "href": "/en/ireland/ireland-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Irish Postal Tracking Helper",
          "href": "/en/ireland/ireland-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Irish Data Quality Workbench",
          "href": "/en/ireland/ireland-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Irish JSON Fixture Helper",
          "href": "/en/ireland/ireland-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Irish Regex Pack Helper",
          "href": "/en/ireland/ireland-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Irish API Payload Auditor",
          "href": "/en/ireland/ireland-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Irish Form Field Auditor",
          "href": "/en/ireland/ireland-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Irish Locale Number Parser",
          "href": "/en/ireland/ireland-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Ireland."
        },
        {
          "title": "Irish Calendar Week Helper",
          "href": "/en/ireland/ireland-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Irish Company Suffix Normalizer",
          "href": "/en/ireland/ireland-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Irish Procurement Identifier Helper",
          "href": "/en/ireland/ireland-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Irish Locale Copy Checker",
          "href": "/en/ireland/ireland-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Irish Support Ticket Scrubber",
          "href": "/en/ireland/ireland-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Irish Integration Smoke Test Builder",
          "href": "/en/ireland/ireland-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "italy": {
      "flag": "🇮🇹",
      "name": "Italy",
      "badge": "Premium Italy developer suite",
      "description": "Developer intelligence and browser-only workbenches for Italian tax identifiers, e-invoicing, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "searchHints": [
        "CODICE FISCALE",
        "PARTITA IVA",
        "PAGOPA",
        "SDI",
        "PEC",
        "ABI/CAB"
      ],
      "metadata": {
        "nativeName": "Italia",
        "population": "approximately 58.8M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "area": "301,340 km²",
        "capital": "Rome",
        "largestCity": "Rome",
        "continent": "Europe",
        "region": "Southern Europe / European Union",
        "languages": "Italian",
        "currency": "Euro",
        "currencyCode": "EUR",
        "currencySymbol": "€",
        "callingCode": "+39",
        "internetTld": ".it",
        "drivingSide": "Right",
        "iso2": "IT",
        "iso3": "ITA",
        "isoNumeric": "380",
        "locale": "it-IT",
        "icuLocale": "it_IT",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot (.)",
        "addressFormat": "Street type/name number, postal code Comune Province",
        "postalCodeFormat": "NNNNN",
        "primaryTimeZone": "Europe/Rome (CET/CEST)",
        "utcRange": "UTC+01/+02",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "powerPlugTypes": "Type C / Type F / Type L",
        "voltage": "230V",
        "frequency": "50Hz",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "it-IT",
        "cldrLocale": "it_IT",
        "metricVsImperial": "Metric-first"
      },
      "stats": [
        {
          "icon": "👥",
          "label": "Population",
          "valueKey": "population",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🏛",
          "label": "Capital",
          "valueKey": "capital",
          "tags": [
            "locale"
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
          "icon": "☎",
          "label": "Calling code",
          "valueKey": "callingCode",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🌐",
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "tags": [
            "locale"
          ]
        },
        {
          "icon": "🕒",
          "label": "UTC range",
          "valueKey": "utcRange",
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
        }
      ],
      "countryProfile": [
        {
          "icon": "🏷",
          "label": "iso2",
          "valueKey": "iso2"
        },
        {
          "icon": "🏷",
          "label": "iso3",
          "valueKey": "iso3"
        },
        {
          "icon": "🏷",
          "label": "isoNumeric",
          "valueKey": "isoNumeric"
        },
        {
          "icon": "🏷",
          "label": "locale",
          "valueKey": "locale"
        },
        {
          "icon": "🏷",
          "label": "icuLocale",
          "valueKey": "icuLocale"
        },
        {
          "icon": "🏷",
          "label": "currencyCode",
          "valueKey": "currencyCode"
        },
        {
          "icon": "🏷",
          "label": "currencySymbol",
          "valueKey": "currencySymbol"
        },
        {
          "icon": "🏷",
          "label": "dateFormat",
          "valueKey": "dateFormat"
        },
        {
          "icon": "🏷",
          "label": "decimalSeparator",
          "valueKey": "decimalSeparator"
        },
        {
          "icon": "🏷",
          "label": "thousandsSeparator",
          "valueKey": "thousandsSeparator"
        },
        {
          "icon": "🏷",
          "label": "postalCodeFormat",
          "valueKey": "postalCodeFormat"
        },
        {
          "icon": "🏷",
          "label": "callingCode",
          "valueKey": "callingCode"
        },
        {
          "icon": "🏷",
          "label": "internetTld",
          "valueKey": "internetTld"
        },
        {
          "icon": "🏷",
          "label": "primaryTimeZone",
          "valueKey": "primaryTimeZone"
        },
        {
          "icon": "🏷",
          "label": "paperSize",
          "valueKey": "paperSize"
        },
        {
          "icon": "🏷",
          "label": "voltage",
          "valueKey": "voltage"
        },
        {
          "icon": "🏷",
          "label": "drivingSide",
          "valueKey": "drivingSide"
        },
        {
          "icon": "🏷",
          "label": "emergencyNumber",
          "valueKey": "emergencyNumber"
        },
        {
          "icon": "🏷",
          "label": "measurementSystem",
          "valueKey": "measurementSystem"
        },
        {
          "icon": "🏷",
          "label": "weekStarts",
          "valueKey": "weekStarts"
        },
        {
          "icon": "🏷",
          "label": "powerPlugTypes",
          "valueKey": "powerPlugTypes"
        },
        {
          "icon": "🏷",
          "label": "region",
          "valueKey": "region"
        },
        {
          "icon": "🏷",
          "label": "addressFormat",
          "valueKey": "addressFormat"
        }
      ],
      "visualIdentity": {
        "flag": "🇮🇹",
        "accent": "#008C45",
        "accent2": "#CD212A",
        "accent3": "#F4F5F0",
        "outline": "/assets/images/countries/italy-outline.svg",
        "map": "/assets/images/countries/italy-location.svg",
        "note": "Italy hub uses ValidoHub country visual assets and Italy flag colors for local identity.",
        "tags": [
          "identity",
          "visual"
        ]
      },
      "quickActions": [
        {
          "label": "Copy locale",
          "valueKey": "locale"
        },
        {
          "label": "Copy currencyCode",
          "valueKey": "currencyCode"
        },
        {
          "label": "Copy currencySymbol",
          "valueKey": "currencySymbol"
        },
        {
          "label": "Copy callingCode",
          "valueKey": "callingCode"
        },
        {
          "label": "Copy iso2",
          "valueKey": "iso2"
        },
        {
          "label": "Copy iso3",
          "valueKey": "iso3"
        },
        {
          "label": "Copy isoNumeric",
          "valueKey": "isoNumeric"
        },
        {
          "label": "Copy internetTld",
          "valueKey": "internetTld"
        },
        {
          "label": "Copy dateFormat",
          "valueKey": "dateFormat"
        },
        {
          "label": "Copy postalCodeFormat",
          "valueKey": "postalCodeFormat"
        },
        {
          "label": "Copy primaryTimeZone",
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
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "ICU locale",
          "valueKey": "icuLocale",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Language",
          "valueKey": "languages",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Currency code",
          "valueKey": "currencyCode",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Currency symbol",
          "valueKey": "currencySymbol",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Phone country code",
          "valueKey": "callingCode",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Internet TLD",
          "valueKey": "internetTld",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Date format",
          "valueKey": "dateFormat",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Time format",
          "valueKey": "timeFormat",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Decimal separator",
          "valueKey": "decimalSeparator",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Thousands separator",
          "valueKey": "thousandsSeparator",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Address format",
          "valueKey": "addressFormat",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Postal code format",
          "valueKey": "postalCodeFormat",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Primary time zone",
          "valueKey": "primaryTimeZone",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        },
        {
          "label": "Time zones",
          "valueKey": "utcRange",
          "icon": "🏷",
          "tags": [
            "developer",
            "locale"
          ]
        }
      ],
      "localFormats": [
        {
          "title": "Codice fiscale",
          "text": "Sixteen-character fiscal code with surname/name/date/gender/place-code blocks and a control character.",
          "icon": "🪪",
          "name": "Codice fiscale",
          "status": "available",
          "category": "National identifier",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "title": "Partita IVA",
          "text": "Eleven-digit Italian VAT identifier with local checksum evidence and VIES/status boundary.",
          "icon": "🪪",
          "name": "Partita IVA",
          "status": "available",
          "category": "Tax identifier",
          "tags": [
            "identifiers",
            "tax"
          ]
        },
        {
          "title": "Italian IBAN",
          "text": "IT IBANs expose CIN, ABI, CAB, and account-number slices after MOD-97 validation.",
          "brandKey": "iban",
          "name": "Italian IBAN",
          "status": "available",
          "category": "Banking",
          "tags": [
            "banking",
            "payments"
          ]
        },
        {
          "title": "CAP postal code",
          "text": "Five-digit postal code used with comune and province context; delivery proof requires official/provider data.",
          "icon": "✉",
          "name": "CAP postal code",
          "status": "available",
          "category": "Postal",
          "tags": [
            "postal",
            "addresses"
          ]
        },
        {
          "title": "REA and Registro Imprese",
          "text": "REA chamber references, VAT, PEC, and company intake evidence are inspected locally; existence remains official.",
          "icon": "🏢",
          "name": "REA and Registro Imprese",
          "status": "available",
          "category": "Business registry",
          "tags": [
            "government",
            "registry"
          ]
        },
        {
          "title": "FatturaPA / SDI",
          "text": "Italian e-invoicing payloads use FatturaPA XML, SDI recipient codes, and PEC fallbacks.",
          "icon": "📨",
          "name": "FatturaPA / SDI",
          "status": "available",
          "category": "E-invoicing",
          "tags": [
            "einvoice",
            "tax"
          ]
        },
        {
          "title": "Italian phone numbers",
          "text": "Italian numbers use +39 and preserve trunk-zero semantics for many fixed-line contexts.",
          "icon": "☎",
          "name": "Italian phone numbers",
          "status": "available",
          "category": "Phone",
          "tags": [
            "phone"
          ]
        },
        {
          "title": "Italian vehicle plates",
          "text": "Modern plates typically use two letters, three digits, two letters; registry status remains official.",
          "icon": "🚗",
          "name": "Italian vehicle plates",
          "status": "available",
          "category": "Vehicles",
          "tags": [
            "vehicles"
          ]
        },
        {
          "title": "EU VAT / VIES",
          "text": "VIES or Italian tax systems are required to prove active VAT status.",
          "brandKey": "vies",
          "name": "EU VAT / VIES",
          "status": "planned",
          "category": "Tax and business",
          "tags": [
            "tax",
            "government"
          ]
        }
      ],
      "payments": [
        {
          "title": "Italian IBAN",
          "text": "IT IBANs expose MOD-97, CIN, ABI, CAB, and account slices in the Italy workbench.",
          "brandKey": "iban",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "title": "SEPA",
          "text": "Italian credit transfers and direct debits use SEPA-ready account, mandate, remittance, and creditor evidence.",
          "brandKey": "sepa",
          "status": "available",
          "tags": [
            "payments",
            "banking"
          ]
        },
        {
          "title": "BIC / SWIFT",
          "text": "BIC/SWIFT fields can be shape-checked locally; bank participation and ownership remain official/provider checks.",
          "brandKey": "swift",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "title": "pagoPA / Ri.Ba",
          "text": "pagoPA notice and Ri.Ba snippets are inspected as local evidence without payment authorization.",
          "status": "available",
          "tags": [
            "payments"
          ]
        }
      ],
      "officialResources": [
        {
          "title": "Agenzia delle Entrate",
          "text": "Codice fiscale, Partita IVA, tax filing, and FatturaPA fiscal context; official status remains outside offline checks.",
          "note": "Codice fiscale, Partita IVA, tax filing, and FatturaPA fiscal context; official status remains outside offline checks.",
          "status": "available",
          "tags": [
            "tax"
          ]
        },
        {
          "title": "Sistema di Interscambio (SDI)",
          "text": "E-invoice delivery, recipient codes, PEC fallback, and transmission status require official SDI workflows.",
          "note": "E-invoice delivery, recipient codes, PEC fallback, and transmission status require official SDI workflows.",
          "status": "available",
          "tags": [
            "einvoice"
          ]
        },
        {
          "title": "Registro Imprese",
          "text": "Company existence, REA references, legal status, and registry extracts require official lookup.",
          "note": "Company existence, REA references, legal status, and registry extracts require official lookup.",
          "status": "available",
          "tags": [
            "registry"
          ]
        },
        {
          "title": "Banca d Italia / banking directories",
          "text": "Banking, ABI/CAB, payments, and institutional reference data are provider or official checks.",
          "note": "Banking, ABI/CAB, payments, and institutional reference data are provider or official checks.",
          "status": "available",
          "tags": [
            "banking"
          ]
        },
        {
          "title": "Agenzia delle Dogane e dei Monopoli",
          "text": "EORI, customs, and MRN status are official customs-system matters, not browser proofs.",
          "note": "EORI, customs, and MRN status are official customs-system matters, not browser proofs.",
          "status": "available",
          "tags": [
            "customs"
          ]
        },
        {
          "title": "Motorizzazione / PRA",
          "text": "Vehicle registration, plate status, and ownership require official vehicle systems.",
          "note": "Vehicle registration, plate status, and ownership require official vehicle systems.",
          "status": "available",
          "tags": [
            "vehicles"
          ]
        }
      ],
      "plannedWorkbenches": [
        {
          "name": "Live Agenzia Entrate VAT status lookup",
          "status": "planned",
          "description": "Future network-enabled workflow requiring privacy, source, and official-boundary product specs."
        },
        {
          "name": "Live Registro Imprese lookup",
          "status": "planned",
          "description": "Future network-enabled workflow requiring privacy, source, and official-boundary product specs."
        },
        {
          "name": "Live SDI delivery status lookup",
          "status": "planned",
          "description": "Future network-enabled workflow requiring privacy, source, and official-boundary product specs."
        },
        {
          "name": "Live bank directory lookup",
          "status": "planned",
          "description": "Future network-enabled workflow requiring privacy, source, and official-boundary product specs."
        }
      ],
      "relatedGlobalTools": [
        {
          "name": "IBAN Validator",
          "slug": "iban-validator",
          "category": "finance"
        },
        {
          "name": "JSON Formatter",
          "slug": "json-formatter",
          "category": "developer-tools"
        },
        {
          "name": "Regex Tester",
          "slug": "regex-tester",
          "category": "developer-tools"
        }
      ],
      "relatedCategories": [
        {
          "title": "National Identifiers",
          "text": "Country-specific identifier validators and explainers.",
          "name": "National Identifiers",
          "slug": "national-identifiers"
        },
        {
          "title": "Finance",
          "text": "Banking, IBAN, payment, and accounting workflows.",
          "name": "Finance",
          "slug": "finance"
        },
        {
          "title": "Developer Tools",
          "text": "Locale, data-quality, JSON, regex, and API helpers.",
          "name": "Developer Tools",
          "slug": "developer-tools"
        }
      ],
      "availableWorkbenches": [
        {
          "name": "Italian Codice Fiscale Validator",
          "slug": "italy-codice-fiscale-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "codicefiscale"
          ],
          "description": "Validate Italian codice fiscale shape, replay control-character evidence, and split surname/name/date/place-code blocks for debugging."
        },
        {
          "name": "Italian Partita IVA Validator",
          "slug": "italy-partita-iva-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "piva"
          ],
          "description": "Validate Italian VAT number shape, replay the 11-digit checksum, and separate offline syntax from Agenzia Entrate status."
        },
        {
          "name": "Italian VAT ID / IT Prefix Validator",
          "slug": "italy-vat-id-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "vat"
          ],
          "description": "Normalize IT VAT identifiers, inspect numeric body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "name": "Italian EORI / Customs Identifier Helper",
          "slug": "italy-eori-validator",
          "status": "available",
          "tags": [
            "national-identifiers",
            "eori"
          ],
          "description": "Inspect Italian EORI/customs identifiers, country prefixes, VAT-style bodies, and customs-boundary notes."
        },
        {
          "name": "Italian Codice Destinatario Helper",
          "slug": "italy-codice-destinatario-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "sdi"
          ],
          "description": "Inspect seven-character SDI recipient codes, PEC fallback hints, and e-invoicing routing boundaries."
        },
        {
          "name": "Italian PEC Address Helper",
          "slug": "italy-pec-address-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "pec"
          ],
          "description": "Check certified-email snippets for PEC-style address evidence, domain shape, and official mailbox-boundary notes."
        },
        {
          "name": "Italian REA Number Helper",
          "slug": "italy-rea-number-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "rea"
          ],
          "description": "Audit REA chamber-registration references, province prefixes, serial digits, and registry lookup boundaries."
        },
        {
          "name": "Italian Registro Imprese Readiness Helper",
          "slug": "italy-registro-imprese-readiness-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "company"
          ],
          "description": "Check company intake snippets for Partita IVA, REA, PEC, address, and official registry handoff evidence."
        },
        {
          "name": "Italian ATECO Code Inspector",
          "slug": "italy-ateco-code-inspector",
          "status": "available",
          "tags": [
            "national-identifiers",
            "ateco"
          ],
          "description": "Inspect ATECO activity-code snippets, dotted digit groups, and data-quality notes for company onboarding."
        },
        {
          "name": "Italian SPID / CIE Boundary Helper",
          "slug": "italy-spid-cie-boundary-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "identity"
          ],
          "description": "Separate SPID, CIE, CNS, and identity-provider evidence from authentication proof and regulated access decisions."
        },
        {
          "name": "Italian Company Onboarding Auditor",
          "slug": "italy-company-onboarding-auditor",
          "status": "available",
          "tags": [
            "national-identifiers",
            "company"
          ],
          "description": "Audit Italian company intake payloads for VAT, CF, REA, PEC, IBAN, address, and official-status boundaries."
        },
        {
          "name": "Italian IBAN Validator",
          "slug": "italy-iban-validator",
          "status": "available",
          "tags": [
            "finance",
            "iban"
          ],
          "description": "Validate Italian IBAN numbers, expose CIN, ABI, CAB, account slices, and explain official bank-directory boundaries."
        },
        {
          "name": "Italian ABI / CAB Bank Code Inspector",
          "slug": "italy-abi-cab-bank-code-inspector",
          "status": "available",
          "tags": [
            "finance",
            "bankcode"
          ],
          "description": "Inspect Italian bank and branch code snippets, normalize ABI/CAB slices, and separate directory lookup from local checks."
        },
        {
          "name": "Italian BIC / SWIFT Inspector",
          "slug": "italy-bic-swift-inspector",
          "status": "available",
          "tags": [
            "finance",
            "bic"
          ],
          "description": "Inspect BIC/SWIFT shape, verify IT country-code evidence, and prepare payment-routing diagnostics."
        },
        {
          "name": "Italian SEPA Transfer Helper",
          "slug": "italy-sepa-transfer-helper",
          "status": "available",
          "tags": [
            "finance",
            "sepa"
          ],
          "description": "Audit SEPA credit-transfer snippets for Italian IBAN, EUR amount, remittance, beneficiary, and browser-only boundaries."
        },
        {
          "name": "Italian SEPA Direct Debit Mandate Helper",
          "slug": "italy-sepa-direct-debit-mandate-helper",
          "status": "available",
          "tags": [
            "finance",
            "mandate"
          ],
          "description": "Inspect SEPA direct-debit mandate snippets for creditor, IBAN, mandate reference, dates, and official authorization boundaries."
        },
        {
          "name": "Italian Ri.Ba Payment Helper",
          "slug": "italy-riba-payment-helper",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Audit Ri.Ba payment snippets for debtor, due date, bank coordinates, amount, and reconciliation evidence."
        },
        {
          "name": "Italian pagoPA Notice Helper",
          "slug": "italy-pago-pa-payment-notice-helper",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Inspect pagoPA notice snippets for IUV/codice avviso digits, amount, due date, and payment-boundary notes."
        },
        {
          "name": "Italian Remittance Text Builder",
          "slug": "italy-remittance-text-builder",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Normalize Italian payment causale/remittance text, detect invoice references, and produce log-safe previews."
        },
        {
          "name": "Italian Payment Reconciliation Helper",
          "slug": "italy-payment-reconciliation-helper",
          "status": "available",
          "tags": [
            "finance",
            "payment"
          ],
          "description": "Compare Italian payment snippets for IBAN, amount, invoice, date, and reconciliation hints without bank lookup."
        },
        {
          "name": "Italian Bank Statement Parser",
          "slug": "italy-bank-statement-parser",
          "status": "available",
          "tags": [
            "finance",
            "statement"
          ],
          "description": "Parse Italian statement-like rows for valuta date, amount, causale, IBAN hints, and local CSV conventions."
        },
        {
          "name": "Italian Masked IBAN Formatter",
          "slug": "italy-masked-iban-formatter",
          "status": "available",
          "tags": [
            "finance",
            "ibanmask"
          ],
          "description": "Format and mask Italian IBANs for logs, support previews, and show which account slices remain sensitive."
        },
        {
          "name": "Italian FatturaPA XML Readiness Checker",
          "slug": "italy-fatturapa-xml-readiness-checker",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Audit FatturaPA XML snippets for cedente, cessionario, totals, VAT, and SDI delivery handoff evidence."
        },
        {
          "name": "Italian SDI Invoice Routing Helper",
          "slug": "italy-sdi-invoice-routing-helper",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Inspect e-invoice routing payloads for codice destinatario, PEC, VAT, and Sistema di Interscambio boundaries."
        },
        {
          "name": "Italian VAT Rate Sanity Helper",
          "slug": "italy-vat-rate-sanity-helper",
          "status": "available",
          "tags": [
            "finance",
            "taxdoc"
          ],
          "description": "Check Italian VAT-rate snippets, totals, comma decimals, and reverse-charge handoff notes."
        },
        {
          "name": "Italian VAT Return Field Helper",
          "slug": "italy-vat-return-field-helper",
          "status": "available",
          "tags": [
            "finance",
            "taxdoc"
          ],
          "description": "Audit VAT return snippets for period, VAT ID, taxable amount, tax amount, and official filing boundaries."
        },
        {
          "name": "Italian Invoice Number Helper",
          "slug": "italy-invoice-number-helper",
          "status": "available",
          "tags": [
            "finance",
            "invoice"
          ],
          "description": "Inspect Italian invoice references, year/series/number patterns, dates, VAT evidence, and duplicate-risk notes."
        },
        {
          "name": "Italian E-Invoicing Readiness Helper",
          "slug": "italy-e-invoicing-readiness-helper",
          "status": "available",
          "tags": [
            "finance",
            "einvoice"
          ],
          "description": "Audit Italian e-invoicing payloads for XML, SDI, PEC, VAT, totals, dates, and delivery-boundary evidence."
        },
        {
          "name": "Italian Accounting Audit Trail Checklist Helper",
          "slug": "italy-accounting-audit-trail-checklist-generator",
          "status": "available",
          "tags": [
            "finance",
            "accounting"
          ],
          "description": "Build an Italian accounting evidence checklist from VAT, invoice, payment, date, and document snippets."
        },
        {
          "name": "Italian EUR Decimal Currency Formatter",
          "slug": "italy-eur-decimal-currency-formatter",
          "status": "available",
          "tags": [
            "finance",
            "amount"
          ],
          "description": "Normalize Italian EUR amounts, comma decimals, thousands separators, and accounting import previews."
        },
        {
          "name": "Italian CAP Postal Code Validator",
          "slug": "italy-postal-code-validator",
          "status": "available",
          "tags": [
            "developer-tools",
            "postal"
          ],
          "description": "Validate Italian five-digit CAP shape, expose postal-zone evidence, and separate delivery proof from offline checks."
        },
        {
          "name": "Italian Address Normalizer",
          "slug": "italy-address-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "address"
          ],
          "description": "Normalize Italian address snippets with via/piazza, CAP, comune, provincia, and country evidence."
        },
        {
          "name": "Italian Address Transliteration Normalizer",
          "slug": "italy-address-transliteration-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "address"
          ],
          "description": "Create ASCII-safe Italian address/search keys while preserving display text and diacritics where needed."
        },
        {
          "name": "Italian Province Code Mapper",
          "slug": "italy-province-code-mapper",
          "status": "available",
          "tags": [
            "developer-tools",
            "province"
          ],
          "description": "Inspect Italian province abbreviations, expose known code evidence, and keep official geography lookup boundaries explicit."
        },
        {
          "name": "Italian Municipality / Belfiore Code Inspector",
          "slug": "italy-municipality-code-inspector",
          "status": "available",
          "tags": [
            "developer-tools",
            "municipality"
          ],
          "description": "Inspect comune and Belfiore-style cadastral code snippets for place-code evidence and official lookup boundaries."
        },
        {
          "name": "Italian Phone Number Validator",
          "slug": "italy-phone-number-validator",
          "status": "available",
          "tags": [
            "developer-tools",
            "phone"
          ],
          "description": "Validate Italian phone snippets, detect +39/trunk evidence, and separate numbering-plan shape from subscriber status."
        },
        {
          "name": "Italian Phone E.164 Formatter",
          "slug": "italy-phone-e164-formatter",
          "status": "available",
          "tags": [
            "developer-tools",
            "phone"
          ],
          "description": "Normalize Italian phone numbers toward +39 display, preserve significant trunk digits, and prepare API payload previews."
        },
        {
          "name": "Italian Date Locale Formatter",
          "slug": "italy-date-locale-formatter",
          "status": "available",
          "tags": [
            "developer-tools",
            "date"
          ],
          "description": "Parse Italian date snippets, emit ISO/date-display variants, and expose day/month/year field slices."
        },
        {
          "name": "Italian CSV Locale Normalizer",
          "slug": "italy-csv-locale-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "csv"
          ],
          "description": "Audit Italian CSV snippets for semicolon separators, comma decimals, dates, VAT fields, and import-safe previews."
        },
        {
          "name": "Italian Slug Normalizer",
          "slug": "italy-slug-normalizer",
          "status": "available",
          "tags": [
            "developer-tools",
            "slug"
          ],
          "description": "Create URL-safe slugs from Italian names, punctuation, accents, legal suffixes, and locale-specific text."
        },
        {
          "name": "Italian Document OCR Fixer",
          "slug": "italy-document-ocr-fixer",
          "status": "available",
          "tags": [
            "developer-tools",
            "ocr"
          ],
          "description": "Repair OCR-like Italian document snippets, recover CF/VAT/IBAN/date evidence, and keep identity-proof boundaries explicit."
        },
        {
          "name": "Italian GDPR / Privacy Redaction Helper",
          "slug": "italy-gdpr-redaction-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "privacy"
          ],
          "description": "Redact Italian personal, tax, banking, phone, and address evidence for privacy-safe support payloads."
        },
        {
          "name": "Italian PII Masker",
          "slug": "italy-pii-masker",
          "status": "available",
          "tags": [
            "developer-tools",
            "privacy"
          ],
          "description": "Mask Italian CF, VAT, IBAN, phone, PEC, and address evidence while preserving debugging structure."
        },
        {
          "name": "Italian Personal Data Fixture Helper",
          "slug": "italy-personal-data-fixture-generator",
          "status": "available",
          "tags": [
            "developer-tools",
            "fixture"
          ],
          "description": "Generate and audit clearly fake Italian-style personal fixtures with CF-like, address, phone, and privacy notes."
        },
        {
          "name": "Italian ID Card Format Helper",
          "slug": "italy-id-card-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Italian identity-card snippets, document numbers, dates, and official identity-proof boundaries."
        },
        {
          "name": "Italian Passport Number Helper",
          "slug": "italy-passport-number-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Italian passport-like document numbers, MRZ hints, dates, and official document-validation boundaries."
        },
        {
          "name": "Italian Driving Licence Format Helper",
          "slug": "italy-driving-licence-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Italian driving-licence snippets, document codes, dates, and Motorizzazione boundary notes."
        },
        {
          "name": "Italian Residence Permit Format Helper",
          "slug": "italy-residence-permit-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect residence-permit snippets, number/date evidence, and official immigration-status boundaries."
        },
        {
          "name": "Italian Tessera Sanitaria Format Helper",
          "slug": "italy-health-card-format-helper",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Inspect Tessera Sanitaria/codice fiscale snippets, expiry dates, and health-card proof boundaries."
        },
        {
          "name": "Italian Vehicle Plate Inspector",
          "slug": "italy-vehicle-plate-inspector",
          "status": "available",
          "tags": [
            "developer-tools",
            "vehicle"
          ],
          "description": "Inspect Italian vehicle plate families, province-era hints, serial blocks, and PRA/Motorizzazione boundaries."
        },
        {
          "name": "Italian VIN Validator",
          "slug": "italy-vin-validator",
          "status": "available",
          "tags": [
            "developer-tools",
            "vin"
          ],
          "description": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare Italian vehicle-intake diagnostics."
        },
        {
          "name": "Italian Vehicle Data Redaction Helper",
          "slug": "italy-vehicle-data-redaction-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "vehicle"
          ],
          "description": "Mask Italian plate, VIN, owner, fiscal-code, and address evidence in vehicle support payloads."
        },
        {
          "name": "Italian Customs Declaration Helper",
          "slug": "italy-customs-declaration-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "customs"
          ],
          "description": "Audit customs snippets for EORI, MRN-like references, country codes, dates, and Agenzia Dogane boundaries."
        },
        {
          "name": "Italian Postal Tracking Helper",
          "slug": "italy-postal-tracking-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "postaltrack"
          ],
          "description": "Inspect Poste/courier tracking-like snippets, country suffixes, dates, and carrier-status boundaries."
        },
        {
          "name": "Italian Data Quality Workbench",
          "slug": "italy-data-quality-workbench",
          "status": "available",
          "tags": [
            "developer-tools",
            "dataquality"
          ],
          "description": "Audit mixed Italian payloads for identifiers, dates, amounts, addresses, phone, and locale consistency."
        },
        {
          "name": "Italian JSON Fixture Helper",
          "slug": "italy-json-fixture-generator",
          "status": "available",
          "tags": [
            "developer-tools",
            "json"
          ],
          "description": "Inspect Italian JSON fixtures for locale, VAT, CF, IBAN, phone, date, and privacy-safe payload shape."
        },
        {
          "name": "Italian Regex Pack Helper",
          "slug": "italy-regex-pack-helper",
          "status": "available",
          "tags": [
            "developer-tools",
            "regex"
          ],
          "description": "Prepare regex snippets for Italian CF, Partita IVA, IBAN, CAP, phone, dates, and local evidence labels."
        },
        {
          "name": "Italian API Payload Auditor",
          "slug": "italy-api-payload-auditor",
          "status": "available",
          "tags": [
            "developer-tools",
            "api"
          ],
          "description": "Audit API payload snippets for Italy locale, VAT, CF, IBAN, dates, amounts, and official-system boundaries."
        },
        {
          "name": "Italian Form Field Auditor",
          "slug": "italy-form-field-auditor",
          "status": "available",
          "tags": [
            "developer-tools",
            "form"
          ],
          "description": "Check Italian form-field labels and values for VAT, CF, CAP, province, phone, address, and privacy handling."
        },
        {
          "name": "Italian MRZ / Passport Parser",
          "slug": "italy-mrz-passport-parser",
          "status": "available",
          "tags": [
            "national-identifiers",
            "document"
          ],
          "description": "Parse Italian passport MRZ snippets, split document, nationality, birth-date, expiry, and checksum evidence without identity proof."
        }
      ],
      "futureCountryPages": [
        {
          "name": "Italian payroll integrations",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian municipal code directory",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian health-card handoff guide",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian public procurement IDs",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian tax-declaration checklist",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian address datasets",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian phone allocation reference",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian vehicle registry guide",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian customs flows",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        },
        {
          "name": "Italian e-invoicing deep dive",
          "status": "planned",
          "description": "Reserved future country page; not a fake tool action."
        }
      ],
      "localizationExamples": [
        {
          "label": "Date",
          "value": "12/07/2026",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Time",
          "value": "14:25",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Currency",
          "value": "1.234,56 €",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Decimal",
          "value": "1.234,56",
          "tags": [
            "locale"
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
          "value": "+39 347 123 4567",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Landline",
          "value": "+39 06 69821234",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Postal code",
          "value": "00118",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Address example",
          "value": "Via Roma 10, 00118 Roma RM",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Example person name",
          "value": "Mario Rossi",
          "tags": [
            "locale"
          ]
        },
        {
          "label": "Mainland time zone",
          "value": "Europe/Rome",
          "tags": [
            "locale"
          ]
        }
      ],
      "addressExample": {
        "label": "Italian address",
        "value": "Via Roma 10\n00118 Roma RM\nItalia"
      },
      "phoneExamples": [
        {
          "label": "Mobile",
          "value": "+39 347 123 4567",
          "description": "Italian mobile example with +39 country code and 3xx mobile prefix evidence."
        },
        {
          "label": "Rome landline",
          "value": "+39 06 69821234",
          "description": "Rome fixed-line example preserving the leading 06 area code after +39."
        },
        {
          "label": "Milan landline",
          "value": "+39 02 12345678",
          "description": "Milan fixed-line example preserving the leading 02 area code after +39."
        },
        {
          "label": "Service-style",
          "value": "+39 800 123456",
          "description": "Toll-free/service-style number example for form and parser QA."
        },
        {
          "label": "Compact E.164",
          "value": "+393471234567",
          "description": "Compact E.164-style API storage preview without spaces."
        }
      ],
      "integrationChecklist": [
        "Locale it-IT configured",
        "UTF-8 encoding preserved",
        "Euro (EUR) formatting with comma decimals and dot separators",
        "Codice fiscale control-character checks",
        "Partita IVA checksum checks",
        "Italian IBAN MOD-97 plus CIN/ABI/CAB slicing",
        "CAP five-digit postal-code validation",
        "Phone code +39 parsing with trunk-zero care",
        "FatturaPA/SDI/PEC routing fields captured",
        "Privacy masking before logs and support tickets"
      ],
      "validationRules": [
        {
          "title": "Codice fiscale",
          "text": "Sixteen-character structure with surname/name/date/gender/place-code blocks and control-character evidence; identity proof remains official.",
          "name": "Codice fiscale",
          "description": "Sixteen-character structure with surname/name/date/gender/place-code blocks and control-character evidence; identity proof remains official."
        },
        {
          "title": "Partita IVA",
          "text": "Eleven digits with checksum evidence; active VAT status requires official tax/VIES systems.",
          "name": "Partita IVA",
          "description": "Eleven digits with checksum evidence; active VAT status requires official tax/VIES systems."
        },
        {
          "title": "Italian IBAN",
          "text": "IT plus 25 additional characters; MOD-97 validates the IBAN and CIN/ABI/CAB/account slices are exposed locally.",
          "name": "Italian IBAN",
          "description": "IT plus 25 additional characters; MOD-97 validates the IBAN and CIN/ABI/CAB/account slices are exposed locally."
        },
        {
          "title": "CAP",
          "text": "Five-digit Italian postal-code shape; delivery proof requires postal/reference data.",
          "name": "CAP",
          "description": "Five-digit Italian postal-code shape; delivery proof requires postal/reference data."
        },
        {
          "title": "SDI / PEC",
          "text": "Seven-character SDI recipient code or certified-email fallback evidence; delivery status requires SDI/PEC systems.",
          "name": "SDI / PEC",
          "description": "Seven-character SDI recipient code or certified-email fallback evidence; delivery status requires SDI/PEC systems."
        },
        {
          "title": "Phone",
          "text": "+39 or national Italian number evidence; allocation and subscriber status require telecom/provider sources.",
          "name": "Phone",
          "description": "+39 or national Italian number evidence; allocation and subscriber status require telecom/provider sources."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating codice fiscale as identity proof",
          "text": "The browser can inspect structure and control-character evidence, but it cannot prove that a person or identity exists."
        },
        {
          "title": "Confusing Partita IVA and codice fiscale",
          "text": "Companies may expose VAT, fiscal code, REA, and PEC fields; store each normalized field separately."
        },
        {
          "title": "Assuming ABI/CAB means account ownership",
          "text": "IBAN, ABI, and CAB slicing does not prove the account belongs to a person or company."
        },
        {
          "title": "Using dot decimals in Italian imports",
          "text": "Italian CSV/accounting flows commonly expect comma decimals and semicolon separators."
        }
      ],
      "bankingOverview": [
        {
          "title": "IBAN",
          "text": "IT IBAN format with CIN, ABI, CAB, and account segment breakdown.",
          "brandKey": "iban",
          "name": "IBAN",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "IT IBAN format with CIN, ABI, CAB, and account segment breakdown."
        },
        {
          "title": "ABI / CAB",
          "text": "Five-digit bank and branch routing evidence; bank name enrichment requires reference data.",
          "name": "ABI / CAB",
          "status": "available",
          "tags": [
            "banking"
          ],
          "description": "Five-digit bank and branch routing evidence; bank name enrichment requires reference data."
        },
        {
          "title": "SEPA",
          "text": "Credit transfer and direct debit readiness fields for Italian EUR accounts.",
          "brandKey": "sepa",
          "name": "SEPA",
          "status": "available",
          "tags": [
            "banking",
            "payments"
          ],
          "description": "Credit transfer and direct debit readiness fields for Italian EUR accounts."
        },
        {
          "title": "SWIFT / BIC",
          "text": "International routing identifier shape with IT country-code evidence.",
          "brandKey": "swift",
          "name": "SWIFT / BIC",
          "status": "available",
          "tags": [
            "banking"
          ],
          "description": "International routing identifier shape with IT country-code evidence."
        }
      ],
      "localizationNotes": [
        {
          "title": "Comma decimals",
          "text": "Italian business CSV and accounting workflows commonly use comma decimals and semicolon separators."
        },
        {
          "title": "DD/MM/YYYY dates",
          "text": "Human-facing Italian dates usually use day/month/year slashes; store ISO dates for APIs."
        },
        {
          "title": "Accents and apostrophes",
          "text": "Search keys often need ASCII-safe normalization while display names preserve Italian spelling."
        }
      ],
      "ecosystem": [
        {
          "title": "Tax identity",
          "text": "Codice fiscale, Partita IVA, Agenzia Entrate, VAT returns, and FatturaPA workflows form the tax identity cluster."
        },
        {
          "title": "Business registry",
          "text": "Registro Imprese, REA, PEC, company onboarding, ATECO, EORI, and official lookup boundaries form the company evidence cluster."
        },
        {
          "title": "Payments",
          "text": "Italian IBAN, ABI, CAB, BIC, SEPA, Ri.Ba, pagoPA, remittance, statements, and reconciliation form the payment cluster."
        },
        {
          "title": "E-invoicing",
          "text": "FatturaPA XML, SDI recipient code, PEC fallback, VAT totals, and delivery handoffs form the e-invoicing cluster."
        },
        {
          "title": "Locale and privacy",
          "text": "CAP, addresses, phone numbers, comma decimals, dates, GDPR redaction, and PII masking form the data-quality cluster."
        }
      ],
      "highlights": [
        {
          "title": "Premium Italy suite",
          "text": "Sixty browser-only Italy workbenches cover tax, banking, e-invoicing, locale, privacy, vehicles, and developer-data workflows."
        },
        {
          "title": "Field breakdown everywhere",
          "text": "Each tool exposes named Italian evidence slices for debugging instead of only generic result cards."
        },
        {
          "title": "Official boundaries preserved",
          "text": "Registry, tax, bank, vehicle, carrier, SDI, and identity status checks remain outside browser-only validation."
        }
      ],
      "developerNotes": [
        {
          "title": "Normalize for storage",
          "text": "Store compact identifiers such as IT VAT, codice fiscale, and IBAN separately from display punctuation."
        },
        {
          "title": "Mask before logging",
          "text": "Codice fiscale, IBAN, phone, address, PEC, and document evidence should be masked in logs and screenshots."
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
          "code": "Locale.forLanguageTag(\"it-IT\")",
          "note": "Use BCP 47 locale tags for Java formatting APIs."
        },
        {
          "title": "Java currency format",
          "language": "java",
          "brandKey": "java",
          "code": "NumberFormat.getCurrencyInstance(Locale.forLanguageTag(\"it-IT\")).format(value)",
          "note": "Formats values using Italian currency conventions."
        },
        {
          "title": "JavaScript Intl Currency",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.NumberFormat(\"it-IT\", { style: \"currency\", currency: \"EUR\" })",
          "note": "Formats EUR values with it-IT separators and currency display."
        },
        {
          "title": "JavaScript Date",
          "language": "javascript",
          "brandKey": "javascript",
          "code": "new Intl.DateTimeFormat(\"it-IT\", { timeZone: \"Europe/Rome\" })",
          "note": "Use Europe/Rome timezone for Italy local dates."
        },
        {
          "title": "Python locale",
          "language": "python",
          "brandKey": "python",
          "code": "locale.setlocale(locale.LC_ALL, \"it_IT.UTF-8\")",
          "note": "Requires the it_IT locale to be installed on the host operating system."
        },
        {
          "title": "Go language tag",
          "language": "go",
          "brandKey": "go",
          "code": "language.MustParse(\"it-IT\")",
          "note": "Use golang.org/x/text/language package for locale representation."
        }
      ]
    },
    "netherlands": {
      "flag": "🇳🇱",
      "name": "Netherlands",
      "badge": "Western Europe premium country hub",
      "description": "Developer intelligence for Dutch identity, business registry, tax, banking, address, payment, privacy, vehicle, audit-file, and localization workflows with browser-only validation where possible.",
      "searchHints": [
        "BSN",
        "RSIN",
        "KVK",
        "BTW",
        "iDEAL",
        "BAG"
      ],
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
    "norway": {
      "flag": "🇳🇴",
      "name": "Norway",
      "badge": "Premium Norway developer suite",
      "description": "Developer intelligence and browser-only workbenches for norwegian identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Norge",
        "population": "approximately 5.6M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Oslo",
        "continent": "Europe",
        "region": "Northern Europe / EEA",
        "languages": "Norwegian",
        "currency": "Norwegian krone",
        "currencyCode": "NOK",
        "callingCode": "+47",
        "internetTld": ".no",
        "drivingSide": "Right",
        "iso2": "NO",
        "iso3": "NOR",
        "isoNumeric": "578",
        "locale": "nb-NO",
        "icuLocale": "nb_NO",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space grouping",
        "addressFormat": "Street, number, postal code, locality, Norway",
        "postalCodeFormat": "postnummer",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "nb-NO",
        "cldrLocale": "nb_NO",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "norway",
        "outlineLabel": "Norway outline",
        "mapLabel": "Norway in the world",
        "continentBadge": "Europe",
        "flagLabel": "Norway flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "Fodselsnummer and Organisasjonsnummer",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "MVA and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Norway registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /norway/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Norwegian examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Brreg",
          "text": "Official business registry or company lookup remains the source of truth for Norway.",
          "status": "official boundary"
        },
        {
          "title": "MVA",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / Datatilsynet",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "Fodselsnummer, D-number, Organisasjonsnummer, MVA, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, KID, SWIFT, AvtaleGiro handoff, VAT handoff",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "nb-NO / nb_NO; date DD.MM.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "NOK amounts use Comma (,) and Space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "Fodselsnummer, Organisasjonsnummer, postnummer, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Norwegian Fodselsnummer Validator",
          "href": "/en/norway/norway-fodselsnummer-validator/",
          "text": "Validate Fodselsnummer shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Norwegian Organisasjonsnummer Validator",
          "href": "/en/norway/norway-organisasjonsnummer-validator/",
          "text": "Inspect Organisasjonsnummer structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Norwegian VAT ID / NO Prefix Validator",
          "href": "/en/norway/norway-vat-id-validator/",
          "text": "Normalize NO VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Norwegian EORI / Customs Identifier Helper",
          "href": "/en/norway/norway-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Norwegian D-number Helper",
          "href": "/en/norway/norway-d-number-social-insurance-helper/",
          "text": "Split D-number evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Norwegian Company Onboarding Auditor",
          "href": "/en/norway/norway-company-onboarding-auditor/",
          "text": "Audit company intake payloads for Organisasjonsnummer, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Norwegian Brreg Readiness Helper",
          "href": "/en/norway/norway-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Brreg lookup or company registry workflow."
        },
        {
          "title": "Norwegian ID Card Format Helper",
          "href": "/en/norway/norway-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Norwegian Passport Number Helper",
          "href": "/en/norway/norway-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Norwegian MRZ / Passport Parser",
          "href": "/en/norway/norway-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Norway IBAN Validator",
          "href": "/en/norway/norway-iban-validator/",
          "text": "Validate NO IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Norway IBAN Generator",
          "href": "/en/norway/norway-iban-generator/",
          "text": "Generate NO IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Norwegian Domestic Bank Account Inspector",
          "href": "/en/norway/norway-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Norwegian BIC / SWIFT Inspector",
          "href": "/en/norway/norway-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Norway banking integrations."
        },
        {
          "title": "Norwegian SEPA Transfer Helper",
          "href": "/en/norway/norway-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Norwegian SEPA Direct Debit Mandate Helper",
          "href": "/en/norway/norway-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Norwegian KID reference Reference Helper",
          "href": "/en/norway/norway-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Norwegian Remittance Text Builder",
          "href": "/en/norway/norway-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Norwegian Payment Reconciliation Helper",
          "href": "/en/norway/norway-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Norwegian Bank Statement Parser",
          "href": "/en/norway/norway-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Norwegian Masked IBAN Formatter",
          "href": "/en/norway/norway-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Norwegian NOK Decimal Currency Formatter",
          "href": "/en/norway/norway-currency-decimal-formatter/",
          "text": "Normalize NOK amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Norwegian VAT Rate Sanity Helper",
          "href": "/en/norway/norway-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Norwegian VAT Return Field Helper",
          "href": "/en/norway/norway-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Norwegian Invoice Number Helper",
          "href": "/en/norway/norway-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Norwegian EHF / Peppol Readiness Checker",
          "href": "/en/norway/norway-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Norwegian Tax Authority Handoff Helper",
          "href": "/en/norway/norway-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Norwegian Accounting Audit Trail Checklist Helper",
          "href": "/en/norway/norway-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Norwegian Postal Code Validator",
          "href": "/en/norway/norway-postal-code-validator/",
          "text": "Validate postnummer shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Norwegian Address Normalizer",
          "href": "/en/norway/norway-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Norwegian Address Transliteration Normalizer",
          "href": "/en/norway/norway-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Norwegian Region / Province Code Mapper",
          "href": "/en/norway/norway-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Norwegian Municipality Code Inspector",
          "href": "/en/norway/norway-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Norwegian Phone Number Validator",
          "href": "/en/norway/norway-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Norwegian Phone E.164 Formatter",
          "href": "/en/norway/norway-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Norwegian Date Locale Formatter",
          "href": "/en/norway/norway-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Norwegian CSV Locale Normalizer",
          "href": "/en/norway/norway-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Norway decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Norwegian Slug Normalizer",
          "href": "/en/norway/norway-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Norwegian Document OCR Fixer",
          "href": "/en/norway/norway-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Norwegian GDPR / Datatilsynet Redaction Helper",
          "href": "/en/norway/norway-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Norwegian PII Masker",
          "href": "/en/norway/norway-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Norwegian Personal Data Fixture Helper",
          "href": "/en/norway/norway-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Norwegian Driving Licence Format Helper",
          "href": "/en/norway/norway-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Norwegian Residence Permit Format Helper",
          "href": "/en/norway/norway-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Norwegian Health Card Format Helper",
          "href": "/en/norway/norway-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Norwegian Vehicle Plate Inspector",
          "href": "/en/norway/norway-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Norwegian VIN Validator",
          "href": "/en/norway/norway-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Norwegian Vehicle Data Redaction Helper",
          "href": "/en/norway/norway-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Norwegian Customs Declaration Helper",
          "href": "/en/norway/norway-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Norwegian Postal Tracking Helper",
          "href": "/en/norway/norway-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Norwegian Data Quality Workbench",
          "href": "/en/norway/norway-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Norwegian JSON Fixture Helper",
          "href": "/en/norway/norway-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Norwegian Regex Pack Helper",
          "href": "/en/norway/norway-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Norwegian API Payload Auditor",
          "href": "/en/norway/norway-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Norwegian Form Field Auditor",
          "href": "/en/norway/norway-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Norwegian Locale Number Parser",
          "href": "/en/norway/norway-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Norway."
        },
        {
          "title": "Norwegian Calendar Week Helper",
          "href": "/en/norway/norway-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Norwegian Company Suffix Normalizer",
          "href": "/en/norway/norway-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Norwegian Procurement Identifier Helper",
          "href": "/en/norway/norway-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Norwegian Locale Copy Checker",
          "href": "/en/norway/norway-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Norwegian Support Ticket Scrubber",
          "href": "/en/norway/norway-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Norwegian Integration Smoke Test Builder",
          "href": "/en/norway/norway-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
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
    "portugal": {
      "flag": "🇵🇹",
      "name": "Portugal",
      "badge": "Premium Portugal developer suite",
      "description": "Developer intelligence and browser-only workbenches for portuguese identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Portugal",
        "population": "approximately 10.4M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Lisbon",
        "continent": "Europe",
        "region": "Southern Europe / European Union",
        "languages": "Portuguese",
        "currency": "Euro",
        "currencyCode": "EUR",
        "callingCode": "+351",
        "internetTld": ".pt",
        "drivingSide": "Right",
        "iso2": "PT",
        "iso3": "PRT",
        "isoNumeric": "620",
        "locale": "pt-PT",
        "icuLocale": "pt_PT",
        "dateFormat": "DD/MM/YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space or dot grouping",
        "addressFormat": "Street, number, postal code, locality, Portugal",
        "postalCodeFormat": "codigo postal",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "pt-PT",
        "cldrLocale": "pt_PT",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "portugal",
        "outlineLabel": "Portugal outline",
        "mapLabel": "Portugal in the world",
        "continentBadge": "Europe",
        "flagLabel": "Portugal flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "NIF and NIPC",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "IVA and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Portugal registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /portugal/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Space or dot grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Portuguese examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Registo Comercial",
          "text": "Official business registry or company lookup remains the source of truth for Portugal.",
          "status": "official boundary"
        },
        {
          "title": "IVA",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / CNPD",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "NIF, NISS, Cartao de Cidadao, NIPC, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, SEPA, SWIFT, Multibanco reference, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "pt-PT / pt_PT; date DD/MM/YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "EUR amounts use Comma (,) and Space or dot grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "NIF, NIPC, codigo postal, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Portuguese NIF Validator",
          "href": "/en/portugal/portugal-nif-validator/",
          "text": "Validate NIF shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Portuguese NIPC Validator",
          "href": "/en/portugal/portugal-nipc-validator/",
          "text": "Inspect NIPC structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Portuguese VAT ID / PT Prefix Validator",
          "href": "/en/portugal/portugal-vat-id-validator/",
          "text": "Normalize PT VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Portuguese EORI / Customs Identifier Helper",
          "href": "/en/portugal/portugal-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Portuguese NISS Helper",
          "href": "/en/portugal/portugal-niss-social-insurance-helper/",
          "text": "Split NISS evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Portuguese Company Onboarding Auditor",
          "href": "/en/portugal/portugal-company-onboarding-auditor/",
          "text": "Audit company intake payloads for NIPC, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Portuguese Registo Comercial Readiness Helper",
          "href": "/en/portugal/portugal-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Registo Comercial lookup or company registry workflow."
        },
        {
          "title": "Portuguese ID Card Format Helper",
          "href": "/en/portugal/portugal-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Portuguese Passport Number Helper",
          "href": "/en/portugal/portugal-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Portuguese MRZ / Passport Parser",
          "href": "/en/portugal/portugal-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Portugal IBAN Validator",
          "href": "/en/portugal/portugal-iban-validator/",
          "text": "Validate PT IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Portugal IBAN Generator",
          "href": "/en/portugal/portugal-iban-generator/",
          "text": "Generate PT IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Portuguese Domestic Bank Account Inspector",
          "href": "/en/portugal/portugal-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Portuguese BIC / SWIFT Inspector",
          "href": "/en/portugal/portugal-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Portugal banking integrations."
        },
        {
          "title": "Portuguese SEPA Transfer Helper",
          "href": "/en/portugal/portugal-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Portuguese SEPA Direct Debit Mandate Helper",
          "href": "/en/portugal/portugal-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Portuguese Multibanco Reference Helper",
          "href": "/en/portugal/portugal-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Portuguese Remittance Text Builder",
          "href": "/en/portugal/portugal-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Portuguese Payment Reconciliation Helper",
          "href": "/en/portugal/portugal-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Portuguese Bank Statement Parser",
          "href": "/en/portugal/portugal-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Portuguese Masked IBAN Formatter",
          "href": "/en/portugal/portugal-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Portuguese EUR Decimal Currency Formatter",
          "href": "/en/portugal/portugal-currency-decimal-formatter/",
          "text": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Portuguese VAT Rate Sanity Helper",
          "href": "/en/portugal/portugal-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Portuguese VAT Return Field Helper",
          "href": "/en/portugal/portugal-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Portuguese Invoice Number Helper",
          "href": "/en/portugal/portugal-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Portuguese SAF-T / e-Fatura Readiness Checker",
          "href": "/en/portugal/portugal-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Portuguese Tax Authority Handoff Helper",
          "href": "/en/portugal/portugal-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Portuguese Accounting Audit Trail Checklist Helper",
          "href": "/en/portugal/portugal-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Portuguese Postal Code Validator",
          "href": "/en/portugal/portugal-postal-code-validator/",
          "text": "Validate codigo postal shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Portuguese Address Normalizer",
          "href": "/en/portugal/portugal-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Portuguese Address Transliteration Normalizer",
          "href": "/en/portugal/portugal-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Portuguese Region / Province Code Mapper",
          "href": "/en/portugal/portugal-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Portuguese Municipality Code Inspector",
          "href": "/en/portugal/portugal-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Portuguese Phone Number Validator",
          "href": "/en/portugal/portugal-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Portuguese Phone E.164 Formatter",
          "href": "/en/portugal/portugal-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Portuguese Date Locale Formatter",
          "href": "/en/portugal/portugal-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Portuguese CSV Locale Normalizer",
          "href": "/en/portugal/portugal-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Portugal decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Portuguese Slug Normalizer",
          "href": "/en/portugal/portugal-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Portuguese Document OCR Fixer",
          "href": "/en/portugal/portugal-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Portuguese GDPR / CNPD Redaction Helper",
          "href": "/en/portugal/portugal-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Portuguese PII Masker",
          "href": "/en/portugal/portugal-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Portuguese Personal Data Fixture Helper",
          "href": "/en/portugal/portugal-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Portuguese Driving Licence Format Helper",
          "href": "/en/portugal/portugal-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Portuguese Residence Permit Format Helper",
          "href": "/en/portugal/portugal-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Portuguese Health Card Format Helper",
          "href": "/en/portugal/portugal-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Portuguese Vehicle Plate Inspector",
          "href": "/en/portugal/portugal-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Portuguese VIN Validator",
          "href": "/en/portugal/portugal-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Portuguese Vehicle Data Redaction Helper",
          "href": "/en/portugal/portugal-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Portuguese Customs Declaration Helper",
          "href": "/en/portugal/portugal-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Portuguese Postal Tracking Helper",
          "href": "/en/portugal/portugal-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Portuguese Data Quality Workbench",
          "href": "/en/portugal/portugal-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Portuguese JSON Fixture Helper",
          "href": "/en/portugal/portugal-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Portuguese Regex Pack Helper",
          "href": "/en/portugal/portugal-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Portuguese API Payload Auditor",
          "href": "/en/portugal/portugal-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Portuguese Form Field Auditor",
          "href": "/en/portugal/portugal-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Portuguese Locale Number Parser",
          "href": "/en/portugal/portugal-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Portugal."
        },
        {
          "title": "Portuguese Calendar Week Helper",
          "href": "/en/portugal/portugal-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Portuguese Company Suffix Normalizer",
          "href": "/en/portugal/portugal-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Portuguese Procurement Identifier Helper",
          "href": "/en/portugal/portugal-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Portuguese Locale Copy Checker",
          "href": "/en/portugal/portugal-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Portuguese Support Ticket Scrubber",
          "href": "/en/portugal/portugal-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Portuguese Integration Smoke Test Builder",
          "href": "/en/portugal/portugal-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "romania": {
      "flag": "🇷🇴",
      "name": "Romania",
      "badge": "Premium Romania developer suite",
      "description": "Developer intelligence and browser-only workbenches for romanian identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Romania",
        "population": "approximately 19.0M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Bucharest",
        "continent": "Europe",
        "region": "Southeastern Europe / European Union",
        "languages": "Romanian",
        "currency": "Romanian leu",
        "currencyCode": "RON",
        "callingCode": "+40",
        "internetTld": ".ro",
        "drivingSide": "Right",
        "iso2": "RO",
        "iso3": "ROU",
        "isoNumeric": "642",
        "locale": "ro-RO",
        "icuLocale": "ro_RO",
        "dateFormat": "DD.MM.YYYY",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Dot or space grouping",
        "addressFormat": "Street, number, postal code, locality, Romania",
        "postalCodeFormat": "cod postal",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "ro-RO",
        "cldrLocale": "ro_RO",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "romania",
        "outlineLabel": "Romania outline",
        "mapLabel": "Romania in the world",
        "continentBadge": "Europe",
        "flagLabel": "Romania flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "CNP and CUI / CIF",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "TVA and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Romania registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /romania/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Dot or space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Romanian examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "ONRC",
          "text": "Official business registry or company lookup remains the source of truth for Romania.",
          "status": "official boundary"
        },
        {
          "title": "TVA",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / ANSPDCP",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "CNP, CUI, CIF, ONRC, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, SWIFT, ANAF handoff, e-Factura handoff, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "ro-RO / ro_RO; date DD.MM.YYYY.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "RON amounts use Comma (,) and Dot or space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "CNP, CUI / CIF, cod postal, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Romanian CNP Validator",
          "href": "/en/romania/romania-cnp-validator/",
          "text": "Validate CNP shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Romanian CUI / CIF Validator",
          "href": "/en/romania/romania-cui-cif-validator/",
          "text": "Inspect CUI / CIF structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Romanian VAT ID / RO Prefix Validator",
          "href": "/en/romania/romania-vat-id-validator/",
          "text": "Normalize RO VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Romanian EORI / Customs Identifier Helper",
          "href": "/en/romania/romania-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Romanian CNP Helper",
          "href": "/en/romania/romania-cnp-social-insurance-helper/",
          "text": "Split CNP evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Romanian Company Onboarding Auditor",
          "href": "/en/romania/romania-company-onboarding-auditor/",
          "text": "Audit company intake payloads for CUI / CIF, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Romanian ONRC Readiness Helper",
          "href": "/en/romania/romania-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated ONRC lookup or company registry workflow."
        },
        {
          "title": "Romanian ID Card Format Helper",
          "href": "/en/romania/romania-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Romanian Passport Number Helper",
          "href": "/en/romania/romania-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Romanian MRZ / Passport Parser",
          "href": "/en/romania/romania-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Romania IBAN Validator",
          "href": "/en/romania/romania-iban-validator/",
          "text": "Validate RO IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Romania IBAN Generator",
          "href": "/en/romania/romania-iban-generator/",
          "text": "Generate RO IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Romanian Domestic Bank Account Inspector",
          "href": "/en/romania/romania-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Romanian BIC / SWIFT Inspector",
          "href": "/en/romania/romania-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Romania banking integrations."
        },
        {
          "title": "Romanian SEPA Transfer Helper",
          "href": "/en/romania/romania-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Romanian SEPA Direct Debit Mandate Helper",
          "href": "/en/romania/romania-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Romanian treasury / SEPA handoff Reference Helper",
          "href": "/en/romania/romania-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Romanian Remittance Text Builder",
          "href": "/en/romania/romania-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Romanian Payment Reconciliation Helper",
          "href": "/en/romania/romania-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Romanian Bank Statement Parser",
          "href": "/en/romania/romania-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Romanian Masked IBAN Formatter",
          "href": "/en/romania/romania-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Romanian RON Decimal Currency Formatter",
          "href": "/en/romania/romania-currency-decimal-formatter/",
          "text": "Normalize RON amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Romanian VAT Rate Sanity Helper",
          "href": "/en/romania/romania-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Romanian VAT Return Field Helper",
          "href": "/en/romania/romania-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Romanian Invoice Number Helper",
          "href": "/en/romania/romania-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Romanian RO e-Factura / ANAF Readiness Checker",
          "href": "/en/romania/romania-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Romanian Tax Authority Handoff Helper",
          "href": "/en/romania/romania-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Romanian Accounting Audit Trail Checklist Helper",
          "href": "/en/romania/romania-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Romanian Postal Code Validator",
          "href": "/en/romania/romania-postal-code-validator/",
          "text": "Validate cod postal shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Romanian Address Normalizer",
          "href": "/en/romania/romania-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Romanian Address Transliteration Normalizer",
          "href": "/en/romania/romania-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Romanian Region / Province Code Mapper",
          "href": "/en/romania/romania-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Romanian Municipality Code Inspector",
          "href": "/en/romania/romania-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Romanian Phone Number Validator",
          "href": "/en/romania/romania-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Romanian Phone E.164 Formatter",
          "href": "/en/romania/romania-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Romanian Date Locale Formatter",
          "href": "/en/romania/romania-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Romanian CSV Locale Normalizer",
          "href": "/en/romania/romania-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Romania decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Romanian Slug Normalizer",
          "href": "/en/romania/romania-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Romanian Document OCR Fixer",
          "href": "/en/romania/romania-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Romanian GDPR / ANSPDCP Redaction Helper",
          "href": "/en/romania/romania-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Romanian PII Masker",
          "href": "/en/romania/romania-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Romanian Personal Data Fixture Helper",
          "href": "/en/romania/romania-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Romanian Driving Licence Format Helper",
          "href": "/en/romania/romania-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Romanian Residence Permit Format Helper",
          "href": "/en/romania/romania-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Romanian Health Card Format Helper",
          "href": "/en/romania/romania-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Romanian Vehicle Plate Inspector",
          "href": "/en/romania/romania-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Romanian VIN Validator",
          "href": "/en/romania/romania-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Romanian Vehicle Data Redaction Helper",
          "href": "/en/romania/romania-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Romanian Customs Declaration Helper",
          "href": "/en/romania/romania-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Romanian Postal Tracking Helper",
          "href": "/en/romania/romania-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Romanian Data Quality Workbench",
          "href": "/en/romania/romania-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Romanian JSON Fixture Helper",
          "href": "/en/romania/romania-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Romanian Regex Pack Helper",
          "href": "/en/romania/romania-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Romanian API Payload Auditor",
          "href": "/en/romania/romania-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Romanian Form Field Auditor",
          "href": "/en/romania/romania-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Romanian Locale Number Parser",
          "href": "/en/romania/romania-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Romania."
        },
        {
          "title": "Romanian Calendar Week Helper",
          "href": "/en/romania/romania-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Romanian Company Suffix Normalizer",
          "href": "/en/romania/romania-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Romanian Procurement Identifier Helper",
          "href": "/en/romania/romania-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Romanian Locale Copy Checker",
          "href": "/en/romania/romania-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Romanian Support Ticket Scrubber",
          "href": "/en/romania/romania-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Romanian Integration Smoke Test Builder",
          "href": "/en/romania/romania-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
    },
    "spain": {
      "flag": "🇪🇸",
      "name": "Spain",
      "badge": "Premium Spain developer suite",
      "description": "Developer intelligence and browser-only workbenches for Spanish identifiers, tax, e-invoicing, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
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
        {
          "title": "Treating NIF syntax as identity proof",
          "text": "A valid checksum does not prove the person, company, or tax status exists."
        },
        {
          "title": "Losing CCC slices inside IBAN",
          "text": "Spanish IBANs still contain bank, branch, check digits, and account slices useful for debugging."
        },
        {
          "title": "Using raw samples as labels",
          "text": "Long CSV, JSON, IBAN, and invoice payloads belong inside inputs, not selector labels."
        },
        {
          "title": "Mixing decimal conventions",
          "text": "Spanish business files often use comma decimals and dot grouping; API payloads may require normalized numeric values."
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
          "title": "Dates",
          "text": "Use DD/MM/YYYY for display and ISO dates for API/storage handoff."
        },
        {
          "title": "Numbers",
          "text": "Use comma decimals and dot thousands for Spanish display, but normalize for APIs when required."
        },
        {
          "title": "Languages",
          "text": "Spanish is primary; Catalan/Valencian, Galician, Basque, and Aranese can appear in regional forms."
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
        {
          "title": "Spanish identity and tax IDs",
          "text": "DNI, NIE, NIF, legacy CIF, ES VAT, EORI, and social-security snippets are normalized with local evidence slices."
        },
        {
          "title": "Payments and banking",
          "text": "Spanish IBAN, CCC, BIC, SEPA, Bizum, remittance, reconciliation, and statement snippets stay browser-only."
        },
        {
          "title": "Developer QA surfaces",
          "text": "CSV, JSON, API payload, form, OCR, privacy, vehicle, and postal workflows expose field breakdowns for debugging."
        }
      ],
      "developerNotes": [
        {
          "title": "Offline boundary",
          "text": "The suite validates structure and local evidence only; official status stays with AEAT, VIES, TGSS, DGT, Correos, banks, or payment providers."
        },
        {
          "title": "Locale shape",
          "text": "Spanish UI data commonly combines DD/MM/YYYY dates, comma decimals, dot thousands, EUR, five-digit postal codes, and +34 phone numbers."
        },
        {
          "title": "Debug-first output",
          "text": "Every workbench includes a dedicated field breakdown so implementers can see the exact detected Spanish slices."
        }
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
      "countryEcosystem": [
        {
          "title": "AEAT",
          "text": "Tax agency boundary for VAT, Modelo filings, and tax status."
        },
        {
          "title": "VIES",
          "text": "EU VAT confirmation boundary for ES VAT identifiers."
        },
        {
          "title": "Banco de Espana / SEPA",
          "text": "Banking and payment context for IBAN, BIC, CCC, and transfer payloads."
        },
        {
          "title": "DGT",
          "text": "Official vehicle and driving-licence status remains outside offline validation."
        }
      ],
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
    "sweden": {
      "flag": "🇸🇪",
      "name": "Sweden",
      "badge": "Premium Sweden developer suite",
      "description": "Developer intelligence and browser-only workbenches for swedish identifiers, tax, payments, banking, locale conventions, privacy, documents, vehicles, and integration QA.",
      "metadata": {
        "nativeName": "Sverige",
        "population": "approximately 10.7M",
        "populationNote": "Approximate 2026 population estimate; do not treat as a timeless constant.",
        "capital": "Stockholm",
        "continent": "Europe",
        "region": "Northern Europe / European Union",
        "languages": "Swedish",
        "currency": "Swedish krona",
        "currencyCode": "SEK",
        "callingCode": "+46",
        "internetTld": ".se",
        "drivingSide": "Right",
        "iso2": "SE",
        "iso3": "SWE",
        "isoNumeric": "752",
        "locale": "sv-SE",
        "icuLocale": "sv_SE",
        "dateFormat": "YYYY-MM-DD",
        "timeFormat": "24-hour, HH:mm",
        "decimalSeparator": "Comma (,)",
        "thousandsSeparator": "Space grouping",
        "addressFormat": "Street, number, postal code, locality, Sweden",
        "postalCodeFormat": "postnummer",
        "primaryTimeZone": "Europe local time zone",
        "measurementSystem": "Metric",
        "paperSize": "A4",
        "emergencyNumber": "112",
        "weekStarts": "Monday",
        "rtlSupport": "No",
        "unicodeLocale": "sv-SE",
        "cldrLocale": "sv_SE",
        "metricVsImperial": "Metric-first"
      },
      "visualIdentity": {
        "countryId": "sweden",
        "outlineLabel": "Sweden outline",
        "mapLabel": "Sweden in the world",
        "continentBadge": "Europe",
        "flagLabel": "Sweden flag",
        "heroAccentPrimary": "15 118 110",
        "heroAccentSecondary": "37 99 235",
        "heroAccentTertiary": "245 158 11"
      },
      "stats": [
        {
          "label": "Premium tools",
          "value": "62",
          "text": "Browser-only local developer workbenches"
        },
        {
          "label": "Core locales",
          "value": "7",
          "text": "Runtime-localized production locales"
        },
        {
          "label": "Field breakdown",
          "value": "100%",
          "text": "Every tool exposes debug slices"
        }
      ],
      "highlights": [
        {
          "title": "Personnummer and Organisationsnummer",
          "text": "Local identifier workbenches split body, prefixes, control evidence, and official lookup boundaries."
        },
        {
          "title": "Moms and payments",
          "text": "Tax, VAT, IBAN, payment reference, and reconciliation tools keep browser-only checks separate from regulated status."
        },
        {
          "title": "Developer debugging",
          "text": "CSV, JSON, API, form, privacy, fixture, and locale tools expose field breakdown and developer payloads."
        }
      ],
      "developerNotes": [
        {
          "title": "No official claims",
          "text": "Offline checks never prove official Sweden registry, tax, bank, vehicle, postal, or identity status."
        },
        {
          "title": "Field breakdown required",
          "text": "Every tool must keep named slices visible because they are the primary debugging surface."
        },
        {
          "title": "Same-country links",
          "text": "Related workbenches stay inside /sweden/ unless a comparison route is explicitly designed."
        }
      ],
      "commonMistakes": [
        {
          "title": "Treating syntax as status",
          "text": "A passing checksum or shape check is not an official lookup result."
        },
        {
          "title": "Logging raw personal data",
          "text": "Use masked previews for tickets, logs, analytics, and screenshots."
        },
        {
          "title": "Ignoring locale separators",
          "text": "Use Comma (,) and Space grouping rules before API normalization."
        },
        {
          "title": "Mixing countries",
          "text": "Do not reuse non-Swedish examples, fallback copy, or related links in this suite."
        }
      ],
      "officialSources": [
        {
          "title": "Bolagsverket",
          "text": "Official business registry or company lookup remains the source of truth for Sweden.",
          "status": "official boundary"
        },
        {
          "title": "Moms",
          "text": "Tax/VAT validity and filing acceptance require the responsible tax authority or VIES where applicable.",
          "status": "official boundary"
        },
        {
          "title": "GDPR / IMY",
          "text": "Privacy obligations require legal/process review outside browser-only diagnostics.",
          "status": "official boundary"
        }
      ],
      "ecosystem": [
        {
          "title": "Identity and tax",
          "text": "Personnummer, Samordningsnummer, Organisationsnummer, Momsregistreringsnummer, postal code, phone",
          "status": "available"
        },
        {
          "title": "Banking and payments",
          "text": "IBAN, Bankgiro, PlusGiro, SWIFT, VIES",
          "status": "available"
        },
        {
          "title": "Developer data QA",
          "text": "CSV, JSON, API, form, OCR, privacy, and fixture helpers.",
          "status": "available"
        }
      ],
      "localizationNotes": [
        {
          "title": "Locale",
          "text": "sv-SE / sv_SE; date YYYY-MM-DD.",
          "status": "available"
        },
        {
          "title": "Numbers",
          "text": "SEK amounts use Comma (,) and Space grouping.",
          "status": "available"
        },
        {
          "title": "Forms",
          "text": "Personnummer, Organisationsnummer, postnummer, phone, address, and IBAN need local labels.",
          "status": "available"
        }
      ],
      "routes": [
        {
          "title": "Swedish Personnummer Validator",
          "href": "/en/sweden/sweden-personnummer-validator/",
          "text": "Validate Personnummer shape, split date/control/body evidence, and prepare privacy-safe debugging output."
        },
        {
          "title": "Swedish Organisationsnummer Validator",
          "href": "/en/sweden/sweden-organisationsnummer-validator/",
          "text": "Inspect Organisationsnummer structure, registry-style prefixes, control digits, and official lookup boundaries."
        },
        {
          "title": "Swedish VAT ID / SE Prefix Validator",
          "href": "/en/sweden/sweden-vat-id-validator/",
          "text": "Normalize SE VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics."
        },
        {
          "title": "Swedish EORI / Customs Identifier Helper",
          "href": "/en/sweden/sweden-eori-validator/",
          "text": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries."
        },
        {
          "title": "Swedish Samordningsnummer Helper",
          "href": "/en/sweden/sweden-samordningsnummer-social-insurance-helper/",
          "text": "Split Samordningsnummer evidence into local body, date hints, checksum notes, and privacy-safe diagnostics."
        },
        {
          "title": "Swedish Company Onboarding Auditor",
          "href": "/en/sweden/sweden-company-onboarding-auditor/",
          "text": "Audit company intake payloads for Organisationsnummer, VAT, address, banking, and official registry handoff readiness."
        },
        {
          "title": "Swedish Bolagsverket Readiness Helper",
          "href": "/en/sweden/sweden-business-register-readiness-helper/",
          "text": "Prepare browser-only evidence before a regulated Bolagsverket lookup or company registry workflow."
        },
        {
          "title": "Swedish ID Card Format Helper",
          "href": "/en/sweden/sweden-id-card-format-helper/",
          "text": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity."
        },
        {
          "title": "Swedish Passport Number Helper",
          "href": "/en/sweden/sweden-passport-number-helper/",
          "text": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence."
        },
        {
          "title": "Swedish MRZ / Passport Parser",
          "href": "/en/sweden/sweden-mrz-passport-parser/",
          "text": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof."
        },
        {
          "title": "Sweden IBAN Validator",
          "href": "/en/sweden/sweden-iban-validator/",
          "text": "Validate SE IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging."
        },
        {
          "title": "Sweden IBAN Generator",
          "href": "/en/sweden/sweden-iban-generator/",
          "text": "Generate SE IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures."
        },
        {
          "title": "Swedish Domestic Bank Account Inspector",
          "href": "/en/sweden/sweden-bank-account-inspector/",
          "text": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries."
        },
        {
          "title": "Swedish BIC / SWIFT Inspector",
          "href": "/en/sweden/sweden-bic-swift-inspector/",
          "text": "Inspect BIC institution, country, location, and branch evidence for Sweden banking integrations."
        },
        {
          "title": "Swedish SEPA Transfer Helper",
          "href": "/en/sweden/sweden-sepa-transfer-helper/",
          "text": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission."
        },
        {
          "title": "Swedish SEPA Direct Debit Mandate Helper",
          "href": "/en/sweden/sweden-sepa-direct-debit-mandate-helper/",
          "text": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness."
        },
        {
          "title": "Swedish Bankgiro / OCR Reference Helper",
          "href": "/en/sweden/sweden-payment-reference-helper/",
          "text": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting."
        },
        {
          "title": "Swedish Remittance Text Builder",
          "href": "/en/sweden/sweden-remittance-text-builder/",
          "text": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence."
        },
        {
          "title": "Swedish Payment Reconciliation Helper",
          "href": "/en/sweden/sweden-payment-reconciliation-helper/",
          "text": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence."
        },
        {
          "title": "Swedish Bank Statement Parser",
          "href": "/en/sweden/sweden-bank-statement-parser/",
          "text": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions."
        },
        {
          "title": "Swedish Masked IBAN Formatter",
          "href": "/en/sweden/sweden-masked-iban-formatter/",
          "text": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence."
        },
        {
          "title": "Swedish SEK Decimal Currency Formatter",
          "href": "/en/sweden/sweden-currency-decimal-formatter/",
          "text": "Normalize SEK amount strings, decimal separators, grouping, and API-safe numeric previews."
        },
        {
          "title": "Swedish VAT Rate Sanity Helper",
          "href": "/en/sweden/sweden-vat-rate-sanity-helper/",
          "text": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries."
        },
        {
          "title": "Swedish VAT Return Field Helper",
          "href": "/en/sweden/sweden-vat-return-field-helper/",
          "text": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads."
        },
        {
          "title": "Swedish Invoice Number Helper",
          "href": "/en/sweden/sweden-invoice-number-helper/",
          "text": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics."
        },
        {
          "title": "Swedish Peppol / Svefaktura Readiness Checker",
          "href": "/en/sweden/sweden-e-invoicing-readiness-checker/",
          "text": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries."
        },
        {
          "title": "Swedish Tax Authority Handoff Helper",
          "href": "/en/sweden/sweden-tax-authority-handoff-helper/",
          "text": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions."
        },
        {
          "title": "Swedish Accounting Audit Trail Checklist Helper",
          "href": "/en/sweden/sweden-accounting-audit-trail-checklist-generator/",
          "text": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs."
        },
        {
          "title": "Swedish Postal Code Validator",
          "href": "/en/sweden/sweden-postal-code-validator/",
          "text": "Validate postnummer shape, split area/delivery hints, and preserve official postal lookup boundaries."
        },
        {
          "title": "Swedish Address Normalizer",
          "href": "/en/sweden/sweden-address-normalizer/",
          "text": "Normalize street, postal code, locality, region, and country lines for local address forms."
        },
        {
          "title": "Swedish Address Transliteration Normalizer",
          "href": "/en/sweden/sweden-address-transliteration-normalizer/",
          "text": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence."
        },
        {
          "title": "Swedish Region / Province Code Mapper",
          "href": "/en/sweden/sweden-region-code-mapper/",
          "text": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries."
        },
        {
          "title": "Swedish Municipality Code Inspector",
          "href": "/en/sweden/sweden-municipality-code-inspector/",
          "text": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries."
        },
        {
          "title": "Swedish Phone Number Validator",
          "href": "/en/sweden/sweden-phone-number-validator/",
          "text": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes."
        },
        {
          "title": "Swedish Phone E.164 Formatter",
          "href": "/en/sweden/sweden-phone-e164-formatter/",
          "text": "Normalize local phone input to E.164-style previews and split country/national evidence."
        },
        {
          "title": "Swedish Date Locale Formatter",
          "href": "/en/sweden/sweden-date-locale-formatter/",
          "text": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics."
        },
        {
          "title": "Swedish CSV Locale Normalizer",
          "href": "/en/sweden/sweden-csv-locale-normalizer/",
          "text": "Normalize CSV snippets for Sweden decimal, date, postal, phone, tax, and banking fields."
        },
        {
          "title": "Swedish Slug Normalizer",
          "href": "/en/sweden/sweden-slug-normalizer/",
          "text": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text."
        },
        {
          "title": "Swedish Document OCR Fixer",
          "href": "/en/sweden/sweden-document-ocr-fixer/",
          "text": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence."
        },
        {
          "title": "Swedish GDPR / IMY Redaction Helper",
          "href": "/en/sweden/sweden-gdpr-redaction-helper/",
          "text": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets."
        },
        {
          "title": "Swedish PII Masker",
          "href": "/en/sweden/sweden-pii-masker/",
          "text": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text."
        },
        {
          "title": "Swedish Personal Data Fixture Helper",
          "href": "/en/sweden/sweden-personal-data-fixture-generator/",
          "text": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries."
        },
        {
          "title": "Swedish Driving Licence Format Helper",
          "href": "/en/sweden/sweden-driving-licence-format-helper/",
          "text": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes."
        },
        {
          "title": "Swedish Residence Permit Format Helper",
          "href": "/en/sweden/sweden-residence-permit-format-helper/",
          "text": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries."
        },
        {
          "title": "Swedish Health Card Format Helper",
          "href": "/en/sweden/sweden-health-card-format-helper/",
          "text": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling."
        },
        {
          "title": "Swedish Vehicle Plate Inspector",
          "href": "/en/sweden/sweden-vehicle-plate-inspector/",
          "text": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries."
        },
        {
          "title": "Swedish VIN Validator",
          "href": "/en/sweden/sweden-vin-validator/",
          "text": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics."
        },
        {
          "title": "Swedish Vehicle Data Redaction Helper",
          "href": "/en/sweden/sweden-vehicle-data-redaction-helper/",
          "text": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs."
        },
        {
          "title": "Swedish Customs Declaration Helper",
          "href": "/en/sweden/sweden-customs-declaration-helper/",
          "text": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing."
        },
        {
          "title": "Swedish Postal Tracking Helper",
          "href": "/en/sweden/sweden-postal-tracking-helper/",
          "text": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries."
        },
        {
          "title": "Swedish Data Quality Workbench",
          "href": "/en/sweden/sweden-data-quality-workbench/",
          "text": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence."
        },
        {
          "title": "Swedish JSON Fixture Helper",
          "href": "/en/sweden/sweden-json-fixture-generator/",
          "text": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests."
        },
        {
          "title": "Swedish Regex Pack Helper",
          "href": "/en/sweden/sweden-regex-pack-helper/",
          "text": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels."
        },
        {
          "title": "Swedish API Payload Auditor",
          "href": "/en/sweden/sweden-api-payload-auditor/",
          "text": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries."
        },
        {
          "title": "Swedish Form Field Auditor",
          "href": "/en/sweden/sweden-form-field-auditor/",
          "text": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy."
        },
        {
          "title": "Swedish Locale Number Parser",
          "href": "/en/sweden/sweden-locale-number-parser/",
          "text": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Sweden."
        },
        {
          "title": "Swedish Calendar Week Helper",
          "href": "/en/sweden/sweden-calendar-week-helper/",
          "text": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values."
        },
        {
          "title": "Swedish Company Suffix Normalizer",
          "href": "/en/sweden/sweden-company-suffix-normalizer/",
          "text": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms."
        },
        {
          "title": "Swedish Procurement Identifier Helper",
          "href": "/en/sweden/sweden-procurement-identifier-helper/",
          "text": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence."
        },
        {
          "title": "Swedish Locale Copy Checker",
          "href": "/en/sweden/sweden-accessibility-locale-copy-checker/",
          "text": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations."
        },
        {
          "title": "Swedish Support Ticket Scrubber",
          "href": "/en/sweden/sweden-support-ticket-scrubber/",
          "text": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets."
        },
        {
          "title": "Swedish Integration Smoke Test Builder",
          "href": "/en/sweden/sweden-integration-smoke-test-builder/",
          "text": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures."
        }
      ]
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
      "nativeName": "Osterreich",
      "iso2": "AT",
      "iso3": "AUT",
      "continent": "Europe",
      "region": "Europe",
      "language": "German",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Austria developer hub for Steuernummer, UID, SVNR, Firmenbuchnummer, postal code, phone, IBAN, SEPA, SWIFT, EPS handoff, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "Steuernummer",
        "UID",
        "SVNR",
        "Firmenbuchnummer",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "SWIFT",
        "EPS handoff",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Austrian SVNR Validator",
        "Austrian Firmenbuchnummer Validator",
        "Austrian VAT ID / AT Prefix Validator",
        "Austrian EORI / Customs Identifier Helper",
        "Austrian Sozialversicherungsnummer Helper",
        "Austrian Company Onboarding Auditor",
        "Austrian Firmenbuch Readiness Helper",
        "Austrian ID Card Format Helper",
        "Austrian Passport Number Helper",
        "Austrian MRZ / Passport Parser",
        "Austria IBAN Validator",
        "Austria IBAN Generator",
        "Austrian Domestic Bank Account Inspector",
        "Austrian BIC / SWIFT Inspector",
        "Austrian SEPA Transfer Helper",
        "Austrian SEPA Direct Debit Mandate Helper",
        "Austrian EPS / SEPA Reference Helper",
        "Austrian Remittance Text Builder",
        "Austrian Payment Reconciliation Helper",
        "Austrian Bank Statement Parser",
        "Austrian Masked IBAN Formatter",
        "Austrian EUR Decimal Currency Formatter",
        "Austrian VAT Rate Sanity Helper",
        "Austrian VAT Return Field Helper",
        "Austrian Invoice Number Helper",
        "Austrian E-Rechnung / ebInterface Readiness Checker",
        "Austrian Tax Authority Handoff Helper",
        "Austrian Accounting Audit Trail Checklist Helper",
        "Austrian Postal Code Validator",
        "Austrian Address Normalizer",
        "Austrian Address Transliteration Normalizer",
        "Austrian Region / Province Code Mapper",
        "Austrian Municipality Code Inspector",
        "Austrian Phone Number Validator",
        "Austrian Phone E.164 Formatter",
        "Austrian Date Locale Formatter",
        "Austrian CSV Locale Normalizer",
        "Austrian Slug Normalizer",
        "Austrian Document OCR Fixer",
        "Austrian GDPR / DSG Redaction Helper",
        "Austrian PII Masker",
        "Austrian Personal Data Fixture Helper",
        "Austrian Driving Licence Format Helper",
        "Austrian Residence Permit Format Helper",
        "Austrian Health Card Format Helper",
        "Austrian Vehicle Plate Inspector",
        "Austrian VIN Validator",
        "Austrian Vehicle Data Redaction Helper",
        "Austrian Customs Declaration Helper",
        "Austrian Postal Tracking Helper",
        "Austrian Data Quality Workbench",
        "Austrian JSON Fixture Helper",
        "Austrian Regex Pack Helper",
        "Austrian API Payload Auditor",
        "Austrian Form Field Auditor",
        "Austrian Locale Number Parser",
        "Austrian Calendar Week Helper",
        "Austrian Company Suffix Normalizer",
        "Austrian Procurement Identifier Helper",
        "Austrian Locale Copy Checker",
        "Austrian Support Ticket Scrubber",
        "Austrian Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Firmenbuch lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 50,
        "y": 58
      }
    },
    {
      "id": "belgium",
      "flag": "🇧🇪",
      "name": "Belgium",
      "nativeName": "Belgique / Belgie",
      "iso2": "BE",
      "iso3": "BEL",
      "continent": "Europe",
      "region": "Europe",
      "language": "Dutch, French, and German",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Belgium developer hub for National Register Number, BIS, KBO/BCE, VAT, postal code, phone, IBAN, SEPA, SWIFT, structured communication, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "National Register Number",
        "BIS",
        "KBO/BCE",
        "VAT",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "SWIFT",
        "structured communication",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Belgian RRN / NISS Validator",
        "Belgian KBO / BCE Validator",
        "Belgian VAT ID / BE Prefix Validator",
        "Belgian EORI / Customs Identifier Helper",
        "Belgian BIS number Helper",
        "Belgian Company Onboarding Auditor",
        "Belgian KBO / BCE register Readiness Helper",
        "Belgian ID Card Format Helper",
        "Belgian Passport Number Helper",
        "Belgian MRZ / Passport Parser",
        "Belgium IBAN Validator",
        "Belgium IBAN Generator",
        "Belgian Domestic Bank Account Inspector",
        "Belgian BIC / SWIFT Inspector",
        "Belgian SEPA Transfer Helper",
        "Belgian SEPA Direct Debit Mandate Helper",
        "Belgian OGM structured communication Reference Helper",
        "Belgian Remittance Text Builder",
        "Belgian Payment Reconciliation Helper",
        "Belgian Bank Statement Parser",
        "Belgian Masked IBAN Formatter",
        "Belgian EUR Decimal Currency Formatter",
        "Belgian VAT Rate Sanity Helper",
        "Belgian VAT Return Field Helper",
        "Belgian Invoice Number Helper",
        "Belgian Peppol / e-invoicing Readiness Checker",
        "Belgian Tax Authority Handoff Helper",
        "Belgian Accounting Audit Trail Checklist Helper",
        "Belgian Postal Code Validator",
        "Belgian Address Normalizer",
        "Belgian Address Transliteration Normalizer",
        "Belgian Region / Province Code Mapper",
        "Belgian Municipality Code Inspector",
        "Belgian Phone Number Validator",
        "Belgian Phone E.164 Formatter",
        "Belgian Date Locale Formatter",
        "Belgian CSV Locale Normalizer",
        "Belgian Slug Normalizer",
        "Belgian Document OCR Fixer",
        "Belgian GDPR / APD-GBA Redaction Helper",
        "Belgian PII Masker",
        "Belgian Personal Data Fixture Helper",
        "Belgian Driving Licence Format Helper",
        "Belgian Residence Permit Format Helper",
        "Belgian Health Card Format Helper",
        "Belgian Vehicle Plate Inspector",
        "Belgian VIN Validator",
        "Belgian Vehicle Data Redaction Helper",
        "Belgian Customs Declaration Helper",
        "Belgian Postal Tracking Helper",
        "Belgian Data Quality Workbench",
        "Belgian JSON Fixture Helper",
        "Belgian Regex Pack Helper",
        "Belgian API Payload Auditor",
        "Belgian Form Field Auditor",
        "Belgian Locale Number Parser",
        "Belgian Calendar Week Helper",
        "Belgian Company Suffix Normalizer",
        "Belgian Procurement Identifier Helper",
        "Belgian Locale Copy Checker",
        "Belgian Support Ticket Scrubber",
        "Belgian Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live KBO / BCE register lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 47,
        "y": 52
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
      "id": "czechia",
      "flag": "🇨🇿",
      "name": "Czechia",
      "nativeName": "Cesko",
      "iso2": "CZ",
      "iso3": "CZE",
      "continent": "Europe",
      "region": "Europe",
      "language": "Czech",
      "currency": "CZK",
      "currencyName": "Czech koruna",
      "status": "available",
      "summary": "Premium Czechia developer hub for Rodne cislo, ICO, DIC, Datova schranka, postal code, phone, IBAN, domestic account, SWIFT, variable symbol, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "Rodne cislo",
        "ICO",
        "DIC",
        "Datova schranka",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "domestic account",
        "SWIFT",
        "variable symbol",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Czech Rodne cislo Validator",
        "Czech ICO Validator",
        "Czech VAT ID / CZ Prefix Validator",
        "Czech EORI / Customs Identifier Helper",
        "Czech social insurance evidence Helper",
        "Czech Company Onboarding Auditor",
        "Czech Ares / business register Readiness Helper",
        "Czech ID Card Format Helper",
        "Czech Passport Number Helper",
        "Czech MRZ / Passport Parser",
        "Czechia IBAN Validator",
        "Czechia IBAN Generator",
        "Czech Domestic Bank Account Inspector",
        "Czech BIC / SWIFT Inspector",
        "Czech SEPA Transfer Helper",
        "Czech SEPA Direct Debit Mandate Helper",
        "Czech variable symbol Reference Helper",
        "Czech Remittance Text Builder",
        "Czech Payment Reconciliation Helper",
        "Czech Bank Statement Parser",
        "Czech Masked IBAN Formatter",
        "Czech CZK Decimal Currency Formatter",
        "Czech VAT Rate Sanity Helper",
        "Czech VAT Return Field Helper",
        "Czech Invoice Number Helper",
        "Czech ISDOC / e-invoicing Readiness Checker",
        "Czech Tax Authority Handoff Helper",
        "Czech Accounting Audit Trail Checklist Helper",
        "Czech Postal Code Validator",
        "Czech Address Normalizer",
        "Czech Address Transliteration Normalizer",
        "Czech Region / Province Code Mapper",
        "Czech Municipality Code Inspector",
        "Czech Phone Number Validator",
        "Czech Phone E.164 Formatter",
        "Czech Date Locale Formatter",
        "Czech CSV Locale Normalizer",
        "Czech Slug Normalizer",
        "Czech Document OCR Fixer",
        "Czech GDPR / UOOU Redaction Helper",
        "Czech PII Masker",
        "Czech Personal Data Fixture Helper",
        "Czech Driving Licence Format Helper",
        "Czech Residence Permit Format Helper",
        "Czech Health Card Format Helper",
        "Czech Vehicle Plate Inspector",
        "Czech VIN Validator",
        "Czech Vehicle Data Redaction Helper",
        "Czech Customs Declaration Helper",
        "Czech Postal Tracking Helper",
        "Czech Data Quality Workbench",
        "Czech JSON Fixture Helper",
        "Czech Regex Pack Helper",
        "Czech API Payload Auditor",
        "Czech Form Field Auditor",
        "Czech Locale Number Parser",
        "Czech Calendar Week Helper",
        "Czech Company Suffix Normalizer",
        "Czech Procurement Identifier Helper",
        "Czech Locale Copy Checker",
        "Czech Support Ticket Scrubber",
        "Czech Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Ares / business register lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 51,
        "y": 55
      }
    },
    {
      "id": "denmark",
      "flag": "🇩🇰",
      "name": "Denmark",
      "nativeName": "Danmark",
      "iso2": "DK",
      "iso3": "DNK",
      "continent": "Europe",
      "region": "Europe",
      "language": "Danish",
      "currency": "DKK",
      "currencyName": "Danish krone",
      "status": "available",
      "summary": "Premium Denmark developer hub for CPR, CVR, SE number, VAT, postal code, phone, IBAN, FI creditor reference, SWIFT, Betalingsservice handoff, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "CPR",
        "CVR",
        "SE number",
        "VAT",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "FI creditor reference",
        "SWIFT",
        "Betalingsservice handoff",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Danish CPR Validator",
        "Danish CVR Validator",
        "Danish VAT ID / DK Prefix Validator",
        "Danish EORI / Customs Identifier Helper",
        "Danish CPR Helper",
        "Danish Company Onboarding Auditor",
        "Danish CVR register Readiness Helper",
        "Danish ID Card Format Helper",
        "Danish Passport Number Helper",
        "Danish MRZ / Passport Parser",
        "Denmark IBAN Validator",
        "Denmark IBAN Generator",
        "Danish Domestic Bank Account Inspector",
        "Danish BIC / SWIFT Inspector",
        "Danish SEPA Transfer Helper",
        "Danish SEPA Direct Debit Mandate Helper",
        "Danish FI / Betalingsservice Reference Helper",
        "Danish Remittance Text Builder",
        "Danish Payment Reconciliation Helper",
        "Danish Bank Statement Parser",
        "Danish Masked IBAN Formatter",
        "Danish DKK Decimal Currency Formatter",
        "Danish VAT Rate Sanity Helper",
        "Danish VAT Return Field Helper",
        "Danish Invoice Number Helper",
        "Danish NemHandel / Peppol Readiness Checker",
        "Danish Tax Authority Handoff Helper",
        "Danish Accounting Audit Trail Checklist Helper",
        "Danish Postal Code Validator",
        "Danish Address Normalizer",
        "Danish Address Transliteration Normalizer",
        "Danish Region / Province Code Mapper",
        "Danish Municipality Code Inspector",
        "Danish Phone Number Validator",
        "Danish Phone E.164 Formatter",
        "Danish Date Locale Formatter",
        "Danish CSV Locale Normalizer",
        "Danish Slug Normalizer",
        "Danish Document OCR Fixer",
        "Danish GDPR / Datatilsynet Redaction Helper",
        "Danish PII Masker",
        "Danish Personal Data Fixture Helper",
        "Danish Driving Licence Format Helper",
        "Danish Residence Permit Format Helper",
        "Danish Health Card Format Helper",
        "Danish Vehicle Plate Inspector",
        "Danish VIN Validator",
        "Danish Vehicle Data Redaction Helper",
        "Danish Customs Declaration Helper",
        "Danish Postal Tracking Helper",
        "Danish Data Quality Workbench",
        "Danish JSON Fixture Helper",
        "Danish Regex Pack Helper",
        "Danish API Payload Auditor",
        "Danish Form Field Auditor",
        "Danish Locale Number Parser",
        "Danish Calendar Week Helper",
        "Danish Company Suffix Normalizer",
        "Danish Procurement Identifier Helper",
        "Danish Locale Copy Checker",
        "Danish Support Ticket Scrubber",
        "Danish Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live CVR register lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 51,
        "y": 45
      }
    },
    {
      "id": "finland",
      "flag": "🇫🇮",
      "name": "Finland",
      "nativeName": "Suomi",
      "iso2": "FI",
      "iso3": "FIN",
      "continent": "Europe",
      "region": "Europe",
      "language": "Finnish and Swedish",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Finland developer hub for HETU, Y-tunnus, VAT, OVT, postal code, phone, IBAN, Finnish reference number, SWIFT, SEPA, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "HETU",
        "Y-tunnus",
        "VAT",
        "OVT",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "Finnish reference number",
        "SWIFT",
        "SEPA",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Finnish HETU Validator",
        "Finnish Y-tunnus Validator",
        "Finnish VAT ID / FI Prefix Validator",
        "Finnish EORI / Customs Identifier Helper",
        "Finnish HETU Helper",
        "Finnish Company Onboarding Auditor",
        "Finnish YTJ / Trade Register Readiness Helper",
        "Finnish ID Card Format Helper",
        "Finnish Passport Number Helper",
        "Finnish MRZ / Passport Parser",
        "Finland IBAN Validator",
        "Finland IBAN Generator",
        "Finnish Domestic Bank Account Inspector",
        "Finnish BIC / SWIFT Inspector",
        "Finnish SEPA Transfer Helper",
        "Finnish SEPA Direct Debit Mandate Helper",
        "Finnish viitenumero Reference Helper",
        "Finnish Remittance Text Builder",
        "Finnish Payment Reconciliation Helper",
        "Finnish Bank Statement Parser",
        "Finnish Masked IBAN Formatter",
        "Finnish EUR Decimal Currency Formatter",
        "Finnish VAT Rate Sanity Helper",
        "Finnish VAT Return Field Helper",
        "Finnish Invoice Number Helper",
        "Finnish Finvoice / Peppol Readiness Checker",
        "Finnish Tax Authority Handoff Helper",
        "Finnish Accounting Audit Trail Checklist Helper",
        "Finnish Postal Code Validator",
        "Finnish Address Normalizer",
        "Finnish Address Transliteration Normalizer",
        "Finnish Region / Province Code Mapper",
        "Finnish Municipality Code Inspector",
        "Finnish Phone Number Validator",
        "Finnish Phone E.164 Formatter",
        "Finnish Date Locale Formatter",
        "Finnish CSV Locale Normalizer",
        "Finnish Slug Normalizer",
        "Finnish Document OCR Fixer",
        "Finnish GDPR / Tietosuojavaltuutettu Redaction Helper",
        "Finnish PII Masker",
        "Finnish Personal Data Fixture Helper",
        "Finnish Driving Licence Format Helper",
        "Finnish Residence Permit Format Helper",
        "Finnish Health Card Format Helper",
        "Finnish Vehicle Plate Inspector",
        "Finnish VIN Validator",
        "Finnish Vehicle Data Redaction Helper",
        "Finnish Customs Declaration Helper",
        "Finnish Postal Tracking Helper",
        "Finnish Data Quality Workbench",
        "Finnish JSON Fixture Helper",
        "Finnish Regex Pack Helper",
        "Finnish API Payload Auditor",
        "Finnish Form Field Auditor",
        "Finnish Locale Number Parser",
        "Finnish Calendar Week Helper",
        "Finnish Company Suffix Normalizer",
        "Finnish Procurement Identifier Helper",
        "Finnish Locale Copy Checker",
        "Finnish Support Ticket Scrubber",
        "Finnish Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live YTJ / Trade Register lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 58,
        "y": 32
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
      "searchHints": [
        "SIREN",
        "SIRET",
        "TVA",
        "RIB",
        "RUM",
        "NIR"
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
      "searchHints": [
        "STEUER-ID",
        "UST-ID",
        "BLZ",
        "IBAN",
        "ELSTER",
        "XRECHNUNG"
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
      "id": "ireland",
      "flag": "🇮🇪",
      "name": "Ireland",
      "nativeName": "Ireland / Eire",
      "iso2": "IE",
      "iso3": "IRL",
      "continent": "Europe",
      "region": "Europe",
      "language": "English and Irish",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Ireland developer hub for PPSN, CRO number, VAT, Eircode, postal address, phone, IBAN, SEPA, SWIFT, ROS handoff, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "PPSN",
        "CRO number",
        "VAT",
        "Eircode",
        "postal address",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "SWIFT",
        "ROS handoff",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Irish PPSN Validator",
        "Irish CRO number Validator",
        "Irish VAT ID / IE Prefix Validator",
        "Irish EORI / Customs Identifier Helper",
        "Irish PPSN Helper",
        "Irish Company Onboarding Auditor",
        "Irish Companies Registration Office Readiness Helper",
        "Irish ID Card Format Helper",
        "Irish Passport Number Helper",
        "Irish MRZ / Passport Parser",
        "Ireland IBAN Validator",
        "Ireland IBAN Generator",
        "Irish Domestic Bank Account Inspector",
        "Irish BIC / SWIFT Inspector",
        "Irish SEPA Transfer Helper",
        "Irish SEPA Direct Debit Mandate Helper",
        "Irish SEPA / Direct Debit Reference Helper",
        "Irish Remittance Text Builder",
        "Irish Payment Reconciliation Helper",
        "Irish Bank Statement Parser",
        "Irish Masked IBAN Formatter",
        "Irish EUR Decimal Currency Formatter",
        "Irish VAT Rate Sanity Helper",
        "Irish VAT Return Field Helper",
        "Irish Invoice Number Helper",
        "Irish Revenue e-invoicing readiness Readiness Checker",
        "Irish Tax Authority Handoff Helper",
        "Irish Accounting Audit Trail Checklist Helper",
        "Irish Postal Code Validator",
        "Irish Address Normalizer",
        "Irish Address Transliteration Normalizer",
        "Irish Region / Province Code Mapper",
        "Irish Municipality Code Inspector",
        "Irish Phone Number Validator",
        "Irish Phone E.164 Formatter",
        "Irish Date Locale Formatter",
        "Irish CSV Locale Normalizer",
        "Irish Slug Normalizer",
        "Irish Document OCR Fixer",
        "Irish GDPR / Data Protection Commission Redaction Helper",
        "Irish PII Masker",
        "Irish Personal Data Fixture Helper",
        "Irish Driving Licence Format Helper",
        "Irish Residence Permit Format Helper",
        "Irish Health Card Format Helper",
        "Irish Vehicle Plate Inspector",
        "Irish VIN Validator",
        "Irish Vehicle Data Redaction Helper",
        "Irish Customs Declaration Helper",
        "Irish Postal Tracking Helper",
        "Irish Data Quality Workbench",
        "Irish JSON Fixture Helper",
        "Irish Regex Pack Helper",
        "Irish API Payload Auditor",
        "Irish Form Field Auditor",
        "Irish Locale Number Parser",
        "Irish Calendar Week Helper",
        "Irish Company Suffix Normalizer",
        "Irish Procurement Identifier Helper",
        "Irish Locale Copy Checker",
        "Irish Support Ticket Scrubber",
        "Irish Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Companies Registration Office lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 42,
        "y": 49
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
      "status": "available",
      "summary": "Premium Italy developer hub for codice fiscale, Partita IVA, e-invoicing, banking, locale, privacy, vehicles, and browser-only data-quality workflows.",
      "identifiers": [
        "Codice fiscale",
        "Partita IVA",
        "Codice destinatario",
        "PEC",
        "REA",
        "IBAN",
        "CAP"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "FatturaPA",
        "pagoPA",
        "Ri.Ba"
      ],
      "searchHints": [
        "CODICE FISCALE",
        "PARTITA IVA",
        "PAGOPA",
        "SDI",
        "PEC",
        "ABI/CAB"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Italian Codice Fiscale Validator",
        "Italian Partita IVA Validator",
        "Italian VAT ID / IT Prefix Validator",
        "Italian EORI / Customs Identifier Helper",
        "Italian Codice Destinatario Helper",
        "Italian PEC Address Helper",
        "Italian REA Number Helper",
        "Italian Registro Imprese Readiness Helper",
        "Italian ATECO Code Inspector",
        "Italian SPID / CIE Boundary Helper",
        "Italian Company Onboarding Auditor",
        "Italian IBAN Validator",
        "Italian ABI / CAB Bank Code Inspector",
        "Italian BIC / SWIFT Inspector",
        "Italian SEPA Transfer Helper",
        "Italian SEPA Direct Debit Mandate Helper",
        "Italian Ri.Ba Payment Helper",
        "Italian pagoPA Notice Helper",
        "Italian Remittance Text Builder",
        "Italian Payment Reconciliation Helper",
        "Italian Bank Statement Parser",
        "Italian Masked IBAN Formatter",
        "Italian FatturaPA XML Readiness Checker",
        "Italian SDI Invoice Routing Helper",
        "Italian VAT Rate Sanity Helper",
        "Italian VAT Return Field Helper",
        "Italian Invoice Number Helper",
        "Italian E-Invoicing Readiness Helper",
        "Italian Accounting Audit Trail Checklist Helper",
        "Italian EUR Decimal Currency Formatter",
        "Italian CAP Postal Code Validator",
        "Italian Address Normalizer",
        "Italian Address Transliteration Normalizer",
        "Italian Province Code Mapper",
        "Italian Municipality / Belfiore Code Inspector",
        "Italian Phone Number Validator",
        "Italian Phone E.164 Formatter",
        "Italian Date Locale Formatter",
        "Italian CSV Locale Normalizer",
        "Italian Slug Normalizer",
        "Italian Document OCR Fixer",
        "Italian GDPR / Privacy Redaction Helper",
        "Italian PII Masker",
        "Italian Personal Data Fixture Helper",
        "Italian ID Card Format Helper",
        "Italian Passport Number Helper",
        "Italian Driving Licence Format Helper",
        "Italian Residence Permit Format Helper",
        "Italian Tessera Sanitaria Format Helper",
        "Italian Vehicle Plate Inspector",
        "Italian VIN Validator",
        "Italian Vehicle Data Redaction Helper",
        "Italian Customs Declaration Helper",
        "Italian Postal Tracking Helper",
        "Italian Data Quality Workbench",
        "Italian JSON Fixture Helper",
        "Italian Regex Pack Helper",
        "Italian API Payload Auditor",
        "Italian Form Field Auditor",
        "Italian MRZ / Passport Parser"
      ],
      "plannedWorkbenches": [
        "Live Agenzia Entrate status lookup",
        "Live Registro Imprese lookup",
        "Live SDI delivery status lookup",
        "Live bank directory lookup"
      ],
      "completion": 100,
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
      "searchHints": [
        "BSN",
        "RSIN",
        "KVK",
        "BTW",
        "iDEAL",
        "BAG"
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
      "id": "norway",
      "flag": "🇳🇴",
      "name": "Norway",
      "nativeName": "Norge",
      "iso2": "NO",
      "iso3": "NOR",
      "continent": "Europe",
      "region": "Europe",
      "language": "Norwegian",
      "currency": "NOK",
      "currencyName": "Norwegian krone",
      "status": "available",
      "summary": "Premium Norway developer hub for Fodselsnummer, D-number, Organisasjonsnummer, MVA, postal code, phone, IBAN, KID, SWIFT, AvtaleGiro handoff, VAT handoff, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "Fodselsnummer",
        "D-number",
        "Organisasjonsnummer",
        "MVA",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "KID",
        "SWIFT",
        "AvtaleGiro handoff",
        "VAT handoff"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Norwegian Fodselsnummer Validator",
        "Norwegian Organisasjonsnummer Validator",
        "Norwegian VAT ID / NO Prefix Validator",
        "Norwegian EORI / Customs Identifier Helper",
        "Norwegian D-number Helper",
        "Norwegian Company Onboarding Auditor",
        "Norwegian Brreg Readiness Helper",
        "Norwegian ID Card Format Helper",
        "Norwegian Passport Number Helper",
        "Norwegian MRZ / Passport Parser",
        "Norway IBAN Validator",
        "Norway IBAN Generator",
        "Norwegian Domestic Bank Account Inspector",
        "Norwegian BIC / SWIFT Inspector",
        "Norwegian SEPA Transfer Helper",
        "Norwegian SEPA Direct Debit Mandate Helper",
        "Norwegian KID reference Reference Helper",
        "Norwegian Remittance Text Builder",
        "Norwegian Payment Reconciliation Helper",
        "Norwegian Bank Statement Parser",
        "Norwegian Masked IBAN Formatter",
        "Norwegian NOK Decimal Currency Formatter",
        "Norwegian VAT Rate Sanity Helper",
        "Norwegian VAT Return Field Helper",
        "Norwegian Invoice Number Helper",
        "Norwegian EHF / Peppol Readiness Checker",
        "Norwegian Tax Authority Handoff Helper",
        "Norwegian Accounting Audit Trail Checklist Helper",
        "Norwegian Postal Code Validator",
        "Norwegian Address Normalizer",
        "Norwegian Address Transliteration Normalizer",
        "Norwegian Region / Province Code Mapper",
        "Norwegian Municipality Code Inspector",
        "Norwegian Phone Number Validator",
        "Norwegian Phone E.164 Formatter",
        "Norwegian Date Locale Formatter",
        "Norwegian CSV Locale Normalizer",
        "Norwegian Slug Normalizer",
        "Norwegian Document OCR Fixer",
        "Norwegian GDPR / Datatilsynet Redaction Helper",
        "Norwegian PII Masker",
        "Norwegian Personal Data Fixture Helper",
        "Norwegian Driving Licence Format Helper",
        "Norwegian Residence Permit Format Helper",
        "Norwegian Health Card Format Helper",
        "Norwegian Vehicle Plate Inspector",
        "Norwegian VIN Validator",
        "Norwegian Vehicle Data Redaction Helper",
        "Norwegian Customs Declaration Helper",
        "Norwegian Postal Tracking Helper",
        "Norwegian Data Quality Workbench",
        "Norwegian JSON Fixture Helper",
        "Norwegian Regex Pack Helper",
        "Norwegian API Payload Auditor",
        "Norwegian Form Field Auditor",
        "Norwegian Locale Number Parser",
        "Norwegian Calendar Week Helper",
        "Norwegian Company Suffix Normalizer",
        "Norwegian Procurement Identifier Helper",
        "Norwegian Locale Copy Checker",
        "Norwegian Support Ticket Scrubber",
        "Norwegian Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Brreg lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 52,
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
      "nativeName": "Portugal",
      "iso2": "PT",
      "iso3": "PRT",
      "continent": "Europe",
      "region": "Europe",
      "language": "Portuguese",
      "currency": "EUR",
      "currencyName": "Euro",
      "status": "available",
      "summary": "Premium Portugal developer hub for NIF, NISS, Cartao de Cidadao, NIPC, postal code, phone, IBAN, SEPA, SWIFT, Multibanco reference, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "NIF",
        "NISS",
        "Cartao de Cidadao",
        "NIPC",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SEPA",
        "SWIFT",
        "Multibanco reference",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Portuguese NIF Validator",
        "Portuguese NIPC Validator",
        "Portuguese VAT ID / PT Prefix Validator",
        "Portuguese EORI / Customs Identifier Helper",
        "Portuguese NISS Helper",
        "Portuguese Company Onboarding Auditor",
        "Portuguese Registo Comercial Readiness Helper",
        "Portuguese ID Card Format Helper",
        "Portuguese Passport Number Helper",
        "Portuguese MRZ / Passport Parser",
        "Portugal IBAN Validator",
        "Portugal IBAN Generator",
        "Portuguese Domestic Bank Account Inspector",
        "Portuguese BIC / SWIFT Inspector",
        "Portuguese SEPA Transfer Helper",
        "Portuguese SEPA Direct Debit Mandate Helper",
        "Portuguese Multibanco Reference Helper",
        "Portuguese Remittance Text Builder",
        "Portuguese Payment Reconciliation Helper",
        "Portuguese Bank Statement Parser",
        "Portuguese Masked IBAN Formatter",
        "Portuguese EUR Decimal Currency Formatter",
        "Portuguese VAT Rate Sanity Helper",
        "Portuguese VAT Return Field Helper",
        "Portuguese Invoice Number Helper",
        "Portuguese SAF-T / e-Fatura Readiness Checker",
        "Portuguese Tax Authority Handoff Helper",
        "Portuguese Accounting Audit Trail Checklist Helper",
        "Portuguese Postal Code Validator",
        "Portuguese Address Normalizer",
        "Portuguese Address Transliteration Normalizer",
        "Portuguese Region / Province Code Mapper",
        "Portuguese Municipality Code Inspector",
        "Portuguese Phone Number Validator",
        "Portuguese Phone E.164 Formatter",
        "Portuguese Date Locale Formatter",
        "Portuguese CSV Locale Normalizer",
        "Portuguese Slug Normalizer",
        "Portuguese Document OCR Fixer",
        "Portuguese GDPR / CNPD Redaction Helper",
        "Portuguese PII Masker",
        "Portuguese Personal Data Fixture Helper",
        "Portuguese Driving Licence Format Helper",
        "Portuguese Residence Permit Format Helper",
        "Portuguese Health Card Format Helper",
        "Portuguese Vehicle Plate Inspector",
        "Portuguese VIN Validator",
        "Portuguese Vehicle Data Redaction Helper",
        "Portuguese Customs Declaration Helper",
        "Portuguese Postal Tracking Helper",
        "Portuguese Data Quality Workbench",
        "Portuguese JSON Fixture Helper",
        "Portuguese Regex Pack Helper",
        "Portuguese API Payload Auditor",
        "Portuguese Form Field Auditor",
        "Portuguese Locale Number Parser",
        "Portuguese Calendar Week Helper",
        "Portuguese Company Suffix Normalizer",
        "Portuguese Procurement Identifier Helper",
        "Portuguese Locale Copy Checker",
        "Portuguese Support Ticket Scrubber",
        "Portuguese Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Registo Comercial lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 38,
        "y": 62
      }
    },
    {
      "id": "romania",
      "flag": "🇷🇴",
      "name": "Romania",
      "nativeName": "Romania",
      "iso2": "RO",
      "iso3": "ROU",
      "continent": "Europe",
      "region": "Europe",
      "language": "Romanian",
      "currency": "RON",
      "currencyName": "Romanian leu",
      "status": "available",
      "summary": "Premium Romania developer hub for CNP, CUI, CIF, ONRC, postal code, phone, IBAN, SWIFT, ANAF handoff, e-Factura handoff, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "CNP",
        "CUI",
        "CIF",
        "ONRC",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "SWIFT",
        "ANAF handoff",
        "e-Factura handoff",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Romanian CNP Validator",
        "Romanian CUI / CIF Validator",
        "Romanian VAT ID / RO Prefix Validator",
        "Romanian EORI / Customs Identifier Helper",
        "Romanian CNP Helper",
        "Romanian Company Onboarding Auditor",
        "Romanian ONRC Readiness Helper",
        "Romanian ID Card Format Helper",
        "Romanian Passport Number Helper",
        "Romanian MRZ / Passport Parser",
        "Romania IBAN Validator",
        "Romania IBAN Generator",
        "Romanian Domestic Bank Account Inspector",
        "Romanian BIC / SWIFT Inspector",
        "Romanian SEPA Transfer Helper",
        "Romanian SEPA Direct Debit Mandate Helper",
        "Romanian treasury / SEPA handoff Reference Helper",
        "Romanian Remittance Text Builder",
        "Romanian Payment Reconciliation Helper",
        "Romanian Bank Statement Parser",
        "Romanian Masked IBAN Formatter",
        "Romanian RON Decimal Currency Formatter",
        "Romanian VAT Rate Sanity Helper",
        "Romanian VAT Return Field Helper",
        "Romanian Invoice Number Helper",
        "Romanian RO e-Factura / ANAF Readiness Checker",
        "Romanian Tax Authority Handoff Helper",
        "Romanian Accounting Audit Trail Checklist Helper",
        "Romanian Postal Code Validator",
        "Romanian Address Normalizer",
        "Romanian Address Transliteration Normalizer",
        "Romanian Region / Province Code Mapper",
        "Romanian Municipality Code Inspector",
        "Romanian Phone Number Validator",
        "Romanian Phone E.164 Formatter",
        "Romanian Date Locale Formatter",
        "Romanian CSV Locale Normalizer",
        "Romanian Slug Normalizer",
        "Romanian Document OCR Fixer",
        "Romanian GDPR / ANSPDCP Redaction Helper",
        "Romanian PII Masker",
        "Romanian Personal Data Fixture Helper",
        "Romanian Driving Licence Format Helper",
        "Romanian Residence Permit Format Helper",
        "Romanian Health Card Format Helper",
        "Romanian Vehicle Plate Inspector",
        "Romanian VIN Validator",
        "Romanian Vehicle Data Redaction Helper",
        "Romanian Customs Declaration Helper",
        "Romanian Postal Tracking Helper",
        "Romanian Data Quality Workbench",
        "Romanian JSON Fixture Helper",
        "Romanian Regex Pack Helper",
        "Romanian API Payload Auditor",
        "Romanian Form Field Auditor",
        "Romanian Locale Number Parser",
        "Romanian Calendar Week Helper",
        "Romanian Company Suffix Normalizer",
        "Romanian Procurement Identifier Helper",
        "Romanian Locale Copy Checker",
        "Romanian Support Ticket Scrubber",
        "Romanian Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live ONRC lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 58,
        "y": 62
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
      "status": "available",
      "summary": "Premium Spain developer hub for DNI, NIE, NIF, CIF, IVA/VAT, IBAN/CCC, SEPA, Bizum, AEAT, Facturae, locale, privacy, vehicles, and browser-only data-quality workflows.",
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
      "availableWorkbenches": [
        "Spain DNI/NIE/NIF/CIF Workbench",
        "Spanish NIF Validator",
        "Spanish DNI Validator",
        "Spanish NIE Validator",
        "Spanish CIF Legacy Inspector",
        "Spanish VAT ID / ES Prefix Validator",
        "Spanish EORI / Customs Identifier Helper",
        "Spanish NAF Social Security Helper",
        "Spanish Company Onboarding Auditor",
        "Spanish Registro Mercantil Readiness Helper",
        "Spain IBAN Validator",
        "Spanish CCC Bank Account Inspector",
        "Spanish Bank / Branch Code Inspector",
        "Spanish BIC / SWIFT Inspector",
        "Spanish SEPA Transfer Helper",
        "Spanish SEPA Direct Debit Mandate Helper",
        "Spanish Bizum Reference Helper",
        "Spanish Remittance Text Builder",
        "Spanish Payment Reconciliation Helper",
        "Spanish Bank Statement Parser",
        "Spanish Masked IBAN Formatter",
        "Spanish EUR Decimal Currency Formatter",
        "Spanish VAT Rate Sanity Helper",
        "Spanish VAT Return Field Helper",
        "Spanish Invoice Number Helper",
        "Spanish Facturae XML Readiness Checker",
        "Spanish VeriFactu Readiness Helper",
        "Spanish SII VAT Ledger Helper",
        "Spanish AEAT Modelo Readiness Helper",
        "Spanish Accounting Audit Trail Checklist Helper",
        "Spanish Postal Code Validator",
        "Spanish Address Normalizer",
        "Spanish Address Transliteration Normalizer",
        "Spanish Province Code Mapper",
        "Spanish Municipality Code Inspector",
        "Spanish Phone Number Validator",
        "Spanish Phone E.164 Formatter",
        "Spanish Date Locale Formatter",
        "Spanish CSV Locale Normalizer",
        "Spanish Slug Normalizer",
        "Spanish Document OCR Fixer",
        "Spanish GDPR / LOPDGDD Redaction Helper",
        "Spanish PII Masker",
        "Spanish Personal Data Fixture Helper",
        "Spanish ID Card Format Helper",
        "Spanish Passport Number Helper",
        "Spanish Driving Licence Format Helper",
        "Spanish Residence Permit Format Helper",
        "Spanish Health Card Format Helper",
        "Spanish Vehicle Plate Inspector",
        "Spanish VIN Validator",
        "Spanish Vehicle Data Redaction Helper",
        "Spanish Customs Declaration Helper",
        "Spanish Postal Tracking Helper",
        "Spanish Data Quality Workbench",
        "Spanish JSON Fixture Helper",
        "Spanish Regex Pack Helper",
        "Spanish API Payload Auditor",
        "Spanish Form Field Auditor",
        "Spanish MRZ / Passport Parser"
      ],
      "plannedWorkbenches": [
        "Live AEAT tax status lookup",
        "Live VIES VAT confirmation",
        "Live bank ownership lookup",
        "Live DGT vehicle registry lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 49,
        "y": 41
      }
    },
    {
      "id": "sweden",
      "flag": "🇸🇪",
      "name": "Sweden",
      "nativeName": "Sverige",
      "iso2": "SE",
      "iso3": "SWE",
      "continent": "Europe",
      "region": "Europe",
      "language": "Swedish",
      "currency": "SEK",
      "currencyName": "Swedish krona",
      "status": "available",
      "summary": "Premium Sweden developer hub for Personnummer, Samordningsnummer, Organisationsnummer, Momsregistreringsnummer, postal code, phone, IBAN, Bankgiro, PlusGiro, SWIFT, VIES, locale, privacy, vehicles, documents, and browser-only data-quality workflows.",
      "identifiers": [
        "Personnummer",
        "Samordningsnummer",
        "Organisationsnummer",
        "Momsregistreringsnummer",
        "postal code",
        "phone"
      ],
      "payments": [
        "IBAN",
        "Bankgiro",
        "PlusGiro",
        "SWIFT",
        "VIES"
      ],
      "features": [
        "payments",
        "identity",
        "government",
        "banking"
      ],
      "availableWorkbenches": [
        "Swedish Personnummer Validator",
        "Swedish Organisationsnummer Validator",
        "Swedish VAT ID / SE Prefix Validator",
        "Swedish EORI / Customs Identifier Helper",
        "Swedish Samordningsnummer Helper",
        "Swedish Company Onboarding Auditor",
        "Swedish Bolagsverket Readiness Helper",
        "Swedish ID Card Format Helper",
        "Swedish Passport Number Helper",
        "Swedish MRZ / Passport Parser",
        "Sweden IBAN Validator",
        "Sweden IBAN Generator",
        "Swedish Domestic Bank Account Inspector",
        "Swedish BIC / SWIFT Inspector",
        "Swedish SEPA Transfer Helper",
        "Swedish SEPA Direct Debit Mandate Helper",
        "Swedish Bankgiro / OCR Reference Helper",
        "Swedish Remittance Text Builder",
        "Swedish Payment Reconciliation Helper",
        "Swedish Bank Statement Parser",
        "Swedish Masked IBAN Formatter",
        "Swedish SEK Decimal Currency Formatter",
        "Swedish VAT Rate Sanity Helper",
        "Swedish VAT Return Field Helper",
        "Swedish Invoice Number Helper",
        "Swedish Peppol / Svefaktura Readiness Checker",
        "Swedish Tax Authority Handoff Helper",
        "Swedish Accounting Audit Trail Checklist Helper",
        "Swedish Postal Code Validator",
        "Swedish Address Normalizer",
        "Swedish Address Transliteration Normalizer",
        "Swedish Region / Province Code Mapper",
        "Swedish Municipality Code Inspector",
        "Swedish Phone Number Validator",
        "Swedish Phone E.164 Formatter",
        "Swedish Date Locale Formatter",
        "Swedish CSV Locale Normalizer",
        "Swedish Slug Normalizer",
        "Swedish Document OCR Fixer",
        "Swedish GDPR / IMY Redaction Helper",
        "Swedish PII Masker",
        "Swedish Personal Data Fixture Helper",
        "Swedish Driving Licence Format Helper",
        "Swedish Residence Permit Format Helper",
        "Swedish Health Card Format Helper",
        "Swedish Vehicle Plate Inspector",
        "Swedish VIN Validator",
        "Swedish Vehicle Data Redaction Helper",
        "Swedish Customs Declaration Helper",
        "Swedish Postal Tracking Helper",
        "Swedish Data Quality Workbench",
        "Swedish JSON Fixture Helper",
        "Swedish Regex Pack Helper",
        "Swedish API Payload Auditor",
        "Swedish Form Field Auditor",
        "Swedish Locale Number Parser",
        "Swedish Calendar Week Helper",
        "Swedish Company Suffix Normalizer",
        "Swedish Procurement Identifier Helper",
        "Swedish Locale Copy Checker",
        "Swedish Support Ticket Scrubber",
        "Swedish Integration Smoke Test Builder"
      ],
      "plannedWorkbenches": [
        "Live Bolagsverket lookup",
        "Live VAT/tax status confirmation",
        "Live bank ownership lookup",
        "Live vehicle or postal provider lookup"
      ],
      "completion": 100,
      "coordinates": {
        "x": 55,
        "y": 38
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
