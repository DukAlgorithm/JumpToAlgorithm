import sys
from collections import deque

input = sys.stdin.readline
M, N = map(int, input().split())
box = []
tomatoes = deque([])
day = 0

for r in range(N):
    row = list(map(int, input().split()))
    for c in range(M):
        if row[c] == 1:
            tomatoes.append((r, c))
    box.append(row)

while tomatoes:
    r, c = tomatoes.popleft()
    for dr, dc in [(1, 0), (0, 1), (-1, 0), (0, -1)]:
        nr, nc = r + dr, c + dc
        if 0 <= nr < N and 0 <= nc < M and box[nr][nc] == 0:
            tomatoes.append((nr, nc))
            box[nr][nc] = box[r][c] + 1

ready = True
for row in box:
    if 0 in row:
        ready = False
        break
    day = max(max(row), day)

print(day-1) if ready else print(-1)

    