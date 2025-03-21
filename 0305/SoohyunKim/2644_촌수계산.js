const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const [p1, p2] = input[1].split(' ').map(Number);
const M = +input[2];

let visited = Array(N + 1).fill(false);

let graph = Array.from(Array(N + 1), () => []);
for(let i = 0; i < M; i++) {
  const [from, to] = input[i+3].split(' ').map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

function dfs(x, y, cnt) {
  if(x === y) return cnt;

  visited[x] = true;
  for(let i = 0; i < graph[x].length; i++) {
    const next = graph[x][i];
    
    if(!visited[next]){
      const ans = dfs(next, y, cnt+1);
      if(ans!== -1) return ans;
    }
  }

  return -1
} 

console.log(dfs(p1, p2, 0));