import heapq

def solution(info, n, m):
    answer = 120
    info.sort(key= lambda x: (-x[1], -x[0]))
    q = [(0, 0, 0)]
    visited = set()
    heapq.heapify(q)
    l = len(info)
    while q:
        A, B, i = heapq.heappop(q)
        if i == l:
            answer = A
            break
        else:
            if(A, B, i) in visited:
                continue
            visited.add((A, B, i))
            if A + info[i][0] < n:
                heapq.heappush(q, (A + info[i][0], B, i+1))
            if B + info[i][1] < m:
                heapq.heappush(q, (A, B + info[i][1], i+1))
                
    return answer if answer < 120 else -1