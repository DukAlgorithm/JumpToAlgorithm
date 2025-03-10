# 결혼식에 초대할 사람의 수
n = int(input())
m = int(input())
friends = [[] * (n+1) for _ in range(n+1)] # 인접 리스트
for _ in range(m):
    a, b = map(int, input().split())
    friends[a].append(b)
    friends[b].append(a)

invite = [] # 초대할 동기 리스트

for close_friend in friends[1]: # 상근이의 친구들에 대해
    invite.extend([close_friend] + friends[close_friend]) # 상근이의 친구와 친구의 친구 추가

invite = set(invite) # 중복 요소 제거

if 1 in invite: # 상근이 자신이 리스트에 추가되었을 경우
    invite.remove(1) # 리스트에서 제거
    
print(len(invite))