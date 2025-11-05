```java
import java.math.BigInteger;

// Minimal Validator
public class Validator {

    // true if q is a prime number ≥ 3
    public static boolean isPrime(BigInteger q) {
        if (q == null)
            return false;
        if (q.compareTo(BigInteger.valueOf(3)) < 0)
            return false; // reject < 3
        return q.isProbablePrime(100); // Miller–Rabin (built into BigInteger)
    }

    // true if 1 < alpha < q
    public static boolean isAlphaInRange(BigInteger alpha, BigInteger q) {
        return alpha != null && q != null
                && alpha.compareTo(BigInteger.ONE) > 0
                && alpha.compareTo(q) < 0;
    }

    // true if message has more than 20 non-space characters
    public static boolean isValidMessage(String message) {
        return message != null && message.trim().length() > 20;
    }
}
