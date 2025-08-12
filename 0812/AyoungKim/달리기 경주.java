import java.util.*;

class Solution {
    static Map<String, Integer> player = new HashMap<>();
    static Map<Integer, String> ranking = new HashMap<>();;
    public String[] solution(String[] players, String[] callings) {
        for (int i = 1; i <= players.length; i++) {
            player.put(players[i - 1], i);
            ranking.put(i, players[i - 1]);
        }


        for (String c : callings) {
            changeRank(c);
        }

        String[] answer = new String[players.length];
        for (int i = 1; i <= players.length; i++) {
            answer[i - 1] = ranking.get(i);
        }

        return answer;
    }

    // 순서 바꾸기
    static void changeRank(String calling_player) {
        // 불린 선수의 등수
        int calling_rank = player.get(calling_player);

        // 추월된 선수
        String target_player = ranking.get(calling_rank - 1);

        // 순서 교체
        player.put(calling_player, calling_rank - 1);
        player.put(target_player, calling_rank);
        ranking.put(calling_rank - 1, calling_player);
        ranking.put(calling_rank, target_player);
    }
}