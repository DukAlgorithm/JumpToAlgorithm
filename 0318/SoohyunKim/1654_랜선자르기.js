const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [K, N] = input.shift().split(' ').map(Number);
const lan = input.map(x => Number(x)).sort();
let answer = 0;

// 랜선 길이 최소값과 최대값
let start = 1;
let end = Math.max(...lan);

// 이분 탐색
while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let count = 0;

  for (let i = 0; i < K; i++) {
    count += Math.floor(lan[i] / mid);
  }

  if (count < N) end = mid - 1; // 길이 줄임
  else {
    answer = mid;
    start = mid + 1; // 길이 늘림
  }
}

console.log(answer);