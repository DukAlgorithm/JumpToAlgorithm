// https://school.programmers.co.kr/learn/courses/30/lessons/68644

function solution(numbers) {
    const sumArr = [];
    for(let i = 0; i < numbers.length - 1; i++) {
        for(let j = i + 1; j < numbers.length; j++) {
            sumArr.push(numbers[i] + numbers[j]);
        }
    }
    
    const set = new Set([...sumArr])
    const answer = [...set];
    answer.sort((a, b) => a - b);

    return answer;
}