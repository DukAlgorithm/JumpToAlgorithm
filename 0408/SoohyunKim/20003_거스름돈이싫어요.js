const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const items = input.slice(1).map(line => line.split(' ').map(Number));

// 최대공약수
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// 최소공배수
const lcm = (a, b) => (a * b) / gcd(a, b);

// 모든 분모의 최소공배수 구하기
let bunmoLCM = items[0][1];
for (let i = 1; i < N; i++) {
  bunmoLCM = lcm(bunmoLCM, items[i][1]);
}

// 공통 분모로 변환 -> 분자들의 GCD 구하기
const bunjas = items.map(([a, b]) => (a * bunmoLCM) / b);

let bunjaGCD = bunjas[0];
for (let i = 1; i < N; i++) {
  bunjaGCD = gcd(bunjaGCD, bunjas[i]);
}

// 최종 -> 기약분수
const finalGCD = gcd(bunjaGCD, bunmoLCM);

console.log(`${bunjaGCD / finalGCD} ${bunmoLCM / finalGCD}`);