// https://school.programmers.co.kr/learn/courses/30/lessons/92335

function solution(n, k) {
    const baseN = n.toString(k);
    const numList = baseN.split(0).map(Number).filter(n => n > 1);

    let answer = 0;
    for(let num of numList) {
        if(isPrime(+num)) {
            answer++;
        }
    }

    return answer;
}

function isPrime(n) {
    if (n === 2) return true;
    if (n % 2 === 0) return false; 
    
    const sqrt = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}