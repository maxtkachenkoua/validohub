(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.morocco-suite';
  const RAW_TOOLS = [
  {
    "id": "morocco-national-id-boundary-validator",
    "name": "Moroccan national ID boundary Validator",
    "code": "ID",
    "summary": "Validate national ID boundary shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA-ID-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA ID edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Moroccan national ID boundary Validator analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-company-registration-number-validator",
    "name": "Moroccan company registration number Validator",
    "code": "ORG",
    "summary": "Inspect company registration number structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-REG-1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA ORG edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Moroccan company registration number Validator analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-tax-id-validator",
    "name": "Moroccan tax number / VAT boundary Validator",
    "code": "TAX",
    "summary": "Normalize tax number / VAT boundary identifiers, inspect local tax body evidence, and prepare authority handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZ123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA TAX edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Moroccan tax number / VAT boundary Validator analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-customs-importer-code-helper",
    "name": "Moroccan Customs / Importer Code Helper",
    "code": "CUS",
    "summary": "Inspect customs identifiers, importer references, tax bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MAMA-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CUS 4",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MAMA-REG-",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZMA-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CUS edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Moroccan Customs / Importer Code Helper analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid CUS examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized CUS values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "morocco-social-security-boundary-social-insurance-helper",
    "name": "Moroccan social security boundary Helper",
    "code": "SOC",
    "summary": "Split social security boundary evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-SOC-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA-SOC-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-SOC-1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-SOC-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA SOC edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Moroccan social security boundary Helper analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-company-onboarding-auditor",
    "name": "Moroccan Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for company registration number, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-002\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA KYC edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Moroccan Company Onboarding Auditor analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-business-register-readiness-helper",
    "name": "Moroccan business registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated business registry lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-REG-123456 MA123456789 Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA-REG-123456 MA123456789 Central business district, Rabat 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-REG-123456 MA123456789 Central b",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 MA123456789 Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA REG edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Moroccan business registry Readiness Helper analyzes Morocco-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-id-card-format-helper",
    "name": "Moroccan ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CARD 8",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CARD edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Moroccan ID Card Format Helper analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-passport-number-helper",
    "name": "Moroccan Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<MARMOROCCAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PASS 9",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<MARMOROCCAN<<SAMPLE<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA P<MARMOROCCAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PASS edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Moroccan Passport Number Helper analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-mrz-passport-parser",
    "name": "Moroccan MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<MARSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567MAR8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA MRZ 10",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<MARSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA P<MARSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567MAR8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA MRZ edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Moroccan MRZ / Passport Parser analyzes Morocco-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-bank-account-validator",
    "name": "Morocco Bank Account Validator",
    "code": "BANK",
    "summary": "Validate local bank-account or routing shape, split bank/account blocks, and keep ownership lookup outside the browser.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA BANK 11",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA BANK edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Morocco Bank Account Validator analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-bank-account-fixture-generator",
    "name": "Morocco Bank Account Fixture Generator",
    "code": "BGEN",
    "summary": "Generate local bank-account fixture payloads, split routing/account blocks, and prepare payment QA data.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "bankfixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA BGEN 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "001  1234 5678 90",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review MA BGEN edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BGEN local evidence",
        "text": "Morocco Bank Account Fixture Generator analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid BGEN examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized BGEN values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "morocco-bank-account-inspector",
    "name": "Moroccan Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and provider handoff boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA BANK 13",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA BANK edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Moroccan Domestic Bank Account Inspector analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-bic-swift-inspector",
    "name": "Moroccan BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Morocco banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDMA2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZCDMA2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCDM",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCDMA2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA BIC edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Moroccan BIC / SWIFT Inspector analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-domestic-transfer-helper",
    "name": "Moroccan Domestic Transfer Helper",
    "code": "PAY",
    "summary": "Check creditor, local bank-account, amount, remittance, and offline payment handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890\\n1,234.56 MAD\\nInvoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PAY 15",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234567890\\n1,234.56 M",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 001 1234567890\\n1,234.56 MAD\\nInvoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PAY edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Moroccan Domestic Transfer Helper analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-direct-debit-mandate-helper",
    "name": "Moroccan Direct Debit / Auto-Debit Mandate Helper",
    "code": "DD",
    "summary": "Inspect mandate references, creditor data, debtor account evidence, and browser-only debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA DD 16",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZNDATE-2026-001 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA DD edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DD local evidence",
        "text": "Moroccan Direct Debit / Auto-Debit Mandate Helper analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid DD examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized DD values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "morocco-payment-reference-helper",
    "name": "Moroccan bank transfer / payment reference Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "bank transfer / payment reference REF 2026-001 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PAY 17",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "bank transfer / payment reference",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA bank transfer / payment reference REF 2026-001 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PAY edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Moroccan bank transfer / payment reference Reference Helper analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-remittance-text-builder",
    "name": "Moroccan Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 MA123456789 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA REMIT 18",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 MA1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Invoice 2026-001 MA123456789 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA REMIT edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Moroccan Remittance Text Builder analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-payment-reconciliation-helper",
    "name": "Moroccan Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026; 1,234.56 MAD; 001 1234567890; Invoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA RECON 19",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/2026; 1,234.56 MAD; 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 24/07/2026; 1,234.56 MAD; 001 1234567890; Invoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA RECON edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Moroccan Payment Reconciliation Helper analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-bank-statement-parser",
    "name": "Moroccan Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, account/routing evidence, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026; 1,234.56 MAD; 001 1234567890; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA STMT 20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/2026; 1,234.56 MAD; 001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 24/07/2026; 1,234.56 MAD; 001 1234567890; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA STMT edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Moroccan Bank Statement Parser analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-masked-bank-account-formatter",
    "name": "Moroccan Masked Bank Account Formatter",
    "code": "MASK",
    "summary": "Create log-safe bank-account previews while preserving routing and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "bankmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA MASK 21",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA MASK edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Moroccan Masked Bank Account Formatter analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-currency-decimal-formatter",
    "name": "Moroccan MAD Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize MAD amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CUR 22",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1,234.5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CUR edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Moroccan MAD Decimal Currency Formatter analyzes Morocco-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-tax-rate-sanity-helper",
    "name": "Moroccan Tax Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect tax-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax number / VAT boundary 20% base 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA RATE 23",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax number / VAT boundary ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA tax number / VAT boundary 20% base 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA RATE edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Moroccan Tax Rate Sanity Helper analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-tax-return-field-helper",
    "name": "Moroccan Tax Return Field Helper",
    "code": "RET",
    "summary": "Map tax-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax number / VAT boundary; MA123456789; period 2026-07; 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA RET 24",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax number / VAT boundary; MA123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA tax number / VAT boundary; MA123456789; period 2026-07; 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA RET edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Moroccan Tax Return Field Helper analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-invoice-number-helper",
    "name": "Moroccan Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 MA123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA INV 25",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV-2026-0001 MA123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA INV edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Moroccan Invoice Number Helper analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-e-invoicing-readiness-checker",
    "name": "Moroccan tax invoice Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA EINV 26",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA EINV edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Moroccan tax invoice Readiness Checker analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-tax-authority-handoff-helper",
    "name": "Moroccan Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA123456789 24/07/2026 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA TAX 27",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA123456789 24/07/20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 24/07/2026 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA TAX edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Moroccan Tax Authority Handoff Helper analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-accounting-audit-trail-checklist-generator",
    "name": "Moroccan Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, tax, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 24/07/2026 1,234.56 MAD MA123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA AUDIT 28",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "invoice 24/07/2026 1,234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "invo ice  24/0 7/20 26 1 ,234 .56  MAD  MA12 3456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review MA AUDIT edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Moroccan Accounting Audit Trail Checklist Helper analyzes Morocco-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-postal-code-validator",
    "name": "Moroccan Postal Code Validator",
    "code": "POST",
    "summary": "Validate postal/address code shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000 Rabat",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA POST 29",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1000 R",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 1000 Rabat",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA POST edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Moroccan Postal Code Validator analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-address-normalizer",
    "name": "Moroccan Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA ADDR 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business dist",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA ADDR edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Moroccan Address Normalizer analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-address-transliteration-normalizer",
    "name": "Moroccan Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA ASCII 31",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business dist",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA ASCII edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Moroccan Address Transliteration Normalizer analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-region-code-mapper",
    "name": "Moroccan Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000 Rabat",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA REGION 32",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1000 R",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 1000 Rabat",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA REGION edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Moroccan Region / Province Code Mapper analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-municipality-code-inspector",
    "name": "Moroccan Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA MUNI 33",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business dist",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA MUNI edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Moroccan Municipality Code Inspector analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-phone-number-validator",
    "name": "Moroccan Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+212 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PHONE 34",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+212 123 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA +212 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PHONE edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Moroccan Phone Number Validator analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-phone-e164-formatter",
    "name": "Moroccan Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+212 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA E164 35",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+212 123 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA +212 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA E164 edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Moroccan Phone E.164 Formatter analyzes Morocco-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-date-locale-formatter",
    "name": "Moroccan Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA DATE 36",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 24/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA DATE edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Moroccan Date Locale Formatter analyzes Morocco-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-csv-locale-normalizer",
    "name": "Moroccan CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Morocco decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1,234.56 MAD;24/07/2026;MA123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CSV 37",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1,234.56 M",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA id;amount;date;tax\\n1;1,234.56 MAD;24/07/2026;MA123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CSV edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Moroccan CSV Locale Normalizer analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-slug-normalizer",
    "name": "Moroccan Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Morocco sample company Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA SLUG 38",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Morocco sample company Central bu",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Morocco sample company Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA SLUG edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Moroccan Slug Normalizer analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-document-ocr-fixer",
    "name": "Moroccan Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456 MA123456789 001 1234567890 1000 Rabat",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA OCR 39",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-123456 MA123456789 001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 MA123456789 001 1234567890 1000 Rabat",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA OCR edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Moroccan Document OCR Fixer analyzes Morocco-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-privacy-redaction-helper",
    "name": "Moroccan data protection / privacy boundary Redaction Helper",
    "code": "PRIV",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PRIV 40",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PRIV edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PRIV local evidence",
        "text": "Moroccan data protection / privacy boundary Redaction Helper analyzes Morocco-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid PRIV examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized PRIV values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "morocco-pii-masker",
    "name": "Moroccan PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456 +212 123 456 789 001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PII 41",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-123456 +212 123 456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 +212 123 456 789 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PII edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Moroccan PII Masker analyzes Morocco-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-personal-data-fixture-generator",
    "name": "Moroccan Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456\\nCentral business district, Rabat 1000\\n+212 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA FIX 42",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-123456\\nCentral business distric",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "MA-I D-12 3456 \\nCe ntra l bu sine ss d istr ict,  Rab at 1 000\\ n+21 2 12 3 45 6 78 9",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review MA FIX edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Moroccan Personal Data Fixture Helper analyzes Morocco-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-driving-licence-format-helper",
    "name": "Moroccan Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456 DL 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA DL 43",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 DL 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA DL edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Moroccan Driving Licence Format Helper analyzes Morocco-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-residence-permit-format-helper",
    "name": "Moroccan Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA PERMIT 2026 MA-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PERMIT 44",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA PERMIT 2026 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ PERMIT 2026 MA-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PERMIT edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Moroccan Residence Permit Format Helper analyzes Morocco-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-health-card-format-helper",
    "name": "Moroccan Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-ID-123456 HEALTH 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA HEALTH 45",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-ID-123456 H",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 HEALTH 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA HEALTH edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Moroccan Health Card Format Helper analyzes Morocco-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-vehicle-plate-inspector",
    "name": "Moroccan Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA 1235",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PLATE edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Moroccan Vehicle Plate Inspector analyzes Morocco-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-vin-validator",
    "name": "Moroccan VIN Validator",
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
        "value": "Review MA VIN edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Moroccan VIN Validator analyzes Morocco-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-vehicle-data-redaction-helper",
    "name": "Moroccan Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA 1234 WVWZZZ1JZXW000001 MA-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA VEH 48",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA 1234 WVWZZZ1JZXW00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ 1234 WVWZZZ1JZXW000001 MA-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA VEH edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Moroccan Vehicle Data Redaction Helper analyzes Morocco-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-customs-declaration-helper",
    "name": "Moroccan Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect importer code, tax, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA123456789 HS 8471 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CUSTOMS 49",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA123456789 HS 847",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 HS 8471 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CUSTOMS edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Moroccan Customs Declaration Helper analyzes Morocco-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-postal-tracking-helper",
    "name": "Moroccan Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 1000 Rabat",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA TRACK 50",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZACK 2026 1000 Rabat",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA TRACK edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Moroccan Postal Tracking Helper analyzes Morocco-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-data-quality-workbench",
    "name": "Moroccan Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA DQ 51",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA DQ edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Moroccan Data Quality Workbench analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-json-fixture-generator",
    "name": "Moroccan JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA JSON 52",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" MA\", \"tax Numb er\": \"MA1 2345 6789 \",\"p ayme ntRe fere nce\" :\"IN V-20 26-0 01\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review MA JSON edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Moroccan JSON Fixture Helper analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-regex-pack-helper",
    "name": "Moroccan Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, tax IDs, bank accounts, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "national ID boundary company registration number postal/address code  001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA REGEX 53",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "national ID boundary company registration numbe",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA national ID boundary company registration number postal/address code  001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA REGEX edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Moroccan Regex Pack Helper analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-api-payload-auditor",
    "name": "Moroccan API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, bank-account evidence, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA API 54",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA {\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA API edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Moroccan API Payload Auditor analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-form-field-auditor",
    "name": "Moroccan Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=MA123456789&postal=1000 Rabat&phone=+212 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA FORM 55",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax=MA123456789&postal=1000 Rab",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA tax=MA123456789&postal=1000 Rabat&phone=+212 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA FORM edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Moroccan Form Field Auditor analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-locale-number-parser",
    "name": "Moroccan Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Morocco.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA NUM 56",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1,234.5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA NUM edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Moroccan Locale Number Parser analyzes Morocco-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-calendar-week-helper",
    "name": "Moroccan Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026 week 30",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA CAL 57",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA 24/07/2026 week 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA CAL edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Moroccan Calendar Week Helper analyzes Morocco-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-company-suffix-normalizer",
    "name": "Moroccan Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Morocco Sample Holding Ltd MA-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Morocco Sample Holding Ltd MA-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Morocco Sample Holding",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Morocco Sample Holding Ltd MA-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA SUFFIX edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Moroccan Company Suffix Normalizer analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-procurement-identifier-helper",
    "name": "Moroccan Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MA-REG-123456 PO-2026-001 MA123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA PROC 59",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MA-REG-123456 PO-2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 PO-2026-001 MA123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA PROC edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Moroccan Procurement Identifier Helper analyzes Morocco-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-accessibility-locale-copy-checker",
    "name": "Moroccan Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "national ID boundary input, postal/address code input, amount 1,234.56 MAD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA COPY 60",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "national ID boundary input, postal/addres",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA national ID boundary input, postal/address code input, amount 1,234.56 MAD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA COPY edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Moroccan Locale Copy Checker analyzes Morocco-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-support-ticket-scrubber",
    "name": "Moroccan Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent MA-ID-123456, 001 1234567890, Central business district, Rabat 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA SUP 61",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Customer sent MA-ID-123456, 001 1234567890, C",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix MA Customer sent MA-ID-123456, 001 1234567890, Central business district, Rabat 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review MA SUP edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Moroccan Support Ticket Scrubber analyzes Morocco-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "morocco-integration-smoke-test-builder",
    "name": "Moroccan Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MA SMOKE 62",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" MA\", \"tax Numb er\": \"MA1 2345 6789 \",\"p ayme ntRe fere nce\" :\"IN V-20 26-0 01\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review MA SMOKE edge 62",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Morocco identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Moroccan Integration Smoke Test Builder analyzes Morocco-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Moroccan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"morocco","iso2":"MA","iso3":"MAR","isoNumeric":"504","name":"Morocco","adjective":"Moroccan","nativeName":"Al-Maghrib","flag":"🇲🇦","language":"Arabic and Tamazight","localLanguage":"ar-MA","currency":"MAD","currencyName":"Moroccan dirham","symbol":"MAD","locale":"ar-MA","icu":"ar_MA","date":"DD/MM/YYYY","decimal":"Dot (.)","thousands":"Space","phone":"+212","capital":"Rabat","continent":"Africa","region":"Northern Africa","population":"approximately 38M","identifiers":["National ID boundary","company registration number","tax number / VAT boundary","postal/address code","phone"],"payments":["bank account","domestic transfer reference","SWIFT/BIC","invoice reference","payment reconciliation"],"localTerms":{"personal":"national ID boundary","company":"company registration number","tax":"tax number / VAT boundary","social":"social security boundary","register":"business registry","invoice":"tax invoice","payment":"bank transfer / payment reference","plate":"vehicle plate","postal":"postal/address code","privacy":"data protection / privacy boundary"},"samples":{"personal":"MA-ID-123456","company":"MA-REG-123456","social":"MA-SOC-123456","iban":"MA00BANK000123456789","bank":"001 1234567890","phone":"+212 123 456 789","postal":"1000 Rabat","plate":"MA 1234","vat":"MA123456789","amount":"1,234.56 MAD","date":"24/07/2026","address":"Central business district, Rabat 1000","json":"{\"country\":\"MA\",\"taxNumber\":\"MA123456789\",\"paymentReference\":\"INV-2026-001\"}"},"theme":["#C1272D","#006233","#FFFFFF"],"marker":{"x":45,"y":55},"related":["ZA","NG","KE"],"plugTypes":"Type C / Type E","voltage":"220V","frequency":"50Hz","emergencyNumber":"19 / 15","searchHints":["NATIONAL ID","TAX","VAT","COMPANY","BANK","POSTAL"],"cities":["Casablanca","Fez","Tangier","Marrakesh"],"timeZone":"Africa/Casablanca"};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Morocco systems remain the source of truth.', localStructure: 'Moroccan local structure', addEvidence: 'Add Moroccan local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Morocco siguen siendo la fuente de verdad.', localStructure: 'estructura local de Morocco', addEvidence: 'Agrega evidencia local de Morocco o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Morocco continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Morocco', addEvidence: 'Adicione evidencia local de Morocco ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Morocco bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Morocco', addEvidence: 'Fuege lokale Moroccan Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Morocco restent la source de verite.', localStructure: 'structure locale de Morocco', addEvidence: 'Ajoutez une preuve locale de Morocco ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Morocco pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Morocco', addEvidence: 'Dodaj lokalne dane kraju Morocco albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Morocco systems remain the source of truth.', localStructure: 'Moroccan local structure', addEvidence: 'Add Moroccan local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:MA)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/MA\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/MA[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:MAD|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
    else if (['csv','json','api','dataquality','form','companyonboarding','register','einvoice','taxhandoff','taxreturn','audittrail','procurement','smoketest'].includes(tool.kind)) { normalized = raw.replace(/\s+/g, ' ').trim(); ok = raw.length > 10 || ev.json; result.breakdown.push(field('identifier evidence', ev.personal || ev.company || 'not detected', COUNTRY.localTerms.personal + ' / ' + COUNTRY.localTerms.company), field('tax evidence', ev.vat || 'not detected', COUNTRY.localTerms.tax), field('banking evidence', ev.iban || 'not detected', 'bank account/payment slice'), field('locale evidence', [ev.date, ev.amount, ev.postal].filter(Boolean).join(' / ') || 'not detected', 'date/amount/postal slices')); }
    else if (['privacy','fixture','ocr','document'].includes(tool.kind)) { normalized = raw.replace(/[A-Z0-9][A-Z0-9 .\/-]{6,24}/g, (v) => mask(v)); ok = raw.length > 5; result.breakdown.push(field('personal evidence', ev.personal, COUNTRY.localTerms.personal), field('company/tax evidence', ev.company || ev.vat, COUNTRY.localTerms.company), field('banking evidence', ev.iban, 'banking slice'), field('masked preview', normalized, 'safe for logs')); }
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '#C1272D', accent2: '#006233', accent3: '#FFFFFF' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
