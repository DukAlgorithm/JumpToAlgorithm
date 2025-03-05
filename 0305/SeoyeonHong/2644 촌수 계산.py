import sys
from collections import deque

input = sys.stdin.readline
n = int(input())
a, b = map(int, input().split())
m = int(input())
graph = [[] for _ in range(n+1)]
visited = [False for _ in range(n+1)]
relative = False
for _ in range(m):
    x, y = map(int, input().split())
    graph[x].append(y)
    graph[y].append(x)

q = deque([(a, 0)])
visited[a] = True

while q:
    cur, cnt = q.popleft()
    if cur == b:
        print(cnt)
        relative = True
        break
    for next in graph[cur]:
        if not visited[next]:
            visited[next] = True
            q.append((next, cnt+1))

if not relative:
    print(-1)
    