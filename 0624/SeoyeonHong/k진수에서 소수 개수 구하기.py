# n을 k진수로 변환한 수 안에 조건을 만족하는 소수의 개수
import math

def isPrimeNumber(num):
    if num == 1:
        return False
    for i in range(2, int(math.sqrt(num)) + 1):
        if num % i == 0:
            return False
    return True

def solution(n, k):
    count = 0
    converted = ''
    
    while n > 0:    # n을 k진법으로 변환
        converted += str(n % k)
        n //= k
    converted = converted[::-1]
        
    numbers = converted.split('0') # 0을 기준으로 숫자 분리
    
    for num in numbers: # 소수인지 확인
        if num.isdigit() and isPrimeNumber(int(num)):
            count += 1

    return count