function solution(s) {
     let minLength = s.length;
    
    for (let unit = 1; unit <= Math.floor(s.length / 2); unit++) {
        const groups = [];  // [[3, 패턴]]
        let prev = s.substring(0, unit);
        let count = 1;
        
        for (let i = unit; i < s.length; i += unit) {
            const current = s.substring(i, i + unit);
            
            if (prev === current) {
                count++;
            } else {
                groups.push([count, prev]);
                prev = current;
                count = 1;
            }
        }
        
        groups.push([count, prev]);
        
        const result = groups
            .map(([cnt, pattern]) => (cnt > 1 ? cnt : '') + pattern)
            .join('');
        
        minLength = Math.min(minLength, result.length);
    }
    
    return minLength;
}