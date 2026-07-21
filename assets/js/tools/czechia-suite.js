(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.czechia-suite';
  const RAW_TOOLS = [
  {
    "id": "czechia-rodne-cislo-validator",
    "name": "Czech Rodne cislo Validator",
    "code": "ID",
    "summary": "Validate Rodne cislo shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006"
      },
      {
        "label": "Invalid sample",
        "value": "800101/0007"
      },
      {
        "label": "Short sample",
        "value": "800101/"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ ID edge 1"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Czech Rodne cislo Validator analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-ico-validator",
    "name": "Czech ICO Validator",
    "code": "ORG",
    "summary": "Inspect ICO structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "27074358"
      },
      {
        "label": "Invalid sample",
        "value": "27074359"
      },
      {
        "label": "Short sample",
        "value": "27074"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ ORG edge 2"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Czech ICO Validator analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vat-id-validator",
    "name": "Czech VAT ID / CZ Prefix Validator",
    "code": "VAT",
    "summary": "Normalize CZ VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ27074358"
      },
      {
        "label": "Short sample",
        "value": "CZ2707"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ VAT edge 3"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VAT local evidence",
        "text": "Czech VAT ID / CZ Prefix Validator analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-eori-validator",
    "name": "Czech EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ27074358"
      },
      {
        "label": "Short sample",
        "value": "CZ2707"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ EORI edge 4"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EORI local evidence",
        "text": "Czech EORI / Customs Identifier Helper analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-social-insurance-evidence-social-insurance-helper",
    "name": "Czech social insurance evidence Helper",
    "code": "SOC",
    "summary": "Split social insurance evidence evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006"
      },
      {
        "label": "Invalid sample",
        "value": "800101/0007"
      },
      {
        "label": "Short sample",
        "value": "800101/"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SOC edge 5"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Czech social insurance evidence Helper analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-company-onboarding-auditor",
    "name": "Czech Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for ICO, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145390\"}"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ KYC edge 6"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Czech Company Onboarding Auditor analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-business-register-readiness-helper",
    "name": "Czech Ares / business register Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated Ares / business register lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "27074358 CZ27074358 Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "27074358 CZ27074358 Vaclavske namesti 1, 110 00 Praha 2"
      },
      {
        "label": "Short sample",
        "value": "27074358 CZ27074358 Vaclavske n"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 27074358 CZ27074358 Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ REG edge 7"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Czech Ares / business register Readiness Helper analyzes Czechia-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-id-card-format-helper",
    "name": "Czech ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ CARD 8"
      },
      {
        "label": "Short sample",
        "value": "800101/"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ CARD edge 8"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Czech ID Card Format Helper analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-passport-number-helper",
    "name": "Czech Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<CZECZECH<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PASS 9"
      },
      {
        "label": "Short sample",
        "value": "P<CZECZECH<<SAMPLE<<"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ P<CZECZECH<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PASS edge 9"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Czech Passport Number Helper analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-mrz-passport-parser",
    "name": "Czech MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<CZESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567CZE8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ MRZ 10"
      },
      {
        "label": "Short sample",
        "value": "P<CZESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ P<CZESAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567CZE8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ MRZ edge 10"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Czech MRZ / Passport Parser analyzes Czechia-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-iban-validator",
    "name": "Czechia IBAN Validator",
    "code": "IBAN",
    "summary": "Validate CZ IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ6508000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ6508000000192000145399"
      },
      {
        "label": "Short sample",
        "value": "CZ650800000019"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ6508000000192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ IBAN edge 11"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBAN local evidence",
        "text": "Czechia IBAN Validator analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-iban-generator",
    "name": "Czechia IBAN Generator",
    "code": "IBG",
    "summary": "Generate CZ IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "08000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix CZ 08000000192000145399"
      },
      {
        "label": "Short sample",
        "value": "08000000192"
      },
      {
        "label": "Grouped valid sample",
        "value": "0800 0000 1920 0014 5399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ IBG edge 12"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBG local evidence",
        "text": "Czechia IBAN Generator analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-bank-account-inspector",
    "name": "Czech Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "0800 192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ BANK 13"
      },
      {
        "label": "Short sample",
        "value": "0800 19200"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 0800 192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ BANK edge 13"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Czech Domestic Bank Account Inspector analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-bic-swift-inspector",
    "name": "Czech BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Czechia banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDCZ2X"
      },
      {
        "label": "Invalid sample",
        "value": "ZZCDCZ2X"
      },
      {
        "label": "Short sample",
        "value": "ABCDC"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZCDCZ2X"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ BIC edge 14"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Czech BIC / SWIFT Inspector analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-sepa-transfer-helper",
    "name": "Czech SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ6508000000192000145399\\n1 234,56 CZK\\nInvoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ SEPA 15"
      },
      {
        "label": "Short sample",
        "value": "CZ6508000000192000145399\\n1 234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ6508000000192000145399\\n1 234,56 CZK\\nInvoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SEPA edge 15"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SEPA local evidence",
        "text": "Czech SEPA Transfer Helper analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-sepa-direct-debit-mandate-helper",
    "name": "Czech SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 CZ6508000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ SDD 16"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 CZ6508"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZNDATE-2026-001 CZ6508000000192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SDD edge 16"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SDD local evidence",
        "text": "Czech SEPA Direct Debit Mandate Helper analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-payment-reference-helper",
    "name": "Czech variable symbol Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "variable symbol REF 2026-001 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PAY 17"
      },
      {
        "label": "Short sample",
        "value": "variable symbol REF 202"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ variable symbol REF 2026-001 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PAY edge 17"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Czech variable symbol Reference Helper analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-remittance-text-builder",
    "name": "Czech Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 CZ27074358 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ REMIT 18"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 CZ270"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Invoice 2026-001 CZ27074358 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ REMIT edge 18"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Czech Remittance Text Builder analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-payment-reconciliation-helper",
    "name": "Czech Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026; 1 234,56 CZK; CZ6508000000192000145399; Invoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ RECON 19"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026; 1 234,56 CZK; CZ6508000000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 21.07.2026; 1 234,56 CZK; CZ6508000000192000145399; Invoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ RECON edge 19"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Czech Payment Reconciliation Helper analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-bank-statement-parser",
    "name": "Czech Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21.07.2026; 1 234,56 CZK; CZ6508000000192000145399; sample counterparty"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ STMT 20"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026; 1 234,56 CZK; CZ650800000019"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 21.07.2026; 1 234,56 CZK; CZ6508000000192000145399; sample counterparty"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ STMT edge 20"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Czech Bank Statement Parser analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-masked-iban-formatter",
    "name": "Czech Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ6508000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ6508000000192000145399"
      },
      {
        "label": "Short sample",
        "value": "CZ650800000019"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ6508000000192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ MASK edge 21"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Czech Masked IBAN Formatter analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-currency-decimal-formatter",
    "name": "Czech CZK Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize CZK amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ CUR 22"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ CUR edge 22"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Czech CZK Decimal Currency Formatter analyzes Czechia-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vat-rate-sanity-helper",
    "name": "Czech VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "DIC / DPH 20% base 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ RATE 23"
      },
      {
        "label": "Short sample",
        "value": "DIC / DPH 20% base"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZC / DPH 20% base 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ RATE edge 23"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Czech VAT Rate Sanity Helper analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vat-return-field-helper",
    "name": "Czech VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "DIC / DPH; CZ27074358; period 2026-07; 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ RET 24"
      },
      {
        "label": "Short sample",
        "value": "DIC / DPH; CZ27074358; period"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZC / DPH; CZ27074358; period 2026-07; 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ RET edge 24"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Czech VAT Return Field Helper analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-invoice-number-helper",
    "name": "Czech Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ INV 25"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZV-2026-0001 CZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ INV edge 25"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Czech Invoice Number Helper analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-e-invoicing-readiness-checker",
    "name": "Czech ISDOC / e-invoicing Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ EINV 26"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ EINV edge 26"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Czech ISDOC / e-invoicing Readiness Checker analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-tax-authority-handoff-helper",
    "name": "Czech Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ27074358 21.07.2026 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ TAX 27"
      },
      {
        "label": "Short sample",
        "value": "CZ27074358 21.07.20"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ27074358 21.07.2026 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ TAX edge 27"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Czech Tax Authority Handoff Helper analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-accounting-audit-trail-checklist-generator",
    "name": "Czech Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 21.07.2026 1 234,56 CZK CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ AUDIT 28"
      },
      {
        "label": "Short sample",
        "value": "invoice 21.07.2026 1 234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ invoice 21.07.2026 1 234,56 CZK CZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ AUDIT edge 28"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Czech Accounting Audit Trail Checklist Helper analyzes Czechia-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-postal-code-validator",
    "name": "Czech Postal Code Validator",
    "code": "POST",
    "summary": "Validate PSC shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ POST 29"
      },
      {
        "label": "Short sample",
        "value": "110 00 P"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ POST edge 29"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Czech Postal Code Validator analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-address-normalizer",
    "name": "Czech Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ ADDR 30"
      },
      {
        "label": "Short sample",
        "value": "Vaclavske namesti 1,"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ ADDR edge 30"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Czech Address Normalizer analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-address-transliteration-normalizer",
    "name": "Czech Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ ASCII 31"
      },
      {
        "label": "Short sample",
        "value": "Vaclavske namesti 1,"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ ASCII edge 31"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Czech Address Transliteration Normalizer analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-region-code-mapper",
    "name": "Czech Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ REGION 32"
      },
      {
        "label": "Short sample",
        "value": "110 00 P"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ REGION edge 32"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Czech Region / Province Code Mapper analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-municipality-code-inspector",
    "name": "Czech Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ MUNI 33"
      },
      {
        "label": "Short sample",
        "value": "Vaclavske namesti 1,"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ MUNI edge 33"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Czech Municipality Code Inspector analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-phone-number-validator",
    "name": "Czech Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+420 777 123 456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PHONE 34"
      },
      {
        "label": "Short sample",
        "value": "+420 777 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ +420 777 123 456"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PHONE edge 34"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Czech Phone Number Validator analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-phone-e164-formatter",
    "name": "Czech Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+420 777 123 456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ E164 35"
      },
      {
        "label": "Short sample",
        "value": "+420 777 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ +420 777 123 456"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ E164 edge 35"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Czech Phone E.164 Formatter analyzes Czechia-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-date-locale-formatter",
    "name": "Czech Date Locale Formatter",
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
        "value": "Invalid CZ DATE 36"
      },
      {
        "label": "Short sample",
        "value": "21.07."
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 21.07.2026"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ DATE edge 36"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Czech Date Locale Formatter analyzes Czechia-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-csv-locale-normalizer",
    "name": "Czech CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Czechia decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1 234,56 CZK;21.07.2026;CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ CSV 37"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1 234,56 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ id;amount;date;tax\\n1;1 234,56 CZK;21.07.2026;CZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ CSV edge 37"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Czech CSV Locale Normalizer analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-slug-normalizer",
    "name": "Czech Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Czechia sample company Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ SLUG 38"
      },
      {
        "label": "Short sample",
        "value": "Czechia sample company Vaclavske"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Czechia sample company Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SLUG edge 38"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Czech Slug Normalizer analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-document-ocr-fixer",
    "name": "Czech Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006 CZ27074358 CZ6508000000192000145399 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ OCR 39"
      },
      {
        "label": "Short sample",
        "value": "800101/0006 CZ27074358 CZ6508000000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006 CZ27074358 CZ6508000000192000145399 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ OCR edge 39"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Czech Document OCR Fixer analyzes Czechia-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-gdpr-redaction-helper",
    "name": "Czech GDPR / UOOU Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ GDPR 40"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ GDPR edge 40"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GDPR local evidence",
        "text": "Czech GDPR / UOOU Redaction Helper analyzes Czechia-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-pii-masker",
    "name": "Czech PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006 +420 777 123 456 CZ6508000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PII 41"
      },
      {
        "label": "Short sample",
        "value": "800101/0006 +420 777 123 456 C"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006 +420 777 123 456 CZ6508000000192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PII edge 41"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Czech PII Masker analyzes Czechia-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-personal-data-fixture-generator",
    "name": "Czech Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006\\nVaclavske namesti 1, 110 00 Praha 1\\n+420 777 123 456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ FIX 42"
      },
      {
        "label": "Short sample",
        "value": "800101/0006\\nVaclavske namesti 1, 110"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006\\nVaclavske namesti 1, 110 00 Praha 1\\n+420 777 123 456"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ FIX edge 42"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Czech Personal Data Fixture Helper analyzes Czechia-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-driving-licence-format-helper",
    "name": "Czech Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006 DL 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ DL 43"
      },
      {
        "label": "Short sample",
        "value": "800101/0006"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006 DL 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ DL edge 43"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Czech Driving Licence Format Helper analyzes Czechia-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-residence-permit-format-helper",
    "name": "Czech Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ PERMIT 2026 800101/0006"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PERMIT 44"
      },
      {
        "label": "Short sample",
        "value": "CZ PERMIT 2026 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ PERMIT 2026 800101/0006"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PERMIT edge 44"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Czech Residence Permit Format Helper analyzes Czechia-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-health-card-format-helper",
    "name": "Czech Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "800101/0006 HEALTH 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ HEALTH 45"
      },
      {
        "label": "Short sample",
        "value": "800101/0006 H"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 800101/0006 HEALTH 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ HEALTH edge 45"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Czech Health Card Format Helper analyzes Czechia-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vehicle-plate-inspector",
    "name": "Czech Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1AB 2345"
      },
      {
        "label": "Invalid sample",
        "value": "1AB 2346"
      },
      {
        "label": "Short sample",
        "value": "1AB 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 1AB 2345"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PLATE edge 46"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Czech Vehicle Plate Inspector analyzes Czechia-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vin-validator",
    "name": "Czech VIN Validator",
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
        "value": "Review CZ VIN edge 47"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Czech VIN Validator analyzes Czechia-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-vehicle-data-redaction-helper",
    "name": "Czech Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1AB 2345 WVWZZZ1JZXW000001 800101/0006"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ VEH 48"
      },
      {
        "label": "Short sample",
        "value": "1AB 2345 WVWZZZ1JZXW0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 1AB 2345 WVWZZZ1JZXW000001 800101/0006"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ VEH edge 48"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Czech Vehicle Data Redaction Helper analyzes Czechia-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-customs-declaration-helper",
    "name": "Czech Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CZ27074358 HS 8471 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ CUSTOMS 49"
      },
      {
        "label": "Short sample",
        "value": "CZ27074358 HS 8471"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ27074358 HS 8471 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ CUSTOMS edge 49"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Czech Customs Declaration Helper analyzes Czechia-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-postal-tracking-helper",
    "name": "Czech Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ TRACK 50"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 110"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZACK 2026 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ TRACK edge 50"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Czech Postal Tracking Helper analyzes Czechia-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-data-quality-workbench",
    "name": "Czech Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ DQ 51"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ DQ edge 51"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Czech Data Quality Workbench analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-json-fixture-generator",
    "name": "Czech JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ JSON 52"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ JSON edge 52"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Czech JSON Fixture Helper analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-regex-pack-helper",
    "name": "Czech Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rodne cislo ICO PSC  CZ6508000000192000145399"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ REGEX 53"
      },
      {
        "label": "Short sample",
        "value": "Rodne cislo ICO PSC  CZ65"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Rodne cislo ICO PSC  CZ6508000000192000145399"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ REGEX edge 53"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Czech Regex Pack Helper analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-api-payload-auditor",
    "name": "Czech API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ API 54"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ API edge 54"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Czech API Payload Auditor analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-form-field-auditor",
    "name": "Czech Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=CZ27074358&postal=110 00 Praha 1&phone=+420 777 123 456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ FORM 55"
      },
      {
        "label": "Short sample",
        "value": "tax=CZ27074358&postal=110 00 Prah"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ tax=CZ27074358&postal=110 00 Praha 1&phone=+420 777 123 456"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ FORM edge 55"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Czech Form Field Auditor analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-locale-number-parser",
    "name": "Czech Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Czechia.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ NUM 56"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ NUM edge 56"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Czech Locale Number Parser analyzes Czechia-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-calendar-week-helper",
    "name": "Czech Calendar Week Helper",
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
        "value": "Invalid CZ CAL 57"
      },
      {
        "label": "Short sample",
        "value": "21.07.2026"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 21.07.2026 week 30"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ CAL edge 57"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Czech Calendar Week Helper analyzes Czechia-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-company-suffix-normalizer",
    "name": "Czech Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Czechia Sample Holding Ltd 27074358"
      },
      {
        "label": "Invalid sample",
        "value": "Czechia Sample Holding Ltd 27074359"
      },
      {
        "label": "Short sample",
        "value": "Czechia Sample Holdi"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Czechia Sample Holding Ltd 27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SUFFIX edge 58"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Czech Company Suffix Normalizer analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-procurement-identifier-helper",
    "name": "Czech Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "27074358 PO-2026-001 CZ27074358"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ PROC 59"
      },
      {
        "label": "Short sample",
        "value": "27074358 PO-2026-0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ 27074358 PO-2026-001 CZ27074358"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ PROC edge 59"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Czech Procurement Identifier Helper analyzes Czechia-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-accessibility-locale-copy-checker",
    "name": "Czech Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rodne cislo input, PSC input, amount 1 234,56 CZK"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ COPY 60"
      },
      {
        "label": "Short sample",
        "value": "Rodne cislo input, PSC inpu"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Rodne cislo input, PSC input, amount 1 234,56 CZK"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ COPY edge 60"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Czech Locale Copy Checker analyzes Czechia-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-support-ticket-scrubber",
    "name": "Czech Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 800101/0006, CZ6508000000192000145399, Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ SUP 61"
      },
      {
        "label": "Short sample",
        "value": "Customer sent 800101/0006, CZ65080000001920001453"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ Customer sent 800101/0006, CZ6508000000192000145399, Vaclavske namesti 1, 110 00 Praha 1"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SUP edge 61"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Czech Support Ticket Scrubber analyzes Czechia-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "czechia-integration-smoke-test-builder",
    "name": "Czech Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CZ SMOKE 62"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ270743"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CZ {\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review CZ SMOKE edge 62"
      }
    ],
    "boundaries": [
      "Official Czechia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Czech Integration Smoke Test Builder analyzes Czechia-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Czech parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"czechia","iso2":"CZ","iso3":"CZE","isoNumeric":"203","name":"Czechia","adjective":"Czech","nativeName":"Cesko","flag":"🇨🇿","language":"Czech","localLanguage":"cs-CZ","currency":"CZK","currencyName":"Czech koruna","symbol":"CZK","locale":"cs-CZ","icu":"cs_CZ","date":"DD.MM.YYYY","decimal":"Comma (,)","thousands":"Space grouping","phone":"+420","capital":"Prague","region":"Central Europe / European Union","population":"approximately 10.9M","identifiers":["Rodne cislo","ICO","DIC","Datova schranka","postal code","phone"],"payments":["IBAN","domestic account","SWIFT","variable symbol","VIES"],"localTerms":{"personal":"Rodne cislo","company":"ICO","tax":"DIC / DPH","social":"social insurance evidence","register":"Ares / business register","invoice":"ISDOC / e-invoicing","payment":"variable symbol","plate":"SPZ vehicle plate","postal":"PSC","privacy":"GDPR / UOOU"},"samples":{"personal":"800101/0006","company":"27074358","social":"800101/0006","iban":"CZ6508000000192000145399","bank":"0800 192000145399","phone":"+420 777 123 456","postal":"110 00 Praha 1","plate":"1AB 2345","vat":"CZ27074358","amount":"1 234,56 CZK","date":"21.07.2026","address":"Vaclavske namesti 1, 110 00 Praha 1","json":"{\"country\":\"CZ\",\"ico\":\"27074358\",\"dic\":\"CZ27074358\",\"iban\":\"CZ6508000000192000145399\"}"},"theme":["#11457E","#D7141A","#F8FAFC"],"marker":{"x":51,"y":55},"related":["SK","DE","AT"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Czechia systems remain the source of truth.', localStructure: 'Czech local structure', addEvidence: 'Add Czech local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Czechia siguen siendo la fuente de verdad.', localStructure: 'estructura local de Czechia', addEvidence: 'Agrega evidencia local de Czechia o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Czechia continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Czechia', addEvidence: 'Adicione evidencia local de Czechia ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Czechia bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Czechia', addEvidence: 'Fuege lokale Czech Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Czechia restent la source de verite.', localStructure: 'structure locale de Czechia', addEvidence: 'Ajoutez une preuve locale de Czechia ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Czechia pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Czechia', addEvidence: 'Dodaj lokalne dane kraju Czechia albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Czechia systems remain the source of truth.', localStructure: 'Czech local structure', addEvidence: 'Add Czech local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:CZ)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/CZ\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/CZ[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:CZK|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '#11457E', accent2: '#D7141A', accent3: '#F8FAFC' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
