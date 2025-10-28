import java.math.BigInteger;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("--- Royal Convoy - Secure Communication (Diffie–Hellman / ECDH Demo) ---");
        System.out.println("This program demonstrates how the control center and vehicles exchange keys securely.\n");

        while (true) {
            System.out.println("MAIN MENU:");
            System.out.println("1) Numerical Example (Section 1.3 demo)");
            System.out.println("2) Live Mode (manual / auto private keys)");
            System.out.println("0) Exit");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            switch (choice) {
                case "1":
                    runNumericalExample();
                    break;
                case "2":
                    runLiveMode(input);
                    break;
                case "0":
                    System.out.println("Goodbye!");
                    input.close();
                    return;
                default:
                    System.out.println("Invalid choice. Please enter 1, 2, or 0.\n");
                    break;
            }
        }
    }

    // Example from Section 1.3 (Fai)
    private static void runNumericalExample() {
        System.out.println("\n--- Numerical Example (Section 1.3) ---");

        KeyExchange key = new KeyExchange();
        // Values from the example
        BigInteger q = BigInteger.valueOf(23); // Large prime number
        BigInteger alpha = BigInteger.valueOf(5); // Primitive root mod q
        Parameters storage = new Parameters(q, alpha); // Store q and alpha.

        BigInteger Xa = BigInteger.valueOf(6); // Private key for Car 1
        BigInteger Xb = BigInteger.valueOf(15);// Private key for Car 2

        BigInteger Ya = key.generatePublicKey(alpha, Xa, q); // Public key for Car 1
        BigInteger Yb = key.generatePublicKey(alpha, Xb, q); // Public key for Car 2

        BigInteger kA = key.computeSharedKey(Yb, Xa, q); // Shared secret for Car 1
        BigInteger kB = key.computeSharedKey(Ya, Xb, q); // Shared secret for Car 2

        // Prints an intro to the scenario described in Section 1.3 of the report
        System.out.println(
                "To give an example, both 2 cars and the control center need a safe way to communicate during the royal convoy.");

        // Displays the public parameters (prime q and primitive root alpha)
        System.out.println(storage.toString());

        System.out.println("The first car chooses a private number Xa = 6 and calculates its public key");
        System.out.println();

        // Shows how Car 1 calculates its public key using the formula alpha^Xa mod q
        System.out.println("Ya = alpha^Xa mod q = 5^6 mod 23 = " + Ya + ".");
        System.out.println();

        System.out.println("Car 2 chooses a private number Xb = 15 and calculates its public key");
        System.out.println();

        // Shows how Car 2 calculates its public key using the formula alpha^Xb mod q
        System.out.println("Yb = alpha^Xb mod q = 5^15 mod 23 = " + Yb + ".");
        System.out.println();

        System.out.println("They exchange their public keys Ya and Yb.");

        // Explains that both sides will now compute their shared secret key
        System.out.println("Each car calculates the shared secret key:");
        System.out.println();

        // Shows Car 1’s shared key computation (Yb^Xa mod q)
        System.out.println("Car 1 computes Yb^Xa mod q = 19^6 mod 23 = " + kA + ".");

        // Shows Car 2’s shared key computation (Ya^Xb mod q)
        System.out.println("Car 2 computes Ya^Xb mod q = 8^15 mod 23 = " + kB + ".");
        System.out.println();

        System.out.println("Both cars get the same secret key " + kA
                + ", which keeps their messages safe so no one can read them.\n");

    }

    private static void runLiveMode(Scanner input) {
        System.out.println("\n--- Live Mode ---");
        System.out.println("You will now choose or generate values used by Diffie-Hellman:\n");

        BigInteger q = Helpers.promptPrime(input); // Prompt for prime q (≥ 3)
        BigInteger alpha = Helpers.promptAlpha(input, q); // Prompt for alpha (1 < alpha < q)

        Parameters storage = new Parameters(q, alpha); // Store q and alpha.
        System.out.println("\n" + storage); // Display chosen parameters

        System.out.println("\nChoose private-key mode:");
        System.out.println("a) Auto-generate private keys");
        System.out.println("b) Enter private keys manually");
        System.out.print("Your choice (a/b): ");
        String choice = input.nextLine().trim().toLowerCase();

        BigInteger Xa, Xb; // Private keys for Car 1 and Car 2

        KeyExchange key = new KeyExchange(); // Key exchange instance

        if ("b".equals(choice)) {
            Xa = Helpers.promptPrivateKey(input, q, "Enter private key for Car 1: ");
            Xb = Helpers.promptPrivateKey(input, q, "Enter private key for Car 2: ");
        } else {
            Xa = key.generatePrivateKey(q); // Auto-generate private key for Car 1
            Xb = key.generatePrivateKey(q); // Auto-generate private key for Car 2
            System.out.println("Auto private keys generated for both cars.\n");
        }

        BigInteger Ya = key.generatePublicKey(alpha, Xa, q); // Public key for Car 1
        BigInteger Yb = key.generatePublicKey(alpha, Xb, q); // Public key for Car 2

        BigInteger kA = key.computeSharedKey(Yb, Xa, q); // Shared secret for Car 1
        BigInteger kB = key.computeSharedKey(Ya, Xb, q); // Shared secret for Car 2

        if (!kA.equals(kB)) { // Verify shared keys match
            System.out.println("Shared keys do not match. Please try again.\n");
            return;
        }

        String message = Helpers.promptMessage(input); // Prompt for message (> 20 characters)

        // --- Aljohara's part: Encryption and Decryption --
        try {
            Encryptor encrypt = new Encryptor();
            String cipher = encrypt.encrypt(message, kA); // Encrypt message using shared key
            String plain = encrypt.decrypt(cipher, kB); // Decrypt message using same key

            // Print results including encryption/decryption
            System.out.println("\n--- RESULTS ---");
            System.out.println("q = " + q);
            System.out.println("alpha = " + alpha);
            System.out.println("Xa = " + Xa);
            System.out.println("Xb = " + Xb);
            System.out.println("Ya = " + Ya);
            System.out.println("Yb = " + Yb);
            System.out.println("Shared key = " + kA);
            System.out.println("Original Message = " + message);
            System.out.println("Encrypted Message = " + cipher);
            System.out.println("Decrypted Message = " + plain);
            System.out.println("Decryption OK = " + plain.equals(message));
            System.out.println("Secure session established between convoy vehicles and control center.\n");

        } catch (Exception e) {
            System.out.println("Encryption/Decryption failed: " + e.getMessage());
        }
    }
}