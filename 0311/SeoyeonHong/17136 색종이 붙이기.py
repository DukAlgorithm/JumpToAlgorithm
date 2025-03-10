# 1이 적힌 모든 칸을 붙이는데 필요한 색종이의 최소 개수
board = []
for _ in range(10):
    board.append(list(map(int, input().split())))

papers = [0, 5, 5, 5, 5, 5]
completed = True
min_count = 26

def place_paper(r, c, s):
    for i in range(r, r+s):
        for j in range(c, c+s):
            board[i][j] = 1 - board[i][j]


def coverable(r, c, s):
    if r+s > 10 or c+s > 10:
        return False
    for i in range(r, r+s):
        for j in range(c, c+s):
            if board[i][j] == 0:
                return False
    return True

def dfs(r, c, count):
    global min_count

    if count >= min_count: # 최솟값보다 큰 경우 가지치기
        return
    
    if r == 10: # 모두 탐색했을 경우
        min_count = min(min_count, count) # 최솟값 갱신
        return # 종료
    
    nr, nc = (r, c+1) if c < 9 else (r+1, 0)

    if board[r][c] == 0:
        dfs(nr, nc, count)
        return

    for s in range(5, 0, -1):
        if papers[s] > 0 and coverable(r, c, s):
            place_paper(r, c, s) # 색종이 붙이기
            papers[s] -= 1
            dfs(nr, nc, count+1)
            papers[s] += 1
            place_paper(r, c, s) # 색종이 떼기
    
dfs(0, 0, 0)

print(min_count) if min_count < 26 else print(-1)                