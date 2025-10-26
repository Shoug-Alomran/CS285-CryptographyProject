import java.math.BigInteger;
import java.util.Base64;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class Encryptor {
    // Convert shared BigInteger key into a byte array (keyBytes)
    private byte[] deriveKey(BigInteger key) throws Exception{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] bigIntByte = key.toByteArray();
            return digest.digest(bigIntByte);
    }
    // Implement encrypt(message, key)
    String encrypt(String plainText, BigInteger sharedKey) throws Exception{
        //validate plain text
        validatePlainText(plainText);
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

    // Implement decrypt(ciphertext, key)
    String decrypt(String base64CipherText, BigInteger sharedKey) throws Exception{
        //validate cipher text
        validateCipherText(base64CipherText);
        byte[] keyBytes = deriveKey(sharedKey);
        byte[] cipherTextByte = Base64.getDecoder().decode(base64CipherText);
        byte[] plainTextBytes = xor(cipherTextByte, keyBytes);
        return new String(plainTextBytes, StandardCharsets.UTF_8);
    }

    // Task: Add simple error handling for empty or too-short messages
    // Check messages before encryption
    public static void validatePlainText(String plainText){
        if(plainText == null || plainText.isEmpty()){
            throw new IllegalArgumentException("Plain text cannot be empty");
        }
        if(plainText.length() < 3){
            throw new IllegalArgumentException("Plain text cannot be less than 3 letters, use more letters for better security");
        }
    }
    // Check messages before decryption
    public static void validateCipherText(String cipherText){
        if(cipherText == null || cipherText.isEmpty()){
            throw new IllegalArgumentException("Cipher text cannot be empty");
        }
        if(cipherText.length() < 4){
            throw new IllegalArgumentException("Cipher text cannot be less than 4 letters, use more letters for better security");
        }
    }
}
