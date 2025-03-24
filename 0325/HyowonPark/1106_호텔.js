// 도시
// 각 도시별 홍보 비용, 고객 증가
// 호텔 고객을 적어도 c 명 늘이기 위해 투자비용 최솟값?

function sol1106() {
  const input = require("fs").readFileSync("/dev/stdin");
  //   const input = `12 2
  // 3 5
  // 1 1`;

  let [CN, ...costEffects] = input
    .toString()
    .trim()
    .split("\n")
    .map((e) => e.trim());
  const C = parseInt(CN.split(" ")[0]);
  costEffects = costEffects.map((line) => line.split(" ").map(Number)); // 이 줄을 추가하세요
  // C는 1000이하)(목표 고객 수)
  // N은 20이하 (도시 수 )
  // 고객수는 100이하

  /**
   * effect 가 도시당
   * x, y, z.. 등등이라고 하
   * a,b,c는 양의 정수
   * 그럼 ax + by + cz 가 C 이상이 최초로 되는 비용!!
   *
 
   */

  // dp[i] = i명의 고객을 얻기 위한 최소 비용
  // 무제한 배낭문제..
  const MAX_CUSTOMERS = C + 100; // 최대 고객 수
  const dp = Array(MAX_CUSTOMERS + 1).fill(Infinity);
  dp[0] = 0; // 0명 비용 0

  // 각 도시별 정보 처리
  for (const [cost, effect] of costEffects) {
    // 각 고객 수에 대해 최소 비용 계산
    for (let i = effect; i <= MAX_CUSTOMERS; i++) {
      dp[i] = Math.min(dp[i], dp[i - effect] + cost);
    }
  }
  let answer = Infinity;
  for (let i = C; i <= MAX_CUSTOMERS; i++) {
    answer = Math.min(answer, dp[i]);
  }
  console.log(answer);
}
sol1106();
