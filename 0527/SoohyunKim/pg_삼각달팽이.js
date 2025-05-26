// https://school.programmers.co.kr/learn/courses/30/lessons/68645

function solution(n) {
    const last = (n * (n + 1)) / 2;
    const answer = Array(last).fill(0);

    let cur = 1;  // 현재 숫자
    let x = -1, y = 0; // 현재 위치
    let direction = 0; 
    const map = Array.from({ length: n }, (_, i) => Array(i + 1).fill(0)); // 삼각형 배열

    for (let i = 0; i < last; i++) {
        if (direction === 0) {
            x += 1;
        } else if (direction === 1) {
            y += 1;
        } else {
            x -= 1;
            y -= 1;
        }

        map[x][y] = cur++;

        // 방향 전환
        const nx = x + (direction === 0 ? 1 : direction === 2 ? -1 : 0);
        const ny = y + (direction === 1 ? 1 : direction === 2 ? -1 : 0);
        if (
            nx < 0 || ny < 0 || nx >= n ||
            ny > nx || map[nx][ny] !== 0
        ) {
            direction = (direction + 1) % 3;
        }
    }

    return map.flat();
}