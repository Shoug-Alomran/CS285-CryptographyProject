import java.math.BigInteger;

// Validates inputs for the Diffie–Hellman key exchange system
public class Validator {

    // Returns true if q is a prime number ≥ 3
    public static boolean isPrime(BigInteger q) {
        if (q == null)
            return false;
        if (q.compareTo(BigInteger.valueOf(3)) < 0)
            return false; // Reject values < 3. (2 is prime but too small for DH).
        return q.isProbablePrime(100); // Uses Miller–Rabin test, it's a built-in method in Java’s BigInteger class.
    }

    // Returns true if 1 < alpha < q
    public static boolean isAlphaInRange(BigInteger alpha, BigInteger q) {
        if (alpha == null || q == null)
            return false;
        return alpha.compareTo(BigInteger.ONE) > 0 && alpha.compareTo(q) < 0; // This ensures alpha is in the valid
                                                                              // range for use as a generator in
                                                                              // Diffie–Hellman.
    }

    // Returns true if message has more than 20 non-space characters
    public static boolean isValidMessage(String message) {
        return message != null && message.trim().length() > 20;
    }

    // Throws error if the condition is false
    public static void require(boolean condition, String messageIfFail) {
        if (!condition)
            throw new IllegalArgumentException(messageIfFail);
    }
}