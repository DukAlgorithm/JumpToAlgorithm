// https://school.programmers.co.kr/learn/courses/30/lessons/81304

function solution(n, start, end, roads, traps) {
    const oriRoads = Array.from({ length: n+1 }, () => []);
    const oppRoads = Array.from({ length: n+1 }, () => []);
    for (const [from, to, time] of roads) {
        oriRoads[from].push([to, time]);
        oppRoads[to].push([from, time]);
    }

    const trapSet = new Set(traps);
    const visited = new Set(); 
    const heap = [[0, start, new Set()]]; // [누적시간, 현재위치, 발동중인trap]

    while (heap.length > 0) {
        heap.sort((a, b) => a[0] - b[0]); // 작은 누적시간부터 정렬
        const [cost, cur, actives] = heap.shift();

        // 도착
        if (cur === end) return cost;

        // 방문 확인
        const key = cur + "|" + [...actives].sort().join(',');
        if (visited.has(key)) continue;
        visited.add(key);

        const isCurTrapOn = actives.has(cur);

        // 정방향
        for (const [next, time] of oriRoads[cur]) {
            const isNextTrapOn = actives.has(next);
            const isReversed = isCurTrapOn ^ isNextTrapOn;
            if (!isReversed) { // 반전 X
                const newActives = new Set(actives);
                if (trapSet.has(next)) { // 다음 노드가 trap이면, 상태 바꿈
                    if (newActives.has(next)) newActives.delete(next);
                    else newActives.add(next);
                }
                heap.push([cost + time, next, newActives]);
            }
        }

        // 역방향
        for (const [prev, time] of oppRoads[cur]) {
            const isPrevTrapOn = actives.has(prev);
            const isReversed = isCurTrapOn ^ isPrevTrapOn;
            if (isReversed) { 
                const newActives = new Set(actives);
                if (trapSet.has(prev)) {
                    if (newActives.has(prev)) newActives.delete(prev);
                    else newActives.add(prev);
                }
                heap.push([cost + time, prev, newActives]);
            }
        }
    }
}

