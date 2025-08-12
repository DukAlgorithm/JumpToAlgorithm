# https://school.programmers.co.kr/learn/courses/30/lessons/178870
def solution(sequence, k):
    l = len(sequence)
    answer = [0, l-1]
    min_len = l
    
    start, end = 0, 0
    sub_sum = sequence[0]
    while start <= end < l:
        if sub_sum < k and end < l-1: # 부분 수열의 합이 k보다 작고 end를 증가시킬 수 있다면
            end += 1
            sub_sum += sequence[end]
        elif sub_sum < k: # 부분 수열의 합이 k보다 작고 end가 l-1이라면 종료
            break
        elif sub_sum >= k: # 부분 수열의 합이 k이상이면 start + 1
            if sub_sum == k and min_len > end - start + 1: # 부분수열의 합이 k이면
                min_len = end - start + 1 # 길이가 짧은 수열 갱신
                answer = [start, end] 
            sub_sum -= sequence[start]
            start += 1
            if end < start < l:
                end += 1
                sub_sum += sequence[end]
                            
    return answer