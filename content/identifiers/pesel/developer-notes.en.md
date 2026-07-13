# Developer Implementation Guidelines

When integrating PESEL validation in backend systems, developers should follow these rules:

## Input Filtering and Regex
Before running checksum verification, validate the basic format constraints:
- Must consist of exactly 11 digits.
- Use basic regex to assert numerical integrity: `/^\d{11}$/`.

## Calendar Decoding
Do not decode the birth date assuming a 1900 century baseline. You must parse the month value `MM` to determine the century offset:
- **Months 01-12:** 1900-1999 (Offset +0)
- **Months 21-32:** 2000-2099 (Offset +20)
- **Months 41-52:** 2100-2199 (Offset +40)
- **Months 61-72:** 2200-2299 (Offset +60)
- **Months 81-92:** 1800-1899 (Offset +80)

Verify that the decoded year, month, and day form a valid calendar date (accounting for leap years in 2000 vs 1900).
