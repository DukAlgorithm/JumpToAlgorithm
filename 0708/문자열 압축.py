# 1개 이상 단위로 문자열을 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이
def compress(s, c):
    result = ''
    n = len(s)
    i = 0
    while i < n:
        part = s[i:i+c]
        repeated = 1
        while s[i+c:i+2*c] == part:
            repeated += 1
            i += c
        if repeated > 1:
            result += str(repeated) + part
        else:
            result += part
        i += c
    return len(result)

def solution(s):
    minLength = len(s)
    for i in range(1, len(s)//2+1):
        minLength = min(minLength, compress(s, i))
    return minLength