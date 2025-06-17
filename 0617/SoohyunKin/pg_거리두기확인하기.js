// https://school.programmers.co.kr/learn/courses/30/lessons/81302

// 1. 조건
function solution(places) {
    let answer = Array(5).fill(1);
    
    for (let t = 0; t < 5; t++) {
        let isValid = 1;
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if(places[t][r][c] === "P") {
                    isValid = check(t, r, c);
                }
                if(isValid === 0) break;
            }
            if (isValid === 0) {
                answer[t] = 0;
                break;                
            }
        }
    }

    function check(t, r, c) {
        const inRange = (x, y) => x >= 0 && x < 5 && y >= 0 && y < 5;

        // 오른쪽
        if (inRange(r, c + 1) && places[t][r][c + 1] === "P") return 0;

        // 아래쪽
        if (inRange(r + 1, c) && places[t][r + 1][c] === "P") return 0;

        // 오른쪽 2칸
        if (inRange(r, c + 2) && places[t][r][c + 1] === "O" && places[t][r][c + 2] === "P") return 0;

        // 아래쪽 2칸
        if (inRange(r + 2, c) && places[t][r + 1][c] === "O" && places[t][r + 2][c] === "P") return 0;

        // 오른쪽 아래 대각선
        if (
            inRange(r + 1, c + 1) && places[t][r + 1][c + 1] === "P" &&
            (
                (inRange(r, c + 1) && places[t][r][c + 1] === "O") ||
                (inRange(r + 1, c) && places[t][r + 1][c] === "O")
            )
        ) return 0;

        // 오른쪽 위 대각선
        if (
            inRange(r - 1, c + 1) && places[t][r - 1][c + 1] === "P" &&
            (
                (inRange(r, c + 1) && places[t][r][c + 1] === "O") ||
                (inRange(r - 1, c) && places[t][r - 1][c] === "O")
            )
        ) return 0;

        return 1;
    }
    
    return answer;
}

// 2. dfs
function solution(places) {
    let answer = [];
    let distance = 1;
    
    for(let t = 0; t < 5; t++) {
        const room = places[t];
        distance = 1;
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (room[r][c] === 'P') {
                    dfs(copyArr(room), r, c, 0);
                    if (distance === 0) break;
                }
            }
        }
        distance === 1? answer.push(1) : answer.push(0);
    }
    return answer;

    function dfs(room, x, y, step) {
        room[x][y] = 'X'; // 방문
        let dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        let ables = [];
        if (step === 2) return; // 2칸까지만 탐색
        
        for (let [dx, dy] of dir) {
            let [nx, ny] = [x + dx, y + dy];            
            if (room[nx] && room[nx][ny] === 'O') {
                room[nx][ny] = 'X';
                ables.push([nx, ny]);
            } else if (room[nx] && room[nx][ny] === 'P') { 
                // 거리 2 이내 사람 -> 종료
                distance = 0;
                return;
            } 
        }
        if (!ables.length) return;
        
        for (let i = 0; i < ables.length; i++) {
            // 빈자리였던 곳을 대상으로 다음 dfs 호출
            let [nx, ny] = ables[i];
            dfs(room, nx, ny, step + 1);
        }
    }

    function copyArr(arr) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            newarr.push([...arr[i]]);
        }
        return newarr;
    }
}
