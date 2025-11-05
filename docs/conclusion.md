# Conclusion

This project successfully demonstrates the **Diffie–Hellman (DH) key exchange** in Java, showing how two parties can derive the same secret key over an insecure channel and then use that key to encrypt and decrypt a message. The implementation mirrors the mathematical steps precisely and validates correctness through consistent decryption results.

## What was achieved
- Implemented DH key establishment with clear separation of concerns across classes.
- Added robust input validation for \( q \), \( \alpha \), private keys, and message length.
- Verified that both parties compute an identical shared key before encryption/decryption.
- Documented the design, workflow, and test cases with reproducible outputs.

## What we learned
- How security rests on the hardness of the **discrete logarithm problem**.
- The importance of **input validation** and **error handling** in crypto demos.
- Why DH by itself does **not** provide authentication and must be combined with identity checks in practice.

## Limitations & future work
- **Authentication**: Integrate digital signatures or certificates to prevent MitM attacks.
- **Parameter generation**: Add safe prime / generator selection utilities for stronger defaults.
- **Modern variants**: Provide an **ECDH** path (elliptic curves) for smaller keys and faster performance.
- **Testing**: Extend property-based tests and large-prime scenarios for stronger assurance.

In summary, the project meets the learning objectives of CS285 by turning theory into a working system and clarifying where real-world protocols extend DH for production-grade security.