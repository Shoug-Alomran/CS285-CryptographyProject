```java title="KeyExchange.java"
import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyExchange extends Parameters {

    private SecureRandom random = new SecureRandom();

    // Attributes to store keys
    private BigInteger privateKey;
    private BigInteger publicKey;

    // Constructor calls Parameters constructor and generates both keys
    public KeyExchange(BigInteger q, BigInteger alpha) {
        super(q, alpha); 
        generateKeys(); // Generate public and private keys when object is created
    }

    // Generate a random private key and corresponding public key
    private void generateKeys() {
        // Generate private key: 1 ≤ x ≤ q−2
        this.privateKey = new BigInteger(getQ().bitLength(), random)
                .mod(getQ().subtract(BigInteger.TWO))
                .add(BigInteger.ONE);

        // Compute public key: Y = α^x mod q
        this.publicKey = getAlpha().modPow(privateKey, getQ());
    }

    // Compute shared key using peer's public key
    public BigInteger computeSharedKey(BigInteger otherPublic) {
        return otherPublic.modPow(privateKey, getQ());
    }

    // Getter for private key
    public BigInteger getPrivateKey() {
        return privateKey;
    }

    // Getter for public key
    public BigInteger getPublicKey() {
        return publicKey;
    }
}