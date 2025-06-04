# https://school.programmers.co.kr/learn/courses/30/lessons/67259

# 경주로를 건설하는 데 필요한 최소 비용
from collections import deque

def solution(board):
    answer = 0
    n = len(board)
    INF = int(1e9)
    min_cost = INF
    cost = [[[INF, INF] for _ in range(n)] for _ in range(n)]
    dr, dc = [1, 0, -1, 0], [0, 1, 0, -1]
    
    q = deque([(0, 0, 1), (0, 0, 2)])
    cost[0][0] = [0, 0]
    while q:
        r, c, d = q.popleft()
        
        if r == n-1 and c == n-1: # 도착했을 경우
            continue
            
        for i in range(4):
            nr, nc = r + dr[i], c + dc[i]
            if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == 0:
                if d % 2 == i % 2: # 직선도로일 경우
                    if cost[nr][nc][i%2] > cost[r][c][d%2] + 100:
                        cost[nr][nc][i%2] = cost[r][c][d%2] + 100
                        q.append((nr, nc, i%2))
                else: # 코너일 경우
                    if cost[nr][nc][i%2] > cost[r][c][d%2] + 600:
                        cost[nr][nc][i%2] = cost[r][c][d%2] + 600
                        q.append((nr, nc, i%2))
        
    return min(cost[n-1][n-1])