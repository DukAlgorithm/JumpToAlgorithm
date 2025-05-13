# https://school.programmers.co.kr/learn/courses/30/lessons/250134

# 퍼즐을 푸는데 필요한 턴의 최솟값
def move(maze, cr, cb, er, eb, vr, vb, n, m, cnt):
    
    if cr == er and cb == eb: # 모두 도착했다면
        return cnt
    
    next_red, next_blue = [], []
    
    # 빨간 수레
    if cr == er: # 도착했다면 움직이지 X
        next_red.append(cr)
    else:
        for nr in [(cr[0]+1, cr[1]), (cr[0], cr[1]+1), (cr[0]-1, cr[1]), (cr[0], cr[1]-1)]:
            if 0 <= nr[0] < n and 0 <= nr[1] < m and not vr[nr[0]][nr[1]] and maze[nr[0]][nr[1]] < 5:
                next_red.append(nr)
                
    # 파란 수레
    if cb == eb: # 도착했다면 움직이지 X
        next_blue.append(cb)
    else:
        for nb in [(cb[0]+1, cb[1]), (cb[0], cb[1]+1), (cb[0]-1, cb[1]), (cb[0], cb[1]-1)]:
            if 0 <= nb[0] < n and 0 <= nb[1] < m and not vb[nb[0]][nb[1]] and maze[nb[0]][nb[1]] < 5:
                next_blue.append(nb)
                            

    min_cnt = n*m + 1
    for nr in next_red:
        for nb in next_blue:
            if (nr != cb or nb != cr) and nr != nb:
                
                vr[nr[0]][nr[1]] = True
                vb[nb[0]][nb[1]] = True
                result = move(maze, nr, nb, er, eb, vr.copy(), vb.copy(), n, m, cnt+1)
                vr[nr[0]][nr[1]] = False
                vb[nb[0]][nb[1]] = False

                if result != -1:
                    min_cnt = min(min_cnt, result)
    
    return min_cnt
    

def solution(maze):
    answer = 0
    solved = False
    n, m = len(maze), len(maze[0])
    vb = [[False for _ in range(m)] for _ in range(n)]
    vr = [[False for _ in range(m)] for _ in range(n)]
    
    sb, eb, sr, er = (), (), (), () # 수레 시작/도착 칸
    for r in range(n):
        for c in range(m):
            if maze[r][c] == 1:
                sr = (r, c)
                vr[r][c] = True
            elif maze[r][c] == 2:
                sb = (r, c)
                vb[r][c] = True
            elif maze[r][c] == 3:
                er = (r, c)
            elif maze[r][c] == 4:
                eb = (r, c)
    
    answer = move(maze, sr, sb, er, eb, vr, vb, n, m, 0)
    
    return answer if answer <= n*m else 0