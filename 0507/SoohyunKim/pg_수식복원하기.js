/* https://school.programmers.co.kr/learn/courses/30/lessons/340210 */
// 테스트 16, 20 실패

function solution(expressions) {
  const known = [];
  const unknown = [];
  const digits = [];

  for (const expr of expressions) {
      const [a, ope, b, _, c] = expr.split(' ');
      if(a.length === 1) digits.push(a);
      if(b.length === 1) digits.push(b);

      if (c === 'X') unknown.push([a, ope, b]);
      else known.push([a, ope, b, c]);
  }

  const minBase = Math.max(...digits) + 1; // 가능한 최소 진법
  const possibleBases = [];
  for (let base = minBase; base <= 9; base++) {
      if (known.every(([a, ope, b, c]) => calc(base, a, b, ope) === c)) {
          possibleBases.push(base);
      }
  }

  const answer = [];
  for (const [a, ope, b] of unknown) {
      const results = new Set();
      
      for (const base of possibleBases) {
          const result = calc(base, a, b, ope);
          if(result !== null) {
              console.log(base, result);
              results.add(result)
          }
      }
      
      const c = results.size === 1 ? [...results][0] : '?';
      answer.push(`${a} ${ope} ${b} = ${c}`);
  }

  return answer;
}

function calc(base, a, b, ope) {
  const n1 = parseInt(a, base);
  const n2 = parseInt(b, base);

  let res = ope === '+' ? n1 + n2 : n1 - n2;

  return res.toString(base);
}