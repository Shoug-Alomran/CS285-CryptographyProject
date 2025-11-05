import java.math.BigInteger;
import java.util.Base64;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class Encryptor {

    // Convert shared BigInteger key into a byte array (keyByte)
    // Uses BigInteger for very large values
    private byte[] Key(BigInteger key) throws Exception {
        MessageDigest msgDigest = MessageDigest.getInstance("SHA-256"); // SHA for Secure Hash Algorithm (256-bit output)
        byte[] ArrayByte = key.toByteArray(); // Converts the shared key into bytes
        return msgDigest.digest(ArrayByte);   // Hashes the byte array to produce a fixed-length key
    }

    // XOR function for symmetric encryption/decryption
    private byte[] xor(byte[] data, byte[] key) {
        byte[] xorArray = new byte[data.length]; // Creates a new byte array to store the result
        for (int i = 0; i < data.length; i++) {
            xorArray[i] = (byte) (data[i] ^ key[i % key.length]); // XORs each byte with the corresponding key byte
        }
        return xorArray;
    }

    // Encrypt a message using the shared secret key
    String encrypt(String msg, BigInteger sharedKey) throws Exception {
        byte[] msgByte = msg.getBytes(StandardCharsets.UTF_8); // Converts text to bytes
        byte[] keyByte = Key(sharedKey);                        // Derives the key bytes
        byte[] cipherMsgByte = xor(msgByte, keyByte);           // Encrypts using XOR
        return Base64.getEncoder().encodeToString(cipherMsgByte); // Encodes ciphertext in Base64
    }

    // Decrypt a Base64 ciphertext using the shared secret key
    String decrypt(String base64cipherMsg, BigInteger sharedKey) throws Exception {
        byte[] keyByte = Key(sharedKey);                         // Regenerate the key
        byte[] cipherMsgByte = Base64.getDecoder().decode(base64cipherMsg); // Decode Base64 input
        byte[] msgByte = xor(cipherMsgByte, keyByte);            // Decrypt using XOR
        return new String(msgByte, StandardCharsets.UTF_8);      // Convert bytes back to readable text
    }

    // Validate message before encryption
    public static void validateMsg(String msg) {
        if (msg == null) {
            throw new IllegalArgumentException("Message cannot be empty");
        }
    }

    // Validate cipher text before decryption
    public static void validateCipherMsg(String cipherMsg) {
        if (cipherMsg == null) {
            throw new IllegalArgumentException("Cipher message cannot be empty");
        }
    }
}