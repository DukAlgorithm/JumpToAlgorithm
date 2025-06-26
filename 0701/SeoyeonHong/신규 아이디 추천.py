# https://school.programmers.co.kr/learn/courses/30/lessons/72410
def solution(new_id):
    answer = ''
    for char in new_id.lower():
        if 96 < ord(char) < 123: # 알파벳 소문자일 경우
            answer += char
        elif char.isdigit() or char == '-' or char == '_':
            answer += char
        elif char == '.':
            if answer and answer[-1] != '.':
                answer += char
        
    if answer == '': # new_id가 빈 문자열일 경우 a 대입
        answer = 'a'
    elif len(answer) >= 16:
        answer = answer[:15]

    if answer[-1] == '.':
        answer = answer[:-1]
            
    if len(answer) <= 2:
        while len(answer) < 3:
            answer += answer[-1]
                            
    return answer