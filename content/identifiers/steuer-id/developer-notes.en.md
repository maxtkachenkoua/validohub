# Developer Guidelines

When implementing Steuer-ID validation:
- Input must be exactly 11 numeric digits.
- The first digit must not be `0`.
- Regex: `/^[1-9]\d{10}$/`.
- Validate the digit repetition rule: Out of the first 10 digits, exactly one digit must repeat either 2 or 3 times. The remaining digits must appear only once.
- Apply the ISO 7064 MOD 11-10 check algorithm.
