# https://school.programmers.co.kr/learn/courses/30/lessons/340210

def convert(num, b):
    rev_base = ''

    while num > 0:
        num, mod = divmod(num, b)
        rev_base += str(mod)
    
    return rev_base[::-1] if rev_base else 0

def solution(expressions):
    erased = []
    base = [2, 3, 4, 5, 6, 7, 8, 9]
    max_num = 0

    for expression in expressions:
        for s in expression:
            if s.isdigit():
                max_num = max(max_num, int(s))

        for i in range(1, max_num+1):
            if i in base:
                base.remove(i)

        A, operator, B, _, C = expression.split()
        
        if C == 'X':
            erased.append(f"{A} {operator} {B} = ?")
        else:
            unavailable = []
            for b in base:
                if operator == '+':
                    if int(A, b) + int(B, b) != int(C, b):
                        unavailable.append(b)
                else:
                    if int(A, b) - int(B, b) != int(C, b):
                        unavailable.append(b)
            for b in unavailable:
                base.remove(b)
                                    
    for i in range(len(erased)):
        A, operator, B, _, C = erased[i].split()
        results = []
        for b in base:
            if operator == '+':
                result = int(A, b) + int(B, b)
            else:
                result = int(A, b) - int(B, b)
            result = str(convert(result, b))
                    
            results.append(result)
        
        
        if len(set(results)) == 1:
            erased[i] = f'{A} {operator} {B} = {results[0]}'
    
    return erased
