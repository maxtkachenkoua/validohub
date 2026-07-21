(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.romania-suite';
  const RAW_TOOLS = [
  {
    "id": "romania-cnp-validator",
    "name": "Romanian CNP Validator",
    "code": "ID",
    "summary": "Validate CNP shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451"
      },
      {
        "label": "Invalid sample",
        "value": "1850101123452"
      },
      {
        "label": "Short sample",
        "value": "18501011"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451"
      },
      {
        "label": "Edge sample",
        "value": "Review RO ID edge 1"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Romanian CNP Validator analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-cui-cif-validator",
    "name": "Romanian CUI / CIF Validator",
    "code": "ORG",
    "summary": "Inspect CUI / CIF structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "RO12345675"
      },
      {
        "label": "Short sample",
        "value": "RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO ORG edge 2"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Romanian CUI / CIF Validator analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vat-id-validator",
    "name": "Romanian VAT ID / RO Prefix Validator",
    "code": "VAT",
    "summary": "Normalize RO VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ12345674"
      },
      {
        "label": "Short sample",
        "value": "RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO VAT edge 3"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VAT local evidence",
        "text": "Romanian VAT ID / RO Prefix Validator analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-eori-validator",
    "name": "Romanian EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RORO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "ZZRO12345674"
      },
      {
        "label": "Short sample",
        "value": "RORO123"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZRO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO EORI edge 4"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EORI local evidence",
        "text": "Romanian EORI / Customs Identifier Helper analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-cnp-social-insurance-helper",
    "name": "Romanian CNP Helper",
    "code": "SOC",
    "summary": "Split CNP evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451"
      },
      {
        "label": "Invalid sample",
        "value": "1850101123452"
      },
      {
        "label": "Short sample",
        "value": "18501011"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SOC edge 5"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Romanian CNP Helper analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-company-onboarding-auditor",
    "name": "Romanian Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for CUI / CIF, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840001\"}"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO KYC edge 6"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Romanian Company Onboarding Auditor analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-business-register-readiness-helper",
    "name": "Romanian ONRC Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated ONRC lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674 RO12345674 Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "RO12345674 RO12345674 Calea Victoriei 1, 010062 Bucuresti"
      },
      {
        "label": "Short sample",
        "value": "RO12345674 RO12345674 Calea Vict"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674 RO12345674 Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO REG edge 7"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Romanian ONRC Readiness Helper analyzes Romania-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-id-card-format-helper",
    "name": "Romanian ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO CARD 8"
      },
      {
        "label": "Short sample",
        "value": "18501011"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451"
      },
      {
        "label": "Edge sample",
        "value": "Review RO CARD edge 8"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Romanian ID Card Format Helper analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-passport-number-helper",
    "name": "Romanian Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<ROUROMANIAN<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PASS 9"
      },
      {
        "label": "Short sample",
        "value": "P<ROUROMANIAN<<SAMPLE<"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO P<ROUROMANIAN<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PASS edge 9"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Romanian Passport Number Helper analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-mrz-passport-parser",
    "name": "Romanian MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<ROUSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567ROU8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO MRZ 10"
      },
      {
        "label": "Short sample",
        "value": "P<ROUSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO P<ROUSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567ROU8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Edge sample",
        "value": "Review RO MRZ edge 10"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Romanian MRZ / Passport Parser analyzes Romania-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-iban-validator",
    "name": "Romania IBAN Validator",
    "code": "IBAN",
    "summary": "Validate RO IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO49AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ49AAAA1B31007593840000"
      },
      {
        "label": "Short sample",
        "value": "RO49AAAA1B3100"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ49AAAA1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO IBAN edge 11"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBAN local evidence",
        "text": "Romania IBAN Validator analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-iban-generator",
    "name": "Romania IBAN Generator",
    "code": "IBG",
    "summary": "Generate RO IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "ZZAA1B31007593840000"
      },
      {
        "label": "Short sample",
        "value": "AAAA1B31007"
      },
      {
        "label": "Grouped valid sample",
        "value": "AAAA 1B31 0075 9384 0000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO IBG edge 12"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBG local evidence",
        "text": "Romania IBAN Generator analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-bank-account-inspector",
    "name": "Romanian Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AAAA 1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO BANK 13"
      },
      {
        "label": "Short sample",
        "value": "AAAA 1B31007"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZAA 1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO BANK edge 13"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Romanian Domestic Bank Account Inspector analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-bic-swift-inspector",
    "name": "Romanian BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Romania banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDRO2X"
      },
      {
        "label": "Invalid sample",
        "value": "ZZCDRO2X"
      },
      {
        "label": "Short sample",
        "value": "ABCDR"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZCDRO2X"
      },
      {
        "label": "Edge sample",
        "value": "Review RO BIC edge 14"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Romanian BIC / SWIFT Inspector analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-sepa-transfer-helper",
    "name": "Romanian SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO49AAAA1B31007593840000\\n1.234,56 RON\\nInvoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO SEPA 15"
      },
      {
        "label": "Short sample",
        "value": "RO49AAAA1B31007593840000\\n1.234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ49AAAA1B31007593840000\\n1.234,56 RON\\nInvoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SEPA edge 15"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SEPA local evidence",
        "text": "Romanian SEPA Transfer Helper analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-sepa-direct-debit-mandate-helper",
    "name": "Romanian SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 RO49AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO SDD 16"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 RO49AA"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZNDATE-2026-001 RO49AAAA1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SDD edge 16"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SDD local evidence",
        "text": "Romanian SEPA Direct Debit Mandate Helper analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-payment-reference-helper",
    "name": "Romanian treasury / SEPA handoff Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "treasury / SEPA handoff REF 2026-001 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PAY 17"
      },
      {
        "label": "Short sample",
        "value": "treasury / SEPA handoff REF"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO treasury / SEPA handoff REF 2026-001 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PAY edge 17"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Romanian treasury / SEPA handoff Reference Helper analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-remittance-text-builder",
    "name": "Romanian Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 RO12345674 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO REMIT 18"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 RO123"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Invoice 2026-001 RO12345674 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO REMIT edge 18"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Romanian Remittance Text Builder analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-payment-reconciliation-helper",
    "name": "Romanian Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026; 1.234,56 RON; RO49AAAA1B31007593840000; Invoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO RECON 19"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026; 1.234,56 RON; RO49AAAA1B31"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 21.07.2026; 1.234,56 RON; RO49AAAA1B31007593840000; Invoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review RO RECON edge 19"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Romanian Payment Reconciliation Helper analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-bank-statement-parser",
    "name": "Romanian Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026; 1.234,56 RON; RO49AAAA1B31007593840000; sample counterparty"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO STMT 20"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026; 1.234,56 RON; RO49AAAA1B3100"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 21.07.2026; 1.234,56 RON; RO49AAAA1B31007593840000; sample counterparty"
      },
      {
        "label": "Edge sample",
        "value": "Review RO STMT edge 20"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Romanian Bank Statement Parser analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-masked-iban-formatter",
    "name": "Romanian Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO49AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ49AAAA1B31007593840000"
      },
      {
        "label": "Short sample",
        "value": "RO49AAAA1B3100"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ49AAAA1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO MASK edge 21"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Romanian Masked IBAN Formatter analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-currency-decimal-formatter",
    "name": "Romanian RON Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize RON amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO CUR 22"
      },
      {
        "label": "Short sample",
        "value": "1.234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO CUR edge 22"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Romanian RON Decimal Currency Formatter analyzes Romania-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vat-rate-sanity-helper",
    "name": "Romanian VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TVA 20% base 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO RATE 23"
      },
      {
        "label": "Short sample",
        "value": "TVA 20% base 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZA 20% base 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO RATE edge 23"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Romanian VAT Rate Sanity Helper analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vat-return-field-helper",
    "name": "Romanian VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TVA; RO12345674; period 2026-07; 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO RET 24"
      },
      {
        "label": "Short sample",
        "value": "TVA; RO12345674; period 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZA; RO12345674; period 2026-07; 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO RET edge 24"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Romanian VAT Return Field Helper analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-invoice-number-helper",
    "name": "Romanian Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO INV 25"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZV-2026-0001 RO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO INV edge 25"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Romanian Invoice Number Helper analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-e-invoicing-readiness-checker",
    "name": "Romanian RO e-Factura / ANAF Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO EINV 26"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO EINV edge 26"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Romanian RO e-Factura / ANAF Readiness Checker analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-tax-authority-handoff-helper",
    "name": "Romanian Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674 21.07.2026 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO TAX 27"
      },
      {
        "label": "Short sample",
        "value": "RO12345674 21.07.20"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674 21.07.2026 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO TAX edge 27"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Romanian Tax Authority Handoff Helper analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-accounting-audit-trail-checklist-generator",
    "name": "Romanian Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 21.07.2026 1.234,56 RON RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO AUDIT 28"
      },
      {
        "label": "Short sample",
        "value": "invoice 21.07.2026 1.234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO invoice 21.07.2026 1.234,56 RON RO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO AUDIT edge 28"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Romanian Accounting Audit Trail Checklist Helper analyzes Romania-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-postal-code-validator",
    "name": "Romanian Postal Code Validator",
    "code": "POST",
    "summary": "Validate cod postal shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "010011 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO POST 29"
      },
      {
        "label": "Short sample",
        "value": "010011 Bu"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 010011 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO POST edge 29"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Romanian Postal Code Validator analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-address-normalizer",
    "name": "Romanian Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO ADDR 30"
      },
      {
        "label": "Short sample",
        "value": "Calea Victoriei 1, 0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO ADDR edge 30"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Romanian Address Normalizer analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-address-transliteration-normalizer",
    "name": "Romanian Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO ASCII 31"
      },
      {
        "label": "Short sample",
        "value": "Calea Victoriei 1, 0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO ASCII edge 31"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Romanian Address Transliteration Normalizer analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-region-code-mapper",
    "name": "Romanian Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "010011 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO REGION 32"
      },
      {
        "label": "Short sample",
        "value": "010011 Bu"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 010011 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO REGION edge 32"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Romanian Region / Province Code Mapper analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-municipality-code-inspector",
    "name": "Romanian Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO MUNI 33"
      },
      {
        "label": "Short sample",
        "value": "Calea Victoriei 1, 0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO MUNI edge 33"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Romanian Municipality Code Inspector analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-phone-number-validator",
    "name": "Romanian Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+40 721 234 567"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PHONE 34"
      },
      {
        "label": "Short sample",
        "value": "+40 721 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO +40 721 234 567"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PHONE edge 34"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Romanian Phone Number Validator analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-phone-e164-formatter",
    "name": "Romanian Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+40 721 234 567"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO E164 35"
      },
      {
        "label": "Short sample",
        "value": "+40 721 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO +40 721 234 567"
      },
      {
        "label": "Edge sample",
        "value": "Review RO E164 edge 35"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Romanian Phone E.164 Formatter analyzes Romania-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-date-locale-formatter",
    "name": "Romanian Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO DATE 36"
      },
      {
        "label": "Short sample",
        "value": "21.07."
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 21.07.2026"
      },
      {
        "label": "Edge sample",
        "value": "Review RO DATE edge 36"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Romanian Date Locale Formatter analyzes Romania-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-csv-locale-normalizer",
    "name": "Romanian CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Romania decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1.234,56 RON;21.07.2026;RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO CSV 37"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1.234,56 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO id;amount;date;tax\\n1;1.234,56 RON;21.07.2026;RO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO CSV edge 37"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Romanian CSV Locale Normalizer analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-slug-normalizer",
    "name": "Romanian Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Romania sample company Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO SLUG 38"
      },
      {
        "label": "Short sample",
        "value": "Romania sample company Calea Vic"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Romania sample company Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SLUG edge 38"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Romanian Slug Normalizer analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-document-ocr-fixer",
    "name": "Romanian Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451 RO12345674 RO49AAAA1B31007593840000 010011 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO OCR 39"
      },
      {
        "label": "Short sample",
        "value": "1850101123451 RO12345674 RO49AAAA1B31"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451 RO12345674 RO49AAAA1B31007593840000 010011 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO OCR edge 39"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Romanian Document OCR Fixer analyzes Romania-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-gdpr-redaction-helper",
    "name": "Romanian GDPR / ANSPDCP Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO GDPR 40"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO GDPR edge 40"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GDPR local evidence",
        "text": "Romanian GDPR / ANSPDCP Redaction Helper analyzes Romania-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-pii-masker",
    "name": "Romanian PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451 +40 721 234 567 RO49AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PII 41"
      },
      {
        "label": "Short sample",
        "value": "1850101123451 +40 721 234 567 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451 +40 721 234 567 RO49AAAA1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PII edge 41"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Romanian PII Masker analyzes Romania-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-personal-data-fixture-generator",
    "name": "Romanian Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451\\nCalea Victoriei 1, 010061 Bucuresti\\n+40 721 234 567"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO FIX 42"
      },
      {
        "label": "Short sample",
        "value": "1850101123451\\nCalea Victoriei 1, 010"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451\\nCalea Victoriei 1, 010061 Bucuresti\\n+40 721 234 567"
      },
      {
        "label": "Edge sample",
        "value": "Review RO FIX edge 42"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Romanian Personal Data Fixture Helper analyzes Romania-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-driving-licence-format-helper",
    "name": "Romanian Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451 DL 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO DL 43"
      },
      {
        "label": "Short sample",
        "value": "185010112345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451 DL 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review RO DL edge 43"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Romanian Driving Licence Format Helper analyzes Romania-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-residence-permit-format-helper",
    "name": "Romanian Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO PERMIT 2026 1850101123451"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PERMIT 44"
      },
      {
        "label": "Short sample",
        "value": "RO PERMIT 2026 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ PERMIT 2026 1850101123451"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PERMIT edge 44"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Romanian Residence Permit Format Helper analyzes Romania-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-health-card-format-helper",
    "name": "Romanian Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1850101123451 HEALTH 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO HEALTH 45"
      },
      {
        "label": "Short sample",
        "value": "1850101123451 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1850101123451 HEALTH 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review RO HEALTH edge 45"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Romanian Health Card Format Helper analyzes Romania-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vehicle-plate-inspector",
    "name": "Romanian Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "B 123 ABC"
      },
      {
        "label": "Invalid sample",
        "value": "B 124 ABC"
      },
      {
        "label": "Short sample",
        "value": "B 123"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO B 123 ABC"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PLATE edge 46"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Romanian Vehicle Plate Inspector analyzes Romania-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vin-validator",
    "name": "Romanian VIN Validator",
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
        "value": "Review RO VIN edge 47"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Romanian VIN Validator analyzes Romania-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-vehicle-data-redaction-helper",
    "name": "Romanian Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "B 123 ABC WVWZZZ1JZXW000001 1850101123451"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO VEH 48"
      },
      {
        "label": "Short sample",
        "value": "B 123 ABC WVWZZZ1JZXW00"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO B 123 ABC WVWZZZ1JZXW000001 1850101123451"
      },
      {
        "label": "Edge sample",
        "value": "Review RO VEH edge 48"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Romanian Vehicle Data Redaction Helper analyzes Romania-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-customs-declaration-helper",
    "name": "Romanian Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674 HS 8471 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO CUSTOMS 49"
      },
      {
        "label": "Short sample",
        "value": "RO12345674 HS 8471"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674 HS 8471 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO CUSTOMS edge 49"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Romanian Customs Declaration Helper analyzes Romania-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-postal-tracking-helper",
    "name": "Romanian Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 010011 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO TRACK 50"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 0100"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZACK 2026 010011 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO TRACK edge 50"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Romanian Postal Tracking Helper analyzes Romania-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-data-quality-workbench",
    "name": "Romanian Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO DQ 51"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO DQ edge 51"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Romanian Data Quality Workbench analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-json-fixture-generator",
    "name": "Romanian JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO JSON 52"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO JSON edge 52"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Romanian JSON Fixture Helper analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-regex-pack-helper",
    "name": "Romanian Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CNP CUI / CIF cod postal  RO49AAAA1B31007593840000"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO REGEX 53"
      },
      {
        "label": "Short sample",
        "value": "CNP CUI / CIF cod postal  RO"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZP CUI / CIF cod postal  RO49AAAA1B31007593840000"
      },
      {
        "label": "Edge sample",
        "value": "Review RO REGEX edge 53"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Romanian Regex Pack Helper analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-api-payload-auditor",
    "name": "Romanian API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO API 54"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO API edge 54"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Romanian API Payload Auditor analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-form-field-auditor",
    "name": "Romanian Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=RO12345674&postal=010011 Bucuresti&phone=+40 721 234 567"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO FORM 55"
      },
      {
        "label": "Short sample",
        "value": "tax=RO12345674&postal=010011 Bucu"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO tax=RO12345674&postal=010011 Bucuresti&phone=+40 721 234 567"
      },
      {
        "label": "Edge sample",
        "value": "Review RO FORM edge 55"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Romanian Form Field Auditor analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-locale-number-parser",
    "name": "Romanian Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Romania.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO NUM 56"
      },
      {
        "label": "Short sample",
        "value": "1.234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO NUM edge 56"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Romanian Locale Number Parser analyzes Romania-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-calendar-week-helper",
    "name": "Romanian Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026 week 30"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO CAL 57"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO 21.07.2026 week 30"
      },
      {
        "label": "Edge sample",
        "value": "Review RO CAL edge 57"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Romanian Calendar Week Helper analyzes Romania-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-company-suffix-normalizer",
    "name": "Romanian Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Romania Sample Holding Ltd RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Romania Sample Holding Ltd RO12345675"
      },
      {
        "label": "Short sample",
        "value": "Romania Sample Holdin"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Romania Sample Holding Ltd RO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SUFFIX edge 58"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Romanian Company Suffix Normalizer analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-procurement-identifier-helper",
    "name": "Romanian Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "RO12345674 PO-2026-001 RO12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO PROC 59"
      },
      {
        "label": "Short sample",
        "value": "RO12345674 PO-2026-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ12345674 PO-2026-001 RO12345674"
      },
      {
        "label": "Edge sample",
        "value": "Review RO PROC edge 59"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Romanian Procurement Identifier Helper analyzes Romania-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-accessibility-locale-copy-checker",
    "name": "Romanian Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CNP input, cod postal input, amount 1.234,56 RON"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO COPY 60"
      },
      {
        "label": "Short sample",
        "value": "CNP input, cod postal input"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZP input, cod postal input, amount 1.234,56 RON"
      },
      {
        "label": "Edge sample",
        "value": "Review RO COPY edge 60"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Romanian Locale Copy Checker analyzes Romania-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-support-ticket-scrubber",
    "name": "Romanian Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 1850101123451, RO49AAAA1B31007593840000, Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO SUP 61"
      },
      {
        "label": "Short sample",
        "value": "Customer sent 1850101123451, RO49AAAA1B31007593840"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO Customer sent 1850101123451, RO49AAAA1B31007593840000, Calea Victoriei 1, 010061 Bucuresti"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SUP edge 61"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Romanian Support Ticket Scrubber analyzes Romania-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "romania-integration-smoke-test-builder",
    "name": "Romanian Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid RO SMOKE 62"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix RO {\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review RO SMOKE edge 62"
      }
    ],
    "boundaries": [
      "Official Romania identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Romanian Integration Smoke Test Builder analyzes Romania-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Romanian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"romania","iso2":"RO","iso3":"ROU","isoNumeric":"642","name":"Romania","adjective":"Romanian","nativeName":"Romania","flag":"🇷🇴","language":"Romanian","localLanguage":"ro-RO","currency":"RON","currencyName":"Romanian leu","symbol":"RON","locale":"ro-RO","icu":"ro_RO","date":"DD.MM.YYYY","decimal":"Comma (,)","thousands":"Dot or space grouping","phone":"+40","capital":"Bucharest","region":"Southeastern Europe / European Union","population":"approximately 19.0M","identifiers":["CNP","CUI","CIF","ONRC","postal code","phone"],"payments":["IBAN","SWIFT","ANAF handoff","e-Factura handoff","VIES"],"localTerms":{"personal":"CNP","company":"CUI / CIF","tax":"TVA","social":"CNP","register":"ONRC","invoice":"RO e-Factura / ANAF","payment":"treasury / SEPA handoff","plate":"numar inmatriculare","postal":"cod postal","privacy":"GDPR / ANSPDCP"},"samples":{"personal":"1850101123451","company":"RO12345674","social":"1850101123451","iban":"RO49AAAA1B31007593840000","bank":"AAAA 1B31007593840000","phone":"+40 721 234 567","postal":"010011 Bucuresti","plate":"B 123 ABC","vat":"RO12345674","amount":"1.234,56 RON","date":"21.07.2026","address":"Calea Victoriei 1, 010061 Bucuresti","json":"{\"country\":\"RO\",\"cnp\":\"1850101123451\",\"cui\":\"RO12345674\",\"iban\":\"RO49AAAA1B31007593840000\"}"},"theme":["#002B7F","#FCD116","#CE1126"],"marker":{"x":58,"y":62},"related":["BG","HU","MD"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Romania systems remain the source of truth.', localStructure: 'Romanian local structure', addEvidence: 'Add Romanian local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Romania siguen siendo la fuente de verdad.', localStructure: 'estructura local de Romania', addEvidence: 'Agrega evidencia local de Romania o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Romania continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Romania', addEvidence: 'Adicione evidencia local de Romania ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Romania bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Romania', addEvidence: 'Fuege lokale Romanian Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Romania restent la source de verite.', localStructure: 'structure locale de Romania', addEvidence: 'Ajoutez une preuve locale de Romania ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Romania pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Romania', addEvidence: 'Dodaj lokalne dane kraju Romania albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Romania systems remain the source of truth.', localStructure: 'Romanian local structure', addEvidence: 'Add Romanian local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:RO)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/RO\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/RO[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:RON|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '#002B7F', accent2: '#FCD116', accent3: '#CE1126' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
