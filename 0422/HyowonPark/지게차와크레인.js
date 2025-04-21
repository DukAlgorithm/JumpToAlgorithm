/**
 * (n, m)
 * 알파벳 하나 -> 지게차 사용: 외부랑 연결된것만 꺼냄
 * 알파벳 둘 -> 크레인 사용: 모든 컨테이너 꺼냄
 * @param {컨테이너 정보, 1차원 배열} storage
 * @param {출고 요청, 1차원 배열} requests
 * @returns {남은 컨테이너 수}
 */
function solution(storage, requests) {
  const n = storage.length;
  const m = storage[0].length;
  const containers = storage.map((row) => [...row]);
  const EMPTY = "-";
  let emptyCounts = 0;

  for (const request of requests) {
    const target = request[0];
    // 크레인 사용 (두 글자가 같은 알파벳)
    if (request.length === 2) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (containers[i][j] === target) {
            containers[i][j] = EMPTY;
            emptyCounts++;
          }
        }
      }
    } else {
      // 1) snapshot & pad 복사
      const snapshot = containers.map((r) => [...r]);
      const padN = n + 2,
        padM = m + 2;
      const pad = Array.from({ length: padN }, () => Array(padM).fill(EMPTY));
      for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++) pad[i + 1][j + 1] = snapshot[i][j];

      // 2) DFS로 빈 칸만 탐색
      const reachable = Array.from({ length: padN }, () =>
        Array(padM).fill(false)
      );
      function dfsEmpty(x, y) {
        if (
          x < 0 ||
          x >= padN ||
          y < 0 ||
          y >= padM ||
          reachable[x][y] ||
          pad[x][y] !== EMPTY
        )
          return;
        reachable[x][y] = true;
        dfsEmpty(x + 1, y);
        dfsEmpty(x - 1, y);
        dfsEmpty(x, y + 1);
        dfsEmpty(x, y - 1);
      }
      dfsEmpty(0, 0); // 바깥 구석에서 시작

      // 3) 이 시점의 containers에서 제거 대상을 roots에 모음
      const roots = [];
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (containers[i][j] !== target) continue;
          // pad 상에서 (i+1,j+1)의 4방향 중 하나라도 reachable이면 노출된 셀
          if (
            reachable[i + 2][j + 1] ||
            reachable[i][j + 1] ||
            reachable[i + 1][j + 2] ||
            reachable[i + 1][j]
          ) {
            roots.push([i, j]);
          }
        }
      }

      // 4) roots 돌면서 DFS로 같은 덩어리 제거 (혹은 그냥 개별 제거)
      for (const [i, j] of roots) {
        // (덩어리 단위 제거가 필요하면 여기서 또 findConnected DFS)
        if (containers[i][j] === target) {
          containers[i][j] = EMPTY;
          emptyCounts++;
        }
      }
    }
  }

  return n * m - emptyCounts;
}

const cases = [
  [["AZWQY", "CAABX", "BBDDA", "ACACA"], ["A", "BB", "A"], 11],
  [["HAH", "HBH", "HHH", "HAH", "HBH"], ["C", "B", "B", "B", "B", "H"], 4],
];

cases.forEach((e) => {
  const result = solution(e[0], e[1]);
  console.log("result:", result);
});
