// https://school.programmers.co.kr/learn/courses/30/lessons/72414

function solution(play_time, adv_time, logs) {
    const playSec = toSeconds(play_time);
    const advSec = toSeconds(adv_time);
    const times = new Array(playSec + 1).fill(0);
    
    for (let log of logs) {
        const [startStr, endStr] = log.split("-");
        const start = toSeconds(startStr);
        const end = toSeconds(endStr);
        times[start] += 1;
        times[end] -= 1;
    }
    
    // 시청자 수
    for (let i = 1; i <= playSec; i++) {
        times[i] += times[i - 1];
    }

    // 누적 시청자
    for (let i = 1; i <= playSec; i++) {
        times[i] += times[i - 1];
    }

    let maxTime = times[advSec - 1];
    let maxStart = 0;

    for (let i = advSec; i < playSec; i++) {
        const total = times[i] - times[i - advSec];
        if (total > maxTime) {
            maxTime = total;
            maxStart = i - advSec + 1;
        }
    }

    return toTime(maxStart);
}

function toSeconds(time) {
    const [hh, mm, ss] = time.split(":").map(Number);
    return hh * 3600 + mm * 60 + ss;
}

function toTime(seconds) {
    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
}  
