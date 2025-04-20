# https://school.programmers.co.kr/learn/courses/30/lessons/388354

# 홀짝 트리가 될 수 있는 트리의 개수와 역홀짝 트리가 될 수 있는 트리의 개수
from collections import deque

def solution(nodes, edges):
    answer = [0, 0]
    trees = []
    graph = {i: [] for i in nodes} # 인접 노드 리스트
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
        
    visited = {i: False for i in nodes}
    for node in nodes: # node가 루트 노드일 때
        if not visited[node]:
            tree = []
            visited[node] = True
            q = deque([node])
            while q:
                n = q.popleft()
                tree.append(n)
                for neighbor in graph[n]:
                    if not visited[neighbor]:
                        visited[neighbor] = True
                        q.append(neighbor)
            trees.append(tree)
                
    for tree in trees:
        for root in tree:
            if root % 2 == len(graph[root]) % 2:
                even_odd_tree = True
                for node in tree:
                    if node != root:
                        if (len(graph[node]) - 1) % 2 != node % 2:
                            even_odd_tree = False
                            break
                if even_odd_tree:
                    answer[0] += 1
            else:
                reverse_even_odd_tree = True
                for node in tree:
                    if node != root:
                        if (len(graph[node]) - 1) % 2 == node % 2:
                            reverse_even_odd_tree = False
                            break
                if reverse_even_odd_tree:
                    answer[1] += 1
            
    return answer