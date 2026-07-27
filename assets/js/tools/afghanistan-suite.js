(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.afghanistan-suite';
  const RAW_TOOLS = [
  {
    "id": "afghanistan-tazkira-boundary-validator",
    "name": "Afghan Tazkira boundary Validator",
    "code": "ID",
    "summary": "Validate Tazkira boundary shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1234-567891",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-56",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF ID edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Afghan Tazkira boundary Validator analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-company-registration-number-validator",
    "name": "Afghan company registration number Validator",
    "code": "ORG",
    "summary": "Inspect company registration number structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AF-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "AF-12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF ORG edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Afghan company registration number Validator analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-tax-id-validator",
    "name": "Afghan TIN Validator",
    "code": "TAX",
    "summary": "Normalize TIN identifiers, inspect local tax body evidence, and prepare authority handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TIN123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZN123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TIN1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZN123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF TAX edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Afghan TIN Validator analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-customs-importer-code-helper",
    "name": "Afghan Customs / Importer Code Helper",
    "code": "CUS",
    "summary": "Inspect customs identifiers, importer references, tax bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AFAF-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CUS 4",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "AFAF-12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZAF-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CUS edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Afghan Customs / Importer Code Helper analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-social-protection-boundary-social-insurance-helper",
    "name": "Afghan social protection boundary Helper",
    "code": "SOC",
    "summary": "Split social protection boundary evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SP-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SP-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SP-12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF SOC edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Afghan social protection boundary Helper analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-company-onboarding-auditor",
    "name": "Afghan Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for company registration number, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-002\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF KYC edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Afghan Company Onboarding Auditor analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-business-register-readiness-helper",
    "name": "Afghan ACBR / business registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated ACBR / business registry lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AF-123456 TIN123456789 Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF-123456 TIN123456789 Shahr-e Naw 1, Kabul 1002",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "AF-123456 TIN123456789 Shah",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-123456 TIN123456789 Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF REG edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Afghan ACBR / business registry Readiness Helper analyzes Afghanistan-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-id-card-format-helper",
    "name": "Afghan ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CARD 8",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-56",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CARD edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Afghan ID Card Format Helper analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-passport-number-helper",
    "name": "Afghan Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<AFGAFGHAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PASS 9",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<AFGAFGHAN<<SAMPLE<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF P<AFGAFGHAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PASS edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Afghan Passport Number Helper analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-mrz-passport-parser",
    "name": "Afghan MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<AFGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567AFG8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF MRZ 10",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<AFGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF P<AFGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567AFG8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF MRZ edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Afghan MRZ / Passport Parser analyzes Afghanistan-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-bank-account-validator",
    "name": "Afghanistan Bank Account Validator",
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
        "value": "Invalid AF BANK 11",
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
        "value": "Wrong prefix AF 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF BANK edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Afghanistan Bank Account Validator analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-bank-account-fixture-generator",
    "name": "Afghanistan Bank Account Fixture Generator",
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
        "value": "Invalid AF BGEN 12",
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
        "value": "Review AF BGEN edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BGEN local evidence",
        "text": "Afghanistan Bank Account Fixture Generator analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-bank-account-inspector",
    "name": "Afghan Domestic Bank Account Inspector",
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
        "value": "Invalid AF BANK 13",
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
        "value": "Wrong prefix AF 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF BANK edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Afghan Domestic Bank Account Inspector analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-bic-swift-inspector",
    "name": "Afghan BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Afghanistan banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDAF2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZCDAF2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCDA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCDAF2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF BIC edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Afghan BIC / SWIFT Inspector analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-domestic-transfer-helper",
    "name": "Afghan Domestic Transfer Helper",
    "code": "PAY",
    "summary": "Check creditor, local bank-account, amount, remittance, and offline payment handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890\\n1,234.56 AFN\\nInvoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PAY 15",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234567890\\n1,234.56 A",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 001 1234567890\\n1,234.56 AFN\\nInvoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PAY edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Afghan Domestic Transfer Helper analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-direct-debit-mandate-helper",
    "name": "Afghan Direct Debit / Auto-Debit Mandate Helper",
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
        "value": "Invalid AF DD 16",
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
        "value": "Review AF DD edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DD local evidence",
        "text": "Afghan Direct Debit / Auto-Debit Mandate Helper analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-payment-reference-helper",
    "name": "Afghan APS / bank transfer reference Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "APS / bank transfer reference REF 2026-001 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PAY 17",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "APS / bank transfer reference R",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZS / bank transfer reference REF 2026-001 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PAY edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Afghan APS / bank transfer reference Reference Helper analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-remittance-text-builder",
    "name": "Afghan Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 TIN123456789 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF REMIT 18",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 TIN1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Invoice 2026-001 TIN123456789 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF REMIT edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Afghan Remittance Text Builder analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-payment-reconciliation-helper",
    "name": "Afghan Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026/07/21; 1,234.56 AFN; 001 1234567890; Invoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF RECON 19",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "2026/07/21; 1,234.56 AFN; 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 2026/07/21; 1,234.56 AFN; 001 1234567890; Invoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF RECON edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Afghan Payment Reconciliation Helper analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-bank-statement-parser",
    "name": "Afghan Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, account/routing evidence, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026/07/21; 1,234.56 AFN; 001 1234567890; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF STMT 20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "2026/07/21; 1,234.56 AFN; 001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 2026/07/21; 1,234.56 AFN; 001 1234567890; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF STMT edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Afghan Bank Statement Parser analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-masked-bank-account-formatter",
    "name": "Afghan Masked Bank Account Formatter",
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
        "value": "Invalid AF MASK 21",
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
        "value": "Wrong prefix AF 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF MASK edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Afghan Masked Bank Account Formatter analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-currency-decimal-formatter",
    "name": "Afghan AFN Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize AFN amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CUR 22",
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
        "value": "Wrong prefix AF 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CUR edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Afghan AFN Decimal Currency Formatter analyzes Afghanistan-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-tax-rate-sanity-helper",
    "name": "Afghan Tax Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect tax-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TIN 20% base 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF RATE 23",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TIN 20% base 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZN 20% base 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF RATE edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Afghan Tax Rate Sanity Helper analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-tax-return-field-helper",
    "name": "Afghan Tax Return Field Helper",
    "code": "RET",
    "summary": "Map tax-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TIN; TIN123456789; period 2026-07; 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF RET 24",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TIN; TIN123456789; period ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZN; TIN123456789; period 2026-07; 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF RET edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Afghan Tax Return Field Helper analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-invoice-number-helper",
    "name": "Afghan Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 TIN123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF INV 25",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 T",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZV-2026-0001 TIN123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF INV edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Afghan Invoice Number Helper analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-e-invoicing-readiness-checker",
    "name": "Afghan tax invoice Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF EINV 26",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF EINV edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Afghan tax invoice Readiness Checker analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-tax-authority-handoff-helper",
    "name": "Afghan Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TIN123456789 2026/07/21 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF TAX 27",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TIN123456789 2026/07",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZN123456789 2026/07/21 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF TAX edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Afghan Tax Authority Handoff Helper analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-accounting-audit-trail-checklist-generator",
    "name": "Afghan Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, tax, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 2026/07/21 1,234.56 AFN TIN123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF AUDIT 28",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "invoice 2026/07/21 1,234.",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "invo ice  2026 /07/ 21 1 ,234 .56  AFN  TIN1 2345 6789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review AF AUDIT edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Afghan Accounting Audit Trail Checklist Helper analyzes Afghanistan-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-postal-code-validator",
    "name": "Afghan Postal Code Validator",
    "code": "POST",
    "summary": "Validate postal code shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1001 Kabul",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF POST 29",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1001 K",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1001 Kabul",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF POST edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Afghan Postal Code Validator analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-address-normalizer",
    "name": "Afghan Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF ADDR 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Shahr-e Naw 1,",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF ADDR edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Afghan Address Normalizer analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-address-transliteration-normalizer",
    "name": "Afghan Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF ASCII 31",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Shahr-e Naw 1,",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF ASCII edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Afghan Address Transliteration Normalizer analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-region-code-mapper",
    "name": "Afghan Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1001 Kabul",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF REGION 32",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1001 K",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1001 Kabul",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF REGION edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Afghan Region / Province Code Mapper analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-municipality-code-inspector",
    "name": "Afghan Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF MUNI 33",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Shahr-e Naw 1,",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF MUNI edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Afghan Municipality Code Inspector analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-phone-number-validator",
    "name": "Afghan Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+93 70 123 4567",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PHONE 34",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+93 70 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF +93 70 123 4567",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PHONE edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Afghan Phone Number Validator analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-phone-e164-formatter",
    "name": "Afghan Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+93 70 123 4567",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF E164 35",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+93 70 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF +93 70 123 4567",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF E164 edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Afghan Phone E.164 Formatter analyzes Afghanistan-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-date-locale-formatter",
    "name": "Afghan Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026/07/21",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF DATE 36",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "2026/0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 2026/07/21",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF DATE edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Afghan Date Locale Formatter analyzes Afghanistan-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-csv-locale-normalizer",
    "name": "Afghan CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Afghanistan decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1,234.56 AFN;2026/07/21;TIN123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CSV 37",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1,234.56 A",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF id;amount;date;tax\\n1;1,234.56 AFN;2026/07/21;TIN123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CSV edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Afghan CSV Locale Normalizer analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-slug-normalizer",
    "name": "Afghan Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Afghanistan sample company Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF SLUG 38",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Afghanistan sample company Sh",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Afghanistan sample company Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF SLUG edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Afghan Slug Normalizer analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-document-ocr-fixer",
    "name": "Afghan Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890 TIN123456789 001 1234567890 1001 Kabul",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF OCR 39",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-567890 TIN123456789 001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890 TIN123456789 001 1234567890 1001 Kabul",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF OCR edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Afghan Document OCR Fixer analyzes Afghanistan-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-privacy-redaction-helper",
    "name": "Afghan personal-data privacy boundary Redaction Helper",
    "code": "PRIV",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PRIV 40",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PRIV edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PRIV local evidence",
        "text": "Afghan personal-data privacy boundary Redaction Helper analyzes Afghanistan-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-pii-masker",
    "name": "Afghan PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890 +93 70 123 4567 001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PII 41",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-567890 +93 70 123 4",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890 +93 70 123 4567 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PII edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Afghan PII Masker analyzes Afghanistan-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-personal-data-fixture-generator",
    "name": "Afghan Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890\\nShahr-e Naw 1, Kabul 1001\\n+93 70 123 4567",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF FIX 42",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-567890\\nShahr-e Naw 1, Kab",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "1234 -567 890\\ nSha hr-e  Naw  1,  Kabu l 10 01\\n +93  70 1 23 4 567",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review AF FIX edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Afghan Personal Data Fixture Helper analyzes Afghanistan-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-driving-licence-format-helper",
    "name": "Afghan Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890 DL 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF DL 43",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890 DL 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF DL edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Afghan Driving Licence Format Helper analyzes Afghanistan-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-residence-permit-format-helper",
    "name": "Afghan Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AF PERMIT 2026 1234-567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PERMIT 44",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "AF PERMIT 2026 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ PERMIT 2026 1234-567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PERMIT edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Afghan Residence Permit Format Helper analyzes Afghanistan-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-health-card-format-helper",
    "name": "Afghan Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234-567890 HEALTH 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF HEALTH 45",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1234-567890 H",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 1234-567890 HEALTH 2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF HEALTH edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Afghan Health Card Format Helper analyzes Afghanistan-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-vehicle-plate-inspector",
    "name": "Afghan Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "KBL 12345",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid KBL 12346",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "KBL 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZL 12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PLATE edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Afghan Vehicle Plate Inspector analyzes Afghanistan-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-vin-validator",
    "name": "Afghan VIN Validator",
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
        "value": "Review AF VIN edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Afghan VIN Validator analyzes Afghanistan-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-vehicle-data-redaction-helper",
    "name": "Afghan Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "KBL 12345 WVWZZZ1JZXW000001 1234-567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF VEH 48",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "KBL 12345 WVWZZZ1JZXW0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZL 12345 WVWZZZ1JZXW000001 1234-567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF VEH edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Afghan Vehicle Data Redaction Helper analyzes Afghanistan-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-customs-declaration-helper",
    "name": "Afghan Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect importer code, tax, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TIN123456789 HS 8471 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CUSTOMS 49",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TIN123456789 HS 847",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZN123456789 HS 8471 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CUSTOMS edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Afghan Customs Declaration Helper analyzes Afghanistan-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-postal-tracking-helper",
    "name": "Afghan Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 1001 Kabul",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF TRACK 50",
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
        "value": "Wrong prefix ZZACK 2026 1001 Kabul",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF TRACK edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Afghan Postal Tracking Helper analyzes Afghanistan-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-data-quality-workbench",
    "name": "Afghan Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF DQ 51",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF DQ edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Afghan Data Quality Workbench analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-json-fixture-generator",
    "name": "Afghan JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF JSON 52",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" AF\", \"tin \":\"T IN12 3456 789\" ,\"ba nk\": \"001 1234 5678 90\", \"pay ment \":\"I NV-2 026- 001\" }",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review AF JSON edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Afghan JSON Fixture Helper analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-regex-pack-helper",
    "name": "Afghan Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, tax IDs, bank accounts, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Tazkira boundary company registration number postal code  001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF REGEX 53",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Tazkira boundary company registration nu",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Tazkira boundary company registration number postal code  001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF REGEX edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Afghan Regex Pack Helper analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-api-payload-auditor",
    "name": "Afghan API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, bank-account evidence, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF API 54",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF {\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF API edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Afghan API Payload Auditor analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-form-field-auditor",
    "name": "Afghan Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=TIN123456789&postal=1001 Kabul&phone=+93 70 123 4567",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF FORM 55",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax=TIN123456789&postal=1001 Ka",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF tax=TIN123456789&postal=1001 Kabul&phone=+93 70 123 4567",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF FORM edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Afghan Form Field Auditor analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-locale-number-parser",
    "name": "Afghan Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Afghanistan.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF NUM 56",
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
        "value": "Wrong prefix AF 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF NUM edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Afghan Locale Number Parser analyzes Afghanistan-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-calendar-week-helper",
    "name": "Afghan Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "2026/07/21 week 30",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF CAL 57",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "2026/07/21",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF 2026/07/21 week 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF CAL edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Afghan Calendar Week Helper analyzes Afghanistan-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-company-suffix-normalizer",
    "name": "Afghan Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Afghanistan Sample Holding Ltd AF-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Afghanistan Sample Holding Ltd AF-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Afghanistan Sample Hol",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Afghanistan Sample Holding Ltd AF-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF SUFFIX edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Afghan Company Suffix Normalizer analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-procurement-identifier-helper",
    "name": "Afghan Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AF-123456 PO-2026-001 TIN123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF PROC 59",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "AF-123456 PO-2026-0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-123456 PO-2026-001 TIN123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF PROC edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Afghan Procurement Identifier Helper analyzes Afghanistan-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-accessibility-locale-copy-checker",
    "name": "Afghan Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Tazkira boundary input, postal code input, amount 1,234.56 AFN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF COPY 60",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Tazkira boundary input, postal code",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Tazkira boundary input, postal code input, amount 1,234.56 AFN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF COPY edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Afghan Locale Copy Checker analyzes Afghanistan-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-support-ticket-scrubber",
    "name": "Afghan Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 1234-567890, 001 1234567890, Shahr-e Naw 1, Kabul 1001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF SUP 61",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Customer sent 1234-567890, 001 1234567",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix AF Customer sent 1234-567890, 001 1234567890, Shahr-e Naw 1, Kabul 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review AF SUP edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Afghan Support Ticket Scrubber analyzes Afghanistan-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "afghanistan-integration-smoke-test-builder",
    "name": "Afghan Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid AF SMOKE 62",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" AF\", \"tin \":\"T IN12 3456 789\" ,\"ba nk\": \"001 1234 5678 90\", \"pay ment \":\"I NV-2 026- 001\" }",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review AF SMOKE edge 62",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Afghanistan identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Afghan Integration Smoke Test Builder analyzes Afghanistan-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Afghan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"afghanistan","iso2":"AF","iso3":"AFG","isoNumeric":"004","name":"Afghanistan","adjective":"Afghan","nativeName":"Afghanistan","flag":"🇦🇫","language":"Dari and Pashto","localLanguage":"fa-AF","currency":"AFN","currencyName":"Afghan afghani","symbol":"AFN","locale":"fa-AF","icu":"fa_AF","date":"YYYY/MM/DD","decimal":"Dot (.)","thousands":"Comma (,)","phone":"+93","capital":"Kabul","continent":"Asia","region":"South Asia / Central Asia","population":"approximately 43M","identifiers":["Tazkira boundary","TIN","company registration number","postal code","phone"],"payments":["bank account","APS handoff","SWIFT","hawala reference boundary","invoice reference"],"localTerms":{"personal":"Tazkira boundary","company":"company registration number","tax":"TIN","social":"social protection boundary","register":"ACBR / business registry","invoice":"tax invoice","payment":"APS / bank transfer reference","plate":"vehicle plate","postal":"postal code","privacy":"personal-data privacy boundary"},"samples":{"personal":"1234-567890","company":"AF-123456","social":"SP-123456","iban":"AF BANK 001 1234567890","bank":"001 1234567890","phone":"+93 70 123 4567","postal":"1001 Kabul","plate":"KBL 12345","vat":"TIN123456789","amount":"1,234.56 AFN","date":"2026/07/21","address":"Shahr-e Naw 1, Kabul 1001","json":"{\"country\":\"AF\",\"tin\":\"TIN123456789\",\"bank\":\"0011234567890\",\"payment\":\"INV-2026-001\"}"},"theme":["#000000","#D32011","#007A36"],"marker":{"x":61,"y":51},"related":["PK","IR","TJ"],"plugTypes":"Type C / Type F","voltage":"220V","frequency":"50Hz","emergencyNumber":"119 / 102","searchHints":["TAZKIRA","TIN","ACBR","APS","BANK","POSTAL"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Afghanistan systems remain the source of truth.', localStructure: 'Afghan local structure', addEvidence: 'Add Afghan local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Afghanistan siguen siendo la fuente de verdad.', localStructure: 'estructura local de Afghanistan', addEvidence: 'Agrega evidencia local de Afghanistan o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Afghanistan continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Afghanistan', addEvidence: 'Adicione evidencia local de Afghanistan ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Afghanistan bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Afghanistan', addEvidence: 'Fuege lokale Afghan Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Afghanistan restent la source de verite.', localStructure: 'structure locale de Afghanistan', addEvidence: 'Ajoutez une preuve locale de Afghanistan ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Afghanistan pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Afghanistan', addEvidence: 'Dodaj lokalne dane kraju Afghanistan albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Afghanistan systems remain the source of truth.', localStructure: 'Afghan local structure', addEvidence: 'Add Afghan local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:AF)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/AF\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/AF[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:AFN|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '#000000', accent2: '#D32011', accent3: '#007A36' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
