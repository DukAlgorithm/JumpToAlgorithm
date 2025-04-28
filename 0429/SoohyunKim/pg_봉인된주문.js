function solution(n, bans) {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'

  let len = 1; // n이 속한 범위의 글자 수
  while (n > 26 ** len) {
      len++;
  }
  
  // 위치 계산하는 함수
  const strToIndex = (str) => 
      [...str].reduce((a, c) => a * 26 + (c.charCodeAt(0) - 96), 0);
  
  // bans 순서대로 정렬
  bans.sort((a, b) => strToIndex(a) - strToIndex(b));
  
  // ban을 포함한 n을 다시 구함
  for (const ban of bans) {
      if (ban.length > len) break;
      
      // n 보다 작은 번호를 가진 ban만 count 증가
      if (strToIndex(ban) <= n) n += 1;
  }

  let answer = "";
  while (len--) {
      answer = alpha[(n - 1) % 26] + answer;
      n = Math.floor((n - 1) / 26);
  }

  return answer;
}