function solution(expression) {
  const op = new Set(); // +, -, *
  expression.split("").forEach((e) => {
    if (isNaN(e)) {
      op.add(e);
    }
  });

  // 연산자 우선순위 경우의 수(개수는 2 or 3으로 한정)
  let opHighToLow;
  const arr = [...op];
  if (op.size === 2) {
    opHighToLow = [
      [arr[0], arr[1]],
      [arr[1], arr[0]],
    ];
  } else {
    opHighToLow = [
      [arr[0], arr[1], arr[2]],
      [arr[0], arr[2], arr[1]],
      [arr[1], arr[0], arr[2]],
      [arr[1], arr[2], arr[0]],
      [arr[2], arr[1], arr[0]],
      [arr[2], arr[0], arr[1]],
    ];
  }

  let max = -Infinity;
  for (let i = 0; i < opHighToLow.length; i++) {
    let tokens = expression.match(/\d+|[+\-*]/g); // 수식의 모든 숫자, 연산자 배열

    for (let j = 0; j < opHighToLow[i].length; j++) {
      let currentOp = opHighToLow[i][j];
      const stack = [];

      while (tokens.length > 0) {
        const token = tokens.shift();
        if (token === currentOp) {
          const prev = stack.pop();
          const next = tokens.shift();
          let r;
          if (currentOp === "+") {
            r = Number(prev) + Number(next);
          } else if (currentOp === "-") {
            r = Number(prev) - Number(next);
          } else {
            r = Number(prev) * Number(next);
          }
          stack.push(r.toString());
        } else {
          stack.push(token);
        }
      }
      tokens = stack;
    }

    max = Math.max(max, Math.abs(Number(tokens[0])));
  }

  return max;
}

const cases = [
  ["100-200*300-500+20", 60420],
  ["50*6-3*2", 300],
];

cases.forEach((e) => {
  const r = solution(e[0]);
  console.log(`${r}\t${r === e[1] ? "정답" : "오답"}`);
});
