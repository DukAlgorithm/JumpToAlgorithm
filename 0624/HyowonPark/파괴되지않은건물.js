
/**
function solution(board, skill) {
    for ([t, r1, c1, r2, c2, d] of skill) {
        for (let i = r1; i <= r2; i ++) {
            for (let j = c1; j <= c2; j ++) {
                if (t === 1) {
                    board[i][j] -= d;
                } else {
                    board[i][j] += d;
                }
            }
        }
    }

    return board.flat().filter(e => e >= 1).length;
}
 */

function solution(board, skill) {
    const n = board.length;
    const m = board[0].length;
    
    const diff = Array(n + 1).fill().map(() => Array(m + 1).fill(0));
    
    // 차분 배열에 모든 스킬 기록
    for (const [type, r1, c1, r2, c2, degree] of skill) {
        const val = type === 1 ? -degree : degree;
        
        diff[r1][c1] += val;
        diff[r1][c2 + 1] -= val;
        diff[r2 + 1][c1] -= val;
        diff[r2 + 1][c2 + 1] += val;
    }
    
    // 누적합 계산
    // 왼쪽→오른쪽으로 누적 (행)
    for (let i = 0; i < n; i++) {
        for (let j = 1; j < m; j++) {
            diff[i][j] += diff[i][j - 1];
        }
    }
    
    // 위→아래로 누적 (열)
    for (let j = 0; j < m; j++) {
        for (let i = 1; i < n; i++) {
            diff[i][j] += diff[i - 1][j];
        }
    }
    
    let answer = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] + diff[i][j] > 0) {
                answer++;
            }
        }
    }
    
    return answer;
}

const r = solution(
    [[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5],[5,5,5,5,5]]	,
    [[1,0,0,3,4,4],[1,2,0,2,3,2],[2,1,0,3,1,2],[1,0,1,3,3,1]]	
)
console.log(r);