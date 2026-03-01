# Implementation

<div class="purpose-note"><strong>Purpose:</strong> Document class responsibilities, execution flow, and operating modes of the Java implementation.</div>

The project is implemented in **Java** as a transparent simulation of **Diffie-Hellman key exchange**. Users can supply parameters manually or generate them automatically, then verify key agreement through encryption and decryption output.

## Program Structure

| Class | Responsibility |
|---|---|
| `Main.java` | Application entry point, menu flow, mode selection, and final result display. |
| `Parameters.java` | Stores public parameters \( q \) and \( \alpha \). |
| `KeyExchange.java` | Computes public keys and shared secret values. |
| `Encryptor.java` | Encrypts and decrypts messages using the shared secret. |
| `Validator.java` | Validates prime checks, parameter ranges, and message constraints. |
| `Helpers.java` | Handles input prompts and validation loops. |
| `Utils.java` | Provides support utilities such as random generation and formatting helpers. |

!!! note "Design Principle"
    The code follows separation of concerns so each class has a focused role.

## Workflow Summary

1. **Input stage:** Collect \( q \) and \( \alpha \).
2. **Key stage:** Each participant selects a private key and computes a public key.
3. **Exchange stage:** Public keys are exchanged; each side computes a shared secret.
4. **Encryption stage:** A plaintext message (more than 20 characters) is encrypted.
5. **Decryption stage:** Ciphertext is decrypted to confirm correctness.

## User Modes

| Mode | Purpose |
|---|---|
| **Numerical Example** | Demonstrates the process with small educational values. |
| **Live Mode** | Uses manual or auto-generated values for interactive testing. |

## Example Console Interaction

```text
--- Royal Convoy - Secure Communication (Diffie-Hellman / ECDH Demo) ---
This program demonstrates how the control center and vehicles exchange keys securely.

MAIN MENU:
1) Numerical Example (Section 1.3 demo - fixed values)
2) Numerical Example (auto-generated values)
3) Live Mode (manual / auto parameters and private keys)
0) Exit
Choose an option: 3
...
Shared key = 7
Original Message  = Please let this project work.
Encrypted Message = Jhs7D0vPYnq0...
Decrypted Message = Please let this project work.
Decryption OK = true
```
