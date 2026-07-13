# Checksum Algorithm

The CPF checksum uses a sequential double modulo 11 algorithm.

## First Checksum Digit (Digit 10)
Multipliers are applied to the first 9 digits: `10, 9, 8, 7, 6, 5, 4, 3, 2`.
\[S_1 = \sum_{i=1}^{9} (d_i \times (11 - i))\]
\[R_1 = S_1 \pmod{11}\]
The control digit is computed as:
- If \(R_1 < 2\), then \(d_{10} = 0\)
- If \(R_1 \ge 2\), then \(d_{10} = 11 - R_1\)

## Second Checksum Digit (Digit 11)
Multipliers are applied to the first 10 digits: `11, 10, 9, 8, 7, 6, 5, 4, 3, 2`.
\[S_2 = \sum_{i=1}^{10} (d_i \times (12 - i))\]
\[R_2 = S_2 \pmod{11}\]
The control digit is computed as:
- If \(R_2 < 2\), then \(d_{11} = 0\)
- If \(R_2 \ge 2\), then \(d_{11} = 11 - R_2\)
