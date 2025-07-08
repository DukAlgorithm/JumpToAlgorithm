// https://school.programmers.co.kr/learn/courses/30/lessons/60058

function solution(p) {
    if(p === "") return "";

    function isCorrect(str) {
        const stack = [];
        for (let ch of str) {
            if (ch === "(") {
                stack.push(ch);
            } else {
                if (stack.length === 0) return false;
                stack.pop();
            }
        }
        return stack.length === 0;
    }

    function splitBalanced(str) {
        let open = 0, close = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "(") open++;
            else close++;
            if (open === close) return [str.slice(0, i + 1), str.slice(i + 1)];
        }
    }

    const [u, v] = splitBalanced(p);

    if (isCorrect(u)) {
        return u + solution(v);
    } else {
        let temp = "(";
        temp += solution(v);
        temp += ")";
        const reversed = u.slice(1, -1).split("").map(ch => (ch === "(" ? ")" : "(")).join("");
        temp += reversed;
        return temp;
    }
}