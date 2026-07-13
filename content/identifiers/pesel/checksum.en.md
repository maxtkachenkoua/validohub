# Checksum Algorithm

The 11th digit is a checksum calculated using a weighted modulo 10 method defined by standard national registration standards.

## Weights
Each of the first 10 digits is multiplied by a corresponding weight multiplier in a repeating pattern:

| Digit Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Weight** | 1 | 3 | 7 | 9 | 1 | 3 | 7 | 9 | 1 | 3 |

## Calculation Formula

The sum is calculated as:
\[S = \sum_{i=1}^{10} (d_i \times w_i)\]

The control checksum digit \(C\) is then computed as:
\[C = (10 - (S \pmod{10})) \pmod{10}\]

This ensures that if the modulo division yields a remainder of 0, the final checksum matches 0.
