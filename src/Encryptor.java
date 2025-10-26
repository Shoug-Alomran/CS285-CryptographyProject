public class Encryptor {
    // Task: Convert shared BigInteger key into a byte array (keyBytes)

    // Task: Implement encrypt(message, key)
    // - Convert plaintext to bytes (UTF-8)
    // - XOR each byte with keyBytes[i % keyBytes.length]
    // - Return Base64-encoded ciphertext for display
    String encrypt(String plaintext, BigInteger sharedKey){
        try{
            if(plaintext == null || plaintext.isEmpty()){
                System.out.printline("PlainText is empty");
            }
            byte[] keyBytes = MessageDigest.getInstance();
        }
    }

    // Task: Implement decrypt(ciphertext, key)
    // - Base64-decode the ciphertext
    // - XOR with same keyBytes
    // - Convert back to string and return plaintext
    String decrypt(String base64CipherText, BigInteger sharedKey)

    // Task: Add simple error handling for empty or too-short messages
}
