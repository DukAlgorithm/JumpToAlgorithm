# https://school.programmers.co.kr/learn/courses/30/lessons/81303
# 모든 명령어를 수행한 후 표의 상태와 처음 주어진 표의 상태를 비교
def solution(n, k, cmd):
    answer = ['O'] * n
    prev = list(range(-1, n-1))
    next = list(range(1, n+1))
    cur = k
    deleted = []
    for c in cmd:
        s = c.split()
        if s[0] == 'U':
            for _ in range(int(s[1])):
                cur = prev[cur]
        elif s[0] == 'D':
            for _ in range(int(s[1])):
                cur = next[cur]
        elif s[0] == 'C':     
            deleted.append(cur)
            if prev[cur] != -1: # 마지막 요소 제거할 경우
                next[prev[cur]] = next[cur]
            if next[cur] != n:# 첫번째 요소 제거할 경우
                prev[next[cur]] = prev[cur]
            
            cur = next[cur] if next[cur] != n else prev[cur]
        else: # 되돌리기
            d = deleted.pop()
            if prev[d] != -1:
                next[prev[d]] = d
            if next[d] != n:
                prev[next[d]] = d

    for d in deleted:
        answer[d] = 'X'
    
    return ''.join(answer)