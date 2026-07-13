# Developer Guidelines

When implementing REGON validation:
- Standard REGON numbers must be exactly 9 numeric digits.
- Regex: `/^\d{9}$/`.
- Handle modulo 10 checksum adjustment: If `sum % 11 === 10`, the control digit is `0`.
- Verify the first two digits represent a valid region code.
