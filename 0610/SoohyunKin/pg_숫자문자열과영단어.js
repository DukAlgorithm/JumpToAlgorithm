// https://school.programmers.co.kr/learn/courses/30/lessons/81301

function solution(s) {
    const map = new Map([
        ['0', 'zero'], 
        ['1', 'one'], 
        ['2', 'two'],
        ['3', 'three'],
        ['4', 'four'],
        ['5', 'five'],
        ['6', 'six'],
        ['7', 'seven'],
        ['8', 'eight'],
        ['9', 'nine']
    ]);
    
    let answer = '';
    let eng = '';
    
    for (let c of s) {
        if(map.has(c)) {
            answer += c;
            continue;
        } else {
            eng += c;
        }
        
        for (const [key, val] of map) {
            if (val === eng) {
                answer += key;
                eng = '';
                break;
            }
        }
    }

    return +answer;
}

// 다른 풀이
function solution(s) {
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var answer = s;

    for(let i=0; i< numbers.length; i++) {
        let arr = answer.split(numbers[i]);
        answer = arr.join(i);
    }

    return Number(answer);
}