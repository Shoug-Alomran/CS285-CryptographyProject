---
title: Validator.java
nav_title: Validator
summary: Primality, range and message rules
icon: shield
description: Validator class of the CS285 Diffie–Hellman key exchange project. Centralize the mathematical and input validation rules required by the key-exchange flow.
kicker: Code · Validation
hero: Validator<span class="grad-text">.java</span>
lead: Centralize the mathematical and input validation rules required by the key-exchange flow.
chips:
  - "24 lines"
  - "isProbablePrime(100)"
  - "1 < α < q"
actions:
  - label: Architecture overview
    href: ../../implementation/
    icon: graph
---

## Role in the system

<p class="lead-in">Three pure functions. <code>isPrime</code> runs a probabilistic primality test, <code>isAlphaInRange</code> enforces <code>1 &lt; α &lt; q</code>, and <code>isValidMessage</code> requires more than 20 characters.</p>

## Source

```java title="Validator.java"
import java.math.BigInteger;

/**
 * Minimal Validator class for validating prime numbers, alpha values,
 * and message lengths used in the Diffie-Hellman key exchange system.
 */
public class Validator {

    public static boolean isPrime(BigInteger q) {
        if (q == null) return false;
        if (q.compareTo(BigInteger.valueOf(3)) < 0) return false;
        return q.isProbablePrime(100);
    }

    public static boolean isAlphaInRange(BigInteger alpha, BigInteger q) {
        return alpha != null && q != null
                && alpha.compareTo(BigInteger.ONE) > 0
                && alpha.compareTo(q) < 0;
    }

    public static boolean isValidMessage(String message) {
        return message != null && message.trim().length() > 20;
    }
}
```
