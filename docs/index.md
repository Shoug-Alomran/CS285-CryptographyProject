# CS285 – Secure Key Exchange Project

### Prince Sultan University

**Course:** CS285 – Discrete Mathematics for Computing  
**Project Title:** Secure Key Exchange System (Diffie–Hellman Demonstration)  
**Instructor:** Dr. Jalila Zouhair  
**Submission Date:** 9 November 2025  

**Developed by:**  
- Shoug Fawaz Alomran  
- Fai Mohammad Khanjar  
- Aljohara Waleed Albawardi  
- Yara Mutlaq Alzamel  

---

## Abstract

This project demonstrates how two entities can securely establish a shared secret key using **public-key cryptography principles**.  
The implemented system applies the **Diffie–Hellman key exchange algorithm**, which enables the participants to exchange information over an insecure channel without directly transmitting any secret values.

The resulting shared secret key can then be used to **encrypt and decrypt messages**, ensuring data confidentiality and integrity.  
This simulation also includes **input validation**, **error handling**, and the ability to operate in two modes: a **numerical example** (for demonstration) and a **live mode** (for user interaction).

---

## Objectives

- Understand the **mathematical foundation** behind public-key cryptography.  
- Implement the **Diffie–Hellman algorithm** in Java.  
- Validate that both participants compute **the same shared secret key**.  
- Use the shared key to **encrypt and decrypt messages**.  
- Apply **input validation** and **robust error handling**.  
- Document the algorithm, code, and results according to the official project format.

---

!!! tip "Key Idea"
    The security of the Diffie–Hellman exchange depends on the difficulty of solving the **discrete logarithm problem**, making it practically impossible for an attacker to derive the private keys from the public information.