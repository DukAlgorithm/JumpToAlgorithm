// https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
    let curL = [4, 1]
    let curR = [4, 3]
    let answer = ""
    
    if(hand === "right") hand = "R";
    else hand = "L";
    
    for(const n of numbers) {
        if(n === 1 || n === 4 || n === 7) {
            answer += "L"
            curL = location(n)
        } else if(n === 3 || n === 6 || n === 9) {
            answer += "R"
            curR = location(n)
        } else {
            const curN = location(n)
            console.log(curN)
            const disL = distance(curN[0], curN[1], curL[0], curL[1])
            const disR = distance(curN[0], curN[1], curR[0], curR[1])
            
            if(disL < disR) {
                answer += "L"
                curL = curN
            } else if(disL > disR) {
                answer += "R"
                curR = curN
            } else {
                answer += hand
                if(hand === "L") curL = curN
                else curR = curN
                console.log(hand)
            }
        }
        
    }
    
    return answer;
}
    
function location(n) { // 현재 위치
    let l = [];

    if (n === 1) l = [1, 1]
    if (n === 4) l = [2, 1]
    if (n === 7) l = [3, 1]
    if (n === 2) l = [1, 2]
    if (n === 5) l = [2, 2]
    if (n === 8) l = [3, 2]
    if (n === 0) l = [4, 2]
    if (n === 3) l = [1, 3]
    if (n === 6) l = [2, 3]
    if (n === 9) l = [3, 3]

    return l;
}

function distance(x1, y1, x2, y2) { // 거리
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}