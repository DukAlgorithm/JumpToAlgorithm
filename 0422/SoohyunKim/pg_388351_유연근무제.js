function solution(schedules, timelogs, startday) {
  let answer = 0;
  // 주말
  let sat = 6 - startday;
  const sun = sat + 1;
  if(startday === 7) sat = 6;
  
  
  for(let i = 0; i < schedules.length; i++) {
      let cnt = 0;
      let maxT = schedules[i] + 10; // 출근 가능한 최대 시간
      if(maxT % 100 >= 60) { // 분 조정
          maxT = maxT + 100 - 60;
      }
      
      for(let day = 0; day < 7; day++){
          if(day === sat || day === sun) continue; // 주말 지나침
          
          let curT = timelogs[i][day];
          if(curT > maxT) break;            
          else cnt++;
      }
      if(cnt === 5) answer++;
  }
  return answer;
}