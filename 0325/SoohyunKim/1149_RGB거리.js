const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, ...cost] = input.map(v => v.split(' ').map(Number));
const dp = cost;

for (let i = 1; i < N; i++){
    dp[i][0] += Math.min(dp[i-1][1], dp[i-1][2]); // i번째 집이 R일 때, 이전 집은 G B중 최소 가격인 것으로 선택
    dp[i][1] += Math.min(dp[i-1][0], dp[i-1][2]); // G
    dp[i][2] += Math.min(dp[i-1][0], dp[i-1][1]); // B
}

console.log(Math.min(...dp[N-1]));