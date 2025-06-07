# https://school.programmers.co.kr/learn/courses/30/lessons/67258
# 모든 종류의 보석을 1개 이상 포함하는 가장 짧은 구간
def solution(gems):
    gem_set = list(set(gems)) # 보석의 종류
    n = len(gems) # 진열대에 있는 물건 개수
    m = len(gem_set) # 보석 종류의 개수
    answer = [1, n] # 가장 짧은 구간
    min_length = n # 가장 짧은 구간의 길이
    start, end = 0, 0
    count = {gem: 0 for gem in gems}
    count[gems[0]] += 1
    selected = 1
    
    while n - start >= m:
        if selected < m: # 모든 종류의 보석을 포함하지 않으면
            if end < n-1: # 구간을 늘릴 수 있으면
                # 구간의 끝 위치 이동
                end += 1
                if count[gems[end]] == 0:
                    selected += 1
                count[gems[end]] += 1
            else:
                break
        else: # 모든 종류의 보석을 포함하고 있다면
            l = end - start + 1 # 선택한 구간의 길이
            if l < min_length: # 가장 짧은 구간 갱신
                min_length = l
                answer = [start+1, end+1]
            
            if min_length == m: # 가장 짧은 구간을 구했을 경우
                break

            # 구간 시작 위치 이동
            count[gems[start]] -= 1 
            if count[gems[start]] == 0:
                selected -= 1
            start += 1
        
    return answer