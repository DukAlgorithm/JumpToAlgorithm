from collections import deque

N, K = map(int, input().split())

if N >= K:
    print(N - K)
else: # 수빈이가 동생보다 뒤에 있을 경우
    visited = [False] * (2 * K - N)
    visited[N] = True
    q = deque([(N, 0)])
    while q:
        l, t = q.popleft()
        if l == K:
            print(t)
            break

        for i in [l*2, l+1, l-1]:
            if 0 <= i < 2 * K - N and not visited[i]:
                visited[i] = True
                q.append((i, t+1))

    