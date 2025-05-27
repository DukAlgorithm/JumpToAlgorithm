function solution(numbers) {
  return Array.from(
    numbers.reduce((acc, cur, idx) => {
      for (let i = idx + 1; i < numbers.length; i++) {
        acc.add(numbers[i] + cur);
      }

      return acc;
    }, new Set())
  ).sort((a, b) => a - b);
}

const cases = [
  [
    [2, 1, 3, 4, 1],
    [2, 3, 4, 5, 6, 7],
  ],
  [
    [5, 0, 2, 7],
    [2, 5, 7, 9, 12],
  ],
];

cases.forEach((e) => {
  const r = solution(e[0]);
  console.log(r);
  if (e[1].every((a, i) => a === r[i])) {
    console.log("정답\n");
  } else {
    console.log("오답\n");
  }
});
