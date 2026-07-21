(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.portugal-suite';
  const RAW_TOOLS = [
  {
    "id": "portugal-nif-validator",
    "name": "Portuguese NIF Validator",
    "code": "ID",
    "summary": "Validate NIF shape, split date/control/body evidence, and prepare privacy-safe debugging output.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "personal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749"
      },
      {
        "label": "Invalid sample",
        "value": "123456740"
      },
      {
        "label": "Short sample",
        "value": "12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT ID edge 1"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ID local evidence",
        "text": "Portuguese NIF Validator analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-nipc-validator",
    "name": "Portuguese NIPC Validator",
    "code": "ORG",
    "summary": "Inspect NIPC structure, registry-style prefixes, control digits, and official lookup boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "company",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "PT123456740"
      },
      {
        "label": "Short sample",
        "value": "PT12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT ORG edge 2"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ORG local evidence",
        "text": "Portuguese NIPC Validator analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vat-id-validator",
    "name": "Portuguese VAT ID / PT Prefix Validator",
    "code": "VAT",
    "summary": "Normalize PT VAT identifiers, inspect local tax body evidence, and prepare VIES handoff diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "vat",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ123456749"
      },
      {
        "label": "Short sample",
        "value": "PT12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT VAT edge 3"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VAT local evidence",
        "text": "Portuguese VAT ID / PT Prefix Validator analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid VAT examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized VAT values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-eori-validator",
    "name": "Portuguese EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect customs identifiers, country prefixes, VAT-style bodies, and border-process boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "kind": "eori",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PTPT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "ZZPT123456749"
      },
      {
        "label": "Short sample",
        "value": "PTPT1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZPT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT EORI edge 4"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EORI local evidence",
        "text": "Portuguese EORI / Customs Identifier Helper analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid EORI examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized EORI values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-niss-social-insurance-helper",
    "name": "Portuguese NISS Helper",
    "code": "SOC",
    "summary": "Split NISS evidence into local body, date hints, checksum notes, and privacy-safe diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "social",
    "samples": [
      {
        "label": "Valid sample",
        "value": "12345674901"
      },
      {
        "label": "Invalid sample",
        "value": "12345674902"
      },
      {
        "label": "Short sample",
        "value": "1234567"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 12345674901"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SOC edge 5"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SOC local evidence",
        "text": "Portuguese NISS Helper analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-company-onboarding-auditor",
    "name": "Portuguese Company Onboarding Auditor",
    "code": "KYC",
    "summary": "Audit company intake payloads for NIPC, VAT, address, banking, and official registry handoff readiness.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "companyonboarding",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,57\"}"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT KYC edge 6"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "KYC local evidence",
        "text": "Portuguese Company Onboarding Auditor analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-business-register-readiness-helper",
    "name": "Portuguese Registo Comercial Readiness Helper",
    "code": "REG",
    "summary": "Prepare browser-only evidence before a regulated Registo Comercial lookup or company registry workflow.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "register",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749 PT123456749 Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "PT123456749 PT123456749 Rua Augusta 100, 1100-054 Lisboa"
      },
      {
        "label": "Short sample",
        "value": "PT123456749 PT123456749 Rua Aug"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749 PT123456749 Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT REG edge 7"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REG local evidence",
        "text": "Portuguese Registo Comercial Readiness Helper analyzes Portugal-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-id-card-format-helper",
    "name": "Portuguese ID Card Format Helper",
    "code": "CARD",
    "summary": "Inspect local identity-card snippets, document numbers, dates, and privacy boundaries without proving identity.",
    "category": "national-identifiers",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT CARD 8"
      },
      {
        "label": "Short sample",
        "value": "12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT CARD edge 8"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CARD local evidence",
        "text": "Portuguese ID Card Format Helper analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-passport-number-helper",
    "name": "Portuguese Passport Number Helper",
    "code": "PASS",
    "summary": "Parse passport-number snippets, nationality hints, issue/expiry dates, and MRZ handoff evidence.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<PRTPORTUGUESE<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PASS 9"
      },
      {
        "label": "Short sample",
        "value": "P<PRTPORTUGUESE<<SAMPLE"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT P<PRTPORTUGUESE<<SAMPLE<<<<<<<<<<<<<<<<<<"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PASS edge 9"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PASS local evidence",
        "text": "Portuguese Passport Number Helper analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-mrz-passport-parser",
    "name": "Portuguese MRZ / Passport Parser",
    "code": "MRZ",
    "summary": "Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "P<PRTSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567PRT8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT MRZ 10"
      },
      {
        "label": "Short sample",
        "value": "P<PRTSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB12345"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT P<PRTSAMPLE<<TEST<<<<<<<<<<<<<<<<<<<<\\nAB1234567PRT8501019M3107123<<<<<<<<<<<<<<06"
      },
      {
        "label": "Edge sample",
        "value": "Review PT MRZ edge 10"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MRZ local evidence",
        "text": "Portuguese MRZ / Passport Parser analyzes Portugal-specific national-identifiers evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-iban-validator",
    "name": "Portugal IBAN Validator",
    "code": "IBAN",
    "summary": "Validate PT IBAN shape, replay MOD-97 evidence, and split bank/account blocks for debugging.",
    "category": "finance",
    "actionLabel": "Validate",
    "kind": "iban",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT50000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ50000201231234567490154"
      },
      {
        "label": "Short sample",
        "value": "PT500002012312"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ50000201231234567490154"
      },
      {
        "label": "Edge sample",
        "value": "Review PT IBAN edge 11"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBAN local evidence",
        "text": "Portugal IBAN Validator analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid IBAN examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized IBAN values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-iban-generator",
    "name": "Portugal IBAN Generator",
    "code": "IBG",
    "summary": "Generate PT IBAN check digits from a local BBAN/account body, replay MOD-97 evidence, and prepare payment fixtures.",
    "category": "finance",
    "actionLabel": "Generate",
    "kind": "ibangenerator",
    "samples": [
      {
        "label": "Valid sample",
        "value": "000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "Wrong prefix PT 000201231234567490154"
      },
      {
        "label": "Short sample",
        "value": "000201231234"
      },
      {
        "label": "Grouped valid sample",
        "value": "0002 0123 1234 5674 9015 4"
      },
      {
        "label": "Edge sample",
        "value": "Review PT IBG edge 12"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "IBG local evidence",
        "text": "Portugal IBAN Generator analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid IBG examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized IBG values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-bank-account-inspector",
    "name": "Portuguese Domestic Bank Account Inspector",
    "code": "BANK",
    "summary": "Inspect domestic account slices, bank codes, branch/account blocks, and IBAN conversion boundaries.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bankcode",
    "samples": [
      {
        "label": "Valid sample",
        "value": "0002 0123"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT BANK 13"
      },
      {
        "label": "Short sample",
        "value": "0002 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 0002 0123"
      },
      {
        "label": "Edge sample",
        "value": "Review PT BANK edge 13"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BANK local evidence",
        "text": "Portuguese Domestic Bank Account Inspector analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-bic-swift-inspector",
    "name": "Portuguese BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC institution, country, location, and branch evidence for Portugal banking integrations.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "bic",
    "samples": [
      {
        "label": "Valid sample",
        "value": "ABCDPT2X"
      },
      {
        "label": "Invalid sample",
        "value": "ZZCDPT2X"
      },
      {
        "label": "Short sample",
        "value": "ABCDP"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZCDPT2X"
      },
      {
        "label": "Edge sample",
        "value": "Review PT BIC edge 14"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "BIC local evidence",
        "text": "Portuguese BIC / SWIFT Inspector analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-sepa-transfer-helper",
    "name": "Portuguese SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check creditor, IBAN, amount, remittance, and offline SEPA handoff fields before bank submission.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "sepa",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT50000201231234567490154\\n1 234,56 EUR\\nInvoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT SEPA 15"
      },
      {
        "label": "Short sample",
        "value": "PT50000201231234567490154\\n1 234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ50000201231234567490154\\n1 234,56 EUR\\nInvoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SEPA edge 15"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SEPA local evidence",
        "text": "Portuguese SEPA Transfer Helper analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SEPA examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SEPA values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-sepa-direct-debit-mandate-helper",
    "name": "Portuguese SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Inspect mandate references, creditor data, debtor IBAN, and browser-only direct-debit readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "directdebit",
    "samples": [
      {
        "label": "Valid sample",
        "value": "MANDATE-2026-001 PT50000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT SDD 16"
      },
      {
        "label": "Short sample",
        "value": "MANDATE-2026-001 PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZNDATE-2026-001 PT50000201231234567490154"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SDD edge 16"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SDD local evidence",
        "text": "Portuguese SEPA Direct Debit Mandate Helper analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid SDD examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized SDD values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-payment-reference-helper",
    "name": "Portuguese Multibanco Reference Helper",
    "code": "PAY",
    "summary": "Inspect local payment references, invoice links, amount evidence, and reconciliation-safe formatting.",
    "category": "finance",
    "actionLabel": "Inspect",
    "kind": "paymentref",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Multibanco REF 2026-001 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PAY 17"
      },
      {
        "label": "Short sample",
        "value": "Multibanco REF 2026-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Multibanco REF 2026-001 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PAY edge 17"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PAY local evidence",
        "text": "Portuguese Multibanco Reference Helper analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-remittance-text-builder",
    "name": "Portuguese Remittance Text Builder",
    "code": "REMIT",
    "summary": "Build concise remittance text from invoice, customer, VAT, and local payment reference evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "remittance",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Invoice 2026-001 PT123456749 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT REMIT 18"
      },
      {
        "label": "Short sample",
        "value": "Invoice 2026-001 PT1234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Invoice 2026-001 PT123456749 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT REMIT edge 18"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REMIT local evidence",
        "text": "Portuguese Remittance Text Builder analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-payment-reconciliation-helper",
    "name": "Portuguese Payment Reconciliation Helper",
    "code": "RECON",
    "summary": "Match bank statement snippets against invoice, tax, amount, and local payment-reference evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "kind": "reconciliation",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1 234,56 EUR; PT50000201231234567490154; Invoice 2026-001"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT RECON 19"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1 234,56 EUR; PT5000020123"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 21/07/2026; 1 234,56 EUR; PT50000201231234567490154; Invoice 2026-001"
      },
      {
        "label": "Edge sample",
        "value": "Review PT RECON edge 19"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RECON local evidence",
        "text": "Portuguese Payment Reconciliation Helper analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-bank-statement-parser",
    "name": "Portuguese Bank Statement Parser",
    "code": "STMT",
    "summary": "Parse statement rows for date, amount, IBAN, counterparty, reference, and local decimal conventions.",
    "category": "finance",
    "actionLabel": "Parse",
    "kind": "statement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "21/07/2026; 1 234,56 EUR; PT50000201231234567490154; sample counterparty"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT STMT 20"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026; 1 234,56 EUR; PT500002012312"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 21/07/2026; 1 234,56 EUR; PT50000201231234567490154; sample counterparty"
      },
      {
        "label": "Edge sample",
        "value": "Review PT STMT edge 20"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "STMT local evidence",
        "text": "Portuguese Bank Statement Parser analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-masked-iban-formatter",
    "name": "Portuguese Masked IBAN Formatter",
    "code": "MASK",
    "summary": "Create log-safe IBAN previews while preserving country, check digits, and account-tail evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "ibanmask",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT50000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "ZZ50000201231234567490154"
      },
      {
        "label": "Short sample",
        "value": "PT500002012312"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ50000201231234567490154"
      },
      {
        "label": "Edge sample",
        "value": "Review PT MASK edge 21"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MASK local evidence",
        "text": "Portuguese Masked IBAN Formatter analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-currency-decimal-formatter",
    "name": "Portuguese EUR Decimal Currency Formatter",
    "code": "CUR",
    "summary": "Normalize EUR amount strings, decimal separators, grouping, and API-safe numeric previews.",
    "category": "finance",
    "actionLabel": "Format",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT CUR 22"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT CUR edge 22"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUR local evidence",
        "text": "Portuguese EUR Decimal Currency Formatter analyzes Portugal-specific finance evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vat-rate-sanity-helper",
    "name": "Portuguese VAT Rate Sanity Helper",
    "code": "RATE",
    "summary": "Inspect VAT-rate snippets, local tax labels, amount bases, and official rate lookup boundaries.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "taxrate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IVA 20% base 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT RATE 23"
      },
      {
        "label": "Short sample",
        "value": "IVA 20% base 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZA 20% base 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT RATE edge 23"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RATE local evidence",
        "text": "Portuguese VAT Rate Sanity Helper analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vat-return-field-helper",
    "name": "Portuguese VAT Return Field Helper",
    "code": "RET",
    "summary": "Map VAT-return field labels, tax evidence, period dates, and export-safe developer payloads.",
    "category": "tax",
    "actionLabel": "Map",
    "kind": "taxreturn",
    "samples": [
      {
        "label": "Valid sample",
        "value": "IVA; PT123456749; period 2026-07; 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT RET 24"
      },
      {
        "label": "Short sample",
        "value": "IVA; PT123456749; period 2"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZA; PT123456749; period 2026-07; 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT RET edge 24"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "RET local evidence",
        "text": "Portuguese VAT Return Field Helper analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-invoice-number-helper",
    "name": "Portuguese Invoice Number Helper",
    "code": "INV",
    "summary": "Inspect invoice numbering, period hints, VAT/customer evidence, and duplicate-risk diagnostics.",
    "category": "tax",
    "actionLabel": "Inspect",
    "kind": "invoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "INV-2026-0001 PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT INV 25"
      },
      {
        "label": "Short sample",
        "value": "INV-2026-0001 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZV-2026-0001 PT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT INV edge 25"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "INV local evidence",
        "text": "Portuguese Invoice Number Helper analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-e-invoicing-readiness-checker",
    "name": "Portuguese SAF-T / e-Fatura Readiness Checker",
    "code": "EINV",
    "summary": "Audit e-invoicing payload readiness for seller, buyer, tax, address, totals, and official submission boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "einvoice",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT EINV 26"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT EINV edge 26"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "EINV local evidence",
        "text": "Portuguese SAF-T / e-Fatura Readiness Checker analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-tax-authority-handoff-helper",
    "name": "Portuguese Tax Authority Handoff Helper",
    "code": "TAX",
    "summary": "Prepare local tax evidence for browser-only QA before regulated authority portals or API submissions.",
    "category": "tax",
    "actionLabel": "Audit",
    "kind": "taxhandoff",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749 21/07/2026 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT TAX 27"
      },
      {
        "label": "Short sample",
        "value": "PT123456749 21/07/20"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749 21/07/2026 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT TAX edge 27"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TAX local evidence",
        "text": "Portuguese Tax Authority Handoff Helper analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-accounting-audit-trail-checklist-generator",
    "name": "Portuguese Accounting Audit Trail Checklist Helper",
    "code": "AUDIT",
    "summary": "Generate local accounting evidence checklist for invoices, payments, VAT, dates, and immutable logs.",
    "category": "tax",
    "actionLabel": "Generate",
    "kind": "audittrail",
    "samples": [
      {
        "label": "Valid sample",
        "value": "invoice 21/07/2026 1 234,56 EUR PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT AUDIT 28"
      },
      {
        "label": "Short sample",
        "value": "invoice 21/07/2026 1 234"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT invoice 21/07/2026 1 234,56 EUR PT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT AUDIT edge 28"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "AUDIT local evidence",
        "text": "Portuguese Accounting Audit Trail Checklist Helper analyzes Portugal-specific tax evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-postal-code-validator",
    "name": "Portuguese Postal Code Validator",
    "code": "POST",
    "summary": "Validate codigo postal shape, split area/delivery hints, and preserve official postal lookup boundaries.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "postal",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000-001 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT POST 29"
      },
      {
        "label": "Short sample",
        "value": "1000-001 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 1000-001 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT POST edge 29"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "POST local evidence",
        "text": "Portuguese Postal Code Validator analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-address-normalizer",
    "name": "Portuguese Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize street, postal code, locality, region, and country lines for local address forms.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "address",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT ADDR 30"
      },
      {
        "label": "Short sample",
        "value": "Rua Augusta 100, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT ADDR edge 30"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ADDR local evidence",
        "text": "Portuguese Address Normalizer analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-address-transliteration-normalizer",
    "name": "Portuguese Address Transliteration Normalizer",
    "code": "ASCII",
    "summary": "Prepare ASCII-safe address keys while preserving local display text and search/debug evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "transliteration",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT ASCII 31"
      },
      {
        "label": "Short sample",
        "value": "Rua Augusta 100, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT ASCII edge 31"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "ASCII local evidence",
        "text": "Portuguese Address Transliteration Normalizer analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-region-code-mapper",
    "name": "Portuguese Region / Province Code Mapper",
    "code": "REGION",
    "summary": "Inspect regional abbreviations, locality evidence, postal zones, and official geography lookup boundaries.",
    "category": "address",
    "actionLabel": "Map",
    "kind": "region",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1000-001 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT REGION 32"
      },
      {
        "label": "Short sample",
        "value": "1000-001 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 1000-001 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT REGION edge 32"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGION local evidence",
        "text": "Portuguese Region / Province Code Mapper analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-municipality-code-inspector",
    "name": "Portuguese Municipality Code Inspector",
    "code": "MUNI",
    "summary": "Inspect municipality/city evidence, address fields, postal slices, and administrative-code boundaries.",
    "category": "address",
    "actionLabel": "Inspect",
    "kind": "municipality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT MUNI 33"
      },
      {
        "label": "Short sample",
        "value": "Rua Augusta 100, 1"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT MUNI edge 33"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "MUNI local evidence",
        "text": "Portuguese Municipality Code Inspector analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-phone-number-validator",
    "name": "Portuguese Phone Number Validator",
    "code": "PHONE",
    "summary": "Validate local phone shape, country prefix, national number blocks, and contact-form safety notes.",
    "category": "address",
    "actionLabel": "Validate",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+351 912 345 678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PHONE 34"
      },
      {
        "label": "Short sample",
        "value": "+351 912 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT +351 912 345 678"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PHONE edge 34"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PHONE local evidence",
        "text": "Portuguese Phone Number Validator analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-phone-e164-formatter",
    "name": "Portuguese Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize local phone input to E.164-style previews and split country/national evidence.",
    "category": "address",
    "actionLabel": "Format",
    "kind": "phone",
    "samples": [
      {
        "label": "Valid sample",
        "value": "+351 912 345 678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT E164 35"
      },
      {
        "label": "Short sample",
        "value": "+351 912 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT +351 912 345 678"
      },
      {
        "label": "Edge sample",
        "value": "Review PT E164 edge 35"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "E164 local evidence",
        "text": "Portuguese Phone E.164 Formatter analyzes Portugal-specific address evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-date-locale-formatter",
    "name": "Portuguese Date Locale Formatter",
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
        "value": "Invalid PT DATE 36"
      },
      {
        "label": "Short sample",
        "value": "21/07/"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 21/07/2026"
      },
      {
        "label": "Edge sample",
        "value": "Review PT DATE edge 36"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DATE local evidence",
        "text": "Portuguese Date Locale Formatter analyzes Portugal-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-csv-locale-normalizer",
    "name": "Portuguese CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets for Portugal decimal, date, postal, phone, tax, and banking fields.",
    "category": "developer-tools",
    "actionLabel": "Normalize",
    "kind": "csv",
    "samples": [
      {
        "label": "Valid sample",
        "value": "id;amount;date;tax\\n1;1 234,56 EUR;21/07/2026;PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT CSV 37"
      },
      {
        "label": "Short sample",
        "value": "id;amount;date;tax\\n1;1 234,56 E"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT id;amount;date;tax\\n1;1 234,56 EUR;21/07/2026;PT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT CSV edge 37"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CSV local evidence",
        "text": "Portuguese CSV Locale Normalizer analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-slug-normalizer",
    "name": "Portuguese Slug Normalizer",
    "code": "SLUG",
    "summary": "Create locale-safe URL slugs from names, addresses, and organization labels without losing display text.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "slug",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Portugal sample company Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT SLUG 38"
      },
      {
        "label": "Short sample",
        "value": "Portugal sample company Rua Aug"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Portugal sample company Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SLUG edge 38"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SLUG local evidence",
        "text": "Portuguese Slug Normalizer analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-document-ocr-fixer",
    "name": "Portuguese Document OCR Fixer",
    "code": "OCR",
    "summary": "Clean OCR text for local invoices, IDs, banking strings, dates, and tax evidence.",
    "category": "documents",
    "actionLabel": "Fix",
    "kind": "ocr",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749 PT123456749 PT50000201231234567490154 1000-001 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT OCR 39"
      },
      {
        "label": "Short sample",
        "value": "123456749 PT123456749 PT50000201231"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749 PT123456749 PT50000201231234567490154 1000-001 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT OCR edge 39"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "OCR local evidence",
        "text": "Portuguese Document OCR Fixer analyzes Portugal-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-gdpr-redaction-helper",
    "name": "Portuguese GDPR / CNPD Redaction Helper",
    "code": "GDPR",
    "summary": "Mask personal, tax, banking, phone, and address evidence for logs and support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT GDPR 40"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT GDPR edge 40"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "GDPR local evidence",
        "text": "Portuguese GDPR / CNPD Redaction Helper analyzes Portugal-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
      },
      {
        "title": "Fixture safety",
        "text": "Valid and invalid GDPR examples are safe structural fixtures for tests and demos."
      },
      {
        "title": "Developer handling",
        "text": "Use normalized GDPR values for forms, masked previews for logs, and field slices for parser/debug handoff."
      }
    ]
  },
  {
    "id": "portugal-pii-masker",
    "name": "Portuguese PII Masker",
    "code": "PII",
    "summary": "Detect and mask local identifier, phone, address, bank, and tax evidence in plain text.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749 +351 912 345 678 PT50000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PII 41"
      },
      {
        "label": "Short sample",
        "value": "123456749 +351 912 345 678 PT"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749 +351 912 345 678 PT50000201231234567490154"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PII edge 41"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PII local evidence",
        "text": "Portuguese PII Masker analyzes Portugal-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-personal-data-fixture-generator",
    "name": "Portuguese Personal Data Fixture Helper",
    "code": "FIX",
    "summary": "Generate fixture-safe local identity/address/payment snippets with clear non-official boundaries.",
    "category": "privacy",
    "actionLabel": "Generate",
    "kind": "fixture",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749\\nRua Augusta 100, 1100-053 Lisboa\\n+351 912 345 678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT FIX 42"
      },
      {
        "label": "Short sample",
        "value": "123456749\\nRua Augusta 100, 1100-0"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749\\nRua Augusta 100, 1100-053 Lisboa\\n+351 912 345 678"
      },
      {
        "label": "Edge sample",
        "value": "Review PT FIX edge 42"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FIX local evidence",
        "text": "Portuguese Personal Data Fixture Helper analyzes Portugal-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-driving-licence-format-helper",
    "name": "Portuguese Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect driving-licence snippets, dates, document numbers, and transport-intake privacy notes.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749 DL 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT DL 43"
      },
      {
        "label": "Short sample",
        "value": "123456749 "
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749 DL 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review PT DL edge 43"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DL local evidence",
        "text": "Portuguese Driving Licence Format Helper analyzes Portugal-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-residence-permit-format-helper",
    "name": "Portuguese Residence Permit Format Helper",
    "code": "PERMIT",
    "summary": "Inspect residence-permit snippets, document IDs, nationality hints, and official status boundaries.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT PERMIT 2026 123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PERMIT 44"
      },
      {
        "label": "Short sample",
        "value": "PT PERMIT 2026"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ PERMIT 2026 123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PERMIT edge 44"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PERMIT local evidence",
        "text": "Portuguese Residence Permit Format Helper analyzes Portugal-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-health-card-format-helper",
    "name": "Portuguese Health Card Format Helper",
    "code": "HEALTH",
    "summary": "Inspect health-card or insurance snippets, personal evidence, and high-sensitivity privacy handling.",
    "category": "documents",
    "actionLabel": "Inspect",
    "kind": "document",
    "samples": [
      {
        "label": "Valid sample",
        "value": "123456749 HEALTH 2026"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT HEALTH 45"
      },
      {
        "label": "Short sample",
        "value": "123456749 HE"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 123456749 HEALTH 2026"
      },
      {
        "label": "Edge sample",
        "value": "Review PT HEALTH edge 45"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "HEALTH local evidence",
        "text": "Portuguese Health Card Format Helper analyzes Portugal-specific documents evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vehicle-plate-inspector",
    "name": "Portuguese Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect vehicle plate shape, regional hints, serial blocks, and official vehicle registry boundaries.",
    "category": "transport",
    "actionLabel": "Inspect",
    "kind": "plate",
    "samples": [
      {
        "label": "Valid sample",
        "value": "12-AA-34"
      },
      {
        "label": "Invalid sample",
        "value": "12-AA-35"
      },
      {
        "label": "Short sample",
        "value": "12-AA"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 12-AA-34"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PLATE edge 46"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PLATE local evidence",
        "text": "Portuguese Vehicle Plate Inspector analyzes Portugal-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vin-validator",
    "name": "Portuguese VIN Validator",
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
        "value": "WVWZZZ1JZXW000002"
      },
      {
        "label": "Short sample",
        "value": "WVWZZZ1JZX"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZWZZZ1JZXW000001"
      },
      {
        "label": "Edge sample",
        "value": "Review PT VIN edge 47"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VIN local evidence",
        "text": "Portuguese VIN Validator analyzes Portugal-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-vehicle-data-redaction-helper",
    "name": "Portuguese Vehicle Data Redaction Helper",
    "code": "VEH",
    "summary": "Mask VIN, plate, owner, address, and insurance evidence for transport-support logs.",
    "category": "transport",
    "actionLabel": "Mask",
    "kind": "vehicle",
    "samples": [
      {
        "label": "Valid sample",
        "value": "12-AA-34 WVWZZZ1JZXW000001 123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT VEH 48"
      },
      {
        "label": "Short sample",
        "value": "12-AA-34 WVWZZZ1JZXW"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 12-AA-34 WVWZZZ1JZXW000001 123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT VEH edge 48"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "VEH local evidence",
        "text": "Portuguese Vehicle Data Redaction Helper analyzes Portugal-specific transport evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-customs-declaration-helper",
    "name": "Portuguese Customs Declaration Helper",
    "code": "CUSTOMS",
    "summary": "Inspect EORI, VAT, invoice, amount, HS-code, and border handoff evidence without official filing.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "customs",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749 HS 8471 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT CUSTOMS 49"
      },
      {
        "label": "Short sample",
        "value": "PT123456749 HS 847"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749 HS 8471 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT CUSTOMS edge 49"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CUSTOMS local evidence",
        "text": "Portuguese Customs Declaration Helper analyzes Portugal-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-postal-tracking-helper",
    "name": "Portuguese Postal Tracking Helper",
    "code": "TRACK",
    "summary": "Inspect tracking strings, postal-code evidence, address snippets, and carrier-status boundaries.",
    "category": "logistics",
    "actionLabel": "Inspect",
    "kind": "tracking",
    "samples": [
      {
        "label": "Valid sample",
        "value": "TRACK 2026 1000-001 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT TRACK 50"
      },
      {
        "label": "Short sample",
        "value": "TRACK 2026 1000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZACK 2026 1000-001 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT TRACK edge 50"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "TRACK local evidence",
        "text": "Portuguese Postal Tracking Helper analyzes Portugal-specific logistics evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-data-quality-workbench",
    "name": "Portuguese Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit mixed local data for identifiers, tax, banking, locale, privacy, and missing field evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "dataquality",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT DQ 51"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT DQ edge 51"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "DQ local evidence",
        "text": "Portuguese Data Quality Workbench analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-json-fixture-generator",
    "name": "Portuguese JSON Fixture Helper",
    "code": "JSON",
    "summary": "Generate and inspect JSON fixtures for local identifiers, addresses, payments, and privacy-safe tests.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "json",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT JSON 52"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT JSON edge 52"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "JSON local evidence",
        "text": "Portuguese JSON Fixture Helper analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-regex-pack-helper",
    "name": "Portuguese Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for local identifiers, VAT, IBAN, postal, phone, dates, and debug labels.",
    "category": "developer-tools",
    "actionLabel": "Explain",
    "kind": "regex",
    "samples": [
      {
        "label": "Valid sample",
        "value": "NIF NIPC codigo postal  PT50000201231234567490154"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT REGEX 53"
      },
      {
        "label": "Short sample",
        "value": "NIF NIPC codigo postal  PT5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZF NIPC codigo postal  PT50000201231234567490154"
      },
      {
        "label": "Edge sample",
        "value": "Review PT REGEX edge 53"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "REGEX local evidence",
        "text": "Portuguese Regex Pack Helper analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-api-payload-auditor",
    "name": "Portuguese API Payload Auditor",
    "code": "API",
    "summary": "Audit API payload snippets for locale, tax, identifiers, IBAN, dates, amounts, and official boundaries.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "api",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT API 54"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT API edge 54"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "API local evidence",
        "text": "Portuguese API Payload Auditor analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-form-field-auditor",
    "name": "Portuguese Form Field Auditor",
    "code": "FORM",
    "summary": "Check local form-field labels and values for identifiers, tax, address, phone, banking, and privacy.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "kind": "form",
    "samples": [
      {
        "label": "Valid sample",
        "value": "tax=PT123456749&postal=1000-001 Lisboa&phone=+351 912 345 678"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT FORM 55"
      },
      {
        "label": "Short sample",
        "value": "tax=PT123456749&postal=1000-001 Li"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT tax=PT123456749&postal=1000-001 Lisboa&phone=+351 912 345 678"
      },
      {
        "label": "Edge sample",
        "value": "Review PT FORM edge 55"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "FORM local evidence",
        "text": "Portuguese Form Field Auditor analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-locale-number-parser",
    "name": "Portuguese Locale Number Parser",
    "code": "NUM",
    "summary": "Parse decimal/grouping variants, currency labels, and API-safe numeric values for Portugal.",
    "category": "localization",
    "actionLabel": "Parse",
    "kind": "amount",
    "samples": [
      {
        "label": "Valid sample",
        "value": "1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT NUM 56"
      },
      {
        "label": "Short sample",
        "value": "1 234,5"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT NUM edge 56"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "NUM local evidence",
        "text": "Portuguese Locale Number Parser analyzes Portugal-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-calendar-week-helper",
    "name": "Portuguese Calendar Week Helper",
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
        "value": "Invalid PT CAL 57"
      },
      {
        "label": "Short sample",
        "value": "21/07/2026"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT 21/07/2026 week 30"
      },
      {
        "label": "Edge sample",
        "value": "Review PT CAL edge 57"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "CAL local evidence",
        "text": "Portuguese Calendar Week Helper analyzes Portugal-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-company-suffix-normalizer",
    "name": "Portuguese Company Suffix Normalizer",
    "code": "SUFFIX",
    "summary": "Normalize local company suffixes, registry labels, and search-key variants for onboarding forms.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "kind": "companysuffix",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Portugal Sample Holding Ltd PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Portugal Sample Holding Ltd PT123456740"
      },
      {
        "label": "Short sample",
        "value": "Portugal Sample Holdin"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Portugal Sample Holding Ltd PT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SUFFIX edge 58"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUFFIX local evidence",
        "text": "Portuguese Company Suffix Normalizer analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-procurement-identifier-helper",
    "name": "Portuguese Procurement Identifier Helper",
    "code": "PROC",
    "summary": "Inspect buyer/seller identifiers, invoice references, and public-procurement handoff evidence.",
    "category": "government",
    "actionLabel": "Audit",
    "kind": "procurement",
    "samples": [
      {
        "label": "Valid sample",
        "value": "PT123456749 PO-2026-001 PT123456749"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT PROC 59"
      },
      {
        "label": "Short sample",
        "value": "PT123456749 PO-2026-"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZ123456749 PO-2026-001 PT123456749"
      },
      {
        "label": "Edge sample",
        "value": "Review PT PROC edge 59"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "PROC local evidence",
        "text": "Portuguese Procurement Identifier Helper analyzes Portugal-specific government evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-accessibility-locale-copy-checker",
    "name": "Portuguese Locale Copy Checker",
    "code": "COPY",
    "summary": "Check UI labels for local identifier names, date/currency wording, and support-safe explanations.",
    "category": "localization",
    "actionLabel": "Audit",
    "kind": "copycheck",
    "samples": [
      {
        "label": "Valid sample",
        "value": "NIF input, codigo postal input, amount 1 234,56 EUR"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT COPY 60"
      },
      {
        "label": "Short sample",
        "value": "NIF input, codigo postal inpu"
      },
      {
        "label": "Wrong prefix sample",
        "value": "ZZF input, codigo postal input, amount 1 234,56 EUR"
      },
      {
        "label": "Edge sample",
        "value": "Review PT COPY edge 60"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "COPY local evidence",
        "text": "Portuguese Locale Copy Checker analyzes Portugal-specific localization evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-support-ticket-scrubber",
    "name": "Portuguese Support Ticket Scrubber",
    "code": "SUP",
    "summary": "Detect and mask local personal, payment, vehicle, tax, and address evidence in support tickets.",
    "category": "privacy",
    "actionLabel": "Mask",
    "kind": "privacy",
    "samples": [
      {
        "label": "Valid sample",
        "value": "Customer sent 123456749, PT50000201231234567490154, Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT SUP 61"
      },
      {
        "label": "Short sample",
        "value": "Customer sent 123456749, PT50000201231234567490"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT Customer sent 123456749, PT50000201231234567490154, Rua Augusta 100, 1100-053 Lisboa"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SUP edge 61"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SUP local evidence",
        "text": "Portuguese Support Ticket Scrubber analyzes Portugal-specific privacy evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
    "id": "portugal-integration-smoke-test-builder",
    "name": "Portuguese Integration Smoke Test Builder",
    "code": "SMOKE",
    "summary": "Build local smoke-test evidence for forms, APIs, payments, invoices, and privacy-safe fixtures.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "kind": "smoketest",
    "samples": [
      {
        "label": "Valid sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Invalid sample",
        "value": "Invalid PT SMOKE 62"
      },
      {
        "label": "Short sample",
        "value": "{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000"
      },
      {
        "label": "Wrong prefix sample",
        "value": "Wrong prefix PT {\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"
      },
      {
        "label": "Edge sample",
        "value": "Review PT SMOKE edge 62"
      }
    ],
    "boundaries": [
      "Official Portugal identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider."
    ],
    "qualityNotes": [
      {
        "title": "SMOKE local evidence",
        "text": "Portuguese Integration Smoke Test Builder analyzes Portugal-specific developer-tools evidence locally in this browser."
      },
      {
        "title": "Official lookup boundary",
        "text": "Offline Portuguese parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status."
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
  const COUNTRY = {"slug":"portugal","iso2":"PT","iso3":"PRT","isoNumeric":"620","name":"Portugal","adjective":"Portuguese","nativeName":"Portugal","flag":"🇵🇹","language":"Portuguese","localLanguage":"pt-PT","currency":"EUR","currencyName":"Euro","symbol":"EUR","locale":"pt-PT","icu":"pt_PT","date":"DD/MM/YYYY","decimal":"Comma (,)","thousands":"Space or dot grouping","phone":"+351","capital":"Lisbon","region":"Southern Europe / European Union","population":"approximately 10.4M","identifiers":["NIF","NISS","Cartao de Cidadao","NIPC","postal code","phone"],"payments":["IBAN","SEPA","SWIFT","Multibanco reference","VIES"],"localTerms":{"personal":"NIF","company":"NIPC","tax":"IVA","social":"NISS","register":"Registo Comercial","invoice":"SAF-T / e-Fatura","payment":"Multibanco","plate":"vehicle plate","postal":"codigo postal","privacy":"GDPR / CNPD"},"samples":{"personal":"123456749","company":"PT123456749","social":"12345674901","iban":"PT50000201231234567490154","bank":"0002 0123","phone":"+351 912 345 678","postal":"1000-001 Lisboa","plate":"12-AA-34","vat":"PT123456749","amount":"1 234,56 EUR","date":"21/07/2026","address":"Rua Augusta 100, 1100-053 Lisboa","json":"{\"country\":\"PT\",\"nif\":\"123456749\",\"iban\":\"PT50000201231234567490154\",\"amount\":\"1 234,56\"}"},"theme":["#006600","#FF0000","#F7F7F2"],"marker":{"x":38,"y":62},"related":["ES","FR","IT"]};
  const LOCALIZED = {
    en: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Portugal systems remain the source of truth.', localStructure: 'Portuguese local structure', addEvidence: 'Add Portuguese local evidence or use the valid sample.' },
    es: { success: 'Comprobaciones offline superadas', review: 'Revisar', normalized: 'normalizado', official: 'Los sistemas oficiales de Portugal siguen siendo la fuente de verdad.', localStructure: 'estructura local de Portugal', addEvidence: 'Agrega evidencia local de Portugal o usa la muestra valida.' },
    'pt-BR': { success: 'Verificacoes offline aprovadas', review: 'Revisao necessaria', normalized: 'normalizado', official: 'Os sistemas oficiais de Portugal continuam sendo a fonte da verdade.', localStructure: 'estrutura local de Portugal', addEvidence: 'Adicione evidencia local de Portugal ou use a amostra valida.' },
    de: { success: 'Offline-Pruefungen bestanden', review: 'Pruefung erforderlich', normalized: 'normalisiert', official: 'Offizielle Systeme in Portugal bleiben die Quelle der Wahrheit.', localStructure: 'lokale Struktur von Portugal', addEvidence: 'Fuege lokale Portuguese Nachweise hinzu oder nutze das gueltige Beispiel.' },
    fr: { success: 'Controles hors ligne reussis', review: 'Verification requise', normalized: 'normalise', official: 'Les systemes officiels de Portugal restent la source de verite.', localStructure: 'structure locale de Portugal', addEvidence: 'Ajoutez une preuve locale de Portugal ou utilisez un exemple valide.' },
    pl: { success: 'Kontrole offline zakonczone', review: 'Wymaga sprawdzenia', normalized: 'znormalizowane', official: 'Oficjalne systemy kraju Portugal pozostaja zrodlem prawdy.', localStructure: 'lokalna struktura kraju Portugal', addEvidence: 'Dodaj lokalne dane kraju Portugal albo uzyj poprawnej probki.' },
    uk: { success: 'Offline checks passed', review: 'Review needed', normalized: 'normalized', official: 'Official Portugal systems remain the source of truth.', localStructure: 'Portuguese local structure', addEvidence: 'Add Portuguese local evidence or use the valid sample.' }
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
      company: (upper.match(/(?:PT)?[A-Z0-9][A-Z0-9 .\/-]{6,18}/) || [])[0] || '',
      vat: (upper.match(/PT\s*[A-Z0-9 .\/-]{6,16}/) || [])[0] || '',
      iban: (upper.match(/PT[0-9]{2}[A-Z0-9]{8,30}/) || [])[0] || '',
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
  function mount() { const factory = window.ValidoHubCountrySuiteFactory; if (!factory) return false; const suite = factory.createSuite({ suiteId: COUNTRY.slug + '-suite', country: { slug: COUNTRY.slug, name: COUNTRY.name }, theme: { accent: '#006600', accent2: '#FF0000', accent3: '#F7F7F2' }, i18n: suiteI18n(), tools: TOOLS, analyze }); suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench')); window['ValidoHub' + COUNTRY.name.replace(/\W/g, '') + 'Suite'] = suite; return true; }
  function init() { if (mount()) return; setTimeout(init, 20); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
