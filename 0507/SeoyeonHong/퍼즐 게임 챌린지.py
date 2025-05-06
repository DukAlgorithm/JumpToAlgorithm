# https://school.programmers.co.kr/learn/courses/30/lessons/340212

# 제한 시간 내에 퍼즐을 모두 해결하기 위한 숙련도의 최솟값
def solution(diffs, times, limit):
    answer = 0
    n = len(diffs)
    l, h = min(diffs), max(diffs)
    while l <= h:
        level = (l + h) // 2
        solved = True
        time_taken = 0
        for i in range(n):
            diff, time_cur, time_prev = diffs[i], times[i], times[i-1]
            if diff <= level:
                time_taken += time_cur
            else:
                time_taken += time_cur + (time_prev + time_cur) * (diff - level)
            
            if time_taken > limit:
                solved = False
                break
                                
        if solved:
            answer = level
            h = level - 1
        else:
            l = level + 1
                
    return answer