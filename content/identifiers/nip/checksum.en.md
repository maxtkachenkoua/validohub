# Checksum Algorithm

The NIP checksum utilizes a weighted modulo 11 algorithm.

## Multipliers
The first 9 digits are multiplied by corresponding weight constants:

| Digit Position | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Weight** | 6 | 5 | 7 | 2 | 3 | 4 | 5 | 6 | 7 |

## Calculation
Sum the multiplication products:
\[S = \sum_{i=1}^{9} (d_i \times w_i)\]

The control checksum digit is computed as:
\[C = S \pmod{11}\]

Note: If \(C = 10\), the NIP is mathematically invalid and cannot be assigned.
