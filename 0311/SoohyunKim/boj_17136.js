const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const N = 10;
let minCnt = Infinity;
const paperCnt = Array(6).fill(5);
let graph = input.map(row => row.split(' ').map(Number));

const solution = () => {
  dfs(0, 0);
  return minCnt === Infinity ? -1 : minCnt;
};

const dfs = (idx, cnt) => {
  if (idx >= N * N) { // 모든 칸을 확인했으면 최소 색종이 개수 갱신
    minCnt = Math.min(minCnt, cnt);
    return;
  }

  const r = Math.floor(idx / N);
  const c = idx % N;

  if (graph[r][c] === 1) { 
    for (let size = 5; size >= 1; size--) {
      if (paperCnt[size] === 0 || !isSetPaper(r, c, size)) continue;

      // 색종이 붙이기
      paperCnt[size]--; 
      setPaper(r, c, size, 0); 
      dfs(idx + 1, cnt + 1);

      // 원상태로 복구
      paperCnt[size]++;
      setPaper(r, c, size, 1);
    }
  } else {
    dfs(idx + 1, cnt); 
  }
};

// 색종이 붙일 수 있는지 확인
const isSetPaper = (r, c, size) => {
  if (r + size > 10 || c + size > 10) return false; // 경계 밖으로 넘어가는지 확인
  for (let i = r; i < r + size; i++) { // 0이 있는지 확인
    for (let j = c; j < c + size; j++) {
      if (graph[i][j] === 0) return false;
    }
  }
  return true;
};

// 색종이 붙이기
const setPaper = (r, c, size, isPaper) => {
  for (let i = r; i < r + size; i++) {
    for (let j = c; j < c + size; j++) {
      graph[i][j] = isPaper;
    }
  }
};

console.log(solution());