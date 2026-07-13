# Mathematical Plugin System (V1.0)

To support multiple checksum algorithms without modifying core layouts, validation logic is abstracted into mathematical plugins.

---

## 1. Plugin Interface Definition

Every mathematical validator plugin must implement this interface:

```javascript
class ChecksumPlugin {
  /**
   * Computes the checksum control digit for an input.
   * @param {string} digits - String of digits to check.
   * @param {Array<number>} weights - Optional weight multipliers.
   * @returns {number} The calculated control digit.
   */
  calculate(digits, weights) { ... }
}
```

---

## 2. Supported Core Algorithms
1. **`weighted-mod10`:** Standard sum of digits multiplied by weights, then modulo 10 (e.g. PESEL, NIP).
2. **`weighted-mod11`:** Standard sum of digits multiplied by weights, then modulo 11 (e.g. REGON).
3. **`luhn`:** Luhn algorithm, doubling alternate digits (e.g. credit cards, IMEI).
4. **`double-mod11`:** Sequential modulo 11 checksum calculation where the first checksum is appended before calculating the second checksum (e.g. CPF, CNPJ).
5. **`iso-7064-mod11-10`:** ISO 7064 algorithm using modulo 11 and modulo 10 adjustments (e.g. Steuer-IdNr).
