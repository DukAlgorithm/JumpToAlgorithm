function solution(s) {
  // z 로 시작: 0
  // o 으로 시작: 1
  // t 로 시작: 2, 3
  // f 로 시작: 4, 5
  // s 로 시작: 6, 7
  // e 로 시작: 8
  // n 으로 시작: 9

  let result = "";
  s = s.split("");
  while (s.length) {
    if (!isNaN(s[0])) {
      result += s.shift();
    } else {
      // s 에서 맨 앞에 있는 문자열 덩어리.
      if (s[0] === "z") {
        result += 0;
        s.splice(0, 4);
      } else if (s[0] === "o") {
        result += 1;
        s.splice(0, 3);
      } else if (s[0] === "t") {
        if (s.slice(0, 3).join("") === "two") {
          result += 2;
          s.splice(0, 3);
        } else {
          result += 3;
          s.splice(0, 5);
        }
      } else if (s[0] === "f") {
        if (s.slice(0, 4).join("") === "four") {
          result += 4;
          s.splice(0, 4);
        } else {
          result += 5;
          s.splice(0, 4);
        }
      } else if (s[0] === "s") {
        if (s.slice(0, 3).join("") === "six") {
          result += 6;
          s.splice(0, 3);
        } else {
          result += 7;
          s.splice(0, 5);
        }
      } else if (s[0] === "e") {
        result += 8;
        s.splice(0, 5);
      } else if (s[0] === "n") {
        result += 9;
        s.splice(0, 4);
      }
    }
  }

  return +result;
}

// function solution(s) {
//   const numWords = {
//     zero: "0",
//     one: "1",
//     two: "2",
//     three: "3",
//     four: "4",
//     five: "5",
//     six: "6",
//     seven: "7",
//     eight: "8",
//     nine: "9",
//   };

//   for (const [word, digit] of Object.entries(numWords)) {
//     s = s.split(word).join(digit);
//   }

//   return Number(s);
// }
