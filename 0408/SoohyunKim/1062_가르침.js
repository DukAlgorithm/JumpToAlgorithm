const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number)
const words = input.slice(1);

let alphabetArr = new Array(26).fill(0);
let readCnt = K - 5; // 기본단어 5개: a,c,i,n,t
let answer = 0;

// 기본 단어 못 읽는 경우
if(readCnt < 0) {
  console.log(0);
  return;
}

// 단어 배움처리
alphabetArr[0] = 1;
alphabetArr[2] = 1;
alphabetArr[8] = 1;
alphabetArr[13] = 1;
alphabetArr[19] = 1;

function dfs(index, readCnt) {
  // 재귀 종료
  if (readCnt < 0) return;

  // 읽을 수 있는 단어 확인
  if (readCnt === 0) {
    let count = 0;
    for (let i = 0; i < N; i++) {
      let isValid = true; 

      for (let j = 0; j < words[i].length; j++) {
        if (alphabetArr[words[i][j].charCodeAt() - 97] === 0) { // 유니코드 "a" 는 97
          isValid = false; 
          break;
        }
      }
      if (isValid) count++;
    }
    answer = Math.max(answer, count);
  }

  for (let i = index; i < 26; i++){
    if (alphabetArr[i] === 0) {
      alphabetArr[i] = 1; // 하나씩 배움 처리
      dfs(i, readCnt - 1); // dfs -> 읽을 수 있는 단어 확인
      alphabetArr[i] = 0;
    }
  }
}

dfs(0, readCnt);
console.log(answer);