```bash
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.Scanner;

public class Main {

    private static final SecureRandom random = new SecureRandom();

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("--- Royal Convoy - Secure Communication (Diffie-Hellman / ECDH Demo) ---");
        System.out.println("This program demonstrates how the control center and vehicles exchange keys securely.\n");

        while (true) {
            System.out.println("MAIN MENU:");
            System.out.println("1) Numerical Example (Section 1.3 demo - fixed values)");
            System.out.println("2) Numerical Example (auto-generated values)");
            System.out.println("3) Live Mode (manual / auto parameters and private keys)");
            System.out.println("0) Exit");
            System.out.print("Choose an option: ");

            String choice = input.nextLine().trim();

            switch (choice) {
                case "1" -> runFixedExample();
                case "2" -> runRandomExample(input);
                case "3" -> runLiveMode(input);
                case "0" -> {
                    System.out.println("Goodbye!");
                    input.close();
                    return;
                }
                default -> System.out.println("Invalid choice. Please enter 1, 2, 3, or 0.\n");
            }
        }
    }

    // ─────────────── Numerical Example – Fixed (as in report) ───────────────
    private static void runFixedExample() {
        System.out.println("\n--- Numerical Example (Section 1.3 - Fixed) ---");

        BigInteger q = BigInteger.valueOf(23);
        BigInteger alpha = BigInteger.valueOf(5);
        Parameters storage = new Parameters(q, alpha);

        BigInteger Xa = BigInteger.valueOf(6);
        BigInteger Xb = BigInteger.valueOf(15);

        BigInteger Ya = alpha.modPow(Xa, q);
        BigInteger Yb = alpha.modPow(Xb, q);
        BigInteger kA = Yb.modPow(Xa, q);
        BigInteger kB = Ya.modPow(Xb, q);

        System.out.println("To give an example, both 2 cars and the control center need a safe way to communicate.");
        System.out.println(storage);
        System.out.println("Car 1 chooses Xa = 6 → Ya = 5^6 mod 23 = " + Ya);
        System.out.println("Car 2 chooses Xb = 15 → Yb = 5^15 mod 23 = " + Yb);
        System.out.println("Each car computes the shared key:");
        System.out.println("Car 1: 19^6 mod 23 = " + kA);
        System.out.println("Car 2: 8^15 mod 23 = " + kB);
        System.out.println("Both cars share the same key: " + kA + "\n");

        String message = "Royal convoy message remains secure through shared key exchange.";
        System.out.println("Example message: " + message);

        try {
            Encryptor enc = new Encryptor();
            String cipher = enc.encrypt(message, kA);
            String plain = enc.decrypt(cipher, kB);
            System.out.println("Encrypted Message = " + cipher);
            System.out.println("Decrypted Message = " + plain);
            System.out.println("Decryption OK = " + plain.equals(message) + "\n");
        } catch (Exception e) {
            System.out.println("Encryption/Decryption failed: " + e.getMessage());
        }
    }

    // ─────────────── Numerical Example – Random ───────────────
    private static void runRandomExample(Scanner input) {
        System.out.println("\n--- Numerical Example (Auto-generated values) ---");

        BigInteger q = BigInteger.probablePrime(8, random);
        BigInteger alpha = BigInteger.valueOf(random.nextInt(3, q.intValue() - 1));
        Parameters storage = new Parameters(q, alpha);

        BigInteger Xa = BigInteger.valueOf(random.nextInt(2, q.intValue() - 2));
        BigInteger Xb = BigInteger.valueOf(random.nextInt(2, q.intValue() - 2));

        BigInteger Ya = alpha.modPow(Xa, q);
        BigInteger Yb = alpha.modPow(Xb, q);
        BigInteger kA = Yb.modPow(Xa, q);
        BigInteger kB = Ya.modPow(Xb, q);

        System.out.println("Automatically generated example parameters and results:");
        System.out.println(storage);
        System.out.println("Car 1 (Xa): " + Xa + " --> Ya = " + Ya);
        System.out.println("Car 2 (Xb): " + Xb + " --> Yb = " + Yb);
        System.out.println("Shared key for Car 1: " + kA);
        System.out.println("Shared key for Car 2: " + kB);
        System.out.println("Keys match: " + kA.equals(kB) + "\n");

        String message = Helpers.promptMessage(input);

        try {
            Encryptor enc = new Encryptor();
            String cipher = enc.encrypt(message, kA);
            String plain = enc.decrypt(cipher, kB);
            System.out.println("--- Encryption Test ---");
            System.out.println("Original Message  = " + message);
            System.out.println("Encrypted Message = " + cipher);
            System.out.println("Decrypted Message = " + plain);
            System.out.println("Decryption OK = " + plain.equals(message) + "\n");
        } catch (Exception e) {
            System.out.println("Encryption/Decryption failed: " + e.getMessage());
        }
    }

    // ─────────────── Live Mode (manual or auto q, alpha, and keys) ───────────────
    private static void runLiveMode(Scanner input) {
        System.out.println("\n--- Live Mode ---");
        System.out.println("You can either enter your own values for q and alpha, or let the program generate them.\n");

        System.out.println("Choose parameter mode:");
        System.out.println("a) Auto-generate q and alpha");
        System.out.println("b) Enter manually");
        System.out.print("Your choice (a/b): ");
        String paramChoice = input.nextLine().trim().toLowerCase();

        BigInteger q, alpha;

        if ("b".equals(paramChoice)) {
            q = Helpers.promptPrime(input);
            alpha = Helpers.promptAlpha(input, q);
        } else {
            q = BigInteger.probablePrime(8, random);
            alpha = BigInteger.valueOf(random.nextInt(3, q.intValue() - 1));
            System.out.println("Automatically generated parameters:");
            System.out.println("q = " + q + ", alpha = " + alpha + "\n");
        }

        Parameters storage = new Parameters(q, alpha);
        System.out.println(storage + "\n");

        System.out.println("Choose private-key mode:");
        System.out.println("a) Auto-generate private keys");
        System.out.println("b) Enter private keys manually");
        System.out.print("Your choice (a/b): ");
        String keyChoice = input.nextLine().trim().toLowerCase();

        BigInteger Xa, Xb;
        if ("b".equals(keyChoice)) {
            Xa = Helpers.promptPrivateKey(input, q, "Enter private key for Car 1: ");
            Xb = Helpers.promptPrivateKey(input, q, "Enter private key for Car 2: ");
        } else {
            Xa = BigInteger.valueOf(random.nextInt(2, q.intValue() - 2));
            Xb = BigInteger.valueOf(random.nextInt(2, q.intValue() - 2));
            System.out.println("Auto private keys generated: Xa = " + Xa + ", Xb = " + Xb + "\n");
        }

        BigInteger Ya = alpha.modPow(Xa, q);
        BigInteger Yb = alpha.modPow(Xb, q);
        BigInteger kA = Yb.modPow(Xa, q);
        BigInteger kB = Ya.modPow(Xb, q);

        if (!kA.equals(kB)) {
            System.out.println("Shared keys do not match. Please try again.\n");
            return;
        }

        String message = Helpers.promptMessage(input);

        try {
            Encryptor enc = new Encryptor();
            String cipher = enc.encrypt(message, kA);
            String plain = enc.decrypt(cipher, kB);

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
```