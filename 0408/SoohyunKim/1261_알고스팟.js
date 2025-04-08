const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [M, N] = input[0].split(" ").map(Number);
const graph = input.slice(1).map(row => row.split("").map(Number));

function bfs(x, y) {
  const queue = [];
  queue.push([x, y, 0]);

  const visited = Array.from({ length: N }, () => new Array(M).fill(0));
  visited[x][y] = 1;

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  while (queue.length) {
    const [cx, cy, cnt] = queue.shift();
    if (cx === N - 1 && cy === M - 1) return cnt; // (N, M) 도착

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (visited[nx][ny]) continue;

      visited[nx][ny] = 1;
      if (graph[nx][ny]) { // 벽이 있는 경우
        graph[nx][ny] = 0;
        queue.push([nx, ny, cnt + 1]);
      } else { 
        // 빈 방인 경우 -> 우선 탐색위해 큐 맨 앞에 넣어줌
        // 다익스트라(우선순위 큐 사용해서도 구현 가능)
        queue.unshift([nx, ny, cnt]);
      }
    }
  }
}

console.log(bfs(0, 0));