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
--- Secure Key Exchange System ---
Enter a prime q (≥ 3): 7
Enter alpha (1 < alpha < q): 6

Public Parameters:
Prime (q): 7
Primitive Root (alpha): 6

Auto private keys generated for both participants.

Enter a message (> 20 characters): Please let this project work.

--- RESULTS ---
q = 7
alpha = 6
Xa = 5
Xb = 3
Ya = 6
Yb = 1
Shared key = 1
Original Message  = Please let this project work.
Encrypted Message = Jhs7D0vPYnq0...
Decrypted Message = Please let this project work.
Decryption OK = true