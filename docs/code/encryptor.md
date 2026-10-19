---
title: Encryptor.java
nav_title: Encryptor
summary: SHA-256 keystream, XOR, Base64
icon: lock
description: Encryptor class of the CS285 Diffie–Hellman key exchange project. Turn the shared key into a keystream and use it to encrypt and decrypt messages.
kicker: Code · Encryption
hero: Encryptor<span class="grad-text">.java</span>
lead: Turn the shared key into a keystream and use it to encrypt and decrypt messages.
chips:
  - "47 lines"
  - "SHA-256"
  - "XOR · Base64"
actions:
  - label: Architecture overview
    href: ../../implementation/
    icon: graph
---

## Role in the system

<p class="lead-in">The shared key is hashed with SHA-256 into 32 bytes. Each message byte is XORed with the key byte at the same position modulo 32, and the result is Base64-encoded. Since <code>(m ⊕ k) ⊕ k = m</code>, decryption runs the same XOR.</p>

## Source

```java title="Encryptor.java"
import java.math.BigInteger;
import java.util.Base64;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class Encryptor {

    private byte[] Key(BigInteger key) throws Exception {
        MessageDigest msgDigest = MessageDigest.getInstance("SHA-256");
        byte[] ArrayByte = key.toByteArray();
        return msgDigest.digest(ArrayByte);
    }

    private byte[] xor(byte[] data, byte[] key) {
        byte[] xorArray = new byte[data.length];
        for (int i = 0; i < data.length; i++) {
            xorArray[i] = (byte) (data[i] ^ key[i % key.length]);
        }
        return xorArray;
    }

    String encrypt(String msg, BigInteger sharedKey) throws Exception {
        byte[] msgByte = msg.getBytes(StandardCharsets.UTF_8);
        byte[] keyByte = Key(sharedKey);
        byte[] cipherMsgByte = xor(msgByte, keyByte);
        return Base64.getEncoder().encodeToString(cipherMsgByte);
    }

    String decrypt(String base64cipherMsg, BigInteger sharedKey) throws Exception {
        byte[] keyByte = Key(sharedKey);
        byte[] cipherMsgByte = Base64.getDecoder().decode(base64cipherMsg);
        byte[] msgByte = xor(cipherMsgByte, keyByte);
        return new String(msgByte, StandardCharsets.UTF_8);
    }

    public static void validateMsg(String msg) {
        if (msg == null) {
            throw new IllegalArgumentException("Message cannot be empty");
        }
    }

    public static void validateCipherMsg(String cipherMsg) {
        if (cipherMsg == null) {
            throw new IllegalArgumentException("Cipher message cannot be empty");
        }
    }
}
```
