// https://school.programmers.co.kr/learn/courses/30/lessons/67257

function solution(expression) {
    const nums = expression.split(/[\+\-\*]/).map(Number);
    const ops = expression.match(/[\+\-\*]/g);
    const opsSet = [...new Set(ops)];
    
    const priorities = getPermutations(opsSet); // 연산자 우선순위
    let answer = 0;
    
    for (const priority of priorities) {
        const numStack = [...nums];
        const opStack = [...ops];

        for (const op of priority) {
            let newNums = [numStack[0]]; // 연산 결과
            let newOps = []; // 계산되지 않은 연산자

            for (let i = 0; i < opStack.length; i++) {
                if (opStack[i] === op) { // 현재 우선순위 연산자일 경우
                    const a = newNums.pop(); // 직전 숫자
                    const b = numStack[i + 1]; // 다음 숫자
                    newNums.push(calc(a, b, op)); // 계산 결과 저장
                } else {
                    newNums.push(numStack[i + 1]);
                    newOps.push(opStack[i]);
                }
            }

            numStack.length = 0;
            opStack.length = 0;
            numStack.push(...newNums);
            opStack.push(...newOps);
        }

        answer = Math.max(answer, Math.abs(numStack[0]));
    }
    
    return answer;
}

function getPermutations(arr) { // 조합 생성 함수
    const result = [];

    function dfs(path, used) {
        if (path.length === arr.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(arr[i]);
            dfs(path, used);
            path.pop();
            used[i] = false;
        }
    }

    dfs([], Array(arr.length).fill(false));
    return result;
}

function calc(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
}
