import java.util.*;

class Solution {
    public String[] solution(int n, int[] arr1, int[] arr2) {
        String[] answer = new String[n];

        for (int i = 0; i < n; i++) {
            StringBuilder sb = new StringBuilder();
            String spot1 = String.format("%" + n + "s", String.valueOf(Integer.toBinaryString(arr1[i]).replace(' ', '0')));
            String spot2 = String.format("%" + n + "s", String.valueOf(Integer.toBinaryString(arr2[i]).replace(' ', '0')));

            for (int j = 0; j < n; j++) {
                char n1 = spot1.charAt(j);
                char n2 = spot2.charAt(j);

                if (n1 == '1' || n2 == '1') {
                    sb.append('#');
                } else {
                    sb.append(' ');
                }
            }

            answer[i] = sb.toString();
        }

        return answer;
    }
}