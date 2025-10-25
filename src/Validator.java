import java.math.BigInteger;

public class Validator {
    // Is this number a prime? (only divisible by 1 and itself). Returns true if q
    // is a prime number ≥ 3
    public static boolean isPrime(BigInteger q) {
        if (q == null)
            return false;
        if (q.compareTo(BigInteger.valueOf(3)) < 0)
            return false; // Reject values < 3. (2 is prime but too small for DH).
        return q.isProbablePrime(100); // Uses Miller–Rabin test, it's a built-in method in Java’s BigInteger class.
    }

    // Is alpha between 1 and q? Returns true if 1 < alpha < q
    public static boolean isAlphaInRange(BigInteger alpha, BigInteger q) {
        if (alpha == null || q == null)
            return false;
        return alpha.compareTo(BigInteger.ONE) > 0 && alpha.compareTo(q) < 0; // This ensures alpha is in the valid
                                                                              // range for use as a number in
                                                                              // Diffie–Hellman.
    }

    // Check if alpha is a good number for Diffie-Hellman.
    public static boolean isPrimitiveRoot(BigInteger alpha, BigInteger q) {
        // Checks if alpha is between 1 and q, and q is prime
        if (!isAlphaInRange(alpha, q) || !isPrime(q))
            return false;

        // maxPossibleValues (n) = q - 1 (total number of possible values).
        BigInteger maxPossibleValues = q.subtract(BigInteger.ONE);

        // alpha^n must equal 1 mod q <-- formula
        if (!alpha.modPow(maxPossibleValues, q).equals(BigInteger.ONE)) { // modPow is like alpha ^exponent (n) mod q
                                                                          // combined and more efficient.
            return false;
        }

        // Test some small numbers that might divide (n).
        BigInteger[] smallNumbers = {
                BigInteger.valueOf(2),
                BigInteger.valueOf(3),
                BigInteger.valueOf(5),
                BigInteger.valueOf(7),
                BigInteger.valueOf(11),
                BigInteger.valueOf(13),
                BigInteger.valueOf(17),
                BigInteger.valueOf(19),
                BigInteger.valueOf(23),
                BigInteger.valueOf(29)
        };

        // Check each small number
        for (BigInteger divisor : smallNumbers) {
            // If (q-1) can be divided by this small number...
            if (maxPossibleValues.mod(divisor).equals(BigInteger.ZERO)) {
                // Calculate: (q-1) divided by the small number
                BigInteger exponent = maxPossibleValues.divide(divisor); // Tests if alpha gets stuck repeating
                                                                         // patterns.
                // If alpha^exponent = 1, then alpha is NOT a good number.
                if (alpha.modPow(exponent, q).equals(BigInteger.ONE)) {
                    return false; // Failed - not good enough as it stops too early.
                }
            }
        }
        // Passed all tests - alpha is good to use!
        return true;
    }

    // Returns true if message has more than 20 non-space characters.
    public static boolean isValidMessage(String message) {
        return message != null && message.trim().length() > 20;
    }

    // Throws error if the condition is false
    public static void isNotValidMessage(boolean condition, String messageIfFail) {
        if (!condition)
            throw new IllegalArgumentException(messageIfFail);
    }
}