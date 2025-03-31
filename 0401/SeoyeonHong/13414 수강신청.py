import sys

input = sys.stdin.readline
K, L = map(int, input().split())
order = {}
count = 0
for _ in range(L):
    sid = input().rstrip()
    order[sid] = count
    count += 1

students = sorted(list(order.items()), key=lambda x: x[1])

for student in students[:K]:
    print(student[0])