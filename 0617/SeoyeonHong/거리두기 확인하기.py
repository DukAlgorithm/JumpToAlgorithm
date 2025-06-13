from collections import deque

def solution(places):
    answer = []
    N = 5
    def check_around(r, c):
        visited = [[False for _ in range(N)] for _ in range(N)]
        q = deque([(r, c)])
        visited[r][c] = True
    
        while q:
            cr, cc = q.popleft()
            for nr, nc in [(cr+1, cc), (cr, cc+1), (cr-1, cc), (cr, cc-1)]:
                if 0 <= nr < N and 0 <= nc < N and not visited[nr][nc]: # 대기실 범위인지 확인
                    if place[nr][nc] == 'P': # 사람이 있을 경우
                        return False
                    elif place[nr][nc] == 'O': # 빈 테이블이 있을 경우
                        if abs(r - nr) + abs(c - nc) < 2:
                            q.append((nr, nc))
                            visited[nr][nc] = True
        return True
                    
    for i in range(N): # 각 대기실에 대해
        flag = True
        place = places[i]
        for r in range(N):
            for c in range(N):
                if place[r][c] == 'P': # 사람이 있을 경우
                    flag = check_around(r, c) # 맨해튼 거리 2 이하인 곳 확인
                if not flag: # 거리두기를 지키고 있지 않다면 반복문 중지
                    break
            if not flag:
                break
        answer.append(1 if flag else 0)
                                
    return answer