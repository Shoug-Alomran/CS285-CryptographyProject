# About the Project

## Purpose
The Diffie–Hellman (DH) key exchange lets two parties **establish a shared secret over an insecure channel** using modular exponentiation. This key can then encrypt traffic (e.g., TLS, SSH).

## Algorithm (high-level)
1. Publicly agree on a large prime \( q \) and a primitive root \( \alpha \) (generator).
2. Each party chooses a private integer \( x \in [1, q-2] \).
3. Each computes its public value \( Y = \alpha^x \bmod q \) and exchanges it.
4. Each computes the shared secret \( k = Y_{\text{peer}}^{x} \bmod q \). Both values match.

!!! example "Royal convoy scenario (short)"
    Two cars and the control center agree on \( q \) and \( \alpha \), exchange public values, and arrive at
    the **same** secret key used to keep their messages private.

## Advantages & Limitations

| **Advantages** | **Limitations** |
|-----------------|----------------|
| **No Pre-shared Secret** — Allows secure key generation without needing a prior exchange or secret. | **Man-in-the-Middle Attacks** — Vulnerable without proper authentication mechanisms, since DH alone does not verify identities. |
| **Forward Secrecy** — Previous messages remain secure even if long-term private keys are compromised. | **Parameter Reuse** — Using weak or repeated prime numbers or generators reduces overall security. |
| **Mathematical Foundation** — Relies on the computational hardness of the discrete logarithm problem, which is infeasible to reverse for large primes. | **Computational Cost** — Slower than symmetric key algorithms, especially on low-end or embedded devices. |
| **Widely Adopted** — Forms the basis of many secure protocols (e.g., TLS, SSH, VPNs) and is straightforward to implement. | **No Authentication** — The original Diffie–Hellman protocol does not include identity verification between participants. |

!!! note "Summary"
    The Diffie–Hellman algorithm provides strong mathematical security and key independence but requires additional authentication mechanisms to protect against interception.

## Implementation Notes
- Language: **Java 17+**
- Modules: `Parameters`, `KeyExchange`, `Encryptor`, `Helpers`, `Validator`, `Main`
- Encryption demo: XOR stream derived from SHA-256(shared key) for simplicity
