# https://school.programmers.co.kr/learn/courses/30/lessons/72414
from collections import defaultdict

def stringToSeconds(string):
    h, m, s = string.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

def secondsToString(seconds):
    h = seconds // 3600
    seconds %= 3600
    m = seconds // 60
    seconds %= 60
    s = seconds
    return '{0:02d}:{1:02d}:{2:02d}'.format(h, m, s)

def solution(play_time, adv_time, logs):
    answer = 0
    playTime = stringToSeconds(play_time) # 동영상 길이
    advTime = stringToSeconds(adv_time) # 광고 길이
    viewers = defaultdict(int) # 시청자 수
    changes = defaultdict(int) # 초별 시청자 수 변화
    
    for log in logs:
        start, end = log.split("-")
        start = stringToSeconds(start)
        end = stringToSeconds(end)
        changes[start] += 1
        changes[end] -= 1


    viewers[0] = changes[0]
    totalViewers = defaultdict(int)
    totalViewers[0] = viewers[0]
    for t in range(1, playTime+1):
        viewers[t] = viewers[t-1] + changes[t] # 1초 전의 시청자 수 + 추가/감소한 시청자 수

    for t in range(1, playTime + 1):
        totalViewers[t] = totalViewers[t-1] + viewers[t] # 0초 ~ t초 까지의 누적 시청 시간

    maxWatchTime = totalViewers[advTime - 1]

    for t in range(1, playTime - advTime+1):
        watchTime = totalViewers[t+advTime-1] - totalViewers[t-1]
        if maxWatchTime < watchTime:
            maxWatchTime = watchTime
            answer = t

    return secondsToString(answer)