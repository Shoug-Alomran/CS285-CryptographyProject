---
title: Introduction
summary: The Diffie–Hellman model and a worked example
icon: sigma
description: How Diffie–Hellman key exchange works, the discrete logarithm assumption behind it, and a fully verified numerical example with q = 23 and α = 5.
kicker: Project · Introduction
hero: Exponents commute. <span class="grad-text">Logarithms don’t come easy.</span>
lead: Two participants can derive the same secret key over an insecure channel without ever sharing their private keys. The derived key is then used for encryption and decryption, demonstrating confidentiality in a simplified educational workflow.
chips:
  - "arithmetic mod a prime q"
  - "α a primitive root"
  - "discrete logarithm problem"
actions:
  - label: Try it in the lab
    href: ../#lab
    icon: play
  - label: See the implementation
    href: ../implementation/
    icon: code
---

## Background

In public-key cryptography, public values are shared while private values remain secret. Diffie–Hellman lets two participants, commonly Alice and Bob, agree on a mutual secret through exponentiation in modular arithmetic.

An observer can see the public parameters and both public keys. Deriving a private key from them requires solving the **discrete logarithm problem**, which is computationally hard for suitably large parameters.

## Algorithm overview

<div class="steps" markdown>
<div class="step" markdown><div markdown>
#### Choose public parameters
Select a prime \( q \) and a primitive root \( \alpha \), with \( 1 < \alpha < q \).
</div></div>
<div class="step" markdown><div markdown>
#### Pick private keys
Participant A chooses a private key \( X_a \) and participant B chooses \( X_b \). Neither is ever sent.
</div></div>
<div class="step" markdown><div markdown>
#### Compute public keys
A computes \( Y_a = \alpha^{X_a} \bmod q \) and B computes \( Y_b = \alpha^{X_b} \bmod q \).
</div></div>
<div class="step" markdown><div markdown>
#### Exchange public keys
\( Y_a \) and \( Y_b \) cross the insecure channel. An eavesdropper may read them.
</div></div>
<div class="step" markdown><div markdown>
#### Compute the shared secret
A computes \( K = Y_b^{X_a} \bmod q \) and B computes \( K = Y_a^{X_b} \bmod q \). Both obtain the same result, \( K_a = K_b \).
</div></div>
</div>

## Why both keys agree

Exponentiation in \( \mathbb{Z}_q \) respects the usual power rules, so each side reaches the same power of \( \alpha \) by a different route:

\[
K_a = Y_b^{X_a} \equiv \left(\alpha^{X_b}\right)^{X_a} \equiv \alpha^{X_a X_b} \equiv \left(\alpha^{X_a}\right)^{X_b} \equiv Y_a^{X_b} = K_b \pmod{q}
\]

!!! note "Security assumption"
    Given \( \alpha^x \bmod q \), recovering \( x \) is infeasible in practice for strong parameter sizes. This is the discrete logarithm problem.

## Numerical example

Using \( q = 23 \) and \( \alpha = 5 \):

| Step | Participant A | Participant B |
| --- | --- | --- |
| Private key | \( X_a = 6 \) | \( X_b = 15 \) |
| Public key | \( Y_a = 5^{6} \bmod 23 = 8 \) | \( Y_b = 5^{15} \bmod 23 = 19 \) |
| Shared key | \( K = 19^{6} \bmod 23 = 2 \) | \( K = 8^{15} \bmod 23 = 2 \) |

Both participants derive the same shared secret, \( K = 2 \).

!!! tip "Interpretation"
    The public values \( q, \alpha, Y_a, Y_b \) alone are not enough to feasibly recover the private keys under standard assumptions.
