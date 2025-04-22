function solution(n, q, ans) {
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const combinations = getCombinations(nums, 5); // 1~n 배열로 만들 수 있는 조합
  let answer = 0;

  for (const comb of combinations) {
      let valid = true;
      for (let i = 0; i < q.length; i++) {
          const count = comb.filter(v => q[i].includes(v)).length;
          if (count !== ans[i]) {
              valid = false;
              break;
          } 
      }
      if (valid) answer++;
  }

  return answer;
}

// 조합 생성 함수
function getCombinations(arr, len) {
  const result = [];

  const recur = (start, comb) => {
      if (comb.length === len) {
          result.push([...comb]);
          return;
      }
      for (let i = start; i < arr.length; i++) {
          comb.push(arr[i]);
          recur(i + 1, comb);
          comb.pop();
      }
  };

  recur(0, []);
  return result;
}

