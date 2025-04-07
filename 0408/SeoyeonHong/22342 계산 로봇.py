# 부분성공(41점)
import sys

input = sys.stdin.readline
M, N = map(int, input().split())
w = []
for _ in range(M):
    w.append(list(map(int, list(input().rstrip()))))

rinput = [[[] for _ in range(N)] for _ in range(M)]
rsaved = [[0 for _ in range(N)] for _ in range(M)]
routput = [[0 for _ in range(N)] for _ in range(M)]
max_saved = 0

for j in range(N):
    for i in range(M):
        if j == 0:
            rinput[i][j] = 0
            rsaved[i][j] = 0
            routput[i][j] = w[i][j]
        else:
            nums = []
            for a in range(max(0, i-1), min(M, i+2)):
                for b in range(max(0, j-1), j):
                    nums.append(routput[a][b])

            rinput[i][j].extend(nums)
            rsaved[i][j] = max(rinput[i][j])
            routput[i][j] = rsaved[i][j] + w[i][j]

for i in range(M):
    max_saved = max(max_saved, rsaved[i][-1])

print(max_saved)
