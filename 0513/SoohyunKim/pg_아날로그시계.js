function solution(h1, m1, s1, h2, m2, s2) {
    function getAngle(h, m, s) { // 시분초 각도 계산
        const hour = (h % 12) * 30 + m * 0.5 + s * (0.5 / 60);
        const minute = m * 6 + s * 0.1;
        const second = s * 6;
        return { hour, minute, second };
    }

    function cross(a1, a2, b1, b2) {
        a1 = (a1 + 360) % 360;
        a2 = (a2 + 360) % 360;
        b1 = (b1 + 360) % 360;
        b2 = (b2 + 360) % 360;

        return (a1 < b1 && b1 <= a2) || (a1 > a2 && (b1 > a1 || b1 <= a2));
    }
    
    function isSame(a, b) {
        a = (a + 360) % 360;
        b = (b + 360) % 360;
        return Math.abs(a - b) < 0.0001 || Math.abs(a - b) > 360 - 0.0001;
    }

    let start = h1 * 3600 + m1 * 60 + s1;
    let end = h2 * 3600 + m2 * 60 + s2;
    let count = 0;
    
    let { hour: prevHour, minute: prevMinute, second: prevSecond } = getAngle(
        h1, m1, s1
    );

    for (let t = start; t <= end; t++) {
        // 현재 시분초
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = t % 60;

        const { hour, minute, second } = getAngle(h, m, s);

        if (
            cross(prevSecond, second, prevHour, hour) ||
            cross(prevSecond, second, prevMinute, minute) ||
            isSame(second, hour) ||
            isSame(second, minute)
        ) {
            count++;
        }

        prevHour = hour;
        prevMinute = minute;
        prevSecond = second;
    }

    return count;
}