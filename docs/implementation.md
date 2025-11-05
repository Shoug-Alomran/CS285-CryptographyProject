# Implementation

This project was implemented in **Java** to demonstrate the concepts of the **Diffie–Hellman key exchange** algorithm.  
The program allows users to input or automatically generate prime numbers, primitive roots, and private keys.  
It then performs modular arithmetic to compute the shared secret key between two communicating entities.

The overall goal of the implementation is to provide a **user-friendly simulation** that clearly demonstrates the mathematical steps behind secure key generation.

---

## Program Structure

The implementation is organized into several classes, each with a specific responsibility that aligns with modular design principles.

| **Class** | **Description** |
|------------|----------------|
| `Main.java` | The driver class. Handles user interaction, manages modes (Numerical Example / Live Mode), and displays final results. |
| `Parameters.java` | Stores public parameters such as \( q \) (prime) and \( \alpha \) (primitive root). |
| `KeyExchange.java` | Generates private and public keys and computes the shared secret key. |
| `Encryptor.java` | Handles message encryption and decryption using the generated shared key. |
| `Validator.java` | Performs validation checks for prime numbers and message length (must exceed 20 characters). |
| `Helpers.java` | Manages all user input, prompts for \( q \), \( \alpha \), private keys, and ensures validation loops. |
| `Utils.java` | Contains helper functions for random number generation, normalization, and formatted output. |

!!! note "Design Principle"
    Each class is responsible for a single functionality, ensuring readability, maintainability, and ease of debugging.

---

## Workflow Summary

1. **Input Stage** – The user enters a prime number \( q \) and a primitive root \( \alpha \).  
2. **Key Generation Stage** – Each user (A and B) generates private and public keys.  
3. **Key Exchange Stage** – Both public keys are exchanged, and each participant calculates the shared secret key.  
4. **Encryption Stage** – A plaintext message (> 20 characters) is entered and encrypted using the shared key.  
5. **Decryption Stage** – The encrypted text is decrypted to verify successful key exchange and message confidentiality.  

---

## User Interface and Modes

The system provides two modes for demonstration:

| **Mode** | **Purpose** |
|-----------|-------------|
| **Numerical Example Mode** | Allows the user to test with predefined small values of \( q \), \( \alpha \), and private keys for educational demonstration. |
| **Live Mode** | Prompts the user to manually enter or auto-generate parameters, showcasing how the algorithm works in real scenarios. |

---

## Example Console Interaction

```bash
--- Royal Convoy - Secure Communication (Diffie–Hellman / ECDH Demo) ---
This program demonstrates how the control center and vehicles exchange keys securely.

MAIN MENU:
1) Numerical Example (Section 1.3 demo - fixed values)
2) Numerical Example (auto-generated values)
3) Live Mode (manual / auto parameters and private keys)
0) Exit
Choose an option: 3

--- Live Mode ---
You can either enter your own values for q and alpha, or let the program generate them.

Choose parameter mode:
a) Auto-generate q and alpha
b) Enter manually
Your choice (a/b): a
Automatically generated parameters:
q = 199, alpha = 7

Public Parameters:
Prime number (q): 199
Primitive root (alpha): 7

Choose private-key mode:
a) Auto-generate private keys
b) Enter private keys manually
Your choice (a/b): a
Auto private keys generated: Xa = 53, Xb = 121

Enter a message (> 20 characters): Please let this project work.

--- RESULTS ---
q = 199
alpha = 7
Xa = 53
Xb = 121
Ya = 7^53 mod 199 = 118
Yb = 7^121 mod 199 = 62
Shared key = 7
Original Message  = Please let this project work.
Encrypted Message = Jhs7D0vPYnq0...
Decrypted Message = Please let this project work.
Decryption OK = true
```