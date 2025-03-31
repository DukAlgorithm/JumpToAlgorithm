const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [K, L] = input[0].split(' ').map(Number);
const arr = input.slice(1);
const dup = new Map();

for (let i = arr.length - 1; i >= 0; i--) {
  dup.set(arr[i], i); 
}

const result = [...dup.keys()].reverse().slice(0, L);

console.log(result.slice(0, K).join('\n'));