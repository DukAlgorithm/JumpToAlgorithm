/* https://school.programmers.co.kr/learn/courses/30/lessons/258712 */

function solution(friends, gifts) {
    const len = friends.length;
    const gTable = Array.from(Array(len), () => Array(len).fill(0));
    const gPoint = Array.from(Array(len), () => 0);
    const answer = Array(len).fill(0);
    
    // 주고 받은 선물 표
    for(let i = 0; i < gifts.length; i++) {
        const [from, to] = gifts[i].split(' ');
        const row = friends.indexOf(from);
        const col = friends.indexOf(to);
        gTable[row][col] += 1;  
    }
    
    // 선물 지수 계산
    for(let r = 0; r < len; r++) {
        for(let c = 0; c < len; c++) {
            gPoint[r] += gTable[r][c];
            gPoint[c] -= gTable[r][c];
        }
    }
    
    // 다음달 선물 계산
    for(let r = 0; r < len - 1; r++) { // nC2
        for(let c = r + 1; c < len; c++) {
            const p1 = gTable[r][c];
            const p2 = gTable[c][r];
            
            if (p1 > p2) {
                answer[r] += 1;
            } else if (p1 < p2) {
                answer[c] += 1;
            } else {
                if(gPoint[r] > gPoint[c]) {
                    answer[r] += 1;
                } else if (gPoint[r] < gPoint[c]) {
                    answer[c] += 1;
                } else {
                    continue;
                }
            }
            
        }
    }

    return Math.max(...answer);
}
