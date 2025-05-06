# https://school.programmers.co.kr/learn/courses/30/lessons/250136

from collections import deque

def solution(land):
    answer = 0
    R, C = len(land), len(land[0])
    visited = [[False] * C for _ in range(R)]
    oil = {}
    idx = 1
    for r in range(R):
        for c in range(C):
            if not visited[r][c] and land[r][c] == 1:
                amount = 0
                visited[r][c] = True
                q = deque([(r, c)])
                while q:
                    i, j = q.popleft()
                    land[i][j] = idx
                    amount += 1
                    for ni, nj in [(i+1, j), (i, j+1), (i-1, j), (i, j-1)]:
                        if 0 <= ni < R and 0 <= nj < C and not visited[ni][nj] and land[ni][nj] == 1:
                            visited[ni][nj] = True
                            q.append((ni, nj))
                oil[idx] = amount
                idx += 1
                
    for c in range(C):
        oil_set = set([])
        for r in range(R):
            if land[r][c] > 0:
                oil_set.update({land[r][c]})
        answer = max(sum(oil[o] for o in oil_set), answer)
    
    return answer