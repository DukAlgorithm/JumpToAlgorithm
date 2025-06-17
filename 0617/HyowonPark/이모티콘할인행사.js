function solution(users, emoticons) {
    const discounts = [10, 20, 30, 40];
    let answer = [0, 0];
    
    function dfs(depth, discountArr) {
        if (depth === emoticons.length) {
            let plusCount = 0;
            let totalSales = 0;
            
            for (const [minDiscount, maxPrice] of users) {
                let userTotal = 0;
                
                for (let i = 0; i < emoticons.length; i++) {
                    if (discountArr[i] >= minDiscount) {
                        userTotal += emoticons[i] * (100 - discountArr[i]) / 100;
                    }
                }
                
                if (userTotal >= maxPrice) {
                    plusCount++;
                } else {
                    totalSales += userTotal;
                }
            }
            
            if (plusCount > answer[0] || (plusCount === answer[0] && totalSales > answer[1])) {
                answer = [plusCount, totalSales];
            }
            return;
        }
        
        for (const discount of discounts) {
            discountArr[depth] = discount;
            dfs(depth + 1, discountArr);
        }
    }
    
    dfs(0, []);
    return answer;
}