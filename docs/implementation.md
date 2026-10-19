---
title: Implementation
nav_title: Architecture
summary: Class responsibilities, workflow and run modes
icon: graph
description: Architecture of the CS285 Diffie–Hellman Java implementation. Seven classes, the five-stage workflow from parameters to decryption, and the numerical and live run modes.
kicker: Code · Architecture
hero: Seven classes, <span class="grad-text">one handshake.</span>
lead: The project is a transparent simulation of Diffie–Hellman key exchange in Java. Users supply parameters manually or generate them automatically, then verify key agreement through encryption and decryption output.
chips:
  - "Java · BigInteger"
  - "7 classes"
  - "3 menu options"
actions:
  - label: Start with Main.java
    href: ../code/main/
    icon: code
  - label: See the results
    href: ../results/
    icon: check
---

## Program structure

| Class | Responsibility |
| --- | --- |
| [`Main.java`](code/main.md) | Application entry point, menu flow, mode selection, and final result display. |
| [`Parameters.java`](code/parameters.md) | Stores the public parameters \( q \) and \( \alpha \). |
| [`KeyExchange.java`](code/keyexchange.md) | Computes public keys and shared secret values. |
| [`Encryptor.java`](code/encryptor.md) | Encrypts and decrypts messages using the shared secret. |
| [`Validator.java`](code/validator.md) | Validates prime checks, parameter ranges, and message constraints. |
| [`Helpers.java`](code/helpers.md) | Handles input prompts and validation loops. |
| [`Utils.java`](code/utils.md) | Provides support utilities such as random generation and formatting helpers. |

!!! note "Design principle"
    The code follows separation of concerns, so each class has a focused role.

## Workflow

<div class="steps" markdown>
<div class="step" markdown><div markdown>
#### Input
Collect \( q \) and \( \alpha \), typed in or generated automatically.
</div></div>
<div class="step" markdown><div markdown>
#### Keys
Each participant selects a private key and computes a public key.
</div></div>
<div class="step" markdown><div markdown>
#### Exchange
Public keys are exchanged and each side computes the shared secret.
</div></div>
<div class="step" markdown><div markdown>
#### Encryption
A plaintext message of more than 20 characters is encrypted.
</div></div>
<div class="step" markdown><div markdown>
#### Decryption
The ciphertext is decrypted to confirm correctness.
</div></div>
</div>

## User modes

| Mode | Purpose |
| --- | --- |
| **Numerical example** | Demonstrates the process with small educational values, either fixed (\( q = 23, \alpha = 5 \)) or auto-generated. |
| **Live mode** | Uses manual or auto-generated values for interactive testing. |

## Example console interaction

```text title="java Main"
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
