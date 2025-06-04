// https://school.programmers.co.kr/learn/courses/30/lessons/67258?language=javascript

function solution(gems) {
    const total = new Set(gems).size // 보석 종류 수
    const map = new Map()
    let answer = [0, gems.length - 1]; 
    let left = 0
    
    for (let right = 0; right < gems.length; right++) {
        const gem = gems[right]
        map.set(gem, (map.get(gem) || 0) + 1) // {보석 => 개수}

        while (map.size === total) {
            // 최소 구간 저장
            if ((right - left) < (answer[1] - answer[0])) {
                answer = [left, right]
            }

            const leftGem = gems[left];
            
            // 왼쪽 보석 개수 제거, left 인덱스 증가
            map.set(leftGem, map.get(leftGem) - 1);
            if (map.get(leftGem) === 0) {
                map.delete(leftGem);
            }
            left++;
        }   
    }

    return [answer[0] + 1, answer[1] + 1];
}

