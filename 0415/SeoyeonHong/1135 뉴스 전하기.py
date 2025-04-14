N = int(input())

num = list(map(int, input().split()))
graph = [[] for _ in range(N)]
for i in range(1, N):
    graph[num[i]].append(i)

def dfs(n):
    if not graph[n]:
        return 0
    
    times = []
    for child in graph[n]:
        times.append(dfs(child))
    
    times.sort(reverse=True) # 오름차순 정렬

    max_time = 0
    for i, t in enumerate(times):
        max_time = max(max_time, t + i + 1)
    
    return max_time

print(dfs(0))