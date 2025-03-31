const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input.shift();
const game = input.map(line => line.split(' '));
let ans = 0;

for (let num = 123; num <= 987; num++) {
  const numStr = num.toString();
  if (new Set(numStr).size < 3 || numStr.includes("0")) continue; // 숫자가 겹치거나 0이 포함된 경우 스킵

  
  let isValid = true;
  // 조건을 모두 만족하는지 확인
  for (const [ guess, strikes, balls ] of game) {
    if (!checkCondition(guess, numStr, +strikes, +balls)) {
      isValid = false;
      break;
    }
  }

  // 모두 만족, 카운트 증가
  if (isValid) ans++;
}

// 숫자가 조건에 맞는지 체크하는 함수
function checkCondition(guess, number, strikes, balls) {
  let strikeCnt = 0;
  let ballCnt = 0;

  for (let i = 0; i < 3; i++) {
    if (guess[i] === number[i]) {
      strikeCnt++;
    } else if (number.includes(guess[i])) {
      ballCnt++;
    }
  }

  // 모두 같으면 true 반환
  return strikeCnt === strikes && ballCnt === balls;
}

console.log(ans);