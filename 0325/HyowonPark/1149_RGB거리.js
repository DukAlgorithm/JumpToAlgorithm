function sol1149() {
  //   const input = `3
  // 26 40 83
  // 49 60 57
  // 13 89 99`
  //     .toString()
  //     .split("\n");
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

  const N = Number(input.shift());
  const costs = input.map((e) => e.split(" ").map(Number));
  // [ [0번집 R로 칠한 비용,0번집 G비용,0번집 B비용]. [1번집 R, 1번집 G, 1번집 B] ]

  // 3의 N제곱이 모든 경우의수 근데 조건이 .. 흠
  //. 일단 N 이 3이면
  // 처음 집 마지막 집은 옆에 한쪽밖에 없으니까 글타치고
  // 그냥 연속으로 같은 색 칠하면 안된다. ..
  // 처음 색에 따라..
  /**
 * dp[i][j] -> i번째집을 j색으로 칠했을때 최소 비용 
이거 ㄹ이해해볼게. 
일단 0번째 집은 각각 칠하고 시작
그럼 1번째집을 칠하는 경우는
0번째 집을 0으로 칠했을땐 1번쨰 집을 1이나 2로 칠할 수 있고 
0번째 집을 1로 칠했을땐 1번째 집은 0이나 2로 칠할 수 있음.. 등등 
dp[0][0] 
dp[0][1]
dp[0][2]
처음엔 이렇게 있어. 이게 계속 뿌리를 내려서? 
dp[0][0]  이 줄기는 dp[1][1], dp[1][2] 이렇게 갈라지고 
 */
  // dp[i][j] -> i번째집을 j색으로 칠했을때 최소 비용
  const dp = Array.from({ length: N }, () => [0, 0, 0]);

  // 처음 집을 각 RGB로 칠하고 시작 R(i=0) G(i=1) B(i=2)
  dp[0][0] = costs[0][0]; // R
  dp[0][1] = costs[0][1]; // G
  dp[0][2] = costs[0][2]; // B

  // 두 번째 집부터 계산 시작
  for (let i = 1; i < N; i++) {
    // i 번째집 빨간색으로 칠할 경우 = i-1번째집은 다른색(G B) 중
    dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }

  const min = Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);

  console.log(min);
}

sol1149();
