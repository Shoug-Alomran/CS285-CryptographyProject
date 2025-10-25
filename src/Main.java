import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        BigInteger q = null;
        BigInteger alpha = null;
        String message = null;

        System.out.println("=== Diffie–Hellman Key Exchange Demo ===");

        // Input and validate q (prime)
        while (true) { // This loop continues until a valid q is entered.
            try {
                System.out.print("Enter a prime number q (≥ 3): ");
                q = new BigInteger(input.nextLine());
                if (Validator.isPrime(q)) {
                    System.out.println("Valid prime q accepted.");
                    break;
                } else {
                    System.out.println("Not a valid prime number. Try again.");
                }
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a number.");
            }
        }

        // Input and validate alpha (must be 1 < alpha < q)
        while (true) { // This loop continues until a valid alpha is entered.
            try {
                System.out.print("Enter a generator alpha (must be >1 and <q): ");
                alpha = new BigInteger(input.nextLine());
                if (Validator.isAlphaInRange(alpha, q)) {
                    System.out.println("Valid alpha accepted.");
                    break;
                } else {
                    System.out.println("Alpha must be between 1 and q. Try again.");
                }
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a number.");
            }
        }

        // Input and validate message (> 20 characters)
        while (true) { // This loop continues until a valid message is entered.
            System.out.print("Enter your message (> 20 characters): ");
            message = input.nextLine();
            if (Validator.isValidMessage(message)) {
                System.out.println("Message accepted.");
                break;
            } else {
                System.out.println("Message too short. Please try again.");
            }
        }

        System.out.println("\nAll inputs are valid. You may now proceed to key generation and encryption.");
        // Future steps:
        // - KeyExchange: generate keys
        // - Encryptor: encrypt & decrypt
        // - Print output

        input.close();
    }
}