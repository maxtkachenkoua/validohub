(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.switzerland-suite';
  const RAW_TOOLS = [
  {
    "id": "switzerland-ahv-avs-number-validator",
    "name": "AHV / AVS Number Validator",
    "code": "AHV",
    "summary": "Validate Swiss social insurance numbers, replay the EAN-style check digit, normalize punctuation, and separate offline syntax from identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "756.1234.5678.97"
      },
      {
        "label": "Edge sample",
        "value": "756.1234.5678.96"
      }
    ],
    "kind": "ahv",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-uid-validator",
    "name": "Swiss UID Validator & Explainer",
    "code": "UID",
    "summary": "Validate Swiss company UID syntax, normalize CHE prefixes, inspect numeric blocks, and prepare registry-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHE-123.456.789"
      },
      {
        "label": "Edge sample",
        "value": "CHE12345678"
      }
    ],
    "kind": "uid",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-vat-mwst-validator",
    "name": "Swiss VAT / MWST Validator",
    "code": "MWST",
    "summary": "Validate Swiss VAT display syntax, normalize UID roots, inspect MWST/TVA/IVA suffixes, and prepare official-lookup handoffs.",
    "category": "tax",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHE-123.456.789 MWST"
      },
      {
        "label": "Edge sample",
        "value": "CHE-123.456.789 XYZ"
      }
    ],
    "kind": "vat",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-eori-validator",
    "name": "Swiss EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect CH customs identifier payloads, UID roots, and declaration-ready fields before official customs checks.",
    "category": "tax",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHCHE123456789"
      },
      {
        "label": "Edge sample",
        "value": "EU123456789"
      }
    ],
    "kind": "eori",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-iban-validator",
    "name": "Swiss IBAN Validator",
    "code": "IBAN",
    "summary": "Validate Swiss and Liechtenstein-style IBAN structure, run MOD-97 locally, and split clearing/account segments.",
    "category": "banking",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CH93 0076 2011 6238 5295 7"
      },
      {
        "label": "Edge sample",
        "value": "CH12 0000 0000 0000 0000 0"
      }
    ],
    "kind": "iban",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-sic-clearing-number-inspector",
    "name": "SIC / BC Number Inspector",
    "code": "SIC",
    "summary": "Inspect Swiss bank clearing numbers, normalize BC/SIC references, and prepare bank-routing evidence without ownership lookup.",
    "category": "banking",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "BC 00762 UBS Switzerland account handoff"
      },
      {
        "label": "Edge sample",
        "value": "BC ABCD"
      }
    ],
    "kind": "bank",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-bic-swift-inspector",
    "name": "Swiss BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC/SWIFT shape, verify CH/LI country-code evidence, and prepare payment routing diagnostics.",
    "category": "banking",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "UBSWCHZH80A"
      },
      {
        "label": "Edge sample",
        "value": "UBSWDEFFXXX"
      }
    ],
    "kind": "bic",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-sepa-transfer-helper",
    "name": "Swiss SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check Swiss SEPA-ready bundles for IBAN, BIC, amount, creditor, remittance, and official bank-boundary notes.",
    "category": "banking",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IBAN CH9300762011623852957\nBIC UBSWCHZH80A\nAmount CHF 1250.75\nCreditor Alpine Test AG"
      },
      {
        "label": "Edge sample",
        "value": "IBAN CH12\nAmount twelve CHF"
      }
    ],
    "kind": "payment",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-qr-bill-reference-validator",
    "name": "Swiss QR-Bill Reference Validator",
    "code": "QR",
    "summary": "Validate Swiss QR reference shape, replay recursive MOD-10 checks, and prepare invoice-safe payment references.",
    "category": "payments",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "210000000003139471430009017"
      },
      {
        "label": "Edge sample",
        "value": "210000000003139471430009018"
      }
    ],
    "kind": "qrref",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-esr-reference-checker",
    "name": "ESR Reference Checker",
    "code": "ESR",
    "summary": "Inspect legacy ESR-style references, normalize 27-digit payloads, and explain the same offline MOD-10 boundary.",
    "category": "payments",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "000000000000000000000000011"
      },
      {
        "label": "Edge sample",
        "value": "000000000000000000000000015"
      }
    ],
    "kind": "qrref",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-qr-bill-payload-auditor",
    "name": "Swiss QR-Bill Payload Auditor",
    "code": "QRB",
    "summary": "Audit Swiss QR-bill text payloads for account, creditor, amount, currency, reference, and payable field readiness.",
    "category": "payments",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "SPC\n0200\n1\nCH9300762011623852957\nS\nAlpine Test AG\nBahnhofstrasse 1\n8001\nZurich\nCH\n\n\n\n\n\n\nCHF\n1250.75\nS\nExample Customer\nRue du Lac 3\n1204\nGeneva\nCH\nQRR\n210000000003139471430009017"
      },
      {
        "label": "Edge sample",
        "value": "SPC\n0200\n1\nCH12\nCHF\nmissing reference"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-payment-reconciliation-helper",
    "name": "Swiss Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Extract Swiss IBANs, QR references, CHF amounts, invoice ids, and date evidence from reconciliation text.",
    "category": "payments",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice INV-2026-0042 paid CHF 1250.75 via CH9300762011623852957 ref 210000000003139471430009017 on 14.07.2026"
      },
      {
        "label": "Edge sample",
        "value": "Payment received without amount or reference"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-bank-statement-parser",
    "name": "Swiss Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse Swiss bank statement snippets for dates, CHF amounts, IBAN-like strings, QR references, and reconciliation hints.",
    "category": "banking",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "14.07.2026 CREDIT CHF 1 250.75 REF 210000000003139471430009017 IBAN CH9300762011623852957"
      },
      {
        "label": "Edge sample",
        "value": "CREDIT reference pending"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-chf-amount-formatter",
    "name": "CHF Amount Formatter",
    "code": "CHF",
    "summary": "Parse Swiss franc amounts, normalize decimal separators, produce display strings, and expose integer rappen values.",
    "category": "locale",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHF 1'250.75"
      },
      {
        "label": "Edge sample",
        "value": "CHF twelve"
      }
    ],
    "kind": "amount",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-mwst-rate-sanity-helper",
    "name": "MWST Rate Sanity Helper",
    "code": "RATE",
    "summary": "Check Swiss VAT/MWST rate snippets, net/gross consistency, and invoice-friendly CHF amount evidence.",
    "category": "tax",
    "actionLabel": "Calculate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Net CHF 100.00 MWST 8.1% Gross CHF 108.10"
      },
      {
        "label": "Edge sample",
        "value": "Net CHF 100 Gross CHF 120 VAT 99%"
      }
    ],
    "kind": "amount",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-vat-return-field-helper",
    "name": "Swiss VAT Return Field Helper",
    "code": "VAT",
    "summary": "Organize Swiss VAT return period, turnover, tax rate, UID, and evidence fields before official submission.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Period Q2 2026\nUID CHE-123.456.789 MWST\nTurnover CHF 10000.00\nRate 8.1%"
      },
      {
        "label": "Edge sample",
        "value": "Period missing UID turnover TBD"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-invoice-number-helper",
    "name": "Swiss Invoice Number Helper",
    "code": "INV",
    "summary": "Normalize Swiss invoice ids, QR reference links, date evidence, and accounting-safe display fields.",
    "category": "invoices-accounting",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-CH-2026-0042 / QR ref 210000000003139471430009017"
      },
      {
        "label": "Edge sample",
        "value": "invoice draft"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-e-invoicing-readiness-helper",
    "name": "Swiss E-Invoicing Readiness Helper",
    "code": "EINV",
    "summary": "Audit supplier, buyer, UID, IBAN, amount, QR reference, and structured remittance fields for Swiss e-invoicing handoff.",
    "category": "invoices-accounting",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Supplier CHE-123.456.789 MWST\nBuyer Example SA\nIBAN CH9300762011623852957\nAmount CHF 1250.75\nRef 210000000003139471430009017"
      },
      {
        "label": "Edge sample",
        "value": "Supplier pending amount pending"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-salary-certificate-field-helper",
    "name": "Salary Certificate Field Helper",
    "code": "Lohnausweis",
    "summary": "Check Swiss salary-certificate snippets for employee, employer UID, canton, year, amount, and privacy boundary evidence.",
    "category": "invoices-accounting",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Lohnausweis 2026\nEmployer CHE-123.456.789\nCanton ZH\nGross CHF 120000.00"
      },
      {
        "label": "Edge sample",
        "value": "Salary certificate employee only"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-payroll-social-security-helper",
    "name": "Payroll Social Security Helper",
    "code": "PAY",
    "summary": "Audit AHV/AVS, canton, salary period, CHF amounts, and employer UID evidence for payroll intake.",
    "category": "invoices-accounting",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "AHV 756.1234.5678.97\nEmployer CHE-123.456.789\nCanton BE\nGross CHF 8500.00"
      },
      {
        "label": "Edge sample",
        "value": "AHV pending salary text"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-withholding-tax-readiness-helper",
    "name": "Withholding Tax Readiness Helper",
    "code": "WHT",
    "summary": "Check canton, tax-at-source hints, gross pay, AHV/AVS evidence, and official calculation boundaries.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Canton GE withholding tax 2026 gross CHF 9500.00 AHV 756.1234.5678.97"
      },
      {
        "label": "Edge sample",
        "value": "withholding tax unknown canton"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-company-onboarding-auditor",
    "name": "Swiss Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit Swiss company onboarding payloads for UID, VAT suffix, address, canton, IBAN, and official registry handoff.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Alpine Test AG\nCHE-123.456.789 MWST\nBahnhofstrasse 1, 8001 Zurich ZH\nCH9300762011623852957"
      },
      {
        "label": "Edge sample",
        "value": "Alpine Test AG Zurich"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-zefix-readiness-helper",
    "name": "Zefix Readiness Helper",
    "code": "ZEFIX",
    "summary": "Prepare Swiss company-name, UID, canton, legal form, and address fields before official Zefix registry search.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Alpine Test AG CHE-123.456.789 Zurich ZH"
      },
      {
        "label": "Edge sample",
        "value": "Alpine Test"
      }
    ],
    "kind": "uid",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-compliance-checklist-generator",
    "name": "Swiss Compliance Checklist Generator",
    "code": "CHECK",
    "summary": "Generate a browser-only checklist for Swiss UID, VAT, QR-bill, privacy, address, banking, and audit evidence.",
    "category": "data-quality-privacy",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Company onboarding + QR-bill + FADP privacy review for Swiss checkout"
      },
      {
        "label": "Edge sample",
        "value": "general checklist"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-audit-trail-checklist-generator",
    "name": "Audit Trail Checklist Generator",
    "code": "AUDIT",
    "summary": "Create Swiss audit-trail checklists for invoices, payments, UID evidence, VAT notes, and browser-only review steps.",
    "category": "data-quality-privacy",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Audit Swiss invoice INV-2026-0042 with QR reference and UID evidence"
      },
      {
        "label": "Edge sample",
        "value": "audit without fields"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-fadp-gdpr-redaction-helper",
    "name": "FADP / GDPR Redaction Helper",
    "code": "FADP",
    "summary": "Mask Swiss personal, company, banking, phone, email, and address evidence for privacy-safe logs.",
    "category": "data-quality-privacy",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Anna Muster AHV 756.1234.5678.97 email anna@example.ch IBAN CH9300762011623852957"
      },
      {
        "label": "Edge sample",
        "value": "No sensitive data here"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-pii-masker",
    "name": "Swiss PII Masker",
    "code": "PII",
    "summary": "Detect and mask Swiss AHV/AVS, UID, IBAN, phone, email, postal, and free-text personal data hints.",
    "category": "data-quality-privacy",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Max Meier +41 79 123 45 67 AHV 756.1234.5678.97 CHE-123.456.789"
      },
      {
        "label": "Edge sample",
        "value": "public support note"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-data-quality-workbench",
    "name": "Swiss Data Quality Workbench",
    "code": "DQ",
    "summary": "Lint Swiss customer and business records for locale, canton, UID, IBAN, phone, postal, and payment-reference evidence.",
    "category": "data-quality-privacy",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHE-123.456.789 MWST, Zurich ZH 8001, +41 44 123 45 67, CH9300762011623852957"
      },
      {
        "label": "Edge sample",
        "value": "Zurich customer record incomplete"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-document-ocr-fixer",
    "name": "Swiss Document OCR Fixer",
    "code": "OCR",
    "summary": "Repair common OCR spacing in Swiss UID, AHV/AVS, IBAN, QR reference, CHF amount, and postal-code snippets.",
    "category": "data-quality-privacy",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "CHE 123 456 789 MWST\nCH93 0076 2011 6238 5295 7\nCHF 1 250 75"
      },
      {
        "label": "Edge sample",
        "value": "C H E one two three"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-json-fixture-generator",
    "name": "Swiss JSON Fixture Generator",
    "code": "JSON",
    "summary": "Generate safe fictional Swiss JSON fixtures with UID, AHV/AVS, IBAN, phone, address, canton, and locale fields.",
    "category": "developer-data",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"CH\",\"uid\":\"CHE-123.456.789\",\"locale\":\"de-CH\"}"
      },
      {
        "label": "Edge sample",
        "value": "{}"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-regex-pack-helper",
    "name": "Swiss Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare Swiss-oriented regex snippets for UID, AHV/AVS, IBAN, postal codes, phones, and QR references.",
    "category": "developer-data",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Need regex for UID, AHV, Swiss IBAN, postal code, phone, QR reference"
      },
      {
        "label": "Edge sample",
        "value": "Need regex for everything"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-api-payload-auditor",
    "name": "Swiss API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload text for Swiss locale codes, UID, VAT suffix, IBAN, phone, canton, and privacy-risk fields.",
    "category": "developer-data",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"locale\":\"de-CH\",\"uid\":\"CHE-123.456.789 MWST\",\"iban\":\"CH9300762011623852957\",\"phone\":\"+41791234567\",\"canton\":\"ZH\"}"
      },
      {
        "label": "Edge sample",
        "value": "{\"locale\":\"en-US\"}"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-form-field-auditor",
    "name": "Swiss Form Field Auditor",
    "code": "FORM",
    "summary": "Check form-field labels, placeholders, masks, required fields, and examples for Swiss checkout and onboarding forms.",
    "category": "developer-data",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Fields: UID, MWST suffix, AHV optional, IBAN CH, postal code 8001, canton ZH, phone +41"
      },
      {
        "label": "Edge sample",
        "value": "Fields: tax id, zip, phone"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-personal-data-fixture-generator",
    "name": "Personal Data Fixture Generator",
    "code": "TEST",
    "summary": "Generate safe fictional Swiss person fixtures with AHV-like numbers, phone, address, canton, locale, and privacy notes.",
    "category": "data-quality-privacy",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Generate Swiss person fixture for de-CH Zurich checkout"
      },
      {
        "label": "Edge sample",
        "value": "Generate real user"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-postal-code-validator",
    "name": "Swiss Postal Code Validator",
    "code": "POST",
    "summary": "Validate Swiss four-digit postal code shape, normalize spacing, and prepare address-import diagnostics.",
    "category": "address-postal",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "8001 Zurich"
      },
      {
        "label": "Edge sample",
        "value": "08001 Zurich"
      }
    ],
    "kind": "postal",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-address-normalizer",
    "name": "Swiss Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize Swiss street, house number, postal code, locality, canton, and country-line evidence for forms.",
    "category": "address-postal",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Bahnhofstrasse 1, 8001 Zurich ZH, Switzerland"
      },
      {
        "label": "Edge sample",
        "value": "Bahnhofstrasse Zurich"
      }
    ],
    "kind": "address",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-address-transliteration-normalizer",
    "name": "Swiss Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Produce ASCII-safe variants for Swiss German, French, Italian, and Romansh address text.",
    "category": "address-postal",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rue de l’Église 5, 1204 Genève"
      },
      {
        "label": "Edge sample",
        "value": "Äussere Güterstrasse 7"
      }
    ],
    "kind": "address",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-multilingual-address-helper",
    "name": "Multilingual Address Helper",
    "code": "LANG",
    "summary": "Inspect Swiss multilingual address labels, canton language context, and locale-safe display variants.",
    "category": "address-postal",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "DE: Bahnhofstrasse 1, 8001 Zürich\nFR: Rue du Lac 3, 1204 Genève\nIT: Via Nassa 12, 6900 Lugano"
      },
      {
        "label": "Edge sample",
        "value": "single language only"
      }
    ],
    "kind": "address",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-phone-number-validator",
    "name": "Swiss Phone Number Validator",
    "code": "+41",
    "summary": "Validate Swiss phone number shape, normalize trunk prefixes, classify mobile/geographic hints, and prepare contact fixtures.",
    "category": "phone-telecom",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+41 79 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "079 123"
      }
    ],
    "kind": "phone",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-phone-e164-formatter",
    "name": "Swiss Phone E.164 Formatter",
    "code": "E164",
    "summary": "Format Swiss domestic phone input to +41 E.164 when enough local evidence is present.",
    "category": "phone-telecom",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "079 123 45 67"
      },
      {
        "label": "Edge sample",
        "value": "+49 30 123456"
      }
    ],
    "kind": "phone",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-canton-code-mapper",
    "name": "Canton Code Mapper",
    "code": "CT",
    "summary": "Map Swiss canton abbreviations, names, language hints, and address-ready region evidence.",
    "category": "address-postal",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ZH Zurich, GE Geneva, TI Ticino"
      },
      {
        "label": "Edge sample",
        "value": "XX Unknown"
      }
    ],
    "kind": "canton",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-municipality-code-inspector",
    "name": "Municipality Code Inspector",
    "code": "GDE",
    "summary": "Inspect Swiss municipality-code-shaped values, canton context, and register-handoff boundaries.",
    "category": "address-postal",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Municipality 261 Zurich canton ZH"
      },
      {
        "label": "Edge sample",
        "value": "Municipality ABC"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-date-locale-formatter",
    "name": "Swiss Date / Locale Formatter",
    "code": "DATE",
    "summary": "Format Swiss dates for de-CH, fr-CH, it-CH, and API-safe ISO payloads.",
    "category": "locale",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "14.07.2026 16:30 Europe/Zurich"
      },
      {
        "label": "Edge sample",
        "value": "07/14/26"
      }
    ],
    "kind": "date",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-decimal-currency-formatter",
    "name": "Swiss Decimal / Currency Formatter",
    "code": "NUM",
    "summary": "Normalize Swiss decimal separators, apostrophe grouping, CHF display, and API numeric fields.",
    "category": "locale",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1'250.75 CHF"
      },
      {
        "label": "Edge sample",
        "value": "1,250.75 dollars"
      }
    ],
    "kind": "amount",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-csv-locale-normalizer",
    "name": "Swiss CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets containing Swiss dates, CHF amounts, UID, canton, phone, and postal-code fields.",
    "category": "developer-data",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "uid;amount;date;canton\nCHE-123.456.789;1'250.75;14.07.2026;ZH"
      },
      {
        "label": "Edge sample",
        "value": "uid,amount\nmissing"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-slug-normalizer",
    "name": "Swiss Slug Normalizer",
    "code": "SLUG",
    "summary": "Create URL-safe slugs from Swiss multilingual names while preserving canton, UID, and locale-safe context.",
    "category": "developer-data",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Zürich Genève Lugano — Alpine Test AG"
      },
      {
        "label": "Edge sample",
        "value": "!!!"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-passport-number-helper",
    "name": "Swiss Passport Number Helper",
    "code": "PASS",
    "summary": "Inspect Swiss passport-number-shaped input, normalize document fields, and separate syntax from identity proof.",
    "category": "personal-documents",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "X1234567"
      },
      {
        "label": "Edge sample",
        "value": "passport unknown"
      }
    ],
    "kind": "doc",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-id-card-format-helper",
    "name": "Swiss ID Card Format Helper",
    "code": "ID",
    "summary": "Inspect Swiss identity-card-style values, document labels, and privacy boundaries for onboarding forms.",
    "category": "personal-documents",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ID CH A1234567 issued sample"
      },
      {
        "label": "Edge sample",
        "value": "ID pending"
      }
    ],
    "kind": "doc",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-residence-permit-format-helper",
    "name": "Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Classify Swiss residence-permit references, canton hints, permit letters, and official-status boundaries.",
    "category": "personal-documents",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Permit B ZH sample holder 756.1234.5678.97"
      },
      {
        "label": "Edge sample",
        "value": "Permit unknown"
      }
    ],
    "kind": "doc",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-driving-licence-format-helper",
    "name": "Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect Swiss driving-licence field snippets, categories, dates, and identity-proof boundaries.",
    "category": "personal-documents",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Swiss driving licence categories B, BE issued 14.07.2026 canton VD"
      },
      {
        "label": "Edge sample",
        "value": "licence note"
      }
    ],
    "kind": "doc",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-health-insurance-boundary-helper",
    "name": "Health Insurance Boundary Helper",
    "code": "KVG",
    "summary": "Audit Swiss health-insurance snippets for AHV/AVS, insurer notes, policy ids, and sensitive-data handling.",
    "category": "health-insurance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "KVG policy sample AHV 756.1234.5678.97 insurer TestKasse CHF 350.00"
      },
      {
        "label": "Edge sample",
        "value": "health policy pending"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-insurance-policy-number-helper",
    "name": "Insurance Policy Number Helper",
    "code": "POLICY",
    "summary": "Normalize Swiss policy-number snippets, detect CHF amounts and holder data, and prepare masked evidence.",
    "category": "health-insurance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Policy CH-2026-00042 holder Max Meier premium CHF 350.00"
      },
      {
        "label": "Edge sample",
        "value": "policy draft"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-vehicle-plate-inspector",
    "name": "Swiss Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect Swiss vehicle plate canton prefixes, serial digits, and fleet-safe redaction evidence.",
    "category": "vehicles-transport",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ZH 123456"
      },
      {
        "label": "Edge sample",
        "value": "ZZ 12"
      }
    ],
    "kind": "plate",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-vin-validator",
    "name": "VIN Validator for Swiss Workflows",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare Swiss vehicle-intake diagnostics.",
    "category": "vehicles-transport",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "WVWZZZ1JZXW000001"
      },
      {
        "label": "Edge sample",
        "value": "VIN123"
      }
    ],
    "kind": "vin",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-vehicle-data-redaction-helper",
    "name": "Vehicle Data Redaction Helper",
    "code": "VRED",
    "summary": "Mask Swiss plates, VINs, owner names, postal codes, and policy fields in vehicle support text.",
    "category": "vehicles-transport",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ZH 123456 VIN WVWZZZ1JZXW000001 owner Max Meier 8001 Zurich"
      },
      {
        "label": "Edge sample",
        "value": "vehicle clean"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-customs-declaration-helper",
    "name": "Customs Declaration Helper",
    "code": "CUS",
    "summary": "Inspect Swiss customs snippets for EORI-like ids, UID roots, HS-code hints, CHF values, and official customs handoff.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Export CHCHE123456789 HS 9102.21 value CHF 1250.75 Zurich"
      },
      {
        "label": "Edge sample",
        "value": "export goods pending"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-postal-tracking-helper",
    "name": "Swiss Post Tracking Helper",
    "code": "POST",
    "summary": "Inspect Swiss Post-like tracking snippets, postal codes, dates, and carrier-status boundary notes.",
    "category": "address-postal",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Swiss Post 99.00.123456.12345678 delivered to 8001 Zurich on 14.07.2026"
      },
      {
        "label": "Edge sample",
        "value": "tracking pending"
      }
    ],
    "kind": "postal",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
    "id": "switzerland-tax-id-boundary-helper",
    "name": "Tax ID Boundary Helper",
    "code": "TAX",
    "summary": "Explain Swiss tax-id boundaries across UID, VAT suffix, AHV/AVS, canton tax references, and official lookup needs.",
    "category": "tax",
    "actionLabel": "Explain",
    "samples": [
      {
        "label": "Valid sample",
        "value": "UID CHE-123.456.789 MWST with AHV 756.1234.5678.97 and canton ZH tax form"
      },
      {
        "label": "Edge sample",
        "value": "tax id?"
      }
    ],
    "kind": "payload",
    "boundaries": [
      "Official Swiss registry status, identity proof, bank ownership, tax filing, carrier status, and legal decisions require the relevant Swiss authority or provider."
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
  const LOCALE_UI = {
  "en": [
    "Swiss",
    "workbench",
    "Validate",
    "Waiting for Swiss data",
    "Offline checks passed",
    "Review needed",
    "Copy result",
    "Download result",
    "Clear",
    "Copy normalized",
    "Validation pipeline",
    "Quality notes",
    "Advanced analysis",
    "Valid sample",
    "Edge sample"
  ],
  "pl": [
    "szwajcarski",
    "workbench",
    "Sprawdz",
    "Oczekiwanie na dane CH",
    "Kontrole offline zaliczone",
    "Wymagana weryfikacja",
    "Kopiuj wynik",
    "Pobierz wynik",
    "Wyczysc",
    "Kopiuj wartosc",
    "Sciezka walidacji",
    "Uwagi jakosci",
    "Analiza zaawansowana",
    "Poprawna probka",
    "Probka brzegowa"
  ],
  "de": [
    "Schweizer",
    "Workbench",
    "Pruefen",
    "Warte auf CH-Daten",
    "Offline-Pruefungen bestanden",
    "Pruefung noetig",
    "Ergebnis kopieren",
    "Ergebnis herunterladen",
    "Leeren",
    "Normalisiert kopieren",
    "Pruefablauf",
    "Qualitaetshinweise",
    "Erweiterte Analyse",
    "Gueltiges Beispiel",
    "Grenzfall"
  ],
  "es": [
    "suizo",
    "banco de trabajo",
    "Validar",
    "Esperando datos CH",
    "Comprobaciones offline correctas",
    "Revisar",
    "Copiar resultado",
    "Descargar resultado",
    "Limpiar",
    "Copiar normalizado",
    "Flujo de validacion",
    "Notas de calidad",
    "Analisis avanzado",
    "Muestra valida",
    "Muestra limite"
  ],
  "pt-BR": [
    "suico",
    "workbench",
    "Validar",
    "Aguardando dados CH",
    "Checagens offline aprovadas",
    "Revisao necessaria",
    "Copiar resultado",
    "Baixar resultado",
    "Limpar",
    "Copiar normalizado",
    "Pipeline de validacao",
    "Notas de qualidade",
    "Analise avancada",
    "Amostra valida",
    "Amostra limite"
  ],
  "fr": [
    "suisse",
    "atelier",
    "Valider",
    "En attente de donnees CH",
    "Controles hors ligne valides",
    "Revision requise",
    "Copier le resultat",
    "Telecharger le resultat",
    "Effacer",
    "Copier la valeur normalisee",
    "Pipeline de validation",
    "Notes de qualite",
    "Analyse avancee",
    "Exemple valide",
    "Cas limite"
  ],
  "it": [
    "svizzero",
    "workbench",
    "Valida",
    "In attesa di dati CH",
    "Controlli offline superati",
    "Revisione richiesta",
    "Copia risultato",
    "Scarica risultato",
    "Pulisci",
    "Copia normalizzato",
    "Pipeline di validazione",
    "Note qualita",
    "Analisi avanzata",
    "Esempio valido",
    "Esempio limite"
  ],
  "nl": [
    "Zwitsers",
    "werkbank",
    "Valideren",
    "Wachten op CH-gegevens",
    "Offline controles geslaagd",
    "Controle nodig",
    "Resultaat kopieren",
    "Resultaat downloaden",
    "Wissen",
    "Genormaliseerd kopieren",
    "Validatiepijplijn",
    "Kwaliteitsnotities",
    "Geavanceerde analyse",
    "Geldig voorbeeld",
    "Randvoorbeeld"
  ],
  "pt-PT": [
    "suico",
    "bancada",
    "Validar",
    "A aguardar dados CH",
    "Verificacoes offline aprovadas",
    "Rever",
    "Copiar resultado",
    "Transferir resultado",
    "Limpar",
    "Copiar normalizado",
    "Pipeline de validacao",
    "Notas de qualidade",
    "Analise avancada",
    "Amostra valida",
    "Amostra limite"
  ],
  "cs": [
    "svycarsky",
    "nastroj",
    "Overit",
    "Ceka se na data CH",
    "Offline kontroly prosly",
    "Nutna kontrola",
    "Kopirovat vysledek",
    "Stahnout vysledek",
    "Vymazat",
    "Kopirovat normalizovane",
    "Validacni postup",
    "Poznamky kvality",
    "Pokrocila analyza",
    "Platny vzorek",
    "Hraniční vzorek"
  ],
  "sk": [
    "svajciarsky",
    "nastroj",
    "Overit",
    "Caka sa na data CH",
    "Offline kontroly presli",
    "Nutna kontrola",
    "Kopirovat vysledok",
    "Stiahnut vysledok",
    "Vymazat",
    "Kopirovat normalizovane",
    "Validacny postup",
    "Poznamky kvality",
    "Pokrocila analyza",
    "Platna vzorka",
    "Hranična vzorka"
  ],
  "uk": [
    "shveytsarskyi",
    "instrument",
    "Pereviryty",
    "Ochikuvannia danykh CH",
    "Offline perevirky proideno",
    "Potribna perevirka",
    "Kopiiuvaty rezultat",
    "Zavantazhyty rezultat",
    "Ochyshchyty",
    "Kopiiuvaty normalizovane",
    "Konveier validatsii",
    "Notatky yakosti",
    "Rozshyrenyi analiz",
    "Validnyi zrazok",
    "Mezhovyi zrazok"
  ],
  "tr": [
    "Isvicre",
    "araci",
    "Dogrula",
    "CH verisi bekleniyor",
    "Cevrimdisi kontroller gecti",
    "Inceleme gerekli",
    "Sonucu kopyala",
    "Sonucu indir",
    "Temizle",
    "Normalize kopyala",
    "Dogrulama akisi",
    "Kalite notlari",
    "Gelismis analiz",
    "Gecerli ornek",
    "Sinir ornegi"
  ],
  "ro": [
    "elvetian",
    "instrument",
    "Valideaza",
    "Se asteapta date CH",
    "Verificari offline trecute",
    "Revizuire necesara",
    "Copiaza rezultatul",
    "Descarca rezultatul",
    "Sterge",
    "Copiaza normalizat",
    "Flux de validare",
    "Note de calitate",
    "Analiza avansata",
    "Exemplu valid",
    "Exemplu limita"
  ],
  "hu": [
    "svajci",
    "eszkoz",
    "Ellenorzes",
    "CH adatokra var",
    "Offline ellenorzes sikeres",
    "Felulvizsgalat kell",
    "Eredmeny masolasa",
    "Eredmeny letoltese",
    "Torles",
    "Normalizalt masolasa",
    "Validacios folyamat",
    "Minosegi jegyzetek",
    "Halado elemzes",
    "Ervenyes minta",
    "Hatarhelyzet"
  ],
  "sv": [
    "schweizisk",
    "verktyg",
    "Validera",
    "Vantar pa CH-data",
    "Offlinekontroller godkanda",
    "Granskning behovs",
    "Kopiera resultat",
    "Ladda ned resultat",
    "Rensa",
    "Kopiera normaliserat",
    "Valideringsflode",
    "Kvalitetsnoter",
    "Avancerad analys",
    "Giltigt exempel",
    "Gransfall"
  ],
  "no": [
    "sveitsisk",
    "verktoy",
    "Valider",
    "Venter pa CH-data",
    "Offlinekontroller bestatt",
    "Gjennomgang trengs",
    "Kopier resultat",
    "Last ned resultat",
    "Tomm",
    "Kopier normalisert",
    "Valideringsflyt",
    "Kvalitetsnotater",
    "Avansert analyse",
    "Gyldig eksempel",
    "Grenseeksempel"
  ],
  "fi": [
    "sveitsilainen",
    "tyokalu",
    "Validoi",
    "Odotetaan CH-dataa",
    "Offline-tarkistukset lapaisy",
    "Tarkistus tarvitaan",
    "Kopioi tulos",
    "Lataa tulos",
    "Tyhjenna",
    "Kopioi normalisoitu",
    "Validointiputki",
    "Laatuhuomiot",
    "Edistynyt analyysi",
    "Kelvollinen esimerkki",
    "Reunatapaus"
  ],
  "da": [
    "schweizisk",
    "vaerktoj",
    "Valider",
    "Venter pa CH-data",
    "Offlinekontroller bestod",
    "Gennemgang kraeves",
    "Kopier resultat",
    "Download resultat",
    "Ryd",
    "Kopier normaliseret",
    "Valideringsforlob",
    "Kvalitetsnoter",
    "Avanceret analyse",
    "Gyldigt eksempel",
    "Graensetilfaelde"
  ],
  "ja": [
    "スイス",
    "ワークベンチ",
    "検証",
    "CHデータ待機中",
    "オフライン検証成功",
    "確認が必要",
    "結果をコピー",
    "結果をダウンロード",
    "クリア",
    "正規化値をコピー",
    "検証パイプライン",
    "品質メモ",
    "高度な分析",
    "有効サンプル",
    "境界サンプル"
  ],
  "ko": [
    "스위스",
    "워크벤치",
    "검증",
    "CH 데이터 대기 중",
    "오프라인 검사 통과",
    "검토 필요",
    "결과 복사",
    "결과 다운로드",
    "지우기",
    "정규화 값 복사",
    "검증 파이프라인",
    "품질 참고",
    "고급 분석",
    "유효 샘플",
    "경계 샘플"
  ],
  "zh-CN": [
    "瑞士",
    "工作台",
    "验证",
    "等待 CH 数据",
    "离线检查通过",
    "需要复核",
    "复制结果",
    "下载结果",
    "清除",
    "复制规范值",
    "验证流程",
    "质量说明",
    "高级分析",
    "有效样例",
    "边界样例"
  ],
  "zh-TW": [
    "瑞士",
    "工作台",
    "驗證",
    "等待 CH 資料",
    "離線檢查通過",
    "需要複核",
    "複製結果",
    "下載結果",
    "清除",
    "複製正規化值",
    "驗證流程",
    "品質說明",
    "進階分析",
    "有效範例",
    "邊界範例"
  ],
  "ar": [
    "سويسري",
    "منضدة عمل",
    "تحقق",
    "بانتظار بيانات CH",
    "نجحت الفحوص دون اتصال",
    "تحتاج مراجعة",
    "نسخ النتيجة",
    "تنزيل النتيجة",
    "مسح",
    "نسخ القيمة المعيارية",
    "مسار التحقق",
    "ملاحظات الجودة",
    "تحليل متقدم",
    "عينة صحيحة",
    "عينة حدية"
  ],
  "he": [
    "שוויצרי",
    "כלי עבודה",
    "אימות",
    "ממתין לנתוני CH",
    "בדיקות לא מקוונות עברו",
    "נדרשת בדיקה",
    "העתק תוצאה",
    "הורד תוצאה",
    "נקה",
    "העתק מנורמל",
    "צינור אימות",
    "הערות איכות",
    "ניתוח מתקדם",
    "דוגמה תקינה",
    "דוגמת קצה"
  ],
  "hi": [
    "Swiss",
    "workbench",
    "Validate",
    "CH data ka intazar",
    "Offline checks pass",
    "Review chahiye",
    "Result copy karein",
    "Result download karein",
    "Clear",
    "Normalized copy karein",
    "Validation pipeline",
    "Quality notes",
    "Advanced analysis",
    "Valid sample",
    "Edge sample"
  ],
  "id": [
    "Swiss",
    "workbench",
    "Validasi",
    "Menunggu data CH",
    "Pemeriksaan offline lulus",
    "Perlu tinjauan",
    "Salin hasil",
    "Unduh hasil",
    "Bersihkan",
    "Salin normalisasi",
    "Alur validasi",
    "Catatan kualitas",
    "Analisis lanjutan",
    "Sampel valid",
    "Sampel batas"
  ],
  "vi": [
    "Thuy Si",
    "ban lam viec",
    "Kiem tra",
    "Dang cho du lieu CH",
    "Kiem tra offline dat",
    "Can xem lai",
    "Sao chep ket qua",
    "Tai ket qua",
    "Xoa",
    "Sao chep chuan hoa",
    "Quy trinh kiem tra",
    "Ghi chu chat luong",
    "Phan tich nang cao",
    "Mau hop le",
    "Mau bien"
  ],
  "th": [
    "Swiss",
    "workbench",
    "Validate",
    "Waiting for CH data",
    "Offline checks passed",
    "Review needed",
    "Copy result",
    "Download result",
    "Clear",
    "Copy normalized",
    "Validation pipeline",
    "Quality notes",
    "Advanced analysis",
    "Valid sample",
    "Edge sample"
  ],
  "ms": [
    "Swiss",
    "workbench",
    "Sahkan",
    "Menunggu data CH",
    "Semakan luar talian lulus",
    "Perlu semakan",
    "Salin hasil",
    "Muat turun hasil",
    "Kosongkan",
    "Salin ternormal",
    "Aliran pengesahan",
    "Nota kualiti",
    "Analisis lanjutan",
    "Sampel sah",
    "Sampel pinggir"
  ]
};
  const CANTONS = { AG:'Aargau', AI:'Appenzell Innerrhoden', AR:'Appenzell Ausserrhoden', BE:'Bern', BL:'Basel-Landschaft', BS:'Basel-Stadt', FR:'Fribourg', GE:'Geneva', GL:'Glarus', GR:'Graubuenden', JU:'Jura', LU:'Luzern', NE:'Neuchatel', NW:'Nidwalden', OW:'Obwalden', SG:'St. Gallen', SH:'Schaffhausen', SO:'Solothurn', SZ:'Schwyz', TG:'Thurgau', TI:'Ticino', UR:'Uri', VD:'Vaud', VS:'Valais', ZG:'Zug', ZH:'Zurich' };
  const text = (value) => String(value == null ? '' : value);
  const locale = () => location.pathname.split('/').filter(Boolean)[0] || 'en';
  const ui = () => LOCALE_UI[locale()] || LOCALE_UI.en;
  const digits = (value) => text(value).replace(/\D/g, '');
  function mod97(value) { let rem = 0; for (const ch of value) rem = (rem * 10 + Number(ch)) % 97; return rem; }
  function ibanNumeric(value) { return value.toUpperCase().replace(/\s+/g, '').slice(4) + value.toUpperCase().replace(/\s+/g, '').slice(0,4); }
  function ibanToDigits(value) { return ibanNumeric(value).replace(/[A-Z]/g, c => String(c.charCodeAt(0) - 55)); }
  function eanCheck(d12) { let sum = 0; for (let i = 0; i < 12; i++) sum += Number(d12[i]) * (i % 2 ? 3 : 1); return String((10 - (sum % 10)) % 10); }
  function qrCheck(body) { const table = [0,9,4,6,8,2,7,1,3,5]; let carry = 0; for (const ch of body) carry = table[(carry + Number(ch)) % 10]; return String((10 - carry) % 10); }
  function mask(value) { return text(value).replace(/[A-Za-z0-9]/g, (ch, i) => i % 4 === 0 ? ch : '•'); }
  function makeI18n(tool) {
    const i18n = {};
    for (const [code, labels] of Object.entries(LOCALE_UI)) {
      i18n[code] = {
        name: code === 'en' ? tool.name : labels[0] + ' ' + tool.code + ' ' + labels[1],
        summary: code === 'en' ? tool.summary : labels[0] + ' ' + tool.code + ': ' + labels[2].toLowerCase() + ' local structure, normalize input, and keep official lookups outside the browser.',
        samples: [labels[13], labels[14]],
        chips: [labels[0], 'offline', tool.code, labels[11]]
      };
    }
    return i18n;
  }
  RAW_TOOLS.push({
    id: 'switzerland-iban-generator',
    name: 'Swiss IBAN Generator',
    code: 'IBG',
    summary: 'Generate CH IBAN check digits from a Swiss BBAN body, replay MOD-97 evidence, and prepare payment fixtures.',
    category: 'finance',
    actionLabel: 'Generate',
    kind: 'ibangenerator',
    samples: [
      { label: 'Valid BBAN', value: '9300762011623852957' },
      { label: 'Short BBAN', value: '9300762011' }
    ],
    boundaries: [
      'Official Swiss bank ownership, account existence, payment delivery, and regulated status require the responsible bank or payment network.'
    ],
    qualityNotes: [
      { title: 'Browser-only', text: 'IBAN check digits are generated locally in this browser.' },
      { title: 'Official boundary', text: 'Generated fixture structure does not prove a live account.' },
      { title: 'Fixture safety', text: 'Use generated IBANs for test payloads, not production payment instructions.' },
      { title: 'Developer handling', text: 'Copy normalized values for forms and masked values for logs.' }
    ]
  });
  const TOOLS = RAW_TOOLS.map(tool => Object.assign({}, tool, { i18n: makeI18n(tool) }));
  function suiteI18n() {
    const out = {};
    for (const [code, l] of Object.entries(LOCALE_UI)) {
      out[code] = {
        workbench: l[0] + ' ' + l[1],
        browserOnly: 'Browser-only',
        offlineChecks: 'Offline',
        countrySpecific: l[0],
        fieldBreakdown: 'Field breakdown',
        qualityNotes: l[11],
        samplesAndRelated: l[13] + ' / related tools',
        validate: l[2],
        waiting: l[3],
        offlinePassed: l[4],
        reviewNeeded: l[5],
        copyResult: l[6],
        downloadResult: l[7],
        clear: l[8],
        copyNormalized: l[9],
        validationPipeline: l[10],
        localChecksCompleted: l[4],
        pass: 'PASS',
        review: 'REVIEW',
        privacyBoundary: 'Privacy',
        officialLookupBoundary: 'Official boundary',
        fixtureSafety: 'Fixture',
        developerHandling: 'Developer',
        qualityNote: l[11],
        qualityNotesSummary: l[11],
        advancedAnalysis: l[12],
        localStructuralSlices: 'Local structure'
      };
    }
    return out;
  }
  function localizedPhrase(key) {
    const l = ui();
    const map = {
      success: l[4],
      review: l[5],
      normalized: l[9],
      pipeline: l[10],
      official: 'Official Swiss systems remain the source of truth.',
      privacy: 'Input stays in this browser.',
      fixture: 'Use examples as safe fixtures only.',
      developer: 'Store normalized values and log masked values.'
    };
    return map[key] || key;
  }
  function field(label, value, note) { return { label, value: value || 'not detected', note: note || '' }; }
  function check(label, pass, good, bad) { return { label, pass: !!pass, text: pass ? good : (bad || good) }; }
  function base(tool, raw) {
    return {
      status: 'review',
      headline: localizedPhrase('review'),
      detail: localizedPhrase('privacy'),
      primary: text(raw).trim() || 'empty',
      normalized: text(raw).trim(),
      fields: [],
      checks: [],
      breakdown: [],
      breakdownTitle: tool.code + ' field breakdown',
      breakdownSummary: 'Swiss local structure, normalized value, and official-system boundary.',
      qualityNotes: [
        { title: 'Browser-only', text: localizedPhrase('privacy') },
        { title: 'Official boundary', text: localizedPhrase('official') },
        { title: 'Fixture safety', text: localizedPhrase('fixture') },
        { title: 'Developer handling', text: localizedPhrase('developer') }
      ],
      suggestions: [],
      developerJson: {}
    };
  }
  function analyze(tool, input) {
    const raw = text(input).trim();
    const result = base(tool, raw);
    const upper = raw.toUpperCase();
    const ds = digits(raw);
    const uid = upper.match(/CHE\D*(\d{3})\D*(\d{3})\D*(\d{3})/);
    const iban = upper.replace(/\s+/g, '').match(/\b(CH|LI)[0-9A-Z]{19}\b/)?.[0] || (upper.replace(/\s+/g, '').startsWith('CH') || upper.replace(/\s+/g, '').startsWith('LI') ? upper.replace(/\s+/g, '') : '');
    const phone = upper.match(/(?:\+41|0041|0)\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}/)?.[0] || '';
    const postal = raw.match(/\b[1-9]\d{3}\b/)?.[0] || '';
    const canton = Object.keys(CANTONS).find(code => new RegExp('\\b' + code + '\\b', 'i').test(raw));
    let ok = raw.length > 0;
    let normalized = raw;
    if (tool.kind === 'uid' || tool.kind === 'vat' || tool.kind === 'eori') {
      ok = !!uid && (tool.kind !== 'vat' || /\b(MWST|TVA|IVA)\b/.test(upper));
      normalized = uid ? 'CHE-' + uid.slice(1).join('.') + (tool.kind === 'vat' ? ' ' + (upper.match(/\b(MWST|TVA|IVA)\b/)?.[1] || 'MWST') : '') : upper.replace(/\s+/g, '');
      result.breakdown.push(field('CHE prefix', uid ? 'CHE' : 'missing', 'Swiss UID country prefix'), field('numeric body', uid ? uid.slice(1).join('') : 'missing', 'three blocks of three digits'), field('suffix', upper.match(/\b(MWST|TVA|IVA)\b/)?.[1] || 'none', 'VAT display suffix'));
    } else if (tool.kind === 'ahv') {
      ok = ds.length === 13 && ds.startsWith('756') && eanCheck(ds.slice(0,12)) === ds[12];
      normalized = ds.length ? ds.replace(/^(\d{3})(\d{4})(\d{4})(\d{2})$/, '$1.$2.$3.$4') : raw;
      result.breakdown.push(field('country prefix', ds.slice(0,3), 'Swiss AHV/AVS numbers start with 756'), field('serial body', ds.slice(3,12), 'personal insurance serial evidence'), field('check digit', ds.slice(12), 'EAN-style control digit'));
    } else if (tool.kind === 'iban') {
      ok = /^(CH|LI)[0-9A-Z]{19}$/.test(iban) && mod97(ibanToDigits(iban)) === 1;
      normalized = iban.replace(/(.{4})/g, '$1 ').trim();
      result.breakdown.push(field('country', iban.slice(0,2), 'CH or LI'), field('check digits', iban.slice(2,4), 'ISO 13616 MOD-97'), field('clearing', iban.slice(4,9), 'Swiss bank clearing segment'), field('account', iban.slice(9), 'local account segment'));
    } else if (tool.kind === 'qrref') {
      ok = ds.length === 27 && qrCheck(ds.slice(0,26)) === ds[26];
      normalized = ds;
      result.breakdown.push(field('reference body', ds.slice(0,26), '26 payload digits'), field('check digit', ds.slice(26), 'recursive MOD-10'), field('length', String(ds.length), 'Swiss QR/ESR reference length'));
    } else if (tool.kind === 'bic') {
      ok = /^[A-Z]{4}(CH|LI)[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(upper.replace(/\s+/g, ''));
      normalized = upper.replace(/\s+/g, '');
      result.breakdown.push(field('institution', normalized.slice(0,4), 'bank code'), field('country', normalized.slice(4,6), 'CH/LI expected'), field('location', normalized.slice(6,8), 'routing location'), field('branch', normalized.slice(8) || 'primary', 'optional branch'));
    } else if (tool.kind === 'phone') {
      ok = !!phone;
      normalized = phone ? '+41' + digits(phone).replace(/^(0041|41|0)/, '') : raw;
      result.breakdown.push(field('country code', '+41', 'Swiss E.164 prefix'), field('national significant', normalized.replace('+41',''), 'subscriber evidence'), field('type hint', /^\+417/.test(normalized) ? 'mobile-like' : 'geographic/service-like', 'offline range hint'));
    } else if (tool.kind === 'postal') {
      ok = !!postal;
      normalized = postal;
      result.breakdown.push(field('postal code', postal, 'four digits'), field('range', postal ? '1000-9999' : 'missing', 'Swiss display shape'), field('locality evidence', raw.replace(postal, '').trim(), 'not official delivery proof'));
    } else if (tool.kind === 'canton' || tool.kind === 'plate') {
      ok = !!canton;
      normalized = canton ? canton + ' ' + CANTONS[canton] : upper;
      result.breakdown.push(field('canton code', canton || 'missing', 'two-letter canton abbreviation'), field('canton name', canton ? CANTONS[canton] : 'not detected', 'local routing context'), field('raw serial', ds || 'none', 'document or plate serial evidence'));
    } else if (tool.kind === 'vin') {
      ok = /^[A-HJ-NPR-Z0-9]{17}$/.test(upper.replace(/\s+/g, ''));
      normalized = upper.replace(/\s+/g, '');
      result.breakdown.push(field('WMI', normalized.slice(0,3), 'manufacturer identifier'), field('VDS', normalized.slice(3,9), 'vehicle descriptor'), field('VIS', normalized.slice(9), 'vehicle indicator'));
    } else if (tool.kind === 'doc') {
      const docValue = upper.replace(/\s+/g, '');
      ok = /^[A-Z]\d{7,8}$/.test(docValue) || /\b(CH|ID|PERMIT|LICENCE|LICENSE|PASSPORT)\b/.test(upper) || ds.length >= 6;
      normalized = docValue || upper;
      result.breakdown.push(field('document evidence', ok ? 'detected' : 'missing', 'Swiss document-shaped local evidence'), field('digits', ds || 'none', 'serial or issue evidence'), field('scope', 'offline only', 'identity proof remains outside the browser'));
    } else if (tool.kind === 'amount') {
      const amount = raw.match(/[0-9][0-9'’\s.,]*[.,][0-9]{2}/)?.[0] || '';
      ok = !!amount;
      const value = amount ? Number(amount.replace(/[ '\u2019]/g, '').replace(',', '.')) : NaN;
      normalized = Number.isFinite(value) ? new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(value) : raw;
      result.breakdown.push(field('display amount', amount || 'missing', 'Swiss CHF style'), field('rappen', Number.isFinite(value) ? String(Math.round(value * 100)) : 'missing', 'integer minor units'), field('currency', /CHF/.test(upper) ? 'CHF' : 'not explicit', 'Swiss franc expected'));
    } else if (tool.kind === 'privacy') {
      ok = /(756\D*\d|CHE\D*\d|CH\d{2}|CH[-\s]?\d{4}|\+41|@|\bVIN\b|[A-HJ-NPR-Z0-9]{17}|\b[A-Z]{2}\s*\d{2,6}\b|\b\d{4}\s+[A-Z][a-z]+|\b(policy|fixture|person|holder|owner)\b)/i.test(raw);
      normalized = mask(raw);
      result.breakdown.push(field('AHV evidence', ds.includes('756') ? 'detected' : 'not detected', 'sensitive personal identifier'), field('UID evidence', uid ? 'detected' : 'not detected', 'company identifier'), field('policy/person evidence', /\b(policy|fixture|person|holder|owner|VIN)\b/i.test(raw) ? 'detected' : 'not detected', 'privacy workflow context'), field('masked preview', normalized, 'safe for logs'));
    } else {
      ok = raw.length > 8;
      normalized = raw;
      result.breakdown.push(field('UID evidence', uid ? 'detected' : 'not detected', 'company identifier'), field('IBAN evidence', iban || 'not detected', 'payment/account hint'), field('postal evidence', postal || 'not detected', 'address hint'), field('canton evidence', canton || 'not detected', 'regional hint'));
    }
    result.status = ok ? 'success' : 'review';
    result.headline = ok ? tool.code + ': ' + localizedPhrase('success') : tool.code + ': ' + localizedPhrase('review');
    result.detail = ok ? 'Swiss browser-only evidence is structurally coherent.' : 'Add Swiss local evidence or use the valid sample.';
    result.primary = normalized || raw || 'empty';
    result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, localizedPhrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', localizedPhrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check('Swiss evidence', ok, 'Swiss structure evidence detected.', 'Swiss local structure is missing or inconsistent.'), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, localizedPhrase('official'))];
    result.suggestions = ok ? ['Copy normalized value for fixtures.', 'Use official systems for regulated status.'] : ['Load a valid sample.', 'Check country prefix, digit length, suffix, or canton code.'];
    result.developerJson = { suite: 'switzerland-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: localizedPhrase('official') };
    return result;
  }
  function mount() {
    const factory = window.ValidoHubCountrySuiteFactory;
    if (!factory) return false;
    const suite = factory.createSuite({
      suiteId: 'switzerland-suite',
      country: { slug: 'switzerland', name: 'Switzerland' },
      theme: { accent: '#dc2626', accent2: '#111827', accent3: '#fbbf24' },
      i18n: suiteI18n(),
      tools: TOOLS,
      analyze
    });
    suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench'));
    window.ValidoHubSwitzerlandSuite = suite;
    return true;
  }
  function init() {
    if (mount()) return;
    setTimeout(init, 20);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
