# NIP Format Structure

The NIP consists of exactly 10 digits structured as:

```
[ O O O ] [ S S S S S S ] [ C ]
```

| Field | Positions | Description |
| :--- | :---: | :--- |
| **OOO** | 1–3 | Tax Office Code (identifying the specific tax office branch assigning the number). |
| **SSSSSS** | 4–9 | Unique taxpayer serial number. |
| **C** | 10 | Control checksum digit. |
