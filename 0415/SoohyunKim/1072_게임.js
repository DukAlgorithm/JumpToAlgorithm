// 이분탐색
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let [X, Y] = input[0].split(" ").map(Number);
let Z = Math.floor(100 * Y / X);
let left = 1;
let right = 1_000_000_000;
let ans = Infinity;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let newZ = Math.floor(100 * (Y + mid) / (X + mid));
  if(Z !== newZ) {
    ans = Math.min(ans, mid);
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

if (ans === Infinity) console.log(-1);
else console.log(ans);

/* 이분탐색 X 
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let [X, Y] = input[0].split(" ").map(Number);
const Z = Math.floor(100 * Y / X);
let newZ = Z;
let answer = 0;

if (Z >= 99) {
  console.log(-1);
  return;
}
while (Z === newZ) {
  X += 1;
  Y += 1;
  newZ = Math.floor(100 * Y / X);
  answer++;
}
console.log(answer);
*/