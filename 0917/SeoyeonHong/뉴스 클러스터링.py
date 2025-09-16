# https://school.programmers.co.kr/learn/courses/30/lessons/17677

from collections import defaultdict

def solution(str1, str2):
    similarity = 1
    
    # 모두 소문자로 변환
    str1 = str1.lower()
    str2 = str2.lower()
    
    subset1 = defaultdict(int)
    subset2 = defaultdict(int)
    subsetUnion = defaultdict(int)
    
    for i in range(len(str1)-1):
        if str1[i].isalpha() and str1[i+1].isalpha():
            subset1[str1[i:i+2]] += 1
            subsetUnion[str1[i:i+2]] += 1
    
    for i in range(len(str2)-1):
        if str2[i].isalpha() and str2[i+1].isalpha():
            subset2[str2[i:i+2]] += 1
            subsetUnion[str2[i:i+2]] += 1
            
    intersection = 0
    union = 0
    for element in subsetUnion:
        intersection += min(subset1[element], subset2[element])
        union += max(subset1[element], subset2[element])
            
    if subset1 or subset2:
        similarity = intersection / union 
    
    
    return int(similarity * 65536) # 65536을 곱한 후에 소수점 아래를 버리고 정수부만 출력