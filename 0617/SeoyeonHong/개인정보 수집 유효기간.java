import java.util.ArrayList;
import java.util.HashMap;

class Solution {
    public static int days_of_date(String date){
        String[] str = date.split("\\.");
        int number = Integer.parseInt(str[0]) * 12 * 28 + Integer.parseInt(str[1]) * 28 + Integer.parseInt(str[2]);
        return number;
    }

    public int[] solution(String today, String[] terms, String[] privacies) {
        int[] answer = {};
        int days_of_today = days_of_date(today);
        HashMap<String, Integer> days_of_type = new HashMap<>();
        for(int i = 0; i < terms.length; i++) {
            String[] str = terms[i].split(" ");
            days_of_type.put(str[0], Integer.parseInt(str[1]) * 28);
        }
        ArrayList<Integer> list = new ArrayList<>();
        for(int i = 0; i < privacies.length; i++){
            String[] str = privacies[i].split(" ");
            int days_of_term = days_of_date(str[0]);
            
            if(days_of_today - days_of_term >= days_of_type.get(str[1])){
                list.add(i+1);
            }
        }

        answer = new int[list.size()];
        for(int i = 0; i < list.size(); i++) {
            answer[i] = list.get(i);
        }
        return answer;
    }
}