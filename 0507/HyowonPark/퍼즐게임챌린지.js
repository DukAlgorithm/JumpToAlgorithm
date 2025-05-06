/**
 *
 * @param {퍼즐 난이도 number[]} diffs
 * @param {퍼즐 소요 시간: number[]} times
 * @param {전체 제한 시간} limit
 * @returns
 */
function solution(diffs, times, limit) {
  // const hardest = Math.max(...diffs);  // 런타임 에러

  const hardest = diffs.reduce((p, c) => {
    if (p < c) {
      return c;
    }
    return p;
  }, 100_000);

  let leftLevel = 1;
  let rightLevel = hardest;
  let answer = hardest;

  while (leftLevel <= rightLevel) {
    const midLevel = Math.floor((leftLevel + rightLevel) / 2);

    let totalTime = 0;
    for (let i = 0; i < diffs.length; i++) {
      if (diffs[i] <= midLevel) {
        totalTime += times[i];
      } else {
        if (i === 0) {
          totalTime += (diffs[i] - midLevel) * times[i] + times[i];
        } else {
          totalTime +=
            (diffs[i] - midLevel) * (times[i] + times[i - 1]) + times[i];
        }
      }

      if (totalTime > limit) {
        break;
      }
    }

    if (totalTime <= limit) {
      answer = Math.min(answer, midLevel);
      rightLevel = midLevel - 1;
    } else {
      leftLevel = midLevel + 1;
    }
  }

  return answer;
}

const cases = [
  [[1, 5, 3], [2, 4, 7], 30, 3],
  [[1, 4, 4, 2], [6, 3, 8, 2], 59, 2],
  [[1, 328, 467, 209, 54], [2, 7, 1, 4, 3], 1723, 294],
  [[1, 99999, 100000, 99995], [9999, 9001, 9999, 9001], 3456789012, 39354],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1], e[2]);
  console.log(`r: ${r} (${r === e[3] ? "정답" : "오답"})`);
});
