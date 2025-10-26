import java.math.BigInteger;
import java.util.Base64;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

public class Encryptor {
    // Task: Convert shared BigInteger key into a byte array (keyBytes)
    private byte[] deriveKey(BigInteger key) throws Exception{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bigIntByte = key.toByteArray();
            return digest.digest(bigIntByte);
    }
    // Task: Implement encrypt(message, key)
    // - Convert plaintext to bytes (UTF-8)
    // - XOR each byte with keyBytes[i % keyBytes.length]
    // - Return Base64-encoded ciphertext for display
    String encrypt(String plainText, BigInteger sharedKey){
        byte[] plainTextBytes = plainText.getBytes(StandardCharsets.UTF_8);
        byte[] keyBytes = deriveKey(sharedKey);
        byte[] cipherTextByte = xor(plainTextBytes, keyBytes);
        return Base64.getEncoder().encodeToString(cipherTextByte);
    }

    private byte[] xor(byte[] data, byte[] key){
        byte[] result = new byte[data.length];
        for(int i = 0; i < data.length; i++){
            result[i] = (byte) (data[i] ^ key[i % key.length]);
        }
        return result;
    }

    // Task: Implement decrypt(ciphertext, key)
    // - Base64-decode the ciphertext
    // - XOR with same keyBytes
    // - Convert back to string and return plaintext
    String decrypt(String base64CipherText, BigInteger sharedKey) throws Exception{
        byte[] keyBytes = deriveKey(sharedKey);
        byte[] cipherTextByte = Base64.getDecoder().decode(base64CipherText);
        byte[] plainTextBytes = xor(cipherTextByte, keyBytes);
        return new String(plainTextBytes, StandardCharsets.UTF_8);
    }

    // Task: Add simple error handling for empty or too-short messages
}
