const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// 고객 수, 도시 개수, 도시홍보[[비용, 고객]]
const [[C, N], ...cities] = input.map(v => v.split(' ').map(Number));

const MAX_C = C + 100; // 고객 <= 100
const dp = new Array(MAX_C).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < N; i++) {
  const [cost, customers] = cities[i];
  
  // 고객 배수 돌면서 dp 갱신
  for (let j = customers; j < MAX_C; j++) { 
    dp[j] = Math.min(dp[j], dp[j - customers] + cost);
  }
}

let answer = Infinity;
for (let i = C; i < MAX_C; i++) {
  answer = Math.min(answer, dp[i]);
}

console.log(answer);