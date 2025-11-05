```java
import java.math.BigInteger;

public class Parameters {

    private BigInteger q;
    private BigInteger alpha;

    // Constructor that sets q and alpha
    public Parameters(BigInteger q, BigInteger alpha) {
        this.q = q;
        this.alpha = alpha;
    }

    public BigInteger getQ() {
        return q;
    }

    public BigInteger getAlpha() {
        return alpha;
    }

    @Override
    public String toString() {
        return "Public Parameters:\n" +
                "Prime number (q): " + q + "\n" +
                "Primitive root (alpha): " + alpha;
    }
}