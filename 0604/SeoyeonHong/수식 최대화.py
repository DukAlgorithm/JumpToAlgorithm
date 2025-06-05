# https://school.programmers.co.kr/learn/courses/30/lessons/67257

from itertools import permutations
import re
from collections import deque

def solution(expression):
    max_num = eval("".join(expression)) # 상금의 최댓값
    operators = ['+', '-', '*'] # 연산자
    exp = re.split(r'(\+|-|\*)', expression) # 피연산자, 연산자가 구분된 리스트 생성
    
    for operands in permutations(operators, 3): # 각 연산자 우선순위 조합에 대해해
        stack = deque(exp)
        for operand in operands:
            result = []
            while stack:
                op = stack.popleft()
                if op == operand:
                    result.append(str(eval(result.pop()+op+stack.popleft())))
                else:
                    result.append(op)
            stack = deque(result)
        max_num = max(max_num, abs(int(stack[0])))
            
    return max_num