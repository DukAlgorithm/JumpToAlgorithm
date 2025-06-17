// https://school.programmers.co.kr/learn/courses/30/lessons/150368

function solution(users, emoticons) {
    const discounts = [10, 20, 30, 40];
    let answer = [0, 0];

    function dfs(cnt, rateList) {
        if (cnt === emoticons.length) {
            let join = 0;
            let total = 0;

            for (let [limitR, limitP] of users) {
                let price = 0;
                for (let i = 0; i < emoticons.length; i++) {
                    if (rateList[i] >= limitR) {
                        price += emoticons[i] * (100 - rateList[i]) / 100;
                    }
                }
                if (price >= limitP) {
                    join++;
                } else {
                    total += Math.floor(price);
                }
            }

            if (join > answer[0] || (join === answer[0] && total > answer[1])) {
                answer = [join, total];
            }
            return;
        }

        for (let d of discounts) {
            rateList.push(d);
            dfs(cnt + 1, rateList);
            rateList.pop();
        }
    }

    dfs(0, []);
    return answer;
}
