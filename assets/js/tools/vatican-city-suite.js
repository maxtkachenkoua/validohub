(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.vatican-city-suite';
  const RAW_TOOLS = [
  {
    "id": "vatican-city-document-number-validator",
    "name": "Vatican document number Validator",
    "code": "ID",
    "summary": "Validate document number shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SCV123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA ID edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Vatican document number Validator analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vatican-entity-code-validator",
    "name": "Vatican Vatican entity code Validator",
    "code": "ORG",
    "summary": "Inspect Vatican entity code structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA-ENTITY-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA-ENTITY-002",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA-ENTIT",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ENTITY-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA ORG edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Vatican Vatican entity code Validator analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vat-id-validator",
    "name": "Vatican VAT ID / VA Prefix Validator",
    "code": "VAT",
    "summary": "Normalize VA VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA00123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZ00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA001234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA VAT edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VAT local evidence",
        "text": "Vatican VAT ID / VA Prefix Validator analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-eori-validator",
    "name": "Vatican EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VAVA-ENTITY-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZVA-ENTITY-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VAVA-ENTI",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZVA-ENTITY-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA EORI edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EORI local evidence",
        "text": "Vatican EORI / Customs Identifier Helper analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-document-number-social-insurance-helper",
    "name": "Vatican document number Helper",
    "code": "SOC",
    "summary": "Split document number evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SCV123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SOC edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Vatican document number Helper analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-company-onboarding-auditor",
    "name": "Vatican Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for Vatican entity code, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345679\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA KYC edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Vatican Company Onboarding Auditor analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-business-register-readiness-helper",
    "name": "Vatican Vatican administration Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated Vatican administration lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA-ENTITY-001 VA00123456789 Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA-ENTITY-001 VA00123456789 Cortile San Damaso, 00121 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA-ENTITY-001 VA00123456789 Cortile S",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ENTITY-001 VA00123456789 Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA REG edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Vatican Vatican administration Readiness Helper analyzes Vatican City-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-id-card-format-helper",
    "name": "Vatican ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA CARD 8",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA CARD edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Vatican ID Card Format Helper analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-passport-number-helper",
    "name": "Vatican Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<VATVATICAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PASS 9",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<VATVATICAN<<SAMPLE<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA P<VATVATICAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PASS edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Vatican Passport Number Helper analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-mrz-passport-parser",
    "name": "Vatican MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<VATSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567VAT8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA MRZ 10",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<VATSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA P<VATSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567VAT8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA MRZ edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Vatican MRZ / Passport Parser analyzes Vatican City-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-iban-validator",
    "name": "Vatican City IBAN Validator",
    "code": "IBAN",
    "summary": "Validate VA IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA59001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZ59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA590011230000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA IBAN edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBAN local evidence",
        "text": "Vatican City IBAN Validator analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-iban-generator",
    "name": "Vatican City IBAN Generator",
    "code": "IBG",
    "summary": "Generate VA IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix VA 001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001123000000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "0011 2300 0000 0123 4567 8",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review VA IBG edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBG local evidence",
        "text": "Vatican City IBAN Generator analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-bank-account-inspector",
    "name": "Vatican Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA BANK 13",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001123000000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA BANK edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Vatican Domestic Bank Account Inspector analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-bic-swift-inspector",
    "name": "Vatican BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Vatican City banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDVA2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZCDVA2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCDV",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCDVA2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA BIC edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Vatican BIC / SWIFT Inspector analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-sepa-transfer-helper",
    "name": "Vatican SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA59001123000000012345678\\n1.234,56 EUR\\nInvoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA SEPA 15",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA59001123000000012345678\\n1.234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ59001123000000012345678\\n1.234,56 EUR\\nInvoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SEPA edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SEPA local evidence",
        "text": "Vatican SEPA Transfer Helper analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-sepa-direct-debit-mandate-helper",
    "name": "Vatican SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 VA59001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA SDD 16",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 VA59001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZNDATE-2026-001 VA59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SDD edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SDD local evidence",
        "text": "Vatican SEPA Direct Debit Mandate Helper analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-payment-reference-helper",
    "name": "Vatican SEPA reference Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SEPA reference REF 2026-001 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PAY 17",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SEPA reference REF 202",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZPA reference REF 2026-001 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PAY edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Vatican SEPA reference Reference Helper analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-remittance-text-builder",
    "name": "Vatican Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 VA00123456789 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA REMIT 18",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 VA00123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Invoice 2026-001 VA00123456789 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA REMIT edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Vatican Remittance Text Builder analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-payment-reconciliation-helper",
    "name": "Vatican Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1.234,56 EUR; VA59001123000000012345678; Invoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA RECON 19",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1.234,56 EUR; VA5900112300",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 21/07/2026; 1.234,56 EUR; VA59001123000000012345678; Invoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA RECON edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Vatican Payment Reconciliation Helper analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-bank-statement-parser",
    "name": "Vatican Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1.234,56 EUR; VA59001123000000012345678; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA STMT 20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1.234,56 EUR; VA590011230000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 21/07/2026; 1.234,56 EUR; VA59001123000000012345678; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA STMT edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Vatican Bank Statement Parser analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-masked-iban-formatter",
    "name": "Vatican Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA59001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZ59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA590011230000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA MASK edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Vatican Masked IBAN Formatter analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-currency-decimal-formatter",
    "name": "Vatican EUR Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA CUR 22",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1.234,5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA CUR edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Vatican EUR Decimal Currency Formatter analyzes Vatican City-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vat-rate-sanity-helper",
    "name": "Vatican VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "fiscal reference 20% base 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA RATE 23",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "fiscal reference 20% ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA fiscal reference 20% base 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA RATE edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Vatican VAT Rate Sanity Helper analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vat-return-field-helper",
    "name": "Vatican VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "fiscal reference; VA00123456789; period 2026-07; 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA RET 24",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "fiscal reference; VA00123456789; p",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA fiscal reference; VA00123456789; period 2026-07; 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA RET edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Vatican VAT Return Field Helper analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-invoice-number-helper",
    "name": "Vatican Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 VA00123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA INV 25",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 V",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV-2026-0001 VA00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA INV edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Vatican Invoice Number Helper analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-e-invoicing-readiness-checker",
    "name": "Vatican fiscal invoice Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA EINV 26",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA EINV edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Vatican fiscal invoice Readiness Checker analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-tax-authority-handoff-helper",
    "name": "Vatican Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA00123456789 21/07/2026 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA TAX 27",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA00123456789 21/07/2",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ00123456789 21/07/2026 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA TAX edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Vatican Tax Authority Handoff Helper analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-accounting-audit-trail-checklist-generator",
    "name": "Vatican Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 21/07/2026 1.234,56 EUR VA00123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA AUDIT 28",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "invoice 21/07/2026 1.234,",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA invoice 21/07/2026 1.234,56 EUR VA00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA AUDIT edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Vatican Accounting Audit Trail Checklist Helper analyzes Vatican City-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-postal-code-validator",
    "name": "Vatican Postal Code Validator",
    "code": "POST",
    "summary": "Validate postal code shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA POST 29",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "00120 Vati",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA POST edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Vatican Postal Code Validator analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-address-normalizer",
    "name": "Vatican Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA ADDR 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Cortile San Damaso, 0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA ADDR edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Vatican Address Normalizer analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-address-transliteration-normalizer",
    "name": "Vatican Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA ASCII 31",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Cortile San Damaso, 0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA ASCII edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Vatican Address Transliteration Normalizer analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-region-code-mapper",
    "name": "Vatican Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA REGION 32",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "00120 Vati",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA REGION edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Vatican Region / Province Code Mapper analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-municipality-code-inspector",
    "name": "Vatican Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA MUNI 33",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Cortile San Damaso, 0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA MUNI edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Vatican Municipality Code Inspector analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-phone-number-validator",
    "name": "Vatican Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+39 06 6982 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PHONE 34",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+39 06 69",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA +39 06 6982 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PHONE edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Vatican Phone Number Validator analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-phone-e164-formatter",
    "name": "Vatican Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+39 06 6982 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA E164 35",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+39 06 69",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA +39 06 6982 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA E164 edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Vatican Phone E.164 Formatter analyzes Vatican City-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-date-locale-formatter",
    "name": "Vatican Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA DATE 36",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA DATE edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Vatican Date Locale Formatter analyzes Vatican City-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-csv-locale-normalizer",
    "name": "Vatican CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Vatican City decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1.234,56 EUR;21/07/2026;VA00123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA CSV 37",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1.234,56 EU",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA id;amount;date;tax\\n1;1.234,56 EUR;21/07/2026;VA00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA CSV edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Vatican CSV Locale Normalizer analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-slug-normalizer",
    "name": "Vatican Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Vatican City sample company Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA SLUG 38",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Vatican City sample company Cortile S",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Vatican City sample company Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SLUG edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Vatican Slug Normalizer analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-document-ocr-fixer",
    "name": "Vatican Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456 VA00123456789 VA59001123000000012345678 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA OCR 39",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV123456 VA00123456789 VA590011230000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456 VA00123456789 VA59001123000000012345678 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA OCR edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Vatican Document OCR Fixer analyzes Vatican City-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-gdpr-redaction-helper",
    "name": "Vatican personal-data protection Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA GDPR 40",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA GDPR edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GDPR local evidence",
        "text": "Vatican personal-data protection Redaction Helper analyzes Vatican City-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-pii-masker",
    "name": "Vatican PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456 +39 06 6982 1234 VA59001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PII 41",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV123456 +39 06 6982 1234 VA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456 +39 06 6982 1234 VA59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PII edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Vatican PII Masker analyzes Vatican City-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-personal-data-fixture-generator",
    "name": "Vatican Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456\\nCortile San Damaso, 00120 Vatican City\\n+39 06 6982 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA FIX 42",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV123456\\nCortile San Damaso, 00120 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456\\nCortile San Damaso, 00120 Vatican City\\n+39 06 6982 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA FIX edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Vatican Personal Data Fixture Helper analyzes Vatican City-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-driving-licence-format-helper",
    "name": "Vatican Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456 DL 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA DL 43",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV123456 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456 DL 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA DL edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Vatican Driving Licence Format Helper analyzes Vatican City-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-residence-permit-format-helper",
    "name": "Vatican Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA PERMIT 2026 SCV123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PERMIT 44",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA PERMIT 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ PERMIT 2026 SCV123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PERMIT edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Vatican Residence Permit Format Helper analyzes Vatican City-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-health-card-format-helper",
    "name": "Vatican Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV123456 HEALTH 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA HEALTH 45",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV123456 HE",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV123456 HEALTH 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA HEALTH edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Vatican Health Card Format Helper analyzes Vatican City-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vehicle-plate-inspector",
    "name": "Vatican Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV 12345",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SCV 12346",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV 12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PLATE edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Vatican Vehicle Plate Inspector analyzes Vatican City-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vin-validator",
    "name": "Vatican VIN Validator",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare vehicle-intake diagnostics.",
    "category": "transport",
    "actionLabel": "Validate",
    "kind": "vin",
    "samples": [
      {
        "label": "Valid sample",
        "value": "WVWZZZ1JZXW000001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid WVWZZZ1JZXW000002",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "WVWZZZ1JZX",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZWZZZ1JZXW000001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA VIN edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Vatican VIN Validator analyzes Vatican City-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-vehicle-data-redaction-helper",
    "name": "Vatican Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SCV 12345 WVWZZZ1JZXW000001 SCV123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA VEH 48",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SCV 12345 WVWZZZ1JZXW",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV 12345 WVWZZZ1JZXW000001 SCV123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA VEH edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Vatican Vehicle Data Redaction Helper analyzes Vatican City-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-customs-declaration-helper",
    "name": "Vatican Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA00123456789 HS 8471 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA CUSTOMS 49",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA00123456789 HS 84",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ00123456789 HS 8471 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA CUSTOMS edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Vatican Customs Declaration Helper analyzes Vatican City-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-postal-tracking-helper",
    "name": "Vatican Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA TRACK 50",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 00120",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZACK 2026 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA TRACK edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Vatican Postal Tracking Helper analyzes Vatican City-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-data-quality-workbench",
    "name": "Vatican Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA DQ 51",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA DQ edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Vatican Data Quality Workbench analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-json-fixture-generator",
    "name": "Vatican JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA JSON 52",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA JSON edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Vatican JSON Fixture Helper analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-regex-pack-helper",
    "name": "Vatican Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "document number Vatican entity code postal code  VA59001123000000012345678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA REGEX 53",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "document number Vatican entity code posta",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA document number Vatican entity code postal code  VA59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA REGEX edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Vatican Regex Pack Helper analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-api-payload-auditor",
    "name": "Vatican API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA API 54",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA API edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Vatican API Payload Auditor analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-form-field-auditor",
    "name": "Vatican Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=VA00123456789&postal=00120 Vatican City&phone=+39 06 6982 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA FORM 55",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax=VA00123456789&postal=00120 Vatica",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA tax=VA00123456789&postal=00120 Vatican City&phone=+39 06 6982 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA FORM edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Vatican Form Field Auditor analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-locale-number-parser",
    "name": "Vatican Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Vatican City.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA NUM 56",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1.234,5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA NUM edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Vatican Locale Number Parser analyzes Vatican City-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-calendar-week-helper",
    "name": "Vatican Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026 week 30",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA CAL 57",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA 21/07/2026 week 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA CAL edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Vatican Calendar Week Helper analyzes Vatican City-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-company-suffix-normalizer",
    "name": "Vatican Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Vatican City Sample Holding Ltd VA-ENTITY-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Vatican City Sample Holding Ltd VA-ENTITY-002",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Vatican City Sample Holdi",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Vatican City Sample Holding Ltd VA-ENTITY-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SUFFIX edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Vatican Company Suffix Normalizer analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-procurement-identifier-helper",
    "name": "Vatican Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VA-ENTITY-001 PO-2026-001 VA00123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA PROC 59",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "VA-ENTITY-001 PO-2026-",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ENTITY-001 PO-2026-001 VA00123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA PROC edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Vatican Procurement Identifier Helper analyzes Vatican City-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-accessibility-locale-copy-checker",
    "name": "Vatican Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "document number input, postal code input, amount 1.234,56 EUR",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA COPY 60",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "document number input, postal code",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA document number input, postal code input, amount 1.234,56 EUR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA COPY edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Vatican Locale Copy Checker analyzes Vatican City-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-support-ticket-scrubber",
    "name": "Vatican Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent SCV123456, VA59001123000000012345678, Cortile San Damaso, 00120 Vatican City",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA SUP 61",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Customer sent SCV123456, VA59001123000000012345678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA Customer sent SCV123456, VA59001123000000012345678, Cortile San Damaso, 00120 Vatican City",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SUP edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Vatican Support Ticket Scrubber analyzes Vatican City-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "vatican-city-integration-smoke-test-builder",
    "name": "Vatican Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid VA SMOKE 62",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix VA {\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review VA SMOKE edge 62",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Vatican City identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Vatican Integration Smoke Test Builder analyzes Vatican City-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Vatican parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"vatican-city","iso2":"VA","iso3":"VAT","isoNumeric":"336","name":"Vatican City","adjective":"Vatican","nativeName":"Citta del Vaticano","flag":"🇻🇦","language":"Italian and Latin","localLanguage":"it-VA","currency":"EUR","currencyName":"Euro","symbol":"EUR","locale":"it-VA","icu":"it_VA","date":"DD/MM/YYYY","decimal":"Comma (,)","thousands":"Dot grouping","phone":"+379","capital":"Vatican City","region":"Southern Europe","population":"approximately 0.001M","identifiers":["Vatican entity code","postal code","phone","document number"],"payments":["IBAN","SEPA","SWIFT","payment reference"],"localTerms":{"personal":"document number","company":"Vatican entity code","tax":"fiscal reference","social":"document number","register":"Vatican administration","invoice":"fiscal invoice","payment":"SEPA reference","plate":"SCV/CV plate","postal":"postal code","privacy":"personal-data protection"},"samples":{"personal":"SCV123456","company":"VA-ENTITY-001","social":"SCV123456","iban":"VA59001123000000012345678","bank":"001123000000012345678","phone":"+39 06 6982 1234","postal":"00120 Vatican City","plate":"SCV 12345","vat":"VA00123456789","amount":"1.234,56 EUR","date":"21/07/2026","address":"Cortile San Damaso, 00120 Vatican City","json":"{\"country\":\"VA\",\"entity\":\"VA-ENTITY-001\",\"iban\":\"VA59001123000000012345678\"}"},"theme":["#FFD700","#FFFFFF","#9CA3AF"],"marker":{"x":51,"y":64},"related":["IT","SM","FR"],"plugTypes":"Type C / Type F / Type L","voltage":"230V","frequency":"50Hz","searchHints":["SCV","CV","IBAN","SEPA","00120","ENTITY"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Vatican City systems remain the source of truth.', localStructure: 'Vatican local structure', addEvidence: 'Add Vatican local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Vatican City siguen siendo la fuente de verdad.', localStructure: 'estructura local de Vatican City', addEvidence: 'Agrega evidencia local de Vatican City o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Vatican City continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Vatican City', addEvidence: 'Adicione evidencia local de Vatican City ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Vatican City bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Vatican City', addEvidence: 'Fuege lokale Vatican Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Vatican City restent la source de verite.', localStructure: 'structure locale de Vatican City', addEvidence: 'Ajoutez une preuve locale de Vatican City ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Vatican City pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Vatican City', addEvidence: 'Dodaj lokalne dane kraju Vatican City albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Vatican City systems remain the source of truth.', localStructure: 'Vatican local structure', addEvidence: 'Add Vatican local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:VA)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/VA\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/VA[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:EUR|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '#FFD700', accent2: '#FFFFFF', accent3: '#9CA3AF' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
