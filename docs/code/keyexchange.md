# KeyExchange.java

<div class="purpose-note"><strong>Purpose:</strong> Define key-pair generation and shared-secret computation for each participant.</div>

```java
import java.math.BigInteger;
import java.security.SecureRandom;

public class KeyExchange extends Parameters {

    private SecureRandom random = new SecureRandom();

    private BigInteger privateKey;
    private BigInteger publicKey;

    public KeyExchange(BigInteger q, BigInteger alpha) {
        super(q, alpha);
        generateKeys();
    }

    private void generateKeys() {
        this.privateKey = new BigInteger(getQ().bitLength(), random)
                .mod(getQ().subtract(BigInteger.TWO))
                .add(BigInteger.ONE);

        this.publicKey = getAlpha().modPow(privateKey, getQ());
    }

    public BigInteger computeSharedKey(BigInteger otherPublic) {
        return otherPublic.modPow(privateKey, getQ());
    }

    public BigInteger getPrivateKey() {
        return privateKey;
    }

    public BigInteger getPublicKey() {
        return publicKey;
    }
}
```
