# https://school.programmers.co.kr/learn/courses/30/lessons/389479s
def solution(players, m, k):
    answer = 0
    time = len(players)
    server = [0] * time
    for i in range(time):
        if players[i] > m * server[i]:
            add = players[i] // m - server[i]
            answer += add
            for t in range(i, min(time, i+k)):
                server[t] += add
    
    return answer