
public class Parameters {
 
    // Private fields for q (large prime number) and alpha (primitive root)
    private int q;
    private int alpha;

    // Constructor that sets q and alpha
    public Parameters(int q, int alpha) {
       this.q = q;       
        this.alpha = alpha;
    }

    // Getter for q
    public int getQ() {
        return q;
    }

    // Getter for alpha
    public int getAlpha() {
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




    



