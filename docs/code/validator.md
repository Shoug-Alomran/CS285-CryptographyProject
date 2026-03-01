# Validator.java

<div class="purpose-note"><strong>Purpose:</strong> Centralize mathematical and input validation rules required by the key-exchange flow.</div>

```java
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
