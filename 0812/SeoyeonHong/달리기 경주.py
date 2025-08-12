# https://school.programmers.co.kr/learn/courses/30/lessons/178871
def solution(players, callings):
    answer = []
    n = len(players)
    findByName = {players[i]: i for i in range(n)}
    findByRanking = {i: players[i] for i in range(n)}
    
    for name in callings:
        a = name
        a_ranking = findByName[a]
        b = findByRanking[a_ranking-1]
        findByName[a] = a_ranking-1
        findByName[b] = a_ranking
        findByRanking[a_ranking] = b
        findByRanking[a_ranking-1] = a
        
    for i in range(n):
        answer.append(findByRanking[i])
    return answer