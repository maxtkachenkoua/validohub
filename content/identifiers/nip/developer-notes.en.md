# Developer Guidelines

When implementing NIP validation:
- Filter formatting dashes before calculations. NIP numbers are often displayed with separators: `123-456-78-90` or `123-45-67-819`.
- Confirm digit length is exactly 10.
- Regex: `/^\d{10}$/`.
- Handle the modulo 10 check: If `sum % 11 === 10`, the input is invalid.
