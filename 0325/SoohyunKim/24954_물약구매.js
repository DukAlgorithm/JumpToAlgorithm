const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = Number(input.shift()); // 물약 종류
const cost = [null, ...input.shift().split(' ').map(Number)]; // 물약 가격

// 할인 정보 배열 저장
const sale = Array.from(Array(N + 1), () => []);
for(let i = 1; i <= N; i++){
  let count = input.shift();
  sale[i] = count ? input.splice(0, count).map(line => line.split(' ').map(Number)) : null;
}

function getPermutations(arr) {
  let result = [];

  function permute(start) {
    if (start === arr.length) {
      result.push([...arr]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap
      permute(start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap Back
    }
  }

  permute(0);
  return result;
}

// 순열을 생성하는 함수
function simulatePurchase(order) {
  let totalCost = 0;
  let discount = Array(N + 1).fill(0); // 각 물약에 적용된 할인

  for (let potion of order) {
      let currentPrice = Math.max(1, cost[potion] - discount[potion]);
      totalCost += currentPrice;

      // 현재 구매한 물약이 제공하는 할인 적용
      for (let [a, d] of sale[potion]) {
          discount[a] += d;
      }
  }

  minTotalCost = Math.min(minTotalCost, totalCost);
}

// 1부터 N까지의 순열을 생성
let orderArray = Array.from({ length: N }, (_, i) => i + 1);
const allPermutations = getPermutations(orderArray);

// 최소 비용 계산
let minTotalCost = Infinity;
for (let perm of allPermutations) {
  simulatePurchase(perm);
}

console.log(minTotalCost);