const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const T = input.shift().split(' ').map(Number);
const array = input.map(row => row);

array.map((str) => {
  if (/^(100+1+|01)+$/.test(str)) console.log('YES');
  else console.log('NO');
});