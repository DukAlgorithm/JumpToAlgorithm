// https://school.programmers.co.kr/learn/courses/30/lessons/81303

function solution(n, k, cmd) {
    const prev = Array(n).fill(null).map((_, i) => i - 1);
    const next = Array(n).fill(null).map((_, i) => i + 1);
    const removed = [];
    let cur = k;
  
    for (const c of cmd) {
        const [k, v] = c.split(" ");

        if (k === "U") {
            let cnt = +v;
            while (cnt--) cur = prev[cur];
        } else if (k === "D") {
            let cnt = +v;
            while (cnt--) cur = next[cur];
        } else if (k === "C") {
            removed.push([cur, prev[cur], next[cur]]);
            if (prev[cur] !== -1) next[prev[cur]] = next[cur];
            if (next[cur] !== n) prev[next[cur]] = prev[cur];

            cur = next[cur] !== n ? next[cur] : prev[cur];
        } else if (k === "Z") {
            const [z, p, ni] = removed.pop();
            if (p !== -1) next[p] = z;
            if (ni !== n) prev[ni] = z;
        }
    }

    const answer = Array(n).fill("O");
    for (const [idx] of removed) answer[idx] = "X";

    return answer.join("");
}

