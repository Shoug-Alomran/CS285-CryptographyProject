import java.math.BigInteger;
import java.security.SecureRandom;

public class Utils {
    // Create a static SecureRandom object for use across classes
    private static final SecureRandom secureRandom = new SecureRandom();

    // Method getRandom(upperLimit)
    // - Return random BigInteger in range [1, upperLimit - 1]
    public static BigInteger getRandom(BigInteger upperLimit) {
        BigInteger result;
        do {
            result = new BigInteger(upperLimit.bitLength(), secureRandom);
        } while (result.compareTo(BigInteger.ONE) < 0 || result.compareTo(upperLimit) >= 0);
        return result;
    }

    // Method printLine(label, value)
    // - Format console output for screenshots (e.g., "User A public key: 8")
    public static void printLine(String label, Object value) {
        System.out.println(label + ": " + value);
    }

    // Method normalizeKeyBytes(BigInteger key)
    // - Remove leading zero byte if present in key.toByteArray()
    public static byte[] normalizeKeyBytes(BigInteger key) {
        byte[] bytes = key.toByteArray();
        if (bytes.length > 1 && bytes[0] == 0) {
            byte[] normalized = new byte[bytes.length - 1];
            System.arraycopy(bytes, 1, normalized, 0, normalized.length);
            return normalized;
        }
        return bytes;
    }

    // Optional utility for visual separation in console

}