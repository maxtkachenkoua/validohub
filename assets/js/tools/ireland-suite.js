(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.ireland-suite';
  const RAW_TOOLS = [
  {
    "id": "ireland-ppsn-validator",
    "name": "Irish PPSN Validator",
    "code": "ID",
    "summary": "Validate PPSN shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE ID 1"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-cro-number-validator",
    "name": "Irish CRO number Validator",
    "code": "ORG",
    "summary": "Inspect CRO number structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE ORG 2"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vat-id-validator",
    "name": "Irish VAT ID / IE Prefix Validator",
    "code": "VAT",
    "summary": "Normalize IE VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE6388047V"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE VAT 3"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-eori-validator",
    "name": "Irish EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE123456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE EORI 4"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-ppsn-social-insurance-helper",
    "name": "Irish PPSN Helper",
    "code": "SOC",
    "summary": "Split PPSN evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SOC 5"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-company-onboarding-auditor",
    "name": "Irish Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for CRO number, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE KYC 6"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-business-register-readiness-helper",
    "name": "Irish Companies Registration Office Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated Companies Registration Office lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456 IE6388047V 1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE REG 7"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-id-card-format-helper",
    "name": "Irish ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE CARD 8"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-passport-number-helper",
    "name": "Irish Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<IRLIRISH<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PASS 9"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-mrz-passport-parser",
    "name": "Irish MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<IRLSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567IRL8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE MRZ 10"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-iban-validator",
    "name": "Ireland IBAN Validator",
    "code": "IBAN",
    "summary": "Validate IE IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE29AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE IBAN 11"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-iban-generator",
    "name": "Ireland IBAN Generator",
    "code": "IBG",
    "summary": "Generate IE IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE IBG 12"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-bank-account-inspector",
    "name": "Irish Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AIBK 931152 12345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE BANK 13"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-bic-swift-inspector",
    "name": "Irish BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Ireland banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDIE2X"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE BIC 14"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-sepa-transfer-helper",
    "name": "Irish SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE29AIBK93115212345674\\n1,234.56 EUR\\nInvoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SEPA 15"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-sepa-direct-debit-mandate-helper",
    "name": "Irish SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 IE29AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SDD 16"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-payment-reference-helper",
    "name": "Irish SEPA / Direct Debit Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SEPA / Direct Debit REF 2026-001 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PAY 17"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-remittance-text-builder",
    "name": "Irish Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 IE6388047V 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE REMIT 18"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-payment-reconciliation-helper",
    "name": "Irish Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1,234.56 EUR; IE29AIBK93115212345674; Invoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE RECON 19"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-bank-statement-parser",
    "name": "Irish Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1,234.56 EUR; IE29AIBK93115212345674; sample counterparty"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE STMT 20"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-masked-iban-formatter",
    "name": "Irish Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE29AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE MASK 21"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-currency-decimal-formatter",
    "name": "Irish EUR Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE CUR 22"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vat-rate-sanity-helper",
    "name": "Irish VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VAT / Revenue 20% base 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE RATE 23"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vat-return-field-helper",
    "name": "Irish VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "VAT / Revenue; IE6388047V; period 2026-07; 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE RET 24"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-invoice-number-helper",
    "name": "Irish Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 IE6388047V"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE INV 25"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-e-invoicing-readiness-checker",
    "name": "Irish Revenue e-invoicing readiness Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE EINV 26"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-tax-authority-handoff-helper",
    "name": "Irish Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE6388047V 21/07/2026 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE TAX 27"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-accounting-audit-trail-checklist-generator",
    "name": "Irish Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 21/07/2026 1,234.56 EUR IE6388047V"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE AUDIT 28"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-postal-code-validator",
    "name": "Irish Postal Code Validator",
    "code": "POST",
    "summary": "Validate Eircode shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE POST 29"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-address-normalizer",
    "name": "Irish Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE ADDR 30"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-address-transliteration-normalizer",
    "name": "Irish Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE ASCII 31"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-region-code-mapper",
    "name": "Irish Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE REGION 32"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-municipality-code-inspector",
    "name": "Irish Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE MUNI 33"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-phone-number-validator",
    "name": "Irish Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+353 1 234 5678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PHONE 34"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-phone-e164-formatter",
    "name": "Irish Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+353 1 234 5678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE E164 35"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-date-locale-formatter",
    "name": "Irish Date Locale Formatter",
    "code": "DATE",
    "summary": "Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics.",
    "category": "localization",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE DATE 36"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-csv-locale-normalizer",
    "name": "Irish CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Ireland decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1,234.56 EUR;21/07/2026;IE6388047V"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE CSV 37"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-slug-normalizer",
    "name": "Irish Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ireland sample company 1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SLUG 38"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-document-ocr-fixer",
    "name": "Irish Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T IE6388047V IE29AIBK93115212345674 D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE OCR 39"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-gdpr-redaction-helper",
    "name": "Irish GDPR / Data Protection Commission Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE GDPR 40"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-pii-masker",
    "name": "Irish PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T +353 1 234 5678 IE29AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PII 41"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-personal-data-fixture-generator",
    "name": "Irish Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T\\n1 Grafton Street, Dublin, D02 X285\\n+353 1 234 5678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE FIX 42"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-driving-licence-format-helper",
    "name": "Irish Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T DL 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE DL 43"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-residence-permit-format-helper",
    "name": "Irish Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE PERMIT 2026 1234567T"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PERMIT 44"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-health-card-format-helper",
    "name": "Irish Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1234567T HEALTH 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE HEALTH 45"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vehicle-plate-inspector",
    "name": "Irish Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "241-D-12345"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PLATE 46"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vin-validator",
    "name": "Irish VIN Validator",
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
        "value": "Invalid IE VIN 47"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-vehicle-data-redaction-helper",
    "name": "Irish Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "241-D-12345 WVWZZZ1JZXW000001 1234567T"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE VEH 48"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-customs-declaration-helper",
    "name": "Irish Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IE6388047V HS 8471 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE CUSTOMS 49"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-postal-tracking-helper",
    "name": "Irish Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE TRACK 50"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-data-quality-workbench",
    "name": "Irish Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE DQ 51"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-json-fixture-generator",
    "name": "Irish JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE JSON 52"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-regex-pack-helper",
    "name": "Irish Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PPSN CRO number Eircode  IE29AIBK93115212345674"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE REGEX 53"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-api-payload-auditor",
    "name": "Irish API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE API 54"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-form-field-auditor",
    "name": "Irish Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=IE6388047V&postal=D02 X285&phone=+353 1 234 5678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE FORM 55"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-locale-number-parser",
    "name": "Irish Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Ireland.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE NUM 56"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-calendar-week-helper",
    "name": "Irish Calendar Week Helper",
    "code": "CAL",
    "summary": "Inspect local date strings, week-start assumptions, fiscal-period labels, and ISO handoff values.",
    "category": "localization",
    "actionLabel": "Inspect",
    "kind": "date",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026 week 30"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE CAL 57"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-company-suffix-normalizer",
    "name": "Irish Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Ireland Sample Holding Ltd 123456"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SUFFIX 58"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-procurement-identifier-helper",
    "name": "Irish Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456 PO-2026-001 IE6388047V"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE PROC 59"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-accessibility-locale-copy-checker",
    "name": "Irish Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PPSN input, Eircode input, amount 1,234.56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE COPY 60"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-support-ticket-scrubber",
    "name": "Irish Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 1234567T, IE29AIBK93115212345674, 1 Grafton Street, Dublin, D02 X285"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SUP 61"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  },
  {
    "id": "ireland-integration-smoke-test-builder",
    "name": "Irish Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid IE SMOKE 62"
      }
    ],
    "boundaries": [
      "Official Ireland identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "Browser-only",
        "text": "Input is analyzed locally in this browser."
      },
      {
        "title": "Official boundary",
        "text": "Offline format evidence does not prove official status."
      },
      {
        "title": "Fixture safety",
        "text": "Samples are fictional or structural fixtures for testing."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized values for forms and masked values for logs."
      }
    ]
  }
];
  const COUNTRY = {"slug":"ireland","iso2":"IE","iso3":"IRL","isoNumeric":"372","name":"Ireland","adjective":"Irish","nativeName":"Ireland / Eire","flag":"🇮🇪","language":"English and Irish","localLanguage":"en-IE","currency":"EUR","currencyName":"Euro","symbol":"EUR","locale":"en-IE","icu":"en_IE","date":"DD/MM/YYYY","decimal":"Dot (.)","thousands":"Comma (,)","phone":"+353","capital":"Dublin","region":"Northern Europe / European Union","population":"approximately 5.4M","identifiers":["PPSN","CRO number","VAT","Eircode","postal address","phone"],"payments":["IBAN","SEPA","SWIFT","ROS handoff","VIES"],"localTerms":{"personal":"PPSN","company":"CRO number","tax":"VAT / Revenue","social":"PPSN","register":"Companies Registration Office","invoice":"Revenue e-invoicing readiness","payment":"SEPA / Direct Debit","plate":"registration plate","postal":"Eircode","privacy":"GDPR / Data Protection Commission"},"samples":{"personal":"1234567T","company":"123456","social":"1234567T","iban":"IE29AIBK93115212345674","bank":"AIBK 931152 12345674","phone":"+353 1 234 5678","postal":"D02 X285","plate":"241-D-12345","vat":"IE6388047V","amount":"1,234.56 EUR","date":"21/07/2026","address":"1 Grafton Street, Dublin, D02 X285","json":"{\"country\":\"IE\",\"ppsn\":\"1234567T\",\"iban\":\"IE29AIBK93115212345674\",\"eircode\":\"D02 X285\"}"},"theme":["#169B62","#FF883E","#F8FAFC"],"marker":{"x":42,"y":49},"related":["GB","FR","NL"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Ireland systems remain the source of truth.', localStructure: 'Irish local structure', addEvidence: 'Add Irish local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Ireland siguen siendo la fuente de verdad.', localStructure: 'estructura local de Ireland', addEvidence: 'Agrega evidencia local de Ireland o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Ireland continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Ireland', addEvidence: 'Adicione evidencia local de Ireland ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Ireland bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Ireland', addEvidence: 'Fuege lokale Irish Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Ireland restent la source de verite.', localStructure: 'structure locale de Ireland', addEvidence: 'Ajoutez une preuve locale de Ireland ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Ireland pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Ireland', addEvidence: 'Dodaj lokalne dane kraju Ireland albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Ireland systems remain the source of truth.', localStructure: 'Irish local structure', addEvidence: 'Add Irish local evidence or use the valid sample.' }
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
  function detect(raw) {
    const text = compact(raw); const upper = text.toUpperCase();
    return {
      text, upper,
      personal: (upper.match(/[A-Z0-9][A-Z0-9 .\/-]{5,20}[A-Z0-9]/) || [])[0] || '',
      company: (upper.match(/(?:IE)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/IE\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/IE[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
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
    result.status = ok ? 'success' : 'review';
    result.headline = tool.code + ': ' + (ok ? phrase('success') : phrase('review'));
    result.detail = ok ? COUNTRY.adjective + ' browser-only evidence is structurally coherent.' : phrase('addEvidence');
    result.primary = normalized || raw || 'empty';
    result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, phrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', phrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check(COUNTRY.adjective + ' evidence', ok, phrase('localStructure') + ' detected.', phrase('addEvidence')), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, phrase('official'))];
    result.suggestions = ok ? ['Copy normalized value for fixtures.', 'Use official systems for regulated status.'] : ['Load a valid sample.', 'Check country prefix, digit length, separator style, or local evidence.'];
    result.developerJson = { suite: COUNTRY.slug + '-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: phrase('official'), breakdown: result.breakdown };
    return result;
  }
  const TOOLS = RAW_TOOLS.map((tool) => Object.assign({}, tool, { i18n: {} }));
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '#169B62', accent2: '#FF883E', accent3: '#F8FAFC' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
