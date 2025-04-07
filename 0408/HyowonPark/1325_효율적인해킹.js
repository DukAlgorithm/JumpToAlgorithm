function sol1325() {
  const input = require("fs").readFileSync("/dev/stdin").toString().trim();
  //   const input = `5 4
  // 3 1
  // 3 2
  // 4 3
  // 5 3`;
  const [[N, M], ...relations] = input
    .split("\n")
    .map((e) => e.split(" ").map(Number));

  // relations 에서 A 가 B 신뢰 = B해킹시 A도해킹 (역방향)
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 1; i <= M; i++) {
    const [a, b] = relations[i - 1];
    graph[b].push(a);
  }
  const hackCounts = new Array(N + 1).fill(0);

  function bfs(start) {
    const visited = new Array(N + 1).fill(false);
    const queue = [];

    queue.push(start);
    visited[start] = true;
    let count = 1;

    let queueIndex = 0;

    while (queueIndex < queue.length) {
      const current = queue[queueIndex++];

      for (const next of graph[current]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push(next);
          count++;
        }
      }
    }

    return count;
  }

  // 컴퓨터별 해킹 가능 컴퓨터 수
  for (let i = 1; i <= N; i++) {
    hackCounts[i] = bfs(i);
  }

  const maxCount = Math.max(...hackCounts.slice(1));

  let result = "";
  for (let i = 1; i <= N; i++) {
    if (hackCounts[i] === maxCount) {
      result += i + " ";
    }
  }

  console.log(result.trim());
}

sol1325();
