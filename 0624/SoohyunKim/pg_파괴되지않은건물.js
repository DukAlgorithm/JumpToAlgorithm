// https://school.programmers.co.kr/learn/courses/30/lessons/92344

const solution = (board, skill) => {
    const n = board.length;
    const m = board[0].length;
    const sum = Array.from(Array(n + 1), () => Array(m + 1).fill(0));
    
    // 변화 기록
    for (const [type, r1, c1, r2, c2, degree] of skill) {
        const act = type === 1 ? -degree : degree;

        sum[r1][c1] += act;
        sum[r1][c2 + 1] -= act;
        sum[r2 + 1][c1] -= act;
        sum[r2 + 1][c2 + 1] += act;
    }
    
    // 행 방향 누적합
    for (let r = 0; r < n + 1; r++) {
        for (let c = 1; c < m + 1; c++) {
            sum[r][c] += sum[r][c - 1];
        }
    }
    // 열 방향 누적합
    for (let c = 0; c < m + 1; c++) {
        for (let r = 1; r < n + 1; r++) {
            sum[r][c] += sum[r - 1][c];
        }
    }
    
    let answer = 0;
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < m; c++) {
            board[r][c] += sum[r][c];
            if(board[r][c] > 0) answer++;
        }
    }
    
    return answer;
}