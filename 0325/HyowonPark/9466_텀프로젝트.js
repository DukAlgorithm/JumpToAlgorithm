/**
 * 선택한 방향으로 -> -> 했을때 원이 만들어져야 통과. (그니까 다시 그 학생으로 도착하면!! )
 * 다시 안돌아오면 어느팀에도 속하지 않음! -> 이 학생들 수를 출력해야함
 *
 * 그래프네!!
 */
function sol9466() {
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");
  //   const input = `2
  // 7
  // 3 1 3 7 3 4 6
  // 8
  // 1 2 3 4 5 6 7 8`
  // .toString()
  // .trim()
  // .split("\n");
  const T = Number(input.shift().trim());
  for (let i = 0; i < T; i++) {
    const n = Number(input.shift()); // 학생 수
    const results = input
      .shift()
      .split(" ")
      .map((e) => Number(e) - 1); // 선택 결과

    const visited = new Array(n).fill(false);
    const inCurrentPath = new Array(n).fill(false); // 현재 경로에 있는지
    const inTeam = new Array(n).fill(false); // 팀에 속하는지

    // 각 학생에 대해 탐색
    for (let start = 0; start < n; start++) {
      if (visited[start]) continue; // 이미 방문했으면 스킵

      // 현재 학생부터 경로 추적
      let current = start;
      while (!visited[current]) {
        visited[current] = true;
        inCurrentPath[current] = true;
        current = results[current]; // 다음 학생으로 이동

        // 사이클 발견: 현재 경로에 있는 학생을 다시 만난 경우
        if (inCurrentPath[current]) {
          // 사이클 내의 학생들을 팀으로 표시
          let cycleStart = current;
          let temp = results[cycleStart];
          inTeam[cycleStart] = true;

          while (temp !== cycleStart) {
            inTeam[temp] = true;
            temp = results[temp];
          }
          break;
        }

        // 이미 방문한 학생이면서 현재 경로에 없으면, 이 경로는 팀이 되지 않음
        if (visited[current]) break;
      }

      // 현재 경로 표시 제거
      current = start;
      while (inCurrentPath[current]) {
        inCurrentPath[current] = false;
        current = results[current];
        if (current === start) break;
      }
    }

    const noTeam = inTeam.filter((x) => !x).length;
    console.log(noTeam);
  }
}

sol9466();
