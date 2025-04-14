from collections import deque

N, M = map(int, input().split())
index = list(map(int, input().split()))
q = deque([i for i in range(1, N+1)])
count = 0
for i in index:
    if i == q[0]:
        q.popleft()
    else:
        l = q.index(i)
        r = len(q) - l
        if l < r:
            q.rotate(-l)
            count += l
        else:
            q.rotate(r)
            count += r
        q.popleft()

print(count)
