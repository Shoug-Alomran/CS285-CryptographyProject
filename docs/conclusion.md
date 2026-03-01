# Conclusion

<div class="purpose-note"><strong>Purpose:</strong> Summarize project outcomes, learning impact, and practical next steps.</div>

The project successfully demonstrates **Diffie-Hellman key exchange** in Java and verifies that both participants compute the same secret key before encrypted communication.

## What Was Achieved

- Implemented complete DH key establishment flow with clear class responsibilities.
- Added input validation for \( q \), \( \alpha \), private-key ranges, and message length.
- Verified end-to-end encryption/decryption consistency using the shared secret.
- Produced report and test evidence aligned with course expectations.

## What Was Learned

- How discrete mathematics directly drives public-key protocol behavior.
- Why validation and controlled input flow are critical in cryptographic software.
- Why DH alone is insufficient without an authentication layer.

## Limitations and Future Work

- Add authenticated key exchange support (for example, signature-backed identity checks).
- Improve parameter generation defaults (safe-prime and generator policies).
- Add an ECDH path for modern performance/security comparison.
- Expand automated tests, including larger parameter scenarios.

Overall, the project meets the CS285 learning objective of turning theory into a reproducible cryptographic implementation.
