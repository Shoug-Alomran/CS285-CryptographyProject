import java.math.BigInteger;
import java.util.Base64;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;



public class Encryptor {
    // Convert shared BigInteger key into a byte array (keyByte)
    // uses bigInteger for huge values
    private byte[] Key(BigInteger key) throws Exception {
        MessageDigest msgDigest = MessageDigest.getInstance("SHA-256"); //SHA for Secure Hash Algorithm, it outputs 256 outputs
        byte[] ArrayByte = key.toByteArray(); //converts each letter to a byte to help in ciphering the texts letter by letter
        return msgDigest.MessageDigest(ArrayByte); //stores the bytes in the program
    }

        //xor function
        private byte[] xor(byte[] data, byte[] key) {
        byte[] xorArray = new byte[data.length]; 
        for (int i = 0; i < data.length; i++) {
            xorArray[i] = (byte) (data[i] ^ key[i % key.length]); //equation to cipher msg
        }
        return xorArray;
    }

    // Implement encrypt(message, key)
    String encrypt(String msg, BigInteger sharedKey) throws Exception {
        byte[] msgByte = msg.getBytes(StandardCharsets.UTF_8); //converts the text into bytes
        byte[] keyByte = Key(sharedKey); //uses the key function to store the data
        byte[] cipherMsgByte = xor(msgByte, keyByte); //ciphers the text
        return Base64.getEncoder().encodeToString(cipherMsgByte);
    }

    // Implement decrypt(ciphermsg, key)
    String decrypt(String base64cipherMsg, BigInteger sharedKey) throws Exception {
        byte[] keyByte = Key(sharedKey); //stores data
        byte[] cipherMsgByte = Base64.getDecoder().decode(base64cipherMsg); //decodes the data using a method
        byte[] msgByte = xor(cipherMsgByte, keyByte); //uses the same equation to return it to a readable text
        return new String(msgByte, StandardCharsets.UTF_8);
    }

    // Check messages before encryption
    public static void validateMsg(String msg) {
        if (msg == null) {
            throw new IllegalArgumentException("Message cannot be empty");
        }
    }

    // Check messages before decryption
    public static void validateCipherMsg(String cipherMsg) {
        if (cipherMsg == null) {
            throw new IllegalArgumentException("Cipher message cannot be empty");
        }
}
