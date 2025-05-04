/* https://school.programmers.co.kr/learn/courses/30/lessons/250136 */

function solution(land) {
  const n = land.length;
  const m = land[0].length;
  const visited = Array.from(Array(n), () => Array(m).fill(false));
  const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const colOil = Array(m).fill(0); // 각 열에서 얻을 수 있는 석유량

  function dfs(r, c, groupCols) {
      let stack = [[r, c]];
      let oil = 0;

      while (stack.length > 0) {
          const [x, y] = stack.pop();

          if (x < 0 || x >= n || y < 0 || y >= m) continue;
          if (visited[x][y] || land[x][y] === 0) continue;

          visited[x][y] = true;
          oil++;
          groupCols.add(y); // 현재 석유가 퍼져 있는 열 추가

          for (let [dx, dy] of dir) {
              stack.push([x + dx, y + dy]);
          }
      }
      return oil;
  }

  for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
          if (!visited[r][c] && land[r][c] === 1) {
              const groupCols = new Set();
              const oilCnt = dfs(r, c, groupCols);
              for (const col of groupCols) {
                  colOil[col] += oilCnt;
              }
          }
      }
  }

  return Math.max(...colOil);
}