import math

def get_index(s):
    idx = 0
    for i in range(len(s)-1, -1, -1):
        idx += int(math.pow(26, len(s)-i-1) * (ord(s[i]) - 96))
    return idx
        
def get_string(n):
    s = ''
    if n < 26:
        s += chr(n + 97)
    else:
        s += get_string(math.floor(n / 26) - 1) + get_string(n % 26)
    return s
        
# 삭제가 완료된 주문서의 n번째 주문
def solution(n, bans):
    answer = ''
    bans.sort(key=lambda x: (len(x), x))
    idx = n
    for ban in bans:
        if get_index(ban) <= idx:
            idx += 1
    
    return get_string(idx-1)