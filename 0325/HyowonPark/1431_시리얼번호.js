// 짧은 거 우선
// 합이 작은거 우선
// 사전 순 (숫자 우선)
// 정렬해서 출력하기

function sol1431() {
  //   const input = `5
  //     ABCD
  //     145C
  //     A
  //     A910
  //     Z321`;
  const input = require("fs").readFileSync("/dev/stdin");

  const serials = input
    .toString()
    .trim() // ***** 
    .split("\n")
    .map((e) => e.trim());

  console.log(
    serials
      .slice(1)
      .sort((a, b) => {
        // 1. 길이 비교
        if (a.length < b.length) {
          return -1;
        }
        if (a.length > b.length) {
          return 1;
        }
        // 2. 합 비교
        const aMinusB =
          [...a]
            .filter((e) => /[0-9]/.test(e)) // 그냥 filter(Number) 이것도 가능(Number 하면 0은 falsy지만 어차피 0은 까먹고 안더해도 똑같
            .reduce((acc, cur) => acc + Number(cur), 0) -
          [...b]
            .filter((e) => /[0-9]/.test(e))
            .reduce((acc, cur) => acc + Number(cur), 0);
        if (aMinusB < 0) {
          return -1;
        }
        if (aMinusB > 0) {
          return 1;
        }

        // 3. 사전순
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      })
      .join("\n")
  );
}

sol1431();
