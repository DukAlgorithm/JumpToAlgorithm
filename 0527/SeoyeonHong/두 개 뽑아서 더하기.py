# https://school.programmers.co.kr/learn/courses/30/lessons/68644
from itertools import combinations

def solution(numbers):
    answer = []
    for combination in combinations(numbers, 2):
        answer.append(sum(combination))
    answer = list(set(answer))
    answer.sort()
    return answer