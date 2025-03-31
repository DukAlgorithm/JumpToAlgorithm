import sys
import heapq

input = sys.stdin.readline
INF = int(1e9)

N, E = map(int, input().split())
graph = [[] for _ in range(N+1)]
for _ in range(E):
    a, b, c = map(int, input().split())
    graph[a].append((b, c))
    graph[b].append((a, c))

u, v = map(int, input().split()) # 반드시 거쳐야 하는 두 정점

def dijkstra(start, end):
    distance = [INF] * (N+1)
    q = [[start, 0]]
    distance[start] = 0

    while q:
        cur, dist = heapq.heappop(q)
        if distance[cur] < dist:
            continue
        
        for n, d in graph[cur]:
            if dist + d < distance[n]:
                distance[n] = dist + d
                heapq.heappush(q, (n, dist+d))
    
    return distance[end]

su = dijkstra(1, u)
sv = dijkstra(1, v)
uv = dijkstra(u, v)
ve = dijkstra(v, N)
ue = dijkstra(u, N)

min_dist = min(su + uv + ve, sv + uv + ue)
print(min_dist if min_dist < INF else -1)

