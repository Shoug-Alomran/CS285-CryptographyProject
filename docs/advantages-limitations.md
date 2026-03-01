# Advantages and Limitations

<div class="purpose-note"><strong>Purpose:</strong> Evaluate the strengths and practical constraints of Diffie-Hellman within this course implementation context.</div>

**Diffie-Hellman (DH)** enables two parties to agree on a shared secret over an insecure channel without transmitting private keys directly. It remains foundational, but secure deployment requires careful protocol design.

## Advantages

1. **No pre-shared secret required**  
   Parties can establish a key without a prior secure channel.
2. **Forward secrecy potential**  
   Ephemeral DH sessions can help protect past traffic if long-term secrets are later compromised.
3. **Strong mathematical basis**  
   Security is linked to the hardness of the discrete logarithm problem for suitable groups.
4. **Widespread protocol relevance**  
   DH-based constructions are central to secure protocol history and modern variants.

!!! tip "Implementation Context"
    Larger primes and session-specific values increase practical resistance to attack.

## Limitations

1. **No built-in authentication**  
   Plain DH does not verify identities.
2. **MitM exposure without authentication**  
   Attackers can relay and replace public values if identity checks are absent.
3. **Parameter quality matters**  
   Weak or reused parameters can reduce security margins.
4. **Computational overhead**  
   Modular exponentiation is heavier than symmetric operations.

!!! warning "Security Note"
    Production use should pair key exchange with authentication (for example certificates or signatures).

## DH and ECDH at a Glance

| Aspect | DH | ECDH |
|---|---|---|
| Mathematical basis | Modular exponentiation | Elliptic-curve point multiplication |
| Typical key size | Larger for equivalent strength | Smaller for equivalent strength |
| Performance | Moderate | Generally faster at comparable security |
| Common use today | Legacy and educational contexts | Modern protocol deployments |

## Final Evaluation

This project demonstrates successful shared-key establishment, robust input validation, and consistent encryption/decryption behavior. At the same time, it correctly highlights why standalone DH must be extended with authentication in real-world systems.
