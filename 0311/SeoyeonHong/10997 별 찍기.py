N = int(input())
C = 4 * N - 3 # 가로 길이
R = 4 * N - 1 # 세로 길이
board = [[' '] * (C) for _ in range(R)]

def draw_star(n, r, c):
    if n == 1:
        board[r][c] = '*'
        board[r+1][c] = '*'
        board[r+2][c] = '*'
    else:
        for _ in range(4 * n - 4): # 위쪽
            board[r][c] = '*'
            c -= 1
        
        for _ in range(4 * n - 2): # 오른쪽
            board[r][c] = '*'
            r += 1

        for _ in range(4 * n - 4): # 아래쪽
            board[r][c] = '*'
            c += 1

        for _ in range(4 * n - 4): # 왼쪽
            board[r][c] = '*'
            r -= 1

        board[r][c] = '*'
        board[r][c-1] = '*'
        draw_star(n-1, r, c-2)


if N == 1:
    print('*')
else:
    draw_star(N, 0, C-1)
    for row in board:
        print(''.join(row).rstrip())