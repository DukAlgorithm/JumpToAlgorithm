import math

N = int(input())
child = []
parent = []
for _ in range(N):
    A, B = map(int, input().split())
    gcd = math.gcd(A, B)
    child.append(A//gcd)
    parent.append(B//gcd)

new_parent = math.lcm(*parent)

new_child = []
for i in range(N):
    new_child.append(child[i] * new_parent//parent[i])

child_gcd = math.gcd(*new_child)

answer_gcd = math.gcd(child_gcd, new_parent)

print(child_gcd//answer_gcd, new_parent//answer_gcd)
