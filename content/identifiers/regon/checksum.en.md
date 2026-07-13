# Checksum Algorithm

The REGON checksum uses a weighted modulo 11 algorithm.

## Multipliers
The first 8 digits are multiplied by corresponding weight constants:

| Digit Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Weight** | 8 | 9 | 2 | 3 | 4 | 5 | 6 | 7 |

## Calculation
Sum the multiplication products:
\[S = \sum_{i=1}^{8} (d_i \times w_i)\]

The remainder is calculated as:
\[R = S \pmod{11}\]

The control checksum digit \(C\) is computed as:
- If \(R < 10\), then \(C = R\)
- If \(R = 10\), then \(C = 0\)
