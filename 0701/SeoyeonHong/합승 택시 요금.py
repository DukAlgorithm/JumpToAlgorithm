# https://school.programmers.co.kr/learn/courses/30/lessons/72413
import heapq

def solution(n, s, a, b, fares):
    graph = [[] for _ in range(n+1)] # 인접 리스트
    INF = int(1e9)
    
    for c, d, f in fares:
        graph[c].append((d, f))
        graph[d].append((c, f))
    
    def dijkstra(start, fare):
        q = [(0, start)]
        fare[start] = 0
        while q:
            f, d = heapq.heappop(q)
            if fare[d] >= f:
                for nd, nf in graph[d]:
                    if f + nf < fare[nd]:
                        fare[nd] = f + nf
                        heapq.heappush(q, (f + nf, nd))
    
    toM = [INF for _ in range(n+1)]
    dijkstra(s, toM) # s번 지점으로부터 m번 지점까지의 최소 비용 계산(합승 요금)
    
    toA, toB = [INF for _ in range(n+1)], [INF for _ in range(n+1)]
    dijkstra(a, toA) # a번 지점에서 m번 지점까지의 최소 비용 계산(개인 요금)
    dijkstra(b, toB) # b번 지점에서 m번 지점까지의 최소 비용 계산(개인 요금)
    
        
    totalFares = [INF for _ in range(n+1)] # m번 지점까지 합승했을 때의 총 요금
    for m in range(1, n+1):
        totalFares[m] = toM[m] + toA[m] + toB[m]
                
    return min(totalFares)