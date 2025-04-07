# Python3 시간초과, PyPy3 통과
import sys
from collections import deque

sys.setrecursionlimit(10000)
input = sys.stdin.readline
N, M = map(int, input().split())
graph = [[] for _ in range(N+1)]
for _ in range(M):
    A, B = map(int, input().split())
    graph[B].append(A)

dp = [1 for _ in range(N+1)]
checked = [False] * (N+1)

def bfs(n):
    visited = [False for _ in range(N+1)]
    count = 0
    q = deque([n])
    visited[n] = True
    while q:
        v = q.popleft()
        count += 1
        for nv in graph[v]:
            if not visited[nv]:
                visited[nv] = True
                q.append(nv)
    return count

related = {i: 1 for i in range(1, N+1)}
for i in range(1, N+1):
    related[i] = bfs(i)
related = list(related.items())
related.sort(key=lambda x: (-x[1], x[0]))

answer = []
max_count = related[0][1]
for computer, count in related:
    if count != max_count:
        break
    answer.append(computer)

print(*answer)

# 메모리 초과
# import sys

# sys.setrecursionlimit(10000)
# input = sys.stdin.readline
# N, M = map(int, input().split())
# graph = [[] for _ in range(N+1)]
# for _ in range(M):
#     A, B = map(int, input().split())
#     graph[B].append(A)

# dp = [set([i]) for i in range(N+1)]
# checked = [False] * (N+1)

# def dfs(n):
#     global dp
#     checked[n] = True
#     for c in graph[n]: # n번째 컴퓨터를 신뢰하는 컴퓨터들에 대해
#         if not checked[c]:
#             dfs(c)
#         dp[n].update(dp[c])
#     return

# for i in range(1, N+1):
#     if graph[i] and not checked[i]: # i번째 컴퓨터를 신뢰하는 컴퓨터가 있으면
#         dfs(i)
# result = []
# for i in range(1, N+1):
#     result.append((i, len(dp[i])))
# result.sort(key=lambda x: (-x[1], x[0]))
# max_num = result[0][1]
# answer = []

# for computer, n in result:
#     if n < max_num:
#         break
#     answer.append(computer)
# print(*answer)
    