---
title:
  en: How PESEL validation works
order: 10
status: verified
---

### PESEL Structure
A PESEL number is an 11-digit identifier with format: `YYMMDDZZZGX`
- **YYMMDD:** Date of birth (with century offsets encoded in the month).
- **ZZZG:** Individual sequence number and gender.
- **G:** Gender digit (even/0 = female, odd = male).
- **X:** Checksum control digit.

### Century Offsets Table
To handle different birth centuries, the month digits are modified:
- **1800 – 1899:** Month + 80
- **1900 – 1999:** Month + 0
- **2000 – 2099:** Month + 20
- **2100 – 2199:** Month + 40
- **2200 – 2299:** Month + 60

### Checksum Verification Formula
The checksum control digit is verified using weighted multiplication:
$$\text{Sum} = (1\cdot d_1 + 3\cdot d_2 + 7\cdot d_3 + 9\cdot d_4 + 1\cdot d_5 + 3\cdot d_6 + 7\cdot d_7 + 9\cdot d_8 + 1\cdot d_9 + 3\cdot d_{10}) \pmod{10}$$
$$\text{Control Digit} = (10 - \text{Sum}) \pmod{10}$$
