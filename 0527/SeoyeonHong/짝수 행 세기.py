# https://school.programmers.co.kr/learn/courses/30/lessons/68647
# 시간 초과
from collections import defaultdict
from itertools import product

MOD = 10**7 + 19

def solution(a):
    R, C = len(a), len(a[0])
    
    # 목표 열 합 구하기
    cnt_a = [0] * C
    for r in range(R):
        for c in range(C):
            cnt_a[c] += a[r][c]
    
    # 첫 번째 행 선택 상태 초기화 (모두 0으로 시작)
    dp = defaultdict(int)
    dp[tuple([0]*C)] = 1

    # 각 행을 하나씩 추가하면서 DP 갱신
    for _ in range(R):
        next_dp = defaultdict(int)
        
        # 가능한 행 선택: 짝수 개수의 1 선택
        for row_choice in product([0,1], repeat=C-1):
            parity = sum(row_choice) % 2
            row = list(row_choice) + [parity]

            # 현재 DP 상태들 순회
            for cnt_b, ways in dp.items():
                # 새로운 열 합 계산
                new_cnt_b = tuple(cnt_b[c] + row[c] for c in range(C))
                
                # Pruning: 목표 합보다 큰 경우는 스킵
                if any(new_cnt_b[c] > cnt_a[c] for c in range(C)):
                    continue
                
                # 상태 갱신
                next_dp[new_cnt_b] = (next_dp[new_cnt_b] + ways) % MOD
        
        dp = next_dp
    
    # 최종 결과 반환
    return dp[tuple(cnt_a)] % MOD
