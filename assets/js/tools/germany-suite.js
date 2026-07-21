(() => {
  'use strict';
  const ALGORITHM_ID = 'validohub.germany-suite';
  const RAW_TOOLS = [
  {
    "id": "german-tax-id-validator",
    "name": "German Tax ID / IdNr Validator",
    "code": "IdNr",
    "summary": "Validate German Steueridentifikationsnummer shape, replay ISO 7064 MOD 11,10 check digit evidence, and separate offline syntax from identity proof.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "11-digit IdNr",
        "value": "04452397687"
      },
      {
        "label": "Bad check",
        "value": "04452397688"
      }
    ],
    "kind": "taxid",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-steuernummer-format-helper",
    "name": "German Steuernummer Format Helper",
    "code": "StNr",
    "summary": "Inspect German tax-number snippets, normalize separators, detect Bundesland-style segments, and prepare ELSTER-safe diagnostics.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Slash format",
        "value": "12/345/67890"
      },
      {
        "label": "Loose digits",
        "value": "1234567890"
      }
    ],
    "kind": "steuernummer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vat-ust-idnr-validator",
    "name": "German USt-IdNr / VAT Validator",
    "code": "USt",
    "summary": "Validate German VAT display syntax, normalize DE prefixes, inspect numeric body length, and prepare VIES handoff notes.",
    "category": "tax",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "DE VAT sample",
        "value": "DE123456789"
      },
      {
        "label": "Missing DE",
        "value": "123456789"
      }
    ],
    "kind": "vat",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-eori-validator",
    "name": "German EORI / Customs Identifier Helper",
    "code": "EORI",
    "summary": "Inspect German EORI/customs identifier payloads, country prefixes, digit evidence, and customs-boundary notes.",
    "category": "tax",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "DE EORI sample",
        "value": "DE123456789012345"
      },
      {
        "label": "Foreign prefix",
        "value": "FR123456789"
      }
    ],
    "kind": "eori",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-handelsregister-readiness-helper",
    "name": "German Handelsregister Readiness Helper",
    "code": "HR",
    "summary": "Audit HRB/HRA register references, court snippets, company names, and offline commercial-registry handoff evidence.",
    "category": "tax",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "HRB sample",
        "value": "HRB 123456 Amtsgericht Berlin-Charlottenburg Example GmbH"
      },
      {
        "label": "Missing court",
        "value": "HRB pending"
      }
    ],
    "kind": "register",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-lei-helper",
    "name": "German LEI Context Helper",
    "code": "LEI",
    "summary": "Inspect Legal Entity Identifier shape, German company context, and official GLEIF lookup boundaries for onboarding payloads.",
    "category": "tax",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "LEI sample",
        "value": "529900T8BM49AURSDO55 Example GmbH"
      },
      {
        "label": "Short LEI",
        "value": "529900"
      }
    ],
    "kind": "lei",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-company-onboarding-auditor",
    "name": "German Company Onboarding Auditor",
    "code": "CO",
    "summary": "Check company intake snippets for USt-IdNr, Handelsregister, IBAN, address, and official registry boundaries.",
    "category": "tax",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Company sample",
        "value": "Example GmbH\nUSt-IdNr DE123456789\nHRB 123456\nIBAN DE89370400440532013000\nBerlin"
      },
      {
        "label": "Sparse sample",
        "value": "Example GmbH pending"
      }
    ],
    "kind": "company",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-elster-readiness-helper",
    "name": "German ELSTER Readiness Helper",
    "code": "ELST",
    "summary": "Audit German tax-submission snippets for IdNr, Steuernummer, USt-IdNr, year, period, and official ELSTER boundary evidence.",
    "category": "tax",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "ELSTER sample",
        "value": "IdNr 04452397687\nSteuernummer 12/345/67890\nUSt DE123456789\nZeitraum 2026"
      },
      {
        "label": "Missing ids",
        "value": "Tax return 2026"
      }
    ],
    "kind": "taxdoc",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-tax-office-field-helper",
    "name": "German Finanzamt Field Helper",
    "code": "FA",
    "summary": "Inspect tax-office and assessment snippets for Steuernummer, Bundesland, city, year, and filing context without official lookup.",
    "category": "tax",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Finanzamt sample",
        "value": "Finanzamt Berlin\nSteuernummer 12/345/67890\nBescheid 2026"
      },
      {
        "label": "Thin sample",
        "value": "Finanzamt pending"
      }
    ],
    "kind": "taxdoc",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "germany-iban-validator",
    "name": "German IBAN Validator",
    "code": "IBAN",
    "summary": "Validate German IBAN numbers, extract BLZ and account segments, and explain where official bank-directory checks begin.",
    "category": "finance",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Valid IBAN",
        "value": "DE89370400440532013000"
      },
      {
        "label": "Wrong checksum",
        "value": "DE12370400440532013000"
      }
    ],
    "kind": "iban",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-blz-bank-code-inspector",
    "name": "German BLZ Bank Code Inspector",
    "code": "BLZ",
    "summary": "Inspect German eight-digit Bankleitzahl evidence, normalize bank-routing snippets, and separate directory lookup from local format checks.",
    "category": "finance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "BLZ sample",
        "value": "BLZ 37040044 account 0532013000"
      },
      {
        "label": "Short BLZ",
        "value": "BLZ 3704"
      }
    ],
    "kind": "blz",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-bic-swift-inspector",
    "name": "German BIC / SWIFT Inspector",
    "code": "BIC",
    "summary": "Inspect BIC/SWIFT shape, verify DE country-code evidence, and prepare payment-routing diagnostics.",
    "category": "finance",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "BIC sample",
        "value": "COBADEFFXXX"
      },
      {
        "label": "Foreign BIC",
        "value": "UBSWCHZH80A"
      }
    ],
    "kind": "bic",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-sepa-transfer-helper",
    "name": "German SEPA Transfer Helper",
    "code": "SEPA",
    "summary": "Check German SEPA-ready bundles for IBAN, BIC, amount, creditor, remittance, and bank-boundary notes.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "SEPA sample",
        "value": "IBAN DE89370400440532013000\nBIC COBADEFFXXX\nAmount EUR 1250.75\nCreditor Example GmbH"
      },
      {
        "label": "Missing amount",
        "value": "IBAN DE89\nCreditor pending"
      }
    ],
    "kind": "sepa",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-sepa-direct-debit-mandate-helper",
    "name": "German SEPA Direct Debit Mandate Helper",
    "code": "SDD",
    "summary": "Audit mandate references, creditor identifiers, German IBAN evidence, debtor fields, and direct-debit readiness notes.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Mandate sample",
        "value": "Mandate M-2026-001\nCreditor DE98ZZZ09999999999\nIBAN DE89370400440532013000\nDebtor Max Test"
      },
      {
        "label": "Missing mandate",
        "value": "IBAN DE89370400440532013000"
      }
    ],
    "kind": "mandate",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-girocard-routing-helper",
    "name": "German Girocard Routing Helper",
    "code": "GC",
    "summary": "Inspect Girocard/girocard payment references, BLZ hints, terminal snippets, and card-network boundary notes.",
    "category": "finance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Girocard sample",
        "value": "girocard terminal 123456 BLZ 37040044 amount EUR 19.90"
      },
      {
        "label": "Sparse sample",
        "value": "card payment pending"
      }
    ],
    "kind": "payment",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-remittance-text-builder",
    "name": "German Remittance Text Builder",
    "code": "REM",
    "summary": "Normalize German Verwendungszweck text, detect invoice, customer, amount, and SEPA-safe length evidence.",
    "category": "finance",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Remittance sample",
        "value": "Rechnung 2026-0042 Kunde 4711 Betrag EUR 1250,75"
      },
      {
        "label": "Too sparse",
        "value": "Danke"
      }
    ],
    "kind": "payment",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-payment-reconciliation-helper",
    "name": "German Payment Reconciliation Helper",
    "code": "REC",
    "summary": "Extract German IBANs, invoice ids, EUR amounts, dates, and counterparty evidence from reconciliation text.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Reconciliation sample",
        "value": "Zahlung 14.07.2026 Rechnung 2026-0042 EUR 1250,75 IBAN DE89370400440532013000"
      },
      {
        "label": "No reference",
        "value": "Payment received"
      }
    ],
    "kind": "payment",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-bank-statement-parser",
    "name": "German Bank Statement Parser",
    "code": "STAT",
    "summary": "Parse German bank-statement snippets for booking dates, IBANs, BLZ/BIC evidence, amounts, and reconciliation hints.",
    "category": "finance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Statement sample",
        "value": "14.07.2026 SEPA Gutschrift EUR 1250,75 IBAN DE89370400440532013000"
      },
      {
        "label": "Sparse row",
        "value": "credit pending"
      }
    ],
    "kind": "payment",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-masked-iban-formatter",
    "name": "German Masked IBAN Formatter",
    "code": "MIBAN",
    "summary": "Mask German IBANs for logs, keep country/check/BLZ hints, and prepare privacy-safe banking previews.",
    "category": "finance",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "IBAN sample",
        "value": "DE89370400440532013000"
      },
      {
        "label": "Bad IBAN",
        "value": "DE89"
      }
    ],
    "kind": "iban",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-eur-decimal-currency-formatter",
    "name": "German EUR Decimal Currency Formatter",
    "code": "EUR",
    "summary": "Parse German Euro amounts, normalize comma decimals, produce display strings, and expose integer cent values.",
    "category": "localization",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "EUR sample",
        "value": "1.250,75 EUR"
      },
      {
        "label": "Words",
        "value": "twelve euros"
      }
    ],
    "kind": "amount",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vat-rate-sanity-helper",
    "name": "German VAT Rate Sanity Helper",
    "code": "VAT%",
    "summary": "Check German VAT rate snippets, net/gross consistency, and invoice-friendly EUR amount evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "VAT sample",
        "value": "Netto 100,00 EUR\nUSt 19%\nBrutto 119,00 EUR"
      },
      {
        "label": "Missing rate",
        "value": "Netto 100 EUR Brutto pending"
      }
    ],
    "kind": "amount",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vat-return-field-helper",
    "name": "German VAT Return Field Helper",
    "code": "UVA",
    "summary": "Inspect Umsatzsteuer-Voranmeldung snippets for period, tax base, VAT rate, amount, and official filing boundaries.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "UVA sample",
        "value": "UVA 07/2026\nUSt 19%\nBemessung 1000,00\nZahllast 190,00"
      },
      {
        "label": "No period",
        "value": "UVA pending"
      }
    ],
    "kind": "taxdoc",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-invoice-number-helper",
    "name": "German Invoice Number Helper",
    "code": "INV",
    "summary": "Normalize German invoice-number snippets, detect year/sequence evidence, and flag accounting-system boundary notes.",
    "category": "finance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Invoice sample",
        "value": "Rechnung RE-2026-0042 vom 14.07.2026 Betrag 1250,75 EUR"
      },
      {
        "label": "Loose invoice",
        "value": "invoice pending"
      }
    ],
    "kind": "invoice",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-xrechnung-readiness-helper",
    "name": "German XRechnung Readiness Helper",
    "code": "XR",
    "summary": "Audit German XRechnung snippets for Leitweg-ID, supplier, buyer, amount, tax, and XML handoff evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "XRechnung sample",
        "value": "Leitweg-ID 991-12345-67\nSeller Example GmbH\nBuyer Stadt Berlin\nAmount 1250,75 EUR\nVAT 19%"
      },
      {
        "label": "Missing route",
        "value": "XRechnung pending"
      }
    ],
    "kind": "einvoice",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-zugferd-readiness-helper",
    "name": "German ZUGFeRD Readiness Helper",
    "code": "ZF",
    "summary": "Inspect ZUGFeRD/Factur-X readiness snippets for invoice, PDF/XML, amount, tax, and recipient evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "ZUGFeRD sample",
        "value": "ZUGFeRD EN16931\nInvoice RE-2026-0042\nAmount EUR 1250,75\nVAT 19%"
      },
      {
        "label": "Thin sample",
        "value": "PDF invoice pending"
      }
    ],
    "kind": "einvoice",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-e-invoicing-readiness-helper",
    "name": "German E-Invoicing Readiness Helper",
    "code": "EINV",
    "summary": "Check German e-invoicing payloads for XRechnung, ZUGFeRD, Leitweg-ID, VAT, amount, and recipient readiness.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "E-invoice sample",
        "value": "XRechnung Leitweg-ID 991-12345-67\nZUGFeRD EN16931\nUSt DE123456789\nAmount 1250,75 EUR"
      },
      {
        "label": "Missing format",
        "value": "invoice digital pending"
      }
    ],
    "kind": "einvoice",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-datev-export-readiness-checker",
    "name": "German DATEV Export Readiness Checker",
    "code": "DATEV",
    "summary": "Audit DATEV export snippets for account codes, booking date, amount, tax key, BU-Schluessel, and CSV handoff evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "DATEV sample",
        "value": "Konto 8400; Gegenkonto 1200; Datum 14072026; Betrag 1250,75; BU 9"
      },
      {
        "label": "Sparse export",
        "value": "Konto pending"
      }
    ],
    "kind": "accounting",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-gobd-audit-trail-checklist-generator",
    "name": "German GoBD Audit Trail Checklist Generator",
    "code": "GoBD",
    "summary": "Check German audit-trail snippets for immutability, timestamps, document ids, tax periods, and GoBD boundary notes.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "GoBD sample",
        "value": "Beleg RE-2026-0042\nTimestamp 2026-07-14T10:30:00+02:00\nHash abc123\nUser audit"
      },
      {
        "label": "No evidence",
        "value": "audit note pending"
      }
    ],
    "kind": "accounting",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-skr03-skr04-account-code-helper",
    "name": "German SKR03 / SKR04 Account Code Helper",
    "code": "SKR",
    "summary": "Inspect German chart-of-accounts snippets, detect SKR03/SKR04-like codes, and prepare accounting integration notes.",
    "category": "finance",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "SKR sample",
        "value": "SKR03 Konto 8400 Erlöse 19% USt Gegenkonto 1200"
      },
      {
        "label": "No code",
        "value": "sales account pending"
      }
    ],
    "kind": "accounting",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-payroll-social-security-helper",
    "name": "German Payroll Social Security Helper",
    "code": "SV",
    "summary": "Audit German payroll snippets for employee, Sozialversicherung context, amount, month, and health-insurance boundary evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Payroll sample",
        "value": "Mitarbeiter Max Test\nMonat 07/2026\nBrutto 4200,00 EUR\nSV beitragspflichtig"
      },
      {
        "label": "Sparse payroll",
        "value": "payroll pending"
      }
    ],
    "kind": "payroll",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-wage-tax-readiness-helper",
    "name": "German Wage Tax Readiness Helper",
    "code": "LSt",
    "summary": "Inspect Lohnsteuer snippets for IdNr, employer, period, wage tax, church tax hints, and ELSTER boundary evidence.",
    "category": "finance",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "LSt sample",
        "value": "IdNr 04452397687\nLohnsteuer 620,00\nMonat 07/2026\nArbeitgeber Example GmbH"
      },
      {
        "label": "Missing id",
        "value": "Lohnsteuer pending"
      }
    ],
    "kind": "payroll",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-health-insurance-boundary-helper",
    "name": "German Health Insurance Boundary Helper",
    "code": "GKV",
    "summary": "Inspect German health-insurance snippets, member numbers, employer evidence, and privacy/official boundary notes.",
    "category": "privacy",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "GKV sample",
        "value": "Krankenkasse Test\nMitglied 123456789\nArbeitgeber Example GmbH\nBrutto 4200,00"
      },
      {
        "label": "Sparse sample",
        "value": "insurance pending"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-address-normalizer",
    "name": "German Address Normalizer",
    "code": "ADDR",
    "summary": "Normalize German street, house number, postal code, city, and country lines for local forms.",
    "category": "localization",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Address sample",
        "value": "Friedrichstrasse 123\n10117 Berlin\nDeutschland"
      },
      {
        "label": "Missing postal",
        "value": "Friedrichstrasse Berlin"
      }
    ],
    "kind": "address",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-address-transliteration-normalizer",
    "name": "German Address Transliteration Normalizer",
    "code": "TR",
    "summary": "Normalize German umlaut and ß variants, preserve postal fields, and prepare ASCII-safe address keys.",
    "category": "localization",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Umlaut sample",
        "value": "Müllerstraße 10\n80331 München"
      },
      {
        "label": "Sparse sample",
        "value": "Straße"
      }
    ],
    "kind": "address",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-postal-code-validator",
    "name": "German Postal Code Validator",
    "code": "PLZ",
    "summary": "Validate German five-digit postal code shape, detect address context, and separate delivery proof from local checks.",
    "category": "localization",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "PLZ sample",
        "value": "10117 Berlin"
      },
      {
        "label": "Short PLZ",
        "value": "1017 Berlin"
      }
    ],
    "kind": "postal",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-federal-state-code-mapper",
    "name": "German Federal State Code Mapper",
    "code": "BL",
    "summary": "Map German Bundesland abbreviations/names, detect regional context, and expose integration-safe state evidence.",
    "category": "localization",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "State sample",
        "value": "BE Berlin DE"
      },
      {
        "label": "Unknown state",
        "value": "ZZ Test"
      }
    ],
    "kind": "state",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-municipality-code-inspector",
    "name": "German Municipality Code Inspector",
    "code": "AGS",
    "summary": "Inspect German municipality-code snippets, normalize AGS-like digits, and mark official-statistics lookup boundaries.",
    "category": "localization",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "AGS sample",
        "value": "AGS 11000000 Berlin"
      },
      {
        "label": "Short AGS",
        "value": "AGS 11"
      }
    ],
    "kind": "municipality",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-phone-number-validator",
    "name": "German Phone Number Validator",
    "code": "TEL",
    "summary": "Validate German phone-number shape, normalize trunk prefixes, and prepare E.164 handoff notes.",
    "category": "localization",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Phone sample",
        "value": "030 1234567"
      },
      {
        "label": "Too short",
        "value": "030 12"
      }
    ],
    "kind": "phone",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-phone-e164-formatter",
    "name": "German Phone E.164 Formatter",
    "code": "E164",
    "summary": "Normalize German national numbers to +49 where possible, inspect subscriber length, and flag telecom lookup boundaries.",
    "category": "localization",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "E.164 sample",
        "value": "030 1234567"
      },
      {
        "label": "Mobile sample",
        "value": "+49 151 23456789"
      }
    ],
    "kind": "phone",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-date-locale-formatter",
    "name": "German Date Locale Formatter",
    "code": "DATE",
    "summary": "Parse German DD.MM.YYYY snippets, normalize ISO dates, and expose locale parsing evidence.",
    "category": "localization",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Date sample",
        "value": "14.07.2026"
      },
      {
        "label": "ISO sample",
        "value": "2026-07-14"
      }
    ],
    "kind": "date",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-csv-locale-normalizer",
    "name": "German CSV Locale Normalizer",
    "code": "CSV",
    "summary": "Normalize CSV snippets containing German semicolons, comma decimals, dates, VAT ids, and postal-code fields.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "CSV sample",
        "value": "ust;betrag;datum;plz\nDE123456789;1.250,75;14.07.2026;10117"
      },
      {
        "label": "Bad CSV",
        "value": "ust,amount\nmissing"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-slug-normalizer",
    "name": "German Slug Normalizer",
    "code": "SLUG",
    "summary": "Normalize German umlauts, ß, punctuation, and whitespace into stable ASCII slug keys.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "Slug sample",
        "value": "Müllerstraße GmbH & Co. KG Berlin"
      },
      {
        "label": "Short sample",
        "value": "Über uns"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-document-ocr-fixer",
    "name": "German Document OCR Fixer",
    "code": "OCR",
    "summary": "Repair common OCR spacing in German IdNr, USt-IdNr, IBAN, postal code, amount, and invoice snippets.",
    "category": "developer-tools",
    "actionLabel": "Format",
    "samples": [
      {
        "label": "OCR sample",
        "value": "USt - IdNr D E 123 456 789\nIBAN D E89 3704 0044 0532 0130 00"
      },
      {
        "label": "Sparse OCR",
        "value": "document pending"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-pii-masker",
    "name": "German PII Masker",
    "code": "PII",
    "summary": "Mask German IdNr, phone, IBAN, postal address, email, and document-like evidence for logs.",
    "category": "privacy",
    "actionLabel": "Mask",
    "samples": [
      {
        "label": "PII sample",
        "value": "Max Test, IdNr 04452397687, IBAN DE89370400440532013000, 10117 Berlin"
      },
      {
        "label": "Sparse sample",
        "value": "Max Test"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-gdpr-dsgvo-redaction-helper",
    "name": "German GDPR / DSGVO Redaction Helper",
    "code": "DSGVO",
    "summary": "Detect German personal, banking, tax, and address evidence, then prepare privacy-safe redaction notes.",
    "category": "privacy",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "DSGVO sample",
        "value": "Kunde Max Test\nIdNr 04452397687\nTelefon 030 1234567\nIBAN DE89370400440532013000"
      },
      {
        "label": "Thin sample",
        "value": "customer pending"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-personal-data-fixture-generator",
    "name": "German Personal Data Fixture Generator",
    "code": "FIX",
    "summary": "Generate and inspect safe German-looking personal-data fixtures for tests without implying real identity.",
    "category": "privacy",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Fixture sample",
        "value": "Name: Erika Mustermann\nPLZ: 10117\nPhone: 030 1234567\nIdNr: 04452397687"
      },
      {
        "label": "Sparse sample",
        "value": "fixture"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-id-card-format-helper",
    "name": "German ID Card Format Helper",
    "code": "PA",
    "summary": "Inspect Personalausweis-style alphanumeric document snippets, MRZ-like evidence, and identity-proof boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "ID sample",
        "value": "Personalausweis L01X00T47 Berlin 2026"
      },
      {
        "label": "Sparse ID",
        "value": "Ausweis pending"
      }
    ],
    "kind": "document",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-passport-number-helper",
    "name": "German Passport Number Helper",
    "code": "PASS",
    "summary": "Inspect German passport-number snippets, MRZ-like evidence, and official identity-document boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Passport sample",
        "value": "Passport C01X00T47 DEU 2026"
      },
      {
        "label": "Sparse passport",
        "value": "Reisepass pending"
      }
    ],
    "kind": "document",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-driving-licence-format-helper",
    "name": "German Driving Licence Format Helper",
    "code": "DL",
    "summary": "Inspect German driving-licence snippets, authority/date evidence, and official mobility boundary notes.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Licence sample",
        "value": "Fuehrerschein D123456789 Berlin 14.07.2026"
      },
      {
        "label": "Sparse licence",
        "value": "licence pending"
      }
    ],
    "kind": "document",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-residence-permit-format-helper",
    "name": "German Residence Permit Format Helper",
    "code": "AT",
    "summary": "Inspect Aufenthaltstitel snippets, card/document evidence, and official immigration-status boundaries.",
    "category": "national-identifiers",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Permit sample",
        "value": "Aufenthaltstitel Y01234567 DE Berlin 2026"
      },
      {
        "label": "Sparse permit",
        "value": "permit pending"
      }
    ],
    "kind": "document",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vehicle-plate-inspector",
    "name": "German Vehicle Plate Inspector",
    "code": "PLATE",
    "summary": "Inspect German vehicle plate region prefixes, serial letters/digits, and fleet-safe redaction evidence.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "Plate sample",
        "value": "B AB 1234"
      },
      {
        "label": "Invalid plate",
        "value": "1234 AB"
      }
    ],
    "kind": "plate",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vin-validator",
    "name": "German VIN Validator",
    "code": "VIN",
    "summary": "Validate VIN shape, split WMI/VDS/VIS evidence, and prepare German vehicle-intake diagnostics.",
    "category": "national-identifiers",
    "actionLabel": "Validate",
    "samples": [
      {
        "label": "VIN sample",
        "value": "WVWZZZ1JZXW000001"
      },
      {
        "label": "Bad VIN",
        "value": "WVW123"
      }
    ],
    "kind": "vin",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-vehicle-data-redaction-helper",
    "name": "German Vehicle Data Redaction Helper",
    "code": "AUTO",
    "summary": "Mask VINs, plates, owner snippets, and address evidence for German vehicle workflows.",
    "category": "national-identifiers",
    "actionLabel": "Mask",
    "samples": [
      {
        "label": "Vehicle sample",
        "value": "B AB 1234\nVIN WVWZZZ1JZXW000001\nOwner Max Test 10117 Berlin"
      },
      {
        "label": "Sparse vehicle",
        "value": "car pending"
      }
    ],
    "kind": "privacy",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-customs-declaration-helper",
    "name": "German Customs Declaration Helper",
    "code": "ZOLL",
    "summary": "Inspect customs snippets for EORI, invoice, amount, goods, and official Zoll boundary notes.",
    "category": "tax",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Customs sample",
        "value": "EORI DE123456789012345\nInvoice RE-2026-0042\nGoods test devices\nValue EUR 1250,75"
      },
      {
        "label": "Missing EORI",
        "value": "customs pending"
      }
    ],
    "kind": "customs",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-postal-tracking-helper",
    "name": "German Postal Tracking Helper",
    "code": "POST",
    "summary": "Inspect German parcel tracking snippets, postal-code evidence, carrier boundary notes, and log-safe previews.",
    "category": "developer-tools",
    "actionLabel": "Parse",
    "samples": [
      {
        "label": "Tracking sample",
        "value": "DHL 00340434161094000001 to 10117 Berlin"
      },
      {
        "label": "Sparse tracking",
        "value": "parcel pending"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-data-quality-workbench",
    "name": "German Data Quality Workbench",
    "code": "DQ",
    "summary": "Audit German mixed datasets for IdNr, USt-IdNr, IBAN, PLZ, phone, amount, date, and address evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Data sample",
        "value": "DE123456789; DE89370400440532013000; 10117 Berlin; 14.07.2026; 1.250,75 EUR"
      },
      {
        "label": "Sparse data",
        "value": "foo bar"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-json-fixture-generator",
    "name": "German JSON Fixture Generator",
    "code": "JSON",
    "summary": "Generate and inspect German-localized JSON snippets with locale, VAT, IBAN, address, and amount fields.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "JSON sample",
        "value": "{\"locale\":\"de-DE\",\"vat\":\"DE123456789\",\"iban\":\"DE89370400440532013000\",\"plz\":\"10117\"}"
      },
      {
        "label": "Bad JSON",
        "value": "{locale: de}"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-regex-pack-helper",
    "name": "German Regex Pack Helper",
    "code": "REGEX",
    "summary": "Prepare regex snippets for German IdNr, USt-IdNr, IBAN, PLZ, phone, amount, and date fields.",
    "category": "developer-tools",
    "actionLabel": "Generate",
    "samples": [
      {
        "label": "Regex sample",
        "value": "IdNr: ^\\d{11}$\nUSt: ^DE\\d{9}$\nPLZ: ^\\d{5}$"
      },
      {
        "label": "Sparse regex",
        "value": "regex pending"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-api-payload-auditor",
    "name": "German API Payload Auditor",
    "code": "API",
    "summary": "Audit German API payloads for locale, identifiers, banking, address, privacy, and official-boundary evidence.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "API sample",
        "value": "{\"country\":\"DE\",\"locale\":\"de-DE\",\"vat\":\"DE123456789\",\"iban\":\"DE89370400440532013000\",\"postalCode\":\"10117\"}"
      },
      {
        "label": "Bad payload",
        "value": "{\"country\":\"DE\"}"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "id": "german-form-field-auditor",
    "name": "German Form Field Auditor",
    "code": "FORM",
    "summary": "Review German form-field labels, placeholders, masks, validation hints, and accessibility-safe data-entry flows.",
    "category": "developer-tools",
    "actionLabel": "Audit",
    "samples": [
      {
        "label": "Form sample",
        "value": "field=ustId label=\"USt-IdNr\" placeholder=\"DE123456789\" mask=\"DE#########\" required=true"
      },
      {
        "label": "Sparse form",
        "value": "field=input"
      }
    ],
    "kind": "developer",
    "boundaries": [
      "Official German registry status, identity proof, bank ownership, tax filing, vehicle registry state, carrier delivery state, and legal decisions require the relevant German authority or provider."
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
    "German",
    "workbench",
    "Validate",
    "Waiting for DE data",
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
    "niemiecki",
    "narzedzie",
    "Sprawdz",
    "Oczekiwanie na dane DE",
    "Kontrole offline zaliczone",
    "Wymagana kontrola",
    "Kopiuj wynik",
    "Pobierz wynik",
    "Wyczysc",
    "Kopiuj znormalizowane",
    "Potok walidacji",
    "Notatki jakosci",
    "Analiza zaawansowana",
    "Poprawny przyklad",
    "Przyklad brzegowy"
  ],
  "de": [
    "deutscher",
    "Workbench",
    "Pruefen",
    "Warten auf DE-Daten",
    "Offline-Pruefungen bestanden",
    "Pruefung erforderlich",
    "Ergebnis kopieren",
    "Ergebnis herunterladen",
    "Leeren",
    "Normalisiert kopieren",
    "Validierungspipeline",
    "Qualitaetshinweise",
    "Erweiterte Analyse",
    "Gueltiges Beispiel",
    "Grenzfall"
  ],
  "es": [
    "aleman",
    "banco de trabajo",
    "Validar",
    "Esperando datos DE",
    "Comprobaciones offline superadas",
    "Requiere revision",
    "Copiar resultado",
    "Descargar resultado",
    "Limpiar",
    "Copiar normalizado",
    "Pipeline de validacion",
    "Notas de calidad",
    "Analisis avanzado",
    "Muestra valida",
    "Muestra limite"
  ],
  "pt-BR": [
    "alemao",
    "bancada",
    "Validar",
    "Aguardando dados DE",
    "Verificacoes offline aprovadas",
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
    "allemand",
    "atelier",
    "Valider",
    "En attente de donnees DE",
    "Controles hors ligne reussis",
    "Revision requise",
    "Copier le resultat",
    "Telecharger le resultat",
    "Effacer",
    "Copier normalise",
    "Pipeline de validation",
    "Notes de qualite",
    "Analyse avancee",
    "Exemple valide",
    "Cas limite"
  ],
  "it": [
    "tedesco",
    "workbench",
    "Valida",
    "In attesa di dati DE",
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
    "Duits",
    "werkbank",
    "Valideren",
    "Wachten op DE-gegevens",
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
    "alemao",
    "bancada",
    "Validar",
    "A aguardar dados DE",
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
    "nemecky",
    "nastroj",
    "Overit",
    "Ceka se na data DE",
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
    "Hranicni vzorek"
  ],
  "sk": [
    "nemecky",
    "nastroj",
    "Overit",
    "Caka sa na data DE",
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
    "Hranicna vzorka"
  ],
  "uk": [
    "nimetskyi",
    "instrument",
    "Pereviryty",
    "Ochikuvannia danykh DE",
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
    "Almanya",
    "araci",
    "Dogrula",
    "DE verisi bekleniyor",
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
    "german",
    "instrument",
    "Valideaza",
    "Se asteapta date DE",
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
    "nemet",
    "eszkoz",
    "Ellenorzes",
    "DE adatokra var",
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
    "tysk",
    "verktyg",
    "Validera",
    "Vantar pa DE-data",
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
    "tysk",
    "verktoy",
    "Valider",
    "Venter pa DE-data",
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
    "saksalainen",
    "tyokalu",
    "Validoi",
    "Odotetaan DE-dataa",
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
    "tysk",
    "vaerktoj",
    "Valider",
    "Venter pa DE-data",
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
    "ドイツ",
    "ワークベンチ",
    "検証",
    "DEデータ待機中",
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
    "독일",
    "워크벤치",
    "검증",
    "DE 데이터 대기 중",
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
    "德国",
    "工作台",
    "验证",
    "等待 DE 数据",
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
    "德國",
    "工作台",
    "驗證",
    "等待 DE 資料",
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
    "ألماني",
    "منضدة عمل",
    "تحقق",
    "بانتظار بيانات DE",
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
    "גרמני",
    "כלי עבודה",
    "אימות",
    "ממתין לנתוני DE",
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
    "German",
    "workbench",
    "Validate",
    "DE data ka intazar",
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
    "German",
    "workbench",
    "Validasi",
    "Menunggu data DE",
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
    "Duc",
    "ban lam viec",
    "Kiem tra",
    "Dang cho du lieu DE",
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
    "German",
    "workbench",
    "Validate",
    "Waiting for DE data",
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
    "German",
    "workbench",
    "Sahkan",
    "Menunggu data DE",
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
  const STATES = { BW:'Baden-Wuerttemberg', BY:'Bavaria', BE:'Berlin', BB:'Brandenburg', HB:'Bremen', HH:'Hamburg', HE:'Hesse', MV:'Mecklenburg-Vorpommern', NI:'Lower Saxony', NW:'North Rhine-Westphalia', RP:'Rhineland-Palatinate', SL:'Saarland', SN:'Saxony', ST:'Saxony-Anhalt', SH:'Schleswig-Holstein', TH:'Thuringia' };
  const text = (value) => String(value == null ? '' : value);
  const locale = () => location.pathname.split('/').filter(Boolean)[0] || 'en';
  const ui = () => LOCALE_UI[locale()] || LOCALE_UI.en;
  const digits = (value) => text(value).replace(/\D/g, '');
  function mask(value) { return text(value).replace(/[A-Za-z0-9]/g, (ch, i) => i % 4 === 0 ? ch : '•'); }
  function ibanToDigits(value) {
    const clean = text(value).toUpperCase().replace(/\s+/g, '');
    return (clean.slice(4) + clean.slice(0, 4)).replace(/[A-Z]/g, c => String(c.charCodeAt(0) - 55));
  }
  function mod97(value) { let rem = 0; for (const ch of value) rem = (rem * 10 + Number(ch)) % 97; return rem; }
  function deTaxCheck(d10) {
    let product = 10;
    for (const ch of d10) {
      let sum = (Number(ch) + product) % 10;
      if (sum === 0) sum = 10;
      product = (sum * 2) % 11;
    }
    const check = 11 - product;
    return String(check === 10 ? 0 : check);
  }
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
    id: 'germany-iban-generator',
    name: 'German IBAN Generator',
    code: 'IBG',
    summary: 'Generate DE IBAN check digits from a German BBAN body, replay MOD-97 evidence, and prepare SEPA fixtures.',
    category: 'finance',
    actionLabel: 'Generate',
    kind: 'ibangenerator',
    samples: [
      { label: 'Valid BBAN', value: '370400440532013000' },
      { label: 'Short BBAN', value: '37040044' }
    ],
    boundaries: [
      'Official German bank ownership, account existence, payment delivery, and regulated status require the responsible bank or payment network.'
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
      official: 'Official German systems remain the source of truth.',
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
      headline: tool.code + ': ' + localizedPhrase('review'),
      detail: 'Add German local evidence or use the valid sample.',
      primary: raw || 'empty',
      normalized: raw,
      checks: [],
      fields: [],
      breakdown: [],
      breakdownTitle: tool.code + ' field breakdown',
      breakdownSummary: 'German local structure, normalized value, and official-system boundary.',
      qualityNotes: tool.qualityNotes,
      suggestions: [],
      developerJson: {}
    };
  }
  function detectEvidence(raw) {
    const upper = raw.toUpperCase();
    return {
      vat: (upper.match(/\bDE\d{9}\b/) || [])[0] || '',
      iban: (upper.match(/\bDE[0-9 ]{20,28}\b/) || [])[0] || '',
      blz: (raw.match(/\b\d{8}\b/) || [])[0] || '',
      postal: (raw.match(/\b\d{5}\b/) || [])[0] || '',
      amount: (raw.match(/[0-9][0-9. '\u00a0]*[,.][0-9]{2}/) || [])[0] || '',
      date: (raw.match(/\b\d{1,2}\.\d{1,2}\.\d{4}\b/) || [])[0] || '',
      taxid: (raw.match(/\b\d{11}\b/) || [])[0] || '',
      phone: (raw.match(/(?:\+49|0)[0-9 ()\/-]{5,}/) || [])[0] || ''
    };
  }
  function analyze(tool, input) {
    const raw = text(input).trim();
    const upper = raw.toUpperCase();
    const ds = digits(raw);
    const ev = detectEvidence(raw);
    const result = base(tool, raw);
    let ok = raw.length > 0;
    let normalized = raw;
    if (tool.kind === 'taxid') {
      ok = ds.length === 11 && deTaxCheck(ds.slice(0, 10)) === ds[10] && !/^(\d)\1{10}$/.test(ds);
      normalized = ds;
      result.breakdown.push(field('ten-digit body', ds.slice(0, 10), 'German IdNr payload digits'), field('check digit', ds.slice(10, 11), 'ISO 7064 MOD 11,10'), field('expected check', ds.length >= 10 ? deTaxCheck(ds.slice(0, 10)) : 'missing', 'offline calculated digit'));
    } else if (tool.kind === 'steuernummer') {
      ok = /\d{2}[\/ ]?\d{3}[\/ ]?\d{5}/.test(raw) || (ds.length >= 10 && ds.length <= 13);
      normalized = raw.replace(/\s+/g, ' ').trim();
      result.breakdown.push(field('Bundesland/office hint', raw.split(/[\/\s-]+/)[0], 'first block often identifies local context'), field('body digits', ds, 'tax-number digit evidence'), field('separator style', raw.includes('/') ? 'slash-separated' : 'compact/other', 'display convention'));
    } else if (tool.kind === 'vat') {
      const vat = upper.replace(/[ .-]/g, '');
      ok = /^DE\d{9}$/.test(vat);
      normalized = vat;
      result.breakdown.push(field('country prefix', vat.slice(0, 2), 'DE expected'), field('numeric body', vat.slice(2), 'nine digits'), field('VIES boundary', 'offline only', 'active VAT status requires official lookup'));
    } else if (tool.kind === 'eori' || tool.kind === 'customs') {
      const eori = (upper.match(/DE[0-9A-Z]{7,17}/) || [''])[0];
      ok = !!eori;
      normalized = eori || raw;
      result.breakdown.push(field('country prefix', eori.slice(0, 2), 'DE customs prefix'), field('identifier body', eori.slice(2), 'customs payload evidence'), field('official boundary', 'Zoll/EORI lookup', 'status is not proven locally'));
    } else if (tool.kind === 'iban') {
      const iban = upper.replace(/\s+/g, '');
      ok = /^DE\d{20}$/.test(iban) && mod97(ibanToDigits(iban)) === 1;
      normalized = iban.replace(/(.{4})/g, '$1 ').trim();
      result.breakdown.push(field('country', iban.slice(0, 2), 'DE expected'), field('check digits', iban.slice(2, 4), 'ISO 13616 MOD-97'), field('BLZ bank code', iban.slice(4, 12), 'German bank routing segment'), field('account', iban.slice(12), 'ten-digit account segment'));
    } else if (tool.kind === 'blz') {
      ok = /\b\d{8}\b/.test(raw);
      normalized = ev.blz || ds.slice(0, 8);
      result.breakdown.push(field('BLZ', normalized, 'eight-digit Bankleitzahl'), field('bank-directory boundary', 'offline only', 'institution name needs official directory'), field('account evidence', ds.slice(8) || 'not provided', 'optional local account context'));
    } else if (tool.kind === 'bic') {
      const bic = upper.replace(/\s+/g, '');
      ok = /^[A-Z]{4}DE[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic);
      normalized = bic;
      result.breakdown.push(field('institution', bic.slice(0,4), 'bank code'), field('country', bic.slice(4,6), 'DE expected'), field('location', bic.slice(6,8), 'routing location'), field('branch', bic.slice(8) || 'primary', 'optional branch'));
    } else if (tool.kind === 'phone') {
      const phone = ev.phone.replace(/[ ()\/-]/g, '');
      ok = /^(\+49|0)\d{5,14}$/.test(phone);
      normalized = phone.startsWith('0') ? '+49' + phone.slice(1) : phone;
      result.breakdown.push(field('country code', '+49', 'German E.164 prefix'), field('national significant', normalized.replace('+49',''), 'subscriber evidence'), field('type hint', /^\+491[5-7]/.test(normalized) ? 'mobile-like' : 'geographic/service-like', 'offline range hint'));
    } else if (tool.kind === 'postal') {
      ok = !!ev.postal;
      normalized = ev.postal || raw;
      result.breakdown.push(field('postal code', ev.postal || 'missing', 'five digits'), field('locality evidence', raw.replace(ev.postal, '').trim(), 'not official delivery proof'), field('country', 'DE', 'German postal context'));
    } else if (tool.kind === 'state') {
      const code = Object.keys(STATES).find(k => new RegExp('\b' + k + '\b', 'i').test(raw)) || '';
      ok = !!code || /Berlin|Bayern|Hamburg|Sachsen|Hessen|Bremen/i.test(raw);
      normalized = code ? code + ' ' + STATES[code] : raw;
      result.breakdown.push(field('state code', code || 'not detected', 'two-letter Bundesland code'), field('state name', code ? STATES[code] : raw, 'regional context'), field('routing scope', 'local evidence', 'official statistics lookup remains external'));
    } else if (tool.kind === 'municipality') {
      ok = /\b\d{8}\b/.test(raw);
      normalized = ev.blz || ds.slice(0, 8) || raw;
      result.breakdown.push(field('AGS-like code', normalized, 'eight digits'), field('state prefix', normalized.slice(0, 2), 'first AGS block'), field('municipality lookup', 'offline only', 'official municipality name requires source data'));
    } else if (tool.kind === 'date') {
      ok = !!ev.date;
      normalized = ev.date ? ev.date.replace(/(\d{1,2})\.(\d{1,2})\.(\d{4})/, (_, d, m, y) => y + '-' + m.padStart(2,'0') + '-' + d.padStart(2,'0')) : raw;
      result.breakdown.push(field('day.month.year', ev.date || 'missing', 'German display date'), field('ISO date', normalized, 'developer storage shape'), field('timezone hint', 'Europe/Berlin', 'CET/CEST context'));
    } else if (tool.kind === 'amount') {
      const value = ev.amount ? Number(ev.amount.replace(/[. '\u00a0]/g, '').replace(',', '.')) : NaN;
      ok = !!ev.amount;
      normalized = Number.isFinite(value) ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value) : raw;
      result.breakdown.push(field('display amount', ev.amount || 'missing', 'German comma decimal'), field('cents', Number.isFinite(value) ? String(Math.round(value * 100)) : 'missing', 'integer minor units'), field('currency', /EUR|€/.test(upper) ? 'EUR' : 'not explicit', 'Euro expected'));
    } else if (tool.kind === 'plate') {
      const plate = upper.replace(/[^A-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
      ok = /^[A-ZÄÖÜ]{1,3} [A-Z]{1,2} [0-9]{1,4}$/.test(plate);
      normalized = plate;
      result.breakdown.push(field('region prefix', plate.split(' ')[0], 'registration district hint'), field('serial letters', plate.split(' ')[1], 'fleet-safe serial'), field('digits', plate.split(' ')[2], 'vehicle plate serial'));
    } else if (tool.kind === 'vin') {
      const vin = upper.replace(/[^A-Z0-9]/g, '');
      ok = /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
      normalized = vin;
      result.breakdown.push(field('WMI', vin.slice(0,3), 'manufacturer identifier'), field('VDS', vin.slice(3,9), 'vehicle descriptor'), field('VIS', vin.slice(9), 'vehicle indicator'));
    } else if (tool.kind === 'document') {
      ok = /[A-Z][0-9A-Z]{5,}/i.test(raw) || /Ausweis|Passport|Reisepass|Fuehrerschein|Aufenthalt/i.test(raw);
      normalized = raw.replace(/\s+/g, ' ').trim();
      result.breakdown.push(field('document evidence', ok ? 'detected' : 'missing', 'German document-shaped local evidence'), field('alphanumeric serial', (upper.match(/[A-Z][0-9A-Z]{5,}/) || [''])[0] || 'none', 'serial or issue evidence'), field('scope', 'offline only', 'identity proof remains outside the browser'));
    } else if (tool.kind === 'privacy') {
      ok = !!(ev.taxid || ev.iban || ev.phone || ev.postal || /[A-Z][a-z]+ [A-Z][a-z]+/.test(raw));
      normalized = mask(raw);
      result.breakdown.push(field('IdNr evidence', ev.taxid ? 'detected' : 'not detected', 'sensitive tax identifier'), field('IBAN evidence', ev.iban || 'not detected', 'banking data'), field('phone/postal evidence', [ev.phone, ev.postal].filter(Boolean).join(' / ') || 'not detected', 'contact/address context'), field('masked preview', normalized, 'safe for logs'));
    } else if (tool.kind === 'einvoice' || tool.kind === 'invoice' || tool.kind === 'taxdoc' || tool.kind === 'accounting' || tool.kind === 'payroll' || tool.kind === 'payment') {
      ok = !!(ev.vat || ev.iban || ev.amount || ev.date || /rechnung|invoice|USt|DATEV|GoBD|SEPA|Mandate|Mandat|Konto|Lohnsteuer|XRechnung|ZUGFeRD/i.test(raw));
      normalized = raw.replace(/\s+/g, ' ').trim();
      result.breakdown.push(field('identifier evidence', ev.vat || ev.taxid || 'not detected', 'tax/company field'), field('payment evidence', ev.iban || ev.blz || 'not detected', 'bank or routing field'), field('amount/date evidence', [ev.amount, ev.date].filter(Boolean).join(' / ') || 'not detected', 'accounting field'), field('workflow scope', tool.kind, 'offline readiness context'));
    } else {
      ok = !!(ev.vat || ev.iban || ev.postal || ev.amount || ev.date || raw.length > 8);
      normalized = raw.replace(/ß/g, 'ss').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
      result.breakdown.push(field('VAT evidence', ev.vat || 'not detected', 'company/tax field'), field('IBAN evidence', ev.iban || 'not detected', 'banking field'), field('postal/date/amount evidence', [ev.postal, ev.date, ev.amount].filter(Boolean).join(' / ') || 'not detected', 'locale slices'), field('normalized preview', normalized, 'developer-safe preview'));
    }
    result.status = ok ? 'success' : 'review';
    result.headline = ok ? tool.code + ': ' + localizedPhrase('success') : tool.code + ': ' + localizedPhrase('review');
    result.detail = ok ? 'German browser-only evidence is structurally coherent.' : 'Add German local evidence or use the valid sample.';
    result.primary = normalized || raw || 'empty';
    result.normalized = normalized || raw;
    result.fields = [field('normalized', result.normalized, localizedPhrase('normalized')), field('masked', mask(result.normalized), 'log-safe preview'), field('tool', tool.name, tool.category), field('official boundary', 'offline only', localizedPhrase('official'))];
    result.checks = [check('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'), check('German evidence', ok, 'German structure evidence detected.', 'German local structure is missing or inconsistent.'), check('No network', true, 'No upload or registry call is made.'), check('Official boundary', true, localizedPhrase('official'))];
    result.suggestions = ok ? ['Copy normalized value for fixtures.', 'Use official systems for regulated status.'] : ['Load a valid sample.', 'Check country prefix, digit length, separator style, or local evidence.'];
    result.developerJson = { suite: 'germany-suite', tool: tool.id, locale: locale(), status: result.status, normalized: result.normalized, masked: mask(result.normalized), checks: result.checks, fields: result.fields, boundary: localizedPhrase('official'), breakdown: result.breakdown };
    return result;
  }
  function mount() {
    const factory = window.ValidoHubCountrySuiteFactory;
    if (!factory) return false;
    const suite = factory.createSuite({
      suiteId: 'germany-suite',
      country: { slug: 'germany', name: 'Germany' },
      theme: { accent: '#111827', accent2: '#dc2626', accent3: '#fbbf24' },
      i18n: suiteI18n(),
      tools: TOOLS,
      analyze
    });
    suite.mount(document.querySelector('[data-algorithm-id="' + ALGORITHM_ID + '"]') || document.querySelector('.browser-workbench'));
    window.ValidoHubGermanySuite = suite;
    return true;
  }
  function init() { if (mount()) return; setTimeout(init, 20); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
