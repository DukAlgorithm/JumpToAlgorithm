const combis = new Map(); // "ABC_2": ["AB", "BC", "CA"]

function combi(arr, n) {
    const key = arr.join('') + '_' + n;
    
    if (combis.has(key)) {
        return combis.get(key);
    }
    
    const result = [];
    
    function dfs(index, current) {
        if (current.length === n) {
            result.push(current.join(''));
            return;
        }
        
        for (let i = index; i < arr.length; i++) {
            dfs(i + 1, [...current, arr[i]]);
        }
    }
    
    dfs(0, []);
    combis.set(key, result);
    return result;
}

function solution(orders, course) {
    const m = new Map(course.map(e => [e, new Map()])); // { 요리 수: { 조합: { 카운트 } } }
    for (const o of orders) {
        for (const c of course) {
            const menus = o.split('').sort();

            if (menus.length < c) continue;
            
            const combinations = combi(menus, c);  // 메뉴 c개 조합
            const courseMap = m.get(c);
            
            for (const combo of combinations) {
                courseMap.set(combo, (courseMap.get(combo) || 0) + 1);
            }
        }
    }
    
    const result = [];
    for (const [k, v] of m.entries()) {
        let max = 2, res = [];
        for (const [combi, count] of v) {
            if (count > max) {
                max = count;
                res = [combi];
            } else if (count === max) {
                res.push(combi);
            }
        }
        result.push(...res);
    }
    
    return result.sort();
}