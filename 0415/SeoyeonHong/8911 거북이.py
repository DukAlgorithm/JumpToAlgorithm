import sys

input = sys.stdin.readline
T = int(input())

for _ in range(T):
    min_x, max_x, min_y, max_y = 0, 0, 0, 0
    dx, dy = [0, 1, 0, -1], [1, 0, -1, 0]
    cmd = input()
    x, y, i = 0, 0, 0
    for c in cmd:
        if c == 'F':
            x += dx[i]
            y += dy[i]
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)
        elif c == 'B':
            x -= dx[i]
            y -= dy[i]
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)
        elif c == 'L':
            i = (i + 3) % 4
        elif c == 'R':
            i = (i + 1) % 4
    print((max_x - min_x) * (max_y - min_y))