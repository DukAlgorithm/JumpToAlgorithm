function solution(points, routes) {
    let robots = [];

    for (const route of routes) {
        let fullPath = [];

        for (let i = 0; i < route.length - 1; i++) {
            const start = points[route[i] - 1];
            const end = points[route[i + 1] - 1];
            const path = getPath(start, end);

            if (i > 0) path.shift();

            fullPath = fullPath.concat(path);
        }

        robots.push(fullPath);
    }

    return countDanger(robots);
}

function getPath(start, end) {
    const path = [[...start]];
    let cur = [...start];

    while (!(cur[0] === end[0] && cur[1] === end[1])) {
        if (cur[0] > end[0]) {
            cur[0]--;
            path.push([cur[0], cur[1]]);
            continue;
        }

        if (cur[0] < end[0]) {
            cur[0]++;
            path.push([cur[0], cur[1]]);
            continue;
        }

        if (cur[1] > end[1]) {
            cur[1]--;
            path.push([cur[0], cur[1]]);
            continue;
        }

        if (cur[1] < end[1]) {
            cur[1]++;
            path.push([cur[0], cur[1]]);
        }
    }

    return path;
}

function countDanger(robots) {
    const timePosMap = new Map();
    let maxTime = 0;

    robots.forEach((robot, rIdx) => {
        robot.forEach(([x, y], t) => {
            maxTime = Math.max(maxTime, t);
            const key = `${t}_${x},${y}`;
            timePosMap.set(key, (timePosMap.get(key) || 0) + 1);
        });
    });

    let danger = 0;
    for (const count of timePosMap.values()) {
        if (count > 1) danger++;
    }

    return danger;
}