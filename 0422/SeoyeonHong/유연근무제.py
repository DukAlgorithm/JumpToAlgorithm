# https://school.programmers.co.kr/learn/courses/30/lessons/388351

def solution(schedules, timelogs, startday):
    n, days, count = len(schedules), 7, 0
    deadlines = [schedules[i]//100*60 + schedules[i]%100 + 10 for i in range(n)] # 출근 희망 시각 + 10분

    for d in range(days):
        if not (0 < (startday + d) % days < 6):
            for timelog in timelogs:
                timelog[d] = 0 # 주말 제외
                
    for i in range(n):
        time = max(timelogs[i]) # 가장 늦은 출근 시각
        time = time//100*60 + time%100
        if deadlines[i] >= time:
            count += 1
            
    return count