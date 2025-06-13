import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean checkAround(int r, int c, int N, String[] place){
        boolean[][] visited = new boolean[N][N];
        visited[r][c] = true;
        Deque<int[]> deque = new ArrayDeque<>();
        deque.add(new int[]{r, c});
        int[] dr = {1, 0, -1, 0};
        int[] dc = {0, 1, 0, -1};

        while(!deque.isEmpty()){
            int[] cur = deque.pollFirst();
            for(int i = 0; i < 4; i++){
                int nr = cur[0] + dr[i];
                int nc = cur[1] + dc[i];

                if(0 <= nr && nr < N && 0 <= nc && nc < N && !visited[nr][nc]){
                    if(place[nr].charAt(nc) == 'P'){
                        return false;
                    }
                    else if(place[nr].charAt(nc) == 'O'){
                        if(Math.abs(r - nr) + Math.abs(c - nc) < 2){
                            deque.add(new int[] {nr, nc});
                            visited[nr][nc] = true;
                        }
                    }
                }
            }

        }

        return true;
    }

    public int[] solution(String[][] places) {
        int N = 5;
        int[] answer = new int[N];
        for(int i = 0; i < N; i++){
            String[] place = places[i];
            boolean flag = true;
            for(int r = 0; r < N; r++){
                for(int c = 0; c < N; c++){
                    if(place[r].charAt(c) == 'P'){
                        flag = checkAround(r, c, N, place);
                    }

                    if(!flag) break;
                }
                if(!flag) break;
            }

            answer[i] = flag ? 1 : 0;
        }
        return answer;
    }
}