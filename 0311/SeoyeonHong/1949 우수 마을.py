# 주어진 조건을 만족하도록 '우수 마을'을 선정, '우수 마을' 주민 수의 총 합의 최댓값 구하기
import sys

sys.setrecursionlimit(10**6)
input = sys.stdin.readline
N = int(input())
adjacency_list = [[] for _ in range(N+1)]
population = [0] + list(map(int, input().split()))
visited = [False for _ in range(N+1)]
dp = [[0, 0] for _ in range(N+1)] # dp[i][0]: i번째 마을이 우수 마을이 아닐 때, dp[i][1]: i번째 마을이 우수 마을일 때

for _ in range(N-1):
    a, b = map(int, input().split())
    adjacency_list[a].append(b)
    adjacency_list[b].append(a)

def dfs(cur):
    visited[cur] = True
    dp[cur][1] = population[cur]
    for neighbor in adjacency_list[cur]:
        if not visited[neighbor]:
            dfs(neighbor)
            dp[cur][1] += dp[neighbor][0]
            dp[cur][0] += max(dp[neighbor])

dfs(1)
print(max(dp[1]))