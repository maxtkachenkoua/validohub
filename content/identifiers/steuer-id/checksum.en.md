# Checksum Algorithm

The German Steuer-ID control digit uses the international standard ISO 7064 (MOD 11-10) checksum method.

## Algorithm Formula
Let \(d_1, \dots, d_{11}\) be the digits of the Steuer-ID.
Initialize a remainder term \(R = 10\).

For each digit \(i = 1\) to \(10\):
1. Add the digit to the remainder:
   \[S = (R + d_i) \pmod{10}\]
   If \(S = 0\), set \(S = 10\).
2. Compute the new remainder:
   \[R = (S \times 2) \pmod{11}\]

The final checksum control digit \(C\) is computed as:
\[C = (11 - R) \pmod{10}\]
This control value must match the 11th digit \(d_{11}\).
