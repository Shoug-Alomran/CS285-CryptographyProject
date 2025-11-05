```bash
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Scanner;

public class Helpers {

    // 1) Prompt for a prime q (≥ 3). Re-prompts until valid.
    public static BigInteger promptPrime(Scanner input) {
        while (true) {
            try {
                System.out.print("Enter a prime q (≥ 3): ");
                BigInteger q = new BigInteger(input.nextLine().trim());
                if (Validator.isPrime(q)) return q;
                System.out.println("That's not a prime number. Try again.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    // 2) Prompt for alpha with range check 1 < alpha < q. Re-prompts until valid.
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

    // 3) Prompt for private keys in the inclusive range [1 .. q−2]. Re-prompts until valid.
    public static BigInteger promptPrivateKey(Scanner input, BigInteger q, String message) {
        System.out.println("\nPrivate keys must be integers between 1 and q-2 (inclusive).");
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO); // q-2
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

    // 4) Generate a random private key uniformly in [1 .. q−2].
    public static BigInteger randomPrivateKey(BigInteger q, SecureRandom rnd) {
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO);               // q - 2
        BigInteger range = max.subtract(min).add(BigInteger.ONE);  // (q-2) - 1 + 1 = q-2

        BigInteger r;
        do {
            // sample enough bits; reject if >= range to avoid bias, then shift by +min
            r = new BigInteger(range.bitLength(), rnd);
        } while (r.compareTo(range) >= 0);
        return r.add(min);
    }

    // 5) Prompt for a message (> 20 characters). Re-prompts until valid.
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