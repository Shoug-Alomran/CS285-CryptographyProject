# Utils.java

<div class="purpose-note"><strong>Purpose:</strong> Supply helper routines for random values, display formatting, and key-byte normalization.</div>

```java
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
