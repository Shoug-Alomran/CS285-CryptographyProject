```java
import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyExchange extends Parameters {

    private SecureRandom random = new SecureRandom();

    // Attributes to store keys
    private BigInteger privateKey;
    private BigInteger publicKey;

    public KeyExchange(BigInteger q, BigInteger alpha) {
        super(q, alpha); // call Parameters class constructor
        generateKeys(); // generate public and private keys when object is created
    }

    // Generate a random private key and compute corresponding public key
    private void generateKeys() {
        this.privateKey = new BigInteger(getQ().bitLength(), random).mod(getQ().subtract(BigInteger.TWO))
                .add(BigInteger.ONE);
        // 1 <= x <= q-2

        this.publicKey = getAlpha().modPow(privateKey, getQ());
        // Y = α^x mod q
    }

    // Compute shared key using peer's public key

    public BigInteger computeSharedKey(BigInteger otherPublic) {
        return otherPublic.modPow(privateKey, getQ());
    }

    // Getters for the keys
    public BigInteger getPrivateKey() {
        return privateKey;
    }

    public BigInteger getPublicKey() {
        return publicKey;
    }
}