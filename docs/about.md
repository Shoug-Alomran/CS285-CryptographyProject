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

## Advantages & Limitations (concise)
**Pros:** no pre-shared secret, forward secrecy (with fresh keys), strong math (discrete log).  
**Cons:** MitM without authentication, weak/recurring parameters reduce security, higher computational cost than symmetric crypto.

## Implementation Notes
- Language: **Java 17+**
- Modules: `Parameters`, `KeyExchange`, `Encryptor`, `Helpers`, `Validator`, `Main`
- Encryption demo: XOR stream derived from SHA-256(shared key) for simplicity
