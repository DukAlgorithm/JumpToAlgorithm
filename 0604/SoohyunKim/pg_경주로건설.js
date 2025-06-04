// https://school.programmers.co.kr/learn/courses/30/lessons/67259

function solution(board) {
    const N = board.length;
    const dir = [[1, 0], [-1, 0], [0, 1], [0, -1] ];

    // 3차원 배열 [x][y][방향] - 해당 위치에 특정 방향으로 도착했을 때 최소 비용
    const cost = Array.from({ length: N }, () =>
        Array.from({ length: N }, () => Array(4).fill(Infinity))
    );

    const queue = []; // [x, y, 방향Index, 누적비용]

    // 초기 (0, 0, 방향, 비용 0)
    for (let d = 0; d < 4; d++) {
        cost[0][0][d] = 0;
        queue.push([0, 0, d, 0]); 
    }

    while (queue.length) {
        const [x, y, dirIdx, curCost] = queue.shift();

        for (let newDir = 0; newDir < 4; newDir++) {
            const [dx, dy] = dir[newDir];
            const [nx, ny] = [x + dx, y + dy];

            if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
            if (board[nx][ny] === 1) continue;

            // 같은 방향이면 직선, 꺾이면 코너
            const addCost = dirIdx === newDir ? 100 : 600;
            const newCost = curCost + (x === 0 && y === 0 ? 100 : addCost);

            // 최소 비용
            if (newCost < cost[nx][ny][newDir]) {
                cost[nx][ny][newDir] = newCost;
                queue.push([nx, ny, newDir, newCost]);
            }
        }
    }

    // 도착지에 도착한 모든 방향 중 최소 비용
    return Math.min(...cost[N - 1][N - 1]);
}