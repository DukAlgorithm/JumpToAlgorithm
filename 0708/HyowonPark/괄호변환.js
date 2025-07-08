function solution(p) {
    if (!p) return p;
    
    // 올바른 괄호인지 확인
    const isValid = (str) => {
        const x = [];
        for (const s of str) {
            if (s === '(') {
                x.push('(');
            } else {
                if (x.length) {
                    x.pop();
                } else {
                    return false;
                }
            }
        }
        
        return x.length ? false : true;
    }

    const splitTwo = (str) => {
        if (!str) return str;
        let open = 0;
        let close = 0;
        for (const a of str) {
            if (a === '(') {
                open++;
            } else {
                close++;
            }
            // 균형잡힌 문자열
            if (open && open === close) {
                break;
            }

        }
              
        let [u, v] = [str.substring(0, open + close),
                    str.substring(open + close)];
              
        if (isValid(u)) {            
            return u + splitTwo(v);
        } else {
            let s = '(';
            s += splitTwo(v);
            s += ')';
            s += u.substring(1, u.length - 1)
                .split('')
                .map(e => e === ')' ? '(' : ')')
                .join('');
            return s;
        }
    };
    
    return splitTwo(p);
}