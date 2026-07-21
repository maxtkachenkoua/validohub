(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.sweden-suite';
  const RAW_TOOLS = [
  {
    "id": "sweden-personnummer-validator",
    "name": "Swedish Personnummer Validator",
    "code": "ID",
    "summary": "Validate Personnummer shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236"
      },
      {
        "label": "Invalid sample",
        "value": "850101-1237"
      },
      {
        "label": "Short sample",
        "value": "850101-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236"
      },
      {
        "label": "Edge sample",
        "value": "Review SE ID edge 1"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Swedish Personnummer Validator analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid ID examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized ID values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-organisationsnummer-validator",
    "name": "Swedish Organisationsnummer Validator",
    "code": "ORG",
    "summary": "Inspect Organisationsnummer structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "556016-0680"
      },
      {
        "label": "Invalid sample",
        "value": "556016-0681"
      },
      {
        "label": "Short sample",
        "value": "556016-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 556016-0680"
      },
      {
        "label": "Edge sample",
        "value": "Review SE ORG edge 2"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Swedish Organisationsnummer Validator analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid ORG examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized ORG values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vat-id-validator",
    "name": "Swedish VAT ID / SE Prefix Validator",
    "code": "VAT",
    "summary": "Normalize SE VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE556016068001"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ556016068001"
      },
      {
        "label": "Short sample",
        "value": "SE556016"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ556016068001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE VAT edge 3"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VAT local evidence",
        "text": "Swedish VAT ID / SE Prefix Validator analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid VAT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized VAT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-eori-validator",
    "name": "Swedish EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE556016-0680"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ556016-0680"
      },
      {
        "label": "Short sample",
        "value": "SE556016"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ556016-0680"
      },
      {
        "label": "Edge sample",
        "value": "Review SE EORI edge 4"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EORI local evidence",
        "text": "Swedish EORI / Customs Identifier Helper analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid EORI examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized EORI values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-samordningsnummer-social-insurance-helper",
    "name": "Swedish Samordningsnummer Helper",
    "code": "SOC",
    "summary": "Split Samordningsnummer evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236"
      },
      {
        "label": "Invalid sample",
        "value": "850101-1237"
      },
      {
        "label": "Short sample",
        "value": "850101-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SOC edge 5"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Swedish Samordningsnummer Helper analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SOC examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SOC values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-company-onboarding-auditor",
    "name": "Swedish Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for Organisationsnummer, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257467\"}"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE KYC edge 6"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Swedish Company Onboarding Auditor analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid KYC examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized KYC values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-business-register-readiness-helper",
    "name": "Swedish Bolagsverket Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated Bolagsverket lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "556016-0680 SE556016068001 Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "556016-0680 SE556016068001 Drottninggatan 1, 111 21 Stockholm"
      },
      {
        "label": "Short sample",
        "value": "556016-0680 SE556016068001 Drottni"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 556016-0680 SE556016068001 Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE REG edge 7"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Swedish Bolagsverket Readiness Helper analyzes Sweden-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid REG examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized REG values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-id-card-format-helper",
    "name": "Swedish ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE CARD 8"
      },
      {
        "label": "Short sample",
        "value": "850101-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236"
      },
      {
        "label": "Edge sample",
        "value": "Review SE CARD edge 8"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Swedish ID Card Format Helper analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CARD examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CARD values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-passport-number-helper",
    "name": "Swedish Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<SWESWEDISH<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PASS 9"
      },
      {
        "label": "Short sample",
        "value": "P<SWESWEDISH<<SAMPLE<"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE P<SWESWEDISH<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PASS edge 9"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Swedish Passport Number Helper analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PASS examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PASS values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-mrz-passport-parser",
    "name": "Swedish MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<SWESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567SWE8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE MRZ 10"
      },
      {
        "label": "Short sample",
        "value": "P<SWESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE P<SWESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567SWE8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Edge sample",
        "value": "Review SE MRZ edge 10"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Swedish MRZ / Passport Parser analyzes Sweden-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid MRZ examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized MRZ values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-iban-validator",
    "name": "Sweden IBAN Validator",
    "code": "IBAN",
    "summary": "Validate SE IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE4550000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ4550000000058398257466"
      },
      {
        "label": "Short sample",
        "value": "SE455000000005"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ4550000000058398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE IBAN edge 11"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBAN local evidence",
        "text": "Sweden IBAN Validator analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid IBAN examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized IBAN values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-iban-generator",
    "name": "Sweden IBAN Generator",
    "code": "IBG",
    "summary": "Generate SE IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "50000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix SE 50000000058398257466"
      },
      {
        "label": "Short sample",
        "value": "50000000058"
      },
      {
        "label": "Grouped valid sample",
        "value": "5000 0000 0583 9825 7466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE IBG edge 12"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBG local evidence",
        "text": "Sweden IBAN Generator analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid IBG examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized IBG values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-bank-account-inspector",
    "name": "Swedish Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "5000 58398257466"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE BANK 13"
      },
      {
        "label": "Short sample",
        "value": "5000 5839"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 5000 58398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE BANK edge 13"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Swedish Domestic Bank Account Inspector analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid BANK examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized BANK values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-bic-swift-inspector",
    "name": "Swedish BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Sweden banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDSE2X"
      },
      {
        "label": "Invalid sample",
        "value": "ZZCDSE2X"
      },
      {
        "label": "Short sample",
        "value": "ABCDS"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZCDSE2X"
      },
      {
        "label": "Edge sample",
        "value": "Review SE BIC edge 14"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Swedish BIC / SWIFT Inspector analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid BIC examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized BIC values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-sepa-transfer-helper",
    "name": "Swedish SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE4550000000058398257466\\n1 234,56 SEK\\nInvoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE SEPA 15"
      },
      {
        "label": "Short sample",
        "value": "SE4550000000058398257466\\n1 234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ4550000000058398257466\\n1 234,56 SEK\\nInvoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SEPA edge 15"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SEPA local evidence",
        "text": "Swedish SEPA Transfer Helper analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SEPA examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SEPA values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-sepa-direct-debit-mandate-helper",
    "name": "Swedish SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 SE4550000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE SDD 16"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 SE4550"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZNDATE-2026-001 SE4550000000058398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SDD edge 16"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SDD local evidence",
        "text": "Swedish SEPA Direct Debit Mandate Helper analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SDD examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SDD values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-payment-reference-helper",
    "name": "Swedish Bankgiro / OCR Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Bankgiro / OCR REF 2026-001 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PAY 17"
      },
      {
        "label": "Short sample",
        "value": "Bankgiro / OCR REF 202"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Bankgiro / OCR REF 2026-001 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PAY edge 17"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Swedish Bankgiro / OCR Reference Helper analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PAY examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PAY values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-remittance-text-builder",
    "name": "Swedish Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 SE556016068001 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE REMIT 18"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 SE556016"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Invoice 2026-001 SE556016068001 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE REMIT edge 18"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Swedish Remittance Text Builder analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid REMIT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized REMIT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-payment-reconciliation-helper",
    "name": "Swedish Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026-07-21; 1 234,56 SEK; SE4550000000058398257466; Invoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE RECON 19"
      },
      {
        "label": "Short sample",
        "value": "2026-07-21; 1 234,56 SEK; SE4550000000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 2026-07-21; 1 234,56 SEK; SE4550000000058398257466; Invoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE RECON edge 19"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Swedish Payment Reconciliation Helper analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid RECON examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized RECON values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-bank-statement-parser",
    "name": "Swedish Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026-07-21; 1 234,56 SEK; SE4550000000058398257466; sample counterparty"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE STMT 20"
      },
      {
        "label": "Short sample",
        "value": "2026-07-21; 1 234,56 SEK; SE455000000005"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 2026-07-21; 1 234,56 SEK; SE4550000000058398257466; sample counterparty"
      },
      {
        "label": "Edge sample",
        "value": "Review SE STMT edge 20"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Swedish Bank Statement Parser analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid STMT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized STMT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-masked-iban-formatter",
    "name": "Swedish Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE4550000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ4550000000058398257466"
      },
      {
        "label": "Short sample",
        "value": "SE455000000005"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ4550000000058398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE MASK edge 21"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Swedish Masked IBAN Formatter analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid MASK examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized MASK values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-currency-decimal-formatter",
    "name": "Swedish SEK Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize SEK amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE CUR 22"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE CUR edge 22"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Swedish SEK Decimal Currency Formatter analyzes Sweden-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CUR examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CUR values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vat-rate-sanity-helper",
    "name": "Swedish VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Moms 20% base 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE RATE 23"
      },
      {
        "label": "Short sample",
        "value": "Moms 20% base 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Moms 20% base 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE RATE edge 23"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Swedish VAT Rate Sanity Helper analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid RATE examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized RATE values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vat-return-field-helper",
    "name": "Swedish VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Moms; SE556016068001; period 2026-07; 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE RET 24"
      },
      {
        "label": "Short sample",
        "value": "Moms; SE556016068001; period"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Moms; SE556016068001; period 2026-07; 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE RET edge 24"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Swedish VAT Return Field Helper analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid RET examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized RET values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-invoice-number-helper",
    "name": "Swedish Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 SE556016068001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE INV 25"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 SE"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZV-2026-0001 SE556016068001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE INV edge 25"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Swedish Invoice Number Helper analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid INV examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized INV values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-e-invoicing-readiness-checker",
    "name": "Swedish Peppol / Svefaktura Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE EINV 26"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE EINV edge 26"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Swedish Peppol / Svefaktura Readiness Checker analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid EINV examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized EINV values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-tax-authority-handoff-helper",
    "name": "Swedish Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE556016068001 2026-07-21 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE TAX 27"
      },
      {
        "label": "Short sample",
        "value": "SE556016068001 2026-0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ556016068001 2026-07-21 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE TAX edge 27"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Swedish Tax Authority Handoff Helper analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid TAX examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized TAX values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-accounting-audit-trail-checklist-generator",
    "name": "Swedish Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 2026-07-21 1 234,56 SEK SE556016068001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE AUDIT 28"
      },
      {
        "label": "Short sample",
        "value": "invoice 2026-07-21 1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE invoice 2026-07-21 1 234,56 SEK SE556016068001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE AUDIT edge 28"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Swedish Accounting Audit Trail Checklist Helper analyzes Sweden-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid AUDIT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized AUDIT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-postal-code-validator",
    "name": "Swedish Postal Code Validator",
    "code": "POST",
    "summary": "Validate postnummer shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE POST 29"
      },
      {
        "label": "Short sample",
        "value": "111 20 St"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE POST edge 29"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Swedish Postal Code Validator analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid POST examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized POST values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-address-normalizer",
    "name": "Swedish Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE ADDR 30"
      },
      {
        "label": "Short sample",
        "value": "Drottninggatan 1, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE ADDR edge 30"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Swedish Address Normalizer analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid ADDR examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized ADDR values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-address-transliteration-normalizer",
    "name": "Swedish Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE ASCII 31"
      },
      {
        "label": "Short sample",
        "value": "Drottninggatan 1, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE ASCII edge 31"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Swedish Address Transliteration Normalizer analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid ASCII examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized ASCII values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-region-code-mapper",
    "name": "Swedish Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE REGION 32"
      },
      {
        "label": "Short sample",
        "value": "111 20 St"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE REGION edge 32"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Swedish Region / Province Code Mapper analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid REGION examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized REGION values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-municipality-code-inspector",
    "name": "Swedish Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE MUNI 33"
      },
      {
        "label": "Short sample",
        "value": "Drottninggatan 1, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE MUNI edge 33"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Swedish Municipality Code Inspector analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid MUNI examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized MUNI values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-phone-number-validator",
    "name": "Swedish Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+46 70 123 45 67"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PHONE 34"
      },
      {
        "label": "Short sample",
        "value": "+46 70 12"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE +46 70 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PHONE edge 34"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Swedish Phone Number Validator analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PHONE examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PHONE values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-phone-e164-formatter",
    "name": "Swedish Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+46 70 123 45 67"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE E164 35"
      },
      {
        "label": "Short sample",
        "value": "+46 70 12"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE +46 70 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "Review SE E164 edge 35"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Swedish Phone E.164 Formatter analyzes Sweden-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid E164 examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized E164 values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-date-locale-formatter",
    "name": "Swedish Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026-07-21"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE DATE 36"
      },
      {
        "label": "Short sample",
        "value": "2026-0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 2026-07-21"
      },
      {
        "label": "Edge sample",
        "value": "Review SE DATE edge 36"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Swedish Date Locale Formatter analyzes Sweden-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid DATE examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized DATE values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-csv-locale-normalizer",
    "name": "Swedish CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Sweden decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1 234,56 SEK;2026-07-21;SE556016068001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE CSV 37"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1 234,56 SE"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE id;amount;date;tax\\n1;1 234,56 SEK;2026-07-21;SE556016068001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE CSV edge 37"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Swedish CSV Locale Normalizer analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CSV examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CSV values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-slug-normalizer",
    "name": "Swedish Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Sweden sample company Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE SLUG 38"
      },
      {
        "label": "Short sample",
        "value": "Sweden sample company Drottning"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Sweden sample company Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SLUG edge 38"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Swedish Slug Normalizer analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SLUG examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SLUG values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-document-ocr-fixer",
    "name": "Swedish Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236 SE556016068001 SE4550000000058398257466 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE OCR 39"
      },
      {
        "label": "Short sample",
        "value": "850101-1236 SE556016068001 SE455000000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236 SE556016068001 SE4550000000058398257466 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE OCR edge 39"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Swedish Document OCR Fixer analyzes Sweden-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid OCR examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized OCR values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-gdpr-redaction-helper",
    "name": "Swedish GDPR / IMY Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE GDPR 40"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE GDPR edge 40"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GDPR local evidence",
        "text": "Swedish GDPR / IMY Redaction Helper analyzes Sweden-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid GDPR examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized GDPR values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-pii-masker",
    "name": "Swedish PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236 +46 70 123 45 67 SE4550000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PII 41"
      },
      {
        "label": "Short sample",
        "value": "850101-1236 +46 70 123 45 67 S"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236 +46 70 123 45 67 SE4550000000058398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PII edge 41"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Swedish PII Masker analyzes Sweden-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PII examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PII values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-personal-data-fixture-generator",
    "name": "Swedish Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236\\nDrottninggatan 1, 111 20 Stockholm\\n+46 70 123 45 67"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE FIX 42"
      },
      {
        "label": "Short sample",
        "value": "850101-1236\\nDrottninggatan 1, 111 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236\\nDrottninggatan 1, 111 20 Stockholm\\n+46 70 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "Review SE FIX edge 42"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Swedish Personal Data Fixture Helper analyzes Sweden-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid FIX examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized FIX values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-driving-licence-format-helper",
    "name": "Swedish Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236 DL 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE DL 43"
      },
      {
        "label": "Short sample",
        "value": "850101-1236"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236 DL 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review SE DL edge 43"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Swedish Driving Licence Format Helper analyzes Sweden-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid DL examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized DL values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-residence-permit-format-helper",
    "name": "Swedish Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE PERMIT 2026 850101-1236"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PERMIT 44"
      },
      {
        "label": "Short sample",
        "value": "SE PERMIT 2026 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ PERMIT 2026 850101-1236"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PERMIT edge 44"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Swedish Residence Permit Format Helper analyzes Sweden-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PERMIT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PERMIT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-health-card-format-helper",
    "name": "Swedish Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "850101-1236 HEALTH 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE HEALTH 45"
      },
      {
        "label": "Short sample",
        "value": "850101-1236 H"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 850101-1236 HEALTH 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review SE HEALTH edge 45"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Swedish Health Card Format Helper analyzes Sweden-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid HEALTH examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized HEALTH values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vehicle-plate-inspector",
    "name": "Swedish Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABC123"
      },
      {
        "label": "Invalid sample",
        "value": "ABC124"
      },
      {
        "label": "Short sample",
        "value": "ABC1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZC123"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PLATE edge 46"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Swedish Vehicle Plate Inspector analyzes Sweden-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PLATE examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PLATE values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vin-validator",
    "name": "Swedish VIN Validator",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics.",
    "category": "transport",
    "actionLabel": "Validate",
    "kind": "vin",
    "samples": [
      {
        "label": "Valid sample",
        "value": "WVWZZZ1JZXW000001"
      },
      {
        "label": "Invalid sample",
        "value": "WVWZZZ1JZXW000002"
      },
      {
        "label": "Short sample",
        "value": "WVWZZZ1JZX"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZWZZZ1JZXW000001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE VIN edge 47"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Swedish VIN Validator analyzes Sweden-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid VIN examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized VIN values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-vehicle-data-redaction-helper",
    "name": "Swedish Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABC123 WVWZZZ1JZXW000001 850101-1236"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE VEH 48"
      },
      {
        "label": "Short sample",
        "value": "ABC123 WVWZZZ1JZXW00"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZC123 WVWZZZ1JZXW000001 850101-1236"
      },
      {
        "label": "Edge sample",
        "value": "Review SE VEH edge 48"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Swedish Vehicle Data Redaction Helper analyzes Sweden-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid VEH examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized VEH values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-customs-declaration-helper",
    "name": "Swedish Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SE556016068001 HS 8471 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE CUSTOMS 49"
      },
      {
        "label": "Short sample",
        "value": "SE556016068001 HS 84"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ556016068001 HS 8471 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE CUSTOMS edge 49"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Swedish Customs Declaration Helper analyzes Sweden-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CUSTOMS examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CUSTOMS values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-postal-tracking-helper",
    "name": "Swedish Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE TRACK 50"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 111 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZACK 2026 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE TRACK edge 50"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Swedish Postal Tracking Helper analyzes Sweden-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid TRACK examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized TRACK values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-data-quality-workbench",
    "name": "Swedish Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE DQ 51"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE DQ edge 51"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Swedish Data Quality Workbench analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid DQ examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized DQ values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-json-fixture-generator",
    "name": "Swedish JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE JSON 52"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE JSON edge 52"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Swedish JSON Fixture Helper analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid JSON examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized JSON values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-regex-pack-helper",
    "name": "Swedish Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Personnummer Organisationsnummer postnummer  SE4550000000058398257466"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE REGEX 53"
      },
      {
        "label": "Short sample",
        "value": "Personnummer Organisationsnummer postn"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Personnummer Organisationsnummer postnummer  SE4550000000058398257466"
      },
      {
        "label": "Edge sample",
        "value": "Review SE REGEX edge 53"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Swedish Regex Pack Helper analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid REGEX examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized REGEX values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-api-payload-auditor",
    "name": "Swedish API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE API 54"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE API edge 54"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Swedish API Payload Auditor analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid API examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized API values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-form-field-auditor",
    "name": "Swedish Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=SE556016068001&postal=111 20 Stockholm&phone=+46 70 123 45 67"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE FORM 55"
      },
      {
        "label": "Short sample",
        "value": "tax=SE556016068001&postal=111 20 Sto"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE tax=SE556016068001&postal=111 20 Stockholm&phone=+46 70 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "Review SE FORM edge 55"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Swedish Form Field Auditor analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid FORM examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized FORM values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-locale-number-parser",
    "name": "Swedish Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Sweden.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE NUM 56"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE NUM edge 56"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Swedish Locale Number Parser analyzes Sweden-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid NUM examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized NUM values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-calendar-week-helper",
    "name": "Swedish Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026-07-21 week 30"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE CAL 57"
      },
      {
        "label": "Short sample",
        "value": "2026-07-21"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 2026-07-21 week 30"
      },
      {
        "label": "Edge sample",
        "value": "Review SE CAL edge 57"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Swedish Calendar Week Helper analyzes Sweden-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CAL examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CAL values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-company-suffix-normalizer",
    "name": "Swedish Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Sweden Sample Holding Ltd 556016-0680"
      },
      {
        "label": "Invalid sample",
        "value": "Sweden Sample Holding Ltd 556016-0681"
      },
      {
        "label": "Short sample",
        "value": "Sweden Sample Holding"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Sweden Sample Holding Ltd 556016-0680"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SUFFIX edge 58"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Swedish Company Suffix Normalizer analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SUFFIX examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SUFFIX values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-procurement-identifier-helper",
    "name": "Swedish Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "556016-0680 PO-2026-001 SE556016068001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE PROC 59"
      },
      {
        "label": "Short sample",
        "value": "556016-0680 PO-2026-0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE 556016-0680 PO-2026-001 SE556016068001"
      },
      {
        "label": "Edge sample",
        "value": "Review SE PROC edge 59"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Swedish Procurement Identifier Helper analyzes Sweden-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PROC examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PROC values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-accessibility-locale-copy-checker",
    "name": "Swedish Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Personnummer input, postnummer input, amount 1 234,56 SEK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE COPY 60"
      },
      {
        "label": "Short sample",
        "value": "Personnummer input, postnummer i"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Personnummer input, postnummer input, amount 1 234,56 SEK"
      },
      {
        "label": "Edge sample",
        "value": "Review SE COPY edge 60"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Swedish Locale Copy Checker analyzes Sweden-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid COPY examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized COPY values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-support-ticket-scrubber",
    "name": "Swedish Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 850101-1236, SE4550000000058398257466, Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE SUP 61"
      },
      {
        "label": "Short sample",
        "value": "Customer sent 850101-1236, SE4550000000058398257"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE Customer sent 850101-1236, SE4550000000058398257466, Drottninggatan 1, 111 20 Stockholm"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SUP edge 61"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Swedish Support Ticket Scrubber analyzes Sweden-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SUP examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SUP values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "sweden-integration-smoke-test-builder",
    "name": "Swedish Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SE SMOKE 62"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"55"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix SE {\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review SE SMOKE edge 62"
      }
    ],
    "boundaries": [
      "Official Sweden identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Swedish Integration Smoke Test Builder analyzes Sweden-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Swedish parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SMOKE examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SMOKE values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  }
];
  const COUNTRY = {"slug":"sweden","iso2":"SE","iso3":"SWE","isoNumeric":"752","name":"Sweden","adjective":"Swedish","nativeName":"Sverige","flag":"🇸🇪","language":"Swedish","localLanguage":"sv-SE","currency":"SEK","currencyName":"Swedish krona","symbol":"SEK","locale":"sv-SE","icu":"sv_SE","date":"YYYY-MM-DD","decimal":"Comma (,)","thousands":"Space grouping","phone":"+46","capital":"Stockholm","region":"Northern Europe / European Union","population":"approximately 10.7M","identifiers":["Personnummer","Samordningsnummer","Organisationsnummer","Momsregistreringsnummer","postal code","phone"],"payments":["IBAN","Bankgiro","PlusGiro","SWIFT","VIES"],"localTerms":{"personal":"Personnummer","company":"Organisationsnummer","tax":"Moms","social":"Samordningsnummer","register":"Bolagsverket","invoice":"Peppol / Svefaktura","payment":"Bankgiro / OCR","plate":"registreringsnummer","postal":"postnummer","privacy":"GDPR / IMY"},"samples":{"personal":"850101-1236","company":"556016-0680","social":"850101-1236","iban":"SE4550000000058398257466","bank":"5000 58398257466","phone":"+46 70 123 45 67","postal":"111 20 Stockholm","plate":"ABC123","vat":"SE556016068001","amount":"1 234,56 SEK","date":"2026-07-21","address":"Drottninggatan 1, 111 20 Stockholm","json":"{\"country\":\"SE\",\"personnummer\":\"850101-1236\",\"orgnr\":\"556016-0680\",\"iban\":\"SE4550000000058398257466\"}"},"theme":["#006AA7","#FECC00","#F8FAFC"],"marker":{"x":55,"y":38},"related":["NO","DK","FI"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Sweden systems remain the source of truth.', localStructure: 'Swedish local structure', addEvidence: 'Add Swedish local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Sweden siguen siendo la fuente de verdad.', localStructure: 'estructura local de Sweden', addEvidence: 'Agrega evidencia local de Sweden o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Sweden continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Sweden', addEvidence: 'Adicione evidencia local de Sweden ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Sweden bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Sweden', addEvidence: 'Fuege lokale Swedish Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Sweden restent la source de verite.', localStructure: 'structure locale de Sweden', addEvidence: 'Ajoutez une preuve locale de Sweden ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Sweden pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Sweden', addEvidence: 'Dodaj lokalne dane kraju Sweden albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Sweden systems remain the source of truth.', localStructure: 'Swedish local structure', addEvidence: 'Add Swedish local evidence or use the valid sample.' }
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
  function digits(input) { return compact(input).replace(/\D/g, ''); }
  function mask(value) { const s = String(value || ''); if (!s) return ''; if (s.length <= 8) return s.slice(0, 1) + '...'; return s.slice(0, 3) + '...' + s.slice(-4); }
  function field(label, value, detail) { return { label, value: value == null || value === '' ? 'not detected' : String(value), detail: detail || COUNTRY.adjective + ' evidence slice' }; }
  function check(label, ok, pass, fail) { return { label, status: ok ? 'pass' : 'review', message: ok ? pass : fail }; }
  function mod97(iban) { let rearranged = iban.slice(4) + iban.slice(0, 4); let rem = 0; for (const ch of rearranged) { const value = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch; for (const d of value) rem = (rem * 10 + Number(d)) % 97; } return rem; }
  function isIntentionalInvalid(raw) { return /^(invalid|short|wrong|bad|review)\b/i.test(compact(raw)) || /\b(BAD|INVALID|WRONG)[-_ ]?(CHECKSUM|PREFIX|COUNTRY|SAMPLE)\b/i.test(compact(raw)); }
  function detect(raw) {
    const text = compact(raw); const upper = text.toUpperCase();
    return {
      text, upper,
      personal: (upper.match(/[A-Z0-9][A-Z0-9 .\/-]{5,20}[A-Z0-9]/) || [])[0] || '',
      company: (upper.match(/(?:SE)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/SE\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/SE[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:SEK|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
      phone: (text.match(/\+?\d[\d\s().-]{6,18}\d/) || [])[0] || '',
      plate: (upper.match(/\b[A-Z0-9]{1,3}[ -]?[A-Z0-9]{2,5}[ -]?[A-Z0-9]{0,3}\b/) || [])[0] || '',
      vin: (upper.match(/\b[A-HJ-NPR-Z0-9]{17}\b/) || [])[0] || '',
      json: /^[\[{]/.test(text)
    };
  }
  function analyze(tool, input) {
    const raw = compact(input || (tool.samples[0] && tool.samples[0].value) || ''); const ev = detect(raw); let normalized = raw; let ok = raw.length > 0;
    const result = { status: 'review', headline: tool.code + ': ' + phrase('review'), detail: phrase('addEvidence'), primary: raw || 'empty', normalized, checks: [], fields: [], breakdownTitle: tool.name + ' field breakdown', breakdownSummary: 'Named ' + COUNTRY.adjective + ' evidence slices for debugging and handoff.', breakdown: [], qualityNotes: tool.qualityNotes, suggestions: [], developerJson: {} };
    if (tool.kind === 'iban' || tool.kind === 'ibanmask') { const iban = ev.iban || alnum(raw); ok = new RegExp('^' + COUNTRY.iso2 + '[0-9]{2}[A-Z0-9]{8,30}$').test(iban) && (iban.length < 12 || mod97(iban) === 1); normalized = tool.kind === 'ibanmask' ? mask(iban) : iban; result.breakdown.push(field('country prefix', iban.slice(0, 2), 'IBAN country code'), field('check digits', iban.slice(2, 4), 'MOD-97 remainder ' + (iban.length > 4 ? mod97(iban) : 'n/a')), field('bank/account body', iban.slice(4), 'local BBAN body'), field('official boundary', 'offline only', 'Bank ownership requires provider lookup')); }
    else if (tool.kind === 'phone') { const p = ev.phone || raw; normalized = p.replace(/[\s().-]/g, '').replace(/^00/, '+'); ok = /^\+?\d{7,16}$/.test(normalized); result.breakdown.push(field('calling code', normalized.startsWith(COUNTRY.phone) ? COUNTRY.phone : 'not detected', 'expected local prefix'), field('national number', normalized.replace(COUNTRY.phone, ''), 'subscriber evidence'), field('raw phone', p, 'input slice')); }
    else if (tool.kind === 'date') { normalized = ev.date || raw; ok = !!ev.date; result.breakdown.push(field('detected date', ev.date, COUNTRY.date), field('locale pattern', COUNTRY.date, 'display convention'), field('ISO handoff', ev.date && ev.date.includes('-') ? ev.date : 'requires parser confirmation', 'API value')); }
    else if (tool.kind === 'amount' || tool.kind === 'taxrate') { normalized = ev.amount || raw; ok = !!ev.amount || /\d/.test(raw); result.breakdown.push(field('amount evidence', ev.amount || raw, 'currency string'), field('currency', COUNTRY.currency, COUNTRY.currencyName), field('decimal convention', COUNTRY.decimal, 'locale parsing'), field('grouping convention', COUNTRY.thousands, 'display parsing')); }
    else if (tool.kind === 'postal' || tool.kind === 'address' || tool.kind === 'region' || tool.kind === 'municipality' || tool.kind === 'transliteration') { normalized = raw.replace(/\s+/g, ' '); ok = raw.length > 5; result.breakdown.push(field('address text', raw, 'source lines'), field('postal evidence', ev.postal, COUNTRY.localTerms.postal), field('capital/locality hint', COUNTRY.capital, 'country context'), field('lookup boundary', 'offline only', 'official geocoding/postal data required')); }
    else if (tool.kind === 'plate' || tool.kind === 'vin' || tool.kind === 'vehicle') { const vin = ev.vin || ''; normalized = ev.plate || vin || raw; ok = !!(ev.plate || vin); result.breakdown.push(field('plate evidence', ev.plate, COUNTRY.localTerms.plate), field('WMI', vin.slice(0, 3), 'VIN manufacturer region'), field('VDS', vin.slice(3, 9), 'vehicle descriptor'), field('VIS', vin.slice(9), 'vehicle identifier')); }
    else if (['csv','json','api','dataquality','form','companyonboarding','register','einvoice','taxhandoff','taxreturn','audittrail','procurement','smoketest'].includes(tool.kind)) { normalized = raw.replace(/\s+/g, ' ').trim(); ok = raw.length > 10 || ev.json; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', COUNTRY.localTerms.personal + ' / ' + COUNTRY.localTerms.company), field('tax evidence', ev.vat || 'not detected', COUNTRY.localTerms.tax), field('banking evidence', ev.iban || 'not detected', 'IBAN/payment slice'), field('locale evidence', [ev.date, ev.amount, ev.postal].filter(Boolean).join(' / ') || 'not detected', 'date/amount/postal slices')); }
    else if (['privacy','fixture','ocr','document'].includes(tool.kind)) { normalized = raw.replace(/[A-Z0-9][A-Z0-9 .\/-]{6,24}/g, (v) => mask(v)); ok = raw.length > 5; result.breakdown.push(field('personal evidence', ev.personal, COUNTRY.localTerms.personal), field('company/tax evidence', ev.company || ev.vat, COUNTRY.localTerms.company), field('banking evidence', ev.iban, 'IBAN slice'), field('masked preview', normalized, 'safe for logs')); }
    else if (tool.kind === 'bic') { const bic = alnum(raw); normalized = bic; ok = new RegExp('^[A-Z]{4}' + COUNTRY.iso2 + '[A-Z0-9]{2}([A-Z0-9]{3})?$').test(bic); result.breakdown.push(field('institution', bic.slice(0, 4), 'BIC bank code'), field('country', bic.slice(4, 6), 'expected ' + COUNTRY.iso2), field('location', bic.slice(6, 8), 'location code'), field('branch', bic.slice(8) || 'primary office', 'optional')); }
    else if (tool.kind === 'slug' || tool.kind === 'regex' || tool.kind === 'copycheck' || tool.kind === 'companysuffix') { normalized = raw.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); ok = raw.length > 0; result.breakdown.push(field('source text', raw, 'local display value'), field('normalized key', normalized, 'ASCII/API key'), field('local vocabulary', [COUNTRY.localTerms.personal, COUNTRY.localTerms.company, COUNTRY.localTerms.tax].join(' / '), 'copy/debug terms')); }
    else { normalized = raw.replace(/\s+/g, ' ').trim(); ok = raw.length > 0; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', 'local ID slice'), field('tax evidence', ev.vat || 'not detected', 'tax/VAT slice'), field('payment evidence', ev.iban || ev.amount || 'not detected', 'banking slice'), field('workflow', tool.kind, 'offline workbench context')); }
    if (isIntentionalInvalid(raw)) {
      ok = false;
      result.breakdown.unshift(field('invalid fixture marker', raw.split(/\s+/).slice(0, 3).join(' ') || 'invalid sample', 'Intentional invalid/review sample must not pass.'));
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '#006AA7', accent2: '#FECC00', accent3: '#F8FAFC' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
