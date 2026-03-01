# Helpers.java

<div class="purpose-note"><strong>Purpose:</strong> Provide validated user-input utilities for parameters, keys, and messages.</div>

```java
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Scanner;

public class Helpers {

    public static BigInteger promptPrime(Scanner input) {
        while (true) {
            try {
                System.out.print("Enter a prime q (>= 3): ");
                BigInteger q = new BigInteger(input.nextLine().trim());
                if (Validator.isPrime(q)) return q;
                System.out.println("That's not a prime number. Try again.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    public static BigInteger promptAlpha(Scanner in, BigInteger q) {
        while (true) {
            try {
                System.out.print("Enter alpha (1 < alpha < q): ");
                BigInteger alpha = new BigInteger(in.nextLine().trim());
                if (Validator.isAlphaInRange(alpha, q)) return alpha;
                System.out.println("Alpha must be > 1 and < q. Try again.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    public static BigInteger promptPrivateKey(Scanner input, BigInteger q, String message) {
        System.out.println("\nPrivate keys must be integers between 1 and q-2 (inclusive).");
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO);
        while (true) {
            try {
                System.out.print(message);
                BigInteger x = new BigInteger(input.nextLine().trim());
                if (x.compareTo(min) >= 0 && x.compareTo(max) <= 0) return x;
                System.out.println("Invalid range. Please enter a value between 1 and q-2.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    public static BigInteger randomPrivateKey(BigInteger q, SecureRandom rnd) {
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO);
        BigInteger range = max.subtract(min).add(BigInteger.ONE);

        BigInteger r;
        do {
            r = new BigInteger(range.bitLength(), rnd);
        } while (r.compareTo(range) >= 0);
        return r.add(min);
    }

    public static String promptMessage(Scanner input) {
        while (true) {
            System.out.print("Enter a message (> 20 characters): ");
            String message = input.nextLine();
            if (Validator.isValidMessage(message)) return message;
            System.out.println("Message too short. Please try again (must be > 20 characters).\n");
        }
    }
}
```
