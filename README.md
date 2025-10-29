# CS285 – Secure Key Exchange Project

This repository contains a **Java implementation of a secure key exchange system** developed for the **CS285 – Discrete Mathematics for Computing** course.  
The project demonstrates how two parties can securely generate a shared secret key and use it to encrypt and decrypt messages, following the principles of public-key cryptography.

---

### Prince Sultan University  
**Developed by:**  
- Shoug Fawaz Alomran  
- Fai Mohammad Khanjar  
- Aljohara Waleed Albawardi  
- Yara Mutlaq Alzamel  

**Submission Date:** 9/11/2025  

---

## Project Objectives
- Understand the mathematical foundation of public-key cryptography.  
- Implement a secure key exchange process using modular arithmetic.  
- Verify that both participants compute the same shared secret key.  
- Use the shared key to encrypt and decrypt a message (minimum 20 characters).  
- Apply input validation and error handling for reliable execution.  
- Document the algorithm, code, and results according to the official project report template.  

---

## Project Structure

| File | Purpose |
|------|----------|
| **Main.java** | The driver program that manages input, key generation, encryption, decryption, and final output. |
| **Parameters.java** | Stores and displays public parameters (prime `q` and primitive root `α`). |
| **KeyExchange.java** | Generates private and public keys, and computes the shared secret key. |
| **Encryptor.java** | Handles encryption and decryption of messages using the shared secret key. |
| **Validator.java** | Performs input validation for prime checks and message length (> 20 characters). |
| **Utils.java** | Contains supporting methods such as random number generation, normalization, and formatted output. |
| **Helpers.java** | Manages all user inputs and ensures correctness. It handles prompts for `q`, `α`, private keys, and message validation loops to prevent program crashes. |

---

## Team Members

| Member | Focus Area |
|:--|:--|
| **Yara Mutlaq Alzamel** | Public parameters and utility functions. |
| **Fai Mohammad Khanjar** | Key generation, modular arithmetic, and shared secret computation. |
| **Aljohara Waleed Albawardi** | Message encryption and decryption logic. |
| **Shoug Fawaz Alomran** | Validation, integration, final testing, user input handling through `Helpers.java`, and report assembly. |

---

## Program Flow

1. **Parameters.java** – Initializes and stores the public parameters (`q` and `α`).  
2. **KeyExchange.java** – Each participant generates a private key and computes a corresponding public key. Both then calculate a shared secret using modular arithmetic.  
3. **Encryptor.java** – Encrypts and decrypts messages using XOR operations and Base64 encoding to simulate secure communication.  
4. **Validator.java** – Validates the user’s inputs such as prime verification for `q` and message length enforcement (> 20 characters).  
5. **Helpers.java** – Handles user prompts for inputs and ensures correct validation before progressing. Prevents crashes by using loops for incorrect entries.  
6. **Utils.java** – Provides supporting functions for randomness, byte normalization, and formatted display of results.  
7. **Main.java** – The central driver of the program, managing user interaction, selecting between modes (Numerical Example or Live Mode), and displaying results.  

---

## Example Output

```bash
--- Royal Convoy - Secure Communication (Diffie–Hellman / ECDH Demo) ---
This program demonstrates how the control center and vehicles exchange keys securely.

MAIN MENU:
1) Numerical Example (Section 1.3 demo)
2) Live Mode (manual / auto private keys)
0) Exit
Choose an option: 2

--- Live Mode ---
You will now choose or generate values used by Diffie-Hellman:

Enter a prime q (≥ 3): 7

Enter alpha (1 < alpha < q): 6

Public Parameters:
Prime number (q): 7
Primitive root (alpha): 6

Auto private keys generated for both cars.

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
Secure session established between convoy vehicles and control center.