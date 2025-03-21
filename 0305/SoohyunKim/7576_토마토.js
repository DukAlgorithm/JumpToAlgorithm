const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [M, N] = input[0].split(' ').map(Number); // 가로, 세로
const box = []; // 상자 정보
const queue = [];

for(let i = 1; i <= N; i++) {
  const arr = input[i].split(' ').map(Number);
  box.push(arr);

  let idx = arr.indexOf(1);
  while (idx !== -1) {
    queue.push([i - 1, idx]); // 익은 토마토 위치 큐에 저장
    idx = arr.indexOf(1, idx + 1);
  }
}

let day = 0;
function bfs() {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let front = 0; // 큐의 앞을 가리키는 포인터

  while (front < queue.length) {
    const [x, y] = queue[front++];

    for (let j = 0; j < 4; j++) {
      const [nx, ny] = [x + dx[j], y + dy[j]];
      // 범위 벗어나는지 확인
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      // 아직 익지 않은 토마토 익힘
      if (box[nx][ny] === 0) {
        box[nx][ny] = box[x][y] + 1; // 익은 날짜 기록
        queue.push([nx, ny]);
        day = Math.max(day, box[nx][ny] - 1); // 최대 날짜 업데이트
      }
    }
  }
}

bfs();

// 토마토가 모두 익었는지 확인
const hasUnripeTomato = box.some(row => row.includes(0));
console.log(hasUnripeTomato ? -1 : day);
