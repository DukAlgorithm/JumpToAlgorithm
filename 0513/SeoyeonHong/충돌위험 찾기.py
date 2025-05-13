# https://school.programmers.co.kr/learn/courses/30/lessons/340211
# 모든 로봇이 운송을 마칠 때까지 발생하는 위험한 상황의 횟수
from collections import Counter

def find_path(r, c, er, ec):
    path = []

    # 세로로 먼저 이동
    if r < er:
        while r < er:
            r += 1
            path.append((r, c))
    elif r > er:
        while r > er:
            r -= 1
            path.append((r, c))
        
    # 가로로 이동
    if c < ec:
        while c < ec:
            c += 1
            path.append((r, c))
    elif c > ec:
        while c > ec:
            c -= 1
            path.append((r, c))

    return path

            
def solution(points, routes):
    answer = 0
    path = [[(points[routes[i][0]-1])] for i in range(len(routes))]
    for i in range(len(routes)):
        route = routes[i]
        for j in range(len(route)-1):
            r, c = points[route[j] - 1]
            er, ec = points[route[j+1] - 1]
            path[i].extend(find_path(r, c, er, ec))
    
    max_time = 0
    for p in path:
        max_time = max(max_time, len(p))
        
    for time in range(max_time):
        pos = []
        for p in path:
            if time < len(p):
                pos.append((p[time][0], p[time][1]))

        counter = Counter(pos)
        for cnt in counter:
            if counter[cnt] > 1: # 같은 칸에 1개 이상의 로봇이 위치할 경우
                answer += 1
    return answer