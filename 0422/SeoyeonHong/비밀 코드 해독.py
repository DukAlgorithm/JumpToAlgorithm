# https://school.programmers.co.kr/learn/courses/30/lessons/388352
# 비밀 코드로 가능한 정수 조합 개수
from itertools import combinations

def solution(n, q, ans):
    answer = 0
    for combination in combinations(range(1, n+1), 5):
        candidate = True
        for i in range(len(q)):
            count = 0
            for a in q[i]:
                if a in combination:
                    count += 1
            if count != ans[i]:
                candidate = False
                break
        if candidate:
            answer += 1
        
    return answer