const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [from, to] = input[i].split(" ");
  graph[+to].push(+from);
}

function dfs(start, visited) {
  visited[start] = true;
  let count = 0;

  for (let next of graph[start]) {
    if (!visited[next]) {
      count += 1 + dfs(next, visited);
    }
  }

  return count;
}

let max = -1;
let answer = [];

for (let i = 1; i <= N; i++) {
  const visited = new Array(N + 1).fill(false);
  const count = dfs(i, visited);

  if (count > max) {
    max = count;
    answer = [i];
  } else if (count === max) {
    answer.push(i);
  }
}

console.log(answer.join(" "));