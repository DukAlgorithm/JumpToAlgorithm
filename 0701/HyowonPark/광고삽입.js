function solution(play_time, adv_time, logs) {
    const toSec = (time) => {
        const [h, m, s] = time.split(':').map(Number);
        return h * 3600 + m * 60 + s;
    };
    
    const toTime = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = sec % 60;
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };
    
    const playTime = toSec(play_time);
    const advTime = toSec(adv_time);
    
    if (playTime === advTime) return "00:00:00";
    
    // 차분 배열 생성 (각 초마다의 시청자 수 변화)
    const diff = new Array(playTime + 1).fill(0);
    
    // 각 로그에 대해 시작 시점에 +1, 종료 시점에 -1
    for (const log of logs) {
        const [start, end] = log.split('-').map(toSec);
        diff[start] += 1;
        diff[end] -= 1;
    }
    
    // 차분 배열을 누적하여 각 초의 시청자 수 계산
    for (let i = 1; i <= playTime; i++) {
        diff[i] += diff[i - 1];
    }
    
    // 0초 ~ (advTime-1)초 구간의 시청 시간 합계
    let currentSum = 0;
    for (let i = 0; i < advTime; i++) {
        currentSum += diff[i];
    }
    
    let maxSum = currentSum;
    let bestStart = 0;
    
    // 광고 시작 위치 1초, 2초..로 옮겨가며 찾기
    for (let start = 1; start <= playTime - advTime; start++) {
        // start초 ~ (start+advTime-1)초 구간으로 이동
        currentSum = currentSum - diff[start - 1] + diff[start + advTime - 1];
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            bestStart = start;
        }
    }
    
    return toTime(bestStart);
}