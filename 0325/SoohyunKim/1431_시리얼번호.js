const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input.shift();
const guitar = input;

function sumDigits(str) {
  return str
    .split('')
    .filter(char => /\d/.test(char))
    .map(Number)
    .reduce((a, b) => a + b, 0);
}

guitar.sort((a, b) => {
  // 1. 길이 비교
  if (a.length !== b.length) {
    return a.length - b.length; // 짧은 것 먼저
  }

  // 2. 숫자 합 비교
  const sumA = sumDigits(a);
  const sumB = sumDigits(b);
  if (sumA !== sumB) {
    return sumA - sumB; // 작은 합 먼저
  }

  // 3. 사전 순 정렬
  return a.localeCompare(b); // 사전순 비교
});

console.log(guitar.join('\n'));