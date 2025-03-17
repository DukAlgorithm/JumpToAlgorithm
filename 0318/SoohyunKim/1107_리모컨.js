const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

function solution(input) {
  const N = +input[0]; 
  const M = +input[1]; 
  if (N === 100) return 0;
  
  const broken = M > 0 ? new Set(input[2].split(' ').map(Number)) : new Set();
  
  // +, - 만 사용했을 때
  let answer = Math.abs(N - 100);

  // 숫자 버튼 이용할 때
  for (let i = 0; i < 1_000_000; i++) {
    const str = i.toString();
    if ([...str].every(ch => !broken.has(Number(ch)))) { 
      const pressCount = str.length + Math.abs(i - N);
      answer = Math.min(answer, pressCount);
    }
  }

  return answer;
}

console.log(solution(input));