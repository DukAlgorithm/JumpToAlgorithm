// https://school.programmers.co.kr/learn/courses/30/lessons/92334

function solution(id_list, report, k) {
    const len = id_list.length;
    const reReport = new Set(report); // 중복 제거
    const reportCnt = Array(len).fill(0);
    
    for(let r of reReport) {
        const [from, to] = r.split(" ");
        const idx = id_list.indexOf(to);
        reportCnt[idx] += 1;
    }
    
    const reportName = [];
    for(let i = 0; i < len; i++) {
        if(reportCnt[i] >= k) reportName.push(id_list[i]);
    }
    
    const answer = Array(len).fill(0);
    
    for(let r of reReport) {
        const [from, to] = r.split(" ");
        if(reportName.includes(to)) {
            const idx = id_list.indexOf(from);
            answer[idx] += 1;
        }
    }
    
    return answer;
}
