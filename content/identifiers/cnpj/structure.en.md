# CNPJ Format Structure

Standard CNPJ numbers consist of exactly 14 digits structured as:

```
[ R R R R R R R R ] [ B B B B ] [ C C ]
```

| Field | Positions | Description |
| :--- | :---: | :--- |
| **RRRRRRRR** | 1–8 | Business registration number. |
| **BBBB** | 9–12 | Branch identifier (headquarters is usually `0001`). |
| **CC** | 13–14 | Double control checksum digits. |
