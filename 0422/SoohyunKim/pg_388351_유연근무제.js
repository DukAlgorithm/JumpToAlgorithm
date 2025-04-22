const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const T = +input[0];
for (let t = 1; t <= T; t++) {
  const [x, y] = input[t].split(' ').map(Number);
  const d = y - x;

  let n = 1;
  while (true) {
    if (d <= n * (n + 1)) {
      if (d <= n * n) {
        console.log(2 * n - 1);
      } else {
        console.log(2 * n);
      }
      break;
    }
    n++;
  }
}

/* 런타임에러, 테스트코드 통과
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const T = +input[0];
for(let t = 1; t <= T; t++){
  const [x, y] = input[t].split(' ').map(Number);
  const target = y - 1;
  let min = Infinity;

  function dfs(cur, k, cnt) {
    if (cur > target) return;
    if (cur === target) {
      min = Math.min(min, cnt + 1);
      return;
    }

    // 현재 속도 ±1, 또는 유지 가능
    for (let next of [k - 1, k, k + 1]) {
      if (next > 0) {
        dfs(cur + next, next, cnt + 1);
      }
    }
  }

  dfs(x, 0, 0);
  console.log(min);
}
*/