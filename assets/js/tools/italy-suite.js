(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.italy-suite';
  const RAW_TOOLS = [
  {
    "id": "italy-codice-fiscale-validator",
    "name": "Italian Codice Fiscale Validator",
    "code": "CF",
    "summary": "Validate Italian codice fiscale shape, replay control-character evidence, and split surname/name/date/place-code blocks for debugging.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "codicefiscale",
    "samples": [
      {
        "label": "Valid CF",
        "value": "RSSMRA85M01H501Q"
      },
      {
        "label": "Bad check",
        "value": "RSSMRA85M01H501A"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-partita-iva-validator",
    "name": "Italian Partita IVA Validator",
    "code": "PIVA",
    "summary": "Validate Italian VAT number shape, replay the 11-digit checksum, and separate offline syntax from Agenzia Entrate status.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "piva",
    "samples": [
      {
        "label": "Valid PIVA",
        "value": "12345678903"
      },
      {
        "label": "Bad check",
        "value": "12345678904"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vat-id-validator",
    "name": "Italian VAT ID / IT Prefix Validator",
    "code": "VAT",
    "summary": "Normalize IT VAT identifiers, inspect numeric body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "IT VAT sample",
        "value": "IT12345678903"
      },
      {
        "label": "Missing prefix",
        "value": "12345678903"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-eori-validator",
    "name": "Italian EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect Italian EORI/customs identifiers, country prefixes, VAT-style bodies, and customs-boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "IT EORI sample",
        "value": "IT12345678903"
      },
      {
        "label": "Foreign prefix",
        "value": "DE123456789"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-codice-destinatario-helper",
    "name": "Italian Codice Destinatario Helper",
    "code": "SDI",
    "summary": "Inspect seven-character SDI recipient codes, PEC fallback hints, and e-invoicing routing boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "sdi",
    "samples": [
      {
        "label": "SDI code",
        "value": "ABC1234"
      },
      {
        "label": "PEC fallback",
        "value": "0000000 fatture@example.pec.it"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-pec-address-helper",
    "name": "Italian PEC Address Helper",
    "code": "PEC",
    "summary": "Check certified-email snippets for PEC-style address evidence, domain shape, and official mailbox-boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "pec",
    "samples": [
      {
        "label": "PEC address",
        "value": "contabilita@example.pec.it"
      },
      {
        "label": "Plain email",
        "value": "billing@example.com"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-rea-number-helper",
    "name": "Italian REA Number Helper",
    "code": "REA",
    "summary": "Audit REA chamber-registration references, province prefixes, serial digits, and registry lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "rea",
    "samples": [
      {
        "label": "REA sample",
        "value": "MI-1234567"
      },
      {
        "label": "Loose REA",
        "value": "REA Roma 123456"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-registro-imprese-readiness-helper",
    "name": "Italian Registro Imprese Readiness Helper",
    "code": "RI",
    "summary": "Check company intake snippets for Partita IVA, REA, PEC, address, and official registry handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "company",
    "samples": [
      {
        "label": "Company intake",
        "value": "Example Srl P.IVA 12345678903 REA MI-1234567 PEC contabilita@example.pec.it"
      },
      {
        "label": "Missing registry",
        "value": "Example Srl Milano"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-ateco-code-inspector",
    "name": "Italian ATECO Code Inspector",
    "code": "ATECO",
    "summary": "Inspect ATECO activity-code snippets, dotted digit groups, and data-quality notes for company onboarding.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "ateco",
    "samples": [
      {
        "label": "ATECO sample",
        "value": "62.01.00 sviluppo software"
      },
      {
        "label": "Loose code",
        "value": "ATECO 620100"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-spid-cie-boundary-helper",
    "name": "Italian SPID / CIE Boundary Helper",
    "code": "SPID",
    "summary": "Separate SPID, CIE, CNS, and identity-provider evidence from authentication proof and regulated access decisions.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "identity",
    "samples": [
      {
        "label": "Auth note",
        "value": "SPID livello 2, CIE, codice fiscale RSSMRA85M01H501Q"
      },
      {
        "label": "Weak note",
        "value": "login utente"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-company-onboarding-auditor",
    "name": "Italian Company Onboarding Auditor",
    "code": "CO",
    "summary": "Audit Italian company intake payloads for VAT, CF, REA, PEC, IBAN, address, and official-status boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Audit",
    "kind": "company",
    "samples": [
      {
        "label": "Full intake",
        "value": "Example Srl P.IVA 12345678903 CF 12345678903 REA MI-1234567 IBAN IT60X0542811101000000123456"
      },
      {
        "label": "Sparse intake",
        "value": "Example Srl"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-iban-validator",
    "name": "Italian IBAN Validator",
    "code": "IBAN",
    "summary": "Validate Italian IBAN numbers, expose CIN, ABI, CAB, account slices, and explain official bank-directory boundaries.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid IT IBAN",
        "value": "IT60X0542811101000000123456"
      },
      {
        "label": "Bad check",
        "value": "IT61X0542811101000000123456"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-abi-cab-bank-code-inspector",
    "name": "Italian ABI / CAB Bank Code Inspector",
    "code": "ABI",
    "summary": "Inspect Italian bank and branch code snippets, normalize ABI/CAB slices, and separate directory lookup from local checks.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "ABI CAB",
        "value": "ABI 05428 CAB 11101"
      },
      {
        "label": "Loose digits",
        "value": "05428 11101"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-bic-swift-inspector",
    "name": "Italian BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC/SWIFT shape, verify IT country-code evidence, and prepare payment-routing diagnostics.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "bic",
    "samples": [
      {
        "label": "IT BIC sample",
        "value": "BCITITMM"
      },
      {
        "label": "Foreign BIC",
        "value": "DEUTDEFF500"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-sepa-transfer-helper",
    "name": "Italian SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Audit SEPA credit-transfer snippets for Italian IBAN, EUR amount, remittance, beneficiary, and browser-only boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "SEPA transfer",
        "value": "Beneficiario Example Srl IBAN IT60X0542811101000000123456 importo 1.234,56 EUR causale fattura 2026/15"
      },
      {
        "label": "Missing IBAN",
        "value": "Bonifico 1.234,56 EUR"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-sepa-direct-debit-mandate-helper",
    "name": "Italian SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect SEPA direct-debit mandate snippets for creditor, IBAN, mandate reference, dates, and official authorization boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "mandate",
    "samples": [
      {
        "label": "Mandate sample",
        "value": "Mandato MND-2026-0001 debitore Rossi IBAN IT60X0542811101000000123456 data 12/07/2026"
      },
      {
        "label": "Missing mandate",
        "value": "addebito ricorrente cliente"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-riba-payment-helper",
    "name": "Italian Ri.Ba Payment Helper",
    "code": "RIBA",
    "summary": "Audit Ri.Ba payment snippets for debtor, due date, bank coordinates, amount, and reconciliation evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "payment",
    "samples": [
      {
        "label": "RiBa sample",
        "value": "Ri.Ba scadenza 31/08/2026 debitore Example Srl ABI 05428 CAB 11101 importo 950,00 EUR"
      },
      {
        "label": "Sparse RiBa",
        "value": "ricevuta bancaria cliente"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-pago-pa-payment-notice-helper",
    "name": "Italian pagoPA Notice Helper",
    "code": "PA",
    "summary": "Inspect pagoPA notice snippets for IUV/codice avviso digits, amount, due date, and payment-boundary notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "payment",
    "samples": [
      {
        "label": "Notice sample",
        "value": "codice avviso 302000100000019421 importo 64,00 EUR scadenza 12/07/2026"
      },
      {
        "label": "Short notice",
        "value": "IUV 12345"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-remittance-text-builder",
    "name": "Italian Remittance Text Builder",
    "code": "REM",
    "summary": "Normalize Italian payment causale/remittance text, detect invoice references, and produce log-safe previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "payment",
    "samples": [
      {
        "label": "Invoice causale",
        "value": "Saldo fattura 2026/0015 del 12/07/2026 - Example Srl"
      },
      {
        "label": "Long causale",
        "value": "pagamento servizi consulenza mese luglio 2026 cliente interno"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-payment-reconciliation-helper",
    "name": "Italian Payment Reconciliation Helper",
    "code": "REC",
    "summary": "Compare Italian payment snippets for IBAN, amount, invoice, date, and reconciliation hints without bank lookup.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "payment",
    "samples": [
      {
        "label": "Reconciliation",
        "value": "Fattura 2026/15 importo 1.234,56 EUR pagamento 12/07/2026 IBAN IT60X0542811101000000123456"
      },
      {
        "label": "Missing amount",
        "value": "pagamento fattura 15"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-bank-statement-parser",
    "name": "Italian Bank Statement Parser",
    "code": "BNK",
    "summary": "Parse Italian statement-like rows for valuta date, amount, causale, IBAN hints, and local CSV conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Statement row",
        "value": "12/07/2026;Valuta 13/07/2026;Bonifico Example Srl;1.234,56 EUR"
      },
      {
        "label": "Sparse row",
        "value": "bonifico cliente"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-masked-iban-formatter",
    "name": "Italian Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Format and mask Italian IBANs for logs, support previews, and show which account slices remain sensitive.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "IBAN to mask",
        "value": "IT60X0542811101000000123456"
      },
      {
        "label": "With text",
        "value": "pagare su IT60X0542811101000000123456"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-fatturapa-xml-readiness-checker",
    "name": "Italian FatturaPA XML Readiness Checker",
    "code": "FPA",
    "summary": "Audit FatturaPA XML snippets for cedente, cessionario, totals, VAT, and SDI delivery handoff evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "XML snippet",
        "value": "<FatturaElettronica><CedentePrestatore><DatiAnagrafici><IdFiscaleIVA><IdPaese>IT</IdPaese><IdCodice>12345678903</IdCodice></IdFiscaleIVA></DatiAnagrafici></CedentePrestatore></FatturaElettronica>"
      },
      {
        "label": "Tiny XML",
        "value": "<FatturaElettronica/>"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-sdi-invoice-routing-helper",
    "name": "Italian SDI Invoice Routing Helper",
    "code": "SDI",
    "summary": "Inspect e-invoice routing payloads for codice destinatario, PEC, VAT, and Sistema di Interscambio boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Routing sample",
        "value": "Codice destinatario ABC1234 PEC contabilita@example.pec.it PIVA 12345678903"
      },
      {
        "label": "Missing route",
        "value": "fattura elettronica cliente"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vat-rate-sanity-helper",
    "name": "Italian VAT Rate Sanity Helper",
    "code": "IVA",
    "summary": "Check Italian VAT-rate snippets, totals, comma decimals, and reverse-charge handoff notes.",
    "category": "finance",
    "actionLabel": "Calculate",
    "kind": "taxdoc",
    "samples": [
      {
        "label": "VAT sample",
        "value": "Imponibile 1.000,00 IVA 22% Totale 1.220,00"
      },
      {
        "label": "Reduced rate",
        "value": "Aliquota 10% importo 220,00"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vat-return-field-helper",
    "name": "Italian VAT Return Field Helper",
    "code": "RET",
    "summary": "Audit VAT return snippets for period, VAT ID, taxable amount, tax amount, and official filing boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "taxdoc",
    "samples": [
      {
        "label": "Return sample",
        "value": "Periodo 2026 Q2 PIVA 12345678903 imponibile 1000,00 IVA 220,00"
      },
      {
        "label": "Sparse return",
        "value": "liquidazione IVA"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-invoice-number-helper",
    "name": "Italian Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect Italian invoice references, year/series/number patterns, dates, VAT evidence, and duplicate-risk notes.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Invoice sample",
        "value": "Fattura 2026/00015 del 12/07/2026 PIVA 12345678903"
      },
      {
        "label": "Loose invoice",
        "value": "fattura 15"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-e-invoicing-readiness-helper",
    "name": "Italian E-Invoicing Readiness Helper",
    "code": "EINV",
    "summary": "Audit Italian e-invoicing payloads for XML, SDI, PEC, VAT, totals, dates, and delivery-boundary evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "E-invoice payload",
        "value": "FatturaPA 1.2.2 SDI ABC1234 PEC contabilita@example.pec.it Totale 1.220,00 EUR"
      },
      {
        "label": "Missing delivery",
        "value": "fattura xml pronta"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-accounting-audit-trail-checklist-generator",
    "name": "Italian Accounting Audit Trail Checklist Helper",
    "code": "AUD",
    "summary": "Build an Italian accounting evidence checklist from VAT, invoice, payment, date, and document snippets.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "accounting",
    "samples": [
      {
        "label": "Audit trail",
        "value": "fattura 2026/15 PIVA 12345678903 IBAN IT60X0542811101000000123456 pagamento 12/07/2026"
      },
      {
        "label": "Empty checklist",
        "value": "contabilita"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-eur-decimal-currency-formatter",
    "name": "Italian EUR Decimal Currency Formatter",
    "code": "EUR",
    "summary": "Normalize Italian EUR amounts, comma decimals, thousands separators, and accounting import previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "IT amount",
        "value": "1.234,56 €"
      },
      {
        "label": "Plain decimal",
        "value": "1234.56 EUR"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-postal-code-validator",
    "name": "Italian CAP Postal Code Validator",
    "code": "CAP",
    "summary": "Validate Italian five-digit CAP shape, expose postal-zone evidence, and separate delivery proof from offline checks.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "CAP Rome",
        "value": "00118"
      },
      {
        "label": "Bad CAP",
        "value": "1011A"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-address-normalizer",
    "name": "Italian Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize Italian address snippets with via/piazza, CAP, comune, provincia, and country evidence.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Address sample",
        "value": "Via Roma 10, 00118 Roma RM, Italia"
      },
      {
        "label": "Sparse address",
        "value": "Roma centro"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-address-transliteration-normalizer",
    "name": "Italian Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Create ASCII-safe Italian address/search keys while preserving display text and diacritics where needed.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Name sample",
        "value": "Piazza Unita d Italia 5, 34121 Trieste TS"
      },
      {
        "label": "Accent sample",
        "value": "San Niccolo, citta metropolitana"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-province-code-mapper",
    "name": "Italian Province Code Mapper",
    "code": "PROV",
    "summary": "Inspect Italian province abbreviations, expose known code evidence, and keep official geography lookup boundaries explicit.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "province",
    "samples": [
      {
        "label": "Province sample",
        "value": "RM Roma, MI Milano, NA Napoli"
      },
      {
        "label": "Unknown code",
        "value": "XX Centro"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-municipality-code-inspector",
    "name": "Italian Municipality / Belfiore Code Inspector",
    "code": "COM",
    "summary": "Inspect comune and Belfiore-style cadastral code snippets for place-code evidence and official lookup boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Belfiore sample",
        "value": "Comune Roma codice H501 CAP 00118"
      },
      {
        "label": "Loose comune",
        "value": "Milano centro"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-phone-number-validator",
    "name": "Italian Phone Number Validator",
    "code": "TEL",
    "summary": "Validate Italian phone snippets, detect +39/trunk evidence, and separate numbering-plan shape from subscriber status.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Mobile +39",
        "value": "+39 347 123 4567"
      },
      {
        "label": "Landline",
        "value": "06 6982"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-phone-e164-formatter",
    "name": "Italian Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize Italian phone numbers toward +39 display, preserve significant trunk digits, and prepare API payload previews.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "National mobile",
        "value": "347 1234567"
      },
      {
        "label": "Rome landline",
        "value": "06 69821234"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-date-locale-formatter",
    "name": "Italian Date Locale Formatter",
    "code": "DATE",
    "summary": "Parse Italian date snippets, emit ISO/date-display variants, and expose day/month/year field slices.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "date",
    "samples": [
      {
        "label": "IT date",
        "value": "12/07/2026"
      },
      {
        "label": "ISO date",
        "value": "2026-07-12"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-csv-locale-normalizer",
    "name": "Italian CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Audit Italian CSV snippets for semicolon separators, comma decimals, dates, VAT fields, and import-safe previews.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "CSV sample",
        "value": "data;cliente;importo;iva\n12/07/2026;Example Srl;1.234,56;22%"
      },
      {
        "label": "Comma CSV",
        "value": "date,amount\n2026-07-12,1234.56"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-slug-normalizer",
    "name": "Italian Slug Normalizer",
    "code": "SLUG",
    "summary": "Create URL-safe slugs from Italian names, punctuation, accents, legal suffixes, and locale-specific text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Company name",
        "value": "Caffe Roma S.r.l. - Unita d Italia"
      },
      {
        "label": "Plain title",
        "value": "fattura elettronica luglio 2026"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-document-ocr-fixer",
    "name": "Italian Document OCR Fixer",
    "code": "OCR",
    "summary": "Repair OCR-like Italian document snippets, recover CF/VAT/IBAN/date evidence, and keep identity-proof boundaries explicit.",
    "category": "developer-tools",
    "actionLabel": "Repair",
    "kind": "ocr",
    "samples": [
      {
        "label": "OCR sample",
        "value": "P.1VA 12345678903 C.F. RSSMRA85M01H501Q 12/O7/2026"
      },
      {
        "label": "Messy text",
        "value": "fattura l23 import0"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-gdpr-redaction-helper",
    "name": "Italian GDPR / Privacy Redaction Helper",
    "code": "GDPR",
    "summary": "Redact Italian personal, tax, banking, phone, and address evidence for privacy-safe support payloads.",
    "category": "developer-tools",
    "actionLabel": "Redact",
    "kind": "privacy",
    "samples": [
      {
        "label": "Sensitive text",
        "value": "Mario Rossi CF RSSMRA85M01H501Q IBAN IT60X0542811101000000123456 tel +39 347 1234567"
      },
      {
        "label": "Address text",
        "value": "Via Roma 10 Roma"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-pii-masker",
    "name": "Italian PII Masker",
    "code": "PII",
    "summary": "Mask Italian CF, VAT, IBAN, phone, PEC, and address evidence while preserving debugging structure.",
    "category": "developer-tools",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "PII sample",
        "value": "CF RSSMRA85M01H501Q PIVA 12345678903 PEC mario.rossi@example.pec.it"
      },
      {
        "label": "IBAN sample",
        "value": "IT60X0542811101000000123456"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-personal-data-fixture-generator",
    "name": "Italian Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate and audit clearly fake Italian-style personal fixtures with CF-like, address, phone, and privacy notes.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "fixture",
    "samples": [
      {
        "label": "Fixture request",
        "value": "Mario Rossi nato a Roma 01/08/1985 CF RSSMRA85M01H501Q"
      },
      {
        "label": "Sparse fixture",
        "value": "test utente italiano"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-id-card-format-helper",
    "name": "Italian ID Card Format Helper",
    "code": "ID",
    "summary": "Inspect Italian identity-card snippets, document numbers, dates, and official identity-proof boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "CIE sample",
        "value": "Carta identita CA12345AB scadenza 12/07/2030 CF RSSMRA85M01H501Q"
      },
      {
        "label": "Missing date",
        "value": "CIE CA12345AB"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-passport-number-helper",
    "name": "Italian Passport Number Helper",
    "code": "PASS",
    "summary": "Inspect Italian passport-like document numbers, MRZ hints, dates, and official document-validation boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Passport sample",
        "value": "Passaporto YA1234567 scadenza 12/07/2031"
      },
      {
        "label": "MRZ hint",
        "value": "P<ITAROSSI<MARIO"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-driving-licence-format-helper",
    "name": "Italian Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect Italian driving-licence snippets, document codes, dates, and Motorizzazione boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Licence sample",
        "value": "Patente U1A123456B categoria B scadenza 12/07/2030"
      },
      {
        "label": "Sparse licence",
        "value": "patente categoria B"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-residence-permit-format-helper",
    "name": "Italian Residence Permit Format Helper",
    "code": "PERM",
    "summary": "Inspect residence-permit snippets, number/date evidence, and official immigration-status boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Permit sample",
        "value": "Permesso soggiorno I12345678 scadenza 12/07/2027"
      },
      {
        "label": "Sparse permit",
        "value": "permesso valido"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-health-card-format-helper",
    "name": "Italian Tessera Sanitaria Format Helper",
    "code": "TS",
    "summary": "Inspect Tessera Sanitaria/codice fiscale snippets, expiry dates, and health-card proof boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Health card",
        "value": "Tessera sanitaria CF RSSMRA85M01H501Q scadenza 12/07/2028"
      },
      {
        "label": "Only CF",
        "value": "RSSMRA85M01H501Q"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vehicle-plate-inspector",
    "name": "Italian Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect Italian vehicle plate families, province-era hints, serial blocks, and PRA/Motorizzazione boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Modern plate",
        "value": "AB123CD"
      },
      {
        "label": "Old-style hint",
        "value": "Roma 123456"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vin-validator",
    "name": "Italian VIN Validator",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare Italian vehicle-intake diagnostics.",
    "category": "developer-tools",
    "actionLabel": "Validate",
    "kind": "vin",
    "samples": [
      {
        "label": "VIN sample",
        "value": "ZFA3120000J123456"
      },
      {
        "label": "Bad VIN",
        "value": "ZFA123"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-vehicle-data-redaction-helper",
    "name": "Italian Vehicle Data Redaction Helper",
    "code": "CAR",
    "summary": "Mask Italian plate, VIN, owner, fiscal-code, and address evidence in vehicle support payloads.",
    "category": "developer-tools",
    "actionLabel": "Redact",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Vehicle payload",
        "value": "Targa AB123CD VIN ZFA3120000J123456 proprietario Mario Rossi CF RSSMRA85M01H501Q"
      },
      {
        "label": "Plate only",
        "value": "AB123CD"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-customs-declaration-helper",
    "name": "Italian Customs Declaration Helper",
    "code": "CUS",
    "summary": "Audit customs snippets for EORI, MRN-like references, country codes, dates, and Agenzia Dogane boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Customs sample",
        "value": "EORI IT12345678903 MRN 26IT1234567890ABC data 12/07/2026"
      },
      {
        "label": "Sparse customs",
        "value": "dogana importazione"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-postal-tracking-helper",
    "name": "Italian Postal Tracking Helper",
    "code": "POST",
    "summary": "Inspect Poste/courier tracking-like snippets, country suffixes, dates, and carrier-status boundaries.",
    "category": "developer-tools",
    "actionLabel": "Inspect",
    "kind": "postaltrack",
    "samples": [
      {
        "label": "Tracking sample",
        "value": "RA123456789IT spedito 12/07/2026 CAP 00118"
      },
      {
        "label": "Short tracking",
        "value": "tracking pacco"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-data-quality-workbench",
    "name": "Italian Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed Italian payloads for identifiers, dates, amounts, addresses, phone, and locale consistency.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Mixed payload",
        "value": "PIVA 12345678903 IBAN IT60X0542811101000000123456 Via Roma 10 00118 Roma importo 1.234,56"
      },
      {
        "label": "Sparse payload",
        "value": "cliente roma"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-json-fixture-generator",
    "name": "Italian JSON Fixture Helper",
    "code": "JSON",
    "summary": "Inspect Italian JSON fixtures for locale, VAT, CF, IBAN, phone, date, and privacy-safe payload shape.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "json",
    "samples": [
      {
        "label": "JSON sample",
        "value": "{\"locale\":\"it-IT\",\"piva\":\"12345678903\",\"iban\":\"IT60X0542811101000000123456\",\"data\":\"12/07/2026\"}"
      },
      {
        "label": "Invalid JSON",
        "value": "{locale: it-IT}"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-regex-pack-helper",
    "name": "Italian Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for Italian CF, Partita IVA, IBAN, CAP, phone, dates, and local evidence labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Regex request",
        "value": "codice fiscale, partita iva, CAP, telefono +39, IBAN IT"
      },
      {
        "label": "Single pattern",
        "value": "CAP 00118"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-api-payload-auditor",
    "name": "Italian API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for Italy locale, VAT, CF, IBAN, dates, amounts, and official-system boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "API sample",
        "value": "{\"country\":\"IT\",\"locale\":\"it-IT\",\"vat\":\"IT12345678903\",\"amount\":\"1.234,56\",\"date\":\"12/07/2026\"}"
      },
      {
        "label": "Sparse API",
        "value": "{\"country\":\"IT\"}"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-form-field-auditor",
    "name": "Italian Form Field Auditor",
    "code": "FORM",
    "summary": "Check Italian form-field labels and values for VAT, CF, CAP, province, phone, address, and privacy handling.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Form sample",
        "value": "codice_fiscale=RSSMRA85M01H501Q&cap=00118&provincia=RM&telefono=+393471234567"
      },
      {
        "label": "Sparse form",
        "value": "name=Rossi"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    "id": "italy-mrz-passport-parser",
    "name": "Italian MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse Italian passport MRZ snippets, split document, nationality, birth-date, expiry, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "MRZ sample",
        "value": "P<ITAROSSI<<MARIO<<<<<<<<<<<<<<<<<<<<\nYA1234567ITA8508019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Short MRZ",
        "value": "P<ITAROSSI<MARIO"
      }
    ],
    "boundaries": [
      "Official Italian registry status, identity proof, bank ownership, tax filing, e-invoicing delivery, vehicle registry state, carrier delivery state, and legal decisions require the responsible Italian authority or provider."
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
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Italian systems remain the source of truth.', localStructure: 'Italian local structure', addEvidence: 'Add Italian local evidence or use the valid sample.' },
    it: { success: 'Controlli offline superati', review: 'Revisione richiesta', normalized: 'normalizzato', official: 'I sistemi ufficiali italiani restano la fonte di verita.', localStructure: 'struttura locale italiana', addEvidence: 'Aggiungi evidenza locale italiana o usa il campione valido.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle italienische Systeme bleiben die Quelle der Wahrheit.', localStructure: 'italienische lokale Struktur', addEvidence: 'Fuege italienische Evidenz hinzu oder nutze das gueltige Beispiel.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales italianos siguen siendo la fuente de verdad.', localStructure: 'estructura local italiana', addEvidence: 'Agrega evidencia italiana o usa la muestra valida.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy wloskie pozostaja zrodlem prawdy.', localStructure: 'wloska struktura lokalna', addEvidence: 'Dodaj wloskie dane lub uzyj poprawnej probki.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels italiens restent la source de verite.', localStructure: 'structure locale italienne', addEvidence: 'Ajoutez une preuve italienne ou utilisez un exemple valide.' },
    nl: { success: 'Offline controles geslaagd', review: 'Controle nodig', normalized: 'genormaliseerd', official: 'Officiele Italiaanse systemen blijven de bron van waarheid.', localStructure: 'Italiaanse lokale structuur', addEvidence: 'Voeg Italiaanse gegevens toe of gebruik het geldige voorbeeld.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Italian systems remain the source of truth.', localStructure: 'Italian local structure', addEvidence: 'Add Italian local evidence or use the valid sample.' }
  };
  const LOCALE_KEYS = ['en','pl','de','es','pt-BR','fr','it','nl','pt-PT','cs','sk','uk','tr','ro','hu','sv','no','fi','da','ja','ko','zh-CN','zh-TW','ar','he','hi','id','vi','th','ms'];
  function suiteI18n() {
    const base = { validate: 'Validate', copyResult: 'Copy result', downloadResult: 'Download result', clear: 'Clear', output: 'Output', waitingForInput: 'Waiting for input', validSample: 'Valid sample', relatedTools: 'Valid sample / related tools', qualityNotes: 'Quality notes', advancedAnalysis: 'Advanced analysis', fieldBreakdown: 'Field breakdown', validationPipeline: 'Validation pipeline', copyNormalized: 'Copy normalized' };
    const dict = {}; for (const key of LOCALE_KEYS) dict[key] = Object.assign({}, base, key === 'it' ? { validate: 'Valida', copyResult: 'Copia risultato', downloadResult: 'Scarica risultato', clear: 'Pulisci', output: 'Output', waitingForInput: 'In attesa di input', validSample: 'Campione valido', relatedTools: 'Campione valido / strumenti collegati', qualityNotes: 'Note di qualita', advancedAnalysis: 'Analisi avanzata', fieldBreakdown: 'Scomposizione campi', validationPipeline: 'Pipeline di validazione', copyNormalized: 'Copia normalizzato' } : {}); return dict;
  }
  function locale() { return document.documentElement.lang || (location.pathname.split('/').filter(Boolean)[0] || 'en'); }
  function phrase(key) { const code = locale(); return (LOCALIZED[code] && LOCALIZED[code][key]) || (LOCALIZED[code && code.split('-')[0]] && LOCALIZED[code.split('-')[0]][key]) || LOCALIZED.en[key] || key; }
  function field(label, value, detail) { return { label, value: value == null || value === '' ? 'not detected' : String(value), detail: detail || 'Italian evidence slice' }; }
  function check(label, ok, pass, fail) { return { label, status: ok ? 'pass' : 'review', message: ok ? pass : fail }; }
  function compact(input) { return String(input || '').normalize('NFKC').trim(); }
  function alnum(input) { return compact(input).toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function digits(input) { return compact(input).replace(/\D/g, ''); }
  function mask(value) { const s = String(value || ''); if (s.length <= 8) return s ? s[0] + '...' : ''; return s.slice(0, 3) + '...' + s.slice(-4); }
  function mod97(iban) { let rearranged = iban.slice(4) + iban.slice(0,4); let remainder = 0; for (const ch of rearranged) { const value = /[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch; for (const d of value) remainder = (remainder * 10 + Number(d)) % 97; } return remainder; }
  const CF_ODD = { '0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,A:1,B:0,C:5,D:7,E:9,F:13,G:15,H:17,I:19,J:21,K:2,L:4,M:18,N:20,O:11,P:3,Q:6,R:8,S:12,T:14,U:16,V:10,W:22,X:25,Y:24,Z:23 };
  const CF_EVEN = { '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25 };
  function cfCheck(cf) { if (!/^[A-Z0-9]{16}$/.test(cf)) return { ok:false, expected:null }; let sum = 0; for (let i=0;i<15;i++) sum += (i % 2 === 0 ? CF_ODD : CF_EVEN)[cf[i]] ?? 0; const expected = String.fromCharCode(65 + (sum % 26)); return { ok: expected === cf[15], expected, sum }; }
  function pivaCheck(num) { if (!/^\d{11}$/.test(num)) return { ok:false, expected:null }; let sum=0; for (let i=0;i<10;i++) { let n=Number(num[i]); if (i % 2 === 1) { n *= 2; if (n > 9) n -= 9; } sum += n; } const expected = String((10 - (sum % 10)) % 10); return { ok: expected === num[10], expected, sum }; }
  function detectEvidence(raw) { const text = compact(raw); const upper = text.toUpperCase(); return { text, upper, cf:(upper.match(/[A-Z]{6}[0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]/)||[])[0]||'', vat:(upper.match(/IT\s*\d{11}/)||[])[0]||(text.match(/\b\d{11}\b/)||[])[0]||'', iban:(upper.match(/IT\d{2}[A-Z]\d{10}[A-Z0-9]{12}/)||[])[0]||'', cap:(text.match(/\b\d{5}\b/)||[])[0]||'', date:(text.match(/\b(?:\d{2}\/\d{2}\/\d{4}|\d{4}-\d{2}-\d{2})\b/)||[])[0]||'', amount:(text.match(/\b\d{1,3}(?:\.\d{3})*,\d{2}\s*(?:€|EUR)?\b|\b\d+\.\d{2}\s*EUR\b/i)||[])[0]||'', phone:(text.match(/(?:\+39\s*)?(?:0\d{1,4}|3\d{2})[\s.-]?\d{3,8}/)||[])[0]||'', province:(upper.match(/\b(?:AG|AL|AN|AO|AR|AT|AV|BA|BG|BI|BL|BN|BO|BR|BS|BT|BZ|CA|CB|CE|CH|CL|CN|CO|CR|CS|CT|CZ|EN|FC|FE|FG|FI|FM|FR|GE|GO|GR|IM|IS|KR|LC|LE|LI|LO|LT|LU|MB|MC|ME|MI|MN|MO|MS|MT|NA|NO|NU|OR|PA|PC|PD|PE|PG|PI|PN|PO|PR|PT|PU|PV|PZ|RA|RC|RE|RG|RI|RM|RN|RO|SA|SI|SO|SP|SR|SS|SU|SV|TA|TE|TN|TO|TP|TR|TS|TV|UD|VA|VB|VC|VE|VI|VR|VT|VV)\b/)||[])[0]||'', sdi:(upper.match(/\b[A-Z0-9]{7}\b/)||[])[0]||'', pec:(text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]*PEC[A-Z0-9.-]*\.[A-Z]{2,}/i)||[])[0]||'', plate:(upper.match(/\b[A-Z]{2}\d{3}[A-Z]{2}\b/)||[])[0]||'', vin:(upper.match(/\b[A-HJ-NPR-Z0-9]{17}\b/)||[])[0]||'' }; }
  function analyze(tool, input) {
    const raw = compact(input || (tool.samples[0] && tool.samples[0].value) || ''); const ev = detectEvidence(raw);
    const result = { status:'review', headline: tool.code + ': ' + phrase('review'), detail: phrase('addEvidence'), primary: raw || 'empty', normalized: raw, checks: [], fields: [], breakdownTitle: tool.name + ' field breakdown', breakdownSummary: 'Named Italian evidence slices for debugging and handoff.', breakdown: [], qualityNotes: tool.qualityNotes, suggestions: [], developerJson: {} };
    let ok = false; let normalized = raw;
    if (tool.kind === 'codicefiscale') { const cf = alnum(raw); const c = cfCheck(cf); ok = /^[A-Z0-9]{16}$/.test(cf) && c.ok; normalized = cf; result.breakdown.push(field('surname code', cf.slice(0,3), 'positions 1-3'), field('name code', cf.slice(3,6), 'positions 4-6'), field('date/gender', cf.slice(6,11), 'year, month letter, day/gender'), field('place code', cf.slice(11,15), 'Belfiore/catasto code'), field('control char', cf.slice(15), c.expected ? 'expected ' + c.expected : 'checksum evidence')); }
    else if (tool.kind === 'piva') { const d = digits(raw).slice(-11); const c = pivaCheck(d); ok = /^\d{11}$/.test(d) && c.ok; normalized = d; result.breakdown.push(field('office/body digits', d.slice(0,7), 'positions 1-7'), field('province/office block', d.slice(7,10), 'positions 8-10'), field('check digit', d.slice(10), c.expected ? 'expected ' + c.expected : 'checksum evidence'), field('checksum sum', c.sum, 'Italian VAT checksum replay')); }
    else if (tool.kind === 'vat') { const d = digits(raw).slice(-11); const c = pivaCheck(d); ok = /IT/i.test(raw) && /^\d{11}$/.test(d) && c.ok; normalized = 'IT' + d; result.breakdown.push(field('country prefix', /IT/i.test(raw) ? 'IT' : 'missing', 'EU VAT prefix'), field('numeric body', d, '11 digits'), field('check digit', d.slice(10), c.expected ? 'expected ' + c.expected : 'checksum evidence')); }
    else if (tool.kind === 'eori') { const cleaned = alnum(raw); ok = /^IT[A-Z0-9]{8,15}$/.test(cleaned); normalized = cleaned; result.breakdown.push(field('country prefix', cleaned.slice(0,2), 'customs country'), field('body', cleaned.slice(2), 'EORI local body'), field('VAT evidence', ev.vat || 'not detected', 'optional Italian VAT-like body')); }
    else if (tool.kind === 'iban' || tool.kind === 'ibanmask') { const iban = alnum(raw).match(/IT\d{2}[A-Z]\d{10}[A-Z0-9]{12}/)?.[0] || alnum(raw); ok = /^IT\d{2}[A-Z]\d{10}[A-Z0-9]{12}$/.test(iban) && mod97(iban) === 1; normalized = iban; result.breakdown.push(field('country', iban.slice(0,2), 'IBAN country'), field('check digits', iban.slice(2,4), 'MOD-97 remainder ' + (iban.length > 4 ? mod97(iban) : 'n/a')), field('CIN', iban.slice(4,5), 'Italian control character'), field('ABI bank code', iban.slice(5,10), 'bank code'), field('CAB branch code', iban.slice(10,15), 'branch code'), field('account', iban.slice(15), 'account slice')); if (tool.kind === 'ibanmask') normalized = mask(iban); }
    else if (tool.kind === 'bankcode') { const d = digits(raw); ok = d.length >= 10; normalized = d.slice(0,5) + (d.length >= 10 ? ' ' + d.slice(5,10) : ''); result.breakdown.push(field('ABI', d.slice(0,5), 'bank code'), field('CAB', d.slice(5,10), 'branch code'), field('remaining digits', d.slice(10) || 'none', 'extra account/reference evidence')); }
    else if (tool.kind === 'bic') { const bic = alnum(raw); ok = /^[A-Z]{4}IT[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic); normalized = bic; result.breakdown.push(field('institution', bic.slice(0,4), 'BIC bank code'), field('country', bic.slice(4,6), 'must be IT'), field('location', bic.slice(6,8), 'location code'), field('branch', bic.slice(8) || 'primary office', 'optional branch')); }
    else if (tool.kind === 'postal') { const d = digits(raw); ok = /^\d{5}$/.test(d); normalized = d; result.breakdown.push(field('CAP', d, 'five-digit postal code'), field('postal zone', d.slice(0,2), 'first two-digit evidence'), field('delivery boundary', 'offline only', 'postal provider/reference data required')); }
    else if (tool.kind === 'province') { ok = !!ev.province; normalized = ev.province || ev.upper; result.breakdown.push(field('province code', ev.province || 'not detected', 'two-letter Italian province'), field('text context', raw, 'local geography snippet'), field('lookup boundary', 'offline only', 'official geography data required')); }
    else if (tool.kind === 'phone') { ok = !!ev.phone; normalized = ev.phone ? (ev.phone.replace(/[\s.-]/g,'').startsWith('+39') ? ev.phone.replace(/[\s.-]/g,'') : '+39' + ev.phone.replace(/\D/g,'')) : raw; result.breakdown.push(field('country code', normalized.startsWith('+39') ? '+39' : 'missing', 'Italy phone prefix'), field('national significant number', normalized.replace(/^\+39/, ''), 'keeps Italian trunk semantics'), field('detected phone', ev.phone, 'phone evidence')); }
    else if (tool.kind === 'date') { ok = !!ev.date; normalized = ev.date.includes('-') ? ev.date : ev.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'); result.breakdown.push(field('day', ev.date.includes('/') ? ev.date.slice(0,2) : normalized.slice(8,10), 'DD'), field('month', ev.date.includes('/') ? ev.date.slice(3,5) : normalized.slice(5,7), 'MM'), field('year', ev.date.includes('/') ? ev.date.slice(6,10) : normalized.slice(0,4), 'YYYY'), field('ISO preview', normalized, 'API storage value')); }
    else if (tool.kind === 'amount') { ok = !!ev.amount; normalized = ev.amount || raw; result.breakdown.push(field('amount evidence', ev.amount, 'Italian EUR decimal'), field('decimal separator', ev.amount.includes(',') ? 'comma' : 'not detected', 'it-IT convention'), field('thousands separator', ev.amount.includes('.') ? 'dot' : 'not detected', 'display grouping')); }
    else if (tool.kind === 'plate') { const plate = ev.plate || alnum(raw); ok = /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(plate); normalized = plate; result.breakdown.push(field('prefix letters', plate.slice(0,2), 'modern plate block'), field('serial digits', plate.slice(2,5), 'numeric serial'), field('suffix letters', plate.slice(5,7), 'modern plate block')); }
    else if (tool.kind === 'vin') { const vin = ev.vin || alnum(raw); ok = /^[A-HJ-NPR-Z0-9]{17}$/.test(vin); normalized = vin; result.breakdown.push(field('WMI', vin.slice(0,3), 'manufacturer region'), field('VDS', vin.slice(3,9), 'vehicle descriptor'), field('VIS', vin.slice(9), 'vehicle identifier'), field('Italy evidence', vin.startsWith('Z') ? 'WMI starts with Z' : 'not detected', 'country/manufacturer hint')); }
    else if (tool.kind === 'sdi' || tool.kind === 'pec') { ok = !!(ev.sdi || ev.pec); normalized = [ev.sdi, ev.pec].filter(Boolean).join(' / ') || raw; result.breakdown.push(field('SDI code', ev.sdi, 'seven-character recipient code'), field('PEC address', ev.pec, 'certified-email fallback'), field('VAT evidence', ev.vat, 'invoice routing identity')); }
    else if (tool.kind === 'csv' || tool.kind === 'json' || tool.kind === 'api' || tool.kind === 'dataquality' || tool.kind === 'form') { ok = !!(ev.vat || ev.cf || ev.iban || ev.cap || ev.amount || ev.date || raw.length > 15); normalized = raw.replace(/\s+/g, ' ').trim(); result.breakdown.push(field('identifier evidence', ev.cf || ev.vat || 'not detected', 'CF/VAT field'), field('banking evidence', ev.iban || 'not detected', 'IBAN field'), field('locale evidence', [ev.cap, ev.date, ev.amount].filter(Boolean).join(' / ') || 'not detected', 'CAP/date/amount slices'), field('payload shape', tool.kind, 'developer/data surface')); }
    else if (tool.kind === 'privacy' || tool.kind === 'ocr' || tool.kind === 'fixture' || tool.kind === 'document' || tool.kind === 'vehicle') { ok = !!(ev.cf || ev.vat || ev.iban || ev.phone || ev.plate || ev.vin || raw.length > 10); normalized = raw.replace(/([A-Z]{6}[0-9A-Z]{10})/gi, v => mask(v)).replace(/IT\d{2}[A-Z]\d{10}[A-Z0-9]{12}/gi, v => mask(v)); result.breakdown.push(field('CF/VAT evidence', ev.cf || ev.vat || 'not detected', 'identity/tax slice'), field('IBAN evidence', ev.iban || 'not detected', 'banking slice'), field('phone/address evidence', [ev.phone, ev.cap, ev.province].filter(Boolean).join(' / ') || 'not detected', 'contact/geography slice'), field('masked preview', normalized, 'safe for logs')); }
    else if (tool.kind === 'slug') { ok = raw.length > 0; normalized = raw.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); result.breakdown.push(field('source text', raw, 'display value'), field('ASCII fold', normalized, 'slug/search key'), field('legal suffix hint', /s\.?r\.?l|spa|s\.?p\.?a/i.test(raw) ? 'detected' : 'not detected', 'company suffix evidence')); }
    else if (tool.kind === 'regex') { ok = raw.length > 5; normalized = 'CF, PIVA, IBAN, CAP, phone, date patterns'; result.breakdown.push(field('identifier pattern', 'CF/PIVA', 'tax identifiers'), field('banking pattern', 'IT IBAN', 'finance'), field('locale pattern', 'CAP/date/phone', 'forms and imports')); }
    else { ok = !!(ev.cf || ev.vat || ev.iban || ev.cap || ev.amount || ev.date || ev.phone || raw.length > 8); normalized = raw.replace(/\s+/g, ' ').trim(); result.breakdown.push(field('identifier evidence', ev.cf || ev.vat || 'not detected', 'Italian identifier'), field('payment evidence', ev.iban || ev.amount || 'not detected', 'banking/accounting'), field('locale evidence', [ev.cap, ev.date, ev.phone, ev.province].filter(Boolean).join(' / ') || 'not detected', 'local fields'), field('workflow scope', tool.kind, 'offline readiness context')); }
    result.status = ok ? 'success' : 'review'; result.headline = tool.code + ': ' + (ok ? phrase('success') : phrase('review')); result.detail = ok ? 'Italian browser-only evidence is structurally coherent.' : phrase('addEvidence'); result.primary = normalized || raw || 'empty'; result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, phrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', phrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check('Italian evidence', ok, phrase('localStructure') + ' detected.', phrase('addEvidence')), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, phrase('official'))];
    result.suggestions = ok ? ['Copy normalized value for fixtures.', 'Use official systems for regulated status.'] : ['Load a valid sample.', 'Check country prefix, digit length, separator style, or local evidence.']; result.developerJson = { suite: 'italy-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: phrase('official'), breakdown: result.breakdown }; return result;
  }
  RAW_TOOLS.push({
    id: 'italy-iban-generator',
    name: 'Italian IBAN Generator',
    code: 'IBG',
    summary: 'Generate IT IBAN check digits from an Italian BBAN body, replay MOD-97 evidence, and prepare payment fixtures.',
    category: 'finance',
    actionLabel: 'Generate',
    kind: 'ibangenerator',
    samples: [
      { label: 'Valid BBAN', value: 'X0542811101000000123456' },
      { label: 'Short BBAN', value: 'X0542811' }
    ],
    boundaries: [
      'Official Italian bank ownership, account existence, payment delivery, and regulated status require the responsible bank or payment network.'
    ],
    qualityNotes: [
      { title: 'Browser-only', text: 'IBAN check digits are generated locally in this browser.' },
      { title: 'Official boundary', text: 'Generated fixture structure does not prove a live account.' },
      { title: 'Fixture safety', text: 'Use generated IBANs for test payloads, not production payment instructions.' },
      { title: 'Developer handling', text: 'Copy normalized values for forms and masked values for logs.' }
    ]
  });
  const TOOLS = RAW_TOOLS.map((tool) => Object.assign({}, tool, { i18n: {} }));
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: 'italy-suite', country: { slug: 'italy', name: 'Italy' }, theme: { accent: '#008C45', accent2: '#CD212A', accent3: '#F4F5F0' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window.ValidoHubItalySuite = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
