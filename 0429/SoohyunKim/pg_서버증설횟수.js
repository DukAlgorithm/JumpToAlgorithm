function solution(players, m, k) {
  let answer = 0; // 증설 횟수
  let server = [];

  for(let h = 0; h < 24; h++) {
      server = server.map(x => x - 1).filter(x => x !== 0);

      // 1. 이용자가 적어 증설이 필요 없음
      if(players[h] < m) continue;

      // 2. 서버가 충분해서 증설이 필요 없음
      const reqSer = Math.floor(players[h] / m);
      if(server.length > reqSer) {
          continue;
      }

      // 3. 서버 증설 필요
      const len = reqSer - server.length;
      for (let i = 0; i < len; i++) {
          server.push(k);
          answer++;
      }
  }
  return answer;
}