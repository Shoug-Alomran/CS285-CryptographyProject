# Results and Test Cases

<div class="purpose-note"><strong>Purpose:</strong> Present evidence that parameter validation, key agreement, and encryption/decryption flows work correctly.</div>

This section summarizes representative outputs from the implemented **Diffie-Hellman** system across live and numerical test scenarios.

## Live Mode: Manual Example

![Live Mode Manual](img/live-mode-manual.png)

In manual live mode, users enter \( q \), \( \alpha \), and the message directly. The system validates each input before continuing.

After key generation and exchange, both participants derive the same shared key, then encrypt and decrypt the message successfully.

!!! note "Observation"
    Matching decrypted output confirms successful shared-key derivation and correct message flow.

## Live Mode: Invalid Alpha Input

![Alpha Error](img/live-mode-alpha-error.png)

This case verifies input validation behavior. If a user provides \( \alpha \) outside the valid range \( 1 < \alpha < q \), the program rejects it and asks for a valid value.

!!! tip "Validation Path"
    `Validator` and `Helpers` jointly enforce numeric and range constraints before any cryptographic computation.

## Numerical Example (Fixed Values)

![Numerical Example Fixed](img/numerical-example-fixed.png)

This test uses small values for transparent, step-by-step verification.

| Parameter | Value |
|---|---:|
| Prime number (q) | 7 |
| Primitive root (alpha) | 6 |
| Private key \(X_a\) | 5 |
| Private key \(X_b\) | 3 |
| Shared key (K) | 1 |

!!! example "Result Verification"
    Both participants compute the same shared key, validating implementation correctness.

## DH vs ECDH Comparison

![Venn Diagram](img/venn-diagram.png)

This visual comparison places the project in broader context.

!!! note "Summary"
    DH and ECDH both establish shared secrets. ECDH typically provides comparable security with smaller keys and improved efficiency.
