import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyExchange {

    // 1️Generates a public key: α^x mod q
    public BigInteger generatePublicKey(BigInteger alpha, BigInteger privateKey, BigInteger q) {
        // TODO: Implement α^x mod q using modPow
        return null;
    }

    // Computes the shared secret: (Y_peer)^x mod q
    public BigInteger computeSharedKey(BigInteger peerPublicKey, BigInteger privateKey, BigInteger q) {
        // TODO: Implement (Y_peer)^x mod q using modPow
        return null;
    }

    // Generates a random private key (1 ≤ x ≤ q−2)
    public BigInteger generatePrivateKey(BigInteger q) {
        // TODO: Implement random key generation
        return null;
    }
}