import sys

input = sys.stdin.readline
N = int(input())
cost = []
min_cost = [[0, 0, 0] for _ in range(N)]

for _ in range(N):
    cost.append(list(map(int, input().split())))

min_cost[0] = cost[0]

for idx in range(1, N):
    for color in range(3):
        min_cost[idx][color] = cost[idx][color] + min(min_cost[idx-1][(color+1) % 3], min_cost[idx-1][(color+2) % 3])
    
print(min(min_cost[-1]))


# 시간 초과 - 우선순위 큐
# import sys
# import heapq

# input = sys.stdin.readline
# N = int(input())
# cost = []

# for _ in range(N):
#     cost.append(list(map(int, input().split())))

# q = [(0, 0, -1)]
# heapq.heapify(q)

# while q:
#     total_cost, idx, prev_color = heapq.heappop(q)
#     if idx == N:
#         print(total_cost)
#         break
#     for color in range(3):
#         if prev_color != color:
#             heapq.heappush(q, (total_cost + cost[idx][color], idx+1, color))
