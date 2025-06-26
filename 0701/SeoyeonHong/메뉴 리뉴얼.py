# https://school.programmers.co.kr/learn/courses/30/lessons/72411
from collections import defaultdict
from itertools import combinations

def solution(orders, course):
    answer = []
    count = [defaultdict(int) for _ in range(len(course))]
    
    for order in orders:
        order = sorted(order)
        for c in range(len(course)):
            if course[c] <= len(order):
                for combination in combinations(order, course[c]):
                    count[c][''.join(combination)] += 1
    
    options = [list(count[i].items()) for i in range(len(course))]

    for option in options:
        if option:
            option.sort(key=lambda x: (-x[1], x[0]))
            if option[0][1] >= 2:
                for candidate, ordered in option:
                    if ordered == option[0][1]:
                        answer.append(candidate)
                    else:
                        break
    return sorted(answer)