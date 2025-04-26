# https://school.programmers.co.kr/learn/courses/30/lessons/389478

import math

def solution(n, w, num):
    answer = 0
    h = math.ceil(n / w)
    storage = [[0] * w for _ in range(h)]
    for i in range(n):
        row = i // w
        col = i % w if row % 2 == 0 else - 1 - (i % w)
        storage[row][col] = i + 1
    
            
    for r in range(h):
        if num in storage[r]:
            col = storage[r].index(num)
            return sum(1 for row in range(r, h) if storage[row][col] != 0) 