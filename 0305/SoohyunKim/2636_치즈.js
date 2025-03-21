const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [row, col] = input.shift().split(' ').map(Number);
let graph = input.map(line => line.split(' ').map(Number));

let answerTime = 0; // 모두 녹는데 걸린 시간
let total = 0;  // 처음 치즈의 칸수
for (let i = 0; i < row; i++){    
  for (let j = 0; j < col; j++){
    if(graph[i][j] === 1)
      total++;
  }
}

while(bfs(0, 0));

function bfs(x, y){
  let past = total;  
  let visited = Array.from(Array(row), () => Array(col).fill(false));
  let queue = [];
  queue.push([x, y]);

  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  while(queue.length){
    const [cy, cx] = queue.shift();

    for(let next = 0; next < 4; next++){
      let ny = cy + dy[next];
      let nx = cx + dx[next];

      if(ny < 0 || ny >= row || nx < 0 || nx >= col) continue;

      // 다음칸이 '공기'인 경우
      if(!visited[ny][nx] && graph[ny][nx] === 0){
        visited[ny][nx] = true;
        queue.push([ny, nx]);        
      }

      // 다음칸이 '치즈'인 경우
      else if (!visited[ny][nx] && graph[ny][nx] === 1){
        visited[ny][nx] = true;
        total--;
        graph[ny][nx] = 2;  // 삭제 대기
      }
    }
  }  
  answerTime++;

  if(total === 0){
    console.log(answerTime);
    console.log(past);
    return false;
  }   

  // 공기와 닿은 치즈를 녹인다
  for(let i = 0; i < graph.length; i++){  
    for(let j = 0; j < graph[i].length; j++){
      if (graph[i][j] === 2)
        graph[i][j] = 0;
    }
  }
  return true;
}