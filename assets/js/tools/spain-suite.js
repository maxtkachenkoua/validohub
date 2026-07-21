(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.spain-suite';
  const RAW_TOOLS = [
  {
    "id": "spain-id-validator",
    "name": "Spain DNI/NIE/NIF/CIF Workbench",
    "code": "ID",
    "summary": "Validate Spanish DNI, NIE, NIF, legacy CIF, and ES VAT-style identifiers with local checksum diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "id",
    "samples": [
      {
        "label": "Valid DNI",
        "value": "00000000T"
      },
      {
        "label": "Valid NIE",
        "value": "X1234567L"
      },
      {
        "label": "CIF sample",
        "value": "B12345674"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-nif-validator",
    "name": "Spanish NIF Validator",
    "code": "NIF",
    "summary": "Validate personal and legal Spanish NIF shapes, split body/control evidence, and prepare tax-form diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "id",
    "samples": [
      {
        "label": "DNI NIF",
        "value": "12345678Z"
      },
      {
        "label": "NIE NIF",
        "value": "Y1234567X"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-dni-validator",
    "name": "Spanish DNI Validator",
    "code": "DNI",
    "summary": "Replay DNI modulo-23 control letters, normalize separators, and expose body/check-letter debugging fields.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "dni",
    "samples": [
      {
        "label": "Valid DNI",
        "value": "00000000T"
      },
      {
        "label": "Bad letter",
        "value": "00000000A"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-nie-validator",
    "name": "Spanish NIE Validator",
    "code": "NIE",
    "summary": "Validate NIE X/Y/Z prefix mapping, modulo-23 control letters, and foreigner-ID syntax boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "nie",
    "samples": [
      {
        "label": "Valid NIE",
        "value": "X1234567L"
      },
      {
        "label": "Bad NIE",
        "value": "Y1234567L"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-cif-legacy-inspector",
    "name": "Spanish CIF Legacy Inspector",
    "code": "CIF",
    "summary": "Inspect legacy legal-entity CIF/NIF prefixes, weighted control digits, and company-identifier boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "cif",
    "samples": [
      {
        "label": "Company CIF",
        "value": "B12345674"
      },
      {
        "label": "Letter control",
        "value": "P2345678D"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vat-id-validator",
    "name": "Spanish VAT ID / ES Prefix Validator",
    "code": "VAT",
    "summary": "Normalize ES VAT identifiers, inspect NIF/CIF body evidence, and separate VIES status from offline syntax.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "ES NIE VAT",
        "value": "ESX1234567L"
      },
      {
        "label": "ES CIF VAT",
        "value": "ESB12345674"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-eori-validator",
    "name": "Spanish EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect Spanish EORI/customs identifiers, ES country prefixes, tax-body evidence, and customs lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "ES EORI sample",
        "value": "ESB12345674"
      },
      {
        "label": "Foreign prefix",
        "value": "FR123456789"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-naf-social-security-helper",
    "name": "Spanish NAF Social Security Helper",
    "code": "NAF",
    "summary": "Inspect Spanish social-security affiliation number snippets, province prefixes, serial body, and official TGSS boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "naf",
    "samples": [
      {
        "label": "NAF sample",
        "value": "28 1234567890"
      },
      {
        "label": "Short NAF",
        "value": "28 12345"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-company-onboarding-auditor",
    "name": "Spanish Company Onboarding Auditor",
    "code": "ONB",
    "summary": "Audit Spanish company onboarding payloads for NIF/CIF, VAT, IBAN, address, phone, and official-system boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Company payload",
        "value": "B12345674 ES9121000418450200051332 Calle Mayor 1, 28013 Madrid"
      },
      {
        "label": "Sparse payload",
        "value": "Empresa demo Madrid"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-registro-mercantil-readiness-helper",
    "name": "Spanish Registro Mercantil Readiness Helper",
    "code": "RM",
    "summary": "Check company-registration handoff payloads for NIF, province, legal-name, and registry-boundary evidence.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "registry",
    "samples": [
      {
        "label": "Registry snippet",
        "value": "Sociedad Demo SL B12345674 Madrid Tomo 1234 Folio 56"
      },
      {
        "label": "Missing NIF",
        "value": "Sociedad Demo SL Madrid"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-iban-validator",
    "name": "Spain IBAN Validator",
    "code": "IBAN",
    "summary": "Validate Spanish IBAN numbers, split bank/branch/account fields, and replay MOD-97 evidence locally.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid IBAN",
        "value": "ES9121000418450200051332"
      },
      {
        "label": "Bad check",
        "value": "ES0021000418450200051332"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-ccc-bank-account-inspector",
    "name": "Spanish CCC Bank Account Inspector",
    "code": "CCC",
    "summary": "Inspect Spanish domestic CCC account numbers, bank, branch, check digits, and account slices for payment debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "ccc",
    "samples": [
      {
        "label": "CCC sample",
        "value": "2100 0418 45 0200051332"
      },
      {
        "label": "Short CCC",
        "value": "21000418"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-bank-code-inspector",
    "name": "Spanish Bank / Branch Code Inspector",
    "code": "BANK",
    "summary": "Split Spanish bank and branch codes from CCC/IBAN snippets and prepare bank-directory handoff notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Bank branch",
        "value": "2100 0418"
      },
      {
        "label": "IBAN source",
        "value": "ES9121000418450200051332"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-bic-swift-inspector",
    "name": "Spanish BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Validate BIC/SWIFT shape for Spanish institutions, country code, location, and branch evidence.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "bic",
    "samples": [
      {
        "label": "Spanish BIC",
        "value": "CAIXESBBXXX"
      },
      {
        "label": "Foreign BIC",
        "value": "DEUTDEFF"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-sepa-transfer-helper",
    "name": "Spanish SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Audit Spanish SEPA transfer snippets for IBAN, BIC, EUR amount, remittance text, and payment-boundary evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "SEPA snippet",
        "value": "ES9121000418450200051332 EUR 1.234,56 Factura A-2026-001"
      },
      {
        "label": "Missing IBAN",
        "value": "EUR 20,00 Factura"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-sepa-direct-debit-mandate-helper",
    "name": "Spanish SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect Spanish SEPA direct-debit mandate fields, creditor references, IBAN evidence, and signed-mandate boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "sepa",
    "samples": [
      {
        "label": "Mandate snippet",
        "value": "Mandato ES9121000418450200051332 referencia M-2026-0001"
      },
      {
        "label": "Missing account",
        "value": "Mandato M-2026"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-bizum-reference-helper",
    "name": "Spanish Bizum Reference Helper",
    "code": "BIZ",
    "summary": "Inspect Bizum-ready phone/payment snippets, E.164 normalization, amount evidence, and PSP boundary notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bizum",
    "samples": [
      {
        "label": "Bizum phone",
        "value": "+34 612 345 678 25,00 EUR"
      },
      {
        "label": "Local phone",
        "value": "612345678"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-remittance-text-builder",
    "name": "Spanish Remittance Text Builder",
    "code": "REM",
    "summary": "Normalize Spanish remittance snippets, invoice references, NIF evidence, and log-safe payment descriptions.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Invoice text",
        "value": "Factura A-2026-001 B12345674 1.234,56 EUR"
      },
      {
        "label": "Free text",
        "value": "Pago servicios julio"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-payment-reconciliation-helper",
    "name": "Spanish Payment Reconciliation Helper",
    "code": "REC",
    "summary": "Audit Spanish payment reconciliation rows for IBAN, NIF, invoice, amount, and date evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Reconciliation row",
        "value": "2026-07-12;ES9121000418450200051332;B12345674;1.234,56;Factura A-001"
      },
      {
        "label": "Sparse row",
        "value": "Pago factura"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-bank-statement-parser",
    "name": "Spanish Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse Spanish bank-statement snippets for dates, EUR amounts, IBAN/CCC evidence, and reconciliation hints.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Statement line",
        "value": "12/07/2026 TRANSFERENCIA ES9121000418450200051332 -1.234,56 EUR"
      },
      {
        "label": "Plain memo",
        "value": "TRANSFERENCIA CLIENTE"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-masked-iban-formatter",
    "name": "Spanish Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Mask Spanish IBAN and CCC values for logs while preserving country, bank, branch, and account debugging slices.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Mask IBAN",
        "value": "ES9121000418450200051332"
      },
      {
        "label": "Mask CCC",
        "value": "21000418450200051332"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-eur-decimal-currency-formatter",
    "name": "Spanish EUR Decimal Currency Formatter",
    "code": "EUR",
    "summary": "Normalize Spanish EUR amounts, comma decimals, dot thousands, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Spanish amount",
        "value": "1.234,56 EUR"
      },
      {
        "label": "API amount",
        "value": "1234.56 EUR"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vat-rate-sanity-helper",
    "name": "Spanish VAT Rate Sanity Helper",
    "code": "IVA",
    "summary": "Check Spanish IVA rate snippets, standard/reduced/super-reduced evidence, and tax-filing boundary notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "IVA rate",
        "value": "IVA 21% base 100,00 total 121,00"
      },
      {
        "label": "Reduced rate",
        "value": "IVA 10%"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vat-return-field-helper",
    "name": "Spanish VAT Return Field Helper",
    "code": "303",
    "summary": "Inspect Spanish VAT return snippets, NIF, period, amount, and Modelo 303 handoff evidence.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "taxform",
    "samples": [
      {
        "label": "Modelo 303",
        "value": "Modelo 303 B12345674 2026T2 IVA 21% 1.234,56"
      },
      {
        "label": "Missing period",
        "value": "B12345674 IVA 21%"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-invoice-number-helper",
    "name": "Spanish Invoice Number Helper",
    "code": "INV",
    "summary": "Check Spanish invoice-number snippets, series/year patterns, NIF/VAT evidence, and duplicate-risk notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Invoice number",
        "value": "Factura A-2026-000123 B12345674"
      },
      {
        "label": "Short invoice",
        "value": "Factura 123"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-facturae-readiness-checker",
    "name": "Spanish Facturae XML Readiness Checker",
    "code": "FACe",
    "summary": "Audit Facturae/FACe-ready payload snippets for issuer NIF, buyer NIF, invoice, amount, date, and XML-boundary evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Facturae fields",
        "value": "Facturae B12345674 00000000T A-2026-001 1.234,56 12/07/2026"
      },
      {
        "label": "Missing buyer",
        "value": "Facturae B12345674 A-001"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-verifactu-readiness-helper",
    "name": "Spanish VeriFactu Readiness Helper",
    "code": "VF",
    "summary": "Inspect VeriFactu-style invoice reporting snippets for NIF, invoice series, hash boundary, QR hints, and AEAT handoff notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "einvoice",
    "samples": [
      {
        "label": "VeriFactu snippet",
        "value": "VeriFactu B12345674 Factura A-2026-001 fecha 12/07/2026 importe 1.234,56"
      },
      {
        "label": "Sparse invoice",
        "value": "Factura A-1"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-sii-vat-ledger-helper",
    "name": "Spanish SII VAT Ledger Helper",
    "code": "SII",
    "summary": "Audit SII VAT ledger rows for issuer NIF, invoice date, tax base, IVA rate, and official filing boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "taxform",
    "samples": [
      {
        "label": "SII ledger row",
        "value": "SII;B12345674;A-2026-001;12/07/2026;base 100,00;IVA 21%"
      },
      {
        "label": "Missing NIF",
        "value": "SII factura A-001"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-aeat-modelo-readiness-helper",
    "name": "Spanish AEAT Modelo Readiness Helper",
    "code": "AEAT",
    "summary": "Inspect Spanish AEAT model snippets for NIF, period, tax amount, and official filing handoff requirements.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "taxform",
    "samples": [
      {
        "label": "Modelo snippet",
        "value": "Modelo 303 periodo 2T 2026 NIF B12345674 importe 1.234,56"
      },
      {
        "label": "Missing NIF",
        "value": "Modelo 303 2T"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-accounting-audit-trail-checklist-generator",
    "name": "Spanish Accounting Audit Trail Checklist Helper",
    "code": "AUD",
    "summary": "Generate and audit Spanish accounting evidence checklists for invoices, IVA, IBAN, NIF, dates, and privacy-safe handoff.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "checklist",
    "samples": [
      {
        "label": "Audit row",
        "value": "Factura A-2026-001 B12345674 ES9121000418450200051332 IVA 21%"
      },
      {
        "label": "Checklist seed",
        "value": "IVA invoices bank statement"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-postal-code-validator",
    "name": "Spanish Postal Code Validator",
    "code": "CP",
    "summary": "Validate five-digit Spanish postal codes, province prefix evidence, and offline Correos-boundary notes.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Madrid CP",
        "value": "28013"
      },
      {
        "label": "Bad CP",
        "value": "999"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-address-normalizer",
    "name": "Spanish Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize Spanish address snippets, street types, postal codes, municipality, province, and local delivery evidence.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Madrid address",
        "value": "Calle Mayor 1, 3B, 28013 Madrid"
      },
      {
        "label": "Sparse address",
        "value": "Mayor 1 Madrid"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-address-transliteration-normalizer",
    "name": "Spanish Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Normalize Spanish accents and address text for ASCII-safe forms, search keys, and integration payloads.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Accented address",
        "value": "Calle de Alcalá, 48, 28014 Madrid"
      },
      {
        "label": "Company name",
        "value": "Niño & Compañía SL"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-province-code-mapper",
    "name": "Spanish Province Code Mapper",
    "code": "PROV",
    "summary": "Map Spanish postal-code prefixes and province snippets into province evidence for forms and QA payloads.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "province",
    "samples": [
      {
        "label": "Madrid prefix",
        "value": "28 Madrid"
      },
      {
        "label": "Barcelona prefix",
        "value": "08 Barcelona"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-municipality-code-inspector",
    "name": "Spanish Municipality Code Inspector",
    "code": "MUN",
    "summary": "Inspect INE-style municipality snippets, province prefixes, and local geography handoff boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Municipality code",
        "value": "28079 Madrid"
      },
      {
        "label": "Name only",
        "value": "Valencia"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-phone-number-validator",
    "name": "Spanish Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate Spanish phone snippets, mobile/fixed-line evidence, and +34 normalization boundaries.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Mobile phone",
        "value": "+34 612 345 678"
      },
      {
        "label": "Fixed line",
        "value": "91 123 45 67"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-phone-e164-formatter",
    "name": "Spanish Phone E.164 Formatter",
    "code": "E164",
    "summary": "Format Spanish phone numbers to E.164-like previews and split country/national subscriber evidence.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Local mobile",
        "value": "612345678"
      },
      {
        "label": "Spaced phone",
        "value": "93 123 45 67"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-date-locale-formatter",
    "name": "Spanish Date Locale Formatter",
    "code": "DATE",
    "summary": "Parse Spanish DD/MM/YYYY date snippets, normalize ISO previews, and expose timezone/date evidence.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "Spanish date",
        "value": "12/07/2026"
      },
      {
        "label": "ISO date",
        "value": "2026-07-12"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-csv-locale-normalizer",
    "name": "Spanish CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Audit Spanish CSV snippets for semicolon delimiters, comma decimals, dates, NIF, IBAN, and address evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "csv",
    "samples": [
      {
        "label": "CSV row",
        "value": "nif;iban;importe;fecha\nB12345674;ES9121000418450200051332;1.234,56;12/07/2026"
      },
      {
        "label": "Comma CSV",
        "value": "nif,amount\nB12345674,1234.56"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-slug-normalizer",
    "name": "Spanish Slug Normalizer",
    "code": "SLUG",
    "summary": "Normalize Spanish names, accents, legal suffixes, and URL-safe slugs for developer payloads.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Spanish text",
        "value": "Niño y Compañía Sociedad Limitada"
      },
      {
        "label": "Address slug",
        "value": "Calle Alcalá 48 Madrid"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-document-ocr-fixer",
    "name": "Spanish Document OCR Fixer",
    "code": "OCR",
    "summary": "Repair Spanish OCR snippets for NIF, IBAN, dates, amounts, postal codes, and privacy-safe document review.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "ocr",
    "samples": [
      {
        "label": "OCR snippet",
        "value": "N1F B12345674 IBAN ES91 2100 0418 45 0200051332 fecha 12/07/2026"
      },
      {
        "label": "Noisy text",
        "value": "Factura A-OO1 importe l.234,56"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-gdpr-lopdgdd-redaction-helper",
    "name": "Spanish GDPR / LOPDGDD Redaction Helper",
    "code": "GDPR",
    "summary": "Redact Spanish identity, tax, banking, phone, address, and vehicle evidence for privacy-safe support payloads.",
    "category": "developer-tools",
    "actionLabel": "Redact",
    "kind": "privacy",
    "samples": [
      {
        "label": "Privacy payload",
        "value": "B12345674 ES9121000418450200051332 +34 612345678 Calle Mayor 1"
      },
      {
        "label": "Name payload",
        "value": "Maria Garcia DNI 00000000T"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-pii-masker",
    "name": "Spanish PII Masker",
    "code": "PII",
    "summary": "Mask Spanish DNI/NIE/NIF, IBAN, phone, address, and invoice evidence while preserving debugging structure.",
    "category": "developer-tools",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "PII sample",
        "value": "00000000T ES9121000418450200051332 +34 612345678"
      },
      {
        "label": "Company PII",
        "value": "B12345674 Calle Mayor 1 Madrid"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-personal-data-fixture-generator",
    "name": "Spanish Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate and inspect clearly fake Spanish-style personal fixtures with ID, address, phone, and privacy notes.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Fixture seed",
        "value": "Madrid 00000000T +34 612345678"
      },
      {
        "label": "Company fixture",
        "value": "Demo SL B12345674"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-id-card-format-helper",
    "name": "Spanish ID Card Format Helper",
    "code": "DOC",
    "summary": "Inspect Spanish identity-card snippets, DNI/NIE evidence, dates, and official identity-proof boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "ID card snippet",
        "value": "DNI 00000000T validez 12/07/2030"
      },
      {
        "label": "Missing date",
        "value": "DNI 00000000T"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-passport-number-helper",
    "name": "Spanish Passport Number Helper",
    "code": "PASS",
    "summary": "Inspect Spanish passport-like document numbers, MRZ hints, nationality/date slices, and official document-validation boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Passport snippet",
        "value": "PAS ESP A1234567 fecha 12/07/2030"
      },
      {
        "label": "MRZ hint",
        "value": "P<ESPGARCIA<<MARIA"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-driving-licence-format-helper",
    "name": "Spanish Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect Spanish driving-licence snippets, DNI evidence, categories, dates, and DGT boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Licence snippet",
        "value": "DGT DNI 00000000T B permiso hasta 12/07/2030"
      },
      {
        "label": "Category only",
        "value": "Permiso B"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-residence-permit-format-helper",
    "name": "Spanish Residence Permit Format Helper",
    "code": "TIE",
    "summary": "Inspect Spanish TIE/residence-permit snippets, NIE evidence, dates, and official immigration boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "TIE snippet",
        "value": "TIE X1234567L expira 12/07/2030"
      },
      {
        "label": "Missing NIE",
        "value": "Tarjeta residencia"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-health-card-format-helper",
    "name": "Spanish Health Card Format Helper",
    "code": "TSI",
    "summary": "Inspect Spanish health-card/social-health snippets, regional evidence, identity slices, and official health-system boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Health card",
        "value": "TSI Madrid 00000000T 28013"
      },
      {
        "label": "Sparse card",
        "value": "Tarjeta sanitaria"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vehicle-plate-inspector",
    "name": "Spanish Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect Spanish vehicle plates, serial blocks, province-era hints, and DGT/registry boundary notes.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Modern plate",
        "value": "1234 BCD"
      },
      {
        "label": "Province era",
        "value": "M-1234-AB"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vin-validator",
    "name": "Spanish VIN Validator",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare Spanish vehicle-intake diagnostics.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "vin",
    "samples": [
      {
        "label": "VIN sample",
        "value": "VSSZZZ1JZXW000001"
      },
      {
        "label": "Short VIN",
        "value": "VSS123"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-vehicle-data-redaction-helper",
    "name": "Spanish Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask Spanish plate, VIN, owner, tax ID, and address evidence in vehicle support payloads.",
    "category": "developer-tools",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Vehicle payload",
        "value": "1234BCD VSSZZZ1JZXW000001 00000000T Madrid"
      },
      {
        "label": "Plate only",
        "value": "1234 BCD"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-customs-declaration-helper",
    "name": "Spanish Customs Declaration Helper",
    "code": "CUS",
    "summary": "Inspect Spanish customs payload snippets for EORI, TARIC-like codes, invoice, value, and official customs boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "customs",
    "samples": [
      {
        "label": "Customs snippet",
        "value": "EORI ESB12345674 TARIC 851712 valor 1.234,56 EUR"
      },
      {
        "label": "Missing EORI",
        "value": "TARIC 851712"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-postal-tracking-helper",
    "name": "Spanish Postal Tracking Helper",
    "code": "POST",
    "summary": "Inspect Spanish postal/carrier tracking snippets, postal code, phone, and delivery-status boundary notes.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "postaltrack",
    "samples": [
      {
        "label": "Tracking snippet",
        "value": "Correos PQ123456789ES 28013 +34 612345678"
      },
      {
        "label": "Tracking only",
        "value": "PQ123456789ES"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-data-quality-workbench",
    "name": "Spanish Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed Spanish payloads for identifiers, dates, amounts, addresses, phone, and locale consistency.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Mixed payload",
        "value": "B12345674;ES9121000418450200051332;28013 Madrid;+34 612345678;1.234,56;12/07/2026"
      },
      {
        "label": "Sparse payload",
        "value": "Madrid payment"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-json-fixture-generator",
    "name": "Spanish JSON Fixture Helper",
    "code": "JSON",
    "summary": "Inspect Spanish JSON fixtures for locale, NIF, IBAN, phone, date, amount, and privacy-safe payload shape.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "json",
    "samples": [
      {
        "label": "JSON fixture",
        "value": "{\"locale\":\"es-ES\",\"nif\":\"B12345674\",\"iban\":\"ES9121000418450200051332\",\"fecha\":\"12/07/2026\"}"
      },
      {
        "label": "Broken JSON",
        "value": "{locale: es-ES}"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-regex-pack-helper",
    "name": "Spanish Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for Spanish DNI/NIE/NIF, IBAN, postal codes, phones, dates, and local evidence labels.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "regex",
    "samples": [
      {
        "label": "Regex request",
        "value": "Necesito regex para DNI NIE IBAN CP telefono fecha"
      },
      {
        "label": "NIF pattern",
        "value": "B12345674"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-api-payload-auditor",
    "name": "Spanish API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for Spain locale, NIF/VAT, IBAN, dates, amounts, addresses, and official-system boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "API payload",
        "value": "{\"country\":\"ES\",\"locale\":\"es-ES\",\"vat\":\"ESB12345674\",\"iban\":\"ES9121000418450200051332\",\"amount\":\"1.234,56\"}"
      },
      {
        "label": "Missing locale",
        "value": "{\"vat\":\"B12345674\"}"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-form-field-auditor",
    "name": "Spanish Form Field Auditor",
    "code": "FORM",
    "summary": "Check Spanish form-field labels and values for NIF, IBAN, postal code, province, phone, address, and privacy handling.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Form fields",
        "value": "NIF=B12345674\nIBAN=ES9121000418450200051332\nCP=28013\nTelefono=612345678"
      },
      {
        "label": "Weak labels",
        "value": "id=123 iban=abc"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
    "id": "spain-mrz-passport-parser",
    "name": "Spanish MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse Spanish passport MRZ snippets, split document, nationality, birth-date, expiry, and checksum evidence without identity proof.",
    "category": "developer-tools",
    "actionLabel": "Parse",
    "kind": "mrz",
    "samples": [
      {
        "label": "MRZ sample",
        "value": "P<ESPGARCIA<<MARIA<<<<<<<<<<<<<<<<<<<<\nA1234567<ESP8501019F3001012<<<<<<<<<<<<<<04"
      },
      {
        "label": "Short MRZ",
        "value": "P<ESP"
      }
    ],
    "boundaries": [
      "Official Spanish registry status, identity proof, tax filing, VIES confirmation, bank account ownership, payment delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Spanish authority or provider."
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
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Spanish systems remain the source of truth.', localStructure: 'Spanish local structure', addEvidence: 'Add Spanish local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales espanoles siguen siendo la fuente de verdad.', localStructure: 'estructura local espanola', addEvidence: 'Agrega evidencia espanola o usa la muestra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle spanische Systeme bleiben die Quelle der Wahrheit.', localStructure: 'spanische lokale Struktur', addEvidence: 'Fuege spanische Evidenz hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels espagnols restent la source de verite.', localStructure: 'structure locale espagnole', addEvidence: 'Ajoutez une preuve espagnole ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy hiszpanskie pozostaja zrodlem prawdy.', localStructure: 'hiszpanska struktura lokalna', addEvidence: 'Dodaj hiszpanskie dane lub uzyj poprawnej probki.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais espanhois continuam sendo a fonte da verdade.', localStructure: 'estrutura local espanhola', addEvidence: 'Adicione evidencia espanhola ou use a amostra valida.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Spanish systems remain the source of truth.', localStructure: 'Spanish local structure', addEvidence: 'Add Spanish local evidence or use the valid sample.' }
  };
  const fieldBreakdown = 'Spanish local structure';
  const LOCALE_KEYS = ['en','es','pt-BR','de','fr','pl','uk'];
  function suiteI18n() {
    const base = { validate: 'Validate', copyResult: 'Copy result', downloadResult: 'Download result', clear: 'Clear', output: 'Output', waitingForInput: 'Waiting for input', validSample: 'Valid sample', relatedTools: 'Valid sample / related tools', qualityNotes: 'Quality notes', advancedAnalysis: 'Advanced analysis', fieldBreakdown: 'Field breakdown', validationPipeline: 'Validation pipeline', copyNormalized: 'Copy normalized' };
    const localized = { es: { validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Descargar resultado', clear: 'Limpiar', output: 'Salida', waitingForInput: 'Esperando entrada', validSample: 'Muestra valida', relatedTools: 'Muestra valida / herramientas relacionadas', qualityNotes: 'Notas de calidad', advancedAnalysis: 'Analisis avanzado', fieldBreakdown: 'Desglose de campos', validationPipeline: 'Pipeline de validacion', copyNormalized: 'Copiar normalizado' }, de: { validate: 'Pruefen', copyResult: 'Ergebnis kopieren', downloadResult: 'Ergebnis herunterladen', clear: 'Leeren', output: 'Ausgabe', waitingForInput: 'Warte auf Eingabe', validSample: 'Gueltige Probe', relatedTools: 'Gueltige Probe / verwandte Tools', qualityNotes: 'Qualitaetshinweise', advancedAnalysis: 'Erweiterte Analyse', fieldBreakdown: 'Feldaufschluesselung', validationPipeline: 'Validierungspipeline', copyNormalized: 'Normalisiertes kopieren' }, fr: { validate: 'Valider', copyResult: 'Copier le resultat', downloadResult: 'Telecharger le resultat', clear: 'Effacer', output: 'Sortie', waitingForInput: 'En attente de saisie', validSample: 'Exemple valide', relatedTools: 'Exemple valide / outils lies', qualityNotes: 'Notes qualite', advancedAnalysis: 'Analyse avancee', fieldBreakdown: 'Detail des champs', validationPipeline: 'Pipeline de validation', copyNormalized: 'Copier la valeur normalisee' }, pl: { validate: 'Sprawdz', copyResult: 'Kopiuj wynik', downloadResult: 'Pobierz wynik', clear: 'Wyczysc', output: 'Wynik', waitingForInput: 'Oczekiwanie na dane', validSample: 'Poprawna probka', relatedTools: 'Poprawna probka / powiazane narzedzia', qualityNotes: 'Notatki jakosci', advancedAnalysis: 'Analiza zaawansowana', fieldBreakdown: 'Rozbicie pol', validationPipeline: 'Pipeline walidacji', copyNormalized: 'Kopiuj znormalizowane' }, 'pt-BR': { validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Baixar resultado', clear: 'Limpar', output: 'Saida', waitingForInput: 'Aguardando entrada', validSample: 'Amostra valida', relatedTools: 'Amostra valida / ferramentas relacionadas', qualityNotes: 'Notas de qualidade', advancedAnalysis: 'Analise avancada', fieldBreakdown: 'Detalhamento de campos', validationPipeline: 'Pipeline de validacao', copyNormalized: 'Copiar normalizado' }, uk: { validate: 'Validate', copyResult: 'Copy result', downloadResult: 'Download result', clear: 'Clear', output: 'Output', waitingForInput: 'Waiting for input', validSample: 'Valid sample', relatedTools: 'Valid sample / related tools', qualityNotes: 'Quality notes', advancedAnalysis: 'Advanced analysis', fieldBreakdown: 'Field breakdown', validationPipeline: 'Validation pipeline', copyNormalized: 'Copy normalized' } };
    const dict = {}; for (const key of LOCALE_KEYS) dict[key] = Object.assign({}, base, localized[key] || {}); return dict;
  }
  function locale() { return document.documentElement.lang || (location.pathname.split('/').filter(Boolean)[0] || 'en'); }
  function phrase(key) { const code = locale(); return (LOCALIZED[code] && LOCALIZED[code][key]) || (LOCALIZED[code && code.split('-')[0]] && LOCALIZED[code.split('-')[0]][key]) || LOCALIZED.en[key] || key; }
  function field(label, value, detail) { return { label, value: value == null || value === '' ? 'not detected' : String(value), detail: detail || 'Spanish evidence slice' }; }
  function check(label, ok, pass, fail) { return { label, status: ok ? 'pass' : 'review', message: ok ? pass : fail }; }
  function compact(input) { return String(input || '').normalize('NFKC').trim(); }
  function alnum(input) { return compact(input).toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function digits(input) { return compact(input).replace(/\D/g, ''); }
  function mask(value) { const s = String(value || ''); if (s.length <= 8) return s ? s[0] + '...' : ''; return s.slice(0, 3) + '...' + s.slice(-4); }
  const DNI_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const CIF_CONTROL_LETTERS = 'JABCDEFGHI';
  const CIF_DIGIT_ONLY = new Set(['A','B','E','H']);
  const CIF_LETTER_ONLY = new Set(['K','P','Q','R','S','W']);
  function mod97(iban) { let rearranged = iban.slice(4) + iban.slice(0,4); let remainder = 0; for (const ch of rearranged) { const value = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch; for (const d of value) remainder = (remainder * 10 + Number(d)) % 97; } return remainder; }
  function dniExpected(body) { const n = Number(body.slice(0, 8)); return DNI_LETTERS[n % 23]; }
  function nieExpected(body) { const map = { X:'0', Y:'1', Z:'2' }; return DNI_LETTERS[Number(map[body[0]] + body.slice(1,8)) % 23]; }
  function cifCalc(body) { const digits7 = body.slice(1, 8); let sum = 0; const steps = []; for (let i=0;i<7;i++) { let n = Number(digits7[i]); if (i % 2 === 0) { n *= 2; if (n > 9) n = Math.floor(n / 10) + (n % 10); } sum += n; steps.push(String(n)); } const digit = (10 - (sum % 10)) % 10; return { sum, digit, letter: CIF_CONTROL_LETTERS[digit], steps }; }
  function analyzeId(value) { const body = alnum(value).replace(/^ES/, ''); if (/^\d{8}[A-Z]$/.test(body)) { const expected = dniExpected(body); return { ok: expected === body[8], type:'DNI', normalized: body, parts:[field('number body', body.slice(0,8), 'DNI body'), field('control letter', body[8], 'expected ' + expected), field('checksum method', 'mod 23', 'DNI control replay')] }; } if (/^[XYZ]\d{7}[A-Z]$/.test(body)) { const expected = nieExpected(body); return { ok: expected === body[8], type:'NIE', normalized: body, parts:[field('prefix', body[0], 'X/Y/Z foreigner prefix'), field('numeric body', body.slice(1,8), '7 digits'), field('control letter', body[8], 'expected ' + expected)] }; } if (/^[A-Z]\d{7}[A-Z0-9]$/.test(body)) { const calc = cifCalc(body); const prefix = body[0]; const acceptsDigit = !CIF_LETTER_ONLY.has(prefix); const acceptsLetter = !CIF_DIGIT_ONLY.has(prefix); const expected = [acceptsDigit ? String(calc.digit) : '', acceptsLetter ? calc.letter : ''].filter(Boolean); return { ok: expected.includes(body[8]), type:'CIF/NIF legal entity', normalized: body, parts:[field('entity prefix', prefix, 'legal entity family'), field('body digits', body.slice(1,8), 'weighted body'), field('control symbol', body[8], 'expected ' + expected.join(' or ')), field('checksum sum', calc.sum, 'weighted CIF replay')] }; } return { ok:false, type:'Spanish identifier', normalized: body, parts:[field('normalized body', body || 'empty', 'after ES prefix/separators'), field('expected shapes', 'DNI/NIE/CIF', 'Spanish tax identity shapes'), field('control evidence', 'not detected', 'checksum cannot run')] }; }
  function detectEvidence(raw) { const text = compact(raw); const upper = text.toUpperCase(); return { text, upper, id:(upper.match(/(?:ES)?(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z]|[A-Z]\d{7}[A-Z0-9])/)||[])[0]||'', iban:(upper.match(/ES\d{22}/)||[])[0]||'', ccc:(upper.match(/\b\d{4}[\s-]?\d{4}[\s-]?\d{2}[\s-]?\d{10}\b/)||[])[0]||'', postal:(text.match(/\b(?:0[1-9]|[1-4]\d|5[0-2])\d{3}\b/)||[])[0]||'', phone:(text.match(/(?:\+34\s*)?(?:[679]\d{2}|[89]\d{2})[\s.-]?\d{2,3}[\s.-]?\d{2,3}[\s.-]?\d{2,3}/)||[])[0]||'', date:(text.match(/\b(?:\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})\b/)||[])[0]||'', amount:(text.match(/\b\d{1,3}(?:\.\d{3})*,\d{2}\s*(?:€|EUR)?\b|\b\d+\.\d{2}\s*EUR\b/i)||[])[0]||'', bic:(upper.match(/\b[A-Z]{4}ES[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b/)||[])[0]||'', province:(upper.match(/\b(?:MADRID|BARCELONA|VALENCIA|SEVILLA|ZARAGOZA|MALAGA|MURCIA|BILBAO|ALICANTE|CORDOBA|VALLADOLID|VIGO|GIJON|A CORUNA|GRANADA|TARRAGONA|GIRONA|TOLEDO|CADIZ|NAVARRA|LA RIOJA|BADAJOZ|CACERES|HUELVA|JAEN|LEON|LUGO|OURENSE|PALENCIA|SEGOVIA|SORIA|TERUEL|ZAMORA)\b/)||[])[0]||'', plate:(upper.match(/\b(?:\d{4}\s?[A-Z]{3}|[A-Z]{1,2}-?\d{4}-?[A-Z]{1,2})\b/)||[])[0]||'', vin:(upper.match(/\b[A-HJ-NPR-Z0-9]{17}\b/)||[])[0]||'', tracking:(upper.match(/\b[A-Z]{2}\d{9}ES\b/)||[])[0]||'' }; }
  function ibanParts(raw) { const iban = alnum(raw).match(/ES\d{22}/)?.[0] || alnum(raw); return { iban, ok:/^ES\d{22}$/.test(iban) && mod97(iban) === 1, parts:[field('country', iban.slice(0,2), 'IBAN country'), field('check digits', iban.slice(2,4), 'MOD-97 remainder ' + (iban.length > 4 ? mod97(iban) : 'n/a')), field('bank code', iban.slice(4,8), 'Spanish entidad'), field('branch code', iban.slice(8,12), 'oficina'), field('CCC check digits', iban.slice(12,14), 'domestic account checks'), field('account', iban.slice(14), '10-digit account slice')] }; }
  function analyze(tool, input) {
    const raw = compact(input || (tool.samples[0] && tool.samples[0].value) || ''); const ev = detectEvidence(raw);
    const result = { status:'review', headline: tool.code + ': ' + phrase('review'), detail: phrase('addEvidence'), primary: raw || 'empty', normalized: raw, checks: [], fields: [], breakdownTitle: tool.name + ' field breakdown', breakdownSummary: 'Named Spanish evidence slices for debugging and handoff.', breakdown: [], qualityNotes: tool.qualityNotes, suggestions: [], developerJson: {} };
    let ok = false; let normalized = raw;
    if (['id','dni','nie','cif','vat'].includes(tool.kind)) { const id = analyzeId(raw); ok = id.ok && (tool.kind === 'id' || (tool.kind === 'dni' && id.type === 'DNI') || (tool.kind === 'nie' && id.type === 'NIE') || (tool.kind === 'cif' && id.type.includes('CIF')) || (tool.kind === 'vat' && /^ES/i.test(alnum(raw)))); normalized = tool.kind === 'vat' ? 'ES' + id.normalized : id.normalized; result.breakdown.push(...id.parts, field('identifier type', id.type, 'Spanish ID classifier')); }
    else if (tool.kind === 'eori') { const cleaned = alnum(raw); ok = /^ES[A-Z0-9]{8,15}$/.test(cleaned); normalized = cleaned; result.breakdown.push(field('country prefix', cleaned.slice(0,2), 'customs country'), field('local body', cleaned.slice(2), 'tax/customs body'), field('ID evidence', ev.id, 'Spanish NIF/CIF evidence')); }
    else if (tool.kind === 'iban' || tool.kind === 'ibanmask') { const ib = ibanParts(raw); ok = ib.ok; normalized = tool.kind === 'ibanmask' ? mask(ib.iban) : ib.iban; result.breakdown.push(...ib.parts); }
    else if (tool.kind === 'ccc') { const d = digits(raw); ok = d.length === 20; normalized = d; result.breakdown.push(field('bank code', d.slice(0,4), 'entidad'), field('branch code', d.slice(4,8), 'oficina'), field('CCC check digits', d.slice(8,10), 'domestic checks'), field('account', d.slice(10), 'account slice')); }
    else if (tool.kind === 'bankcode') { const d = digits(raw); ok = d.length >= 8 || !!ev.iban; normalized = ev.iban || d; result.breakdown.push(field('bank code', ev.iban ? ev.iban.slice(4,8) : d.slice(0,4), 'entidad'), field('branch code', ev.iban ? ev.iban.slice(8,12) : d.slice(4,8), 'oficina'), field('source', ev.iban ? 'IBAN' : 'CCC/manual', 'field source')); }
    else if (tool.kind === 'bic') { const bic = ev.bic || alnum(raw); ok = /^[A-Z]{4}ES[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic); normalized = bic; result.breakdown.push(field('institution', bic.slice(0,4), 'BIC bank code'), field('country', bic.slice(4,6), 'must be ES'), field('location', bic.slice(6,8), 'location code'), field('branch', bic.slice(8) || 'primary office', 'optional branch')); }
    else if (tool.kind === 'postal') { ok = !!ev.postal; normalized = ev.postal || digits(raw); result.breakdown.push(field('postal code', normalized, 'five digits'), field('province prefix', normalized.slice(0,2), '01-52 range'), field('Correos boundary', 'offline only', 'delivery status requires official/carrier systems')); }
    else if (tool.kind === 'phone' || tool.kind === 'bizum') { ok = !!ev.phone; normalized = ev.phone ? (ev.phone.replace(/[\s.-]/g,'').startsWith('+34') ? ev.phone.replace(/[\s.-]/g,'') : '+34' + ev.phone.replace(/\D/g,'')) : raw; result.breakdown.push(field('country code', normalized.startsWith('+34') ? '+34' : 'missing', 'Spain phone prefix'), field('national number', normalized.replace(/^\+34/, ''), '9 digits expected'), field('use case', tool.kind === 'bizum' ? 'Bizum/payment hint' : 'phone/contact', 'workflow evidence')); }
    else if (tool.kind === 'date') { ok = !!ev.date; normalized = ev.date.includes('-') ? ev.date : ev.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'); result.breakdown.push(field('day', ev.date.includes('/') ? ev.date.slice(0,2) : normalized.slice(8,10), 'DD'), field('month', ev.date.includes('/') ? ev.date.slice(3,5) : normalized.slice(5,7), 'MM'), field('year', ev.date.includes('/') ? ev.date.slice(6,10) : normalized.slice(0,4), 'YYYY'), field('ISO preview', normalized, 'API storage value')); }
    else if (tool.kind === 'amount' || tool.kind === 'taxrate') { ok = !!ev.amount || /\b(?:21|10|4)\s*%/.test(raw); normalized = ev.amount || raw; result.breakdown.push(field('amount evidence', ev.amount, 'Spanish EUR decimal'), field('IVA rate', (raw.match(/\b(?:21|10|4)\s*%/)||[])[0] || 'not detected', 'common IVA rates'), field('decimal separator', ev.amount.includes(',') ? 'comma' : 'not detected', 'es-ES convention')); }
    else if (tool.kind === 'plate') { const plate = ev.plate || alnum(raw); ok = /^(?:\d{4}[A-Z]{3}|[A-Z]{1,2}\d{4}[A-Z]{1,2})$/.test(plate); normalized = plate; result.breakdown.push(field('serial digits', (plate.match(/\d{4}/)||[])[0] || 'not detected', 'plate serial'), field('letter block', plate.replace(/\d/g,''), 'province-era or modern letters'), field('DGT boundary', 'offline only', 'registry state requires official systems')); }
    else if (tool.kind === 'vin') { const vin = ev.vin || alnum(raw); ok = /^[A-HJ-NPR-Z0-9]{17}$/.test(vin); normalized = vin; result.breakdown.push(field('WMI', vin.slice(0,3), 'manufacturer region'), field('VDS', vin.slice(3,9), 'vehicle descriptor'), field('VIS', vin.slice(9), 'vehicle identifier'), field('Spain evidence', vin.startsWith('VS') ? 'WMI starts VS' : 'not detected', 'manufacturer/country hint')); }
    else if (['csv','json','api','dataquality','form','reconciliation','statement','sepa','remittance','invoice','einvoice','taxform','checklist','registry','address','municipality','customs','postaltrack','privacy','ocr','fixture','document','vehicle','regex','slug','naf'].includes(tool.kind)) { ok = !!(ev.id || ev.iban || ev.ccc || ev.postal || ev.phone || ev.amount || ev.date || ev.plate || ev.vin || ev.tracking || raw.length > 15); normalized = tool.kind === 'slug' ? raw.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') : raw.replace(/\s+/g, ' ').trim(); result.breakdown.push(field('identifier evidence', ev.id || 'not detected', 'DNI/NIE/NIF/CIF field'), field('banking/payment evidence', ev.iban || ev.ccc || ev.amount || 'not detected', 'IBAN/CCC/amount slice'), field('locale/contact evidence', [ev.postal, ev.phone, ev.date, ev.province].filter(Boolean).join(' / ') || 'not detected', 'postal/phone/date/geography'), field('workflow scope', tool.kind, 'offline readiness context')); }
    else { ok = raw.length > 8; normalized = raw.replace(/\s+/g, ' ').trim(); result.breakdown.push(field('raw evidence', raw, 'input slice'), field('Spanish evidence', [ev.id, ev.iban, ev.postal, ev.phone].filter(Boolean).join(' / ') || 'not detected', 'detected local fields'), field('workflow scope', tool.kind, 'offline context')); }
    result.status = ok ? 'success' : 'review'; result.headline = tool.code + ': ' + (ok ? phrase('success') : phrase('review')); result.detail = ok ? 'Spanish browser-only evidence is structurally coherent.' : phrase('addEvidence'); result.primary = normalized || raw || 'empty'; result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, phrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', phrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check('Spanish evidence', ok, phrase('localStructure') + ' detected.', phrase('addEvidence')), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, phrase('official'))];
    result.suggestions = ok ? ['Copy normalized value for fixtures.', 'Use official Spanish systems for regulated status.'] : ['Load a valid sample.', 'Check country prefix, digit length, separator style, or local evidence.']; result.developerJson = { suite: 'spain-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: phrase('official'), breakdown: result.breakdown }; return result;
  }
  RAW_TOOLS.push({
    id: 'spain-iban-generator',
    name: 'Spanish IBAN Generator',
    code: 'IBG',
    summary: 'Generate ES IBAN check digits from a Spanish BBAN body, replay MOD-97 evidence, and prepare SEPA fixtures.',
    category: 'finance',
    actionLabel: 'Generate',
    kind: 'ibangenerator',
    samples: [
      { label: 'Valid BBAN', value: '21000418450200051332' },
      { label: 'Short BBAN', value: '21000418' }
    ],
    boundaries: [
      'Official Spanish bank ownership, account existence, payment delivery, and regulated status require the responsible bank or payment network.'
    ],
    qualityNotes: [
      { title: 'Browser-only', text: 'IBAN check digits are generated locally in this browser.' },
      { title: 'Official boundary', text: 'Generated fixture structure does not prove a live account.' },
      { title: 'Fixture safety', text: 'Use generated IBANs for test payloads, not production payment instructions.' },
      { title: 'Developer handling', text: 'Copy normalized values for forms and masked values for logs.' }
    ]
  });
  const TOOLS = RAW_TOOLS.map((tool) => Object.assign({}, tool, { i18n: {} }));
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: 'spain-suite', country: { slug: 'spain', name: 'Spain' }, theme: { accent: '#AA151B', accent2: '#F1BF00', accent3: '#0039F0' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window.ValidoHubSpainSuite = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
