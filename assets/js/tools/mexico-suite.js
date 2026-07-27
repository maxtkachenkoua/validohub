(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.mexico-suite';
  const RAW_TOOLS = [
  {
    "id": "mexico-curp-validator",
    "name": "Mexican CURP Validator",
    "code": "ID",
    "summary": "Validate local personal identifier shape, split visible evidence, and keep official identity status out of browser-only results.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE56123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 1",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Mexican CURP Validator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-rfc-validator",
    "name": "Mexican RFC Validator",
    "code": "ORG",
    "summary": "Inspect company or registry identifier shape, prefixes, local vocabulary, and official registry handoff boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "XAXX010101000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "XAXX01",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 2",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Mexican RFC Validator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-tax-id-inspector",
    "name": "Mexican SAT RFC / IVA Inspector",
    "code": "TAX",
    "summary": "Normalize tax identifier snippets, inspect local body evidence, and prepare official tax-authority handoff notes.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MX XAXX010101000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "MX XAXX0",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 3",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Mexican SAT RFC / IVA Inspector analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-company-onboarding-auditor",
    "name": "Mexican Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for identifier, address, banking, tax, and privacy readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 4",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Mexican Company Onboarding Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-business-register-readiness-helper",
    "name": "Mexican Business Registry Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated business registry lookup or filing workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "XAXX010101000 Av. Juarez 1,",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 5",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Mexican Business Registry Readiness Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-id-card-format-helper",
    "name": "Mexican ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE56123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 6",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Mexican ID Card Format Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-passport-mrz-parser",
    "name": "Mexican MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<MEXSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid P<MEXSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "P<MEXSAMPLE<<TEST",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ P<MEXSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 7",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Mexican MRZ / Passport Parser analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-domestic-bank-account-inspector",
    "name": "Mexican CLABE Inspector",
    "code": "BANK",
    "summary": "Inspect domestic bank account slices, routing blocks, account text, and payment-provider boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "002010077777777771",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 002010077777777771",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "002010077",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 002010077777777771",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 8",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Mexican CLABE Inspector analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-bic-swift-inspector",
    "name": "Mexican BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for cross-border banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDMX2X",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid ABCDMX2X",
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
        "value": "ZZ ABCDMX2X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 9",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Mexican BIC / SWIFT Inspector analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-payment-reference-helper",
    "name": "Mexican SPEI / CLABE Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SPEI / CLABE REF 2026-001 1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid SPEI / CLABE REF 2026-001 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "SPEI / CLABE REF 2",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ SPEI / CLABE REF 2026-001 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 10",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Mexican SPEI / CLABE Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-remittance-text-builder",
    "name": "Mexican Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, tax, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 MX XAXX010101000 1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Invoice 2026-001 MX XAXX010101000 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 MX X",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Invoice 2026-001 MX XAXX010101000 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 11",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Mexican Remittance Text Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-bank-statement-parser",
    "name": "Mexican Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1,234.56 MXN; 002010077777777771; sample counterparty",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 21/07/2026; 1,234.56 MXN; 002010077777777771; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1,234.56 MXN; 0020",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026; 1,234.56 MXN; 002010077777777771; sample counterparty",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 12",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Mexican Bank Statement Parser analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-currency-decimal-formatter",
    "name": "Mexican MXN Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize local amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 1,234.56 MXN",
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
        "value": "ZZ 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 13",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Mexican MXN Decimal Currency Formatter analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-postal-code-validator",
    "name": "Mexican codigo postal Validator",
    "code": "POST",
    "summary": "Validate postal/address locality shape, split locality hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "06000 Ciud",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 14",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Mexican codigo postal Validator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-address-normalizer",
    "name": "Mexican Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, locality, administrative area, postal code, and country lines for local forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 15",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Mexican Address Normalizer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-phone-number-validator",
    "name": "Mexican Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+52 55 1234 5678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid +52 55 1234 5678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+52 55 1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ +52 55 1234 5678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 16",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Mexican Phone Number Validator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-date-locale-formatter",
    "name": "Mexican Date Locale Formatter",
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
        "value": "MX review edge 17",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Mexican Date Locale Formatter analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-csv-locale-normalizer",
    "name": "Mexican CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id,amount,date,tax\\n1,1,234.56 MXN,21/07/2026,MX XAXX010101000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid id,amount,date,tax\\n1,1,234.56 MXN,21/07/2026,MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "id,amount,date,tax\\n1,1,234.",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ id,amount,date,tax\\n1,1,234.56 MXN,21/07/2026,MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 18",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Mexican CSV Locale Normalizer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-document-ocr-fixer",
    "name": "Mexican Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09 MX XAXX010101000 002010077777777771 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09 MX XAXX010101000 002010077777777771 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE561231HDFRRN09 MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09 MX XAXX010101000 002010077777777771 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 19",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Mexican Document OCR Fixer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-privacy-redaction-helper",
    "name": "Mexican Privacy Redaction Helper",
    "code": "PII",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 20",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Mexican Privacy Redaction Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-data-quality-workbench",
    "name": "Mexican Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 21",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Mexican Data Quality Workbench analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-api-payload-auditor",
    "name": "Mexican API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, banking, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 22",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Mexican API Payload Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-state-province-code-mapper",
    "name": "Mexican State / Province Code Mapper",
    "code": "AREA",
    "summary": "Map local administrative area labels, abbreviations, and address payload hints for browser-only form routing.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "area",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 23",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AREA local evidence",
        "text": "Mexican State / Province Code Mapper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-locality-autocomplete-fixture-builder",
    "name": "Mexican Locality Autocomplete Fixture Builder",
    "code": "CITY",
    "summary": "Build country-local city, district, postal, and address fixtures for autocomplete QA without live geocoding.",
    "category": "address",
    "actionLabel": "Generate",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 24",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CITY local evidence",
        "text": "Mexican Locality Autocomplete Fixture Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-government-form-field-normalizer",
    "name": "Mexican Government Form Field Normalizer",
    "code": "FORM",
    "summary": "Normalize local government-form labels, identifier fields, dates, and address lines before portal handoff.",
    "category": "government",
    "actionLabel": "Normalize",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 25",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Mexican Government Form Field Normalizer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-tax-invoice-field-auditor",
    "name": "Mexican Tax Invoice Field Auditor",
    "code": "INV",
    "summary": "Audit invoice snippets for local tax IDs, currency, address, date, line totals, and official filing boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 MX XAXX010101000 1,234.56 MXN Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Invoice 2026-001 MX XAXX010101000 1,234.56 MXN Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 MX XAXX010101000 1,234.5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Invoice 2026-001 MX XAXX010101000 1,234.56 MXN Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 26",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Mexican Tax Invoice Field Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-sales-tax-vat-threshold-checklist",
    "name": "Mexican Sales Tax / VAT Threshold Checklist",
    "code": "THR",
    "summary": "Inspect revenue, registration, local tax labels, and threshold handoff notes without making legal conclusions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "checklist",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 27",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "THR local evidence",
        "text": "Mexican Sales Tax / VAT Threshold Checklist analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-withholding-tax-form-helper",
    "name": "Mexican Withholding Tax Form Helper",
    "code": "WHT",
    "summary": "Prepare local withholding-tax form evidence, payee IDs, dates, amounts, and review notes for finance teams.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "tax",
    "samples": [
      {
        "label": "Valid sample",
        "value": "XAXX010101000 1,234.56 MXN 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid XAXX010101000 1,234.56 MXN 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "XAXX010101000 1,2",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ XAXX010101000 1,234.56 MXN 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 28",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "WHT local evidence",
        "text": "Mexican Withholding Tax Form Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-customs-import-code-inspector",
    "name": "Mexican Customs / Import Code Inspector",
    "code": "CUS",
    "summary": "Inspect customs references, importer IDs, invoice fields, currency, and shipment handoff evidence.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "XAXX010101000 IMPORT 2026 1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid XAXX010101000 IMPORT 2026 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "XAXX010101000 IMPO",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ XAXX010101000 IMPORT 2026 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 29",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUS local evidence",
        "text": "Mexican Customs / Import Code Inspector analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-payroll-id-intake-helper",
    "name": "Mexican Payroll ID Intake Helper",
    "code": "PAYR",
    "summary": "Check employee intake payloads for local personal IDs, tax IDs, dates, address, and privacy-safe masking.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "payroll",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09 21/07/2026 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09 21/07/2026 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE561231HDFRRN09 21/07/2026 Av. ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09 21/07/2026 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 30",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAYR local evidence",
        "text": "Mexican Payroll ID Intake Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-benefits-social-number-redaction",
    "name": "Mexican Benefits / Social Number Redaction Helper",
    "code": "BEN",
    "summary": "Mask local social, benefits, tax, phone, and address evidence before logs, tickets, or screenshots.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09 +52 55 1234 5678 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09 +52 55 1234 5678 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE561231HDFRRN09 +52 55 1234 5678 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09 +52 55 1234 5678 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 31",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BEN local evidence",
        "text": "Mexican Benefits / Social Number Redaction Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-business-license-checklist",
    "name": "Mexican Business License Checklist",
    "code": "LIC",
    "summary": "Audit local business-license intake evidence, registry IDs, addresses, tax labels, and official lookup boundaries.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "XAXX010101000 MX XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid XAXX010101000 MX XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "XAXX010101000 MX XAXX010101000 Av.",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ XAXX010101000 MX XAXX010101000 Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 32",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "LIC local evidence",
        "text": "Mexican Business License Checklist analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-ownership-kyb-payload-auditor",
    "name": "Mexican Ownership / KYB Payload Auditor",
    "code": "KYB",
    "summary": "Inspect KYB payloads for company IDs, beneficial-owner fields, addresses, dates, and masked evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 33",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYB local evidence",
        "text": "Mexican Ownership / KYB Payload Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-sanctions-screening-payload-helper",
    "name": "Mexican Sanctions Screening Payload Helper",
    "code": "SCRN",
    "summary": "Prepare offline screening payloads with names, addresses, identifiers, and no false match-status claims.",
    "category": "privacy",
    "actionLabel": "Inspect",
    "kind": "screening",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 34",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SCRN local evidence",
        "text": "Mexican Sanctions Screening Payload Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-bank-routing-handoff-checklist",
    "name": "Mexican Bank Routing Handoff Checklist",
    "code": "ROUT",
    "summary": "Check routing, account, branch, currency, payment reference, and provider-boundary fields before bank handoff.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "002010077777777771 1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 002010077777777771 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "00201007777777",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 002010077777777771 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 35",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ROUT local evidence",
        "text": "Mexican Bank Routing Handoff Checklist analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-payout-recipient-validator",
    "name": "Mexican Payout Recipient Validator",
    "code": "OUT",
    "summary": "Inspect payout recipient payloads for local name, account, tax, phone, address, currency, and retry-safe evidence.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 36",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OUT local evidence",
        "text": "Mexican Payout Recipient Validator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-refund-reference-builder",
    "name": "Mexican Refund Reference Builder",
    "code": "REF",
    "summary": "Build local refund references from invoice, customer, payment, amount, and reconciliation fields.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Refund 2026-001 XAXX010101000 1,234.56 MXN",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Refund 2026-001 XAXX010101000 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Refund 2026-001 XAX",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Refund 2026-001 XAXX010101000 1,234.56 MXN",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 37",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REF local evidence",
        "text": "Mexican Refund Reference Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-chargeback-evidence-pack-helper",
    "name": "Mexican Chargeback Evidence Pack Helper",
    "code": "CBK",
    "summary": "Organize browser-only payment, invoice, address, date, and customer evidence for dispute workflows.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 38",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CBK local evidence",
        "text": "Mexican Chargeback Evidence Pack Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-ecommerce-checkout-locale-auditor",
    "name": "Mexican Ecommerce Checkout Locale Auditor",
    "code": "SHOP",
    "summary": "Audit checkout payloads for local address, phone, postal, currency, date, and tax-field assumptions.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 39",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SHOP local evidence",
        "text": "Mexican Ecommerce Checkout Locale Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-shipping-label-normalizer",
    "name": "Mexican Shipping Label Normalizer",
    "code": "SHIP",
    "summary": "Normalize local shipping-label blocks, recipient names, postal/locality fields, phone, and delivery notes.",
    "category": "logistics",
    "actionLabel": "Normalize",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico +52 55 1234 5678",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico +52 55 1234 5678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro, 06000 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico +52 55 1234 5678",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 40",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SHIP local evidence",
        "text": "Mexican Shipping Label Normalizer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-customs-address-line-helper",
    "name": "Mexican Customs Address Line Helper",
    "code": "ADR2",
    "summary": "Split exporter/importer address lines, locality, postal data, country code, and customs-safe payloads.",
    "category": "logistics",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 41",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADR2 local evidence",
        "text": "Mexican Customs Address Line Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-vehicle-registration-format-helper",
    "name": "Mexican Vehicle Registration Format Helper",
    "code": "VEH",
    "summary": "Inspect vehicle-registration snippets, plate shapes, region hints, and official transport boundary notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABC-123-D",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid ABC-123-D",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "ABC-1",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ ABC-123-D",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 42",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Mexican Vehicle Registration Format Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-driver-license-format-helper",
    "name": "Mexican Driver License Format Helper",
    "code": "DL",
    "summary": "Inspect driving-license snippets, dates, document numbers, and privacy-safe evidence for transport intake.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE561231HDFR",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 43",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Mexican Driver License Format Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-utility-bill-address-proof-auditor",
    "name": "Mexican Utility Bill Address Proof Auditor",
    "code": "BILL",
    "summary": "Audit utility-bill OCR text for names, dates, address lines, account numbers, and masked support evidence.",
    "category": "documents",
    "actionLabel": "Audit",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Av. Juarez 1, Centro, 06000 Ciudad de Mexico 21/07/2026",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Av. Juarez 1, Centro, 06000 Ciudad de Mexico 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Av. Juarez 1, Centro, 060",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Av. Juarez 1, Centro, 06000 Ciudad de Mexico 21/07/2026",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 44",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BILL local evidence",
        "text": "Mexican Utility Bill Address Proof Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-kyc-document-bundle-auditor",
    "name": "Mexican KYC Document Bundle Auditor",
    "code": "DOCS",
    "summary": "Check KYC document bundles for local ID, tax, address, date, file labels, and official-boundary notes.",
    "category": "documents",
    "actionLabel": "Audit",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 45",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DOCS local evidence",
        "text": "Mexican KYC Document Bundle Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-invoice-number-format-helper",
    "name": "Mexican Invoice Number Format Helper",
    "code": "NUM",
    "summary": "Normalize invoice-number patterns, series, date fragments, counterparty hints, and duplicate-risk notes.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-001 XAXX010101000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid INV-2026-001 XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-001",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ INV-2026-001 XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 46",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Mexican Invoice Number Format Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-receipt-tax-line-parser",
    "name": "Mexican Receipt Tax Line Parser",
    "code": "RCT",
    "summary": "Parse receipt text for tax labels, totals, currency, dates, and local decimal/grouping evidence.",
    "category": "tax",
    "actionLabel": "Parse",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026 1,234.56 MXN MX XAXX010101000",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid 21/07/2026 1,234.56 MXN MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026 1,234.5",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ 21/07/2026 1,234.56 MXN MX XAXX010101000",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 47",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RCT local evidence",
        "text": "Mexican Receipt Tax Line Parser analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-phone-extension-normalizer",
    "name": "Mexican Phone Extension Normalizer",
    "code": "EXT",
    "summary": "Normalize local phone numbers with extension, country prefix, national blocks, and CRM-safe output.",
    "category": "address",
    "actionLabel": "Normalize",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+52 55 1234 5678 ext 123",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid +52 55 1234 5678 ext 123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "+52 55 1234",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ +52 55 1234 5678 ext 123",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 48",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EXT local evidence",
        "text": "Mexican Phone Extension Normalizer analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-timezone-business-hours-helper",
    "name": "Mexican Business Hours / Time Zone Helper",
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
        "value": "MX review edge 49",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TZ local evidence",
        "text": "Mexican Business Hours / Time Zone Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-holiday-calendar-fixture-builder",
    "name": "Mexican Holiday Calendar Fixture Builder",
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
        "value": "MX review edge 50",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Mexican Holiday Calendar Fixture Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-name-parser-transliteration-helper",
    "name": "Mexican Name Parser / Transliteration Helper",
    "code": "NAME",
    "summary": "Split local personal/company names, accents, casing, transliteration, and search-key fixtures.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "text",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Mexican Sample Name",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid Mexican Sample Name",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "Mexican S",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ Mexican Sample Name",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 51",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NAME local evidence",
        "text": "Mexican Name Parser / Transliteration Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-email-domain-locality-checker",
    "name": "Mexican Email Domain Locality Checker",
    "code": "MAIL",
    "summary": "Inspect email/domain strings for local TLD hints, plus addressing, masking, and no-deliverability boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "email",
    "samples": [
      {
        "label": "Valid sample",
        "value": "test@example.MX",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid test@example.MX",
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
        "value": "ZZ test@example.MX",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 52",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MAIL local evidence",
        "text": "Mexican Email Domain Locality Checker analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-form-autofill-fixture-generator",
    "name": "Mexican Form Autofill Fixture Generator",
    "code": "AUTO",
    "summary": "Generate browser-only local form fixtures for IDs, tax, phone, postal, address, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 53",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUTO local evidence",
        "text": "Mexican Form Autofill Fixture Generator analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-webhook-local-payload-fixture",
    "name": "Mexican Webhook Local Payload Fixture",
    "code": "HOOK",
    "summary": "Build webhook payload fixtures with local IDs, tax, currency, dates, masked fields, and replay metadata.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 54",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HOOK local evidence",
        "text": "Mexican Webhook Local Payload Fixture analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-graphql-input-auditor",
    "name": "Mexican GraphQL Input Auditor",
    "code": "GQL",
    "summary": "Audit GraphQL-style input objects for local identifiers, tax fields, dates, amounts, and nullable hazards.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 55",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GQL local evidence",
        "text": "Mexican GraphQL Input Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-openapi-country-schema-helper",
    "name": "Mexican OpenAPI Country Schema Helper",
    "code": "OAS",
    "summary": "Draft and inspect OpenAPI schema snippets for local identifiers, address, phone, payment, and tax fields.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 56",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OAS local evidence",
        "text": "Mexican OpenAPI Country Schema Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-sql-seed-data-builder",
    "name": "Mexican SQL Seed Data Builder",
    "code": "SQL",
    "summary": "Build local seed-data rows for identifiers, tax, address, phone, amount, and bank fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 57",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SQL local evidence",
        "text": "Mexican SQL Seed Data Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-json-schema-local-rules-helper",
    "name": "Mexican JSON Schema Local Rules Helper",
    "code": "JSON",
    "summary": "Inspect JSON Schema rules for local field names, patterns, examples, and official-boundary copy.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 58",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Mexican JSON Schema Local Rules Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-test-case-matrix-builder",
    "name": "Mexican Test Case Matrix Builder",
    "code": "CASE",
    "summary": "Generate valid, invalid, short, wrong-country, masking, and boundary test-case matrices for local workflows.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 59",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CASE local evidence",
        "text": "Mexican Test Case Matrix Builder analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-data-retention-policy-helper",
    "name": "Mexican Data Retention Policy Helper",
    "code": "RET",
    "summary": "Organize local retention, masking, audit-log, and deletion checklist fields without giving legal advice.",
    "category": "privacy",
    "actionLabel": "Audit",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"c",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ {\"country\":\"MX\",\"rfc\":\"XAXX010101000\",\"clabe\":\"002010077777777771\",\"amount\":\"1,234.56\"}",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 60",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Mexican Data Retention Policy Helper analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
    "id": "mexico-accessibility-form-label-auditor",
    "name": "Mexican Accessibility Form Label Auditor",
    "code": "A11Y",
    "summary": "Audit local form labels, autocomplete names, error copy, and screen-reader hints for identifier workflows.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "GODE561231HDFRRN09 06000 Ciudad de Mexico",
        "intent": "valid",
        "tone": "success"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid GODE561231HDFRRN09 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Short sample",
        "value": "GODE561231HDFRRN09 ",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Wrong country sample",
        "value": "ZZ GODE561231HDFRRN09 06000 Ciudad de Mexico",
        "intent": "review",
        "tone": "review"
      },
      {
        "label": "Edge sample",
        "value": "MX review edge 61",
        "intent": "review",
        "tone": "review"
      }
    ],
    "boundaries": [
      "Official Mexico identity, registry, tax, banking, postal, filing, and legal status require the responsible authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "A11Y local evidence",
        "text": "Mexican Accessibility Form Label Auditor analyzes Mexico-specific evidence locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline parser evidence does not prove official Mexico status."
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
  "slug": "mexico",
  "name": "Mexico",
  "adjective": "Mexican",
  "iso2": "MX",
  "theme": [
    "#006341",
    "#FFFFFF",
    "#CE1126"
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

  const CURP_STATE_CODES = {
    AS: 'Aguascalientes', BC: 'Baja California', BS: 'Baja California Sur', CC: 'Campeche',
    CL: 'Coahuila', CM: 'Colima', CS: 'Chiapas', CH: 'Chihuahua', DF: 'Ciudad de Mexico / former Distrito Federal',
    DG: 'Durango', GT: 'Guanajuato', GR: 'Guerrero', HG: 'Hidalgo', JC: 'Jalisco',
    MC: 'Mexico state', MN: 'Michoacan', MS: 'Morelos', NT: 'Nayarit', NL: 'Nuevo Leon',
    OC: 'Oaxaca', PL: 'Puebla', QT: 'Queretaro', QR: 'Quintana Roo', SP: 'San Luis Potosi',
    SL: 'Sinaloa', SR: 'Sonora', TC: 'Tabasco', TS: 'Tamaulipas', TL: 'Tlaxcala',
    VZ: 'Veracruz', YN: 'Yucatan', ZS: 'Zacatecas', NE: 'Born abroad / foreign'
  };
  const CURP_ALPHABET = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  const CURP_FIXTURES = {
    valid: 'GODE561231HDFRRN00',
    grouped: 'GODE 561231 HDF RRN 00',
    invalid: 'GODE561231HDFRRN09',
    short: 'GODE561231HDF',
    badState: 'GODE561231HXXRRN09',
    future: 'GODE991332HDFRRN09'
  };

  function curpNormalize(value) {
    return text(value).toUpperCase().replace(/\s+/g, '').replace(/-/g, '').replace(/[^A-ZÑ0-9]/g, '');
  }

  function curpCharValue(char) {
    return CURP_ALPHABET.indexOf(char);
  }

  function curpExpectedCheck(first17) {
    const body = curpNormalize(first17).slice(0, 17);
    let sum = 0;
    for (let index = 0; index < 17; index += 1) {
      const value = curpCharValue(body[index]);
      if (value < 0) return null;
      sum += value * (18 - index);
    }
    return String((10 - (sum % 10)) % 10);
  }

  function curpCentury(homoclave) {
    return /[A-Z]/.test(homoclave) ? 2000 : 1900;
  }

  function curpDateParts(value, homoclave) {
    const year2 = Number(value.slice(4, 6));
    const month = Number(value.slice(6, 8));
    const day = Number(value.slice(8, 10));
    const year = curpCentury(homoclave) + year2;
    const date = new Date(Date.UTC(year, month - 1, day));
    const valid = month >= 1 && month <= 12 && day >= 1 && day <= 31 &&
      date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
    return { year2, year, month, day, valid, iso: valid ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 'invalid date' };
  }

  function curpAge(dateInfo) {
    if (!dateInfo.valid) return null;
    const now = new Date();
    let age = now.getUTCFullYear() - dateInfo.year;
    const monthNow = now.getUTCMonth() + 1;
    const dayNow = now.getUTCDate();
    if (monthNow < dateInfo.month || (monthNow === dateInfo.month && dayNow < dateInfo.day)) age -= 1;
    return age;
  }

  function analyzeCurp(value) {
    const normalized = curpNormalize(value);
    const chars = normalized.split('');
    const shapeOk = /^[A-ZÑ]{4}\d{6}[HM][A-Z]{2}[A-ZÑ]{3}[A-Z0-9]\d$/.test(normalized);
    const homoclave = chars[16] || '';
    const check = chars[17] || '';
    const dateInfo = normalized.length >= 17 ? curpDateParts(normalized, homoclave) : { valid: false, iso: 'missing date' };
    const state = normalized.slice(11, 13);
    const expected = normalized.length >= 17 ? curpExpectedCheck(normalized.slice(0, 17)) : null;
    const checksumOk = expected != null && check === expected;
    const stateOk = Object.prototype.hasOwnProperty.call(CURP_STATE_CODES, state);
    const sex = chars[10] === 'H' ? 'Male marker (H)' : chars[10] === 'M' ? 'Female marker (M)' : 'Unknown';
    const diagnostics = [];
    if (!normalized) diagnostics.push('Paste a CURP or load a safe fixture.');
    if (normalized && normalized.length !== 18) diagnostics.push('CURP must be exactly 18 alphanumeric characters after removing display spaces.');
    if (normalized && !shapeOk) diagnostics.push('CURP shape should be LLLL YYMMDD H/M state internal-consonants homoclave digit.');
    if (normalized.length >= 13 && !stateOk) diagnostics.push('State code is not one of the recognized CURP entidad codes.');
    if (normalized.length >= 10 && !dateInfo.valid) diagnostics.push('Birth date segment is not a valid calendar date.');
    if (normalized.length >= 18 && !checksumOk) diagnostics.push(`Check digit mismatch: expected ${expected == null ? 'n/a' : expected}, got ${check || 'missing'}.`);
    const valid = normalized.length === 18 && shapeOk && dateInfo.valid && stateOk && checksumOk;
    const fields = [
      ['Initial block', normalized.slice(0, 4) || 'missing', 'First surname letter/vowel, second surname letter, given-name letter.'],
      ['Birth date', dateInfo.iso, 'YYMMDD with century inferred from homoclave character.'],
      ['Age estimate', dateInfo.valid ? String(curpAge(dateInfo)) : 'n/a', 'Calendar estimate from decoded birth date; not identity proof.'],
      ['Sex marker', chars[10] || 'missing', sex],
      ['Birth entity', state || 'missing', stateOk ? CURP_STATE_CODES[state] : 'Unknown CURP state code.'],
      ['Internal consonants', normalized.slice(13, 16) || 'missing', 'First internal consonants from surname/name components.'],
      ['Homoclave', homoclave || 'missing', /[A-Z]/.test(homoclave) ? 'Usually indicates 2000+ century collision/deduplication space.' : 'Usually numeric for 1900s registrations.'],
      ['Check digit', check || 'missing', expected == null ? 'Expected digit unavailable.' : `Expected ${expected} from RENAPO-style weighted replay.`]
    ];
    const checks = [
      ['Input present', normalized.length > 0, normalized ? 'Input normalized locally.' : 'No CURP input yet.'],
      ['Length', normalized.length === 18, `${normalized.length}/18 characters.`],
      ['Shape', shapeOk, 'Four letters, six date digits, sex, state, consonants, homoclave, digit.'],
      ['Calendar date', dateInfo.valid, dateInfo.iso],
      ['State code', stateOk, stateOk ? `${state} - ${CURP_STATE_CODES[state]}` : `${state || 'missing'} is not recognized.`],
      ['Check digit', checksumOk, expected == null ? 'No replay yet.' : `Expected ${expected}; provided ${check || 'missing'}.`],
      ['Official boundary', true, 'Local pass does not prove RENAPO assignment, active status, identity, or ownership.']
    ];
    return { normalized, valid, shapeOk, dateInfo, state, stateOk, sex, homoclave, check, expected, fields, checks, diagnostics };
  }

  function curpDeveloperJson(report) {
    return {
      tool: 'mexico-curp-validator',
      goldProfile: 'Mexico CURP',
      version: '2026-07-26-curp-gold-v1',
      status: report.valid ? 'pass' : 'review',
      normalized: report.normalized,
      masked: mask(report.normalized),
      date: report.dateInfo.iso,
      sex: report.sex,
      stateCode: report.state,
      stateName: report.stateOk ? CURP_STATE_CODES[report.state] : null,
      homoclave: report.homoclave || null,
      checkDigit: { provided: report.check || null, expected: report.expected, valid: report.expected != null && report.check === report.expected },
      diagnostics: report.diagnostics,
      localBoundary: 'Browser-only CURP structure, date, state-code, and check-digit evidence. RENAPO assignment/status and identity proof require official systems.'
    };
  }

  function curpGenerate(options) {
    const initials = curpNormalize(options.initials || 'GODE').padEnd(4, 'X').slice(0, 4).replace(/[0-9]/g, 'X');
    const date = String(options.date || '1956-12-31').replace(/-/g, '');
    const year = Number(date.slice(0, 4));
    const bodyDate = `${String(year).slice(-2)}${date.slice(4, 8)}`;
    const sex = /M/i.test(options.sex || '') ? 'M' : 'H';
    const state = CURP_STATE_CODES[curpNormalize(options.state || 'DF').slice(0, 2)] ? curpNormalize(options.state || 'DF').slice(0, 2) : 'DF';
    const consonants = curpNormalize(options.consonants || 'RRN').padEnd(3, 'X').slice(0, 3).replace(/[0-9]/g, 'X');
    const homoclave = year >= 2000 ? 'A' : '0';
    const first17 = `${initials}${bodyDate}${sex}${state}${consonants}${homoclave}`;
    return first17 + curpExpectedCheck(first17);
  }

  function curpEsc(value) {
    return text(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function mountCurpGold(root) {
    const slug = location.pathname.split('/').filter(Boolean).pop();
    if (slug !== 'mexico-curp-validator' || !root || root.dataset.curpGoldMounted === 'true') return false;
    root.dataset.curpGoldMounted = 'true';
    root.classList.add('mx-curp-host');
    root.innerHTML = `
      <section class="mx-curp-lab" data-gold-lab data-curp-gold>
        <div class="mx-curp-head">
          <div>
            <span class="mx-curp-kicker">Gold Browser Lab</span>
            <h2>Mexico CURP Workbench</h2>
            <p>Validate, decode, generate safe fixtures, replay the check digit, inspect date/state anatomy, and export developer evidence without calling RENAPO.</p>
          </div>
          <div class="mx-curp-badges"><span>Browser-only</span><span>RENAPO boundary</span><span>Fixture-safe</span></div>
        </div>
        <div class="mx-curp-source-row">
          <a href="https://www.gob.mx/segob/renapo/articulos/sabes-como-se-conforma-tu-curp?idiom=es" target="_blank" rel="noopener">RENAPO CURP composition</a>
          <a href="https://www.gob.mx/tramites/ficha/asignacion-de-curp/RENAPO8836" target="_blank" rel="noopener">gob.mx CURP assignment</a>
          <a href="https://www.gob.mx/segob/acciones-y-programas/clave-unica-de-registro-de-poblacion-curp" target="_blank" rel="noopener">SEGOB CURP boundary</a>
        </div>
        <div class="mx-curp-grid">
          <div class="mx-curp-input">
            <div class="mx-curp-samples">
              <button type="button" data-curp-sample="valid">Valid fixture</button>
              <button type="button" data-curp-sample="grouped">Grouped fixture</button>
              <button type="button" data-curp-sample="invalid">Bad digit</button>
              <button type="button" data-curp-sample="short">Short</button>
              <button type="button" data-curp-sample="badState">Bad state</button>
              <button type="button" data-curp-action="batch">Batch replay</button>
            </div>
            <label class="mx-curp-field"><span>CURP input</span><input data-curp-input value="${CURP_FIXTURES.valid}" spellcheck="false"></label>
            <section class="mx-curp-generator">
              <div><span class="mx-curp-mini">Safe fixture generator</span><strong>Build a structural CURP</strong></div>
              <div class="mx-curp-generator-grid">
                <label><span>Initial block</span><input data-curp-gen="initials" value="GODE" maxlength="4"></label>
                <label><span>Date</span><input data-curp-gen="date" type="date" value="1956-12-31" placeholder="YYYY-MM-DD"></label>
                <label><span>Sex</span><input type="hidden" data-curp-gen="sex" value="H"><div class="mx-curp-sex-toggle" role="group" aria-label="CURP sex marker"><button type="button" class="is-active" data-curp-sex="H">H</button><button type="button" data-curp-sex="M">M</button></div></label>
                <label><span>State</span><select data-curp-gen="state">${Object.keys(CURP_STATE_CODES).map((code) => `<option value="${code}"${code === 'DF' ? ' selected' : ''}>${code} - ${CURP_STATE_CODES[code]}</option>`).join('')}</select></label>
                <label><span>Consonants</span><input data-curp-gen="consonants" value="RRN" maxlength="3"></label>
              </div>
            </section>
            <div class="mx-curp-actions">
              <button type="button" class="mx-curp-primary" data-curp-action="generate">Generate safe CURP</button>
              <button type="button" data-curp-action="validate">Validate</button>
              <button type="button" data-curp-action="copy">Copy developer JSON</button>
              <button type="button" data-curp-action="clear">Clear</button>
            </div>
          </div>
          <div class="mx-curp-output" data-curp-output></div>
        </div>
      </section>`;
    injectCurpGoldStyles();
    const input = root.querySelector('[data-curp-input]');
    const output = root.querySelector('[data-curp-output]');
    let lastReport = null;
    function renderCurrent(batch) {
      lastReport = analyzeCurp(input.value);
      output.innerHTML = renderCurpOutput(lastReport, batch);
    }
    function copyDeveloperJson(action) {
      const json = JSON.stringify(curpDeveloperJson(lastReport || analyzeCurp(input.value)), null, 2);
      const fallback = () => {
        const field = document.createElement('textarea');
        field.value = json;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        field.remove();
      };
      const markCopied = () => {
        action.textContent = 'Copied JSON';
        setTimeout(() => { action.textContent = 'Copy developer JSON'; }, 1200);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(json).then(markCopied).catch(() => {
          fallback();
          markCopied();
        });
      } else {
        fallback();
        markCopied();
      }
    }
    root.addEventListener('click', function (event) {
      const sample = event.target.closest('[data-curp-sample]');
      const action = event.target.closest('[data-curp-action]');
      const sex = event.target.closest('[data-curp-sex]');
      if (sample) {
        input.value = CURP_FIXTURES[sample.dataset.curpSample] || CURP_FIXTURES.valid;
        renderCurrent();
        return;
      }
      if (sex) {
        const sexField = root.querySelector('[data-curp-gen="sex"]');
        if (sexField) sexField.value = sex.dataset.curpSex;
        root.querySelectorAll('[data-curp-sex]').forEach((button) => button.classList.toggle('is-active', button === sex));
        return;
      }
      if (!action) return;
      if (action.dataset.curpAction === 'generate') {
        const values = {};
        root.querySelectorAll('[data-curp-gen]').forEach((field) => { values[field.dataset.curpGen] = field.value; });
        input.value = curpGenerate(values);
        renderCurrent();
      } else if (action.dataset.curpAction === 'validate') {
        renderCurrent();
      } else if (action.dataset.curpAction === 'clear') {
        input.value = '';
        renderCurrent();
      } else if (action.dataset.curpAction === 'batch') {
        const batch = Object.entries(CURP_FIXTURES).map(([label, value]) => ({ label, report: analyzeCurp(value) }));
        input.value = CURP_FIXTURES.valid;
        renderCurrent(batch);
      } else if (action.dataset.curpAction === 'copy') {
        copyDeveloperJson(action);
      }
    });
    input.addEventListener('input', () => renderCurrent());
    renderCurrent();
    return true;
  }

  function renderCurpOutput(report, batch) {
    const json = curpDeveloperJson(report);
    return `
      <div class="mx-curp-status ${report.valid ? 'is-ok' : 'is-review'}"><span>${report.valid ? 'Local checks passed' : 'Review needed'}</span><strong>${curpEsc(report.normalized || 'empty')}</strong><p>${report.valid ? 'CURP structure, date, state code, and check digit agree locally.' : curpEsc(report.diagnostics[0] || 'Fix the CURP before using it as a fixture.')}</p></div>
      <div class="mx-curp-cards">${report.checks.map((item) => `<article class="${item[1] ? 'ok' : 'review'}"><span>${curpEsc(item[0])}</span><strong>${item[1] ? 'PASS' : 'REVIEW'}</strong><p>${curpEsc(item[2])}</p></article>`).join('')}</div>
      <section class="mx-curp-section"><div class="mx-curp-title">CURP Anatomy</div><div class="mx-curp-fields">${report.fields.map((item) => `<div><span>${curpEsc(item[0])}</span><strong>${curpEsc(item[1])}</strong><p>${curpEsc(item[2])}</p></div>`).join('')}</div></section>
      <section class="mx-curp-section"><div class="mx-curp-title">Check Digit Replay</div><div class="mx-curp-replay"><div><span>First 17 chars</span><code>${curpEsc(report.normalized.slice(0, 17) || 'n/a')}</code></div><div><span>Expected digit</span><strong>${curpEsc(report.expected == null ? 'n/a' : report.expected)}</strong></div><div><span>Provided digit</span><strong>${curpEsc(report.check || 'missing')}</strong></div><div><span>Status</span><strong class="${report.expected != null && report.check === report.expected ? 'ok' : 'review'}">${report.expected != null && report.check === report.expected ? 'Match' : 'Mismatch'}</strong></div></div></section>
      ${batch ? `<section class="mx-curp-section"><div class="mx-curp-title">Batch Replay</div><div class="mx-curp-batch">${batch.map((item) => `<span class="${item.report.valid ? 'ok' : 'review'}">${curpEsc(item.label)}: ${item.report.valid ? 'PASS' : 'REVIEW'}</span>`).join('')}</div></section>` : ''}
      <section class="mx-curp-section mx-curp-traps"><div class="mx-curp-title">Integration Traps</div><ul><li>Do not treat a local CURP pass as proof that RENAPO assigned the key, that the person exists, or that identity was verified.</li><li>Keep display grouping separate from the stored normalized 18-character value; spaces and hyphens are UI-only.</li><li>Validate the decoded date and state code before accepting a checksum pass, because checksum alone can still preserve bad semantics.</li><li>Keep bad-digit, short, bad-state, and invalid-date fixtures in automated tests.</li><li>Mask CURP values in logs, analytics, crash reports, screenshots, and support tickets.</li></ul></section>
      <section class="mx-curp-section mx-curp-sources"><div class="mx-curp-title">Official Sources And Boundary</div><p>This browser lab follows the public CURP composition model: four-letter name block, YYMMDD birth date, sex marker, two-letter birth entity, internal consonants, homoclave/control position, and final check digit. It is intentionally limited to local evidence that helps developers build fixtures, normalize form input, debug bad digits, and explain why a value is rejected.</p><p>RENAPO assignment, correction, official status, identity proof, and person existence remain outside this page and require Mexican government systems. A local pass is useful test evidence, not an official registry result.</p></section>
      <section class="mx-curp-section"><div class="mx-curp-title mx-curp-title-row"><span>Developer Snapshot</span><button type="button" data-curp-action="copy">Copy developer JSON</button></div><pre><code>${curpEsc(JSON.stringify(json, null, 2))}</code></pre></section>`;
  }

  function injectCurpGoldStyles() {
    if (document.getElementById('mx-curp-gold-styles')) return;
    const style = document.createElement('style');
    style.id = 'mx-curp-gold-styles';
    style.textContent = `.mx-curp-host{max-width:100%;overflow:hidden}.mx-curp-lab,.mx-curp-lab *{box-sizing:border-box}.mx-curp-lab{--mx-green:#006341;--mx-red:#ce1126;--mx-soft:#f8fafc;display:flex;flex-direction:column;gap:18px;max-width:100%;overflow:hidden;color:#111827;padding:18px}.mx-curp-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;border:1px solid #dbe7df;border-radius:16px;padding:20px;background:linear-gradient(135deg,#fff,#f8fffb 60%,#fff5f5);box-shadow:0 18px 48px rgba(15,23,42,.07)}.mx-curp-kicker,.mx-curp-mini{display:block;font-size:.7rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--mx-green)}.mx-curp-head h2{font-size:1.35rem;margin:.25rem 0}.mx-curp-head p{margin:0;color:#64748b;max-width:780px}.mx-curp-badges,.mx-curp-source-row,.mx-curp-samples,.mx-curp-actions,.mx-curp-batch{display:flex;flex-wrap:wrap;gap:8px}.mx-curp-actions{margin-top:18px;align-items:center}.mx-curp-badges span,.mx-curp-source-row a,.mx-curp-samples button,.mx-curp-actions button,.mx-curp-title-row button{border:1px solid #dbe7df;border-radius:999px;background:#fff;padding:8px 11px;font-weight:850;color:#334155;text-decoration:none;transition:box-shadow .16s ease,border-color .16s ease,background-color .16s ease,color .16s ease}.mx-curp-source-row a{color:#0f766e}.mx-curp-source-row a:hover,.mx-curp-samples button:hover,.mx-curp-actions button:hover,.mx-curp-title-row button:hover{border-color:#94d3bd;background:#f8fffb;color:var(--mx-green);box-shadow:inset 0 0 0 1px rgba(0,99,65,.18),0 4px 14px rgba(15,23,42,.08)}.mx-curp-source-row a:focus-visible,.mx-curp-samples button:focus-visible,.mx-curp-actions button:focus-visible,.mx-curp-title-row button:focus-visible,.mx-curp-sex-toggle button:focus-visible{outline:0;box-shadow:inset 0 0 0 3px rgba(37,99,235,.24)}.mx-curp-grid{display:flex;flex-direction:column;gap:18px;max-width:100%;min-width:0}.mx-curp-input,.mx-curp-output{width:100%;min-width:0;max-width:100%;overflow:hidden}.mx-curp-output{display:flex;flex-direction:column;gap:18px}.mx-curp-field{display:flex;flex-direction:column;gap:6px;margin:14px 0}.mx-curp-field span,.mx-curp-generator label span{font-size:.72rem;font-weight:850;color:#64748b}.mx-curp-field input,.mx-curp-generator input,.mx-curp-generator select{width:100%;min-width:0;border:1px solid #dbe3ef;border-radius:12px;padding:13px 14px;color:#0f172a;background:#fff;font:750 .92rem ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase}.mx-curp-generator{border:1px solid #e2e8f0;border-radius:14px;padding:16px;background:linear-gradient(180deg,#fff,#f8fafc)}.mx-curp-generator strong{display:block;margin-top:3px}.mx-curp-generator-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-top:12px}.mx-curp-generator label{grid-column:span 2;min-width:0;display:flex;flex-direction:column;gap:5px}.mx-curp-generator label:nth-child(4),.mx-curp-generator label:nth-child(5){grid-column:span 3}.mx-curp-sex-toggle{display:grid;grid-template-columns:1fr 1fr;gap:6px;border:1px solid #dbe3ef;border-radius:12px;background:#f8fafc;padding:4px;min-height:54px}.mx-curp-sex-toggle button{border:0;border-radius:9px;background:transparent;color:#64748b;font:900 .95rem ui-monospace,SFMono-Regular,Menlo,monospace;cursor:pointer;transition:box-shadow .16s ease,background-color .16s ease,color .16s ease}.mx-curp-sex-toggle button:hover{background:#eef7f2;color:var(--mx-green);box-shadow:inset 0 0 0 1px rgba(0,99,65,.12)}.mx-curp-sex-toggle button.is-active{background:#0f172a;color:#fff;box-shadow:0 8px 18px rgba(15,23,42,.16)}.mx-curp-sex-toggle button.is-active:hover{background:#111827;color:#fff}.mx-curp-primary{background:#0f172a!important;color:#fff!important;border-color:#0f172a!important}.mx-curp-primary:hover{background:#111827!important;color:#fff!important;border-color:#111827!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 6px 18px rgba(15,23,42,.14)!important}.mx-curp-status{border:1px solid #dbe3ef;border-radius:16px;padding:16px;background:#fff;margin:0}.mx-curp-status span,.mx-curp-cards span,.mx-curp-fields span,.mx-curp-replay span{display:block;font-size:.68rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:#64748b}.mx-curp-status strong{display:block;margin-top:5px;font-size:1.2rem;overflow-wrap:anywhere}.mx-curp-status p{margin:.4rem 0 0;color:#64748b}.mx-curp-status.is-ok strong,.mx-curp-cards .ok strong,.mx-curp-replay .ok{color:#047857}.mx-curp-status.is-review strong,.mx-curp-cards .review strong,.mx-curp-replay .review{color:#b45309}.mx-curp-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.mx-curp-cards article,.mx-curp-section{border:1px solid #e2e8f0;border-radius:14px;background:#fff;padding:13px;min-width:0;max-width:100%;overflow:hidden}.mx-curp-cards article.ok{background:rgba(0,99,65,.035);border-color:rgba(0,99,65,.18)}.mx-curp-cards article.review{background:rgba(180,83,9,.045);border-color:rgba(180,83,9,.18)}.mx-curp-cards p,.mx-curp-fields p,.mx-curp-sources p{margin:.25rem 0 0;color:#64748b;font-size:.82rem;line-height:1.4}.mx-curp-sources p+p{margin-top:.65rem}.mx-curp-title{font-size:.78rem;font-weight:950;letter-spacing:.08em;text-transform:uppercase;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:9px;margin-bottom:12px}.mx-curp-title-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.mx-curp-title-row button{font-size:.74rem;letter-spacing:0;text-transform:none;padding:7px 10px}.mx-curp-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:9px}.mx-curp-fields div{border:1px solid #edf2f7;border-radius:12px;padding:11px;min-width:0}.mx-curp-fields strong{display:block;overflow-wrap:anywhere;color:#0f172a}.mx-curp-replay{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:9px}.mx-curp-replay div{border:1px solid #edf2f7;border-radius:12px;padding:11px;min-width:0}.mx-curp-replay code{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}.mx-curp-batch span{border:1px solid #e2e8f0;border-radius:999px;padding:6px 9px;font-weight:850;background:#f8fafc}.mx-curp-batch .ok{color:#047857}.mx-curp-batch .review{color:#b45309}.mx-curp-traps ul{margin:0;padding-left:18px;color:#64748b;font-size:.8rem;line-height:1.4}.mx-curp-traps li{margin:0 0 5px}.mx-curp-section pre{margin:0;max-width:100%;overflow:auto;border-radius:12px;background:#0f172a;color:#dbeafe;padding:14px;font-size:.78rem}@media(max-width:760px){.mx-curp-head{display:block}.mx-curp-badges{margin-top:14px}.mx-curp-cards,.mx-curp-fields,.mx-curp-replay,.mx-curp-generator-grid{grid-template-columns:1fr}.mx-curp-generator label,.mx-curp-generator label:nth-child(4),.mx-curp-generator label:nth-child(5){grid-column:auto}}`;
    document.head.appendChild(style);
  }

  function mount() {
    const host = document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench');
    if (mountCurpGold(host)) return true;
    const factory = window.ValidoHubCountrySuiteFactory;
    if (!factory) return false;
    const suite = factory.createSuite({
      suiteId: COUNTRY.slug + '-suite',
      country: { slug: COUNTRY.slug, name: COUNTRY.name, iso2: COUNTRY.iso2, iso3: COUNTRY.iso3, adjective: COUNTRY.adjective },
      theme: { accent: '#006341', accent2: '#FFFFFF', accent3: '#CE1126' },
      tools: RAW_TOOLS,
      analyze
    });
    suite.mount(host);
    window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite;
    return true;
  }
  function init() { if (mount()) return; setTimeout(init, 20); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
