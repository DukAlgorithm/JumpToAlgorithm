// https://school.programmers.co.kr/learn/courses/30/lessons/72411

function solution(orders, course) {
    const answer = []
    
    for (const cnt of course) {
        const map = new Map()
        for (const order of orders) {
            getCombinations(order.split("").sort(), cnt).forEach(el => {
                // 메뉴 조합 횟수 기록
                el = el.join("")
                if (map.get(el)) map.set(el , map.get(el)+1)
                else map.set(el, 1)
            })
        }
        
        let tmpArr = []
        let max = 2
        for (const [key, val] of map) {
            if (val > max) {
                max = val
                tmpArr = [key]
            } else if (val === max) {
                tmpArr.push(key)
            }
        }
        answer.push(...tmpArr)
    }
    
    return answer.sort()
}

// 조함 생성
function getCombinations(arr, n) {
    let res = []
    if(n===1) return arr.map(el =>[el]);
    
    arr.forEach((fixed, idx, arr) => {
        const rest = arr.slice(idx+1)
        const combination = getCombinations(rest, n-1)    
        const attached = combination.map(el => [fixed, ...el])
        res.push(...attached)
    })
    
    return res;
}