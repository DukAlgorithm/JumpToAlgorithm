const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;
const T = +input[idx++];
const result = [];

for (let t = 0; t < T; t++) {
  const [N, K] = input[idx++].split(' ').map(Number);
  const time = [0, ...input[idx++].split(' ').map(Number)];
  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegree = Array(N + 1).fill(0);

  for (let i = 0; i < K; i++) {
    const [x, y] = input[idx++].split(' ').map(Number);
    graph[x].push(y);
    inDegree[y]++;
  }
  const W = +input[idx++];
  
  const dp = Array(N + 1).fill(0);
  const q = [];

  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      q.push(i);
      dp[i] = time[i];
    }
  }

  while (q.length) {
    const cur = q.shift();

    for (const next of graph[cur]) {
      inDegree[next] -= 1;
      dp[next] = Math.max(dp[cur] + time[next], dp[next]);

      if (inDegree[next] === 0) q.push(next);
    }
  }

  result.push(dp[W]);
}

console.log(result.join('\n'));