/* https://school.programmers.co.kr/learn/courses/30/lessons/340212 */ 

function solution(diffs, times, limit) {
  let lvL = 1;
  let lvR = diffs.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
  let answer = lvR;

  while(lvL <= lvR) {
      let level = Math.floor((lvL + lvR) / 2);
      let play_t = 0;
      let pass = true;

      // 게임 시작
      for(let i = 0; i < diffs.length; i++) {
          const diff = diffs[i];
          const time_cur = times[i];
          let time_prev = times[i-1];

          if(diff <= level) {
              play_t += time_cur;
          } else {
              play_t += (diff - level) * (time_prev + time_cur) + time_cur;
          }
          // 게임 불통 여부 확인
          if (play_t > limit) {
              pass = false;
              break;
          }
      }

      if (pass) { // 통과
          answer = level;
          lvR = level - 1;
      } else { // 불통과
          lvL = level + 1;
      }
  }
  return answer;  
}