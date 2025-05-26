# https://school.programmers.co.kr/learn/courses/30/lessons/68646
# 규칙대로 풍선들을 1개만 남을 때까지 터트렸을 때 최후까지 남기는 것이 가능한 풍선들의 개수
def solution(a):
    answer = 2
    N = len(a)
    if N == 1:
        answer = 1
    else:
        left_min, right_min = [0] * N, [0] * N
        
        # 왼쪽 최솟값
        left_min[0] = a[0]
        for i in range(1, N):
            left_min[i] = min(left_min[i-1], a[i])
            
        # 오른쪽 최솟값
        right_min[N-1] = a[N-1]
        for i in range(N-2, -1, -1):
            right_min[i] = min(right_min[i+1], a[i])
        
        for i in range(1, N-1):
            if a[i] <= left_min[i-1] or a[i] <= right_min[i+1]: # 왼쪽 또는 오른쪽에 a[i]보다 작은 수가 없을 경우
                answer += 1
            
    return answer