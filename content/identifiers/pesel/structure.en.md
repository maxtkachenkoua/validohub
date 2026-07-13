# PESEL Digit Structure

The PESEL is always exactly 11 numeric digits long and is structured into five distinct fields:

```
[ Y Y ] [ M M ] [ D D ] [ S S S G ] [ C ]
```

| Fields | Positions | Meaning |
| :--- | :--- | :--- |
| **YY** | 1–2 | Year of birth (last two digits). |
| **MM** | 3–4 | Month of birth (modified by century offsets). |
| **DD** | 5–6 | Day of birth. |
| **SSSG** | 7–10 | Serial number and Gender indicator. The last digit of this serial (digit 10) encodes gender (even = female, odd = male). |
| **C** | 11 | Checksum control digit. |
