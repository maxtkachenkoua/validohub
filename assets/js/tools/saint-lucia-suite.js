(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.saint-lucia-suite';
  const RAW_TOOLS = [
  {
    "id": "saint-lucia-national-id-validator",
    "name": "Saint Lucian national ID Validator",
    "code": "ID",
    "summary": "Validate local personal identifier shape, split visible evidence, and keep official identity status out of browser-only results.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Saint Lucian national ID Validator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-company-number-validator",
    "name": "Saint Lucian company number Validator",
    "code": "ORG",
    "summary": "Inspect company or registry identifier shape, prefixes, local vocabulary, and official registry handoff boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC-COMP-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC-COMP-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC-COMP",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC-COMP-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Saint Lucian company number Validator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-tax-id-inspector",
    "name": "Saint Lucian VAT registration Inspector",
    "code": "TAX",
    "summary": "Normalize tax identifier snippets, inspect local body evidence, and prepare official tax-authority handoff notes.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC TAX 123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC TAX",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Saint Lucian VAT registration Inspector analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-company-onboarding-auditor",
    "name": "Saint Lucian Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for identifier, address, banking, tax, and privacy readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Saint Lucian Company Onboarding Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-business-register-readiness-helper",
    "name": "Saint Lucian Business Registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated business registry lookup or filing workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC-COMP-123456 1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC-COMP-123456 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC-COMP-123456 1 M",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC-COMP-123456 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Saint Lucian Business Registry Readiness Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-id-card-format-helper",
    "name": "Saint Lucian ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Saint Lucian ID Card Format Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-passport-mrz-parser",
    "name": "Saint Lucian MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<LCASAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid P<LCASAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<LCASAMPLE<<TEST",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ P<LCASAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Saint Lucian MRZ / Passport Parser analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-domestic-bank-account-inspector",
    "name": "Saint Lucian domestic bank account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic bank account slices, routing blocks, account text, and payment-provider boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC BANK 001 123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC BANK 001 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC BANK 0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC BANK 001 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Saint Lucian domestic bank account Inspector analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-bic-swift-inspector",
    "name": "Saint Lucian BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for cross-border banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDLC2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid ABCDLC2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ ABCDLC2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Saint Lucian BIC / SWIFT Inspector analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-payment-reference-helper",
    "name": "Saint Lucian domestic payment reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "domestic payment reference REF 2026-001 1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid domestic payment reference REF 2026-001 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "domestic payment referen",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ domestic payment reference REF 2026-001 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Saint Lucian domestic payment reference Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-remittance-text-builder",
    "name": "Saint Lucian Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, tax, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 LC TAX 123456 1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Invoice 2026-001 LC TAX 123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 LC ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Invoice 2026-001 LC TAX 123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Saint Lucian Remittance Text Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-bank-statement-parser",
    "name": "Saint Lucian Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1,234.56 XCD; LC BANK 001 123456; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 21/07/2026; 1,234.56 XCD; LC BANK 001 123456; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1,234.56 XCD; LC B",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026; 1,234.56 XCD; LC BANK 001 123456; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Saint Lucian Bank Statement Parser analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-currency-decimal-formatter",
    "name": "Saint Lucian XCD Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize local amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1,234.",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Saint Lucian XCD Decimal Currency Formatter analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-postal-code-validator",
    "name": "Saint Lucian district/locality Validator",
    "code": "POST",
    "summary": "Validate postal/address locality shape, split locality hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "district/locality sample",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "district/lo",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Saint Lucian district/locality Validator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-address-normalizer",
    "name": "Saint Lucian Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, locality, administrative area, postal code, and country lines for local forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Stre",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Saint Lucian Address Normalizer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-phone-number-validator",
    "name": "Saint Lucian Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+1-758 555 0142",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid +1-758 555 0142",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+1-758 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ +1-758 555 0142",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Saint Lucian Phone Number Validator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-date-locale-formatter",
    "name": "Saint Lucian Date Locale Formatter",
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
        "value": "Invalid 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Saint Lucian Date Locale Formatter analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-csv-locale-normalizer",
    "name": "Saint Lucian CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id,amount,date,tax\\n1,1,234.56 XCD,21/07/2026,LC TAX 123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid id,amount,date,tax\\n1,1,234.56 XCD,21/07/2026,LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id,amount,date,tax\\n1,1,234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ id,amount,date,tax\\n1,1,234.56 XCD,21/07/2026,LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Saint Lucian CSV Locale Normalizer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-document-ocr-fixer",
    "name": "Saint Lucian Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456 LC TAX 123456 LC BANK 001 123456 district/locality sample",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456 LC TAX 123456 LC BANK 001 123456 district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC123456 LC TAX 123456 LC BANK",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456 LC TAX 123456 LC BANK 001 123456 district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Saint Lucian Document OCR Fixer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-privacy-redaction-helper",
    "name": "Saint Lucian Privacy Redaction Helper",
    "code": "PII",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Saint Lucian Privacy Redaction Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-data-quality-workbench",
    "name": "Saint Lucian Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Saint Lucian Data Quality Workbench analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-api-payload-auditor",
    "name": "Saint Lucian API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, banking, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Saint Lucian API Payload Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-state-province-code-mapper",
    "name": "Saint Lucian State / Province Code Mapper",
    "code": "AREA",
    "summary": "Map local administrative area labels, abbreviations, and address payload hints for browser-only form routing.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "area",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Stre",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AREA local evidence",
        "text": "Saint Lucian State / Province Code Mapper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-locality-autocomplete-fixture-builder",
    "name": "Saint Lucian Locality Autocomplete Fixture Builder",
    "code": "CITY",
    "summary": "Build country-local city, district, postal, and address fixtures for autocomplete QA without live geocoding.",
    "category": "address",
    "actionLabel": "Generate",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Stre",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CITY local evidence",
        "text": "Saint Lucian Locality Autocomplete Fixture Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-government-form-field-normalizer",
    "name": "Saint Lucian Government Form Field Normalizer",
    "code": "FORM",
    "summary": "Normalize local government-form labels, identifier fields, dates, and address lines before portal handoff.",
    "category": "government",
    "actionLabel": "Normalize",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Saint Lucian Government Form Field Normalizer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-tax-invoice-field-auditor",
    "name": "Saint Lucian Tax Invoice Field Auditor",
    "code": "INV",
    "summary": "Audit invoice snippets for local tax IDs, currency, address, date, line totals, and official filing boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 LC TAX 123456 1,234.56 XCD 1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Invoice 2026-001 LC TAX 123456 1,234.56 XCD 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 LC TAX 123456 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Invoice 2026-001 LC TAX 123456 1,234.56 XCD 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Saint Lucian Tax Invoice Field Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-sales-tax-vat-threshold-checklist",
    "name": "Saint Lucian Sales Tax / VAT Threshold Checklist",
    "code": "THR",
    "summary": "Inspect revenue, registration, local tax labels, and threshold handoff notes without making legal conclusions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "checklist",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "THR local evidence",
        "text": "Saint Lucian Sales Tax / VAT Threshold Checklist analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-withholding-tax-form-helper",
    "name": "Saint Lucian Withholding Tax Form Helper",
    "code": "WHT",
    "summary": "Prepare local withholding-tax form evidence, payee IDs, dates, amounts, and review notes for finance teams.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "tax",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC-COMP-123456 1,234.56 XCD 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC-COMP-123456 1,234.56 XCD 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC-COMP-123456 1,2",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC-COMP-123456 1,234.56 XCD 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "WHT local evidence",
        "text": "Saint Lucian Withholding Tax Form Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-customs-import-code-inspector",
    "name": "Saint Lucian Customs / Import Code Inspector",
    "code": "CUS",
    "summary": "Inspect customs references, importer IDs, invoice fields, currency, and shipment handoff evidence.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC-COMP-123456 IMPORT 2026 1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC-COMP-123456 IMPORT 2026 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC-COMP-123456 IMP",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC-COMP-123456 IMPORT 2026 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Saint Lucian Customs / Import Code Inspector analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-payroll-id-intake-helper",
    "name": "Saint Lucian Payroll ID Intake Helper",
    "code": "PAYR",
    "summary": "Check employee intake payloads for local personal IDs, tax IDs, dates, address, and privacy-safe masking.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "payroll",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456 21/07/2026 1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456 21/07/2026 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC123456 21/07/2026 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456 21/07/2026 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAYR local evidence",
        "text": "Saint Lucian Payroll ID Intake Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-benefits-social-number-redaction",
    "name": "Saint Lucian Benefits / Social Number Redaction Helper",
    "code": "BEN",
    "summary": "Mask local social, benefits, tax, phone, and address evidence before logs, tickets, or screenshots.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456 +1-758 555 0142 1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456 +1-758 555 0142 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC123456 +1-758 555 01",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456 +1-758 555 0142 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BEN local evidence",
        "text": "Saint Lucian Benefits / Social Number Redaction Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-business-license-checklist",
    "name": "Saint Lucian Business License Checklist",
    "code": "LIC",
    "summary": "Audit local business-license intake evidence, registry IDs, addresses, tax labels, and official lookup boundaries.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC-COMP-123456 LC TAX 123456 1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC-COMP-123456 LC TAX 123456 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC-COMP-123456 LC TAX 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC-COMP-123456 LC TAX 123456 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "LIC local evidence",
        "text": "Saint Lucian Business License Checklist analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-ownership-kyb-payload-auditor",
    "name": "Saint Lucian Ownership / KYB Payload Auditor",
    "code": "KYB",
    "summary": "Inspect KYB payloads for company IDs, beneficial-owner fields, addresses, dates, and masked evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYB local evidence",
        "text": "Saint Lucian Ownership / KYB Payload Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-sanctions-screening-payload-helper",
    "name": "Saint Lucian Sanctions Screening Payload Helper",
    "code": "SCRN",
    "summary": "Prepare offline screening payloads with names, addresses, identifiers, and no false match-status claims.",
    "category": "privacy",
    "actionLabel": "Inspect",
    "kind": "screening",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SCRN local evidence",
        "text": "Saint Lucian Sanctions Screening Payload Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-bank-routing-handoff-checklist",
    "name": "Saint Lucian Bank Routing Handoff Checklist",
    "code": "ROUT",
    "summary": "Check routing, account, branch, currency, payment reference, and provider-boundary fields before bank handoff.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC BANK 001 123456 1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC BANK 001 123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC BANK 001 12",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC BANK 001 123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ROUT local evidence",
        "text": "Saint Lucian Bank Routing Handoff Checklist analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-payout-recipient-validator",
    "name": "Saint Lucian Payout Recipient Validator",
    "code": "OUT",
    "summary": "Inspect payout recipient payloads for local name, account, tax, phone, address, currency, and retry-safe evidence.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OUT local evidence",
        "text": "Saint Lucian Payout Recipient Validator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-refund-reference-builder",
    "name": "Saint Lucian Refund Reference Builder",
    "code": "REF",
    "summary": "Build local refund references from invoice, customer, payment, amount, and reconciliation fields.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Refund 2026-001 LC-COMP-123456 1,234.56 XCD",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Refund 2026-001 LC-COMP-123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Refund 2026-001 LC-C",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Refund 2026-001 LC-COMP-123456 1,234.56 XCD",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REF local evidence",
        "text": "Saint Lucian Refund Reference Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-chargeback-evidence-pack-helper",
    "name": "Saint Lucian Chargeback Evidence Pack Helper",
    "code": "CBK",
    "summary": "Organize browser-only payment, invoice, address, date, and customer evidence for dispute workflows.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CBK local evidence",
        "text": "Saint Lucian Chargeback Evidence Pack Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-ecommerce-checkout-locale-auditor",
    "name": "Saint Lucian Ecommerce Checkout Locale Auditor",
    "code": "SHOP",
    "summary": "Audit checkout payloads for local address, phone, postal, currency, date, and tax-field assumptions.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SHOP local evidence",
        "text": "Saint Lucian Ecommerce Checkout Locale Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-shipping-label-normalizer",
    "name": "Saint Lucian Shipping Label Normalizer",
    "code": "SHIP",
    "summary": "Normalize local shipping-label blocks, recipient names, postal/locality fields, phone, and delivery notes.",
    "category": "logistics",
    "actionLabel": "Normalize",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries +1-758 555 0142",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries +1-758 555 0142",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Street, Cas",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries +1-758 555 0142",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SHIP local evidence",
        "text": "Saint Lucian Shipping Label Normalizer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-customs-address-line-helper",
    "name": "Saint Lucian Customs Address Line Helper",
    "code": "ADR2",
    "summary": "Split exporter/importer address lines, locality, postal data, country code, and customs-safe payloads.",
    "category": "logistics",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Stre",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADR2 local evidence",
        "text": "Saint Lucian Customs Address Line Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-vehicle-registration-format-helper",
    "name": "Saint Lucian Vehicle Registration Format Helper",
    "code": "VEH",
    "summary": "Inspect vehicle-registration snippets, plate shapes, region hints, and official transport boundary notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC 1234",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Saint Lucian Vehicle Registration Format Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-driver-license-format-helper",
    "name": "Saint Lucian Driver License Format Helper",
    "code": "DL",
    "summary": "Inspect driving-license snippets, dates, document numbers, and privacy-safe evidence for transport intake.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC123456 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Saint Lucian Driver License Format Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-utility-bill-address-proof-auditor",
    "name": "Saint Lucian Utility Bill Address Proof Auditor",
    "code": "BILL",
    "summary": "Audit utility-bill OCR text for names, dates, address lines, account numbers, and masked support evidence.",
    "category": "documents",
    "actionLabel": "Audit",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Main Street, Castries 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1 Main Street, Castries 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "1 Main Street, C",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 1 Main Street, Castries 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BILL local evidence",
        "text": "Saint Lucian Utility Bill Address Proof Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-kyc-document-bundle-auditor",
    "name": "Saint Lucian KYC Document Bundle Auditor",
    "code": "DOCS",
    "summary": "Check KYC document bundles for local ID, tax, address, date, file labels, and official-boundary notes.",
    "category": "documents",
    "actionLabel": "Audit",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DOCS local evidence",
        "text": "Saint Lucian KYC Document Bundle Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-invoice-number-format-helper",
    "name": "Saint Lucian Invoice Number Format Helper",
    "code": "NUM",
    "summary": "Normalize invoice-number patterns, series, date fragments, counterparty hints, and duplicate-risk notes.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-001 LC-COMP-123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid INV-2026-001 LC-COMP-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-001 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ INV-2026-001 LC-COMP-123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Saint Lucian Invoice Number Format Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-receipt-tax-line-parser",
    "name": "Saint Lucian Receipt Tax Line Parser",
    "code": "RCT",
    "summary": "Parse receipt text for tax labels, totals, currency, dates, and local decimal/grouping evidence.",
    "category": "tax",
    "actionLabel": "Parse",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026 1,234.56 XCD LC TAX 123456",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 21/07/2026 1,234.56 XCD LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026 1,234.",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026 1,234.56 XCD LC TAX 123456",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RCT local evidence",
        "text": "Saint Lucian Receipt Tax Line Parser analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-phone-extension-normalizer",
    "name": "Saint Lucian Phone Extension Normalizer",
    "code": "EXT",
    "summary": "Normalize local phone numbers with extension, country prefix, national blocks, and CRM-safe output.",
    "category": "address",
    "actionLabel": "Normalize",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+1-758 555 0142 ext 123",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid +1-758 555 0142 ext 123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+1-758 555 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ +1-758 555 0142 ext 123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EXT local evidence",
        "text": "Saint Lucian Phone Extension Normalizer analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-timezone-business-hours-helper",
    "name": "Saint Lucian Business Hours / Time Zone Helper",
    "code": "TZ",
    "summary": "Preview local business-hour windows, date cutoffs, support handoffs, and timezone caveats.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026 09:00-17:00",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 21/07/2026 09:00-17:00",
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
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026 09:00-17:00",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TZ local evidence",
        "text": "Saint Lucian Business Hours / Time Zone Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-holiday-calendar-fixture-builder",
    "name": "Saint Lucian Holiday Calendar Fixture Builder",
    "code": "CAL",
    "summary": "Build local calendar fixtures and holiday-review payloads without claiming official holiday coverage.",
    "category": "localization",
    "actionLabel": "Generate",
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
        "value": "Invalid 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Saint Lucian Holiday Calendar Fixture Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-name-parser-transliteration-helper",
    "name": "Saint Lucian Name Parser / Transliteration Helper",
    "code": "NAME",
    "summary": "Split local personal/company names, accents, casing, transliteration, and search-key fixtures.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "text",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Saint Lucian Sample Name",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Saint Lucian Sample Name",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Saint Lucia",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Saint Lucian Sample Name",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NAME local evidence",
        "text": "Saint Lucian Name Parser / Transliteration Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-email-domain-locality-checker",
    "name": "Saint Lucian Email Domain Locality Checker",
    "code": "MAIL",
    "summary": "Inspect email/domain strings for local TLD hints, plus addressing, masking, and no-deliverability boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "email",
    "samples": [
      {
        "label": "Valid sample",
        "value": "test@example.LC",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid test@example.LC",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "test@ex",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ test@example.LC",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MAIL local evidence",
        "text": "Saint Lucian Email Domain Locality Checker analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-form-autofill-fixture-generator",
    "name": "Saint Lucian Form Autofill Fixture Generator",
    "code": "AUTO",
    "summary": "Generate browser-only local form fixtures for IDs, tax, phone, postal, address, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUTO local evidence",
        "text": "Saint Lucian Form Autofill Fixture Generator analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-webhook-local-payload-fixture",
    "name": "Saint Lucian Webhook Local Payload Fixture",
    "code": "HOOK",
    "summary": "Build webhook payload fixtures with local IDs, tax, currency, dates, masked fields, and replay metadata.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HOOK local evidence",
        "text": "Saint Lucian Webhook Local Payload Fixture analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-graphql-input-auditor",
    "name": "Saint Lucian GraphQL Input Auditor",
    "code": "GQL",
    "summary": "Audit GraphQL-style input objects for local identifiers, tax fields, dates, amounts, and nullable hazards.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GQL local evidence",
        "text": "Saint Lucian GraphQL Input Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-openapi-country-schema-helper",
    "name": "Saint Lucian OpenAPI Country Schema Helper",
    "code": "OAS",
    "summary": "Draft and inspect OpenAPI schema snippets for local identifiers, address, phone, payment, and tax fields.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OAS local evidence",
        "text": "Saint Lucian OpenAPI Country Schema Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-sql-seed-data-builder",
    "name": "Saint Lucian SQL Seed Data Builder",
    "code": "SQL",
    "summary": "Build local seed-data rows for identifiers, tax, address, phone, amount, and bank fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SQL local evidence",
        "text": "Saint Lucian SQL Seed Data Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-json-schema-local-rules-helper",
    "name": "Saint Lucian JSON Schema Local Rules Helper",
    "code": "JSON",
    "summary": "Inspect JSON Schema rules for local field names, patterns, examples, and official-boundary copy.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Saint Lucian JSON Schema Local Rules Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-test-case-matrix-builder",
    "name": "Saint Lucian Test Case Matrix Builder",
    "code": "CASE",
    "summary": "Generate valid, invalid, short, wrong-country, masking, and boundary test-case matrices for local workflows.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CASE local evidence",
        "text": "Saint Lucian Test Case Matrix Builder analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-data-retention-policy-helper",
    "name": "Saint Lucian Data Retention Policy Helper",
    "code": "RET",
    "summary": "Organize local retention, masking, audit-log, and deletion checklist fields without giving legal advice.",
    "category": "privacy",
    "actionLabel": "Audit",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"LC\",\"tax\":\"LC TA",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"LC\",\"tax\":\"LC TAX 123456\",\"amount\":\"1,234.56 XCD\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Saint Lucian Data Retention Policy Helper analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "saint-lucia-accessibility-form-label-auditor",
    "name": "Saint Lucian Accessibility Form Label Auditor",
    "code": "A11Y",
    "summary": "Audit local form labels, autocomplete names, error copy, and screen-reader hints for identifier workflows.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "LC123456 district/locality sample",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid LC123456 district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "LC123456 distri",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ LC123456 district/locality sample",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "LC review edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Saint Lucia identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "A11Y local evidence",
        "text": "Saint Lucian Accessibility Form Label Auditor analyzes Saint Lucia-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Saint Lucia status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid samples are structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  }
];
  const COUNTRY = {
  "slug": "saint-lucia",
  "name": "Saint Lucia",
  "adjective": "Saint Lucian",
  "iso2": "LC",
  "theme": [
    "#66CCFF",
    "#FCD116",
    "#111827"
  ]
};
  const LOCALE_LABELS = { en: {}, es: {}, 'pt-BR': {}, de: {}, fr: {}, pl: {}, uk: {} };
  function text(value) { return String(value == null ? '' : value); }
  function digits(value) { return text(value).replace(/\D/g, ''); }
  function mask(value) { const raw = text(value); if (raw.length <= 6) return raw ? raw[0] + '…' : ''; return raw.slice(0, 3) + '…' + raw.slice(-4); }
  function field(label, value, detail) { return { label, value: text(value || 'not detected'), detail: detail || 'browser-local evidence' }; }
  function check(label, pass, passText, failText) { return { label, status: pass ? 'pass' : 'review', detail: pass ? passText : failText }; }
  function analyze(tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const digitCount = digits(raw).length;
    const hasCountryCue = raw.toUpperCase().includes(COUNTRY.iso2) || raw.toUpperCase().includes(COUNTRY.name.toUpperCase().split(' ')[0]);
    const ok = raw.length >= 4 && !/^invalid|wrong|zz\b/i.test(raw);
    const anatomy = [
      field('source payload', normalized || 'empty', 'browser-local source value'),
      field('normalized', normalized, 'local normalized value'),
      field('masked', mask(normalized), 'log-safe preview'),
      field('digit count', digitCount, 'parser input shape'),
      field('country cue', hasCountryCue ? COUNTRY.iso2 : 'not required', 'prefix/locality hint'),
      field('official boundary', 'offline only', 'live status remains outside this browser workbench')
    ];
    const result = {
      status: ok ? 'success' : 'review',
      headline: tool.code + ': ' + (ok ? 'Offline checks passed' : 'Review local evidence'),
      detail: ok ? COUNTRY.adjective + ' browser-only evidence is structurally coherent.' : 'Add a complete local value or compare against a valid fixture.',
      primary: normalized || 'empty',
      normalized,
      breakdownTitle: tool.name + ' anatomy & evidence breakdown',
      breakdownSummary: 'Segment-level local evidence, masking, country cues, and official-boundary notes for browser-only debugging.',
      breakdown: anatomy,
      fields: [
        field('normalized', normalized, 'local normalized value'),
        field('masked', mask(normalized), 'log-safe preview'),
        field('digit count', digitCount, 'parser input shape'),
        field('country cue', hasCountryCue ? COUNTRY.iso2 : 'not required', 'prefix/locality hint')
      ],
      checks: [
        check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        check(COUNTRY.adjective + ' evidence', ok, 'Local structural evidence detected.', 'Value needs local review.'),
        check('No network', true, 'No upload or registry call is made.'),
        check('Official boundary', true, 'Official status remains outside this browser workbench.')
      ],
      suggestions: ok
        ? [{ action: 'copy-normalized', label: 'Copy normalized value', detail: 'Use this local parser output in fixtures.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Compare pass/review states.' }]
        : [{ action: 'load-valid', label: 'Load valid fixture', detail: 'Compare against the success-first example.' }, { action: 'run-batch', label: 'Run sample batch', detail: 'Compare pass/review states.' }],
      developerJson: { suite: COUNTRY.slug + '-suite', tool: tool.id, status: ok ? 'success' : 'review', normalized, masked: mask(normalized), digitCount, boundary: 'offline only' }
    };
    result.developerJson.breakdown = result.breakdown;
    return result;
  }
  function mount() {
    const factory = window.ValidoHubCountrySuiteFactory;
    if (!factory) return false;
    const suite = factory.createSuite({
      suiteId: COUNTRY.slug + '-suite',
      country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective },
      theme: { accent: '#66CCFF', accent2: '#FCD116', accent3: '#111827' },
      tools: RAW_TOOLS,
      analyze
    });
    suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench'));
    window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite;
    return true;
  }
  function init() { if (mount()) return; setTimeout(init, 20); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
