# Introduction

<div class="purpose-note"><strong>Purpose:</strong> Introduce the Diffie-Hellman model, core assumptions, and a verified numerical example.</div>

This project implements a **secure key exchange system** using the **Diffie-Hellman algorithm**. Two participants can derive the same secret key over an insecure channel without directly sharing private keys.

The derived key is then used for encryption and decryption, demonstrating confidentiality in a simplified educational workflow.

## Background

In public-key cryptography, public values are shared while private values remain secret. Diffie-Hellman enables participants (commonly Alice and Bob) to agree on a mutual secret through exponentiation in modular arithmetic.

An observer can see the public parameters and public keys, but deriving the private keys is computationally hard because it requires solving the **discrete logarithm problem** for suitably large parameters.

## Algorithm Overview

1. Select a prime number \( q \) and a primitive root \( \alpha \), with \( 1 < \alpha < q \).
2. Participant A chooses private key \( X_a \), and participant B chooses private key \( X_b \).
3. Compute public keys:
   - \( Y_a = \alpha^{X_a} \bmod q \)
   - \( Y_b = \alpha^{X_b} \bmod q \)
4. Exchange public keys.
5. Compute shared secret on both sides:
   - A computes \( K = Y_b^{X_a} \bmod q \)
   - B computes \( K = Y_a^{X_b} \bmod q \)
6. Both obtain the same result: \( K_a = K_b \).

!!! note "Security Assumption"
    Given \( \alpha^x \bmod q \), recovering \( x \) is infeasible in practice for strong parameter sizes.

## Numerical Example

Using \( q = 23 \) and \( \alpha = 5 \):

- A chooses \( X_a = 6 \), so \( Y_a = 5^6 \bmod 23 = 8 \).
- B chooses \( X_b = 15 \), so \( Y_b = 5^{15} \bmod 23 = 19 \).
- Shared key from each side:
  - \( K = 19^6 \bmod 23 = 2 \)
  - \( K = 8^{15} \bmod 23 = 2 \)

Both participants derive the same shared secret: \( K = 2 \).

!!! tip "Interpretation"
    Public values alone (\( q, \alpha, Y_a, Y_b \)) are not enough to feasibly recover private keys under standard assumptions.
