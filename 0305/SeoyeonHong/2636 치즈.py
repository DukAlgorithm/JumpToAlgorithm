import sys
from collections import deque

input = sys.stdin.readline
R, C = map(int, input().split())
board = []
cheese = 0 # 치즈의 개수
time = 0
for _ in range(R):
    row = list(map(int, input().split()))
    cheese += row.count(1)
    board.append(row)

while cheese > 0:
    melt = 0
    visited = [[False] * C for _ in range(R)]
    visited[0][0] = True
    q = deque([(0, 0)])
    new_air = []
    while q:
        r, c = q.popleft()
        for dr, dc in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < R and 0 <= nc < C and not visited[nr][nc]:
                visited[nr][nc] = True
                if board[nr][nc] == 0:
                    q.append((nr, nc))
                else:
                    new_air.append((nr, nc))
    melt = len(new_air)
    cheese -= melt
    time += 1

    for r, c in new_air:
        board[r][c] = 0

print(time)
print(melt)

    
        
            

        