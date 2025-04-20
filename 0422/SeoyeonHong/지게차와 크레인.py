# https://school.programmers.co.kr/learn/courses/30/lessons/388353

# 모든 요청을 순서대로 완료한 후 남은 컨테이너의 수
from collections import deque

def solution(storage, requests):
    n, m = len(storage), len(storage[0])
    storage = [list(storage[i]) for i in range(n)]
    count = n * m
    for request in requests:
        delivery = []
        if len(request) == 1: # 외부와 연결된 요청된 종류의 컨테이너 모두 꺼내기
            visited = [[False for _ in range(m)] for _ in range(n)]
            for i in range(n):
                for j in range(m):
                    if i == 0 or i == n-1 or j == 0 or j == m-1: # 외부와 연결된 경우
                        if not visited[i][j] and storage[i][j] == request:
                            visited[i][j] = True
                            delivery.append((i, j))
                        if storage[i][j] == '' and not visited[i][j]:
                            visited[i][j] = True
                            q = deque([(i, j)])
                            while q:
                                r, c = q.popleft()
                                for nr, nc in [(r+1, c), (r, c+1), (r-1, c), (r, c-1)]:
                                    if 0 <= nr < n and 0 <= nc < m and not visited[nr][nc]:
                                        visited[nr][nc] = True
                                        if storage[nr][nc] == '':
                                            q.append((nr, nc))
                                        elif storage[nr][nc] == request:
                                            delivery.append((nr, nc))                                
            count -= len(delivery)                            
            for r, c in delivery:
                storage[r][c] = ''
                            
        else: # 요청된 종류의 모든 컨테이너 꺼내기
            for i in range(n):
                for j in range(m):
                    if storage[i][j] == request[0]:
                        storage[i][j] = ''
                        count -= 1
    return count