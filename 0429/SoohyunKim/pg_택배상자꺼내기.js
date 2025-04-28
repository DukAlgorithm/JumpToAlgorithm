function solution(n, w, num) {
  // 전체 행 개수와 마지막 행의 박스 배열 계산
  const row =  Math.ceil(n / w);
  const re = (n % w === 0) ? w : n % w;
  let last = Array(w).fill(null);
  if (row % 2 === 0) {
    for (let i = w - re; i < w; i++) {
        last[i] = n--;
    }
  } else {
    for (let i = 0; i < re; i++) {
        last[i] = n--;
    }
  }

  // num 위치 계산
  const numRow =  Math.ceil(num / w);
  const numCol = (numRow % 2 === 0) ? (w - (num - 1) % w) : ((num - 1) % w + 1);

  // 답
  const answer = (last[numCol - 1] === null) ? row - numRow : row - numRow + 1;
  return answer;
}
