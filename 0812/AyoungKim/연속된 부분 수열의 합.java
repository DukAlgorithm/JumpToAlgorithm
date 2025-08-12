// 합이 k가 되는 부분 수열의 시작인덱스와 끝 인덱스를 구하는 문제
// 합이 k가 되는 부분 수열이 많을 경우, 길이가 짧은 수열을 구함
// 길이가 짧은 수열이 여러 개일 경우, 시작 인덱스가 작은 수열을 구함

class Solution {
    public int[] solution(int[] sequence, int k) {
        int start = 0;
        int end = 0;
        int min_len = Integer.MAX_VALUE;
        int sum = sequence[0];

        int n = sequence.length;
        int cur_start = 0;
        int cur_end = 0;

        while (cur_start < n && cur_end < n) {

            // 만약 합이 k가 되는 부분 수열을 찾았을 경우
            if (sum == k) {
                // 수열의 길이를 비교

                // 만약 현재 저장된 길이보다 작다면
                if (min_len > cur_end - cur_start) {
                    min_len = cur_end - cur_start;
                    start = cur_start;
                    end = cur_end;
                } else if (min_len == cur_end - cur_start) {
                    // 만약 길이가 같다면 시작 인덱스 값 비교
                    if (start > cur_start) {
                        start = cur_start;
                        end = cur_end;
                    }
                }
                sum -= sequence[cur_start++];
            } else if (sum < k) {
                // 합이 k보다 작을 경우 끝 인덱스를 늘림
                if (cur_end == n - 1) break;
                sum += sequence[++cur_end];
            } else {
                // 합이 k보다 클 경우 시작 인덱스를 땡김
                sum -= sequence[cur_start++];
            }
        }

        int[] answer = {start, end};
        return answer;
    }
}