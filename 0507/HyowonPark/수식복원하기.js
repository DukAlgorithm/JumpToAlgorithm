function solution(expressions) {
  const exps = expressions.map((e) => e.split(" "));
  const Ns = new Set([2, 3, 4, 5, 6, 7, 8, 9]);
  const impossibleNs = new Set();

  const answer = [];

  for (let i = 0; i < exps.length; i++) {
    const [A, plusminus, B, _, C] = exps[i];
    const hasX = C === "X";
    console.log(`${exps[i].join(" ")}   hasX: ${hasX}`);

    let xAnswers = []; // X 값 후보들

    for (const n of [...Ns]) {
      if (impossibleNs.has(n)) continue;

      const a = parseInt(A, n);
      const b = parseInt(B, n);
      const c = hasX ? undefined : parseInt(C, n);

      if (isNaN(a)) {
        console.log(`${n} 진법 아님`);
        impossibleNs.add(n);
      }
      if (isNaN(b)) {
        console.log(`${n} 진법 아님`);

        impossibleNs.add(n);
      }
      if (!hasX && isNaN(c)) {
        console.log(`${n} 진법 아님`);
        impossibleNs.add(n);
      }
      if (isNaN(a) || isNaN(b) || (!hasX && isNaN(c))) {
        continue;
      }

      // 수식 계산
      const result = plusminus === "+" ? a + b : a - b;

      if (!hasX) {
        if (result !== c) {
          impossibleNs.add(n);
          console.log(`${n} 진법 아님`);
          const idx = xAnswers.indexOf((e) => e.n === n);
          if (idx >= 0) {
            xAnswers.splice(idx, 1);
          }
        }
      } else {
        // X 계산
        xAnswers.push({ n, result: result.toString(n) });
      }
    }

    console.log(xAnswers)
    if (hasX) {
      console.log(impossibleNs);
      if (impossibleNs.size === 7) {
        const validN = Array.from(Ns)[0];
        const validResult = xAnswers.find((a) => a.n === validN)?.result;
        if (validResult) {
          const newExp = [...exps[i]];
          newExp[4] = validResult;
          answer.push(newExp);
        }
      } else if (impossibleNs.size < 7) {
        const newExp = [...exps[i]];
        newExp[4] = "?";
        answer.push(newExp);
      }
    }

    console.log(xAnswers);
    console.log(answer);
  }

  return answer.map((e) => e.join(" "));
}
const cases = [
  [["14 + 3 = 17", "13 - 6 = X", "51 - 5 = 44"], ["13 - 6 = 5"]],
  //   [
  //     ["1 + 1 = 2", "1 + 3 = 4", "1 + 5 = X", "1 + 2 = X"],
  //     ["1 + 5 = ?", "1 + 2 = 3"],
  //   ],
  //   [
  //     ["10 - 2 = X", "30 + 31 = 101", "3 + 3 = X", "33 + 33 = X"],
  //     ["10 - 2 = 4", "3 + 3 = 10", "33 + 33 = 110"],
  //   ],
  //   [
  //     ["2 - 1 = 1", "2 + 2 = X", "7 + 4 = X", "5 - 5 = X"],
  //     ["2 + 2 = 4", "7 + 4 = ?", "5 - 5 = 0"],
  //   ],
  //   [
  //     ["2 - 1 = 1", "2 + 2 = X", "7 + 4 = X", "8 + 4 = X"],
  //     ["2 + 2 = 4", "7 + 4 = 12", "8 + 4 = 13"],
  //   ],
];

cases.forEach((e) => {
  const r = solution(e[0]);
  e[1].forEach((f, i) => {
    console.log(`${r[i]} (${f === r[i] ? "일치" : "불일치"})`);
  });
  console.log("\n");
});
