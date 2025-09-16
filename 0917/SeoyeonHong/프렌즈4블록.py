# https://school.programmers.co.kr/learn/courses/30/lessons/17679

def solution(m, n, board):
    answer = 0
    changed = False
    remove = set([])
    
    for i in range(m):
        board[i] = list(board[i])
    
    while True:
        for r in range(m-1):
            for c in range(n-1):
                if board[r][c] == board[r][c+1] == board[r+1][c] == board[r+1][c+1] != ' ': # 2 x 2 형태일 경우
                    remove.update([(r, c), (r, c+1), (r+1, c), (r+1, c+1)])
                    
        if remove:
            answer += len(remove)
            for r, c in remove:
                board[r][c] = ' ' # 블록 지우기
            for c in range(n):
                for r in range(m-1, 0, -1):
                    if board[r][c] == ' ': # 빈 공간이 있을 경우
                        for ur in range(r-1, -1, -1):
                            if board[ur][c] != ' ': # 위에 블록이 존재하면
                                board[r][c] = board[ur][c] # 떨어지기
                                board[ur][c] = ' '
                                break
            remove = set([])
        else:
            break
    return answer