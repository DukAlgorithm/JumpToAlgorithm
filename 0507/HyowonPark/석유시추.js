/**
 *
 * @param {n x b 2차원 배열, 0은 빈땅 1은 석유가있는 땅 } land
 * @returns {뽑을수있는 최대 석유량}
 * 시추관은 세로만 1개 설치
 */
function solution(land) {
  const n = land.length;
  const m = land[0].length;

  let oilNumber = 0; // 석유 덩어리 번호
  const oilGrid = Array.from(Array(n), () => Array(m).fill(0));
  const oilSize = {}; // 각 석유 덩어리 크기
  const oilColumns = {}; // 각 석유에 포함된 열 목록

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (land[i][j] === 1 && oilGrid[i][j] === 0) {
        // 새로운 석유 덩어리 발견
        oilNumber++;

        const stack = [[i, j]];
        let size = 0;
        const columns = new Set();

        while (stack.length > 0) {
          const [x, y] = stack.pop();

          // 이미 처리한 칸이거나 석유가 없는 칸 패스
          if (
            x < 0 ||
            x >= n ||
            y < 0 ||
            y >= m ||
            oilGrid[x][y] > 0 ||
            land[x][y] === 0
          ) {
            continue;
          }

          // 현재 칸에 덩어리 번호 붙이기
          oilGrid[x][y] = oilNumber;
          size++;
          columns.add(y);

          // 상하좌우 인접한 칸 추가
          stack.push([x - 1, y]);
          stack.push([x + 1, y]);
          stack.push([x, y - 1]);
          stack.push([x, y + 1]);
        }

        // 덩어리 정보 저장
        oilSize[oilNumber] = size;
        oilColumns[oilNumber] = columns;
      }
    }
  }

  // 각 열마다 접근 가능한 석유량 계산
  const columnOil = Array(m).fill(0);

  for (let j = 0; j < m; j++) {
    const oilsFoundInColumn = new Set();

    for (let i = 0; i < n; i++) {
      const currentOil = oilGrid[i][j];
      if (currentOil > 0) {
        oilsFoundInColumn.add(currentOil);
      }
    }

    for (const oil of oilsFoundInColumn) {
      columnOil[j] += oilSize[oil];
    }
  }

  return Math.max(...columnOil);
}

const cases = [
  [
    [
      [0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0],
      [1, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 1, 1],
    ],
    9,
  ],

  [
    [
      [1, 0, 1, 0, 1, 1],
      [1, 0, 1, 0, 0, 0],
      [1, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0],
      [1, 0, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
    ],
    16,
  ],
];

cases.forEach((e) => {
  const r = solution(e[0]);
  console.log(`${r} (${r === e[1] ? "정답" : "오답"})`);
});
