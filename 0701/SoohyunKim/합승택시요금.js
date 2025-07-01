// https://school.programmers.co.kr/learn/courses/30/lessons/72413

function solution(n, s, a, b, fares) {
    const board = Array.from({ length: n }, () => Array(n).fill(Infinity));
    for(let i = 0; i < n; i++) {
        board[i][i] = 0;
    }
    
    fares.forEach(el => {
        const [x, y, weight] = el;
        board[x-1][y-1] = weight;
        board[y-1][x-1] = weight;
    });
  
    // Floyd-Warshall
    for(let k = 0; k < n; k++) { // 경유
        for(let i = 0; i < n; i++) { // 출발
            for(let j = 0; j < n; j++) { // 도착
                if (distance[i][j] > distance[i][k] + distance[k][j]) {
                    distance[i][j] = distance[i][k] + distance[k][j];
                }
            }
        }
    }
  
    // 합승X
    let answer = board[s-1][a-1] + board[s-1][b-1];

    for(let i = 0; i < n; i++) {
        // 합승O
        const shortest = board[s-1][i] + board[i][a-1] + board[i][b-1]; 
        answer = Math.min(answer, shortest);
    }
  
    return answer;
}

