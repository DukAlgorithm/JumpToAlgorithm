import sys

input = sys.stdin.readline
N = int(input())
serial_numbers = []

for _ in range(N):
    num = input().rstrip()
    l = len(num)
    s = 0
    for n in num:
        if str.isdigit(n):
            s += int(n)
    serial_numbers.append((l, s, num))

serial_numbers.sort()

for serial_number in serial_numbers:
    print(serial_number[2])

