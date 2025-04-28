// dp 사용
function solution(info, n, m) {
  const len = info.length;
  const dp = Array.from({ length: len + 1 }, () =>
      Array.from({ length: n }, () => Array(m).fill(false))
  );
  let minA = Infinity;

  function dfs(i, sumA, sumB) {
      if (sumA >= n || sumB >= m) return;
      // 방문 여부 검사, 방문했을 경우 중단
      if (dp[i][sumA][sumB]) return;
      dp[i][sumA][sumB] = true;

      if (i === len) {
          minA = Math.min(minA, sumA);
          return;
      }

      dfs(i + 1, sumA + info[i][0], sumB);
      dfs(i + 1, sumA, sumB + info[i][1]);
  }
  dfs(0, 0, 0);

  return minA === Infinity ? -1 : minA;
}


// 시간 초과
function solution(info, n, m) {
  const len = info.length;
  let minA = Infinity;

  function dfs(i, sumA, sumB) {
      if(sumA >= n || sumB >= m) return;
      
      if(i === len) {
          minA = Math.min(minA, sumA);
          return;
      }
      
      dfs(i + 1, sumA + info[i][0], sumB);
      dfs(i + 1, sumA, sumB + info[i][1]); 
  }
  
  dfs(0, 0, 0);
  return minA === Infinity ? -1 : minA;
}
