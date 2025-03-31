const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue([node, cost]) {
    let inserted = false;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i][1] > cost) { // cost 비교
        this.queue.splice(i, 0, [node, cost]);
        inserted = true;
        break;
      }
    }
    if (!inserted) this.queue.push([node, cost]);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}


const [N, E] = input[0].split(' ').map(Number);
const [v1, v2] = input[1 + E].split(' ').map(Number);
const graph = Array.from(Array(N+1), () => []);
for (let i = 0; i < E; i++) {
  const [a, b, c] = input[i + 1].split(' ').map(Number);
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}

const pq = new PriorityQueue();

const dijkstra = (start) => {
  const dp = new Array(N + 1).fill(Infinity);
  dp[start] = 0;
  pq.enqueue([start, 0]);

  while (!pq.isEmpty()) {
    const [cur, cost] = pq.dequeue();
    for (let [next, weight] of graph[cur]) {
      const nextCost = cost + weight;
      if (nextCost < dp[next]) {
        dp[next] = nextCost;
        pq.enqueue([next, nextCost]);
      }
    }
  }
  return dp;
};

const distFrom1 = dijkstra(1);
const distFromV1 = dijkstra(v1);
const distFromV2 = dijkstra(v2);

const result = Math.min(
  distFrom1[v1] + distFromV1[v2] + distFromV2[N],
  distFrom1[v2] + distFromV2[v1] + distFromV1[N]
);

console.log(result >= Infinity ? -1 : result);