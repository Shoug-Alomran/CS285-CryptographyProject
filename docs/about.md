---
title: About the Project
nav_title: About
summary: Scope, purpose and learning objectives
icon: layers
description: Scope and purpose of the CS285 Secure Key Exchange project, and how the Java implementation connects discrete mathematics with working software.
kicker: Project · About
hero: Where the theory <span class="grad-text">meets the code.</span>
lead: The Secure Key Exchange System was built for CS285 – Discrete Mathematics for Computing at Prince Sultan University. This site brings together the report, implementation notes, source code and test outcomes.
chips:
  - "CS285 · Prince Sultan University"
  - "Instructor: Dr. Jalila Zouhair"
  - "Submitted Nov 9, 2025"
actions:
  - label: Read the introduction
    href: ../introduction/
    icon: sigma
  - label: Meet the team
    href: ../team/
    icon: users
---

## The project in one paragraph

The core demonstration shows how two participants establish a shared secret key using **Diffie–Hellman** in **Java**. Neither private key is ever transmitted. Both sides derive the same key from public values, then use it to encrypt and decrypt a message.

## Project purpose

This project was designed to:

1. Apply modular arithmetic and discrete logarithm concepts in a practical setting.
2. Implement Diffie–Hellman key exchange with clear parameter handling.
3. Show how a shared secret can support encryption and decryption.
4. Reinforce core public-key cryptography principles through reproducible examples.

## Learning objectives

- Apply discrete mathematics concepts used in public-key cryptography.
- Implement Diffie–Hellman key exchange in Java.
- Verify that both participants derive the same shared secret.
- Use the shared secret for encryption and decryption flow validation.
- Document architecture, code behavior, and test evidence in a reproducible format.

!!! note "Educational scope"
    This implementation is an instructional proof-of-concept intended to bridge mathematical foundations and software execution.
