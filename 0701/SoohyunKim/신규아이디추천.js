// https://school.programmers.co.kr/learn/courses/30/lessons/72410

function solution(new_id) {
    let ans = '';
    // 1단계
    ans = new_id.toLowerCase();
    // 2단계
    ans = ans.replace(/[^a-z0-9\-_.]/g, '');
    // 3단계
    ans = ans.replace(/\.{2,}/g, '.');
    // 4단계
    ans = ans.replace(/^\.|\.$/g, '');
    // 5단계
    if(!ans) ans = "a";
    // 6단계
    if(ans.length >= 16) {
        ans = ans.slice(0, 15);
        ans = ans.replace(/\.$/, '');
    }
    // 7단계
    if (ans.length <= 2) {
        const lastChar = ans.charAt(ans.length - 1);
        while (ans.length < 3) {
            ans += lastChar;
        }
    }
    
    return ans;
}