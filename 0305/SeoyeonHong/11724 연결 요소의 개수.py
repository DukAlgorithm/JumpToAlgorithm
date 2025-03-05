import sys
sys.setrecursionlimit(50000000)
input = sys.stdin.readline
N, M = map(int, input().split())
graph = [[] for _ in range(N+1)]
visited = [False for _ in range(N+1)]
count = 0

for _ in range(M):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)

def dfs(s):
    for v in graph[s]:
        if not visited[v]:
            visited[v] = True
            dfs(v)

for i in range(1, N+1):
    if not visited[i]:
        visited[i] = True
        dfs(i)
        count += 1

print(count)