const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const MAX = 100000;
const visited = Array(MAX + 1).fill(false);

function bfs(start) {
  const queue = [[start, 0]]; // (위치, 시간)
  visited[start] = true;

  while (queue.length) {
    const [curX, time] = queue.shift();

    if (curX === K) return time; // 목표 위치 도달하면 시간 반환

    for (const next of [curX + 1, curX - 1, curX * 2]) {
      if (next >= 0 && next <= MAX && !visited[next]) {
        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  }

  return -1;
}

console.log(bfs(N));