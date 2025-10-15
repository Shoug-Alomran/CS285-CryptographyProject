# CS285 – Secure Key Exchange Project

This repository contains a **Java implementation of a secure key exchange system** developed for the **CS285 – Discrete Mathematics for Computing** course.  
The project demonstrates how two parties can safely generate a shared secret key and use it to encrypt and decrypt messages, following the principles of public-key cryptography.

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
| `Main.java` | Runs the entire program and connects all components. |
| `Parameters.java` | Stores public parameters (prime q and root α). |
| `KeyExchange.java` | Handles private/public key generation and shared secret computation. |
| `Encryptor.java` | Encrypts and decrypts messages using the shared secret key. |
| `Validator.java` | Validates inputs (prime check, message length > 20). |
| `Utils.java` | Contains helper methods (random numbers, formatted printing). |

---

## Team Members

| Member | Focus Area |
|:--|:--|
| **A** | Public parameters & utilities |
| **B** | Key generation & shared secret math |
| **C** | Encryption & decryption logic |
| **D** | Validation, integration, and report assembly |

---

## Program Flow
1. **Parameters** → Initialize public prime `q` and generator `α`.  
2. **KeyExchange** → Generate private/public keys and compute shared secret.  
3. **Encryptor** → Encrypt & decrypt a message using the shared key.  
4. **Validator** → Check message validity and prime number correctness.  
5. **Utils** → Print labeled outputs for screenshots and clarity.  
6. **Main** → Controls the entire process and displays results.

---

## Example Output
