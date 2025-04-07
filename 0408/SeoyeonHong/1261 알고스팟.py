import sys
import heapq

input = sys.stdin.readline
N, M = map(int, input().split()) # 가로(열), 세로(행)
maze = []
for _ in range(M):
    maze.append(list(map(int, list(input().rstrip()))))
dr, dc = [1, 0, -1, 0], [0, 1, 0, -1]
visited = [[False for _ in range(N)] for _ in range(M)]
visited[0][0] = True
q = []
heapq.heappush(q, (0, 0, 0))
while q:
    cnt, r, c = heapq.heappop(q) # 행, 열, 부순 벽의 개수
    if r == M-1 and c == N-1: # 목적지에 도착했다면
        print(cnt)
        break # 부순 벽의 최소 개수 갱신
    else:
        for i in range(4): # 네 방향에 대해
            nr, nc = r + dr[i], c + dc[i]
            if 0 <= nr < M and 0 <= nc < N and not visited[nr][nc]: # 미로 내 범위인지 확인
                visited[nr][nc] = True
                heapq.heappush(q, (cnt+maze[nr][nc], nr, nc))