// https://school.programmers.co.kr/learn/courses/30/lessons/150370

function solution(today, terms, privacies) {
    const [ty, tm, td] = today.split(".").map(Number);
    const todayTotal = ty * 12 * 28 + tm * 28 + td;
    
    const termMap = new Map();
    for (let term of terms) {
        const [type, month] = term.split(" ");
        termMap.set(type, Number(month));
    }
    const answer = [];
    
    for (let i = 0; i < privacies.length; i++) {
        const [date, type] = privacies[i].split(" ");
        let [y, m, d] = date.split(".").map(Number);
        m += termMap.get(type);

        y += Math.floor((m - 1) / 12);
        m = ((m - 1) % 12) + 1;

        const expiry = y * 12 * 28 + m * 28 + d - 1;
        if (expiry < todayTotal) answer.push(i + 1);
    }
    
    return answer;
}
