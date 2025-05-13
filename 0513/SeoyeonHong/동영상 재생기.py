# https://school.programmers.co.kr/learn/courses/30/lessons/340213
# 사용자의 입력이 모두 끝난 후 동영상의 위치
def to_seconds(string):
    m, s = string.split(':')
    return int(m) * 60 + int(s)

def solution(video_len, pos, op_start, op_end, commands):
    answer = ''
    video_len = to_seconds(video_len)
    pos = to_seconds(pos)
    op_start = to_seconds(op_start)
    op_end = to_seconds(op_end)
    
    for command in commands:
        if command == "prev":
            pos = max(0, pos-10) # 뒤로 돌리기
        else:
            if op_start <= pos <= op_end: # 오프닝 건너뛰기
                pos = op_end
            pos = min(video_len, pos+10) # 앞으로 돌리기
            
        if op_start <= pos <= op_end: # 오프닝 건너뛰기
            pos = op_end
    
    m = str(pos // 60)
    s = str(pos % 60)
    answer = m.zfill(2) + ':' + s.zfill(2)
    return answer