const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

const queue = [];
for (let i = 1; i <= N; i++){ 
  queue.push(i);
}

let answer = 0;

for(let i = 0; i < M; i++){
  let target = queue.indexOf(list[i]); // 제거 대상 위치

  while(list[i] !== queue[0]){
    if(target <= queue.length / 2){ // 타겟이 큐 앞쪽 절반에 있으면 왼쪽 회전
      let qf = queue[0];
      queue.shift();
      queue.push(qf);
      answer++;
    } else if(target >= queue.length / 2){ // 뒷쪽 절반에 있으면 오른쪽 회전
      let ql = queue[queue.length - 1];
      queue.pop();
      queue.unshift(ql);
      answer++;
    }
  }

  if(list[i] === queue[0]){ 
    queue.shift(); // 타겟 제거
  }
}

console.log(answer);