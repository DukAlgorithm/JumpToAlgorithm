const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const board = input.map(line => line.split(''));
let min = Infinity;

const countColor = (x, y) => {
  let color = board[x][y]; // B or W
  let change = 0; // color 와 색이 같아야 하는지 달라야 하는지 구분하기 위한 변수
  let cnt = 0; // color로 시작
  let oppCnt = 0; // 반대 color로 시작
  
  for(let r = 0; r < 8; r++){
    if(r % 2 === 0) change = 0;
    else change = 1;

    for(let c = 0; c < 8; c++){
      if(change % 2 === 0){
        if(board[x+r][y+c] !== color) cnt++;
        if(board[x+r][y+c] === color) oppCnt++;
      } else {
        if(board[x+r][y+c] === color) cnt++;
        if(board[x+r][y+c] !== color) oppCnt++;
      }
      change++;
    }
  }

  return Math.min(cnt, oppCnt);
}

for(let i = 0; i <= N - 8; i++){
  for(let j = 0; j <= M - 8; j++){
    min = Math.min(min, countColor(i, j));
  }
}

console.log(min);