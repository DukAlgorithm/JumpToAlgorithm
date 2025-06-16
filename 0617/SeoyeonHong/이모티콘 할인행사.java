import java.util.ArrayList;
import java.util.List;

class Solution {
    static List<int[]> records = new ArrayList<>();
    static int[][] users;
    static int[] emoticons;
    static int N;

    public int[] calculateResult(List<Integer> discountRates){
        int serviceUser = 0;
        int totalSales = 0;
        int[] costs = new int[N];
        for(int i = 0; i < N; i++){
            costs[i] = emoticons[i] * (100 - discountRates.get(i)) / 100;
        }

        for(int[] user: users){
            int spent = 0;
            for(int i = 0; i < N; i++){
                if(discountRates.get(i) >= user[0]){
                    spent += costs[i];
                }
            }
            if(spent >= user[1]){
                serviceUser += 1;
            } else {
                totalSales += spent;
            }
        }
        return new int[]{serviceUser, totalSales};
    }

    public void setDiscountRates(List<Integer> discountRates){
        if(discountRates.size() == N){
            records.add(calculateResult(discountRates));
        } else {
            for(int rate: new int[]{10, 20, 30, 40}){
                List<Integer> newRates = new ArrayList<>(discountRates);
                newRates.add(rate);
                setDiscountRates(newRates);
            }
        }
    }


    public int[] solution(int[][] users, int[] emoticons) {
        Solution.users = users;
        Solution.emoticons = emoticons;
        N = emoticons.length;

        setDiscountRates(new ArrayList<>());
                
        records.sort((a, b) -> {
            if (b[0] != a[0]) return b[0] - a[0];
            return b[1] - a[1];
        });
        
        return records.get(0);
    }
}