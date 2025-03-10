const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const n = +input[0];
const m = +input[1];

let graph = Array.from(Array(n + 1), () => []);
for (let i = 0; i < m; i++) {
  const [from, to] = input[i + 2].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

const visited = Array(n+1).fill(0);

function bfs(start) {
  const queue = [start];

  while(queue.length) {
    let node = queue.shift();

    for (let next of graph[node]) {
      if(!visited[next]) {
        visited[next] = visited[node] + 1;
        queue.push(next);
      }
    }
  }
}

bfs(1);
visited[1] = 0;

const answer = visited.filter(v => v >= 1 && v <= 2).length;
console.log(answer);