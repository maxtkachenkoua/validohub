# Domain Specific Language (DSL) Specification (V1.0)

Every identifier configuration uses a declarative YAML/JSON format. This DSL maps data formats, validation algorithms, and structural fields.

---

## 1. Schema Layout

```yaml
identifier:
  name: PESEL
  country: Poland
  length: 11
  
fields:
  - id: year
    positions: [1, 2]
    description: Last two digits of birth year
  - id: month
    positions: [3, 4]
    description: Month of birth with century offset
  - id: day
    positions: [5, 6]
    description: Day of birth
  - id: serial
    positions: [7, 10]
    description: Serial block and gender indicator
  - id: checksum
    positions: [11, 11]
    description: Checksum digit

checksum:
  algorithm: weighted-mod10
  weights: [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]

temporalEncoding:
  type: century-offset
  offsets:
    - range: [1800, 1899]
      offset: 80
    - range: [1900, 1999]
      offset: 0
    - range: [2000, 2099]
      offset: 20

decoder:
  supportsDate: true
  supportsGender: true
  genderPosition: 10
```
This declarative structure ensures the engine can infer field breakdowns, validate inputs, and compute checksum steps without custom code.
