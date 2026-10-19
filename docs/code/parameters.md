---
title: Parameters.java
nav_title: Parameters
summary: The public values q and α
icon: hash
description: Parameters class of the CS285 Diffie–Hellman key exchange project. Store and expose the public Diffie–Hellman parameters used by all participants.
kicker: Code · Public parameters
hero: Parameters<span class="grad-text">.java</span>
lead: Store and expose the public Diffie–Hellman parameters used by all participants.
chips:
  - "27 lines"
  - "q · α"
  - "superclass of KeyExchange"
actions:
  - label: Architecture overview
    href: ../../implementation/
    icon: graph
---

## Role in the system

<p class="lead-in">A small value class for the two public parameters. <code>KeyExchange</code> extends it, and <code>Main</code> uses its <code>toString()</code> to print them.</p>

## Source

```java title="Parameters.java"
import java.math.BigInteger;

public class Parameters {

    private BigInteger q;
    private BigInteger alpha;

    public Parameters(BigInteger q, BigInteger alpha) {
        this.q = q;
        this.alpha = alpha;
    }

    public BigInteger getQ() {
        return q;
    }

    public BigInteger getAlpha() {
        return alpha;
    }

    @Override
    public String toString() {
        return "Public Parameters:\n" +
               "Prime number (q): " + q + "\n" +
               "Primitive root (alpha): " + alpha;
    }
}
```
