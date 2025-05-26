// https://school.programmers.co.kr/learn/courses/30/lessons/258705

function solution(n, tops) {
    const NUM = 10007;
    const dp = Array.from({ length: n+1 }, () => 0);
    
    dp[1] = tops[0] ? 4 : 3;
    dp[0] = 1;
    
    for(let i = 2; i <= n; i++) {
        const cur = tops[i-1] ? 4 : 3;
        dp[i] = (dp[i-1] * cur - dp[i-2] + NUM) % NUM;
    }
    
    return dp[n];
}
