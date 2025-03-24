# 호텔의 고객을 적어도 C명 늘이기 위해 형택이가 투자해야 하는 돈의 최솟값
import sys

input = sys.stdin.readline
C, N = map(int, input().split())
ad = []
INF = int(1e9)
dp = [INF] * (C+100)
dp[0] = 0

for _ in range(N):
    ad.append(list(map(int, input().split())))
    
for cost, customer in ad:
    for i in range(customer, C+100):
        dp[i] = min(dp[i-customer]+cost, dp[i])

print(min(dp[C:]))



