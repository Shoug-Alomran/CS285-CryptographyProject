import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Scanner;

public class Helpers {

    // 1. Prompt for a prime q (≥ 3). Re-prompts until valid.
    public static BigInteger promptPrime(Scanner input) {
        System.out.println("Step 1: Choose a large prime number q (e.g., 23 or 47).");
        while (true) {
            try {
                System.out.print("Enter a prime q (≥ 3): ");
                BigInteger q = new BigInteger(input.nextLine().trim());
                if (Validator.isPrime(q))
                    return q;
                System.out.println("That's not a prime number. Try again.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type a integer.\n");
            }
        }
    }

    // 2. Prompt for alpha with range check 1 < alpha < q. Re-prompts until valid.
    public static BigInteger promptAlpha(Scanner in, BigInteger q) {
        System.out.println("\nStep 2: Choose alpha (a number between 1 and q).");
        while (true) {
            try {
                System.out.print("Enter alpha (1 < alpha < q): ");
                BigInteger alpha = new BigInteger(in.nextLine().trim());
                if (Validator.isAlphaInRange(alpha, q))
                    return alpha;
                System.out.println("Alpha must be > 1 and < q. Try again.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    // 3. Prompt for private keys in the inclusive range [1 .. q−2]. Re-prompts
    // until valid.
    public static BigInteger promptPrivateKey(Scanner input, BigInteger q, String message) {
        System.out.println("\nPrivate keys must be integers between 1 and q-2 (inclusive).");
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO); // q-2
        while (true) {
            try {
                System.out.print(message);
                BigInteger privateKey = new BigInteger(input.nextLine().trim()); // Read input
                if (privateKey.compareTo(min) >= 0 && privateKey.compareTo(max) <= 0)
                    return privateKey;
                System.out.println("Invalid range. Please enter a value between 1 and q-2.\n");
            } catch (Exception e) {
                System.out.println("Invalid input. Please type an integer.\n");
            }
        }
    }

    // 4. Generate a random private key in [1 .. q−2].
    public static BigInteger randomPrivateKey(BigInteger q, SecureRandom randomNo) {
        BigInteger privateKey; // Placeholder for the generated key
        BigInteger min = BigInteger.ONE;
        BigInteger max = q.subtract(BigInteger.TWO); // q - 2

        while (true) {
            // Picks a random integer smaller than q
            privateKey = new BigInteger(q.toString()).abs(); // Generate random BigInteger (the abs() ensures
                                                             // non-negative)

            // If it's between 1 and q-2, we accept it
            if (privateKey.compareTo(min) >= 0 && privateKey.compareTo(max) <= 0) {
                return privateKey;
            }
            // Otherwise, try again
        }
    }

    // 5. Prompt for a message (> 20 characters). Re-prompts until valid.
    public static String promptMessage(Scanner input) {
        System.out.println("\nStep 3: Enter the message to be securely sent between vehicles.");
        while (true) {
            System.out.print("Enter a message (> 20 characters): ");
            String message = input.nextLine();
            if (Validator.isValidMessage(message))
                return message;
            System.out.println("Message too short. Please try again (must be > 20 characters).\n");
        }
    }
}