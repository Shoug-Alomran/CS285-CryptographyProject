---
title: Results and Test Cases
nav_title: Results
summary: Live mode, validation and the fixed example
icon: check
description: Test evidence for the CS285 Diffie–Hellman project. Live mode with manual input, rejection of an invalid α, and the fixed numerical example with q = 23 and α = 5.
kicker: Evaluation · Results
hero: 'Every run ends the same way: <span class="grad-text">the keys match.</span>'
lead: Representative outputs from the Diffie–Hellman system across live and numerical test scenarios, showing that parameter validation, key agreement and encryption/decryption all work.
chips:
  - "3 scenarios"
  - "Decryption OK = true"
  - "q = 23 · α = 5 · K = 2"
actions:
  - label: Try the lab
    href: ../#lab
    icon: play
  - label: Advantages & limitations
    href: ../advantages-limitations/
    icon: shield
---

## Live mode: manual example

![Live mode with manually entered parameters](img/live-mode-manual.png)

In manual live mode, users enter \( q \), \( \alpha \) and the message directly. The system validates each input before continuing.

After key generation and exchange, both participants derive the same shared key, then encrypt and decrypt the message successfully.

!!! note "Observation"
    Matching decrypted output confirms successful shared-key derivation and correct message flow.

## Live mode: invalid α

![Live mode rejecting an out-of-range alpha](img/live-mode-alpha-error.png)

This case verifies input validation. If a user provides \( \alpha \) outside the valid range \( 1 < \alpha < q \), the program rejects it and asks for a valid value.

!!! tip "Validation path"
    `Validator` and `Helpers` jointly enforce numeric and range constraints before any cryptographic computation.

## Numerical example (fixed values)

![Fixed numerical example output](img/numerical-example-fixed.png)

This test uses small values for transparent, step-by-step verification. The values match the console output above.

| Parameter | Value |
| --- | ---: |
| Prime number \( q \) | 23 |
| Primitive root \( \alpha \) | 5 |
| Private key \( X_a \) | 6 |
| Private key \( X_b \) | 15 |
| Public key \( Y_a \) | 8 |
| Public key \( Y_b \) | 19 |
| Shared key \( K \) | 2 |

!!! success "Result verification"
    Both participants compute the same shared key, \( K = 2 \), and the message decrypts back to the original text.

## DH vs ECDH comparison

![Venn diagram comparing DH and ECDH](img/venn-diagram.png)

This visual comparison places the project in broader context.

!!! note "Summary"
    DH and ECDH both establish shared secrets. ECDH typically provides comparable security with smaller keys and improved efficiency.
