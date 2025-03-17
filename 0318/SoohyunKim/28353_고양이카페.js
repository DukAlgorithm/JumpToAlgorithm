const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K, ...cats] = input.flatMap(s => s.split(' ').map(Number));

cats.sort((a, b) => a - b);

let left = 0;
let right = N - 1;
let answer = 0;

while (left < right) {
  if(cats[left] + cats[right] <= K) {
    answer++;
    left++;
    right--;
  } else {
    right--;
  }
}

console.log(answer);