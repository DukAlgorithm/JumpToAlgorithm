const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

let graph = Array.from(Array(N + 1), () => []);
for (let i = 0; i < M; i++) {
  let [from, to] = input[i + 1].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}
let visited = Array(N + 1).fill(false);

function dfs(start) {
  visited[start] = true;
  
  for (let i = 0; i < graph[start].length; i++) {
    let next = graph[start][i];
    if (!visited[next]) {
      dfs(next);
    }
  }
}

let ans = 0;
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    dfs(i);
    ans++;
  }
}

console.log(ans);