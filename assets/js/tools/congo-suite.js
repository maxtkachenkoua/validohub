(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.congo-suite';
  const RAW_TOOLS = [
  {
    "id": "congo-national-id-boundary-validator",
    "name": "Congolese national ID boundary Validator",
    "code": "ID",
    "summary": "Validate national ID boundary shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG-ID-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-1",
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
        "value": "Review CG ID edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Congolese national ID boundary Validator analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-company-registration-number-validator",
    "name": "Congolese company registration number Validator",
    "code": "ORG",
    "summary": "Inspect company registration number structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-REG-1",
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
        "value": "Review CG ORG edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Congolese company registration number Validator analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-tax-id-validator",
    "name": "Congolese tax number / VAT boundary Validator",
    "code": "TAX",
    "summary": "Normalize tax number / VAT boundary identifiers, inspect local tax body evidence, and prepare authority handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG123456789",
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
        "value": "CG12345",
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
        "value": "Review CG TAX edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Congolese tax number / VAT boundary Validator analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-customs-importer-code-helper",
    "name": "Congolese Customs / Importer Code Helper",
    "code": "CUS",
    "summary": "Inspect customs identifiers, importer references, tax bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CGCG-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG CUS 4",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CGCG-REG-",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCG-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG CUS edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Congolese Customs / Importer Code Helper analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-social-security-boundary-social-insurance-helper",
    "name": "Congolese social security boundary Helper",
    "code": "SOC",
    "summary": "Split social security boundary evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-SOC-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG-SOC-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-SOC-1",
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
        "value": "Review CG SOC edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Congolese social security boundary Helper analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-company-onboarding-auditor",
    "name": "Congolese Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for company registration number, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-002\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG KYC edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Congolese Company Onboarding Auditor analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-business-register-readiness-helper",
    "name": "Congolese business registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated business registry lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-REG-123456 CG123456789 Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG-REG-123456 CG123456789 Central business district, Brazzaville 1001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-REG-123456 CG123456789 Central busi",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 CG123456789 Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG REG edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Congolese business registry Readiness Helper analyzes Republic of the Congo-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-id-card-format-helper",
    "name": "Congolese ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG CARD 8",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-1",
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
        "value": "Review CG CARD edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Congolese ID Card Format Helper analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-passport-number-helper",
    "name": "Congolese Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<COGCONGOLESE<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PASS 9",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<COGCONGOLESE<<SAMPLE",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG P<COGCONGOLESE<<SAMPLE<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PASS edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Congolese Passport Number Helper analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-mrz-passport-parser",
    "name": "Congolese MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<COGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567COG8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG MRZ 10",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<COGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG P<COGSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567COG8501019M3107123<<<<<<<<<<<<<<06",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG MRZ edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Congolese MRZ / Passport Parser analyzes Republic of the Congo-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-bank-account-validator",
    "name": "Republic of the Congo Bank Account Validator",
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
        "value": "Invalid CG BANK 11",
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
        "value": "Wrong prefix CG 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG BANK edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Republic of the Congo Bank Account Validator analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-bank-account-fixture-generator",
    "name": "Republic of the Congo Bank Account Fixture Generator",
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
        "value": "Invalid CG BGEN 12",
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
        "value": "Review CG BGEN edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BGEN local evidence",
        "text": "Republic of the Congo Bank Account Fixture Generator analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-bank-account-inspector",
    "name": "Congolese Domestic Bank Account Inspector",
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
        "value": "Invalid CG BANK 13",
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
        "value": "Wrong prefix CG 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG BANK edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Congolese Domestic Bank Account Inspector analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-bic-swift-inspector",
    "name": "Congolese BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Republic of the Congo banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDCG2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix ZZCDCG2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCDC",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZCDCG2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG BIC edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Congolese BIC / SWIFT Inspector analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-domestic-transfer-helper",
    "name": "Congolese Domestic Transfer Helper",
    "code": "PAY",
    "summary": "Check creditor, local bank-account, amount, remittance, and offline payment handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "001 1234567890\\n1,234.56 XAF\\nInvoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PAY 15",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "001 1234567890\\n1,234.56 X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG 001 1234567890\\n1,234.56 XAF\\nInvoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PAY edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Congolese Domestic Transfer Helper analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-direct-debit-mandate-helper",
    "name": "Congolese Direct Debit / Auto-Debit Mandate Helper",
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
        "value": "Invalid CG DD 16",
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
        "value": "Review CG DD edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DD local evidence",
        "text": "Congolese Direct Debit / Auto-Debit Mandate Helper analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-payment-reference-helper",
    "name": "Congolese bank transfer / payment reference Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "bank transfer / payment reference REF 2026-001 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PAY 17",
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
        "value": "Wrong prefix CG bank transfer / payment reference REF 2026-001 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PAY edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Congolese bank transfer / payment reference Reference Helper analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-remittance-text-builder",
    "name": "Congolese Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 CG123456789 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG REMIT 18",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 CG1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Invoice 2026-001 CG123456789 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG REMIT edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Congolese Remittance Text Builder analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-payment-reconciliation-helper",
    "name": "Congolese Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026; 1,234.56 XAF; 001 1234567890; Invoice 2026-001",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG RECON 19",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/2026; 1,234.56 XAF; 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG 24/07/2026; 1,234.56 XAF; 001 1234567890; Invoice 2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG RECON edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Congolese Payment Reconciliation Helper analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-bank-statement-parser",
    "name": "Congolese Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, account/routing evidence, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "24/07/2026; 1,234.56 XAF; 001 1234567890; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG STMT 20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "24/07/2026; 1,234.56 XAF; 001 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG 24/07/2026; 1,234.56 XAF; 001 1234567890; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG STMT edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Congolese Bank Statement Parser analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-masked-bank-account-formatter",
    "name": "Congolese Masked Bank Account Formatter",
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
        "value": "Invalid CG MASK 21",
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
        "value": "Wrong prefix CG 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG MASK edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Congolese Masked Bank Account Formatter analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-currency-decimal-formatter",
    "name": "Congolese XAF Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize XAF amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG CUR 22",
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
        "value": "Wrong prefix CG 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG CUR edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Congolese XAF Decimal Currency Formatter analyzes Republic of the Congo-specific finance evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-tax-rate-sanity-helper",
    "name": "Congolese Tax Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect tax-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax number / VAT boundary 20% base 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG RATE 23",
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
        "value": "Wrong prefix CG tax number / VAT boundary 20% base 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG RATE edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Congolese Tax Rate Sanity Helper analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-tax-return-field-helper",
    "name": "Congolese Tax Return Field Helper",
    "code": "RET",
    "summary": "Map tax-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax number / VAT boundary; CG123456789; period 2026-07; 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG RET 24",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax number / VAT boundary; CG123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG tax number / VAT boundary; CG123456789; period 2026-07; 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG RET edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Congolese Tax Return Field Helper analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-invoice-number-helper",
    "name": "Congolese Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 CG123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG INV 25",
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
        "value": "Wrong prefix ZZV-2026-0001 CG123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG INV edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Congolese Invoice Number Helper analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-e-invoicing-readiness-checker",
    "name": "Congolese tax invoice Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG EINV 26",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG EINV edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Congolese tax invoice Readiness Checker analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-tax-authority-handoff-helper",
    "name": "Congolese Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG123456789 24/07/2026 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG TAX 27",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG123456789 24/07/20",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 24/07/2026 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG TAX edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Congolese Tax Authority Handoff Helper analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-accounting-audit-trail-checklist-generator",
    "name": "Congolese Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, tax, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 24/07/2026 1,234.56 XAF CG123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG AUDIT 28",
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
        "value": "invo ice  24/0 7/20 26 1 ,234 .56  XAF  CG12 3456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review CG AUDIT edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Congolese Accounting Audit Trail Checklist Helper analyzes Republic of the Congo-specific tax evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-postal-code-validator",
    "name": "Congolese Postal Code Validator",
    "code": "POST",
    "summary": "Validate postal/address code shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000 Brazzaville",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG POST 29",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1000 Braz",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG 1000 Brazzaville",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG POST edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Congolese Postal Code Validator analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-address-normalizer",
    "name": "Congolese Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG ADDR 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business distric",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG ADDR edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Congolese Address Normalizer analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-address-transliteration-normalizer",
    "name": "Congolese Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG ASCII 31",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business distric",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG ASCII edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Congolese Address Transliteration Normalizer analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-region-code-mapper",
    "name": "Congolese Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000 Brazzaville",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG REGION 32",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1000 Braz",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG 1000 Brazzaville",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG REGION edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Congolese Region / Province Code Mapper analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-municipality-code-inspector",
    "name": "Congolese Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG MUNI 33",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Central business distric",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG MUNI edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Congolese Municipality Code Inspector analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-phone-number-validator",
    "name": "Congolese Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+242 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PHONE 34",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+242 123 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG +242 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PHONE edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Congolese Phone Number Validator analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-phone-e164-formatter",
    "name": "Congolese Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+242 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG E164 35",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+242 123 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG +242 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG E164 edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Congolese Phone E.164 Formatter analyzes Republic of the Congo-specific address evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-date-locale-formatter",
    "name": "Congolese Date Locale Formatter",
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
        "value": "Invalid CG DATE 36",
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
        "value": "Wrong prefix CG 24/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG DATE edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Congolese Date Locale Formatter analyzes Republic of the Congo-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-csv-locale-normalizer",
    "name": "Congolese CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Republic of the Congo decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1,234.56 XAF;24/07/2026;CG123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG CSV 37",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1,234.56 X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG id;amount;date;tax\\n1;1,234.56 XAF;24/07/2026;CG123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG CSV edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Congolese CSV Locale Normalizer analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-slug-normalizer",
    "name": "Congolese Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Republic of the Congo sample company Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG SLUG 38",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Republic of the Congo sample company Central",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Republic of the Congo sample company Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG SLUG edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Congolese Slug Normalizer analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-document-ocr-fixer",
    "name": "Congolese Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456 CG123456789 001 1234567890 1000 Brazzaville",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG OCR 39",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-123456 CG123456789 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 CG123456789 001 1234567890 1000 Brazzaville",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG OCR edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Congolese Document OCR Fixer analyzes Republic of the Congo-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-privacy-redaction-helper",
    "name": "Congolese data protection / privacy boundary Redaction Helper",
    "code": "PRIV",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PRIV 40",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PRIV edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PRIV local evidence",
        "text": "Congolese data protection / privacy boundary Redaction Helper analyzes Republic of the Congo-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-pii-masker",
    "name": "Congolese PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456 +242 123 456 789 001 1234567890",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PII 41",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-123456 +242 123 456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-ID-123456 +242 123 456 789 001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PII edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Congolese PII Masker analyzes Republic of the Congo-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-personal-data-fixture-generator",
    "name": "Congolese Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456\\nCentral business district, Brazzaville 1000\\n+242 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG FIX 42",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-123456\\nCentral business district, B",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "CG-I D-12 3456 \\nCe ntra l bu sine ss d istr ict,  Bra zzav ille  100 0\\n+ 242  123  456  789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review CG FIX edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Congolese Personal Data Fixture Helper analyzes Republic of the Congo-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-driving-licence-format-helper",
    "name": "Congolese Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456 DL 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG DL 43",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-12345",
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
        "value": "Review CG DL edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Congolese Driving Licence Format Helper analyzes Republic of the Congo-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-residence-permit-format-helper",
    "name": "Congolese Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG PERMIT 2026 CG-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PERMIT 44",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG PERMIT 2026 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ PERMIT 2026 CG-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PERMIT edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Congolese Residence Permit Format Helper analyzes Republic of the Congo-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-health-card-format-helper",
    "name": "Congolese Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-ID-123456 HEALTH 2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG HEALTH 45",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-ID-123456 H",
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
        "value": "Review CG HEALTH edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Congolese Health Card Format Helper analyzes Republic of the Congo-specific documents evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-vehicle-plate-inspector",
    "name": "Congolese Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG 1235",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG 1",
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
        "value": "Review CG PLATE edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Congolese Vehicle Plate Inspector analyzes Republic of the Congo-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-vin-validator",
    "name": "Congolese VIN Validator",
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
        "value": "Review CG VIN edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Congolese VIN Validator analyzes Republic of the Congo-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-vehicle-data-redaction-helper",
    "name": "Congolese Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG 1234 WVWZZZ1JZXW000001 CG-ID-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG VEH 48",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG 1234 WVWZZZ1JZXW00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ 1234 WVWZZZ1JZXW000001 CG-ID-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG VEH edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Congolese Vehicle Data Redaction Helper analyzes Republic of the Congo-specific transport evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-customs-declaration-helper",
    "name": "Congolese Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect importer code, tax, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG123456789 HS 8471 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG CUSTOMS 49",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG123456789 HS 847",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ123456789 HS 8471 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG CUSTOMS edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Congolese Customs Declaration Helper analyzes Republic of the Congo-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-postal-tracking-helper",
    "name": "Congolese Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 1000 Brazzaville",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG TRACK 50",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZACK 2026 1000 Brazzaville",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG TRACK edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Congolese Postal Tracking Helper analyzes Republic of the Congo-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-data-quality-workbench",
    "name": "Congolese Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG DQ 51",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG DQ edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Congolese Data Quality Workbench analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-json-fixture-generator",
    "name": "Congolese JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG JSON 52",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" CG\", \"tax Numb er\": \"CG1 2345 6789 \",\"p ayme ntRe fere nce\" :\"IN V-20 26-0 01\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review CG JSON edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Congolese JSON Fixture Helper analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-regex-pack-helper",
    "name": "Congolese Regex Pack Helper",
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
        "value": "Invalid CG REGEX 53",
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
        "value": "Wrong prefix CG national ID boundary company registration number postal/address code  001 1234567890",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG REGEX edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Congolese Regex Pack Helper analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-api-payload-auditor",
    "name": "Congolese API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, bank-account evidence, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG API 54",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG {\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG API edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Congolese API Payload Auditor analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-form-field-auditor",
    "name": "Congolese Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=CG123456789&postal=1000 Brazzaville&phone=+242 123 456 789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG FORM 55",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "tax=CG123456789&postal=1000 Brazzav",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG tax=CG123456789&postal=1000 Brazzaville&phone=+242 123 456 789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG FORM edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Congolese Form Field Auditor analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-locale-number-parser",
    "name": "Congolese Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Republic of the Congo.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG NUM 56",
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
        "value": "Wrong prefix CG 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG NUM edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Congolese Locale Number Parser analyzes Republic of the Congo-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-calendar-week-helper",
    "name": "Congolese Calendar Week Helper",
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
        "value": "Invalid CG CAL 57",
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
        "value": "Wrong prefix CG 24/07/2026 week 30",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG CAL edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Congolese Calendar Week Helper analyzes Republic of the Congo-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-company-suffix-normalizer",
    "name": "Congolese Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Republic of the Congo Sample Holding Ltd CG-REG-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Republic of the Congo Sample Holding Ltd CG-REG-123457",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Republic of the Congo Sample H",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Republic of the Congo Sample Holding Ltd CG-REG-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG SUFFIX edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Congolese Company Suffix Normalizer analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-procurement-identifier-helper",
    "name": "Congolese Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CG-REG-123456 PO-2026-001 CG123456789",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG PROC 59",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "CG-REG-123456 PO-2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix ZZ-REG-123456 PO-2026-001 CG123456789",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG PROC edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Congolese Procurement Identifier Helper analyzes Republic of the Congo-specific government evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-accessibility-locale-copy-checker",
    "name": "Congolese Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "national ID boundary input, postal/address code input, amount 1,234.56 XAF",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG COPY 60",
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
        "value": "Wrong prefix CG national ID boundary input, postal/address code input, amount 1,234.56 XAF",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG COPY edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Congolese Locale Copy Checker analyzes Republic of the Congo-specific localization evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-support-ticket-scrubber",
    "name": "Congolese Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent CG-ID-123456, 001 1234567890, Central business district, Brazzaville 1000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG SUP 61",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Customer sent CG-ID-123456, 001 1234567890, Cent",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix CG Customer sent CG-ID-123456, 001 1234567890, Central business district, Brazzaville 1000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "Review CG SUP edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Congolese Support Ticket Scrubber analyzes Republic of the Congo-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "congo-integration-smoke-test-builder",
    "name": "Congolese Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid CG SMOKE 62",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Grouped valid sample",
        "value": "{\"co untr y\":\" CG\", \"tax Numb er\": \"CG1 2345 6789 \",\"p ayme ntRe fere nce\" :\"IN V-20 26-0 01\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Edge sample",
        "value": "Review CG SMOKE edge 62",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Republic of the Congo identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Congolese Integration Smoke Test Builder analyzes Republic of the Congo-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline Congolese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"congo","iso2":"CG","iso3":"COG","isoNumeric":"178","name":"Republic of the Congo","adjective":"Congolese","nativeName":"Congo","flag":"🇨🇬","language":"French","localLanguage":"fr-CG","currency":"XAF","currencyName":"Central African CFA franc","symbol":"XAF","locale":"fr-CG","icu":"fr_CG","date":"DD/MM/YYYY","decimal":"Comma (,)","thousands":"Space","phone":"+242","capital":"Brazzaville","continent":"Africa","region":"Middle Africa","population":"approximately 6M","identifiers":["National ID boundary","company registration number","tax number / VAT boundary","postal/address code","phone"],"payments":["bank account","domestic transfer reference","SWIFT/BIC","invoice reference","payment reconciliation"],"localTerms":{"personal":"national ID boundary","company":"company registration number","tax":"tax number / VAT boundary","social":"social security boundary","register":"business registry","invoice":"tax invoice","payment":"bank transfer / payment reference","plate":"vehicle plate","postal":"postal/address code","privacy":"data protection / privacy boundary"},"samples":{"personal":"CG-ID-123456","company":"CG-REG-123456","social":"CG-SOC-123456","iban":"CG00BANK000123456789","bank":"001 1234567890","phone":"+242 123 456 789","postal":"1000 Brazzaville","plate":"CG 1234","vat":"CG123456789","amount":"1,234.56 XAF","date":"24/07/2026","address":"Central business district, Brazzaville 1000","json":"{\"country\":\"CG\",\"taxNumber\":\"CG123456789\",\"paymentReference\":\"INV-2026-001\"}"},"theme":["#009543","#FBDE4A","#DC241F"],"marker":{"x":45,"y":55},"related":["ZA","NG","KE"],"plugTypes":"Type C / Type E","voltage":"230V","frequency":"50Hz","emergencyNumber":"117 / 118","searchHints":["NATIONAL ID","TAX","VAT","COMPANY","BANK","POSTAL"],"cities":["Brazzaville","Pointe-Noire","Dolisie","Nkayi"],"timeZone":"Africa/Brazzaville"};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Republic of the Congo systems remain the source of truth.', localStructure: 'Congolese local structure', addEvidence: 'Add Congolese local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Republic of the Congo siguen siendo la fuente de verdad.', localStructure: 'estructura local de Republic of the Congo', addEvidence: 'Agrega evidencia local de Republic of the Congo o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Republic of the Congo continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Republic of the Congo', addEvidence: 'Adicione evidencia local de Republic of the Congo ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Republic of the Congo bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Republic of the Congo', addEvidence: 'Fuege lokale Congolese Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Republic of the Congo restent la source de verite.', localStructure: 'structure locale de Republic of the Congo', addEvidence: 'Ajoutez une preuve locale de Republic of the Congo ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Republic of the Congo pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Republic of the Congo', addEvidence: 'Dodaj lokalne dane kraju Republic of the Congo albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Republic of the Congo systems remain the source of truth.', localStructure: 'Congolese local structure', addEvidence: 'Add Congolese local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:CG)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/CG\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/CG[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
      postal: (text.match(/\b[A-Z0-9][A-Z0-9 -]{2,10}\b/) || [])[0] || '',
      date: (text.match(/\b(?:\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{4})\b/) || [])[0] || '',
      amount: (text.match(/\b\d{1,3}(?:[ .]\d{3})*(?:,|\.)\d{2}\s*(?:XAF|EUR|SEK|NOK|DKK|CZK|RON)?\b/i) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective }, theme: { accent: '#009543', accent2: '#FBDE4A', accent3: '#DC241F' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
