/* https://school.programmers.co.kr/learn/courses/30/lessons/250137 */ 

function solution(bandage, health, attacks) {
  const [bt, bx, by] = bandage;
  const maxT = attacks[attacks.length - 1][0]; // 플레이 타임
  let ai = 0; // attacks 배열 인덱스
  let bb = 0; // 연속 회복 시간
  let answer = health;

  for(let i = 1; i <= maxT; i++) {
    if (attacks[ai][0] === i) {
      answer -= attacks[ai][1];
      ai++;
      bb = 0;
    } else {
      bb++;
      answer += bx;
      if (bb === bt) {
          answer += by;
          bb = 0;
      }

      if (answer > health) answer = health;
    }
    if (answer <= 0) return -1;
  }
  return answer;
}
