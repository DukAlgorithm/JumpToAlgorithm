const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const population = [0, ...input[1].split(' ').map(Number)];
const graph = Array.from({ length: N + 1 }, () => []);
for(let i = 0; i < N - 1; i++) {
  const [from, to] = input[i + 2].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

const dp = Array.from({ length: N + 1 }, () => [0, 0]);
const visited = Array(N + 1).fill(false);

const dfs = (node) => {
  visited[node] = true;
  dp[node][1] = population[node]; // 우수 마을로 선정, 현재 마을 인구 포함

  for (let next of graph[node]) {
    if (!visited[next]) {
      dfs(next);
      dp[node][0] += Math.max(dp[next][0], dp[next][1]); // 현재 노드가 우수 마을이 아닐 때, 최대 주민 수
      dp[node][1] += dp[next][0]; // 현재 노드가 우수 마을일 때, 최대 주민 수
    }
  }
};

dfs(1);
console.log(Math.max(dp[1][0], dp[1][1]));