# https://school.programmers.co.kr/learn/courses/30/lessons/17681?language=python3

def solution(n, arr1, arr2):
    answer = []
    for i in range(n):
        num1 = bin(arr1[i])[2:].zfill(n)
        num2 = bin(arr2[i])[2:].zfill(n)
        row = ''
        for j in range(n):
            if num1[j] == '0' and num2[j] == '0':
                row += ' '
            else:
                row += '#'
        answer.append(row)        
    return answer