---
title:
  en: PESEL developer examples
order: 50
status: verified
---

### JavaScript Implementation
```javascript
function validatePESEL(pesel) {
  if (!/^\d{11}$/.test(pesel)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(pesel[i]) * weights[i];
  }
  const checksum = (10 - (sum % 10)) % 10;
  return checksum === parseInt(pesel[10]);
}
```

### Python Implementation
```python
def validate_pesel(pesel: str) -> bool:
    if not pesel.isdigit() or len(pesel) != 11:
        return False
    weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
    digits = [int(d) for d in pesel]
    sum_val = sum(d * w for d, w in zip(digits[:10], weights))
    checksum = (10 - (sum_val % 10)) % 10
    return checksum == digits[10]
```

### Java Implementation
```java
public class PeselValidator {
    public static boolean validate(String pesel) {
        if (pesel == null || !pesel.matches("\\d{11}")) {
            return false;
        }
        int[] weights = {1, 3, 7, 9, 1, 3, 7, 9, 1, 3};
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(pesel.charAt(i)) * weights[i];
        }
        int checksum = (10 - (sum % 10)) % 10;
        return checksum == Character.getNumericValue(pesel.charAt(10));
    }
}
```
