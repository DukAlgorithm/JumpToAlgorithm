const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let dp = Array.from(Array(21), () => Array.from(Array(21), () => Array(21).fill(null)));

function w(a, b, c) {
  if(a <= 0 || b <= 0 || c <= 0) return 1;
  if(a > 20 || b > 20 || c > 20) return w(20, 20, 20);

  // 이미 계산된 값이 있다면 반환
  if (dp[a][b][c] !== null) return dp[a][b][c];

  if (a < b && b < c) {
    dp[a][b][c] = w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c);
  } else {
    dp[a][b][c] = w(a-1, b, c) + w(a-1, b-1, c) + w(a-1, b, c-1) - w(a-1, b-1, c-1);
  }

  return dp[a][b][c];
}

while(true){
  const [a, b, c] = input.shift().split(' ').map(Number);
  if(a === -1 && b === -1 && c === -1) break;
  const result = w(a, b, c);
  console.log(`w(${a}, ${b}, ${c}) = ${result}`);
}