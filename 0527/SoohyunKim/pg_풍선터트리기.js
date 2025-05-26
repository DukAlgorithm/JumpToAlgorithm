// https://school.programmers.co.kr/learn/courses/30/lessons/68646

function solution(a) {
    const n = a.length;
    const leftMin = Array(n).fill(Infinity);
    const rightMin = Array(n).fill(Infinity);

    // 왼쪽 최소값
    let min = Infinity;
    for (let i = 0; i < n; i++) {
        min = Math.min(min, a[i]);
        leftMin[i] = min;
    }

    // 오른쪽 최소값
    min = Infinity;
    for (let i = n - 1; i >= 0; i--) {
        min = Math.min(min, a[i]);
        rightMin[i] = min;
    }

    let answer = 0;

    for (let i = 0; i < n; i++) {
        const l = i === 0 ? Infinity : leftMin[i - 1]; 
        const r = i === n - 1 ? Infinity : rightMin[i + 1]; 
        if (a[i] <= l || a[i] <= r) answer++;
    }

    return answer;
}