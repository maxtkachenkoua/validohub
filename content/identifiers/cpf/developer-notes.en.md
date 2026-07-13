# Developer Guidelines

When implementing CPF validation:
- CPF is often written with formatting: `000.000.000-00`. Separators must be filtered.
- Check sum calculations sequentially: Calculate the 10th digit first, then use it to compute the 11th digit.
- Reject trivial sequential numbers (e.g. `111.111.111-11`, `222.222.222-22`), as they are technically invalid under RFB rules but might pass basic checksum tests.
