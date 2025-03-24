function sol24954() {
  //   const input = `4
  //   10 15 20 25
  //   2
  //   3 10
  //   2 20
  //   0
  //   1
  //   4 10
  //   1
  //   1 10`.split("\n");
  const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

  const N = Number(input.shift()); // 물약 종류
  const costs = input.shift().trim().split(" ").map(Number); // 물약 가격
  const discounts = []; // 각 물약 할인 정보 [{  index: 구매 물약, discounts: [[물약 번호, 할인 동전 수]]  }]

  for (let i = 0; i < N; i++) {
    const m = input.shift(); // 물약 i 의 할인 정보 수
    for (let j = 0; j < m; j++) {
      const [num, discount] = input.shift().trim().split(" ").map(Number); // 물약 번호, 할인 동전 수
      const idx = discounts.findIndex((e) => e.index === i);
      if (idx >= 0) {
        discounts[idx].discounts.push([num - 1, discount]);
      } else {
        discounts.push({
          index: i,
          discounts: [[num - 1, discount]],
        });
      }
    }
  }

  /**
   * 0123
   * 0132
   * ...
   * 4 X 3 X 2 X 1 만큼의 경우..
   * N!
   */
  let min = Infinity;

  // 물약 배열 [0,1,2,... N-1]
  const potions = Array.from({ length: N }, (_, i) => i);

  // 모든 순열생성. 비용 계산 (도움 받음)
  function permute(arr, start = 0) {
    if (start === arr.length - 1) {
      // 현재 순열에 대한 비용 계산
      min = Math.min(min, calculateCost(arr));
      return;
    }

    for (let i = start; i < arr.length; i++) {
      // 위치 교환
      [arr[start], arr[i]] = [arr[i], arr[start]];
      // 재귀 호출
      permute(arr, start + 1);
      // 원래대로
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }

  // 구매 순서별 비용 계싼
  function calculateCost(order) {
    // 현재 물약 가격
    const currentCosts = [...costs];
    let totalCost = 0;

    // 주어진 순서대로 물약 구매
    for (const potionIdx of order) {
      // 현재 물약 구매
      totalCost += Math.max(1, currentCosts[potionIdx]);

      // 현재 물약 구매로 인한 할인 적용
      const discountInfo = discounts.find((d) => d.index === potionIdx);
      if (discountInfo) {
        for (const [
          discountPotionIdx,
          discountAmount,
        ] of discountInfo.discounts) {
          currentCosts[discountPotionIdx] = Math.max(
            1,
            currentCosts[discountPotionIdx] - discountAmount
          );
        }
      }
    }

    return totalCost;
  }

  // 순열 생성 및 계산 시작
  permute(potions);
  console.log(min);
}
sol24954();
