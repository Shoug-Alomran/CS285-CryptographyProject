# Introduction

The purpose of this project is to implement a **secure key exchange system** using the **Diffie–Hellman algorithm**.  
The algorithm allows two parties to establish a shared secret key through an insecure communication channel without directly sharing any confidential data.  
This shared key can then be used for **encryption and decryption**, ensuring that transmitted messages remain private.

---

## Background

In public-key cryptography, two keys are used — a **public key** and a **private key**.  
The public key can be openly shared, while the private key must remain secret.  
The Diffie–Hellman (DH) algorithm specifically enables two participants, often called *Alice* and *Bob*, to agree on a mutual secret value by exchanging public parameters.  
Even if an attacker intercepts these public parameters, they cannot compute the shared key because doing so would require solving the **discrete logarithm problem**, which is computationally infeasible for large prime numbers.

---

## Algorithm Overview

1. Choose a large **prime number \( q \)** and a **primitive root \( \alpha \)** such that \( 1 < \alpha < q \).  
2. Each user selects a **private key**:
   - User A chooses \( X_a \)
   - User B chooses \( X_b \)
3. Each user computes their **public key**:
   - \( Y_a = \alpha^{X_a} \bmod q \)
   - \( Y_b = \alpha^{X_b} \bmod q \)
4. Both users exchange their public keys.
5. Each user computes the **shared secret key**:
   - User A: \( K = Y_b^{X_a} \bmod q \)
   - User B: \( K = Y_a^{X_b} \bmod q \)
6. The result is the same for both: \( K_a = K_b \).

!!! note "Security Assumption"
    The confidentiality of the shared key relies on the difficulty of computing discrete logarithms — given \( \alpha^x \bmod q \), determining \( x \) is computationally infeasible for sufficiently large \( q \).

---

## Numerical Example

To illustrate, assume \( q = 23 \) and \( \alpha = 5 \).  
- User A selects a private key \( X_a = 6 \) and computes \( Y_a = 5^6 \bmod 23 = 8 \).  
- User B selects \( X_b = 15 \) and computes \( Y_b = 5^{15} \bmod 23 = 19 \).  
- Each then computes the shared key:  
  \( K = 19^6 \bmod 23 = 2 \) and \( K = 8^{15} \bmod 23 = 2 \).  

Thus, both users derive the same shared secret key \( K = 2 \).

!!! tip "Interpretation"
    Even if an attacker observes \( q = 23 \), \( \alpha = 5 \), \( Y_a = 8 \), and \( Y_b = 19 \), they cannot feasibly compute either private key due to the hardness of the discrete logarithm problem.