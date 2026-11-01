import java.util.List;
import java.util.ArrayList;

/** Original deterministic Java 17+ teaching fixture. */
public class SearchLab {
    static int linearComparisons(List<Integer> data, int target) {
        int count = 0;
        for (int value : data) { count++; if (value == target) return count; }
        return count;
    }
    static int binaryComparisons(List<Integer> data, int target) {
        int low=0, high=data.size()-1, count=0;
        while (low<=high) {
            int middle=low+(high-low)/2; count++;
            int value=data.get(middle);
            if (value==target) return count;
            if (value<target) low=middle+1; else high=middle-1;
        }
        return count;
    }
    public static void main(String[] args) {
        List<Integer> data=new ArrayList<>();
        for(int i=0;i<16;i++) data.add(i);
        int linear=linearComparisons(data,15), binary=binaryComparisons(data,15);
        if(linear!=16 || binary!=5) throw new AssertionError("Comparison count mismatch");
        System.out.println("linear="+linear+"; binary="+binary);
        System.out.println("Sorted random-access data; comparisons are not elapsed time.");
    }
}
