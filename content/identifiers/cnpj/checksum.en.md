# Checksum Algorithm

The CNPJ checksum utilizes a sequential double modulo 11 calculation.

## First Checksum Digit (Digit 13)
Weights are applied to digits 1-12: `5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2`.
\[S_1 = \sum_{i=1}^{12} (d_i \times w_i)\]
\[R_1 = S_1 \pmod{11}\]
The control digit is computed as:
- If \(R_1 < 2\), then \(d_{13} = 0\)
- If \(R_1 \ge 2\), then \(d_{13} = 11 - R_1\)

## Second Checksum Digit (Digit 14)
Weights are applied to digits 1-13: `6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2`.
\[S_2 = \sum_{i=1}^{13} (d_i \times w'_i)\]
\[R_2 = S_2 \pmod{11}\]
The control digit is computed as:
- If \(R_2 < 2\), then \(d_{14} = 0\)
- If \(R_2 \ge 2\), then \(d_{14} = 11 - R_2\)
