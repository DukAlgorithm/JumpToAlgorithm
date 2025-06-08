function solution(numbers, hand) {
  // 키패드 가운데 열, key: 도착지, value: 가능한 출발
  const m = {
    2: { 0: [2], 1: [1, 5, 3], 2: [4, 6, 8], 3: [7, 0, 9], 4: ["*", "#"] },
    5: {
      0: [5],
      1: [2, 4, 6, 8],
      2: [1, 3, 7, 9, 0],
      3: ["*", "#"],
    },
    8: {
      0: [8],
      1: [5, 7, 9, 0],
      2: ["*", "#", 2, 4, 6],
      3: [1, 3],
    },
    0: {
      0: [0],
      1: [8, "*", "#"],
      2: [5, 7, 9],
      3: [2, 4, 6],
      4: [1, 3],
    },
  };

  // 왼손 엄지 오른손 엄지 위치
  let posL = "*";
  let posR = "#";
  const results = []; // L,R

  for (let n of numbers) {
    if ([1, 4, 7].includes(n)) {
      results.push("L");
      posL = n;
      continue;
    } else if ([3, 6, 9].includes(n)) {
      results.push("R");
      posR = n;

      continue;
    }

    for (let key of Object.keys(m[n]).sort((a, b) => Number(a) - b)) {
      if (m[n][key].includes(posL) && m[n][key].includes(posR)) {
        if (hand === "left") {
          results.push("L");
          posL = n;
        } else {
          results.push("R");
          posR = n;
        }
        break;
      } else if (m[n][key].includes(posL)) {
        results.push("L");
        posL = n;
        break;
      } else if (m[n][key].includes(posR)) {
        results.push("R");
        posR = n;
        break;
      }
      // 둘다 아닐 경우에만 continue
    }
  }

  return results.join("");
}

const cases = [
  [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right", "LRLLLRLLRRL"],
  [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left", "LRLLRRLLLRR"],
  [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right", "LLRLLRLLRL"],
];

cases.forEach((e) => {
  const r = solution(e[0], e[1]);
  console.log(`${r}\t${r === e[2] ? "정답" : "오답"}`);
});
