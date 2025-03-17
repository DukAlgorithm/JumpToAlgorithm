import sys

input = sys.stdin.readline
N, M = map(int, input().split())
board = []
for _ in range(N):
    board.append(input())
min_count = N * M

def count_square(i, j):
    white, black = 0, 0
    color = 'W'
    for r in range(i, i+8):
        color = 'B' if color == 'W' else 'W'
        for c in range(j, j+8):
            if board[r][c] != color:
                white += 1
            else:
                black += 1
            if white >= min_count and black >= min_count:
                return min_count
            color = 'B' if color == 'W' else 'W'
    
    return min(white, black)

for i in range(N-7):
    for j in range(M-7):
        min_count = min(min_count, count_square(i, j))

print(min_count)