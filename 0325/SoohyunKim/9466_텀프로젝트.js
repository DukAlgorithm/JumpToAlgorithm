const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +input.shift();

for (let i = 0; i < T; i++) {
  const N = +input.shift();
  const graph = [null, ...input.shift().split(' ').map(Number)];

  let visited = new Array(N + 1).fill(false);
  const finished = new Array(N + 1).fill(false); 
  let answer = N;

  for(let i = 1; i <= N; i++) {
    if (!visited[i]) dfs(i);
  }

  function dfs(node) {
    visited[node] = true;
    const next = graph[node];

    if (!visited[next]) { 
      dfs(next);
    } else if (!finished[next]) { // 사이클 발생
      let cur = next;
      while (cur !== node) {
        answer--; 
        cur = graph[cur]; // 사이클을 하나씩 되돌아감
      }
      answer--; // 현재 노드 제거
    }

    // 사이클이 끝난 뒤에, finish 처리
    finished[node] = true;
  }

  console.log(answer);
}