# South America Premium Suite Spec

This spec covers the full-premium South America generation batch excluding Brazil, which already has its own accepted premium suite: Argentina (argentina), Bolivia (bolivia), Chile (chile), Colombia (colombia), Ecuador (ecuador), Guyana (guyana), Paraguay (paraguay), Peru (peru), Suriname (suriname), Uruguay (uruguay), Venezuela (venezuela).

## Contract

- Use Country Suite Factory V1 for every new runtime and keep Valido Engine untouched.
- South America tools must be locally useful, not generic Europe clones: do not ship IBAN or SEPA claims where the country uses domestic account rails, aliases, QR/mobile payments, tax-authority references, or invoice authorization keys instead.
- Each country receives a quality-driven broad suite of browser-only workbenches for identifiers, tax/company intake, invoices, domestic banking/payments, address/phone/locale, privacy/redaction, documents, vehicles/logistics, and developer QA.
- Every tool must expose success-first valid samples, explicit invalid/short/wrong-prefix/review samples, result cards, field breakdown, validation pipeline, quality notes, developer JSON, and official/live lookup boundaries.
- Every finished local tool should aim to beat the best public competitor for that workflow by adding richer local parsing, safe fixture generation, masked output, batch/history/API payloads, and debugger evidence.
- Runtime locales required for this batch: en, es, pt-BR, de, fr, pl, uk.

## Batch Countries

- Argentina: DNI, CUIT, IVA / CUIT, Factura electronica / CAE, CBU / CVU / Alias, Ley 25.326 / AAIP.\n- Bolivia: CI, NIT, IVA / NIT, factura electronica / CUF, QR Bolivia / bank transfer, personal-data protection.\n- Chile: RUN, RUT, IVA / RUT, DTE / folio tributario, CuentaRUT / bank transfer, Ley 19.628.\n- Colombia: Cedula de ciudadania, NIT, IVA / NIT, factura electronica / CUFE, PSE / bank transfer, Ley 1581 / SIC.\n- Ecuador: cedula, RUC, IVA / RUC, comprobante electronico / clave de acceso, bank transfer / DeUna, LOPDP.\n- Guyana: TIN / NIS, company registration number, VAT / TIN, VAT invoice, bank transfer / MMG, Data Protection Act.\n- Paraguay: Cedula, RUC, IVA / RUC, factura electronica / SIFEN, SIPAP / bank transfer, personal-data protection.\n- Peru: DNI, RUC, IGV / RUC, comprobante electronico / CPE, CCI / Yape / Plin, Ley de Proteccion de Datos Personales.\n- Suriname: ID number, company registry number, BTW / tax number, BTW invoice, bank transfer / SNEPS, personal-data protection.\n- Uruguay: Cedula de identidad, RUT, IVA / RUT, e-Factura / CFE, bank transfer / QR payment, Ley 18.331 / URCDP.\n- Venezuela: Cedula, RIF, IVA / RIF, factura fiscal, Pago Movil / bank transfer, personal-data protection.

## Acceptance

Run scoped country builds and premium audits per country during development, then full build only as the route-materialization/release gate.
