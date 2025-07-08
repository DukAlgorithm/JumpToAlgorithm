// https://school.programmers.co.kr/learn/courses/30/lessons/60057

function solution(s) {
    let minLen = s.length;

    for (let size = 1; size <= Math.floor(s.length / 2); size++) {
        const divisions = [];
        for (let i = 0; i < s.length; i += size) {
            divisions.push(s.slice(i, i + size));
        }

        let compressed = "";
        let cnt = 1;

        for (let i = 1; i <= divisions.length; i++) {
            if (divisions[i] === divisions[i - 1]) {
                cnt++;
            } else {
                compressed += (cnt > 1 ? cnt : "") + divisions[i - 1];
                cnt = 1;
            }
        }

        minLen = Math.min(minLen, compressed.length);
    }

    return minLen;
}
