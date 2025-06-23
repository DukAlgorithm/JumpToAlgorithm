// https://school.programmers.co.kr/learn/courses/30/lessons/92343

function solution(info, edges) {
    const graph = Array.from(Array(info.length), () => []);
    for([from, to] of edges) {
        graph[from].push(to);
    }
    let answer = 0;
    
    function dfs(cur, sheep, wolf, nextNodes) {
        if (info[cur] === 0) sheep++;
        else wolf++;
        if (wolf >= sheep) return;
        
        answer = Math.max(answer, sheep);
        
        const newNext = [...nextNodes];
        const idx = newNext.indexOf(cur);
        newNext.splice(idx, 1);
        newNext.push(...graph[cur]);
        
        for (let next of newNext) {
          dfs(next, sheep, wolf, newNext);
        }
    }
    dfs(0, 0, 0, [0]);
    return answer;
}
