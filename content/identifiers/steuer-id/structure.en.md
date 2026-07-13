# Steuer-ID Format Structure

Standard German Steuer-ID numbers consist of exactly 11 digits structured as:

```
[ S S S S S S S S S S ] [ C ]
```

| Field | Positions | Description |
| :--- | :---: | :--- |
| **SSSSSSSSSS** | 1–10 | Unique personal serial tax number. The first digit must not be `0`. One digit must repeat exactly two or three times (others must be unique). |
| **C** | 11 | Control checksum digit. |
