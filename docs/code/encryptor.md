# Encryptor.java

<div class="purpose-note"><strong>Purpose:</strong> Implement shared-key-derived encryption and decryption routines for message flow validation.</div>

```java
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
