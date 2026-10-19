---
title: Utils.java
nav_title: Utils
summary: Random values and formatting helpers
icon: sparkle
description: Utils class of the CS285 Diffie–Hellman key exchange project. Supply helper routines for random values, display formatting and key-byte normalization.
kicker: Code · Utilities
hero: Utils<span class="grad-text">.java</span>
lead: Supply helper routines for random values, display formatting and key-byte normalization.
chips:
  - "29 lines"
  - "isolated vertex"
  - "SecureRandom"
actions:
  - label: Architecture overview
    href: ../../implementation/
    icon: graph
---

## Role in the system

<p class="lead-in">Support routines: a uniform random <code>BigInteger</code> below a limit, a label printer and a helper that strips the sign byte from a key’s byte array.</p>

## Source

```java title="Utils.java"
import java.math.BigInteger;
import java.security.SecureRandom;

public class Utils {

    private static final SecureRandom secureRandom = new SecureRandom();

    public static BigInteger getRandom(BigInteger upperLimit) {
        BigInteger result;
        do {
            result = new BigInteger(upperLimit.bitLength(), secureRandom);
        } while (result.compareTo(BigInteger.ONE) < 0 || result.compareTo(upperLimit) >= 0);
        return result;
    }

    public static void printLine(String label, Object value) {
        System.out.println(label + ": " + value);
    }

    public static byte[] normalizeKeyBytes(BigInteger key) {
        byte[] bytes = key.toByteArray();
        if (bytes.length > 1 && bytes[0] == 0) {
            byte[] normalized = new byte[bytes.length - 1];
            System.arraycopy(bytes, 1, normalized, 0, normalized.length);
            return normalized;
        }
        return bytes;
    }
}
```
