# CPF Format Structure

Standard CPF numbers consist of exactly 11 digits structured as:

```
[ S S S S S S S S ] [ R ] [ C C ]
```

| Field | Positions | Description |
| :--- | :---: | :--- |
| **SSSSSSSS** | 1–8 | Unique taxpayer registration serial. |
| **R** | 9 | Fiscal region digit (defining state of registration, e.g. 1 for DF/GO, 8 for SP). |
| **CC** | 10–11 | Double control checksum digits. |
