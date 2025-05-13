/**
 *
 * @param {[[number]], n행 m열 } maze
 *      0 (빈칸) / 5 (벽)
 *      1 (빨간 수레 시작) / 3 (빨간 수레 도착)
 *      2 (파란 수레 시작) / 4 (파란 수레 도착)
 * @returns {퍼즐 푸는데 필요한 턴 최소값, 풀수없으면 0}
 *
 * 동시에 같은 칸에 있을 수 없음
 * 각 턴마다 반드시 수레를 한 칸 이동 -> 이동할 칸이 없으면 리턴 0 ?
 * 도착 칸에 도착하면 고정!
 *
 *
 */
function solution(maze) {
  let n = maze.length;
  let m = maze[0].length;
  // 빨강/파랑 수레 위치, 종료 위치 [n, m]
  let red, blue, redEnd, blueEnd;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maze[i][j] === 1) red = [i, j];
      else if (maze[i][j] === 2) blue = [i, j];
      else if (maze[i][j] === 3) redEnd = [i, j];
      else if (maze[i][j] === 4) blueEnd = [i, j];
    }
  }

  const directions = [
    [0, -1], // 상
    [0, 1], // 하
    [-1, 0], // 좌
    [1, 0], // 우
  ];

  // BFS 큐 [redX, redY, blueX, blueY, 턴 수, redVisited, blueVisited]
  const queue = [];

  // 빨강 파랑 각 visited
  const redVisited = new Set([`${red[0]},${red[1]}`]);
  const blueVisited = new Set([`${blue[0]},${blue[1]}`]);

  queue.push([red[0], red[1], blue[0], blue[1], 0, redVisited, blueVisited]);

  // 이미 탐색한 두 수레 위치 조합(중복 탐색 방지)
  const visitedStates = new Set();
  visitedStates.add(`${red[0]},${red[1]},${blue[0]},${blue[1]}`);

  while (queue.length > 0) {
    const [redX, redY, blueX, blueY, term, redVisited, blueVisited] =
      queue.shift();

    const redEnded = redX === redEnd[0] && redY === redEnd[1];
    const blueEnded = blueX === blueEnd[0] && blueY === blueEnd[1];

    // 두 수레 모두 목적지에 도착
    if (redEnded && blueEnded) {
      return term;
    }

    for (const [dx, dy] of directions) {
      // 빨간 수레 이동 (도착지에있으면 고정)
      const newRedX = redEnded ? redX : redX + dx;
      const newRedY = redEnded ? redY : redY + dy;

      if (
        !redEnded &&
        (newRedX < 0 ||
          newRedX >= n ||
          newRedY < 0 ||
          newRedY >= m ||
          maze[newRedX][newRedY] === 5 || // 벽
          redVisited.has(`${newRedX},${newRedY}`)) // 이미 방문한 칸
      ) {
        continue;
      }

      for (const [bx, by] of directions) {
        const newBlueX = blueEnded ? blueX : blueX + bx;
        const newBlueY = blueEnded ? blueY : blueY + by;

        if (
          !blueEnded &&
          (newBlueX < 0 ||
            newBlueX >= n ||
            newBlueY < 0 ||
            newBlueY >= m ||
            maze[newBlueX][newBlueY] === 5 || // 벽
            blueVisited.has(`${newBlueX},${newBlueY}`)) // 이미 방문한 칸
        ) {
          continue;
        }

        // 두 수레 같은 위치 불가
        if (newRedX === newBlueX && newRedY === newBlueY) {
          continue;
        }

        // 서로 자리 교체 불가
        if (
          newRedX === blueX &&
          newRedY === blueY &&
          newBlueX === redX &&
          newBlueY === redY
        ) {
          continue;
        }

        // 이미 탐색한 경우인지 확인
        const newState = `${newRedX},${newRedY},${newBlueX},${newBlueY}`;
        if (visitedStates.has(newState)) {
          continue;
        }

        visitedStates.add(newState);

        const newRedVisited = new Set(redVisited);
        const newBlueVisited = new Set(blueVisited);

        if (!redEnded) {
          newRedVisited.add(`${newRedX},${newRedY}`);
        }
        if (!blueEnded) {
          newBlueVisited.add(`${newBlueX},${newBlueY}`);
        }

        queue.push([
          newRedX,
          newRedY,
          newBlueX,
          newBlueY,
          term + 1,
          newRedVisited,
          newBlueVisited,
        ]);
      }
    }
  }

  return 0;
}

const cases = [
  [
    [
      [1, 4],
      [0, 0],
      [2, 3],
    ],
    3,
  ],
  [
    [
      [1, 0, 2],
      [0, 0, 0],
      [5, 0, 5],
      [4, 0, 3],
    ],
    7,
  ],
  [
    [
      [1, 5],
      [2, 5],
      [4, 5],
      [3, 5],
    ],
    0,
  ],
  [[[4, 1, 2, 3]], 0],
];

cases.forEach((e) => {
  const result = solution(e[0]);
  console.log(
    `제출 ${result}\t답 ${e[1]}\t${result === e[1] ? "\t정답" : "\t오답"}`
  );
});
