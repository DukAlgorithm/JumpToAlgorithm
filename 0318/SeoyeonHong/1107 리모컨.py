# 채널 N으로 이동하기 위해서 버튼을 최소 몇 번 눌러야하는지 
N = int(input())
M = int(input())
broken = []
if M > 0:
    broken = list(input().split())
min_count = abs(N - 100)

def can_make_number(num):
    for n in num:
        if n in broken:
            return False
    return True

for i in range(abs(N-100)):
    possible = []
    if N-i >= 0 and can_make_number(str(N-i)):
        possible.append(str(N-i))
    if can_make_number(str(N+i)):
        possible.append(str(N+i))
    
    if possible:
        min_count = min(min_count, i + len(possible[0]))

print(min_count)

