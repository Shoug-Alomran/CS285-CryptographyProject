---
title: Advantages and Limitations
nav_title: Advantages & Limitations
summary: Strengths, constraints and DH vs ECDH
icon: shield
description: Strengths and practical limits of Diffie–Hellman key exchange in the CS285 project, why it needs authentication against man-in-the-middle attacks, and how it compares with ECDH.
kicker: Evaluation · Trade-offs
hero: A sound key exchange <span class="grad-text">still needs authentication.</span>
lead: Diffie–Hellman lets two parties agree on a shared secret over an insecure channel without transmitting private keys. It remains foundational, but secure deployment requires careful protocol design.
chips:
  - "4 advantages"
  - "4 limitations"
  - "DH vs ECDH"
actions:
  - label: Read the conclusion
    href: ../conclusion/
    icon: arrow-right
---

## Advantages

<div class="grid g-2" markdown>
<div class="card" markdown>
### No pre-shared secret required
Parties can establish a key without a prior secure channel.
</div>
<div class="card" markdown>
### Forward secrecy potential
Ephemeral DH sessions can help protect past traffic if long-term secrets are later compromised.
</div>
<div class="card" markdown>
### Strong mathematical basis
Security is linked to the hardness of the discrete logarithm problem for suitable groups.
</div>
<div class="card" markdown>
### Widespread protocol relevance
DH-based constructions are central to secure protocol history and modern variants.
</div>
</div>

!!! tip "Implementation context"
    Larger primes and session-specific values increase practical resistance to attack.

## Limitations

<div class="grid g-2" markdown>
<div class="card" markdown>
### No built-in authentication
Plain DH does not verify identities.
</div>
<div class="card" markdown>
### MitM exposure without authentication
Attackers can relay and replace public values if identity checks are absent.
</div>
<div class="card" markdown>
### Parameter quality matters
Weak or reused parameters can reduce security margins.
</div>
<div class="card" markdown>
### Computational overhead
Modular exponentiation is heavier than symmetric operations.
</div>
</div>

!!! warning "Security note"
    Production use should pair key exchange with authentication, for example certificates or signatures.

## DH and ECDH at a glance

| Aspect | DH | ECDH |
| --- | --- | --- |
| Mathematical basis | Modular exponentiation | Elliptic-curve point multiplication |
| Typical key size | Larger for equivalent strength | Smaller for equivalent strength |
| Performance | Moderate | Generally faster at comparable security |
| Common use today | Legacy and educational contexts | Modern protocol deployments |

## Final evaluation

This project demonstrates successful shared-key establishment, robust input validation, and consistent encryption/decryption behavior. At the same time, it correctly highlights why standalone DH must be extended with authentication in real-world systems.
