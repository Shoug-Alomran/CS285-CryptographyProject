---
title: Conclusion
summary: Outcomes, lessons and next steps
icon: flask
description: Outcomes of the CS285 Diffie–Hellman project, what the team learned about discrete mathematics in cryptographic software, and planned future work.
kicker: Evaluation · Conclusion
hero: Theory in, <span class="grad-text">matching keys out.</span>
lead: The project demonstrates Diffie–Hellman key exchange in Java and verifies that both participants compute the same secret key before encrypted communication.
chips:
  - "CS285 learning objectives met"
actions:
  - label: Read the report
    href: ../report/report/
    icon: file
---

## What was achieved

- Implemented the complete DH key establishment flow with clear class responsibilities.
- Added input validation for \( q \), \( \alpha \), private-key ranges, and message length.
- Verified end-to-end encryption/decryption consistency using the shared secret.
- Produced report and test evidence aligned with course expectations.

## What was learned

- How discrete mathematics directly drives public-key protocol behavior.
- Why validation and controlled input flow are critical in cryptographic software.
- Why DH alone is insufficient without an authentication layer.

## Limitations and future work

- Add authenticated key exchange support, for example signature-backed identity checks.
- Improve parameter generation defaults with safe-prime and generator policies.
- Add an ECDH path for a modern performance and security comparison.
- Expand automated tests, including larger parameter scenarios.

Overall, the project meets the CS285 learning objective of turning theory into a reproducible cryptographic implementation.
