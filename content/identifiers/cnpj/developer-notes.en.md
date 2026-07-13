# Developer Guidelines

When implementing CNPJ validation:
- CNPJ is formatted as: `00.000.000/0001-00`. Separators must be filtered before calculation.
- Digits length must be exactly 14.
- Regex: `/^\d{14}$/`.
- Like CPF, reject trivial sequential values (e.g. `00.000.000/0000-00`, `11.111.111/1111-11`), which are invalid.
