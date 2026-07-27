(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.palau-suite';
  const RAW_TOOLS = [
  {
    "id": "palau-national-id-boundary-validator",
    "name": "Palauan national ID boundary Validator",
    "code": "ID",
    "summary": "Validate national ID boundary shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW-ID-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-1",
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
        "value": "Review PW ID edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Palauan national ID boundary Validator analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-business-registration-number-validator",
    "name": "Palauan business registration number Validator",
    "code": "ORG",
    "summary": "Inspect business registration number structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-REG-1",
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
        "value": "Review PW ORG edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Palauan business registration number Validator analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-tax-id-validator",
    "name": "Palauan tax boundary Validator",
    "code": "TAX",
    "summary": "Normalize tax boundary identifiers, inspect local tax body evidence, and prepare authority handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW123456789",
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
        "value": "PW12345",
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
        "value": "Review PW TAX edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Palauan tax boundary Validator analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-customs-importer-code-helper",
    "name": "Palauan Customs / Importer Code Helper",
    "code": "CUS",
    "summary": "Inspect customs identifiers, importer references, tax bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PWPW-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CUS 4",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PWPW-REG-",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZPW-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW CUS edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Palauan Customs / Importer Code Helper analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-social-security-boundary-social-insurance-helper",
    "name": "Palauan social security boundary Helper",
    "code": "SOC",
    "summary": "Split social security boundary evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-SOC-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW-SOC-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-SOC-1",
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
        "value": "Review PW SOC edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Palauan social security boundary Helper analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-company-onboarding-auditor",
    "name": "Palauan Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for business registration number, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"PW\",\"taxNumber\":\"PW123456780\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW {\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW KYC edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Palauan Company Onboarding Auditor analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-business-register-readiness-helper",
    "name": "Palauan business registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated business registry lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-REG-123456 PW123456789 Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW-REG-123456 PW123456780 Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-REG-123456 PW123456789 Nge",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 PW123456789 Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW REG edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Palauan business registry Readiness Helper analyzes Palau-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-id-card-format-helper",
    "name": "Palauan ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CARD 8",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-1",
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
        "value": "Review PW CARD edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Palauan ID Card Format Helper analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-passport-number-helper",
    "name": "Palauan Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<PLWPALAUAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PASS 9",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<PLWPALAUAN<<SAMPLE<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW P<PLWPALAUAN<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PASS edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Palauan Passport Number Helper analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-mrz-passport-parser",
    "name": "Palauan MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<PLWSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567PLW8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW MRZ 10",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<PLWSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW P<PLWSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567PLW8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW MRZ edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Palauan MRZ / Passport Parser analyzes Palau-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-bank-account-validator",
    "name": "Palau Bank Account Validator",
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
        "value": "Invalid PW BANK 11",
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
        "value": "Wrong prefix PW 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW BANK edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Palau Bank Account Validator analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-bank-account-fixture-generator",
    "name": "Palau Bank Account Fixture Generator",
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
        "value": "Invalid PW BGEN 12",
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
        "value": "Review PW BGEN edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BGEN local evidence",
        "text": "Palau Bank Account Fixture Generator analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-bank-account-inspector",
    "name": "Palauan Domestic Bank Account Inspector",
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
        "value": "Invalid PW BANK 13",
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
        "value": "Wrong prefix PW 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW BANK edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Palauan Domestic Bank Account Inspector analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-bic-swift-inspector",
    "name": "Palauan BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Palau banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDPW2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZCDPW2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCDP",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCDPW2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW BIC edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Palauan BIC / SWIFT Inspector analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-domestic-transfer-helper",
    "name": "Palauan Domestic Transfer Helper",
    "code": "PAY",
    "summary": "Check creditor, local bank-account, amount, remittance, and offline payment handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890\\n1,234.56 USD\\nInvoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PAY 15",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234567890\\n1,234.56 U",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW 001 1234567890\\n1,234.56 USD\\nInvoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PAY edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Palauan Domestic Transfer Helper analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-direct-debit-mandate-helper",
    "name": "Palauan Direct Debit / Auto-Debit Mandate Helper",
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
        "value": "Invalid PW DD 16",
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
        "value": "Review PW DD edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DD local evidence",
        "text": "Palauan Direct Debit / Auto-Debit Mandate Helper analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-payment-reference-helper",
    "name": "Palauan wire/payment reference Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "wire/payment reference REF 2026-001 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PAY 17",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "wire/payment reference REF ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW wire/payment reference REF 2026-001 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PAY edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Palauan wire/payment reference Reference Helper analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-remittance-text-builder",
    "name": "Palauan Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 PW123456789 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW REMIT 18",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 PW1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Invoice 2026-001 PW123456789 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW REMIT edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Palauan Remittance Text Builder analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-payment-reconciliation-helper",
    "name": "Palauan Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "07/24/2026; 1,234.56 USD; 001 1234567890; Invoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW RECON 19",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "07/24/2026; 1,234.56 USD; 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW 07/24/2026; 1,234.56 USD; 001 1234567890; Invoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW RECON edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Palauan Payment Reconciliation Helper analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-bank-statement-parser",
    "name": "Palauan Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, account/routing evidence, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "07/24/2026; 1,234.56 USD; 001 1234567890; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW STMT 20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "07/24/2026; 1,234.56 USD; 001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW 07/24/2026; 1,234.56 USD; 001 1234567890; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW STMT edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Palauan Bank Statement Parser analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-masked-bank-account-formatter",
    "name": "Palauan Masked Bank Account Formatter",
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
        "value": "Invalid PW MASK 21",
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
        "value": "Wrong prefix PW 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW MASK edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Palauan Masked Bank Account Formatter analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-currency-decimal-formatter",
    "name": "Palauan USD Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize USD amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CUR 22",
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
        "value": "Wrong prefix PW 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW CUR edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Palauan USD Decimal Currency Formatter analyzes Palau-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-tax-rate-sanity-helper",
    "name": "Palauan Tax Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect tax-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax boundary 20% base 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW RATE 23",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax boundary 20% ba",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW tax boundary 20% base 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW RATE edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Palauan Tax Rate Sanity Helper analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-tax-return-field-helper",
    "name": "Palauan Tax Return Field Helper",
    "code": "RET",
    "summary": "Map tax-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax boundary; PW123456789; period 2026-07; 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW RET 24",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax boundary; PW123456789; peri",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW tax boundary; PW123456789; period 2026-07; 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW RET edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Palauan Tax Return Field Helper analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-invoice-number-helper",
    "name": "Palauan Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 PW123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW INV 25",
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
        "value": "Wrong prefix ZZV-2026-0001 PW123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW INV edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Palauan Invoice Number Helper analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-e-invoicing-readiness-checker",
    "name": "Palauan invoice Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW EINV 26",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW {\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW EINV edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Palauan invoice Readiness Checker analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-tax-authority-handoff-helper",
    "name": "Palauan Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW123456789 07/24/2026 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW TAX 27",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW123456789 07/24/20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 07/24/2026 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW TAX edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Palauan Tax Authority Handoff Helper analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-accounting-audit-trail-checklist-generator",
    "name": "Palauan Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, tax, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 07/24/2026 1,234.56 USD PW123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW AUDIT 28",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "invoice 07/24/2026 1,234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "invo ice  07/2 4/20 26 1 ,234 .56  USD  PW12 3456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review PW AUDIT edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Palauan Accounting Audit Trail Checklist Helper analyzes Palau-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-postal-code-validator",
    "name": "Palauan Postal Code Validator",
    "code": "POST",
    "summary": "Validate state/locality shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ngerulmud, Melekeok",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW POST 29",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Ngerulmud, ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Ngerulmud, Melekeok",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW POST edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Palauan Postal Code Validator analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-address-normalizer",
    "name": "Palauan Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW ADDR 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Ngerulmud, Mel",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW ADDR edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Palauan Address Normalizer analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-address-transliteration-normalizer",
    "name": "Palauan Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW ASCII 31",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Ngerulmud, Mel",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW ASCII edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Palauan Address Transliteration Normalizer analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-region-code-mapper",
    "name": "Palauan Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ngerulmud, Melekeok",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW REGION 32",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Ngerulmud, ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Ngerulmud, Melekeok",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW REGION edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Palauan Region / Province Code Mapper analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-municipality-code-inspector",
    "name": "Palauan Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW MUNI 33",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Ngerulmud, Mel",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW MUNI edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Palauan Municipality Code Inspector analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-phone-number-validator",
    "name": "Palauan Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+680 488 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PHONE 34",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+680 488",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW +680 488 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PHONE edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Palauan Phone Number Validator analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-phone-e164-formatter",
    "name": "Palauan Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+680 488 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW E164 35",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+680 488",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW +680 488 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW E164 edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Palauan Phone E.164 Formatter analyzes Palau-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-date-locale-formatter",
    "name": "Palauan Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "07/24/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW DATE 36",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "07/24/",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW 07/24/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW DATE edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Palauan Date Locale Formatter analyzes Palau-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-csv-locale-normalizer",
    "name": "Palauan CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Palau decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1,234.56 USD;07/24/2026;PW123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CSV 37",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1,234.56 U",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW id;amount;date;tax\\n1;1,234.56 USD;07/24/2026;PW123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW CSV edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Palauan CSV Locale Normalizer analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-slug-normalizer",
    "name": "Palauan Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Palau sample company Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW SLUG 38",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Palau sample company Ngeru",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Palau sample company Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW SLUG edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Palauan Slug Normalizer analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-document-ocr-fixer",
    "name": "Palauan Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456 PW123456789 001 1234567890 Ngerulmud, Melekeok",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW OCR 39",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-123456 PW123456789 001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 PW123456789 001 1234567890 Ngerulmud, Melekeok",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW OCR edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Palauan Document OCR Fixer analyzes Palau-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-privacy-redaction-helper",
    "name": "Palauan privacy boundary Redaction Helper",
    "code": "PRIV",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PRIV 40",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW {\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PRIV edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PRIV local evidence",
        "text": "Palauan privacy boundary Redaction Helper analyzes Palau-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-pii-masker",
    "name": "Palauan PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456 +680 488 1234 001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PII 41",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-123456 +680 488 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 +680 488 1234 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PII edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Palauan PII Masker analyzes Palau-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-personal-data-fixture-generator",
    "name": "Palauan Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456\\nNgerulmud, Melekeok State\\n+680 488 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW FIX 42",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-123456\\nNgerulmud, Melek",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "PW-I D-12 3456 \\nNg erul mud,  Mel ekeo k St ate\\ n+68 0 48 8 12 34",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review PW FIX edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Palauan Personal Data Fixture Helper analyzes Palau-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-driving-licence-format-helper",
    "name": "Palauan Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456 DL 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW DL 43",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-12345",
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
        "value": "Review PW DL edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Palauan Driving Licence Format Helper analyzes Palau-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-residence-permit-format-helper",
    "name": "Palauan Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW PERMIT 2026 PW-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PERMIT 44",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW PERMIT 2026 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ PERMIT 2026 PW-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PERMIT edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Palauan Residence Permit Format Helper analyzes Palau-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-health-card-format-helper",
    "name": "Palauan Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-ID-123456 HEALTH 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW HEALTH 45",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-ID-123456 H",
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
        "value": "Review PW HEALTH edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Palauan Health Card Format Helper analyzes Palau-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-vehicle-plate-inspector",
    "name": "Palauan Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW 1235",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW 1",
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
        "value": "Review PW PLATE edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Palauan Vehicle Plate Inspector analyzes Palau-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-vin-validator",
    "name": "Palauan VIN Validator",
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
        "value": "Review PW VIN edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Palauan VIN Validator analyzes Palau-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-vehicle-data-redaction-helper",
    "name": "Palauan Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW 1234 WVWZZZ1JZXW000001 PW-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW VEH 48",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW 1234 WVWZZZ1JZXW00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ 1234 WVWZZZ1JZXW000001 PW-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW VEH edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Palauan Vehicle Data Redaction Helper analyzes Palau-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-customs-declaration-helper",
    "name": "Palauan Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect importer code, tax, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW123456789 HS 8471 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CUSTOMS 49",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW123456789 HS 847",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 HS 8471 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW CUSTOMS edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Palauan Customs Declaration Helper analyzes Palau-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-postal-tracking-helper",
    "name": "Palauan Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 Ngerulmud, Melekeok",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW TRACK 50",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 Ngerul",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZACK 2026 Ngerulmud, Melekeok",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW TRACK edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Palauan Postal Tracking Helper analyzes Palau-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-data-quality-workbench",
    "name": "Palauan Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW DQ 51",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW {\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW DQ edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Palauan Data Quality Workbench analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-json-fixture-generator",
    "name": "Palauan JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW JSON 52",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" PW\", \"tax Numb er\": \"PW1 2345 6789 \"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review PW JSON edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Palauan JSON Fixture Helper analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-regex-pack-helper",
    "name": "Palauan Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, tax IDs, bank accounts, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "national ID boundary business registration number state/locality  001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW REGEX 53",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "national ID boundary business registration n",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW national ID boundary business registration number state/locality  001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW REGEX edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Palauan Regex Pack Helper analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-api-payload-auditor",
    "name": "Palauan API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, bank-account evidence, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW API 54",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW {\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW API edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Palauan API Payload Auditor analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-form-field-auditor",
    "name": "Palauan Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=PW123456789&postal=Ngerulmud, Melekeok&phone=+680 488 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW FORM 55",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax=PW123456789&postal=Ngerulmud, M",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW tax=PW123456789&postal=Ngerulmud, Melekeok&phone=+680 488 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW FORM edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Palauan Form Field Auditor analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-locale-number-parser",
    "name": "Palauan Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Palau.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW NUM 56",
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
        "value": "Wrong prefix PW 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW NUM edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Palauan Locale Number Parser analyzes Palau-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-calendar-week-helper",
    "name": "Palauan Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "07/24/2026 week 30",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW CAL 57",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "07/24/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW 07/24/2026 week 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW CAL edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Palauan Calendar Week Helper analyzes Palau-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-company-suffix-normalizer",
    "name": "Palauan Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Palau Sample Holding Ltd PW-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Palau Sample Holding Ltd PW-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Palau Sample Holding ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Palau Sample Holding Ltd PW-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW SUFFIX edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Palauan Company Suffix Normalizer analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-procurement-identifier-helper",
    "name": "Palauan Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PW-REG-123456 PO-2026-001 PW123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW PROC 59",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "PW-REG-123456 PO-2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 PO-2026-001 PW123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW PROC edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Palauan Procurement Identifier Helper analyzes Palau-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-accessibility-locale-copy-checker",
    "name": "Palauan Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "national ID boundary input, state/locality input, amount 1,234.56 USD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW COPY 60",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "national ID boundary input, state/loca",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW national ID boundary input, state/locality input, amount 1,234.56 USD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW COPY edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Palauan Locale Copy Checker analyzes Palau-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-support-ticket-scrubber",
    "name": "Palauan Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent PW-ID-123456, 001 1234567890, Ngerulmud, Melekeok State",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW SUP 61",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Customer sent PW-ID-123456, 001 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PW Customer sent PW-ID-123456, 001 1234567890, Ngerulmud, Melekeok State",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review PW SUP edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Palauan Support Ticket Scrubber analyzes Palau-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "palau-integration-smoke-test-builder",
    "name": "Palauan Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PW SMOKE 62",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PW\",\"taxNumb",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" PW\", \"tax Numb er\": \"PW1 2345 6789 \"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review PW SMOKE edge 62",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Palau identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Palauan Integration Smoke Test Builder analyzes Palau-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Palauan parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"palau","iso2":"PW","iso3":"PLW","isoNumeric":"585","name":"Palau","adjective":"Palauan","nativeName":"Belau","flag":"🇵🇼","language":"Palauan and English","localLanguage":"en-PW","currency":"USD","currencyName":"United States dollar","symbol":"USD","locale":"en-PW","icu":"en_PW","date":"MM/DD/YYYY","decimal":"Dot (.)","thousands":"Comma (,)","phone":"+680","capital":"Ngerulmud","continent":"Oceania","region":"Micronesia","population":"approximately 0.02M","identifiers":["national ID boundary","business registration number","tax boundary","state/locality","phone"],"payments":["bank account","wire reference","SWIFT/BIC","invoice reference","payment reconciliation"],"localTerms":{"personal":"national ID boundary","company":"business registration number","tax":"tax boundary","social":"social security boundary","register":"business registry","invoice":"invoice","payment":"wire/payment reference","plate":"vehicle plate","postal":"state/locality","privacy":"privacy boundary"},"samples":{"personal":"PW-ID-123456","company":"PW-REG-123456","social":"PW-SOC-123456","iban":"PW BANK 1234567890","bank":"001 1234567890","phone":"+680 488 1234","postal":"Ngerulmud, Melekeok","plate":"PW 1234","vat":"PW123456789","amount":"1,234.56 USD","date":"07/24/2026","address":"Ngerulmud, Melekeok State","json":"{\"country\":\"PW\",\"taxNumber\":\"PW123456789\"}"},"theme":["#4AADD6","#FFDE00","#111827"],"marker":{"x":82,"y":59},"related":["FM","MH","PG"],"plugTypes":"Type A / Type B","voltage":"120V","frequency":"60Hz","emergencyNumber":"911","searchHints":["NATIONAL ID","TAX","COMPANY","BANK","STATE","PHONE"],"cities":["Koror","Ngerulmud","Melekeok","Airai"],"timeZone":"Pacific/Palau"};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Palau systems remain the source of truth.', localStructure: 'Palauan local structure', addEvidence: 'Add Palauan local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Palau siguen siendo la fuente de verdad.', localStructure: 'estructura local de Palau', addEvidence: 'Agrega evidencia local de Palau o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Palau continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Palau', addEvidence: 'Adicione evidencia local de Palau ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Palau bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Palau', addEvidence: 'Fuege lokale Palauan Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Palau restent la source de verite.', localStructure: 'structure locale de Palau', addEvidence: 'Ajoutez une preuve locale de Palau ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Palau pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Palau', addEvidence: 'Dodaj lokalne dane kraju Palau albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Palau systems remain the source of truth.', localStructure: 'Palauan local structure', addEvidence: 'Add Palauan local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:PW)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/PW\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/PW[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:USD|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '#4AADD6', accent2: '#FFDE00', accent3: '#111827' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
