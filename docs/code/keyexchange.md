---
title: KeyExchange.java
nav_title: Key Exchange
summary: Key pairs and the shared secret
icon: key
description: KeyExchange class of the CS285 Diffie–Hellman key exchange project. Define key-pair generation and shared-secret computation for each participant.
kicker: Code · Key exchange
hero: KeyExchange<span class="grad-text">.java</span>
lead: Define key-pair generation and shared-secret computation for each participant.
chips:
  - "35 lines"
  - "extends Parameters"
  - "modPow"
actions:
  - label: Architecture overview
    href: ../../implementation/
    icon: graph
---

## Role in the system

<p class="lead-in">Each instance is one participant. It draws a private key in the range 1 to <code>q − 2</code> with <code>SecureRandom</code>, publishes <code>α^X mod q</code>, and raises the other side’s public key to its own private exponent.</p>

## Source

```java title="KeyExchange.java"
import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyExchange extends Parameters {

    private SecureRandom random = new SecureRandom();

    private BigInteger privateKey;
    private BigInteger publicKey;

    public KeyExchange(BigInteger q, BigInteger alpha) {
        super(q, alpha);
        generateKeys();
    }

    private void generateKeys() {
        this.privateKey = new BigInteger(getQ().bitLength(), random)
                .mod(getQ().subtract(BigInteger.TWO))
                .add(BigInteger.ONE);

        this.publicKey = getAlpha().modPow(privateKey, getQ());
    }

    public BigInteger computeSharedKey(BigInteger otherPublic) {
        return otherPublic.modPow(privateKey, getQ());
    }

    public BigInteger getPrivateKey() {
        return privateKey;
    }

    public BigInteger getPublicKey() {
        return publicKey;
    }
}
```
