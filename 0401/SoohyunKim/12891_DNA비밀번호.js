const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [S, P] = input[0].split(' ').map(Number);
const str = input[1];
const rule = input[2].split(' ').map(Number);
const word = ['A', 'C', 'G', 'T'];
let ans = 0;

const countMap = new Map([['A', 0], ['C', 0], ['G', 0], ['T', 0]]);
for (let i = 0; i < P; i++) {
  countMap.set(str[i], countMap.get(str[i]) + 1);
}

const isValid = () => {
  return word.every((ch, i) => countMap.get(ch) >= rule[i]);
};

if (isValid()) ans++;

for (let i = P; i < S; i++) {
  const outChar = str[i - P]; // 빠질 문자
  const inChar = str[i];      // 새로 들어올 문자

  countMap.set(outChar, countMap.get(outChar) - 1);
  countMap.set(inChar, countMap.get(inChar) + 1);

  if (isValid()) ans++;
}

console.log(ans);