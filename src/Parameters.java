import java.math.BigInteger;

public class Parameters {
 
    // Private fields for q (large prime number) and alpha (primitive root)
    private BigInteger q;
    private BigInteger alpha;

    // Constructor that sets q and alpha
    public Parameters(BigInteger q, BigInteger alpha) {
       this.q = q;       
        this.alpha = alpha;
    }

    // Getter for q
    public BigInteger getQ() {
        return q;
    }

    // Getter for alpha
    public BigInteger getAlpha() {
        return alpha;
    }

    // Override toString() to neatly print q and alpha values
    @Override
    public String toString() {
        return "Public Parameters:\n" +
               "Prime number (q): " + q + "\n" +
               "Primitive root (α): " + alpha;
    }
}




    



