function solution(maze) {
  const n = maze.length;
  const m = maze[0].length;
  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
  
  const isWall = Array.from(Array(n), () => Array(m).fill(0));
  const initialVisitedRed = Array.from(Array(n), () => Array(m).fill(false));
  const initialVisitedBlue = Array.from(Array(n), () => Array(m).fill(false));

  const startRed = [], startBlue = [];
  const endRed = [], endBlue = [];

  for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
          const m = maze[r][c];
          if (m === 1) {
              startRed.push(r, c);
              initialVisitedRed[r][c] = true;
          } else if (m === 2) {
              startBlue.push(r, c);
              initialVisitedBlue[r][c] = true;
          } else if (m === 3) {
              endRed.push(r, c);
          } else if (m === 4) {
              endBlue.push(r, c);
          } else if (m === 5) {
              isWall[r][c] = true;
          }
      }
  }

  let answer = Infinity;

  const dfs = (redR, redC, blueR, blueC, cnt, visitedRed, visitedBlue) => {
      // 도착
      if(redR === endRed[0] && redC === endRed[1] && blueR === endBlue[0] && blueC === endBlue[1]) {
          answer = Math.min(answer, cnt);
          return;
      }

      for(const [rdr, rdc] of dirs) {
          let redNR = redR + rdr;
          let redNC = redC + rdc;

          // 빨강 도착
          if(redR === endRed[0] && redC === endRed[1]) {
              redNR = redR;
              redNC = redC;
              visitedRed[redNR][redNC] = false;
          }

          // 경계, 방문 검사
          if(redNR < 0 || redNR >= n || redNC < 0 || redNC >= m || 
             visitedRed[redNR][redNC] || isWall[redNR][redNC]
            ) continue;

          for(const [bdr, bdc] of dirs) {
              let blueNR = blueR + bdr;
              let blueNC = blueC + bdc;

              // 파랑 도착
              if(blueR === endBlue[0] && blueC === endBlue[1]) {
                  blueNR = blueR;
                  blueNC = blueC;
                  visitedBlue[blueNR][blueNC] = false;
              }
              
              // 경계, 방문 검사
              if(blueNR < 0 || blueNR >= n || blueNC < 0 || blueNC >= m || 
                 visitedBlue[blueNR][blueNC] || isWall[blueNR][blueNC]
                ) continue;
              // 자리 맞바꾸기 안됨
              if(redNR === blueR && redNC === blueC && blueNR === redR && blueNC === redC) continue;
              // 같은 곳으로 이동 불가
              if(redNR === blueNR && redNC === blueNC) continue;
              
              visitedRed[redNR][redNC] = true;
              visitedBlue[blueNR][blueNC] = true;
              dfs(redNR, redNC, blueNR, blueNC, cnt + 1, visitedRed, visitedBlue);
              visitedRed[redNR][redNC] = false;
              visitedBlue[blueNR][blueNC] = false;
          }
      }
  }

  dfs(startRed[0], startRed[1], startBlue[0], startBlue[1], 0, initialVisitedRed, initialVisitedBlue);

  return answer === Infinity ? 0 : answer;
}