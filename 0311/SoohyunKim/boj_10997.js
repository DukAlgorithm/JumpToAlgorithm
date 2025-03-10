const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
if (N === 1) {
  console.log('*');
  return;
}

let row = N * 3 + (N - 1);
let col = row - 2;

let board = Array.from(Array(row), () => Array(col).fill(' '));
for (let i = 0; i < col; i++) board[0][i] = '*';
for (let i = 0; i < row; i++) board[i][0] = '*';
board[1].splice(1, col - 1);

const dy = [0, -1, 0, 1];
const dx = [1, 0, -1, 0];

function draw(y, x, length) {
  if (length < 1) return;

  for(let i = 0; i < 4; i++) {
    let ny = y;
    let nx = x;
    
    if (i === 2) length -= 2;

    for (let j = 0; j < length; j++) {
      board[ny][nx] = '*';
      ny += dy[i];
      nx += dx[i]; 
    }

    y = ny - dy[i];
    x = nx - dx[i];   
  }

  draw(y, x, length - 2);
}

draw(row - 1, 0, col);

console.log(board.map(row => row.join('')).join('\n'));