function sol22342() {
  const input = require('fs').readFileSync('/dev/stdin').toString();
//   let input = `3 4
//   1234
//   2341
//   3412`;
  const lines = input.trim().split("\n");
  const [M, N] = lines[0].split(" ").map(Number);

  const W = [];
  for (let i = 0; i < M; i++) {
    W.push(lines[i + 1].split("").map(Number));
  }

  const out = Array(M)
    .fill()
    .map(() => Array(N).fill(0));

  // 1열 출력값 = 가중치
  for (let i = 0; i < M; i++) {
    out[i][0] = W[i][0];
  }

  // 이전 열
  let prev = Array(M).fill(0);

  for (let j = 1; j < N; j++) {
    // 현재 열
    let curr = Array(M).fill(0);

    for (let i = 0; i < M; i++) {
      let maxVal = 0;

      // 이전 열까지의 모든 출력값 효과 계산
      for (let k = 0; k < M; k++) {
        let dist = Math.abs(i - k);
        maxVal = Math.max(maxVal, prev[k] - dist);
      }

      out[i][j] = maxVal + W[i][j];
      curr[i] = out[i][j];
    }

    prev = curr;
  }

  let result = 0;
  for (let i = 0; i < M; i++) {
    result = Math.max(result, out[i][N - 1]);
  }

  console.log(result);
}
sol22342();
