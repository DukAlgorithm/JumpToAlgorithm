function solution(id_list, report, k) {
    const r = new Map(); // 유저: 신고한 유저 배열
    const cnt = new Map(); // 유저: 신고당한 수
    const dup = new Set();


    for (const [a, b] of report.map(e => e.split(' '))) {
        // a 가 b를 신고
        // 중복 신고는 카운팅 패스
        if (dup.has(`${a},${b}`)) {
            continue;
        }
        dup.add(`${a},${b}`); // !!! 아니 구분자 안 했더니 틀렸다 (muzi, frodo 랑 muz, ifrodo 가 같은 경우로 되어서! 참나)

        if (r.has(a)) {
            r.set(a, [...r.get(a), b]);

        } else {
            r.set(a, [b]);
        }
        
        if (cnt.has(b)) {
            cnt.set(b, cnt.get(b) + 1);
        } else {
            cnt.set(b, 1);
        }
    }

 
    return id_list.map(id => (r.get(id))?.length ? 
        (r.get(id)).reduce((acc, cur) => {
            if (cnt.get(cur) >= k) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0) : 0
    );
}


const r=  solution(["muzi", "frodo", "apeach", "neo"], ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]	, 2);
console.log(r);