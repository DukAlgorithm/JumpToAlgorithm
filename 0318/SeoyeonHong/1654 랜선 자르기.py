# 만들 수 있는 최대 랜선의 길이
import sys

input = sys.stdin.readline
K, N = map(int, input().split())
cables = []
for _ in range(K):
    cables.append(int(input()))
cables.sort()

s, l = 1, cables[K-1]
while s <= l:
    m = (s + l) // 2
    count = 0
    for cable in cables:
        count += cable // m
    if count < N:
        l = m - 1
    else:
        s = m + 1

print(l)