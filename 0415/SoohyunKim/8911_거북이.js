const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const T = input[0].split(" ").map(Number);
for (let t = 1; t <= T; t++){
  const program = input[t].split("");
  // 거북이 위치 기록
  const turtle = [[0, 0]]; 
  // 거북이 방향
  const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let d = 0;
  // 최대 최소 x, y 좌표
  let maxX = 0;
  let minX = 0;
  let maxY = 0;
  let minY = 0;

  // 거북이 프로그램 수행
  for(let i = 0; i < program.length; i++){
    let [x, y] = turtle[i];
    const p = program[i];
    
    if(p === "F"){
      x += dir[d][0];
      y += dir[d][1];
    } else if(p === "B") {
      x -= dir[d][0];
      y -= dir[d][1];
    } else if(p === "L") {
      d = d - 1;
      if(d < 0) d = 3;
    } else if(p === "R") {
      d = d + 1;
      if(d > 3) d = 0;
    }
    turtle.push([x, y]);

    if(maxX < x) maxX = x;
    if(minX > x) minX = x;
    if(maxY < y) maxY = y;
    if(minY > y) minY = y;
  }

  const answer = (maxX - minX) * (maxY - minY);
  console.log(answer);
}