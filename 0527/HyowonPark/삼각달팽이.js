function solution(n) {
  const triangle = [];
  for (let i = 0; i < n; i++) {
    triangle[i] = new Array(i + 1).fill(0);
  }

  // 시작
  let row = 0;
  let col = 0;
  let num = 1;

  let direction = 0; // 0=아래, 1=오른쪽, 2=왼쪽위

  // 총 칸 수
  const total = (n * (n + 1)) / 2;

  for (let i = 0; i < total; i++) {
    triangle[row][col] = num++;

    // 다음 위치
    let nextRow = row;
    let nextCol = col;

    // 아래
    if (direction === 0) {
      nextRow = row + 1;
    } else if (direction === 1) {
      // 오른쪽
      nextCol = col + 1;
    } else {
      // 왼쪽 위
      nextRow = row - 1;
      nextCol = col - 1;
    }

    // 벽에 부딪히거나 이미 숫자가 있으면 방향 바꾸기
    if (
      nextRow < 0 ||
      nextRow >= n ||
      nextCol < 0 ||
      nextCol >= triangle[nextRow].length ||
      triangle[nextRow][nextCol] !== 0
    ) {
      // 방향 변경
      direction = (direction + 1) % 3;

      if (direction === 0) {
        nextRow = row + 1;
        nextCol = col;
      } else if (direction === 1) {
        nextRow = row;
        nextCol = col + 1;
      } else {
        nextRow = row - 1;
        nextCol = col - 1;
      }
    }

    row = nextRow;
    col = nextCol;
  }

  return triangle.flat();
}

const cases = [
  [4, [1, 2, 9, 3, 10, 8, 4, 5, 6, 7]],
  [5, [1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]],
  [
    6,
    [1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11],
  ],
];

cases.forEach((e) => {
  const r = solution(e[0]);
  console.log(`${r}\t ${e[1].every((f, i) => r[i] === f) ? "정답" : "오답"}`);
});
