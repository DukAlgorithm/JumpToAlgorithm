const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const N = +input[0];
const list = input[1].split(' ').map(Number);

const company = Array.from({ length: N }, () => []);
// i번 직원의 직속 부하 목록
for (let i = 1; i < N; i++) {
  const boss = list[i];
  company[boss].push(i); 
}

function dfs(manager) {
  const callTimes = [];

  for (const m of company[manager]) {
    callTimes.push(dfs(m));
  }

  // 전화 시간이 긴 부하부터 처리
  callTimes.sort((a, b) => b - a);
  let maxTime = 0;
  for (let i = 0; i < callTimes.length; i++) {
    // 부하 전달 시간 + 대기시간 i + 전화 시간 1 
    maxTime = Math.max(maxTime, callTimes[i] + i + 1);
  }

  return maxTime;
}

console.log(dfs(0));