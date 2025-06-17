// https://school.programmers.co.kr/learn/courses/30/lessons/150365

function solution(n, m, x, y, r, c, k) {
    const dx = [1, 0, 0, -1];
    const dy = [0, -1, 1, 0];
    const dir = ["d", "l", "r", "u"];

    const dist = Math.abs(x - r) + Math.abs(y - c);
    const rest = k - dist;
    if (rest < 0 || rest % 2 !== 0) return "impossible";

    let result = null;

    function dfs(cx, cy, path) {
        if (result) return;
        if (path.length > k) return;

        const rest = k - path.length;
        const dist = Math.abs(cx + 1 - r) + Math.abs(cy + 1 - c);
        if (dist > rest || (rest - dist) % 2 !== 0) return;

        if (path.length === k && cx + 1 === r && cy + 1 === c) {
            result = path;
            return;
        }

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                dfs(nx, ny, path + dir[i]);
            }
        }
    }

    dfs(x - 1, y - 1, "");
    return result || "impossible";
}
